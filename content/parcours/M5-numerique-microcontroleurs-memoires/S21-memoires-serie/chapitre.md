---
id: S21
titre: "Mémoires EEPROM et Flash série"
module: M5
duree_h: 8
competences: [D7.3, D7.4, D9.1]
prerequis: [S20]
lecons: [S21-L01, S21-L02, S21-L03]
tp: [TP-30, TP-31]
sources: [SRC-0059, SRC-0060, SRC-0061, SRC-0062, SRC-0053]
version: "0.1"
statut: brouillon
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction (3 leçons, 8 exercices, banque de 25 questions, TP-30, TP-31, séance FR-17)
---

Troisième semaine du module M5, au cœur du métier AREPROG : les mémoires série d'un calculateur.
On apprend à identifier une EEPROM I²C, une EEPROM Microwire ou une Flash SPI, à la lire hors
circuit et en circuit, à sauvegarder deux fois et à comparer les empreintes, puis à comprendre ses
protections d'écriture et les causes de corruption. Toute écriture se fait sur carte
d'entraînement ; la dépose sur calculateur réel attend S27.

Organisation conseillée des 8 h : leçons (4 h), exercices (30 min), TP-30 (1 h 15), TP-31
(1 h 30), FR-17 (45 min) [HYPOTHÈSE : répartition à ajuster selon le groupe].

## Mesures attendues et tolérances

**TP-30 et TP-31.** Deux lectures d'une même mémoire doivent donner deux empreintes identiques ; aucun
écart n'est admis, car un seul bit modifié change l'empreinte avec une très forte probabilité
[SOURCÉ : SRC-0062 §1 INTRODUCTION]. La taille du fichier vaut la capacité de la fiche en octets. Avec
WP haute, l'écriture de l'EEPROM I²C étudiée est refusée [SOURCÉ : SRC-0059 §Hardware Write Protection].
Aucune broche ne reçoit plus que VCC + 0,5 V [SOURCÉ : SRC-0059 §Absolute Maximum Ratings].

## Erreurs fréquentes

- **Copier le premier fichier au lieu de relire.** Détection : deux lectures complètes, deux fichiers, deux empreintes.
- **Choisir une référence voisine dans le logiciel.** Détection : comparer la taille du fichier à la capacité de la fiche.
- **Mauvaise organisation pour une Microwire.** Détection : relever le niveau de la broche ORG sur la carte et régler le programmateur en conséquence.
- **Programmateur 5 V sur une mémoire 3,3 V** [EXEMPLE]. Détection : vérifier la tension du programmateur avant de brancher.
- **Prendre un fichier plein de FFh pour une mémoire vierge.** Détection : une seconde méthode de lecture ou une référence départage mémoire vierge et lecture ratée.
- **Pince retournée.** Détection : repère de broche 1 vérifié sur la mémoire et sur la pince avant la mise sous tension.
- **Écrire avant d'avoir deux sauvegardes identiques archivées.** Détection : l'empreinte est notée au journal avant toute écriture.

## Lien atelier

Chez AREPROG, la sauvegarde d'une mémoire précède toute intervention : deux lectures, deux empreintes
identiques, archivage [EXEMPLE : règle du protocole commun calculateurs réels du catalogue des TP].
Le choix entre lecture en circuit et hors circuit se fait selon la carte : en circuit, plus rapide
mais sensible à l'alimentation parasite et au microcontrôleur ; hors circuit, plus sûr mais avec une
dépose [HYPOTHÈSE : choix à justifier sur chaque calculateur]. Le contenu d'une mémoire de calculateur
n'est jamais interprété ni modifié dans ce cours ; aucun brochage de calculateur réel n'est donné.

## Fil rouge FR-17 : repose d'un SOIC-8 au fer

Dix-septième séance du fil rouge microsoudure. Critère de réussite du catalogue des TP : continuité
de chaque broche, pastilles intactes.

1. Préparer le poste : aspiration des fumées en marche, fer sur son support, poste ESD (bracelet relié), flux, tresse, brucelles, microscope.
2. Sur la carte d'entraînement, photographier le SOIC-8 et noter le repère de sa première broche sur un croquis.
3. Déposer comme à FR-10 ; nettoyer les pastilles à la tresse et au flux, sans les arracher.
4. Poser le circuit dans le bon sens d'après le croquis ; souder deux broches opposées, contrôler l'alignement.
5. Souder les autres broches ; retirer les ponts à la tresse ; nettoyer le flux.
6. Contrôler au microscope ; à l'ohmmètre, continuité de chaque broche vers sa piste et absence de pont ; photographier.
7. Réglage de la température de la panne : notice de la station et fiche de l'alliage [À VÉRIFIER : température recommandée dans la notice de la station et la fiche de l'alliage utilisés].

## Sécurité spécifique

- Tension du programmateur réglée dans la plage de la fiche de la mémoire avant de brancher ; aucune broche au-delà de VCC + 0,5 V [SOURCÉ : SRC-0059 §Absolute Maximum Ratings].
- Fautes éliminatoires de la semaine : FE-01 (ESD), FE-02 (limite non écrite si une alimentation de laboratoire est utilisée), FE-03 (polarité).
- Pas de calculateur réel cette semaine : TP-30 et TP-31 se font sur carte d'entraînement. Sur calculateur réel, le protocole commun impose deux sauvegardes identiques avant toute écriture ou soudure à proximité.
- Aucune écriture sans deux sauvegardes identiques archivées, et seulement sur la carte du TP-30.
- FR-17 et TP-31 : aspiration des fumées en marche pendant toute la soudure ; fer sur son support ; pièces chaudes posées sur un support.
