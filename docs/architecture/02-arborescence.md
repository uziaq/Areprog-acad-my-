# 2. Arborescence proposée

> Les fichiers marqués **(P2)** sont créés en phase 2 (structure et instructions Claude Code),
> ceux marqués **(P3)** en phase 3 (prototype). Le reste vient plus tard, lot par lot.

```
Areprog-acad-my-/
├── CLAUDE.md                          (P2) instructions concises pour Claude Code
├── README.md                          (P2) démarrage, commandes, règles de contribution
├── package.json / package-lock.json   (P2)
├── astro.config.mjs                   (P2)
├── tsconfig.json                      (P2)
├── netlify.toml                       (P2) build, en-têtes noindex ; aucun déploiement auto
├── .nvmrc                             (P2) version de Node
├── .github/
│   ├── workflows/ci.yml               (P2) validation contenu + tests + build
│   └── pull_request_template.md       (P2)
│
├── .claude/                           (P2) configuration Claude Code, voir 04
│   ├── settings.json
│   ├── rules/
│   │   ├── fiabilite-contenu.md
│   │   ├── format-contenu.md
│   │   ├── code-application.md
│   │   ├── simulateurs.md
│   │   ├── tests.md
│   │   ├── dependances.md
│   │   └── securite-et-deploiement.md
│   ├── skills/
│   │   ├── creer-cours/SKILL.md
│   │   ├── verifier-technique/SKILL.md
│   │   ├── travaux-pratiques/SKILL.md
│   │   ├── etude-cas-ecu/SKILL.md
│   │   └── evaluations/SKILL.md
│   └── agents/
│       ├── pedagogue.md
│       ├── expert-electronique.md
│       ├── verificateur-documentaire.md
│       └── developpeur-testeur.md
│
├── docs/
│   ├── pedagogie/                     (fil pédagogique) référentiel, programme, gabarit…
│   └── architecture/                  ce plan
│
├── content/                           CONTENU PÉDAGOGIQUE, séparé du code
│   ├── parametres.yaml                (P3) seuils de validation (D-04), durée hebdo
│   ├── referentiel/
│   │   └── competences.yaml           (P3) D1.1 … D8.x, niveaux visés
│   ├── glossaire.yaml                 (L1) terme FR, terme EN, chapitre de définition
│   ├── parcours/
│   │   └── M1-electricite-fondamentale/
│   │       ├── module.yaml            (P3) id, titre, ordre, chapitres
│   │       └── S02-loi-ohm/           un chapitre = une semaine de 8 h
│   │           ├── chapitre.yaml      (P3) en-tête du gabarit (id, prérequis, compétences, TP…)
│   │           ├── lecons/
│   │           │   └── S02-L01-grandeurs-et-loi-ohm.md   (P3)
│   │           ├── exercices/
│   │           │   └── S02-L01.yaml   (P3) énoncés, sans solution
│   │           ├── corrections/       chargé uniquement après soumission
│   │           │   ├── S02-L01.yaml   (P3) solutions des exercices
│   │           │   └── corrige-chapitre.md
│   │           ├── qcm/
│   │           │   ├── banque.yaml    (P3) questions, sans bonne réponse
│   │           │   └── reponses.yaml  (P3) bonnes réponses + explications
│   │           ├── tp/
│   │           │   └── TP-03.md       (L3)
│   │           ├── figures/
│   │           │   └── S02-F01-circuit-serie.svg  (P3) + métadonnées dans la leçon
│   │           └── sources.yaml       (P3) références citées par le chapitre
│   ├── bibliotheque/
│   │   └── sources/SRC-0001.yaml      (L5) fiches sources communes (titre, éditeur, révision, licence, lien)
│   └── etudes-de-cas/
│       └── CAS-001/                   (L3) cas ECU : fictif pédagogique OU dossier réel anonymisé
│
├── src/                               APPLICATION
│   ├── content.config.ts              (P3) déclaration des collections et schémas
│   ├── schemas/                       (P3) schémas Zod partagés (contenu + données apprenant)
│   ├── pages/
│   │   ├── index.astro                (P3) tableau de bord
│   │   ├── parcours/[module]/index.astro          (P3)
│   │   ├── parcours/[module]/[chapitre]/[lecon].astro  (P3)
│   │   ├── competences.astro          (P3) progression par compétence
│   │   ├── historique.astro           (P3) tentatives passées
│   │   └── sauvegarde.astro           (P3) export / import
│   ├── layouts/                       (P3) gabarit de page, mode atelier
│   ├── components/                    (P3) composants statiques (.astro) : étiquettes, figures, navigation
│   ├── islands/                       (P3) composants interactifs Preact
│   │   ├── Exercice.tsx
│   │   ├── Qcm.tsx
│   │   ├── TableauDeBord.tsx
│   │   └── ProgressionCompetences.tsx
│   ├── simulateurs/                   (L4) modèles pédagogiques purs + interface, isolés de content/bibliotheque
│   ├── lib/
│   │   ├── stockage/                  (P3) IndexedDB, migrations, export / import
│   │   ├── evaluation/                (P3) notation, tolérances numériques, seuils
│   │   └── progression/               (P3) calcul d'état des chapitres et compétences
│   ├── markdown/
│   │   └── remark-etiquettes.ts       (P3) rend [SOURCÉ], [EXEMPLE], [HYPOTHÈSE], [À VÉRIFIER]
│   ├── styles/
│   │   ├── jetons.css                 (P3) couleurs et polices AREPROG
│   │   └── impression.css             (L3) export PDF par impression
│   └── sw.ts                          (P3) service worker hors ligne
│
├── public/
│   ├── fonts/                         (P3) Poppins, Inter (woff2, licence OFL)
│   ├── icones/                        (P3) icônes PWA
│   └── manifest.webmanifest           (P3)
│
├── scripts/
│   ├── valider-contenu.ts             (P2/P3) contrôle de conformité F25
│   └── nouveau-chapitre.ts            (L1) génère le squelette d'un chapitre au gabarit
│
├── tests/
│   ├── unitaires/                     (P3) notation, tolérances, progression, migrations
│   ├── contenu/                       (P3) règles du validateur, sur fixtures
│   │   └── fixtures/                  cours conformes et non conformes volontairement
│   ├── architecture/                  (P3) frontières : simulateurs ↛ bibliothèque, corrections non incluses dans les pages
│   └── e2e/                            (P3) parcours complet au format tablette (Playwright)
│
└── netlify/
    └── edge-functions/
        └── protection.ts              (avant 1er déploiement) mot de passe, voir A-04
```

## Pourquoi `content/` à la racine et pas dans `src/`

- On voit d'un coup d'œil ce qui est pédagogique et ce qui est technique.
- Les règles Claude Code s'appliquent par chemin : `content/**` déclenche les règles de fiabilité, `src/**` les règles de code.
- Le contenu pourra plus tard être extrait dans un dépôt séparé sans réécrire l'application.

## Relation avec `docs/pedagogie/`

`docs/pedagogie/` reste la **conception** du cursus (référentiel, programme, gabarit,
décisions). `content/` contient le **contenu publiable**, au format validé. Le gabarit
[06](../pedagogie/06-gabarit-cours.md) propose une arborescence `cours/S05-…/` ;
la présente proposition la reprend en la plaçant sous `content/parcours/<module>/`
et en découpant la semaine en leçons (voir [03](03-modele-de-contenu.md) et la décision A-02).
