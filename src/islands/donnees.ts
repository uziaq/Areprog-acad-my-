/**
 * Accès réactif aux données apprenant pour les composants Preact.
 */
import { useEffect, useState } from 'preact/hooks';
import { listerEvenements, listerTentatives } from '../lib/stockage/db.ts';
import type { Evenement, Tentative } from '../lib/types.ts';

export interface Donnees {
  pret: boolean;
  erreur: string | null;
  tentatives: Tentative[];
  evenements: Evenement[];
}

export function useDonnees(): Donnees {
  const [etat, setEtat] = useState<Donnees>({ pret: false, erreur: null, tentatives: [], evenements: [] });
  useEffect(() => {
    let actif = true;
    const charger = () =>
      Promise.all([listerTentatives(), listerEvenements()])
        .then(([tentatives, evenements]) => actif && setEtat({ pret: true, erreur: null, tentatives, evenements }))
        .catch(() =>
          actif &&
          setEtat({ pret: true, erreur: 'Stockage local indisponible sur ce navigateur (navigation privée ?) : les résultats ne seront pas conservés.', tentatives: [], evenements: [] }),
        );
    charger();
    window.addEventListener('areprog:donnees', charger);
    return () => {
      actif = false;
      window.removeEventListener('areprog:donnees', charger);
    };
  }, []);
  return etat;
}
