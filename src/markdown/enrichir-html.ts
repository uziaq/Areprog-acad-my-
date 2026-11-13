/**
 * Enrichissement du HTML d'une leçon, appliqué après le rendu Markdown d'Astro :
 * - étiquettes de fiabilité [SOURCÉ : SRC-0001 §…], [EXEMPLE], [HYPOTHÈSE], [À VÉRIFIER : …] → badges ;
 * - directives ::figure{id=…} (SVG intégré, légende, origine), ::exercice{id=…}, ::simulateur{id=…}
 *   → emplacements où l'application monte les composants interactifs.
 * Travaille sur une chaîne HTML (pas de dépendance au moteur Markdown) ; le code (<pre>, <code>) n'est pas modifié.
 */
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

export interface FigureLecon {
  id: string;
  fichier: string;
  legende: string;
  alt: string;
  origine: string;
}

const echapper = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const RE_ETIQUETTE = /\[(SOURCÉ|EXEMPLE|HYPOTHÈSE|À VÉRIFIER)\s*(?::\s*([^\]<]*))?\]/gu;
const RE_DIRECTIVE = /<p>\s*::(figure|exercice|simulateur)\{id=([^}\s<]+)\}\s*<\/p>/g;

const STYLE: Record<string, { classe: string; picto: string; aide: string }> = {
  SOURCÉ: { classe: 'source', picto: '✓', aide: 'Information issue d’une source documentaire : ouvrir la fiche' },
  EXEMPLE: { classe: 'exemple', picto: '◆', aide: 'Valeur d’exemple choisie pour l’explication, pas une donnée constructeur' },
  HYPOTHÈSE: { classe: 'hypothese', picto: '?', aide: 'Hypothèse à confirmer par une mesure' },
  'À VÉRIFIER': { classe: 'a-verifier', picto: '!', aide: 'Information non confirmée par une source' },
};

/** `detail` est déjà du HTML échappé (issu du rendu Markdown). */
export function htmlEtiquette(type: string, detail: string): string {
  const st = STYLE[type]!;
  const texte = detail ? `${type} : ${detail.trim()}` : type;
  const contenu = `<span class="etiquette-picto" aria-hidden="true">${st.picto}</span>${texte}`;
  const src = /SRC-\d{4}/.exec(detail);
  if (type === 'SOURCÉ' && src) {
    return `<a class="etiquette etiquette--${st.classe}" href="/sources/${src[0].toLowerCase()}/" title="${echapper(st.aide)}">${contenu}</a>`;
  }
  return `<span class="etiquette etiquette--${st.classe}" title="${echapper(st.aide)}">${contenu}</span>`;
}

function htmlFigure(fig: FigureLecon, fichierLecon: string): string {
  let svg = readFileSync(resolve(dirname(fichierLecon), fig.fichier), 'utf8')
    .replace(/<\?xml[^>]*>/g, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .trim();
  svg = svg.replace(/<svg\b/, `<svg role="img" aria-label="${echapper(fig.alt)}" class="figure-svg"`);
  const origine =
    fig.origine === 'areprog'
      ? 'Figure réalisée par AREPROG'
      : `Source : <a href="/sources/${fig.origine.toLowerCase()}/">${echapper(fig.origine)}</a>`;
  return `<figure class="figure" id="${echapper(fig.id.toLowerCase())}">${svg}<figcaption><strong>Figure ${echapper(fig.id)}.</strong> ${echapper(fig.legende)} <span class="figure-origine">${origine}</span></figcaption></figure>`;
}

export function enrichirHtml(html: string, figures: FigureLecon[], fichierLecon: string): string {
  const parId = new Map(figures.map((f) => [f.id, f]));
  // Découpe en segments « code » (inchangés) et « texte ».
  const morceaux = html.split(/(<pre[\s\S]*?<\/pre>|<code[\s\S]*?<\/code>)/g);
  return morceaux
    .map((m, i) => {
      if (i % 2 === 1) return m;
      return m
        .replace(RE_DIRECTIVE, (_, type: string, id: string) => {
          if (type === 'figure') {
            const fig = parId.get(id);
            if (!fig) throw new Error(`Figure ${id} non déclarée dans l'en-tête de ${fichierLecon}`);
            return htmlFigure(fig, fichierLecon);
          }
          return `<div class="hote-${type}" data-${type}="${echapper(id)}"></div>`;
        })
        .replace(RE_ETIQUETTE, (_, type: string, detail?: string) => htmlEtiquette(type, detail ?? ''));
    })
    .join('');
}
