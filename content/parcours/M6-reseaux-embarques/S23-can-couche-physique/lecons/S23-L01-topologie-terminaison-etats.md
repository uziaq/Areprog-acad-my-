---
id: S23-L01
titre: Bus CAN haute vitesse, topologie, terminaison et états
chapitre: S23
version: "0.1"
statut: brouillon
duree_min: 90
objectifs:
  - id: O1
    texte: Expliquer les états dominant et récessif d'un bus CAN haute vitesse et la signalisation différentielle
    competences: [D8.1]
  - id: O2
    texte: Expliquer la topologie et la terminaison d'un bus CAN, et la valeur attendue de la résistance mesurée entre CAN-H et CAN-L, bus hors tension
    competences: [D8.1]
prerequis: [S22-L02, S11-L02]
exercices: [S23-L01-EX01, S23-L01-EX02, S23-L01-EX03]
references: [SRC-0065, SRC-0066]
criteres_evaluation:
  - objectif: O1
    critere: Exercice S23-L01-EX01 réussi et états du bus capturés au TP-33
  - objectif: O2
    critere: Exercices S23-L01-EX02 et S23-L01-EX03 réussis et résistance du bus mesurée hors tension au TP-33
figures:
  - id: S23-F01
    fichier: ../figures/S23-F01-bus-terminaison.svg
    legende: "Bus CAN haute vitesse : une ligne en paire torsadée, terminée à chaque extrémité par une résistance égale à l'impédance caractéristique du câble ; chaque nœud (microcontrôleur, contrôleur CAN, transceiver) s'y raccorde par une dérivation courte. Sous le bus, les niveaux de CAN-H et CAN-L à l'état récessif puis dominant. D'après la note TI SLOA101 ; allure sans valeur constructeur."
    alt: "En haut, deux lignes horizontales CAN-H et CAN-L, une résistance RL à chaque extrémité, trois nœuds reliés par de courtes dérivations. En bas, un chronogramme : à l'état récessif, CAN-H et CAN-L sont au même niveau ; à l'état dominant, CAN-H monte et CAN-L descend, ce qui crée une différence."
    origine: areprog
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction
---

## Théorie

### Un bus différentiel

Le bus CAN relie les calculateurs par deux fils, CAN-H et CAN-L. La signalisation est
différentielle : les courants des deux fils sont égaux et opposés, ce qui réduit le bruit capté et
émis, surtout en paire torsadée [SOURCÉ : SRC-0065 §5 The CAN Bus]. Chaque nœud comprend un
contrôleur CAN, souvent intégré au microcontrôleur, et un **transceiver** qui le relie aux fils
[SOURCÉ : SRC-0065 §5 The CAN Bus].

### États dominant et récessif

D'après la note TI, au repos (état **récessif**), CAN-H et CAN-L sont polarisés passivement vers
2,5 V environ [SOURCÉ : SRC-0065 §5 The CAN Bus].
À l'état **dominant**, CAN-H monte vers 3,5 V environ et CAN-L descend vers 1,5 V environ [SOURCÉ : SRC-0065 §5 The CAN Bus].
La différence typique vaut alors 2 V [SOURCÉ : SRC-0065 §5 The CAN Bus]. Le dominant correspond au 0 logique, le récessif au 1 : la logique
du bus est inversée par rapport à l'habitude [SOURCÉ : SRC-0065 §4.1 Arbitration]. Les valeurs exactes
d'un transceiver se lisent dans sa fiche et dans la norme ISO 11898-2
[À VÉRIFIER : seuils et niveaux de la norme ISO 11898-2, non consultée].

::figure{id=S23-F01}

Conséquence pour la mesure : à l'état récessif, la différence entre CAN-H et CAN-L est presque nulle,
que le bus soit endormi ou simplement sans trafic. Une différence nulle ne suffit donc pas à
conclure ; on mesure aussi chaque ligne par rapport à la masse [HYPOTHÈSE : méthode d'atelier,
conséquence des niveaux décrits].

### Topologie et terminaison

La norme ISO 11898, telle que la décrit la note TI, prévoit une ligne unique en paire torsadée
d'impédance caractéristique 120 Ω, terminée à **chaque extrémité** par une résistance de 120 Ω [SOURCÉ : SRC-0065 §5 The CAN Bus]. La terminaison évite les réflexions ; sans elle, le signal se
déforme par marches successives [SOURCÉ : SRC-0066 §4.5 Line Terminations]. La note cite aussi un
débit maximal de 1 Mbit/s sur 40 m, 30 nœuds au plus et des dérivations non terminées de 0,3 m au
plus [SOURCÉ : SRC-0065 §5 The CAN Bus].

Une variante, la terminaison partagée, remplace chaque résistance par deux résistances de 60 Ω [SOURCÉ : SRC-0066 §4.5 Line Terminations].
Un condensateur au point milieu filtre les hautes fréquences [SOURCÉ : SRC-0066 §4.5 Line Terminations]. Les résistances de terminaison doivent supporter un
court-circuit du bus vers une alimentation [SOURCÉ : SRC-0066 §4.5.1 Standard Termination].

Sur un véhicule, les deux terminaisons peuvent se trouver dans des calculateurs ou dans le faisceau ;
leur emplacement se lit sur le schéma électrique officiel [À VÉRIFIER : schéma du véhicule étudié].

### Mesurer la résistance du bus

Bus **hors tension**, l'ohmmètre entre CAN-H et CAN-L voit les deux résistances de terminaison en
parallèle, plus les entrées des transceivers [HYPOTHÈSE : la contribution des transceivers est faible
devant la terminaison, à vérifier en comparant à un bus de référence].

### Exemple 1 : résistance attendue

Un bus est terminé par deux résistances de 120 Ω [EXEMPLE].

1. En parallèle : 120 × 120 / (120 + 120) = 60 Ω [EXEMPLE].
2. On mesure hors tension, entre CAN-H et CAN-L.
3. Une mesure proche de 60 Ω [EXEMPLE] est cohérente avec deux terminaisons présentes.

### Exemple 2 : une terminaison absente

Sur le même bus, on mesure 120 Ω [EXEMPLE].

1. Une seule terminaison est vue par l'ohmmètre [HYPOTHÈSE].
2. Causes possibles : calculateur portant une terminaison débranché, coupure d'un fil entre les deux terminaisons [HYPOTHÈSE].
3. Mesures : résistance de part et d'autre du point suspect, selon le schéma.

### Exemple 3 : différence dominante

Sur un bus actif, CAN-H atteint 3,5 V et CAN-L 1,5 V à l'état dominant [EXEMPLE].

1. Différence : 3,5 − 1,5 = 2 V [EXEMPLE].
2. À l'état récessif, les deux lignes reviennent vers la même tension : différence presque nulle.
3. C'est cette différence que lit le transceiver récepteur.

## Exercices

::exercice{id=S23-L01-EX01}

::exercice{id=S23-L01-EX02}

::exercice{id=S23-L01-EX03}
