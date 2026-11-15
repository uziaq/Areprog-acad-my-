---
id: S29-L01
titre: Interfaces d'entrée des capteurs
chapitre: S29
version: "0.1"
statut: brouillon
duree_min: 120
objectifs:
  - id: O1
    texte: Expliquer et mesurer l'interface d'un capteur inductif (passage par zéro, seuil adaptatif, écrêtage et résistance série)
    competences: [D10.2]
  - id: O2
    texte: Expliquer et mesurer l'interface d'un capteur à effet Hall à sortie à drain ouvert et celle d'un capteur ratiométrique
    competences: [D10.2]
  - id: O3
    texte: Expliquer le principe de l'interface d'une sonde lambda (entrée différentielle, sonde froide, fil coupé) et le rôle du filtrage et des protections d'entrée
    competences: [D10.2]
prerequis: [S28, S10-L03]
exercices: [S29-L01-EX01, S29-L01-EX02, S29-L01-EX03]
references: [SRC-0081, SRC-0082, SRC-0027, SRC-0083]
criteres_evaluation:
  - objectif: O1
    critere: Exercice S29-L01-EX01 réussi et signal inductif relevé avant et après l'interface au TP-42
  - objectif: O2
    critere: Exercice S29-L01-EX02 réussi et sortie Hall et signal ratiométrique relevés au TP-42
  - objectif: O3
    critere: Exercice S29-L01-EX03 réussi
figures:
  - id: S29-F01
    fichier: ../figures/S29-F01-entrees-capteurs.svg
    legende: "Trois interfaces d'entrée génériques : capteur inductif relié par une résistance série à un détecteur de passage par zéro ; capteur à effet Hall dont la sortie à drain ouvert est tirée par une résistance vers une tension de référence ; capteur ratiométrique alimenté par la même tension que la référence du convertisseur. D'après les fiches citées ; schéma de principe sans valeur, pas un schéma de calculateur."
    alt: "Trois blocs côte à côte. À gauche, une bobine reliée par une résistance série à un bloc marqué passage par zéro, puis à une sortie logique. Au milieu, un capteur Hall avec un transistor de sortie vers la masse et une résistance de tirage vers Vref. À droite, un potentiomètre alimenté par 5 V, son curseur relié à un convertisseur dont la référence est le même 5 V."
    origine: areprog
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction
---

## Théorie

### Le capteur inductif

Un capteur inductif (à réluctance variable) est une bobine placée devant une cible dentée : il produit
une tension alternative quand une dent passe. Son interface détecte le **passage par zéro** du signal,
qui sert de repère de temps [SOURCÉ : SRC-0081 §DESCRIPTION]. Le signal est faible à basse vitesse, et le
bruit peut être plus fort à haute vitesse que le signal à basse vitesse : l'interface utilise donc un
**seuil adaptatif**, tiré de la crête du signal, qui doit être franchi avant que le passage par zéro
soit pris en compte [SOURCÉ : SRC-0081 §DESCRIPTION]. Dans le circuit cité, au-delà d'une certaine
amplitude, ce seuil d'armement suit 80 % de la crête positive [SOURCÉ : SRC-0081 §OPERATION OF ZERO CROSSING DETECTOR].

L'entrée du circuit est **écrêtée** en interne ; une résistance extérieure en série limite le courant
d'entrée. La fiche donne sa valeur minimale : Rext = tension d'entrée crête / 3 mA [SOURCÉ : SRC-0081 §INPUT CURRENT LIMITING].
Avec 18 kΩ, la fiche admet ±54 V en entrée [SOURCÉ : SRC-0081 §INPUT CURRENT LIMITING].
Conséquence pour la mesure : la tension vue sur la broche
d'entrée du circuit n'est pas celle du capteur, puisqu'elle est écrêtée [SOURCÉ : SRC-0081 §OPERATION OF ZERO CROSSING DETECTOR].
On mesure le capteur **avant** la résistance série, et la sortie logique après l'interface.

### Le capteur à effet Hall

Un capteur à effet Hall numérique change d'état quand le champ magnétique franchit un seuil ; une
hystérésis entre le seuil d'enclenchement (BOP) et le seuil de relâchement (BRP) évite qu'un champ
bruité fasse basculer la sortie [SOURCÉ : SRC-0082 §7.1 Overview]. Sa sortie est à **drain ouvert** :
une résistance de tirage extérieure est obligatoire, vers la tension d'alimentation ou une autre tension [SOURCÉ : SRC-0082 §7.1 Overview].
Le choix de cette résistance est un compromis entre la vitesse du
front montant et le courant à l'état bas [SOURCÉ : SRC-0082 §7.3.4 Output Stage]. Si le capteur est mis
sous tension avec un champ entre les deux seuils, l'état de sa sortie est indéterminé [SOURCÉ : SRC-0082 §7.3.2 Device Output].


Un signal Hall carré dont le niveau haut manque fait penser à une résistance de tirage absente ou
coupée, ou à une ligne en court-circuit à la masse [HYPOTHÈSE : à confirmer par la mesure hors tension].

### Le capteur ratiométrique

Un capteur ratiométrique (potentiomètre de papillon, capteur de pression) donne une tension
proportionnelle à son alimentation ; si le convertisseur prend la même tension comme référence, la
mesure ne dépend plus de la valeur exacte de cette alimentation [SOURCÉ : SRC-0027 §Sensors that Are Ratiometric to the Supply Voltage].
On mesure donc toujours le signal **et** l'alimentation du capteur, et l'on raisonne sur leur rapport
(S10-L03).

::figure{id=S29-F01}

### La sonde lambda

Une sonde lambda à oxyde de zirconium donne une tension qui indique un mélange riche ou pauvre ; dans
l'application type du circuit d'interface cité, environ 800 mV correspond au riche et 100 mV au pauvre [SOURCÉ : SRC-0083 §Typical Application].
La sonde est reliée à la masse du **bloc moteur** alors que le
calculateur est à la masse de la caisse : l'interface utilise une **entrée différentielle** qui rejette
cet écart de masse [SOURCÉ : SRC-0083 §DESCRIPTION]. Le circuit cité amplifie avec un gain de 4,5 [SOURCÉ : SRC-0083 §CIRCUIT DESCRIPTION].


Froide, la sonde a une impédance très élevée et son signal est fortement atténué ; chaude, elle
descend sous 10 kΩ [SOURCÉ : SRC-0083 §COLD SENSOR]. L'interface fournit alors une tension de sortie
par défaut, qu'elle donne aussi quand un fil de la sonde est coupé [SOURCÉ : SRC-0083 §OPEN INPUT PINS DEFAULTS].
Une tension lambda figée à une valeur intermédiaire peut donc venir d'une sonde froide (chauffage en
défaut) ou d'un fil coupé [HYPOTHÈSE : à départager par la mesure du chauffage et de la continuité].

Les sondes à large bande (proportionnelles) ont une interface plus complexe, hors du périmètre de la
semaine [À VÉRIFIER : fiche du circuit d'interface relevé sur la carte étudiée].

### Filtrer et protéger

Chaque entrée d'un calculateur porte en général un filtre (résistance série et condensateur vers la
masse) et une protection contre les surtensions et les inversions [HYPOTHÈSE : à relever sur la carte étudiée].
Le circuit d'interface lambda cité protège ses entrées contre un court-circuit à la batterie et filtre
les transitoires rapides [SOURCÉ : SRC-0083 §DESCRIPTION]. Le filtre retarde et arrondit le signal : on compare toujours le signal
du capteur et celui qui arrive au circuit [HYPOTHÈSE : effet à constater au TP-42].

### Exemple 1 : la résistance série d'un capteur inductif

Un capteur inductif peut donner 36 V crête à haute vitesse [EXEMPLE].

1. Rext minimale : 36 V / 3 mA = 12 kΩ [EXEMPLE].
2. La formule vient de la fiche du circuit [SOURCÉ : SRC-0081 §INPUT CURRENT LIMITING].
3. On prend une valeur normalisée au-dessus, et l'on vérifie le signal minimal à basse vitesse.

### Exemple 2 : une sortie Hall qui reste basse

Sur une carte d'entraînement, la sortie d'un capteur Hall reste à 0 V, aimant présent ou non [EXEMPLE].

1. Hypothèses : résistance de tirage absente, ligne en court-circuit à la masse, capteur non alimenté [HYPOTHÈSE].
2. Hors tension : résistance entre la sortie et Vref, puis entre la sortie et la masse.
3. Sous tension : alimentation du capteur, puis sortie, aimant approché puis éloigné.

### Exemple 3 : lire la sortie de l'interface lambda

La sonde donne 0,8 V ; l'interface a un gain de 4,5 [EXEMPLE].

1. Tension de sortie : 0,8 × 4,5 = 3,6 V [EXEMPLE].
2. Le gain vient de la fiche du circuit [SOURCÉ : SRC-0083 §CIRCUIT DESCRIPTION].
3. Mélange riche d'après l'application type [SOURCÉ : SRC-0083 §Typical Application].

## Exercices

::exercice{id=S29-L01-EX01}

::exercice{id=S29-L01-EX02}

::exercice{id=S29-L01-EX03}
