---
id: S29-L02
titre: Étages de puissance low-side, high-side et pont en H
chapitre: S29
version: "0.1"
statut: brouillon
duree_min: 120
objectifs:
  - id: O1
    texte: Distinguer une sortie low-side et une sortie high-side, et prévoir les tensions mesurées sortie commandée et coupée, charge présente ou ouverte
    competences: [D10.2]
  - id: O2
    texte: Expliquer les protections et les diagnostics d'un commutateur intégré (limitation de courant, arrêt thermique, écrêtage inductif, charge ouverte, court-circuit) et exploiter sa mesure de courant
    competences: [D10.2]
  - id: O3
    texte: Lire la table de commande d'un pont en H (marche avant, marche arrière, freinage, haute impédance) et expliquer le temps mort
    competences: [D10.2]
prerequis: [S29-L01, S09-L02]
exercices: [S29-L02-EX01, S29-L02-EX02, S29-L02-EX03]
references: [SRC-0085, SRC-0084, SRC-0086]
criteres_evaluation:
  - objectif: O1
    critere: Exercice S29-L02-EX01 réussi et tensions de sortie relevées au TP-43
  - objectif: O2
    critere: Exercice S29-L02-EX02 réussi et défaut de charge ouverte observé au TP-43
  - objectif: O3
    critere: Exercice S29-L02-EX03 réussi et sens de rotation commandé au TP-43
figures:
  - id: S29-F02
    fichier: ../figures/S29-F02-etages-sortie.svg
    legende: "Trois étages de sortie génériques : low-side (le transistor relie la charge à la masse, la charge est alimentée en permanence par le + batterie), high-side (le transistor relie le + batterie à la charge, reliée à la masse), pont en H (quatre transistors, la charge au milieu, deux sens de courant). D'après les fiches citées ; schéma de principe sans valeur."
    alt: "Trois schémas côte à côte. Low-side : + batterie, charge, transistor, masse, de haut en bas. High-side : + batterie, transistor, charge, masse. Pont en H : quatre transistors en carré, le moteur au centre, flèches de courant dans un sens puis dans l'autre."
    origine: areprog
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction
---

## Théorie

### Low-side et high-side

- **Low-side** : le transistor est entre la charge et la masse ; la charge reste reliée au + batterie. Commandée, la sortie (le drain) est proche de 0 V ; coupée, charge présente, elle remonte à la tension de la charge [HYPOTHÈSE : à constater au TP-43, selon le circuit de diagnostic de la carte].
- **High-side** : le transistor est entre le + batterie et la charge ; la charge est reliée à la masse. Commandée, la sortie est proche de la tension batterie ; coupée, charge présente, la charge la tire à 0 V [SOURCÉ : SRC-0084 §7.3.4.2 Open-Load Detection].

Le MOSFET low-side autoprotégé cité limite son courant en cas de court-circuit, s'arrête en surchauffe
et redémarre seul quand il a refroidi [SOURCÉ : SRC-0085 §Features]. Il écrête la tension
drain-source quand on coupe une charge inductive (injecteur, relais, électrovanne) [SOURCÉ : SRC-0085 §Features].
Pour ce composant, la tension drain-source est écrêtée en interne à 42 V [SOURCÉ : SRC-0085 §MAXIMUM RATINGS] :
au moment de la coupure d'une charge inductive, on voit donc au
drain une impulsion bien au-dessus de la tension batterie (S09).

::figure{id=S29-F02}

### Protections et diagnostics d'un commutateur intégré

Le commutateur high-side protégé cité regroupe [SOURCÉ : SRC-0084 §7.1 Overview] :

- une **mesure de courant** : un miroir fournit 1/K du courant de charge dans une résistance extérieure ; la tension obtenue est lue par le microcontrôleur [SOURCÉ : SRC-0084 §7.3.1 Accurate Current Sense] ;
- une **limite de courant** réglable, qui limite les appels de courant au démarrage et en court-circuit [SOURCÉ : SRC-0084 §7.1 Overview] ;
- un **écrêtage** à la coupure d'une charge inductive : l'énergie de la charge est dissipée dans le transistor [SOURCÉ : SRC-0084 §7.3.3 Inductive-Load Switching-Off Clamp].

Ses diagnostics [SOURCÉ : SRC-0084 §7.3.4 Full Protections and Diagnostics] :

- **court-circuit à la masse ou surcharge** : la limite de courant se déclenche, puis l'arrêt thermique si le défaut persiste [SOURCÉ : SRC-0084 §7.3.4.1 Short-to-GND and Overload Detection] ;
- **charge ouverte** : sortie commandée, courant presque nul ; sortie coupée, la sortie reste proche de la tension d'alimentation au lieu de tomber à 0 V, grâce à une résistance de tirage extérieure [SOURCÉ : SRC-0084 §7.3.4.2 Open-Load Detection] ;
- **court-circuit au + batterie** : même mécanisme de détection que la charge ouverte [SOURCÉ : SRC-0084 §7.3.4.3 Short-to-Battery Detection] ;
- **surchauffe** : arrêt thermique, puis reprise quand la température est redescendue [SOURCÉ : SRC-0084 §7.3.4 Full Protections and Diagnostics].

La fiche note qu'un courant de fuite peut exister en sortie à cause de l'humidité ou de la corrosion [SOURCÉ : SRC-0084 §7.3.4.2 Open-Load Detection] :
une carte corrodée (S28) peut fausser un diagnostic de
charge ouverte.

### Le pont en H

Un pont en H relie une charge (moteur de papillon, par exemple) à quatre transistors : selon ceux qui
conduisent, le courant traverse le moteur dans un sens ou dans l'autre [SOURCÉ : SRC-0086 §7.3.1.1 Control Modes].
La table de commande du pont cité, en mode PWM [SOURCÉ : SRC-0086 §7.3.1.1 Control Modes] :

| IN1 | IN2 | OUT1 | OUT2 | État |
|---|---|---|---|---|
| 0 | 0 | Hi-Z | Hi-Z | roue libre, pont ouvert [SOURCÉ : SRC-0086 §7.3.1.1 Control Modes] |
| 0 | 1 | L | H | un sens [SOURCÉ : SRC-0086 §7.3.1.1 Control Modes] |
| 1 | 0 | H | L | l'autre sens [SOURCÉ : SRC-0086 §7.3.1.1 Control Modes] |
| 1 | 1 | H | H | freinage, recirculation par les transistors du haut [SOURCÉ : SRC-0086 §7.3.1.1 Control Modes] |

Pour faire varier la vitesse, la fiche conseille d'alterner commande et freinage [SOURCÉ : SRC-0086 §7.3.1.1 Control Modes].
Entre l'arrêt d'un transistor et la mise en conduction de
celui du même côté, un **temps mort** laisse la sortie en haute impédance : les deux transistors d'un
même demi-pont ne conduisent jamais ensemble [SOURCÉ : SRC-0086 §7.3.1.6 Dead Time]. Le pont cité
détecte surintensité, charge ouverte et surchauffe, et les signale sur une broche de défaut [SOURCÉ : SRC-0086 §7.3.2 Motor Driver Protection Circuits].


### Exemple 4 : lire le courant d'un high-side

Le microcontrôleur lit 1,2 V aux bornes d'une résistance de mesure de 1,2 kΩ [EXEMPLE].

1. Courant de mesure : 1,2 V / 1,2 kΩ = 1 mA [EXEMPLE].
2. Rapport typique K du composant cité : 500 [SOURCÉ : SRC-0084 §6.5 Electrical Characteristics].
3. Courant de charge : 1 mA × 500 = 0,5 A [EXEMPLE], à la précision de K près, donnée par la fiche.

### Exemple 5 : un high-side qui signale une charge ouverte

Sortie coupée, on mesure la tension batterie sur la sortie au lieu de 0 V [EXEMPLE].

1. D'après la fiche, c'est le signe d'une charge ouverte ou d'un court-circuit au + batterie [SOURCÉ : SRC-0084 §7.3.4.2 Open-Load Detection].
2. Hors tension : continuité du faisceau et résistance de la charge [HYPOTHÈSE].
3. Sur carte : piste et connecteur entre la sortie et la broche du calculateur.

### Exemple 6 : un moteur qui ne tourne que dans un sens

Un moteur commandé par un pont en H tourne dans un sens mais pas dans l'autre [EXEMPLE].

1. Un sens met en jeu deux transistors, l'autre sens les deux autres [SOURCÉ : SRC-0086 §7.3.1.1 Control Modes].
2. Hypothèses : un transistor ou sa commande en défaut, entrée IN1 ou IN2 qui ne change pas [HYPOTHÈSE].
3. Mesures : IN1 et IN2, puis OUT1 et OUT2 dans chaque sens, comparées à la table.

## Exercices

::exercice{id=S29-L02-EX01}

::exercice{id=S29-L02-EX02}

::exercice{id=S29-L02-EX03}
