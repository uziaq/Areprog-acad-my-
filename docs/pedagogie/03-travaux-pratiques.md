# 3. Travaux pratiques, sécurité et équipement

## Principes communs à tous les TP

1. **Basse tension protégée d'abord.** Jusqu'à S16, tous les TP sont alimentés par une alimentation de laboratoire limitée en courant, avec des tensions de circuit ≤ 15 V. Le secteur n'est jamais ouvert ni mesuré.
2. **Cartes d'entraînement avant cartes réelles.** Toute opération destructive est d'abord réalisée sur une carte d'entraînement, puis sur un calculateur de récupération (hors service, sans valeur client).
3. **Jamais de calculateur client pendant le cursus.** Une carte client ne sert de support qu'après validation du domaine concerné, et en dehors du cursus.
4. **Calculateurs liés à la sécurité** (freinage / ABS / ESP, direction assistée, airbag et prétensionneurs, gestion moteur avec commande de papillon) : voir règle dédiée ci-dessous.
5. **Mesures attendues.** Chaque TP fournit une valeur théorique calculée et une **tolérance justifiée** : tolérance des composants (marquage / datasheet) + incertitude de l'instrument (notice). Une tolérance sans justification est interdite.
6. **Livrable systématique** : page de journal d'atelier avec schéma, photos, tableau de mesures, écart théorie / mesure expliqué.

## Règle « calculateurs de sécurité »

Décision d'Arthur (13/11/2026) : les calculateurs d'airbag, d'ABS / ESP et de direction
assistée sont **diagnostiqués et réparés** dans le cursus, pas seulement observés. Ils
sont traités dans le module M9 (S31–S34), après validation de tout le reste, avec le protocole renforcé ci-dessous.

| Famille | Quand | Cadre |
|---|---|---|
| ECU moteur, TCU | S29–S30 | Diagnostic et réparation sur récupération. La validation doit lister ce qui n'a pas pu être testé. |
| BCM / BSI / FRM / CAS | S30 | Diagnostic et réparation sur récupération. Éclairage, verrouillage et antidémarrage touchent la sécurité des personnes et des biens. |
| Airbag | S31, S34 | Diagnostic et réparation sur récupération, protocole renforcé, **jamais de pyrotechnie à l'atelier**. |
| ABS / ESP | S32, S34 | Diagnostic et réparation sur récupération, protocole renforcé, validation finale sur véhicule d'atelier. |
| Direction assistée | S33, S34 | Diagnostic et réparation sur récupération, protocole renforcé, validation finale sur véhicule d'atelier. |

## Protocole renforcé pour les calculateurs de sécurité

Ce protocole est une proposition pédagogique. Toute valeur (résistance de substitution,
temps de décharge, tension de réserve) doit venir d'une source identifiée, sinon elle
reste [À VÉRIFIER] et la mesure prime.

**Avant l'intervention**

1. Le calculateur arrive **seul** : aucun module d'airbag, prétensionneur ou autre élément pyrotechnique n'entre dans l'atelier de formation. [À VÉRIFIER : réglementation applicable au stockage et à la manipulation des pyrotechnies automobiles]
2. Identifier sur la carte la réserve d'énergie (condensateurs de réserve) et les étages de commande des allumeurs, à partir de la carte elle-même et de datasheets publiques, et marquer le relevé [À VÉRIFIER].
3. Vérifier **par la mesure** que la réserve d'énergie est déchargée avant toute manipulation ou soudure. Ne jamais supposer qu'un temps d'attente suffit.
4. Sauvegarder la mémoire (EEPROM / Flash) deux fois, empreintes identiques, avant toute intervention. Noter l'état de la mémoire d'événements sans la modifier dans le cadre du cursus.

**Sur banc**

5. Alimentation de labo limitée en courant, mise sous tension progressive (méthode S18).
6. Sorties d'allumeurs reliées **uniquement** à des charges de substitution résistives (simulateurs d'allumeurs du commerce ou résistances), dont la valeur provient de la documentation de l'outil ou du constructeur. [À VÉRIFIER : valeur par calculateur]
7. ABS / ESP et direction : charges de substitution pour électrovannes et moteurs dimensionnées d'après les mesures sur l'organe réel ; protection contre les courants élevés (fusible, limitation).

**Validation et traçabilité**

8. Dossier de validation renforcée : ce qui est validé sur banc, ce qui doit l'être sur véhicule avec l'outil de diagnostic (lecture des défauts, codages, apprentissages, essais dynamiques prévus par le constructeur), ce qui ne peut pas l'être en atelier.
9. Essais sur véhicule : uniquement sur les véhicules d'atelier d'AREPROG, jamais sur un véhicule client pendant le cursus ; procédures airbag du constructeur pour la dépose et la repose ; essais dynamiques sur voie privée selon la procédure constructeur. [À VÉRIFIER : cadre réglementaire et assurance des essais]
10. Remise en circulation d'un calculateur de sécurité : régie par la [décision D-14](08-decisions-et-lacunes.md), jamais pendant le cursus sans protocole écrit.

## Catalogue des TP

Durée indicative : 1 à 3 h. « CE » = carte d'entraînement ou plaque d'essai ; « CR » = calculateur de récupération.

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
| TP-15 | S10 | Montages AOP | CE | Gain mesuré vs calculé |
| TP-16 | S10 | Comparateur à hystérésis | CE | Seuils haut / bas mesurés |
| TP-17 | S11 | Compensation de sonde, longue masse | Oscilloscope | Captures avant / après, explication |
| TP-18 | S11 | Événement unique | CE (bouton, relais) | Capture du rebond d'un contact |
| TP-19 | S12 | Découpage d'un schéma public | Schéma d'une carte d'évaluation | Schéma annoté par blocs |
| TP-20 | S13 | Relevé d'un bloc d'entrée | CR | Schéma KiCad marqué [À VÉRIFIER] |
| TP-21 | S15 | Régulateur linéaire sous charge | CE | Dissipation calculée vs température mesurée |
| TP-22 | S16 | Module buck | Module du commerce | Rendement, ondulation de sortie |
| TP-23 | S17 | Chaîne d'alimentation d'un calculateur | CR | Schéma de la chaîne d'entrée relevé |
| TP-24 | S18 | Court-circuit simulé | CE préparée | Localisation et méthode documentée |
| TP-25 | S18 | Mise sous tension sur banc | CR | Courant de repos et rails mesurés, procédure |
| TP-26 | S19 | Portes logiques et seuils | CE | Seuils de basculement mesurés |
| TP-27 | S19 | Analyseur logique sur I²C | Carte d'évaluation | Trame décodée |
| TP-28 | S20 | Reset et watchdog | Carte de développement | Captures reset / watchdog |
| TP-29 | S20 | Conditions de vie du MCU | CR | Alimentations, horloge, reset relevés |
| TP-30 | S21 | EEPROM sur carte d'entraînement | CE + programmateur | Lecture, écriture, vérification par empreinte |
| TP-31 | S21 | Dépose / lecture / repose EEPROM | CR | Deux sauvegardes identiques, repose contrôlée |
| TP-32 | S22 | Programmation par interface de débogage | Carte de développement | Programmation réussie + analyse d'échec |
| TP-33 | S23 | Banc CAN à deux nœuds | Cartes de développement | Résistance bus, captures différentielles |
| TP-34 | S23 | Mesures CAN sur calculateur | CR sur banc | Captures CAN-H / CAN-L |
| TP-35 | S24 | Banc LIN | Carte de développement + transceiver | Trame LIN capturée |
| TP-36 | S25 | Pannes de bus provoquées | Banc CAN S23 | Diagnostic de 4 pannes |
| TP-37 | S26 | 20 passifs 0603 / 0402 | CE | Taux de conformité au microscope |
| TP-38 | S27 | Dépose / repose QFP | CE | Contrôle broches, continuité, absence de pont |
| TP-39 | S27 | Dépose d'un CI sur carte réelle | CR | Composants voisins intacts |
| TP-40 | S28 | Réparation de pistes et pastilles | CE | Continuité, tenue mécanique |
| TP-41 | S28 | Zone corrodée | CR | Avant / après, mesures d'isolement |
| TP-42 | S29 | Banc de test et simulateur de charges | Matériel atelier | Banc documenté et sécurisé |
| TP-43 | S29 | Diagnostic complet ECU moteur | CR | Dossier de réparation |
| TP-44 | S30 | Diagnostic TCU ou BCM / BSI / FRM / CAS | CR | Dossier de réparation |
| TP-45 | S30 | Consommation au repos et réveil | CR | Courbe de consommation, analyse |
| TP-46 | S30 | Validation et dossier | CR réparé | Dossier complet avec limites de validation |
| TP-47 | S31 | Airbag sur banc avec simulateurs d'allumeurs | CR airbag (sans pyrotechnie) | Décharge de la réserve mesurée, sauvegardes, diagnostic |
| TP-48 | S32 | ABS / ESP sur banc | CR | Étages d'électrovannes et de pompe diagnostiqués, charges de substitution documentées |
| TP-49 | S34 | Dossier de validation renforcée | CR réparé en M9 | Banc / véhicule / non validable clairement séparés |
| TP-50 | S32 | Capteurs de roue sur véhicule | Véhicule d'atelier | Captures oscilloscope des signaux de roue |
| TP-51 | S33 | Étage de puissance de direction sur banc | CR direction | Pont de puissance diagnostiqué |
| TP-52 | S33 | Capteur de couple sur véhicule | Véhicule d'atelier | Signaux relevés en statique, braquage lent |
| TP-53 | S34 | Validation véhicule d'un calculateur réparé | Véhicule d'atelier + CR réparé | Défauts, valeurs réelles, codages, apprentissages, essais constructeur documentés |

## Fil rouge microsoudure (S4 à S25, 1 h par semaine)

| FR | Semaine | Exercice | Critère de réussite |
|---|---|---|---|
| FR-01 | S4 | Étamage, fils, traversants | Joints brillants et concaves, sans pont |
| FR-02 | S5 | Traversants sur carte d'entraînement | 10/10 conformes au microscope |
| FR-03 | S6 | CMS 1206 | 10/10 conformes |
| FR-04 | S7 | CMS 0805 | 10/10 conformes |
| FR-05 | S8 | SOD / MELF | Orientation et ménisques corrects |
| FR-06 | S9 | SOT-23 | 3 broches sans pont |
| FR-07 | S10 | SOIC-8 | Repose sans pont, continuité vérifiée |
| FR-08 | S11 | Retouche et contrôle | Identification des défauts sur photos |
| FR-09 | S12 | SOIC-14/16 | Repose conforme |
| FR-10 | S13 | Prévention des pastilles soulevées | Dépose de 10 composants sans dommage |
| FR-11 | S15 | Dépose DPAK au fer | Pastille intacte |
| FR-12 | S16 | Inductances, électrolytiques CMS | Polarité et tenue |
| FR-13 | S17 | Composants sous vernis | Retrait local propre |
| FR-14 | S18 | Remplacement d'un découplage | Valeur et orientation vérifiées |
| FR-15 | S19 | TSSOP | Repose sans pont |
| FR-16 | S20 | Quartz / oscillateurs CMS | Repose et fonctionnement |
| FR-17 | S21 | Repose SOIC-8 au fer | Continuité de chaque broche |
| FR-18 | S22 | Straps en fil émaillé | Strap fixé, isolé, continuité |
| FR-19 | S23 | SOT-23-5 / 6 | Repose sans pont |
| FR-20 | S24 | QFN au fer (approche) | Contrôle des côtés visibles |
| FR-21/22 | S25 | Épreuve fil rouge | Grille [évaluation](04-evaluation.md#épreuve-du-fil-rouge-s25) |

## Équipement nécessaire

Les caractéristiques ci-dessous sont des **recommandations pédagogiques** à confirmer
selon le budget (voir [décisions](08-decisions-et-lacunes.md)). Aucune marque n'est imposée.

| Priorité | Équipement | Besoin pédagogique | Requis à partir de |
|---|---|---|---|
| Indispensable | Poste ESD (tapis relié à la terre, bracelet, testeur) | Protéger les cartes | S1 |
| Indispensable | Alimentation de labo réglable avec limitation de courant (au moins 0–30 V, quelques ampères) | TP et mise sous tension sur banc | S1 |
| Indispensable | Multimètre TRMS, catégorie de mesure adaptée, notice avec spécifications de précision | Toutes les mesures | S1 |
| Indispensable | Fer à souder régulé avec pannes fines, flux, tresse, alliage | Fil rouge | S4 |
| Indispensable | Extracteur de fumées de soudure | Sécurité | S4 |
| Indispensable | Générateur de fonctions (ou générateur intégré à l'oscilloscope) | Signaux de test | S6 |
| Indispensable | Oscilloscope numérique 2 voies minimum (4 conseillées pour l'automobile), sondes ×10 | Mesures de signaux | S6 |
| Indispensable | Microscope stéréo ou numérique avec éclairage | Inspection, microsoudure | S7 |
| Indispensable | Kits de composants, plaques d'essai, cartes d'entraînement à la soudure | TP | S2 |
| Indispensable | Calculateurs de récupération variés (ECU, TCU, BCM / BSI, FRM) | TP réels | S7 |
| Indispensable | Station à air chaud + préchauffeur | Microsoudure intensive | S26 |
| Important | Analyseur logique USB | Bus numériques | S19 |
| Important | Interface CAN / LIN USB pour PC | Réseaux | S23 |
| Important | Cartes de développement microcontrôleur (2 au moins) + transceivers CAN et LIN | Bancs | S20 |
| Important | Programmateur de mémoires série compatible 3,3 V et 5 V | Mémoires | S21 |
| Important | Caméra thermique ou module thermique pour smartphone | Localisation de court-circuit | S18 |
| Utile | Milliohmmètre (ou méthode 4 fils) | Localisation de court-circuit | S18 |
| Utile | Sonde différentielle haute tension | Mesures flottantes | S29 |
| Utile | Banc / simulateur de charges construit en TP-42 | Diagnostic | S29 |
| Indispensable (M9) | Simulateurs d'allumeurs d'airbag (charges résistives de substitution) | Airbag sur banc sans pyrotechnie | S31 |
| Indispensable (M9) | Charges de substitution de puissance (électrovannes, moteurs) | ABS / ESP, direction | S32 |
| Indispensable (M9) | Véhicules d'atelier compatibles avec les calculateurs étudiés + outil de diagnostic constructeur | Validation véhicule | S32 |

## Sécurité chimique et thermique (à détailler dans le cours S1)

- Fumées de flux : aspiration à la source obligatoire.
- Alliages contenant du plomb : lavage des mains, pas de nourriture au poste. [À VÉRIFIER : obligations réglementaires de l'atelier]
- Alcool isopropylique et décapants de vernis : lire la fiche de données de sécurité (FDS) de chaque produit avant usage.
- Air chaud : supports adaptés, jamais d'air chaud près de condensateurs électrolytiques ou de connecteurs sans protection.
