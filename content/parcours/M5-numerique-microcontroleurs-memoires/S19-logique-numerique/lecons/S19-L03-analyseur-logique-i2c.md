---
id: S19-L03
titre: Analyseur logique et bus I²C
chapitre: S19
version: "0.1"
statut: brouillon
duree_min: 90
objectifs:
  - id: O1
    texte: Régler un analyseur logique (seuil, fréquence d'échantillonnage, profondeur de mémoire, déclenchement) pour observer un bus
    competences: [D3.6]
  - id: O2
    texte: Lire une trame I²C (START, adresse, bit R/W, acquittement, données, STOP)
    competences: [D3.6, D7.1]
prerequis: [S19-L02, S11-L03]
exercices: [S19-L03-EX01, S19-L03-EX02]
references: [SRC-0055, SRC-0054]
criteres_evaluation:
  - objectif: O1
    critere: Exercice S19-L03-EX01 réussi et réglages de l'analyseur justifiés au TP-27
  - objectif: O2
    critere: Exercice S19-L03-EX02 réussi et trame I²C décodée au TP-27
figures:
  - id: S19-F03
    fichier: ../figures/S19-F03-trame-i2c.svg
    legende: "Début d'une trame I²C : condition START (SDA descend pendant que SCL est haut), sept bits d'adresse, bit R/W, acquittement (SDA tenue basse par le récepteur au neuvième coup d'horloge), puis STOP (SDA monte pendant que SCL est haut). D'après la description de la spécification NXP UM10204 ; allure sans valeur."
    alt: "Deux chronogrammes superposés, SCL en haut et SDA en bas. Repère S au début, puis neuf impulsions d'horloge marquées adresse (sept bits), R/W et ACK, puis P à la fin. SDA change seulement quand SCL est bas, sauf au START et au STOP."
    origine: areprog
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction
---

## Théorie

### L'analyseur logique

L'analyseur logique compare chaque entrée à une **tension de seuil** : au-dessus, il enregistre un
1 ; au-dessous, un 0 [SOURCÉ : SRC-0055 §The Logic Analyzer]. Il voit donc des états, pas la forme
analogique du signal : pour un front lent, une oscillation ou un niveau douteux, on revient à
l'oscilloscope (S11) [SOURCÉ : SRC-0055 §Digital Oscilloscope]. Ses atouts : beaucoup de voies
corrélées dans le temps et un déclenchement sur des conditions logiques [SOURCÉ : SRC-0055 §Set Up Triggering].

Réglages à faire :

- **seuil** : adapté à la tension du bus observé, par exemple au milieu de la plage 0 V – VDD [HYPOTHÈSE : à régler selon la notice de l'analyseur et la tension du bus] ;
- **acquisition asynchrone** (*timing*) : l'analyseur échantillonne à sa propre cadence ; la précision d'une mesure de temps vaut au mieux une période d'échantillonnage [SOURCÉ : SRC-0055 §Set Up Clock Modes] ;
- **profondeur de mémoire** : pour une mémoire donnée, la durée enregistrée diminue quand la fréquence d'échantillonnage augmente [SOURCÉ : SRC-0055 §Real-time Acquisition Memory] ;
- **déclenchement** : sur un front, une valeur, une condition ; on peut garder les données d'avant le déclenchement pour voir la cause d'un défaut [SOURCÉ : SRC-0055 §Set Up Triggering].

La masse de l'analyseur se relie à la masse de la carte, comme celle d'une sonde d'oscilloscope
(S11) ; la tension admise par ses entrées se lit dans sa notice [À VÉRIFIER : analyseur de l'atelier, tension d'entrée maximale et fréquence d'échantillonnage dans sa notice].

### Le bus I²C

Le bus I²C relie des circuits d'une même carte par deux lignes : **SDA** (données) et **SCL**
(horloge), toutes deux tirées vers l'alimentation par des résistances ; les sorties sont à drain ou
collecteur ouvert (S19-L02) et la ligne est haute quand le bus est libre
[SOURCÉ : SRC-0054 §3.1.1 SDA and SCL signals]. Débits : jusqu'à 100 kbit/s en mode standard,
400 kbit/s en mode rapide [SOURCÉ : SRC-0054 §3.1.1 SDA and SCL signals].
Les niveaux logiques suivent la tension d'alimentation : VIL = 0,3 × VDD et VIH = 0,7 × VDD [SOURCÉ : SRC-0054 §3.1.2 SDA and SCL logic levels].

Une trame se lit ainsi :

- **START** : SDA descend pendant que SCL est haut ; **STOP** : SDA monte pendant que SCL est haut [SOURCÉ : SRC-0054 §3.1.4 START and STOP conditions] ;
- hors START et STOP, SDA ne change que lorsque SCL est bas ; elle est lue pendant que SCL est haut [SOURCÉ : SRC-0054 §3.1.3 Data validity] ;
- chaque octet compte huit bits, bit de poids fort en premier, suivi d'un bit d'**acquittement** [SOURCÉ : SRC-0054 §3.1.5 Byte format] ;
- acquittement (ACK) : le récepteur tient SDA basse au neuvième coup d'horloge ; SDA restée haute signifie un non-acquittement (NACK), par exemple quand aucun circuit ne répond à l'adresse [SOURCÉ : SRC-0054 §3.1.6 Acknowledge (ACK) and Not Acknowledge (NACK)] ;
- le premier octet porte l'**adresse** sur sept bits, suivie du bit **R/W** : 0 pour une écriture, 1 pour une lecture [SOURCÉ : SRC-0054 §3.1.10 The target address and R/W bit].

::figure{id=S19-F03}

La valeur des résistances de tirage dépend de la capacité du bus et de la tension : une résistance
trop grande ralentit les fronts montants, une résistance trop petite demande trop de courant aux
sorties [SOURCÉ : SRC-0054 §7.1 Pull-up resistor sizing].

### Exemple 7 : durée enregistrée

Un analyseur a une mémoire de 1 million d'échantillons par voie ; il échantillonne toutes les 0,5 µs, soit à 2 MHz [EXEMPLE].

1. Durée enregistrée : 1 000 000 × 0,5 µs = 0,5 s [EXEMPLE].
2. Résolution en temps : 0,5 µs au mieux [SOURCÉ : SRC-0055 §Set Up Clock Modes].
3. Pour un bus I²C à 100 kbit/s, une période d'horloge dure 10 µs [EXEMPLE] : vingt échantillons par période, largement assez.

### Exemple 8 : lire un premier octet

Après un START, on lit sur SDA les huit bits 0111 1000, puis SDA basse au neuvième coup d'horloge [EXEMPLE].

1. Adresse : les sept premiers bits, 011 1100, soit 0x3C [EXEMPLE].
2. Bit R/W : 0, c'est une écriture.
3. Neuvième bit à 0 : le circuit adressé a acquitté.

### Exemple 9 : un circuit qui ne répond pas

L'analyseur montre un START, une adresse, puis SDA haute au neuvième coup d'horloge, et un STOP [EXEMPLE].

1. C'est un NACK : aucun circuit n'a acquitté cette adresse [SOURCÉ : SRC-0054 §3.1.6 Acknowledge (ACK) and Not Acknowledge (NACK)].
2. Hypothèses : circuit non alimenté, adresse différente, circuit en défaut, liaison coupée [HYPOTHÈSE].
3. Mesures : alimentation du circuit, continuité de SDA et SCL, adresse prévue par sa fiche.

## Exercices

::exercice{id=S19-L03-EX01}

::exercice{id=S19-L03-EX02}
