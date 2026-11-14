---
id: S07-L01
titre: Boîtiers CMS, désignations et identification au microscope
chapitre: S07
version: "0.1"
statut: brouillon
duree_min: 75
objectifs:
  - id: O1
    texte: Nommer les boîtiers CMS passifs courants et passer d'un code en pouces à ses dimensions d'après une fiche technique
    competences: [D4.1]
  - id: O2
    texte: Reconnaître au microscope les familles de boîtiers courantes (puces passives, SOD, MELF, SOT-23, SOIC)
    competences: [D4.1, D3.5]
  - id: O3
    texte: Relier la taille d'une résistance CMS à sa puissance admissible, en lisant la fiche technique de la série
    competences: [D4.1, D4.6]
prerequis: [S06]
exercices: [S07-L01-EX01, S07-L01-EX02, S07-L01-EX03]
references: [SRC-0016]
criteres_evaluation:
  - objectif: O1
    critere: Exercice S07-L01-EX01 réussi et boîtiers nommés dans l'inventaire du TP-10
  - objectif: O2
    critere: Questions du QCM sur les familles de boîtiers réussies et photo annotée du TP-10 validée
  - objectif: O3
    critere: Exercices S07-L01-EX02 et EX03 réussis
figures:
  - id: S07-F01
    fichier: ../figures/S07-F01-boitiers.svg
    legende: "Familles de boîtiers CMS courantes, vues de dessus, sans échelle : puce passive à deux électrodes (résistance ou condensateur), diode SOD, cylindre MELF, transistor SOT-23 à trois broches, circuit intégré SOIC-8. Les dimensions réelles se lisent dans la fiche technique du composant."
    alt: "Cinq dessins côte à côte. Un petit rectangle avec une électrode à chaque bout, nommé puce passive. Un rectangle avec deux pattes et une barre de repère, nommé SOD. Un cylindre avec deux bagues métalliques, nommé MELF. Un petit boîtier avec deux pattes d'un côté et une de l'autre, nommé SOT-23. Un boîtier rectangulaire avec quatre pattes de chaque côté et un point repère, nommé SOIC-8."
    origine: areprog
derniere_verification_sources: 2026-11-14
historique:
  - version: "0.1"
    date: 2026-11-14
    resume: Première rédaction
---

## Théorie

### Le code de taille d'une puce passive

Les résistances et condensateurs CMS les plus courants sont des **puces** (*chips*) à deux
électrodes. Leur taille se désigne par un code à quatre chiffres. Dans une fiche technique
Vishay, chaque taille porte à la fois un code en **pouces** et un code **métrique** : la taille
0805 en pouces correspond au code métrique RR2012M, pour une longueur de 2,0 mm et une largeur de
1,25 mm [SOURCÉ : SRC-0016 §Dimensions and Mass].

Les deux premiers chiffres donnent la longueur, les deux derniers la largeur : en centièmes de
pouce pour le code en pouces, en dixièmes de millimètre pour le code métrique.

| Code en pouces | Code métrique (fiche Vishay) | Longueur × largeur |
|---|---|---|
| 0402 | RR1005M | 1,0 × 0,5 mm [SOURCÉ : SRC-0016 §Dimensions and Mass] |
| 0603 | RR1608M | 1,55 × 0,85 mm [SOURCÉ : SRC-0016 §Dimensions and Mass] |
| 0805 | RR2012M | 2,0 × 1,25 mm [SOURCÉ : SRC-0016 §Dimensions and Mass] |
| 1206 | RR3216M | 3,2 × 1,6 mm [SOURCÉ : SRC-0016 §Dimensions and Mass] |
| 1210 | RR3225M | 3,2 × 2,5 mm [SOURCÉ : SRC-0016 §Dimensions and Mass] |
| 2010 | RR5025M | 5,0 × 2,5 mm [SOURCÉ : SRC-0016 §Dimensions and Mass] |
| 2512 | RR6332M | 6,3 × 3,15 mm [SOURCÉ : SRC-0016 §Dimensions and Mass] |

**Piège** : un même nombre peut désigner deux tailles différentes. « 0603 » en pouces mesure
environ 1,6 × 0,8 mm (code métrique 1608), alors qu'un code métrique « 0603 » désigne une puce
beaucoup plus petite [À VÉRIFIER : correspondance du code métrique 0603 avec la taille 0201 en pouces, à confirmer dans une fiche technique].
Toujours vérifier dans la fiche technique si le code est en pouces ou en millimètres.

### Les autres familles de boîtiers

::figure{id=S07-F01}

- **SOD** : petit boîtier de diode à deux pattes ; une barre repère la cathode (S08).
- **MELF** : composant cylindrique à deux bagues métalliques (résistances, diodes).
- **SOT-23** : boîtier à trois broches (parfois plus), pour transistors et petites diodes doubles (S09).
- **SOIC** : circuit intégré à deux rangées de pattes ; un point ou un chanfrein repère la broche 1.

Le nom d'un boîtier ne dit rien de la fonction du composant : un SOT-23 peut contenir un
transistor, une diode double ou un régulateur. Seul le marquage, rapproché d'une fiche
technique, permet d'identifier le composant (leçon S07-L02).

### Identifier au microscope

1. Poser la carte sur le poste ESD, bracelet au poignet (S01).
2. Photographier la zone **avant** toute intervention, avec un repère d'échelle (règle ou pied à coulisse) ou la mesure du logiciel du microscope.
3. Estimer la longueur et la largeur de la puce, puis la rapprocher du tableau ci-dessus.
4. Noter la famille de boîtier, le marquage s'il existe, la référence sérigraphiée (R12, C5…) et l'orientation (barre, point, chanfrein).
5. Ne rien conclure sur la valeur d'un composant à partir de sa seule couleur ou de sa taille.

### Taille et puissance

Une puce plus grande évacue mieux la chaleur. Dans la série Vishay D/CRCW e3, la puissance
admissible à 70 °C passe de 0,063 W en 0402 à 1,0 W en 2512 [SOURCÉ : SRC-0016 §Technical Specifications] :

| Taille | Puissance admissible (série D/CRCW e3) | Tension de service maximale |
|---|---|---|
| 0402 | 0,063 W [SOURCÉ : SRC-0016 §Technical Specifications] | 50 V [SOURCÉ : SRC-0016 §Technical Specifications] |
| 0805 | 0,125 W [SOURCÉ : SRC-0016 §Technical Specifications] | 150 V [SOURCÉ : SRC-0016 §Technical Specifications] |
| 1206 | 0,25 W [SOURCÉ : SRC-0016 §Technical Specifications] | 200 V [SOURCÉ : SRC-0016 §Technical Specifications] |
| 2512 | 1,0 W [SOURCÉ : SRC-0016 §Technical Specifications] | 500 V [SOURCÉ : SRC-0016 §Technical Specifications] |

Ces valeurs sont celles **de cette série** : une autre série, ou un autre fabricant, peut
annoncer d'autres valeurs pour la même taille. La puissance nominale ne vaut que si la
température admissible de la couche résistive n'est pas dépassée [SOURCÉ : SRC-0016 §Application Information] ;
au-dessus de 70 °C, la fiche donne une courbe de déclassement [SOURCÉ : SRC-0016 §Functional Performance].

### Exemple 1 : du code aux dimensions

Une puce est désignée 1206 dans une nomenclature [EXEMPLE].

1. Code en pouces : 12 et 06 centièmes de pouce, soit environ 3,0 × 1,5 mm [EXEMPLE : conversion arrondie, 1 pouce = 25,4 mm].
2. La fiche Vishay donne 3,2 × 1,6 mm [SOURCÉ : SRC-0016 §Dimensions and Mass] : la conversion du code est approchée, la fiche fait foi.

### Exemple 2 : vérifier une puissance

Une résistance de 100 Ω en 0805 de la série D/CRCW e3 est parcourue par 30 mA [EXEMPLE].

1. Puissance dissipée : P = R × I² = 100 × 0,03² = 0,09 W [EXEMPLE].
2. Puissance admissible à 70 °C pour cette série en 0805 : 0,125 W [SOURCÉ : SRC-0016 §Technical Specifications].
3. 0,09 W reste en dessous, mais avec peu de marge [EXEMPLE] ; au-dessus de 70 °C, il faut lire la courbe de déclassement.

### Exemple 3 : identifier une famille de boîtier

Au microscope, un composant noir à trois pattes, deux d'un côté et une de l'autre, porte un marquage de deux caractères [EXEMPLE].

1. Famille : SOT-23 [EXEMPLE].
2. Fonction : inconnue à ce stade ; un SOT-23 peut contenir plusieurs types de composants.
3. Suite : rechercher le marquage dans les tables de codes des fabricants, puis confirmer avec la fiche technique et le schéma (leçon S07-L02) [HYPOTHÈSE].

## Exercices

::exercice{id=S07-L01-EX01}

::exercice{id=S07-L01-EX02}

::exercice{id=S07-L01-EX03}
