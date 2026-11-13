# 2. Programme détaillé — 41 semaines × 8 h

> Version 0.3 (13/11/2026). Historique : v0.1 = 32 semaines ; v0.2 = 35 semaines (module sécurité M9) ;
> v0.3 = 41 semaines (328 h) après l'audit de la PR #1 : M8 porté à 6 semaines avec un jalon 3,
> M9 porté à 5 semaines avec validation véhicule sécurisée, examen final sur 2 semaines.

Conventions :

- **Prérequis** : semaines qui doivent être validées avant de commencer. **Le prérequis par semaine est la seule source de vérité** ; le prérequis d'un module, dans le tableau ci-dessous, est simplement l'union des prérequis de ses semaines.
- **Objectifs** : formulés pour être vérifiables (« l'apprenant est capable de… »).
- **TP** : renvoient au [catalogue des TP](03-travaux-pratiques.md).
- **FR** : fil rouge microsoudure, 20 séances d'1 h prises sur le bloc pratique, de S4 à S24 (pas de séance en S14, semaine d'épreuve).
- **PB** : projet transversal « banc de test », construit par étapes en M4 à M6 et utilisé à partir de M8.
- **Lien atelier** : rubrique de chaque cours qui relie la notion à une situation de diagnostic véhicule (voir [gabarit](06-gabarit-cours.md)).
- Toutes les valeurs numériques des futurs cours suivront la [règle de fiabilité](README.md#règle-de-fiabilité-sapplique-à-tous-les-documents).

## Vue d'ensemble

| Module | Semaines | Heures | Thème | Prérequis du module (union des semaines) |
|---|---|---|---|---|
| M0 | S1 | 8 | Atelier, sécurité, méthode | Aucun |
| M1 | S2–S6 | 40 | Électricité fondamentale DC et AC | S1 |
| M2 | S7–S11 | 40 | Composants et oscilloscope | S6 |
| M3 | S12–S14 | 24 | Schémas, circuits imprimés, **jalon 1** | S11 |
| M4 | S15–S18 | 32 | Alimentations et réseau de bord | S14 |
| M5 | S19–S22 | 32 | Numérique, microcontrôleurs, mémoires | S18 |
| M6 | S23–S25 | 24 | Réseaux CAN, LIN, K-Line, **jalon 2** | S22 |
| M7 | S26–S28 | 24 | Microsoudure intensive et réparation de carte | S25 (dont épreuve du fil rouge) |
| M8 | S29–S34 | 48 | Capteurs et étages de puissance, diagnostic ECU, TCU, BCM / BSI / FRM / CAS, pannes intermittentes, **jalon 3** | S28 |
| M9 | S35–S39 | 40 | Calculateurs de sécurité (airbag, ABS / ESP, direction) et validation sur véhicule | S34 (jalon 3 réussi) |
| — | S40–S41 | 16 | **Évaluation finale** (épreuve chronométrée, puis validation véhicule et dossier) | S39 |
| | | **328** | | |

En pratique, prévoir 2 à 4 semaines tampon dans le calendrier réel (échec de jalon, attente de pièces), sans changer le contenu.

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
- **Lien atelier** : pourquoi un faisceau oxydé fait chuter la tension sous charge (exemple qualitatif, sans valeur).

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

- **Prérequis** : S6.
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
- **TP** : TP-15 Montages AOP (incluant, en lien atelier, l'observation d'un capteur ratiométrique sur véhicule d'atelier, moteur arrêté, contact mis) ; TP-16 Comparateur à hystérésis ; **FR-07** Repose SOIC-8.

### S11 — Oscilloscope approfondi

- **Prérequis** : S10 (S6 inclus par chaînage).
- **Objectifs** : compenser une sonde ×10 ; choisir un mode de déclenchement adapté (front, impulsion, timeout) ; utiliser curseurs et mesures automatiques en connaissant leurs limites ; expliquer pourquoi la masse de sonde est reliée à la terre et le risque associé ; mesurer correctement une tension différentielle.
- **Contenu** : bande passante et temps de montée ; échantillonnage et repliement ; sondes passives, compensation, boucle de masse ; mesures différentielles (deux voies en soustraction, sonde différentielle) ; mémoire, mode single, décodage série (aperçu) ; fonctions mathématiques et FFT ; pince de courant pour oscilloscope.
- **TP** : TP-17 Compensation de sonde et effet de la longue masse ; TP-18 Capturer un événement unique et un courant de relais à la pince de courant ; **FR-08** Retouche et contrôle au microscope.

---

## M3 — Schémas et circuits imprimés (S12–S14)

### S12 — Lire un schéma

- **Prérequis** : S11.
- **Objectifs** : identifier tous les symboles d'un schéma de carte d'évaluation publique ; suivre un réseau entre feuilles ; découper le schéma en blocs (alimentation, horloge, MCU, entrées, sorties, communication).
- **Contenu** : symboles normalisés et variantes ; références (R, C, U, Q, D, L, J…) ; étiquettes de réseau, ports, bus ; masses multiples ; nomenclature (BOM). Supports : schémas **publics** de cartes d'évaluation de fabricants de semi-conducteurs ou de matériel ouvert, jamais de schémas de calculateurs non publiés. Lecture des **schémas électriques officiels du constructeur** des véhicules d'atelier (câblage, brochage des connecteurs côté faisceau) : seule source légitime de brochage, reprise ensuite chaque semaine.
- **TP** : TP-19 Découpage en blocs d'un schéma public ; **FR-09** SOIC-14/16.

### S13 — Circuit imprimé et relevé de schéma

- **Prérequis** : S12.
- **Objectifs** : expliquer la structure d'un PCB multicouche ; suivre une piste à travers des vias avec le multimètre et le microscope ; relever le schéma d'un bloc simple (ex. : entrée capteur) sur une carte de récupération, en marquant chaque élément non confirmé [À VÉRIFIER].
- **Contenu** : couches, plans, vias, masques, sérigraphie ; points de test ; méthode de relevé (photo haute résolution, superposition recto / verso, continuité) ; outils de dessin de schéma (KiCad, gratuit).
- **TP** : TP-20 Relevé d'un bloc d'entrée sur carte de récupération ; **FR-10** Dépose de SOIC-8 au fer sans arracher de pastille (deux fers, pince chauffante ou alliage à bas point de fusion, selon le matériel).

### S14 — Jalon 1 : consolidation et évaluation

- **Prérequis** : S13.
- **Objectifs** : valider les domaines D2, D3 (sauf D3.6), D4 (sauf D4.7), D5.
- **Contenu** : épreuves uniquement (8 h, voir évaluation). La révision ciblée se fait pendant les heures « évaluation et journal » de S12 et S13.
- **Évaluation** : examen écrit (calculs + lecture de schéma) ; évaluation pratique chronométrée (voir [évaluation](04-evaluation.md#jalon-1-s14)).

---

## M4 — Alimentations et réseau de bord (S15–S18)

### S15 — Régulateurs linéaires et LDO

- **Prérequis** : S14.
- **Objectifs** : calculer la dissipation d'un régulateur linéaire ; expliquer la tension de déchet (dropout) ; diagnostiquer un régulateur (entrée, sortie, enable, sortie en court-circuit).
- **Contenu** : principe, rendement, dissipation thermique ; LDO ; stabilité et condensateurs de sortie selon datasheet ; protection thermique ; signaux reset / power-good.
- **TP** : TP-21 Régulateur linéaire sous charge variable ; **FR-11** Dépose de régulateur DPAK au fer avec préchauffage.

### S16 — Convertisseurs à découpage

- **Prérequis** : S15.
- **Objectifs** : expliquer le fonctionnement d'un buck et d'un boost ; observer à l'oscilloscope le nœud de commutation et l'ondulation de sortie ; reconnaître les symptômes d'un condensateur ou d'une inductance défaillants.
- **Contenu** : rapport cyclique, inductance, diode / synchrone ; ondulation ; boucle de régulation (notion) ; règles de sécurité de mesure (masse courte).
- **TP** : TP-22 Module buck : rendement et ondulation, mesure ESR des condensateurs au testeur ESR / LCR ; **FR-12** Inductances et condensateurs électrolytiques CMS.

### S17 — Alimentation d'un calculateur automobile

- **Prérequis** : S16.
- **Objectifs** : expliquer les bornes 30, 15, 31 (DIN 72552) et la gestion du réveil / maintien ; identifier sur une carte de récupération la chaîne d'entrée (protection inversion, filtrage, TVS, régulation) ; expliquer les contraintes du réseau de bord (démarrage, délestage, transitoires) en citant la norme et non des valeurs inventées ; classer les calculateurs liés à la sécurité.
- **Contenu** : réseau de bord 12 V ; transitoires et essais normalisés (ISO 7637-2, ISO 16750-2 — principes, valeurs à lire dans la norme) ; architecture générique d'alimentation d'un calculateur ; circuits d'alimentation intégrés type « system basis chip » (principe générique) ; calculateurs liés à la sécurité (freinage, direction, airbag, gestion moteur / papillon) et règles de l'académie.
- **TP** : TP-23 Relevé de la chaîne d'alimentation d'un calculateur de récupération ; **FR-13** Composants sous vernis : approche.

### S18 — Diagnostic d'alimentation sur carte

- **Prérequis** : S17.
- **Objectifs** : appliquer une procédure de mise sous tension progressive avec limitation de courant ; localiser un court-circuit sur un rail par méthode thermique ou par chute de tension ; documenter le diagnostic dans un dossier de réparation.
- **Contenu** : méthodes de localisation (injection de courant limité, caméra thermique ou alcool isopropylique, milliohmmètre / chute de tension) ; ordre des contrôles ; erreurs fréquentes (injection trop élevée, rail mal identifié).
- **Sécurité** : à partir de cette semaine, tout calculateur réel est traité selon le [protocole commun calculateurs réels](03-travaux-pratiques.md#protocole-commun-calculateurs-réels-à-partir-de-s18), qui couvre les tensions internes élevées (convertisseurs élévateurs, étages d'injection).
- **TP** : TP-24 Court-circuit simulé sur carte d'entraînement ; TP-25 Mise sous tension d'un calculateur de récupération sur banc, avec lecture des défauts internes à l'outil de diagnostic ; **PB-1** Banc de test, étape 1 : alimentation protégée et câblage du connecteur ; **FR-14** Remplacement d'un condensateur de découplage.

---

## M5 — Numérique, microcontrôleurs, mémoires (S19–S22)

### S19 — Logique numérique

- **Prérequis** : S18.
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
- **TP** : TP-30 Lecture / écriture d'EEPROM sur carte d'entraînement ; TP-31 Dépose, lecture et repose d'une EEPROM SOIC-8 **sur carte d'entraînement multicouche** (la dépose sur calculateur réel n'intervient qu'après S27) ; **FR-17** Repose SOIC-8 au fer.

### S22 — Accès de programmation et de débogage

- **Prérequis** : S21.
- **Objectifs** : expliquer les principes JTAG, BDM et modes de démarrage ; identifier les risques matériels d'un raccordement (alimentation, niveaux, masses) ; relier ces principes aux outils de lecture déjà utilisés en atelier.
- **Contenu** : interfaces de débogage, modes boot, rôle des résistances de configuration ; risques (court-circuit de broche, mauvaise tension, coupure pendant écriture) ; procédures de sauvegarde et de récupération. Aucun brochage de calculateur n'est fourni par le cours : l'apprenant se réfère à la documentation officielle de son outil.
- **TP** : TP-32 Carte de développement : programmation par interface de débogage, puis analyse d'un échec volontaire (sans risque matériel) ; **PB-2** Banc de test, étape 2 : simulateur de charges (résistives, lampes, inductives) ; **FR-18** Straps en fil émaillé.

---

## M6 — Réseaux embarqués (S23–S25)

### S23 — CAN : couche physique

- **Prérequis** : S22.
- **Objectifs** : expliquer les états dominant / récessif et la terminaison d'un bus CAN haute vitesse en citant ISO 11898-2 ; mesurer la résistance de terminaison bus hors tension ; observer CAN-H, CAN-L et leur différence à l'oscilloscope ; identifier le transceiver sur une carte et retrouver sa datasheet.
- **Contenu** : topologie, terminaison, états du bus ; structure d'une trame (notions) ; transceivers ; CAN FD (notions) ; décodage oscilloscope / interface CAN.
- **TP** : TP-33 Banc CAN à deux nœuds (cartes de développement) ; TP-34 Mesures CAN sur véhicule d'atelier puis sur le connecteur d'un calculateur de récupération alimenté sur banc (brochage tiré du schéma électrique officiel) ; **FR-19** SOT-23-5 / SOT-23-6.

### S24 — LIN, K-Line et méthode de diagnostic de bus

- **Prérequis** : S23.
- **Objectifs** : expliquer la couche physique LIN (ISO 17987) et K-Line (ISO 9141 / ISO 14230) ; observer une trame LIN ; comparer avec CAN ; décrire la méthode de diagnostic des défauts physiques de bus (court-circuit, coupure, terminaison absente, transceiver défaillant).
- **Contenu** : maître / esclave, mono-fil, niveaux référencés à la batterie ; trame LIN ; K-Line et diagnostic historique.
- **TP** : TP-35 Banc LIN (transceiver sur carte de développement) ; **PB-3** Banc de test, étape 3 : raccordement CAN et outil de diagnostic ; **FR-20** Épreuve du fil rouge (critère d'entrée en M7, voir [évaluation](04-evaluation.md#épreuve-du-fil-rouge-s24)).

### S25 — Jalon 2

- **Prérequis** : S24.
- **Objectifs** : valider les domaines D6, D7, D8 et D3.6, dont le diagnostic sur banc de pannes de bus provoquées.
- **Évaluation** : examen écrit + évaluation pratique jalon 2 (voir [évaluation](04-evaluation.md#jalon-2-s25)).
- **TP** : TP-36 Pannes de bus provoquées, qui constitue la partie « bus » de l'épreuve pratique du jalon 2.

---

## M7 — Microsoudure intensive et réparation de carte (S26–S28)

### S26 — Soudure CMS de précision

- **Prérequis** : S25, épreuve du fil rouge (FR-20) validée.
- **Objectifs** : souder et dessouder des passifs 0603 et 0402 avec un taux de réussite mesuré ; choisir panne, température et flux selon la documentation des fabricants ; contrôler au microscope selon des critères écrits.
- **Contenu** : thermique de la soudure ; alliages avec et sans plomb ; flux et nettoyage ; critères d'acceptation (inspiration IPC-A-610, sans prétendre à une certification).
- **TP** : TP-37 Série de 20 passifs 0603 / 0402 notés.

### S27 — Air chaud et circuits intégrés à broches

- **Prérequis** : S26.
- **Objectifs** : déposer et reposer à l'air chaud des SOIC, TSSOP et QFP sans dommage aux composants voisins ; utiliser un préchauffage ; protéger les composants voisins (ruban polyimide, écrans).
- **Contenu** : profils de chauffe (selon datasheets des composants et notice de la station) ; humidité et effet « popcorn » ; protection des connecteurs plastiques ; QFN à l'air chaud (pratique) ; alliage à bas point de fusion pour les déposes difficiles ; BGA : présentation et hors périmètre de pratique.
- **TP** : TP-38 Dépose / repose QFP sur carte d'entraînement ; TP-39 Dépose d'une EEPROM et d'un CI sur calculateur de récupération (sous vernis : retrait local enseigné en début de séance, approfondi en S28).

### S28 — Réparation de carte : vernis, pistes, vias, corrosion

- **Prérequis** : S27.
- **Objectifs** : retirer localement un vernis de tropicalisation et le restaurer ; réparer une piste et une pastille ; traiter une zone corrodée ; réparer une broche de connecteur ; choisir un composant de remplacement équivalent et justifier le choix.
- **Contenu** : types de vernis et méthodes de retrait (selon fiches techniques des produits) ; réparations de pistes (fil, cuivre adhésif), époxy ; corrosion et nettoyage ; équivalence de composants (paramètres critiques, grade automobile AEC-Q100 / AEC-Q200).
- **TP** : TP-40 Réparation de pistes et pastilles sur carte d'entraînement ; TP-41 Traitement d'une zone corrodée sur carte de récupération.

---


## M8 — Diagnostic de calculateurs (S29–S34)

Règles communes au module :

- [protocole commun calculateurs réels](03-travaux-pratiques.md#protocole-commun-calculateurs-réels-à-partir-de-s18) obligatoire ;
- chaque TP de diagnostic a **deux voies** : une panne réelle sur calculateur de récupération, ou une panne de niveau carte **provoquée, réversible, préparée et scellée par un tiers** (voir [D-08](08-decisions-et-lacunes.md)) ;
- aucune « panne connue » n'est enseignée sans source vérifiable ; les architectures sont génériques, issues de datasheets et notes d'application publiques ; tout relevé sur une carte précise reste [À VÉRIFIER].

### S29 — Entrées capteurs et étages de puissance

- **Prérequis** : S28.
- **Objectifs** : expliquer et mesurer sur carte d'entraînement les interfaces d'entrée génériques (capteur inductif, capteur à effet Hall, capteur ratiométrique, interface de sonde lambda : principe) ; expliquer et mesurer les étages de puissance génériques (low-side, high-side protégé, pont en H de papillon, commande d'injecteur et principe du survoltage) ; mesurer un courant de commande à la pince de courant.
- **Contenu** : conditionnement d'entrée, filtrage, protection ; drivers intégrés et leur diagnostic interne (circuit ouvert, court-circuit, surchauffe) d'après datasheets publiques ; tensions internes élevées des étages d'injection [À VÉRIFIER : valeur dans la datasheet du driver relevé] et règles de mesure (sonde différentielle).
- **TP** : TP-42 Entrées capteurs sur carte d'entraînement ; TP-43 Étages de puissance sur carte d'entraînement avec pince de courant.

### S30 — Méthode de diagnostic et ECU moteur

- **Prérequis** : S29.
- **Objectifs** : appliquer la méthode AREPROG complète (réception, symptôme, historique, inspection visuelle, alimentations, conditions de vie MCU, entrées, sorties, communication, mémoire) ; pratiquer le **diagnostic comparatif** (carte saine contre carte en panne : résistances et chutes de diode broche par broche, signatures courant-tension) ; lire les défauts internes et valeurs réelles à l'outil de diagnostic sur banc ; diagnostiquer un ECU moteur de récupération.
- **Contenu** : méthode ; diagnostic comparatif ; outil de diagnostic sur banc ; architecture générique d'un ECU moteur diesel.
- **TP** : TP-44 Diagnostic comparatif sur deux calculateurs identiques ; TP-45 Diagnostic complet d'un ECU moteur de récupération (support disponible : Bosch EDC17C60).

### S31 — Calculateurs de boîte de vitesses (TCU)

- **Prérequis** : S30.
- **Objectifs** : décrire l'architecture générique d'un TCU (électrovannes régulées en courant, capteurs de vitesse et de position, capteurs de pression et de température, intégration mécatronique) ; mesurer une commande d'électrovanne régulée en courant ; diagnostiquer un TCU de récupération.
- **Contenu** : régulation de courant par PWM ; contraintes thermiques et d'huile des unités mécatroniques ; précautions d'ouverture.
- **TP** : TP-46 Diagnostic d'un TCU de récupération.

### S32 — Calculateurs de carrosserie : BCM, BSI, FRM, CAS

- **Prérequis** : S31.
- **Objectifs** : décrire l'architecture générique d'un BCM / BSI (commutateurs high-side avec diagnostic de charge, passerelle multi-réseaux, gestion veille / réveil), d'un module d'éclairage de type FRM et d'un module d'accès et d'antidémarrage de type CAS (antenne de transpondeur, entrées de contacteur) ; mesurer une consommation au repos ; diagnostiquer deux calculateurs de carrosserie de récupération.
- **Contenu** : commutateurs protégés et diagnostic de charge ; gestion d'énergie et réveil ; architecture d'un module d'accès au niveau carte uniquement (voir [règle antidémarrage](03-travaux-pratiques.md#ce-que-le-cursus-nenseigne-pas)).
- **TP** : TP-47 Diagnostic d'un BCM / BSI ou FRM de récupération ; TP-48 Module CAS de récupération : alimentations, conditions de vie, consommation au repos et réveil (support disponible : BMW CAS3).

### S33 — Pannes intermittentes, validation et dossier

- **Prérequis** : S32.
- **Objectifs** : provoquer et localiser une panne intermittente (cyclage thermique contrôlé, bombe de froid, vibration, soudure fissurée, connecteur) ; définir un protocole de validation (essais fonctionnels, mesures avant / après, durée d'essai) ; rédiger un dossier de réparation complet qui déclare ses limites.
- **Contenu** : mécanismes de pannes intermittentes ; protocole de validation ; limites d'un banc d'atelier ; traçabilité ; communication au client.
- **TP** : TP-49 Panne intermittente provoquée ; TP-50 Validation et dossier d'une réparation de S30 à S32.

### S34 — Jalon 3

- **Prérequis** : S33.
- **Objectifs** : valider D1, D4.7, D9.2 à D9.5 et D10.1 à D10.5, et conditionner l'entrée en M9.
- **Évaluation** : diagnostic chronométré sur calculateur réel avec panne préparée et scellée par un tiers, réparation, contrôle de microsoudure, dossier (voir [évaluation](04-evaluation.md#jalon-3-s34)).
- **TP** : TP-51 Épreuve du jalon 3.

---

## M9 — Calculateurs de sécurité et validation sur véhicule (S35–S39)

Ce module applique le [protocole renforcé](03-travaux-pratiques.md#protocole-renforcé-pour-les-calculateurs-de-sécurité) et, dès qu'un véhicule est utilisé, les [règles de sécurité véhicule](03-travaux-pratiques.md#sécurité-véhicule). Les architectures sont décrites de façon générique à partir de documentation publique ; tout relevé sur une carte précise reste [À VÉRIFIER]. Les essais sur véhicule utilisent les véhicules d'atelier d'AREPROG, jamais un véhicule client. Le cours n'enseigne ni l'effacement de données de collision ni la modification de données d'antidémarrage.

### S35 — Sécurité fonctionnelle et airbag sur banc

- **Prérequis** : S34 (jalon 3 réussi), protocole renforcé lu et signé.
- **Objectifs** : expliquer les notions de sécurité fonctionnelle utiles à l'atelier (ISO 26262 : niveaux ASIL, redondance, état sûr) sans prétendre à une application de la norme ; décrire l'architecture générique d'un calculateur d'airbag (alimentation, réserve d'énergie, étages de commande des allumeurs, capteurs internes et satellites, mémoire d'événements) ; mettre un calculateur d'airbag de récupération sous tension sur banc **sans aucune pyrotechnie**, avec simulateurs d'allumeurs, après avoir vérifié par la mesure la décharge de la réserve d'énergie.
- **Contenu** : principes ISO 26262 ; architecture airbag ; mémoire de collision et éventuel verrouillage après choc [À VÉRIFIER par constructeur] ; codage et appairage [À VÉRIFIER par constructeur].
- **TP** : TP-52 Calculateur d'airbag sur banc avec simulateurs d'allumeurs (support disponible : calculateur d'airbag VW T-Cross de récupération).

### S36 — Airbag : diagnostic et réparation

- **Prérequis** : S35.
- **Objectifs** : diagnostiquer un défaut de niveau carte (alimentation, réserve d'énergie, étage d'allumeur, mémoire) ; réparer selon le protocole renforcé ; vérifier sur banc, avec simulateurs, l'absence de défaut d'allumeur et la cohérence des mesures avant / après.
- **TP** : TP-53 Diagnostic et réparation d'un calculateur d'airbag de récupération.

### S37 — Calculateurs ABS / ESP

- **Prérequis** : S36.
- **Objectifs** : décrire l'architecture générique d'un calculateur ABS / ESP (commande d'électrovannes, moteur de pompe, capteurs de vitesse de roue, capteurs d'embardée intégrés ou déportés) ; mesurer les étages de commande sur banc avec charges de substitution réduites et limite de courant écrite ; diagnostiquer un défaut de niveau carte ; identifier les opérations d'après-intervention (purge, apprentissages, calibration de capteurs) dans la documentation constructeur.
- **Contenu** : séparation électronique / hydraulique et précautions de dépose ; capteurs de roue actifs et passifs ; étages de forte puissance ; autodiagnostic.
- **TP** : TP-54 Calculateur ABS / ESP de récupération sur banc ; TP-55 Signaux de capteurs de roue sur véhicule d'atelier levé.

### S38 — Direction assistée électrique

- **Prérequis** : S37.
- **Objectifs** : décrire l'architecture générique d'un calculateur de direction assistée électrique (étage de puissance moteur, capteur de couple, capteur d'angle, alimentation et protections) ; diagnostiquer un étage de puissance sur banc avec charges réduites et limite de courant écrite ; identifier les calibrations après intervention (angle de braquage, butées) dans la documentation constructeur.
- **Contenu** : ponts de puissance et drivers de MOSFET (rappel S9, S29) ; capteurs de couple et d'angle (principes) ; modes dégradés ; contraintes thermiques et courants élevés sur banc.
- **TP** : TP-56 Étage de puissance d'un calculateur de direction de récupération sur banc ; TP-57 Signaux de capteur de couple sur véhicule d'atelier, moteur arrêté puis en marche, véhicule immobilisé.

### S39 — Validation sur véhicule

- **Prérequis** : S38, au moins un calculateur réparé en M8 et un en M9 (sinon : panne provoquée réversible, voir règles de M8).
- **Objectifs** : monter un calculateur réparé sur un véhicule d'atelier compatible ; réaliser la validation avec l'outil de diagnostic (défauts, valeurs réelles, codages, apprentissages, tests d'actionneurs, essais prévus par le constructeur) ; compléter le dossier de validation renforcée en séparant banc, véhicule et non validable.
- **Contenu** : règles de sécurité véhicule ; pour un calculateur d'airbag réparé : **tous les modules pyrotechniques débranchés selon la procédure constructeur et remplacés par des simulateurs**, batterie débranchée pendant les connexions, personne dans l'habitacle à la première mise sous contact ; pour ABS / ESP : essais de freinage statiques et contrôle de pédale avant tout déplacement ; essais dynamiques uniquement sur voie privée selon la procédure constructeur [À VÉRIFIER : cadre réglementaire et assurance] ; critères d'arrêt immédiat ; comparaison avec un calculateur de référence.
- **TP** : TP-58 Validation véhicule d'un calculateur réparé en M8 ; TP-59 Validation véhicule d'un calculateur de sécurité réparé (airbag : sur simulateurs uniquement) ; TP-60 Dossier de validation renforcée.

---

## S40–S41 — Évaluation finale

- **Prérequis** : jalons 1, 2 et 3 validés, dossiers S29–S39 complets.
- **S40, épreuve chronométrée (8 h)** : diagnostic et réparation d'un calculateur de récupération inconnu, panne **préparée et scellée par un tiers** (6 h) ; QCM de synthèse (2 h).
- **S41, hors chronomètre (8 h)** : validation sur banc et, si le calculateur s'y prête, sur véhicule d'atelier selon les règles de M9 ; dossier de réparation complet ; auto-évaluation du référentiel avec preuves.
- **Critères** : voir [évaluation finale](04-evaluation.md#évaluation-finale-s40s41).
