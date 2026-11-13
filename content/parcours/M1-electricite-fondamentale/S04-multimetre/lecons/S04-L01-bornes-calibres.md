---
id: S04-L01
titre: Bornes, calibres, résolution et mesures hors tension
chapitre: S04
version: "0.1"
statut: brouillon
duree_min: 75
objectifs:
  - id: O1
    texte: Choisir la fonction, les bornes et le calibre adaptés à une mesure de tension, de résistance, de continuité ou de jonction
    competences: [D3.1, D1.2]
  - id: O2
    texte: Déterminer la résolution d'un multimètre sur un calibre à partir de son nombre de points
    competences: [D3.1]
  - id: O3
    texte: Mesurer une résistance hors tension en corrigeant la résistance des cordons, et expliquer pourquoi une mesure en circuit peut être fausse
    competences: [D3.1]
prerequis: [S03]
exercices: [S04-L01-EX01, S04-L01-EX02, S04-L01-EX03]
references: [SRC-0008, SRC-0004]
criteres_evaluation:
  - objectif: O1
    critere: Questions du QCM sur le choix des bornes et des fonctions réussies, dont les questions « sécurité » à 100 %
  - objectif: O2
    critere: Exercice S04-L01-EX02 réussi
  - objectif: O3
    critere: Exercices S04-L01-EX01 et EX03 réussis
figures:
  - id: S04-F01
    fichier: ../figures/S04-F01-bornes-multimetre.svg
    legende: "Multimètre générique : afficheur, sélecteur de fonction et quatre bornes (A, mA, COM, VΩ). Les bornes de courant sont protégées par des fusibles. La disposition varie selon les modèles : se référer à la notice du sien."
    alt: "Dessin schématique d'un multimètre : un afficheur en haut, un sélecteur rotatif au centre avec les repères V, Ω, mA et A, et en bas quatre bornes nommées A, mA, COM et VΩ. Une légende indique que les bornes A et mA sont protégées par des fusibles et que la borne VΩ sert à la tension et à la résistance."
    origine: areprog
derniere_verification_sources: 2026-11-13
historique:
  - version: "0.1"
    date: 2026-11-13
    resume: Première rédaction
---

## Théorie

### Ce qu'il y a dans un multimètre

Un multimètre numérique mesure toujours, au fond, une **tension** : un convertisseur
analogique-numérique la transforme en nombre affiché. Les autres grandeurs y sont ramenées :

- une **résistance** se mesure en faisant passer un petit courant connu et en mesurant la tension obtenue (loi d'Ohm) ;
- un **courant** se mesure en le faisant passer dans une résistance de faible valeur interne, le shunt, et en mesurant la tension à ses bornes [SOURCÉ : SRC-0008 §DC and AC current].

Les bornes de courant (mA, A) passent par le shunt et par un fusible ; la borne VΩ présente au
contraire une résistance élevée. La disposition des bornes et leurs calibres varient selon les
modèles : seule la notice de **votre** multimètre fait foi [À VÉRIFIER : bornes, calibres et fusibles du multimètre de l'atelier, dans sa notice].

::figure{id=S04-F01}

### Choisir la fonction et les bornes

| Mesure | Fonction | Bornes | Branchement |
|---|---|---|---|
| Tension | V continu ou alternatif | COM et VΩ | En parallèle sur le point mesuré |
| Résistance, continuité, jonction | Ω, buzzer, diode | COM et VΩ | Circuit **hors tension** |
| Courant | mA ou A | COM et mA ou A | En série, circuit ouvert (leçon S04-L03) |

Le piège vu en S01 reste le premier risque : des cordons laissés dans une borne de courant
pendant une mesure de tension mettent le point mesuré en court-circuit à travers l'appareil
[SOURCÉ : SRC-0008 §Input protection].

### Résolution, digits et points

La **résolution** est le plus petit écart que l'afficheur peut montrer. On la décrit plus
précisément par le nombre de **points** (*counts*) que par le nombre de digits
[SOURCÉ : SRC-0008 §Resolution, digits and counts] :

- un multimètre « 3½ digits » affiche jusqu'à 1 999 points [SOURCÉ : SRC-0008 §Resolution, digits and counts] ;
- un multimètre de 3 200 points affiche le dixième de volt jusqu'à 320 V, ce que ne peut pas faire un 1 999 points à partir de 200 V [SOURCÉ : SRC-0008 §Resolution, digits and counts].

Sur un calibre donné, la résolution vaut **pleine échelle / nombre de points**. On choisit le plus
petit calibre qui contient la valeur : c'est celui qui affiche le plus de chiffres utiles.
Un multimètre à calibre automatique le fait seul, mais il faut savoir lire quel calibre il a choisi.

### Résistance, continuité et jonction

- Une résistance se mesure **circuit hors tension** [SOURCÉ : SRC-0008 §Resistance, continuity and diodes]. Sur une carte, on vérifie aussi que les condensateurs sont déchargés (règle de S01).
- Les cordons ont leur propre résistance, de 0,2 à 0,5 Ω en général ; elle se soustrait des faibles valeurs, et des cordons de plus de 1 Ω sont à remplacer [SOURCÉ : SRC-0008 §Resistance, continuity and diodes]. Méthode : mettre les pointes en contact, lire la valeur, la soustraire.
- La **continuité** est un test « passe / ne passe pas » qui distingue un circuit ouvert d'un circuit fermé ; le seuil du buzzer dépend du modèle [SOURCÉ : SRC-0008 §Continuity].
- Le **test de jonction** (diode) affiche la tension aux bornes d'une jonction parcourue par un petit courant : une jonction au silicium en sens direct doit afficher moins de 0,7 V, et se comporter en circuit ouvert en sens inverse [SOURCÉ : SRC-0008 §Diode test]. La diode est étudiée en S08.

### Pourquoi une mesure en circuit peut mentir

Sur une carte, une résistance est rarement seule : d'autres composants sont reliés à ses deux
bornes. L'ohmmètre mesure alors **l'association en parallèle** de la résistance et de tout ce qui
la contourne (S02). La valeur lue est donc **plus faible ou égale** à la vraie valeur, jamais
plus forte. Une valeur conforme en circuit n'est pas une preuve ; une valeur trop faible n'est
pas non plus la preuve d'un composant défectueux. En cas de doute, on dessoude une patte et on
mesure hors circuit.

### Exemple 1 : choisir un calibre

Un multimètre de 2 000 points propose les calibres 2 V, 20 V et 200 V [EXEMPLE]. On mesure une batterie d'environ 12,6 V [EXEMPLE].

1. Le calibre 2 V est trop petit : l'afficheur indiquerait un dépassement [EXEMPLE].
2. Calibre 20 V : résolution 20 / 2 000 = 0,01 V [EXEMPLE], affichage du type 12,60.
3. Calibre 200 V : résolution 200 / 2 000 = 0,1 V [EXEMPLE], affichage 12,6 seulement.
4. On choisit donc le calibre 20 V [EXEMPLE].

### Exemple 2 : corriger la résistance des cordons

On mesure une résistance de shunt et l'afficheur indique 1,2 Ω ; pointes en contact, il indique 0,3 Ω [EXEMPLE].

1. Résistance réelle : 1,2 − 0,3 = 0,9 Ω [EXEMPLE].
2. Sans correction, l'erreur aurait été de 0,3 / 0,9 = 33 % [EXEMPLE] : sur les faibles valeurs, la correction n'est pas un détail.

### Exemple 3 : une mesure en circuit trompeuse

Une résistance de 10 kΩ est reliée, sur la carte, à une autre résistance de 10 kΩ qui la contourne [EXEMPLE].

1. L'ohmmètre voit les deux en parallèle : 10 / 2 = 5 kΩ [EXEMPLE].
2. On pourrait conclure à tort que la résistance a dérivé de moitié [HYPOTHÈSE].
3. Une mesure hors circuit, une patte dessoudée, donne la vraie valeur.

## Exercices

::exercice{id=S04-L01-EX01}

::exercice{id=S04-L01-EX02}

::exercice{id=S04-L01-EX03}
