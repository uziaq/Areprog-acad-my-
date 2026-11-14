---
id: S12-L01
titre: Symboles, références et valeurs
chapitre: S12
version: "0.1"
statut: brouillon
duree_min: 75
objectifs:
  - id: O1
    texte: Identifier sur un schéma les symboles des composants étudiés, y compris leurs variantes internationales
    competences: [D5.1]
  - id: O2
    texte: Lire la référence et la valeur d'un composant et les retrouver dans la nomenclature
    competences: [D5.1]
prerequis: [S11-L03, S07-L02]
exercices: [S12-L01-EX01, S12-L01-EX02, S12-L01-EX03]
references: [SRC-0030, SRC-0032, SRC-0015]
criteres_evaluation:
  - objectif: O1
    critere: Exercices S12-L01-EX01 et EX02 réussis et symboles du schéma public tous nommés au TP-19
  - objectif: O2
    critere: Exercice S12-L01-EX03 réussi et tableau des références par bloc complet au TP-19
figures:
  - id: S12-F01
    fichier: ../figures/S12-F01-symboles.svg
    legende: "Symboles courants. Ligne du haut : résistance (zigzag et rectangle international), condensateur non polarisé et polarisé, inductance, diode, LED. Ligne du bas : transistor NPN, MOSFET canal N, quartz, fusible, alimentation et masse."
    alt: "Douze petits symboles en deux lignes, chacun avec son nom en dessous : deux résistances, deux condensateurs dont un avec un signe plus, une inductance en boucles, une diode, une LED avec deux flèches sortantes, un NPN avec flèche sortante, un MOSFET, un quartz, un fusible, une flèche vers le haut marquée alimentation et trois traits marqués masse."
    origine: areprog
derniere_verification_sources: 2026-11-14
historique:
  - version: "0.1"
    date: 2026-11-14
    resume: Première rédaction
---

## Théorie

### Le schéma, carte du circuit

Un schéma est la carte qui sert à concevoir, construire et dépanner un circuit
[SOURCÉ : SRC-0030 §Overview]. Il ne montre pas où sont les composants sur la carte : il montre
comment ils sont reliés. Pour le réparateur, il répond à trois questions : quel est ce composant,
à quoi est-il relié, à quoi sert ce groupe de composants.

On travaille cette semaine sur des schémas **publics** : cartes d'évaluation de fabricants de
semi-conducteurs et matériel ouvert, comme le schéma de l'Arduino UNO Rev3, publié sous licence
libre [SOURCÉ : SRC-0032 §page 1]. On ne travaille jamais sur un schéma de calculateur non publié.

### Les symboles et leurs variantes

Les symboles de base sont normalisés, mais il existe des variantes
[SOURCÉ : SRC-0030 §Schematic Symbols (Part 1)] :

- **résistance** : un zigzag, ou un rectangle vide sur les schémas aux symboles internationaux [SOURCÉ : SRC-0030 §Resistors] ;
- **condensateur** : deux plaques ; une plaque courbe et un signe plus indiquent un condensateur polarisé, la plaque courbe étant en général la cathode [SOURCÉ : SRC-0030 §Capacitors] ;
- **inductance** : une suite de bosses ou de boucles, ou un rectangle plein en symbole international [SOURCÉ : SRC-0030 §Inductors] ;
- **diode** : un triangle contre un trait ; l'anode entre par le côté plat du triangle, la cathode sort par le trait [SOURCÉ : SRC-0030 §Diodes]. La LED ajoute deux flèches sortantes ; Zener et Schottky modifient le trait [SOURCÉ : SRC-0030 §Diodes] ;
- **transistor bipolaire** : la flèche est sur l'émetteur, sortante pour un NPN, entrante pour un PNP [SOURCÉ : SRC-0030 §Bipolar Junction Transistors (BJTs)] ;
- **MOSFET** : grille, drain et source ; la flèche du milieu entre pour un canal N, sort pour un canal P [SOURCÉ : SRC-0030 §Metal Oxide Field-Effect Transistors (MOSFETs)] ;
- **circuit intégré** : un rectangle avec des broches numérotées et nommées [SOURCÉ : SRC-0030 §Integrated Circuits] ; l'AOP garde son triangle et le régulateur est souvent un rectangle entrée à gauche, sortie à droite, masse en bas [SOURCÉ : SRC-0030 §Unique ICs: Op Amps, Voltage Regulators] ;
- **quartz** : deux bornes ; un résonateur avec ses condensateurs en a trois [SOURCÉ : SRC-0030 §Crystals and Resonators] ;
- **relais** : une bobine associée à un contact [SOURCÉ : SRC-0030 §Motors, Transformers, Speakers, and Relays] ; **fusible** et **CTP** ont leur propre symbole [SOURCÉ : SRC-0030 §Fuses and PTCs].

::figure{id=S12-F01}

Quand un symbole surprend, on cherche la fiche technique du composant ; le symbole seul ne suffit
pas toujours.

### Référence et valeur

Chaque composant porte une **référence** unique et une **valeur** [SOURCÉ : SRC-0030 §Names and Values] :

- la référence est une ou deux lettres et un numéro : R1, R2, C5, U3 ; elle désigne un seul composant du schéma [SOURCÉ : SRC-0030 §Names and Values] ;
- la valeur donne la caractéristique principale : ohms, farads, henrys, nom du circuit intégré, fréquence d'un quartz [SOURCÉ : SRC-0030 §Names and Values].

Préfixes les plus courants [SOURCÉ : SRC-0030 §Names and Values] :

| Préfixe | Composant |
|---|---|
| R | résistance |
| C | condensateur |
| L | inductance |
| S | interrupteur |
| D | diode |
| Q | transistor |
| U | circuit intégré |
| Y | quartz et oscillateur |

Ces préfixes ne sont pas suivis partout : on trouve IC au lieu de U, ou XTAL au lieu de Y
[SOURCÉ : SRC-0030 §Names and Values]. D'autres lettres se rencontrent, comme F pour le fusible
F1 du schéma de l'Arduino UNO [SOURCÉ : SRC-0032 §page 1], ou J pour un connecteur
[À VÉRIFIER : préfixe J et autres lettres dans la norme de désignation suivie par le schéma étudié].
On lit d'abord le symbole, puis on confirme par la référence.

La valeur s'écrit souvent avec la lettre à la place de la virgule : 4K7 vaut 4,7 kΩ [SOURCÉ : SRC-0015 §Marking Codes used on Chip Resistors] (S07-L02).

### La nomenclature

La **nomenclature** (BOM, *bill of materials*) est la liste des composants d'une carte : référence,
valeur, et souvent boîtier et référence de fabricant [HYPOTHÈSE : colonnes variables d'un fabricant à l'autre]. Elle complète le schéma :
le schéma dit « R12, 10 kΩ » [EXEMPLE] ; la nomenclature dit quel boîtier et quelle tolérance commander.
Quand le schéma et la nomenclature ne disent pas la même chose, on le note au journal et l'on
vérifie sur la carte.

### Exemple 1 : identifier un composant par sa référence

Sur un schéma public, on lit « Q2 » à côté d'un symbole à trois bornes, flèche sortante sur une
borne [EXEMPLE].

1. Préfixe Q : un transistor [SOURCÉ : SRC-0030 §Names and Values].
2. Flèche sur l'émetteur, sortante : un NPN [SOURCÉ : SRC-0030 §Bipolar Junction Transistors (BJTs)].
3. La valeur (nom du transistor) renvoie à sa fiche technique pour le brochage du boîtier.

### Exemple 2 : un symbole international

Un schéma européen montre un rectangle vide entre deux bornes, marqué « R7 4K7 » [EXEMPLE].

1. Rectangle vide et préfixe R : une résistance au symbole international [SOURCÉ : SRC-0030 §Resistors].
2. Valeur : 4,7 kΩ [EXEMPLE].
3. Un rectangle plein marqué L serait une inductance [SOURCÉ : SRC-0030 §Inductors].

### Exemple 3 : du schéma à la nomenclature

La nomenclature indique sur une même ligne « R3, R4, R9 : 10 kΩ, 0603 » [EXEMPLE].

1. Trois résistances de même valeur et même boîtier sont regroupées sur une ligne [EXEMPLE].
2. On retrouve chacune sur le schéma par sa référence.
3. Sur la carte, la sérigraphie R3 aide à la localiser, quand elle existe (S13).

## Exercices

::exercice{id=S12-L01-EX01}

::exercice{id=S12-L01-EX02}

::exercice{id=S12-L01-EX03}
