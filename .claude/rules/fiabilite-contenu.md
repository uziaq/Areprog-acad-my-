---
paths:
  - "content/**"
  - "docs/pedagogie/**"
---

# Fiabilité du contenu

## Étiquettes obligatoires

Chaque valeur numérique, brochage, caractéristique de composant ou affirmation de diagnostic porte une étiquette dans la même phrase :

| Étiquette | Quand |
|---|---|
| `[SOURCÉ : SRC-0001 §4.2]` | La valeur vient d'une fiche de `content/bibliotheque/sources/` ; citer la section |
| `[EXEMPLE]` | Valeur choisie pour un calcul ou une illustration pédagogique |
| `[HYPOTHÈSE]` | Raisonnement de diagnostic à confirmer par une mesure |
| `[À VÉRIFIER : motif]` | Information plausible mais non confirmée par une source |

## Interdits

- Inventer un brochage, une valeur de datasheet, une valeur ou tolérance constructeur, un schéma de calculateur réel, une panne « connue ».
- Attribuer une panne fictive à un calculateur commercial nommé.
- Remplacer une source manquante par une valeur « typique » non étiquetée.
- Recopier une norme ou une datasheet sous licence restrictive : citer la référence et la section.

## Quand une source manque

Écrire `[À VÉRIFIER : ce qu'il faut trouver]`, le signaler dans le résumé de la tâche, et continuer. Ne jamais lever un avertissement du validateur en supprimant l'information : ajouter l'étiquette juste.

## Consignes de sécurité

Une consigne de sécurité (TP, protocole renforcé airbag / ABS / direction, véhicule) ne peut être ni `[HYPOTHÈSE]` ni `[À VÉRIFIER]` une fois publiée : elle doit être sourcée.
