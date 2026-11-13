/**
 * Service worker généré à la construction (F8, NF3) : met en cache toutes les pages du parcours,
 * leurs ressources (/_astro/…), les polices et les corrections, pour un usage hors ligne en atelier.
 * Stratégie : réseau d'abord pour les pages (contenu à jour), cache d'abord pour les ressources versionnées.
 */
import type { APIRoute } from 'astro';
import { chargerSite, urlCorrections, urlSource } from '../lib/contenu.ts';

export const GET: APIRoute = () => {
  const site = chargerSite();
  const pages = [
    '/',
    '/parcours/',
    '/competences/',
    '/historique/',
    '/sauvegarde/',
    ...site.plan.modules.flatMap((m) => [m.url, ...m.chapitres.flatMap((c) => [c.urlQcm, ...c.lecons.map((l) => l.url)])]),
    ...[...site.sources.keys()].map(urlSource),
  ];
  const fichiers = [
    ...[...site.corrections.keys()].map(urlCorrections),
    '/manifest.webmanifest',
    '/icones/icone.svg',
    '/icones/icone-192.png',
    '/polices/inter-latin-400-normal.woff2',
    '/polices/inter-latin-600-normal.woff2',
    '/polices/inter-latin-700-normal.woff2',
    '/polices/poppins-latin-600-normal.woff2',
    '/polices/poppins-latin-700-normal.woff2',
  ];
  const version = `areprog-${new Date().toISOString()}`;

  const code = `// Généré automatiquement (src/pages/sw.js.ts).
const CACHE = ${JSON.stringify(version)};
const PAGES = ${JSON.stringify(pages)};
const FICHIERS = ${JSON.stringify(fichiers)};

async function precharger() {
  const cache = await caches.open(CACHE);
  await cache.addAll(FICHIERS);
  const ressources = new Set();
  for (const url of PAGES) {
    const rep = await fetch(url, { cache: 'no-cache' });
    if (!rep.ok) continue;
    const html = await rep.clone().text();
    await cache.put(url, rep);
    for (const m of html.matchAll(/(?:src|href)="(\\/_astro\\/[^"]+)"/g)) ressources.add(m[1]);
    for (const m of html.matchAll(/"(\\/_astro\\/[^"]+\\.js)"/g)) ressources.add(m[1]);
  }
  await cache.addAll([...ressources]);
  // Les modules JS importent d'autres modules : on suit les imports statiques.
  const vus = new Set(ressources);
  const file = [...ressources].filter((u) => u.endsWith('.js'));
  while (file.length) {
    const url = file.pop();
    const rep = await cache.match(url);
    if (!rep) continue;
    const js = await rep.text();
    for (const m of js.matchAll(/["'](\\.\\/[^"']+\\.js|\\/_astro\\/[^"']+\\.js)["']/g)) {
      const abs = new URL(m[1], self.location.origin + url).pathname;
      if (!vus.has(abs)) {
        vus.add(abs);
        file.push(abs);
        await cache.add(abs).catch(() => {});
      }
    }
  }
}

self.addEventListener('install', (e) => {
  e.waitUntil(precharger().then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((cles) => Promise.all(cles.filter((c) => c !== CACHE).map((c) => caches.delete(c))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  const url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== self.location.origin) return;
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then((rep) => {
          const copie = rep.clone();
          if (rep.ok) caches.open(CACHE).then((c) => c.put(url.pathname, copie));
          return rep;
        })
        .catch(async () => (await caches.match(url.pathname, { ignoreVary: true })) || (await caches.match('/', { ignoreVary: true })) || Response.error()),
    );
    return;
  }
  const versionne = url.pathname.startsWith('/_astro/') || url.pathname.startsWith('/polices/');
  if (versionne) {
    e.respondWith(caches.match(req, { ignoreVary: true, ignoreSearch: true }).then((r) => r || fetch(req).then((rep) => {
      const copie = rep.clone();
      if (rep.ok) caches.open(CACHE).then((c) => c.put(req, copie));
      return rep;
    })));
    return;
  }
  // Autres fichiers (corrections, manifeste) : réseau d'abord, cache en secours.
  e.respondWith(
    fetch(req)
      .then((rep) => {
        const copie = rep.clone();
        if (rep.ok) caches.open(CACHE).then((c) => c.put(url.pathname, copie));
        return rep;
      })
      .catch(async () => (await caches.match(url.pathname, { ignoreVary: true })) || Response.error()),
  );
});
`;
  return new Response(code, { headers: { 'Content-Type': 'text/javascript; charset=utf-8' } });
};
