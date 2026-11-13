# AREPROG Academy

Application web privée de formation à l'électronique automobile (réparation de calculateurs).
Site statique Astro, utilisable hors ligne sur tablette, contenu pédagogique séparé du code.

> Dépôt de la formation uniquement. **Aucun déploiement** sans l'autorisation d'Arthur.

## Démarrer

```bash
npm ci
npm run valider     # contrôle de conformité du contenu
npm test            # tests unitaires, contenu, architecture
npm run dev         # serveur local (accessible depuis la tablette sur le réseau de l'atelier)
```

Node.js ≥ 22.18 (voir `.nvmrc`).

## Organisation

| Dossier | Rôle |
|---|---|
| `content/` | Contenu pédagogique (Markdown + YAML) |
| `src/` | Application (Astro, Preact) ; `src/schemas/` et `src/validation/` pour le contrôle du contenu |
| `scripts/` | `valider-contenu.ts`, `nouveau-chapitre.ts` |
| `tests/` | Vitest (`unitaires/`, `contenu/`, `architecture/`) et Playwright (`e2e/`) |
| `docs/pedagogie/` | Conception du cursus |
| `docs/architecture/` | Architecture de l'application |
| `.claude/` | Règles, Skills et sous-agents Claude Code ; voir aussi `CLAUDE.md` |

## Contribuer

Tout passe par une pull request ; la CI (contenu, types, tests, construction, e2e) doit être verte.
Seul Arthur fait passer un contenu en `statut: valide`.
