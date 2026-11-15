---
id: S35
titre: "Sécurité fonctionnelle et airbag sur banc"
module: M9
duree_h: 8
competences: [D10.6, D10.7]
prerequis: [S34]
lecons: [S35-L01, S35-L02, S35-L03]
tp: [TP-52]
sources: [SRC-0096, SRC-0097, SRC-0098, SRC-0099, SRC-0013, SRC-0002, SRC-0029]
version: "0.1"
statut: brouillon
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction (3 leçons, 8 exercices, banque de 25 questions, TP-52 sous protocole renforcé)
---

<!-- Semaine sous protocole de sécurité renforcé : chaque TP porte securite: renforcee (voir .claude/rules/securite-et-deploiement.md). -->

Première semaine du module M9 et du **protocole renforcé**. Elle donne les notions de sécurité
fonctionnelle utiles à l'atelier (niveaux ASIL, défaillances, surveillance, redondance, état sûr),
décrit l'architecture générique d'un calculateur d'airbag d'après des fiches publiques, puis met un
calculateur d'airbag de récupération sous tension sur banc, **sans aucune pyrotechnie**, avec des
simulateurs d'allumeurs, après une décharge de la réserve d'énergie vérifiée par la mesure.

Prérequis particulier : protocole renforcé lu et signé avant le TP-52.

Organisation conseillée des 8 h : leçons (5 h 20), exercices (40 min), TP-52 (2 h) [HYPOTHÈSE : répartition à ajuster selon le calculateur disponible].

## Mesures attendues et tolérances

**TP-52.** Décharge de la réserve mesurée deux fois avant tout contact, sans remontée de tension entre
les deux mesures [SOURCÉ : SRC-0013 §2-7 Restriking Voltage] ; seuil de manipulation fixé par la procédure de l'atelier [À VÉRIFIER : seuil à fixer par Arthur].
Simulateurs d'allumeurs conformes à la valeur documentée par l'outil ou le constructeur, cordons
compensés [À VÉRIFIER : valeur et tolérance pour le calculateur étudié].
Avec simulateurs, aucun défaut d'allumeur ; sorties ouvertes, défaut « allumeur ouvert » [HYPOTHÈSE : à constater avec l'outil].
Courant au démarrage plus fort qu'en régime établi, pendant la charge de la réserve [HYPOTHÈSE : à constater] ; mémoire d'événements identique avant et après.

## Erreurs fréquentes

- **Supposer la réserve déchargée après un temps d'attente.** Détection : deux mesures photographiées au dossier.
- **Ne mesurer la décharge qu'une fois.** Détection : seconde mesure après attente, pas de remontée.
- **Choisir une résistance « typique » comme simulateur.** Détection : valeur et source de chaque simulateur au dossier.
- **Forcer une entrée d'autorisation ou un reset pour faire démarrer le calculateur.** Détection : aucune liaison ajoutée sur la carte, photos avant et après.
- **Lire un défaut d'allumeur ouvert comme une panne de carte.** Détection : état des sorties (simulateurs ou ouvertes) noté avant la lecture.
- **Effacer des défauts ou la mémoire d'événements.** Détection : lecture avant et après identique, aucune fonction d'effacement utilisée.
- **Présenter un repérage de carte comme une donnée constructeur.** Détection : chaque repérage étiqueté.

## Lien atelier

Un calculateur d'airbag n'est pas un calculateur comme les autres : il garde de l'énergie après
débranchement, commande des éléments pyrotechniques et peut enregistrer un choc. L'atelier qui
l'ouvre doit prouver, à chaque étape, qu'aucun déclenchement n'est possible et qu'aucune donnée n'a
été modifiée. Les notions de sécurité fonctionnelle expliquent pourquoi on ne contourne jamais une
surveillance et pourquoi on préfère la référence d'origine d'un composant. La réparation proprement
dite vient en S36 ; aucun calculateur de sécurité n'est remis en circulation pendant le cursus
(décision D-14).

## Sécurité spécifique

- Protocole renforcé appliqué dans l'ordre, grille renforcée en plus de la grille générique : chaque critère est éliminatoire et exige une preuve.
- Aucune pyrotechnie dans l'atelier de formation : calculateur seul, sans module d'airbag ni prétensionneur ; sorties d'allumeurs reliées uniquement à des simulateurs de valeur documentée, ou laissées ouvertes.
- Réserve d'énergie chargée jusqu'à 33 V par l'élévateur du circuit cité [SOURCÉ : SRC-0097 §BOOST CONVERTER] : décharge mesurée deux fois avant tout contact [SOURCÉ : SRC-0013 §2-7 Restriking Voltage] (FE-09).
- Alimentation limitée, limite écrite avant chaque mise sous tension (FE-02), polarité vérifiée (FE-03), mise sous tension progressive (FE-08).
- Aucune surveillance shuntée ou forcée ; l'entrée d'autorisation de tir n'est jamais forcée [SOURCÉ : SRC-0096 §FEN_1 and FEN_2 (FEN) ($C8 COMMAND)].
- Poste ESD [SOURCÉ : SRC-0002 §ESD Damage: How Devices Fail] (FE-01) ; masse des sondes sur la masse de la carte [SOURCÉ : SRC-0029 §Use Proper Grounding Procedures] (FE-07).
- Aucune écriture ni effacement de mémoire ; le cours n'enseigne pas l'effacement des données de collision.
- Fautes éliminatoires de la semaine : FE-01 à FE-04, FE-07, FE-08, FE-09, FE-13 et FE-14, plus tous les critères de la grille renforcée.
