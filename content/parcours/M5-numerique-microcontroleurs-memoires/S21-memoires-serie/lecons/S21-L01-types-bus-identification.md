---
id: S21-L01
titre: Mémoires série, leurs bus et leur identification
chapitre: S21
version: "0.1"
statut: brouillon
duree_min: 90
objectifs:
  - id: O1
    texte: Distinguer EEPROM I²C, EEPROM Microwire et Flash SPI par leur bus, leurs signaux et leur organisation
    competences: [D7.3]
  - id: O2
    texte: Identifier une mémoire série et son bus à partir de son marquage et de sa fiche technique
    competences: [D7.3]
  - id: O3
    texte: Calculer une capacité, une adresse I²C et un nombre de pages à partir de la fiche
    competences: [D7.3]
prerequis: [S19-L03, S20-L01]
exercices: [S21-L01-EX01, S21-L01-EX02, S21-L01-EX03]
references: [SRC-0059, SRC-0060, SRC-0061]
criteres_evaluation:
  - objectif: O1
    critere: Exercice S21-L01-EX01 réussi
  - objectif: O2
    critere: Mémoire de la carte identifiée par son marquage et sa fiche au TP-30
  - objectif: O3
    critere: Exercices S21-L01-EX02 et S21-L01-EX03 réussis
figures:
  - id: S21-F01
    fichier: ../figures/S21-F01-trois-bus.svg
    legende: "Trois familles de mémoires série et leurs signaux : EEPROM I²C (SDA, SCL, broches d'adresse, WP), EEPROM Microwire (CS, SK, DI, DO, ORG) et Flash SPI (/CS, CLK, DI, DO, /WP, /HOLD). Schéma de principe ; le brochage réel se lit dans la fiche de chaque composant."
    alt: "Trois rectangles côte à côte, chacun marqué de sa famille et entouré de ses signaux : à gauche I²C avec SDA, SCL, A0 à A2 et WP ; au milieu Microwire avec CS, SK, DI, DO et ORG ; à droite Flash SPI avec /CS, CLK, DI, DO, /WP et /HOLD. Tous ont VCC et GND."
    origine: areprog
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction
---

## Théorie

### Pourquoi des mémoires série

Sur un calculateur, une mémoire série garde des données qui doivent survivre à la coupure
d'alimentation : réglages, apprentissages, compteurs [HYPOTHÈSE : usage courant, le contenu exact
dépend du constructeur et ne se déduit pas du composant]. Elle se relie au microcontrôleur par un bus
de peu de fils. Trois familles se rencontrent : l'EEPROM I²C, l'EEPROM Microwire et la Flash SPI.

::figure{id=S21-F01}

### EEPROM I²C

L'EEPROM I²C utilise le bus de S19-L03 : SDA et SCL, tirées vers l'alimentation
[SOURCÉ : SRC-0059 §I2C Bus Protocol]. Exemple d'une EEPROM de 256 Kbit, organisée en 32 768 octets
[SOURCÉ : SRC-0059 §Description] :

- adresse de circuit : quatre bits fixes 1010, puis les broches A2, A1, A0, puis le bit R/W [SOURCÉ : SRC-0059 §Device Addressing] ; jusqu'à huit mémoires sur un même bus [SOURCÉ : SRC-0059 §Functional Description] ;
- adresse interne sur deux octets ; mémoire découpée en 512 pages de 64 octets [SOURCÉ : SRC-0059 §Page Write] ;
- broche **WP** : tenue haute, elle interdit toute écriture [SOURCÉ : SRC-0059 §Hardware Write Protection] ;
- livrée effacée, tous les octets à FFh [SOURCÉ : SRC-0059 §Delivery State].

### EEPROM Microwire

L'EEPROM Microwire utilise CS (sélection), SK (horloge), DI (données entrantes) et DO (données
sortantes) [SOURCÉ : SRC-0060 §Description]. Particularité : la broche **ORG** choisit
l'organisation, en mots de 16 bits (ORG à VCC) ou en octets (ORG à la masse)
[SOURCÉ : SRC-0060 §Description]. Une instruction commence par un bit de départ à 1, suivi d'un code
et d'une adresse [SOURCÉ : SRC-0060 §Device Operation].

La même mémoire lue en x8 ou en x16 ne présente pas ses octets dans le même ordre : un programmateur
réglé sur la mauvaise organisation donne une sauvegarde fausse [HYPOTHÈSE : conséquence de
l'organisation, à vérifier en relisant avec le bon réglage].

### Flash SPI

La Flash SPI utilise /CS, CLK, DI et DO, avec parfois /WP et /HOLD
[SOURCÉ : SRC-0061 §4 PIN DESCRIPTIONS]. Exemple d'une Flash de 32 Mbit
[SOURCÉ : SRC-0061 §1 GENERAL DESCRIPTIONS] :

- pages de 256 octets, programmées jusqu'à 256 octets à la fois ;
- effacement par secteurs de 4 Ko, par blocs ou en totalité ; on ne programme pas un octet sans effacer son secteur auparavant [HYPOTHÈSE : principe général des Flash, à confirmer dans chaque fiche] ;
- un effacement remet tout le secteur à FFh [SOURCÉ : SRC-0061 §8.2 Instruction Descriptions].

### Identifier une mémoire

1. Lire le marquage au microscope, le photographier.
2. Chercher la fiche correspondant au marquage, chez le fabricant ; un marquage abrégé se décode avec le tableau de marquage de la fiche [À VÉRIFIER : codes de marquage, propres à chaque fabricant].
3. Relever dans la fiche : bus, capacité, organisation, tension d'alimentation, brochage.
4. Vérifier sur la carte que les broches câblées correspondent au bus identifié.

### Exemple 1 : adresse I²C

Une EEPROM I²C a ses broches A2, A1 et A0 reliées à la masse [EXEMPLE].

1. Adresse : 1010 suivi de 000, soit 101 0000.
2. En hexadécimal : 0x50.
3. En écriture, le premier octet vaut 1010 0000, soit 0xA0 ; en lecture, 0xA1.

### Exemple 2 : capacité et pages

Une EEPROM de 256 Kbit est organisée en pages de 64 octets [EXEMPLE].

1. 256 Kbit = 256 × 1024 bits = 262 144 bits, soit 32 768 octets.
2. 32 768 / 64 = 512 pages, comme l'indique la fiche [SOURCÉ : SRC-0059 §Page Write].
3. Une sauvegarde complète fait donc 32 768 octets.

### Exemple 3 : secteurs d'une Flash

Une Flash de 4 Mo [EXEMPLE] a des secteurs de 4 Ko.

1. 4 × 1024 Ko / 4 Ko = 1024 secteurs, comme l'indique la fiche [SOURCÉ : SRC-0061 §1 GENERAL DESCRIPTIONS].
2. Modifier un seul octet impose d'effacer un secteur entier de 4 Ko, puis de le reprogrammer.
3. D'où le risque d'une écriture interrompue : tout le secteur peut être perdu [HYPOTHÈSE].

## Exercices

::exercice{id=S21-L01-EX01}

::exercice{id=S21-L01-EX02}

::exercice{id=S21-L01-EX03}
