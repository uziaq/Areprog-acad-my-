import { describe, expect, it } from 'vitest';
import { progressionCompetences, syntheseChapitre } from '../../src/lib/progression/calcul.ts';
import type { Evenement, Plan, Tentative } from '../../src/lib/types.ts';

const plan: Plan = {
  seuils: { qcm_reussite: 0.8, qcm_securite: 1, questions_par_tirage: 20 },
  competences: [
    { code: 'D2.1', intitule: 'Préfixes', niveau_vise: 'N3', enseignee_en: ['S02'], jalon: 'S14' },
    { code: 'D2.2', intitule: 'Loi d\'Ohm', niveau_vise: 'N3', enseignee_en: ['S02'], jalon: 'S14' },
    { code: 'D2.3', intitule: 'Kirchhoff', niveau_vise: 'N3', enseignee_en: ['S03'], jalon: 'S14' },
  ],
  modules: [{
    id: 'M1', titre: 'M1', url: '/m1/',
    chapitres: [{
      id: 'S02', titre: 'S02', module: 'M1', version: '0.1', statut: 'brouillon', prerequis: ['S01'],
      competences: ['D2.1', 'D2.2'], questions: ['S02-Q001'], urlQcm: '/qcm/',
      lecons: [{ id: 'S02-L01', titre: 'L01', version: '0.1', url: '/l01/', competences: ['D2.1', 'D2.2'], exercices: ['S02-L01-EX01'], sections: {} }],
    }],
  }],
};
const chap = plan.modules[0]!.chapitres[0]!;

let n = 0;
const qcm = (reussi: boolean, date: string, correctD22 = true): Tentative => ({
  id: `t${n++}`, type: 'qcm', ref: 'S02', chapitre: 'S02', version: '0.1', date, score: reussi ? 0.9 : 0.5, reussi,
  securite_ok: true, duree_s: 60,
  details: [{ id: 'S02-Q001', correct: correctD22, securite: false, competences: ['D2.2'], section: 's', reponse: null }],
});
const exo = (correct: boolean): Tentative => ({
  id: `t${n++}`, type: 'exercice', ref: 'S02-L01-EX01', chapitre: 'S02', version: '0.1', date: '2026-11-13T10:00:00Z',
  score: correct ? 1 : 0, reussi: correct, securite_ok: true, duree_s: 10,
  details: [{ id: 'S02-L01-EX01', correct, securite: false, competences: ['D2.1'], section: 's', reponse: null }],
});
const consult: Evenement = { id: 'e1', type: 'consultation', ref: 'S02-L01', chapitre: 'S02', date: '2026-11-13T09:00:00Z' };

describe('état du chapitre', () => {
  it('prérequis absent du contenu publié : ne verrouille pas, mais est signalé', () => {
    const s = syntheseChapitre(chap, plan, [], []);
    expect(s.etat).toBe('disponible');
    expect(s.prerequisAbsents).toEqual(['S01']);
  });
  it('prérequis publié non validé : verrouillé, sauf dérogation tracée', () => {
    const avecS01: Plan = structuredClone(plan);
    avecS01.modules[0]!.chapitres.unshift({ ...structuredClone(chap), id: 'S01', prerequis: [] });
    const c = avecS01.modules[0]!.chapitres[1]!;
    expect(syntheseChapitre(c, avecS01, [], []).etat).toBe('verrouille');
    const derog: Evenement = { id: 'd', type: 'derogation', ref: 'S02', chapitre: 'S02', date: '2026-11-13T00:00:00Z', motif: 'Déjà maîtrisé' };
    const s = syntheseChapitre(c, avecS01, [], [derog]);
    expect(s.etat).toBe('disponible');
    expect(s.derogation?.motif).toBe('Déjà maîtrisé');
  });
  it('en cours, à reprendre, à rejouer, QCM réussi', () => {
    expect(syntheseChapitre(chap, plan, [], [consult]).etat).toBe('en_cours');
    expect(syntheseChapitre(chap, plan, [qcm(false, '2026-11-13T10:00:00Z')], []).etat).toBe('a_reprendre');
    expect(syntheseChapitre(chap, plan, [qcm(false, '2026-11-13T10:00:00Z'), qcm(false, '2026-11-13T11:00:00Z')], []).etat).toBe('a_rejouer');
    expect(syntheseChapitre(chap, plan, [qcm(false, '2026-11-13T10:00:00Z'), qcm(true, '2026-11-13T11:00:00Z')], []).etat).toBe('qcm_reussi');
  });
  it('jamais « validé » sans évaluation pratique', () => {
    expect(syntheseChapitre(chap, plan, [qcm(true, '2026-11-13T10:00:00Z')], []).etat).not.toBe('valide');
  });
});

describe('progression par compétence', () => {
  it('franchit les étapes enseignée, exercée, QCM, sans jamais annoncer le niveau visé avant le jalon', () => {
    const p = progressionCompetences(plan, [exo(true), qcm(true, '2026-11-13T11:00:00Z')], [consult], 0.8);
    const d21 = p.find((x) => x.code === 'D2.1')!;
    const d22 = p.find((x) => x.code === 'D2.2')!;
    expect(d21.etapes).toMatchObject({ enseignee: true, exercee: true, qcm: false });
    expect(d22.etapes).toMatchObject({ enseignee: true, exercee: false, qcm: true });
    for (const c of p) expect(c.libelle).not.toMatch(/atteint/);
    expect(d22.libelle).toContain('jalon S14');
  });
  it('exercice raté ne compte pas', () => {
    const p = progressionCompetences(plan, [exo(false)], [], 0.8);
    expect(p.find((x) => x.code === 'D2.1')!.etapes.exercee).toBe(false);
  });
  it('QCM réussi mais questions de la compétence ratées : étape non franchie', () => {
    const p = progressionCompetences(plan, [qcm(true, '2026-11-13T11:00:00Z', false)], [], 0.8);
    expect(p.find((x) => x.code === 'D2.2')!.etapes.qcm).toBe(false);
  });
  it('compétence hors du contenu publié signalée', () => {
    const p = progressionCompetences(plan, [], [], 0.8);
    expect(p.find((x) => x.code === 'D2.3')!.horsContenu).toBe(true);
  });
});
