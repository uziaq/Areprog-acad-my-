---
id: S27-L02
titre: Humidité, niveaux MSL et effet popcorn
chapitre: S27
version: "0.1"
statut: brouillon
duree_min: 60
objectifs:
  - id: O1
    texte: Expliquer l'effet popcorn et lire le niveau de sensibilité à l'humidité (MSL) d'un composant
    competences: [D9.2]
  - id: O2
    texte: Décider d'un étuvage avant une reprise à partir du niveau MSL, de la durée hors sachet et de la documentation
    competences: [D9.2]
prerequis: [S27-L01]
exercices: [S27-L02-EX01, S27-L02-EX02]
references: [SRC-0075, SRC-0076]
criteres_evaluation:
  - objectif: O1
    critere: Exercice S27-L02-EX01 réussi et niveau MSL des composants relevé au TP-38
  - objectif: O2
    critere: Exercice S27-L02-EX02 réussi et décision d'étuvage notée au TP-39
figures:
  - id: S27-F02
    fichier: ../figures/S27-F02-popcorn.svg
    legende: "Effet popcorn : l'humidité absorbée par le boîtier plastique se vaporise pendant la chauffe ; la pression interne décolle le boîtier de la puce ou du cadre (délaminage) et peut fissurer le boîtier. À droite, la parade : étuvage avant la reprise, stockage en sachet étanche avec dessicant et carte indicatrice d'humidité. D'après la note TI AN-2029 ; dessin de principe."
    alt: "À gauche, la coupe d'un boîtier plastique avec de petites gouttes d'eau. Au milieu, le même boîtier chauffé, des flèches de vapeur poussent de l'intérieur, une fissure apparaît. À droite, un sachet fermé avec un dessicant et une carte indicatrice, et un four d'étuvage."
    origine: areprog
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction
---

## Théorie

### L'effet popcorn

Les boîtiers plastiques absorbent l'humidité de l'air. Pendant la chauffe d'une refusion, cette
humidité crée une pression interne qui peut décoller le boîtier (délaminage) ou le fissurer : c'est
l'effet « popcorn » [SOURCÉ : SRC-0075 §3 Moisture Sensitivity Level]. Les dégâts ne se voient pas
toujours de l'extérieur [HYPOTHÈSE : un délaminage interne peut ne laisser aucune trace visible].

::figure{id=S27-F02}

### Les niveaux MSL

Le niveau de sensibilité à l'humidité (MSL) d'un composant fixe sa **durée hors sachet**, du moment où
l'on ouvre le sachet étanche jusqu'à la soudure [SOURCÉ : SRC-0075 §3 Moisture Sensitivity Level].
D'après le tableau de la note TI, qui reprend la norme J-STD-033 :

| MSL | Durée hors sachet | Source |
|---|---|---|
| 1 | illimitée, à 30 °C et 85 % d'humidité au plus | [SOURCÉ : SRC-0075 §3 Moisture Sensitivity Level] |
| 2 | 1 an, à 30 °C et 60 % d'humidité au plus | [SOURCÉ : SRC-0075 §3 Moisture Sensitivity Level] |
| 2A | 4 semaines | [SOURCÉ : SRC-0075 §3 Moisture Sensitivity Level] |
| 3 | 168 heures | [SOURCÉ : SRC-0075 §3 Moisture Sensitivity Level] |
| 4 | 72 heures | [SOURCÉ : SRC-0075 §3 Moisture Sensitivity Level] |
| 5 | 48 heures | [SOURCÉ : SRC-0075 §3 Moisture Sensitivity Level] |
| 5A | 24 heures | [SOURCÉ : SRC-0075 §3 Moisture Sensitivity Level] |
| 6 | étuvage obligatoire avant usage | [SOURCÉ : SRC-0075 §3 Moisture Sensitivity Level] |

Le niveau MSL et la température maximale du boîtier figurent sur l'étiquette du conditionnement et dans
la documentation du fabricant [SOURCÉ : SRC-0075 §3 Moisture Sensitivity Level]. Les composants
sensibles sont livrés en sachet étanche avec un dessicant et une carte indicatrice d'humidité
[SOURCÉ : SRC-0075 §3 Moisture Sensitivity Level].

### Étuver avant de chauffer

Si la durée hors sachet est dépassée, ou si la carte indicatrice signale trop d'humidité, il faut étuver
avant la refusion [SOURCÉ : SRC-0075 §7 Drying of Components]. Pour une réparation, la note TI demande
un étuvage selon la J-STD-033 si la durée hors sachet est dépassée depuis la refusion d'origine
[SOURCÉ : SRC-0075 §8 Repair]. Elle cite un étuvage à 125 °C pendant 48 heures [SOURCÉ : SRC-0075 §10 Manual Rework Procedure], ou selon la J-STD-033,
si la durée est dépassée ou **inconnue** [SOURCÉ : SRC-0075 §10 Manual Rework Procedure]. Pour les QFN, TI
recommande d'étuver la carte avant toute reprise, pour réduire le risque de délaminage de la carte ou du
composant [SOURCÉ : SRC-0076 §6.1 Compound Removal].

Sur un calculateur de récupération, l'historique d'humidité est inconnu. La décision d'étuver se prend
avec la fiche du composant, la tenue des autres composants de la carte (électrolytiques, connecteurs,
vernis) et la documentation de l'étuve [À VÉRIFIER : température admise par les composants les plus
fragiles de la carte et notice de l'étuve de l'atelier]. On écrit la décision et sa raison au dossier.

### Exemple 4 : composant MSL 3

Un sachet de composants MSL 3 a été ouvert il y a dix jours, à l'air de l'atelier [EXEMPLE].

1. Durée hors sachet d'un MSL 3 : 168 heures, soit 7 jours [SOURCÉ : SRC-0075 §3 Moisture Sensitivity Level].
2. 10 jours dépassent 7 jours : la durée est dépassée.
3. Étuvage avant soudure, selon la fiche et la J-STD-033 [SOURCÉ : SRC-0075 §7 Drying of Components].

### Exemple 5 : un calculateur de récupération

On doit déposer un QFP sur une carte de calculateur dont on ne connaît pas l'historique [EXEMPLE].

1. Durée hors sachet inconnue : la note TI cite un étuvage dans ce cas [SOURCÉ : SRC-0075 §10 Manual Rework Procedure].
2. Vérifier ce que supportent les autres composants de la carte avant de choisir la température d'étuvage.
3. Si l'étuvage n'est pas possible, le noter au dossier comme limite : le composant reposé peut avoir souffert.

## Exercices

::exercice{id=S27-L02-EX01}

::exercice{id=S27-L02-EX02}
