import { describe, expect, it } from 'vitest';
import { noterNumerique, noterQcm, noterReponse, tirer } from '../../src/lib/evaluation/notation.ts';
import { convertir, lireNombre, lireUnite, unitesProposees } from '../../src/lib/evaluation/unites.ts';
import type { Correction, Enonce } from '../../src/lib/types.ts';

const corr = (c: Partial<Correction>): Correction => ({ id: 'X', explication: 'e', section: 's', ...c });

describe('unités et saisie', () => {
  it('lit les préfixes', () => {
    expect(lireUnite('mA')).toMatchObject({ base: 'A', facteur: 1e-3 });
    expect(lireUnite('kΩ')).toMatchObject({ base: 'Ω', facteur: 1e3 });
    expect(lireUnite('µA')?.facteur).toBe(1e-6);
    expect(lireUnite('uA')?.facteur).toBe(1e-6);
    expect(lireUnite('ohm')?.base).toBe('Ω');
    expect(lireUnite('mX')).toBeNull();
  });
  it('lit un nombre à la française', () => {
    expect(lireNombre('25,5')).toBe(25.5);
    expect(lireNombre('1 500')).toBe(1500);
    expect(lireNombre('abc')).toBeNull();
    expect(lireNombre('')).toBeNull();
  });
  it('convertit entre préfixes, refuse les grandeurs différentes', () => {
    expect(convertir(0.0255, 'A', 'mA')).toBeCloseTo(25.5);
    expect(convertir(2500, 'Ω', 'kΩ')).toBeCloseTo(2.5);
    expect(convertir(1, 'V', 'A')).toBeNull();
  });
  it('propose les unités de la même grandeur', () => {
    expect(unitesProposees('mA')).toEqual(['µA', 'mA', 'A']);
  });
});

describe('notation numérique avec tolérance', () => {
  const c = corr({ valeur: 25.5, tolerance_relative: 0.02, unite: 'mA' });
  it('accepte la bonne valeur dans une autre unité', () => {
    expect(noterNumerique('0,0255', 'A', c).statut).toBe('correct');
    expect(noterNumerique('25,53', 'mA', c).statut).toBe('correct');
  });
  it('accepte la limite de tolérance et refuse au-delà', () => {
    expect(noterNumerique('26,01', 'mA', c).statut).toBe('correct'); // +2 %
    expect(noterNumerique('26,1', 'mA', c).statut).toBe('incorrect');
  });
  it('refuse l\'erreur de préfixe', () => {
    expect(noterNumerique('25,5', 'A', c).statut).toBe('incorrect');
  });
  it('signale une saisie illisible ou une unité incompatible', () => {
    expect(noterNumerique('vingt', 'mA', c).statut).toBe('invalide');
    expect(noterNumerique('25', 'V', c).statut).toBe('invalide');
  });
});

describe('choix et ordre', () => {
  it('choix multiple : tout ou rien', () => {
    const c = corr({ bonnes: ['a', 'b', 'c'] });
    expect(noterReponse({ kind: 'choix', ids: ['c', 'a', 'b'] }, c).statut).toBe('correct');
    expect(noterReponse({ kind: 'choix', ids: ['a', 'b'] }, c).statut).toBe('incorrect');
    expect(noterReponse({ kind: 'choix', ids: ['a', 'b', 'c', 'd'] }, c).statut).toBe('incorrect');
  });
  it('ordonnancement exact', () => {
    const c = corr({ ordre: ['b', 'a', 'c'] });
    expect(noterReponse({ kind: 'ordre', ids: ['b', 'a', 'c'] }, c).statut).toBe('correct');
    expect(noterReponse({ kind: 'ordre', ids: ['a', 'b', 'c'] }, c).statut).toBe('incorrect');
  });
  it('absence de réponse = incorrect', () => {
    expect(noterReponse(null, corr({ bonnes: ['a'] })).statut).toBe('incorrect');
  });
});

describe('QCM : seuil et règle sécurité', () => {
  const q = (id: string, securite = false, section = `s-${id}`): Enonce => ({
    id, type: 'choix_unique', enonce: id, competences: ['D2.2'], securite, section,
    propositions: [{ id: 'a', texte: 'a' }, { id: 'b', texte: 'b' }],
  });
  const enonces = [q('1'), q('2'), q('3'), q('4'), q('5', true)];
  const corrections = Object.fromEntries(enonces.map((e) => [e.id, corr({ id: e.id, bonnes: ['a'], section: e.section })]));
  const seuils = { qcm_reussite: 0.8, qcm_securite: 1 };
  const rep = (faux: string[]) =>
    Object.fromEntries(enonces.map((e) => [e.id, { kind: 'choix' as const, ids: [faux.includes(e.id) ? 'b' : 'a'] }]));

  it('80 % avec la sécurité juste : réussi', () => {
    const r = noterQcm(enonces, rep(['1']), corrections, seuils);
    expect(r.score).toBeCloseTo(0.8);
    expect(r.reussi).toBe(true);
  });
  it('80 % mais une erreur sécurité : échoué', () => {
    const r = noterQcm(enonces, rep(['5']), corrections, seuils);
    expect(r.score).toBeCloseTo(0.8);
    expect(r.securite_ok).toBe(false);
    expect(r.reussi).toBe(false);
  });
  it('60 % : échoué, remédiation sur les sections ratées sans doublon', () => {
    const r = noterQcm(enonces, rep(['1', '2']), corrections, seuils);
    expect(r.reussi).toBe(false);
    expect(r.remediation).toEqual(['s-1', 's-2']);
  });
  it('question sans réponse comptée fausse', () => {
    const r = noterQcm(enonces, {}, corrections, seuils);
    expect(r.score).toBe(0);
  });
});

describe('tirage', () => {
  it('reproductible, sans doublon, limité à n', () => {
    const ids = Array.from({ length: 40 }, (_, i) => `Q${i}`);
    const a = tirer(ids, 20, 42);
    expect(a).toEqual(tirer(ids, 20, 42));
    expect(new Set(a).size).toBe(20);
    expect(tirer(ids.slice(0, 5), 20, 1)).toHaveLength(5);
  });
});
