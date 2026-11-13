/**
 * Images des leçons (photos, illustrations générées), copiées depuis content/ à la construction.
 * Les schémas SVG, eux, sont intégrés directement dans la page.
 */
import { readFileSync } from 'node:fs';
import type { APIRoute } from 'astro';
import { chargerSite } from '../../lib/contenu.ts';

const TYPES: Record<string, string> = { webp: 'image/webp', jpg: 'image/jpeg', png: 'image/png' };

export function getStaticPaths() {
  return [...chargerSite().images.keys()].map((url) => ({ params: { fichier: url.replace('/figures/', '') } }));
}

export const GET: APIRoute = ({ params }) => {
  const source = chargerSite().images.get(`/figures/${params.fichier}`)!;
  const extension = params.fichier!.split('.').pop()!;
  return new Response(readFileSync(source), { headers: { 'Content-Type': TYPES[extension]! } });
};
