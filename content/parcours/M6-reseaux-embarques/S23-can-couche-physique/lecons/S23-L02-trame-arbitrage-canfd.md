---
id: S23-L02
titre: Trame CAN, arbitrage et CAN FD (notions)
chapitre: S23
version: "0.1"
statut: brouillon
duree_min: 60
objectifs:
  - id: O1
    texte: Nommer les champs d'une trame CAN standard et le rôle de l'identifiant et de l'acquittement
    competences: [D8.1]
  - id: O2
    texte: Expliquer l'arbitrage bit à bit non destructif et les notions de CAN FD
    competences: [D8.1]
prerequis: [S23-L01, S19-L01]
exercices: [S23-L02-EX01, S23-L02-EX02]
references: [SRC-0065, SRC-0067]
criteres_evaluation:
  - objectif: O1
    critere: Exercice S23-L02-EX01 réussi et début de trame repéré sur une capture au TP-33
  - objectif: O2
    critere: Exercice S23-L02-EX02 réussi
figures:
  - id: S23-F02
    fichier: ../figures/S23-F02-trame-standard.svg
    legende: "Champs d'une trame CAN standard : début de trame (SOF), identifiant sur 11 bits, RTR, IDE, bit réservé, longueur des données (DLC), données de 0 à 8 octets, CRC, acquittement (ACK), fin de trame (EOF). D'après la note TI SLOA101 ; largeurs non proportionnelles."
    alt: "Une bande horizontale découpée en cases successives : SOF, identifiant 11 bits, RTR, IDE, r0, DLC, données 0 à 8 octets, CRC, ACK, EOF."
    origine: areprog
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction
---

## Théorie

### La trame standard

Une trame CAN standard comprend, dans l'ordre [SOURCÉ : SRC-0065 §3.1.1 Standard CAN] :

- **SOF** : un bit dominant qui marque le début et synchronise les nœuds ;
- **identifiant** sur 11 bits : il fixe la priorité du message ; plus sa valeur est basse, plus le message est prioritaire ;
- **RTR**, **IDE**, un bit réservé, puis **DLC** sur 4 bits, qui donne le nombre d'octets de données ;
- **données** : jusqu'à 8 octets ;
- **CRC** : contrôle d'erreur ;
- **ACK** : chaque nœud qui a reçu le message sans erreur écrase ce bit récessif par un bit dominant ;
- **EOF** : fin de trame.

::figure{id=S23-F02}

Une trame étendue utilise un identifiant de 29 bits [SOURCÉ : SRC-0065 §3.1.2 Extended CAN]. Le CAN ne
désigne pas un destinataire : tous les nœuds reçoivent le message, et chacun garde ceux qui
l'intéressent d'après l'identifiant [SOURCÉ : SRC-0065 §3.1.1 Standard CAN].

### L'arbitrage

L'accès au bus se fait à l'initiative de chaque nœud ; si deux nœuds émettent en même temps,
l'arbitrage se fait bit à bit sans détruire le message prioritaire : un bit dominant l'emporte sur un
bit récessif, et le nœud qui lit un dominant alors qu'il émettait un récessif se retire
[SOURCÉ : SRC-0065 §4.1 Arbitration]. Le message à l'identifiant le plus bas gagne.

### Erreurs

Un nœud qui détecte une erreur émet une trame d'erreur [SOURCÉ : SRC-0065 §4.2.3 The Error Frame]. Le
protocole limite les dégâts d'un nœud défaillant par un confinement des fautes
[SOURCÉ : SRC-0065 §4.4 Error Checking and Fault Confinement]. Sur un bus physiquement abîmé, ces
trames d'erreur se multiplient [HYPOTHÈSE : observation à confirmer avec une interface CAN].

### CAN FD, notions

Le CAN FD (*flexible data rate*) accélère la phase de données. Un transceiver automobile récent
annonce par exemple 2 Mbit/s en CAN FD, et 5 Mbit/s pour certaines versions
[SOURCÉ : SRC-0067 §1 Features]. Les trames CAN FD transportent davantage de données que les trames
classiques [À VÉRIFIER : taille maximale des données en CAN FD, dans ISO 11898-1:2015, non consultée].
La couche physique reste la même paire différentielle terminée [HYPOTHÈSE : à confirmer dans la fiche
du transceiver et la documentation du véhicule].

### Exemple 4 : priorité

Deux nœuds émettent en même temps les identifiants 0x100 et 0x0F0 [EXEMPLE].

1. 0x0F0 est plus petit que 0x100.
2. Au premier bit où ils diffèrent, 0x0F0 émet un dominant (0) et 0x100 un récessif (1).
3. Le nœud 0x100 se retire ; le message 0x0F0 passe intact [SOURCÉ : SRC-0065 §4.1 Arbitration].

### Exemple 5 : longueur des données

Un champ DLC vaut 0110 [EXEMPLE].

1. 0110 en binaire vaut 6.
2. La trame porte 6 octets de données.
3. En CAN classique, le maximum est 8 octets [SOURCÉ : SRC-0065 §3.1.1 Standard CAN].

### Exemple 6 : bit d'acquittement

Sur une capture, le bit ACK reste récessif [EXEMPLE].

1. Aucun nœud n'a acquitté la trame [SOURCÉ : SRC-0065 §3.1.1 Standard CAN].
2. Hypothèses : émetteur seul sur le bus, débit différent des autres nœuds, autres nœuds non alimentés [HYPOTHÈSE].
3. Vérifications : alimentation des autres nœuds, débit configuré, câblage.

## Exercices

::exercice{id=S23-L02-EX01}

::exercice{id=S23-L02-EX02}
