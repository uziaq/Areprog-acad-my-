---
id: S36-L01
titre: Diagnostiquer l'alimentation et la réserve d'énergie
chapitre: S36
version: "0.1"
statut: brouillon
duree_min: 110
objectifs:
  - id: O1
    texte: Contrôler hors tension la chaîne d'alimentation d'un calculateur d'airbag (court-circuit, résistances, réserve après décharge mesurée) en comparant à l'exemplaire de référence
    competences: [D10.7]
  - id: O2
    texte: Contrôler sous tension limitée les tensions de l'élévateur et des régulateurs, et les comparer aux valeurs de la fiche quand le circuit est identifié
    competences: [D10.7]
  - id: O3
    texte: Diagnostiquer une réserve d'énergie (capacité, résistance série, usure d'un électrolytique) et calculer l'énergie qu'elle peut encore stocker
    competences: [D10.6, D10.7]
prerequis: [S35, S18, S16]
exercices: [S36-L01-EX01, S36-L01-EX02, S36-L01-EX03]
references: [SRC-0097, SRC-0013, SRC-0039]
criteres_evaluation:
  - objectif: O1
    critere: Exercice S36-L01-EX03 réussi et contrôles hors tension relevés au TP-53
  - objectif: O2
    critere: Exercice S36-L01-EX01 réussi et tensions relevées sous tension limitée au TP-53
  - objectif: O3
    critere: Exercice S36-L01-EX02 réussi
figures:
  - id: S36-F01
    fichier: ../figures/S36-F01-controle-alimentation.svg
    legende: "Points de contrôle génériques de l'alimentation d'un calculateur d'airbag : entrée, élévateur, réserve d'énergie, abaisseur et régulateur 5 V, puis conditions de vie du microcontrôleur ; d'abord hors tension, puis sous tension limitée, comparés à l'exemplaire de référence. D'après la fiche citée ; à relier aux circuits relevés sur la carte."
    alt: "Cinq blocs : entrée, élévateur, réserve, abaisseur et régulateur 5 V en ligne, puis microcontrôleur en dessous. Un cadre en pointillés rappelle l'ordre : hors tension, puis sous tension limitée, un point après l'autre, comparé à la référence."
    origine: areprog
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction
---

## Théorie

### L'alimentation d'abord, comme pour tout calculateur

Un calculateur d'airbag se diagnostique comme les autres (S18, S30) : l'alimentation d'abord, puis les
conditions de vie du microcontrôleur, puis les fonctions. Deux différences : la **réserve d'énergie**,
à décharger et à mesurer avant tout contact, et le **protocole renforcé**, qui exige une preuve à chaque étape.

::figure{id=S36-F01}

### Hors tension : ce que l'on mesure en premier

Après la décharge mesurée deux fois [SOURCÉ : SRC-0013 §2-7 Restriking Voltage], on mesure hors tension :

- la résistance entre l'entrée d'alimentation et la masse, puis entre chaque rail et la masse, comparée à l'exemplaire de référence (S18) ;
- la diode de protection d'entrée et le fusible éventuel ;
- l'inductance, la diode et le transistor de l'élévateur s'ils sont externes, par comparaison avec la référence (S30).

Un rail en court-circuit se localise par les méthodes de S18, sous courant limité, jamais en
alimentant la réserve d'énergie [HYPOTHÈSE : règle de l'académie, à appliquer avec le protocole renforcé].

### Sous tension limitée : les tensions de la chaîne

Si le circuit de base de système de la carte est identifié, sa fiche donne les tensions attendues.
Pour le circuit cité, l'élévateur fournit de 31,6 V à 35 V, valeur typique 33,3 V [SOURCÉ : SRC-0097 §Static Electrical Characteristics, Power Management].
Son seuil de surtension est compris entre 36 V et 40 V [SOURCÉ : SRC-0097 §Static Electrical Characteristics, Power Management].
L'abaisseur donne de 8,73 V à 9,27 V [SOURCÉ : SRC-0097 §Static Electrical Characteristics, Power Management].
L'alimentation de la logique donne de 4,85 V à 5,15 V [SOURCÉ : SRC-0097 §Static Electrical Characteristics, Power Management].
L'élévateur s'arrête si la tension d'entrée descend sous un seuil de 4,7 V à 5,2 V [SOURCÉ : SRC-0097 §Static Electrical Characteristics, Power Management].

Ces valeurs ne valent que pour ce circuit : sur une autre carte, elles viennent de la fiche du circuit
relevé [À VÉRIFIER : circuit de base de système de la carte étudiée].
Les mesures sous tension se font avec la masse de la sonde sur la masse de la carte, sans toucher les sorties d'allumeurs.

### La réserve d'énergie et son diagnostic

Le circuit cité surveille la tension de la réserve et la diagnostique en la déchargeant brièvement
pour mesurer sa capacité et sa résistance série [SOURCÉ : SRC-0097 §ENERGY RESERVE CONTROL].
Sa mesure de capacité a une tolérance de ±15 % [SOURCÉ : SRC-0097 §Static Electrical Characteristics, Power Management].
Sa mesure de résistance série couvre 200 mΩ à 600 mΩ [SOURCÉ : SRC-0097 §Static Electrical Characteristics, Power Management].
Un défaut « réserve d'énergie » lu par l'outil vient donc souvent d'une capacité trop faible ou d'une
résistance série trop forte [HYPOTHÈSE : à confirmer par la mesure hors circuit].

La réserve est en général un condensateur électrolytique [À VÉRIFIER : technologie sur la carte étudiée].
Un électrolytique s'use : l'électrolyte s'évapore à travers le joint jusqu'à la perte de capacité [SOURCÉ : SRC-0013 §2-2-2 Failure Mode in the Field].
La chaleur accélère cette usure ; la durée de vie double environ pour chaque baisse de 10 °C [SOURCÉ : SRC-0013 §2-9-3 Ambient Temperature and Life].
La résistance série d'un condensateur fait partie de ses parasites et se compare entre deux pièces à la même température [SOURCÉ : SRC-0039 §3.1 Capacitor Parasitics Affecting Switching Regulator Performance].

On mesure la capacité et la résistance série **hors circuit**, après décharge mesurée, au capacimètre
ou au pont, et on compare à la valeur marquée et à la réserve de l'exemplaire de référence.

### Exemple 1 : une tension d'élévateur

Sur la carte étudiée, le circuit de base de système cité est identifié ; l'élévateur mesure 33,1 V [EXEMPLE].

1. Plage de la fiche : 31,6 V à 35 V [SOURCÉ : SRC-0097 §Static Electrical Characteristics, Power Management].
2. 33,1 V est dans la plage [EXEMPLE] : l'élévateur fonctionne.
3. On poursuit vers la réserve et l'abaisseur, sans conclure sur le reste de la carte.

### Exemple 2 : une réserve qui a perdu de la capacité

La réserve est marquée 4,7 mF ; mesurée hors circuit, elle donne 3,2 mF [EXEMPLE].

1. Perte : (4,7 − 3,2) / 4,7 ≈ 32 % [EXEMPLE].
2. Même la tolérance de mesure de ±15 % du circuit ne l'explique pas [SOURCÉ : SRC-0097 §Static Electrical Characteristics, Power Management].
3. La réserve de l'exemplaire de référence, mesurée dans les mêmes conditions, sert de comparaison.

### Exemple 3 : l'énergie disponible

La même réserve est chargée à 33 V [EXEMPLE].

1. Neuve : E = ½ × 0,0047 × 33² ≈ 2,56 J [EXEMPLE].
2. Usée : E = ½ × 0,0032 × 33² ≈ 1,74 J [EXEMPLE].
3. Moins d'énergie, c'est moins d'autonomie après une perte de batterie [SOURCÉ : SRC-0097 §ENERGY RESERVE CONTROL].

## Exercices

::exercice{id=S36-L01-EX01}

::exercice{id=S36-L01-EX02}

::exercice{id=S36-L01-EX03}
