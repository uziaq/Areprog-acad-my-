---
id: S10-L02
titre: Le comparateur et l'hystérésis
chapitre: S10
version: "0.1"
statut: brouillon
duree_min: 60
objectifs:
  - id: O1
    texte: Expliquer le fonctionnement d'un comparateur et pourquoi le bruit provoque des basculements multiples sans hystérésis
    competences: [D4.5]
  - id: O2
    texte: Calculer les seuils haut et bas d'un comparateur à hystérésis à partir de ses résistances
    competences: [D4.5]
prerequis: [S10-L01]
exercices: [S10-L02-EX01, S10-L02-EX02]
references: [SRC-0023, SRC-0025]
criteres_evaluation:
  - objectif: O1
    critere: Exercice S10-L02-EX02 réussi et question du QCM sur le bruit réussie
  - objectif: O2
    critere: Exercice S10-L02-EX01 réussi et seuils mesurés comparés aux seuils calculés au TP-16
figures:
  - id: S10-F02
    fichier: ../figures/S10-F02-comparateur-hysteresis.svg
    legende: "Comparateur à hystérésis alimenté en Vcc seul. Le signal arrive sur l'entrée −. Le pont Rx (vers Vcc) et Ry (vers la masse) fixe la tension de l'entrée + ; la résistance Rh relie la sortie à l'entrée +."
    alt: "Un triangle de comparateur. L'entrée moins reçoit le signal d'entrée. L'entrée plus est au milieu d'un pont de deux résistances, Rx vers l'alimentation et Ry vers la masse. Une troisième résistance, Rh, relie la sortie à l'entrée plus."
    origine: areprog
derniere_verification_sources: 2026-11-14
historique:
  - version: "0.1"
    date: 2026-11-14
    resume: Première rédaction
---

## Théorie

### Comparer deux tensions

Un comparateur fait basculer sa sortie selon que son entrée dépasse ou non un seuil. Sans
contre-réaction, un AOP fonctionne déjà ainsi [SOURCÉ : SRC-0023 §The "operational" amplifier] ;
on utilise aussi des circuits **comparateurs** dédiés, plus rapides en basculement. Le seuil est
souvent fixé par un pont de résistances.

Dans le montage de la note TI, le signal arrive sur l'entrée inverseuse : la sortie passe au niveau
bas quand l'entrée dépasse le seuil, et au niveau haut quand elle redescend en dessous
[SOURCÉ : SRC-0025 §2].

### Le problème du bruit

Un signal réel porte du bruit. Quand il passe lentement près du seuil, le bruit le fait passer
plusieurs fois au-dessus et en dessous : la sortie bascule plusieurs fois au lieu d'une
[SOURCÉ : SRC-0025 §2]. La note cite les conséquences : un microcontrôleur qui reçoit un message
incohérent, une vanne ou un moteur commandés plusieurs fois de suite [SOURCÉ : SRC-0025 §2].

### L'hystérésis : deux seuils au lieu d'un

On ajoute une **réaction positive** : une résistance Rh entre la sortie et l'entrée +. Un AOP en
réaction positive tend à rester dans l'état où il est : c'est l'hystérésis
[SOURCÉ : SRC-0023 §Positive feedback].

::figure{id=S10-F02}

Le comparateur a alors deux seuils [SOURCÉ : SRC-0025 §2] :

- sortie au niveau haut, Rh se retrouve **en parallèle sur Rx** : le seuil monte, c'est le **seuil haut** VH ; l'entrée doit dépasser VH pour faire basculer la sortie au niveau bas ;
- sortie au niveau bas, Rh se retrouve **en parallèle sur Ry** : le seuil baisse, c'est le **seuil bas** VL ; l'entrée doit redescendre sous VL pour faire basculer la sortie au niveau haut.

L'écart VH − VL est la **largeur d'hystérésis**. Elle doit être plus grande que le bruit à
rejeter ; sinon, des basculements multiples réapparaissent [SOURCÉ : SRC-0025 §2].

### Calculer les seuils

Avec une sortie qui va de la masse à Vcc, alimentée par la même tension que le pont [HYPOTHÈSE : sortie push-pull qui atteint ses deux alimentations ; une sortie à drain ouvert demande une résistance de tirage qui modifie le calcul] :

- **VH** : pont formé de (Rx en parallèle avec Rh) côté Vcc et de Ry côté masse : VH = Vcc × Ry / (Ry + Rx∥Rh).
- **VL** : pont formé de Rx côté Vcc et de (Ry en parallèle avec Rh) côté masse : VL = Vcc × (Ry∥Rh) / (Rx + Ry∥Rh).

Ce sont des diviseurs de tension et des résistances en parallèle, vus en S03.

### Exemple 4 : un comparateur sans hystérésis

Un pont Rx = Ry = 10 kΩ sous 5 V fixe le seuil [EXEMPLE].

1. Seuil : 5 × 10 / (10 + 10) = 2,5 V [EXEMPLE].
2. Un signal qui monte lentement et porte 50 mV de bruit [EXEMPLE] traverse le seuil plusieurs fois : la sortie bascule plusieurs fois.

### Exemple 5 : calculer les seuils d'hystérésis

On ajoute Rh = 100 kΩ au montage précédent, sous 5 V [EXEMPLE].

1. Rx∥Rh = 10 × 100 / 110 = 9,09 kΩ [EXEMPLE] ; de même Ry∥Rh = 9,09 kΩ [EXEMPLE].
2. VH = 5 × 10 / (10 + 9,09) = 2,62 V [EXEMPLE].
3. VL = 5 × 9,09 / (10 + 9,09) = 2,38 V [EXEMPLE].
4. Largeur d'hystérésis : 2,62 − 2,38 = 0,24 V [EXEMPLE], plus grande que les 50 mV de bruit [EXEMPLE] de l'exemple 4.

### Exemple 6 : une hystérésis trop étroite

Même montage, mais le signal porte 0,3 V de bruit crête à crête [EXEMPLE].

1. 0,3 V est plus grand que la largeur de 0,24 V [EXEMPLE] : le bruit peut encore traverser les deux seuils.
2. Remède : réduire Rh pour élargir l'hystérésis, ou filtrer le signal (filtre RC, S06).
3. En dépannage, un relais ou un ventilateur qui « bat » au voisinage d'un seuil fait penser à un manque d'hystérésis ou à un signal bruité [HYPOTHÈSE], à vérifier à l'oscilloscope.

## Exercices

::exercice{id=S10-L02-EX01}

::exercice{id=S10-L02-EX02}
