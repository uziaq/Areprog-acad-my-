---
id: S02
titre: Grandeurs, loi d'Ohm, puissance
module: M1
duree_h: 8
competences: [D2.1, D2.2]
prerequis: [S01]
lecons: [S02-L01]
tp: [TP-03]
sources: [SRC-0001]
version: "0.1"
statut: brouillon
derniere_verification_sources: 2026-11-13
historique:
  - version: "0.1"
    date: 2026-11-13
    resume: Chapitre du prototype (une seule leçon rédigée sur les 3 prévues)
---

Première semaine du module M1. Elle pose les grandeurs de base (tension, courant,
résistance, puissance), la loi d'Ohm et la vérification de la puissance dissipée.

Prototype : seule la leçon S02-L01 est rédigée. Les leçons sur les associations de
résistances et sur le code couleur (IEC 60063) viendront ensuite.

## Mesures attendues et tolérances

Pour le TP-03, la valeur théorique se calcule avec la loi d'Ohm à partir de la tension
réglée et de la valeur nominale de la résistance. L'écart toléré combine la tolérance
de la résistance (lue sur son marquage) et l'incertitude du multimètre (lue dans sa
notice) : aucune valeur générique n'est donnée ici, car elles dépendent du matériel
de l'atelier [À VÉRIFIER : tolérances à relever sur les composants et la notice du multimètre utilisés].

## Erreurs fréquentes

- **Oublier un préfixe** : diviser 5 par 220 et lire « 0,0227 » comme des milliampères. Détection : refaire l'ordre de grandeur de tête avant de valider.
- **Inverser la formule** : écrire I = R / U. Détection : vérifier les unités, des ohms divisés par des volts ne donnent pas des ampères.
- **Ignorer la puissance nominale** : une résistance correcte en valeur peut brûler si elle dissipe plus que sa puissance nominale. Détection : calculer P à chaque fois qu'on choisit une résistance.
- **Mesurer un courant en parallèle** : brancher l'ampèremètre aux bornes d'un composant met la source en court-circuit à travers l'appareil. Détection : l'ampèremètre se place toujours en série, circuit ouvert à l'endroit de la mesure.
