---
id: S15-L02
titre: LDO, tension de déchet, courant de repos et stabilité
chapitre: S15
version: "0.1"
statut: brouillon
duree_min: 75
objectifs:
  - id: O1
    texte: Expliquer la tension de déchet d'un LDO et vérifier qu'il régule à la tension d'entrée minimale, notamment au démarrage du moteur
    competences: [D6.1]
  - id: O2
    texte: Lire dans une fiche le courant de repos, les régulations de ligne et de charge et la plage de stabilité du condensateur de sortie
    competences: [D6.1]
  - id: O3
    texte: Calculer la tension de sortie d'un régulateur réglable par son pont de résistances
    competences: [D6.1]
prerequis: [S15-L01]
exercices: [S15-L02-EX01, S15-L02-EX02, S15-L02-EX03]
references: [SRC-0036, SRC-0038]
criteres_evaluation:
  - objectif: O1
    critere: Exercice S15-L02-EX01 réussi et tension de déchet relevée au TP-21
  - objectif: O2
    critere: Exercice S15-L02-EX02 réussi et régulation de charge relevée au TP-21
  - objectif: O3
    critere: Exercice S15-L02-EX03 réussi
figures:
  - id: S15-F02
    fichier: ../figures/S15-F02-dropout.svg
    legende: "Tension de sortie d'un LDO en fonction de sa tension d'entrée, allure sans valeur. À basse entrée, le régulateur ne fonctionne pas ; dans la zone de déchet, la sortie suit l'entrée avec un petit écart ; au-delà, la sortie reste constante : c'est la zone de régulation."
    alt: "Graphique : axe horizontal tension d'entrée, axe vertical tension de sortie. La courbe reste à zéro, monte en diagonale juste sous la droite VO égale VI, puis devient horizontale au niveau de la tension nominale. Trois zones marquées : arrêt, déchet, régulation. L'écart vertical entre la diagonale et la courbe au coude est marqué tension de déchet."
    origine: areprog
derniere_verification_sources: 2026-11-14
historique:
  - version: "0.1"
    date: 2026-11-14
    resume: Première rédaction
---

## Théorie

### La tension de déchet

La **tension de déchet** (*dropout*) est l'écart entre entrée et sortie à partir duquel le
régulateur cesse de réguler quand l'entrée continue de baisser [SOURCÉ : SRC-0036 §Dropout Voltage].
Dans la zone de déchet, l'élément de passage d'un LDO à PMOS se comporte comme une simple
résistance : Vdropout = IO × Ron [SOURCÉ : SRC-0036 §Dropout Voltage]. La tension de déchet augmente
donc avec le courant.

::figure{id=S15-F02}

Un régulateur **LDO** (*low dropout*) a une faible tension de déchet ; c'est ce qui maximise son
rendement [SOURCÉ : SRC-0036 §Dropout Voltage]. Sur un véhicule, elle compte au démarrage du
moteur, quand la tension batterie peut descendre vers 6 V [SOURCÉ : SRC-0038 §Dropout voltage].
Pour garder 5 V au microcontrôleur, la tension de déchet du LDO plus la chute de la diode de protection doivent rester sous 1 V [SOURCÉ : SRC-0038 §Dropout voltage].

### Le courant de repos

Le **courant de repos** (*quiescent* ou *ground current*) est la différence entre le courant
d'entrée et le courant de sortie : IQ = II − IO [SOURCÉ : SRC-0036 §Quiescent Current]. Il alimente
la référence, le pont de mesure et l'amplificateur d'erreur. Avec un transistor bipolaire, il croît
avec le courant de sortie ; avec un MOS, il est presque constant [SOURCÉ : SRC-0036 §Quiescent Current].

Le **courant de veille** est le courant d'entrée quand la sortie est coupée par la commande
d'arrêt [SOURCÉ : SRC-0036 §Standby Current]. Pour les circuits toujours alimentés d'un véhicule,
un faible courant de repos préserve la batterie [SOURCÉ : SRC-0038 §Quiescent current].

### Régulation de ligne et de charge

- La **régulation de ligne** mesure la capacité à garder la sortie quand l'entrée varie [SOURCÉ : SRC-0036 §Line Regulation].
- La **régulation de charge** mesure la capacité à garder la sortie quand la charge varie [SOURCÉ : SRC-0036 §Load Regulation].
- La **réponse transitoire** est la variation maximale de sortie lors d'un échelon de courant ; elle dépend du condensateur de sortie et de sa résistance série (ESR) [SOURCÉ : SRC-0036 §Transient Response].

### La stabilité et le condensateur de sortie

Un LDO peut osciller si la résistance série de son condensateur de sortie sort de la plage permise.
Les fabricants donnent une courbe de la plage stable de cette résistance en fonction du courant de
sortie, parfois appelée « tunnel de la mort » [SOURCÉ : SRC-0036 §Instability of LDO Regulator].
Tantale, électrolytique aluminium et céramique multicouche conviennent, à condition de respecter
cette plage [SOURCÉ : SRC-0036 §Instability of LDO Regulator].

En réparation, on remplace donc un condensateur de sortie par un modèle de même capacité **et** de
résistance série compatible avec la fiche du régulateur [HYPOTHÈSE : conséquence de la plage de stabilité, à vérifier dans chaque fiche]. Un condensateur
« amélioré » à très faible résistance série peut rendre un régulateur instable.

### La sortie réglable

Quand le régulateur a une broche de contre-réaction FB, un pont de résistances fixe la sortie :
VOUT = VFB × (R1 + R2) / R2, avec R1 entre OUT et FB, R2 entre FB et la masse
[SOURCÉ : SRC-0038 §Adjustable output voltage]. VFB est la référence interne, donnée par la fiche.

### Exemple 4 : le régulateur au démarrage

Un LDO 5 V a une tension de déchet de 0,4 V à son courant de charge [EXEMPLE] ; il est précédé d'une diode de protection qui chute 0,5 V [EXEMPLE].

1. Entrée minimale pour réguler : 5 + 0,4 + 0,5 = 5,9 V à la batterie [EXEMPLE].
2. Si la batterie descend à 5,5 V au démarrage, la sortie chute sous 5 V [EXEMPLE].
3. Le microcontrôleur peut alors être remis à zéro (S15-L03) [HYPOTHÈSE].

### Exemple 5 : tension de déchet et courant

Une fiche donne Ron = 0,8 Ω pour l'élément de passage en zone de déchet [EXEMPLE].

1. À 0,25 A : Vdropout = 0,25 × 0,8 = 0,2 V [EXEMPLE].
2. À 0,5 A : Vdropout = 0,4 V [EXEMPLE].
3. La tension de déchet se lit toujours au courant de l'application.

### Exemple 6 : régler la sortie

Un régulateur réglable a VFB = 1,25 V [EXEMPLE] ; R1 = 30 kΩ, R2 = 10 kΩ [EXEMPLE].

1. VOUT = 1,25 × (30 + 10) / 10 = 5 V [EXEMPLE].
2. Si R2 se coupe, FB n'est plus tiré vers la masse : la sortie peut monter vers l'entrée [HYPOTHÈSE : selon le régulateur, à vérifier dans sa fiche].

## Exercices

::exercice{id=S15-L02-EX01}

::exercice{id=S15-L02-EX02}

::exercice{id=S15-L02-EX03}
