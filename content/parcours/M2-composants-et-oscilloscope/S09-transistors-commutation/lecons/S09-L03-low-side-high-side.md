---
id: S09-L03
titre: Étages low-side et high-side, charges inductives et « smart power »
chapitre: S09
version: "0.1"
statut: brouillon
duree_min: 60
objectifs:
  - id: O1
    texte: Identifier un étage de sortie low-side ou high-side sur un schéma et dire ce qu'il impose à la commande de grille
    competences: [D10.2, D4.4]
  - id: O2
    texte: Expliquer comment un étage de sortie est protégé contre la surtension d'une charge inductive, et le principe d'un transistor protégé (smart power)
    competences: [D10.2, D4.4]
prerequis: [S09-L02]
exercices: [S09-L03-EX01, S09-L03-EX02]
references: [SRC-0021, SRC-0022, SRC-0011, SRC-0012]
criteres_evaluation:
  - objectif: O1
    critere: Exercices S09-L03-EX01 et EX02 réussis
  - objectif: O2
    critere: Questions du QCM sur la roue libre, l'écrêtage et les transistors protégés réussies
figures:
  - id: S09-F03
    fichier: ../figures/S09-F03-low-high-side.svg
    legende: "À gauche, étage low-side : la charge est reliée au plus, le transistor est entre la charge et la masse. À droite, étage high-side : le transistor est entre le plus et la charge, la charge retourne à la masse."
    alt: "Deux schémas côte à côte. À gauche, du plus vers la masse : une charge, puis un MOSFET canal N, la sortie du calculateur étant le point entre les deux. À droite, du plus vers la masse : un MOSFET, puis la charge ; la sortie est le point entre le MOSFET et la charge."
    origine: areprog
derniere_verification_sources: 2026-11-14
historique:
  - version: "0.1"
    date: 2026-11-14
    resume: Première rédaction
---

## Théorie

### La place du transistor

Un étage de sortie commande une charge (relais, électrovanne, lampe, moteur). Deux montages de
base, définis par la place du transistor :

- **Low-side** (côté masse) : la charge est reliée au plus, le transistor la relie à la masse quand il conduit. Un NPN ou un MOSFET canal N, source à la masse, convient : sa commande est référencée à la masse.
- **High-side** (côté plus) : le transistor relie le plus à la charge, qui retourne à la masse.

::figure{id=S09-F03}

### La commande d'un high-side

Dans un high-side à MOSFET canal N, la source est reliée à la charge : sa tension monte avec la
sortie. Pour conduire, la grille doit dépasser la tension de sortie d'au moins la tension de
seuil, donc une tension **plus haute que l'alimentation** quand la sortie est à plein
[SOURCÉ : SRC-0021 §N-channel and P-channel Considerations]. Il faut une source de tension
supplémentaire pour la grille [SOURCÉ : SRC-0021 §Load Switch Control Circuit Considerations].

Un MOSFET canal P, source au plus, s'allume en tirant sa grille vers la masse : sa commande est
plus simple, mais à surface égale sa RDS(on) est plus élevée ; la note cite une RDS(on) jusqu'à
deux fois plus faible pour le canal N [SOURCÉ : SRC-0021 §Efficiency Considerations].

### Couper une charge inductive

À l'ouverture d'une charge inductive, la bobine produit une surtension (S05-L03). Elle doit être
limitée, sinon elle dépasse la tension maximale du transistor (VCE ou BVDSS) :

- **Diode de roue libre** aux bornes de la charge : elle conduit à l'ouverture et limite la surtension [SOURCÉ : SRC-0011 §Inductor commutating circuits] ; en contrepartie, une diode seule ralentit le relâchement d'un relais [SOURCÉ : SRC-0012 §Coil Suppression Can Reduce Relay Life].
- **Écrêtage dans le transistor** : les transistors protégés low-side ont un écrêteur interne qui limite la tension de sortie lors de la surtension inductive [SOURCÉ : SRC-0022 §Inductive Switching]. Il n'y a alors pas de diode de roue libre externe : son absence sur le schéma n'est pas forcément une anomalie [HYPOTHÈSE].

### Les transistors protégés (« smart power »)

Un transistor protégé associe un MOSFET de puissance et des protections intégrées. La note onsemi
AND8202 cite pour ses modèles low-side : des écrêteurs ESD sur l'entrée de grille, un écrêtage des
surtensions entre drain et grille, une limitation de courant et des coupures thermiques ; toutes
les références n'ont pas toutes ces protections [SOURCÉ : SRC-0022 §General Topology].

Les défauts qu'ils rencontrent sont ceux du dépanneur : court-circuit au plus ou à la masse,
charge ouverte, surtension, surchauffe [SOURCÉ : SRC-0022 §Fault Types]. Un court-circuit
intermittent sur une charge inductive est particulièrement dur : chaque coupure renvoie dans le
transistor une énergie qui peut le détruire [SOURCÉ : SRC-0022 §Fault Types].

Leur fonctionnement détaillé (diagnostic, sortie d'état, mesure de courant) est étudié en S29.

### Ce que l'on mesure sur une sortie au repos

Raisonnement de dépannage, à confirmer par la mesure et le schéma :

- Sortie **low-side** au repos, charge branchée et saine : la sortie se trouve au potentiel du plus, à travers la charge [HYPOTHÈSE]. Une sortie proche de 0 V au repos fait penser à une charge ou un fil coupés, ou à un transistor en court-circuit [HYPOTHÈSE].
- Sortie **high-side** au repos : la sortie est tirée vers la masse par la charge [HYPOTHÈSE]. Une tension proche du plus au repos fait penser à un transistor en court-circuit [HYPOTHÈSE].
- Dans les deux cas, certains étages injectent un petit courant de diagnostic de charge ouverte : la tension lue peut alors différer [À VÉRIFIER : présence d'un diagnostic de charge ouverte, dans la fiche du composant de sortie ou la documentation du calculateur étudié].

### Exemple 7 : reconnaître l'étage sur un schéma

Sur un schéma d'entraînement, une électrovanne est reliée d'un côté au + batterie après fusible, de l'autre à une broche du calculateur ; derrière la broche, le drain d'un MOSFET canal N dont la source est à la masse [EXEMPLE].

1. Le transistor est entre la charge et la masse : étage **low-side**.
2. La commande de grille est référencée à la masse : une tension de grille de quelques volts suffit, selon la fiche.
3. On cherche ensuite la protection contre la surtension : diode aux bornes de l'électrovanne, ou transistor protégé avec écrêteur interne.

### Exemple 8 : tension de grille d'un high-side canal N

Un high-side à MOSFET canal N alimente une charge sous 12 V, et la fiche garantit sa RDS(on) à VGS = 10 V [EXEMPLE].

1. Sortie à plein : la source est à 12 V [EXEMPLE].
2. Pour avoir VGS = 10 V, la grille doit être à 12 + 10 = 22 V [EXEMPLE], soit 10 V au-dessus de l'alimentation.
3. Cette tension vient d'une pompe de charge ou d'un circuit de commande dédié [HYPOTHÈSE : solution habituelle, à lire sur le schéma de chaque montage].
4. Si la grille n'atteint que 14 V [EXEMPLE], VGS ne vaut que 2 V [EXEMPLE] : le MOSFET conduit mal et chauffe (S09-L02).

### Exemple 9 : une sortie low-side à 0 V au repos

Sur une carte d'entraînement, la sortie low-side d'un relais affiche 0,1 V au repos, alimentation présente [EXEMPLE].

1. Attendu au repos : environ la tension d'alimentation, à travers la bobine [HYPOTHÈSE].
2. Hypothèses : bobine ou fil coupés, ou MOSFET en court-circuit drain-source [HYPOTHÈSE].
3. Hors tension : mesurer la résistance de la bobine, puis tester le MOSFET hors circuit (S09-L02).

## Exercices

::exercice{id=S09-L03-EX01}

::exercice{id=S09-L03-EX02}
