---
name: etude-cas-ecu
description: Créer une étude de cas de diagnostic de calculateur (ECU) pour AREPROG Academy, fictive pédagogique ou issue d'un dossier réel anonymisé. À utiliser pour « crée une étude de cas / un cas de panne ».
---

# Étude de cas ECU

## Choisir la nature (obligatoire)

- `nature: fictif_pedagogique` : cas construit pour l'entraînement. Bandeau « valeurs d'exemple, pas des données constructeur ». Toutes les valeurs `[EXEMPLE]`. **Aucun calculateur commercial réel n'est associé à une panne inventée** : utiliser un calculateur générique (« calculateur moteur, alimentation 12 V, régulateur 5 V interne »).
- `nature: dossier_reel_anonymise` : tiré d'un dossier de réparation AREPROG. Aucune donnée client, aucun VIN. Chaque mesure est une mesure de l'atelier, avec date et instrument. Ce qui n'a pas été mesuré n'est pas présenté comme un fait.

Demander à Arthur la nature si elle n'est pas évidente.

## Structure (`content/etudes-de-cas/CAS-xxx/`)

1. Réception : symptôme rapporté, contexte (sans donnée identifiante).
2. Hypothèses, chacune `[HYPOTHÈSE]`, classées par probabilité et coût de vérification.
3. Plan de mesures : ordre logique, point de mesure, valeur attendue étiquetée, instrument.
4. Résultats (cas réel) ou résultats à découvrir pas à pas (cas fictif, correction séparée).
5. Conclusion, intervention, validation et **limites**.
6. Sources.

Les corrections du cas fictif vont dans un fichier séparé chargé après la réponse. Lien avec les compétences du référentiel (D1.6, D8.x…).
