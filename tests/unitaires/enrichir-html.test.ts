import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { enrichirHtml, MENTION_GENEREE, urlFigure } from '../../src/markdown/enrichir-html.ts';

describe('enrichissement du HTML des leçons', () => {
  it('rend les étiquettes en badges, [SOURCÉ] lié à sa fiche', () => {
    const html = enrichirHtml('<p>U = 5 V [EXEMPLE] et loi [SOURCÉ : SRC-0001 §1.2].</p>', [], '/x.md');
    expect(html).toContain('class="etiquette etiquette--exemple"');
    expect(html).toContain('href="/sources/src-0001/"');
    expect(html).not.toContain('[EXEMPLE]');
  });
  it('ne touche pas au code', () => {
    const html = enrichirHtml('<pre><code>[EXEMPLE]</code></pre><code>::exercice{id=X}</code>', [], '/x.md');
    expect(html).toBe('<pre><code>[EXEMPLE]</code></pre><code>::exercice{id=X}</code>');
  });
  it('remplace les directives exercice et simulateur par des emplacements', () => {
    const html = enrichirHtml('<p>::exercice{id=S02-L01-EX01}</p>\n<p>::simulateur{id=loi-ohm}</p>', [], '/x.md');
    expect(html).toContain('<div class="hote-exercice" data-exercice="S02-L01-EX01"></div>');
    expect(html).toContain('data-simulateur="loi-ohm"');
  });
  it('intègre la figure SVG avec texte alternatif, légende et origine', () => {
    const d = mkdtempSync(join(tmpdir(), 'fig-'));
    writeFileSync(join(d, 'f.svg'), '<!-- commentaire --><svg viewBox="0 0 1 1"></svg>');
    const html = enrichirHtml(
      '<p>::figure{id=S02-F01}</p>',
      [{ id: 'S02-F01', fichier: 'f.svg', legende: 'Légende', alt: 'Texte alt', origine: 'areprog' }],
      join(d, 'lecon.md'),
    );
    expect(html).toContain('role="img" aria-label="Texte alt"');
    expect(html).toContain('Figure réalisée par AREPROG');
    expect(html).not.toContain('commentaire');
  });
  it('affiche une photo servie à part, sans la lire', () => {
    const html = enrichirHtml(
      '<p>::figure{id=S02-F02}</p>',
      [{ id: 'S02-F02', fichier: '../figures/multimetre.JPEG', legende: 'Multimètre', alt: 'Un multimètre', origine: 'areprog' }],
      '/inexistant/lecon.md',
    );
    expect(html).toContain('<img class="figure-image" src="/figures/s02-f02.jpg" alt="Un multimètre"');
    expect(html).toContain('Photo prise par AREPROG');
  });
  it('signale toujours une illustration générée', () => {
    const fig = { id: 'S02-F03', fichier: 'carte.webp', legende: 'Carte', alt: 'Une carte', origine: 'illustration-generee' };
    expect(urlFigure(fig)).toBe('/figures/s02-f03.webp');
    const html = enrichirHtml('<p>::figure{id=S02-F03}</p>', [fig], '/x.md');
    expect(html).toContain(MENTION_GENEREE);
    expect(html).toContain('figure-origine--generee');
  });
  it('refuse une figure non déclarée', () => {
    expect(() => enrichirHtml('<p>::figure{id=S02-F09}</p>', [], '/x.md')).toThrow(/non déclarée/);
  });
});
