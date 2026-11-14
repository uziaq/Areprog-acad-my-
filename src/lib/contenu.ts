/**
 * Lecture du contenu à la génération du site (côté serveur de build uniquement).
 * Produit le « plan » sans solutions, et les corrections servies à part.
 */
import { dirname, join, resolve } from 'node:path';
import { estVectorielle, urlFigure } from '../markdown/enrichir-html.ts';
import type { z } from 'astro/zod';
import {
  chapitreSchema,
  competenceSchema,
  correctionExerciceSchema,
  exerciceSchema,
  grillesSchema,
  leconSchema,
  moduleSchema,
  parametresSchema,
  programmeSchema,
  questionSchema,
  reponseQuestionSchema,
  sourceSchema,
  tpSchema,
  type Grilles,
} from '../schemas/contenu.ts';
import { chargerContenu } from '../validation/charger.ts';
import { titresParAncre } from '../validation/etiquettes.ts';
import type { Correction, CorrectionsChapitre, Enonce, Plan, PlanChapitre, PlanModule, PlanTp } from './types.ts';

export type Source = z.infer<typeof sourceSchema>;
export type Lecon = z.infer<typeof leconSchema>;
export type Tp = z.infer<typeof tpSchema>;

export interface ContenuSite {
  plan: Plan;
  /** Énoncés par identifiant (exercices et questions), sans solution. */
  enonces: Map<string, Enonce>;
  /** Version de chaque exercice. */
  versionsExercices: Map<string, string>;
  corrections: Map<string, CorrectionsChapitre>;
  sources: Map<string, Source>;
  lecons: Map<string, { lecon: Lecon; chapitre: PlanChapitre; module: PlanModule }>;
  chapitres: Map<string, { chapitre: PlanChapitre; module: PlanModule; dossier: string }>;
  /** Images (photos, illustrations) des leçons publiées : URL publiée → chemin du fichier source. */
  images: Map<string, string>;
  /** Travaux pratiques publiés, avec leur corps Markdown. */
  tps: Map<string, { tp: Tp; corps: string; chemin: string; planTp: PlanTp; chapitre: PlanChapitre; module: PlanModule }>;
  /** Grilles d'évaluation pratique et fautes éliminatoires. */
  grilles: Grilles;
}

const bas = (s: string) => s.toLowerCase();
export const urlModule = (m: string) => `/parcours/${bas(m)}/`;
export const urlChapitre = (m: string, c: string) => `/parcours/${bas(m)}/${bas(c)}/`;
export const urlLecon = (m: string, c: string, l: string) => `/parcours/${bas(m)}/${bas(c)}/${bas(l)}/`;
export const urlQcm = (m: string, c: string) => `/parcours/${bas(m)}/${bas(c)}/qcm/`;
export const urlTp = (m: string, c: string, t: string) => `/parcours/${bas(m)}/${bas(c)}/tp/${bas(t)}/`;
export const urlCorrections = (c: string) => `/corrections/${bas(c)}.json`;
export const urlSource = (s: string) => `/sources/${bas(s)}/`;

let cache: ContenuSite | null = null;

/** Statuts publiés dans le parcours. En prototype, les brouillons sont publiés (mode auteur local). */
const STATUTS_PUBLIES = new Set(['brouillon', 'relu', 'valide']);

export function chargerSite(racine = resolve('content')): ContenuSite {
  if (cache) return cache;
  const brut = chargerContenu(racine);
  const parametres = parametresSchema.parse(brut.parametres?.donnees);
  const programme = programmeSchema.parse(brut.programme?.donnees);
  const grilles = grillesSchema.parse(brut.grilles?.donnees);
  const competences = competenceSchema.array().parse(brut.referentiel?.donnees ?? []);
  const sources = new Map(brut.sources.map((f) => sourceSchema.parse(f.donnees)).map((s) => [s.id, s]));

  const enonces = new Map<string, Enonce>();
  const versionsExercices = new Map<string, string>();
  const corrections = new Map<string, CorrectionsChapitre>();
  const lecons: ContenuSite['lecons'] = new Map();
  const chapitres: ContenuSite['chapitres'] = new Map();
  const images: ContenuSite['images'] = new Map();
  const tps: ContenuSite['tps'] = new Map();
  const modules: PlanModule[] = [];

  const modulesTries = brut.modules
    .map((m) => ({ brut: m, m: moduleSchema.parse(m.module?.donnees) }))
    .sort((a, b) => a.m.ordre - b.m.ordre);

  for (const { brut: mb, m } of modulesTries) {
    const planModule: PlanModule = { id: m.id, titre: m.titre, url: urlModule(m.id), chapitres: [] };
    for (const cb of mb.chapitres) {
      const c = chapitreSchema.parse(cb.chapitre?.entete);
      if (!STATUTS_PUBLIES.has(c.statut)) continue;

      const corpsLecons = new Map<string, string>();
      const cheminsLecons = new Map<string, string>();
      const leconsParsees = cb.lecons
        .map((f) => {
          const l = leconSchema.parse(f.entete);
          corpsLecons.set(l.id, f.corps);
          cheminsLecons.set(l.id, f.chemin);
          return l;
        })
        .filter((l) => STATUTS_PUBLIES.has(l.statut))
        .sort((a, b) => c.lecons.indexOf(a.id) - c.lecons.indexOf(b.id));

      // Exercices : rattachés à leur leçon pour connaître la section de renvoi.
      const leconDeExercice = new Map<string, string>();
      for (const l of leconsParsees) for (const x of l.exercices) leconDeExercice.set(x, l.id);
      const correctionsChapitre: Record<string, Correction> = {};
      for (const f of cb.exercices) {
        for (const e of exerciceSchema.array().parse(f.donnees)) {
          versionsExercices.set(e.id, e.version);
          enonces.set(e.id, {
            id: e.id,
            type: e.type,
            enonce: e.enonce,
            unite_attendue: e.unite_attendue,
            propositions: e.propositions,
            competences: e.competences,
            securite: false,
            section: leconDeExercice.get(e.id) ?? '',
          });
        }
      }
      for (const f of cb.corrections) {
        for (const k of correctionExerciceSchema.array().parse(f.donnees)) {
          const { renvoi_section, ...reste } = k;
          correctionsChapitre[k.id] = { ...reste, section: renvoi_section };
          const e = enonces.get(k.id);
          if (e) e.section = renvoi_section;
        }
      }
      const questions = cb.banque ? questionSchema.array().parse(cb.banque.donnees) : [];
      for (const q of questions) enonces.set(q.id, { ...q });
      for (const r of cb.reponses ? reponseQuestionSchema.array().parse(cb.reponses.donnees) : []) {
        const { source, ...reste } = r;
        correctionsChapitre[r.id] = { ...reste, section: source };
      }
      corrections.set(c.id, { chapitre: c.id, version: c.version, corrections: correctionsChapitre });

      const tpsChapitre = cb.tp
        .map((f) => ({ tp: tpSchema.parse(f.entete), corps: f.corps, chemin: f.chemin }))
        .filter(({ tp }) => STATUTS_PUBLIES.has(tp.statut) && c.tp.includes(tp.id))
        .sort((a, b) => c.tp.indexOf(a.tp.id) - c.tp.indexOf(b.tp.id));

      const planChapitre: PlanChapitre = {
        id: c.id,
        titre: c.titre,
        module: m.id,
        version: c.version,
        statut: c.statut,
        prerequis: c.prerequis,
        competences: c.competences,
        questions: questions.map((q) => q.id),
        urlQcm: urlQcm(m.id, c.id),
        lecons: leconsParsees.map((l) => ({
          id: l.id,
          titre: l.titre,
          version: l.version,
          url: urlLecon(m.id, c.id, l.id),
          competences: [...new Set(l.objectifs.flatMap((o) => o.competences))],
          exercices: l.exercices,
          sections: Object.fromEntries(titresParAncre(corpsLecons.get(l.id) ?? '')),
        })),
        tp: tpsChapitre.map(({ tp }) => ({
          id: tp.id,
          titre: tp.titre,
          version: tp.version,
          url: urlTp(m.id, c.id, tp.id),
          securite: tp.securite,
          competences: tp.competences,
          livrables: tp.livrables,
        })),
      };
      planModule.chapitres.push(planChapitre);
      chapitres.set(c.id, { chapitre: planChapitre, module: planModule, dossier: cb.dossier });
      for (const [i, t] of tpsChapitre.entries()) {
        tps.set(t.tp.id, { ...t, planTp: planChapitre.tp[i]!, chapitre: planChapitre, module: planModule });
      }
      for (const l of leconsParsees) {
        lecons.set(l.id, { lecon: l, chapitre: planChapitre, module: planModule });
        for (const fig of l.figures) {
          if (!estVectorielle(fig.fichier)) images.set(urlFigure(fig), join(racine, dirname(cheminsLecons.get(l.id)!), fig.fichier));
        }
      }
    }
    planModule.chapitres.sort((a, b) => m.chapitres.indexOf(a.id) - m.chapitres.indexOf(b.id));
    modules.push(planModule);
  }

  const publiees = new Map(modules.flatMap((m) => m.chapitres.map((c) => [c.id, m.url] as const)));
  const semaines = new Map(programme.semaines.map((w) => [w.id, w]));
  cache = {
    plan: {
      programme: {
        version: programme.version,
        domaines: programme.domaines,
        modules: programme.modules.map((m) => ({
          id: m.id,
          titre: m.titre,
          semaines: m.semaines.map((sid) => {
            const w = semaines.get(sid)!;
            return {
              id: w.id,
              titre: w.titre,
              url: publiees.get(w.id) ?? null,
              tp: w.tp,
              ...(w.evaluation ? { evaluation: w.evaluation } : {}),
              ...(w.protocole ? { protocole: w.protocole } : {}),
            };
          }),
        })),
      },
      modules,
      competences: competences.map((k) => ({
        code: k.code,
        intitule: k.intitule,
        niveau_vise: k.niveau_vise,
        enseignee_en: k.enseignee_en,
        jalon: k.jalon,
      })),
      seuils: {
        qcm_reussite: parametres.qcm.seuil_reussite,
        qcm_securite: parametres.qcm.seuil_securite,
        questions_par_tirage: parametres.qcm.questions_par_tirage,
        pratique_reussite: parametres.pratique.seuil_reussite,
      },
    },
    enonces,
    versionsExercices,
    corrections,
    sources,
    lecons,
    chapitres,
    images,
    tps,
    grilles,
  };
  return cache;
}
