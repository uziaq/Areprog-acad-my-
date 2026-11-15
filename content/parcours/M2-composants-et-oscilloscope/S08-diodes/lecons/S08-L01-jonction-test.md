---
id: S08-L01
titre: La jonction PN, la diode de redressement et son test au multimètre
chapitre: S08
version: "0.1"
statut: brouillon
duree_min: 90
objectifs:
  - id: O1
    texte: Expliquer le comportement d'une diode en direct et en inverse, et repérer son anode et sa cathode
    competences: [D4.3]
  - id: O2
    texte: Tester une diode au multimètre (fonction test de jonction) et interpréter un résultat sain, en court-circuit ou coupé
    competences: [D4.3, D4.2]
  - id: O3
    texte: Expliquer le redressement simple et double alternance, et lire les valeurs nominales d'une diode dans sa fiche technique
    competences: [D4.3, D4.6]
prerequis: [S07]
exercices: [S08-L01-EX01, S08-L01-EX02, S08-L01-EX03]
references: [SRC-0011, SRC-0008]
criteres_evaluation:
  - objectif: O1
    critere: Questions du QCM sur le sens de la diode réussies et seuil relevé sur la courbe du TP-11
  - objectif: O2
    critere: Exercice S08-L01-EX01 réussi et diode testée et conclue au TP-11
  - objectif: O3
    critere: Exercices S08-L01-EX02 et EX03 réussis
figures:
  - id: S08-F01
    fichier: ../figures/S08-F01-diode.svg
    legende: "La diode : symbole (anode, cathode), composant traversant avec sa bague côté cathode, et allure de la caractéristique I(U) : presque aucun courant sous le seuil en direct, puis une montée rapide ; un très faible courant en inverse jusqu'au claquage."
    alt: "À gauche, le symbole de la diode : un triangle pointant vers une barre, l'anode côté triangle, la cathode côté barre. Au centre, un cylindre avec une bague à une extrémité, marquée cathode. À droite, un graphique courant en fonction de la tension : la courbe reste presque à zéro puis monte brusquement après le seuil en direct ; à gauche de l'axe, elle reste très proche de zéro puis plonge au claquage."
    origine: areprog
derniere_verification_sources: 2026-11-14
historique:
  - version: "0.1"
    date: 2026-11-14
    resume: Première rédaction
---

## Théorie

### Une valve à courant

Une diode laisse passer le courant dans un sens, de l'**anode** vers la **cathode**, et le bloque
dans l'autre. Sur le symbole, la flèche (le triangle) est l'anode et la barre est la cathode ; sur
le composant, une bague repère la cathode [SOURCÉ : SRC-0011 §Introduction].

::figure{id=S08-F01}

- **En direct**, la diode conduit une fois franchie sa tension de seuil : environ 0,7 V pour une diode au silicium, 0,3 V pour une diode au germanium [SOURCÉ : SRC-0011 §Introduction].
- **En inverse**, elle bloque le courant ; seul passe un très faible courant de fuite, en général négligeable [SOURCÉ : SRC-0011 §Introduction].
- Si la tension inverse devient trop forte, la diode **claque** ; pour une diode de redressement, ce claquage est en général destructeur [SOURCÉ : SRC-0011 §Introduction].

La tension de seuil n'est pas une constante : elle dépend du courant et de la température. Elle
se lit sur les courbes de la fiche technique.

### Tester une diode au multimètre

La fonction **test de jonction** fait passer un petit courant et affiche la chute de tension
directe de la diode, en volts [SOURCÉ : SRC-0011 §Meter check of a diode]. La note Fluke
précise qu'une jonction au silicium saine en direct doit afficher moins de 0,7 V [SOURCÉ : SRC-0008 §Diode test],
et se comporter en circuit ouvert en inverse [SOURCÉ : SRC-0008 §Diode test].

| Résultat en direct | Résultat en inverse | Interprétation |
|---|---|---|
| Une tension de seuil plausible | Dépassement (circuit ouvert) | Jonction saine |
| Près de 0 V | Près de 0 V | Diode en court-circuit [HYPOTHÈSE] |
| Dépassement | Dépassement | Diode coupée [HYPOTHÈSE] |

Ces deux derniers cas se déduisent du comportement normal ; on les confirme hors circuit. En
circuit, d'autres composants reliés aux bornes de la diode faussent le test (S04-L01, S07-L03).

### Les valeurs nominales d'une diode

La fiche technique d'une diode de redressement donne notamment [SOURCÉ : SRC-0011 §Diode ratings] :

- la **tension inverse répétitive maximale** (VRRM) et la tension inverse continue maximale ;
- le **courant direct moyen maximal** (IF(AV)) et le courant de surcharge de pointe (IFSM) ;
- la dissipation maximale, la température de jonction, la résistance thermique ;
- le courant inverse maximal et le **temps de recouvrement inverse** (trr).

On choisit une diode dont la tension inverse et le courant direct dépassent, avec marge, ce
qu'elle verra dans le circuit ; ce sont des valeurs maximales, à ne pas atteindre (S07-L03).

### Le redressement

- **Simple alternance** : une diode ne laisse passer qu'une alternance ; la sortie est continue mais très pulsée [SOURCÉ : SRC-0011 §Rectifier circuits].
- **Double alternance, pont de diodes** : quelle que soit la polarité de l'entrée, le courant traverse la charge dans le même sens [SOURCÉ : SRC-0011 §Rectifier circuits]. Le courant traverse deux diodes : on perd deux seuils, soit environ 1,4 V pour des diodes au silicium [SOURCÉ : SRC-0011 §Rectifier circuits].

Un condensateur placé après le redresseur lisse la tension pulsée (S05). Le pont de diodes
protège aussi contre l'inversion de polarité d'une alimentation continue : le courant arrive
dans le bon sens quel que soit le branchement, au prix de deux seuils.

### Exemple 1 : sens de conduction

Une diode au silicium est en série avec une résistance de 1 kΩ, sous 5 V [EXEMPLE].

1. Anode côté + : la diode conduit ; tension aux bornes de la résistance : 5 − 0,7 = 4,3 V [EXEMPLE].
2. Courant : 4,3 / 1 000 = 4,3 mA [EXEMPLE].
3. Diode retournée : elle bloque ; le courant est pratiquement nul et presque toute la tension se retrouve aux bornes de la diode [EXEMPLE].

### Exemple 2 : interpréter un test de jonction

Hors circuit, une diode affiche 0,56 V dans un sens et un dépassement dans l'autre [EXEMPLE].

1. Une tension de seuil plausible en direct, circuit ouvert en inverse : comportement d'une jonction saine.
2. Le sens qui affiche 0,56 V [EXEMPLE] est celui où la pointe rouge est sur l'anode.
3. On peut ainsi retrouver l'anode d'une diode dont le repère est effacé.

### Exemple 3 : sortie d'un pont

Un pont de diodes au silicium reçoit une tension dont la valeur crête vaut 12 V [EXEMPLE].

1. Valeur crête en sortie : 12 − 1,4 = 10,6 V [EXEMPLE].
2. Chaque diode doit tenir en inverse au moins la valeur crête, avec marge : on choisit une VRRM nettement supérieure à 12 V [EXEMPLE].

## Exercices

::exercice{id=S08-L01-EX01}

::exercice{id=S08-L01-EX02}

::exercice{id=S08-L01-EX03}
