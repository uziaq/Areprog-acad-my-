---
name: travaux-pratiques
description: Préparer un travail pratique AREPROG Academy (matériel, sécurité, câblage, procédure, relevés, tolérances justifiées), y compris le protocole renforcé airbag / ABS / direction et les essais sur véhicule. À utiliser pour « prépare / rédige le TP-xx ».
---

# Travaux pratiques

## Sources internes

`docs/pedagogie/03-travaux-pratiques.md` (catalogue, principes, équipement), `docs/pedagogie/04-evaluation.md` (grille pratique).

## Fichier `tp/TP-xx.md`

En-tête : `id`, `titre`, `chapitre`, `version`, `statut`, `support` (`carte_entrainement`, `calculateur_recuperation`, `banc`, `vehicule`), `securite` (`standard` ou `renforcee`), `domaines_risque`, `competences`.

Sections :

1. `## Objectif` et `## Matériel` (uniquement l'équipement du catalogue).
2. `## Sécurité` : alimentation limitée en courant, ESD, EPI, risques chimiques et thermiques.
3. `## Schéma de câblage` : figure `origine: areprog`.
4. `## Procédure` : étapes numérotées courtes, lisibles sur tablette, une action par étape.
5. `## Relevés` : tableau valeur théorique | tolérance | mesure | écart | commentaire.
6. `## Tolérance justifiée` : tolérance des composants + incertitude de l'instrument, chacune étiquetée.
7. `## Livrable et preuves` : photos, captures, tableau exigés pour chaque critère.

## Protocole renforcé (airbag, ABS / ESP, direction)

`securite: renforcee` et `domaines_risque` obligatoires. Ajouter `## Protocole de sécurité` : check-list pré-intervention dont chaque point exige une preuve, consignes d'énergie stockée et de manipulation des éléments pyrotechniques, conditions d'arrêt. **Chaque consigne est `[SOURCÉ]`** ; si la source manque, ne pas inventer : laisser le TP en brouillon et lister ce qu'il faut trouver.

## TP sur véhicule

`support: vehicule`. Véhicule désigné par son code interne (`VEH-01`), jamais par VIN ou plaque. Ajouter `## Limites de la validation` : ce qui n'a pas pu être testé et pourquoi. Prérequis : validation de la réparation sur banc.

Finir par `npm run valider`.
