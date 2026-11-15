---
id: S19-L01
titre: Numération, portes logiques et bascules
chapitre: S19
version: "0.1"
statut: brouillon
duree_min: 90
objectifs:
  - id: O1
    texte: Convertir un nombre entre binaire, hexadécimal et décimal
    competences: [D7.1]
  - id: O2
    texte: Lire et compléter la table de vérité des portes NON, ET, OU, NON-ET, NON-OU et OU exclusif
    competences: [D7.1]
  - id: O3
    texte: Expliquer le rôle d'une bascule D et d'un registre à décalage
    competences: [D7.1]
prerequis: [S09-L03]
exercices: [S19-L01-EX01, S19-L01-EX02, S19-L01-EX03]
references: [SRC-0052]
criteres_evaluation:
  - objectif: O1
    critere: Exercice S19-L01-EX01 réussi et adresse I²C convertie au TP-27
  - objectif: O2
    critere: Exercice S19-L01-EX02 réussi et table de vérité vérifiée au TP-26
  - objectif: O3
    critere: Exercice S19-L01-EX03 réussi
figures:
  - id: S19-F01
    fichier: ../figures/S19-F01-portes.svg
    legende: "Symboles usuels des portes NON, ET, OU, NON-ET, NON-OU et OU exclusif, chacun avec sa table de vérité à deux entrées (une seule entrée pour NON)."
    alt: "Six symboles de portes logiques en deux rangées, chacun suivi d'une petite table : entrées A et B, sortie S. Le rond en sortie marque l'inversion pour NON, NON-ET et NON-OU ; le OU exclusif a une double courbe à l'entrée."
    origine: areprog
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction
---

## Théorie

### Binaire, hexadécimal, décimal

En décimal, chaque chiffre vaut une puissance de 10 selon sa place ; en **binaire**, chaque bit
vaut une puissance de 2 [SOURCÉ : SRC-0052 §Decimal versus binary numeration]. Le bit de droite
vaut 1, puis 2, 4, 8, 16, 32, 64, 128… : 1011 en binaire vaut 8 + 2 + 1 = 11 en décimal.

L'**hexadécimal** utilise seize chiffres, de 0 à 9 puis de A à F ; un chiffre hexadécimal
représente exactement quatre bits, ce qui en fait une écriture courte du binaire
[SOURCÉ : SRC-0052 §Octal and hexadecimal numeration]. Pour passer du binaire à l'hexadécimal, on
groupe les bits par quatre en partant de la droite ; pour revenir au décimal, on multiplie chaque
chiffre par la puissance de 16 de sa place [SOURCÉ : SRC-0052 §Octal and hexadecimal to decimal conversion].
Pour passer du décimal au binaire, on divise successivement par 2 et l'on lit les restes
[SOURCÉ : SRC-0052 §Conversion from decimal numeration].

Notations courantes : 0x3C ou 3Ch pour l'hexadécimal, 0b0011 1100 pour le binaire
[À VÉRIFIER : notation employée par chaque fiche technique et chaque logiciel].
Un octet compte huit bits, soit deux chiffres hexadécimaux.

### Les portes logiques

Une porte logique donne une sortie haute (1) ou basse (0) selon ses entrées
[SOURCÉ : SRC-0052 §Digital signals and gates]. La **table de vérité** liste la sortie pour
chaque combinaison d'entrées [SOURCÉ : SRC-0052 §Multiple-input gates] :

- **NON** (inverseur) : la sortie est l'inverse de l'entrée [SOURCÉ : SRC-0052 §The NOT gate] ;
- **ET** : sortie à 1 seulement si toutes les entrées sont à 1 ; **OU** : sortie à 1 si au moins une entrée est à 1 ;
- **NON-ET** et **NON-OU** : ET et OU suivis d'une inversion ; **OU exclusif** : sortie à 1 si les entrées sont différentes [SOURCÉ : SRC-0052 §Multiple-input gates].

::figure{id=S19-F01}

Les portes NON-ET et NON-OU sont **universelles** : avec assez de portes d'un seul de ces types, on
peut reproduire n'importe quelle autre fonction [SOURCÉ : SRC-0052 §Gate universality].

### Bascules et registres

Une **bascule** mémorise un bit. La bascule D recopie son entrée D sur sa sortie Q au moment du
front actif de l'horloge, et garde cette valeur jusqu'au front suivant
[SOURCÉ : SRC-0052 §Edge-triggered latches: Flip-Flops]. Certaines bascules ont des entrées
asynchrones (mise à 1, remise à 0) qui agissent sans attendre l'horloge
[SOURCÉ : SRC-0052 §Asynchronous flip-flop inputs].

Un **registre à décalage** enchaîne des bascules : à chaque front d'horloge, les bits avancent
d'une place [SOURCÉ : SRC-0052 §Serial-in/serial-out shift register]. Il transforme une donnée
série en parallèle, ou l'inverse [SOURCÉ : SRC-0052 §Serial-in, parallel-out shift register] :
c'est le principe des liaisons série étudiées en S21 et des circuits d'extension de sorties
[HYPOTHÈSE : usage courant, à confirmer sur le schéma de chaque carte].

### Exemple 1 : de l'hexadécimal au décimal

Une adresse vaut 0x3C [EXEMPLE].

1. En binaire : 3 = 0011 et C = 1100, soit 0011 1100.
2. En décimal : 3 × 16 + 12 = 60 [EXEMPLE].
3. Vérification par les bits : 32 + 16 + 8 + 4 = 60.

### Exemple 2 : du décimal au binaire

On convertit 200 [EXEMPLE].

1. Divisions successives par 2 : 200, 100, 50, 25, 12, 6, 3, 1 ; restes 0, 0, 0, 1, 0, 0, 1, 1.
2. Restes lus du dernier au premier : 1100 1000.
3. En hexadécimal : 1100 = C, 1000 = 8, soit 0xC8.

### Exemple 3 : une table de vérité

Une porte NON-ET à deux entrées reçoit A = 1 et B = 0 [EXEMPLE].

1. Le ET donnerait 0, car une entrée est à 0.
2. L'inversion donne 1 : la sortie du NON-ET vaut 1.
3. Seule la combinaison A = 1, B = 1 donne 0 en sortie d'un NON-ET.

## Exercices

::exercice{id=S19-L01-EX01}

::exercice{id=S19-L01-EX02}

::exercice{id=S19-L01-EX03}
