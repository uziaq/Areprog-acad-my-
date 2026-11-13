# Architecture de l'application AREPROG Academy — Phase 1

> **Statut : proposition v0.1, en attente de validation par Arthur.**
> Aucune implémentation n'est lancée. Aucun déploiement n'est prévu sans son autorisation.
> Ce dépôt est celui de la formation ; le site commercial AREPROG n'est pas concerné.

## En une phrase

Un site web **statique** généré avec **Astro** à partir de cours écrits en **Markdown + YAML**
(dossier `content/`, contrôlés automatiquement à chaque modification), enrichi de composants
interactifs **Preact** (exercices, QCM, tableau de bord), utilisable **hors ligne** sur tablette,
qui garde les résultats de l'apprenant **dans l'appareil** avec export / import de sauvegarde.

## Documents

| # | Document | Contenu |
|---|---|---|
| 1 | [Architecture et choix techniques](01-architecture-et-choix-techniques.md) | Couches, technologies justifiées, données apprenant, corrections masquées, simulateurs, protocole renforcé, déploiement, correspondance avec le cahier des charges |
| 2 | [Arborescence](02-arborescence.md) | Arbre des fichiers, avec ce qui est créé en phase 2 et en phase 3 |
| 3 | [Modèle de contenu](03-modele-de-contenu.md) | Module / chapitre / leçon, identifiants, versions, exercices et corrections, QCM, étiquettes, sources, études de cas, contrôle de conformité |
| 4 | [Configuration Claude Code](04-configuration-claude-code.md) | `CLAUDE.md`, 7 règles, 5 Skills, 4 sous-agents, permissions |
| 5 | [Tests et validation](05-tests-et-validation.md) | Structure des tests, validation du contenu en trois barrières, **critères d'acceptation du prototype** |
| 6 | [Risques](06-risques.md) | 15 risques et leurs mesures |

Référence : [cahier des charges plateforme](../pedagogie/07-cahier-des-charges-plateforme.md)
(fil pédagogique, branche `claude/project-thread-7tl6vf` ; ce lien fonctionnera une fois les deux PR fusionnées).

## Décisions à valider

| # | Décision | Options | Recommandé | Pourquoi |
|---|---|---|---|---|
| **A-01** | Technologie | A. Astro + Preact (statique) ; B. SPA Vite + Preact ; C. Next.js | **A** | Conçu pour le contenu, validation des cours à la construction, pages légères, hors ligne simple |
| **A-02** | Hiérarchie du contenu | A. Module → Chapitre (= semaine, gabarit 12 rubriques) → Leçons de 1 à 2 h ; B. Module → Cours (= semaine) sans découpage en leçons | **A** | Une semaine de 8 h est trop longue pour une seule page sur tablette ; les leçons portent les champs que tu as demandés, le chapitre garde le gabarit |
| **A-03** | Données de l'apprenant | A. Local (IndexedDB) + export / import, synchronisation plus tard ; B. Base distante dès le départ (Netlify Blobs / Supabase) avec connexion | **A** | Un seul apprenant, hors ligne obligatoire, pas de serveur à maintenir ; la synchronisation PC ↔ tablette se fera en lot L3 si l'export ne suffit pas |
| **A-04** | Protection du site lors du premier déploiement | A. Mot de passe par fonction de bord Netlify (gratuit, secret dans les variables Netlify) ; B. Protection par mot de passe intégrée de Netlify [À VÉRIFIER : offre payante requise] ; C. Pas de déploiement avant L3, usage local uniquement | **C puis A** | Le prototype n'a pas besoin d'être en ligne ; quand tu voudras l'utiliser sur la tablette hors atelier, A suffit |
| **A-05** | Masquage des corrections | A. Côté navigateur, chargées après soumission ; B. Vérifiées par un serveur | **A** | Suffisant pour un apprenant unique ; B devient nécessaire avec de futurs apprenants |
| **A-06** | Contenu du prototype | Leçon S02-L01 « Grandeurs et loi d'Ohm » ; exercice = calcul du courant avec un petit circuit interactif (curseurs U et R) ; QCM de 10 questions | **Oui** | S2 est un cours pilote du fil pédagogique ; l'exercice préfigure les simulateurs sans en être un |
| **A-07** | Protocole airbag / ABS / direction et validation sur véhicule | La plateforme impose le protocole (verrou sans dérogation, check-list avec preuves, critère éliminatoire), y compris pour les TP sur véhicule dédié ; le texte du protocole est rédigé et sourcé dans le fil pédagogique | **Oui** | Sépare la règle (code) de la consigne (contenu vérifié) ; les documents D-02 / D-03 sont encore à mettre à jour |
| **A-08** | Branche principale et revue | `main` protégée, tout passe par PR, CI obligatoire | **Oui** | Sauvegarde et historique de tout le contenu |

## Phases suivantes (rappel)

| Phase | Contenu | Démarre après |
|---|---|---|
| 2 | Structure du projet, `CLAUDE.md`, règles, Skills, agents, CI, validateur de contenu (lot L0) | Ton accord sur ce plan |
| 3 | Prototype : tableau de bord, 1 module, 1 leçon, 1 exercice, 1 QCM, suivi de progression | Phase 2 fusionnée |
| 4 | Tests et corrections jusqu'à validation des critères [P1–P8, T1–T9, C1–C3](05-tests-et-validation.md#53-critères-de-validation-du-prototype-phase-3) | Prototype livré |
| 5 | Préparation de l'extension aux 35 semaines (générateur de chapitres, lots L1 à L5, TP sur véhicule et protocole renforcé) | Prototype validé |
