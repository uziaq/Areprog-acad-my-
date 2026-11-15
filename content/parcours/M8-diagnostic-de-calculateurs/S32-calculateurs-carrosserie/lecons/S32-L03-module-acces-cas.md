---
id: S32-L03
titre: Le module d'accès et d'antidémarrage, au niveau carte
chapitre: S32
version: "0.1"
statut: brouillon
duree_min: 90
objectifs:
  - id: O1
    texte: Décrire l'architecture générique d'un module d'accès et d'antidémarrage au niveau carte (station de base et antenne de transpondeur, entrées de contacteur, alimentations, communication) et les limites fixées par le cursus
    competences: [D10.3]
  - id: O2
    texte: Diagnostiquer un module d'accès de récupération sur ses alimentations, ses conditions de vie, sa consommation au repos et son réveil, sans lire ni modifier ses données, et justifier le remplacement éventuel d'un composant
    competences: [D10.3, D4.7]
prerequis: [S20, S32-L02]
exercices: [S32-L03-EX01, S32-L03-EX02]
references: [SRC-0093, SRC-0046, SRC-0079, SRC-0078]
criteres_evaluation:
  - objectif: O1
    critere: Exercice S32-L03-EX01 réussi et blocs repérés sur la carte au TP-48
  - objectif: O2
    critere: Exercice S32-L03-EX02 réussi et TP-48 rendu sans aucune lecture ni écriture de mémoire
figures:
  - id: S32-F03
    fichier: ../figures/S32-F03-module-acces.svg
    legende: "Blocs génériques d'un module d'accès au niveau carte : alimentation et veille, microcontrôleur, station de base de transpondeur reliée à une bobine d'antenne, entrées du contacteur, émetteur-récepteur CAN. Schéma de principe de l'académie d'après la fiche citée ; pas le schéma d'un module commercial et sans brochage. Les données d'antidémarrage sont hors du cursus."
    alt: "Au centre, un microcontrôleur. En haut, l'alimentation et la veille. À droite, une station de base reliée à une bobine d'antenne marquée 134,2 et 123 kHz. À gauche, les entrées du contacteur. En bas, l'émetteur-récepteur CAN. Un cadre en pointillés signale que les données d'antidémarrage sont hors du cursus."
    origine: areprog
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction
---

## Théorie

### Ce que le cursus traite, et ce qu'il ne traite pas

Le module d'accès (de type CAS) est étudié **au niveau carte uniquement**, sur des pièces de
provenance légitime et documentée. La modification de données d'antidémarrage n'est pas enseignée
(catalogue des TP, « Ce que le cursus n'enseigne pas ») [À VÉRIFIER : cadre juridique, noté au catalogue].
Dans cette semaine, la mémoire du module n'est **ni lue ni écrite** : le diagnostic porte sur
l'alimentation, les conditions de vie, la consommation au repos, le réveil et les composants.

### La station de base et l'antenne

Une station de base de transpondeur commande la bobine d'antenne, envoie des données modulées et
démodule la réponse du transpondeur [SOURCÉ : SRC-0093 §3 Description]. Dans le système cité, le
transpondeur répond en modulation de fréquence, 134,2 kHz pour un bit bas [SOURCÉ : SRC-0093 §3 Description]
et 123 kHz pour un bit haut, valeurs nominales [SOURCÉ : SRC-0093 §3 Description]. L'énergie du transpondeur vient du champ de
l'antenne pendant une phase de charge [SOURCÉ : SRC-0093 §3 Description].

L'antenne est commandée par un pont complet, protégé contre le court-circuit à la masse [SOURCÉ : SRC-0093 §9.4 Full Bridge].
Pendant la phase de charge, le circuit diagnostique le pont et l'antenne, et signale aussi une
coupure par la protection contre le court-circuit [SOURCÉ : SRC-0093 §9.7 Diagnosis]. Au repos, la
station de base passe en veille et consomme 0,2 mA [SOURCÉ : SRC-0093 §9.1 Power Supply].

Mesures de niveau carte : continuité et résistance de la bobine d'antenne hors tension, comparées à
la référence ; sous tension, présence d'une porteuse pendant une demande de lecture, à l'oscilloscope
[HYPOTHÈSE : déclenchement de la lecture à définir avec le formateur, sans clé ni donnée client].
Les circuits du module étudié se relèvent sur sa carte [À VÉRIFIER : composants relevés sur le CAS3 du stock].

### Les entrées du contacteur et le réveil

Le contacteur et les boutons de démarrage arrivent sur des entrées du module, qui servent souvent
aussi de sources de réveil [HYPOTHÈSE : à relever sur la carte étudiée]. Un réveil local par une broche
qui supporte la tension de la batterie, sur un front ou une impulsion d'une durée minimale, est
prévu par les SBC [SOURCÉ : SRC-0046 §3 Local Wake Up (LWU)]. Sur banc, on simule l'action du
contacteur par un interrupteur, d'après la documentation [À VÉRIFIER : documentation du module étudié].

### Remplacer un composant

Si une mesure désigne un composant (régulateur, transistor du pont d'antenne, condensateur), le
remplaçant est justifié comme en S28-L03 : paramètres critiques, boîtier, plage de température et
qualification [SOURCÉ : SRC-0078 §1.3.4 Definition of Part Operating Temperature Grade] [SOURCÉ : SRC-0079 §1.3.1 AEC Q101 Qualification].
Aucun composant mémoire n'est remplacé dans ce module pendant le cursus.

::figure{id=S32-F03}

### Exemple 1 : une antenne coupée

Hors tension, la bobine d'antenne mesure quelques ohms sur la référence et un circuit ouvert sur la carte en panne [EXEMPLE].

1. Hypothèses : bobine coupée, connecteur ou piste coupés [HYPOTHÈSE].
2. Continuité de la broche à la bobine, puis bobine seule.
3. La station de base n'est pas remplacée : son diagnostic signalerait ce défaut, et la mesure l'a localisé [SOURCÉ : SRC-0093 §9.7 Diagnosis].

### Exemple 2 : un module qui consomme au repos

Le module en panne consomme 30 mA au repos, la référence moins de 1 mA [EXEMPLE].

1. Méthode de S32-L02 : outil débranché, entrées de réveil comme sur la référence.
2. Si le courant reste haut : localiser le composant qui consomme (chute de tension, thermique) [HYPOTHÈSE].
3. Aucune lecture de mémoire n'est nécessaire pour ce diagnostic.

## Exercices

::exercice{id=S32-L03-EX01}

::exercice{id=S32-L03-EX02}
