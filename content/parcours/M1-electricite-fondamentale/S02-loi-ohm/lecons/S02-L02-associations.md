---
id: S02-L02
titre: Associations de résistances en série et en parallèle
chapitre: S02
version: "0.1"
statut: brouillon
duree_min: 90
objectifs:
  - id: O1
    texte: Calculer la résistance équivalente d'une association de résistances en série ou en parallèle
    competences: [D2.2]
  - id: O2
    texte: Calculer le courant, la tension et la puissance de chaque résistance d'une association série ou parallèle
    competences: [D2.2]
prerequis: [S02-L01]
exercices: [S02-L02-EX01, S02-L02-EX02, S02-L02-EX03]
references: [SRC-0001]
criteres_evaluation:
  - objectif: O1
    critere: Exercices S02-L02-EX01 et EX02 réussis, unité comprise
  - objectif: O2
    critere: Exercice S02-L02-EX03 réussi et questions de répartition du QCM réussies
figures:
  - id: S02-F02
    fichier: ../figures/S02-F02-serie-parallele.svg
    legende: "Deux résistances en série (même courant, les résistances s'ajoutent) et en parallèle (même tension, les inverses s'ajoutent)."
    alt: "À gauche, deux résistances R1 et R2 placées l'une après l'autre entre deux points, avec la mention : même courant, Req égale R1 plus R2. À droite, R1 et R2 reliées aux deux mêmes points, l'une au-dessus de l'autre, avec la mention : même tension, un sur Req égale un sur R1 plus un sur R2."
    origine: areprog
derniere_verification_sources: 2026-11-13
historique:
  - version: "0.1"
    date: 2026-11-13
    resume: Première rédaction
---

## Théorie

### Rappel : le courant est un débit de charge

Le courant mesure la quantité de charge électrique qui traverse une section de conducteur
chaque seconde [SOURCÉ : SRC-0001 §1.2]. La charge Q s'exprime en coulombs (C) : un courant
d'un ampère correspond à un coulomb par seconde, d'où **Q = I × t** pour un courant constant.

Cette image explique les deux règles de la leçon : dans une branche unique, la charge n'a qu'un
chemin, donc le même courant partout ; quand le circuit se divise, la charge se partage entre
les branches.

### Résistances en série

Deux résistances sont **en série** quand elles sont traversées par le même courant, l'une
après l'autre, sans dérivation entre elles. Leur résistance équivalente est la somme
[SOURCÉ : SRC-0001 §1.2] :

**Req = R1 + R2 + R3 + …**

La résistance équivalente est toujours plus grande que la plus grande des résistances. La
tension totale se partage : chaque résistance reçoit **Uk = Rk × I**, et la somme des tensions
partielles redonne la tension totale.

::figure{id=S02-F02}

### Résistances en parallèle

Deux résistances sont **en parallèle** quand elles sont reliées aux deux mêmes points : elles ont
la même tension à leurs bornes. Ce sont alors les inverses qui s'additionnent
[SOURCÉ : SRC-0001 §1.2] :

**1 / Req = 1 / R1 + 1 / R2 + …**, et pour deux résistances : **Req = (R1 × R2) / (R1 + R2)**.

La résistance équivalente est toujours plus petite que la plus petite des résistances. Le
courant total se partage : chaque branche reçoit **Ik = U / Rk**, et la somme des courants de
branche redonne le courant total.

Cas utile à retenir : deux résistances **identiques** en parallèle valent la moitié de l'une
d'elles.

### La conductance

L'inverse d'une résistance s'appelle la **conductance** : G = 1 / R, en siemens (S)
[À VÉRIFIER : définition et unité à confirmer dans SRC-0001 §1.2, section exacte à relever].
Avec elle, la règle du parallèle devient une simple somme : les conductances de branches en
parallèle s'additionnent. C'est la même règle que ci-dessus, écrite autrement.

### Qui chauffe le plus ?

- **En série**, le courant est le même : avec P = R × I², c'est la **plus grande** résistance qui dissipe le plus.
- **En parallèle**, la tension est la même : avec P = U² / R, c'est la **plus petite** résistance qui dissipe le plus.

Chaque résistance se vérifie séparément contre **sa** puissance nominale.

### Exemple 4 : deux résistances en série

Une résistance de 220 Ω et une de 330 Ω sont en série sous 5 V [EXEMPLE].

1. Req = 220 + 330 = 550 Ω [EXEMPLE].
2. I = U / Req = 5 / 550 = 0,009 09 A, soit 9,09 mA [EXEMPLE].
3. U1 = 220 × 0,009 09 = 2,0 V et U2 = 330 × 0,009 09 = 3,0 V [EXEMPLE].
4. Contrôle : 2,0 + 3,0 = 5,0 V [EXEMPLE], on retrouve la tension totale.

### Exemple 5 : deux résistances en parallèle

Une résistance de 1 kΩ et une de 1,5 kΩ sont en parallèle sous 12 V [EXEMPLE].

1. Req = (1 000 × 1 500) / (1 000 + 1 500) = 1 500 000 / 2 500 = 600 Ω [EXEMPLE].
2. I1 = 12 / 1 000 = 0,012 A = 12 mA et I2 = 12 / 1 500 = 0,008 A = 8 mA [EXEMPLE].
3. Courant total : 12 + 8 = 20 mA [EXEMPLE].
4. Contrôle : 12 / 600 = 0,02 A = 20 mA [EXEMPLE] : les deux méthodes concordent.

### Exemple 6 : remplacer une résistance par deux en parallèle

Il faut 100 Ω sous 9 V, mais on ne dispose que de résistances de 200 Ω de puissance nominale 0,5 W [EXEMPLE].

1. Deux résistances de 200 Ω en parallèle valent 200 / 2 = 100 Ω [EXEMPLE] : la valeur convient.
2. Puissance totale : P = U² / R = 81 / 100 = 0,81 W [EXEMPLE], plus qu'une seule résistance de 0,5 W ne supporterait.
3. Chaque résistance dissipe 81 / 200 = 0,405 W [EXEMPLE], moins que 0,5 W [EXEMPLE] : l'association convient, avec une marge faible.

Sur une carte, deux résistances identiques en parallèle sont parfois le signe d'un tel partage
de puissance [HYPOTHÈSE] : à confirmer par le calcul, jamais à supposer.

## Exercices

::exercice{id=S02-L02-EX01}

::exercice{id=S02-L02-EX02}

::exercice{id=S02-L02-EX03}
