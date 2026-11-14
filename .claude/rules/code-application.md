---
paths:
  - "src/**"
  - "public/**"
---

# Code de l'application

- TypeScript strict. Pas de `any` sans commentaire justificatif.
- Pages et composants statiques en `.astro` ; composants interactifs Preact **uniquement** dans `src/islands/`, hydratés au plus tard possible (`client:visible` de préférence).
- Couleurs et polices **uniquement** via les jetons de `src/styles/jetons.css` (test d'architecture).
- Tablette d'atelier : cibles tactiles ≥ 48 px, police de base ≥ 18 px, aucun défilement horizontal à 768 px, aucune fonction qui exige le survol.
- Accessibilité : `alt` sur chaque figure, contraste AA, navigation clavier, étiquettes de fiabilité distinguées par couleur **et** pictogramme.
- Textes d'interface en français ; terme anglais entre parenthèses à la première occurrence.
- Données apprenant : IndexedDB via `src/lib/stockage/`, jamais dans le dépôt ; chaque changement de schéma de données a une migration testée.
- Les corrections ne sont chargées qu'après la soumission de la réponse ; ne jamais les inclure dans le HTML initial.
- Aucune donnée client ni identifiant de véhicule (VIN, plaque) : les véhicules de l'atelier sont désignés par un code interne.
