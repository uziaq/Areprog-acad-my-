---
id: S24-L02
titre: "K-Line et comparaison des bus CAN, LIN et K-Line"
chapitre: S24
version: "0.1"
statut: brouillon
duree_min: 60
objectifs:
  - id: O1
    texte: Expliquer le principe de la ligne K de diagnostic (ISO 9141, ISO 14230) et son interface
    competences: [D8.2]
  - id: O2
    texte: Comparer CAN, LIN et K-Line (nombre de fils, référence des niveaux, débit, accès au bus, usage)
    competences: [D8.1, D8.2]
prerequis: [S24-L01]
exercices: [S24-L02-EX01, S24-L02-EX02]
references: [SRC-0070, SRC-0068, SRC-0065]
criteres_evaluation:
  - objectif: O1
    critere: Exercice S24-L02-EX01 réussi
  - objectif: O2
    critere: Exercice S24-L02-EX02 réussi et tableau comparatif rendu avec le TP-35
figures:
  - id: S24-F02
    fichier: ../figures/S24-F02-kline.svg
    legende: "Ligne K de diagnostic : l'interface du calculateur relie le microcontrôleur au fil K, tiré vers la batterie par une résistance et une diode ; l'outil de diagnostic se branche sur le même fil. La liaison est à l'alternat : un seul sens à la fois. D'après la fiche NXP MC33660 ; schéma de principe sans brochage."
    alt: "À gauche, un calculateur avec microcontrôleur et interface K-Line. Au milieu, un fil K tiré vers la batterie par une résistance et une diode. À droite, un outil de diagnostic relié au même fil. Une double flèche indique que les données passent dans un sens puis dans l'autre."
    origine: areprog
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction
---

## Théorie

### La ligne K

La ligne K est une liaison série de **diagnostic** sur un fil, bidirectionnelle à l'alternat (un
sens à la fois), entre un calculateur et un outil extérieur au véhicule ; son interface suit la
spécification ISO 9141 [SOURCÉ : SRC-0070 §5.1 Introduction]. Elle a été utilisée pour le diagnostic
embarqué réglementaire [SOURCÉ : SRC-0070 §5.1 Introduction]. Le protocole ISO 14230 (KWP 2000)
utilise la même couche physique [À VÉRIFIER : ISO 14230-1, non consultée].

Comme le LIN, la ligne K est référencée à la batterie : l'interface convertit les niveaux logiques
du microcontrôleur en niveaux batterie et inversement [SOURCÉ : SRC-0070 §5.2 Functional description].
Une résistance de tirage vers la batterie et une diode complètent l'interface ; la fiche NXP montre
une résistance externe de 510 Ω [SOURCÉ : SRC-0070 §5.2 Functional description]. L'interface
tire la ligne vers la masse pour un niveau bas, et cette sortie est protégée contre un court-circuit à
la batterie [SOURCÉ : SRC-0070 §5.2 Functional description].

Certains systèmes ajoutent une ligne L, utilisée seulement à l'initialisation ; le circuit de la fiche
NXP ne la gère pas [SOURCÉ : SRC-0070 §5.1 Introduction]. Le rôle exact de la ligne L et la séquence
d'initialisation se lisent dans la norme [À VÉRIFIER : ISO 9141-2, non consultée].

::figure{id=S24-F02}

La couche physique du LIN est d'ailleurs dérivée de l'ISO 9141, avec des ajouts pour l'automobile
(compatibilité électromagnétique, décharges, impulsions) [SOURCÉ : SRC-0068 §3 Physical Layer Requirements].

### Comparer CAN, LIN et K-Line

| Critère | CAN haute vitesse | LIN | K-Line |
|---|---|---|---|
| Fils | deux, différentiels [SOURCÉ : SRC-0065 §5 The CAN Bus] | un, référencé à la masse [SOURCÉ : SRC-0068 §2.1 General Layout of the LIN Bus] | un, référencé à la masse [SOURCÉ : SRC-0070 §5.2 Functional description] |
| Niveaux | différence CAN-H moins CAN-L | fractions de la tension batterie [SOURCÉ : SRC-0068 §3.1 Bus Signaling Fundamentals] | niveaux batterie [SOURCÉ : SRC-0070 §5.2 Functional description] |
| Accès | tout nœud, arbitrage [SOURCÉ : SRC-0065 §4.1 Arbitration] | le maître seul commande [SOURCÉ : SRC-0068 §2.3 Commander-Responder Principle] | à l'alternat avec l'outil [SOURCÉ : SRC-0070 §5.1 Introduction] |
| Terminaison | deux résistances aux extrémités | résistance de tirage au maître | résistance de tirage |
| Usage | échanges entre calculateurs | sous-réseau de confort | diagnostic |

Débits cités par les sources : jusqu'à 1 Mbit/s pour le CAN [SOURCÉ : SRC-0065 §5 The CAN Bus].
Pour le LIN, 1 à 20 kbit/s [SOURCÉ : SRC-0068 §3.4 Bit-Rate Tolerance and Timing Requirements].
Le débit de la ligne K dépend du protocole [À VÉRIFIER : débits d'ISO 9141-2 et d'ISO 14230, non consultées].

### Mesurer un bus à un fil

On mesure le fil par rapport à la **masse du calculateur**, à l'oscilloscope, avec une seule voie ;
la tension batterie se mesure en même temps sur une deuxième voie, puisque les seuils en dépendent
[SOURCÉ : SRC-0068 §3.1 Bus Signaling Fundamentals]. Une sonde ordinaire convient, sa masse sur la
masse du calculateur (S11).

### Exemple 4 : reconnaître le bus sur une capture

Une capture montre un signal entre 0 V et 12 V, sur un seul fil, à environ 50 µs par bit [EXEMPLE].

1. Niveaux batterie, un fil : LIN ou K-Line, pas CAN.
2. 50 µs par bit correspond à 20 kbit/s [EXEMPLE] : compatible avec le LIN.
3. Confirmation : le schéma électrique officiel nomme le fil [À VÉRIFIER : schéma du véhicule étudié].

### Exemple 5 : niveau haut trop bas

Sur une ligne K au repos, le niveau haut vaut 8 V alors que la batterie est à 12,5 V [EXEMPLE].

1. La résistance de tirage et la charge des nœuds forment un diviseur [HYPOTHÈSE].
2. Hypothèses : fuite vers la masse (humidité, isolant abîmé), interface d'un nœud en défaut [HYPOTHÈSE].
3. Mesure : hors tension, résistance de la ligne vers la masse, nœuds débranchés un par un.

## Exercices

::exercice{id=S24-L02-EX01}

::exercice{id=S24-L02-EX02}
