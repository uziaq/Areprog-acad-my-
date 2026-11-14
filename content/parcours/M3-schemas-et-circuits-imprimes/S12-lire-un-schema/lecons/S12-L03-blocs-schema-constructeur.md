---
id: S12-L03
titre: Découper un schéma en blocs et lire un schéma électrique constructeur
chapitre: S12
version: "0.1"
statut: brouillon
duree_min: 90
objectifs:
  - id: O1
    texte: Découper un schéma de carte en blocs fonctionnels (alimentation, horloge, microcontrôleur, entrées, sorties, communication)
    competences: [D5.2]
  - id: O2
    texte: Relever le brochage d'un connecteur côté faisceau sur le schéma électrique officiel du constructeur d'un véhicule
    competences: [D5.1]
prerequis: [S12-L02]
exercices: [S12-L03-EX01, S12-L03-EX02]
references: [SRC-0030, SRC-0032]
criteres_evaluation:
  - objectif: O1
    critere: Exercice S12-L03-EX01 réussi et schéma public annoté par blocs au TP-19
  - objectif: O2
    critere: Exercice S12-L03-EX02 réussi et brochage d'un connecteur relevé sur document officiel au TP-19
figures:
  - id: S12-F03
    fichier: ../figures/S12-F03-blocs.svg
    legende: "Découpage type d'une carte à microcontrôleur : l'alimentation alimente tous les blocs ; l'horloge, les entrées, les sorties et la communication sont reliées au microcontrôleur, au centre. Les entrées sont à gauche, les sorties à droite."
    alt: "Six rectangles. Au centre, microcontrôleur. En haut, alimentation, avec des flèches vers tous les autres blocs. À gauche, entrées, flèche vers le microcontrôleur. À droite, sorties, flèche depuis le microcontrôleur. En bas, horloge et communication, reliées au microcontrôleur."
    origine: areprog
derniere_verification_sources: 2026-11-14
historique:
  - version: "0.1"
    date: 2026-11-14
    resume: Première rédaction
---

## Théorie

### Pourquoi découper en blocs

Un grand schéma se lit par **blocs fonctionnels** : entrée d'alimentation et régulation,
microcontrôleur, connecteurs… [SOURCÉ : SRC-0030 §Identify Blocks]. On reconnaît chaque bloc, puis
on suit le circuit de l'entrée vers la sortie ; un schéma bien dessiné se lit comme un livre,
entrées à gauche, sorties à droite [SOURCÉ : SRC-0030 §Identify Blocks]. En dépannage, le découpage
dit où chercher : un symptôme d'alimentation se cherche dans le bloc alimentation, pas dans la
communication.

### Les blocs d'une carte à microcontrôleur

Découpage utilisé dans la formation [EXEMPLE : découpage pédagogique, à adapter à chaque carte] :

- **alimentation** : connecteur d'entrée, protection (fusible, diode), régulateurs, condensateurs de découplage ;
- **horloge** : quartz ou résonateur et ses condensateurs, près du microcontrôleur ;
- **microcontrôleur** : en général le plus gros composant, souvent au centre du schéma [SOURCÉ : SRC-0030 §Reference Component Datasheets] ;
- **entrées** : diviseurs, filtres, protections, AOP qui préparent les signaux des capteurs (S10) ;
- **sorties** : transistors et étages de commande des charges (S09) ;
- **communication** : connecteurs et circuits d'interface (USB, liaison série, plus tard CAN et LIN en S23 à S25).

::figure{id=S12-F03}

Quand un bloc reste obscur, on lit la fiche technique de son composant principal
[SOURCÉ : SRC-0030 §Reference Component Datasheets].

### Méthode de découpage

1. Repérer les nœuds d'alimentation et de masse, et remonter jusqu'à l'entrée d'alimentation (S12-L02).
2. Repérer le composant principal et lire sa fiche : nom des broches, alimentation, horloge.
3. Partir des broches du composant principal et suivre chaque réseau jusqu'à un connecteur ou une charge.
4. Encadrer chaque bloc au crayon de couleur ; écrire son nom et la liste de ses références.
5. Marquer `[À VÉRIFIER]` tout ce qui n'est pas confirmé par le schéma ou une fiche.

### Exemple 7 : les blocs d'un schéma public

Sur le schéma de l'Arduino UNO Rev3 [SOURCÉ : SRC-0032 §page 1] :

1. Microcontrôleur : ATMEGA328P-PU, le microcontrôleur courant des cartes Arduino [SOURCÉ : SRC-0030 §Integrated Circuits].
2. Horloge : un composant de valeur 16MHz relié au microcontrôleur [SOURCÉ : SRC-0032 §page 1].
3. Alimentation : un régulateur NCP1117ST50T3G, le fusible F1 et le réseau VIN [SOURCÉ : SRC-0032 §page 1] ; leur rôle exact se confirme dans leurs fiches [À VÉRIFIER : fiches du régulateur et du fusible].
4. Communication : un connecteur USB-B_TH et un second microcontrôleur ATMEGA16U2-MU(R) [SOURCÉ : SRC-0032 §page 1] [HYPOTHÈSE : interface USB, à confirmer dans la fiche du composant].

Cette carte n'est pas un calculateur automobile ; elle sert à s'entraîner sur un schéma réel, public
et complet.

### Le schéma électrique officiel du constructeur

Pour un véhicule, le brochage des connecteurs ne se lit que sur les **schémas électriques officiels
du constructeur** : c'est la seule source légitime de brochage dans cette formation, et elle est
reprise chaque semaine. Un brochage trouvé sur un forum ou dans une vidéo ne se recopie jamais comme
une donnée.

Ce qu'on y lit en général [À VÉRIFIER : présentation propre à chaque constructeur et à chaque documentation] :

- le **connecteur** et son repère, avec une vue des alvéoles numérotées ;
- pour chaque broche, la **fonction** et le réseau, la **couleur** et parfois la section du fil ;
- la **destination** du fil : autre connecteur, épissure, masse, fusible.

Une vue de connecteur peut être côté faisceau ou côté composant ; l'une est le miroir de l'autre
[À VÉRIFIER : convention de vue indiquée dans la légende de la documentation du constructeur]. On lit
toujours la légende avant de compter les alvéoles.

### Exemple 8 : relever le brochage d'un connecteur

On veut le brochage du connecteur d'un capteur sur un véhicule d'atelier VEH-01 [EXEMPLE].

1. Ouvrir la documentation officielle du constructeur ; noter son titre et sa version au journal.
2. Lire la légende : vue côté faisceau ou côté composant, abréviations des couleurs.
3. Pour chaque broche : numéro, fonction, couleur du fil, destination, dans un tableau.
4. Toute ligne qui n'est pas lue sur le document porte `[À VÉRIFIER]`.

## Exercices

::exercice{id=S12-L03-EX01}

::exercice{id=S12-L03-EX02}
