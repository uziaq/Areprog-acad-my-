---
id: S22-L01
titre: Interfaces de programmation, de débogage et modes de démarrage
chapitre: S22
version: "0.1"
statut: brouillon
duree_min: 90
objectifs:
  - id: O1
    texte: Expliquer le principe de JTAG (port d'accès de test, signaux, chaîne de scan) et du mode de débogage BDM à broche unique
    competences: [D7.5]
  - id: O2
    texte: Expliquer comment un microcontrôleur entre en mode de programmation ou de débogage (reset, broche de mode, résistances de configuration)
    competences: [D7.5]
  - id: O3
    texte: Relier ces principes aux outils de lecture de l'atelier en s'appuyant uniquement sur la documentation officielle de l'outil
    competences: [D7.5]
prerequis: [S20-L03, S21-L02]
exercices: [S22-L01-EX01, S22-L01-EX02, S22-L01-EX03]
references: [SRC-0063, SRC-0064, SRC-0056]
criteres_evaluation:
  - objectif: O1
    critere: Exercice S22-L01-EX01 réussi
  - objectif: O2
    critere: Exercice S22-L01-EX02 réussi et entrée en mode de programmation observée au TP-32
  - objectif: O3
    critere: Exercice S22-L01-EX03 réussi et documentation de l'outil citée au TP-32
figures:
  - id: S22-F01
    fichier: ../figures/S22-F01-jtag-chaine.svg
    legende: "Principe de JTAG : une sonde fournit TCK et TMS à tous les circuits ; les données entrent par TDI, traversent les registres de chaque circuit, et ressortent par TDO. À l'intérieur d'un circuit, des cellules de scan placées sur les broches forment une chaîne. D'après le guide TI SSYA002 ; schéma de principe, sans brochage réel."
    alt: "À gauche, une sonde JTAG. Deux circuits en série à droite, chacun avec un contrôleur TAP. TCK et TMS vont de la sonde aux deux circuits en parallèle. TDI va de la sonde au premier circuit, puis du premier au second, et TDO revient du second vers la sonde."
    origine: areprog
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction
---

## Théorie

### Pourquoi des interfaces de débogage

Un microcontrôleur se programme et se met au point par une interface dédiée, sans le déposer.
Plusieurs familles d'interfaces existent : SPI de programmation en circuit, JTAG, interfaces
propriétaires à une ou deux lignes [SOURCÉ : SRC-0056 §4 Connecting Programmer/Debugger Lines]. Le cours en donne les principes ; le
brochage d'un calculateur n'est jamais fourni : on se réfère à la documentation officielle de son
outil et du microcontrôleur.

### JTAG

JTAG désigne la norme IEEE 1149.1 [SOURCÉ : SRC-0063 §Boundary-Scan Overview]. Son port d'accès de
test (TAP) est commandé par l'horloge TCK et la sélection de mode TMS ; les données entrent par TDI et
sortent par TDO [SOURCÉ : SRC-0063 §Test Access Port and Operation]. TMS et TDI sont lus sur le front
montant de TCK, TDO change sur le front descendant [SOURCÉ : SRC-0063 §Test Access Port and Operation].

À l'origine, JTAG sert au test des cartes : des cellules placées sur chaque broche forment une
chaîne de scan, qui permet de piloter et d'observer les broches sans pointe de test
[SOURCÉ : SRC-0063 §Boundary-Scan Overview]. Plusieurs circuits peuvent être chaînés : TDO de l'un vers
TDI du suivant [SOURCÉ : SRC-0056 §4.2.1 Shared Use of JTAG Lines]. Sur certains microcontrôleurs, la
même interface sert à programmer et à déboguer [SOURCÉ : SRC-0056 §4.2 JTAG Interface].

::figure{id=S22-F01}

### BDM, une interface à une seule broche

Le mode de débogage BDM d'une famille de microcontrôleurs utilise une seule broche, BKGD, à drain
pseudo-ouvert avec tirage interne, plus le reset, l'alimentation et la masse
[SOURCÉ : SRC-0064 §2.1 Features and Operation]. Par cette broche, la sonde accède aux mémoires
du microcontrôleur, y compris sa Flash [SOURCÉ : SRC-0064 §2.1 Features and Operation].

### Entrer en mode de programmation

Le passage en mode de programmation ou de débogage passe souvent par le reset :

- en BDM, la sonde tient BKGD et le reset bas, relâche le reset, puis BKGD : le microcontrôleur démarre en mode débogage [SOURCÉ : SRC-0064 §2.3 Communication Details] ;
- en programmation SPI d'une autre famille, le microcontrôleur est tenu en reset ; ses broches sont alors en haute impédance [SOURCÉ : SRC-0056 §4.1.1 Shared Use of SPI Programming Lines].

D'autres microcontrôleurs lisent au démarrage des broches de mode, fixées par des résistances de
configuration, pour choisir entre démarrage normal et chargeur de démarrage
[HYPOTHÈSE : principe général ; les broches et les niveaux se lisent dans la fiche de chaque
microcontrôleur]. Une résistance de configuration arrachée ou inversée peut donc empêcher un
démarrage normal : c'est la quatrième condition de vie de S20-L01.

### Le lien avec les outils de l'atelier

Les outils de lecture de l'atelier utilisent ces mêmes interfaces ou un mode de démarrage du
microcontrôleur [HYPOTHÈSE : selon l'outil et le calculateur]. Le raccordement, la tension et la
procédure se prennent dans la documentation officielle de l'outil, jamais dans une vidéo ou un
forum [À VÉRIFIER : documentation de chaque outil de l'atelier].

### Exemple 1 : signaux d'une interface

Sur une carte de développement, un connecteur porte TCK, TMS, TDI, TDO, la masse et une référence de tension [EXEMPLE].

1. Quatre signaux de TAP : c'est une interface JTAG [SOURCÉ : SRC-0063 §Test Access Port and Operation].
2. La référence de tension indique à la sonde le niveau logique de la carte (S22-L02).
3. Le brochage du connecteur se lit dans la documentation de la carte, pas d'après ce schéma.

### Exemple 2 : deux circuits chaînés

Deux circuits partagent un même connecteur JTAG [EXEMPLE].

1. TCK et TMS vont aux deux circuits.
2. TDI de la sonde va au premier ; TDO du premier va à TDI du second ; TDO du second revient à la sonde [SOURCÉ : SRC-0056 §4.2.1 Shared Use of JTAG Lines].
3. Une coupure entre les deux circuits rend la chaîne entière muette.

### Exemple 3 : démarrage qui reste en mode débogage

Après une intervention, un microcontrôleur à interface BDM ne démarre plus normalement [EXEMPLE].

1. Hypothèse : BKGD maintenue basse au relâchement du reset, ce qui le fait entrer en mode débogage [HYPOTHÈSE].
2. Mesure : niveau de BKGD au démarrage, comparé à la référence ; présence de son tirage.
3. Cause possible : pont de soudure ou composant voisin en défaut, à prouver.

## Exercices

::exercice{id=S22-L01-EX01}

::exercice{id=S22-L01-EX02}

::exercice{id=S22-L01-EX03}
