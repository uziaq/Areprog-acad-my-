import { describe, expect, it } from 'vitest';
import { section, trouverEtiquettes, valeursNonEtiquetees } from '../../src/validation/etiquettes.ts';

describe('étiquettes de fiabilité', () => {
  it('reconnaît les quatre étiquettes et la source citée', () => {
    const e = trouverEtiquettes('a [SOURCÉ : SRC-0012 §4.2] b [EXEMPLE] c [HYPOTHÈSE] d [À VÉRIFIER : révision]');
    expect(e.map((x) => x.type)).toEqual(['SOURCÉ', 'EXEMPLE', 'HYPOTHÈSE', 'À VÉRIFIER']);
    expect(e[0]?.source).toBe('SRC-0012');
    expect(e[3]?.detail).toBe('révision');
  });

  it('signale une valeur avec unité sans étiquette', () => {
    expect(valeursNonEtiquetees('Le rail est à 5 V.')).toHaveLength(1);
    expect(valeursNonEtiquetees('Une résistance de 4,7 kΩ chauffe.')).toHaveLength(1);
    expect(valeursNonEtiquetees('Le condensateur fait 100 nF.')).toHaveLength(1);
  });

  it('accepte une valeur étiquetée dans la même phrase', () => {
    expect(valeursNonEtiquetees('Le rail est à 5 V [EXEMPLE].')).toEqual([]);
    expect(valeursNonEtiquetees('| R1 | 10 kΩ | [EXEMPLE] |')).toEqual([]);
  });

  it('distingue les phrases : l\'étiquette de la phrase voisine ne couvre pas', () => {
    expect(valeursNonEtiquetees('Soit 5 V [EXEMPLE]. Puis 12 V sur la broche.')).toHaveLength(1);
  });

  it('ignore le code, les titres, les directives et les nombres sans unité', () => {
    const md = '# Semaine 2 sur 35\n```\nU = 5 V\n```\nVoir `12 V`.\n::figure{id=S02-F01}\nIl y a 3 étapes et 8 h de travail.';
    expect(valeursNonEtiquetees(md)).toEqual([]);
  });

  it('extrait une section de niveau 2', () => {
    const md = '## A\nun\n### sous\ndeux\n## B\ntrois';
    expect(section(md, 'A')).toContain('deux');
    expect(section(md, 'A')).not.toContain('trois');
    expect(section(md, 'C')).toBeNull();
  });
});
