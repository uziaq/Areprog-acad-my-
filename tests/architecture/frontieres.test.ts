import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

function fichiersSource(dossier: string): string[] {
  if (!existsSync(dossier)) return [];
  return readdirSync(dossier).flatMap((n) => {
    const p = join(dossier, n);
    return statSync(p).isDirectory() ? fichiersSource(p) : /\.(ts|tsx|astro)$/.test(n) ? [p] : [];
  });
}

describe('frontières d\'architecture', () => {
  it('les simulateurs pédagogiques n\'importent aucune donnée de la bibliothèque', () => {
    for (const f of fichiersSource('src/simulateurs')) {
      expect(readFileSync(f, 'utf8'), f).not.toMatch(/bibliotheque/);
    }
  });

  it('aucune couleur codée en dur hors des jetons de thème', () => {
    const fautifs = fichiersSource('src')
      .filter((f) => !f.endsWith('jetons.css'))
      .filter((f) => /#[0-9a-fA-F]{6}\b/.test(readFileSync(f, 'utf8')));
    expect(fautifs).toEqual([]);
  });
});
