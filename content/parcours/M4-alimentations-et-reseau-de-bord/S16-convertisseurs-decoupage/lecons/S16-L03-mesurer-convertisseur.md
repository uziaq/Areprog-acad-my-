---
id: S16-L03
titre: Mesurer un convertisseur à découpage
chapitre: S16
version: "0.1"
statut: brouillon
duree_min: 90
objectifs:
  - id: O1
    texte: Observer à l'oscilloscope le nœud de commutation et l'ondulation de sortie, avec une masse de sonde courte
    competences: [D6.2, D3.4]
  - id: O2
    texte: Mesurer le rendement d'un convertisseur à partir des puissances d'entrée et de sortie
    competences: [D6.2]
  - id: O3
    texte: Conduire un premier diagnostic d'un convertisseur à partir de ses formes d'onde
    competences: [D6.2]
prerequis: [S16-L02, S11-L02]
exercices: [S16-L03-EX01, S16-L03-EX02]
references: [SRC-0039, SRC-0029]
criteres_evaluation:
  - objectif: O1
    critere: Exercice S16-L03-EX01 réussi et captures du nœud de commutation et de l'ondulation au TP-22
  - objectif: O2
    critere: Exercice S16-L03-EX02 réussi et rendement mesuré pour trois charges au TP-22
  - objectif: O3
    critere: Diagnostic du convertisseur rédigé au TP-22
figures:
  - id: S16-F03
    fichier: ../figures/S16-F03-noeud-commutation.svg
    legende: "Forme d'onde du nœud de commutation d'un buck à diode, allure sans valeur : un créneau entre la tension d'entrée, quand le transistor conduit, et une tension légèrement négative, quand la diode conduit. Le temps de conduction divisé par la période donne le rapport cyclique."
    alt: "Créneau périodique. Le niveau haut est marqué VIN, le niveau bas est un peu sous la ligne zéro, marqué moins VF. Une flèche horizontale couvre la durée du niveau haut, marquée tON ; une autre couvre une période complète, marquée T."
    origine: areprog
derniere_verification_sources: 2026-11-14
historique:
  - version: "0.1"
    date: 2026-11-14
    resume: Première rédaction
---

## Théorie

### Le nœud de commutation

Le nœud entre le transistor, la diode et l'inductance d'un buck bascule à chaque période : à la
tension d'entrée quand le transistor conduit, un peu sous zéro quand la diode conduit
[SOURCÉ : SRC-0039 §2.1 Buck Regulator]. À l'oscilloscope, c'est un créneau dont on lit la
fréquence de découpage et le rapport cyclique (S06, S11).

::figure{id=S16-F03}

### Mesurer l'ondulation sans se tromper

Les commutations rapides créent des pointes de tension à très haute fréquence ; elles sont captées
par des antennes aussi petites que le fil de masse de 3 pouces d'une sonde
[SOURCÉ : SRC-0039 §3.4 Measuring Output Ripple Voltage]. Deux méthodes :

- **masse courte** : le fil de masse le plus court fourni avec la sonde, ou un ressort de masse au plus près du point mesuré [SOURCÉ : SRC-0029 §The Realities of Probes] ;
- **mesure différentielle** : deux sondes identiques, une sur la sortie, une sur la masse de sortie, voie B inversée et ajoutée à la voie A pour retirer le signal capté par les deux [SOURCÉ : SRC-0039 §3.4 Measuring Output Ripple Voltage].

Pour une ondulation efficace au multimètre, il faut un appareil efficace vrai, de bande passante
suffisante, et retrancher le bruit lu pointes sur la masse [SOURCÉ : SRC-0039 §3.4 Measuring Output Ripple Voltage].
Les règles de S11 restent valables : pince de masse uniquement sur la masse du montage (FE-07).

### Mesurer le rendement

Le rendement est η = PCHARGE / PTOTAL, avec PTOTAL = VIN × IIN(moyen)
[SOURCÉ : SRC-0039 §3.5 Measuring Regulator Efficiency of DC/DC Converters]. Le courant d'entrée
n'est ni continu ni sinusoïdal : c'est sa valeur **moyenne** qu'on utilise
[SOURCÉ : SRC-0039 §3.5 Measuring Regulator Efficiency of DC/DC Converters]. Les pertes valent
PTOTAL − PCHARGE.

### Premier diagnostic

Lecture des symptômes [EXEMPLE : grille pédagogique, chaque piste reste une hypothèse à vérifier] :

- **Pas de créneau sur le nœud de commutation** : convertisseur arrêté ; vérifier l'entrée, l'enable et la masse, comme pour un régulateur (S15-L03).
- **Créneau présent, sortie absente** : inductance coupée ou sortie en court-circuit [HYPOTHÈSE].
- **Ondulation de sortie anormale** : condensateur de sortie usé (ESR), à confirmer au testeur d'ESR (S16-L02) [HYPOTHÈSE].
- **Créneau irrégulier, rapport cyclique qui saute** : boucle instable ou surcharge ; comparer à la forme normale à la même charge [HYPOTHÈSE].
- **Rendement bas, composant chaud** : pertes anormales dans le transistor, la diode ou l'inductance [HYPOTHÈSE].

### Exemple 7 : rapport cyclique au nœud de commutation

À l'oscilloscope, le créneau du nœud de commutation a une période de 2 µs et un niveau haut de 0,9 µs ; l'entrée vaut 12 V [EXEMPLE].

1. Fréquence de découpage : 1 / 2 µs = 500 kHz [EXEMPLE].
2. Rapport cyclique : 0,9 / 2 = 0,45 [EXEMPLE].
3. Sortie attendue sans pertes : 12 × 0,45 = 5,4 V [EXEMPLE] ; la sortie réelle est un peu plus basse.

### Exemple 8 : rendement mesuré

Entrée : 12 V et 0,5 A moyens ; sortie : 5 V et 1,05 A [EXEMPLE].

1. PTOTAL = 12 × 0,5 = 6 W [EXEMPLE] ; PCHARGE = 5 × 1,05 = 5,25 W [EXEMPLE].
2. η = 5,25 / 6 ≈ 0,875 [EXEMPLE].
3. Pertes : 6 − 5,25 = 0,75 W [EXEMPLE], bien moins qu'un régulateur linéaire dans les mêmes conditions (S15-L01).

### Exemple 9 : une ondulation qui disparaît

Avec la masse longue de la sonde, l'ondulation montre de grandes pointes ; avec le ressort de masse, elles deviennent beaucoup plus petites [EXEMPLE].

1. Les pointes venaient en grande partie du fil de masse, qui sert d'antenne [SOURCÉ : SRC-0039 §3.4 Measuring Output Ripple Voltage].
2. On garde la mesure avec le ressort, et l'on note la méthode dans le journal.

## Exercices

::exercice{id=S16-L03-EX01}

::exercice{id=S16-L03-EX02}
