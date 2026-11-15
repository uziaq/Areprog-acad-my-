---
id: S22
titre: "Accès de programmation et de débogage"
module: M5
duree_h: 8
competences: [D7.5, D9.1]
prerequis: [S21]
lecons: [S22-L01, S22-L02, S22-L03]
tp: [TP-32]
sources: [SRC-0063, SRC-0064, SRC-0056, SRC-0053, SRC-0062, SRC-0035, SRC-0011]
version: "0.1"
statut: brouillon
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction (3 leçons, 8 exercices, banque de 25 questions, TP-32, étape PB-2, séance FR-18)
---

Dernière semaine du module M5. On comprend comment un outil accède à un microcontrôleur : JTAG, BDM,
programmation en circuit, modes de démarrage. On apprend surtout les risques matériels d'un
raccordement et la procédure qui les évite : une seule alimentation, niveaux vérifiés, masse d'abord,
deux sauvegardes, journal, aucune coupure pendant une écriture. Aucun brochage de calculateur n'est
fourni : l'apprenant se réfère à la documentation officielle de son outil.

Organisation conseillée des 8 h : leçons (4 h), exercices (30 min), TP-32 (1 h 30), PB-2 (1 h),
FR-18 (1 h) [HYPOTHÈSE : répartition à ajuster selon l'avancement du banc].

## Mesures attendues et tolérances

**TP-32.** La tension cible au connecteur doit être dans la plage de la documentation de la sonde,
à la précision du multimètre. Les empreintes des lectures d'origine, de la relecture après écriture
et de la restauration ne tolèrent aucun écart [SOURCÉ : SRC-0062 §1 INTRODUCTION].

**PB-2.** Chaque charge est étiquetée avec sa valeur **mesurée** (résistance, courant sous la tension
du banc), pas seulement sa valeur nominale. Une lampe à incandescence a une résistance à froid plus
faible qu'à chaud, car la résistance d'un métal pur augmente avec la température
[SOURCÉ : SRC-0035 §Temperature coefficient of resistance] : son courant d'allumage dépasse son courant
établi [HYPOTHÈSE : à constater à la pince de courant ou à l'oscilloscope].

## Erreurs fréquentes

- **Deux alimentations en même temps.** Détection : lire dans la documentation de l'outil s'il alimente la carte, et noter la source choisie.
- **Brancher les signaux avant la masse.** Détection : masse d'abord, signaux ensuite.
- **Sonde réglée sur une autre tension que la carte.** Détection : tension cible mesurée et comparée avant de brancher.
- **Écrire sans sauvegarde.** Détection : empreintes notées au journal avant toute écriture.
- **Débrancher pendant une écriture.** Détection : attendre la confirmation de fin de l'outil.
- **Chercher la cause d'un échec dans l'outil avant l'alimentation.** Détection : suivre l'arbre de S22-L03 dans l'ordre.
- **Prendre un brochage dans une vidéo.** Détection : seule la documentation officielle de l'outil fait foi.

## Lien atelier

Les outils de lecture et d'écriture de calculateurs utilisés chez AREPROG reposent sur ces interfaces
ou sur des modes de démarrage des microcontrôleurs [HYPOTHÈSE : selon l'outil et le calculateur].
Comprendre leurs principes permet d'analyser un échec de connexion et d'éviter de détruire un
calculateur par une double alimentation, un mauvais niveau ou une broche court-circuitée. Le
raccordement et la procédure de chaque outil se prennent dans sa documentation officielle ; ce cours
ne donne aucun brochage de calculateur.

## Projet banc de test PB-2 : simulateur de charges

Livrable du catalogue des TP : charges étiquetées avec valeurs mesurées.

1. Charges résistives : résistances de puissance choisies pour la tension du banc ; puissance dissipée calculée P = U² / R et comparée à la puissance assignée de la résistance [À VÉRIFIER : puissance assignée et dissipateur dans la fiche de chaque résistance].
2. Lampes à incandescence : courant établi mesuré, et courant d'allumage observé à la pince de courant ou à l'oscilloscope [HYPOTHÈSE : courant d'allumage supérieur au courant établi, à constater].
3. Charge inductive (bobine de relais ou électrovanne d'atelier) : diode de roue libre aux bornes, qui limite la surtension à l'ouverture [SOURCÉ : SRC-0011 §Inductor commutating circuits].
4. Chaque charge protégée par un fusible au calibre justifié [SOURCÉ : SRC-0035 §Fuses], branchée par un connecteur repéré ; étiquette avec la valeur mesurée et la date.
5. Schéma du simulateur dans KiCad, rangé avec celui du banc PB-1.

## Fil rouge FR-18 : straps en fil émaillé

Dix-huitième séance du fil rouge microsoudure. Critère de réussite du catalogue des TP : strap
fixé, isolé, continuité.

1. Préparer le poste : aspiration des fumées en marche, fer sur son support, poste ESD (bracelet relié), flux, microscope, fil émaillé, colle ou vernis de fixation.
2. Sur la carte d'entraînement, repérer la piste coupée et ses deux points de reprise (pastille, via ou piste dégagée).
3. Dégager le cuivre aux deux points avec précaution, sans entamer les pistes voisines.
4. Couper le fil à longueur, retirer l'émail aux extrémités (à la panne chaude avec du flux, ou mécaniquement) et étamer.
5. Souder les deux extrémités ; fixer le fil le long de son trajet pour qu'il ne bouge pas.
6. Contrôler à l'ohmmètre : continuité entre les deux points, aucun contact avec les pistes voisines ; photographier.
7. Diamètre du fil, température de la panne et produit de fixation : selon le courant de la piste, la notice de la station et la fiche du produit [À VÉRIFIER : diamètre de fil adapté au courant, température de la station, fiche du produit de fixation].

## Sécurité spécifique

- Une seule source d'alimentation au TP-32 : si la sonde alimente la carte, aucune autre alimentation n'est branchée [SOURCÉ : SRC-0056 §4.1 SPI Programming Interface].
- Fautes éliminatoires de la semaine : FE-01 (ESD), FE-02 (limite non écrite), FE-03 (polarité), FE-07 (masse de sonde).
- Pas de calculateur réel cette semaine : TP-32 sur carte de développement, échec volontaire sans risque matériel.
- PB-2 : tension du banc limitée et fusibles sur chaque charge ; les résistances de puissance et les lampes chauffent, on ne les touche pas en fonctionnement ; diode de roue libre sur chaque charge inductive [SOURCÉ : SRC-0011 §Inductor commutating circuits].
- FR-18 : aspiration des fumées en marche pendant toute la soudure ; fer sur son support ; fil émaillé coupé loin des yeux.
