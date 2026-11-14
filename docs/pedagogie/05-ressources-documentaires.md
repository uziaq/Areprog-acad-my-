# 5. Ressources documentaires

## Règles de sourçage

1. **Hiérarchie des sources** (de la plus fiable à la moins fiable) :
   1. normes et spécifications officielles ;
   2. datasheets et notes d'application **du fabricant du composant** (version et date notées) ;
   3. documentation constructeur du véhicule / de l'équipementier obtenue légalement ;
   4. ouvrages de référence ;
   5. cours universitaires publics ;
   6. relevés personnels sur carte (toujours [À VÉRIFIER] tant qu'ils ne sont pas confirmés sur plusieurs exemplaires ou par une source de rang supérieur) ;
   7. forums, vidéos, bases communautaires : **jamais** cités comme fait, uniquement comme piste [HYPOTHÈSE] ou [À VÉRIFIER].
2. **Fiche source** pour chaque document utilisé : titre, éditeur / fabricant, référence, version ou édition, date de consultation, section ou page citée, licence d'utilisation.
3. **Pas de reproduction** de contenus protégés (normes, schémas propriétaires) dans les cours : on cite la référence et la section, on reformule, on ne copie pas.
4. **Datasheets** : toujours télécharger depuis le site du fabricant, jamais depuis un agrégateur sans vérifier la révision.

## Normes de référence

Les normes ISO, IEC et IPC sont payantes (sauf mention). Leur achat est une décision budgétaire (voir [décisions](08-decisions-et-lacunes.md)). Les intitulés sont donnés en substance ; le titre exact et l'édition en vigueur sont à relever lors de l'achat.

| Référence | Objet | Utilisée en |
|---|---|---|
| IEC 61010-1 | Sécurité des appareils de mesure ; catégories de mesure | S1, S4 |
| IEC 61340-5-1 (ou ANSI/ESD S20.20) | Programme de maîtrise des décharges électrostatiques | S1 |
| IEC 60063 | Séries de valeurs normalisées des résistances et condensateurs (E6 à E192) | S2, S7 |
| IEC 60617 | Symboles graphiques pour schémas | S12 |
| DIN 72552 | Désignation des bornes dans l'automobile (30, 15, 31…) | S17 |
| ISO 7637-2 | Perturbations électriques par conduction sur les lignes d'alimentation des véhicules | S17 |
| ISO 16750-2 | Conditions d'environnement électriques des équipements embarqués | S17 |
| ISO 10605 | Décharges électrostatiques dans les véhicules routiers | S1, S17 |
| ISO 26262 | Sécurité fonctionnelle des véhicules routiers | S17, S35 |
| NF C18-550 | Habilitation électrique pour les opérations sur véhicules à motorisation thermique, électrique ou hybride [À VÉRIFIER : édition et périmètre] | Sécurité véhicule (M9) |
| ISO 11898-1 / ISO 11898-2 | CAN : couche liaison / couche physique haute vitesse | S23, S25 |
| ISO 17987 | LIN | S24 |
| ISO 9141-2, ISO 14230 | K-Line, KWP 2000 | S24 |
| ISO 14229 | Services de diagnostic UDS (lien avec la pratique atelier) | S22, S25, S30 |
| IPC-A-610 | Critères d'acceptabilité des assemblages électroniques | S26–S28 |
| IPC J-STD-001 | Exigences pour les assemblages soudés | S26–S28 |
| IPC-7711/7721 | Retouche, modification et réparation des assemblages électroniques | S27, S28 |
| IPC/JEDEC J-STD-033 | Manipulation des composants sensibles à l'humidité | S27 |
| AEC-Q100 / Q101 / Q200 | Qualification des composants pour l'automobile (accessibles gratuitement sur le site de l'AEC) | S28 |

## Ouvrages

| Ouvrage | Usage | Statut |
|---|---|---|
| P. Horowitz, W. Hill, *The Art of Electronics*, 3e éd., Cambridge University Press, 2015 | Référence principale analogique et numérique (en anglais) | [SOURCÉ] |
| P. Scherz, S. Monk, *Practical Electronics for Inventors*, 4e éd., McGraw-Hill, 2016 | Approche pratique, composants | [SOURCÉ] |
| A. P. Malvino, D. J. Bates, *Principes d'électronique*, Dunod | Référence en français, électronique analogique | [À VÉRIFIER : édition disponible] |
| K. Reif (dir.), *Automotive Electrics and Automotive Electronics*, Springer Vieweg (collection Bosch Professional Automotive Information) | Électronique automobile, réseau de bord | [À VÉRIFIER : édition] |
| Bosch, *Mémento de technologie automobile* (version française du *Automotive Handbook*) | Référence automobile générale | [À VÉRIFIER : édition française la plus récente] |

## Documentation des fabricants (types à collecter)

| Type de document | Exemples de familles à étudier | Semaine |
|---|---|---|
| Primers d'oscilloscope et de sondes | Guides pédagogiques Tektronix (« XYZs of Oscilloscopes », « ABCs of Probes »), notes d'application Keysight, Rohde & Schwarz | S6, S11 |
| Notice et spécifications de **ses propres** instruments | Multimètre, alimentation, oscilloscope de l'atelier | S1, S4, S6 |
| Spécification I²C | NXP UM10204 « I²C-bus specification and user manual » | S19, S21 |
| Datasheets de mémoires série | EEPROM I²C et Microwire (ex. familles Microchip 24xx et 93xx), Flash SPI (ex. famille Winbond W25Q) | S21 |
| Datasheets de transceivers | Transceivers CAN et LIN de fabricants (NXP, TI, Infineon, Microchip…) | S23, S24 |
| Notes d'application CAN | Ex. Texas Instruments « Introduction to the Controller Area Network » | S23 |
| Datasheets de régulateurs et convertisseurs | LDO et buck de grade automobile, choisis sur les cartes de récupération | S15, S16 |
| Datasheets de drivers de puissance | Commutateurs high-side / low-side protégés de grade automobile | S9, S29 |
| Datasheets de microcontrôleurs automobiles | Familles identifiées sur les calculateurs de récupération, documentation publique uniquement | S20, S22 |
| Fiches techniques de produits | Flux, alliages, décapants de vernis, vernis de tropicalisation, alcool isopropylique (fiches techniques + FDS) | S1, S26–S28 |
| Notices des stations de soudage et air chaud | Matériel de l'atelier | S4, S27 |
| Datasheets de drivers d'injection, de ponts en H et de commutateurs protégés | Composants relevés sur les calculateurs de récupération | S29–S32 |
| Datasheets de circuits d'airbag, de drivers d'électrovannes ABS / ESP et de ponts de direction | Uniquement les composants relevés sur les cartes et dont la documentation est publique | S35–S38 |

Règle : les « exemples de familles » ci-dessus servent à indiquer **quel type** de document chercher. Le contenu cité dans les cours doit provenir de la datasheet téléchargée, avec sa révision.

## Sources pour les modules M8 et M9

| Source | Usage | Statut |
|---|---|---|
| Documentation d'atelier officielle des constructeurs des véhicules d'atelier (procédures de dépose / repose, procédures airbag, purge, calibrations, schémas électriques) | S12, S23, M8, M9 | À obtenir par les abonnements constructeurs ; référence et date notées |
| Documentation de l'outil de diagnostic (ODIS, ISTA… selon marque) : fonctions guidées, apprentissages, essais | S18, M8, M9 | À relever dans l'outil |
| Ouvrages de la collection Bosch sur les systèmes de sécurité, de freinage et de direction | S35–S38 | [À VÉRIFIER : titres et éditions] |
| Documentation des simulateurs d'allumeurs et des charges de substitution utilisés | S35–S39 | Notice du fabricant |
| Notes d'application publiques sur les entrées capteurs et les étages de puissance automobiles | S29 | À sélectionner chez les fabricants des composants relevés |

## Ressources gratuites en ligne

| Ressource | Usage | Statut |
|---|---|---|
| MIT OpenCourseWare, cours 6.002 *Circuits and Electronics* | Approfondissement théorique M1 / M2 | [À VÉRIFIER : disponibilité actuelle] |
| All About Circuits, manuels en ligne | Révisions, exercices | [À VÉRIFIER : disponibilité actuelle] |
| Documentation KiCad | Dessin de schémas relevés (S13) | [SOURCÉ] |
| Schémas publics de cartes d'évaluation des fabricants de semi-conducteurs | Lecture de schéma (S12) | À sélectionner |

Les vidéos ont leur propre section : voir [Ressources vidéo](#ressources-vidéo).

## Ressources vidéo

> Source de cette section : document « AREPROG Academy — Architecture pédagogique » (PDF transmis par Arthur le 13/11/2026, section « Ressources vidéo », pages 16 à 25). Douze vidéos y ont été analysées le 13/11/2026 (transcription de l'audio et lecture des images). Ce document suivait l'ancien programme à **32 semaines** : chaque semaine a été **reportée sur le programme v0.3 à 41 semaines** ; l'ancienne semaine reste indiquée entre parenthèses (« v0.1 ») pour permettre le contrôle du report.

### Règles propres aux vidéos

1. Une vidéo est une source de **rang 7** (voir la hiérarchie ci-dessus) : elle illustre un cours et fournit des exercices, **jamais une valeur**. Toute donnée tirée d'une vidéo porte l'étiquette **[À VÉRIFIER]** tant qu'une datasheet, une norme ou une mesure ne l'a pas confirmée.
2. Les **liens** des vidéos ne figurent pas dans le document source : ils sont tous **[À VÉRIFIER : URL à relever]**. Le titre, la chaîne, la durée et les timecodes ci-dessous sont repris du document source et n'ont **pas été revus** sur les vidéos elles-mêmes.
3. Une « panne connue » vue en vidéo entre dans un cours comme **catégorie de panne** (alimentation, sortie de puissance, mémoire, communication, connectique, corrosion), jamais comme un fait. Un cas réel n'est documenté qu'après une réparation effective et mesurée.
4. Une correction d'erreur n'est publiée dans un cours qu'après archivage de la source indiquée dans la colonne « Source à archiver ».

### Niveaux de fiabilité des vidéos

Le classement ci-dessous traduit en trois niveaux l'appréciation portée sur chaque vidéo par le document source (colonne « Fiabilité ») et le nombre d'erreurs relevées. Il n'ajoute aucune appréciation nouvelle. Quel que soit le niveau, la vidéo reste une source de rang 7.

| Niveau | Signification | Usage autorisé dans un cours |
|---|---|---|
| **V1 — Illustration** | Appréciation « correcte », « bonne » ou « solide », au plus 3 réserves | Rubrique théorie (illustration) et mise en situation, avec renvoi aux réserves |
| **V2 — Avec corrections** | Erreurs de fond ou approximations relevées | Illustration seulement si chaque erreur est corrigée dans la rubrique « Erreurs fréquentes » du même cours |
| **V3 — Contre-exemple** | Erreurs multiples, méthode non validée ou contenu commercial | Exercice « trouve l'erreur », contre-exemple de méthode, ou bibliothèque technique ; jamais en illustration seule |

### Catalogue

Les sept premières vidéos forment la playlist *Basic Electronics for Car ECU* de la chaîne Autocar Star.

| # | Vidéo (chaîne) | Durée | Semaines v0.3 (v0.1) | Usage dans le cursus | Appréciation du document source | Niveau | Lien |
|---|---|---|---|---|---|---|---|
| VID-01 | *What Are Electronic Components?* (Autocar Star) | 4 min 35 | S1, S7 (S1) | Vocabulaire, familles de composants | Correcte, superficielle | V1 | [À VÉRIFIER : URL à relever] |
| VID-02 | *Lesson 1: Understanding Resistors* (Autocar Star) | 12 min 39 | S2, S7 (S2) | Codes couleur 4 et 5 anneaux, marquages CMS | Bonne, 3 erreurs | V2 | [À VÉRIFIER : URL à relever] |
| VID-03 | *Lesson 2: Understanding Resistors* (Autocar Star) | 16 min 28 | S2, S3 (S2, S3) | Puissance, série, parallèle, montage mixte, diviseur | Bonne, calculs tous justes | V1 | [À VÉRIFIER : URL à relever] |
| VID-04 | *Capacitors for ECU Repair* (Autocar Star) | 15 min 25 | S5, S7, S16, S17 (S4) | Technologies, lecture des codes, série et parallèle | 2 erreurs de fond (5 points relevés) | V2 | [À VÉRIFIER : URL à relever] |
| VID-05 | *Coil and Transformer in ECU* (Autocar Star) | 12 min 01 | S5, S6 (S5) | Réactance, énergie stockée, expériences à la lampe | Approximative sur l'automobile | V2 | [À VÉRIFIER : URL à relever] |
| VID-06 | *Semiconductors and Diodes in ECU* (Autocar Star) | 17 min 26 | S8 (S9) | Dopage, polarisation, familles de diodes | Plusieurs erreurs | V3 | [À VÉRIFIER : URL à relever] |
| VID-07 | *Transistor: Structure, Working Principle, Testing* (Autocar Star) | 16 min 30 | S9, S22 (S10, S28) | NPN / PNP, test au multimètre, polarisation ; idées d'outils de banc | Erreurs de codification, MOSFET absents | V3 | [À VÉRIFIER : URL à relever] |
| VID-08 | *Learning ECU Repair: The Basic Knowledge You Need* | 17 min 47 | S17, S18, S30 (S15, S28) | Méthode « alimentation d'abord », mesures sur banc | La plus utile, 3 réserves | V1 | [À VÉRIFIER : URL à relever] |
| VID-09 | *Explained: CAN Bus Diagnosis* | 11 min 49 | S23, S24 (S20) | Diagnostic du CAN haute vitesse au multimètre | Solide, 2 réserves | V1 | [À VÉRIFIER : URL à relever] |
| VID-10 | *Engine Sensors: Basics, 3D Animation* (CARinfo3D) | 16 min 18 | S10, S29 (S8, S27) | Rôle et position des capteurs d'un moteur essence | Correcte, aucune partie électrique | V1 | [À VÉRIFIER : URL à relever] |
| VID-11 | *Error Instrument Cluster on VW Virtual Cockpits* (Minitools) | 58 s | S32, bibliothèque technique (S30) | Démontage et remplacement du haut-parleur du combiné | Commerciale, aucun diagnostic montré | V3 | [À VÉRIFIER : URL à relever] |
| VID-12 | *Riparazione centralina Peugeot* (Mario Tec, en italien) | 14 min 11 | S9, S18, S27, S30, S33 (S11, S15, S23, S28, S29) | Cas réel : MOSFET de sortie fendu et résistance brûlée sur un Bosch EDC17C60 PSA | Bon geste, méthode par essais, aucune validation | V3 | [À VÉRIFIER : URL à relever] |

Points du catalogue à vérifier :

- VID-08 et VID-09 : la chaîne n'est pas indiquée dans le document source [À VÉRIFIER].
- VID-12 : la référence de calculateur « 0 281 032 456 » est lue dans la vidéo [À VÉRIFIER : étiquette du calculateur]. Le calculateur de récupération Bosch EDC17C60 du stock (TP-45, S30) permet de comparer, sans supposer que la carte est identique.
- VID-11 : la vidéo donne un haut-parleur de 4 Ω (donnée vendeur) [À VÉRIFIER : mesure] et cite l'Arteon 3H7, l'e-Golf, la Golf VII, la Passat B8 et le Tiguan AD/BW [À VÉRIFIER : documentation constructeur]. Le document source indique que ces deux informations complètent la fiche AREPROG-BT-VAG-J285-AID12-01 de la bibliothèque technique ; cette fiche n'est pas dans ce dépôt [À VÉRIFIER].

### Rattachement par semaine (programme v0.3)

| Semaine v0.3 | Vidéos | Ce qu'elles apportent |
|---|---|---|
| S1 — Atelier, sécurité, méthode | VID-01 | Première carte mentale des familles de composants (facultatif) |
| S2 — Grandeurs, loi d'Ohm, puissance | VID-02, VID-03 | Code couleur, puissance, série et parallèle |
| S3 — Kirchhoff, diviseurs | VID-03 | Montage mixte, diviseur |
| S5 — Condensateurs, inductances | VID-04, VID-05 | Charge et décharge à la lampe ; bobine en continu et en alternatif |
| S6 — Alternatif, signaux | VID-05 | Réactance (avec correction de notation) |
| S7 — Composants passifs CMS | VID-01, VID-02, VID-04 | Marquages CMS des résistances, codes des condensateurs |
| S8 — Diodes | VID-06 | Exercice « trouve l'erreur » |
| S9 — Transistors en commutation | VID-07, VID-12 | Exercice « trouve l'erreur » ; MOSFET de sortie sur cas réel |
| S10 — AOP, conditionnement de capteur | VID-10 | Rôle et position des capteurs (mise en situation) |
| S16 — Convertisseurs à découpage | VID-04 | Mesure d'ESR absente de la vidéo (correction) |
| S17 — Alimentation d'un calculateur | VID-04, VID-08 | Marge de tension des condensateurs (contradiction entre vidéos) ; architecture d'alimentation |
| S18 — Diagnostic d'alimentation sur carte | VID-08, VID-12 | Méthode « alimentation d'abord » ; erreurs de la réparation Peugeot |
| S22 — Banc de test, étape 2 (PB-2) | VID-07 | Outils de banc à fabriquer |
| S23 — CAN : couche physique | VID-09 | Mesures CAN-H / CAN-L |
| S24 — Méthode de diagnostic de bus | VID-09 | Arbre de diagnostic au multimètre |
| S27 — Air chaud et CI | VID-12 | Dépose d'un boîtier de puissance collé |
| S29 — Entrées capteurs et étages de puissance | VID-10 | Capteurs (à compléter par les signaux réels) ; sortie low-side (correction VID-05) |
| S30 — Méthode de diagnostic, ECU moteur | VID-08, VID-12 | Contre-exemple de méthode sur EDC17C60 |
| S32 — Calculateurs de carrosserie | VID-11 | Combiné d'instruments (bibliothèque technique) |
| S33 — Pannes intermittentes, validation | VID-12 | Panne « résolue » sans validation : contre-exemple |

Aucune vidéo n'est rattachée aux modules M9 (S35–S39) ni aux semaines S11–S15, S19–S21, S25, S26, S28, S31 et S34.

### Erreurs relevées dans les vidéos

Vingt-huit erreurs ou approximations sont relevées par le document source. Elles alimentent la rubrique « Erreurs fréquentes » et des exercices « trouve l'erreur » (extrait au timecode, correction attendue). Les timecodes sont ceux du document source [À VÉRIFIER sur la vidéo].

Colonne « Statut » : « Calcul revérifié » signifie que le calcul ou le raisonnement a été refait à la rédaction de cette section ; « [À VÉRIFIER] » signifie que la correction attend l'archivage de la source indiquée.

| N° | Sem. v0.3 (v0.1) | Vidéo, timecode | Ce que dit la vidéo | Correction proposée | Source à archiver | Statut |
|---|---|---|---|---|---|---|
| E-01 | S2 (S2) | VID-02, 07:01 | Orange-blanc-jaune annoncé « 39 000 Ω » à l'oral (la diapo est juste) | 39 × 10⁴ = 390 000 Ω = 390 kΩ | Calcul ; valeurs des couleurs selon la fiche source du code couleur | Calcul revérifié ; couleurs [À VÉRIFIER] |
| E-02 | S7 (S2) | VID-02, 04:29 | Les ECU utilisent surtout des résistances à 5 anneaux | Les cartes récentes sont quasi entièrement en CMS : marquage à 3 ou 4 chiffres, ou aucun | Relevé AREPROG sur cartes de récupération (TP-10) | [À VÉRIFIER] |
| E-03 | S2 (S2) | VID-02, 10:17 | Résistance variable = petite, potentiomètre = grand | La différence tient au câblage (2 bornes en rhéostat, 3 bornes en diviseur), pas à la taille | Définition (ouvrage de référence) | [À VÉRIFIER] |
| E-04 | S5 (S4) | VID-04, 07:22 | 1 F = 1 000 µF | 1 F = 10⁶ µF = 10⁹ nF = 10¹² pF | Définition (préfixes SI) | [À VÉRIFIER] |
| E-05 | S5 (S4) | VID-04, 12:44 | En série, les tensions de service s'additionnent | Vrai seulement à capacités égales et avec résistances d'équilibrage ; sinon la plus petite capacité reçoit la plus grande tension (charge Q identique) | Calcul | Raisonnement revérifié (U = Q / C) |
| E-06 | S7 (S4) | VID-04, 09:01 | Les électrolytiques sont toujours cylindriques | Les tantales et polymères CMS sont rectangulaires | Photo d'une carte de récupération | [À VÉRIFIER] |
| E-07 | S17 (S4) | VID-04, 11:04 et VID-08, 06:18 | Marge de tension : 1,4 × (16 V sur 12 V) dans l'une, 25 à 35 V sur 12 V dans l'autre | Les deux vidéos se contredisent ; un réseau 12 V voit plus de 14 V en charge et des surtensions | ISO 16750-2 et ISO 7637-2 | [À VÉRIFIER] |
| E-08 | S16 (S4) | VID-04, 11:45 | Test = capacimètre + ohmmètre | Manquent la décharge préalable et la mesure d'ESR (au programme v0.3 : TP-22, S16) | Notice du testeur ESR | [À VÉRIFIER] |
| E-09 | S29 (S5) | VID-05, 11:01 | Des transformateurs commandent injecteurs et électrovannes | Sortie low-side avec écrêtage de la surtension ; en injection directe, la haute tension vient d'un convertisseur élévateur à inductance | Relevé sur carte (S16, S29 en v0.3) | [À VÉRIFIER] |
| E-10 | S6 (S5) | VID-05, 03:24 | Réactance notée Z_L | Notation usuelle X_L ; Z désigne l'impédance | Définition (ouvrage de référence) | [À VÉRIFIER] |
| E-11 | S5 (S5) | VID-05, 09:22 | Expérience de décharge de bobine | Ne relie pas ce pic à la coupure d'un injecteur ou d'un relais par le calculateur, point central de S5 | — | Remarque pédagogique |
| E-12 | S8 (S9) | VID-06, 16:53 | Diapo récapitulative : « P-type » et « N-type » inversés | Phosphore (5 électrons) donne du N ; indium (3) donne du P, comme aux diapos 05:13 et 06:10 | Définition (ouvrage de référence) | [À VÉRIFIER] |
| E-13 | S8 (S9) | VID-06, 09:11 | La diode claque vers 1 000 V en inverse | Tension inverse propre à chaque référence (1N4001 à 1N4007 très différentes) | Datasheet 1N400x | [À VÉRIFIER] |
| E-14 | S8 (S9) | VID-06, 12:07 | Courant Zener limité « à environ 30 mA » | Dépend de la puissance de la Zener | Datasheet BZX | [À VÉRIFIER] |
| E-15 | S8 (S9) | VID-06, 13:40 | LED : 1,7 à 2,2 V | Valable pour rouge, jaune, vert ; bleu et blanc autour de 3 V | Datasheets de LED | [À VÉRIFIER] |
| E-16 | S8 (S9) | VID-06, 15:28 et 15:42 | Diode rapide plus chère, repérée par un anneau en pointillé | Aucune règle de marquage fiable : identifier par la référence | Datasheet | [À VÉRIFIER] |
| E-17 | S8, S9 (S9, S10) | VID-06, 09:31 et VID-07, 06:30 | Pointe noire sur l'anode pour le sens passant | Vrai au multimètre à aiguille ; au numérique, la rouge est le +, en mode diode | Notice du multimètre | [À VÉRIFIER] |
| E-18 | S9 (S10) | VID-07, 04:28 | Codes chinois : A et B = PNP, C et D = NPN | 3A PNP germanium, 3B NPN germanium, 3C PNP silicium, 3D NPN silicium | Norme chinoise de codification | [À VÉRIFIER] |
| E-19 | S9 (S10) | VID-07, 05:22 | 2N5401 présenté comme chinois ; brochage déduit du pays | Préfixe 2N = enregistrement américain ; brochage toujours par datasheet ou mesure | Datasheet 2N5401 | [À VÉRIFIER] |
| E-20 | S9 (S10) | VID-07, 11:32 | Un PNP demande un VCC négatif | L'émetteur d'un PNP va au + (commande côté haut) ; seule compte la polarité relative | Définition (ouvrage de référence) | [À VÉRIFIER] |
| E-21 | S18 (S15) | VID-08, 05:41 | La diode d'entrée conduit et fait sauter le fusible | Selon la carte : diode série, diode parallèle ou TVS, à identifier carte par carte | Relevé AREPROG | [À VÉRIFIER] |
| E-22 | S17 (S15) | VID-08, 07:02 et 06:50 | Condensateurs de filtrage presque tous polarisés ; au moins 12, 5 et 3,3 V sur tout ECU | Découplage surtout en céramiques non polarisées ; les tensions dépendent de la génération du calculateur | Relevé AREPROG | [À VÉRIFIER] |
| E-23 | S18 (S15) | VID-12, 01:02 | Le composant marqué 0 est « un fusible, pas une résistance » | C'est une résistance de 0 Ω (pont) : elle peut fondre comme un fusible, mais sans calibre garanti | Définition | [À VÉRIFIER] |
| E-24 | S18 (S15) | VID-12, 02:08 | Alimentation injectée directement sur un condensateur de la carte | Contourne les protections d'entrée : seulement avec une alimentation limitée en courant, limite basse, polarité vérifiée | Protocole TP (TP-02 en S1, injection de courant limité en S18) | [À VÉRIFIER] |
| E-25 | S18 (S15) | VID-12, 02:59 à 04:08 | Valeur d'une résistance brûlée déduite de sa mesure en circuit (83 à 86 Ω) et des résistances voisines (104) | Ni l'une ni l'autre ne donnent la valeur : relever la même position sur une carte saine de même référence. La vidéo finit d'ailleurs par poser 100 Ω, pas 100 kΩ | Relevé AREPROG sur carte de référence | [À VÉRIFIER] |
| E-26 | S23, S24 (S20) | VID-09, 04:51 et 05:05 | 0 V entre CAN-H et CAN-L = bus endormi ; 60 Ω à la prise = réseau mesuré | Réveillé au repos, le différentiel vaut aussi environ 0 V : mesurer chaque ligne par rapport à la masse. Sur VAG, la prise passe par la passerelle et ne voit pas forcément le CAN moteur | ISO 11898-2 ; schéma erWin | [À VÉRIFIER] |
| E-27 | S30 (S28) | VID-12, 09:29 | Essayer les valeurs de la plus haute à la plus basse | Méthode par essais sous tension : risque pour les composants en aval. La carte de référence et l'arbre d'hypothèses évitent l'essai | Méthode de S30 | Remarque de méthode |
| E-28 | S30, S33 (S29, S31) | VID-12, 13:35 | Panne « résolue » parce que le 12 V est revenu sur la zone | Aucun essai fonctionnel (communication, lecture, banc, véhicule) et aucune recherche de ce qui a détruit le MOSFET : une charge ou un faisceau en court-circuit côté véhicule le détruira de nouveau | Protocole de validation de S33 | Remarque de méthode |

### Apports à intégrer lors de la rédaction des cours

Quinze apports. Les calculs ont été refaits à la rédaction de cette section et sont justes ; ils restent des **[EXEMPLE]**. Les valeurs attribuées aux couleurs et aux codes de marquage restent **[À VÉRIFIER]** tant que la fiche source correspondante ne les confirme pas.

| N° | Sem. v0.3 (v0.1) | Apport | Rubrique du cours | Vidéo |
|---|---|---|---|---|
| A-01 | S1 (S1) | Classement des composants (passifs, actifs, auxiliaires) comme première carte mentale | Théorie | VID-01 |
| A-02 | S2, S7 (S2) | Lectures : rouge-rouge-noir-argent = 22 Ω ±10 % ; orange-blanc-jaune-argent = 390 kΩ ; rouge-violet-jaune-rouge-marron = 27,4 kΩ ±1 % ; CMS 223, 8202, 0R22, 4R7, 000 [EXEMPLE ; couleurs et codes À VÉRIFIER] | Exemples numériques, QCM | VID-02 |
| A-03 | S2, S3 (S3) | Série 2 + 3 + 5 Ω sous 20 V ; parallèle 6 et 3 Ω sous 12 V ; 9 kΩ = 15 kΩ ∥ 15 kΩ + 1,5 kΩ ; lampe 9 V 2 W sur 12 V = 13,5 Ω et 0,67 W [EXEMPLE] | Exemples numériques | VID-03 |
| A-04 | S5, S7 (S4) | Démonstration charge et décharge avec lampe ; lecture des codes 104, 223, 107 [EXEMPLE ; codes À VÉRIFIER] | Théorie, exercices | VID-04 |
| A-05 | S5, S6 (S5) | Bobine en série avec une lampe en continu, 50 Hz et 200 Hz : la lampe faiblit quand la fréquence monte | Théorie (qualitatif) | VID-05 |
| A-06 | S10, S29 (S8, S27) | Position et rôle des capteurs : cible dentée à dent manquante du vilebrequin, cliquetis, sondes lambda amont et aval, MAF et MAP ; à compléter par les signaux réels | Théorie, mise en situation | VID-10 |
| A-07 | S8, S9 (S9, S10) | Exercice « trouve l'erreur » à partir du tableau des erreurs | QCM et évaluation | Toutes |
| A-08 | S9 (S11) | Lacune : seule VID-12 montre un MOSFET, sur un cas réel et sans théorie ; IGBT, Schottky et TVS restent sans source vidéo | — | — |
| A-09 | S9, S29 (S11) | Cas d'application : MOSFET logique BUK9237-55A fendu sur une sortie d'EDC17C60. Brochage dessiné dans la vidéo (1 grille, 2 drain sur la semelle, 3 source) [À VÉRIFIER sur la datasheet du fabricant] | Théorie (application), lecture de datasheet | VID-12 |
| A-10 | S17, S18 (S15) | Méthode « alimentation d'abord » : 12 V d'entrée, 5 V, 3,3 V, masses, puis tensions autour de chaque circuit intégré ; mesurer un calculateur sain et noter chaque valeur | TP (TP-23, TP-25), modèle de fiche de relevés | VID-08 |
| A-11 | S24 (S20) | Arbre de diagnostic au multimètre : environ 60 Ω normal, 120 Ω coupure entre terminaisons, moins de 60 Ω court-circuit H-L, OL coupure vers la prise ; puis court-circuit au + et à la masse, et découpage du faisceau en deux [valeurs de terminaison À VÉRIFIER : ISO 11898-2] | TP de pannes de bus (TP-36) | VID-09 |
| A-12 | S27 (S23, S24) | Dépose d'un boîtier de puissance collé sous le corps : chauffe prolongée, retrait de l'excès d'étain, nettoyage à l'alcool isopropylique, contrôle des courts-circuits après repose | TP brasage (TP-39), erreurs fréquentes | VID-12 (06:30 à 09:11) |
| A-13 | S18, S22 (S28) | Outils de banc à fabriquer : simulateur de capteurs, charge fictive d'injecteurs, testeur de bobine | Projet banc de test (PB-1, PB-2) | VID-07 |
| A-14 | S30, S33 (S28, S29) | Contre-exemple de méthode : refaire le cas VID-12 avec l'arbre d'hypothèses, la carte de référence et le protocole de validation, puis comparer | Exercice | VID-12 |
| A-15 | S32 (S30) | Combiné VW virtual cockpit : démontage Torx T8 et remplacement du haut-parleur ; n'entre comme cas réel qu'après une réparation effective et mesurée | Bibliothèque technique | VID-11 |

### Ajouter une nouvelle vidéo

1. Transcrire l'audio et lire les images.
2. Ajouter une ligne au catalogue (semaines v0.3, usage, appréciation, niveau, lien).
3. Reporter chaque erreur avec son timecode et la source qui confirmera la correction.
4. Reporter les apports ; aucune valeur reprise sans étiquette.
5. Traiter une « panne connue » vue en vidéo comme une catégorie de panne, pas comme un fait.

## Ressources internes à créer par AREPROG

| Ressource | Contenu | Création |
|---|---|---|
| Journal d'atelier | Une page par séance | Dès S1 |
| Modèle de dossier de réparation | Réception, symptômes, hypothèses, mesures, intervention, validation, sources | S1, enrichi en S33 et S39 |
| Bibliothèque de datasheets | Fichiers + fiche source | Au fil des semaines |
| Base de connaissances calculateurs | Relevés de cartes et observations, **toujours étiquetés** | À partir de S13 |
| Registre des calculateurs d'exercice | Référence, origine, date d'achat, rôle (référence / panne / tout venant), usage TP, d'après la [liste d'achats](03-travaux-pratiques.md#liste-dachats-des-calculateurs-dexercice) | Avant S7 |
| Banque de questions QCM | 25 questions par cours, dont calculs paramétrés | Avec chaque cours |

## Ce qui n'existe pas publiquement (et comment le cursus le gère)

- **Schémas de calculateurs** : généralement non publiés par les équipementiers. Le cursus enseigne le relevé de schéma (S13) et marque toute information relevée [À VÉRIFIER].
- **Brochages et valeurs constructeur** : à obtenir uniquement par documentation officielle accessible légalement ; sinon, relevé personnel étiqueté.
- **Pannes récurrentes** : aucune n'est enseignée comme un fait sans source vérifiable. La base de connaissances interne se constitue à partir de réparations documentées.
