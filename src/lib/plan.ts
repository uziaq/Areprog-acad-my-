/**
 * Aides de navigation sur le plan (utilisables dans le navigateur).
 */
import type { Plan, PlanChapitre, PlanLecon } from './types.ts';

export function toutesLesLecons(plan: Plan): PlanLecon[] {
  return plan.modules.flatMap((m) => m.chapitres.flatMap((c) => c.lecons));
}

export function trouverChapitre(plan: Plan, id: string): PlanChapitre | undefined {
  return plan.modules.flatMap((m) => m.chapitres).find((c) => c.id === id);
}

/** « S02-L01#ancre » → URL de la leçon avec l'ancre. */
export function urlSection(plan: Plan, section: string): string | null {
  const [lecon, ancre] = section.split('#');
  const l = toutesLesLecons(plan).find((x) => x.id === lecon);
  if (!l) return null;
  return ancre ? `${l.url}#${ancre}` : l.url;
}

/** Libellé lisible d'une section pour la remédiation : « S02-L01 › la puissance ». */
export function libelleSection(plan: Plan, section: string): string {
  const [lecon, ancre] = section.split('#');
  const l = toutesLesLecons(plan).find((x) => x.id === lecon);
  const titre = l ? l.titre : lecon;
  if (!ancre) return titre ?? section;
  const partie = l?.sections[ancre] ?? decodeURIComponent(ancre).replace(/-+/g, ' ').trim();
  return `${titre} › ${partie}`;
}

export function formaterDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString('fr-FR', { dateStyle: 'medium', timeStyle: 'short' });
}

export function pourcentage(x: number): string {
  return `${Math.round(x * 100)} %`;
}
