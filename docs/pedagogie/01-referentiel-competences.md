# 1. Référentiel de compétences

## Échelle de niveaux

| Niveau | Intitulé | Critère observable |
|---|---|---|
| N1 | Connaître | Définit la notion, la reconnaît sur un schéma ou une carte, répond au QCM. |
| N2 | Appliquer avec guide | Réalise la tâche en suivant une procédure écrite, sans erreur de sécurité. |
| N3 | Autonome | Réalise la tâche sans procédure, justifie ses choix et ses mesures, documente. |
| N4 | Expert | Adapte la méthode à un cas inédit, forme quelqu'un d'autre, détecte les erreurs d'une procédure. |

Le niveau N4 n'est visé nulle part dans ce cursus : 256 h permettent d'atteindre une
autonomie solide (N3) sur les fondamentaux, pas une expertise. Voir
[lacunes](08-decisions-et-lacunes.md).

## Domaines et compétences

Colonne « Semaines » : où la compétence est enseignée (E) puis évaluée (V).
Colonne « Visé » : niveau attendu en fin de cursus.

### D1 — Sécurité, méthode et organisation de l'atelier

| Code | Compétence | Semaines | Visé |
|---|---|---|---|
| D1.1 | Appliquer les règles de protection ESD (poste, bracelet, stockage, manipulation) | E S1, V chaque TP | N3 |
| D1.2 | Choisir un instrument adapté à la catégorie de mesure (CAT selon IEC 61010) et à la grandeur | E S1, S4 | N3 |
| D1.3 | Travailler en sécurité avec une alimentation de laboratoire (limitation de courant, polarité) | E S1, V S4 | N3 |
| D1.4 | Appliquer les règles de sécurité soudure : fumées, brûlures, alliages, produits chimiques | E S1, S4 | N3 |
| D1.5 | Tenir un journal d'atelier et un dossier de réparation traçable | E S1, V chaque semaine | N3 |
| D1.6 | Appliquer une méthode de diagnostic structurée (symptôme → hypothèses → mesures → conclusion) | E S1, S18, S29 | N3 |

### D2 — Électricité fondamentale

| Code | Compétence | Semaines | Visé |
|---|---|---|---|
| D2.1 | Manipuler les grandeurs, unités, préfixes et ordres de grandeur | E S2 | N3 |
| D2.2 | Appliquer la loi d'Ohm et calculer une puissance dissipée | E S2 | N3 |
| D2.3 | Appliquer les lois de Kirchhoff, les diviseurs de tension et de courant | E S3 | N3 |
| D2.4 | Utiliser le théorème de Thévenin pour modéliser une source réelle | E S3 | N2 |
| D2.5 | Expliquer le comportement d'un condensateur et d'une inductance (charge, constante de temps) | E S5 | N3 |
| D2.6 | Caractériser un signal alternatif (période, fréquence, valeur crête, efficace, rapport cyclique) | E S6 | N3 |
| D2.7 | Expliquer l'impédance et le filtrage RC du premier ordre | E S6 | N2 |

### D3 — Instruments de mesure

| Code | Compétence | Semaines | Visé |
|---|---|---|---|
| D3.1 | Mesurer tension, courant, résistance, continuité et jonction au multimètre, en connaissant ses limites (précision, effet de charge) | E S4 | N3 |
| D3.2 | Régler et utiliser une alimentation de laboratoire comme instrument de diagnostic | E S1, S4, S18 | N3 |
| D3.3 | Utiliser un oscilloscope : base de temps, calibre, couplage, déclenchement, mesures automatiques | E S6, S11 | N3 |
| D3.4 | Choisir, compenser et raccorder une sonde d'oscilloscope ; connaître le danger de la masse de sonde | E S11 | N3 |
| D3.5 | Utiliser un microscope (stéréo ou numérique) pour inspecter et documenter une carte | E S7, S26 | N3 |
| D3.6 | Utiliser un analyseur logique et une interface CAN pour observer un bus | E S19, S23 | N2 |
| D3.7 | Estimer l'incertitude d'une mesure à partir de la documentation de l'instrument | E S4, V chaque TP | N2 |

### D4 — Composants

| Code | Compétence | Semaines | Visé |
|---|---|---|---|
| D4.1 | Identifier les composants passifs traversants et CMS, leurs boîtiers et marquages | E S7 | N3 |
| D4.2 | Tester un composant passif hors circuit et en circuit, en connaissant les pièges | E S7 | N3 |
| D4.3 | Expliquer et tester les diodes (redressement, Zener, TVS, Schottky, LED) | E S8 | N3 |
| D4.4 | Expliquer et tester les transistors bipolaires et MOSFET en commutation | E S9 | N3 |
| D4.5 | Expliquer le rôle d'un AOP, d'un comparateur et d'une référence de tension | E S10 | N2 |
| D4.6 | Trouver, lire et exploiter une datasheet (valeurs max absolues, conditions de test, brochage) | E S7, V chaque module | N3 |
| D4.7 | Identifier un composant de remplacement équivalent et justifier l'équivalence | E S28, S29 | N2 |

### D5 — Schémas et circuits imprimés

| Code | Compétence | Semaines | Visé |
|---|---|---|---|
| D5.1 | Lire un schéma électronique : symboles, références, réseaux, alimentations, masses | E S12 | N3 |
| D5.2 | Décomposer un schéma en blocs fonctionnels | E S12, S14 | N3 |
| D5.3 | Suivre les pistes d'un circuit imprimé multicouche (vias, plans, couches) | E S13 | N3 |
| D5.4 | Relever un schéma partiel sur une carte sans documentation, en le marquant [À VÉRIFIER] | E S13, S29 | N2 |

### D6 — Alimentations

| Code | Compétence | Semaines | Visé |
|---|---|---|---|
| D6.1 | Expliquer et diagnostiquer un régulateur linéaire / LDO | E S15 | N3 |
| D6.2 | Expliquer et diagnostiquer un convertisseur à découpage (buck, boost) | E S16 | N2 |
| D6.3 | Expliquer l'alimentation d'un calculateur : bornes 30/15/31, protections d'entrée, contraintes du réseau de bord | E S17 | N3 |
| D6.4 | Localiser un court-circuit ou une surconsommation sur une carte (limitation de courant, thermique, chute de tension) | E S18 | N3 |

### D7 — Électronique numérique, microcontrôleurs et mémoires

| Code | Compétence | Semaines | Visé |
|---|---|---|---|
| D7.1 | Expliquer les niveaux logiques, portes, pull-up / pull-down, sorties push-pull et collecteur ouvert | E S19 | N3 |
| D7.2 | Vérifier les conditions de fonctionnement d'un microcontrôleur : alimentations, horloge, reset, watchdog | E S20 | N3 |
| D7.3 | Expliquer les mémoires EEPROM et Flash, leurs bus (I²C, SPI, Microwire) et leurs risques de corruption | E S21 | N3 |
| D7.4 | Lire et écrire une mémoire série hors circuit et en circuit, avec sauvegarde et vérification | E S21 | N3 |
| D7.5 | Expliquer les principes des accès de débogage / programmation (JTAG, BDM, modes boot) et leurs risques matériels | E S22 | N2 |

### D8 — Réseaux de communication embarqués

| Code | Compétence | Semaines | Visé |
|---|---|---|---|
| D8.1 | Expliquer la couche physique CAN et mesurer un bus (résistance, signaux différentiels) | E S23 | N3 |
| D8.2 | Expliquer la couche physique LIN et K-Line et observer une trame | E S24 | N2 |
| D8.3 | Diagnostiquer un défaut physique de bus (court-circuit, coupure, transceiver défaillant) | E S25 | N3 |

### D9 — Microsoudure et réparation de carte

| Code | Compétence | Semaines | Visé |
|---|---|---|---|
| D9.1 | Souder et dessouder des composants traversants et CMS passifs au fer | E S4–S26 (fil rouge) | N3 |
| D9.2 | Déposer et reposer un circuit intégré à broches (SOIC, TSSOP, QFP) à l'air chaud | E S27 | N3 |
| D9.3 | Retirer et restaurer un vernis de tropicalisation localement | E S28 | N2 |
| D9.4 | Réparer une piste, une pastille ou un via | E S28 | N2 |
| D9.5 | Contrôler une soudure selon des critères écrits (inspiration IPC-A-610) | E S26–S28 | N3 |

### D10 — Diagnostic et réparation de calculateurs

| Code | Compétence | Semaines | Visé |
|---|---|---|---|
| D10.1 | Mettre un calculateur sous tension sur banc de façon sûre et observer son état | E S18, S29 | N3 |
| D10.2 | Analyser un étage de sortie (low-side, high-side, pont en H) et ses protections | E S29 | N2 |
| D10.3 | Conduire un diagnostic carte complet sur ECU / TCU / BCM / BSI / FRM de récupération | E S29–S31 | N2 |
| D10.4 | Valider une réparation (essais fonctionnels, mesures avant / après, durée d'essai) | E S31 | N3 |
| D10.5 | Rédiger un dossier de réparation traçable et réutilisable | E S1, S31, V S32 | N3 |
| D10.6 | Identifier les calculateurs liés à la sécurité et appliquer les règles de refus ou de validation renforcée | E S17, S29 | N3 |

## Synthèse

| Domaine | Nb de compétences | Heures approximatives |
|---|---|---|
| D1 Sécurité et méthode | 6 | transversal (≈ 12 h dédiées) |
| D2 Électricité | 7 | ≈ 40 h |
| D3 Instruments | 7 | ≈ 24 h dédiées + usage continu |
| D4 Composants | 7 | ≈ 40 h |
| D5 Schémas et PCB | 4 | ≈ 24 h |
| D6 Alimentations | 4 | ≈ 32 h |
| D7 Numérique et mémoires | 5 | ≈ 32 h |
| D8 Réseaux | 3 | ≈ 24 h |
| D9 Microsoudure | 5 | ≈ 46 h (22 h fil rouge + 24 h intensif) |
| D10 Diagnostic calculateurs | 6 | ≈ 32 h |

Les heures se recouvrent (un TP d'alimentation mobilise aussi les instruments) ; elles
servent à vérifier l'équilibre, pas à tenir une comptabilité.
