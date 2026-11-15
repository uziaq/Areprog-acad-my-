---
id: S13-L01
titre: Structure d'un circuit imprimé multicouche
chapitre: S13
version: "0.1"
statut: brouillon
duree_min: 75
objectifs:
  - id: O1
    texte: Nommer les couches d'un circuit imprimé (substrat, cuivre, vernis épargne, sérigraphie) et ses éléments (pastille, piste, plan, via, point de test)
    competences: [D5.3]
  - id: O2
    texte: Distinguer via traversant, via borgne, via enterré et microvia, et en déduire ce qu'on peut suivre à l'œil
    competences: [D5.3]
  - id: O3
    texte: Calculer la résistance d'une piste à partir de ses dimensions et de la résistivité du cuivre
    competences: [D5.3]
prerequis: [S12-L03]
exercices: [S13-L01-EX01, S13-L01-EX02, S13-L01-EX03]
references: [SRC-0033, SRC-0034, SRC-0035, SRC-0031]
criteres_evaluation:
  - objectif: O1
    critere: Exercice S13-L01-EX01 réussi et éléments de la carte de récupération nommés sur les photos du TP-20
  - objectif: O2
    critere: Exercice S13-L01-EX02 réussi
  - objectif: O3
    critere: Exercice S13-L01-EX03 réussi
figures:
  - id: S13-F01
    fichier: ../figures/S13-F01-coupe-pcb.svg
    legende: "Coupe d'un circuit imprimé à quatre couches de cuivre, épaisseurs non à l'échelle. Un via traversant relie les deux faces ; un via borgne part d'une face et s'arrête à une couche interne ; un via enterré relie deux couches internes sans être visible."
    alt: "Empilement horizontal, de haut en bas : sérigraphie, vernis épargne, cuivre face avant, substrat, cuivre interne 1, substrat, cuivre interne 2, substrat, cuivre face arrière, vernis épargne. Trois trous verticaux : un traverse tout l'empilement, un descend de la face avant jusqu'au cuivre interne 1, un relie seulement les deux cuivres internes."
    origine: areprog
derniere_verification_sources: 2026-11-14
historique:
  - version: "0.1"
    date: 2026-11-14
    resume: Première rédaction
---

## Théorie

### Un empilement de couches

Un circuit imprimé est un empilement de couches de matériaux différents, laminées ensemble à chaud
avec un adhésif [SOURCÉ : SRC-0033 §Composition]. Du centre vers l'extérieur :

- **substrat** : en général de la fibre de verre, désignée FR4, qui donne rigidité et épaisseur ; il existe aussi des circuits souples [SOURCÉ : SRC-0033 §FR4] ;
- **cuivre** : une feuille fine laminée sur le substrat ; une carte « double face » ou « 2 couches » a deux couches de cuivre, et l'on va d'une couche à seize ou plus [SOURCÉ : SRC-0033 §Copper] ;
- **vernis épargne** (*soldermask*) : il isole les pistes d'un contact accidentel et évite les ponts de soudure, en laissant les pastilles à nu [SOURCÉ : SRC-0033 §Soldermask] ;
- **sérigraphie** : lettres, chiffres et symboles imprimés sur le vernis pour l'assemblage et le repérage [SOURCÉ : SRC-0033 §Silkscreen].

L'épaisseur du cuivre se donne en onces par pied carré ; une once correspond à environ 35 µm [SOURCÉ : SRC-0033 §Copper].

::figure{id=S13-F01}

Sur une carte multicouche, les couches internes ne se voient pas : une piste qui plonge dans un via
peut ressortir n'importe où. C'est la principale difficulté du suivi de piste (S13-L02).

### Le vocabulaire de la carte

Termes utiles au réparateur [SOURCÉ : SRC-0033 §Terminology] :

- **pastille** (*pad*) : métal à nu en surface, sur lequel un composant est soudé ;
- **piste** (*trace*) : chemin continu de cuivre ;
- **plan** ou **zone de cuivre** (*plane*, *pour*) : surface continue de cuivre, souvent reliée à la masse ;
- **trou métallisé** (*plated through hole*) : trou métallisé sur toute l'épaisseur, pour une broche traversante, un via ou une fixation ;
- **via** : trou qui fait passer un signal d'une couche à une autre ; un via « tenté » est recouvert de vernis ;
- **thermique** (*thermal*) : petite piste qui relie une pastille à un plan ; sans elle, la pastille chauffe mal et la soudure est difficile ;
- **pogo pin** : contact à ressort qui touche un point de test pour un essai ou une programmation.

Le logiciel de conception sépare les couches de cuivre et les couches techniques (sérigraphie,
vernis, pâte à braser) [SOURCÉ : SRC-0034 §Board layers]. KiCad, par exemple, accepte jusqu'à
32 couches de cuivre [SOURCÉ : SRC-0034 §Capabilities].

### Les types de vias

Le logiciel KiCad distingue [SOURCÉ : SRC-0034 §Placing vias] :

- le **via traversant**, qui va d'une face à l'autre ;
- le **microvia**, qui relie une couche externe à la couche voisine seulement ;
- le **via borgne** ou **enterré**, placé entre des couches quelconques.

Conséquence pour le suivi : un via traversant se voit des deux côtés et se teste au multimètre d'une
face à l'autre ; un via borgne ne se voit que d'un côté ; un via enterré ne se voit pas du tout
[HYPOTHÈSE : déduit de la géométrie des vias, à constater sur chaque carte].

### La résistance d'une piste

Une piste est un conducteur : sa résistance vaut R = ρ × l / A, avec ρ la résistivité, l la
longueur et A la section [SOURCÉ : SRC-0035 §Specific resistance].
Pour le cuivre à 20 °C, ρ = 1,678 × 10⁻⁸ Ω·m [SOURCÉ : SRC-0035 §Specific resistance]. La section d'une piste est sa largeur
multipliée par l'épaisseur du cuivre.

Une piste a une résistance de l'ordre du dixième d'ohm ou moins [EXEMPLE : voir l'exemple 1] : au
multimètre, elle se confond avec un court-circuit. Une lecture de plusieurs ohms entre deux points
« reliés » signale donc autre chose qu'une piste seule.

### Exemple 1 : résistance d'une piste

Une piste mesure 100 mm de long, 0,25 mm de large, sur du cuivre de 35 µm [EXEMPLE].

1. Section : 0,25 × 10⁻³ × 35 × 10⁻⁶ = 8,75 × 10⁻⁹ m² [EXEMPLE].
2. R = 1,678 × 10⁻⁸ × 0,1 / 8,75 × 10⁻⁹ ≈ 0,19 Ω [EXEMPLE].
3. Parcourue par 2 A, elle fait chuter 2 × 0,19 ≈ 0,38 V [EXEMPLE] : les pistes de puissance sont plus larges.

### Exemple 2 : lire une carte à l'œil

Sur une face, une piste fine va d'une pastille à un petit trou recouvert de vernis [EXEMPLE].

1. Le petit trou est un via tenté [SOURCÉ : SRC-0033 §Terminology].
2. On retourne la carte : s'il apparaît au même endroit, c'est probablement un via traversant [HYPOTHÈSE : à confirmer au multimètre].
3. S'il n'apparaît pas, la piste continue sur une couche interne : on la suivra par continuité.

### Exemple 3 : un plan de masse

Une grande surface de cuivre couvre presque toute une face, percée autour des pastilles [EXEMPLE].

1. C'est un plan ou une zone de cuivre [SOURCÉ : SRC-0033 §Terminology].
2. Il est souvent relié à la masse et offre un chemin de retour de faible impédance [SOURCÉ : SRC-0031 §Analog or digital ground plane, or both?].
3. Les pastilles reliées au plan par de petites pistes ont des thermiques : elles demandent plus de chaleur au dessoudage (FR-10).

## Exercices

::exercice{id=S13-L01-EX01}

::exercice{id=S13-L01-EX02}

::exercice{id=S13-L01-EX03}
