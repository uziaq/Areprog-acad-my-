---
id: S11-L03
titre: Déclenchements, capture unique, pince de courant et FFT
chapitre: S11
version: "0.1"
statut: brouillon
duree_min: 75
objectifs:
  - id: O1
    texte: Choisir un mode et un type de déclenchement adaptés (normal, auto, unique ; front, largeur d'impulsion, timeout) pour capturer un événement
    competences: [D3.3]
  - id: O2
    texte: Mesurer un courant à l'oscilloscope avec une pince de courant en respectant ses limites (AC ou AC/DC, courant maximal)
    competences: [D3.3, D3.4]
  - id: O3
    texte: Lire le spectre FFT d'un signal carré ou PWM et y reconnaître les harmoniques
    competences: [D3.3]
prerequis: [S11-L02]
exercices: [S11-L03-EX01, S11-L03-EX02]
references: [SRC-0014, SRC-0029, SRC-0028]
criteres_evaluation:
  - objectif: O1
    critere: Exercice S11-L03-EX02 réussi et rebond de contact capturé en mode unique au TP-18
  - objectif: O2
    critere: Exercice S11-L03-EX01 réussi et courant du relais relevé à la pince au TP-18
  - objectif: O3
    critere: Question du QCM sur les harmoniques réussie et FFT du signal PWM commentée au TP-18
figures:
  - id: S11-F03
    fichier: ../figures/S11-F03-fft-carre.svg
    legende: "À gauche, un signal carré dans le temps. À droite, son spectre : une raie à la fréquence fondamentale f, puis des raies plus petites aux harmoniques impaires 3f, 5f, 7f."
    alt: "À gauche, un signal carré. À droite, un axe des fréquences avec des barres verticales décroissantes, marquées f, 3f, 5f et 7f ; aucune barre aux harmoniques paires."
    origine: areprog
derniere_verification_sources: 2026-11-14
historique:
  - version: "0.1"
    date: 2026-11-14
    resume: Première rédaction
---

## Théorie

### Modes de déclenchement

Le mode de déclenchement décide si l'oscilloscope trace un signal sans condition de déclenchement
[SOURCÉ : SRC-0014 §Trigger Modes] :

- **Normal** : l'oscilloscope n'acquiert que si le signal atteint le point de déclenchement ; sinon, un oscilloscope numérique garde la dernière acquisition à l'écran [SOURCÉ : SRC-0014 §Trigger Modes].
- **Auto** : sans déclenchement, une minuterie lance quand même l'acquisition ; l'écran ne reste jamais vide [SOURCÉ : SRC-0014 §Trigger Modes].
- **Unique** (*single*) : l'oscilloscope s'arrête après une acquisition complète [SOURCÉ : SRC-0014 §Starting and Stopping the Acquisition System]. C'est le mode d'un événement qui ne se produit qu'une fois : rebond d'un contact, appel de courant à la mise sous tension.

### Types de déclenchement

Au-delà du déclenchement sur un front, certains oscilloscopes déclenchent sur une impulsion
définie par le temps [SOURCÉ : SRC-0014 §Trigger System and Controls] :

- **largeur d'impulsion** : sur la première impulsion dont la durée sort des limites fixées [SOURCÉ : SRC-0014 §Trigger System and Controls] ;
- **glitch** : sur une impulsion plus courte ou plus longue qu'une durée choisie [SOURCÉ : SRC-0014 §Trigger System and Controls] ;
- **timeout** : quand un temps fixé s'écoule sans que le signal change, sans attendre la fin de l'impulsion [SOURCÉ : SRC-0014 §Trigger System and Controls].

Certains modèles déclenchent aussi sur des trames de bus série (CAN, LIN, I²C…) et les décodent
[SOURCÉ : SRC-0014 §Trigger System and Controls] ; les bus sont étudiés en S23 à S25. Les types
disponibles dépendent de l'oscilloscope [À VÉRIFIER : types de déclenchement de l'oscilloscope de l'atelier, dans sa notice].

### La pince de courant pour oscilloscope

Une pince de courant capte le champ magnétique autour d'un conducteur et le convertit en une
tension que l'oscilloscope affiche [SOURCÉ : SRC-0029 §Different Probe Types and Their Benefits].
Il en existe deux familles [SOURCÉ : SRC-0029 §Different Probe Types and Their Benefits] :

- **AC** : elle fonctionne comme un transformateur ; elle ne voit pas le courant continu et a une fréquence basse de coupure ;
- **AC/DC** : elle ajoute un capteur à effet Hall pour le continu, et a besoin d'une alimentation.

Limites à respecter :

- le courant maximal d'entrée est le total du continu et de la crête alternative ; en alternatif, il baisse quand la fréquence monte [SOURCÉ : SRC-0029 §Maximum Input Current Rating (current probes)] ;
- le courant de crête impulsionnel maximal ne doit pas être dépassé [SOURCÉ : SRC-0029 §Maximum Input Current Rating (current probes)].

La sensibilité (par exemple en millivolts par ampère) et la mise à zéro avant la mesure se lisent
dans la notice de la pince [À VÉRIFIER : sensibilité, calibres et procédure de mise à zéro de la pince de l'atelier].
La pince entoure un seul conducteur : le courant aller et le courant retour dans la même pince
s'annulent [HYPOTHÈSE : conséquence du principe magnétique, à constater au TP-18].

### La FFT : voir les fréquences d'un signal

Un signal périodique non sinusoïdal est une somme de sinusoïdes : un signal carré est la somme de
sa fondamentale et de ses harmoniques **impaires** [SOURCÉ : SRC-0028 §Square wave signals].
La transformée de Fourier rapide (FFT) calcule ces composantes à partir des échantillons
[SOURCÉ : SRC-0028 §Square wave signals] ; beaucoup d'oscilloscopes numériques la proposent parmi
leurs fonctions mathématiques [SOURCÉ : SRC-0014 §Math and Measurement Operations].

::figure{id=S11-F03}

En dépannage, la FFT aide à trouver la fréquence d'une perturbation mêlée à un signal
[HYPOTHÈSE : usage courant, à confirmer sur chaque mesure].

### Exemple 7 : capturer le rebond d'un contact de relais

On veut voir le rebond du contact d'un relais à la fermeture [EXEMPLE].

1. Sonde sur le contact, tiré vers le 5 V par une résistance ; il descend à 0 V en se fermant [EXEMPLE].
2. Déclenchement sur front descendant, niveau à mi-tension, soit 2,5 V [EXEMPLE] ; mode unique.
3. Base de temps de quelques centaines de microsecondes par division [EXEMPLE] ; on actionne le relais une fois et l'on lit la durée totale du rebond.

### Exemple 8 : lire un courant à la pince

Une pince est réglée sur une sensibilité de 100 mV/A ; l'oscilloscope lit 0,25 V crête [EXEMPLE].

1. Courant crête : 0,25 / 0,1 = 2,5 A [EXEMPLE].
2. Vérifier que ce courant, continu compris, reste sous le courant maximal de la pince.
3. Pour un courant qui contient du continu (bobine de relais en régime établi), il faut une pince AC/DC.

### Exemple 9 : le spectre d'une PWM

Un signal carré de 1 kHz, à 50 % de rapport cyclique [EXEMPLE], passe dans la FFT.

1. Raies attendues : 1 kHz, 3 kHz, 5 kHz, 7 kHz… [EXEMPLE], de plus en plus petites.
2. Pas de raie à 2 kHz ni à 4 kHz pour un carré parfait [SOURCÉ : SRC-0028 §Square wave signals].
3. Si le rapport cyclique change, des harmoniques paires apparaissent [HYPOTHÈSE : à observer au TP-18].

## Exercices

::exercice{id=S11-L03-EX01}

::exercice{id=S11-L03-EX02}
