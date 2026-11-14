---
id: S05-L03
titre: L'inductance, la constante L/R et la surtension à l'ouverture
chapitre: S05
version: "0.1"
statut: brouillon
duree_min: 75
objectifs:
  - id: O1
    texte: Calculer la constante de temps τ = L / R et le courant établi dans une bobine
    competences: [D2.5]
  - id: O2
    texte: Expliquer la surtension à l'ouverture d'un circuit inductif et le rôle de la diode de roue libre, avec sa contrepartie
    competences: [D2.5]
  - id: O3
    texte: Reconnaître le rôle d'un condensateur de découplage sur un schéma (premier aperçu)
    competences: [D2.5]
prerequis: [S05-L02]
exercices: [S05-L03-EX01, S05-L03-EX02]
references: [SRC-0009, SRC-0011, SRC-0012]
criteres_evaluation:
  - objectif: O1
    critere: Exercice S05-L03-EX01 réussi
  - objectif: O2
    critere: Exercice S05-L03-EX02 réussi et questions du QCM sur la roue libre réussies
  - objectif: O3
    critere: Question du QCM sur le découplage réussie
figures:
  - id: S05-F03
    fichier: ../figures/S05-F03-roue-libre.svg
    legende: "Bobine commandée par un interrupteur, avec sa diode de roue libre en parallèle, bloquée tant que la bobine est alimentée. À l'ouverture, le courant de la bobine continue dans la diode au lieu de créer une surtension."
    alt: "Schéma : une source, puis une bobine reliée au plus de la source et, en dessous, un interrupteur vers le moins. Une diode est branchée en parallèle sur la bobine, sa cathode côté plus. Une flèche en boucle montre le courant qui circule dans la bobine et la diode après l'ouverture de l'interrupteur."
    origine: areprog
derniere_verification_sources: 2026-11-14
historique:
  - version: "0.1"
    date: 2026-11-14
    resume: Première rédaction
---

## Théorie

### L'inductance

Une **bobine** (inductance) stocke de l'énergie dans un champ magnétique créé par le courant qui
la traverse : plus le courant est fort, plus elle en stocke [SOURCÉ : SRC-0009 §Magnetic fields and inductance].
Son inductance L s'exprime en **henrys** (H) [SOURCÉ : SRC-0009 §Magnetic fields and inductance].
Les inductances s'additionnent en série et diminuent en parallèle, comme les résistances
[SOURCÉ : SRC-0009 §Series and parallel inductors].

Là où le condensateur s'oppose aux variations de **tension**, la bobine s'oppose aux variations
de **courant**. À la fermeture, le courant ne s'établit pas d'un coup : la tension aux bornes de la
bobine saute à celle de la source, puis le courant monte [SOURCÉ : SRC-0009 §Inductor transient response].

### La constante de temps L/R

Dans un circuit série R-L : **τ = L / R**, en secondes [SOURCÉ : SRC-0009 §Why L/R and not LR?].
La même formule universelle et la même règle des 63 % s'appliquent au **courant** (leçon S05-L02) [SOURCÉ : SRC-0009 §Voltage and current calculations].
Le courant final vaut E / R : seule la résistance (du fil de la bobine et du circuit) le limite.

### La surtension à l'ouverture

Si l'on ouvre brutalement le circuit, le courant doit passer de sa valeur à zéro en un temps
très court. La bobine réagit en créant une tension de polarité inverse, qui peut atteindre des
centaines de volts [SOURCÉ : SRC-0011 §Inductor commutating circuits]. Sur une bobine de relais,
le fabricant parle d'un transitoire de l'ordre de centaines, voire de milliers de volts [SOURCÉ : SRC-0012 §Coil Suppression Can Reduce Relay Life].

Cette surtension peut détruire le transistor qui commande la bobine, ou perturber l'électronique
voisine. Sur un véhicule, les relais, les électrovannes et les injecteurs sont des charges
inductives commandées par le calculateur : c'est la raison d'être de leurs protections
[À VÉRIFIER : protection réellement utilisée sur chaque sortie, à lire sur le schéma ou la documentation du calculateur étudié].

### La diode de roue libre

::figure{id=S05-F03}

- Une diode est placée **en parallèle** sur la bobine, montée pour être **bloquée** tant que la bobine est alimentée [SOURCÉ : SRC-0011 §Inductor commutating circuits].
- À l'ouverture, la tension induite s'inverse, la diode conduit et le courant de la bobine continue de circuler dans la boucle bobine-diode, jusqu'à s'éteindre [SOURCÉ : SRC-0011 §Inductor commutating circuits].
- **Contrepartie** : l'énergie s'évacue plus lentement, donc la bobine se « vide » plus lentement [SOURCÉ : SRC-0011 §Inductor commutating circuits]. Sur un relais, une diode seule donne la décroissance la plus lente et peut nuire à l'ouverture des contacts et à leur durée de vie [SOURCÉ : SRC-0012 §Coil Suppression Can Reduce Relay Life].
- Une diode en série avec une diode Zener donne une décroissance proche de l'optimum [SOURCÉ : SRC-0012 §Coil Suppression Can Reduce Relay Life]. La diode et la Zener sont étudiées en S08.

Une diode de roue libre montée à l'envers court-circuite la source dès la mise sous tension
[HYPOTHÈSE] : son sens se vérifie avant d'alimenter.

### Le découplage : premier aperçu

Sur un schéma de carte, on voit presque toujours un petit condensateur relié entre
l'alimentation et la masse, au plus près de chaque circuit intégré. C'est un condensateur de
**découplage** : il fournit localement les pointes de courant du circuit et limite les
variations de sa tension d'alimentation. Ses valeurs et son placement se lisent dans la fiche
technique du circuit [À VÉRIFIER : valeurs de découplage recommandées par la fiche technique de chaque circuit intégré]. Le sujet est approfondi en S15 et S16.

### Exemple 7 : constante L/R

Une bobine de relais de 100 mH, de résistance 50 Ω, est alimentée sous 12 V [EXEMPLE].

1. τ = 0,1 / 50 = 0,002 s = 2 ms [EXEMPLE].
2. Courant final : 12 / 50 = 0,24 A [EXEMPLE].
3. Après 1τ (2 ms) : 0,24 × 0,63 = 0,15 A [EXEMPLE] ; après 5τ (10 ms), pratiquement 0,24 A [EXEMPLE].

### Exemple 8 : lire le sens d'une diode de roue libre

La bobine de l'exemple 7 est reliée au +12 V par une borne et à un transistor par l'autre [EXEMPLE].

1. Bobine alimentée : la borne côté +12 V est la plus positive ; la diode doit être bloquée, donc sa **cathode** est reliée au +12 V [EXEMPLE].
2. À l'ouverture du transistor, la borne côté transistor devient la plus positive : la diode conduit et referme la boucle [EXEMPLE].
3. Montée à l'envers, elle conduirait dès la mise sous tension, en court-circuit à travers le transistor [HYPOTHÈSE].

### Exemple 9 : la contrepartie de la roue libre

Le relais de l'exemple 7 [EXEMPLE] décolle trop lentement après l'ajout d'une diode seule.

1. La diode impose une faible tension aux bornes de la bobine pendant la décroissance : le courant s'éteint lentement [SOURCÉ : SRC-0011 §Inductor commutating circuits].
2. Une diode avec une Zener en série laisse monter une tension plus élevée, mais limitée : le courant s'éteint plus vite [SOURCÉ : SRC-0012 §Coil Suppression Can Reduce Relay Life].
3. La tension de la Zener se choisit pour rester supportable par le transistor de commande [SOURCÉ : SRC-0012 §Coil Suppression Can Reduce Relay Life].

## Exercices

::exercice{id=S05-L03-EX01}

::exercice{id=S05-L03-EX02}
