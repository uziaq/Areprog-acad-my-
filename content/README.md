# Contenu pédagogique

Ce dossier contient **tout** le contenu publié par l'application, séparé du code (`src/`).

- `parametres.yaml` : seuils d'évaluation.
- `parcours/<module>/<chapitre>/` : un chapitre = une semaine (voir `docs/architecture/03-modele-de-contenu.md`).
- `bibliotheque/sources/` : une fiche par source documentaire (`SRC-0001.yaml`…).

Créer un chapitre : `node scripts/nouveau-chapitre.ts M1 S02 loi-ohm "Grandeurs, loi d'Ohm, puissance"`.
Vérifier : `npm run valider`.
