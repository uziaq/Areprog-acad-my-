/**
 * Progression : état des chapitres (F1, F2) et des compétences (F3).
 * Fonctions pures, recalculées à partir du journal des tentatives et des événements.
 * Règle (docs/pedagogie/04-evaluation.md) : une compétence n'atteint le niveau visé que lorsque
 * la semaine qui l'enseigne ET le jalon qui la vérifie sont validés.
 */
import type { Evenement, Plan, PlanChapitre, Tentative } from '../types.ts';

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
  /** La validation complète exige aussi l'évaluation pratique (pas encore disponible). */
  pratiqueRequise: boolean;
}

const parDate = (a: { date: string }, b: { date: string }) => a.date.localeCompare(b.date);

export function chapitresDuPlan(plan: Plan): PlanChapitre[] {
  return plan.modules.flatMap((m) => m.chapitres);
}

/** Un chapitre est validé quand son QCM est réussi ET son évaluation pratique validée. */
export function chapitreValide(_chapitre: string, _tentatives: Tentative[]): boolean {
  // L'évaluation pratique (lot L2 / L3) n'existe pas encore : aucun chapitre ne peut être « validé ».
  return false;
}

export function syntheseChapitre(
  chapitre: PlanChapitre,
  plan: Plan,
  tentatives: Tentative[],
  evenements: Evenement[],
): SyntheseChapitre {
  const existants = new Set(chapitresDuPlan(plan).map((c) => c.id));
  const prerequisAbsents = chapitre.prerequis.filter((p) => !existants.has(p));
  const prerequisBloquants = chapitre.prerequis.filter((p) => existants.has(p) && !chapitreValide(p, tentatives));
  const derogation =
    evenements.filter((e) => e.type === 'derogation' && e.chapitre === chapitre.id).sort(parDate).at(-1) ?? null;

  const qcm = tentatives.filter((t) => t.type === 'qcm' && t.chapitre === chapitre.id).sort(parDate);
  const dernierQcm = qcm.at(-1) ?? null;
  const activite =
    tentatives.some((t) => t.chapitre === chapitre.id) ||
    evenements.some((e) => e.type === 'consultation' && e.chapitre === chapitre.id);

  let etat: EtatChapitre;
  if (prerequisBloquants.length && !derogation) etat = 'verrouille';
  else if (chapitreValide(chapitre.id, tentatives)) etat = 'valide';
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
    pratiqueRequise: true,
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
    const pratique = false; // évaluation pratique : lot ultérieur
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
