# 4. Évaluation

## Ce qui est évalué, et comment

| Niveau | Fréquence | Forme | Seuil de validation |
|---|---|---|---|
| Cours (hebdomadaire) | Chaque semaine | QCM de 15 à 20 questions + évaluation pratique courte (le TP noté) | QCM ≥ 80 % **et** 100 % sur les questions « sécurité » ; évaluation pratique ≥ 70 % sans critère éliminatoire |
| Fil rouge microsoudure | Chaque semaine (S4–S25) | Photo microscope + grille | Critère de réussite de l'exercice atteint |
| Jalon 1 | S14 | Écrit + pratique chronométrée | ≥ 70 % à chaque épreuve |
| Jalon 2 | S25 | Écrit + pratique + épreuve fil rouge | ≥ 70 % à chaque épreuve |
| Évaluation finale | S32 | Réparation complète + dossier + QCM de synthèse | ≥ 75 % global, aucun critère éliminatoire |

Ces seuils sont des propositions (voir [décisions](08-decisions-et-lacunes.md)).

## Règles générales

- **Corrigé séparé** : le corrigé n'est accessible qu'après soumission des réponses. Il explique chaque réponse, y compris pourquoi les distracteurs sont faux.
- **Questions « sécurité »** : signalées dans chaque QCM ; une seule erreur impose de refaire la partie sécurité du cours.
- **Échec** : remédiation ciblée (relire les sections liées aux questions ratées, refaire les exercices associés) puis nouveau QCM tiré dans une autre banque de questions. Deux échecs consécutifs : la semaine est rejouée avant de continuer.
- **Auto-évaluation honnête** : sans correcteur humain, les preuves (photos microscope, captures d'oscilloscope, tableaux de mesure) sont obligatoires pour chaque critère pratique. Une évaluation sans preuve vaut 0.
- **Validation des compétences** : une compétence du [référentiel](01-referentiel-competences.md) est validée au niveau visé quand la semaine qui l'enseigne **et** le jalon qui la vérifie sont validés.

## Grille générique d'évaluation pratique (hebdomadaire)

| Critère | Poids | Éliminatoire si… |
|---|---|---|
| Sécurité (ESD, limitation de courant, instruments adaptés, EPI) | — | Toute faute de sécurité |
| Préparation (schéma, valeurs théoriques calculées, tolérance justifiée avant la mesure) | 20 % | Absence de valeur théorique |
| Exécution des mesures (calibre, raccordement, référence de masse) | 30 % | — |
| Exactitude (mesure dans la tolérance justifiée, ou écart expliqué correctement) | 25 % | Écart non expliqué présenté comme correct |
| Documentation (journal complet, photos, étiquettes de fiabilité) | 15 % | — |
| Analyse (conclusion, erreurs identifiées, amélioration proposée) | 10 % | — |

## Jalon 1 (S14)

- **Écrit (2 h)** : 10 calculs (Ohm, Kirchhoff, diviseurs, RC, puissance, incertitude) ; 1 schéma public à découper en blocs ; 20 questions sur composants et instruments.
- **Pratique (3 h)** : sur une carte d'entraînement préparée, identifier 10 composants, en tester 5 hors circuit, mesurer 3 points au multimètre et 2 signaux à l'oscilloscope, avec valeurs théoriques et tolérances.
- **Mini-projet (3 h)** : carte « entrée capteur + transistor de sortie + LED » réalisée, mesurée, documentée.
- **Compétences vérifiées** : D2.1 à D2.7, D3.1 à D3.5, D3.7, D4.1 à D4.6, D5.1 à D5.4.

## Jalon 2 (S25)

- **Écrit (2 h)** : alimentations (dissipation, buck), logique et numération, mémoires, CAN / LIN.
- **Pratique (4 h)** : localiser un court-circuit sur une carte préparée ; vérifier les conditions de vie d'un MCU ; lire et sauvegarder une EEPROM avec vérification d'empreinte ; diagnostiquer 2 pannes de bus CAN.
- **Compétences vérifiées** : D6.1 à D6.4, D7.1 à D7.5, D8.1 à D8.3, D3.6.

## Épreuve du fil rouge (S25)

| Épreuve | Critère |
|---|---|
| 10 passifs 0805 posés | ≥ 9 conformes au microscope |
| 1 SOIC-8 déposé et reposé | Aucun pont, continuité de chaque broche, pastilles intactes |
| 1 TSSOP reposé | Aucun pont, alignement correct |
| 1 strap en fil émaillé | Continuité, fixation, isolation |

Échec : 2 semaines de fil rouge supplémentaires avant l'entrée en M7 (décalage du planning à prévoir).

## Évaluation finale (S32)

| Critère | Poids | Éliminatoire si… |
|---|---|---|
| Sécurité tout au long de l'épreuve | — | Toute faute de sécurité |
| Méthode de diagnostic (hypothèses étiquetées, ordre logique des mesures) | 25 % | Remplacement de composant sans mesure qui le justifie |
| Exactitude du diagnostic | 20 % | — |
| Qualité de la réparation (critères de microsoudure) | 20 % | Dommage à la carte non signalé |
| Validation (protocole, mesures avant / après, limites déclarées) | 15 % | Validation déclarée complète alors qu'elle ne l'est pas |
| Dossier de réparation (traçabilité, sources, étiquettes) | 10 % | Donnée inventée ou non sourcée présentée comme un fait |
| QCM de synthèse | 10 % | — |

## Structure des QCM

- 15 à 20 questions par semaine, tirées d'une banque d'au moins 40 questions par cours (pour permettre les reprises).
- Types : choix unique, choix multiple, calcul numérique avec tolérance de réponse, lecture de schéma ou de capture d'oscilloscope, ordonnancement d'une procédure.
- Chaque question est rattachée à un ou plusieurs codes de compétence et à une section du cours.
- Chaque question indique la source de la bonne réponse (section du cours, norme, datasheet).
