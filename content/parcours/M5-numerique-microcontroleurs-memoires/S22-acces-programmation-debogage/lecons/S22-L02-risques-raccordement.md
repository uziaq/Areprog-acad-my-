---
id: S22-L02
titre: Risques matériels d'un raccordement de programmation
chapitre: S22
version: "0.1"
statut: brouillon
duree_min: 90
objectifs:
  - id: O1
    texte: Identifier les risques d'un raccordement (double alimentation, niveaux, masse, broche court-circuitée, charge capacitive)
    competences: [D7.5, D9.1]
  - id: O2
    texte: Calculer le courant limité par une résistance de protection sur une ligne partagée
    competences: [D7.5]
prerequis: [S22-L01, S19-L02]
exercices: [S22-L02-EX01, S22-L02-EX02, S22-L02-EX03]
references: [SRC-0056, SRC-0053]
criteres_evaluation:
  - objectif: O1
    critere: Exercices S22-L02-EX01 et S22-L02-EX03 réussis et vérifications d'avant raccordement faites au TP-32
  - objectif: O2
    critere: Exercice S22-L02-EX02 réussi
figures:
  - id: S22-F02
    fichier: ../figures/S22-F02-raccordement.svg
    legende: "Points à vérifier avant de raccorder une sonde de programmation : masse commune, une seule source d'alimentation, référence de tension de la carte vers la sonde, résistances de protection sur les lignes partagées, aucune charge capacitive sur les lignes de l'interface. Schéma de principe de l'académie."
    alt: "Une sonde à gauche, une carte à droite. Entre les deux : une ligne de masse, une ligne de référence de tension qui va de la carte à la sonde, et des lignes de signaux avec une résistance série du côté de la carte. Une croix barre une seconde alimentation de la carte quand la sonde l'alimente."
    origine: areprog
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction
---

## Théorie

### Une seule source d'alimentation

Certains programmateurs sont alimentés par la carte et s'adaptent ainsi à son niveau logique ;
d'autres peuvent alimenter la carte par leur ligne de tension cible, et l'alimentation de la carte
doit alors rester coupée [SOURCÉ : SRC-0056 §4.1 SPI Programming Interface]. Deux sources reliées en
même temps peuvent se renvoyer du courant l'une dans l'autre [HYPOTHÈSE : conséquence du câblage,
d'où la règle d'une seule source à la fois].

### Les niveaux et la référence de tension

La ligne de référence de tension de la carte permet à la sonde d'adapter ses niveaux, ou alimente le
microcontrôleur pendant la programmation [SOURCÉ : SRC-0056 §4.2 JTAG Interface]. Une sonde réglée en
5 V sur un microcontrôleur alimenté en 3,3 V viole les conditions d'interface de S19-L02 [EXEMPLE] ;
on les vérifie avant de brancher [SOURCÉ : SRC-0053 §1 Introduction].

### La masse et les lignes partagées

- **Masse** : la masse de la sonde se relie à la masse de la carte avant les signaux [SOURCÉ : SRC-0056 §4.2.1 Shared Use of JTAG Lines].
- **Lignes partagées** : si d'autres circuits utilisent les lignes de l'interface, ils peuvent les piloter en même temps que le programmateur ; des résistances série protègent le programmateur [SOURCÉ : SRC-0056 §4.1.1 Shared Use of SPI Programming Lines].
- **Charge capacitive** : une ligne JTAG chargée par le condensateur d'un filtre peut faire échouer la programmation ; le condensateur se retire pendant la programmation, pour que la charge reste résistive [SOURCÉ : SRC-0056 §4.2.1 Shared Use of JTAG Lines].
- **Broche court-circuitée** : une pointe ou une pince qui glisse entre deux broches peut relier un signal à l'alimentation ou à la masse [HYPOTHÈSE : risque mécanique, d'où le contrôle du raccordement hors tension].

### La coupure pendant une écriture

Une coupure ou un débranchement pendant une programmation peut laisser la mémoire dans un état
incohérent (S21-L03) [HYPOTHÈSE]. Avant toute écriture : deux sauvegardes identiques, alimentation
stable et limitée, câble fixé, et aucune manipulation tant que l'outil n'a pas terminé.

### Exemple 4 : résistance de protection

Une ligne partagée porte une résistance série de 330 Ω [EXEMPLE] ; la carte est alimentée en 3,3 V.

1. Courant maximal si les deux côtés s'opposent : 3,3 / 330 = 10 mA [EXEMPLE].
2. La note Microchip donne cette valeur comme limite visée pour cet exemple [SOURCÉ : SRC-0056 §4.1.1 Shared Use of SPI Programming Lines].
3. La valeur réelle dépend de l'outil et de la carte : on la relève sur la carte de référence.

### Exemple 5 : sonde qui alimente la carte

L'outil peut alimenter la carte par sa ligne de tension cible ; la carte est aussi branchée sur le banc [EXEMPLE].

1. Règle : une seule source ; si l'outil alimente, le banc est coupé [SOURCÉ : SRC-0056 §4.1 SPI Programming Interface].
2. Vérification : lire dans la documentation de l'outil s'il alimente la carte ou s'il lit seulement sa tension.
3. Noter le choix au journal avant de brancher.

### Exemple 6 : programmation qui échoue sur une ligne filtrée

La programmation JTAG échoue ; le schéma montre un condensateur de filtre sur une ligne de l'interface [EXEMPLE].

1. Hypothèse : charge capacitive trop forte pour la sonde [SOURCÉ : SRC-0056 §4.2.1 Shared Use of JTAG Lines].
2. Vérification : fronts de la ligne à l'oscilloscope, comparés à une ligne sans filtre.
3. Action, sur carte d'entraînement seulement : retirer le condensateur pendant la programmation, puis le reposer.

## Exercices

::exercice{id=S22-L02-EX01}

::exercice{id=S22-L02-EX02}

::exercice{id=S22-L02-EX03}
