---
id: S04-L02
titre: Incertitude d'une mesure et conformité
chapitre: S04
version: "0.1"
statut: brouillon
duree_min: 90
objectifs:
  - id: O1
    texte: Calculer l'incertitude d'une lecture à partir d'une spécification « ±(% de la lecture + n points) »
    competences: [D3.7]
  - id: O2
    texte: Choisir le calibre qui réduit l'incertitude d'une mesure
    competences: [D3.7, D3.1]
  - id: O3
    texte: Conclure sur la conformité d'un composant en combinant sa tolérance et l'incertitude de la mesure
    competences: [D3.7]
prerequis: [S04-L01]
exercices: [S04-L02-EX01, S04-L02-EX02, S04-L02-EX03]
references: [SRC-0008]
criteres_evaluation:
  - objectif: O1
    critere: Exercices S04-L02-EX01 et EX02 réussis, puis incertitude calculée pour chaque mesure du TP-06
  - objectif: O2
    critere: Question du QCM sur le choix du calibre réussie et calibre justifié au journal du TP-06
  - objectif: O3
    critere: Exercice S04-L02-EX03 réussi et conclusion de conformité argumentée au TP-06
figures:
  - id: S04-F02
    fichier: ../figures/S04-F02-intervalles.svg
    legende: "Conformité : on compare l'intervalle de la mesure (lecture ± incertitude) à l'intervalle de tolérance du composant. A : entièrement dedans, conforme. B : à cheval, non concluant. C : entièrement dehors, non conforme."
    alt: "Un axe horizontal des valeurs. Au-dessus, une bande grisée représente l'intervalle de tolérance du composant autour de sa valeur nominale. Trois petits intervalles de mesure sont dessinés dessous : A entièrement dans la bande, marqué conforme ; B à cheval sur le bord de la bande, marqué non concluant ; C entièrement à l'extérieur, marqué non conforme."
    origine: areprog
derniere_verification_sources: 2026-11-13
historique:
  - version: "0.1"
    date: 2026-11-13
    resume: Première rédaction
---

## Théorie

### Une mesure n'est jamais exacte

La valeur affichée par un multimètre n'est pas la valeur vraie : elle en est proche, à une
**incertitude** près. Le fabricant la garantit sous forme d'une **spécification de précision**,
le plus souvent écrite [SOURCÉ : SRC-0008 §Accuracy] :

**±(x % de la lecture + n points)**

- la première partie est proportionnelle à la valeur lue ;
- la seconde est un nombre de points du dernier chiffre affiché, c'est-à-dire n fois la résolution du calibre utilisé (S04-L01).

L'exemple de la note Fluke : pour une lecture de 100 V avec une précision de ±(1 % + 2), la tension vraie se situe entre 98,8 V et 101,2 V [SOURCÉ : SRC-0008 §Accuracy]. En effet, 1 % de
100 V donne 1 V, et 2 points de 0,1 V donnent 0,2 V [EXEMPLE : décomposition du calcul de la source, résolution de 0,1 V déduite].

La spécification dépend de la fonction, du calibre et parfois de la fréquence : elle se lit dans
le tableau de spécifications de la notice, pour **chaque** mesure
[À VÉRIFIER : tableau de spécifications du multimètre de l'atelier, relevé dans sa fiche d'identité au TP-06].

### Méthode de calcul

1. Noter la lecture et le calibre utilisé ; en déduire la résolution.
2. Partie proportionnelle : x % × lecture.
3. Partie fixe : n × résolution.
4. Incertitude = somme des deux ; intervalle = lecture ± incertitude.

### Choisir le calibre

La partie fixe (n points) pèse lourd quand la lecture est petite devant le calibre. D'où la règle
de S04-L01, maintenant justifiée : le plus petit calibre qui contient la valeur donne la plus
petite incertitude.

### Conformité : tolérance et incertitude ensemble

Pour juger un composant, on compare deux intervalles :

- l'**intervalle de tolérance** du composant (nominale ± tolérance, S02) ;
- l'**intervalle de mesure** (lecture ± incertitude).

::figure{id=S04-F02}

Trois cas : l'intervalle de mesure est entièrement dans la tolérance (conforme), entièrement
dehors (non conforme), ou à cheval (**non concluant** : il faut un instrument plus précis, ou une
autre méthode). Écrire « non concluant » au journal est une conclusion juste ; écrire « conforme »
dans ce cas ne l'est pas.

### Alternatif : valeur efficace vraie

En alternatif, un multimètre « à réponse moyenne » n'est exact que pour une sinusoïde pure ; sur
un signal non sinusoïdal, il affiche souvent beaucoup moins que la vraie valeur
[SOURCÉ : SRC-0008 §DC and AC voltage]. Un multimètre **TRMS** (*true RMS*) mesure la vraie
valeur efficace. Le facteur de crête d'une sinusoïde pure vaut 1,414
[SOURCÉ : SRC-0008 §DC and AC voltage] ; les signaux de l'électronique automobile (PWM,
impulsions) en sont loin. Les valeurs efficaces sont étudiées en S06.

### Exemple 4 : incertitude d'une lecture

Lecture 12,00 V sur le calibre 20 V, résolution 0,01 V, précision ±(0,5 % + 2) [EXEMPLE].

1. Partie proportionnelle : 0,5 % × 12,00 = 0,06 V [EXEMPLE].
2. Partie fixe : 2 × 0,01 = 0,02 V [EXEMPLE].
3. Incertitude : 0,06 + 0,02 = 0,08 V [EXEMPLE].
4. Intervalle : de 11,92 à 12,08 V [EXEMPLE].

### Exemple 5 : le calibre change tout

On lit 0,500 V, avec la même précision ±(0,5 % + 2) [EXEMPLE].

1. Sur le calibre 20 V (résolution 0,01 V) : 0,0025 + 0,02 = 0,0225 V, soit 4,5 % de la lecture [EXEMPLE].
2. Sur le calibre 2 V (résolution 0,001 V) : 0,0025 + 0,002 = 0,0045 V, soit 0,9 % de la lecture [EXEMPLE].
3. Le petit calibre divise l'incertitude par cinq [EXEMPLE].

### Exemple 6 : un résultat non concluant

Une résistance marquée 1 kΩ ±1 % est lue 1,013 kΩ sur le calibre 2 kΩ, résolution 1 Ω, précision ±(0,8 % + 1) [EXEMPLE].

1. Tolérance : de 990 à 1 010 Ω [EXEMPLE].
2. Incertitude : 0,8 % × 1 013 + 1 = 8,1 + 1 = 9,1 Ω [EXEMPLE] ; intervalle de mesure : de 1 003,9 à 1 022,1 Ω [EXEMPLE].
3. L'intervalle de mesure est à cheval sur la borne 1 010 Ω [EXEMPLE] : **non concluant**.
4. La lecture seule (1 013 Ω) aurait fait conclure à tort « hors tolérance » [HYPOTHÈSE].

## Exercices

::exercice{id=S04-L02-EX01}

::exercice{id=S04-L02-EX02}

::exercice{id=S04-L02-EX03}
