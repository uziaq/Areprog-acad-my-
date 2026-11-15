---
id: S20-L01
titre: Architecture d'un microcontrôleur et ses quatre conditions de vie
chapitre: S20
version: "0.1"
statut: brouillon
duree_min: 90
objectifs:
  - id: O1
    texte: Décrire l'architecture générique d'un microcontrôleur (processeur, mémoire programme, mémoire vive, périphériques) et le cycle lecture-exécution
    competences: [D7.2]
  - id: O2
    texte: Énumérer les quatre conditions de vie d'un microcontrôleur (alimentations, horloge, reset, mode de démarrage) et l'ordre dans lequel on les vérifie
    competences: [D7.2]
  - id: O3
    texte: Vérifier les alimentations d'un microcontrôleur, y compris l'alimentation analogique et le découplage de chaque paire de broches
    competences: [D7.2]
prerequis: [S19-L02, S15-L03]
exercices: [S20-L01-EX01, S20-L01-EX02, S20-L01-EX03]
references: [SRC-0052, SRC-0056, SRC-0038]
criteres_evaluation:
  - objectif: O1
    critere: Exercice S20-L01-EX01 réussi
  - objectif: O2
    critere: Exercice S20-L01-EX02 réussi et conditions de vie relevées dans l'ordre au TP-29
  - objectif: O3
    critere: Exercice S20-L01-EX03 réussi et alimentations du microcontrôleur relevées au TP-29
figures:
  - id: S20-F01
    fichier: ../figures/S20-F01-conditions-vie.svg
    legende: "Les quatre conditions de vie d'un microcontrôleur, autour d'un boîtier générique : alimentations (numérique et analogique, avec leur découplage), horloge (quartz et ses condensateurs), reset (tirage, condensateur, superviseur), mode de démarrage (broches ou réglages de configuration). Schéma de principe, sans brochage réel."
    alt: "Un rectangle central marqué microcontrôleur, avec processeur, mémoire programme, mémoire vive et périphériques. Quatre cases autour, numérotées dans l'ordre de contrôle : 1 alimentations, 2 horloge, 3 reset, 4 mode de démarrage, chacune reliée au boîtier."
    origine: areprog
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction
---

## Théorie

### Architecture générique

Un processeur réunit une mémoire, une unité de calcul (ALU) et une unité de commande qui dirige les
données entre elles et l'extérieur [SOURCÉ : SRC-0052 §Microprocessors]. Un **compteur de programme**
contient l'adresse de la prochaine instruction ; l'unité de commande la lit (*fetch*), l'exécute, puis
passe à la suivante : c'est le cycle lecture-exécution [SOURCÉ : SRC-0052 §Microprocessors].

Un **microcontrôleur** rassemble sur une seule puce le processeur, une mémoire programme non
volatile (Flash), une mémoire vive (RAM) et des périphériques : entrées et sorties, convertisseurs,
temporisateurs, liaisons série [HYPOTHÈSE : description générique ; la liste exacte se lit dans la
fiche de chaque microcontrôleur]. Sur un calculateur, la famille du microcontrôleur se lit sur son
marquage ; ses caractéristiques se lisent uniquement dans sa documentation publique
[À VÉRIFIER : fiche publique du microcontrôleur relevé, quand elle existe].

### Les quatre conditions de vie

Un microcontrôleur ne fait rien d'utile si l'une de ces conditions manque
[EXEMPLE : méthode de l'académie, dans la suite de l'ordre « alimentation d'abord » de S18] :

1. **Alimentations** présentes, à la bonne valeur et propres ;
2. **Horloge** qui oscille, à la bonne fréquence (S20-L02) ;
3. **Reset** relâché, et qui ne revient pas en boucle (S20-L03) ;
4. **Mode de démarrage** correct : les broches ou les réglages de configuration qui choisissent le démarrage normal plutôt qu'un mode de programmation.

::figure{id=S20-F01}

On les vérifie dans cet ordre : sans alimentation, l'horloge ne démarre pas ; une horloge absente
peut laisser le circuit en reset ; un reset maintenu masque tout le reste [HYPOTHÈSE : enchaînement
général, à confirmer dans la fiche du microcontrôleur].

Le mode de démarrage dépend du composant : sur certaines familles, la broche de reset sert aussi à
entrer en mode de programmation [SOURCÉ : SRC-0056 §3 Connection of RESET Pin on AVR Devices] ;
la source d'horloge peut être choisie par des réglages de configuration (*fuses*), qui ne
s'effacent pas avec la mémoire programme [SOURCÉ : SRC-0056 §5.1 Selecting the Clock Source in the AVR MCU].
Un réglage d'horloge qui ne correspond pas au matériel peut empêcher le microcontrôleur de
fonctionner [SOURCÉ : SRC-0056 §5.1 Selecting the Clock Source in the AVR MCU].

### Les alimentations et le découplage

Le courant d'un circuit numérique est une moyenne : il est appelé par pointes très courtes à chaque
front d'horloge, et ces pointes viennent du condensateur de découplage, pas des longues pistes
d'alimentation [SOURCÉ : SRC-0056 §2.1 Digital Supply]. Pour cela :

- un condensateur de découplage par paire de broches d'alimentation et de masse, au plus près des broches [SOURCÉ : SRC-0056 §2.1 Digital Supply] ;
- une boucle courte entre le condensateur et les broches ; un condensateur éloigné laisse le bruit se répandre sur les plans [SOURCÉ : SRC-0056 §2.1 Digital Supply].

L'alimentation analogique (convertisseur, référence) a souvent sa propre broche, découplée à part,
pour garder le bruit numérique hors des mesures [SOURCÉ : SRC-0056 §2.2 Analog Supply]. Un
microcontrôleur peut donc avoir plusieurs alimentations à vérifier : numérique, analogique, parfois
un cœur à tension plus basse [HYPOTHÈSE : liste propre à chaque composant, à lire dans sa fiche].

Le régulateur qui alimente le microcontrôleur peut aussi le tenir en reset tant que sa sortie est
trop basse (S15-L03) [SOURCÉ : SRC-0038 §Output voltage undervoltage reset].

### Exemple 1 : ordre de contrôle

Un calculateur sur banc consomme un courant conforme, mais ne communique pas [EXEMPLE].

1. Alimentations du microcontrôleur : chaque broche d'alimentation par rapport à la masse, comparée à la référence.
2. Horloge : présence et fréquence, avec les précautions de S20-L02.
3. Reset : niveau relâché, sans impulsions répétées (S20-L03).
4. Mode de démarrage : niveau des broches de configuration, comparé à la référence.

### Exemple 2 : un condensateur de découplage absent

Sur la carte étudiée, un emplacement de découplage près d'une broche d'alimentation est vide, alors qu'il est garni sur la référence [EXEMPLE].

1. Hypothèse : composant arraché lors d'une intervention précédente [HYPOTHÈSE].
2. Conséquence possible : bruit sur l'alimentation, fonctionnement instable [SOURCÉ : SRC-0056 §2.1 Digital Supply].
3. Action : valeur relevée sur la référence, jamais d'après les voisins ; pose, puis contrôle (FR-14).

### Exemple 3 : courant moyen et pointes

Un multimètre lit 20 mA [EXEMPLE] sur l'alimentation d'un microcontrôleur.

1. C'est une moyenne : le courant réel arrive par pointes à chaque front d'horloge [SOURCÉ : SRC-0056 §2.1 Digital Supply].
2. Les pointes peuvent atteindre plusieurs centaines de milliampères quand un port entier commute [SOURCÉ : SRC-0056 §2.1 Digital Supply].
3. C'est pourquoi le découplage se place au plus près des broches.

## Exercices

::exercice{id=S20-L01-EX01}

::exercice{id=S20-L01-EX02}

::exercice{id=S20-L01-EX03}
