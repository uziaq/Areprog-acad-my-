---
id: S24
titre: "LIN, K-Line et méthode de diagnostic de bus"
module: M6
duree_h: 8
competences: [D8.1, D8.2, D9.1, D9.5]
prerequis: [S23]
lecons: [S24-L01, S24-L02, S24-L03]
tp: [TP-35]
sources: [SRC-0068, SRC-0069, SRC-0070, SRC-0065, SRC-0066, SRC-0067, SRC-0029, SRC-0013]
version: "0.1"
statut: brouillon
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction (3 leçons, 8 exercices, banque de 25 questions, TP-35, étape PB-3, épreuve du fil rouge FR-20)
---

Dernière semaine de cours du module M6 avant le jalon 2. On étudie les bus à un fil référencés à la
batterie : le LIN, sous-réseau maître et esclaves, et la ligne K de diagnostic ; on les compare au CAN.
La leçon 3 donne la méthode de diagnostic des défauts physiques de bus, appliquée au jalon 2 (TP-36)
sur le banc CAN du TP-33. La semaine se termine par l'épreuve du fil rouge, condition d'entrée en M7.

Organisation conseillée des 8 h : leçons (4 h), exercices (30 min), TP-35 (1 h), PB-3 (1 h),
épreuve FR-20 (1 h 30) [HYPOTHÈSE : répartition à ajuster ; l'épreuve peut demander plus de temps].

## Mesures attendues et tolérances

**TP-35.** Au repos, le fil LIN est proche de la tension d'alimentation, moins la chute de la diode
du maître [SOURCÉ : SRC-0069 §9.3.1.2.1 Termination]. Un dominant émis descend sous 20 % de
l'alimentation [SOURCÉ : SRC-0068 §3.3 Threshold Values]. Un récessif émis remonte au-dessus de 80 % [SOURCÉ : SRC-0068 §3.3 Threshold Values].
Le débit admet une tolérance de ±14 % [SOURCÉ : SRC-0068 §3.4 Bit-Rate Tolerance and Timing Requirements].

**PB-3.** Critère du catalogue : communication établie entre l'outil de diagnostic et le calculateur
sur le banc, en lecture seule. Pas de valeur attendue chiffrée.

**FR-20.** Critères de la grille de l'épreuve du fil rouge (document d'évaluation) : au moins 9 passifs
0805 conformes sur 10 au microscope ; SOIC-8 sans pont, continuité de chaque broche, pastilles
intactes ; TSSOP sans pont et aligné ; strap continu, fixé et isolé.

## Erreurs fréquentes

- **Chercher deux fils sur un bus LIN.** Détection : le LIN et la ligne K n'ont qu'un fil, mesuré par rapport à la masse.
- **Juger un niveau LIN sans mesurer la batterie.** Détection : les seuils sont des fractions de la tension batterie, mesurée sur une deuxième voie.
- **Conclure avant de diviser le bus.** Détection : débrancher un nœud ou un tronçon à la fois et refaire la mesure fausse.
- **Débrancher un connecteur sous tension.** Détection : batterie débranchée ou banc coupé avant chaque débranchement.
- **Remplacer un calculateur pour un défaut de câblage.** Détection : mesures de résistance vers la masse et vers le plus sur le faisceau, calculateur débranché.
- **Lancer une fonction d'écriture de l'outil sur le banc.** Détection : PB-3 en lecture seule, fonctions d'écriture interdites.

## Lien atelier

Un calculateur qui « ne communique plus » arrive souvent chez AREPROG avec un diagnostic incomplet
[HYPOTHÈSE : à confirmer sur les dossiers de l'atelier]. La méthode de S24-L03 permet de vérifier, sur
le banc, si le défaut vient vraiment de l'étage de communication du calculateur (transceiver,
alimentation, masse) avant toute réparation, et de le dire clairement au client quand le défaut est
dans le faisceau du véhicule. Le banc PB-3 donne l'accès outil nécessaire pour cette vérification.

## Projet banc de test PB-3 : raccordement CAN et prise de diagnostic

Livrable du catalogue des TP : communication outil ↔ calculateur sur banc.

1. Choisir un calculateur de récupération communiquant en CAN, hors domaines airbag, ABS / ESP et direction ; relever dans sa documentation officielle les broches d'alimentation, de masse et CAN [À VÉRIFIER : documentation officielle du calculateur retenu].
2. Câbler sur le banc PB-1 une embase de prise de diagnostic : alimentation, masse et CAN-H / CAN-L reliés au calculateur, d'après la norme de la prise et la documentation de l'outil [À VÉRIFIER : brochage de la prise de diagnostic selon ISO 15031-3 / SAE J1962, non consultées, et notice de l'outil].
3. Vérifier hors tension la résistance entre CAN-H et CAN-L au niveau de la prise ; si le calculateur seul n'apporte pas de terminaison suffisante, ajouter une terminaison sur le banc [HYPOTHÈSE : besoin à constater par la mesure et la documentation].
4. Mise sous tension progressive du calculateur (protocole commun, limite écrite) ; brancher l'outil ; lire l'identification et les codes défaut, sans aucune écriture.
5. Capturer CAN-H et CAN-L pendant l'échange ; ranger le schéma du raccordement avec ceux de PB-1 et PB-2.

## Épreuve du fil rouge FR-20

Épreuve finale du fil rouge microsoudure, condition d'entrée en M7. Critères de la grille du document
d'évaluation ; contrôle selon des critères écrits (compétence D9.5).

| Épreuve | Critère |
|---|---|
| 10 passifs 0805 posés | au moins 9 conformes au microscope |
| 1 SOIC-8 déposé au fer et reposé | aucun pont, continuité de chaque broche, pastilles intactes |
| 1 TSSOP reposé | aucun pont, alignement correct |
| 1 strap en fil émaillé | continuité, fixation, isolation |

1. Poste préparé comme aux séances précédentes : aspiration des fumées, poste ESD, flux, microscope, outils rangés.
2. Chaque épreuve est réalisée sur une carte d'entraînement fournie par le formateur, sans aide.
3. Le contrôle se fait au microscope et à l'ohmmètre ; chaque résultat est photographié et noté sur la grille.
4. En cas d'échec : deux séances de fil rouge supplémentaires avant l'entrée en M7 (document d'évaluation).

## Sécurité spécifique

- TP-35 : tension batterie simulée limitée en courant, limite écrite (FE-02), polarité vérifiée (FE-03) ; la tension d'alimentation ne va jamais sur une broche logique.
- PB-3 : protocole commun calculateurs réels ; mise sous tension progressive (FE-08) ; décharge des étages à tension élevée mesurée après coupure [SOURCÉ : SRC-0013 §2-7 Restriking Voltage] (FE-09) ; calculateurs d'airbag, d'ABS / ESP et de direction exclus avant M9 ; outil en lecture seule.
- Masses des sondes sur la masse, jamais sur un fil de bus [SOURCÉ : SRC-0029 §Use Proper Grounding Procedures] (FE-07).
- Fautes éliminatoires de la semaine : FE-01 (ESD), FE-02 (limite non écrite), FE-03 (polarité), FE-07 (masse de sonde), FE-08 (calculateur réel sans procédure progressive), FE-09 (décharge non mesurée).
- FR-20 : aspiration des fumées en marche pendant toute l'épreuve ; fer sur son support ; air chaud jamais dirigé vers une personne.
