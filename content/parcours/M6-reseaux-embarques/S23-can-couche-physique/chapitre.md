---
id: S23
titre: "CAN : couche physique"
module: M6
duree_h: 8
competences: [D3.6, D8.1, D9.1]
prerequis: [S22]
lecons: [S23-L01, S23-L02, S23-L03]
tp: [TP-33, TP-34]
sources: [SRC-0065, SRC-0066, SRC-0067, SRC-0029, SRC-0056, SRC-0013]
version: "0.1"
statut: brouillon
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction (3 leçons, 8 exercices, banque de 25 questions, TP-33, TP-34, séance FR-19)
---

Première semaine du module M6, réseaux embarqués. On étudie la couche physique du bus CAN haute
vitesse : paire différentielle, états dominant et récessif, terminaison, trame et arbitrage en
notions, transceiver, puis mesures à l'ohmmètre et à l'oscilloscope. Le TP-33 monte un banc à deux
nœuds réutilisé au jalon 2 ; le TP-34 passe au véhicule d'atelier puis au connecteur d'un calculateur
de récupération. Aucun brochage n'est fourni : il se prend dans le schéma électrique officiel.

Organisation conseillée des 8 h : leçons (4 h), exercices (30 min), TP-33 (1 h 30), TP-34 (1 h 30),
FR-19 (30 min) [HYPOTHÈSE : répartition à ajuster selon la disponibilité du véhicule d'atelier].

## Mesures attendues et tolérances

**TP-33.** Avec deux terminaisons de 120 Ω, la résistance du bus hors tension vaut 60 Ω [EXEMPLE],
calculée avec les résistances mesurées hors circuit, à la précision du multimètre. Au repos, CAN-H et
CAN-L sont vers 2,5 V [SOURCÉ : SRC-0065 §5 The CAN Bus].
À l'état dominant, leur différence est d'environ 2 V [SOURCÉ : SRC-0065 §5 The CAN Bus] ; les plages exactes se lisent dans la fiche du transceiver utilisé.

**TP-34.** Pas de valeur constructeur dans ce cours : le débit, l'emplacement des terminaisons et le
brochage se lisent dans la documentation officielle du véhicule [À VÉRIFIER : documentation du véhicule
d'atelier retenu]. On juge la cohérence : résistance du bus compatible avec le nombre de terminaisons,
lignes symétriques autour du niveau commun, durée d'un bit égale à l'inverse du débit.

## Erreurs fréquentes

- **Conclure sur une différence nulle.** Détection : mesurer aussi chaque ligne par rapport à la masse ; un bus récessif sans trafic donne aussi une différence nulle.
- **Mesurer la résistance du bus sous tension.** Détection : batterie débranchée ou banc coupé avant toute mesure à l'ohmmètre.
- **Poser une masse de sonde sur CAN-L.** Détection : masses des sondes sur la masse, différence par la fonction mathématique ou une sonde différentielle.
- **Décodeur réglé sur un autre débit.** Détection : mesurer la durée d'un bit avant de faire confiance au décodage.
- **Prendre un brochage dans une vidéo ou sur un forum.** Détection : seule la documentation officielle fait foi, référence notée au dossier.
- **Accuser le transceiver d'un nœud sans mesure qui départage.** Détection : débrancher le nœud suspect, comparer, mesurer ses lignes vers la masse hors tension.

## Lien atelier

Une panne de communication entre calculateurs peut venir du câblage, d'une terminaison absente ou du
transceiver d'un calculateur [HYPOTHÈSE : à départager par la mesure dans chaque cas]. Savoir mesurer la
résistance du bus, observer CAN-H et CAN-L et identifier le transceiver d'une carte permet de dire si
un calculateur déposé chez AREPROG a un étage CAN en cause, avant d'ouvrir le reste de la carte. La
méthode complète de diagnostic des défauts de bus est l'objet de S24.

## Fil rouge FR-19 : SOT-23-5 et SOT-23-6

Dix-neuvième séance du fil rouge microsoudure. Critère de réussite du catalogue des TP : repose sans
pont.

1. Préparer le poste : aspiration des fumées en marche, fer sur son support, poste ESD (bracelet relié), flux, microscope, tresse, pince brucelles.
2. Sur la carte d'entraînement, photographier le composant et repérer son orientation (marquage, repère de la première broche sur la sérigraphie).
3. Déposer le composant : chauffer alternativement les deux rangées, ou à l'air chaud selon la notice de la station ; nettoyer les pastilles à la tresse avec du flux.
4. Étamer une seule pastille, poser le composant dans la bonne orientation, souder cette broche, contrôler l'alignement au microscope.
5. Souder les autres broches ; retirer un éventuel pont à la tresse et au flux.
6. Contrôler au microscope (ménisques, absence de pont), puis à l'ohmmètre l'absence de court-circuit entre broches voisines ; photographier.
7. Température de la panne ou de l'air chaud : selon la notice de la station et la fiche du composant [À VÉRIFIER : profil de soudage dans la fiche du composant et réglages de la station].

## Sécurité spécifique

- TP-34, partie A : règles « Sécurité véhicule » du catalogue des TP ; véhicule thermique uniquement (décision D-15) ; véhicule immobilisé ; pointes posées et retirées batterie débranchée ; aucune mesure sur les circuits d'airbag, d'ABS / ESP ou de direction ; critères d'arrêt écrits avant l'intervention.
- TP-34, partie B : protocole commun calculateurs réels ; mise sous tension progressive (FE-08) ; décharge des étages à tension élevée mesurée [SOURCÉ : SRC-0013 §2-7 Restriking Voltage] (FE-09) ; calculateurs d'airbag, d'ABS / ESP et de direction exclus avant M9.
- Masses des sondes jamais sur CAN-H ni sur CAN-L [SOURCÉ : SRC-0029 §Use Proper Grounding Procedures] (FE-07).
- Fautes éliminatoires de la semaine : FE-01 (ESD), FE-02 (limite non écrite), FE-03 (polarité), FE-07 (masse de sonde), FE-08 (calculateur réel sans procédure progressive), FE-09 (décharge non mesurée).
- FR-19 : aspiration des fumées en marche pendant toute la soudure ; fer sur son support ; air chaud jamais dirigé vers une personne.
