---
id: S16-L01
titre: Principe du buck et du boost
chapitre: S16
version: "0.1"
statut: brouillon
duree_min: 75
objectifs:
  - id: O1
    texte: Expliquer le fonctionnement d'un buck à partir de la loi de l'inductance, phase par phase
    competences: [D6.2]
  - id: O2
    texte: Calculer le rapport cyclique d'un buck et d'un boost, rendement compris
    competences: [D6.2]
  - id: O3
    texte: Expliquer le fonctionnement d'un boost et le rôle d'un redresseur synchrone
    competences: [D6.2]
prerequis: [S15-L03, S05-L02]
exercices: [S16-L01-EX01, S16-L01-EX02, S16-L01-EX03]
references: [SRC-0039, SRC-0040, SRC-0041]
criteres_evaluation:
  - objectif: O1
    critere: Exercice S16-L01-EX01 réussi et nœud de commutation commenté au TP-22
  - objectif: O2
    critere: Exercice S16-L01-EX02 réussi et rapport cyclique mesuré comparé au calcul au TP-22
  - objectif: O3
    critere: Exercice S16-L01-EX03 réussi
figures:
  - id: S16-F01
    fichier: ../figures/S16-F01-buck-phases.svg
    legende: "Buck en deux phases. Interrupteur fermé : l'entrée alimente l'inductance, la charge et le condensateur ; le courant de l'inductance monte. Interrupteur ouvert : le courant de l'inductance continue par la diode ; il descend. En bas, le courant de l'inductance en dents de scie autour du courant de charge."
    alt: "Deux schémas identiques : entrée, interrupteur, nœud de commutation, inductance, sortie avec condensateur et charge ; une diode du nœud de commutation vers la masse. À gauche, le chemin du courant passe par l'interrupteur ; à droite, par la diode. Sous les schémas, une courbe en dents de scie qui monte pendant la phase fermée et descend pendant la phase ouverte, autour d'une ligne pointillée marquée courant de charge."
    origine: areprog
derniere_verification_sources: 2026-11-14
historique:
  - version: "0.1"
    date: 2026-11-14
    resume: Première rédaction
---

## Théorie

### Pourquoi découper

Un régulateur linéaire dissipe l'écart entre entrée et sortie (S15-L01). Un convertisseur à
découpage commute un transistor en tout ou rien et lisse le résultat avec une inductance et un
condensateur : il perd beaucoup moins d'énergie. Le **buck** abaisse une tension continue en gardant
sa polarité, avec très peu de pertes ; c'est le convertisseur le plus utilisé
[SOURCÉ : SRC-0039 §2.1 Buck Regulator].

### La loi de l'inductance

Le découpage repose sur l'inductance (S05) : v = L × di/dt [SOURCÉ : SRC-0039 §1.1 The Law of Inductance].

- Une tension aux bornes d'une inductance fait varier son courant ; un courant continu n'y crée presque aucune tension [SOURCÉ : SRC-0039 §1.1 The Law of Inductance].
- Le courant d'une inductance ne peut pas changer instantanément ; sa tension, si [SOURCÉ : SRC-0039 §1.1 The Law of Inductance].

### La modulation de largeur d'impulsion

Des impulsions carrées filtrées par un circuit L-C donnent une tension continue égale à
l'amplitude crête multipliée par le **rapport cyclique**, temps de conduction divisé par la période
[SOURCÉ : SRC-0039 §1.3 Pulse Width Modulation (PWM)]. La boucle de régulation corrige la sortie en
changeant le temps de conduction du transistor [SOURCÉ : SRC-0039 §1.3 Pulse Width Modulation (PWM)].

### Le buck phase par phase

Le transistor relie puis déconnecte l'entrée de l'inductance [SOURCÉ : SRC-0039 §2.1 Buck Regulator] :

- **Transistor fermé** : l'écart entre entrée et sortie est appliqué à l'inductance ; son courant monte et alimente la charge et le condensateur [SOURCÉ : SRC-0039 §2.1 Buck Regulator].
- **Transistor ouvert** : le courant de l'inductance ne peut pas s'arrêter ; l'entrée de l'inductance devient négative jusqu'à ce que la diode conduise, et le courant continue par la diode ; le condensateur aide à alimenter la charge [SOURCÉ : SRC-0039 §2.1 Buck Regulator].

::figure{id=S16-F01}

Le courant moyen de l'inductance est le courant de charge ; l'écart crête à crête est
l'**ondulation de courant**, souvent choisie sous 20 à 30 % du courant nominal
[SOURCÉ : SRC-0039 §2.1 Buck Regulator]. Si le courant ne retombe jamais à zéro, on parle de
conduction continue ; à faible charge, le convertisseur passe souvent en conduction discontinue,
en général sans problème [SOURCÉ : SRC-0039 §2.2 Continuous vs Discontinuous Operation].

Dans un buck **synchrone**, un second transistor remplace la diode
[SOURCÉ : SRC-0040 §1 Basic Configuration of a Buck Converter] ; il chute moins de tension que la
diode [HYPOTHÈSE : selon sa résistance à l'état passant, à vérifier dans la fiche].

### Le rapport cyclique

Pour un buck, avec le rendement η : D = VOUT / (VIN × η) [SOURCÉ : SRC-0040 §2 Calculate the Maximum Switch Current].
Le rendement est ajouté car le convertisseur fournit aussi l'énergie qu'il perd
[SOURCÉ : SRC-0040 §2 Calculate the Maximum Switch Current]. Sans pertes, D = VOUT / VIN.

### Le boost

Le **boost** donne une tension de sortie plus haute que l'entrée, de même polarité
[SOURCÉ : SRC-0039 §2.3 Boost Regulator] :

- transistor fermé : l'entrée est appliquée à l'inductance, son courant monte ; la charge n'est alimentée que par le condensateur [SOURCÉ : SRC-0039 §2.3 Boost Regulator] ;
- transistor ouvert : le courant de l'inductance pousse le côté transistor au-dessus de l'entrée, la diode conduit et recharge le condensateur [SOURCÉ : SRC-0039 §2.3 Boost Regulator].

Rapport cyclique d'un boost : D = 1 − VIN × η / VOUT [SOURCÉ : SRC-0041 §2 Calculate the Maximum Switch Current].

Par l'inductance et la diode, la sortie d'un boost reste reliée à son entrée même quand il ne
commute pas : un boost arrêté n'a pas une sortie à 0 V [HYPOTHÈSE : déduit du schéma de principe, à vérifier sur chaque montage].

### Exemple 1 : rapport cyclique d'un buck

Un buck passe de 12 V à 5 V avec un rendement estimé à 0,9 [EXEMPLE].

1. D = 5 / (12 × 0,9) ≈ 0,46 [EXEMPLE].
2. Sans pertes, on aurait 5 / 12 ≈ 0,42 [EXEMPLE].
3. À l'oscilloscope, le transistor conduit donc un peu moins de la moitié de chaque période.

### Exemple 2 : moyenne d'un signal découpé

Des impulsions de 12 V crête, avec un rapport cyclique de 0,25, sont filtrées par un circuit L-C [EXEMPLE].

1. Tension moyenne : 12 × 0,25 = 3 V [EXEMPLE].
2. C'est le principe du buck : la boucle règle D pour obtenir la sortie voulue.

### Exemple 3 : rapport cyclique d'un boost

Un boost passe de 5 V à 12 V avec un rendement estimé à 0,85 [EXEMPLE].

1. D = 1 − 5 × 0,85 / 12 ≈ 0,65 [EXEMPLE].
2. Plus l'écart entre sortie et entrée est grand, plus D s'approche de 1.

## Exercices

::exercice{id=S16-L01-EX01}

::exercice{id=S16-L01-EX02}

::exercice{id=S16-L01-EX03}
