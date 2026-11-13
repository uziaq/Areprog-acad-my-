---
name: creer-cours
description: Rédiger un chapitre (semaine) ou une leçon AREPROG Academy au format du gabarit, avec étiquettes de fiabilité, figures, exercices séparés de leurs corrections. À utiliser pour « rédige / écris / crée le cours, la leçon ou le chapitre Sxx ».
---

# Créer un cours

## Avant d'écrire

1. Lire la semaine visée dans `docs/pedagogie/02-programme-32-semaines.md` (ou le programme à jour), le gabarit `docs/pedagogie/06-gabarit-cours.md`, et les compétences concernées dans `docs/pedagogie/01-referentiel-competences.md`.
2. Lire `.claude/rules/fiabilite-contenu.md` et `.claude/rules/format-contenu.md`.
3. Si le chapitre n'existe pas : `node scripts/nouveau-chapitre.ts <M> <Sxx> <slug> "<titre>"`.

## Rédaction

1. Découper la semaine en 2 à 4 leçons de 1 à 2 h (`Sxx-L01`, `Sxx-L02`…), chacune avec 1 à 3 objectifs observables (« être capable de… ») rattachés à des codes de compétence.
2. Pour chaque leçon : `## Théorie` progressive (aucune notion avant sa définition), au moins une figure SVG `origine: areprog` avec légende et texte alternatif, des sections `### Exemple n` avec chaque étape de calcul et les unités.
3. Étiqueter **chaque** valeur. Données de composants réels : uniquement depuis une fiche `SRC-xxxx` ; sinon `[À VÉRIFIER : …]`.
4. Exercices (5 à 10 par chapitre) dans `exercices/`, solutions dans `corrections/` avec explication et renvoi de section.
5. Dans `chapitre.md` : `## Mesures attendues et tolérances` (tolérance justifiée par composant + instrument) et `## Erreurs fréquentes` (avec comment les détecter).
6. QCM et grille : utiliser la Skill `evaluations`. TP : Skill `travaux-pratiques`.

## Fin

1. `npm run valider` : corriger toutes les erreurs ; traiter les avertissements en ajoutant l'étiquette juste.
2. Laisser `statut: brouillon`.
3. Résumer : leçons créées, objectifs, liste des `[À VÉRIFIER]` restants, sources à trouver.
4. Proposer une relecture par les agents `expert-electronique` et `verificateur-documentaire`.
