---
id: S36
titre: "Airbag : diagnostic et réparation"
module: M9
duree_h: 8
competences: [D10.7]
prerequis: [S35]
lecons: [S36-L01, S36-L02, S36-L03]
tp: [TP-53]
sources: [SRC-0096, SRC-0097, SRC-0013, SRC-0039, SRC-0088, SRC-0071, SRC-0077, SRC-0078, SRC-0002, SRC-0029]
version: "0.1"
statut: brouillon
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction (3 leçons, 8 exercices, banque de 25 questions, TP-53 sous protocole renforcé)
---

<!-- Semaine sous protocole de sécurité renforcé : chaque TP porte securite: renforcee (voir .claude/rules/securite-et-deploiement.md). -->

Deuxième semaine du module M9. Après l'architecture et la mise sous tension sur banc (S35), on
diagnostique un calculateur d'airbag de récupération au niveau carte : **alimentation et réserve
d'énergie**, puis **étages d'allumeurs**, et on le **répare** sous protocole renforcé, avec une
vérification sur banc par simulateurs et une comparaison avant et après. Aucune pyrotechnie, aucune
remise en circulation pendant le cursus.

Organisation conseillée des 8 h : leçons (5 h 20), exercices (40 min), TP-53 (2 h) [HYPOTHÈSE : le TP-53 peut demander une séance de plus selon le défaut].

## Mesures attendues et tolérances

**TP-53.** Décharge mesurée deux fois sans remontée [SOURCÉ : SRC-0013 §2-7 Restriking Voltage].
Si le circuit cité est identifié, élévateur de 31,6 V à 35 V [SOURCÉ : SRC-0097 §Static Electrical Characteristics, Power Management].
Dans ce cas, abaisseur de 8,73 V à 9,27 V et logique de 4,85 V à 5,15 V [SOURCÉ : SRC-0097 §Static Electrical Characteristics, Power Management].
Sinon, comparaison avec l'exemplaire de référence. Après réparation : mesures hors tension comme la
référence, aucun défaut d'allumeur avec simulateurs, mémoire d'événements identique avant et après.

## Erreurs fréquentes

- **Mesurer une sortie d'allumeur sous tension.** Détection : journal des mesures, toutes hors tension et réserve déchargée.
- **Remplacer le circuit de commande au premier défaut.** Détection : hypothèses classées et cause prouvée avant la réparation (FE-13).
- **Oublier le raccordement du simulateur.** Détection : continuité du simulateur et du cordon notée avant le diagnostic de carte.
- **Remplacer la réserve par un condensateur de tension nominale plus faible.** Détection : référence et tension du remplaçant au dossier.
- **Effacer un défaut pour voir s'il revient.** Détection : libellés des défauts notés avant et après, aucune fonction d'effacement.
- **Comparer avant et après avec d'autres instruments ou d'autres points.** Détection : mêmes points et mêmes instruments au dossier.
- **Écrire « réparé » sans limites.** Détection : dossier de validation renforcée en trois parties.

## Lien atelier

Le calculateur d'airbag est l'un des plus demandés en réparation après choc ou après une infiltration
d'eau [HYPOTHÈSE : à confirmer sur les demandes reçues par l'atelier]. La méthode reste celle de M8 :
alimentation d'abord, comparaison avec une référence, cause prouvée. Ce qui change, c'est la preuve
exigée à chaque étape et la limite écrite de ce qu'un atelier peut valider. Pendant le cursus, le
calculateur réparé ne quitte pas l'atelier (décision D-14) ; la validation sur véhicule d'atelier,
avec simulateurs, vient en S39.

## Sécurité spécifique

- Protocole renforcé appliqué dans l'ordre, grille renforcée en plus de la grille générique : chaque critère est éliminatoire et exige une preuve.
- Aucune pyrotechnie dans l'atelier : calculateurs seuls ; sorties d'allumeurs uniquement sur des simulateurs de valeur documentée.
- Réserve d'énergie chargée jusqu'à 35 V par l'élévateur du circuit cité [SOURCÉ : SRC-0097 §Static Electrical Characteristics, Power Management] : décharge mesurée deux fois avant tout contact et toute soudure [SOURCÉ : SRC-0013 §2-7 Restriking Voltage] (FE-09).
- Mesures sur les sorties d'allumeurs uniquement hors tension ; aucune surveillance forcée [SOURCÉ : SRC-0096 §FEN_1 and FEN_2 (FEN) ($C8 COMMAND)].
- Condensateur remplacé dans le bon sens et sous sa tension nominale [SOURCÉ : SRC-0013 §2-3-3 Excess Voltage Application].
- Alimentation limitée, limite écrite (FE-02), polarité (FE-03), mise sous tension progressive (FE-08) ; poste ESD [SOURCÉ : SRC-0002 §ESD Damage: How Devices Fail] (FE-01) ; masse des sondes [SOURCÉ : SRC-0029 §Use Proper Grounding Procedures] (FE-07).
- Aucune écriture ni effacement de mémoire ; le cours n'enseigne pas l'effacement des données de collision.
- Fautes éliminatoires de la semaine : FE-01 à FE-04, FE-07, FE-08, FE-09, FE-13 et FE-14, plus tous les critères de la grille renforcée.
