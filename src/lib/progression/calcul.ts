/**
 * Progression : état des chapitres (F1, F2) et des compétences (F3).
 * Fonctions pures, recalculées à partir du journal des tentatives et des événements.
 * Règle (docs/pedagogie/04-evaluation.md) : une compétence n'atteint le niveau visé que lorsque
 * la semaine qui l'enseigne ET le jalon qui la vérifie sont validés.
 */
import type { Evenement, Plan, PlanChapitre, PlanTp, Tentative } from '../types.ts';

export type EtatChapitre = 'verrouille' | 'disponible' | 'en_cours' | 'a_reprendre' | 'a_rejouer' | 'qcm_reussi' | 'valide';

export const LIBELLES_ETAT: Record<EtatChapitre, string> = {
  verrouille: 'Verrouillé',
  disponible: 'Disponible',
  en_cours: 'En cours',
  a_reprendre: 'À reprendre',
  a_rejouer: 'Semaine à rejouer',
  qcm_reussi: 'QCM réussi',
  valide: 'Validé',
};

export interface SyntheseChapitre {
  etat: EtatChapitre;
  /** Prérequis non validés qui verrouillent le chapitre. */
  prerequisBloquants: string[];
  /** Prérequis cités mais absents du contenu publié (hors prototype). */
  prerequisAbsents: string[];
  derogation: Evenement | null;
  dernierQcm: Tentative | null;
  nbTentativesQcm: number;
  /** TP notés du chapitre dont la dernière évaluation pratique n'est pas réussie (ou absente). */
  tpRestants: PlanTp[];
  /** Le chapitre n'a encore aucun TP publié : il ne peut pas être validé. */
  pratiqueIndisponible: boolean;
}

const parDate = (a: { date: string }, b: { date: string }) => a.date.localeCompare(b.date);

export function chapitresDuPlan(plan: Plan): PlanChapitre[] {
  return plan.modules.flatMap((m) => m.chapitres);
}

const derniere = (tentatives: Tentative[], type: Tentative['type'], ref: string) =>
  tentatives.filter((t) => t.type === type && t.ref === ref).sort(parDate).at(-1) ?? null;

/** TP du chapitre dont la dernière évaluation pratique n'est pas réussie. */
export function tpNonValides(chapitre: PlanChapitre, tentatives: Tentative[]): PlanTp[] {
  return chapitre.tp.filter((tp) => !derniere(tentatives, 'pratique', tp.id)?.reussi);
}

/**
 * Un chapitre est validé quand son dernier QCM est réussi ET la dernière évaluation pratique de
 * chacun de ses TP est réussie (docs/pedagogie/04-evaluation.md). Sans TP publié, la partie
 * pratique ne peut pas être évaluée : le chapitre n'est pas validé.
 */
export function chapitreValide(chapitre: PlanChapitre, tentatives: Tentative[]): boolean {
  if (chapitre.tp.length === 0) return false;
  return !!derniere(tentatives, 'qcm', chapitre.id)?.reussi && tpNonValides(chapitre, tentatives).length === 0;
}

export function syntheseChapitre(
  chapitre: PlanChapitre,
  plan: Plan,
  tentatives: Tentative[],
  evenements: Evenement[],
): SyntheseChapitre {
  const existants = new Map(chapitresDuPlan(plan).map((c) => [c.id, c]));
  const prerequisAbsents = chapitre.prerequis.filter((p) => !existants.has(p));
  const prerequisBloquants = chapitre.prerequis.filter((p) => existants.has(p) && !chapitreValide(existants.get(p)!, tentatives));
  const derogation =
    evenements.filter((e) => e.type === 'derogation' && e.chapitre === chapitre.id).sort(parDate).at(-1) ?? null;

  const qcm = tentatives.filter((t) => t.type === 'qcm' && t.ref === chapitre.id).sort(parDate);
  const dernierQcm = qcm.at(-1) ?? null;
  const activite =
    tentatives.some((t) => t.chapitre === chapitre.id) ||
    evenements.some((e) => e.type === 'consultation' && e.chapitre === chapitre.id);

  let etat: EtatChapitre;
  if (prerequisBloquants.length && !derogation) etat = 'verrouille';
  else if (chapitreValide(chapitre, tentatives)) etat = 'valide';
  else if (dernierQcm?.reussi) etat = 'qcm_reussi';
  else if (qcm.length >= 2 && !qcm.at(-1)!.reussi && !qcm.at(-2)!.reussi) etat = 'a_rejouer';
  else if (dernierQcm) etat = 'a_reprendre';
  else if (activite) etat = 'en_cours';
  else etat = 'disponible';

  return {
    etat,
    prerequisBloquants,
    prerequisAbsents,
    derogation,
    dernierQcm,
    nbTentativesQcm: qcm.length,
    tpRestants: tpNonValides(chapitre, tentatives),
    pratiqueIndisponible: chapitre.tp.length === 0,
  };
}

// ---------- Compétences ----------

export interface EtapesCompetence {
  enseignee: boolean;
  exercee: boolean;
  qcm: boolean;
  pratique: boolean;
  jalon: boolean;
}

export interface ProgressionCompetence {
  code: string;
  intitule: string;
  niveauVise: string;
  jalon: string | null;
  etapes: EtapesCompetence;
  /** Nombre d'étapes franchies sur 5. */
  franchies: number;
  /** Libellé honnête : le niveau visé n'est affiché qu'après le jalon. */
  libelle: string;
  /** Compétence non encore abordée dans le contenu publié. */
  horsContenu: boolean;
}

export function progressionCompetences(plan: Plan, tentatives: Tentative[], evenements: Evenement[], seuil: number): ProgressionCompetence[] {
  const lecons = chapitresDuPlan(plan).flatMap((c) => c.lecons);
  const consultees = new Set(evenements.filter((e) => e.type === 'consultation').map((e) => e.ref));
  const competencesPubliees = new Set(chapitresDuPlan(plan).flatMap((c) => c.competences));
  const tpParId = new Map(chapitresDuPlan(plan).flatMap((c) => c.tp).map((tp) => [tp.id, tp]));

  return plan.competences.map((comp) => {
    const enseignee = lecons.some((l) => l.competences.includes(comp.code) && consultees.has(l.id));
    const exercee = tentatives.some(
      (t) => t.type === 'exercice' && t.details.some((d) => d.correct && d.competences.includes(comp.code)),
    );
    const qcm = tentatives.some((t) => {
      if (t.type !== 'qcm' || !t.reussi) return false;
      const concernees = t.details.filter((d) => d.competences.includes(comp.code));
      return concernees.length > 0 && concernees.filter((d) => d.correct).length / concernees.length >= seuil - 1e-9;
    });
    // Pratique : une évaluation pratique réussie d'un TP qui exerce la compétence.
    const pratique = tentatives.some((t) => t.type === 'pratique' && t.reussi && tpParId.get(t.ref)?.competences.includes(comp.code));
    const jalon = false; // jalon (S14…) : lot ultérieur
    const etapes = { enseignee, exercee, qcm, pratique, jalon };
    const franchies = Object.values(etapes).filter(Boolean).length;
    let libelle: string;
    if (jalon && pratique) libelle = `Niveau ${comp.niveau_vise} atteint`;
    else if (franchies === 0) libelle = 'Non commencée';
    else libelle = `En cours d'acquisition (niveau ${comp.niveau_vise} visé${comp.jalon ? `, vérifié au jalon ${comp.jalon}` : ''})`;
    return {
      code: comp.code,
      intitule: comp.intitule,
      niveauVise: comp.niveau_vise,
      jalon: comp.jalon,
      etapes,
      franchies,
      libelle,
      horsContenu: !competencesPubliees.has(comp.code),
    };
  });
}
