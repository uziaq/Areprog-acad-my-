---
id: S02-L01
titre: Grandeurs électriques et loi d'Ohm
chapitre: S02
version: "0.1"
statut: brouillon
duree_min: 120
objectifs:
  - id: O1
    texte: Convertir une valeur entre préfixes (micro, milli, kilo, méga) sans erreur d'ordre de grandeur
    competences: [D2.1]
  - id: O2
    texte: Calculer une tension, un courant ou une résistance avec la loi d'Ohm, unité comprise
    competences: [D2.2]
  - id: O3
    texte: Calculer la puissance dissipée par une résistance et la comparer à sa puissance nominale
    competences: [D2.2]
prerequis: [S01]
exercices: [S02-L01-EX01, S02-L01-EX02, S02-L01-EX03, S02-L01-EX04, S02-L01-EX05]
references: [SRC-0001]
criteres_evaluation:
  - objectif: O1
    critere: Exercice S02-L01-EX04 réussi et questions de conversion du QCM sans erreur
  - objectif: O2
    critere: Au moins 2 réponses justes sur 3 aux exercices EX01 à EX03, avec l'unité correcte
  - objectif: O3
    critere: Exercice S02-L01-EX05 réussi et question de sécurité sur la puissance nominale du QCM réussie
figures:
  - id: S02-F01
    fichier: ../figures/S02-F01-circuit-serie.svg
    legende: "Circuit élémentaire : une source de tension U alimente une résistance R ; l'ampèremètre, en série, mesure le courant I."
    alt: "Schéma d'un circuit fermé : source de tension continue à gauche, résistance R à droite, ampèremètre A placé en série sur le fil du haut, flèche du courant I dans le sens conventionnel."
    origine: areprog
derniere_verification_sources: 2026-11-13
historique:
  - version: "0.1"
    date: 2026-11-13
    resume: Première rédaction pour le prototype
---

## Théorie

### Les quatre grandeurs

| Grandeur | Symbole | Unité | Ce qu'elle représente |
|---|---|---|---|
| Tension | U | volt (V) | La « différence de pression » électrique entre deux points |
| Courant | I | ampère (A) | Le débit de charges qui traverse un conducteur |
| Résistance | R | ohm (Ω) | L'opposition d'un composant au passage du courant |
| Puissance | P | watt (W) | L'énergie convertie par seconde, ici en chaleur |

Une tension se mesure **entre deux points** : le voltmètre se branche en parallèle.
Un courant se mesure **à travers** un conducteur : l'ampèremètre se branche en série,
comme sur la figure ci-dessous. Le sens conventionnel du courant va de la borne + vers
la borne − à l'extérieur de la source.

::figure{id=S02-F01}

### Les préfixes

Les valeurs rencontrées sur une carte de calculateur couvrent des ordres de grandeur
très différents : quelques microampères de fuite, quelques kilohms de tirage, quelques
ampères dans un étage de sortie. Les préfixes évitent d'écrire des zéros.

| Préfixe | Symbole | Facteur |
|---|---|---|
| méga | M | 10⁶ = 1 000 000 |
| kilo | k | 10³ = 1 000 |
| milli | m | 10⁻³ = 0,001 |
| micro | µ | 10⁻⁶ = 0,000 001 |

Méthode sûre : convertir en unité de base (V, A, Ω) **avant** de calculer, puis
convertir le résultat dans l'unité la plus lisible.

### La loi d'Ohm

Pour une résistance, la tension à ses bornes est proportionnelle au courant qui la
traverse [SOURCÉ : SRC-0001 §1.2] :

**U = R × I**, donc **I = U / R** et **R = U / I**.

Analogie atelier : à pression égale, un tuyau plus étroit laisse passer moins de débit.
À tension égale, une résistance plus grande laisse passer moins de courant.

### La puissance

Une résistance transforme l'énergie électrique en chaleur. La puissance dissipée
vaut [SOURCÉ : SRC-0001 §1.2] :

**P = U × I**, et, en remplaçant avec la loi d'Ohm, **P = R × I²** ou **P = U² / R**.

Chaque résistance a une **puissance nominale** (indiquée par son fabricant). Si la
puissance dissipée la dépasse, le composant chauffe au-delà de ce qui est prévu,
change de valeur, puis peut brûler et abîmer la carte.

### Exemple 1 : calculer un courant

Une résistance de 220 Ω est alimentée sous 5 V [EXEMPLE].

1. Unités de base : U = 5 V, R = 220 Ω [EXEMPLE].
2. I = U / R = 5 / 220 = 0,0227 A [EXEMPLE].
3. Unité lisible : 0,0227 A × 1 000 = 22,7 mA [EXEMPLE].
4. Ordre de grandeur : 5 divisé par environ 200 donne environ 0,025 A [EXEMPLE] : cohérent.

### Exemple 2 : vérifier la puissance d'une résistance

Une résistance de 1 kΩ, de puissance nominale 0,25 W, est placée sous 12 V [EXEMPLE].

1. R = 1 kΩ = 1 000 Ω [EXEMPLE].
2. P = U² / R = 12² / 1 000 = 144 / 1 000 = 0,144 W [EXEMPLE].
3. 0,144 W est inférieur à 0,25 W [EXEMPLE] : la résistance convient, avec de la marge.
4. Sous 24 V, P = 576 / 1 000 = 0,576 W [EXEMPLE] : la même résistance serait surchargée.

### Exemple 3 : lien atelier, le faisceau oxydé

Une connexion oxydée se comporte comme une petite résistance en série. Supposons une
résistance de contact de 0,05 Ω traversée par 10 A [EXEMPLE].

1. Chute de tension dans le contact : U = R × I = 0,05 × 10 = 0,5 V [EXEMPLE].
2. Le récepteur reçoit 0,5 V de moins que la batterie [EXEMPLE], et seulement quand le courant circule : au repos, sans courant, la tension mesurée paraît normale.
3. Chaleur produite dans le contact : P = R × I² = 0,05 × 100 = 5 W [EXEMPLE], concentrés dans un petit volume.

C'est pourquoi une tension se contrôle **sous charge** : un voltmètre sur un circuit
au repos ne voit pas une résistance de contact.

## Manipuler

::simulateur{id=loi-ohm}

## Exercices

::exercice{id=S02-L01-EX01}

::exercice{id=S02-L01-EX02}

::exercice{id=S02-L01-EX03}

::exercice{id=S02-L01-EX04}

::exercice{id=S02-L01-EX05}
