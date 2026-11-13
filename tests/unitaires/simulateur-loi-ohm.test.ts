import { describe, expect, it } from 'vitest';
import { calculerLoiOhm, formaterGrandeur } from '../../src/simulateurs/loi-ohm.ts';

describe('simulateur loi d\'Ohm (modèle idéal)', () => {
  it('calcule courant, puissance et taux de charge', () => {
    const r = calculerLoiOhm(5, 220, 0.25);
    expect(r.courant_A).toBeCloseTo(0.022727, 5);
    expect(r.puissance_W).toBeCloseTo(0.113636, 5);
    expect(r.charge).toBeCloseTo(0.4545, 3);
  });
  it('refuse une résistance nulle ou négative', () => {
    expect(() => calculerLoiOhm(5, 0, 0.25)).toThrow(RangeError);
  });
  it('affiche avec le bon préfixe', () => {
    expect(formaterGrandeur(0.0227, 'A')).toBe('22,7 mA');
    expect(formaterGrandeur(2500, 'Ω')).toBe('2,5 kΩ');
    expect(formaterGrandeur(1.44, 'W')).toBe('1,44 W');
  });
});
