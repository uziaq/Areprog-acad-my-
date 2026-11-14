---
id: S06-L02
titre: Réactance, impédance et filtre RC du premier ordre
chapitre: S06
version: "0.1"
statut: brouillon
duree_min: 90
objectifs:
  - id: O1
    texte: Calculer la réactance d'un condensateur à une fréquence donnée et dire comment elle varie avec la fréquence
    competences: [D2.7]
  - id: O2
    texte: Calculer la fréquence de coupure d'un filtre RC passe-bas et prévoir son comportement de part et d'autre
    competences: [D2.7]
  - id: O3
    texte: Exprimer un rapport de tensions en décibels et tracer la réponse en fréquence d'un filtre RC
    competences: [D2.7]
prerequis: [S06-L01]
exercices: [S06-L02-EX01, S06-L02-EX02, S06-L02-EX03]
references: [SRC-0010, SRC-0011]
criteres_evaluation:
  - objectif: O1
    critere: Exercice S06-L02-EX01 réussi
  - objectif: O2
    critere: Exercice S06-L02-EX02 réussi et fréquence de coupure mesurée au TP-09
  - objectif: O3
    critere: Exercice S06-L02-EX03 réussi et diagramme gain-fréquence tracé au TP-09
figures:
  - id: S06-F02
    fichier: ../figures/S06-F02-filtre-rc.svg
    legende: "Filtre RC passe-bas : la résistance R en série, le condensateur C entre la sortie et la masse. À droite, l'allure du rapport Us / Ue en fonction de la fréquence : proche de 1 en basse fréquence, 0,707 à la fréquence de coupure fc, puis décroissant."
    alt: "À gauche, schéma : entrée Ue, résistance R horizontale, nœud de sortie Us, condensateur C du nœud vers la masse. À droite, graphique avec la fréquence en abscisse et le rapport Us sur Ue en ordonnée : un palier proche de 1, un repère à 0,707 au niveau de fc, puis une descente."
    origine: areprog
derniere_verification_sources: 2026-11-14
historique:
  - version: "0.1"
    date: 2026-11-14
    resume: Première rédaction
---

## Théorie

### La réactance du condensateur

En alternatif, un condensateur s'oppose au passage du courant par sa **réactance** XC, en ohms :

**XC = 1 / (2π × f × C)** [SOURCÉ : SRC-0010 §AC capacitor circuits]

La réactance **diminue quand la fréquence augmente** [SOURCÉ : SRC-0010 §AC capacitor circuits] :
un condensateur bloque le continu (f = 0) et laisse passer les hautes fréquences. C'est tout le
principe du découplage vu en S05-L03.

### L'impédance

L'**impédance** Z mesure l'opposition totale au passage du courant alternatif [SOURCÉ : SRC-0010 §Series resistor-capacitor circuits].
Elle combine résistance et réactance, mais pas par une simple addition : la tension aux bornes du
condensateur est déphasée par rapport à celle de la résistance. Pour R et C en série,
Z = √(R² + XC²) ; le calcul complet avec les déphasages est hors du programme de cette semaine.

### Le filtre RC passe-bas

::figure{id=S06-F02}

La résistance est en série, le condensateur entre la sortie et la masse. En basse fréquence,
XC est grande devant R : presque toute la tension se retrouve en sortie. En haute fréquence, XC
devient petite : le condensateur dérive le signal vers la masse, et la tension tombe aux bornes
de R [SOURCÉ : SRC-0010 §Low-pass filters].

- **Fréquence de coupure** : fc = 1 / (2π × R × C) [SOURCÉ : SRC-0010 §Low-pass filters].
- À la coupure, la sortie vaut 70,7 % de l'entrée ; au-delà, elle tombe en dessous [SOURCÉ : SRC-0010 §Low-pass filters].
- À fc, XC = R : c'est une façon simple de retrouver la formule.

Un filtre RC passe-bas lisse un signal PWM (il en garde la valeur moyenne) ou atténue un parasite
haute fréquence sur l'entrée d'un capteur. Son effet sur un signal utile se calcule : il le
déforme aussi si la fréquence du signal approche fc.

### Les décibels

On exprime souvent un rapport de tensions en **décibels** : **dB = 20 × log10(U1 / U2)**
[SOURCÉ : SRC-0011 §Attenuators]. La source précise que cette forme suppose des résistances de
source et de charge égales [SOURCÉ : SRC-0011 §Attenuators] ; en mesure de filtre, on l'emploie
par convention pour le rapport Us / Ue.

| Us / Ue | En décibels |
|---|---|
| 1 | 0 dB [EXEMPLE : calcul, 20 × log10(1)] |
| 0,707 | −3 dB [EXEMPLE : calcul, 20 × log10(0,707)] |
| 0,1 | −20 dB [EXEMPLE : calcul, 20 × log10(0,1)] |

C'est pourquoi on parle de « fréquence de coupure à −3 dB ».

### Exemple 4 : réactance à deux fréquences

Condensateur de 100 nF [EXEMPLE].

1. À 100 Hz : XC = 1 / (2π × 100 × 0,000 000 1) = 15,9 kΩ [EXEMPLE].
2. À 10 kHz : XC = 1 / (2π × 10 000 × 0,000 000 1) = 159 Ω [EXEMPLE].
3. Fréquence multipliée par 100 [EXEMPLE] : réactance divisée par 100.

### Exemple 5 : fréquence de coupure

R = 1,6 kΩ, C = 100 nF [EXEMPLE].

1. fc = 1 / (2π × 1 600 × 0,000 000 1) = 995 Hz [EXEMPLE], soit environ 1 kHz.
2. À 100 Hz [EXEMPLE], dix fois en dessous, la sortie est pratiquement égale à l'entrée.
3. À 10 kHz [EXEMPLE], dix fois au-dessus, la sortie est environ dix fois plus petite, soit environ −20 dB [EXEMPLE : approximation du premier ordre loin de fc].

### Exemple 6 : choisir un condensateur

On veut fc = 160 Hz avec R = 10 kΩ [EXEMPLE].

1. C = 1 / (2π × R × fc) = 1 / (2π × 10 000 × 160) [EXEMPLE].
2. C = 0,000 000 099 5 F, soit environ 100 nF [EXEMPLE].
3. La valeur normalisée la plus proche se choisit dans une série E (S02) ; la tolérance du condensateur déplace fc d'autant [HYPOTHÈSE].

## Exercices

::exercice{id=S06-L02-EX01}

::exercice{id=S06-L02-EX02}

::exercice{id=S06-L02-EX03}
