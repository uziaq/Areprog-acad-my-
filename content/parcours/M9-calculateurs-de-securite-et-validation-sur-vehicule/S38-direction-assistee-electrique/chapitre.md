---
id: S38
titre: "Direction assistée électrique"
module: M9
duree_h: 8
competences: [D10.6, D10.7]
prerequis: [S37]
lecons: [S38-L01, S38-L02, S38-L03]
tp: [TP-56, TP-57]
sources: [SRC-0102, SRC-0103, SRC-0104, SRC-0099, SRC-0086, SRC-0090, SRC-0013, SRC-0002, SRC-0029]
version: "0.1"
statut: brouillon
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction (3 leçons, 8 exercices, banque de 25 questions, TP-56 et TP-57 sous protocole renforcé)
---

<!-- Semaine sous protocole de sécurité renforcé : chaque TP porte securite: renforcee (voir .claude/rules/securite-et-deploiement.md). -->

Quatrième semaine du module M9. Après l'airbag et le freinage, la direction : architecture générique
d'un calculateur de direction assistée électrique (commande de pont, pont de MOSFET triphasé, mesure
de courant, surveillances), **pont de puissance** contrôlé hors tension puis sur banc avec des charges
réduites, **capteur de couple** redondant relevé sur véhicule d'atelier immobilisé, moteur arrêté puis
en marche, et calibrations d'après-intervention décrites par le constructeur.

Organisation conseillée des 8 h : leçons (5 h 20), exercices (40 min), TP-56 (1 h 15), TP-57 (45 min) [HYPOTHÈSE : répartition à ajuster selon le véhicule et le calculateur disponibles].

## Mesures attendues et tolérances

**TP-56.** Trois phases semblables hors tension, entre elles et avec la référence. Charges réduites
conformes à leur fiche, mesurées avant branchement. Tension grille-source côté bas à l'état haut dans
la plage de la fiche si le circuit cité est identifié [SOURCÉ : SRC-0102 §6.5 Electrical Characteristics].
Sinon, comparaison avec la référence montée sur le même banc.

**TP-57.** Deux voies du capteur de couple cohérentes entre elles, volant au centre puis tourné dans
les deux sens, moteur arrêté puis en marche [HYPOTHÈSE : relation entre voies selon le constructeur].
Niveaux réels dans la documentation du constructeur [À VÉRIFIER : documentation du véhicule d'atelier].

## Erreurs fréquentes

- **Brancher le moteur d'assistance sur l'alimentation de labo.** Détection : charges réduites et leur source au dossier.
- **Poser la masse d'une sonde sur une phase.** Détection : photos des sondes, mesure côté haut en différentiel.
- **Prendre une surveillance qui a réagi pour un transistor mort.** Détection : défauts lus et conditions de vie du microcontrôleur relevées avant le pont.
- **Conclure sur une seule phase.** Détection : comparaison des trois phases et de la référence.
- **Lire une trame numérique au multimètre.** Détection : type de sortie justifié par la documentation avant la mesure.
- **Faire tourner le moteur sans aspiration.** Détection : photo de l'aspiration posée, durée moteur en marche écrite.
- **Oublier les calibrations après intervention.** Détection : liste du constructeur jointe au dossier.

## Lien atelier

Les calculateurs de direction reviennent pour des pertes d'assistance, souvent avec un défaut de
capteur de couple ou de pont mémorisé [HYPOTHÈSE : à confirmer sur les demandes reçues par l'atelier].
Une partie des défauts vient de l'alimentation, du câblage ou du capteur et non du calculateur : la
mesure sur véhicule évite un remplacement inutile. Sur banc, les charges réduites protègent
l'alimentation et la carte ; la validation complète, calibrations comprises, ne se fait que sur
véhicule d'atelier (S39).

## Sécurité spécifique

- Protocole renforcé appliqué dans l'ordre, grille renforcée en plus de la grille générique : chaque critère est éliminatoire et exige une preuve.
- Charges de substitution réduites uniquement, avec valeur, puissance et source ; fusible ; limite écrite pour chaque essai ; aucun moteur d'assistance sur l'alimentation de laboratoire.
- Aucune surveillance forcée : la commande de pont citée surveille tensions drain-source, courant, alimentations et température [SOURCÉ : SRC-0102 §1 Features].
- Décharge mesurée deux fois avant tout contact [SOURCÉ : SRC-0013 §2-7 Restriking Voltage] (FE-09) ; poste ESD [SOURCÉ : SRC-0002 §ESD Damage: How Devices Fail] (FE-01) ; masse des sondes jamais sur une phase [SOURCÉ : SRC-0029 §Use Proper Grounding Procedures] (FE-07).
- Moteur en marche seulement avec captage des gaz d'échappement au plus près de leur émission [SOURCÉ : SRC-0104 §Démarche de prévention des risques] ; intoxication au monoxyde de carbone possible sinon [SOURCÉ : SRC-0104 §Effets sur la santé].
- Véhicule d'atelier thermique uniquement (D-15), immobilisé, connexions batterie débranchée, aucun déplacement, calibrations du constructeur avant tout roulage, critères d'arrêt écrits (FE-15).
- Fautes éliminatoires de la semaine : FE-01 à FE-04, FE-07, FE-08, FE-09, FE-13, FE-14 et FE-15, plus tous les critères de la grille renforcée.
