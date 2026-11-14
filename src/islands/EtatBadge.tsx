import { LIBELLES_ETAT, type EtatChapitre } from '../lib/progression/calcul.ts';

const CLASSES: Record<EtatChapitre, string> = {
  verrouille: 'neutre',
  disponible: 'info',
  en_cours: 'info',
  a_reprendre: 'alerte',
  a_rejouer: 'erreur',
  qcm_reussi: 'succes',
  valide: 'succes',
};

export function EtatBadge({ etat }: { etat: EtatChapitre }) {
  return <span class={`badge badge--${CLASSES[etat]}`} data-testid="etat-chapitre">{LIBELLES_ETAT[etat]}</span>;
}
