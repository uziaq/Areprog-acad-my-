---
id: S24-L01
titre: "Bus LIN : couche physique et trame"
chapitre: S24
version: "0.1"
statut: brouillon
duree_min: 90
objectifs:
  - id: O1
    texte: Expliquer l'architecture maître / esclaves d'un bus LIN, sa liaison sur un fil et le rôle de la résistance de tirage vers la batterie
    competences: [D8.2]
  - id: O2
    texte: Situer les seuils dominant et récessif d'un bus LIN par rapport à la tension batterie
    competences: [D8.2]
  - id: O3
    texte: Repérer sur une capture l'en-tête et la réponse d'une trame LIN et en déduire le débit
    competences: [D8.2]
prerequis: [S23-L01, S19-L02]
exercices: [S24-L01-EX01, S24-L01-EX02, S24-L01-EX03]
references: [SRC-0068, SRC-0069]
criteres_evaluation:
  - objectif: O1
    critere: Exercice S24-L01-EX01 réussi et résistance de tirage du nœud maître identifiée au TP-35
  - objectif: O2
    critere: Exercice S24-L01-EX02 réussi et niveaux dominant et récessif mesurés au TP-35
  - objectif: O3
    critere: Exercice S24-L01-EX03 réussi et trame LIN capturée et annotée au TP-35
figures:
  - id: S24-F01
    fichier: ../figures/S24-F01-lin-bus.svg
    legende: "Bus LIN : un nœud maître avec sa résistance de tirage et sa diode vers la batterie, des nœuds esclaves reliés au même fil, chacun par son transceiver. Sous le bus, l'allure d'une trame : pause de synchronisation, champ de synchronisation, identifiant protégé, puis réponse (données et somme de contrôle). D'après la note TI SLLA383A ; allure sans valeur constructeur."
    alt: "En haut, un fil LIN horizontal. À gauche, un nœud maître relié à la batterie par une résistance et une diode ; trois nœuds esclaves reliés au fil. En bas, un chronogramme entre la tension batterie et la masse : une longue impulsion basse (pause), une suite alternée (synchronisation), l'identifiant, puis les octets de données et la somme de contrôle."
    origine: areprog
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction
---

## Théorie

### Un bus maître et esclaves sur un fil

Le LIN (*Local Interconnect Network*), normalisé par l'ISO 17987, relie des fonctions qui ne
demandent pas le débit du CAN : climatisation, portes, essuie-glace, éclairage ; il sert le plus
souvent de sous-réseau d'un calculateur relié au CAN [SOURCÉ : SRC-0068 §1 Introduction].
Un réseau LIN comprend un nœud **maître** (*commander*) et jusqu'à 16 nœuds **esclaves**
(*responders*) [SOURCÉ : SRC-0068 §2.1 General Layout of the LIN Bus].

Le maître commande toute la communication : il envoie un en-tête, et seul l'esclave concerné
répond ; les esclaves ne parlent pas entre eux et ne prennent jamais la parole d'eux-mêmes
[SOURCÉ : SRC-0068 §2.3 Commander-Responder Principle]. Si le maître tombe en panne, tout le réseau
s'arrête ; c'est une des raisons pour lesquelles le LIN n'est pas employé pour des fonctions de
sécurité [SOURCÉ : SRC-0068 §2.3 Commander-Responder Principle].

Il n'y a pas de contrôleur dédié : le microcontrôleur gère le protocole et pilote le transceiver par
son interface série (SCI ou UART) [SOURCÉ : SRC-0068 §2.1 General Layout of the LIN Bus].

### Couche physique : un fil tiré vers la batterie

La liaison n'utilise qu'**un fil**, référencé à la masse du véhicule ; une résistance de tirage
amène ce fil vers la tension batterie quand aucun nœud n'émet
[SOURCÉ : SRC-0068 §2.1 General Layout of the LIN Bus]. Le réseau se comporte comme une ligne à
drain ouvert (S19-L02) : au repos le fil est haut, état **récessif** ; quand un transceiver conduit,
il tire le fil vers la masse, état **dominant** [SOURCÉ : SRC-0068 §3.1 Bus Signaling Fundamentals].

Côté résistances, d'après la note TI :

- le maître porte une résistance externe en série avec une diode vers la batterie, typiquement 1 kΩ [SOURCÉ : SRC-0068 §3.2 Pullup Values] ;
- chaque esclave a une résistance intégrée au transceiver, typiquement 30 kΩ [SOURCÉ : SRC-0068 §3.2 Pullup Values] ;
- la valeur intégrée dépend du transceiver : 45 kΩ sur la fiche d'un modèle public [SOURCÉ : SRC-0069 §1 Features].

Le transceiver relie le microcontrôleur au fil : TXD bas donne un bus dominant, RXD recopie l'état du
bus [SOURCÉ : SRC-0069 §9.3.2 TXD]. Il reçoit aussi la tension batterie sur sa broche VSUP
[SOURCÉ : SRC-0069 §9.3.4 VSUP].

::figure{id=S24-F01}

### Seuils et débit

Le LIN n'est pas différentiel : ses seuils sont des fractions de la tension batterie
[SOURCÉ : SRC-0068 §3.1 Bus Signaling Fundamentals]. D'après la note TI :

- l'émetteur doit descendre sous 20 % de la tension batterie pour un dominant et remonter au-dessus de 80 % pour un récessif [SOURCÉ : SRC-0068 §3.3 Threshold Values] ;
- le récepteur lit un dominant sous 40 % et un récessif au-dessus de 60 % [SOURCÉ : SRC-0068 §3.3 Threshold Values] ;
- l'écart entre les deux couvre les chutes de tension dans le câblage et les décalages de masse [SOURCÉ : SRC-0068 §3.3 Threshold Values].

Le débit va de 1 à 20 kbit/s [SOURCÉ : SRC-0068 §3.4 Bit-Rate Tolerance and Timing Requirements].
Chaque nœud porte un petit condensateur de filtrage ; trop de capacité sur le bus ralentit les fronts
montants et fausse la lecture des bits [SOURCÉ : SRC-0068 §4.1 EMI and Signal Conditioning].

### La trame LIN

Une trame comprend un **en-tête**, toujours envoyé par le maître, puis une **réponse**
[SOURCÉ : SRC-0068 §2.4 Message Frame Format] :

- **pause de synchronisation** (*sync break*) : au moins 13 bits dominants, puis un bit de séparation ;
- **champ de synchronisation** : l'octet 0x55, une suite alternée qui permet aux esclaves de caler leur horloge sur celle du maître ;
- **identifiant protégé** (PID) : 6 bits d'identifiant et 2 bits de parité ; il désigne le message ;
- **réponse** : jusqu'à 8 octets de données puis une somme de contrôle.

Chaque octet est transmis comme un caractère série : un bit de départ dominant, 8 bits du poids
faible au poids fort, un bit d'arrêt [SOURCÉ : SRC-0068 §2.2 Serial Communication Principles].

### Exemple 1 : durée d'un bit

Un bus LIN fonctionne à 19,2 kbit/s [EXEMPLE].

1. Durée d'un bit : 1 / 19 200 ≈ 52 µs [EXEMPLE].
2. La pause de synchronisation dure au moins 13 bits, soit environ 677 µs [EXEMPLE].
3. Sur une capture, cette longue impulsion basse sert de repère de déclenchement.

### Exemple 2 : seuils à 12 V

Le bus est alimenté sous 12 V [EXEMPLE].

1. Un récepteur lit un dominant sous 40 % de 12 V, soit 4,8 V [EXEMPLE].
2. Il lit un récessif au-dessus de 60 % de 12 V, soit 7,2 V [EXEMPLE].
3. Un fil qui reste vers 6 V [EXEMPLE] est dans la zone indéterminée : on cherche une fuite ou un mauvais contact.

### Exemple 3 : un fil toujours bas

Le fil LIN reste à 0 V, contact mis, même sans trafic [EXEMPLE].

1. Hypothèses : fil en court-circuit à la masse, transceiver bloqué en dominant, résistance de tirage du maître coupée [HYPOTHÈSE].
2. Hors tension : résistance du fil vers la masse, nœuds débranchés un par un.
3. Les transceivers récents coupent un dominant trop long ; un dominant permanent oriente donc d'abord vers le câblage [SOURCÉ : SRC-0069 §9.3.2 TXD].

## Exercices

::exercice{id=S24-L01-EX01}

::exercice{id=S24-L01-EX02}

::exercice{id=S24-L01-EX03}
