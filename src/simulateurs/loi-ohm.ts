/**
 * Simulateur pédagogique « loi d'Ohm » : modèle idéal (source parfaite, résistance pure,
 * fils et ampèremètre sans résistance). Ce n'est pas une donnée constructeur.
 */

export const HYPOTHESES_LOI_OHM = [
  'Source de tension idéale (résistance interne nulle)',
  'Résistance pure, valeur constante quelle que soit la température',
  'Fils et ampèremètre de résistance nulle',
];

export interface ResultatLoiOhm {
  courant_A: number;
  puissance_W: number;
  /** Rapport puissance dissipée / puissance nominale. */
  charge: number;
}

export function calculerLoiOhm(tension_V: number, resistance_ohm: number, puissanceNominale_W: number): ResultatLoiOhm {
  if (!(resistance_ohm > 0)) throw new RangeError('La résistance doit être strictement positive');
  if (!(puissanceNominale_W > 0)) throw new RangeError('La puissance nominale doit être strictement positive');
  const courant_A = tension_V / resistance_ohm;
  const puissance_W = tension_V * courant_A;
  return { courant_A, puissance_W, charge: puissance_W / puissanceNominale_W };
}

/** Affichage lisible avec préfixe (ex. 0,0227 A → « 22,7 mA »). */
export function formaterGrandeur(valeur: number, unite: string): string {
  const abs = Math.abs(valeur);
  const [facteur, prefixe] = abs >= 1e6 ? [1e6, 'M'] : abs >= 1e3 ? [1e3, 'k'] : abs >= 1 || abs === 0 ? [1, ''] : abs >= 1e-3 ? [1e-3, 'm'] : [1e-6, 'µ'];
  const v = valeur / facteur;
  const texte = v.toLocaleString('fr-FR', { maximumSignificantDigits: 3 });
  return `${texte} ${prefixe}${unite}`;
}
