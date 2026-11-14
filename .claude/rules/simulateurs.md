---
paths:
  - "src/simulateurs/**"
---

# Simulateurs pédagogiques

- Calculs en **fonctions pures** séparées de l'interface, chacune testée dans `tests/unitaires/`.
- Bandeau permanent : « Simulation pédagogique : modèle idéalisé, ce n'est pas une donnée constructeur ».
- Les hypothèses du modèle (composants idéaux, résistance interne négligée…) sont affichées à côté du résultat.
- Interdit d'importer quoi que ce soit de `content/bibliotheque/` ou de présenter un résultat comme la valeur d'un calculateur réel (test d'architecture).
- Pas de bibliothèque de simulation externe sans décision explicite d'Arthur.
