---
id: S11-L02
titre: Sondes, compensation, masse et mesures différentielles
chapitre: S11
version: "0.1"
statut: brouillon
duree_min: 90
objectifs:
  - id: O1
    texte: Compenser une sonde ×10 et reconnaître une sonde sous-compensée ou surcompensée
    competences: [D3.4]
  - id: O2
    texte: Expliquer pourquoi la masse d'une sonde est reliée à la terre, le danger qui en découle et l'effet d'une longue masse
    competences: [D3.4]
  - id: O3
    texte: Mesurer une tension entre deux points dont aucun n'est à la masse, par deux voies en soustraction ou par une sonde différentielle
    competences: [D3.3, D3.4]
prerequis: [S11-L01]
exercices: [S11-L02-EX01, S11-L02-EX02, S11-L02-EX03]
references: [SRC-0014, SRC-0029]
criteres_evaluation:
  - objectif: O1
    critere: Exercice S11-L02-EX01 réussi et captures avant et après compensation au TP-17
  - objectif: O2
    critere: Exercice S11-L02-EX02 réussi, questions de sécurité du QCM réussies et effet de la longue masse expliqué au TP-17
  - objectif: O3
    critere: Exercice S11-L02-EX03 réussi
figures:
  - id: S11-F02
    fichier: ../figures/S11-F02-compensation.svg
    legende: "Signal carré de compensation vu avec trois réglages de sonde : sous-compensée (coins arrondis), compensée (coins carrés), surcompensée (pointes au début de chaque palier)."
    alt: "Trois petits signaux carrés côte à côte. Le premier a des fronts qui s'arrondissent avant d'atteindre le palier. Le deuxième a des coins nets. Le troisième dépasse au début de chaque palier puis redescend."
    origine: areprog
derniere_verification_sources: 2026-11-14
historique:
  - version: "0.1"
    date: 2026-11-14
    resume: Première rédaction
---

## Théorie

### La sonde ×10 et sa compensation

La sonde ×10 charge moins le circuit qu'une sonde ×1 et divise le signal par dix à l'entrée de
l'oscilloscope [SOURCÉ : SRC-0014 §Passive Probes]. Elle doit être **compensée** : ses
caractéristiques électriques sont équilibrées avec celles de la voie de l'oscilloscope
[SOURCÉ : SRC-0014 §Passive Probes]. On prend l'habitude de la compenser à chaque installation,
car une sonde mal réglée fausse les mesures [SOURCÉ : SRC-0014 §Compensating the Probes].

Méthode [SOURCÉ : SRC-0014 §Compensating the Probes] :

1. Brancher la sonde sur la voie que l'on va utiliser, avec les accessoires que l'on va utiliser.
2. Pointe sur le signal carré de compensation de l'oscilloscope, pince de masse sur sa masse.
3. Régler la vis de la sonde pour que les coins du signal carré soient carrés.

::figure{id=S11-F02}

Sous-compensée, la sonde arrondit les fronts et réduit l'amplitude apparente ; surcompensée, elle
augmente l'amplitude apparente au début de chaque palier [SOURCÉ : SRC-0014 §Compensating the Probes].

Le facteur ×10 doit aussi être déclaré dans l'oscilloscope ; sinon la tension affichée est dix fois
trop faible (S06-L03).

### La masse de la sonde est reliée à la terre

Les sondes sont reliées à la terre à travers le conducteur de terre du cordon secteur de
l'oscilloscope. Pour éviter l'électrocution, ce conducteur doit être raccordé à la terre ; on ne
neutralise jamais la terre d'un appareil de mesure [SOURCÉ : SRC-0029 §Use Proper Grounding Procedures].

- La pince de masse d'une sonde se relie **uniquement** à la masse, au potentiel de la terre [SOURCÉ : SRC-0029 §Use Proper Grounding Procedures]. La relier à un autre point met ce point en court-circuit avec la terre, à travers la sonde (faute éliminatoire FE-07).
- Isoler un oscilloscope de la terre, s'il n'est pas conçu pour cela, peut porter ses connecteurs, ses commandes et ses sondes à des tensions dangereuses [SOURCÉ : SRC-0029 §Use Proper Grounding Procedures].
- Ordre de branchement : sonde sur l'oscilloscope d'abord, puis masse, puis pointe ; au retrait, pointe d'abord, puis masse [SOURCÉ : SRC-0029 §Connect and Disconnect Probes Properly].
- Sur une alimentation de laboratoire ou une carte alimentée par une source isolée de la terre, relier la masse de la sonde à la masse du montage relie ce montage à la terre [HYPOTHÈSE : à vérifier pour chaque source avec sa notice] ; deux sondes posées sur des « masses » différentes court-circuitent ce qui les sépare.

### La longue masse

Le fil de masse d'une sonde a une inductance ; avec la capacité de la sonde, il forme un circuit
qui sonne sur les fronts rapides. Plus il est long, plus le risque de voir des oscillations
parasites augmente [SOURCÉ : SRC-0029 §Ground Lead Issues]. Il sert aussi d'antenne et capte les
signaux voisins [SOURCÉ : SRC-0029 §Ground Lead Issues].

- Utiliser le fil de masse le plus court fourni avec la sonde ; le remplacer par un autre moyen de masse peut faire apparaître des oscillations [SOURCÉ : SRC-0029 §The Realities of Probes].
- Se méfier de toute oscillation ou bruit à l'écran : il peut venir de la mesure et non du signal [SOURCÉ : SRC-0029 §Ground Lead Issues].

### Mesurer entre deux points dont aucun n'est à la masse

Une mesure « flottante » se fait entre deux points dont aucun n'est au potentiel de la terre
[SOURCÉ : SRC-0029 §Floating Measurements]. Avec un oscilloscope dont les masses de sonde sont à la
terre, on ne pose **pas** la masse de la sonde sur l'un de ces points. Deux méthodes :

- **Deux voies en soustraction** : une sonde sur chaque point, masses sur la masse du montage, et l'oscilloscope affiche voie 1 − voie 2 [SOURCÉ : SRC-0014 §Math and Measurement Operations]. La note Tektronix recommande alors des sondes identiques [SOURCÉ : SRC-0029 §Different Probe Types and Their Benefits].
- **Sonde différentielle** : elle soustrait les deux signaux dans un amplificateur différentiel et rejette beaucoup mieux la tension commune aux deux points [SOURCÉ : SRC-0029 §Different Probe Types and Their Benefits].

### Exemple 4 : un facteur de sonde oublié

Une sonde ×10 est branchée, mais l'oscilloscope est réglé sur ×1 ; il affiche 1,2 V crête [EXEMPLE].

1. La tension réelle est dix fois plus grande : 12 V crête [EXEMPLE].
2. Toutes les mesures automatiques sont fausses du même facteur.
3. Réflexe : vérifier le facteur de sonde dans le menu de la voie avant chaque série de mesures.

### Exemple 5 : la tension aux bornes d'une résistance de mesure de courant

On veut voir la tension aux bornes d'une résistance placée côté plus d'une charge : aucun de ses deux côtés n'est à la masse [EXEMPLE].

1. Poser la masse de la sonde sur un côté de la résistance la relierait à la terre : court-circuit possible (FE-07).
2. Voie 1 sur le côté alimentation, voie 2 sur le côté charge, masses des deux sondes sur la masse du montage.
3. Afficher voie 1 − voie 2. Si l'on mesure 0,25 V aux bornes d'une résistance de 0,1 Ω, le courant vaut 0,25 / 0,1 = 2,5 A [EXEMPLE].

### Exemple 6 : des oscillations qui viennent de la sonde

Sur un front rapide, l'écran montre des oscillations après chaque transition, avec un fil de masse long ajouté à la sonde [EXEMPLE].

1. Hypothèse : le fil de masse long sonne avec la capacité de la sonde [HYPOTHÈSE].
2. Vérification : remplacer le fil long par le fil de masse court d'origine, ou par un ressort de masse si la sonde en a un, au plus près du point mesuré.
3. Si les oscillations disparaissent, elles venaient de la mesure, pas du circuit.

## Exercices

::exercice{id=S11-L02-EX01}

::exercice{id=S11-L02-EX02}

::exercice{id=S11-L02-EX03}
