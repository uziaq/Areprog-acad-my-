/**
 * Chaque règle du validateur : la fixture conforme passe, une copie modifiée échoue avec la bonne règle.
 */
import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { chargerContenu } from '../../src/validation/charger.ts';
import { validerContenu, type Diagnostic } from '../../src/validation/regles.ts';

const FIXTURE = join(import.meta.dirname, 'fixtures', 'conforme');
const CHAP = 'parcours/M1-test/S02-test';
const AUJOURDHUI = '2026-11-13';
const copies: string[] = [];

function copie(): string {
  const d = mkdtempSync(join(tmpdir(), 'areprog-contenu-'));
  cpSync(FIXTURE, d, { recursive: true });
  copies.push(d);
  return d;
}

function modifier(racine: string, fichier: string, f: (t: string) => string) {
  const p = join(racine, fichier);
  writeFileSync(p, f(readFileSync(p, 'utf8')));
}

const valider = (racine: string) => validerContenu(chargerContenu(racine), { aujourdhui: AUJOURDHUI });
const erreurs = (d: Diagnostic[]) => d.filter((x) => x.gravite === 'erreur');
const regles = (d: Diagnostic[]) => erreurs(d).map((x) => x.regle);

afterEach(() => {
  for (const d of copies.splice(0)) rmSync(d, { recursive: true, force: true });
});

describe('fixture conforme', () => {
  it('ne produit aucune erreur', () => {
    expect(erreurs(valider(FIXTURE))).toEqual([]);
  });
  it('avertit seulement sur la taille de la banque QCM (chapitre en brouillon)', () => {
    expect(valider(FIXTURE).map((d) => d.regle)).toEqual(['qcm-volume']);
  });
});

describe('règles bloquantes', () => {
  it('en-tête non conforme au schéma', () => {
    const r = copie();
    modifier(r, `${CHAP}/lecons/S02-L01-test.md`, (t) => t.replace('version: "0.1"', 'version: 0.1'));
    expect(regles(valider(r))).toContain('schema');
  });

  it('identifiant en double', () => {
    const r = copie();
    modifier(r, `${CHAP}/qcm/banque.yaml`, (t) => t.replace('S02-Q002', 'S02-Q001'));
    expect(regles(valider(r))).toContain('id-unique');
  });

  it('solution présente dans un énoncé d\'exercice', () => {
    const r = copie();
    modifier(r, `${CHAP}/exercices/S02-L01.yaml`, (t) => t.replace('  objectif: O3', '  objectif: O3\n  valeur: 22.7'));
    expect(regles(valider(r))).toContain('fuite-correction');
  });

  it('bonne réponse présente dans la banque QCM', () => {
    const r = copie();
    modifier(r, `${CHAP}/qcm/banque.yaml`, (t) => t.replace('  securite: false', '  securite: false\n  bonnes: [b]'));
    expect(regles(valider(r))).toContain('fuite-correction');
  });

  it('exercice sans correction', () => {
    const r = copie();
    modifier(r, `${CHAP}/corrections/S02-L01.yaml`, (t) => t.split('- id: S02-L01-EX05')[0]!);
    expect(regles(valider(r))).toContain('correction');
  });

  it('question sans réponse', () => {
    const r = copie();
    modifier(r, `${CHAP}/qcm/reponses.yaml`, (t) => t.split('- id: S02-Q002')[0]!);
    expect(regles(valider(r))).toContain('correction');
  });

  it('[SOURCÉ] vers une source inexistante', () => {
    const r = copie();
    modifier(r, `${CHAP}/lecons/S02-L01-test.md`, (t) => t.replace('SRC-0001 §1', 'SRC-0099 §1'));
    expect(regles(valider(r))).toContain('etiquette-source');
  });

  it('figure sans origine', () => {
    const r = copie();
    modifier(r, `${CHAP}/lecons/S02-L01-test.md`, (t) => t.replace('    origine: areprog\n', ''));
    expect(regles(valider(r))).toContain('schema');
  });

  it('fichier de figure manquant', () => {
    const r = copie();
    rmSync(join(r, CHAP, 'figures', 'S02-F01-test.svg'));
    expect(regles(valider(r))).toContain('figure');
  });

  it('figure dans un format non pris en charge', () => {
    const r = copie();
    modifier(r, `${CHAP}/lecons/S02-L01-test.md`, (t) => t.replace('S02-F01-test.svg', 'S02-F01-test.gif'));
    expect(regles(valider(r))).toContain('schema');
  });

  it('photo déclarée mais fichier absent', () => {
    const r = copie();
    modifier(r, `${CHAP}/lecons/S02-L01-test.md`, (t) =>
      t.replace('S02-F01-test.svg', 'S02-F01-photo.webp').replace('origine: areprog', 'origine: illustration-generee'));
    expect(regles(valider(r))).toContain('figure');
  });

  it('objectif sans critère d\'évaluation', () => {
    const r = copie();
    modifier(r, `${CHAP}/lecons/S02-L01-test.md`, (t) => t.replace(/  - objectif: O3\n    critere: .*\n/, ''));
    expect(regles(valider(r))).toContain('objectif-sans-critere');
  });

  it('fichier local pour une source sous licence restrictive', () => {
    const r = copie();
    modifier(r, 'bibliotheque/sources/SRC-0001.yaml', (t) => `${t}fichier_local: datasheet.pdf\n`);
    expect(regles(valider(r))).toContain('licence');
  });
});

describe('règles qui durcissent avec le statut', () => {
  it('valeur non étiquetée : avertissement en brouillon, erreur en relu', () => {
    const r = copie();
    modifier(r, `${CHAP}/lecons/S02-L01-test.md`, (t) => `${t}\nLe rail mesure 5 V sur la carte.\n`);
    const brouillon = valider(r).filter((d) => d.regle === 'valeur-non-etiquetee');
    expect(brouillon.map((d) => d.gravite)).toEqual(['avertissement']);
    modifier(r, `${CHAP}/lecons/S02-L01-test.md`, (t) => t.replace('statut: brouillon', 'statut: relu'));
    expect(regles(valider(r))).toContain('valeur-non-etiquetee');
  });

  it('rubrique manquante : bloquante dès que le chapitre est relu', () => {
    const r = copie();
    modifier(r, `${CHAP}/chapitre.md`, (t) => t.replace('## Erreurs fréquentes', '## Autre').replace('statut: brouillon', 'statut: relu'));
    expect(regles(valider(r))).toContain('rubriques');
  });

  it('banque QCM trop petite : bloquante pour un chapitre validé', () => {
    const r = copie();
    modifier(r, `${CHAP}/chapitre.md`, (t) => t.replace('statut: brouillon', 'statut: valide'));
    expect(regles(valider(r))).toContain('qcm-volume');
  });

  it('[À VÉRIFIER] interdit dans un contenu validé', () => {
    const r = copie();
    modifier(r, `${CHAP}/lecons/S02-L01-test.md`, (t) => `${t.replace('statut: brouillon', 'statut: valide')}\nPoint ouvert [À VÉRIFIER : révision].\n`);
    expect(regles(valider(r))).toContain('a-verifier');
  });

  it('illustration générée légère : acceptée ; image trop lourde : avertissement', () => {
    const r = copie();
    modifier(r, `${CHAP}/lecons/S02-L01-test.md`, (t) =>
      t.replace('S02-F01-test.svg', 'S02-F01-photo.webp').replace('origine: areprog', 'origine: illustration-generee'));
    writeFileSync(join(r, CHAP, 'figures', 'S02-F01-photo.webp'), Buffer.alloc(1000));
    expect(valider(r).filter((d) => d.regle === 'figure')).toEqual([]);
    writeFileSync(join(r, CHAP, 'figures', 'S02-F01-photo.webp'), Buffer.alloc(500_000));
    expect(valider(r).filter((d) => d.regle === 'figure').map((d) => d.gravite)).toEqual(['avertissement']);
  });

  it('prérequis absent : avertissement en brouillon', () => {
    const r = copie();
    modifier(r, `${CHAP}/chapitre.md`, (t) => t.replace('prerequis: []', 'prerequis: [S01]'));
    const d = valider(r).filter((x) => x.regle === 'prerequis');
    expect(d.map((x) => x.gravite)).toEqual(['avertissement']);
  });
});

describe('protocole de sécurité renforcé (airbag, ABS, direction)', () => {
  const tp = `${CHAP}/tp/TP-03.md`;
  const renforce = (t: string) =>
    t.replace('securite: standard', 'securite: renforcee\ndomaines_risque: [airbag]');

  it('TP touchant un domaine à risque sans securite: renforcee', () => {
    const r = copie();
    modifier(r, tp, (t) => t.replace('securite: standard', 'securite: standard\ndomaines_risque: [abs-esp]'));
    expect(regles(valider(r))).toContain('securite-renforcee');
  });

  it('TP renforcé sans section « Protocole de sécurité »', () => {
    const r = copie();
    modifier(r, tp, renforce);
    expect(regles(valider(r))).toContain('securite-renforcee');
  });

  it('consigne de sécurité non vérifiée', () => {
    const r = copie();
    modifier(r, tp, (t) => `${renforce(t)}\n## Protocole de sécurité\n\nConsigne provisoire [À VÉRIFIER : texte réglementaire].\n`);
    expect(regles(valider(r))).toContain('securite-renforcee');
  });

  it('TP renforcé complet et sourcé : accepté', () => {
    const r = copie();
    modifier(r, tp, (t) => `${renforce(t)}\n## Protocole de sécurité\n\nConsigne issue de la source [SOURCÉ : SRC-0001 §2].\n`);
    expect(regles(valider(r))).not.toContain('securite-renforcee');
  });

  it('TP sur véhicule sans section « Limites de la validation »', () => {
    const r = copie();
    modifier(r, tp, (t) => t.replace('support: carte_entrainement', 'support: vehicule'));
    expect(regles(valider(r))).toContain('securite-renforcee');
  });
});

describe('référentiel et directives', () => {
  it('compétence absente du référentiel', () => {
    const r = copie();
    modifier(r, `${CHAP}/qcm/banque.yaml`, (t) => t.replace('competences: [D2.1]', 'competences: [D9.9]'));
    expect(regles(valider(r))).toContain('reference');
  });

  it('simulateur inconnu', () => {
    const r = copie();
    modifier(r, `${CHAP}/lecons/S02-L01-test.md`, (t) => `${t}\n::simulateur{id=inexistant}\n`);
    expect(regles(valider(r))).toContain('reference');
  });

  it('référentiel absent', () => {
    const r = copie();
    rmSync(join(r, 'referentiel'), { recursive: true });
    expect(regles(valider(r))).toContain('referentiel');
  });
});

describe('renvois de section', () => {
  it('section inexistante dans la leçon', () => {
    const r = copie();
    modifier(r, `${CHAP}/qcm/banque.yaml`, (t) => t.replace('S02-L01#théorie', 'S02-L01#nulle-part'));
    expect(regles(valider(r))).toContain('section');
  });
  it('leçon inexistante', () => {
    const r = copie();
    modifier(r, `${CHAP}/corrections/S02-L01.yaml`, (t) => t.replace('S02-L01#théorie', 'S02-L09#théorie'));
    expect(regles(valider(r))).toContain('section');
  });
});
