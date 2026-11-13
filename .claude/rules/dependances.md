---
paths:
  - "package.json"
  - "package-lock.json"
---

# Dépendances

Autorisées aujourd'hui : `astro`, `@astrojs/preact`, `preact` (production) ; `typescript`, `@types/node`, `vitest`, `@playwright/test`, `@astrojs/check`, `yaml` (développement).

Pour en ajouter une, la PR doit indiquer : le besoin, pourquoi quelques lignes de code maison ne suffisent pas, la taille ajoutée au JavaScript envoyé au navigateur, la licence, l'activité de maintenance. Versions exactes (`-E`), publiées depuis au moins deux semaines. `package-lock.json` toujours versionné.
