/**
 * Étiquettes de fiabilité : [SOURCÉ : SRC-0001 §x], [EXEMPLE], [HYPOTHÈSE], [À VÉRIFIER : motif].
 * Référence : docs/pedagogie/06-gabarit-cours.md
 */

export type TypeEtiquette = 'SOURCÉ' | 'EXEMPLE' | 'HYPOTHÈSE' | 'À VÉRIFIER';

export interface Etiquette {
  type: TypeEtiquette;
  detail: string;
  source: string | null; // identifiant SRC-xxxx pour [SOURCÉ]
}

const RE_ETIQUETTE = /\[(SOURCÉ|EXEMPLE|HYPOTHÈSE|À VÉRIFIER)\s*(?::\s*([^\]]*))?\]/gu;

export function trouverEtiquettes(texte: string): Etiquette[] {
  const resultat: Etiquette[] = [];
  for (const m of texte.matchAll(RE_ETIQUETTE)) {
    const detail = (m[2] ?? '').trim();
    const src = /SRC-\d{4}/.exec(detail);
    resultat.push({ type: m[1] as TypeEtiquette, detail, source: src ? src[0] : null });
  }
  return resultat;
}

/** Valeur numérique suivie d'une unité électrique ou physique courante. */
const RE_VALEUR_UNITE =
  /(?<![\p{L}\d-])\d+(?:[.,]\d+)?\s?(?:[pnuµmkMG]?(?:V|A|Ω|W|F|H|Hz|s)|ohms?|°C)(?![\p{L}\d])/u;

/** Retire blocs de code, code en ligne, directives et commentaires HTML. */
export function texteAnalysable(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]*`/g, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .split('\n')
    .filter((l) => !l.trim().startsWith('::') && !/^#{1,6}\s/.test(l.trim()))
    .join('\n');
}

/**
 * Phrases (ou lignes de tableau) contenant une valeur avec unité mais aucune étiquette.
 * Heuristique : un faux positif se lève en ajoutant l'étiquette, jamais en désactivant la règle.
 */
export function valeursNonEtiquetees(markdown: string): string[] {
  const alertes: string[] = [];
  for (const ligne of texteAnalysable(markdown).split('\n')) {
    const l = ligne.trim();
    if (!l) continue;
    const morceaux = l.startsWith('|') ? [l] : l.split(/(?<=[.!?;])\s+(?=[\p{Lu}\d(])/u);
    for (const phrase of morceaux) {
      if (RE_VALEUR_UNITE.test(phrase) && trouverEtiquettes(phrase).length === 0) {
        alertes.push(phrase.length > 120 ? `${phrase.slice(0, 117)}…` : phrase);
      }
    }
  }
  return alertes;
}

/** Contenu d'une section « ## Titre » jusqu'à la section suivante de même niveau ou supérieur. */
export function section(markdown: string, titre: string): string | null {
  const lignes = markdown.split('\n');
  const norm = (s: string) => s.trim().toLowerCase();
  const debut = lignes.findIndex((l) => /^##\s/.test(l) && norm(l.replace(/^##\s+/, '')) === norm(titre));
  if (debut < 0) return null;
  const fin = lignes.findIndex((l, i) => i > debut && /^#{1,2}\s/.test(l));
  return lignes.slice(debut + 1, fin < 0 ? undefined : fin).join('\n');
}
