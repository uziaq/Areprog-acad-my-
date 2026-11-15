---
id: S37-L01
titre: Architecture d'un calculateur ABS / ESP
chapitre: S37
version: "0.1"
statut: brouillon
duree_min: 100
objectifs:
  - id: O1
    texte: Décrire l'architecture générique d'un calculateur ABS / ESP (commandes d'électrovannes, transistors de pompe et d'alimentation des électrovannes, interfaces de capteurs de roue, capteurs ESP)
    competences: [D10.7]
  - id: O2
    texte: Expliquer la séparation entre l'électronique et le bloc hydraulique et les précautions de dépose, en renvoyant à la documentation du constructeur
    competences: [D10.6]
  - id: O3
    texte: Situer les surveillances du calculateur (défauts des sorties, chien de garde, voyants) et leur effet sur les sorties
    competences: [D10.6, D10.7]
prerequis: [S36, S29]
exercices: [S37-L01-EX01, S37-L01-EX02, S37-L01-EX03]
references: [SRC-0100]
criteres_evaluation:
  - objectif: O1
    critere: Exercice S37-L01-EX02 réussi et blocs de la figure S37-F01 repérés sur la carte au TP-54
  - objectif: O2
    critere: Exercice S37-L01-EX03 réussi
  - objectif: O3
    critere: Exercice S37-L01-EX01 réussi
figures:
  - id: S37-F01
    fichier: ../figures/S37-F01-architecture-abs-esp.svg
    legende: "Architecture générique d'un calculateur ABS / ESP : alimentation, microcontrôleur, circuit de puissance et d'interface avec chien de garde, transistors côté haut pour la pompe et l'alimentation des électrovannes, huit commandes côté bas d'électrovannes, interfaces de quatre capteurs de roue ; capteurs ESP intégrés ou déportés selon le constructeur. D'après la fiche citée ; schéma de principe, pas un schéma de calculateur."
    alt: "En haut, quatre blocs en ligne : alimentation, microcontrôleur, circuit de puissance et d'interface, transistors côté haut. Sous le circuit, les électrovannes, reliées aux bobines du bloc hydraulique en pointillés. Les transistors côté haut alimentent un moteur de pompe en pointillés. Sous le microcontrôleur, les capteurs ESP en pointillés ; en bas à gauche, les capteurs de roue reliés au circuit d'interface par un courant modulé."
    origine: areprog
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction
---

## Théorie

### Ce que fait un calculateur ABS / ESP

Le calculateur d'antiblocage (ABS) lit la vitesse de chaque roue et commande des électrovannes qui
font baisser, maintenir ou remonter la pression de freinage d'une roue qui tend à se bloquer ; un
moteur de pompe renvoie le liquide [HYPOTHÈSE : description générique du principe, à confirmer dans la documentation du constructeur].
Le contrôle de stabilité (ESP) ajoute des capteurs d'embardée, d'accélération latérale et d'angle du
volant, intégrés au calculateur ou déportés selon le constructeur [À VÉRIFIER par constructeur : capteurs et emplacement].

Le calculateur et le bloc hydraulique forment souvent un ensemble ; la partie électronique se sépare
ou non selon la référence [À VÉRIFIER par référence : séparation de l'électronique et du bloc hydraulique].

::figure{id=S37-F01}

### Un circuit de puissance et d'interface dédié

Le circuit cité, conçu pour l'ABS et l'ESC, commande directement huit électrovannes par des transistors internes côté bas [SOURCÉ : SRC-0100 §5.1 Overview].
Il pilote deux transistors MOSFET externes côté haut, l'un pour le moteur de pompe, l'autre pour l'alimentation de toutes les électrovannes [SOURCÉ : SRC-0100 §5.3.8 High-Side Drivers].
Il fournit l'interface des capteurs de roue actifs et « intelligents » au microcontrôleur, par une liaison SPI [SOURCÉ : SRC-0100 §5.1 Overview].
Il contient aussi des commandes de voyants, une ligne K et un chien de garde [SOURCÉ : SRC-0100 §5.1 Overview].

Sur les huit commandes côté bas, quatre peuvent fonctionner en PWM [SOURCÉ : SRC-0100 §5.3.6 PWM Low-Side Drivers].
Une commande PWM a une résistance à l'état passant de 0,3 Ω au plus à 150 °C et une tension d'écrêtage de 40 V [SOURCÉ : SRC-0100 §1.1 Features].
Le transistor côté haut reçoit une tension de grille élevée grâce à une pompe de charge intégrée [SOURCÉ : SRC-0100 §5.3.8 High-Side Drivers].

### Les surveillances et leur effet

Chaque commande d'électrovanne est surveillée en surintensité, charge ouverte et surchauffe ; elle
dépend aussi de la tension batterie, de l'alimentation de la logique et du chien de garde [SOURCÉ : SRC-0100 §5.3.6 PWM Low-Side Drivers].
Le circuit tolère et signale les courts-circuits à la masse ou à la batterie et les charges ouvertes [SOURCÉ : SRC-0100 §5.1 Overview].
Un défaut de chien de garde coupe les transistors côté haut et côté bas, l'interface des capteurs de roue et les voyants haute tension, et active le voyant basse tension et le reset [SOURCÉ : SRC-0100 §5.3.12 Watchdog Operation].

Conséquence sur banc : un calculateur dont le microcontrôleur ne tourne pas peut garder toutes ses
sorties coupées et son voyant allumé, sans qu'aucun étage de puissance ne soit en panne [HYPOTHÈSE : à départager par les conditions de vie du microcontrôleur, S20].
Comme en S35, aucune surveillance n'est shuntée ou forcée.

### Dépose et précautions

Le cursus ne fait aucune intervention hydraulique à l'atelier de formation : le calculateur arrive
seul, ou séparé du bloc selon la procédure du constructeur. Sur véhicule, une intervention sur le
freinage impose la purge et le contrôle de pédale selon le constructeur, puis des essais de freinage
statiques, avant tout déplacement (catalogue des TP, sécurité véhicule).
Le liquide de frein se manipule avec gants et lunettes, selon la fiche de données de sécurité du produit.

### Exemple 1 : la dissipation d'une commande d'électrovanne

Une électrovanne consomme 2 A sur une commande PWM [EXEMPLE].

1. Résistance à l'état passant au plus de 0,3 Ω à chaud [SOURCÉ : SRC-0100 §1.1 Features].
2. P = R × I² = 0,3 × 2² = 1,2 W pendant la conduction [EXEMPLE].
3. Plusieurs électrovannes actives en même temps chauffent le même circuit : d'où sa surveillance en température [SOURCÉ : SRC-0100 §5.3.6 PWM Low-Side Drivers].

### Exemple 2 : toutes les sorties coupées

Sur banc, aucune électrovanne ne répond et le voyant reste allumé [EXEMPLE].

1. Hypothèses : défaut de chien de garde, alimentation de la logique trop basse, tension batterie hors plage [HYPOTHÈSE].
2. Ces trois conditions inhibent les commandes dans le circuit cité [SOURCÉ : SRC-0100 §5.3.6 PWM Low-Side Drivers].
3. On contrôle d'abord l'alimentation et les conditions de vie du microcontrôleur, avant les étages.

### Exemple 3 : compter les voies

Un calculateur ABS à quatre roues utilise deux électrovannes par roue [HYPOTHÈSE : architecture courante, à vérifier sur la référence].

1. Nombre d'électrovannes : 4 × 2 = 8 [EXEMPLE].
2. Le circuit cité en commande huit [SOURCÉ : SRC-0100 §5.1 Overview].
3. Un calculateur ESP peut en compter davantage, avec d'autres circuits [À VÉRIFIER par référence].

## Exercices

::exercice{id=S37-L01-EX01}

::exercice{id=S37-L01-EX02}

::exercice{id=S37-L01-EX03}
