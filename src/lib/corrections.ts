/** Chargement des corrections d'un chapitre, uniquement après une soumission. */
import type { CorrectionsChapitre } from './types.ts';

const cache = new Map<string, Promise<CorrectionsChapitre>>();

export function chargerCorrections(url: string): Promise<CorrectionsChapitre> {
  let p = cache.get(url);
  if (!p) {
    p = fetch(url).then((r) => {
      if (!r.ok) throw new Error(`Corrections indisponibles (${r.status})`);
      return r.json() as Promise<CorrectionsChapitre>;
    });
    p.catch(() => cache.delete(url));
    cache.set(url, p);
  }
  return p;
}
