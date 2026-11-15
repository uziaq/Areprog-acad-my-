---
id: S31-L01
titre: Architecture générique d'un calculateur de boîte de vitesses
chapitre: S31
version: "0.1"
statut: brouillon
duree_min: 90
objectifs:
  - id: O1
    texte: Décrire les blocs génériques d'un TCU (alimentation, microcontrôleur, capteurs de vitesse, de position, de pression et de température, électrovannes, communication) et les situer sur une carte de récupération
    competences: [D10.3]
  - id: O2
    texte: Expliquer et vérifier par la mesure les entrées propres au TCU, capteur de vitesse à deux voies en quadrature et thermistance CTN en pont diviseur
    competences: [D10.3]
prerequis: [S30, S29-L01]
exercices: [S31-L01-EX01, S31-L01-EX02, S31-L01-EX03]
references: [SRC-0090, SRC-0091, SRC-0082, SRC-0081, SRC-0027, SRC-0089, SRC-0067]
criteres_evaluation:
  - objectif: O1
    critere: Exercice S31-L01-EX01 réussi et blocs repérés sur la carte au TP-46
  - objectif: O2
    critere: Exercices S31-L01-EX02 et S31-L01-EX03 réussis et entrée de température relevée au TP-46
figures:
  - id: S31-F01
    fichier: ../figures/S31-F01-tcu-blocs.svg
    legende: "Blocs génériques d'un calculateur de boîte de vitesses : capteurs de vitesse, de position, de pression et de température en entrée, microcontrôleur, commandes d'électrovannes régulées en courant en sortie, émetteur-récepteur CAN. Schéma de principe de l'académie d'après les fiches citées ; pas le schéma d'un calculateur commercial et sans brochage."
    alt: "Au centre, un microcontrôleur. À gauche, quatre blocs d'entrée : vitesse, position du sélecteur, pression, température. À droite, deux blocs de commande d'électrovannes régulées en courant, avec un symbole de bobine. En haut, l'alimentation ; à droite en bas, l'émetteur-récepteur CAN."
    origine: areprog
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction
---

## Théorie

### Les blocs d'un TCU

Un calculateur de boîte de vitesses automatique choisit le rapport et pilote les embrayages ou freins
internes de la boîte par des électrovannes hydrauliques [HYPOTHÈSE : description générique, à confirmer
par la documentation de la boîte étudiée]. On y retrouve les blocs d'un ECU moteur (S30-L03), avec trois
différences : les sorties sont surtout des **électrovannes régulées en courant**, les entrées comptent
plusieurs **capteurs de vitesse** et de température d'huile, et la carte peut être montée **dans** la
boîte [HYPOTHÈSE : à confirmer sur le calculateur étudié].

- **Alimentation et microcontrôleur** : comme en S20 et S30.
- **Capteurs de vitesse** (entrée et sortie de boîte) : inductifs ou à effet Hall (S29-L01) [SOURCÉ : SRC-0081 §DESCRIPTION] [SOURCÉ : SRC-0082 §7.1 Overview].
- **Position du sélecteur** : souvent des capteurs à effet Hall [À VÉRIFIER : technologie du capteur de la boîte étudiée].
- **Pression** : capteurs ratiométriques [SOURCÉ : SRC-0027 §Sensors that Are Ratiometric to the Supply Voltage].
- **Température d'huile** : thermistance en pont diviseur [SOURCÉ : SRC-0091 §Design Description].
- **Électrovannes** : commandées par un circuit qui règle leur courant et diagnostique la charge [SOURCÉ : SRC-0089 §6.3.5 Current Control] (leçon S31-L02).
- **Communication** : CAN vers l'ECU moteur et le reste du véhicule [SOURCÉ : SRC-0067 §1 Features].

::figure{id=S31-F01}

Les circuits cités sont des exemples publics ; ceux de la carte étudiée se relèvent par leur marquage
[À VÉRIFIER : composants relevés sur le TCU de récupération acheté].

### Vitesse et sens : deux voies en quadrature

Un capteur à deux voies Hall placées en quadrature donne deux signaux carrés décalés : leur
**fréquence** donne la vitesse, leur **déphasage** donne le sens de rotation [SOURCÉ : SRC-0090 §7.3 Feature Description].
Une variante du circuit cité fournit directement une sortie vitesse et une sortie sens [SOURCÉ : SRC-0090 §3 Description].

Pour une cible de N dents ou paires de pôles, la vitesse de rotation vaut la fréquence divisée par N
[EXEMPLE : relation géométrique, N à relever sur la cible]. Sur banc, sans boîte, on simule ces
signaux avec un générateur, dans les niveaux prévus par la documentation [À VÉRIFIER : niveaux et
nombre de dents dans la documentation de la boîte].

### Température : la thermistance CTN

Une thermistance à coefficient de température négatif (CTN) voit sa résistance **baisser** quand la
température monte : à 25 °C, la CTN de l'exemple cité vaut 2,252 kΩ, et 819,7 Ω à 50 °C [SOURCÉ : SRC-0091 §Design Steps].
Placée en pont diviseur avec une résistance fixe, elle donne une tension qui varie avec la
température ; selon sa position dans le pont, la tension monte ou descend quand la température monte [SOURCÉ : SRC-0091 §Design Notes].

Pour le diagnostic : une entrée de température qui indique une valeur extrême fixe fait penser à une
CTN coupée ou en court-circuit, ou à une ligne coupée [HYPOTHÈSE : à départager par la mesure de la
résistance de la CTN hors tension]. Sur banc, une résistance fixe de valeur connue simule la CTN, et
la valeur réelle lue à l'outil doit suivre [HYPOTHÈSE : à constater sur l'exemplaire de référence].

### Exemple 1 : situer les blocs

Sur un TCU de récupération, on repère un circuit à 28 broches près de deux bobines de filtrage et du connecteur [EXEMPLE].

1. On lit son marquage et on cherche sa fiche avant toute conclusion.
2. Si la fiche indique une commande d'électrovannes régulée en courant, le bloc est situé ; sinon, il ne l'est pas.
3. Aucune fonction n'est attribuée « à l'œil » d'après la position du composant [HYPOTHÈSE : règle de la méthode S30-L01].

### Exemple 2 : une vitesse à partir d'une fréquence

Un capteur de vitesse donne 1 200 Hz devant une cible de 60 dents [EXEMPLE].

1. Fréquence de rotation : 1 200 / 60 = 20 tours par seconde [EXEMPLE].
2. Soit 1 200 tours par minute [EXEMPLE].
3. Le sens se lit au déphasage des deux voies [SOURCÉ : SRC-0090 §7.3 Feature Description].

### Exemple 3 : une température figée

L'outil affiche une température d'huile figée à une valeur extrême, moteur froid comme chaud [EXEMPLE].

1. Hypothèses : CTN coupée, CTN en court-circuit, ligne coupée, entrée du calculateur en défaut [HYPOTHÈSE].
2. Hors tension : résistance de la CTN à température ambiante, puis continuité de la ligne.
3. Sur banc : résistance fixe connue à la place de la CTN ; si la valeur lue suit, l'entrée du calculateur est saine [HYPOTHÈSE].

## Exercices

::exercice{id=S31-L01-EX01}

::exercice{id=S31-L01-EX02}

::exercice{id=S31-L01-EX03}
