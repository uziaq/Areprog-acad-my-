/**
 * Contrôle de conformité du contenu (exigence F25).
 * Règles décrites dans docs/architecture/03-modele-de-contenu.md §3.10.
 */
import { existsSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import type { z } from 'astro/zod';
import {
  CLES_SOLUTION,
  RE_SECTION,
  SIMULATEURS_DISPONIBLES,
  chapitreSchema,
  competenceSchema,
  correctionExerciceSchema,
  exerciceSchema,
  leconSchema,
  moduleSchema,
  parametresSchema,
  questionSchema,
  reponseQuestionSchema,
  sourceSchema,
  tpSchema,
  type Statut,
} from '../schemas/contenu.ts';
import type { ContenuBrut, FichierMarkdown } from './charger.ts';
import { ancres, section, trouverEtiquettes, valeursNonEtiquetees } from './etiquettes.ts';

export type Gravite = 'erreur' | 'avertissement';

export interface Diagnostic {
  regle: string;
  gravite: Gravite;
  fichier: string;
  message: string;
}

export interface OptionsValidation {
  /** Date du jour AAAA-MM-JJ (injectable pour les tests). */
  aujourdhui?: string;
}

type Parametres = z.infer<typeof parametresSchema>;
type Lecon = z.infer<typeof leconSchema>;
type Exercice = z.infer<typeof exerciceSchema>;
type Question = z.infer<typeof questionSchema>;

const PARAMETRES_DEFAUT: Parametres = {
  qcm: { seuil_reussite: 0.8, seuil_securite: 1, questions_par_tirage: 20, taille_min_banque: 40 },
  pratique: { seuil_reussite: 0.7 },
  evaluation_finale: { seuil_reussite: 0.75 },
  heures_par_semaine: 8,
  sources: { delai_reverification_mois: 12 },
};

/** Avertissement en brouillon, erreur une fois relu ou validé. */
const selonStatut = (s: Statut | undefined): Gravite => (s === 'relu' || s === 'valide' ? 'erreur' : 'avertissement');

function moisEntre(a: string, b: string): number {
  const [ya, ma] = a.split('-').map(Number);
  const [yb, mb] = b.split('-').map(Number);
  return (yb! - ya!) * 12 + (mb! - ma!);
}

function formaterErreurZod(e: z.ZodError): string[] {
  return e.issues.map((i) => {
    const ou = i.path.length ? `${i.path.join('.')} : ` : '';
    return `${ou}${i.message}`;
  });
}

function clesSolutionPresentes(objet: unknown): string[] {
  if (!objet || typeof objet !== 'object') return [];
  return Object.keys(objet).filter((k) => CLES_SOLUTION.includes(k));
}

/** Poids maximal conseillé d'une image de leçon (chargement sur la tablette d'atelier). */
const TAILLE_MAX_IMAGE = 400_000;

const RUBRIQUES_CHAPITRE = ['Mesures attendues et tolérances', 'Erreurs fréquentes'];

export function validerContenu(contenu: ContenuBrut, options: OptionsValidation = {}): Diagnostic[] {
  const diags: Diagnostic[] = [];
  const aujourdhui = options.aujourdhui ?? new Date().toISOString().slice(0, 10);
  const ajouter = (regle: string, gravite: Gravite, fichier: string, message: string) =>
    diags.push({ regle, gravite, fichier, message });

  function verifierSchema<T extends z.ZodType>(schema: T, donnees: unknown, fichier: string): z.infer<T> | null {
    const r = schema.safeParse(donnees);
    if (r.success) return r.data;
    for (const m of formaterErreurZod(r.error)) ajouter('schema', 'erreur', fichier, m);
    return null;
  }

  // ---------- Identifiants uniques ----------
  const ids = new Map<string, string>();
  function declarerId(id: string, fichier: string) {
    const deja = ids.get(id);
    if (deja) ajouter('id-unique', 'erreur', fichier, `identifiant ${id} déjà utilisé dans ${deja}`);
    else ids.set(id, fichier);
  }

  // ---------- Paramètres ----------
  let parametres = PARAMETRES_DEFAUT;
  if (!contenu.parametres) {
    ajouter('parametres', 'erreur', 'parametres.yaml', 'fichier de paramètres absent');
  } else if (contenu.parametres.erreurLecture) {
    ajouter('yaml', 'erreur', contenu.parametres.chemin, contenu.parametres.erreurLecture);
  } else {
    parametres = verifierSchema(parametresSchema, contenu.parametres.donnees, contenu.parametres.chemin) ?? parametres;
  }
  const delaiSources = parametres.sources.delai_reverification_mois;

  // ---------- Référentiel ----------
  const competences = new Set<string>();
  if (!contenu.referentiel) {
    ajouter('referentiel', 'erreur', 'referentiel/competences.yaml', 'référentiel de compétences absent');
  } else if (contenu.referentiel.erreurLecture) {
    ajouter('yaml', 'erreur', contenu.referentiel.chemin, contenu.referentiel.erreurLecture);
  } else if (!Array.isArray(contenu.referentiel.donnees)) {
    ajouter('schema', 'erreur', contenu.referentiel.chemin, 'liste de compétences attendue');
  } else {
    for (const brut of contenu.referentiel.donnees) {
      const c = verifierSchema(competenceSchema, brut, contenu.referentiel.chemin);
      if (!c) continue;
      declarerId(c.code, contenu.referentiel.chemin);
      competences.add(c.code);
    }
  }
  function verifierCompetences(codes: string[], fichier: string, quoi: string) {
    for (const code of codes) {
      if (!competences.has(code)) ajouter('reference', 'erreur', fichier, `${quoi} : compétence ${code} absente du référentiel`);
    }
  }

  // ---------- Bibliothèque ----------
  const sources = new Set<string>();
  for (const f of contenu.sources) {
    if (f.erreurLecture) {
      ajouter('yaml', 'erreur', f.chemin, f.erreurLecture);
      continue;
    }
    const s = verifierSchema(sourceSchema, f.donnees, f.chemin);
    if (!s) continue;
    declarerId(s.id, f.chemin);
    sources.add(s.id);
    if (s.fichier_local && s.licence !== 'libre') {
      ajouter('licence', 'erreur', f.chemin, `fichier local interdit pour une source sous licence « ${s.licence} » : garder la référence et le lien`);
    }
    if (moisEntre(s.date_consultation, aujourdhui) > delaiSources) {
      ajouter('source-perimee', 'avertissement', f.chemin, `source consultée le ${s.date_consultation} : vérifier si une nouvelle révision existe`);
    }
  }

  function verifierEtiquettes(md: FichierMarkdown, statut: Statut | undefined) {
    for (const e of trouverEtiquettes(md.corps)) {
      if (e.type === 'SOURCÉ') {
        if (!e.source) ajouter('etiquette-source', 'erreur', md.chemin, `[SOURCÉ] sans identifiant de source (attendu : [SOURCÉ : SRC-0001 …]) : « ${e.detail || 'vide'} »`);
        else if (!sources.has(e.source)) ajouter('etiquette-source', 'erreur', md.chemin, `[SOURCÉ] renvoie à ${e.source}, absente de content/bibliotheque/sources/`);
      }
      if (e.type === 'À VÉRIFIER' && (statut === 'relu' || statut === 'valide')) {
        ajouter('a-verifier', statut === 'valide' ? 'erreur' : 'avertissement', md.chemin, `[À VÉRIFIER] restant dans un contenu « ${statut} » : ${e.detail || 'sans motif'}`);
      }
    }
    for (const phrase of valeursNonEtiquetees(md.corps)) {
      ajouter('valeur-non-etiquetee', selonStatut(statut), md.chemin, `valeur sans étiquette de fiabilité : « ${phrase} »`);
    }
  }

  // ---------- Parcours ----------
  const chapitresConnus = new Set<string>();
  const ancresParLecon = new Map<string, Set<string>>();
  const renvois: { valeur: string; fichier: string; quoi: string }[] = [];
  const prerequisAVerifier: { ids: string[]; fichier: string; statut: Statut | undefined }[] = [];

  for (const mod of contenu.modules) {
    if (!mod.module) {
      ajouter('structure', 'erreur', mod.dossier, 'module.yaml absent');
      continue;
    }
    if (mod.module.erreurLecture) {
      ajouter('yaml', 'erreur', mod.module.chemin, mod.module.erreurLecture);
      continue;
    }
    const m = verifierSchema(moduleSchema, mod.module.donnees, mod.module.chemin);
    if (!m) continue;
    declarerId(m.id, mod.module.chemin);
    const chapitresDuModule = new Set<string>();

    for (const ch of mod.chapitres) {
      if (!ch.chapitre) {
        ajouter('structure', 'erreur', ch.dossier, 'chapitre.md absent');
        continue;
      }
      if (ch.chapitre.erreurLecture) {
        ajouter('yaml', 'erreur', ch.chapitre.chemin, ch.chapitre.erreurLecture);
        continue;
      }
      const c = verifierSchema(chapitreSchema, ch.chapitre.entete, ch.chapitre.chemin);
      if (!c) continue;
      const fc = ch.chapitre.chemin;
      declarerId(c.id, fc);
      chapitresConnus.add(c.id);
      chapitresDuModule.add(c.id);
      const gr = selonStatut(c.statut);
      if (c.module !== m.id) ajouter('reference', 'erreur', fc, `chapitre rattaché à ${c.module} mais rangé dans le module ${m.id}`);
      if (!m.chapitres.includes(c.id)) ajouter('reference', 'erreur', mod.module.chemin, `le chapitre ${c.id} existe mais n'est pas listé dans module.yaml`);
      prerequisAVerifier.push({ ids: c.prerequis, fichier: fc, statut: c.statut });
      verifierCompetences(c.competences, fc, 'chapitre');
      for (const s of c.sources) if (!sources.has(s)) ajouter('reference', 'erreur', fc, `source ${s} introuvable dans la bibliothèque`);
      if (moisEntre(c.derniere_verification_sources, aujourdhui) > delaiSources) {
        ajouter('source-perimee', 'avertissement', fc, `sources vérifiées pour la dernière fois le ${c.derniere_verification_sources}`);
      }
      verifierEtiquettes(ch.chapitre, c.statut);

      // --- Exercices et corrections ---
      const exercices = new Map<string, Exercice>();
      for (const f of ch.exercices) {
        if (f.erreurLecture) { ajouter('yaml', 'erreur', f.chemin, f.erreurLecture); continue; }
        if (!Array.isArray(f.donnees)) { ajouter('schema', 'erreur', f.chemin, 'liste d\'exercices attendue'); continue; }
        for (const brut of f.donnees) {
          const fuite = clesSolutionPresentes(brut);
          if (fuite.length) {
            ajouter('fuite-correction', 'erreur', f.chemin, `solution présente dans un énoncé (${fuite.join(', ')}) : la déplacer dans corrections/`);
            continue;
          }
          const e = verifierSchema(exerciceSchema, brut, f.chemin);
          if (!e) continue;
          declarerId(e.id, f.chemin);
          verifierCompetences(e.competences, f.chemin, e.id);
          exercices.set(e.id, e);
        }
      }
      const corriges = new Set<string>();
      for (const f of ch.corrections) {
        if (f.erreurLecture) { ajouter('yaml', 'erreur', f.chemin, f.erreurLecture); continue; }
        if (!Array.isArray(f.donnees)) { ajouter('schema', 'erreur', f.chemin, 'liste de corrections attendue'); continue; }
        for (const brut of f.donnees) {
          const k = verifierSchema(correctionExerciceSchema, brut, f.chemin);
          if (!k) continue;
          corriges.add(k.id);
          renvois.push({ valeur: k.renvoi_section, fichier: f.chemin, quoi: k.id });
          const e = exercices.get(k.id);
          if (!e) { ajouter('correction', 'erreur', f.chemin, `correction de ${k.id} sans exercice correspondant`); continue; }
          if (e.type === 'calcul' && (k.valeur === undefined || k.tolerance_relative === undefined || !k.unite)) {
            ajouter('correction', 'erreur', f.chemin, `${k.id} : un exercice de calcul exige valeur, tolerance_relative et unite`);
          }
          if ((e.type === 'choix_unique' || e.type === 'choix_multiple') && e.propositions) {
            const props = new Set(e.propositions.map((p) => p.id));
            if (!k.bonnes?.length || k.bonnes.some((b) => !props.has(b))) {
              ajouter('correction', 'erreur', f.chemin, `${k.id} : « bonnes » doit lister des propositions existantes`);
            }
          }
        }
      }
      for (const id of exercices.keys()) {
        if (!corriges.has(id)) ajouter('correction', 'erreur', fc, `exercice ${id} sans correction dans corrections/`);
      }

      // --- Leçons ---
      const exercicesUtilises = new Set<string>();
      let nbObjectifs = 0;
      let nbFigures = 0;
      let nbExemples = 0;
      let theorie = false;
      for (const lf of ch.lecons) {
        if (lf.erreurLecture) { ajouter('yaml', 'erreur', lf.chemin, lf.erreurLecture); continue; }
        const l: Lecon | null = verifierSchema(leconSchema, lf.entete, lf.chemin);
        if (!l) continue;
        declarerId(l.id, lf.chemin);
        ancresParLecon.set(l.id, ancres(lf.corps));
        if (l.chapitre !== c.id) ajouter('reference', 'erreur', lf.chemin, `leçon rattachée à ${l.chapitre} mais rangée dans ${c.id}`);
        if (!c.lecons.includes(l.id)) ajouter('reference', 'erreur', fc, `la leçon ${l.id} existe mais n'est pas listée dans le chapitre`);
        prerequisAVerifier.push({ ids: l.prerequis, fichier: lf.chemin, statut: l.statut });
        for (const o of l.objectifs) verifierCompetences(o.competences, lf.chemin, `objectif ${o.id}`);
        nbObjectifs += l.objectifs.length;
        nbFigures += l.figures.length;
        nbExemples += (lf.corps.match(/^###\s+Exemple/gim) ?? []).length;
        if (section(lf.corps, 'Théorie') !== null) theorie = true;

        const objectifs = new Set(l.objectifs.map((o) => o.id));
        const criteres = new Set(l.criteres_evaluation.map((k) => k.objectif));
        for (const o of objectifs) if (!criteres.has(o)) ajouter('objectif-sans-critere', 'erreur', lf.chemin, `objectif ${o} sans critère d'évaluation`);
        for (const k of criteres) if (!objectifs.has(k)) ajouter('reference', 'erreur', lf.chemin, `critère d'évaluation rattaché à un objectif inexistant : ${k}`);
        for (const s of l.references) if (!sources.has(s)) ajouter('reference', 'erreur', lf.chemin, `référence ${s} introuvable dans la bibliothèque`);
        for (const x of l.exercices) {
          exercicesUtilises.add(x);
          const e = exercices.get(x);
          if (!e) ajouter('reference', 'erreur', lf.chemin, `exercice ${x} introuvable dans exercices/`);
          else if (!objectifs.has(e.objectif)) ajouter('reference', 'erreur', lf.chemin, `exercice ${x} rattaché à l'objectif ${e.objectif}, absent de la leçon`);
        }
        const figures = new Set<string>();
        for (const fig of l.figures) {
          declarerId(fig.id, lf.chemin);
          figures.add(fig.id);
          const fichierFigure = join(contenu.racine, dirname(lf.chemin), fig.fichier);
          if (!existsSync(fichierFigure)) ajouter('figure', 'erreur', lf.chemin, `fichier de figure introuvable : ${fig.fichier}`);
          else if (statSync(fichierFigure).size > TAILLE_MAX_IMAGE) {
            ajouter('figure', 'avertissement', lf.chemin, `image ${fig.fichier} trop lourde pour la tablette (plus de ${TAILLE_MAX_IMAGE / 1000} Ko) : la réduire ou la convertir en WebP`);
          }
          if (fig.origine !== 'areprog' && fig.origine !== 'illustration-generee' && !sources.has(fig.origine)) ajouter('figure', 'erreur', lf.chemin, `origine de figure ${fig.origine} absente de la bibliothèque`);
        }
        for (const d of lf.corps.matchAll(/^::(figure|exercice|simulateur)\{id=([^}\s]+)\}/gm)) {
          const [, type, id] = d;
          if (type === 'figure' && !figures.has(id!)) ajouter('reference', 'erreur', lf.chemin, `::figure{id=${id}} non déclarée dans l'en-tête`);
          if (type === 'exercice' && !l.exercices.includes(id!)) ajouter('reference', 'erreur', lf.chemin, `::exercice{id=${id}} non listé dans l'en-tête`);
          if (type === 'simulateur' && !SIMULATEURS_DISPONIBLES.includes(id!)) ajouter('reference', 'erreur', lf.chemin, `::simulateur{id=${id}} inconnu (disponibles : ${SIMULATEURS_DISPONIBLES.join(', ')})`);
        }
        verifierEtiquettes(lf, l.statut);
      }
      for (const lid of c.lecons) {
        if (!ch.lecons.some((lf) => (lf.entete as { id?: string } | null)?.id === lid)) ajouter('reference', 'erreur', fc, `leçon ${lid} listée mais introuvable dans lecons/`);
      }
      for (const id of exercices.keys()) {
        if (!exercicesUtilises.has(id)) ajouter('reference', 'avertissement', fc, `exercice ${id} rattaché à aucune leçon`);
      }

      // --- QCM ---
      const questions = new Map<string, Question>();
      if (ch.banque) {
        const f = ch.banque;
        if (f.erreurLecture) ajouter('yaml', 'erreur', f.chemin, f.erreurLecture);
        else if (!Array.isArray(f.donnees)) ajouter('schema', 'erreur', f.chemin, 'liste de questions attendue');
        else for (const brut of f.donnees) {
          const fuite = clesSolutionPresentes(brut);
          if (fuite.length) { ajouter('fuite-correction', 'erreur', f.chemin, `réponse présente dans la banque (${fuite.join(', ')}) : la déplacer dans reponses.yaml`); continue; }
          const q = verifierSchema(questionSchema, brut, f.chemin);
          if (!q) continue;
          declarerId(q.id, f.chemin);
          verifierCompetences(q.competences, f.chemin, q.id);
          renvois.push({ valeur: q.section, fichier: f.chemin, quoi: q.id });
          questions.set(q.id, q);
        }
      }
      const repondues = new Set<string>();
      if (ch.reponses) {
        const f = ch.reponses;
        if (f.erreurLecture) ajouter('yaml', 'erreur', f.chemin, f.erreurLecture);
        else if (!Array.isArray(f.donnees)) ajouter('schema', 'erreur', f.chemin, 'liste de réponses attendue');
        else for (const brut of f.donnees) {
          const r = verifierSchema(reponseQuestionSchema, brut, f.chemin);
          if (!r) continue;
          repondues.add(r.id);
          if (RE_SECTION.test(r.source)) renvois.push({ valeur: r.source, fichier: f.chemin, quoi: r.id });
          const q = questions.get(r.id);
          if (!q) { ajouter('correction', 'erreur', f.chemin, `réponse à ${r.id} sans question correspondante`); continue; }
          if (q.type === 'calcul' && (r.valeur === undefined || r.tolerance_relative === undefined || !r.unite)) {
            ajouter('correction', 'erreur', f.chemin, `${r.id} : une question de calcul exige valeur, tolerance_relative et unite`);
          }
          if ((q.type === 'choix_unique' || q.type === 'choix_multiple') && q.propositions) {
            const props = new Set(q.propositions.map((p) => p.id));
            if (!r.bonnes?.length || r.bonnes.some((b) => !props.has(b))) ajouter('correction', 'erreur', f.chemin, `${r.id} : « bonnes » doit lister des propositions existantes`);
            if (q.type === 'choix_unique' && r.bonnes?.length !== 1) ajouter('correction', 'erreur', f.chemin, `${r.id} : une question à choix unique a exactement une bonne réponse`);
          }
        }
      }
      for (const id of questions.keys()) if (!repondues.has(id)) ajouter('correction', 'erreur', fc, `question ${id} sans réponse dans qcm/reponses.yaml`);
      const min = parametres.qcm.taille_min_banque;
      if (questions.size < min) {
        ajouter('qcm-volume', c.statut === 'valide' ? 'erreur' : 'avertissement', fc, `banque de ${questions.size} question(s), ${min} attendues au minimum`);
      }

      // --- Les 12 rubriques du gabarit ---
      const manquantes: string[] = [];
      if (nbObjectifs < 3) manquantes.push('2. objectifs (3 au minimum)');
      if (!theorie) manquantes.push('3. théorie (section « ## Théorie » dans une leçon)');
      if (nbFigures < 1) manquantes.push('4. schémas et illustrations');
      if (nbExemples < 3) manquantes.push('5. exemples numériques (3 sections « ### Exemple »)');
      if (exercices.size < 5) manquantes.push('6. exercices (5 au minimum)');
      if (c.tp.length < 1) manquantes.push('7. travaux pratiques');
      for (const r of RUBRIQUES_CHAPITRE) if (section(ch.chapitre.corps, r) === null) manquantes.push(`${r === RUBRIQUES_CHAPITRE[0] ? '8' : '9'}. ${r.toLowerCase()} (section « ## ${r} » dans chapitre.md)`);
      if (!ch.banque) manquantes.push('10. QCM (qcm/banque.yaml)');
      if (!ch.corrigeChapitre) manquantes.push('11. corrigé séparé (corrections/corrige-chapitre.md)');
      if (c.sources.length < 1) manquantes.push('12. sources documentaires');
      for (const r of manquantes) ajouter('rubriques', gr, fc, `rubrique manquante : ${r}`);

      // --- Travaux pratiques ---
      for (const tf of ch.tp) {
        if (tf.erreurLecture) { ajouter('yaml', 'erreur', tf.chemin, tf.erreurLecture); continue; }
        const t = verifierSchema(tpSchema, tf.entete, tf.chemin);
        if (!t) continue;
        declarerId(t.id, tf.chemin);
        if (!c.tp.includes(t.id)) ajouter('reference', 'avertissement', fc, `TP ${t.id} présent mais non listé dans le chapitre`);
        if (t.domaines_risque.length && t.securite !== 'renforcee') {
          ajouter('securite-renforcee', 'erreur', tf.chemin, `un TP touchant ${t.domaines_risque.join(', ')} doit porter securite: renforcee`);
        }
        if (t.securite === 'renforcee') {
          if (!t.domaines_risque.length) ajouter('securite-renforcee', 'erreur', tf.chemin, 'TP renforcé sans domaine de risque (airbag, abs-esp, direction)');
          const protocole = section(tf.corps, 'Protocole de sécurité');
          if (protocole === null || !protocole.trim()) {
            ajouter('securite-renforcee', 'erreur', tf.chemin, 'section « ## Protocole de sécurité » absente ou vide');
          } else {
            for (const e of trouverEtiquettes(protocole)) {
              if (e.type === 'À VÉRIFIER' || e.type === 'HYPOTHÈSE') {
                ajouter('securite-renforcee', 'erreur', tf.chemin, `consigne de sécurité étiquetée [${e.type}] : interdite, la consigne doit être sourcée`);
              }
            }
          }
        }
        if (t.support === 'vehicule' && section(tf.corps, 'Limites de la validation') === null) {
          ajouter('securite-renforcee', 'erreur', tf.chemin, 'TP sur véhicule sans section « ## Limites de la validation »');
        }
        verifierCompetences(t.competences, tf.chemin, t.id);
        verifierEtiquettes(tf, t.statut);
      }
    }
    for (const cid of m.chapitres) {
      if (!chapitresDuModule.has(cid)) ajouter('reference', 'avertissement', mod.module.chemin, `chapitre ${cid} annoncé mais pas encore présent`);
    }
  }

  // Renvois de section (remédiation) : la leçon et l'ancre doivent exister.
  for (const r of renvois) {
    const m = RE_SECTION.exec(r.valeur);
    if (!m) continue;
    const [, lecon, a] = m;
    const lesAncres = ancresParLecon.get(lecon!);
    if (!lesAncres) ajouter('section', 'erreur', r.fichier, `${r.quoi} : renvoi vers la leçon ${lecon}, introuvable`);
    else if (a && !lesAncres.has(a)) ajouter('section', 'erreur', r.fichier, `${r.quoi} : section « #${a} » introuvable dans ${lecon} (ancres disponibles : ${[...lesAncres].join(', ')})`);
  }

  // Prérequis : vérifiés une fois tous les chapitres connus.
  for (const p of prerequisAVerifier) {
    for (const id of p.ids) {
      if (!ids.has(id) && !chapitresConnus.has(id)) {
        ajouter('prerequis', selonStatut(p.statut), p.fichier, `prérequis ${id} introuvable dans le contenu`);
      }
    }
  }

  return diags;
}
