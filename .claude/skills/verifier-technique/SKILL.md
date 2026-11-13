---
name: verifier-technique
description: Vérifier l'exactitude technique et documentaire d'un cours, d'un TP ou d'un QCM AREPROG Academy avant son passage en « relu ». À utiliser pour « vérifie / relis / contrôle le cours Sxx ».
---

# Vérification technique

1. Lancer `npm run valider` et noter les diagnostics du chapitre.
2. Lister chaque affirmation technique et chaque valeur du chapitre (leçons, `chapitre.md`, TP, exercices, corrections, réponses QCM).
3. Pour chacune, déterminer le statut :
   - **Calcul** : le refaire entièrement (unités, ordre de grandeur, arrondi). Toute divergence est une erreur.
   - **[SOURCÉ]** : la fiche existe, la révision et la date sont renseignées, la section citée contient bien l'information (agent `verificateur-documentaire`).
   - **[EXEMPLE]** : valeur réaliste et sans ambiguïté avec une donnée constructeur.
   - **Non étiquetée** : à étiqueter.
   - **Douteuse** : passer en `[À VÉRIFIER : motif]`.
4. Vérifier la sécurité : limitation de courant, tensions, ESD, EPI ; protocole renforcé pour airbag / ABS / direction et TP sur véhicule (sources obligatoires).
5. Vérifier les tolérances : chaque tolérance est justifiée (composant + instrument).
6. Ne **jamais** corriger une valeur en en inventant une autre : proposer la correction avec sa source, ou marquer `[À VÉRIFIER]`.

## Sortie

Un tableau `Fichier | Affirmation | Statut (OK / corrigé / à vérifier / erreur) | Action`, puis la liste des corrections appliquées. Ne pas changer `statut` ; proposer `relu` seulement si aucune erreur ne reste.
