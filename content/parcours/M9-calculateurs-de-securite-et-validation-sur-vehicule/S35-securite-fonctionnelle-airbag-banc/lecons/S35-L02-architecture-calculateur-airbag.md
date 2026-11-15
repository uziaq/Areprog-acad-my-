---
id: S35-L02
titre: Architecture générique d'un calculateur d'airbag
chapitre: S35
version: "0.1"
statut: brouillon
duree_min: 120
objectifs:
  - id: O1
    texte: Décrire la chaîne d'alimentation d'un calculateur d'airbag (protection, élévateur, réserve d'énergie) et calculer l'énergie stockée dans la réserve
    competences: [D10.6]
  - id: O2
    texte: Décrire les étages de commande des allumeurs, leur autorisation de tir et leurs diagnostics (résistance, court-circuit à la batterie ou à la masse)
    competences: [D10.6, D10.7]
  - id: O3
    texte: Situer les capteurs internes et satellites, la logique de sécurité et la mémoire d'événements, en distinguant ce que disent les fiches de ce qui reste à vérifier par constructeur
    competences: [D10.6]
prerequis: [S35-L01, S17, S05]
exercices: [S35-L02-EX01, S35-L02-EX02, S35-L02-EX03]
references: [SRC-0097, SRC-0096]
criteres_evaluation:
  - objectif: O1
    critere: Exercice S35-L02-EX01 réussi et réserve d'énergie repérée sur la carte au TP-52
  - objectif: O2
    critere: Exercices S35-L02-EX02 et S35-L02-EX03 réussis et étages d'allumeurs repérés au TP-52
  - objectif: O3
    critere: Blocs de la figure S35-F02 repérés sur la carte au TP-52, chaque repérage étiqueté
figures:
  - id: S35-F02
    fichier: ../figures/S35-F02-architecture-airbag.svg
    legende: "Architecture générique d'un calculateur d'airbag : protection, élévateur jusqu'à 33 V, réserve d'énergie, étages d'allumeurs commandés par le microcontrôleur et autorisés par une logique de sécurité indépendante, capteurs internes et satellites, mémoire d'événements. D'après les fiches citées ; schéma de principe, pas un schéma de calculateur."
    alt: "En haut, quatre blocs en chaîne : batterie, protection, élévateur jusqu'à 33 V, réserve d'énergie. La réserve alimente les étages d'allumeurs, reliés à droite aux sorties vers les allumeurs, simulateurs sur banc. Au milieu, capteurs puis microcontrôleur, qui commande les étages par une liaison en pointillés. En bas, mémoire d'événements sous le microcontrôleur et logique de sécurité qui envoie l'autorisation aux étages."
    origine: areprog
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction
---

## Théorie

### Une architecture décrite par des fiches publiques

Les constructeurs ne publient pas le schéma de leurs calculateurs d'airbag. Cette leçon décrit une
architecture **générique** à partir de deux fiches de circuits conçus pour ces calculateurs : un
circuit de base de système (alimentations, logique de sécurité, interfaces capteurs) et un circuit de
commande d'allumeurs. Sur une carte réelle, chaque bloc se repère par le marquage des circuits et
leur fiche [À VÉRIFIER : circuits présents sur la carte étudiée].

::figure{id=S35-F02}

### L'alimentation et l'élévateur

Le circuit de base de système cité fonctionne pour une tension d'entrée de 5,2 V à 20 V, avec des transitoires jusqu'à 40 V [SOURCÉ : SRC-0097 §Features].
Son entrée doit être protégée contre le délestage de charge et l'inversion de batterie (S17) [SOURCÉ : SRC-0097 §POWER SUPPLY INPUT (VPWR)].
Un **convertisseur élévateur** produit jusqu'à 33 V à partir de la batterie [SOURCÉ : SRC-0097 §BOOST CONVERTER].
Cette tension sert à charger la réserve d'énergie, à tirer les allumeurs tant que la batterie est présente, et à alimenter les tensions plus basses [SOURCÉ : SRC-0097 §BOOST CONVERTER].
Le même circuit fournit aussi les alimentations des capteurs satellites et une alimentation de 5 V pour la logique [SOURCÉ : SRC-0097 §Features].

### La réserve d'énergie

La **réserve d'énergie** est un condensateur de secours : si la batterie est perdue pendant un choc,
elle permet au système de continuer à lire les capteurs, à décider et à tirer, pendant une durée
fixée par sa capacité [SOURCÉ : SRC-0097 §ENERGY RESERVE CONTROL].
Le circuit cité la charge depuis l'élévateur et la maintient proche de la tension de l'élévateur [SOURCÉ : SRC-0097 §ENERGY RESERVE CONTROL].
Il la diagnostique en la déchargeant brièvement pour mesurer sa capacité et sa résistance série [SOURCÉ : SRC-0097 §ENERGY RESERVE SWITCH OUTPUT (ERSW)].

Conséquence pour l'atelier : un calculateur d'airbag **débranché** peut garder une énergie importante
dans sa réserve. L'énergie d'un condensateur vaut E = ½ C U² (S05). La décharge se **mesure** ; elle
ne se suppose jamais d'après un temps d'attente (FE-09).

### Les étages de commande des allumeurs

Chaque allumeur est commandé par un interrupteur côté haut et un interrupteur côté bas : le circuit
cité en contient quatre paires, chacune capable de 2,0 A [SOURCÉ : SRC-0096 §Features].
Le courant de tir est limité par une résistance externe, réglable de 0,8 A à 2,0 A [SOURCÉ : SRC-0096 §Features].
Les deux interrupteurs sont protégés contre les courts-circuits temporaires à la batterie ou à la masse [SOURCÉ : SRC-0096 §Four Channel Squib Driver IC].

Le tir exige l'autorisation : tant que l'entrée FEN est basse, les interrupteurs ne peuvent pas être
fermés, alors que les diagnostics restent disponibles [SOURCÉ : SRC-0096 §FEN_1 and FEN_2 (FEN) ($C8 COMMAND)].
Dans le circuit de base de système cité, cette autorisation vient des sorties ARM et DISARM de la
logique de sécurité [SOURCÉ : SRC-0097 §ARM OUTPUT (ARM, DISARM)].

### Les diagnostics des allumeurs

Le circuit de commande mesure en permanence l'état de chaque boucle d'allumeur, sans tirer :

- **Résistance** : un courant de diagnostic traverse l'allumeur ; un allumeur ouvert met tous les bits du résultat à 1, un allumeur en court-circuit les met tous à 0 [SOURCÉ : SRC-0096 §SQUIB RESISTANCE DIAGNOSTICS ($D0–$D3 COMMAND)].
- **Court-circuit à la batterie ou à la masse** : une source de 2,7 mA polarise la boucle et des comparateurs détectent une tension trop haute ou trop basse [SOURCÉ : SRC-0096 §SQUIB SHORT-TO-BATTERY / GROUND DIAGNOSTICS ($C1 COMMAND)].
- **Tension de tir** : la tension d'alimentation des étages est comparée à des seuils [SOURCÉ : SRC-0096 §FIRING SUPPLY VOLTAGE (VFIRE_XX) DIAGNOSTICS ($C5 COMMAND)].

C'est pourquoi, sur banc, des sorties laissées ouvertes provoquent un défaut « allumeur ouvert » : le
calculateur voit la boucle coupée [HYPOTHÈSE : défaut attendu, à constater avec l'outil de diagnostic].
Les simulateurs d'allumeurs (L03) remplacent la résistance de l'allumeur pour que ce diagnostic soit satisfait.

### Capteurs, logique de sécurité et mémoire d'événements

Le circuit de base de système cité dialogue avec des capteurs de choc locaux et distants, dont quatre interfaces de capteurs satellites PSI5 [SOURCÉ : SRC-0097 §Features].
Sa logique de sécurité, indépendante du microcontrôleur, compare les données des capteurs aux seuils et
active l'armement quand un choc est détecté [SOURCÉ : SRC-0097 §INTRODUCTION].
Le même circuit prévoit un mode de mise au rebut des allumeurs non utilisés en fin de vie du véhicule,
piloté par une ligne dédiée définie par l'ISO 26021 [SOURCÉ : SRC-0097 §SCRAP CONTROL (SCRAP)].
Ce mode n'est jamais utilisé à l'atelier de formation.

Le calculateur garde en mémoire les événements de choc ; ce qu'il enregistre, et s'il se verrouille
après un déploiement, dépend du constructeur [À VÉRIFIER par constructeur : contenu de la mémoire d'événements et verrouillage après choc].
Le cours n'enseigne pas l'effacement des données de collision.

### Exemple 1 : l'énergie d'une réserve

La réserve est chargée à 33 V, valeur de l'élévateur cité [SOURCÉ : SRC-0097 §BOOST CONVERTER].
Sa capacité vaut 4,7 mF dans cet exemple [EXEMPLE].

1. E = ½ × 0,0047 F × 33² V² [EXEMPLE].
2. E = 0,5 × 0,0047 × 1 089 ≈ 2,56 J [EXEMPLE].
3. Ordre de grandeur : de quoi provoquer une étincelle et détruire un composant en cas de court-circuit [HYPOTHÈSE : raison de mesurer la décharge avant tout contact].

### Exemple 2 : une constante de temps de décharge

La même réserve se décharge dans une résistance de 1 kΩ [EXEMPLE].

1. τ = R × C = 1 000 × 0,0047 = 4,7 s [EXEMPLE].
2. Après 5 τ, soit environ 23,5 s, il reste environ 1 % de la tension, soit environ 0,22 V [EXEMPLE].
3. Sur une carte réelle, le chemin de décharge n'est pas connu : seule la mesure dit si la réserve est déchargée.

### Exemple 3 : lire la limite de courant

Le tableau de la fiche donne la limite de courant selon la résistance externe [SOURCÉ : SRC-0096 §FET DRIVER CURRENT LIMIT].

1. Avec 10 kΩ, la limite est de 1,37 A [SOURCÉ : SRC-0096 §FET DRIVER CURRENT LIMIT].
2. Avec 45,3 kΩ, elle est de 2,0 A [SOURCÉ : SRC-0096 §FET DRIVER CURRENT LIMIT].
3. Relever la résistance sur la carte permet de connaître le courant de tir prévu, sans jamais le provoquer.

## Exercices

::exercice{id=S35-L02-EX01}

::exercice{id=S35-L02-EX02}

::exercice{id=S35-L02-EX03}
