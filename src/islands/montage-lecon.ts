/**
 * Monte les composants interactifs aux emplacements laissés par les directives
 * ::exercice{id=…} et ::simulateur{id=…}, et note la consultation de la leçon.
 */
import { h, render, type VNode } from 'preact';
import { enregistrerEvenement } from '../lib/stockage/db.ts';
import Exercice, { type PropsExercice } from './Exercice.tsx';
import SimulateurLoiOhm from './SimulateurLoiOhm.tsx';

interface DonneesLecon {
  lecon: string;
  chapitre: string;
  exercices: Record<string, Omit<PropsExercice, 'numero'>>;
}

const SIMULATEURS: Record<string, () => VNode> = {
  'loi-ohm': () => h(SimulateurLoiOhm, {}),
};

export function monterLecon(): void {
  const brut = document.getElementById('donnees-lecon')?.textContent;
  if (!brut) return;
  const d = JSON.parse(brut) as DonneesLecon;
  let numero = 0;
  for (const hote of document.querySelectorAll<HTMLElement>('[data-exercice]')) {
    const props = d.exercices[hote.dataset.exercice!];
    if (props) render(h(Exercice, { ...props, numero: ++numero }), hote);
  }
  for (const hote of document.querySelectorAll<HTMLElement>('[data-simulateur]')) {
    const fabrique = SIMULATEURS[hote.dataset.simulateur!];
    if (fabrique) render(fabrique(), hote);
  }
  // Une seule consultation par leçon (mise à jour de la date à chaque visite).
  enregistrerEvenement({
    id: `consultation-${d.lecon}`,
    type: 'consultation',
    ref: d.lecon,
    chapitre: d.chapitre,
    date: new Date().toISOString(),
  }).catch(() => {});
}
