// @ts-check
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';

// Site statique : aucune sortie serveur. Voir docs/architecture/01-architecture-et-choix-techniques.md
export default defineConfig({
  output: 'static',
  integrations: [preact()],
  build: { format: 'directory' },
  devToolbar: { enabled: false },
});
