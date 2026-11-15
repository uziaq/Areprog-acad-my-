---
id: S32-L01
titre: Architecture d'un BCM, d'une BSI et d'un module d'éclairage
chapitre: S32
version: "0.1"
statut: brouillon
duree_min: 120
objectifs:
  - id: O1
    texte: Décrire l'architecture générique d'un BCM ou d'une BSI (commutateurs high-side avec diagnostic de charge, passerelle entre réseaux, gestion de la veille) et d'un module d'éclairage
    competences: [D10.3]
  - id: O2
    texte: Interpréter le diagnostic de charge d'un commutateur high-side (charge ouverte voie passante et voie bloquée, court-circuit, courant d'appel d'une lampe) et le vérifier par la mesure
    competences: [D10.3]
prerequis: [S29-L02, S23, S24, S31]
exercices: [S32-L01-EX01, S32-L01-EX02, S32-L01-EX03]
references: [SRC-0092, SRC-0084, SRC-0065, SRC-0068, SRC-0045, SRC-0035]
criteres_evaluation:
  - objectif: O1
    critere: Exercice S32-L01-EX01 réussi et blocs repérés sur la carte au TP-47
  - objectif: O2
    critere: Exercices S32-L01-EX02 et S32-L01-EX03 réussis et diagnostic de charge relevé au TP-47
figures:
  - id: S32-F01
    fichier: ../figures/S32-F01-bcm-blocs.svg
    legende: "Blocs génériques d'un BCM ou d'une BSI : alimentation et circuit d'alimentation du système avec veille et réveil, microcontrôleur, entrées de commandes, commutateurs high-side multivoies avec diagnostic vers les lampes et moteurs, passerelle entre un ou plusieurs bus CAN et des bus LIN. Schéma de principe de l'académie d'après les fiches citées ; pas le schéma d'un calculateur commercial et sans brochage."
    alt: "Au centre, un microcontrôleur. En haut, un bloc alimentation et veille relié à la batterie. À gauche, les entrées de commandes. À droite, deux commutateurs high-side à quatre voies reliés à des lampes. En bas, trois blocs de communication : CAN 1, CAN 2 et LIN."
    origine: areprog
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction
---

## Théorie

### Le rôle d'un module de carrosserie

Un BCM (module de commande de carrosserie) ou une BSI (boîtier de servitude intelligent) commande les
fonctions de confort et d'éclairage, lit les commandes du conducteur et relie souvent plusieurs
réseaux du véhicule [HYPOTHÈSE : rôle générique, à confirmer par la documentation du véhicule étudié].
Un module d'éclairage de type FRM regroupe surtout des sorties de lampes et de LED. Éclairage et
verrouillage touchent la sécurité des personnes et des biens : la validation se fait selon S33.

### Les commutateurs high-side multivoies

Les sorties de lampes, de moteurs et de relais passent par des commutateurs high-side intelligents.
Le circuit cité en compte quatre voies ; il signale ses défauts par une sortie numérique (version A)
ou par une recopie du courant de charge (version B) [SOURCÉ : SRC-0092 §7.1 Overview]. Il convient aux
lampes de faible puissance, LED, relais, électrovannes et éléments chauffants [SOURCÉ : SRC-0092 §7.1 Overview].

Une lampe à incandescence froide a une résistance plus faible que chaude : son courant d'appel
dépasse son courant établi [SOURCÉ : SRC-0035 §Temperature coefficient of resistance]. Le circuit cité
limite ce courant d'appel par une limite de courant réglable par une résistance extérieure [SOURCÉ : SRC-0092 §7.1 Overview].

### Le diagnostic de charge

- **Voie passante, charge ouverte** : la recopie de courant donne une tension très faible, que le microcontrôleur doit aller lire ; ce défaut n'est pas signalé par la broche de défaut [SOURCÉ : SRC-0092 §7.3.6.2 Open-Load Detection].
- **Voie bloquée** : avec une charge, la sortie est tirée vers la masse ; sans charge, elle reste proche de l'alimentation et le défaut est signalé ; une résistance de tirage de 20 kΩ est recommandée pour compenser les fuites [SOURCÉ : SRC-0092 §7.3.6.2 Open-Load Detection].
- **Court-circuit à la masse ou surcharge** : la limite de courant est atteinte et le défaut est signalé [SOURCÉ : SRC-0092 §7.3.6.1 Short-to-GND and Overload Detection].

Les fuites dues à l'humidité ou à la corrosion faussent la détection de charge ouverte voie bloquée [SOURCÉ : SRC-0092 §7.3.6.2 Open-Load Detection] :
un défaut de charge ouverte peut donc venir de la carte, du faisceau ou de la charge.
Une LED consomme beaucoup moins qu'une lampe : remplacer une lampe par une LED peut faire signaler une
charge ouverte voie passante [HYPOTHÈSE : à confirmer selon le seuil du calculateur étudié].

### La passerelle et la veille

Un module de carrosserie relie souvent un ou plusieurs bus CAN [SOURCÉ : SRC-0065 §5 The CAN Bus] et des
bus LIN vers les modules esclaves [SOURCÉ : SRC-0068 §2.3 Commander-Responder Principle]
[HYPOTHÈSE : nombre et type de bus à relever sur la carte étudiée]. Il reste alimenté en permanence par
la borne 30 : sa consommation au repos et ses sources de réveil sont l'objet de la leçon S32-L02.
Un circuit d'alimentation du système réunit souvent régulateurs, émetteurs-récepteurs et chien de garde [SOURCÉ : SRC-0045 §Introduction].

::figure{id=S32-F01}

### Exemple 1 : une voie signalée en charge ouverte

L'outil signale une charge ouverte sur une sortie de feu, avec la lampe montée [EXEMPLE].

1. Hypothèses : lampe coupée, faisceau ou connecteur coupé, sortie du module en défaut [HYPOTHÈSE].
2. Sur banc, avec une lampe de la puissance prévue : la sortie commandée la fait-elle s'allumer, et la référence signale-t-elle le même défaut ?
3. Si la lampe s'allume et le défaut disparaît sur banc, la carte n'est pas en cause [HYPOTHÈSE].

### Exemple 2 : lire la recopie de courant

Une lampe consomme 1,5 A ; la fiche du commutateur donne un rapport de recopie de 500 ; la résistance de recopie vaut 1 kΩ [EXEMPLE].

1. Courant de recopie : 1,5 / 500 = 3 mA [EXEMPLE].
2. Tension : 3 mA × 1 kΩ = 3 V [EXEMPLE].
3. Le rapport réel se lit dans la fiche du circuit monté (S29-L02) [SOURCÉ : SRC-0084 §6.5 Electrical Characteristics].

### Exemple 3 : une sortie bloquée qui « flotte »

Voie bloquée, charge débranchée : la sortie est à une tension proche de l'alimentation et le défaut est signalé [EXEMPLE].

1. C'est le comportement prévu par la fiche sans charge [SOURCÉ : SRC-0092 §7.3.6.2 Open-Load Detection].
2. Charge rebranchée : la sortie doit revenir vers la masse.
3. Sinon, contrôler la continuité de la charge et du câblage du banc avant d'accuser la carte.

## Exercices

::exercice{id=S32-L01-EX01}

::exercice{id=S32-L01-EX02}

::exercice{id=S32-L01-EX03}
