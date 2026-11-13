/**
 * Types partagés entre la génération du site (build) et le navigateur.
 * Le « plan » ne contient jamais de solution ; les corrections sont servies à part.
 */

export type TypeQuestion = 'calcul' | 'choix_unique' | 'choix_multiple' | 'ordonnancement' | 'lecture_schema';

export interface Proposition {
  id: string;
  texte: string;
}

/** Énoncé d'exercice ou de question, sans solution. */
export interface Enonce {
  id: string;
  type: TypeQuestion;
  enonce: string;
  unite_attendue?: string;
  propositions?: Proposition[];
  competences: string[];
  securite: boolean;
  /** Ancre de la section du cours à relire en cas d'erreur. */
  section: string;
}

export interface PlanLecon {
  id: string;
  titre: string;
  version: string;
  url: string;
  competences: string[];
  exercices: string[];
  /** Titres des sections, indexés par ancre (pour la remédiation). */
  sections: Record<string, string>;
}

export interface PlanChapitre {
  id: string;
  titre: string;
  module: string;
  version: string;
  statut: string;
  prerequis: string[];
  competences: string[];
  lecons: PlanLecon[];
  questions: string[];
  urlQcm: string;
}

export interface PlanModule {
  id: string;
  titre: string;
  url: string;
  chapitres: PlanChapitre[];
}

export interface PlanCompetence {
  code: string;
  intitule: string;
  niveau_vise: string;
  enseignee_en: string[];
  jalon: string | null;
}

export interface Seuils {
  qcm_reussite: number;
  qcm_securite: number;
  questions_par_tirage: number;
}

export interface Plan {
  modules: PlanModule[];
  competences: PlanCompetence[];
  seuils: Seuils;
}

// ---------- Corrections (chargées après soumission) ----------

export interface Correction {
  id: string;
  valeur?: number;
  tolerance_relative?: number;
  unite?: string;
  bonnes?: string[];
  ordre?: string[];
  explication: string;
  pourquoi_faux?: Record<string, string>;
  /** Ancre de la section qui justifie la réponse. */
  section: string;
}

export interface CorrectionsChapitre {
  chapitre: string;
  version: string;
  corrections: Record<string, Correction>;
}

// ---------- Réponses de l'apprenant ----------

export type Reponse =
  | { kind: 'choix'; ids: string[] }
  | { kind: 'numerique'; valeur: string; unite: string }
  | { kind: 'ordre'; ids: string[] };

// ---------- Données de l'apprenant (IndexedDB) ----------

export interface DetailReponse {
  id: string;
  correct: boolean;
  securite: boolean;
  competences: string[];
  section: string;
  reponse: Reponse | null;
}

export interface Tentative {
  id: string;
  type: 'exercice' | 'qcm';
  /** Identifiant de l'exercice, ou du chapitre pour un QCM. */
  ref: string;
  chapitre: string;
  /** Version du contenu au moment de la tentative. */
  version: string;
  date: string;
  score: number;
  reussi: boolean;
  securite_ok: boolean;
  duree_s: number;
  details: DetailReponse[];
}

export interface Evenement {
  id: string;
  type: 'consultation' | 'derogation';
  /** Leçon consultée, ou chapitre concerné par la dérogation. */
  ref: string;
  chapitre: string;
  date: string;
  motif?: string;
}
