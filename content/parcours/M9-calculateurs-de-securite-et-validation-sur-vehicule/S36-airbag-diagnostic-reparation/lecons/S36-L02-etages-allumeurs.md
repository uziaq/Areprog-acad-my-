---
id: S36-L02
titre: Diagnostiquer les étages d'allumeurs
chapitre: S36
version: "0.1"
statut: brouillon
duree_min: 110
objectifs:
  - id: O1
    texte: Interpréter un défaut d'allumeur (ouvert, court-circuit, court à la batterie ou à la masse, court entre boucles, retour ouvert) et en déduire où chercher sur la carte
    competences: [D10.7]
  - id: O2
    texte: Mesurer hors tension une sortie d'allumeur par comparaison avec l'exemplaire de référence, sans jamais alimenter une sortie
    competences: [D10.7]
  - id: O3
    texte: Expliquer la mesure de résistance par seuils du circuit de commande et vérifier qu'un simulateur se trouve dans la plage diagnostiquée
    competences: [D10.6, D10.7]
prerequis: [S36-L01, S30]
exercices: [S36-L02-EX01, S36-L02-EX02, S36-L02-EX03]
references: [SRC-0096, SRC-0088]
criteres_evaluation:
  - objectif: O1
    critere: Exercice S36-L02-EX02 réussi et défaut du TP-53 interprété par écrit avant les mesures
  - objectif: O2
    critere: Exercice S36-L02-EX03 réussi et sorties comparées hors tension au TP-53
  - objectif: O3
    critere: Exercice S36-L02-EX01 réussi
figures:
  - id: S36-F02
    fichier: ../figures/S36-F02-boucle-allumeur.svg
    legende: "Boucle d'allumeur et ses diagnostics : tension de tir, interrupteur côté haut, allumeur (simulateur sur banc), interrupteur côté bas, retour ; le circuit de commande cité mesure la résistance, les courts-circuits à la batterie ou à la masse, les courts entre boucles, la tension de tir et le retour ouvert, sans tirer. Schéma de principe d'après la fiche citée, sans valeur de carte réelle."
    alt: "En haut, une chaîne de blocs : tension de tir, interrupteur côté haut, allumeur en pointillés marqué simulateur sur banc, interrupteur côté bas, puis retour vers la masse. En bas, quatre blocs de diagnostic reliés en pointillés à l'allumeur ou au retour : résistance, court-circuit à la batterie ou à la masse, courts entre boucles, tension de tir et retour ouvert."
    origine: areprog
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction
---

## Théorie

### Ce que le calculateur voit d'une boucle

Le circuit de commande cité diagnostique chaque boucle d'allumeur sans tirer (S35-L02). Ces
diagnostics sont la première information du technicien : le défaut lu avec l'outil, en lecture seule,
dit **quel type** d'anomalie le calculateur voit, pas **où** elle se trouve.

::figure{id=S36-F02}

### Les défauts et leurs causes possibles

- **Allumeur ouvert** : tous les bits du diagnostic de résistance à 1 [SOURCÉ : SRC-0096 §SQUIB RESISTANCE DIAGNOSTICS ($D0–$D3 COMMAND)]. Causes possibles : simulateur absent ou mal branché, contact de connecteur, piste coupée, interrupteur côté bas ouvert [HYPOTHÈSE : à départager par la mesure hors tension].
- **Allumeur en court-circuit** : tous les bits à 0 [SOURCÉ : SRC-0096 §SQUIB RESISTANCE DIAGNOSTICS ($D0–$D3 COMMAND)]. Causes possibles : pont de soudure, condensateur de filtrage en court-circuit, broches du connecteur reliées [HYPOTHÈSE].
- **Court à la batterie ou à la masse** : une source de courant polarise la boucle ; une tension au-dessus d'un seuil signale un court à la batterie, une tension en dessous d'un autre seuil un court à la masse [SOURCÉ : SRC-0096 §SQUIB SHORT-TO-BATTERY / GROUND DIAGNOSTICS ($C1 COMMAND)].
- **Court entre boucles** : le courant injecté dans une boucle est cherché sur les autres [SOURCÉ : SRC-0096 §SQUIB DIAGNOSTICS SHORTS BETWEEN SQUIB LINES (FIRING LOOPS) ($EX COMMAND)].
- **Retour ouvert** : la liaison entre la broche de retour et la carte est surveillée [SOURCÉ : SRC-0096 §VFIRE_RTN DIAGNOSTICS ($C9 COMMAND)].

Le connecteur d'un calculateur d'airbag peut porter des dispositifs propres au constructeur, comme des
pontages de court-circuit à la déconnexion [À VÉRIFIER par constructeur : présence et rôle de tels dispositifs sur le connecteur étudié].

### Les seuils de résistance du circuit cité

Le circuit cité fait passer un courant de diagnostic de 30 mA à 40,5 mA, valeur typique 34 mA, dans l'allumeur [SOURCÉ : SRC-0096 §STATIC ELECTRICAL CHARACTERISTICS].
Il compare la tension obtenue à huit seuils, de 1,4 Ω à 7,8 Ω en valeurs typiques, pour une résistance de réglage de 10 kΩ [SOURCÉ : SRC-0096 §STATIC ELECTRICAL CHARACTERISTICS].
Les seuils changent proportionnellement à cette résistance de réglage [SOURCÉ : SRC-0096 §STATIC ELECTRICAL CHARACTERISTICS].
La fenêtre « allumeur correct » est choisie par le logiciel du calculateur, pas par le circuit [HYPOTHÈSE : déduite de la fiche, la fenêtre réelle n'est pas publiée].

C'est pourquoi la valeur du simulateur doit venir de la documentation de l'outil ou du constructeur
(S35-L03) : une valeur hors de la fenêtre du logiciel donne un défaut, même si la carte est saine.

### Mesurer hors tension, par comparaison

Les mesures sur une sortie d'allumeur se font **hors tension**, réserve déchargée, simulateurs
débranchés, et toujours en comparant avec la même mesure sur l'exemplaire de référence (S30). Les
mesures hors tension détectent des défauts de composants, de pistes et de soudures sans alimenter la carte [SOURCÉ : SRC-0088 §What type of problems will Power-off Diagnostics detect?].
On relève, pour chaque sortie : résistance entre les deux broches, entre chaque broche et la masse,
entre chaque broche et la tension de tir ; puis la signature courant-tension si l'atelier dispose de
l'instrument (S30).

Règle d'atelier : aucune source extérieure n'est appliquée sur une sortie d'allumeur sous tension, et
l'on ne cherche jamais à provoquer la commande d'un étage.

### Exemple 1 : la tension aux bornes d'un simulateur

Le courant de diagnostic typique vaut 34 mA [SOURCÉ : SRC-0096 §STATIC ELECTRICAL CHARACTERISTICS].
Le simulateur fait 2,2 Ω dans cet exemple [EXEMPLE].

1. U = R × I = 2,2 × 0,034 ≈ 0,075 V, soit 75 mV [EXEMPLE].
2. Cette tension, amplifiée, est comparée aux seuils du circuit [SOURCÉ : SRC-0096 §SQUIB RESISTANCE DIAGNOSTICS ($D0–$D3 COMMAND)].
3. Une tension aussi faible explique pourquoi un mauvais contact de quelques dixièmes d'ohm peut faire changer le résultat [HYPOTHÈSE].

### Exemple 2 : un court à la masse sur une boucle

L'outil lit « court-circuit à la masse » sur la boucle 2 ; les autres boucles sont correctes [EXEMPLE].

1. Hypothèses : condensateur de filtrage de la sortie en court-circuit, pont de soudure, piste abîmée vers la masse, circuit de commande défaillant [HYPOTHÈSE].
2. Hors tension, résistance de chaque broche de la boucle 2 vers la masse, comparée à la boucle 1 et à la référence.
3. La broche qui donne une résistance très faible, contrairement à la référence, oriente vers son composant ou sa piste.

### Exemple 3 : une comparaison chiffrée

Hors tension, la broche haute de la boucle 2 mesure 0,8 Ω vers la masse ; sur la référence, 12 kΩ [EXEMPLE].

1. L'écart est de plusieurs ordres de grandeur : défaut franc [EXEMPLE].
2. On isole ensuite les composants reliés à cette broche, un par un, d'après le relevé de carte (S13).
3. La cause n'est déclarée qu'avec une mesure qui la prouve (FE-13).

## Exercices

::exercice{id=S36-L02-EX01}

::exercice{id=S36-L02-EX02}

::exercice{id=S36-L02-EX03}
