---
id: S18-L02
titre: Localiser un court-circuit sur un rail
chapitre: S18
version: "0.1"
statut: brouillon
duree_min: 90
objectifs:
  - id: O1
    texte: Injecter un courant limité dans un rail en court-circuit sans dépasser ce que supportent ses composants
    competences: [D6.4, D3.2]
  - id: O2
    texte: Localiser le court-circuit par la méthode thermique
    competences: [D6.4]
  - id: O3
    texte: Localiser le court-circuit par la chute de tension le long du rail, mesurée au millivoltmètre ou au milliohmmètre à quatre fils
    competences: [D6.4]
prerequis: [S18-L01, S13-L02]
exercices: [S18-L02-EX01, S18-L02-EX02, S18-L02-EX03]
references: [SRC-0051, SRC-0050, SRC-0049, SRC-0035]
criteres_evaluation:
  - objectif: O1
    critere: Exercice S18-L02-EX01 réussi et limite d'injection justifiée au TP-24
  - objectif: O2
    critere: Exercice S18-L02-EX02 réussi et point chaud relevé au TP-24
  - objectif: O3
    critere: Exercice S18-L02-EX03 réussi et court-circuit localisé par la chute de tension au TP-24
figures:
  - id: S18-F02
    fichier: ../figures/S18-F02-chute-tension.svg
    legende: "Principe de la localisation par chute de tension : un courant limité est injecté dans le rail en court-circuit. Le long du rail, la tension mesurée par rapport à la masse diminue en approchant du défaut ; au-delà du défaut, aucun courant ne circule et la tension ne baisse plus. Allure sans valeur."
    alt: "Une piste horizontale avec une injection de courant à gauche et un défaut vers la masse marqué d'une croix aux deux tiers. Sous la piste, une courbe de tension qui descend de la gauche jusqu'au défaut, puis reste plate à droite du défaut."
    origine: areprog
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction
---

## Théorie

### Repérer le rail en court-circuit

Avant toute recherche, on mesure à l'ohmmètre, carte hors tension et condensateurs déchargés, la
résistance entre chaque rail et la masse, et l'on compare à un exemplaire de référence
[HYPOTHÈSE : méthode d'atelier ; un rail chargé par de nombreux composants peut afficher une faible résistance sans défaut].
Un rail mal identifié fait chercher au mauvais endroit : on note le rail, son point de mesure et la
valeur lue au journal.

### Injecter un courant limité

On alimente le rail en court-circuit par une alimentation limitée en courant
[SOURCÉ : SRC-0051 §Procedure:] :

- fils soudés ou pinces sur un gros condensateur de découplage du rail, plus sur le plus, moins sur le moins ;
- tension réglée à la tension **nominale du rail**, jamais plus ; en court-circuit, la tension réelle sera bien plus basse ;
- limite de courant basse au départ, puis augmentée par petits pas ;
- ne **jamais** dépasser le courant que supporte le composant le plus faible du rail, lu sur le schéma ou les fiches [SOURCÉ : SRC-0051 §Procedure:] ;
- carte débranchée de tout le reste [SOURCÉ : SRC-0051 §Procedure:].

Injecter directement sur un rail interne contourne les protections d'entrée de la carte : la limite
basse et la polarité vérifiée sont indispensables (faute éliminatoire FE-02 ou FE-03 sinon).
Injecter un courant trop élevé peut détruire une piste ou un composant sain [HYPOTHÈSE : conséquence de l'échauffement, d'où la montée par petits pas].

### La méthode thermique

Le composant ou la zone en défaut dissipe la puissance injectée et chauffe
[SOURCÉ : SRC-0051 §Procedure:] :

- regarder les deux faces à la caméra thermique ; les couleurs donnent une température relative, le pointeur de la caméra une valeur [SOURCÉ : SRC-0051 §Procedure:] ;
- un condensateur chaud est probablement en défaut ; une inductance ou une ferrite tiède peut être normale mais oriente vers une zone ; une zone tiède sans point net évoque un pont de soudure [SOURCÉ : SRC-0051 §Possible results:] ;
- sans point chaud, le court-circuit est peut-être franc (soudure, piste) : passer à la chute de tension [SOURCÉ : SRC-0051 §Possible results:].

Sans caméra, une fine pellicule d'alcool isopropylique s'évapore plus vite sur un point chaud
[À VÉRIFIER : méthode d'atelier courante, sans source consultée ; lire la fiche de données de sécurité du produit, inflammable].

### La chute de tension le long du rail

Quand un courant parcourt le rail, chaque morceau de piste ou de plan, de résistance R = ρ × l / A
(S13), fait chuter une petite tension [SOURCÉ : SRC-0035 §Specific resistance]. Le courant ne
circule qu'entre le point d'injection et le défaut : en suivant le rail, la tension mesurée diminue
jusqu'au défaut, puis ne baisse plus au-delà [SOURCÉ : SRC-0050 §How does VPS find plane to plane shorts?].

::figure{id=S18-F02}

Sur un plan, on cherche le point de tension nulle par rapport à l'autre côté du court-circuit ; deux
injections croisées donnent deux lignes, et le défaut est à leur croisement
[SOURCÉ : SRC-0050 §How does VPS find plane to plane shorts?].

Les tensions sont de l'ordre du millivolt : il faut un multimètre sur son plus petit calibre, des
pointes fines posées sur le cuivre, et la masse de mesure sur le point de court-circuit supposé ou
sur la masse de la carte [HYPOTHÈSE : méthode, à adapter à la carte].

### Le milliohmmètre à quatre fils

Pour une très faible résistance, les cordons faussent la mesure d'un ohmmètre ordinaire. La méthode
à quatre fils fait passer le courant par une paire de fils et mesure la tension par une autre paire,
qui ne porte presque pas de courant : la résistance des cordons n'entre plus dans la mesure
[SOURCÉ : SRC-0049 §Kelvin (4-wire) resistance measurement]. On compare alors la résistance entre
le rail et la masse en plusieurs points : elle est la plus faible au plus près du défaut
[HYPOTHÈSE : conséquence de la chute de tension le long du rail].

### Exemple 4 : limite d'injection

Un rail de 3,3 V est en court-circuit ; le plus petit composant qu'il alimente, d'après sa fiche, supporte 1 A [EXEMPLE].

1. Tension réglée à 3,3 V [EXEMPLE], pas plus.
2. Limite de départ de 0,2 A [EXEMPLE], puis pas de 0,2 A [EXEMPLE], sans jamais dépasser 1 A [EXEMPLE].
3. À chaque pas : caméra sur les deux faces, puis relevé au journal.

### Exemple 5 : puissance dissipée au défaut

L'alimentation injecte 0,8 A ; elle affiche 0,25 V [EXEMPLE].

1. Puissance totale : 0,25 × 0,8 = 0,2 W [EXEMPLE].
2. C'est peu : un point chaud peut rester discret ; on augmente le courant par pas, dans la limite de l'exemple 4.
3. Un court-circuit franc de quelques milliohms dissipe encore moins : la chute de tension devient la meilleure méthode [HYPOTHÈSE].

### Exemple 6 : chute de tension sur une piste

On injecte 1 A dans une piste ; entre deux points distants de 2 cm, on lit 0,9 mV [EXEMPLE].

1. Résistance du tronçon : 0,9 mV / 1 A = 0,9 mΩ [EXEMPLE].
2. Le point suivant, plus loin du point d'injection, lit encore une chute : le courant continue, le défaut est plus loin.
3. Quand la chute entre deux points devient nulle, le défaut est derrière soi : on revient en arrière par pas plus courts.

## Exercices

::exercice{id=S18-L02-EX01}

::exercice{id=S18-L02-EX02}

::exercice{id=S18-L02-EX03}
