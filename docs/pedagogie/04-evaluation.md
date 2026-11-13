# 4. Évaluation

> Version 0.3 : jalon 3 en S34 (condition d'entrée en M9), grille « protocole renforcé »,
> liste des fautes de sécurité éliminatoires, évaluateur tiers obligatoire pour les
> pannes des jalons 3 et de l'examen final, examen final sur deux semaines (S40–S41).

## Ce qui est évalué, et comment

| Niveau | Quand | Forme | Seuil de validation |
|---|---|---|---|
| Cours (hebdomadaire) | Chaque semaine de cours | QCM de 15 à 20 questions + évaluation pratique courte (le TP noté) | QCM ≥ 80 % **et** 100 % sur les questions « sécurité » ; pratique ≥ 70 % sans faute éliminatoire |
| Fil rouge microsoudure | S4–S23 | Photo microscope + critère de l'exercice | Critère de réussite atteint |
| Épreuve du fil rouge | S24 | Épreuve pratique | Grille ci-dessous ; condition d'entrée en M7 |
| Jalon 1 | S14 | Écrit + pratique chronométrée + mini-projet | ≥ 70 % à chaque épreuve |
| Jalon 2 | S25 | Écrit + pratique (dont TP-36) | ≥ 70 % à chaque épreuve |
| Jalon 3 | S34 | Diagnostic chronométré sur calculateur réel, panne scellée par un tiers | ≥ 75 %, aucune faute éliminatoire ; condition d'entrée en M9 |
| Grille protocole renforcé | Chaque TP de M9 | Grille dédiée | 100 % des critères éliminatoires respectés |
| Évaluation finale | S40–S41 | Épreuve chronométrée + validation + dossier + QCM | ≥ 75 % global, aucune faute éliminatoire |

Ces seuils sont des propositions (voir [décisions](08-decisions-et-lacunes.md)).

## Règles générales

- **Corrigé séparé** : accessible seulement après soumission. Il explique chaque réponse, y compris pourquoi les distracteurs sont faux.
- **Questions « sécurité »** : signalées dans chaque QCM ; une seule erreur impose de refaire la partie sécurité du cours.
- **Échec** : remédiation ciblée puis nouveau QCM tiré dans la banque. Deux échecs consécutifs : la semaine est rejouée. Un jalon échoué est repassé après au moins une semaine de remédiation (semaines tampon du calendrier).
- **Preuves obligatoires** : photos microscope, captures d'oscilloscope, tableaux de mesure. Un critère sans preuve vaut 0.
- **Tiers obligatoire** : les pannes du jalon 3 et de l'examen final sont préparées, scellées (photo + description sous enveloppe ou fichier chiffré) et corrigées par une autre personne (électronicien, collègue). Pour les jalons 1 et 2, il est recommandé.
- **Validation des compétences** : une compétence est validée au niveau visé quand la semaine qui l'enseigne **et** l'épreuve qui la vérifie (colonne « Vérifiée par » du [référentiel](01-referentiel-competences.md)) sont validées.

## Fautes de sécurité éliminatoires

Une seule de ces fautes rend l'évaluation pratique nulle, quel que soit le reste.

| Module | Faute éliminatoire |
|---|---|
| Tous | Manipulation de carte hors poste ESD ou sans bracelet ; alimentation non limitée en courant ou limite non écrite ; inversion de polarité non protégée ; instrument utilisé hors de sa catégorie de mesure |
| M1–M2 | Mesure de courant sur un calibre ou des bornes inadaptés ; condensateur non déchargé avant manipulation |
| M2 et suivants | Masse de sonde d'oscilloscope reliée à un nœud non référencé à la masse |
| M4 et suivants | Calculateur réel mis sous tension sans procédure progressive ; tension interne élevée non identifiée ou décharge non mesurée |
| M5 | Écriture mémoire sans double sauvegarde vérifiée par empreinte |
| M7 | Air chaud sans protection des composants voisins sensibles ; travail sans aspiration des fumées |
| M8 | Remplacement de composant sans mesure qui le justifie ; donnée inventée présentée comme un fait |
| M9 | Toute faute de la grille « protocole renforcé » ; tout manquement aux règles de sécurité véhicule |

## Grille générique d'évaluation pratique (hebdomadaire)

| Critère | Poids | Éliminatoire si… |
|---|---|---|
| Sécurité | — | Une faute de la liste ci-dessus |
| Préparation (schéma, valeurs théoriques calculées, tolérance justifiée et limite de courant écrite avant la mesure) | 20 % | Absence de valeur théorique |
| Exécution des mesures (calibre, raccordement, référence de masse) | 30 % | — |
| Exactitude (mesure dans la tolérance justifiée, ou écart expliqué correctement) | 25 % | Écart non expliqué présenté comme correct |
| Documentation (journal complet, photos, étiquettes de fiabilité) | 15 % | — |
| Analyse (conclusion, erreurs identifiées, amélioration proposée) | 10 % | — |

## Jalon 1 (S14)

8 h d'épreuves, sans révision (faite en S12–S13).

- **Écrit (2 h)** : 10 calculs (Ohm, Kirchhoff, diviseurs, RC, puissance, incertitude) ; 1 schéma public à découper en blocs ; 20 questions sur composants et instruments.
- **Pratique (3 h)** : sur une carte d'entraînement préparée, identifier 10 composants, en tester 5 hors circuit, mesurer 3 points au multimètre et 2 signaux à l'oscilloscope, avec valeurs théoriques et tolérances.
- **Mini-projet (3 h)** : carte « entrée capteur + transistor de sortie + LED » réalisée, mesurée, documentée.
- **Compétences vérifiées** : D2.1 à D2.7, D3.1 à D3.5, D3.7, D4.1 à D4.6, D5.1 à D5.4.

## Épreuve du fil rouge (S24)

| Épreuve | Critère |
|---|---|
| 10 passifs 0805 posés | ≥ 9 conformes au microscope |
| 1 SOIC-8 déposé au fer et reposé | Aucun pont, continuité de chaque broche, pastilles intactes |
| 1 TSSOP reposé | Aucun pont, alignement correct |
| 1 strap en fil émaillé | Continuité, fixation, isolation |

Échec : 2 séances de fil rouge supplémentaires avant l'entrée en M7 (semaines tampon).

## Jalon 2 (S25)

- **Écrit (2 h)** : alimentations (dissipation, buck), logique et numération, mémoires, CAN / LIN.
- **Pratique (5 h)** : localiser un court-circuit sur une carte préparée ; vérifier les conditions de vie d'un MCU ; lire et sauvegarder une EEPROM avec vérification d'empreinte ; diagnostiquer les pannes de bus de TP-36.
- **Évaluation et journal (1 h)**.
- **Compétences vérifiées** : D6.1 à D6.4, D7.1 à D7.5, D8.1 à D8.3, D3.6.

## Jalon 3 (S34)

- **Pratique chronométrée (6 h)** : calculateur de récupération (ECU, TCU ou carrosserie) avec une panne de niveau carte préparée et scellée par un tiers ; diagnostic, réparation, validation sur banc, dossier.
- **Contrôle de microsoudure (1 h)** : la réparation et une dépose / repose imposée sont contrôlées au microscope selon les critères de M7.
- **Entretien de restitution (1 h)** avec le tiers, ou enregistrement vidéo commenté si le tiers est absent.
- **Compétences vérifiées** : D1.1 à D1.6, D4.7, D9.2 à D9.5, D10.1 à D10.5.
- **Conséquence** : l'entrée en M9 est impossible sans jalon 3 réussi.

| Critère | Poids | Éliminatoire si… |
|---|---|---|
| Sécurité (protocole commun calculateurs réels) | — | Une faute de la liste |
| Méthode (hypothèses étiquetées, ordre logique, diagnostic comparatif si deux exemplaires) | 30 % | Remplacement sans mesure qui le justifie |
| Exactitude du diagnostic | 25 % | — |
| Qualité de la réparation | 20 % | Dommage non signalé |
| Validation sur banc et limites déclarées | 15 % | Validation déclarée complète alors qu'elle ne l'est pas |
| Dossier | 10 % | Donnée inventée |

## Grille « protocole renforcé » (M9)

Appliquée à chaque TP de M9 et à toute intervention sur calculateur de sécurité. Chaque ligne exige une preuve.

| Critère éliminatoire | Preuve attendue |
|---|---|
| Aucun élément pyrotechnique présent à l'atelier de formation | Photo du poste, déclaration au dossier |
| Décharge de la réserve d'énergie **mesurée** avant manipulation | Capture ou photo de la mesure |
| Double sauvegarde mémoire avec empreintes identiques | Empreintes au dossier |
| Mémoire d'événements notée sans modification | Lecture avant / après |
| Charges de substitution d'origine sourcée (valeur et source) | Fiche source |
| Alimentation limitée, limite écrite avant mise sous tension | Photo du réglage, ligne du protocole |
| Sur véhicule : tous les allumeurs remplacés par des simulateurs avant mise sous tension d'un calculateur d'airbag réparé | Photos, liste des connecteurs |
| Sur véhicule : essais de freinage statiques avant tout déplacement (ABS / ESP) ; calibrations constructeur faites (direction) | Rapport de l'outil de diagnostic |
| Critères d'arrêt écrits avant l'essai | Ligne du protocole |

## Évaluation finale (S40–S41)

- **S40 (chronométré)** : 6 h de diagnostic et réparation sur un calculateur inconnu, panne préparée et scellée par un tiers ; 2 h de QCM de synthèse.
- **S41 (hors chronomètre)** : validation sur banc, puis sur véhicule d'atelier si le calculateur s'y prête (règles de M9) ; dossier complet ; auto-évaluation du référentiel avec preuves ; entretien de restitution avec le tiers.

| Critère | Poids | Éliminatoire si… |
|---|---|---|
| Sécurité tout au long de l'épreuve | — | Une faute de la liste (dont grille protocole renforcé si calculateur de sécurité) |
| Méthode de diagnostic | 25 % | Remplacement de composant sans mesure qui le justifie |
| Exactitude du diagnostic | 20 % | — |
| Qualité de la réparation | 20 % | Dommage à la carte non signalé |
| Validation (protocole, mesures avant / après, limites déclarées) | 15 % | Validation déclarée complète alors qu'elle ne l'est pas |
| Dossier de réparation | 10 % | Donnée inventée ou non sourcée présentée comme un fait |
| QCM de synthèse | 10 % | — |

**Compétences vérifiées** : D10.6 à D10.8, et confirmation de l'ensemble du référentiel.

## Structure des QCM

- 15 à 20 questions par semaine, tirées d'une banque de **25 questions par cours**, dont des questions de calcul **paramétrées** (valeurs tirées au hasard dans une plage [EXEMPLE]) qui permettent les reprises sans multiplier les questions à rédiger.
- Types : choix unique, choix multiple, calcul numérique avec tolérance de réponse, lecture de schéma ou de capture d'oscilloscope, ordonnancement d'une procédure.
- Chaque question est rattachée à un ou plusieurs codes de compétence et à une section du cours, et indique la source de la bonne réponse.
