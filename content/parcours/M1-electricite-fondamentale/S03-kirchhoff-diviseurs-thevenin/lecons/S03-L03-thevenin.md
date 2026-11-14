---
id: S03-L03
titre: Sources réelles, résistance interne et modèle de Thévenin
chapitre: S03
version: "0.1"
statut: brouillon
duree_min: 90
objectifs:
  - id: O1
    texte: Calculer la résistance interne d'une source à partir de sa tension à vide et de sa tension sous une charge connue
    competences: [D2.4]
  - id: O2
    texte: Établir le modèle de Thévenin d'un diviseur de tension et l'utiliser pour prévoir la tension sous charge
    competences: [D2.4, D2.3]
prerequis: [S03-L02]
exercices: [S03-L03-EX01, S03-L03-EX02, S03-L03-EX03]
references: [SRC-0001]
criteres_evaluation:
  - objectif: O1
    critere: Exercice S03-L03-EX01 réussi et TP-05 validé (résistance interne mesurée par deux méthodes, écart expliqué)
  - objectif: O2
    critere: Exercices S03-L03-EX02 et EX03 réussis
figures:
  - id: S03-F03
    fichier: ../figures/S03-F03-modele-thevenin.svg
    legende: "Modèle de Thévenin : toute source linéaire vue de deux bornes se représente par une source idéale Eth en série avec une résistance Rth. La charge RL reçoit la tension U."
    alt: "Un cadre en pointillé intitulé source réelle contient une source de tension idéale Eth en série avec une résistance Rth. Les deux bornes de sortie du cadre sont reliées à une résistance de charge RL ; une flèche indique la tension U aux bornes de la charge."
    origine: areprog
derniere_verification_sources: 2026-11-13
historique:
  - version: "0.1"
    date: 2026-11-13
    resume: Première rédaction
---

## Théorie

### Source idéale, source réelle

Une **source de tension idéale** garde la même tension quel que soit le courant demandé. Aucune
source réelle ne le fait : pile, batterie, alimentation ou sortie de diviseur, toutes voient leur
tension baisser quand le courant augmente. On modélise cette baisse par une **résistance
interne** r en série avec une source idéale E0 [SOURCÉ : SRC-0001 §1.2] :

**U = E0 − r × I**

- À vide (I = 0), on mesure U = E0 : c'est la **tension à vide**.
- Sous une charge, la chute r × I apparaît, et elle croît avec le courant.

### Mesurer une résistance interne

Deux mesures suffisent : la tension à vide E0, puis la tension U sous une charge connue RL.

1. Courant dans la charge : I = U / RL.
2. Résistance interne : **r = (E0 − U) / I**.

La seconde mesure se fait vite : la source s'échauffe et se décharge pendant l'essai, ce qui
fausse E0 si l'on attend.

### Le théorème de Thévenin

Tout circuit linéaire (sources et résistances), vu de deux bornes, se comporte comme une source
idéale **Eth** en série avec une résistance **Rth** [SOURCÉ : SRC-0001 §1.2] :

- **Eth** est la tension à vide entre les deux bornes ;
- **Rth** est la résistance vue des deux bornes quand on remplace les sources de tension par des court-circuits.

::figure{id=S03-F03}

Pour un diviseur R1, R2 alimenté par Ue : **Eth = Ue × R2 / (R1 + R2)** et **Rth = R1 // R2**.
Une fois le modèle établi, la tension sous n'importe quelle charge RL se calcule par un simple
diviseur : **U = Eth × RL / (Rth + RL)**.

Le modèle de **Norton** est l'équivalent « courant » : une source de courant Eth / Rth en
parallèle avec la même résistance Rth [SOURCÉ : SRC-0001 §1.2]. On le rencontrera plus tard ; ici,
on retient seulement qu'il décrit la même source vue autrement.

### Pourquoi c'est utile à l'atelier

- Une batterie dont la tension à vide paraît correcte peut s'effondrer au démarrage : sa résistance interne a augmenté [HYPOTHÈSE]. Seule une mesure **sous charge** le montre.
- La règle « RL très grande devant Rth » dit quand un appareil de mesure ou une entrée de calculateur ne perturbe pas le point mesuré. Elle sera chiffrée pour le multimètre en S04.

### Exemple 6 : résistance interne d'une pile

Une pile affiche 1,58 V à vide, puis 1,52 V sous une résistance de 10 Ω [EXEMPLE].

1. I = 1,52 / 10 = 0,152 A [EXEMPLE].
2. r = (1,58 − 1,52) / 0,152 = 0,06 / 0,152 = 0,39 Ω [EXEMPLE].
3. Contrôle : sous 5 Ω, on prévoit I = 1,58 / (5 + 0,39) = 0,293 A et U = 1,58 − 0,39 × 0,293 = 1,47 V [EXEMPLE].

### Exemple 7 : batterie et démarreur

Modèle d'exemple d'une batterie : E0 = 12,6 V et r = 0,01 Ω [EXEMPLE] ; le démarreur demande 150 A [EXEMPLE]. Ces valeurs ne décrivent aucune batterie ni aucun véhicule réels.

1. Chute interne : 0,01 × 150 = 1,5 V [EXEMPLE].
2. Tension aux bornes : 12,6 − 1,5 = 11,1 V [EXEMPLE].
3. Si une cosse mal serrée ajoute 0,005 Ω [EXEMPLE], la chute supplémentaire vaut 0,005 × 150 = 0,75 V [EXEMPLE] : le démarreur ne reçoit plus que 10,35 V [EXEMPLE].

### Exemple 8 : Thévenin d'un diviseur

On reprend le diviseur de la leçon S03-L02 : Ue = 12 V, R1 = 10 kΩ, R2 = 4,7 kΩ [EXEMPLE].

1. Eth = 12 × 4,7 / 14,7 = 3,84 V [EXEMPLE].
2. Rth = (10 × 4,7) / (10 + 4,7) = 3,20 kΩ [EXEMPLE].
3. Sous RL = 10 kΩ : U = 3,84 × 10 / (3,20 + 10) = 2,91 V [EXEMPLE], le même résultat que l'exemple 4, en un seul calcul.

## Exercices

::exercice{id=S03-L03-EX01}

::exercice{id=S03-L03-EX02}

::exercice{id=S03-L03-EX03}
