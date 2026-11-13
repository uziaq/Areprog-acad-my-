# AREPROG Academy — Architecture pédagogique

> Statut : **proposition v0.3 à valider** (révisée après audit). Aucun cours n'est encore rédigé.
> Ce dossier fixe le cadre qui permettra de rédiger les 328 heures de formation de façon cohérente.

## Public et point de départ

| Élément | Situation actuelle | Conséquence pédagogique |
|---|---|---|
| Diagnostic véhicule, reprogrammation ECU/TCU, outils (FLEX, ECM Titanium, VCDS, ODIS) | Maîtrisé | Sert d'ancrage : chaque notion d'électronique est reliée à une situation vécue en atelier. Ce n'est **jamais** une raison de sauter une notion. |
| Électronique de base (lois, composants, schémas) | Débutant | Le cursus repart de zéro : tension, courant, résistance. |
| Instruments de labo (alimentation, oscilloscope, microscope) | Débutant | Prise en main progressive, avec un instrument à la fois. |
| Microsoudure | Débutant | Pratique régulière dès la semaine 4 (fil rouge), puis bloc intensif. |

Format : **41 semaines × 8 h = 328 h** (36 semaines de cours + 5 semaines d'épreuve), en autonomie, dans l'atelier AREPROG. Prévoir en plus 2 à 4 semaines tampon dans le calendrier réel.

Objectif central : **diagnostic et réparation au niveau carte en autonomie (N3)** sur ECU, TCU, BCM / BSI / FRM / CAS (module M8, 6 semaines) ; les calculateurs de sécurité (M9) sont visés en N2.

## Les documents

| # | Document | Contenu |
|---|---|---|
| 1 | [Référentiel de compétences](01-referentiel-competences.md) | 10 domaines, 56 compétences, niveaux visés |
| 2 | [Programme 41 semaines](02-programme-41-semaines.md) | 10 modules + examen, prérequis, objectifs, contenu et TP semaine par semaine |
| 3 | [Travaux pratiques et équipement](03-travaux-pratiques.md) | 60 TP, fil rouge, banc de test, protocoles de sécurité (calculateur réel, sécurité, véhicule), matériel |
| 4 | [Évaluation](04-evaluation.md) | QCM, grilles, 3 jalons, fautes éliminatoires, grille protocole renforcé, examen final |
| 5 | [Ressources documentaires](05-ressources-documentaires.md) | Normes, ouvrages, datasheets, vidéos, règles de sourçage |
| 6 | [Gabarit de cours](06-gabarit-cours.md) | Structure obligatoire en 14 rubriques de chaque cours |
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
 S40–S41   S35–S39       S29–S34         S26–S28        S23–S25        S19–S22
[EXAMEN]←[Sécurité   ]←[Diagnostic  ]←[Microsoudure]←[Réseaux    ]←[Numérique,  ]
 final    airbag, ABS,  capteurs,      intensive      CAN/LIN/K      MCU, mémoires
          direction +   ECU, TCU,                     + JALON 2
          véhicule      carrosserie,
                        intermittents
                        + JALON 3
            ── fil rouge microsoudure 1 h/semaine, S4 à S24 (20 séances) ──
            ── projet banc de test PB-1 (S18), PB-2 (S22), PB-3 (S24) ──
```

Chaque semaine suit le même rythme de 8 h (adaptable) :

| Bloc | Durée | Contenu |
|---|---|---|
| Théorie | 2 h | Lecture du cours, schémas, exemples numériques |
| Exercices | 1 h | Exercices de compréhension, calculs, lecture de schéma |
| Pratique | 4 h | TP de la semaine (dont 1 h de fil rouge microsoudure de S4 à S24) |
| Évaluation et journal | 1 h | QCM, évaluation pratique, mise à jour du journal d'atelier |
