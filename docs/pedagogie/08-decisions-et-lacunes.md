# 8. Décisions à valider et lacunes

## Décisions à valider

Pour chaque décision, une option est appliquée par défaut dans les documents. Arthur peut la changer ; les documents seront mis à jour en conséquence.

| # | Décision | Options | Appliqué par défaut | Pourquoi |
|---|---|---|---|---|
| D-01 | Organisation de la microsoudure | A. Fil rouge 1 h / semaine de S4 à S25 puis bloc intensif S26–S28 ; B. Bloc unique plus long en fin de cursus | **A** | Le geste demande de la répétition espacée ; un bloc tardif seul laisse 6 mois sans pratique |
| D-02 | Calculateurs d'airbag | A. Exclus ; B. Diagnostic et réparation avec protocole renforcé | **B — validé par Arthur le 13/11/2026** | Traités en S31, sans pyrotechnie à l'atelier, voir [protocole](03-travaux-pratiques.md#protocole-renforcé-pour-les-calculateurs-de-sécurité) |
| D-03 | Calculateurs ABS / ESP / direction | A. Observation seulement ; B. Diagnostic et réparation avec validation renforcée | **B — validé par Arthur le 13/11/2026** | Traités en S31 ; la validation finale passe par le véhicule et l'outil de diagnostic |
| D-04 | Seuils de validation | QCM ≥ 80 % + 100 % sécurité ; pratique ≥ 70 % ; final ≥ 75 % | **Proposés** | À ajuster selon l'exigence voulue |
| D-05 | Budget équipement | Liste du [catalogue](03-travaux-pratiques.md#équipement-nécessaire) : indispensable / important / utile | **Indispensable + important** | L'oscilloscope 4 voies et l'air chaud sont les postes les plus coûteux ; choix du modèle à faire par Arthur |
| D-06 | Achat des normes | A. Acheter les normes clés (IEC 61010-1, ISO 11898-2, IPC-A-610) ; B. Se limiter aux sources gratuites et citer les normes par référence | **B pour démarrer, A avant S23** | Les normes sont payantes ; la règle de fiabilité exige de pouvoir citer une section précise |
| D-07 | Langue des sources | Accepter des sources en anglais (datasheets, normes, ouvrages) avec glossaire | **Oui** | La quasi-totalité des datasheets n'existe qu'en anglais |
| D-08 | Évaluateur externe | A. Auto-évaluation seule avec preuves ; B. Un électronicien externe valide les jalons et prépare la panne de l'examen final | **A, B recommandé pour S14, S25, S32** | Une panne préparée par soi-même ne teste pas le diagnostic |
| D-09 | Ordre de rédaction | A. Cours pilote S1 + S2 complets, revue, puis rythme d'une semaine d'avance ; B. Rédiger tout un module avant de commencer | **A** | Valider le format sur un cours réel avant d'en écrire 32 |
| D-10 | Type de plateforme | A. Site statique généré depuis le dépôt (simple, hors ligne facile) ; B. Application web avec base de données (journal, multi-appareils) ; C. Hybride : statique pour les cours + module journal | **C, à confirmer** | Les cours sont du contenu versionné ; le journal et les preuves sont des données |
| D-11 | Familles de calculateurs de récupération | Stock actuel déclaré : module CAS3 BMW, calculateur d'airbag VW T-Cross, ECU Bosch EDC17C60 ; achats possibles | **Inventaire à compléter** (TCU, BCM / BSI, FRM, ABS / ESP, direction manquent) | Les TP S29–S31 demandent au moins un exemplaire par famille, idéalement deux identiques (un de référence, un en panne) |
| D-13 | Volume consacré aux calculateurs de sécurité | A. Une semaine (S31) ; B. Ajouter 2 à 3 semaines dédiées (cursus de 34–35 semaines) | **A appliqué, B recommandé** | 8 h pour airbag + ABS + direction, c'est une initiation, pas une maîtrise |
| D-14 | Remise en circulation d'un calculateur de sécurité réparé | A. Jamais pendant le cursus, pièces de récupération uniquement ; B. Possible après protocole écrit, validation véhicule et vérification juridique / assurance | **A pendant le cursus, B ensuite** | La responsabilité de l'atelier est engagée en cas d'accident [À VÉRIFIER auprès de l'assureur et d'un juriste] |
| D-12 | Rythme | 8 h en une journée ou réparties (ex. 2 × 4 h) | **2 × 4 h conseillé** | Meilleure rétention, et le fil rouge gagne à être espacé |

## Lacunes et limites du programme

### Limites de volume

1. **256 h ne font pas un réparateur expert.** L'objectif réaliste est l'autonomie (N3) sur les fondamentaux et sur des pannes de niveau carte simples à moyennes (alimentation, composants passifs et discrets, mémoires série, étages de sortie, bus). Le diagnostic de pannes internes de microcontrôleur, la réparation BGA et les pannes intermittentes complexes demanderont une seconde phase.
2. **La thermique et la CEM** (compatibilité électromagnétique) ne sont qu'effleurées (S16, S17). Elles expliquent pourtant une part des pannes. À prévoir en phase 2.
3. **Pas de module dédié aux capteurs et actionneurs du point de vue carte** : le conditionnement de capteurs est vu en S10 et les étages de sortie en S29, mais un module complet (capteurs inductifs, à effet Hall, ratiométriques ; commande d'injecteurs, de moteurs pas à pas, d'électrovannes proportionnelles) serait utile.
4. **Mathématiques** : un test de positionnement est prévu en S1, mais aucune semaine de remise à niveau n'est budgétée. Si le test révèle des lacunes (puissances de 10, logarithmes), il faudra ajouter 4 à 8 h.

### Limites de sources

5. **Absence de schémas de calculateurs réels publics.** Le cursus compense par le relevé de schéma (S13), mais l'apprenant n'aura jamais de « corrigé constructeur » pour ses relevés.
6. **Pannes connues non enseignées.** Par règle de fiabilité, aucune panne récurrente n'est présentée comme un fait sans source. La base de connaissances AREPROG ne se constituera qu'au fil des réparations documentées.
7. **Normes payantes** : sans achat (D-06), certaines affirmations resteront citées par référence sans section précise et devront être étiquetées en conséquence.

### Limites de méthode

8. **Pas de correcteur.** L'auto-évaluation, même avec preuves, a un biais. D-08 propose un évaluateur externe pour les jalons.
9. **Pas de mise en situation sur véhicule.** Le cursus reste au niveau carte et banc. Le lien avec le diagnostic véhicule (déjà maîtrisé) est fait par des « liens atelier » dans chaque cours, sans TP sur véhicule.
10. **Sécurité fonctionnelle** : le cursus enseigne le diagnostic et la réparation des calculateurs de sécurité (S31), mais un atelier ne peut pas reproduire les essais constructeur. La validation reste partielle et doit le dire explicitement dans chaque dossier.
11. **Aspects réglementaires et assurance** (responsabilité de l'atelier sur une pièce réparée, traitement des déchets électroniques, produits chimiques) : non couverts, [À VÉRIFIER] auprès des organismes compétents.

### Points non tranchés dans le programme

12. **Calendrier** : aucune semaine tampon n'est prévue. Un échec au fil rouge (S25) ou à un jalon décale la suite. Il est recommandé de prévoir 2 à 4 semaines de marge sur l'année.
13. **Matériel de récupération** : l'inventaire (D-11) conditionne les TP à partir de S7 ; il doit être constitué avant cette date.

### Points ajoutés après décision du 13/11/2026

14. **Antidémarrage (CAS, BSI…)** : le cursus traite le niveau carte uniquement. Toute intervention sur les données d'antidémarrage se limite à des pièces dont la provenance est légitime et documentée.

## Prochaine étape proposée

1. Arthur valide ou modifie les décisions encore ouvertes (D-01, D-04 à D-10, D-12 à D-14) et complète l'inventaire D-11.
2. Rédaction du **cours pilote S1** (sécurité, atelier, méthode) puis **S2** (loi d'Ohm), au format du [gabarit](06-gabarit-cours.md), avec QCM, corrigé et TP.
3. Revue des deux cours pilotes, ajustement du gabarit, puis rédaction au rythme d'une semaine d'avance.
4. Lot L0 de la plateforme (format + contrôle de conformité) quand le cours pilote est validé.
