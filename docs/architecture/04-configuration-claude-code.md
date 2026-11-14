# 4. Configuration Claude Code proposée

> Contenu détaillé des fichiers créés en phase 2. Rien n'est encore créé dans `.claude/`.

## 4.1 `CLAUDE.md` (racine, ≤ 60 lignes)

Projet de formation privé, en français. Contenu prévu, en substance :

1. **Ce qu'est le dépôt** : application web AREPROG Academy (Astro + Preact, statique, hors ligne). Ce n'est **pas** le site commercial AREPROG : ne jamais le modifier.
2. **Où est quoi** : `content/` = pédagogie, `src/` = application, `docs/` = conception, `tests/`.
3. **Commandes** : `npm run dev`, `npm run valider`, `npm test`, `npm run test:e2e`, `npm run build`.
4. **Règles absolues** (rappel court, détail dans `.claude/rules/`) :
   - ne jamais présenter une valeur inventée comme donnée constructeur ; toute valeur porte une étiquette de fiabilité ;
   - ne jamais produire de faux schéma constructeur ; une figure a toujours une origine ;
   - simulateurs pédagogiques séparés des données réelles ;
   - aucune dépendance sans justification ;
   - **aucun déploiement** Netlify sans accord écrit d'Arthur dans la conversation.
5. **Avant de finir une tâche** : `npm run valider && npm test` doivent passer.
6. **Langue** : interface, contenu, messages de commit et PR en français.

## 4.2 Règles techniques `.claude/rules/`

Chaque fichier porte un en-tête `paths:` pour ne se charger que lorsque Claude travaille sur les fichiers concernés.

| Fichier | S'applique à | Contenu |
|---|---|---|
| `fiabilite-contenu.md` | `content/**`, `docs/pedagogie/**` | Les 4 étiquettes, quand utiliser chacune ; interdiction d'inventer brochages, valeurs de datasheet, valeurs constructeur, schémas réels, pannes connues ; conduite à tenir quand une source manque ([À VÉRIFIER] + signalement, jamais une valeur plausible) |
| `format-contenu.md` | `content/**` | Identifiants stables, versions, champs obligatoires, séparation exercice / correction, directives `::figure` et `::exercice`, renvoi vers le [modèle de contenu](03-modele-de-contenu.md) |
| `code-application.md` | `src/**` | TypeScript strict, composants Preact uniquement dans `src/islands/`, jetons de thème (pas de couleur en dur), cibles tactiles ≥ 48 px, textes d'interface en français, accessibilité (alt, contraste, navigation clavier) |
| `simulateurs.md` | `src/simulateurs/**` | Fonctions de calcul pures et testées ; bandeau « simulation pédagogique » obligatoire ; hypothèses affichées ; interdiction d'importer `content/bibliotheque/` |
| `tests.md` | `tests/**`, `src/lib/**` | Tout calcul de notation, tolérance ou progression a un test unitaire ; toute règle du validateur a une fixture conforme et une non conforme ; e2e au format tablette |
| `dependances.md` | `package.json` | Liste des dépendances autorisées ; procédure pour en ajouter une (besoin, alternative sans dépendance, taille, licence, maintenance) |
| `securite-et-deploiement.md` | `netlify.toml`, `netlify/**`, `.github/**` | Pas de déploiement sans accord ; pas de secret dans le dépôt ; `noindex` ; pas de document sous licence restrictive publié ; protocole renforcé airbag / ABS / direction non contournable par le code |

## 4.3 Cinq Skills `.claude/skills/`

| Skill | Déclenchement | Ce qu'il fait | Sortie |
|---|---|---|---|
| `creer-cours` | « rédige la leçon / le chapitre S0x » | Lit le programme et le gabarit, génère le squelette avec `scripts/nouveau-chapitre.ts`, rédige leçon par leçon avec étiquettes, place figures et exercices, lance `npm run valider` | Fichiers dans `content/parcours/…` en `brouillon` + liste des [À VÉRIFIER] restants |
| `verifier-technique` | « vérifie ce cours », avant passage en `relu` | Relit chaque affirmation technique et chaque valeur, contrôle les calculs en les refaisant, vérifie que chaque [SOURCÉ] correspond à la fiche citée, liste les valeurs non étiquetées | Rapport de vérification (tableau affirmation → statut → action) |
| `travaux-pratiques` | « prépare le TP-xx » | Matériel (pris dans le catalogue), sécurité, schéma de câblage, procédure pas à pas, tableau de relevé, valeur théorique + tolérance justifiée (composant + instrument) ; ajoute le protocole renforcé si le TP touche airbag / ABS / direction | `tp/TP-xx.md` conforme |
| `etude-cas-ecu` | « crée une étude de cas » | Impose le choix `fictif_pedagogique` / `dossier_reel_anonymise` ; méthode symptôme → hypothèses étiquetées → mesures → conclusion ; interdit d'attribuer une panne inventée à un calculateur commercial réel | `content/etudes-de-cas/CAS-xxx/` |
| `evaluations` | « écris le QCM / la grille de S0x » | Génère la banque (≥ 40 questions, tous les types du [document d'évaluation](../pedagogie/04-evaluation.md)), séparée des réponses ; explique chaque distracteur ; marque les questions sécurité ; vérifie que chaque objectif est couvert ; grille pratique avec critères éliminatoires | `qcm/banque.yaml`, `qcm/reponses.yaml`, grille |

Chaque Skill se termine par `npm run valider` et par la liste de ce qui reste à vérifier par Arthur.

## 4.4 Quatre sous-agents `.claude/agents/`

| Agent | Rôle | Outils | Ne fait pas |
|---|---|---|---|
| `pedagogue` | Progression des notions, objectifs observables, cohérence avec le référentiel, charge horaire, analogies automobiles justes, remédiation | Lecture, écriture dans `content/` | Ne tranche pas une question technique : la renvoie à l'expert |
| `expert-electronique` | Exactitude électrique et électronique, calculs, ordres de grandeur, sécurité des TP, cohérence des tolérances | Lecture seule + exécution de calculs | N'invente aucune valeur de datasheet ; signale [À VÉRIFIER] |
| `verificateur-documentaire` | Contrôle chaque [SOURCÉ] (existence, révision, section), licences, dates de vérification, absence de faux schéma constructeur | Lecture, recherche web | Ne modifie pas le fond pédagogique ; produit un rapport |
| `developpeur-testeur` | Code de l'application, tests unitaires et e2e, validateur, performance sur tablette, respect des dépendances | Lecture, écriture dans `src/`, `tests/`, `scripts/`, exécution | Ne modifie pas `content/` sauf fixtures de test ; ne déploie jamais |

Usage prévu : `creer-cours` produit le brouillon, puis `expert-electronique` et
`verificateur-documentaire` relisent en parallèle avant passage en `relu`. Arthur reste
le seul à passer un cours en `valide`.

## 4.5 `settings.json`

- Autoriser sans confirmation : `npm run valider`, `npm test`, `npm run build`, lecture des fichiers.
- Toujours demander : `netlify deploy`, toute commande `git push --force`, `npm install <paquet>`.
- Interdire : `netlify deploy --prod` (un déploiement de production se fera manuellement par Arthur ou après son accord explicite, avec levée de cette interdiction).
