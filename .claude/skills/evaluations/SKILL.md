---
name: evaluations
description: Écrire la banque de QCM, les réponses expliquées et la grille d'évaluation pratique d'un chapitre AREPROG Academy. À utiliser pour « écris le QCM / l'évaluation / la grille de Sxx ».
---

# Évaluations

Référence : `docs/pedagogie/04-evaluation.md`. Seuils : `content/parametres.yaml`.

## Banque `qcm/banque.yaml` (≥ 40 questions par chapitre)

- Types : `choix_unique`, `choix_multiple`, `calcul` (avec `unite_attendue`), `lecture_schema`, `ordonnancement`. Varier les types.
- Chaque question : `competences`, `section` (ancre de la leçon), `securite: true|false`. Au moins 3 questions sécurité quand le chapitre comporte un TP.
- Chaque objectif des leçons est couvert par au moins deux questions.
- Distracteurs plausibles, construits sur les erreurs fréquentes du chapitre. Pas de « toutes les réponses ».
- **Aucune** bonne réponse dans ce fichier.

## Réponses `qcm/reponses.yaml`

- `bonnes` (ou `valeur` + `tolerance_relative` + `unite` pour un calcul), `explication`, `pourquoi_faux` pour chaque distracteur, `source` (section du cours, ou fiche `SRC-xxxx`).
- Refaire chaque calcul. Une réponse non vérifiable n'entre pas dans la banque.

## Grille pratique

Reprendre la grille générique (sécurité éliminatoire, préparation, exécution, exactitude, documentation, analyse) et l'adapter au TP : chaque critère exige une preuve.

Finir par `npm run valider` (contrôle des paires question / réponse et du volume).
