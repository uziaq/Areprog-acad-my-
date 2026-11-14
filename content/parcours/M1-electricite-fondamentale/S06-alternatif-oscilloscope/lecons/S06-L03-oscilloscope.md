---
id: S06-L03
titre: Premiers pas à l'oscilloscope
chapitre: S06
version: "0.1"
statut: brouillon
duree_min: 90
objectifs:
  - id: O1
    texte: Régler le calibre vertical et la base de temps pour afficher un signal sur deux à cinq périodes
    competences: [D3.3]
  - id: O2
    texte: Régler le déclenchement sur front (source, niveau, pente) et choisir entre les modes auto et normal
    competences: [D3.3]
  - id: O3
    texte: Lire sur l'écran une période, une amplitude et un rapport cyclique, puis les comparer aux mesures automatiques
    competences: [D3.3, D2.6]
prerequis: [S06-L01]
exercices: [S06-L03-EX01, S06-L03-EX02]
references: [SRC-0014]
criteres_evaluation:
  - objectif: O1
    critere: Exercice S06-L03-EX01 réussi et réglages notés au journal du TP-08
  - objectif: O2
    critere: Questions du QCM sur le déclenchement réussies et image stable obtenue au TP-08
  - objectif: O3
    critere: Exercice S06-L03-EX02 réussi et lectures sur graduations comparées aux mesures automatiques au TP-08
figures:
  - id: S06-F03
    fichier: ../figures/S06-F03-ecran-oscilloscope.svg
    legende: "Écran d'oscilloscope générique : une grille de 10 divisions horizontales et 8 verticales, une sinusoïde, le repère du niveau de déclenchement et les indications de calibre vertical (V/div) et de base de temps (s/div). La disposition réelle dépend du modèle."
    alt: "Un rectangle quadrillé de 10 colonnes et 8 lignes. Une sinusoïde le traverse sur environ deux périodes et demie. À gauche, une petite flèche marque le niveau de déclenchement sur l'axe vertical. En bas, deux étiquettes indiquent V par division et s par division."
    origine: areprog
derniere_verification_sources: 2026-11-14
historique:
  - version: "0.1"
    date: 2026-11-14
    resume: Première rédaction
---

## Théorie

### Ce que montre un oscilloscope

L'oscilloscope trace la tension en fonction du temps. L'écran est une grille de **divisions** :
on lit une tension en comptant des divisions verticales, un temps en comptant des divisions
horizontales. Le nombre de divisions dépend du modèle ; la figure en montre 10 × 8 [EXEMPLE].

::figure{id=S06-F03}

Le fonctionnement repose sur trois systèmes : **vertical**, **horizontal** et **déclenchement**
[SOURCÉ : SRC-0014 §The Systems and Controls of an Oscilloscope].

### Le système vertical

- **Volts par division** : facteur d'échelle qui change la taille du signal à l'écran [SOURCÉ : SRC-0014 §Position and Volts per Division]. On choisit le calibre qui fait occuper au signal la plus grande partie de l'écran sans le couper.
- **Position** : déplace la trace vers le haut ou le bas.
- **Couplage** : en **DC**, on voit le signal complet, composante continue comprise ; en **AC**, la composante continue est bloquée et le signal est centré sur zéro [SOURCÉ : SRC-0014 §Input Coupling]. Le réglage **masse** (GND) déconnecte le signal pour repérer le zéro [SOURCÉ : SRC-0014 §Input Coupling].

Règle d'atelier : commencer en couplage **DC**. Un signal PWM de 0 à 12 V vu en AC [EXEMPLE] semble osciller autour de zéro, ce qui fausse la lecture des niveaux.

### Le système horizontal

La **base de temps** (secondes par division) règle la vitesse à laquelle la trace parcourt
l'écran [SOURCÉ : SRC-0014 §Position and Seconds per Division]. Pour une première lecture, on
l'ajuste pour voir **deux à cinq périodes** : assez pour juger la répétition, assez peu pour
lire chaque période avec précision.

### Le déclenchement

Sans déclenchement, chaque balayage commence à un instant différent et l'image défile. Le
déclenchement fixe le point de départ :

- **Front et pente** : la pente choisit si le départ se fait sur le front montant ou descendant [SOURCÉ : SRC-0014 §Trigger Level and Slope].
- **Niveau** : la tension à laquelle le front doit passer ; il doit se trouver **entre** le minimum et le maximum du signal, sinon rien ne se déclenche.
- **Source** : la voie qui porte le signal à observer.
- **Mode** : en **auto**, l'oscilloscope balaie même sans déclenchement [SOURCÉ : SRC-0014 §Trigger Modes], ce qui permet de trouver le signal ; en **normal**, il n'affiche une trace que s'il y a déclenchement, ce qui convient à un signal rare.

### Partir d'un réglage connu

La source conseille de placer les commandes en position standard avant de mesurer : calibre
vertical, base de temps et positions en milieu de plage [SOURCÉ : SRC-0014 §Setting the Controls].
Beaucoup d'oscilloscopes numériques proposent aussi un réglage automatique ; il donne un point de
départ, pas un réglage justifié.

### Sondes et sécurité

- La sonde **×10** charge moins le circuit qu'une sonde ×1 [SOURCÉ : SRC-0014 §Passive Probes]. Elle divise le signal par dix : l'oscilloscope doit connaître ce facteur pour afficher la bonne tension [À VÉRIFIER : réglage du facteur de sonde dans la notice de l'oscilloscope de l'atelier]. La compensation de la sonde est étudiée en S11.
- Un oscilloscope relié au secteur se met à la terre par le conducteur de terre de son cordon d'alimentation ; c'est nécessaire à la sécurité [SOURCÉ : SRC-0014 §Proper Grounding]. Certains modèles ont un boîtier et des commandes isolés [SOURCÉ : SRC-0014 §Proper Grounding] : la notice dit lequel vous avez [À VÉRIFIER : type d'isolation de l'oscilloscope de l'atelier, dans sa notice].
- Cette semaine, la pince de masse de la sonde se relie **uniquement** à la masse du générateur ou du montage étudié. Où la relier sur une carte réelle, et pourquoi, est étudié en S11.

### Lire, puis vérifier

Les **mesures automatiques** (période, fréquence, amplitude, rapport cyclique) sont précieuses,
mais elles se trompent quand le signal est mal affiché (trop petit, coupé, mal déclenché). On lit
d'abord sur les graduations, on compare ensuite à la mesure automatique : si les deux diffèrent,
c'est le réglage qu'il faut revoir.

### Exemple 7 : choisir les calibres

Un générateur délivre une sinusoïde de 4 V crête à crête à 1 kHz [EXEMPLE] ; l'écran a 8 divisions verticales et 10 horizontales [EXEMPLE].

1. Calibre vertical de 1 V/div [EXEMPLE] : le signal occupe 4 divisions, la moitié de la hauteur.
2. Calibre de 0,5 V/div [EXEMPLE] : 8 divisions, tout l'écran, sans marge ; on garde 1 V/div pour la marge.
3. Période : 1 ms [EXEMPLE]. Avec 0,5 ms/div [EXEMPLE], l'écran montre 10 × 0,5 = 5 ms, soit 5 périodes [EXEMPLE].

### Exemple 8 : lire une période et une fréquence

Sur un écran réglé à 0,2 ms/div, une période complète occupe 2,5 divisions [EXEMPLE].

1. T = 2,5 × 0,2 = 0,5 ms [EXEMPLE].
2. f = 1 / 0,000 5 = 2 000 Hz, soit 2 kHz [EXEMPLE].

### Exemple 9 : lire un rapport cyclique

Un signal PWM affiché à 0,1 ms/div reste à l'état haut pendant 3 divisions sur une période de 10 divisions [EXEMPLE]. Calibre vertical 5 V/div, état haut à 2,4 divisions au-dessus du zéro [EXEMPLE].

1. Rapport cyclique : 3 / 10 = 30 % [EXEMPLE].
2. Période : 10 × 0,1 = 1 ms, soit 1 kHz [EXEMPLE].
3. Niveau haut : 2,4 × 5 = 12 V [EXEMPLE] ; valeur moyenne : 0,3 × 12 = 3,6 V [EXEMPLE].

## Exercices

::exercice{id=S06-L03-EX01}

::exercice{id=S06-L03-EX02}
