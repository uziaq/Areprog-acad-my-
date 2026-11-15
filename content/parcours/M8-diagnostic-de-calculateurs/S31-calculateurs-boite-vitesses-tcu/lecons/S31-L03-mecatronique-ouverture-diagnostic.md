---
id: S31-L03
titre: Unités mécatroniques, ouverture et diagnostic d'un TCU
chapitre: S31
version: "0.1"
statut: brouillon
duree_min: 90
objectifs:
  - id: O1
    texte: Expliquer les contraintes thermiques et d'huile d'une unité mécatronique et les précautions d'ouverture d'un TCU, avant toute intervention
    competences: [D10.3]
  - id: O2
    texte: Justifier le choix d'un composant de remplacement pour un TCU monté dans la boîte, en tenant compte de sa plage de température et de sa qualification
    competences: [D4.7]
prerequis: [S28, S30, S31-L02]
exercices: [S31-L03-EX01, S31-L03-EX02]
references: [SRC-0078, SRC-0079, SRC-0077, SRC-0047, SRC-0013]
criteres_evaluation:
  - objectif: O1
    critere: Exercice S31-L03-EX01 réussi et ouverture documentée au TP-46
  - objectif: O2
    critere: Exercice S31-L03-EX02 réussi et justification d'équivalence écrite au dossier du TP-46 si un composant est remplacé
figures:
  - id: S31-F03
    fichier: ../figures/S31-F03-ouverture.svg
    legende: "Ordre d'ouverture d'un TCU de récupération : nettoyage de l'huile à l'extérieur, photos, repérage du mode de fermeture, ouverture sans contrainte sur la carte, identification de la protection (vernis, gel ou encapsulant), puis diagnostic selon la méthode de S30. Méthode pédagogique de l'académie."
    alt: "Six cases reliées par des flèches : nettoyer l'extérieur, photographier, repérer la fermeture, ouvrir sans contrainte, identifier la protection, diagnostiquer selon S30."
    origine: areprog
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction
---

## Théorie

### TCU séparé ou unité mécatronique

Un TCU peut être un boîtier séparé, monté hors de la boîte, ou une **unité mécatronique** intégrée à
la boîte, au contact de l'huile et de sa température [HYPOTHÈSE : à confirmer pour chaque boîte par sa
documentation]. Le catalogue des TP conseille, pour les exercices, un TCU séparé, plus simple à
manipuler [HYPOTHÈSE pédagogique du catalogue des TP].

### Température et qualification

Un circuit intégré automobile est qualifié selon un grade de température ambiante : le grade 0 couvre
−40 °C à +150 °C, le grade 1 −40 °C à +125 °C [SOURCÉ : SRC-0078 §1.3.4 Definition of Part Operating Temperature Grade].
Un semi-conducteur discret qualifié AEC-Q101 couvre au moins −40 °C à +125 °C [SOURCÉ : SRC-0079 §1.3.1 AEC Q101 Qualification].
La température réellement subie par une unité mécatronique dépend de la boîte
[À VÉRIFIER : plage de température indiquée par le constructeur de la boîte étudiée].

Conséquence pour un remplacement : le remplaçant doit couvrir **au moins** la plage de l'original,
lue dans la fiche de l'original ; un grade inférieur n'est pas équivalent (S28-L03). La qualification
est déclarée par le fabricant, ce n'est pas une certification [SOURCÉ : SRC-0078 §1.3.2 AEC Certification].

### L'huile

Sur une unité mécatronique, l'huile de boîte peut atteindre le connecteur et la carte par un joint
usé [HYPOTHÈSE : à constater à l'ouverture]. Elle salit la carte et peut masquer une corrosion ou une
brûlure ; elle se nettoie avant l'inspection, avec un produit compatible avec la protection de la carte [À VÉRIFIER : fiche du nettoyant et de la protection de la carte].
Une huile brûlée ou des particules métalliques sur le capteur ou l'aimant d'un capteur de vitesse
orientent vers une cause mécanique de la boîte, à signaler et non à réparer sur la carte
[HYPOTHÈSE : à confirmer avec l'atelier mécanique].

### Ouvrir sans abîmer

::figure{id=S31-F03}

1. Nettoyer l'extérieur, puis photographier toutes les faces.
2. Repérer le mode de fermeture (vis, clips, collage, sertissage) avant d'agir [HYPOTHÈSE : modes courants, à constater sur le boîtier].
3. Ouvrir sans faire levier sur la carte ni sur les fils de liaison ; un boîtier collé ou serti peut ne pas se refermer de façon étanche [HYPOTHÈSE : à évaluer avant d'ouvrir, avec le formateur].
4. Identifier la protection de la carte (vernis, gel, encapsulant) avant toute mesure : la méthode de retrait et de remplacement dépend du produit [SOURCÉ : SRC-0077 §2.4.2 Coating Replacement, Conformal Coating, Encapsulant] ; un vernis s'identifie par des essais en zone non critique [SOURCÉ : SRC-0047 §Coating Types & Identification].
5. Avant tout contact après une mise sous tension : décharge des condensateurs mesurée [SOURCÉ : SRC-0013 §2-7 Restriking Voltage] (FE-09).

### Diagnostiquer un TCU

La méthode en dix étapes de S30 s'applique telle quelle, avec l'exemplaire de référence. Points
propres au TCU [EXEMPLE : méthode pédagogique de l'académie] :

- entrées de température simulées par des résistances fixes, de vitesse par un générateur ;
- électrovannes remplacées sur banc par des bobines ou des charges de résistance et d'inductance proches, d'après la documentation [À VÉRIFIER : caractéristiques des électrovannes de la boîte] ;
- courant de chaque sortie relevé à la pince et comparé à la référence, plutôt qu'à une valeur supposée.

### Exemple 1 : un remplaçant de grade inférieur

Un transistor d'une unité mécatronique est donné pour −40 °C à +150 °C dans sa fiche ; le remplaçant proposé est qualifié pour −40 °C à +125 °C [EXEMPLE].

1. La plage du remplaçant est plus étroite que celle de l'original [EXEMPLE].
2. Il n'est pas équivalent, même si ses autres paramètres conviennent.
3. On cherche un remplaçant qui couvre au moins la plage de l'original, et on l'écrit au dossier.

### Exemple 2 : de l'huile sur la carte

À l'ouverture d'une unité mécatronique, la carte est couverte d'huile près du connecteur [EXEMPLE].

1. Photos avant nettoyage : la trace d'huile est une information du dossier.
2. Nettoyage compatible avec la protection, puis inspection au microscope (corrosion, brûlure).
3. Le joint par lequel l'huile est entrée est signalé : réparer la carte sans traiter l'entrée d'huile laisse la cause en place [HYPOTHÈSE].

## Exercices

::exercice{id=S31-L03-EX01}

::exercice{id=S31-L03-EX02}
