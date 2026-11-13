---
paths:
  - "tests/**"
  - "src/lib/**"
  - "src/validation/**"
---

# Tests

- Tout calcul de notation, de tolérance, de seuil ou de progression a un test unitaire (`tests/unitaires/`).
- Toute règle du validateur a un test dans `tests/contenu/validateur.test.ts` : la fixture `conforme` passe, une copie modifiée échoue avec la bonne règle. Ne jamais modifier la fixture pour faire passer un test.
- Les frontières (simulateurs ↛ bibliothèque, corrections absentes du HTML initial, couleurs via jetons) sont dans `tests/architecture/`.
- Les tests de bout en bout tournent au format tablette (portrait et paysage) et bureau.
- Ne jamais désactiver, ignorer ou affaiblir un test pour obtenir un résultat vert : corriger la cause.
