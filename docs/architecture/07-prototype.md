# 7. Prototype (phase 3) : état et vérification

> Réalisé le 13/11/2026. Aucun déploiement : l'application tourne en local (`npm run build && npm run preview`).

## Périmètre livré

| Élément | Où |
|---|---|
| Tableau de bord | `/` : état du chapitre, dernier QCM, exercices tentés, compétences, activité récente, rappel de sauvegarde |
| Un module | M1 Électricité fondamentale (`/parcours/m1/`) |
| Une leçon | S02-L01 Grandeurs électriques et loi d'Ohm : objectifs, prérequis, théorie, schéma SVG, 3 exemples, références, critères d'évaluation |
| Exercice interactif | 5 exercices de calcul (valeur + unité, tolérance de saisie, conversion de préfixes) et un simulateur pédagogique « loi d'Ohm » |
| QCM | Banque de 10 questions (5 types de réponse, 2 questions sécurité), corrigé et remédiation |
| Suivi de progression | État du chapitre, progression par compétence (5 étapes), historique, export / import |

En plus : fiche source, service worker hors ligne, manifeste (installation sur l'écran d'accueil), polices auto-hébergées.

## Critères d'acceptation

| # | Critère | Résultat | Preuve |
|---|---|---|---|
| P1 | Tableau de bord : module, état du chapitre, dernier score, compétences | ✓ | e2e « P1 » et « P6, P7, P8 » |
| P2 | Leçon complète avec schéma, références, critères | ✓ | e2e « P2, P3 » |
| P3 | Étiquettes distinctes (couleur + pictogramme), [SOURCÉ] ouvre la fiche | ✓ | e2e « P2, P3 » |
| P4 | Exercice noté avec tolérance et unité, correction après soumission | ✓ | e2e « P4 » (corrections absentes du HTML, chargées au premier envoi) |
| P5 | Seuil 80 %, règle 100 % sécurité, corrigé expliqué, remédiation | ✓ | tests unitaires `notation` + e2e « P5 » |
| P6 | Tentatives enregistrées avec date, score, version | ✓ | e2e « P6, P7, P8 » |
| P7 | Progression par compétence, jamais de niveau non mérité | ✓ | tests unitaires `progression` + e2e |
| P8 | Persistance et export / import aller-retour | ✓ | test unitaire `sauvegarde` + e2e (profil vierge) |
| T1 | Contenu, types, tests, build, e2e | ✓ en local et en CI | 95 tests Vitest, 43 tests Playwright (3 formats), dont la robustesse de la phase 4 |
| T2 | Contenu entièrement dans `content/` | ✓ | aucun texte pédagogique dans `src/` |
| T3 | Contenu non conforme = build bloqué | ✓ | `npm run build` lance `npm run valider` ; tests du validateur |
| T4 | Hors ligne après une première visite | ✓ | e2e « T4 » (réseau coupé : leçon, exercice, QCM) |
| T5 | Tablette : pas de défilement horizontal, cibles ≥ 48 px, zoom 200 % | ✓ | e2e « T5 » en iPad portrait et paysage |
| T6 | Couleurs AREPROG via jetons, contraste AA | ✓ avec un ajustement (voir ci-dessous) | `tests/architecture/contraste.test.ts` |
| T7 | JavaScript de la leçon < 60 Ko compressé | ✓ 11,7 Ko | e2e « T7 » |
| T8 | Dépendances limitées | ✓ | 3 en production, aucune ajoutée en phase 3 |
| T9 | Aucun déploiement | ✓ | dépôt relié à aucun site |
| C1 | Aucune valeur non étiquetée | ✓ | `npm run valider` : 0 erreur |
| C2 | Aucune donnée constructeur, schéma `origine: areprog` | ✓ | validateur |
| C3 | Texte repris du cours pilote ou marqué démonstration | Partiel | le cours pilote S2 n'est pas encore rédigé : la leçon a été écrite pour le prototype à partir du programme S2, en `statut: brouillon`, à relire |

Avertissements restants du validateur (attendus en brouillon) : banque QCM de 10 questions sur 40, prérequis S01 non publié.

## Écarts et décisions techniques prises pendant le prototype

1. **Contraste du bleu principal.** `#1E88E5` sur `#1E2225` donne 4,4:1, sous le seuil AA de 4,5:1 pour du texte. Le bleu principal sert donc aux accents (bordures, barres, contour de l'en-tête) ; les liens utilisent `#64B5F6` (même famille, 7,2:1) et les boutons ont un fond `#1565C0` avec un texte blanc (5,7:1). Les cinq couleurs de l'identité restent inchangées dans les jetons.
2. **Moteur Markdown.** Astro 7 utilise par défaut le moteur Sätteri, qui n'accepte plus les extensions remark sans dépendance supplémentaire. Les étiquettes et directives sont donc appliquées sur le HTML rendu (`src/markdown/enrichir-html.ts`), sans dépendance ajoutée et avec des tests unitaires.
3. **Prérequis non publiés.** Un prérequis absent du contenu publié (S01) ne verrouille pas le chapitre : il est signalé. Un prérequis publié et non validé verrouille, sauf dérogation tracée (logique testée ; écran de dérogation à faire).
4. **« Validé ».** Aucun chapitre ne peut être « validé » tant que l'évaluation pratique n'existe pas : l'état maximal est « QCM réussi ».
5. **Service worker.** Le serveur renvoie `Vary: Origin` sur les scripts ; la recherche dans le cache ignore cet en-tête, sinon les modules ne se chargeaient pas hors ligne.

## Lancer le prototype

```bash
npm ci
npm run build      # validation du contenu + construction
npm run preview    # http://localhost:4321, aussi accessible depuis la tablette sur le réseau local (--host)
```

## Suite (phase 4 puis 5)

- Relecture de la leçon S02-L01 par Arthur (et les agents `expert-electronique`, `verificateur-documentaire`).
- Test sur la tablette réelle de l'atelier (installation sur l'écran d'accueil, hors ligne, stockage persistant : risque R3) : procédure dans [08-test-tablette.md](08-test-tablette.md).
- Compléter la banque QCM à 40 questions, ajouter les leçons S02-L02 et S02-L03, puis S01.
