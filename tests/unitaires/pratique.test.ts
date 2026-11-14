import { describe, expect, it } from 'vitest';
import { cleCritere, fautesDuModule, noterPratique, type CriterePratique, type SaisiePratique } from '../../src/lib/evaluation/pratique.ts';

const G = (id: string, poids: number, eliminatoire_si?: string): CriterePratique => ({
  id, grille: 'generique', texte: id, poids, sans_objet_possible: false, ...(eliminatoire_si ? { eliminatoire_si } : {}),
});
const generique = [G('preparation', 20, 'Absence de valeur théorique'), G('execution', 30), G('exactitude', 25, 'Écart non expliqué'), G('documentation', 15), G('analyse', 10)];
const fautes = [{ id: 'FE-01', texte: 'Hors poste ESD' }];

function saisieComplete(niveau: 'atteint' | 'partiel' | 'non_atteint' = 'atteint'): SaisiePratique {
  return {
    fautes: { 'FE-01': true },
    criteres: Object.fromEntries(generique.map((c) => [cleCritere(c), { niveau, confirme: true, preuves: ['p1'] }])),
  };
}

describe('évaluation pratique', () => {
  it('tout atteint avec preuves : 100 %, réussi', () => {
    const r = noterPratique(generique, fautes, saisieComplete(), 0.7);
    expect(r.score).toBe(1);
    expect(r.reussi).toBe(true);
    expect(r.eliminations).toEqual([]);
  });

  it('seuil de 70 % : partiel partout (50 %) échoue', () => {
    const r = noterPratique(generique, fautes, saisieComplete('partiel'), 0.7);
    expect(r.score).toBeCloseTo(0.5);
    expect(r.reussi).toBe(false);
  });

  it('70 % pile réussit', () => {
    const s = saisieComplete();
    s.criteres['generique:exactitude']!.niveau = 'non_atteint'; // -25
    s.criteres['generique:analyse']!.niveau = 'partiel'; // -5
    const r = noterPratique(generique, fautes, s, 0.7);
    expect(r.score).toBeCloseTo(0.7);
    expect(r.reussi).toBe(true);
  });

  it('un critère sans preuve vaut 0', () => {
    const s = saisieComplete();
    s.criteres['generique:execution']!.preuves = [];
    const r = noterPratique(generique, fautes, s, 0.7);
    expect(r.score).toBeCloseTo(0.7);
    expect(r.details.find((d) => d.cle === 'generique:execution')!.motif).toMatch(/preuve/);
  });

  it('faute éliminatoire non écartée : note nulle, échec', () => {
    const s = saisieComplete();
    s.fautes['FE-01'] = false;
    const r = noterPratique(generique, fautes, s, 0.7);
    expect(r.reussi).toBe(false);
    expect(r.score).toBe(0);
    expect(r.eliminations[0]).toMatch(/Hors poste ESD/);
  });

  it('condition éliminatoire d\'un critère noté non écartée : échec même à 100 %', () => {
    const s = saisieComplete();
    s.criteres['generique:preparation']!.confirme = false;
    const r = noterPratique(generique, fautes, s, 0.7);
    expect(r.reussi).toBe(false);
    expect(r.eliminations[0]).toMatch(/Absence de valeur théorique/);
  });

  it('critère sans niveau : compté non atteint et signalé', () => {
    const s = saisieComplete();
    delete s.criteres['generique:analyse']!.niveau;
    const r = noterPratique(generique, fautes, s, 0.7);
    expect(r.sansNiveau).toEqual(['generique:analyse']);
    expect(r.score).toBeCloseTo(0.9);
  });

  describe('grille renforcée', () => {
    const R = (id: string, sans_objet_possible = false): CriterePratique => ({
      id, grille: 'renforcee', texte: id, poids: 0, eliminatoire_si: 'Critère non respecté ou sans preuve', sans_objet_possible,
    });
    const criteres = [...generique, R('decharge-mesuree'), R('essais-vehicule', true)];

    it('respecté avec preuve ou sans objet autorisé : réussi', () => {
      const s = saisieComplete();
      s.criteres['renforcee:decharge-mesuree'] = { confirme: true, preuves: ['p2'] };
      s.criteres['renforcee:essais-vehicule'] = { sans_objet: true, preuves: [] };
      expect(noterPratique(criteres, fautes, s, 0.7).reussi).toBe(true);
    });

    it('confirmé sans preuve : éliminatoire', () => {
      const s = saisieComplete();
      s.criteres['renforcee:decharge-mesuree'] = { confirme: true, preuves: [] };
      s.criteres['renforcee:essais-vehicule'] = { sans_objet: true, preuves: [] };
      const r = noterPratique(criteres, fautes, s, 0.7);
      expect(r.reussi).toBe(false);
      expect(r.eliminations.join()).toMatch(/decharge-mesuree/);
    });

    it('« sans objet » refusé quand le critère ne le permet pas', () => {
      const s = saisieComplete();
      s.criteres['renforcee:decharge-mesuree'] = { sans_objet: true, preuves: [] };
      s.criteres['renforcee:essais-vehicule'] = { sans_objet: true, preuves: [] };
      expect(noterPratique(criteres, fautes, s, 0.7).reussi).toBe(false);
    });
  });

  it('fautes applicables : celles de tous les modules plus celles du module', () => {
    const liste = [{ id: 'A', modules: [] }, { id: 'B', modules: ['M1', 'M2'] }, { id: 'C', modules: ['M7'] }];
    expect(fautesDuModule(liste, 'M1').map((f) => f.id)).toEqual(['A', 'B']);
    expect(fautesDuModule(liste, 'M7').map((f) => f.id)).toEqual(['A', 'C']);
  });
});
