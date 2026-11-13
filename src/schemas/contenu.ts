/**
 * Schémas du contenu pédagogique (content/).
 * Source unique : utilisés par le validateur (scripts/valider-contenu.ts),
 * par les tests, et plus tard par les collections Astro.
 * Référence : docs/architecture/03-modele-de-contenu.md
 */
import { config, locales, z } from 'astro/zod';

// Messages d'erreur en français (NF1).
config(locales.fr());

// ---------- Identifiants stables ----------
export const RE_ID = {
  module: /^M\d+$/,
  chapitre: /^S\d{2}$/,
  lecon: /^S\d{2}-L\d{2}$/,
  exercice: /^S\d{2}-L\d{2}-EX\d{2}$/,
  question: /^S\d{2}-Q\d{3}$/,
  tp: /^TP-\d{2,3}$/,
  source: /^SRC-\d{4}$/,
  figure: /^S\d{2}-F\d{2}$/,
  competence: /^D\d+\.\d+$/,
  cas: /^CAS-\d{3}$/,
};

/** Renvoi vers une section de leçon : « S02-L01#ancre ». */
export const RE_SECTION = /^(S\d{2}-L\d{2})(?:#(\S+))?$/;
const renvoiSection = z.string().regex(RE_SECTION, { message: 'renvoi de section au format S02-L01#ancre attendu' });

const id = (re: RegExp, nom: string) =>
  z.string().regex(re, { message: `identifiant de ${nom} invalide (format attendu : ${re.source})` });

/** Version « majeur.mineur », écrite entre guillemets en YAML. */
export const version = z
  .string({ message: 'version : écrire la valeur entre guillemets, par exemple "0.1"' })
  .regex(/^\d+\.\d+$/, { message: 'version au format "majeur.mineur" attendue' });

/** Date AAAA-MM-JJ (YAML peut la livrer en texte ou en objet Date). */
export const dateIso = z.union([
  z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'date au format AAAA-MM-JJ attendue' }),
  z.date().transform((d) => d.toISOString().slice(0, 10)),
]);

export const statut = z.enum(['brouillon', 'relu', 'valide', 'retire']);
export type Statut = z.infer<typeof statut>;

const historique = z
  .array(z.strictObject({ version, date: dateIso, resume: z.string().min(1) }))
  .min(1, { message: 'historique : au moins une entrée' });

// ---------- Module ----------
export const moduleSchema = z.strictObject({
  id: id(RE_ID.module, 'module'),
  titre: z.string().min(1),
  ordre: z.number().int().nonnegative(),
  chapitres: z.array(id(RE_ID.chapitre, 'chapitre')).min(1),
});

// ---------- Chapitre (= une semaine, gabarit en 12 rubriques) ----------
export const chapitreSchema = z.strictObject({
  id: id(RE_ID.chapitre, 'chapitre'),
  titre: z.string().min(1),
  module: id(RE_ID.module, 'module'),
  duree_h: z.number().positive(),
  competences: z.array(id(RE_ID.competence, 'compétence')).min(1),
  prerequis: z.array(id(RE_ID.chapitre, 'chapitre')),
  lecons: z.array(id(RE_ID.lecon, 'leçon')).min(1),
  tp: z.array(z.string()),
  sources: z.array(id(RE_ID.source, 'source')),
  version,
  statut,
  derniere_verification_sources: dateIso,
  historique,
});

// ---------- Leçon ----------
export const figureSchema = z.strictObject({
  id: id(RE_ID.figure, 'figure'),
  /** Schéma vectoriel (.svg, intégré à la page) ou image (.webp, .jpg, .png, servie à part). */
  fichier: z.string().regex(/\.(svg|webp|jpe?g|png)$/i, { message: 'figure : fichier .svg, .webp, .jpg ou .png attendu' }),
  legende: z.string().min(1, { message: 'figure sans légende' }),
  alt: z.string().min(1, { message: 'figure sans texte alternatif' }),
  /**
   * « areprog » = figure ou photo réalisée par AREPROG ;
   * « illustration-generee » = image générée (IA), affichée avec une mention qui interdit
   * de la prendre pour un matériel réel ou une donnée constructeur ;
   * sinon identifiant de fiche source (photo sous licence, avec crédit).
   */
  origine: z.union([z.literal('areprog'), z.literal('illustration-generee'), id(RE_ID.source, 'source')], {
    message: 'origine de figure obligatoire : "areprog", "illustration-generee" ou un identifiant SRC-xxxx',
  }),
});

export const leconSchema = z.strictObject({
  id: id(RE_ID.lecon, 'leçon'),
  titre: z.string().min(1),
  chapitre: id(RE_ID.chapitre, 'chapitre'),
  version,
  statut,
  duree_min: z.number().int().positive(),
  objectifs: z
    .array(
      z.strictObject({
        id: z.string().regex(/^O\d+$/),
        texte: z.string().min(1),
        competences: z.array(id(RE_ID.competence, 'compétence')).min(1),
      }),
    )
    .min(1),
  prerequis: z.array(z.union([id(RE_ID.chapitre, 'chapitre'), id(RE_ID.lecon, 'leçon')])),
  exercices: z.array(id(RE_ID.exercice, 'exercice')),
  references: z.array(id(RE_ID.source, 'source')),
  criteres_evaluation: z
    .array(z.strictObject({ objectif: z.string().regex(/^O\d+$/), critere: z.string().min(1) }))
    .min(1),
  figures: z.array(figureSchema).default([]),
  derniere_verification_sources: dateIso,
  historique,
});

// ---------- Exercices (énoncés, SANS solution) ----------
export const typeExercice = z.enum([
  'calcul',
  'choix_unique',
  'choix_multiple',
  'ordonnancement',
  'lecture_schema',
]);

/** Clés qui révéleraient la solution : interdites dans les fichiers affichés. */
export const CLES_SOLUTION = ['valeur', 'bonne', 'bonnes', 'solution', 'reponse', 'explication', 'pourquoi_faux'];

export const exerciceSchema = z.strictObject({
  id: id(RE_ID.exercice, 'exercice'),
  version,
  type: typeExercice,
  enonce: z.string().min(1),
  unite_attendue: z.string().optional(),
  propositions: z.array(z.strictObject({ id: z.string(), texte: z.string() })).optional(),
  competences: z.array(id(RE_ID.competence, 'compétence')).min(1),
  objectif: z.string().regex(/^O\d+$/),
});

export const correctionExerciceSchema = z.strictObject({
  id: id(RE_ID.exercice, 'exercice'),
  valeur: z.number().optional(),
  tolerance_relative: z.number().positive().max(0.5).optional(),
  unite: z.string().optional(),
  bonnes: z.array(z.string()).optional(),
  ordre: z.array(z.string()).optional(),
  explication: z.string().min(1, { message: 'correction sans explication' }),
  renvoi_section: renvoiSection,
});

// ---------- QCM ----------
export const questionSchema = z.strictObject({
  id: id(RE_ID.question, 'question'),
  type: typeExercice,
  securite: z.boolean(),
  competences: z.array(id(RE_ID.competence, 'compétence')).min(1),
  section: renvoiSection,
  enonce: z.string().min(1),
  unite_attendue: z.string().optional(),
  propositions: z.array(z.strictObject({ id: z.string(), texte: z.string() })).optional(),
});

export const reponseQuestionSchema = z.strictObject({
  id: id(RE_ID.question, 'question'),
  bonnes: z.array(z.string()).optional(),
  valeur: z.number().optional(),
  tolerance_relative: z.number().positive().max(0.5).optional(),
  unite: z.string().optional(),
  ordre: z.array(z.string()).optional(),
  explication: z.string().min(1),
  pourquoi_faux: z.record(z.string(), z.string()).optional(),
  /** Section du cours (S02-L01#ancre) ou fiche source (SRC-0001 …). */
  source: z.union([renvoiSection, z.string().regex(/^SRC-\d{4}/)]),
});

// ---------- Travaux pratiques ----------
export const tpSchema = z.strictObject({
  id: id(RE_ID.tp, 'TP'),
  titre: z.string().min(1),
  chapitre: id(RE_ID.chapitre, 'chapitre'),
  version,
  statut,
  support: z.enum(['carte_entrainement', 'calculateur_recuperation', 'banc', 'vehicule']),
  securite: z.enum(['standard', 'renforcee']),
  domaines_risque: z.array(z.enum(['airbag', 'abs-esp', 'direction'])).default([]),
  competences: z.array(id(RE_ID.competence, 'compétence')).min(1),
});

// ---------- Fiche source (bibliothèque) ----------
export const sourceSchema = z.strictObject({
  id: id(RE_ID.source, 'source'),
  titre: z.string().min(1),
  editeur: z.string().min(1),
  reference: z.string().min(1),
  revision: z.string().min(1, { message: 'révision obligatoire (écrire "non indiquée" si la source n\'en a pas)' }),
  date_consultation: dateIso,
  type: z.enum(['datasheet', 'norme', 'ouvrage', 'notice', 'site', 'cours']),
  licence: z.enum(['lien_seulement', 'extrait_autorise', 'libre']),
  lien: z.url().optional(),
  fichier_local: z.string().nullable().default(null),
});

// ---------- Référentiel de compétences ----------
export const competenceSchema = z.strictObject({
  code: id(RE_ID.competence, 'compétence'),
  intitule: z.string().min(1),
  domaine: z.string().regex(/^D\d+$/),
  niveau_vise: z.enum(['N1', 'N2', 'N3', 'N4']),
  enseignee_en: z.array(id(RE_ID.chapitre, 'chapitre')).min(1),
  /** Jalon qui vérifie la compétence ; le niveau visé n'est atteint qu'après lui. */
  jalon: id(RE_ID.chapitre, 'chapitre').nullable(),
});

/** Simulateurs pédagogiques utilisables par la directive ::simulateur{id=…}. */
export const SIMULATEURS_DISPONIBLES = ['loi-ohm'];

// ---------- Paramètres d'évaluation ----------
export const parametresSchema = z.strictObject({
  qcm: z.strictObject({
    seuil_reussite: z.number().min(0).max(1),
    seuil_securite: z.number().min(0).max(1),
    questions_par_tirage: z.number().int().positive(),
    taille_min_banque: z.number().int().positive(),
  }),
  pratique: z.strictObject({ seuil_reussite: z.number().min(0).max(1) }),
  evaluation_finale: z.strictObject({ seuil_reussite: z.number().min(0).max(1) }),
  heures_par_semaine: z.number().positive(),
  sources: z.strictObject({ delai_reverification_mois: z.number().int().positive() }),
});
