---
id: S12-L02
titre: Réseaux, étiquettes, alimentations et masses
chapitre: S12
version: "0.1"
statut: brouillon
duree_min: 75
objectifs:
  - id: O1
    texte: Suivre un réseau sur un schéma, y compris par ses étiquettes et entre plusieurs feuilles
    competences: [D5.1]
  - id: O2
    texte: Repérer les alimentations et les masses d'un schéma, et distinguer des masses de noms différents
    competences: [D5.1]
prerequis: [S12-L01]
exercices: [S12-L02-EX01, S12-L02-EX02, S12-L02-EX03]
references: [SRC-0030, SRC-0031, SRC-0032]
criteres_evaluation:
  - objectif: O1
    critere: Exercices S12-L02-EX01 et EX03 réussis et réseau suivi d'un bout à l'autre au TP-19
  - objectif: O2
    critere: Exercice S12-L02-EX02 réussi et liste des alimentations et des masses du schéma public au TP-19
figures:
  - id: S12-F02
    fichier: ../figures/S12-F02-reseaux.svg
    legende: "À gauche, deux fils qui se croisent sans point : pas de liaison ; avec un point : liaison. À droite, deux portions de schéma séparées reliées par la même étiquette de réseau SENS, et des symboles d'alimentation +5V et de masse GND."
    alt: "Panneau gauche : un croisement de deux traits sans point, marqué pas de liaison, et un croisement avec un point noir, marqué liaison. Panneau droit : une résistance dont un fil porte l'étiquette SENS, et plus loin une entrée de circuit intégré avec la même étiquette SENS ; une flèche vers le haut marquée +5V et trois traits marqués GND."
    origine: areprog
derniere_verification_sources: 2026-11-14
historique:
  - version: "0.1"
    date: 2026-11-14
    resume: Première rédaction
---

## Théorie

### Le réseau

Un **réseau** (*net*) dit comment les composants sont reliés ; il est dessiné par des traits entre
les bornes [SOURCÉ : SRC-0030 §Nets, Nodes and Labels]. Tout ce qui touche un même réseau est au
même potentiel, aux chutes de tension des pistes près (S13).

### Jonction ou simple croisement

Quand un fil se partage, il forme une **jonction**, marquée par un point
[SOURCÉ : SRC-0030 §Junctions and Nodes]. Sans point, deux fils qui se croisent ne sont **pas**
reliés : ils passent l'un sur l'autre [SOURCÉ : SRC-0030 §Junctions and Nodes]. Un point oublié ou
mal vu change complètement la lecture : on regarde chaque croisement de près.

::figure{id=S12-F02}

### Les étiquettes de réseau

Pour alléger un schéma, on donne un **nom** à un réseau au lieu de tirer un fil d'un bout à l'autre ;
les réseaux de même nom sont reliés, même sans fil visible [SOURCÉ : SRC-0030 §Net Names]. Le nom
dit souvent la fonction : VCC ou 5V pour une alimentation, RX ou TX pour une liaison série [SOURCÉ : SRC-0030 §Net Names].

Sur un schéma de plusieurs feuilles, des **ports** ou des étiquettes globales portent le réseau
d'une feuille à l'autre, souvent avec un renvoi vers la feuille de destination
[À VÉRIFIER : notation des ports et renvois propre au logiciel de dessin du schéma étudié]. Plusieurs
réseaux de même famille peuvent être regroupés en **bus**, par exemple D0 à D7
[À VÉRIFIER : notation des bus propre au logiciel de dessin du schéma étudié]. Méthode : noter le nom
exact du réseau, chercher toutes ses apparitions, sur toutes les feuilles, et lister les composants
qu'il touche.

### Alimentations et masses

Les symboles d'alimentation et de masse sont des nœuds de tension à une seule borne : toutes les
bornes reliées à des nœuds de même nom (GND, 5V, 3.3V) sont reliées entre elles [SOURCÉ : SRC-0030 §Recognize Voltage Nodes]. Une flèche vers le haut indique en général une
alimentation positive ; un à trois traits, ou un triangle vers le bas, une masse
[SOURCÉ : SRC-0030 §Voltage Nodes].

### Les masses multiples

Un schéma peut avoir plusieurs masses de noms différents. Sur le schéma de l'Arduino UNO Rev3, on
lit par exemple GND, AGND et UGND [SOURCÉ : SRC-0032 §page 1]. Des masses de noms différents ne sont
pas forcément reliées sur le schéma, ou le sont en un point précis : on cherche où elles se
rejoignent avant de les considérer comme un seul réseau.

- Les broches AGND (masse analogique) et DGND (masse numérique) d'un convertisseur décrivent ce qui se passe à l'intérieur du composant ; elles n'imposent pas à elles seules la façon de relier les masses à l'extérieur [SOURCÉ : SRC-0031 §Interpretation of AGND and DGND pins in mixed-signal devices].
- La **masse en étoile** : toutes les tensions sont mesurées par rapport à un point précis du réseau de masse, pas par rapport à n'importe quel endroit où l'on pince une sonde [SOURCÉ : SRC-0031 §Introduction].
- Un plan de masse continu offre un chemin de retour de faible impédance [SOURCÉ : SRC-0031 §Analog or digital ground plane, or both?] ; on le retrouve en S13.

Conséquence pour la mesure : avant de poser la masse d'une sonde ou la pointe noire du multimètre,
on vérifie sur le schéma à quelle masse le signal est rapporté (S11-L02).

### Exemple 4 : suivre un réseau par son étiquette

Sur la feuille 1, une résistance R5 aboutit à un fil étiqueté SENS ; sur la feuille 2, l'entrée d'un
convertisseur porte aussi l'étiquette SENS [EXEMPLE].

1. Même nom : même réseau, même sans fil visible [SOURCÉ : SRC-0030 §Net Names].
2. On liste tout ce qui touche SENS, sur toutes les feuilles : R5, le convertisseur, et peut-être un condensateur de filtrage [EXEMPLE].
3. Une étiquette écrite « SENSE » ailleurs serait un **autre** réseau : on compare les noms lettre à lettre.

### Exemple 5 : lire un diviseur sur un schéma

R5 = 22 kΩ [EXEMPLE] relie le réseau +5V au réseau SENS ; R6 = 10 kΩ [EXEMPLE] relie SENS à GND.

1. Diviseur de tension (S03) : U(SENS) = 5 × 10 / (22 + 10) [EXEMPLE].
2. U(SENS) ≈ 1,56 V [EXEMPLE].
3. Cette valeur se confirme par une mesure, masse du multimètre sur le même GND que R6.

### Exemple 6 : deux masses de noms différents

Un schéma montre un réseau AGND autour d'un capteur et un réseau GND autour du microcontrôleur [EXEMPLE].

1. On cherche où AGND et GND se rejoignent : un pont, une résistance de 0 Ω, une ferrite, ou rien [EXEMPLE].
2. Sans liaison trouvée sur le schéma, on ne suppose pas qu'elles sont reliées [HYPOTHÈSE : à confirmer au multimètre, carte hors tension].
3. On note au journal quelle masse sert de référence pour chaque mesure.

## Exercices

::exercice{id=S12-L02-EX01}

::exercice{id=S12-L02-EX02}

::exercice{id=S12-L02-EX03}
