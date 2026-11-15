---
id: S39-L02
titre: Valider avec l'outil de diagnostic
chapitre: S39
version: "0.1"
statut: brouillon
duree_min: 120
objectifs:
  - id: O1
    texte: Lire, interpréter et tracer les défauts avant et après l'échange, sans effacer avant le relevé complet et sans jamais toucher aux données de collision
    competences: [D10.6, D10.7]
  - id: O2
    texte: Comparer les valeurs réelles du calculateur réparé à celles du calculateur d'origine dans les mêmes conditions
    competences: [D10.7]
  - id: O3
    texte: Réaliser, d'après la procédure du constructeur, les apprentissages, tests d'actionneurs et essais prévus, et noter ceux que l'atelier ne peut pas faire
    competences: [D10.7]
prerequis: [S39-L01, S23, S30]
exercices: [S39-L02-EX01, S39-L02-EX02, S39-L02-EX03]
references: [SRC-0099]
criteres_evaluation:
  - objectif: O1
    critere: Exercice S39-L02-EX01 réussi et défauts tracés avant et après au TP-58
  - objectif: O2
    critere: Exercice S39-L02-EX02 réussi et tableau de valeurs réelles comparées au TP-58
  - objectif: O3
    critere: Exercice S39-L02-EX03 réussi et essais du constructeur listés, faits ou non faits, au TP-58
figures:
  - id: S39-F02
    fichier: ../figures/S39-F02-dossier-trois-parties.svg
    legende: "Les trois parties du dossier de validation renforcée : validé sur banc (mesures, captures comparées à la référence), validé sur véhicule (défauts, valeurs réelles, apprentissages, essais), non validable en atelier (ce qui reste à faire, et pourquoi). Aucun calculateur de sécurité n'est remis en circulation pendant le cursus (D-14). Méthode de l'académie."
    alt: "Un bloc en haut, dossier de validation renforcée, relié par trois flèches à trois blocs : validé sur banc, validé sur véhicule, et non validable en pointillés."
    origine: areprog
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction
---

## Théorie

### Les défauts, avant et après

Un calculateur surveille en permanence son fonctionnement (horloges, régulateurs, sommes de contrôle des mémoires) et mémorise un défaut quand une surveillance réagit [SOURCÉ : SRC-0099 §Managing random and systematic faults].
L'échange d'un calculateur laisse souvent des défauts de communication dans les autres calculateurs, mémorisés pendant que le calculateur était débranché [HYPOTHÈSE : à constater sur le véhicule d'atelier].

La règle de l'atelier :

1. lire et enregistrer tous les défauts de **tous** les calculateurs avant l'échange (capture ou rapport de l'outil) ;
2. après l'échange, lire de nouveau et enregistrer ;
3. effacer seulement les défauts ordinaires, une fois le relevé complet enregistré, puis vérifier lesquels reviennent ;
4. ne jamais effacer ni modifier une donnée de collision : le cursus ne l'enseigne pas.

Un défaut qui revient après effacement est une information sur l'état réel ; un défaut qui ne revient pas était probablement lié à l'échange [HYPOTHÈSE : à confirmer par un cycle d'essai complet].

### Les valeurs réelles

L'outil affiche des valeurs réelles : tensions, températures, états de contacteurs, signaux de capteurs [À VÉRIFIER : valeurs proposées par l'outil pour le calculateur étudié].
On relève les **mêmes** valeurs avec le calculateur d'origine puis avec le calculateur réparé, moteur
dans le même état, et l'on compare. Un écart net sur une seule valeur oriente vers l'entrée
correspondante (S29), à condition que le capteur et le câblage soient les mêmes [HYPOTHÈSE].

### La communication

Un calculateur réparé qui ne répond pas à l'outil, ou que les autres calculateurs ne voient pas,
renvoie aux contrôles de S23 et S24 : alimentation et masse du calculateur, bus, terminaison, connecteur [HYPOTHÈSE : ordre des contrôles de l'académie].
On contrôle d'abord ce qui est hors du calculateur, batterie débranchée, avant de remettre en cause la réparation.

### Apprentissages, codages et tests d'actionneurs

Après un échange, le constructeur prévoit souvent des apprentissages (ralenti, papillon, positions
d'embrayage ou de boîte), parfois un codage [À VÉRIFIER : opérations prévues par le constructeur pour le calculateur étudié].
On les fait avec l'outil, selon la procédure, en notant chaque opération et son résultat.
Les tests d'actionneurs commandent une sortie depuis l'outil : on n'en lance un qu'après avoir vérifié
que l'actionneur peut bouger sans danger (ventilateur, papillon, essuie-glace) [HYPOTHÈSE : conditions à lire dans la procédure de l'outil].

### Ce que l'atelier ne peut pas faire

Certains essais du constructeur demandent un roulage, une piste, un équipement absent de l'atelier.
Ils vont dans la partie « non validable en atelier » du dossier, avec leur raison (S39-L03).

::figure{id=S39-F02}

Écrire
« validé » pour un essai non fait est une faute de dossier.

### Exemple 1 : trier les défauts

Après l'échange d'un calculateur de boîte, l'outil montre trois défauts [EXEMPLE] :

1. perte de communication avec la boîte, dans le calculateur moteur : mémorisée pendant le débranchement [HYPOTHÈSE] ;
2. défaut de capteur de vitesse de sortie dans le calculateur réparé : à confirmer par la mesure [HYPOTHÈSE] ;
3. après effacement des défauts ordinaires, seul le second revient : on cherche dans le capteur, le câblage, puis l'entrée réparée.

### Exemple 2 : comparer une valeur réelle

Température d'eau lue moteur froid : 18 avec le calculateur d'origine, 85 avec le calculateur réparé, même moteur, même heure [EXEMPLE].

1. L'écart est trop grand pour être une dispersion [HYPOTHÈSE].
2. Contrôler l'entrée de la sonde sur la carte réparée (S29-L01) et la référence de tension [HYPOTHÈSE].
3. Noter l'écart dans le dossier, même s'il disparaît ensuite.

### Exemple 3 : un essai non faisable

Le constructeur prévoit un essai sur route pour l'apprentissage complet de la boîte [EXEMPLE].

1. L'atelier n'a pas de voie privée [EXEMPLE].
2. L'essai va dans « non validable en atelier », avec cette raison.
3. Le calculateur n'est pas déclaré entièrement validé.

## Exercices

::exercice{id=S39-L02-EX01}

::exercice{id=S39-L02-EX02}

::exercice{id=S39-L02-EX03}
