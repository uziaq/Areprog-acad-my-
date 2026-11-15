---
id: S13-L02
titre: Suivre une piste au microscope et au multimètre
chapitre: S13
version: "0.1"
statut: brouillon
duree_min: 75
objectifs:
  - id: O1
    texte: Suivre une piste d'une face à l'autre en superposant les photos recto et verso
    competences: [D5.3]
  - id: O2
    texte: Confirmer une liaison au multimètre, carte hors tension, en distinguant une piste d'un composant
    competences: [D5.3]
prerequis: [S13-L01, S04-L01]
exercices: [S13-L02-EX01, S13-L02-EX02, S13-L02-EX03]
references: [SRC-0008, SRC-0033, SRC-0034, SRC-0035]
criteres_evaluation:
  - objectif: O1
    critere: Exercice S13-L02-EX01 réussi et photos recto et verso superposées au TP-20
  - objectif: O2
    critere: Exercices S13-L02-EX02 et EX03 réussis et liaisons du bloc relevé confirmées au multimètre au TP-20
figures:
  - id: S13-F02
    fichier: ../figures/S13-F02-recto-verso.svg
    legende: "Suivi d'une piste d'une face à l'autre. À gauche, la face avant : la piste part de la broche 3 d'un composant et rejoint un via. À droite, la face arrière vue en miroir : le via est au même endroit, et la piste continue vers une pastille. Le multimètre en continuité confirme la liaison."
    alt: "Deux rectangles côte à côte, face avant et face arrière vue en miroir. À gauche, un composant à huit broches, une piste de sa broche 3 jusqu'à un rond marqué via. À droite, le même rond au même endroit, d'où part une piste vers une pastille marquée P. Une ligne pointillée relie les deux ronds, avec le symbole d'un buzzer de continuité."
    origine: areprog
derniere_verification_sources: 2026-11-14
historique:
  - version: "0.1"
    date: 2026-11-14
    resume: Première rédaction
---

## Théorie

### Préparer la carte

On ne suit une piste que sur une carte **hors tension**, condensateurs déchargés : une résistance et
une continuité se mesurent circuit hors tension [SOURCÉ : SRC-0008 §Resistance, continuity and diodes]
(S04-L01 ; décharge, S05 et TP-10). La carte se manipule sur le poste ESD (S01, FE-01).

Avant toute mesure, on photographie les deux faces, en haute résolution, à plat et sous le même
angle [EXEMPLE : méthode de la formation]. Ces photos servent de carte pour tout le relevé.

### Superposer le recto et le verso

Une face arrière photographiée de dessous apparaît en miroir par rapport à la face avant. Pour
superposer les deux, on retourne horizontalement l'image de la face arrière ; un logiciel de
conception fait de même avec sa vue retournée de la carte, en miroir autour de l'axe vertical
[SOURCÉ : SRC-0034 §Layer controls]. On aligne ensuite les deux images sur des repères communs :
trous de fixation, vias traversants, broches traversantes.

::figure{id=S13-F02}

Une fois les images alignées, un via traversant se trouve au même endroit sur les deux faces : on
suit la piste jusqu'au via, puis on la reprend de l'autre côté. Au microscope, on vérifie les
endroits où la piste passe sous un composant ou sous la sérigraphie.

### Confirmer au multimètre

L'œil propose, le multimètre confirme :

- La **continuité** est un test « passe / ne passe pas » ; le seuil du buzzer dépend du modèle [SOURCÉ : SRC-0008 §Continuity]. Un buzzer peut donc sonner à travers une petite résistance ou une inductance.
- Pour distinguer une piste d'un composant, on passe en **ohmmètre** : une piste fait une fraction d'ohm (S13-L01) ; on soustrait la résistance des cordons [SOURCÉ : SRC-0008 §Resistance, continuity and diodes].
- Une mesure en circuit peut mentir : l'ohmmètre voit tout ce qui est relié en parallèle (S04-L01).

On pose les pointes sur les pastilles ou les broches, jamais en grattant le vernis épargne au hasard :
il protège les pistes [SOURCÉ : SRC-0033 §Soldermask].

### Les points de test

Beaucoup de cartes ont des pastilles de test, prévues pour une pointe ou un contact à ressort
[SOURCÉ : SRC-0033 §Terminology]. Elles sont un bon point de départ pour un relevé, car elles sont
accessibles et souvent repérées en sérigraphie [HYPOTHÈSE : selon la carte].

### Exemple 4 : une piste qui plonge dans la carte

Une piste part de la broche 3 d'un composant et rejoint un via ; sur la face arrière, rien n'apparaît
au même endroit [EXEMPLE].

1. Le via ne traverse pas : la piste continue sur une couche interne [HYPOTHÈSE].
2. On cherche sa destination au multimètre : pointe sur la broche 3, l'autre pointe sur les pastilles candidates du bloc.
3. Chaque liaison trouvée est notée avec sa valeur en ohms.

### Exemple 5 : un buzzer qui sonne à tort

Le buzzer sonne entre une broche de connecteur et l'entrée d'un circuit intégré [EXEMPLE].

1. En ohmmètre, on lit 10 Ω [EXEMPLE], bien plus qu'une piste.
2. Une résistance série de faible valeur se trouve probablement entre les deux [HYPOTHÈSE : à confirmer à l'œil et dans le relevé].
3. Le relevé doit montrer cette résistance, pas une liaison directe.

### Exemple 6 : la piste coupée

Entre deux pastilles reliées par une piste visible, l'ohmmètre affiche un circuit ouvert [EXEMPLE].

1. On contrôle d'abord les cordons et le calibre.
2. Au microscope, on cherche une coupure, une corrosion ou une fissure le long de la piste [HYPOTHÈSE].
3. Sur une carte de récupération, on note le défaut ; la réparation de piste est vue en M7.

## Exercices

::exercice{id=S13-L02-EX01}

::exercice{id=S13-L02-EX02}

::exercice{id=S13-L02-EX03}
