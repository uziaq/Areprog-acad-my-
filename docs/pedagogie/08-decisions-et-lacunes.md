# 8. Décisions à valider et lacunes

## Décisions à valider

Pour chaque décision, une option est appliquée par défaut dans les documents. Arthur peut la changer ; les documents seront mis à jour en conséquence.

| # | Décision | Options | Appliqué par défaut | Pourquoi |
|---|---|---|---|---|
| D-01 | Organisation de la microsoudure | A. Fil rouge 1 h / semaine (20 séances, S4–S24) puis bloc intensif S26–S28 ; B. Bloc unique plus long en fin de cursus | **A** | Le geste demande de la répétition espacée |
| D-02 | Calculateurs d'airbag | A. Exclus ; B. Diagnostic et réparation avec protocole renforcé | **B — validé par Arthur le 13/11/2026** | Traités en S35, S36 et S39, sans pyrotechnie à l'atelier ; sur véhicule, allumeurs remplacés par des simulateurs ([protocole](03-travaux-pratiques.md#protocole-renforcé-pour-les-calculateurs-de-sécurité)) |
| D-03 | Calculateurs ABS / ESP / direction | A. Observation seulement ; B. Diagnostic et réparation avec validation renforcée | **B — validé par Arthur le 13/11/2026** | Traités en S37–S39 ; validation finale sur véhicule d'atelier ([sécurité véhicule](03-travaux-pratiques.md#sécurité-véhicule)) |
| D-04 | Seuils de validation | QCM ≥ 80 % + 100 % sécurité ; pratique ≥ 70 % ; jalon 3 et final ≥ 75 % | **Proposés** | À ajuster selon l'exigence voulue |
| D-05 | Budget équipement | Liste du [catalogue](03-travaux-pratiques.md#équipement-nécessaire) | **Indispensable + important** | La v0.3 ajoute en indispensable : pince de courant, testeur ESR / LCR, sonde différentielle, préchauffeur dès S15, simulateurs d'allumeurs en nombre suffisant pour un véhicule |
| D-06 | Achat des normes | A. Acheter les normes clés (IEC 61010-1, ISO 11898-2, IPC-A-610) ; B. Se limiter aux sources gratuites et citer les normes par référence | **B pour démarrer, A avant S23** | La règle de fiabilité exige de pouvoir citer une section précise |
| D-07 | Langue des sources | Accepter des sources en anglais avec glossaire | **Oui** | La quasi-totalité des datasheets n'existe qu'en anglais |
| D-08 | Évaluateur tiers | A. Auto-évaluation seule ; B. Un tiers prépare, scelle et corrige les pannes | **B obligatoire pour le jalon 3 (S34) et l'examen final (S40–S41), recommandé pour S14 et S25** | Une panne préparée par soi-même ne teste pas le diagnostic. **Arthur doit désigner ce tiers avant S29.** |
| D-09 | Ordre de rédaction | A. Cours pilotes S1 + S2, revue, puis une semaine d'avance ; B. Un module entier avant de commencer | **A** | Valider le format sur un cours réel avant d'en écrire 36 |
| D-10 | Type de plateforme | A. Site statique ; B. Application web avec base de données ; C. Hybride | **C, à confirmer** | Les cours sont du contenu versionné ; le journal et les preuves sont des données |
| D-11 | Calculateurs de récupération et véhicules d'atelier | Stock déclaré : BMW CAS3, airbag VW T-Cross, ECU Bosch EDC17C60 ; achats possibles ; véhicules d'atelier disponibles | **Inventaire à compléter avant S29** : état de chaque pièce (saine / en panne / inconnu), véhicule d'atelier compatible ; manquent TCU, BCM / BSI, FRM, ABS / ESP, direction | Les TP de M8 et M9 exigent un exemplaire par famille, idéalement deux identiques pour le diagnostic comparatif (TP-44) ; l'airbag T-Cross doit être validé sur un véhicule compatible [À VÉRIFIER : codage et protection des composants côté constructeur] |
| D-12 | Rythme | 8 h en une journée ou réparties (ex. 2 × 4 h) | **2 × 4 h conseillé** | Meilleure rétention, et le fil rouge gagne à être espacé |
| D-13 | Durée du cursus | v0.1 : 32 semaines ; v0.2 : 35 ; v0.3 : 41 semaines (328 h) | **41 semaines — ajout de semaines accepté par Arthur le 13/11/2026** | M8 passe de 2 à 6 semaines (dont jalon 3), M9 de 4 à 5, examen final sur 2 semaines |
| D-14 | Remise en circulation d'un calculateur de sécurité réparé | A. Jamais pendant le cursus ; B. Possible après protocole écrit, validation véhicule et vérification juridique / assurance | **A pendant le cursus, B ensuite** | La responsabilité de l'atelier est engagée [À VÉRIFIER auprès de l'assureur et d'un juriste] |
| D-15 | Véhicules électrifiés (hybrides, électriques, 48 V) | A. Exclus du cursus ; B. Inclus après habilitation électrique | **A** | Habilitation requise [À VÉRIFIER : NF C18-550] |

## Lacunes et limites du programme

### Limites de volume

1. **328 h ne font pas un réparateur expert.** L'objectif réaliste est l'autonomie (N3) sur les fondamentaux et sur des pannes de niveau carte simples à moyennes (alimentation, composants passifs et discrets, mémoires série, étages de sortie, bus). Le diagnostic de pannes internes de microcontrôleur, la réparation BGA et les pannes intermittentes complexes demanderont une seconde phase.
2. **La thermique et la CEM** (compatibilité électromagnétique) ne sont qu'effleurées (S16, S17, S33). Elles expliquent pourtant une part des pannes. À prévoir en phase 2.
3. **Capteurs et actionneurs** : traités en une semaine (S29). Les moteurs pas à pas, les électrovannes proportionnelles et les interfaces de sonde lambda large bande ne sont vus qu'en principe.
4. **Mathématiques** : un test de positionnement est prévu en S1, mais aucune semaine de remise à niveau n'est budgétée. Si le test révèle des lacunes (puissances de 10, logarithmes), il faudra ajouter 4 à 8 h.

### Limites de sources

5. **Absence de schémas de calculateurs réels publics.** Le cursus compense par le relevé de schéma (S13), mais l'apprenant n'aura jamais de « corrigé constructeur » pour ses relevés.
6. **Pannes connues non enseignées.** Par règle de fiabilité, aucune panne récurrente n'est présentée comme un fait sans source. La base de connaissances AREPROG ne se constituera qu'au fil des réparations documentées.
7. **Normes payantes** : sans achat (D-06), certaines affirmations resteront citées par référence sans section précise et devront être étiquetées en conséquence.

### Limites de méthode

8. **Dépendance à un tiers.** Le jalon 3 et l'examen final exigent un tiers (D-08). Sans lui, ces épreuves perdent leur valeur.
9. **Mise en situation véhicule** : ponctuelle avant M9 (TP-15 en S10, TP-34 en S23), systématique ensuite.
10. **Sécurité fonctionnelle** : le cursus enseigne le diagnostic et la réparation des calculateurs de sécurité (M9, S35–S39), mais un atelier ne peut pas reproduire les essais constructeur. La validation reste partielle et doit le dire explicitement dans chaque dossier.
11. **Aspects réglementaires et assurance** (responsabilité de l'atelier sur une pièce réparée, traitement des déchets électroniques, produits chimiques) : non couverts, [À VÉRIFIER] auprès des organismes compétents.

### Points non tranchés dans le programme

12. **Calendrier** : les 41 semaines n'incluent pas de semaine tampon. Un échec au fil rouge (S24) ou à un jalon décale la suite : prévoir 2 à 4 semaines de marge.
13. **Matériel de récupération** : l'inventaire (D-11) conditionne les TP à partir de S7, et les pannes de M8 / M9 avant S29.

### Points ajoutés après les décisions et l'audit du 13/11/2026

14. **Antidémarrage et données de collision** : le cursus n'enseigne ni la modification de données d'antidémarrage ni l'effacement de données de collision ; le CAS est étudié au niveau carte, sur des pièces de provenance légitime et documentée.
15. **BGA** : présenté, non pratiqué. Les pannes de microcontrôleur BGA restent hors périmètre.

## Prochaine étape proposée

1. Arthur valide ou modifie les décisions ouvertes (D-01, D-04 à D-10, D-12, D-14, D-15), désigne le tiers évaluateur (D-08) et complète l'inventaire D-11.
2. Rédaction des **cours pilotes S1 et S2** au format du [gabarit](06-gabarit-cours.md), avec QCM, corrigé et TP.
3. Revue des deux cours pilotes, ajustement du gabarit, puis rédaction au rythme d'une semaine d'avance.
4. Lot L0 de la plateforme (format + contrôle de conformité) quand les cours pilotes sont validés.
