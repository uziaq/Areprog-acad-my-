---
id: S38-L02
titre: Pont de puissance sur banc à charges réduites
chapitre: S38
version: "0.1"
statut: brouillon
duree_min: 120
objectifs:
  - id: O1
    texte: Calculer un courant de phase à partir de la tension d'un amplificateur de shunt et un courant de détection de la surveillance VDS
    competences: [D10.7]
  - id: O2
    texte: Contrôler hors tension un pont triphasé par comparaison des phases entre elles et avec un exemplaire de référence
    competences: [D10.6, D10.7]
  - id: O3
    texte: Préparer un banc avec charges réduites documentées, fusible et limite de courant écrite, dimensionner la puissance des charges et mesurer les commandes de grille sans relier une masse de sonde à une phase
    competences: [D10.6, D10.7]
prerequis: [S38-L01, S37-L03, S18]
exercices: [S38-L02-EX01, S38-L02-EX02, S38-L02-EX03]
references: [SRC-0102, SRC-0029, SRC-0013]
criteres_evaluation:
  - objectif: O1
    critere: Exercices S38-L02-EX01 et S38-L02-EX03 réussis
  - objectif: O2
    critere: Comparaison hors tension des trois phases et de la référence consignée au TP-56
  - objectif: O3
    critere: Exercice S38-L02-EX02 réussi et critères charges-sourcees et alimentation-limitee de la grille renforcée prouvés au TP-56
figures:
  - id: S38-F02
    fichier: ../figures/S38-F02-pont-triphase.svg
    legende: "Pont triphasé : trois branches, chacune avec un transistor côté haut et un côté bas, un shunt côté bas relié à un amplificateur de courant ; les points milieux (phases U, V, W) alimentent le moteur, ou des charges réduites en étoile sur banc. Les deux transistors d'une même phase ne conduisent jamais ensemble. D'après la fiche citée ; schéma de principe sans valeur ni brochage, pas un schéma de calculateur."
    alt: "Entre une ligne batterie en haut et une ligne de masse en bas, trois colonnes identiques U, V et W : transistor côté haut, point milieu marqué phase, transistor côté bas, puis shunt. À droite, un bloc en pointillés : moteur ou charges réduites en étoile sur banc, qui reçoit les trois phases."
    origine: areprog
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction
---

## Théorie

### Mesurer le courant des phases

Chaque branche du pont a un shunt ; l'amplificateur de la commande de pont citée amplifie sa tension
avec un gain réglable de 8, 12, 16 ou 32 [SOURCÉ : SRC-0102 §6.5 Electrical Characteristics].
La sortie est décalée autour d'une tension de référence, ce qui permet de mesurer un courant dans les deux sens ; les conditions d'essai de la fiche prennent 2,5 V pour ce décalage [SOURCÉ : SRC-0102 §6.5 Electrical Characteristics].
En principe, l'écart de sortie vaut gain × résistance du shunt × courant [HYPOTHÈSE : relation et décalage à confirmer dans la fiche du circuit identifié sur la carte].
Sur la carte étudiée, la valeur du shunt se lit sur son marquage (S07) et le gain dans la configuration choisie par le constructeur [À VÉRIFIER : gain réglé par logiciel, inconnu sans documentation].

::figure{id=S38-F02}

### La surveillance VDS

Un transistor passant présente une tension drain-source égale à sa résistance à l'état passant multipliée par le courant (loi d'Ohm, S02 et S09).
La commande de pont citée compare cette tension à un seuil réglable de 0,1 V à 2 V et signale un court-circuit au-delà [SOURCÉ : SRC-0102 §6.5 Electrical Characteristics].
Le seuil est filtré pendant 5 µs pour ignorer les commutations [SOURCÉ : SRC-0102 §6.5 Electrical Characteristics].
Un transistor dégradé dont la résistance a augmenté peut donc déclencher cette surveillance à un courant plus faible que prévu [HYPOTHÈSE : à confirmer par comparaison avec la référence].

### Contrôler hors tension

Hors tension et condensateurs déchargés (décharge mesurée deux fois [SOURCÉ : SRC-0013 §2-7 Restriking Voltage]), on compare au multimètre, en test de diode et en résistance :

- chaque phase vers le + puissance et vers la masse de puissance ;
- les trois phases entre elles ;
- les mêmes points sur l'exemplaire de référence.

Les trois phases d'un pont sain se ressemblent ; une phase qui diffère des deux autres et de la référence est suspecte [HYPOTHÈSE : à confirmer par la mesure du transistor déposé].
Un transistor en court-circuit donne une résistance très faible sur sa branche [HYPOTHÈSE : à distinguer d'un condensateur qui se charge pendant la mesure].

### Le banc à charges réduites

Le moteur d'assistance n'est jamais branché sur l'alimentation de laboratoire : elle n'est pas
dimensionnée pour ses courants de démarrage (catalogue des TP, protocole renforcé).
On le remplace par trois charges réduites en étoile, de valeur et de puissance assignée écrites avec leur source et mesurées avant branchement [À VÉRIFIER : charges réduites de l'atelier et leur fiche].
Une charge résistive dissipe P = U² / R ; elle chauffe vite et ne se touche ni pendant ni juste après un essai.
Le calculateur est séparé de la colonne ou de la crémaillère selon la procédure du constructeur, ou reçu seul [À VÉRIFIER par référence : séparation possible de l'électronique].
Fusible, limite de courant écrite avant chaque essai, une phase commandée à la fois si l'outil le permet [À VÉRIFIER : fonctions de l'outil de diagnostic sur banc].

### Mesurer les commandes de grille

La commande de pont citée applique entre grille et source une tension de 9 V à 13,4 V à l'état haut, côté haut comme côté bas [SOURCÉ : SRC-0102 §6.5 Electrical Characteristics].
Côté bas, la source est à la masse de puissance : une sonde ordinaire suffit, masse de la sonde sur la masse de la carte [SOURCÉ : SRC-0029 §Use Proper Grounding Procedures].
Côté haut, la source suit la phase : la masse d'une sonde ordinaire posée sur une phase la court-circuite à la masse de l'oscilloscope. On mesure en différentiel, ou chaque point par rapport à la masse et on soustrait [SOURCÉ : SRC-0029 §Use Proper Grounding Procedures] (FE-07).

### Exemple 1 : lire un courant de phase

Gain 16, shunt 1 mΩ, sortie 0,4 V au-dessus de la tension de référence [EXEMPLE].

1. Tension du shunt : 0,4 V / 16 = 25 mV [EXEMPLE].
2. Courant : 25 mV / 1 mΩ = 25 A [EXEMPLE].
3. Les gains possibles viennent de la fiche citée [SOURCÉ : SRC-0102 §6.5 Electrical Characteristics].

### Exemple 2 : une charge réduite

Une charge de 12 Ω sous 13,5 V [EXEMPLE].

1. P = 13,5² / 12 ≈ 15,2 W [EXEMPLE].
2. On choisit une puissance assignée nettement au-dessus, et l'on écrit la valeur et sa source au dossier.
3. Courant : 13,5 / 12 ≈ 1,1 A, à comparer à la limite écrite [EXEMPLE].

### Exemple 3 : le courant de détection VDS

Seuil 0,5 V, résistance à l'état passant 2,5 mΩ [EXEMPLE].

1. Courant de détection : 0,5 V / 2,5 mΩ = 200 A [EXEMPLE].
2. Le seuil choisi est dans la plage de la fiche, de 0,1 V à 2 V [SOURCÉ : SRC-0102 §6.5 Electrical Characteristics].
3. Si la résistance double, la détection se fait à 100 A [EXEMPLE].

## Exercices

::exercice{id=S38-L02-EX01}

::exercice{id=S38-L02-EX02}

::exercice{id=S38-L02-EX03}
