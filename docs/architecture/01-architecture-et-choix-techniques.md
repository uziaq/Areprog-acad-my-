# 1. Architecture et choix techniques

> Phase 1 : proposition, aucune implémentation. Aligné sur le
> [cahier des charges plateforme](../pedagogie/07-cahier-des-charges-plateforme.md)
> (exigences F1 à F26, NF1 à NF8, lots L0 à L5) et sur la décision D-10 option C
> (hybride : contenu statique versionné + données de l'apprenant).

## 1.1 Principe directeur

L'application se compose de trois couches strictement séparées.

| Couche | Nature | Où elle vit | Qui la modifie |
|---|---|---|---|
| **Contenu pédagogique** | Fichiers Markdown + YAML versionnés | `content/` dans ce dépôt | Arthur (avec Claude), via Git |
| **Application** | Site web statique + composants interactifs | `src/` | Développement |
| **Données de l'apprenant** | Tentatives, résultats, progression, journal, photos | Navigateur de l'appareil (IndexedDB), avec export / import | L'apprenant, en utilisant l'application |

Conséquences :

- un cours se corrige sans toucher au code (NF7) ;
- un cours non conforme **fait échouer la construction du site** : il ne peut pas être publié (critère d'acceptation global n° 1) ;
- les résultats de l'apprenant ne sont jamais écrits dans le dépôt ; ils sont sauvegardés localement et exportables (NF4, NF5).

## 1.2 Schéma d'ensemble

```
            ┌──────────────── Dépôt Git (privé) ────────────────┐
            │                                                    │
 content/ ──┤  Markdown + YAML ──► validation (schémas + règles) │
            │                         │ échec = build bloqué     │
 src/ ──────┤  Astro (génération) ◄───┘                          │
            │      │                                             │
            └──────┼─────────────────────────────────────────────┘
                   ▼
        dist/  : pages HTML statiques + îlots interactifs (Preact)
               + service worker (hors ligne) + manifeste PWA
                   │
                   ▼ (uniquement après accord d'Arthur)
        Netlify : hébergement protégé par mot de passe
                   │
                   ▼
   Tablette / PC d'atelier : navigateur ou application installée (PWA)
        └─ IndexedDB : tentatives, progression, journal, photos
        └─ Export JSON / impression PDF / import de sauvegarde
```

## 1.3 Choix technologiques justifiés

| Besoin | Choix proposé | Pourquoi | Alternatives écartées |
|---|---|---|---|
| Génération du site à partir du contenu | **Astro** (sortie statique) | Conçu pour les sites de contenu ; « collections de contenu » avec schéma validé à la construction (couvre une partie de F25) ; n'envoie du JavaScript que pour les composants interactifs, donc pages légères sur tablette | Next.js (orienté serveur, plus lourd), SPA Vite pure (pipeline Markdown à écrire soi-même), Docusaurus / VitePress (orientés documentation, peu adaptés au QCM et à la progression) |
| Composants interactifs (exercices, QCM, simulateurs, tableau de bord) | **Preact** + TypeScript | Même modèle que React, environ 4 Ko ; une seule bibliothèque d'interface pour tout le projet | React (plus lourd sans gain ici), Svelte / Vue (valables, mais un second écosystème n'apporte rien) |
| Langage | **TypeScript** strict | Les modèles de contenu et de données sont typés une fois, partagés par l'application, le validateur et les tests | JavaScript seul (erreurs de format détectées trop tard) |
| Validation du contenu | **Zod** (fourni par Astro) + script de règles métier | Un seul schéma sert au typage, à la construction et au contrôle de conformité | JSON Schema séparé (double définition) |
| Données apprenant | **IndexedDB** via un petit module maison (≈ 150 lignes) | Fonctionne hors ligne, stocke les photos (Blob), aucune dépendance ; schéma versionné avec migrations | localStorage (5 Mo, pas de fichiers), Dexie (dépendance évitable au départ), base distante (inutile pour un seul apprenant, voir A-03) |
| Hors ligne (F8, NF3) | **Service worker écrit à la main** + manifeste PWA | Cache-first sur les pages et ressources, liste générée à la construction ; environ 100 lignes contrôlées | Workbox / vite-plugin-pwa (pratiques, mais dépendances lourdes pour un besoin simple ; reconsidérables si le cache devient complexe) |
| Schémas pédagogiques | **SVG** écrits à la main ou générés par code, stockés avec le cours | Net à toute taille sur tablette, texte alternatif, versionnable dans Git, couleurs du thème | Images bitmap (floues, non modifiables), bibliothèque de dessin de circuits (dépendance) |
| Export (F17, NF4, item 12) | **Feuille de style d'impression** → « Imprimer en PDF » du navigateur ; export **JSON** et **CSV** | Zéro dépendance, rendu fidèle | Génération PDF côté client (jsPDF, pdfmake : lourdes) |
| Typographie | **Poppins** et **Inter** auto-hébergées (fichiers woff2 dans `public/fonts/`) | Fonctionnent hors ligne, pas d'appel à Google Fonts ; licence SIL OFL | Google Fonts en ligne (pas hors ligne, requête externe) |
| Tests | **Vitest** (unitaires, contenu) + **Playwright** (bout en bout, gabarit tablette) | Standard Vite / Astro ; Playwright teste un vrai navigateur en format iPad | Jest (configuration plus lourde avec ESM), Cypress (plus lourd) |
| Intégration continue | **GitHub Actions** : validation du contenu, tests, construction | Bloque une PR dont un cours est non conforme | Contrôle uniquement local (oubliable) |
| Hébergement | **Netlify**, site protégé, déploiement **manuel** autorisé par Arthur | Demandé ; statique ; fonctions de bord pour la protection | — |
| Environnement | Node.js LTS (24), npm | Pas d'outil supplémentaire (pas de pnpm / yarn) ; Node exécute TypeScript simple sans compilateur pour les scripts | — |

### Dépendances prévues (exhaustif pour le prototype)

| Production | Développement |
|---|---|
| `astro`, `@astrojs/preact`, `preact` | `typescript`, `vitest`, `@playwright/test`, `@astrojs/check` |

Toute nouvelle dépendance devra être justifiée dans la PR qui l'ajoute (règle `.claude/rules/dependances.md`).
Les versions seront épinglées (fichier `package-lock.json` versionné) au moment de la phase 2.

## 1.4 Identité visuelle (jetons de thème)

```css
:root {
  --bleu-principal: #1E88E5;   /* actions, liens, progression */
  --bleu-secondaire: #1565C0;  /* survol, accents */
  --fond-1: #1E2225;           /* fond de page */
  --fond-2: #2F3336;           /* cartes, panneaux */
  --texte: #C7CCD1;            /* texte courant */
  --police-titres: "Poppins", system-ui, sans-serif;
  --police-texte: "Inter", system-ui, sans-serif;
}
```

Les quatre étiquettes de fiabilité reçoivent chacune une couleur **et** un pictogramme
(pour ne pas dépendre de la couleur seule, NF8). Le contraste du texte #C7CCD1 sur
#1E2225 et sur #2F3336 sera vérifié automatiquement (objectif WCAG AA) ; à contrôler
en particulier pour le bleu #1E88E5 utilisé comme couleur de texte sur fond sombre.

Cibles tactiles d'au moins 48 × 48 px, police de base 18 px en mode atelier (NF2).

## 1.5 Données de l'apprenant

Stockage local d'abord (*local-first*), structuré comme un **journal d'événements** :
chaque tentative est ajoutée, jamais écrasée. La progression est recalculée à partir
de ce journal, ce qui donne gratuitement l'historique (item 8) et rend les migrations sûres.

| Magasin IndexedDB | Contenu | Exigence |
|---|---|---|
| `tentatives` | Exercice, QCM ou évaluation pratique : identifiant de l'élément, **version du contenu au moment de la tentative**, réponses, score, durée, date | F13, F14, item 8 |
| `validations` | Validation de chapitre, dérogation manuelle avec motif (tracée) | F2 |
| `temps` | Temps passé par semaine et par bloc | F4 |
| `journal` | Séances, mesures, photos (lot L3) | F17, F18 |
| `meta` | Version du schéma de données, date du dernier export | NF5 |

Règles :

- **Sauvegarde automatique** à chaque saisie (pas de bouton « enregistrer ») ;
- demande de **stockage persistant** au navigateur (`navigator.storage.persist()`) ;
- **export complet** en un fichier JSON daté, rappel d'export hebdomadaire sur le tableau de bord, **import** avec contrôle de format et aperçu avant remplacement ;
- **migrations** numérotées et testées à chaque changement du schéma de données ;
- aucune donnée client ni donnée véhicule identifiante (NF6) : le formulaire du journal ne prévoit pas de champ VIN ou plaque.

La synchronisation entre appareils (PC + tablette) est reportée à un lot ultérieur
(voir décision A-03) ; d'ici là, l'export / import fait office de transfert.

## 1.6 Progression par compétence

- Chaque question, exercice et critère pratique est rattaché à un ou plusieurs codes du [référentiel](../pedagogie/01-referentiel-competences.md) (D1.1, D2.2…).
- Le niveau affiché par compétence suit la règle de l'[évaluation](../pedagogie/04-evaluation.md) : une compétence est validée au niveau visé quand la semaine qui l'enseigne **et** le jalon qui la vérifie sont validés. Avant cela, l'application montre une progression partielle (« enseignée », « QCM réussi », « pratique validée avec preuve »), jamais un niveau non mérité.
- Seuils (QCM ≥ 80 %, 100 % sur les questions sécurité, pratique ≥ 70 %) lus dans un fichier de configuration du contenu (`content/parametres.yaml`), pas codés en dur : ils restent modifiables (D-04).

## 1.7 Corrections masquées

- Les corrections d'exercices et le corrigé de chapitre sont stockés dans des fichiers séparés du cours.
- À la construction, ils sont placés dans des fichiers distincts que l'application **ne charge qu'après la soumission** de la réponse.
- Limite assumée : dans un site statique, une personne qui inspecte le code du navigateur peut les trouver. Pour un apprenant unique qui s'auto-évalue, c'est acceptable ; pour de futurs apprenants multiples, il faudra une vérification côté serveur (voir A-05).

## 1.8 Simulateurs pédagogiques et données réelles

| | Simulateurs pédagogiques | Données techniques réelles |
|---|---|---|
| Emplacement | `src/simulateurs/` (code) | `content/bibliotheque/` (fiches sources) |
| Nature | Modèles idéalisés : loi d'Ohm, diviseur, RC, oscilloscope sur signal synthétique | Références documentaires : datasheets, normes, notices, avec révision et date |
| Affichage | Bandeau permanent « Simulation pédagogique : modèle idéalisé, ce n'est pas une donnée constructeur » + hypothèses de calcul affichées (F12) | Étiquette [SOURCÉ] liée à la fiche source |
| Règle technique | Un simulateur **ne peut pas importer** de fichier de `content/bibliotheque/` ; un test d'architecture le vérifie | Une fiche source ne contient que des références et des extraits autorisés par la licence (F23) |

Il n'existe aucun « schéma constructeur » dans l'application : toute figure porte une
origine (`areprog` = réalisée par AREPROG, ou référence d'une fiche source avec licence).
Le validateur refuse une figure sans origine.

## 1.9 Protocole de sécurité renforcé (airbag, ABS, direction)

Arthur a décidé d'inclure ces calculateurs **en pratique**, avec un protocole renforcé.
Les documents pédagogiques (D-02, D-03, règle « calculateurs de sécurité » de
[03-travaux-pratiques](../pedagogie/03-travaux-pratiques.md)) sont encore à l'option
« exclusion / observation » et doivent être mis à jour dans le fil pédagogique.

La plateforme ne rédige pas le protocole (c'est un contenu sourcé, à écrire et vérifier) ;
elle **l'impose** :

- un TP porte `securite: renforcee` et `domaines_risque: [airbag | abs-esp | direction]` dans son en-tête ;
- il reste verrouillé tant que le cours S1 et le module de sécurité spécifique au domaine ne sont pas validés (sans dérogation manuelle possible, contrairement à F2) ;
- chaque séance commence par une **check-list pré-intervention** à cocher, chaque point exigeant une preuve (photo) ;
- un critère de sécurité non coché bloque la validation, quel que soit le score ;
- un bandeau rouge rappelle en permanence le domaine de risque pendant le TP ;
- le validateur de contenu refuse un TP `renforcee` sans section « Protocole de sécurité », sans source pour chaque consigne réglementaire, ou avec une consigne étiquetée [À VÉRIFIER] (une consigne de sécurité non vérifiée ne peut pas être publiée).

## 1.10 Accès privé et déploiement

- **Aucun déploiement** sans autorisation explicite d'Arthur. Pas de déploiement automatique depuis GitHub au départ ; les aperçus de PR Netlify restent désactivés.
- Avant tout déploiement : protection par mot de passe (voir A-04), en-tête `X-Robots-Tag: noindex`, aucun document sous licence restrictive (normes, datasheets propriétaires) inclus dans le site : la bibliothèque stocke la référence et le lien, pas le fichier.
- Jusque-là, l'application s'utilise en local (`npm run dev` / `npm run preview`) sur le PC, et sur la tablette via le réseau local de l'atelier.

## 1.11 Correspondance avec la demande et le cahier des charges

| Fonctionnalité demandée | Exigences | Lot | Dans le prototype |
|---|---|---|---|
| 1. Tableau de bord pédagogique | F1, F3, F4 | L1 | Oui (version simple) |
| 2. Modules, chapitres et leçons | F1, F2, F5 | L1 | 1 module, 1 leçon |
| 3. Cours enrichis de schémas | F5, F6, NF8 | L1 | 1 schéma SVG |
| 4. Exercices interactifs | F9, F14 | L2 / L4 | 1 exercice |
| 5. Simulateurs électriques | F9–F12 | L4 | Non (sauf si l'exercice en est un, voir A-06) |
| 6. Études de cas ECU | F18, F20 | L3 / L5 | Non |
| 7. QCM et évaluations pratiques | F13–F16 | L2 | QCM seulement |
| 8. Historique des résultats | F14 | L2 | Oui (liste des tentatives) |
| 9. Progression par compétence | F3 | L1 / L2 | Oui |
| 10. Bibliothèque documentaire | F21–F23 | L5 | Non (fiches sources du cours seulement) |
| 11. Carnet de travaux pratiques | F17, F8 | L3 | Non |
| 12. Export des fiches et résultats | NF4 | L3 | Export JSON des résultats |
| Contrôle de conformité du contenu | F24–F26 | **L0** | Oui (prérequis du prototype) |
