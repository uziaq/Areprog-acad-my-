/**
 * T6 : contraste des jetons de thème (WCAG 2.x, AA = 4,5:1 pour le texte courant).
 */
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const css = readFileSync('src/styles/jetons.css', 'utf8');
const jeton = (nom: string): string => {
  const m = new RegExp(`--${nom}:\\s*(#[0-9a-fA-F]{6})`).exec(css);
  if (!m) throw new Error(`jeton --${nom} introuvable`);
  return m[1]!;
};

function luminance(hex: string): number {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r! + 0.7152 * g! + 0.0722 * b!;
}
const contraste = (a: string, b: string) => {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (l1! + 0.05) / (l2! + 0.05);
};

describe('contraste des couleurs AREPROG', () => {
  it('reprend exactement les couleurs de l\'identité visuelle', () => {
    expect(jeton('bleu-principal')).toBe('#1E88E5');
    expect(jeton('bleu-secondaire')).toBe('#1565C0');
    expect(jeton('fond-1')).toBe('#1E2225');
    expect(jeton('fond-2')).toBe('#2F3336');
    expect(jeton('texte')).toBe('#C7CCD1');
  });

  const paires: [string, string][] = [
    ['texte', 'fond-1'], ['texte', 'fond-2'], ['texte-attenue', 'fond-1'], ['texte-attenue', 'fond-2'],
    ['lien', 'fond-1'], ['lien', 'fond-2'], ['texte-fort', 'bleu-secondaire'],
    ['succes', 'fond-2'], ['erreur', 'fond-2'], ['alerte', 'fond-2'],
    ['etiquette-source', 'fond-1'], ['etiquette-exemple', 'fond-1'], ['etiquette-hypothese', 'fond-1'], ['etiquette-a-verifier', 'fond-1'],
  ];
  for (const [t, f] of paires) {
    it(`${t} sur ${f} ≥ 4,5:1`, () => {
      expect(contraste(jeton(t), jeton(f))).toBeGreaterThanOrEqual(4.5);
    });
  }

  it('le bleu principal n\'est pas utilisé comme couleur de texte (contraste insuffisant sur fond sombre)', () => {
    expect(contraste(jeton('bleu-principal'), jeton('fond-1'))).toBeLessThan(4.5);
    const global = readFileSync('src/styles/global.css', 'utf8');
    expect(global).not.toMatch(/(^|[^-])color:\s*var\(--bleu-principal\)/m);
  });
});
