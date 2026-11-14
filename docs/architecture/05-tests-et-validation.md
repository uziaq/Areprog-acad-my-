# 5. Tests, validation du contenu et critères du prototype

## 5.1 Structure des tests

| Niveau | Outil | Ce qui est testé | Quand |
|---|---|---|---|
| Contenu | `scripts/valider-contenu.ts` | Toutes les règles du [modèle de contenu §3.10](03-modele-de-contenu.md#310-contrôle-de-conformité-f25) sur `content/` | Avant chaque commit (manuel), CI, build |
| Règles du validateur | Vitest + `tests/contenu/fixtures/` | Chaque règle a une fixture conforme (doit passer) et une non conforme (doit échouer avec le bon message) | CI |
| Unitaires | Vitest | Notation QCM (y compris règle « 100 % sécurité »), comparaison numérique avec tolérance et unités, seuils lus dans `parametres.yaml`, calcul d'état des chapitres et compétences, migrations IndexedDB, export / import aller-retour | CI |
| Architecture | Vitest | `src/simulateurs/` n'importe rien de `content/bibliotheque/` ; aucune solution ni bonne réponse dans le HTML généré des pages de leçon ; aucune couleur en dur hors `jetons.css` | CI |
| Bout en bout | Playwright, gabarit iPad (paysage et portrait) + bureau | Parcours prototype complet, rechargement de page sans perte, mode hors ligne, export / import | CI + avant toute démonstration |
| Accessibilité | Playwright + contrôle de contraste des jetons | Contraste AA, textes alternatifs, cibles tactiles ≥ 48 px | CI |

Intégration continue (`.github/workflows/ci.yml`) : `npm ci` → `npm run valider` → `npm test`
→ `npm run build` → `npm run test:e2e`. Une PR rouge ne se fusionne pas.

## 5.2 Stratégie de validation du contenu

Trois barrières successives, de la plus automatique à la plus humaine :

1. **Validateur automatique** (bloquant) : format, identifiants, séparation des corrections, étiquettes, sources existantes, figures avec origine.
2. **Relecture par agents** : `expert-electronique` (exactitude, calculs refaits) et `verificateur-documentaire` (sources, licences) produisent un rapport joint à la PR. Toute affirmation qu'ils ne peuvent pas confirmer devient [À VÉRIFIER].
3. **Validation par Arthur** : seul Arthur fait passer un chapitre de `relu` à `valide`, par une PR dédiée. Les consignes de sécurité du protocole renforcé exigent cette validation humaine.

Versionnage et sauvegarde du contenu :

- tout passe par Git et des PR ; la branche principale est protégée ;
- une **étiquette Git** par livraison de contenu (`contenu-2026-11-xx`) ;
- un chapitre `valide` modifié repasse automatiquement en `relu` si sa version majeure change.

## 5.3 Critères de validation du prototype (phase 3)

Le prototype est accepté quand **tous** les critères ci-dessous sont vérifiés et que la
preuve (capture ou sortie de test) figure dans la PR.

### Fonctionnels

| # | Critère | Preuve |
|---|---|---|
| P1 | Le tableau de bord affiche le module M1, l'état du chapitre S02 (disponible / en cours / validé), le dernier score QCM et la progression des compétences concernées | Test e2e + capture tablette |
| P2 | La leçon S02-L01 s'affiche avec objectifs, prérequis, contenu structuré, un schéma SVG légendé, les références et les critères d'évaluation | Test e2e |
| P3 | Les quatre étiquettes de fiabilité sont rendues de façon distincte (couleur + pictogramme) ; un [SOURCÉ] ouvre sa fiche source | Test e2e |
| P4 | L'exercice interactif accepte une réponse numérique avec unité, la note avec tolérance, et **n'affiche la correction qu'après soumission** | Test e2e + test architecture (correction absente du HTML initial) |
| P5 | Le QCM tire N questions de la banque, applique le seuil (≥ 80 %) et la règle « 100 % sur les questions sécurité », affiche ensuite le corrigé avec explication des mauvaises réponses et la remédiation (sections à relire) | Tests unitaires + e2e |
| P6 | Chaque tentative est enregistrée avec date, score et version du contenu ; l'historique les liste | Test e2e |
| P7 | La progression par compétence se met à jour après exercice et QCM, sans jamais afficher un niveau N3 non mérité (jalon non passé) | Test unitaire |
| P8 | Les données survivent à un rechargement et à une fermeture du navigateur ; l'export JSON puis l'import sur un profil vierge restaurent exactement l'état | Test e2e aller-retour |

### Techniques

| # | Critère | Preuve |
|---|---|---|
| T1 | `npm run valider`, `npm test`, `npm run build`, `npm run test:e2e` passent en CI | Lien vers la CI |
| T2 | Le contenu du prototype est intégralement dans `content/` ; modifier le texte de la leçon ne demande aucun changement dans `src/` | Démonstration dans la PR |
| T3 | Une leçon volontairement non conforme (fixture) fait échouer la construction avec un message compréhensible en français | Test |
| T4 | Après une première visite, la leçon, l'exercice et le QCM fonctionnent **hors ligne** | Test e2e (réseau coupé) |
| T5 | Utilisable sur tablette : aucune barre de défilement horizontale à 768 px, cibles ≥ 48 px, texte lisible à 200 % de zoom | Test e2e + captures |
| T6 | Couleurs et polices AREPROG appliquées via les jetons ; contraste AA vérifié | Test |
| T7 | JavaScript envoyé sur la page de leçon < 60 Ko compressé (repère, à confirmer en phase 3) | Rapport de build |
| T8 | Dépendances limitées à la liste du [plan §1.3](01-architecture-et-choix-techniques.md#dépendances-prévues-exhaustif-pour-le-prototype) | `package.json` |
| T9 | Aucun déploiement public effectué | Absence de site Netlify publié |

### Contenu

| # | Critère | Preuve |
|---|---|---|
| C1 | Aucune valeur numérique non étiquetée dans la leçon du prototype | Sortie du validateur |
| C2 | Aucune donnée présentée comme constructeur ; le schéma porte `origine: areprog` | Sortie du validateur |
| C3 | Le texte de la leçon est repris du cours pilote S2 du fil pédagogique, ou marqué « texte de démonstration » s'il n'est pas encore rédigé | Revue |
