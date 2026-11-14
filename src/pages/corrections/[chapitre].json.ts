/**
 * Corrections d'un chapitre, servies dans un fichier séparé des pages :
 * l'application ne les charge qu'après la soumission d'une réponse (F14).
 */
import type { APIRoute } from 'astro';
import { chargerSite } from '../../lib/contenu.ts';

export function getStaticPaths() {
  return [...chargerSite().corrections.keys()].map((c) => ({ params: { chapitre: c.toLowerCase() } }));
}

export const GET: APIRoute = ({ params }) => {
  const c = [...chargerSite().corrections.values()].find((x) => x.chapitre.toLowerCase() === params.chapitre);
  return new Response(JSON.stringify(c), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
};
