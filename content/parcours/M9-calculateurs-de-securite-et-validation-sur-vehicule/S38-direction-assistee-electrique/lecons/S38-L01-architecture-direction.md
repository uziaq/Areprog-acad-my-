---
id: S38-L01
titre: Architecture d'un calculateur de direction assistée électrique
chapitre: S38
version: "0.1"
statut: brouillon
duree_min: 100
objectifs:
  - id: O1
    texte: Décrire l'architecture générique d'un calculateur de direction assistée électrique (alimentation, microcontrôleur, commande de pont, pont de MOSFET, mesure de courant, capteurs de couple et de position)
    competences: [D10.7]
  - id: O2
    texte: Expliquer les surveillances d'une commande de pont (transistors d'une même phase jamais ensemble, surveillance VDS, tensions, température, chien de garde) et leur effet sur les sorties
    competences: [D10.6, D10.7]
  - id: O3
    texte: Expliquer ce qu'est un mode dégradé et pourquoi son comportement se lit dans la documentation du constructeur
    competences: [D10.6]
prerequis: [S37, S29, S09]
exercices: [S38-L01-EX01, S38-L01-EX02, S38-L01-EX03]
references: [SRC-0102, SRC-0099, SRC-0086]
criteres_evaluation:
  - objectif: O1
    critere: Exercice S38-L01-EX01 réussi et blocs de la figure S38-F01 repérés sur la carte au TP-56
  - objectif: O2
    critere: Exercice S38-L01-EX02 réussi
  - objectif: O3
    critere: Exercice S38-L01-EX03 réussi
figures:
  - id: S38-F01
    fichier: ../figures/S38-F01-architecture-direction.svg
    legende: "Architecture générique d'un calculateur de direction assistée électrique : alimentation protégée, circuit d'alimentation, microcontrôleur de sécurité, commande de pont avec surveillances, pont de six MOSFET, moteur d'assistance sans balais, shunts et amplificateurs de courant ; capteur de couple à deux voies et capteurs de position. D'après les documents cités ; schéma de principe, pas un schéma de calculateur."
    alt: "En haut, trois blocs en ligne : alimentation, circuit d'alimentation, microcontrôleur. Le capteur de couple et le capteur de position, à gauche en pointillés, arrivent au microcontrôleur. Sous le microcontrôleur, la commande de pont, puis à droite le pont de MOSFET qui alimente le moteur d'assistance en pointillés. Le moteur renvoie vers les shunts et amplificateurs, qui remontent vers la commande de pont."
    origine: areprog
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction
---

## Théorie

### Ce que fait un calculateur de direction

Un calculateur de direction assistée électrique (EPS, *electric power steering*) mesure l'effort du
conducteur sur le volant et commande un moteur électrique qui ajoute un couple d'assistance. Un tel
calculateur comprend un microcontrôleur, des capteurs, un circuit de gestion d'alimentation, une
commande de moteur et des transistors à effet de champ (FET) [SOURCÉ : SRC-0099 §Functional safety beyond microcontrollers].
La commande de moteur pilote et séquence les transistors de puissance qui alimentent le moteur [SOURCÉ : SRC-0099 §Functional safety beyond microcontrollers].
Une panne de la direction touche directement la conduite : c'est pourquoi la semaine est sous
protocole renforcé, comme l'airbag et le freinage.

::figure{id=S38-F01}

### Un moteur sans balais et un pont triphasé

Le circuit de commande cité est prévu pour les moteurs triphasés sans balais, notamment en direction
assistée électrique [SOURCÉ : SRC-0102 §2 Applications].
Il pilote six MOSFET à canal N séparés, trois côté haut et trois côté bas, commandés en modulation de largeur d'impulsion (PWM) [SOURCÉ : SRC-0102 §7.1 Overview].
Sa fréquence de PWM va jusqu'à 20 kHz [SOURCÉ : SRC-0102 §1 Features].
Un survolteur intégré fournit la tension de grille des transistors côté haut et garde la commande des étages jusqu'à une batterie de 4,75 V [SOURCÉ : SRC-0102 §8.1 Application Information].
Trois amplificateurs mesurent le courant dans des résistances de shunt [SOURCÉ : SRC-0102 §1 Features].
C'est le même principe que le pont en H de S29, avec une branche de plus [SOURCÉ : SRC-0086 §7.3.1.1 Control Modes].

### Les surveillances et leur effet

- La logique d'entrée du circuit cité empêche d'allumer en même temps les transistors côté haut et côté bas d'une même phase [SOURCÉ : SRC-0102 §7.1 Overview] ; un temps mort programmable s'y ajoute [SOURCÉ : SRC-0102 §1 Features].
- La tension drain-source de chaque transistor est surveillée : une tension trop forte à l'état passant signale un court-circuit [SOURCÉ : SRC-0102 §1 Features].
- Une limite de courant mesurée sur les shunts, des seuils de sous-tension et de surtension, un avertissement puis un arrêt en surchauffe complètent la protection [SOURCÉ : SRC-0102 §1 Features].
- Un chien de garde à questions-réponses et la surveillance des tensions d'entrée-sortie et de référence du convertisseur vérifient que le microcontrôleur fonctionne [SOURCÉ : SRC-0102 §3 Description].
- Une entrée de coupure secondaire désactive la commande de pont indépendamment du reste [SOURCÉ : SRC-0102 §5 Pin Configuration and Functions].

Conséquence pour le diagnostic : un pont qui ne commande plus peut venir d'un défaut détecté (court-circuit, tension, température, chien de garde) et non d'un transistor mort [HYPOTHÈSE : à départager par la lecture des défauts et les mesures].
Comme en S37, une surveillance se diagnostique ; elle ne se shunte jamais.

### Les modes dégradés

Quand le calculateur détecte un défaut, il peut réduire ou couper l'assistance et allumer un voyant ;
la direction reste manœuvrable mais devient beaucoup plus dure [HYPOTHÈSE : comportement réel selon le constructeur et le défaut].
Le niveau d'assistance gardé, les défauts qui le déclenchent et leur effacement éventuel sont propres
à chaque constructeur [À VÉRIFIER : documentation du constructeur du calculateur étudié].
Un mode dégradé est donc une **information** : il dit qu'une surveillance a réagi ; il ne se « répare » pas en effaçant le défaut.

### Exemple 1 : compter les transistors

Le moteur a trois phases [EXEMPLE].

1. Chaque phase a un transistor côté haut et un côté bas : 3 × 2 = 6 transistors [SOURCÉ : SRC-0102 §7.1 Overview].
2. Les deux transistors d'une même phase ne conduisent jamais ensemble [SOURCÉ : SRC-0102 §7.1 Overview].
3. Sur la carte, on cherche donc six boîtiers de puissance groupés par deux [HYPOTHÈSE : montage réel à relever sur la carte étudiée].

### Exemple 2 : une assistance coupée

Sur un véhicule d'atelier, l'assistance disparaît et un voyant s'allume [EXEMPLE].

1. Lire les défauts avec l'outil de diagnostic, sans effacer.
2. Hypothèses : alimentation du calculateur, capteur de couple, défaut de pont détecté [HYPOTHÈSE].
3. Contrôler d'abord alimentation et masses, puis les signaux du capteur de couple (S38-L03), avant de mettre en cause le pont.

### Exemple 3 : la tension minimale de commande

La batterie tombe à 6 V pendant un démarrage [EXEMPLE].

1. Le circuit cité garde la commande des étages jusqu'à 4,75 V [SOURCÉ : SRC-0102 §8.1 Application Information].
2. 6 V est au-dessus de ce seuil : la commande de pont peut rester active [EXEMPLE].
3. Le comportement réel dépend aussi des seuils de sous-tension choisis par le constructeur [À VÉRIFIER : seuils du calculateur étudié].

## Exercices

::exercice{id=S38-L01-EX01}

::exercice{id=S38-L01-EX02}

::exercice{id=S38-L01-EX03}
