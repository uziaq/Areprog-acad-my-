---
paths:
  - "content/**"
  - "scripts/nouveau-chapitre.ts"
---

# Format du contenu

Référence complète : `docs/architecture/03-modele-de-contenu.md`. Schémas : `src/schemas/contenu.ts`.

- Hiérarchie : `content/parcours/<M>-<nom>/module.yaml` → `<Sxx>-<slug>/chapitre.md` → `lecons/<Sxx-Lyy>-<slug>.md`.
- Identifiants **stables** : `M1`, `S02`, `S02-L01`, `S02-L01-EX01`, `S02-Q001`, `TP-03`, `SRC-0001`, `S02-F01`. Jamais réutilisés ni renommés ; un élément retiré passe en `statut: retire`.
- `version` entre guillemets (`"0.1"`) : mineur = forme ; majeur = réponse, objectif ou valeur attendue modifiés. Ajouter une ligne à `historique`.
- Énoncés dans `exercices/*.yaml` et `qcm/banque.yaml` **sans** solution ; solutions dans `corrections/*.yaml` et `qcm/reponses.yaml`.
- Directives dans le corps : `::figure{id=S02-F01}` et `::exercice{id=S02-L01-EX01}`, déclarées dans l'en-tête.
- Chaque objectif a au moins un critère d'évaluation ; chaque exercice est rattaché à un objectif de sa leçon.
- `chapitre.md` contient les sections `## Mesures attendues et tolérances` et `## Erreurs fréquentes`.
- Statuts : `brouillon` → `relu` (après relecture des agents) → `valide` (Arthur uniquement).
- Toujours finir par `npm run valider`.
