---
id: S06-L01
titre: Signaux alternatifs, PWM et valeurs caractéristiques
chapitre: S06
version: "0.1"
statut: brouillon
duree_min: 90
objectifs:
  - id: O1
    texte: Calculer la fréquence d'un signal à partir de sa période, et inversement
    competences: [D2.6]
  - id: O2
    texte: Calculer les valeurs crête, crête à crête et efficace d'une sinusoïde et d'un signal carré
    competences: [D2.6]
  - id: O3
    texte: Calculer le rapport cyclique, la valeur moyenne et la valeur efficace d'un signal rectangulaire (PWM)
    competences: [D2.6]
prerequis: [S05]
exercices: [S06-L01-EX01, S06-L01-EX02, S06-L01-EX03]
references: [SRC-0010, SRC-0008]
criteres_evaluation:
  - objectif: O1
    critere: Exercice S06-L01-EX01 réussi et fréquence calculée depuis la période au TP-08
  - objectif: O2
    critere: Exercice S06-L01-EX02 réussi et valeur efficace comparée au multimètre au TP-08
  - objectif: O3
    critere: Exercice S06-L01-EX03 réussi et rapport cyclique mesuré au TP-08
figures:
  - id: S06-F01
    fichier: ../figures/S06-F01-signaux.svg
    legende: "En haut, une sinusoïde avec sa période T, sa valeur crête et sa valeur crête à crête. En bas, un signal rectangulaire (PWM) entre 0 et Umax, avec sa durée haute th et sa période T."
    alt: "Deux graphiques superposés. En haut, une sinusoïde autour d'un axe horizontal : une flèche horizontale marque la période T entre deux crêtes, une flèche verticale la valeur crête depuis l'axe, une autre la valeur crête à crête entre le haut et le bas. En bas, un signal rectangulaire qui alterne entre 0 et Umax : une flèche marque la durée à l'état haut th, une autre la période T."
    origine: areprog
derniere_verification_sources: 2026-11-14
historique:
  - version: "0.1"
    date: 2026-11-14
    resume: Première rédaction
---

## Théorie

### Période et fréquence

Un signal **périodique** se répète à l'identique.

- La **période** T est la durée d'un cycle complet [SOURCÉ : SRC-0010 §AC waveforms].
- La **fréquence** f est le nombre de cycles par seconde, en hertz (Hz) : **f = 1 / T** [SOURCÉ : SRC-0010 §AC waveforms].

Ordre de grandeur : une période de 1 ms correspond à 1 kHz [EXEMPLE].

### Les valeurs d'une sinusoïde

::figure{id=S06-F01}

- **Valeur crête** (Û) : hauteur du signal mesurée depuis zéro jusqu'au sommet [SOURCÉ : SRC-0010 §Measurements of AC magnitude].
- **Valeur crête à crête** (Ucc) : hauteur totale, du maximum positif au maximum négatif [SOURCÉ : SRC-0010 §Measurements of AC magnitude] ; pour une sinusoïde centrée sur zéro, Ucc = 2 × Û.
- **Valeur moyenne** : moyenne de tous les points sur une période [SOURCÉ : SRC-0010 §Measurements of AC magnitude] ; elle est nulle pour une sinusoïde centrée sur zéro.
- **Valeur efficace** (RMS) : la tension continue qui produirait le même échauffement dans une résistance [SOURCÉ : SRC-0010 §Measurements of AC magnitude]. Pour une sinusoïde, elle vaut environ **0,707 × Û** [SOURCÉ : SRC-0010 §Measurements of AC magnitude].
- **Facteur de crête** : rapport entre la valeur crête et la valeur efficace [SOURCÉ : SRC-0010 §Measurements of AC magnitude] ; 1,414 pour une sinusoïde pure [SOURCÉ : SRC-0008 §DC and AC voltage].

### Le signal carré et le signal rectangulaire

Un signal **carré symétrique** (entre −Û et +Û) a sa valeur efficace égale à sa valeur crête :
son facteur de crête vaut 1 [SOURCÉ : SRC-0010 §Measurements of AC magnitude].

En électronique automobile, on rencontre surtout des signaux **rectangulaires** entre 0 et Umax,
dont on fait varier la durée à l'état haut : c'est la **PWM** (modulation de largeur
d'impulsion), utilisée pour commander un moteur, une électrovanne ou un éclairage.

- **Rapport cyclique** : D = th / T, la fraction de la période passée à l'état haut, souvent exprimée en pour cent.
- **Valeur moyenne** : Umoy = D × Umax. C'est elle qui fixe, en première approche, l'effet moyen sur une charge lente.
- **Valeur efficace** : Ueff = Umax × √D. Elle se déduit de la définition (même échauffement) ; pour D = 100 %, on retrouve Umax.

### Ce que lit le multimètre

Un multimètre « à réponse moyenne » n'est exact que pour une sinusoïde pure ; sur un signal PWM,
il peut afficher beaucoup moins que la vraie valeur efficace [SOURCÉ : SRC-0008 §DC and AC voltage].
Seul un appareil **TRMS** mesure la vraie valeur efficace (S04-L02). La fiche d'identité de
votre multimètre (TP-06) dit lequel vous avez. Pour **voir** la forme d'un signal, son rapport
cyclique ou sa fréquence, l'instrument est l'oscilloscope (leçon S06-L03).

### Exemple 1 : période et fréquence

1. Un signal a une période de 2,5 ms [EXEMPLE] : f = 1 / 0,002 5 = 400 Hz [EXEMPLE].
2. Un signal de 50 kHz [EXEMPLE] a une période T = 1 / 50 000 = 0,000 02 s = 20 µs [EXEMPLE].

### Exemple 2 : valeurs d'une sinusoïde

Une sinusoïde centrée sur zéro mesure 10 V crête à crête [EXEMPLE].

1. Valeur crête : 10 / 2 = 5 V [EXEMPLE].
2. Valeur efficace : 0,707 × 5 = 3,54 V [EXEMPLE].
3. Valeur moyenne : 0 V [EXEMPLE], car le signal est centré sur zéro.

### Exemple 3 : un signal PWM

Un signal rectangulaire de 0 à 12 V [EXEMPLE] reste 0,25 ms à l'état haut sur une période de 1 ms [EXEMPLE].

1. Rapport cyclique : D = 0,25 / 1 = 25 % [EXEMPLE].
2. Fréquence : 1 / 0,001 = 1 kHz [EXEMPLE].
3. Valeur moyenne : 0,25 × 12 = 3 V [EXEMPLE].
4. Valeur efficace : 12 × √0,25 = 12 × 0,5 = 6 V [EXEMPLE], le double de la moyenne. Un multimètre à réponse moyenne, réglé en alternatif, n'affichera ni l'une ni l'autre de façon fiable [HYPOTHÈSE].

## Exercices

::exercice{id=S06-L01-EX01}

::exercice{id=S06-L01-EX02}

::exercice{id=S06-L01-EX03}
