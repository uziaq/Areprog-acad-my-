---
id: S17-L02
titre: La chaîne d'entrée d'un calculateur
chapitre: S17
version: "0.1"
statut: brouillon
duree_min: 90
objectifs:
  - id: O1
    texte: Décrire l'architecture générique d'alimentation d'un calculateur, de la broche du connecteur au microcontrôleur
    competences: [D6.3]
  - id: O2
    texte: Comparer les protections contre l'inversion de polarité et calculer la perte d'une diode série
    competences: [D6.3]
  - id: O3
    texte: Identifier sur une carte de récupération les éléments probables de la chaîne d'entrée et les confirmer par le relevé
    competences: [D6.3]
prerequis: [S17-L01, S13-L03]
exercices: [S17-L02-EX01, S17-L02-EX02, S17-L02-EX03]
references: [SRC-0042, SRC-0043]
criteres_evaluation:
  - objectif: O1
    critere: Exercice S17-L02-EX01 réussi
  - objectif: O2
    critere: Exercice S17-L02-EX02 réussi
  - objectif: O3
    critere: Exercice S17-L02-EX03 réussi et schéma de la chaîne d'entrée relevé au TP-23
figures:
  - id: S17-F02
    fichier: ../figures/S17-F02-chaine-entree.svg
    legende: "Chaîne d'entrée générique d'un calculateur, d'après la note TI SLYT707 : broche du plus batterie, protection contre l'inversion, protection contre les transitoires (diode TVS vers la masse), filtre CEM, convertisseur ou régulateur, puis rails internes vers le microcontrôleur, avec la supervision (reset). Schéma de principe, pas celui d'un calculateur réel."
    alt: "Suite de blocs reliés de gauche à droite : batterie, protection inversion, filtre CEM, convertisseur, régulateurs, microcontrôleur. Entre la protection inversion et le filtre, une diode TVS descend vers la masse. Un bloc supervision relie les rails internes au reset du microcontrôleur."
    origine: areprog
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction
---

## Théorie

### L'architecture générique

L'étage d'entrée d'un calculateur alimenté par la batterie enchaîne une protection contre
l'inversion de polarité, une protection contre les transitoires, un filtre CEM et un convertisseur
[SOURCÉ : SRC-0042 §Introduction to automotive transients]. Viennent ensuite les régulateurs des
tensions internes (S15, S16) et la supervision, qui maintient le reset du microcontrôleur tant que
l'alimentation n'est pas correcte [SOURCÉ : SRC-0043 §5.3 Voltage Supervision].

::figure{id=S17-F02}

L'ordre et le nombre de blocs varient d'une carte à l'autre ; certains blocs sont réunis dans un
seul circuit intégré (S17-L03) [HYPOTHÈSE : à confirmer par le relevé de chaque carte].

### La protection contre l'inversion de polarité

Elle protège les composants reliés au plus batterie d'une tension négative, par exemple une source
de démarrage branchée à l'envers [SOURCÉ : SRC-0042 §Reverse-polarity protection]. ISO 16750-2 et
les constructeurs l'exigent pour chaque calculateur [SOURCÉ : SRC-0043 §5.2.1 Reverse Battery Protection]. Solutions courantes [SOURCÉ : SRC-0042 §Reverse-polarity protection] :

- **diode série** (souvent Schottky) : la plus simple, mais elle perd de la puissance ; réservée aux faibles courants ;
- **transistor MOSFET à canal P** : supporte plus de courant, mais demande une résistance et une diode Zener de commande ;
- **MOSFET à canal N piloté par un contrôleur de « diode idéale »** : le moins de pertes.

Une diode classique chute typiquement 600 à 700 mV en direct [SOURCÉ : SRC-0043 §5.2.1 Reverse Battery Protection] ;
sa perte vaut P = VF × I. Avec un MOSFET, la perte ne dépend que de sa résistance à l'état passant
[SOURCÉ : SRC-0043 §5.2.1 Reverse Battery Protection].

### La protection contre les transitoires

Des diodes TVS sur l'entrée protègent contre les transitoires positifs et négatifs (S08-L02)
[SOURCÉ : SRC-0043 §5.2.2 TVS Diodes] :

- la diode positive doit commencer à écrêter **au-dessus** du démarrage 24 V et du délestage écrêté, mais rester **sous** la tension maximale des composants en aval [SOURCÉ : SRC-0043 §5.2.2 TVS Diodes] ;
- la diode négative ne doit pas conduire lors d'une inversion de batterie, sinon elle la court-circuite [SOURCÉ : SRC-0043 §5.2.2 TVS Diodes] ;
- sa puissance crête admise, liée à la taille du boîtier, se choisit d'après l'impulsion la plus sévère (S17-L01, exemple 2) [SOURCÉ : SRC-0043 §5.2.2 TVS Diodes].

### Le filtre et les condensateurs d'entrée

Un filtre en pi (condensateur, inductance, condensateur) complète l'écrêtage des impulsions rapides
3a et 3b [SOURCÉ : SRC-0043 §5.2.2 TVS Diodes]. Le filtre CEM atténue aussi l'ondulation de courant
que le convertisseur renvoie vers la batterie [SOURCÉ : SRC-0042 §Boost + buck power stage].
Un condensateur céramique d'entrée peut casser en court-circuit si la carte se tord ; relié
directement à la batterie, il court-circuiterait l'entrée. On en met donc souvent **deux en série**,
placés à 90° l'un de l'autre [SOURCÉ : SRC-0043 §5.2.3 Input Capacitors exposed to battery inputs].

### Le convertisseur d'entrée

Le convertisseur doit supporter le délestage écrêté et continuer à alimenter la carte pendant le
creux de démarrage [SOURCÉ : SRC-0042 §Designing the power conversion stage]. Selon la carte : un
buck à large plage d'entrée, un boost placé avant un buck, ou un buck-boost
[SOURCÉ : SRC-0042 §Boost + buck power stage]. Les tensions internes, par exemple 5 V et 3,3 V [EXEMPLE], sont ensuite produites par des bucks ou des LDO [SOURCÉ : SRC-0042 §Buck-boost power stage].

### Reconnaître la chaîne sur une carte

Démarche de relevé (S13-L03) [EXEMPLE : méthode pédagogique, chaque identification reste à confirmer] :

1. Partir des broches 30 et 15 du connecteur, repérées sur la documentation du constructeur.
2. Suivre la piste large du plus permanent : on y trouve en général la protection contre l'inversion (diode de puissance ou MOSFET), puis une diode TVS vers la masse [HYPOTHÈSE].
3. Repérer l'inductance du filtre et les condensateurs d'entrée, puis le circuit intégré du convertisseur avec son inductance (S16).
4. Identifier chaque composant par son marquage et sa fiche ; marquer `[À VÉRIFIER]` tout ce qui n'est pas confirmé.

### Exemple 4 : perte dans une diode série

Un calculateur consomme 2 A sous 13,5 V ; sa protection est une diode série qui chute 0,65 V [EXEMPLE].

1. Perte : 0,65 × 2 = 1,3 W [EXEMPLE], dissipée en permanence.
2. Avec un MOSFET de 10 mΩ [EXEMPLE] : 0,01 × 2² = 0,04 W [EXEMPLE].
3. D'où l'intérêt du MOSFET pour les courants élevés.

### Exemple 5 : choisir le seuil d'une diode TVS

Sur un réseau 12 V, le cahier des charges impose de supporter le démarrage avec une batterie 24 V et le délestage écrêté ; le convertisseur en aval supporte 40 V [EXEMPLE].

1. La diode ne doit pas conduire pendant le démarrage avec une batterie 24 V ni pendant le délestage écrêté [SOURCÉ : SRC-0043 §5.2.2 TVS Diodes] ; sinon elle chaufferait sur une surtension prolongée [HYPOTHÈSE].
2. Sa tension d'écrêtage maximale doit rester sous 40 V [EXEMPLE].
3. Les tensions d'essai se lisent dans la norme et le cahier des charges [À VÉRIFIER : valeurs d'ISO 16750-2, édition en vigueur].

### Exemple 6 : deux condensateurs en série

Sur une carte, deux condensateurs céramiques identiques sont en série entre le plus permanent et la masse, tournés à 90° l'un de l'autre [EXEMPLE].

1. Ce n'est pas une erreur : si l'un casse en court-circuit, l'autre évite le court-circuit de la batterie [SOURCÉ : SRC-0043 §5.2.3 Input Capacitors exposed to battery inputs].
2. Au relevé, on les dessine tous les deux ; au remplacement, on respecte l'orientation.

## Exercices

::exercice{id=S17-L02-EX01}

::exercice{id=S17-L02-EX02}

::exercice{id=S17-L02-EX03}
