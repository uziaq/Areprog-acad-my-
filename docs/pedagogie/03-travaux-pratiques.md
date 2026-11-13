# 3. Travaux pratiques, sécurité et équipement

> Version 0.3 : 60 TP numérotés dans l'ordre des semaines, 20 séances de fil rouge,
> projet transversal « banc de test » (PB-1 à PB-3), protocoles de sécurité étendus
> au calculateur réel (dès S18) et au véhicule (M9).

## Principes communs à tous les TP

1. **Basse tension protégée d'abord.** Jusqu'à S17, tous les TP sont alimentés par une alimentation de laboratoire limitée en courant, avec des tensions de circuit ≤ 15 V. Le secteur n'est jamais ouvert ni mesuré. À partir de S18, le [protocole commun calculateurs réels](#protocole-commun-calculateurs-réels-à-partir-de-s18) s'applique.
2. **Cartes d'entraînement avant cartes réelles.** Toute opération destructive est d'abord réalisée sur une carte d'entraînement, puis sur un calculateur de récupération (hors service, sans valeur client).
3. **Jamais de calculateur ni de véhicule client pendant le cursus.**
4. **Deux voies pour chaque TP de diagnostic (M8, M9)** : panne réelle sur calculateur de récupération, ou panne de niveau carte provoquée, réversible, préparée et scellée par un tiers.
5. **Mesures attendues.** Chaque TP fournit une valeur théorique calculée et une **tolérance justifiée** : tolérance des composants (marquage / datasheet) + incertitude de l'instrument (notice). Une tolérance sans justification est interdite.
6. **Limite de courant écrite.** Chaque TP alimenté indique la limite de courant à régler, justifiée par la charge ; un TP sans limite écrite ne commence pas.
7. **Livrable systématique** : page de journal d'atelier avec schéma, photos, tableau de mesures, écart théorie / mesure expliqué.

## Protocole commun calculateurs réels (à partir de S18)

1. Photos des deux faces avant toute intervention ; inventaire de la carte au journal.
2. Repérer les **convertisseurs élévateurs et étages à tension interne élevée** (par exemple les étages d'injection d'un ECU moteur diesel, dont la tension survoltée est très supérieure à 12 V [À VÉRIFIER : valeur dans la datasheet du driver relevé sur la carte]).
3. Après coupure, **mesurer** la décharge des condensateurs de ces étages avant de toucher la carte ou de souder ; ne jamais supposer qu'un temps d'attente suffit.
4. Mesurer ces nœuds avec une **sonde différentielle** ou un oscilloscope à voies isolées, jamais avec une sonde dont la masse est reliée à la terre.
5. Mise sous tension progressive avec limitation de courant (méthode S18).
6. Sauvegarder les mémoires deux fois, empreintes identiques, avant toute écriture ou soudure à proximité.

## Règle « calculateurs de sécurité »

Décision d'Arthur (13/11/2026) : les calculateurs d'airbag, d'ABS / ESP et de direction
assistée sont **diagnostiqués et réparés** dans le cursus, pas seulement observés. Ils
sont traités dans le module M9 (S35–S39), après le jalon 3.

| Famille | Quand | Cadre |
|---|---|---|
| ECU moteur | S29–S30 | Protocole commun ; tensions internes élevées. |
| TCU | S31 | Protocole commun. |
| BCM / BSI / FRM / CAS | S32 | Protocole commun ; éclairage, verrouillage et antidémarrage touchent la sécurité des personnes et des biens. |
| Airbag | S35, S36, S39 | Protocole renforcé, **jamais de pyrotechnie à l'atelier**, validation véhicule sur simulateurs uniquement. |
| ABS / ESP | S37, S39 | Protocole renforcé, sécurité véhicule. |
| Direction assistée | S38, S39 | Protocole renforcé, sécurité véhicule. |

## Protocole renforcé pour les calculateurs de sécurité

Ce protocole est une proposition pédagogique. Toute valeur (résistance de substitution,
temps de décharge, tension de réserve) doit venir d'une source identifiée, sinon elle
reste [À VÉRIFIER] et la mesure prime. Il est vérifié par la
[grille « protocole renforcé »](04-evaluation.md#grille--protocole-renforcé--m9).

**Avant l'intervention**

1. Le calculateur arrive **seul** : aucun module d'airbag, prétensionneur ou autre élément pyrotechnique n'entre dans l'atelier de formation. [À VÉRIFIER : réglementation applicable au stockage et à la manipulation des pyrotechnies automobiles]
2. Identifier sur la carte la réserve d'énergie et les étages de commande des allumeurs, à partir de la carte et de datasheets publiques ; marquer le relevé [À VÉRIFIER].
3. Vérifier **par la mesure** que la réserve d'énergie est déchargée avant toute manipulation ou soudure.
4. Sauvegarder la mémoire deux fois, empreintes identiques. Noter l'état de la mémoire d'événements **sans la modifier**.

**Sur banc**

5. Alimentation de labo limitée en courant, mise sous tension progressive.
6. Sorties d'allumeurs reliées **uniquement** à des simulateurs d'allumeurs ou résistances, dont la valeur provient de la documentation de l'outil ou du constructeur. [À VÉRIFIER : valeur par calculateur]
7. ABS / ESP et direction : charges de substitution **réduites** (électrovannes, moteurs), limite de courant écrite par TP, fusible ; l'alimentation de labo n'est pas dimensionnée pour un moteur de pompe ou un pont de direction à pleine charge.

**Validation et traçabilité**

8. Dossier de validation renforcée : ce qui est validé sur banc, ce qui l'est sur véhicule, ce qui ne peut pas l'être en atelier.
9. Remise en circulation d'un calculateur de sécurité : régie par la [décision D-14](08-decisions-et-lacunes.md), jamais pendant le cursus.

## Sécurité véhicule

S'applique à tout TP sur véhicule d'atelier (TP-15, TP-34, TP-55, TP-57, TP-58, TP-59, S41).

1. **Véhicules électrifiés exclus pour l'instant** (hybrides, électriques, 48 V) : décision d'Arthur du 13/11/2026 (D-15). Une réintégration supposerait une habilitation électrique adaptée. [À VÉRIFIER : NF C18-550 et niveau d'habilitation requis]
2. Immobilisation : frein de stationnement, cales, boîte en position de stationnement ; levage sur pont ou chandelles selon la notice ; zone dégagée.
3. Connexions et déconnexions **batterie débranchée**, selon l'ordre prévu par le constructeur.
4. **Airbag** : pour un calculateur d'airbag réparé pendant le cursus, tous les modules pyrotechniques du véhicule sont débranchés selon la procédure constructeur et remplacés par des simulateurs ; batterie débranchée pendant les connexions ; personne dans l'habitacle à la première mise sous contact. Un calculateur d'airbag réparé n'est **jamais** mis sous tension face à des allumeurs réels pendant le cursus.
5. **ABS / ESP** : purge et contrôle de pédale selon le constructeur, puis essais de freinage statiques, avant tout déplacement.
6. **Direction** : premiers essais véhicule immobilisé, roues décollées si la procédure le prévoit ; calibrations constructeur avant tout roulage.
7. Essais dynamiques uniquement sur voie privée, selon la procédure constructeur. [À VÉRIFIER : cadre réglementaire et assurance des essais]
8. **Critères d'arrêt immédiat** écrits avant l'essai (voyant de sécurité, bruit, odeur, comportement anormal de la pédale ou de la direction).

## Ce que le cursus n'enseigne pas

- L'effacement ou la modification de données de collision.
- La modification de données d'antidémarrage ; le module CAS est étudié au niveau carte uniquement, sur des pièces de provenance légitime et documentée. [À VÉRIFIER : cadre juridique]
- La reprise de BGA (présentée en S27, hors pratique).

## Catalogue des TP

Durée indicative : 1 à 3 h. « CE » = carte d'entraînement ou plaque d'essai ; « CR » = calculateur de récupération ; « VA » = véhicule d'atelier.

| TP | Semaine | Intitulé | Support | Mesures / livrable principal |
|---|---|---|---|---|
| TP-01 | S1 | Poste ESD | Tapis, bracelet, testeur | Continuité poste → terre, check-list photo |
| TP-02 | S1 | Prise en main de l'alimentation de labo | Alim + résistance de puissance | Preuve du passage en limitation de courant |
| TP-03 | S2 | Loi d'Ohm | CE | Tableau U/I, droite, écart à la valeur nominale |
| TP-04 | S3 | Diviseur chargé / non chargé | CE | Tension calculée vs mesurée selon charge |
| TP-05 | S3 | Résistance interne d'une source | Pile / batterie + charges | Modèle de Thévenin mesuré |
| TP-06 | S4 | Incertitude et effet de charge | CE, diviseur haute impédance | Calcul d'incertitude, mise en évidence de l'effet de charge |
| TP-07 | S5 | Charge / décharge RC | CE | Courbe tension-temps, τ mesuré vs calculé |
| TP-08 | S6 | Première mesure oscilloscope | Générateur de fonctions | Période, amplitude, rapport cyclique |
| TP-09 | S6 | Filtre RC | CE + générateur | Diagramme gain / fréquence, fc mesurée |
| TP-10 | S7 | Inventaire de composants | CR | Photo annotée, liste des boîtiers et marquages |
| TP-11 | S8 | Caractéristique d'une diode | CE | Courbe I(U), seuil mesuré |
| TP-12 | S8 | Zener et TVS | CE + alim limitée | Tension d'écrêtage vs datasheet |
| TP-13 | S9 | Commande par NPN | CE | VCE(sat), courant de base |
| TP-14 | S9 | Commande par MOSFET | CE | VDS en conduction, échauffement, RDS(on) calculée |
| TP-15 | S10 | Montages AOP + capteur ratiométrique | CE, VA (contact mis, moteur arrêté) | Gain mesuré vs calculé, tension capteur relevée |
| TP-16 | S10 | Comparateur à hystérésis | CE | Seuils haut / bas mesurés |
| TP-17 | S11 | Compensation de sonde, longue masse | Oscilloscope | Captures avant / après, explication |
| TP-18 | S11 | Événement unique, courant à la pince | CE (relais) | Rebond de contact, courant d'appel, FFT d'un signal PWM |
| TP-19 | S12 | Découpage d'un schéma public + schéma électrique constructeur | Schémas | Schéma annoté par blocs, brochage d'un connecteur relevé sur document officiel |
| TP-20 | S13 | Relevé d'un bloc d'entrée | CR | Schéma KiCad marqué [À VÉRIFIER] |
| TP-21 | S15 | Régulateur linéaire sous charge | CE | Dissipation calculée vs température mesurée |
| TP-22 | S16 | Module buck | Module du commerce | Rendement, ondulation, ESR des condensateurs |
| TP-23 | S17 | Chaîne d'alimentation d'un calculateur | CR | Schéma de la chaîne d'entrée relevé |
| TP-24 | S18 | Court-circuit simulé | CE préparée | Localisation et méthode documentée |
| TP-25 | S18 | Mise sous tension sur banc | CR | Courant de repos, rails, défauts internes lus à l'outil de diagnostic |
| TP-26 | S19 | Portes logiques et seuils | CE | Seuils de basculement mesurés |
| TP-27 | S19 | Analyseur logique sur I²C | Carte d'évaluation | Trame décodée |
| TP-28 | S20 | Reset et watchdog | Carte de développement | Captures reset / watchdog |
| TP-29 | S20 | Conditions de vie du MCU | CR | Alimentations, horloge, reset relevés |
| TP-30 | S21 | EEPROM sur carte d'entraînement | CE + programmateur | Lecture, écriture, vérification par empreinte |
| TP-31 | S21 | Dépose / lecture / repose EEPROM | CE multicouche | Deux sauvegardes identiques, repose contrôlée |
| TP-32 | S22 | Programmation par interface de débogage | Carte de développement | Programmation réussie + analyse d'échec |
| TP-33 | S23 | Banc CAN à deux nœuds | Cartes de développement | Résistance bus, captures différentielles |
| TP-34 | S23 | Mesures CAN sur véhicule et calculateur | VA, puis CR sur banc | Captures CAN-H / CAN-L, brochage tiré du schéma officiel |
| TP-35 | S24 | Banc LIN | Carte de développement + transceiver | Trame LIN capturée |
| TP-36 | S25 | Pannes de bus provoquées (épreuve du jalon 2) | Banc CAN S23 | Diagnostic de 4 pannes |
| TP-37 | S26 | 20 passifs 0603 / 0402 | CE | Taux de conformité au microscope |
| TP-38 | S27 | Dépose / repose QFP et QFN | CE | Contrôle broches, continuité, absence de pont |
| TP-39 | S27 | Dépose d'une EEPROM et d'un CI sur carte réelle | CR | Composants voisins et pastilles intacts |
| TP-40 | S28 | Réparation de pistes, pastilles, broche de connecteur | CE | Continuité, tenue mécanique |
| TP-41 | S28 | Zone corrodée | CR | Avant / après, mesures d'isolement |
| TP-42 | S29 | Entrées capteurs | CE | Signaux inductif, Hall, ratiométrique conditionnés |
| TP-43 | S29 | Étages de puissance | CE + pince de courant | Low-side, high-side, pont en H, courant d'injecteur simulé |
| TP-44 | S30 | Diagnostic comparatif | 2 CR identiques | Tableau broche par broche, écarts expliqués |
| TP-45 | S30 | Diagnostic complet ECU moteur | CR (EDC17C60) | Dossier de réparation |
| TP-46 | S31 | Diagnostic TCU | CR | Dossier de réparation, mesure de régulation de courant |
| TP-47 | S32 | Diagnostic BCM / BSI ou FRM | CR | Dossier de réparation, diagnostic de charge |
| TP-48 | S32 | Module CAS | CR (CAS3) | Conditions de vie, consommation au repos, réveil |
| TP-49 | S33 | Panne intermittente provoquée | CE ou CR | Méthode de provocation et de localisation |
| TP-50 | S33 | Validation et dossier | CR réparé en S30–S32 | Dossier complet avec limites de validation |
| TP-51 | S34 | Épreuve du jalon 3 | CR, panne scellée par un tiers | Voir [évaluation](04-evaluation.md#jalon-3-s34) |
| TP-52 | S35 | Airbag sur banc avec simulateurs d'allumeurs | CR airbag (T-Cross) | Décharge mesurée, sauvegardes, état de la mémoire noté |
| TP-53 | S36 | Diagnostic et réparation d'un airbag | CR airbag | Dossier renforcé, absence de défaut d'allumeur sur simulateurs |
| TP-54 | S37 | ABS / ESP sur banc | CR | Étages d'électrovannes et de pompe, charges réduites documentées |
| TP-55 | S37 | Capteurs de roue | VA levé | Captures des signaux de roue |
| TP-56 | S38 | Étage de puissance de direction | CR direction | Pont de puissance diagnostiqué, limite de courant écrite |
| TP-57 | S38 | Capteur de couple | VA immobilisé | Signaux relevés en statique |
| TP-58 | S39 | Validation véhicule d'un calculateur M8 | VA + CR réparé | Défauts, valeurs réelles, codages, essais constructeur |
| TP-59 | S39 | Validation véhicule d'un calculateur de sécurité | VA + CR réparé (airbag : simulateurs) | Sécurité véhicule respectée, essais documentés |
| TP-60 | S39 | Dossier de validation renforcée | CR réparés en M9 | Banc / véhicule / non validable clairement séparés |

## Projet transversal « banc de test »

| Étape | Semaine | Contenu | Livrable |
|---|---|---|---|
| PB-1 | S18 | Alimentation protégée (fusible, limitation, interrupteurs 30 / 15), câblage d'un connecteur de calculateur | Banc documenté, schéma |
| PB-2 | S22 | Simulateur de charges : résistives, lampes, inductives, avec mesure de courant | Charges étiquetées avec valeurs mesurées |
| PB-3 | S24 | Raccordement CAN et prise de diagnostic pour l'outil atelier | Communication outil ↔ calculateur sur banc |

## Fil rouge microsoudure (20 séances, S4 à S24, sans séance en S14)

| FR | Semaine | Exercice | Critère de réussite |
|---|---|---|---|
| FR-01 | S4 | Étamage, fils, traversants | Joints brillants et concaves, sans pont |
| FR-02 | S5 | Traversants sur carte d'entraînement | 10/10 conformes au microscope |
| FR-03 | S6 | CMS 1206 | 10/10 conformes |
| FR-04 | S7 | CMS 0805 | 10/10 conformes |
| FR-05 | S8 | SOD / MELF | Orientation et ménisques corrects |
| FR-06 | S9 | SOT-23 | 3 broches sans pont |
| FR-07 | S10 | Repose SOIC-8 | Repose sans pont, continuité vérifiée |
| FR-08 | S11 | Retouche et contrôle | Identification des défauts sur photos |
| FR-09 | S12 | SOIC-14/16 | Repose conforme |
| FR-10 | S13 | Dépose de SOIC-8 au fer (deux fers, pince chauffante ou alliage à bas point de fusion) | Pastilles intactes sur 3 déposes |
| FR-11 | S15 | Dépose DPAK au fer avec préchauffage | Pastille intacte |
| FR-12 | S16 | Inductances, électrolytiques CMS | Polarité et tenue |
| FR-13 | S17 | Composants sous vernis | Retrait local propre |
| FR-14 | S18 | Remplacement d'un découplage | Valeur et orientation vérifiées |
| FR-15 | S19 | TSSOP | Repose sans pont |
| FR-16 | S20 | Quartz / oscillateurs CMS | Repose et fonctionnement |
| FR-17 | S21 | Dépose et repose SOIC-8 au fer | Continuité de chaque broche, pastilles intactes |
| FR-18 | S22 | Straps en fil émaillé | Strap fixé, isolé, continuité |
| FR-19 | S23 | SOT-23-5 / 6 | Repose sans pont |
| FR-20 | S24 | **Épreuve du fil rouge** | Grille [évaluation](04-evaluation.md#épreuve-du-fil-rouge-s24) |

## Équipement nécessaire

Les caractéristiques ci-dessous sont des **recommandations pédagogiques** à confirmer
selon le budget (voir [décisions](08-decisions-et-lacunes.md)). Aucune marque n'est imposée.

| Priorité | Équipement | Besoin pédagogique | Requis à partir de |
|---|---|---|---|
| Indispensable | Poste ESD (tapis relié à la terre, bracelet, testeur) | Protéger les cartes | S1 |
| Indispensable | Alimentation de labo réglable avec limitation de courant (au moins 0–30 V, quelques ampères) | TP et mise sous tension sur banc | S1 |
| Indispensable | Multimètre : celui de l'atelier (basique) suffit de S1 à S3 s'il porte une catégorie de mesure, une entrée courant protégée par fusible et une notice ; un multimètre TRMS avec spécifications de précision publiées est recommandé avant S4 (voir D-05) | Toutes les mesures | S1 |
| Indispensable | Kits de composants, plaques d'essai, cartes d'entraînement à la soudure | TP | S2 |
| Indispensable | Fer à souder régulé avec pannes fines, flux, tresse, alliage ; second fer ou pince chauffante ; alliage à bas point de fusion | Fil rouge | S4 |
| Indispensable | Extracteur de fumées de soudure | Sécurité | S4 |
| Indispensable | Générateur de fonctions (ou générateur intégré à l'oscilloscope) | Signaux de test | S6 |
| Indispensable | Oscilloscope numérique 4 voies conseillé, sondes ×10, fonctions math et FFT | Mesures de signaux | S6 |
| Indispensable | Microscope stéréo ou numérique avec éclairage | Inspection, microsoudure | S7 |
| Indispensable | Calculateurs de récupération, selon la [liste d'achats](#liste-dachats-des-calculateurs-dexercice) | TP réels | S7 |
| Indispensable | Pince de courant pour oscilloscope | Courants d'actionneurs | S11 |
| Indispensable | Préchauffeur de carte | Cuivre épais, DPAK | S15 |
| Indispensable | Testeur ESR / LCR | Condensateurs vieillis | S16 |
| Indispensable | Sonde différentielle (ou oscilloscope à voies isolées) | Tensions internes élevées, mesures flottantes | S18 |
| Indispensable | Station à air chaud | Microsoudure intensive | S26 |
| Important | Analyseur logique USB | Bus numériques | S19 |
| Important | Interface CAN / LIN USB pour PC | Réseaux | S23 |
| Important | Cartes de développement microcontrôleur (2 au moins) + transceivers CAN et LIN | Bancs | S20 |
| Important | Programmateur de mémoires série compatible 3,3 V et 5 V | Mémoires | S21 |
| Important | Caméra thermique ou module thermique pour smartphone | Localisation de court-circuit | S18 |
| Utile | Milliohmmètre (ou méthode 4 fils) | Localisation de court-circuit | S18 |
| Indispensable (M8) | Banc de test PB-1 à PB-3 | Diagnostic | S29 |
| Indispensable (M9) | Simulateurs d'allumeurs d'airbag, en nombre suffisant pour remplacer tous les modules pyrotechniques d'un véhicule d'atelier | Airbag sur banc et sur véhicule sans pyrotechnie | S35 |
| Indispensable (M9) | Charges de substitution de puissance réduites (électrovannes, moteurs) + fusibles | ABS / ESP, direction | S37 |
| Indispensable (M9) | Alimentation de puissance ou batterie avec chargeur de maintien, si les charges réduites ne suffisent pas | ABS / ESP, direction | S37 |
| Indispensable (M9) | Véhicules d'atelier compatibles + outil de diagnostic constructeur + pont ou chandelles | Validation véhicule | S10 (VA), S37 |

## Liste d'achats des calculateurs d'exercice

Décision d'Arthur (13/11/2026) : l'état des calculateurs déjà en stock n'a pas d'importance,
les calculateurs d'exercice sont achetés. Pour chaque famille : **un exemplaire de référence**
(fonctionnel, sert de comparaison au TP-44 et de support aux relevés) et **un exemplaire en panne**
(panne réelle, ou panne provoquée et scellée par un tiers sur un exemplaire sain).
Le stock actuel (BMW CAS3, airbag VW T-Cross, Bosch EDC17C60) peut servir de premier exemplaire
dans sa famille.

| Famille | Exemplaires | Première semaine d'usage | Condition d'achat |
|---|---|---|---|
| Calculateurs « tout venant » (toutes familles, état indifférent) | 3 à 5 | S7 (TP-10), puis S13, S17, S20, S27, S28 | Les moins chers ; servent à l'inventaire, aux relevés et à la microsoudure destructive |
| ECU moteur | 2 identiques (référence + panne) | S18 (TP-25), S30 (TP-44, TP-45) | Même référence matérielle que l'EDC17C60 en stock, ou une paire neuve ; compatible avec un véhicule d'atelier pour TP-58 |
| TCU | 2 identiques | S31 (TP-46) | Préférer un TCU séparé de la boîte (plus simple à manipuler qu'une mécatronique) [HYPOTHÈSE pédagogique] |
| BCM / BSI | 2 identiques | S32 (TP-47) | Compatible avec un véhicule d'atelier si possible |
| FRM ou module d'éclairage équivalent | 1 à 2 | S32 (TP-47) | Optionnel si le BCM / BSI couvre le TP |
| CAS (ou module d'accès équivalent) | 2 identiques | S32 (TP-48) | Le CAS3 en stock compte pour un ; provenance légitime documentée |
| Airbag | 2 identiques | S35 (TP-52), S36 (TP-53) | Le calculateur T-Cross en stock compte pour un ; **compatible avec un véhicule d'atelier** pour TP-59 ; aucun module pyrotechnique acheté |
| ABS / ESP (partie électronique) | 2 identiques | S37 (TP-54) | Compatible avec un véhicule d'atelier ; vérifier si la partie électronique se sépare du bloc hydraulique [À VÉRIFIER par référence] |
| Direction assistée électrique | 2 identiques | S38 (TP-56) | Compatible avec un véhicule d'atelier ; calculateur séparable de la crémaillère ou colonne si possible [À VÉRIFIER par référence] |

Échéances : les « tout venant » avant S7 ; ECU moteur avant S18 ; TCU, BCM / BSI, FRM, CAS avant S29 ;
airbag, ABS / ESP et direction avant S35.

## Sécurité chimique et thermique (à détailler dans le cours S1)

- Fumées de flux : aspiration à la source obligatoire.
- Alliages contenant du plomb : lavage des mains, pas de nourriture au poste. [À VÉRIFIER : obligations réglementaires de l'atelier]
- Alcool isopropylique, décapants de vernis, bombe de froid : lire la fiche de données de sécurité (FDS) de chaque produit avant usage.
- Air chaud : supports adaptés, jamais d'air chaud près de condensateurs électrolytiques ou de connecteurs sans protection.
