# AREPROG Academy — Architecture pédagogique

> Statut : **proposition v0.1 à valider**. Aucun cours n'est encore rédigé. Ce dossier
> fixe le cadre qui permettra de rédiger les 256 heures de formation de façon cohérente.

## Public et point de départ

| Élément | Situation actuelle | Conséquence pédagogique |
|---|---|---|
| Diagnostic véhicule, reprogrammation ECU/TCU, outils (FLEX, ECM Titanium, VCDS, ODIS) | Maîtrisé | Sert d'ancrage : chaque notion d'électronique est reliée à une situation vécue en atelier. Ce n'est **jamais** une raison de sauter une notion. |
| Électronique de base (lois, composants, schémas) | Débutant | Le cursus repart de zéro : tension, courant, résistance. |
| Instruments de labo (alimentation, oscilloscope, microscope) | Débutant | Prise en main progressive, avec un instrument à la fois. |
| Microsoudure | Débutant | Pratique régulière dès la semaine 4 (fil rouge), puis bloc intensif. |

Format : **32 semaines × 8 h = 256 h**, en autonomie, dans l'atelier AREPROG.

## Les documents

| # | Document | Contenu |
|---|---|---|
| 1 | [Référentiel de compétences](01-referentiel-competences.md) | 10 domaines, 55 compétences, niveaux visés |
| 2 | [Programme 32 semaines](02-programme-32-semaines.md) | 9 modules, prérequis, objectifs, contenu et TP semaine par semaine |
| 3 | [Travaux pratiques et équipement](03-travaux-pratiques.md) | Catalogue des TP, règles de sécurité, matériel nécessaire |
| 4 | [Évaluation](04-evaluation.md) | QCM, évaluations pratiques, grilles, jalons, règles de validation |
| 5 | [Ressources documentaires](05-ressources-documentaires.md) | Normes, ouvrages, datasheets, règles de sourçage |
| 6 | [Gabarit de cours](06-gabarit-cours.md) | Structure obligatoire en 12 rubriques de chaque cours |
| 7 | [Cahier des charges de la plateforme](07-cahier-des-charges-plateforme.md) | Besoins de la plateforme interactive à développer avec Claude Code |
| 8 | [Décisions à valider et lacunes](08-decisions-et-lacunes.md) | Ce qu'Arthur doit trancher avant la rédaction |

## Règle de fiabilité (s'applique à tous les documents)

Toute information technique porte l'une des quatre étiquettes suivantes :

| Étiquette | Signification | Exemple |
|---|---|---|
| **[SOURCÉ]** | Fait établi, avec référence précise (norme, datasheet, ouvrage, page ou section) | Loi d'Ohm ; terminaison nominale d'un bus CAN haute vitesse selon ISO 11898-2 |
| **[EXEMPLE]** | Valeur choisie pour l'exercice, sans lien avec un produit réel | « Un diviseur 10 kΩ / 4,7 kΩ alimenté en 5 V » |
| **[HYPOTHÈSE]** | Piste de diagnostic à confirmer par une mesure | « Le régulateur 5 V est probablement en court-circuit » |
| **[À VÉRIFIER]** | Information plausible mais non confirmée par une source primaire | Une valeur trouvée sur un forum, un brochage relevé sur une seule carte |

Interdits absolus dans les contenus :

- inventer un brochage, une valeur constructeur, un schéma « réel » de calculateur ou un défaut récurrent ;
- présenter une valeur de forum comme un fait ;
- donner une tolérance sans dire d'où elle vient (composant, instrument, norme).

Quand une information n'existe pas publiquement (cas fréquent des schémas de calculateurs),
le cours le dit, et le TP apprend à **relever soi-même** l'information sur la carte, en
documentant la méthode.

## Logique de progression

```
 S1        S2–S6          S7–S11         S12–S14        S15–S18
[Atelier]→[Électricité]→[Composants  ]→[Schémas & ]→[Alimentations]
 sécurité   DC / AC       + oscillo      PCB + JALON 1   + auto 12 V
                                                            │
 S32        S29–S31         S26–S28        S23–S25        S19–S22
[EXAMEN]←[Diagnostic  ]←[Microsoudure]←[Réseaux    ]←[Numérique,  ]
 final     ECU/TCU/BCM    intensive      CAN/LIN/K      MCU, mémoires
           BSI/FRM/CAS                    + JALON 2
           + airbag,
           ABS, direction
            ────── fil rouge microsoudure 1 h/semaine de S4 à S25 ──────
```

Chaque semaine suit le même rythme de 8 h (adaptable) :

| Bloc | Durée | Contenu |
|---|---|---|
| Théorie | 2 h | Lecture du cours, schémas, exemples numériques |
| Exercices | 1 h | Exercices de compréhension, calculs, lecture de schéma |
| Pratique | 4 h | TP de la semaine (dont 1 h de fil rouge microsoudure de S4 à S25) |
| Évaluation et journal | 1 h | QCM, évaluation pratique, mise à jour du journal d'atelier |
