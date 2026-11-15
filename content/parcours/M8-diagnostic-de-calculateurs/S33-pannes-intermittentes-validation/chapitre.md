---
id: S33
titre: "Pannes intermittentes, validation et dossier"
module: M8
duree_h: 8
competences: [D10.4, D10.5]
prerequis: [S32]
lecons: [S33-L01, S33-L02, S33-L03]
tp: [TP-49, TP-50]
sources: [SRC-0094, SRC-0095, SRC-0014, SRC-0071, SRC-0002, SRC-0062, SRC-0079, SRC-0013, SRC-0029]
version: "0.1"
statut: brouillon
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction (3 leçons, 8 exercices, banque de 25 questions, TP-49, TP-50)
---

Dernière semaine de cours du module M8, avant le jalon 3. Elle ferme la boucle ouverte en S30 : après
le diagnostic et la réparation viennent les pannes qui se cachent (**intermittentes**), la **preuve**
qu'une réparation tient (protocole de validation) et le **dossier** qui la rend traçable et
compréhensible par le client.

Organisation conseillée des 8 h : leçons (5 h 30), exercices (30 min), TP-49 (1 h), TP-50 (1 h) [HYPOTHÈSE : répartition à ajuster ; le TP-50 peut s'appuyer sur un dossier préparé en S30 à S32].

## Mesures attendues et tolérances

**TP-49.** Une seule zone fait apparaître la panne de façon répétable ; la preuve vient d'une image
au microscope ou d'une mesure. Joint repris conforme aux critères de S26 [SOURCÉ : SRC-0071 §12.9 Inspection Criteria, Specific].
Après réparation, la même contrainte appliquée le même nombre de fois ne fait plus apparaître la panne.

**TP-50.** Mesures après réparation aux mêmes points et avec les mêmes instruments qu'au diagnostic,
comparées à la référence [HYPOTHÈSE : valeurs de référence mesurées, pas publiées]. Durée et nombre de
cycles conformes au protocole écrit avant l'essai.

## Erreurs fréquentes

- **Contraindre toute la carte d'un coup.** Détection : tableau des zones, une seule zone par essai.
- **Ne pas surveiller de signal pendant la contrainte.** Détection : capture de la panne avec ses réglages au dossier.
- **Prendre le givre pour une preuve.** Détection : image au microscope ou mesure qui confirme la zone.
- **Utiliser une bombe de froid non antistatique.** Détection : produit et fiche notés au journal.
- **Écrire le protocole après l'essai.** Détection : protocole daté avant les résultats.
- **Déclarer « réparé » sans limite.** Détection : rubrique Limites remplie, contrôles recommandés.
- **Garder une valeur « normale » sans source.** Détection : chaque valeur du dossier étiquetée (FE-14).

## Lien atelier

Les pannes intermittentes sont parmi les plus longues à traiter et les plus fréquentes en retour
client [HYPOTHÈSE : à confirmer sur les dossiers de l'atelier]. Une méthode écrite (surveiller,
contraindre une zone, prouver) évite les heures perdues et les remplacements au hasard. Le dossier
complet protège l'atelier et informe le client : il dit ce qui a été fait, ce qui a été validé et ce
qui reste à contrôler sur le véhicule.

## Sécurité spécifique

- Protocole commun calculateurs réels pour le TP-50, appliqué dans l'ordre ; mise sous tension progressive, limite de courant écrite (FE-08, FE-02) ; polarité vérifiée (FE-03).
- Décharge mesurée avant tout contact après une mise sous tension, puis mesurée de nouveau [SOURCÉ : SRC-0013 §2-7 Restriking Voltage] (FE-09).
- Bombe de froid antistatique, poste ESD en place [SOURCÉ : SRC-0094 §Diagnosing Static Sensitive Electronics] (FE-01) ; utilisée selon sa fiche de données de sécurité.
- Chaleur douce sous la température admise par les composants, voisins protégés.
- Masse des sondes sur la masse de la carte [SOURCÉ : SRC-0029 §Use Proper Grounding Procedures] (FE-07).
- Critères d'arrêt de l'essai écrits avant l'essai.
- Calculateurs d'airbag, d'ABS / ESP et de direction exclus : leur validation suit le protocole renforcé de M9.
- Fautes éliminatoires de la semaine : FE-01 à FE-04, FE-07, FE-08, FE-09, FE-13 et FE-14.
