# 2. Programme détaillé — 35 semaines × 8 h

> Version 0.2 : passage de 32 à 35 semaines (280 h) le 13/11/2026, pour consacrer un module complet aux calculateurs de sécurité et à la validation sur véhicule (décision D-13).

Conventions :

- **Prérequis** : codes de compétences ou semaines qui doivent être validés avant de commencer.
- **Objectifs** : formulés pour être vérifiables (« l'apprenant est capable de… »).
- **TP** : renvoient au [catalogue des TP](03-travaux-pratiques.md).
- **FR** : fil rouge microsoudure (1 h prise sur le bloc pratique, de S4 à S25).
- Toutes les valeurs numériques des futurs cours suivront la [règle de fiabilité](README.md#règle-de-fiabilité-sapplique-à-tous-les-documents).

## Vue d'ensemble

| Module | Semaines | Heures | Thème | Prérequis du module |
|---|---|---|---|---|
| M0 | S1 | 8 | Atelier, sécurité, méthode | Aucun |
| M1 | S2–S6 | 40 | Électricité fondamentale DC et AC | M0 |
| M2 | S7–S11 | 40 | Composants et oscilloscope | M1 |
| M3 | S12–S14 | 24 | Schémas, circuits imprimés, **jalon 1** | M2 |
| M4 | S15–S18 | 32 | Alimentations et réseau de bord | M3 |
| M5 | S19–S22 | 32 | Numérique, microcontrôleurs, mémoires | M4 (S15, S18 au minimum) |
| M6 | S23–S25 | 24 | Réseaux CAN, LIN, K-Line, **jalon 2** | M5 (S19) |
| M7 | S26–S28 | 24 | Microsoudure intensive et réparation de carte | Fil rouge S4–S25 validé |
| M8 | S29–S30 | 16 | Diagnostic de calculateurs ECU, TCU, BCM, BSI, FRM, CAS et validation | M4 à M7 |
| M9 | S31–S34 | 32 | Calculateurs de sécurité (airbag, ABS / ESP, direction) et validation sur véhicule | M8 |
| — | S35 | 8 | **Évaluation finale** | Tout le cursus |
| | | **280** | | |

---

## M0 — Atelier, sécurité, méthode (S1)

### S1 — Préparer l'atelier et la méthode de travail

- **Prérequis** : aucun.
- **Objectifs**
  - Installer un poste ESD complet et vérifier sa continuité vers la terre selon la documentation du fabricant du tapis.
  - Expliquer les catégories de mesure CAT I à CAT IV (IEC 61010) et vérifier celle de ses instruments.
  - Régler une alimentation de laboratoire en limitation de tension et de courant, et prouver que la limitation fonctionne sur une charge résistive.
  - Ouvrir un journal d'atelier et un premier dossier de réparation selon le modèle fourni.
- **Contenu** : électricité statique et dommages ESD ; dangers électriques réels en atelier (12 V auto, 230 V secteur des instruments, énergie stockée dans les condensateurs) ; fumées de flux et alliages ; organisation (étiquetage, sachets antistatiques, photos avant démontage) ; méthode de diagnostic en 5 étapes ; test de positionnement en mathématiques (puissances de 10, règle de trois, équations du 1er degré, logarithmes pour les dB).
- **TP** : TP-01 Poste ESD ; TP-02 Prise en main de l'alimentation de labo.
- **Évaluation** : QCM sécurité (seuil 100 % sur les questions marquées « sécurité ») ; check-list du poste validée photo à l'appui.

---

## M1 — Électricité fondamentale (S2–S6)

### S2 — Grandeurs, loi d'Ohm, puissance

- **Prérequis** : S1, test de positionnement mathématique (remédiation si besoin).
- **Objectifs** : convertir sans erreur entre préfixes (p à M) ; calculer U, I, R, P dans un circuit simple ; vérifier qu'une résistance est utilisée sous sa puissance nominale.
- **Contenu** : charge, courant, tension, résistance, conductance ; sens conventionnel ; loi d'Ohm ; puissance et effet Joule ; résistances série et parallèle ; code couleur et séries normalisées (IEC 60063) ; tolérance d'une résistance.
- **TP** : TP-03 Vérification de la loi d'Ohm sur plaque d'essai.
- **Lien atelier** : pourquoi un faisceau oxydé fait chuter la tension sous charge.

### S3 — Kirchhoff, diviseurs, Thévenin

- **Prérequis** : S2.
- **Objectifs** : écrire les lois des mailles et des nœuds sur un circuit à deux mailles ; dimensionner un diviseur de tension ; prévoir l'effet d'une charge sur un diviseur ; modéliser une batterie par un générateur de Thévenin.
- **Contenu** : nœuds, mailles, référence de masse ; diviseur de tension et de courant ; résistance interne d'une source ; Thévenin et Norton (notions) ; diviseurs d'entrée d'un calculateur (principe générique, valeurs [EXEMPLE]).
- **TP** : TP-04 Diviseur chargé et non chargé ; TP-05 Résistance interne d'une source.

### S4 — Le multimètre en profondeur

- **Prérequis** : S3.
- **Objectifs** : choisir le bon calibre et les bonnes bornes ; calculer l'incertitude d'une lecture à partir de la notice de son multimètre ; mettre en évidence l'effet de charge d'un voltmètre ; mesurer un courant sans détruire le fusible.
- **Contenu** : architecture d'un multimètre ; impédance d'entrée ; spécification « ±(x % lecture + n digits) » ; TRMS ; mesures de continuité et de jonction ; mesures en circuit hors tension ; faux contacts et pointes de touche.
- **TP** : TP-06 Incertitude et effet de charge ; **FR-01** Fer à souder : étamage, soudure de fils et de traversants.

### S5 — Condensateurs, inductances, régimes transitoires

- **Prérequis** : S4.
- **Objectifs** : calculer une constante de temps RC et RL ; prévoir la tension d'un condensateur après 1τ à 5τ ; décharger un condensateur en sécurité ; distinguer les technologies de condensateurs (céramique, électrolytique, tantale, film).
- **Contenu** : capacité, énergie stockée ; charge et décharge ; inductance, énergie, surtension à l'ouverture (lien avec la diode de roue libre des injecteurs et relais) ; découplage (premier aperçu) ; vieillissement des électrolytiques.
- **TP** : TP-07 Charge et décharge RC mesurées au multimètre et au chronomètre ; **FR-02** Traversants sur carte d'entraînement.

### S6 — Alternatif, signaux, premiers pas à l'oscilloscope

- **Prérequis** : S5.
- **Objectifs** : mesurer période, fréquence, amplitude, rapport cyclique d'un signal ; calculer une valeur efficace d'un sinus et d'un signal rectangulaire ; tracer la réponse d'un filtre RC passe-bas.
- **Contenu** : sinusoïde, signaux carrés et PWM ; valeurs moyenne, crête, efficace ; réactance, impédance ; filtre RC du 1er ordre, fréquence de coupure, décibels ; oscilloscope : calibre vertical, base de temps, déclenchement sur front (bases).
- **TP** : TP-08 Première mesure oscilloscope sur générateur ; TP-09 Filtre RC ; **FR-03** CMS 1206.

---

## M2 — Composants et oscilloscope (S7–S11)

### S7 — Identifier et tester les composants passifs CMS

- **Prérequis** : M1.
- **Objectifs** : nommer les boîtiers CMS courants (0402 à 2512, SOT-23, SOIC…) ; décoder un marquage à partir d'une table **sourcée** (série E, EIA-96) ; mesurer un passif hors circuit et expliquer pourquoi une mesure en circuit peut mentir ; retrouver une datasheet et y lire les valeurs max absolues.
- **Contenu** : boîtiers et désignations ; codes de marquage et limites (beaucoup de condensateurs CMS ne sont pas marqués) ; lecture d'une datasheet (structure type) ; utilisation du microscope pour l'identification.
- **TP** : TP-10 Inventaire de composants sur carte de récupération ; **FR-04** CMS 0805.

### S8 — Diodes

- **Prérequis** : S7.
- **Objectifs** : tester une diode au multimètre et interpréter le résultat ; expliquer le rôle d'une Zener, d'une TVS, d'une Schottky et d'une diode de protection contre l'inversion de polarité ; calculer une résistance de LED.
- **Contenu** : jonction PN, seuil, courant inverse ; redressement simple et double alternance ; Zener et régulation ; TVS et protection contre les transitoires ; diode de roue libre ; LED.
- **TP** : TP-11 Caractéristique d'une diode ; TP-12 Zener et TVS sur alimentation limitée ; **FR-05** SOD et MELF.

### S9 — Transistors en commutation

- **Prérequis** : S8.
- **Objectifs** : expliquer le fonctionnement d'un NPN et d'un MOSFET canal N en commutation ; dimensionner une résistance de base ; tester un MOSFET hors circuit ; identifier un étage low-side et high-side sur un schéma.
- **Contenu** : bipolaire (blocage, saturation) ; MOSFET (VGS(th), RDS(on), diode interne) ; commande de relais et de charge inductive ; notion de « smart power » (drivers protégés) — principe seulement, détail en S29.
- **TP** : TP-13 Commande d'une charge par NPN ; TP-14 Commande d'une charge par MOSFET avec mesure de dissipation ; **FR-06** SOT-23.

### S10 — Amplificateur opérationnel, comparateur, référence de tension

- **Prérequis** : S9.
- **Objectifs** : reconnaître les montages AOP de base (suiveur, inverseur, non inverseur, comparateur) ; calculer un gain ; expliquer le rôle d'une référence de tension pour un convertisseur analogique-numérique.
- **Contenu** : AOP idéal puis réel (saturation, rail-to-rail, offset) ; comparateur à hystérésis ; conditionnement de capteur (exemples [EXEMPLE] : capteur de température résistif, capteur de pression ratiométrique 5 V) ; références de tension.
- **TP** : TP-15 Montages AOP ; TP-16 Comparateur à hystérésis ; **FR-07** SOIC-8.

### S11 — Oscilloscope approfondi

- **Prérequis** : S6, S10.
- **Objectifs** : compenser une sonde ×10 ; choisir un mode de déclenchement adapté (front, impulsion, timeout) ; utiliser curseurs et mesures automatiques en connaissant leurs limites ; expliquer pourquoi la masse de sonde est reliée à la terre et le risque associé ; mesurer correctement une tension différentielle.
- **Contenu** : bande passante et temps de montée ; échantillonnage et repliement ; sondes passives, compensation, boucle de masse ; mesures différentielles (deux voies en soustraction, sonde différentielle) ; mémoire, mode single, décodage série (aperçu).
- **TP** : TP-17 Compensation de sonde et effet de la longue masse ; TP-18 Capturer un événement unique ; **FR-08** Retouche et contrôle au microscope.

---

## M3 — Schémas et circuits imprimés (S12–S14)

### S12 — Lire un schéma

- **Prérequis** : M2.
- **Objectifs** : identifier tous les symboles d'un schéma de carte d'évaluation publique ; suivre un réseau entre feuilles ; découper le schéma en blocs (alimentation, horloge, MCU, entrées, sorties, communication).
- **Contenu** : symboles normalisés et variantes ; références (R, C, U, Q, D, L, J…) ; étiquettes de réseau, ports, bus ; masses multiples ; nomenclature (BOM). Supports : schémas **publics** de cartes d'évaluation de fabricants de semi-conducteurs ou de matériel ouvert, jamais de schémas de calculateurs non publiés.
- **TP** : TP-19 Découpage en blocs d'un schéma public ; **FR-09** SOIC-14/16.

### S13 — Circuit imprimé et relevé de schéma

- **Prérequis** : S12.
- **Objectifs** : expliquer la structure d'un PCB multicouche ; suivre une piste à travers des vias avec le multimètre et le microscope ; relever le schéma d'un bloc simple (ex. : entrée capteur) sur une carte de récupération, en marquant chaque élément non confirmé [À VÉRIFIER].
- **Contenu** : couches, plans, vias, masques, sérigraphie ; points de test ; méthode de relevé (photo haute résolution, superposition recto / verso, continuité) ; outils de dessin de schéma (KiCad, gratuit).
- **TP** : TP-20 Relevé d'un bloc d'entrée sur carte de récupération ; **FR-10** Pastilles soulevées : prévention.

### S14 — Jalon 1 : consolidation et évaluation

- **Prérequis** : S2 à S13.
- **Objectifs** : valider les domaines D2, D3 (sauf D3.6), D4 (sauf D4.7), D5.
- **Contenu** : révision ciblée selon les résultats aux QCM ; mini-projet : construire sur plaque une petite carte « entrée capteur + transistor de sortie + LED », la documenter, la mesurer.
- **Évaluation** : examen écrit (calculs + lecture de schéma) ; évaluation pratique chronométrée (voir [évaluation](04-evaluation.md#jalon-1-s14)).

---

## M4 — Alimentations et réseau de bord (S15–S18)

### S15 — Régulateurs linéaires et LDO

- **Prérequis** : M3.
- **Objectifs** : calculer la dissipation d'un régulateur linéaire ; expliquer la tension de déchet (dropout) ; diagnostiquer un régulateur (entrée, sortie, enable, sortie en court-circuit).
- **Contenu** : principe, rendement, dissipation thermique ; LDO ; stabilité et condensateurs de sortie selon datasheet ; protection thermique ; signaux reset / power-good.
- **TP** : TP-21 Régulateur linéaire sous charge variable ; **FR-11** Dépose de régulateur DPAK au fer + tresse.

### S16 — Convertisseurs à découpage

- **Prérequis** : S15.
- **Objectifs** : expliquer le fonctionnement d'un buck et d'un boost ; observer à l'oscilloscope le nœud de commutation et l'ondulation de sortie ; reconnaître les symptômes d'un condensateur ou d'une inductance défaillants.
- **Contenu** : rapport cyclique, inductance, diode / synchrone ; ondulation ; boucle de régulation (notion) ; règles de sécurité de mesure (masse courte).
- **TP** : TP-22 Module buck : rendement et ondulation ; **FR-12** Inductances et condensateurs électrolytiques CMS.

### S17 — Alimentation d'un calculateur automobile

- **Prérequis** : S16.
- **Objectifs** : expliquer les bornes 30, 15, 31 (DIN 72552) et la gestion du réveil / maintien ; identifier sur une carte de récupération la chaîne d'entrée (protection inversion, filtrage, TVS, régulation) ; expliquer les contraintes du réseau de bord (démarrage, délestage, transitoires) en citant la norme et non des valeurs inventées ; classer les calculateurs liés à la sécurité.
- **Contenu** : réseau de bord 12 V ; transitoires et essais normalisés (ISO 7637-2, ISO 16750-2 — principes, valeurs à lire dans la norme) ; architecture générique d'alimentation d'un calculateur ; circuits d'alimentation intégrés type « system basis chip » (principe générique) ; calculateurs liés à la sécurité (freinage, direction, airbag, gestion moteur / papillon) et règles de l'académie.
- **TP** : TP-23 Relevé de la chaîne d'alimentation d'un calculateur de récupération ; **FR-13** Composants sous vernis : approche.

### S18 — Diagnostic d'alimentation sur carte

- **Prérequis** : S17.
- **Objectifs** : appliquer une procédure de mise sous tension progressive avec limitation de courant ; localiser un court-circuit sur un rail par méthode thermique ou par chute de tension ; documenter le diagnostic dans un dossier de réparation.
- **Contenu** : méthodes de localisation (injection de courant limité, caméra thermique ou alcool isopropylique, milliohmmètre / chute de tension) ; ordre des contrôles ; erreurs fréquentes (injection trop élevée, rail mal identifié).
- **TP** : TP-24 Court-circuit simulé sur carte d'entraînement ; TP-25 Mise sous tension d'un calculateur de récupération sur banc ; **FR-14** Remplacement d'un condensateur de découplage.

---

## M5 — Numérique, microcontrôleurs, mémoires (S19–S22)

### S19 — Logique numérique

- **Prérequis** : S18 (pour la mise sous tension sur banc).
- **Objectifs** : convertir binaire / hexadécimal / décimal ; lire une table de vérité ; expliquer niveaux logiques, seuils, pull-up, collecteur ouvert ; observer un bus à l'analyseur logique.
- **Contenu** : numération ; portes ; bascules et registres ; familles logiques et compatibilité 3,3 V / 5 V ; analyseur logique (prise en main).
- **TP** : TP-26 Portes logiques et seuils ; TP-27 Analyseur logique sur un bus I²C de carte d'évaluation ; **FR-15** TSSOP.

### S20 — Microcontrôleur : conditions de fonctionnement

- **Prérequis** : S19.
- **Objectifs** : vérifier sur une carte les quatre conditions de vie d'un microcontrôleur (alimentations, horloge, reset, mode de démarrage) ; expliquer le rôle d'un watchdog ; mesurer un quartz sans l'arrêter (limites de la sonde).
- **Contenu** : architecture générique (CPU, Flash, RAM, périphériques) ; alimentations multiples ; oscillateurs ; reset et superviseurs ; watchdog interne / externe ; familles de MCU automobiles (présentation générique, détails uniquement depuis datasheets publiques).
- **TP** : TP-28 Carte de développement : provoquer et observer reset et watchdog ; TP-29 Contrôle des conditions de vie sur calculateur de récupération ; **FR-16** Quartz et oscillateurs CMS.

### S21 — Mémoires EEPROM et Flash série

- **Prérequis** : S20.
- **Objectifs** : identifier une mémoire série et son bus à partir du marquage et de la datasheet ; lire une mémoire hors circuit et en circuit, sauvegarder deux fois, comparer les empreintes (hash) ; expliquer les causes de corruption et les risques d'une écriture en circuit.
- **Contenu** : EEPROM I²C, SPI, Microwire ; Flash SPI ; organisation (pages, secteurs), protection en écriture ; niveaux de tension du programmateur vs mémoire ; alimentation parasite du reste de la carte en lecture en circuit ; lien avec la pratique AREPROG (sauvegardes avant écriture, intégrité).
- **TP** : TP-30 Lecture / écriture d'EEPROM sur carte d'entraînement ; TP-31 Dépose, lecture et repose d'une EEPROM SOIC-8 ; **FR-17** Repose SOIC-8 au fer.

### S22 — Accès de programmation et de débogage

- **Prérequis** : S21.
- **Objectifs** : expliquer les principes JTAG, BDM et modes de démarrage ; identifier les risques matériels d'un raccordement (alimentation, niveaux, masses) ; relier ces principes aux outils de lecture déjà utilisés en atelier.
- **Contenu** : interfaces de débogage, modes boot, rôle des résistances de configuration ; risques (court-circuit de broche, mauvaise tension, coupure pendant écriture) ; procédures de sauvegarde et de récupération. Aucun brochage de calculateur n'est fourni par le cours : l'apprenant se réfère à la documentation officielle de son outil.
- **TP** : TP-32 Carte de développement : programmation par interface de débogage, puis analyse d'un échec volontaire (sans risque matériel) ; **FR-18** Fils de liaison fins (straps en fil émaillé).

---

## M6 — Réseaux embarqués (S23–S25)

### S23 — CAN : couche physique

- **Prérequis** : S19.
- **Objectifs** : expliquer les états dominant / récessif et la terminaison d'un bus CAN haute vitesse en citant ISO 11898-2 ; mesurer la résistance de terminaison bus hors tension ; observer CAN-H, CAN-L et leur différence à l'oscilloscope ; identifier le transceiver sur une carte et retrouver sa datasheet.
- **Contenu** : topologie, terminaison, états du bus ; structure d'une trame (notions) ; transceivers ; CAN FD (notions) ; décodage oscilloscope / interface CAN.
- **TP** : TP-33 Banc CAN à deux nœuds (cartes de développement) ; TP-34 Mesures sur le connecteur d'un calculateur de récupération alimenté sur banc ; **FR-19** SOT-23-5 / SOT-23-6.

### S24 — LIN et K-Line

- **Prérequis** : S23.
- **Objectifs** : expliquer la couche physique LIN (ISO 17987) et K-Line (ISO 9141 / ISO 14230) ; observer une trame LIN ; comparer avec CAN.
- **Contenu** : maître / esclave, mono-fil, niveaux référencés à la batterie ; trame LIN ; K-Line et diagnostic historique.
- **TP** : TP-35 Banc LIN (transceiver sur carte de développement) ; **FR-20** QFN : première approche au fer.

### S25 — Diagnostic de bus et jalon 2

- **Prérequis** : S23, S24.
- **Objectifs** : diagnostiquer sur banc un court-circuit CAN-H / CAN-L, une coupure, une terminaison absente, un transceiver défaillant simulé ; valider les domaines D6, D7, D8.
- **Évaluation** : examen écrit + évaluation pratique jalon 2 (voir [évaluation](04-evaluation.md#jalon-2-s25)).
- **TP** : TP-36 Pannes de bus provoquées ; **FR-21/22** Évaluation du fil rouge (critère d'entrée en M7).

---

## M7 — Microsoudure intensive et réparation de carte (S26–S28)

### S26 — Soudure CMS de précision

- **Prérequis** : fil rouge validé (FR-21/22).
- **Objectifs** : souder et dessouder des passifs 0603 et 0402 avec un taux de réussite mesuré ; choisir panne, température et flux selon la documentation des fabricants ; contrôler au microscope selon des critères écrits.
- **Contenu** : thermique de la soudure ; alliages avec et sans plomb ; flux et nettoyage ; critères d'acceptation (inspiration IPC-A-610, sans prétendre à une certification).
- **TP** : TP-37 Série de 20 passifs 0603 / 0402 notés.

### S27 — Air chaud et circuits intégrés à broches

- **Prérequis** : S26.
- **Objectifs** : déposer et reposer à l'air chaud des SOIC, TSSOP et QFP sans dommage aux composants voisins ; utiliser un préchauffage ; protéger les composants voisins (ruban polyimide, écrans).
- **Contenu** : profils de chauffe (selon datasheets des composants et notice de la station) ; humidité et effet « popcorn » ; protection des connecteurs plastiques ; QFN et composants à plot thermique (notions) ; BGA : présentation et hors périmètre de pratique.
- **TP** : TP-38 Dépose / repose QFP sur carte d'entraînement ; TP-39 Dépose d'un CI sur carte de récupération.

### S28 — Réparation de carte : vernis, pistes, vias, corrosion

- **Prérequis** : S27.
- **Objectifs** : retirer localement un vernis de tropicalisation et le restaurer ; réparer une piste et une pastille ; traiter une zone corrodée ; choisir un composant de remplacement équivalent et justifier le choix.
- **Contenu** : types de vernis et méthodes de retrait (selon fiches techniques des produits) ; réparations de pistes (fil, cuivre adhésif), époxy ; corrosion et nettoyage ; équivalence de composants (paramètres critiques, grade automobile AEC-Q100 / AEC-Q200).
- **TP** : TP-40 Réparation de pistes et pastilles sur carte d'entraînement ; TP-41 Traitement d'une zone corrodée sur carte de récupération.

---

## M8 — Diagnostic de calculateurs (S29–S30)

### S29 — Méthodologie et étages d'entrée / sortie

- **Prérequis** : M4 à M7.
- **Objectifs** : appliquer la méthode complète sur un calculateur de récupération ; analyser un étage de sortie low-side, high-side, pont en H et son diagnostic interne ; simuler les charges sur banc (résistances, lampes, charges inductives) ; appliquer la règle « calculateurs de sécurité ».
- **Contenu** : méthode AREPROG (réception, symptôme, historique, inspection visuelle, alimentations, conditions de vie MCU, entrées, sorties, communication, mémoire) ; drivers de puissance intégrés (principe générique depuis datasheets publiques) ; banc de test et simulateur de charges ; constitution d'une base de connaissances **personnelle et sourcée**.
- **TP** : TP-42 Construction d'un banc de test avec simulateur de charges ; TP-43 Diagnostic complet d'un ECU moteur de récupération.

### S30 — TCU, BCM, BSI, FRM

- **Prérequis** : S29.
- **Objectifs** : décrire l'architecture générique d'un TCU, d'un BCM / BSI et d'un module d'éclairage / carrosserie de type FRM ; conduire le diagnostic d'au moins deux types de calculateurs de récupération différents.
- **Contenu** : spécificités par famille (étages de commande d'électrovannes, éclairage, gestion veille / réveil, consommation au repos) ; aucune « panne connue » n'est enseignée sans source vérifiable ; les observations de l'apprenant sont versées dans sa base avec l'étiquette adaptée.
- **TP** : TP-44 Diagnostic d'un TCU ou BCM / BSI / FRM / CAS de récupération ; TP-45 Mesure de consommation au repos et analyse du réveil ; TP-46 Validation et dossier de la réparation de S29 ou S30.
- **Validation** (déplacée de S31) : protocole d'essais fonctionnels, mesures avant / après, durée d'essai, limites d'un banc d'atelier, traçabilité, communication au client.

## M9 — Calculateurs de sécurité et validation sur véhicule (S31–S34)

Ce module applique le [protocole renforcé](03-travaux-pratiques.md#protocole-renforcé-pour-les-calculateurs-de-sécurité). Les architectures sont décrites de façon générique à partir de documentation publique ; tout relevé sur une carte précise reste [À VÉRIFIER]. Les essais sur véhicule utilisent les véhicules d'atelier d'AREPROG, jamais un véhicule client.

### S31 — Sécurité fonctionnelle et calculateurs d'airbag

- **Prérequis** : M8 validé, protocole renforcé lu et signé.
- **Objectifs**
  - Expliquer les notions de sécurité fonctionnelle utiles à l'atelier (ISO 26262 : niveaux ASIL, redondance, état sûr) sans prétendre à une application de la norme.
  - Décrire l'architecture générique d'un calculateur d'airbag : alimentation, réserve d'énergie, étages de commande des allumeurs, capteurs internes et satellites, mémoire d'événements.
  - Mettre un calculateur d'airbag de récupération sous tension sur banc **sans aucune pyrotechnie**, avec simulateurs d'allumeurs, après avoir vérifié par la mesure la décharge de la réserve d'énergie.
  - Diagnostiquer un défaut de niveau carte (alimentation, réserve, étage d'allumeur, mémoire) et le documenter.
- **Contenu** : principes ISO 26262 ; architecture airbag ; mémoire de collision et éventuel verrouillage après choc [À VÉRIFIER par constructeur] ; codage et appairage [À VÉRIFIER par constructeur] ; règles de manipulation des véhicules équipés d'airbags (procédures du constructeur).
- **TP** : TP-47 Calculateur d'airbag sur banc avec simulateurs d'allumeurs (support disponible : calculateur d'airbag VW T-Cross de récupération).

### S32 — Calculateurs ABS / ESP

- **Prérequis** : S31.
- **Objectifs** : décrire l'architecture générique d'un calculateur ABS / ESP (commande d'électrovannes, moteur de pompe, capteurs de vitesse de roue, capteurs d'embardée intégrés ou déportés) ; mesurer les étages de commande sur banc avec charges de substitution ; diagnostiquer un défaut de niveau carte ; identifier les opérations d'après-intervention (purge, apprentissages, calibration de capteurs) dans la documentation constructeur.
- **Contenu** : séparation électronique / hydraulique et précautions de dépose ; capteurs de roue actifs et passifs (mesure à l'oscilloscope) ; étages de forte puissance ; autodiagnostic et défauts mémorisés.
- **TP** : TP-48 Calculateur ABS / ESP de récupération sur banc ; TP-50 Signaux de capteurs de roue sur véhicule d'atelier.

### S33 — Direction assistée électrique

- **Prérequis** : S32.
- **Objectifs** : décrire l'architecture générique d'un calculateur de direction assistée électrique (étage de puissance moteur triphasé ou continu, capteur de couple, capteur d'angle, alimentation et protections) ; diagnostiquer un étage de puissance sur banc ; identifier les calibrations après intervention (angle de braquage, butées) dans la documentation constructeur.
- **Contenu** : ponts de puissance et drivers de MOSFET (rappel S9, S29) ; capteurs de couple et d'angle (principes) ; modes dégradés ; contraintes thermiques et courants élevés sur banc.
- **TP** : TP-51 Étage de puissance d'un calculateur de direction de récupération sur banc ; TP-52 Observation des signaux de capteur de couple sur véhicule d'atelier.

### S34 — Validation sur véhicule

- **Prérequis** : S33, au moins un calculateur réparé en M8 et un en M9.
- **Objectifs** : monter un calculateur réparé sur un véhicule d'atelier ; réaliser la validation véhicule avec l'outil de diagnostic (défauts, valeurs réelles, codages, apprentissages, tests d'actionneurs, essais prévus par le constructeur) ; compléter le dossier de validation renforcée en séparant banc, véhicule et non validable.
- **Contenu** : procédure de montage (batterie, ordre de connexion, procédures airbag du constructeur) ; essais statiques puis dynamiques ; essais dynamiques uniquement sur voie privée et selon la procédure constructeur [À VÉRIFIER : cadre réglementaire et assurance des essais] ; critères d'arrêt immédiat ; comparaison avec un calculateur de référence.
- **TP** : TP-49 Dossier de validation renforcée ; TP-53 Validation véhicule d'un calculateur réparé (ECU moteur, puis un calculateur de sécurité).

---

## S35 — Évaluation finale

- **Prérequis** : jalons 1 et 2 validés, dossiers S29–S34 complets.
- **Épreuve** : diagnostic et réparation d'un calculateur de récupération inconnu (panne préparée par un tiers si possible, voir [lacunes](08-decisions-et-lacunes.md)), en 6 h, avec dossier de réparation et, si le calculateur s'y prête, validation sur véhicule d'atelier ; 2 h de QCM de synthèse et d'auto-évaluation du référentiel.
- **Critères** : voir [évaluation finale](04-evaluation.md#évaluation-finale-s35).
