# 3. Modèle de contenu

## 3.1 Hiérarchie

| Niveau | Correspond à | Exemple d'identifiant | Porte |
|---|---|---|---|
| **Module** | Un module du [programme](../pedagogie/02-programme-32-semaines.md) (M0 à M8, plus les modules ajoutés) | `M1` | Titre, ordre, liste des chapitres |
| **Chapitre** | Une semaine = un « cours » du [gabarit](../pedagogie/06-gabarit-cours.md) (8 h) | `S02` | En-tête du gabarit, prérequis, compétences, TP, QCM, corrigé, sources, statut de relecture |
| **Leçon** | Une séquence de 1 à 2 h à l'intérieur de la semaine | `S02-L01` | Les champs demandés : identifiant, version, objectifs, prérequis, contenu, exercices, références, critères d'évaluation |

Le chapitre est décrit par `chapitre.md` : en-tête YAML du gabarit (id, module, compétences, prérequis, leçons, TP, sources, version, statut) et sections `## Mesures attendues et tolérances` et `## Erreurs fréquentes`.

Les 12 rubriques du gabarit restent vérifiées **au niveau du chapitre** : théorie, schémas,
exemples et exercices sont répartis dans les leçons ; prérequis, TP, mesures attendues,
erreurs fréquentes, QCM, corrigé et sources sont au niveau du chapitre. Voir décision A-02.

Le nombre de semaines n'est codé nulle part dans l'application : le parcours est la liste
des modules et chapitres présents dans `content/`. Passer de 32 à 35 semaines (ou plus)
ne demande qu'à ajouter des dossiers de contenu.

## 3.2 Identifiants stables

- Format : `M1`, `S02`, `S02-L01`, `S02-L01-EX03` (exercice), `S02-Q017` (question), `TP-03`, `SRC-0001`, `CAS-001`, `S02-F01` (figure).
- Un identifiant **n'est jamais réutilisé ni renommé**, même si le titre change. Un élément retiré passe à `statut: retire` au lieu d'être supprimé, pour que l'historique des tentatives reste lisible.
- Le validateur vérifie l'unicité de chaque identifiant dans tout `content/`.

## 3.3 Versions

- Chaque leçon, banque de QCM et chapitre porte une `version` au format `majeur.mineur` :
  - **mineur** : correction de forme, ajout d'une source, reformulation ;
  - **majeur** : changement d'une réponse, d'un objectif ou d'une valeur attendue.
- Chaque tentative enregistrée par l'application garde la version du contenu. Si la version majeure change, l'historique affiche « tentative sur une version antérieure du contenu ».
- Un champ `historique` dans l'en-tête résume les changements ; Git conserve le détail.
- Les états de publication suivent F26 : `brouillon`, `relu`, `valide`, plus `retire`. Seuls `relu` et `valide` apparaissent dans le parcours publié ; `brouillon` n'apparaît qu'en mode auteur (local).

## 3.4 En-tête d'une leçon (Markdown + YAML)

```markdown
---
id: S02-L01
titre: Grandeurs électriques et loi d'Ohm
chapitre: S02
version: "0.1"
statut: brouillon
duree_min: 90
objectifs:
  - id: O1
    texte: Calculer une tension, un courant ou une résistance avec la loi d'Ohm, unités comprises
    competences: [D2.2]
  - id: O2
    texte: Convertir une valeur entre préfixes (m, k, M) sans erreur d'ordre de grandeur
    competences: [D2.1]
prerequis: [S01]
exercices: [S02-L01-EX01, S02-L01-EX02]
references: [SRC-0003]
criteres_evaluation:
  - objectif: O1
    critere: 4 réponses justes sur 5 aux exercices de calcul, unité correcte
  - objectif: O2
    critere: Question de QCM S02-Q004 réussie
figures:
  - id: S02-F01
    fichier: ../figures/S02-F01-circuit-serie.svg
    legende: Circuit série : source, résistance, ampèremètre
    alt: Schéma d'une source de tension continue reliée à une résistance, un ampèremètre en série
    origine: areprog
derniere_verification_sources: 2026-11-13
historique:
  - version: "0.1"
    date: 2026-11-13
    resume: Première rédaction
---

## Théorie
…
Soit une résistance R = 220 Ω alimentée en 5 V [EXEMPLE] …

::figure{id=S02-F01}

::exercice{id=S02-L01-EX01}
```

Le corps est du Markdown standard, plus deux directives (`::figure`, `::exercice`) qui
placent une figure ou un exercice interactif au bon endroit du texte.

**Figures et images.** `fichier` est un schéma `.svg` (intégré à la page, couleurs en
`currentColor`) ou une image `.webp`, `.jpg` ou `.png` (copiée sous `/figures/` à la
construction et mise en cache pour l'usage hors ligne). `origine` vaut :

| Valeur | Usage | Mention affichée |
|---|---|---|
| `areprog` | Schéma dessiné ou photo prise par AREPROG | « Figure réalisée / Photo prise par AREPROG » |
| `illustration-generee` | Image générée (IA), décorative ou d'ambiance | « Illustration générée : elle ne représente pas un matériel réel ni une donnée constructeur. » |
| `SRC-xxxx` | Photo sous licence (ex. Wikimedia Commons), avec fiche source et crédit | Lien vers la fiche source |

Une illustration générée ne sert jamais de support à une mesure, un brochage, un repérage
de composant ou une procédure : pour cela, une photo réelle (`areprog` ou sourcée) ou un
schéma de principe. Aucune image ne montre de VIN ni de plaque d'immatriculation.
Le validateur avertit au-delà de 400 Ko par image (tablette d'atelier).

## 3.4 bis Programme du cursus

`content/programme.yaml` décrit les 41 semaines, rédigées ou non : domaines, modules (avec la liste
ordonnée de leurs semaines) et, pour chaque semaine, `titre`, `module`, `prerequis`, `tp`,
`fil_rouge`, et éventuellement `evaluation: jalon | finale` et `protocole: renforce`.
L'évaluation finale (S40–S41) est rangée sous un module technique `M10`.
Un chapitre rédigé doit y figurer avec le même module ; ses prérequis et ses TP doivent
correspondre (avertissement en brouillon, erreur à partir de « relu »).

## 3.5 Exercice (sans solution) et correction (séparée)

`exercices/S02-L01.yaml`

```yaml
- id: S02-L01-EX01
  version: "0.1"
  type: calcul           # calcul | choix_unique | choix_multiple | ordonnancement | lecture_schema
  enonce: >
    Une résistance de 220 Ω [EXEMPLE] est alimentée sous 5 V [EXEMPLE].
    Quel courant la traverse ?
  unite_attendue: mA
  competences: [D2.2]
  objectif: O1
```

`corrections/S02-L01.yaml`

```yaml
- id: S02-L01-EX01
  valeur: 22.7
  tolerance_relative: 0.02     # tolérance de saisie, pas une tolérance de mesure
  unite: mA
  explication: >
    I = U / R = 5 / 220 = 0,0227 A, soit 22,7 mA. Erreur fréquente : oublier de convertir
    en mA, ou diviser R par U.
  renvoi_section: "S02-L01#loi-dohm"
```

## 3.6 Question de QCM

`qcm/banque.yaml` (affiché) et `qcm/reponses.yaml` (chargé après soumission) partagent les identifiants.

```yaml
# banque.yaml
- id: S02-Q001
  type: choix_unique
  securite: false
  competences: [D2.2]
  section: S02-L01#loi-dohm
  enonce: …
  propositions: [{id: a, texte: …}, {id: b, texte: …}, {id: c, texte: …}, {id: d, texte: …}]

# reponses.yaml
- id: S02-Q001
  bonne: [b]
  explication: …
  pourquoi_faux: {a: …, c: …, d: …}
  source: "S02-L01#loi-dohm"
```

## 3.7 Étiquettes de fiabilité

Syntaxe dans le texte (identique à celle du gabarit) :

| Étiquette | Syntaxe | Règle du validateur |
|---|---|---|
| Sourcé | `[SOURCÉ : SRC-0003 §4.2]` | L'identifiant de source doit exister ; la fiche doit avoir révision et date de consultation |
| Exemple | `[EXEMPLE]` | Aucune |
| Hypothèse | `[HYPOTHÈSE]` | Interdite dans une consigne de sécurité |
| À vérifier | `[À VÉRIFIER : motif]` | Autorisée en `brouillon` ; signalée en `relu` ; interdite dans une consigne de sécurité publiée |

Le validateur signale toute valeur numérique suivie d'une unité (V, A, Ω, W, F, H, Hz, s, °C…)
sans étiquette dans la même phrase. C'est une heuristique : un faux positif se lève en ajoutant
l'étiquette appropriée, jamais en désactivant la règle.

## 3.8 Fiche source

```yaml
id: SRC-0003
titre: …
editeur: …
reference: …
revision: …
date_consultation: 2026-11-13
type: datasheet | norme | ouvrage | notice | site
licence: lien_seulement | extrait_autorise | libre
lien: https://…
fichier_local: null      # jamais de fichier sous licence restrictive dans le dépôt
```

## 3.8 bis Travaux pratiques et grilles d'évaluation pratique

Un TP est un fichier `<chapitre>/tp/TP-xx.md`, listé dans `tp:` de `chapitre.md` et du programme.
En-tête : `id`, `titre`, `chapitre`, `version`, `statut`, `support`, `securite` (`standard` ou
`renforcee`), `domaines_risque`, `competences`, et `livrables` : la liste des preuves attendues
(photo du montage, du réglage de la limite de courant, tableau de mesures…), affichée à l'apprenant
au moment de l'évaluation.

Les grilles sont communes à tous les TP : `content/evaluation/grilles.yaml`.

```yaml
fautes_eliminatoires:
  - id: FE-01
    texte: Manipulation de carte hors poste ESD ou sans bracelet
    modules: []            # vide = tous les modules ; sinon [M1, M2]
grilles:
  - id: generique          # appliquée à tout TP
    titre: Grille générique d'évaluation pratique
    criteres:
      - id: preparation
        texte: Préparation (…)
        poids: 20          # en points sur 100 ; la grille générique totalise 100
        eliminatoire_si: Absence de valeur théorique calculée avant la mesure
  - id: renforcee          # ajoutée pour un TP « securite: renforcee »
    titre: Grille protocole renforcé
    criteres:
      - id: decharge-mesuree
        texte: Décharge de la réserve d'énergie mesurée avant manipulation
        poids: 0           # critère purement éliminatoire : eliminatoire_si obligatoire
        eliminatoire_si: Critère non respecté ou sans preuve
        sans_objet_possible: false
```

Notation (`src/lib/evaluation/pratique.ts`, d'après `docs/pedagogie/04-evaluation.md`) :

- niveau par critère : atteint (100 %), partiellement atteint (50 %), non atteint (0) ;
- **un critère sans preuve vaut 0** (photo prise sur l'appareil, ou note : valeurs relevées) ;
- chaque faute éliminatoire du module est écartée une à une par l'apprenant ; une seule non écartée,
  ou une condition « éliminatoire si » non écartée, rend l'évaluation nulle ;
- un critère de la grille renforcée n'est respecté qu'avec confirmation **et** preuve, ou « sans objet »
  quand il le permet (étape sur véhicule lors d'un TP sur banc) ;
- réussite : note ≥ `pratique.seuil_reussite` (70 %) et aucune élimination.

Un chapitre est **validé** quand son dernier QCM est réussi et que la dernière évaluation pratique
de chacun de ses TP est réussie. Les photos sont réduites (1600 px, JPEG) et stockées sur l'appareil ;
elles font partie de la sauvegarde (format version 2).

## 3.9 Étude de cas ECU

Chaque cas porte obligatoirement `nature: fictif_pedagogique` ou `nature: dossier_reel_anonymise`.

- **Fictif pédagogique** : bandeau « Cas construit pour l'entraînement ; les valeurs sont des exemples, pas des données constructeur ». Toutes les valeurs sont étiquetées [EXEMPLE]. Aucun nom de calculateur commercial n'est associé à une panne inventée.
- **Dossier réel anonymisé** : issu d'un dossier de réparation AREPROG, sans VIN ni donnée client (NF6) ; chaque valeur mesurée est une mesure de l'atelier, présentée comme telle, avec date et instrument.

## 3.10 Contrôle de conformité (F25)

Exécuté par `npm run valider` en local, dans l'intégration continue, et à chaque construction.

| Règle | Gravité |
|---|---|
| En-tête conforme au schéma (champs, types, identifiants) | Bloquante |
| Identifiants uniques, prérequis et références existants | Bloquante |
| Chaque exercice a une correction et réciproquement ; chaque question a une réponse | Bloquante |
| Aucune solution présente dans les fichiers affichés (exercices, banque) | Bloquante |
| Chaque figure a une légende, un texte alternatif et une origine | Bloquante |
| `[SOURCÉ]` renvoie à une fiche existante | Bloquante |
| TP `securite: renforcee` complet et sans [À VÉRIFIER] ni [HYPOTHÈSE] dans le protocole | Bloquante |
| Valeur numérique avec unité sans étiquette | Avertissement en `brouillon`, bloquante en `relu` / `valide` |
| 12 rubriques présentes au niveau chapitre | Avertissement en `brouillon`, bloquante en `relu` / `valide` |
| Banque QCM ≥ 40 questions | Avertissement en `brouillon`, bloquante en `valide` |
| Chaque objectif couvert par au moins un critère d'évaluation | Bloquante |
| Date de vérification des sources de plus de 12 mois | Avertissement (F22) |

Le prototype (phase 3) fonctionne avec un chapitre en `brouillon` : les règles de volume
(40 questions, 12 rubriques) restent des avertissements tant que le contenu n'est pas relu.
