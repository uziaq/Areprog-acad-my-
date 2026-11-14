---
id: S15-L01
titre: Régulateur linéaire, dissipation et température
chapitre: S15
version: "0.1"
statut: brouillon
duree_min: 75
objectifs:
  - id: O1
    texte: Expliquer le principe d'un régulateur linéaire et calculer la puissance qu'il dissipe et son rendement
    competences: [D6.1]
  - id: O2
    texte: Vérifier avec la résistance thermique de la fiche qu'un régulateur reste sous sa température de jonction maximale
    competences: [D6.1]
prerequis: [S13-L03, S09-L03]
exercices: [S15-L01-EX01, S15-L01-EX02, S15-L01-EX03]
references: [SRC-0037, SRC-0036, SRC-0038]
criteres_evaluation:
  - objectif: O1
    critere: Exercices S15-L01-EX01 et EX02 réussis et dissipation calculée pour chaque charge au TP-21
  - objectif: O2
    critere: Exercice S15-L01-EX03 réussi et échauffement mesuré comparé au calcul au TP-21
figures:
  - id: S15-F01
    fichier: ../figures/S15-F01-modele-potentiometre.svg
    legende: "Modèle d'un régulateur linéaire : l'élément de passage se comporte comme une résistance réglable entre l'entrée et la sortie. L'amplificateur d'erreur compare une fraction de la sortie à la référence et règle l'élément de passage. La différence entre tension d'entrée et tension de sortie, multipliée par le courant, est dissipée en chaleur."
    alt: "De gauche à droite : entrée VI, un potentiomètre marqué élément de passage, sortie VO vers une charge RL. Sous la sortie, un pont de deux résistances ramène une fraction de VO vers un triangle d'amplificateur d'erreur, qui reçoit aussi une référence et commande le potentiomètre. Une flèche ondulée marquée chaleur sort de l'élément de passage."
    origine: areprog
derniere_verification_sources: 2026-11-14
historique:
  - version: "0.1"
    date: 2026-11-14
    resume: Première rédaction
---

## Théorie

### Le principe

Un régulateur linéaire a un **élément de passage**, piloté par un circuit de contrôle : celui-ci
surveille la tension de sortie par une contre-réaction et ouvre plus ou moins l'élément de passage
pour la garder constante, quelles que soient la tension d'entrée et la charge
[SOURCÉ : SRC-0037 §2 The Basics]. On peut se le représenter comme un potentiomètre que le
régulateur règle en permanence [SOURCÉ : SRC-0037 §2 The Basics].

Dans un LDO, un pont de résistances prélève la sortie et la compare à une référence interne ; la
différence commande l'élément de passage, en général un transistor à effet de champ
[SOURCÉ : SRC-0038 §Internal topology]. On retrouve l'AOP et la référence de S10.

::figure{id=S15-F01}

### La puissance dissipée

En régulation, l'élément de passage conduit toujours, et le courant d'entrée est à peu près égal au
courant de sortie [SOURCÉ : SRC-0037 §3 Power Dissipation in the Linear Regulator]. La puissance
dissipée par le régulateur est la différence entre la puissance d'entrée et la puissance de sortie,
presque entièrement en chaleur [SOURCÉ : SRC-0037 §3 Power Dissipation in the Linear Regulator] :

PD = (VI − VO) × IO [SOURCÉ : SRC-0036 §Power Dissipation and Junction Temperature]

La puissance liée au courant de repos, VI × IQ, est en général négligeable devant PD
[SOURCÉ : SRC-0037 §3 Power Dissipation in the Linear Regulator].

### Le rendement

Le rendement d'un régulateur linéaire est limité par les tensions d'entrée et de sortie et par le
courant de repos : η = VO × IO / (VI × (IO + IQ)) [SOURCÉ : SRC-0036 §Efficiency]. Avec un courant de
repos négligeable, il vaut à peu près VO / VI : plus l'écart entre entrée et sortie est grand, plus
on chauffe pour rien.

### Température de jonction et résistance thermique

La fiche d'un régulateur donne une température de jonction maximale ; elle limite la puissance que
le régulateur peut dissiper [SOURCÉ : SRC-0036 §Power Dissipation and Junction Temperature]. On
relie puissance et températures par la résistance thermique jonction-ambiante θJA, en °C/W
[SOURCÉ : SRC-0037 §4 Thermal Equations—Will My Part Work?] :

PD(max) = (TJmax − TA) / θJA [SOURCÉ : SRC-0036 §Power Dissipation and Junction Temperature]

La puissance réellement dissipée doit rester inférieure ou égale à PD(max)
[SOURCÉ : SRC-0036 §Power Dissipation and Junction Temperature]. θJA dépend du boîtier, de la surface
de cuivre sous le composant et de la ventilation [SOURCÉ : SRC-0037 §4 Thermal Equations—Will My Part Work?] :
la valeur de la fiche correspond à des conditions précises, qu'on lit avec elle.

### Exemple 1 : dissipation d'un régulateur 5 V

Un régulateur 5 V est alimenté en 12 V et débite 0,2 A [EXEMPLE].

1. PD = (12 − 5) × 0,2 = 1,4 W [EXEMPLE].
2. Puissance utile : 5 × 0,2 = 1 W [EXEMPLE].
3. Rendement : 5 / 12 ≈ 0,42, soit environ 42 % [EXEMPLE] : plus de la moitié de l'énergie part en chaleur.

### Exemple 2 : vérifier le boîtier

Même régulateur, fiche [EXEMPLE] : TJmax = 125 °C, θJA = 50 °C/W ; ambiance 45 °C dans un boîtier [EXEMPLE].

1. PD(max) = (125 − 45) / 50 = 1,6 W [EXEMPLE].
2. PD = 1,4 W ≤ 1,6 W [EXEMPLE] : la marge est faible.
3. Échauffement de la jonction : 1,4 × 50 = 70 °C au-dessus de l'ambiance [EXEMPLE] ; un dissipateur ou plus de cuivre est à envisager.

### Exemple 3 : changer de tension d'entrée

Le même régulateur 5 V à 0,2 A est alimenté en 7 V au lieu de 12 V [EXEMPLE].

1. PD = (7 − 5) × 0,2 = 0,4 W [EXEMPLE].
2. La dissipation est divisée par 3,5 [EXEMPLE] : on rapproche l'entrée de la sortie, dans la limite de la tension de déchet (S15-L02).

## Exercices

::exercice{id=S15-L01-EX01}

::exercice{id=S15-L01-EX02}

::exercice{id=S15-L01-EX03}
