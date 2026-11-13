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
| ISO 26262 | Sécurité fonctionnelle des véhicules routiers | S17, S29 |
| ISO 11898-1 / ISO 11898-2 | CAN : couche liaison / couche physique haute vitesse | S23, S25 |
| ISO 17987 | LIN | S24 |
| ISO 9141-2, ISO 14230 | K-Line, KWP 2000 | S24 |
| ISO 14229 | Services de diagnostic UDS (lien avec la pratique atelier) | S22, S29 |
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

Règle : les « exemples de familles » ci-dessus servent à indiquer **quel type** de document chercher. Le contenu cité dans les cours doit provenir de la datasheet téléchargée, avec sa révision.

## Ressources gratuites en ligne

| Ressource | Usage | Statut |
|---|---|---|
| MIT OpenCourseWare, cours 6.002 *Circuits and Electronics* | Approfondissement théorique M1 / M2 | [À VÉRIFIER : disponibilité actuelle] |
| All About Circuits, manuels en ligne | Révisions, exercices | [À VÉRIFIER : disponibilité actuelle] |
| Documentation KiCad | Dessin de schémas relevés (S13) | [SOURCÉ] |
| Schémas publics de cartes d'évaluation des fabricants de semi-conducteurs | Lecture de schéma (S12) | À sélectionner |

## Ressources internes à créer par AREPROG

| Ressource | Contenu | Création |
|---|---|---|
| Journal d'atelier | Une page par séance | Dès S1 |
| Modèle de dossier de réparation | Réception, symptômes, hypothèses, mesures, intervention, validation, sources | S1, enrichi en S31 |
| Bibliothèque de datasheets | Fichiers + fiche source | Au fil des semaines |
| Base de connaissances calculateurs | Relevés de cartes et observations, **toujours étiquetés** | À partir de S13 |
| Inventaire des calculateurs de récupération | Référence, origine, état, usage TP | Avant S7 |
| Banque de questions QCM | ≥ 40 questions par cours | Avec chaque cours |

## Ce qui n'existe pas publiquement (et comment le cursus le gère)

- **Schémas de calculateurs** : généralement non publiés par les équipementiers. Le cursus enseigne le relevé de schéma (S13) et marque toute information relevée [À VÉRIFIER].
- **Brochages et valeurs constructeur** : à obtenir uniquement par documentation officielle accessible légalement ; sinon, relevé personnel étiqueté.
- **Pannes récurrentes** : aucune n'est enseignée comme un fait sans source vérifiable. La base de connaissances interne se constitue à partir de réparations documentées.
