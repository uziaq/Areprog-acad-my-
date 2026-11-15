---
id: S39
titre: "Validation sur véhicule"
module: M9
duree_h: 8
competences: [D10.6, D10.7]
prerequis: [S38]
lecons: [S39-L01, S39-L02, S39-L03]
tp: [TP-58, TP-59, TP-60]
sources: [SRC-0104, SRC-0099, SRC-0097, SRC-0013, SRC-0002, SRC-0029]
version: "0.1"
statut: brouillon
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction (3 leçons, 8 exercices, banque de 25 questions, TP-58 à TP-60 sous protocole renforcé)
---

<!-- Semaine sous protocole de sécurité renforcé : chaque TP porte securite: renforcee (voir .claude/rules/securite-et-deploiement.md). -->

Dernière semaine du module M9. Les calculateurs réparés en M8 et en M9 passent du banc au véhicule
d'atelier : compatibilité et protocole écrits avant l'essai, comparaison avec le calculateur d'origine
à l'outil de diagnostic (défauts, valeurs réelles, apprentissages, essais du constructeur), règles
propres à l'airbag, à l'ABS / ESP et à la direction, puis **dossier de validation renforcée** en trois
parties. Prérequis du programme : au moins un calculateur réparé en M8 et un en M9 ; sinon, panne
provoquée réversible selon les règles de M8.

Organisation conseillée des 8 h : leçons (5 h 20), exercices (40 min), TP-58 (45 min), TP-59 (45 min), TP-60 (30 min) [HYPOTHÈSE : répartition à ajuster selon le véhicule et les calculateurs disponibles].

## Mesures attendues et tolérances

**TP-58 et TP-59.** Valeurs réelles du calculateur réparé comparables à celles du calculateur
d'origine, relevées sur le même véhicule dans les mêmes conditions, à la résolution affichée par
l'outil [HYPOTHÈSE : résolution de l'outil]. Aucun défaut lié au calculateur réparé qui revient après
effacement des défauts ordinaires [HYPOTHÈSE : réparation réussie]. Tension de batterie notée au début
et à la fin de chaque relevé.

**TP-60.** Toutes les lignes du dossier avec une preuve, aucun recouvrement entre les trois parties,
mention D-14 sur chaque dossier.

## Erreurs fréquentes

- **Monter un calculateur sur la seule référence matérielle.** Détection : fiche de compatibilité avec la référence logicielle.
- **Effacer les défauts avant de les enregistrer.** Détection : rapports de l'outil avant et après joints au dossier.
- **Comparer à une valeur « habituelle ».** Détection : relevés du calculateur d'origine sur le même véhicule.
- **Faire tourner le moteur sans aspiration.** Détection : photo de l'aspiration posée.
- **Mettre le calculateur d'airbag réparé face à des allumeurs réels.** Détection : photos des modules débranchés et des simulateurs.
- **Écrire « validé » pour un essai non fait.** Détection : relecture du dossier, ligne par ligne, avec sa preuve.

## Lien atelier

Chez un client, la validation sur véhicule est l'étape qui précède la restitution ; une réparation
de carte sans elle laisse des doutes (apprentissages manquants, défauts restés) [HYPOTHÈSE : retours
à confirmer sur les demandes reçues par l'atelier]. Pendant le cursus, on apprend la méthode sur les
véhicules de l'atelier, et l'on apprend surtout à écrire honnêtement ce qui n'a pas pu être validé.
Les calculateurs de sécurité réparés ne sont pas remis en circulation (D-14).

## Sécurité spécifique

- Protocole renforcé appliqué dans l'ordre, grille renforcée en plus de la grille générique : chaque critère est éliminatoire et exige une preuve.
- Véhicule d'atelier thermique uniquement (D-15), immobilisé, connexions batterie débranchée dans l'ordre du constructeur, aucun déplacement pendant les TP, critères d'arrêt écrits (FE-15).
- Airbag : modules pyrotechniques débranchés et remplacés par des simulateurs ; personne dans l'habitacle à la mise sous contact ; la réserve d'énergie garde de quoi tirer après la perte de la batterie [SOURCÉ : SRC-0097 §ENERGY RESERVE CONTROL], décharge mesurée deux fois [SOURCÉ : SRC-0013 §2-7 Restriking Voltage] (FE-09).
- ABS / ESP : purge et contrôle de pédale, puis essais statiques avant tout déplacement ; direction : calibrations avant tout roulage ; essais dynamiques sur voie privée uniquement.
- Moteur en marche seulement avec captage des gaz au plus près [SOURCÉ : SRC-0104 §Démarche de prévention des risques].
- Poste ESD [SOURCÉ : SRC-0002 §ESD Damage: How Devices Fail] (FE-01) ; masse des sondes [SOURCÉ : SRC-0029 §Use Proper Grounding Procedures] (FE-07).
- Aucun effacement ni modification de données de collision ou d'antidémarrage ; aucun calculateur de sécurité remis en circulation (D-14).
- Fautes éliminatoires de la semaine : FE-01, FE-03, FE-04, FE-07, FE-09, FE-13, FE-14 et FE-15, plus tous les critères de la grille renforcée.
