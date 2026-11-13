/**
 * Notation des exercices et des QCM (exigences F13, F14, F16).
 */
import type { Correction, DetailReponse, Enonce, Reponse, Seuils } from '../types.ts';
import { convertir, lireNombre } from './unites.ts';

export type Verdict =
  | { statut: 'correct' }
  | { statut: 'incorrect' }
  | { statut: 'invalide'; message: string };

export function noterNumerique(saisie: string, unite: string, c: Correction): Verdict {
  if (c.valeur === undefined || !c.unite) return { statut: 'invalide', message: 'Correction incomplète' };
  const n = lireNombre(saisie);
  if (n === null) return { statut: 'invalide', message: 'Saisissez un nombre, par exemple 25,5' };
  const v = convertir(n, unite, c.unite);
  if (v === null) return { statut: 'invalide', message: `Unité incompatible avec la grandeur attendue (${c.unite})` };
  const tol = c.tolerance_relative ?? 0.01;
  const ecart = c.valeur === 0 ? Math.abs(v) : Math.abs(v - c.valeur) / Math.abs(c.valeur);
  return ecart <= tol + 1e-12 ? { statut: 'correct' } : { statut: 'incorrect' };
}

function memesElements(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false;
  const s = new Set(a);
  return b.every((x) => s.has(x));
}

export function noterReponse(reponse: Reponse | null, c: Correction): Verdict {
  if (!reponse) return { statut: 'incorrect' };
  switch (reponse.kind) {
    case 'numerique':
      return noterNumerique(reponse.valeur, reponse.unite, c);
    case 'choix':
      if (!c.bonnes) return { statut: 'invalide', message: 'Correction incomplète' };
      return memesElements(reponse.ids, c.bonnes) ? { statut: 'correct' } : { statut: 'incorrect' };
    case 'ordre':
      if (!c.ordre) return { statut: 'invalide', message: 'Correction incomplète' };
      return reponse.ids.length === c.ordre.length && reponse.ids.every((x, i) => x === c.ordre![i])
        ? { statut: 'correct' }
        : { statut: 'incorrect' };
  }
}

export interface ResultatQcm {
  score: number;
  reussi: boolean;
  securite_ok: boolean;
  details: DetailReponse[];
  /** Sections à relire, dans l'ordre des questions ratées, sans doublon. */
  remediation: string[];
}

/**
 * Réussite = score ≥ seuil de réussite ET score sur les questions sécurité ≥ seuil sécurité
 * (100 % par défaut : une seule erreur sécurité fait échouer le QCM).
 */
export function noterQcm(
  enonces: Enonce[],
  reponses: Record<string, Reponse | null>,
  corrections: Record<string, Correction>,
  seuils: Pick<Seuils, 'qcm_reussite' | 'qcm_securite'>,
): ResultatQcm {
  const details: DetailReponse[] = enonces.map((e) => {
    const c = corrections[e.id];
    const r = reponses[e.id] ?? null;
    const correct = c ? noterReponse(r, c).statut === 'correct' : false;
    return { id: e.id, correct, securite: e.securite, competences: e.competences, section: e.section, reponse: r };
  });
  const total = details.length;
  const justes = details.filter((d) => d.correct).length;
  const score = total ? justes / total : 0;
  const secu = details.filter((d) => d.securite);
  const scoreSecu = secu.length ? secu.filter((d) => d.correct).length / secu.length : 1;
  const securite_ok = scoreSecu >= seuils.qcm_securite - 1e-9;
  const reussi = score >= seuils.qcm_reussite - 1e-9 && securite_ok;
  const remediation = [...new Set(details.filter((d) => !d.correct).map((d) => d.section))];
  return { score, reussi, securite_ok, details, remediation };
}

/** Générateur pseudo-aléatoire déterministe (pour des tirages reproductibles en test). */
function mulberry32(graine: number): () => number {
  let a = graine >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Tire n éléments distincts (mélange de Fisher-Yates). */
export function tirer<T>(elements: T[], n: number, graine: number): T[] {
  const alea = mulberry32(graine);
  const copie = [...elements];
  for (let i = copie.length - 1; i > 0; i--) {
    const j = Math.floor(alea() * (i + 1));
    [copie[i], copie[j]] = [copie[j]!, copie[i]!];
  }
  return copie.slice(0, Math.min(n, copie.length));
}
