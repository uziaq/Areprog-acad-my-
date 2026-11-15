---
id: S17-L01
titre: Réseau de bord, bornes et transitoires
chapitre: S17
version: "0.1"
statut: brouillon
duree_min: 90
objectifs:
  - id: O1
    texte: Expliquer le rôle des bornes 30, 15, 31 et 50 selon DIN 72552 et les reconnaître dans une documentation
    competences: [D6.3]
  - id: O2
    texte: Décrire les contraintes du réseau de bord (démarrage, délestage de charge, inversion, démarrage avec une batterie 24 V, transitoires) en citant la norme et non des valeurs inventées
    competences: [D6.3]
  - id: O3
    texte: Expliquer les classes de fonctionnement d'un essai d'alimentation et ce qu'elles disent du comportement attendu d'un calculateur
    competences: [D6.3]
prerequis: [S16-L03, S08-L02]
exercices: [S17-L01-EX01, S17-L01-EX02, S17-L01-EX03]
references: [SRC-0044, SRC-0042, SRC-0043]
criteres_evaluation:
  - objectif: O1
    critere: Exercice S17-L01-EX01 réussi et bornes du connecteur identifiées sur document au TP-23
  - objectif: O2
    critere: Exercice S17-L01-EX02 réussi et questions du QCM sur les transitoires réussies
  - objectif: O3
    critere: Exercice S17-L01-EX03 réussi
figures:
  - id: S17-F01
    fichier: ../figures/S17-F01-enveloppe-reseau.svg
    legende: "Allure des contraintes vues par l'entrée d'un calculateur sur un réseau 12 V, sans valeur : plage de fonctionnement normale autour de la tension nominale, creux au démarrage, surtension prolongée d'un démarrage avec une batterie 24 V, pic du délestage de charge écrêté, tension inversée bloquée par la protection. Les valeurs se lisent dans ISO 16750-2 et dans le cahier des charges du constructeur."
    alt: "Axe vertical des tensions avec une ligne zéro. Une bande horizontale marquée plage normale. Au-dessous, une zone marquée démarrage. Au-dessus, une zone marquée démarrage 24 V, puis plus haut une zone marquée délestage écrêté. Sous la ligne zéro, une zone marquée inversion, avec la mention bloquée par la protection. Aucune valeur numérique."
    origine: areprog
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction
---

## Théorie

### Les bornes selon DIN 72552

La norme DIN 72552 donne un numéro à chaque borne du circuit électrique d'un véhicule. Les plus
utiles pour l'alimentation d'un calculateur [SOURCÉ : SRC-0044 §bornes 15, 30, 31, 50] :

- **30** : ligne venant directement du plus de la batterie, le « plus permanent » [SOURCÉ : SRC-0044 §borne 30] ;
- **15** : plus commandé par le commutateur d'allumage, en aval de la batterie, le « plus après contact » [SOURCÉ : SRC-0044 §borne 15] ;
- **31** : retour direct vers le moins de la batterie ou la masse [SOURCÉ : SRC-0044 §borne 31] ;
- **50** : commande directe du démarreur [SOURCÉ : SRC-0044 §borne 50].

Sur un relais, les bornes 85 et 86 sont celles de la bobine, 87 et 30 celles du contact
[SOURCÉ : SRC-0044 §bornes 85, 86, 87]. La norme elle-même est payante ; on s'appuie sur ce tableau
et sur la documentation du constructeur, qui peut employer ses propres noms (KL30, KL15…)
[À VÉRIFIER : notation employée dans la documentation électrique du véhicule étudié].

Un calculateur reçoit en général un plus permanent (30), un plus après contact (15) et une ou
plusieurs masses (31) [HYPOTHÈSE : à vérifier sur le brochage de chaque calculateur, dans la documentation du constructeur].
Le plus après contact sert souvent à réveiller le calculateur (S17-L03).

### Un réseau de bord qui bouge

La tension de la batterie n'est pas constante : de nombreux événements la font varier, et
l'étage d'entrée d'un calculateur doit protéger le reste de la carte [SOURCÉ : SRC-0042 §Introduction to automotive transients].
Les principaux essais sont décrits par ISO 16750-2 et ISO 7637-2, souvent repris avec quelques
changements dans les cahiers des charges des constructeurs [SOURCÉ : SRC-0043 §4 Automotive EMC/EMI Standards].

Contraintes à connaître, d'après le tableau de la note TI [SOURCÉ : SRC-0042 §Introduction to automotive transients] :

- **Démarrage** : creux de tension pendant et après l'action du démarreur (ISO 16750-2, section 4.6.3) ;
- **Délestage de charge** (*load dump*) : batterie déconnectée pendant que l'alternateur charge, avec d'autres consommateurs restés branchés (ISO 16750-2, section 4.6.4) ;
- **Ondulation superposée** : résidu du redressement de l'alternateur (ISO 16750-2, section 4.4) ;
- **Tension inversée** : batterie ou source de démarrage branchée à l'envers (ISO 16750-2, section 4.7) ;
- **Démarrage avec une batterie 24 V** ou défaut du régulateur de l'alternateur : surtension continue (ISO 16750-2, section 4.3) [SOURCÉ : SRC-0042 §Introduction to automotive transients].

::figure{id=S17-F01}

Le délestage brut est très énergétique ; le constructeur installe un écrêteur sur l'alternateur,
et chaque calculateur ne voit que le délestage **écrêté** [SOURCÉ : SRC-0043 §4.1.4 ISO 7637-2 Pulse 5b (Clamped Load Dump)].
Les valeurs des essais (tensions, durées, résistances de source) se lisent dans l'édition en vigueur
de la norme et dans le cahier des charges du constructeur
[À VÉRIFIER : valeurs d'ISO 16750-2 et d'ISO 7637-2, édition en vigueur, non consultée].

### Les impulsions d'ISO 7637-2

ISO 7637-2 définit des impulsions brèves qui simulent des événements réels sur les lignes
d'alimentation [SOURCÉ : SRC-0043 §4.1 ISO 7637-2] :

- **impulsion 1** : coupure d'une charge inductive branchée en parallèle avec le calculateur ; impulsion négative [SOURCÉ : SRC-0043 §4.1.1 ISO 7637-2 Pulse 1] ;
- **impulsion 2a** : interruption brutale du courant d'un appareil en parallèle, à cause de l'inductance du faisceau ; impulsion positive [SOURCÉ : SRC-0043 §4.1.2 ISO 7636-2 Pulse 2a] ;
- **impulsions 3a et 3b** : transitoires de commutation, influencés par les capacités et inductances du faisceau [SOURCÉ : SRC-0043 §4.1.3 ISO 7637-2 Pulses 3a & 3b].

Une impulsion se décrit par sa tension crête, sa **résistance de source**, son temps de montée et sa
durée [SOURCÉ : SRC-0043 §4.1.5 Related Standards]. La résistance de source limite le courant que
l'impulsion peut forcer dans une diode de protection (exemple 2).

### Les classes de fonctionnement

ISO 16750-2 ne demande pas toujours au calculateur de fonctionner normalement pendant un essai :
elle définit des **classes de fonctionnement** [SOURCÉ : SRC-0043 §4.2 ISO 16750-2] :

- **A** : toutes les fonctions marchent normalement pendant et après l'essai ;
- **B** : tout marche pendant l'essai, une ou plusieurs fonctions peuvent sortir de leur tolérance, puis tout revient seul ; les mémoires restent en classe A ;
- **C** : une ou plusieurs fonctions s'arrêtent pendant l'essai et reviennent seules après ;
- **D** : une ou plusieurs fonctions s'arrêtent et ne reviennent qu'après une action simple de l'utilisateur ;
- **E** : le calculateur doit être réparé ou remplacé.

La classe exigée pour chaque essai est fixée par le constructeur [SOURCÉ : SRC-0043 §5.2.2 TVS Diodes].
En atelier, un calculateur qui se réinitialise pendant le démarrage n'est pas forcément en panne :
tout dépend de la classe exigée [HYPOTHÈSE : à comparer au comportement d'un exemplaire de référence].

### Exemple 1 : lire les bornes d'un calculateur

Le brochage d'un calculateur, dans la documentation du constructeur, indique une broche « KL30 », une broche « KL15 » et deux broches « KL31 » [EXEMPLE].

1. KL30 : plus permanent, présent même contact coupé.
2. KL15 : plus après contact, présent seulement contact mis.
3. KL31 : masses ; deux broches de masse sont reliées ensemble sur la carte ou non, à vérifier au relevé [HYPOTHÈSE].

### Exemple 2 : courant forcé dans une diode de protection

Une impulsion de 80 V crête, de résistance de source 4 Ω, arrive sur une diode de protection qui écrête à 36 V [EXEMPLE].

1. Tension aux bornes de la résistance de source : 80 − 36 = 44 V [EXEMPLE].
2. Courant crête : 44 / 4 = 11 A [EXEMPLE].
3. Puissance crête dans la diode : 36 × 11 = 396 W [EXEMPLE] ; on la compare à la puissance crête admise par la fiche de la diode, à la durée de l'impulsion.

### Exemple 3 : un défaut qui n'en est pas un

Un calculateur d'habitacle perd sa communication pendant l'action du démarreur, puis la retrouve seul [EXEMPLE].

1. C'est un comportement de classe C pendant le creux de démarrage.
2. Si le cahier des charges exige la classe C pour cet essai, ce n'est pas une panne [HYPOTHÈSE : classe exigée à lire dans le cahier des charges, rarement disponible en atelier].
3. Méthode d'atelier : comparer à un exemplaire de référence dans les mêmes conditions.

## Exercices

::exercice{id=S17-L01-EX01}

::exercice{id=S17-L01-EX02}

::exercice{id=S17-L01-EX03}
