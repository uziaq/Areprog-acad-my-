# AREPROG Academy

Application web **privée** de formation à l'électronique automobile (réparation de calculateurs),
en français. Ce dépôt est celui de la formation : **ne jamais modifier le dépôt du site commercial AREPROG**.

## Où est quoi

- `content/` : contenu pédagogique (Markdown + YAML), séparé du code. Format : `docs/architecture/03-modele-de-contenu.md`.
- `src/` : application Astro (site statique) + composants Preact dans `src/islands/`.
- `src/schemas/` : schémas du contenu, source unique. `src/validation/` : contrôle de conformité.
- `docs/pedagogie/` : conception du cursus (référentiel, programme, gabarit, décisions).
- `docs/architecture/` : architecture validée de l'application.
- `tests/` : `unitaires/`, `contenu/` (règles du validateur sur fixtures), `architecture/`, `e2e/`.

## Commandes

- `npm run valider` : contrôle du contenu (bloque la construction en cas d'erreur)
- `npm test` : tests Vitest · `npm run test:e2e` : Playwright (tablette + bureau)
- `npm run check` : types · `npm run build` : validation + construction · `npm run dev` : serveur local
- `node scripts/nouveau-chapitre.ts M1 S02 slug "Titre"` : squelette de chapitre

## Règles absolues

1. Ne jamais présenter une mesure ou une valeur inventée comme une donnée constructeur. Toute valeur
   porte une étiquette : `[SOURCÉ : SRC-xxxx §…]`, `[EXEMPLE]`, `[HYPOTHÈSE]`, `[À VÉRIFIER : motif]`.
   En cas de doute : `[À VÉRIFIER]`, jamais une valeur plausible.
2. Ne jamais produire de faux schéma constructeur. Toute figure a une origine (`areprog` ou une source).
3. Simulateurs pédagogiques (`src/simulateurs/`) séparés des données réelles (`content/bibliotheque/`).
4. Corrections et bonnes réponses uniquement dans `corrections/` et `qcm/reponses.yaml`.
5. Aucune dépendance sans justification écrite (`.claude/rules/dependances.md`).
6. **Aucun déploiement Netlify** sans l'accord écrit d'Arthur dans la conversation en cours.
7. Airbag, ABS / ESP, direction : protocole de sécurité renforcé obligatoire, jamais contourné par le code.

## Avant de terminer une tâche

`npm run valider && npm test` doivent passer. Seul Arthur fait passer un contenu en `statut: valide`.

## Langue

Interface, contenu, messages de commit et descriptions de PR en français.
