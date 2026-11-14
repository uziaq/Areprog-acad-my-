/** Enregistre le service worker (site construit uniquement) pour l'usage hors ligne (F8, NF3). */
export function enregistrerServiceWorker(): void {
  if (!import.meta.env.PROD || !('serviceWorker' in navigator)) return;
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // Sans service worker, l'application reste utilisable en ligne.
    });
  });
}
