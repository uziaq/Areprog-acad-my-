---
id: S33-L02
titre: Le protocole de validation d'une réparation
chapitre: S33
version: "0.1"
statut: brouillon
duree_min: 120
objectifs:
  - id: O1
    texte: Définir, avant l'essai, un protocole de validation (essais fonctionnels, mêmes mesures avant et après, contraintes appliquées, durée d'essai, critères d'arrêt et de réussite)
    competences: [D10.4]
  - id: O2
    texte: Distinguer ce qu'un banc d'atelier peut valider de ce qu'il ne peut pas valider, et l'écrire comme limite
    competences: [D10.4]
prerequis: [S30, S33-L01]
exercices: [S33-L02-EX01, S33-L02-EX02, S33-L02-EX03]
references: [SRC-0095, SRC-0094]
criteres_evaluation:
  - objectif: O1
    critere: Exercices S33-L02-EX01 et S33-L02-EX02 réussis et protocole écrit avant l'essai au TP-50
  - objectif: O2
    critere: Exercice S33-L02-EX03 réussi et limites de validation écrites au TP-50
figures:
  - id: S33-F02
    fichier: ../figures/S33-F02-validation.svg
    legende: "Protocole de validation de l'académie : écrire le protocole avant l'essai, refaire les mesures d'avant la réparation, essais fonctionnels sur banc, contraintes qui faisaient apparaître la panne, durée d'essai, puis conclusion qui sépare validé et non validé. Méthode pédagogique de l'académie."
    alt: "Six cases en deux rangées reliées par des flèches : protocole écrit, mesures avant et après, essais fonctionnels, contraintes, durée d'essai, conclusion avec limites."
    origine: areprog
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction
---

## Théorie

### Pourquoi valider

Une réparation n'est terminée que lorsqu'on a prouvé qu'elle tient. Le cas VID-12 du catalogue
montre l'inverse : une panne déclarée « résolue » parce qu'une tension est revenue, sans essai
fonctionnel ni recherche de la cause (remarque E-28). Valider, c'est refaire, dans des conditions
écrites à l'avance, les essais qui montraient la panne, et constater qu'elle ne revient plus
[EXEMPLE : méthode pédagogique de l'académie].

### Écrire le protocole avant l'essai

Le protocole est écrit **avant** l'essai, pour ne pas ajuster les critères au résultat. Il contient
[EXEMPLE : méthode pédagogique de l'académie] :

1. **Mesures avant / après** : les mêmes mesures qu'au diagnostic, aux mêmes points, avec les mêmes instruments, comparées à la référence.
2. **Essais fonctionnels** : ce que le calculateur doit faire sur banc (communication, lecture des défauts, sorties sur charge, entrées simulées).
3. **Contraintes** : celles qui faisaient apparaître la panne (froid, chaleur douce, pression), appliquées de la même façon.
4. **Durée d'essai** : temps de fonctionnement et nombre de cycles, justifiés par la nature de la panne.
5. **Critères de réussite** et **critères d'arrêt** : ce qui valide, ce qui fait arrêter l'essai aussitôt (limitation de courant, échauffement, odeur, fumée).

### Durée d'essai et cyclage

Les essais de fiabilité des fabricants cyclent la température en enceinte, par exemple de 0 °C à 100 °C [SOURCÉ : SRC-0095 §3 Test Method]
ou de −40 °C à 125 °C [SOURCÉ : SRC-0095 §3 Test Method] ; un atelier n'a en général pas
d'enceinte climatique [À VÉRIFIER : équipement de l'atelier]. Sur banc, on applique des cycles
simples et contrôlés (bombe de froid, chaleur douce, repos) [SOURCÉ : SRC-0094 §How To Use Freeze Spray],
et l'on note leur nombre. La durée d'essai n'est pas normalisée pour un atelier : elle est choisie et
justifiée par écrit [HYPOTHÈSE : règle de l'académie, à confirmer par Arthur].

### Les limites d'un banc d'atelier

Un banc ne reproduit pas tout le véhicule : charges simulées, capteurs simulés, absence des autres
calculateurs, de la température réelle et des vibrations [HYPOTHÈSE : limites générales, à préciser
pour chaque calculateur]. Ce qui n'a pas été essayé n'est pas validé : la conclusion l'écrit, et
recommande les contrôles à faire sur le véhicule (faisceau, charge, alimentation) quand la cause de la
panne peut venir de là.

Les calculateurs liés à la sécurité (airbag, ABS / ESP, direction) suivent un protocole renforcé de
validation, vu en M9.

::figure{id=S33-F02}

### Exemple 1 : un protocole pour une soudure reprise

Panne : reset au froid, soudure d'un condensateur de régulateur reprise [EXEMPLE].

1. Mesures avant / après : rail du régulateur, reset, courant de borne 30, comparés à la référence.
2. Contrainte : givre sur la même zone, cinq passages, reset surveillé en déclenchement normal [EXEMPLE].
3. Durée : 30 min de fonctionnement après les passages, sans reset [EXEMPLE] ; critère d'arrêt : passage en limitation de courant.

### Exemple 2 : une durée d'essai en secondes

Trois cycles de 20 min chacun [EXEMPLE].

1. 3 × 20 min = 60 min [EXEMPLE].
2. Soit 3 600 s [EXEMPLE].
3. La durée est notée au dossier, avec l'heure de début et de fin.

### Exemple 3 : écrire une limite

Une sortie d'injecteur réparée commute sur charge simulée au banc [EXEMPLE].

1. Validé : commutation sur charge simulée, courant comparé à la référence.
2. Non validé : fonctionnement sur le moteur, état du faisceau et de l'injecteur [HYPOTHÈSE].
3. Recommandation : contrôle du faisceau et de l'injecteur avant remontage.

## Exercices

::exercice{id=S33-L02-EX01}

::exercice{id=S33-L02-EX02}

::exercice{id=S33-L02-EX03}
