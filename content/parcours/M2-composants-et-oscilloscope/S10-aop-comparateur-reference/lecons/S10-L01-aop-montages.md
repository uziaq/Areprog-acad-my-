---
id: S10-L01
titre: L'amplificateur opérationnel et ses montages de base
chapitre: S10
version: "0.1"
statut: brouillon
duree_min: 90
objectifs:
  - id: O1
    texte: Reconnaître sur un schéma un suiveur, un amplificateur non inverseur, un inverseur et un comparateur à AOP
    competences: [D4.5]
  - id: O2
    texte: Calculer le gain et la tension de sortie d'un montage non inverseur ou inverseur
    competences: [D4.5]
  - id: O3
    texte: Expliquer les limites d'un AOP réel (saturation, excursion de sortie, rail-to-rail, tension de décalage, tensions d'entrée hors alimentation) et les retrouver dans sa fiche
    competences: [D4.5, D4.6]
prerequis: [S09-L03]
exercices: [S10-L01-EX01, S10-L01-EX02, S10-L01-EX03]
references: [SRC-0023, SRC-0024]
criteres_evaluation:
  - objectif: O1
    critere: Question du QCM sur la reconnaissance des montages réussie et montages câblés au TP-15
  - objectif: O2
    critere: Exercices S10-L01-EX01 et EX02 réussis et gain mesuré comparé au gain calculé au TP-15
  - objectif: O3
    critere: Exercice S10-L01-EX03 réussi et saturation observée au TP-15
figures:
  - id: S10-F01
    fichier: ../figures/S10-F01-aop-montages.svg
    legende: "Trois montages à AOP. Suiveur : la sortie est reliée à l'entrée inverseuse. Non inverseur : le signal arrive sur l'entrée + ; R2 relie la sortie à l'entrée −, R1 relie l'entrée − à la masse. Inverseur : l'entrée + est à la masse ; le signal arrive par R1 sur l'entrée −, R2 relie la sortie à l'entrée −."
    alt: "Trois triangles d'AOP avec leurs entrées plus et moins. Le premier a sa sortie rebouclée directement sur l'entrée moins. Le deuxième reçoit l'entrée sur le plus et a un pont de deux résistances, R2 entre sortie et moins, R1 entre moins et masse. Le troisième a son plus à la masse, l'entrée arrive par R1 sur le moins et R2 relie la sortie au moins."
    origine: areprog
derniere_verification_sources: 2026-11-14
historique:
  - version: "0.1"
    date: 2026-11-14
    resume: Première rédaction
---

## Théorie

### Un amplificateur de différence à très grand gain

Un amplificateur opérationnel (AOP) a deux entrées, l'entrée **non inverseuse** (+) et l'entrée
**inverseuse** (−), et une sortie référencée à la masse. Il amplifie la différence entre ses deux
entrées [SOURCÉ : SRC-0024 §1.2]. Son gain en boucle ouverte est énorme, de l'ordre de 200 000 ou plus [SOURCÉ : SRC-0023 §The "operational" amplifier] :
utilisé seul, la moindre différence entre les entrées pousse sa sortie en saturation.

Le **modèle idéal** sert aux calculs de premier ordre : gain infini, résistance d'entrée infinie,
résistance de sortie nulle ; il en découle que les entrées ne consomment aucun courant
[SOURCÉ : SRC-0024 §1.2].

### Le comparateur : l'AOP sans contre-réaction

Sans contre-réaction, la sortie sature au plus si l'entrée + est plus positive que l'entrée −, et
au moins dans le cas contraire : l'AOP compare deux tensions [SOURCÉ : SRC-0023 §The "operational" amplifier].
Le comparateur est détaillé en S10-L02.

### La contre-réaction : la sortie vient équilibrer les entrées

Si l'on relie la sortie à l'entrée inverseuse, directement ou à travers un pont de résistances,
l'AOP ajuste sa sortie pour que la différence entre ses entrées reste pratiquement nulle. Le gain
exact de l'AOP n'a alors plus d'importance, pourvu qu'il soit très grand [SOURCÉ : SRC-0023 §Negative feedback].

::figure{id=S10-F01}

- **Suiveur** : sortie reliée directement à l'entrée −, signal sur l'entrée +. Gain de 1, forte impédance d'entrée, faible impédance de sortie : il sert de tampon pour un signal qui ne peut pas fournir de courant [SOURCÉ : SRC-0023 §Negative feedback].
- **Non inverseur** : signal sur l'entrée + ; R2 relie la sortie à l'entrée −, R1 relie l'entrée − à la masse. Gain AV = R2 / R1 + 1, jamais inférieur à 1, sortie de même polarité que l'entrée [SOURCÉ : SRC-0023 §Divided feedback].
- **Inverseur** : entrée + à la masse ; signal par R1 sur l'entrée −, R2 entre la sortie et l'entrée −. Gain AV = −R2 / R1, sortie de polarité opposée ; l'entrée − est une **masse virtuelle** [SOURCÉ : SRC-0023 §Divided feedback].

### L'AOP réel

- **Excursion de sortie** : beaucoup d'AOP ne vont pas jusqu'aux tensions d'alimentation ; la note cite un modèle dont la sortie s'arrête à environ 1 V du plus et 2 V du moins [SOURCÉ : SRC-0023 §Negative feedback]. Les AOP à **sortie rail-to-rail** s'en approchent beaucoup plus, la limite dépendant alors de la charge [SOURCÉ : SRC-0024 §5.6]. La fiche donne VOH et VOL.
- **Plage de mode commun** : les entrées ne fonctionnent correctement que dans une plage de tension précisée par la fiche ; les AOP à **entrée rail-to-rail** l'étendent jusqu'aux deux alimentations [SOURCÉ : SRC-0024 §5.4].
- **Tension de décalage** (*offset*) VIO : la petite tension qu'il faut appliquer entre les entrées pour ramener la sortie à zéro ; elle dérive avec la température et le temps [SOURCÉ : SRC-0024 §5.2]. Multipliée par le gain du montage, elle se retrouve en sortie.
- **Tensions d'entrée hors alimentation** : on ne laisse jamais une entrée dépasser l'alimentation positive ni descendre sous l'alimentation négative ; selon le modèle, le comportement devient imprévisible ou l'AOP est détruit [SOURCÉ : SRC-0023 §Common-mode gain]. Cela peut arriver à la mise sous tension, si le signal arrive avant l'alimentation de l'AOP [SOURCÉ : SRC-0023 §Common-mode gain].

Sur un calculateur, les AOP sont alimentés le plus souvent par une seule tension, par exemple 5 V [À VÉRIFIER : alimentation des AOP sur le schéma du calculateur étudié] : la sortie ne peut alors pas devenir négative.

### Exemple 1 : gain d'un non inverseur

Un non inverseur a R2 = 10 kΩ et R1 = 2,2 kΩ ; l'entrée vaut 0,5 V [EXEMPLE].

1. AV = 10 / 2,2 + 1 = 5,55 [EXEMPLE].
2. Sortie : 0,5 × 5,55 = 2,77 V [EXEMPLE], de même polarité que l'entrée.
3. Avec un AOP réel, on vérifie que 2,77 V [EXEMPLE] reste dans l'excursion de sortie de la fiche.

### Exemple 2 : gain d'un inverseur

Un inverseur a R1 = 4,7 kΩ et R2 = 47 kΩ, alimenté en +12 V et −12 V ; l'entrée vaut 0,3 V [EXEMPLE].

1. AV = −47 / 4,7 = −10 [EXEMPLE].
2. Sortie : 0,3 × (−10) = −3 V [EXEMPLE].
3. Le courant d'entrée vaut 0,3 / 4 700 = 64 µA [EXEMPLE] : l'impédance d'entrée de l'inverseur est R1, bien plus faible que celle du non inverseur.

### Exemple 3 : une sortie qui sature

Un non inverseur de gain 10 est alimenté en 5 V seul, avec un AOP à sortie rail-to-rail ; l'entrée vaut 0,6 V [EXEMPLE].

1. Sortie théorique : 0,6 × 10 = 6 V [EXEMPLE].
2. Impossible : la sortie plafonne près de 5 V [EXEMPLE], un peu en dessous selon VOH et la charge.
3. En dépannage, une sortie d'AOP bloquée près d'une alimentation fait penser à une saturation : entrée hors plage, contre-réaction coupée ou AOP défectueux [HYPOTHÈSE], à départager par la mesure des deux entrées.

## Exercices

::exercice{id=S10-L01-EX01}

::exercice{id=S10-L01-EX02}

::exercice{id=S10-L01-EX03}
