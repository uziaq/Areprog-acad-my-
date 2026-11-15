---
id: S28-L02
titre: Réparer une piste, une pastille, un via ou une broche de connecteur
chapitre: S28
version: "0.1"
statut: brouillon
duree_min: 120
objectifs:
  - id: O1
    texte: Réparer une piste coupée par un fil ou un feuillard sans réduire sa section ni l'écart avec ses voisines
    competences: [D9.4]
  - id: O2
    texte: Recoller une pastille soulevée ou la remplacer, et choisir la réparation d'un trou métallisé selon ses connexions internes
    competences: [D9.4]
  - id: O3
    texte: Contrôler une réparation de piste, de pastille ou de broche par l'examen visuel et la mesure de continuité et d'isolement
    competences: [D9.4, D9.5]
prerequis: [S28-L01]
exercices: [S28-L02-EX01, S28-L02-EX02, S28-L02-EX03]
references: [SRC-0077]
criteres_evaluation:
  - objectif: O1
    critere: Exercice S28-L02-EX01 réussi et piste réparée au TP-40
  - objectif: O2
    critere: Exercice S28-L02-EX02 réussi et pastille réparée au TP-40
  - objectif: O3
    critere: Exercice S28-L02-EX03 réussi et continuité et isolement relevés au TP-40
figures:
  - id: S28-F02
    fichier: ../figures/S28-F02-piste-fil.svg
    legende: "Réparation d'une piste coupée par un fil soudé à recouvrement : la piste abîmée est recoupée jusqu'à une zone bien collée, le vernis épargne est gratté aux deux extrémités, le fil recouvre chaque extrémité sur au moins deux fois la largeur de la piste et la soudure reste si possible à distance de la pastille voisine. D'après la procédure 4.2.4 citée ; allure sans valeur."
    alt: "Vue de dessus d'une piste interrompue entre deux pastilles. Un fil relie les deux tronçons, posé à plat sur chacun. Une cote marque le recouvrement, au moins deux fois la largeur de piste, et une autre la distance entre la soudure et la pastille."
    origine: areprog
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction
---

## Théorie

### Une réparation ne doit rien réduire

Toute réparation de piste garde la **largeur**, l'**écart** avec les pistes voisines et la **capacité en
courant** dans leurs tolérances [SOURCÉ : SRC-0077 §4.2.4 Conductor Repair, Surface Wire Method].
Avec un fil, la section ne doit pas diminuer : on choisit un fil dont la section vaut au moins celle de
la piste [SOURCÉ : SRC-0077 §4.2.4 Conductor Repair, Surface Wire Method]. La surface de la carte doit
être plane et saine ; si le support est abîmé (brûlé, fibres apparentes), il se répare d'abord
[SOURCÉ : SRC-0077 §4.7.1 Surface Mount Pad Repair, Epoxy Method].

La procédure suivie vient d'un prestataire qui déclare suivre l'IPC-7721 (payante, non consultée) ; elle
ne vaut ni certification ni procédure du constructeur du calculateur
[À VÉRIFIER : exigences éventuelles du constructeur pour une réparation de carte].

### Réparer une piste par un fil ou un feuillard

Les deux méthodes suivent les mêmes étapes [SOURCÉ : SRC-0077 §4.2.4 Conductor Repair, Surface Wire Method] :

1. nettoyer ; recouper la partie abîmée jusqu'à une zone où la piste est encore bien collée ;
2. gratter le vernis épargne aux deux extrémités ; flux ; étamer les extrémités ;
3. couper le fil ou le feuillard ; il recouvre chaque extrémité sur **au moins deux fois la largeur de la piste** ;
4. souder à recouvrement une extrémité, former le fil, souder l'autre ;
5. coller le fil sur la carte (adhésif ou époxy) ; nettoyer ; contrôler.

Le recouvrement de deux fois la largeur figure aussi dans la méthode du feuillard
[SOURCÉ : SRC-0077 §4.2.1 Conductor Repair, Foil Jumper, Epoxy Method]. Si la place le permet, la soudure
de recouvrement reste à 3 mm au moins de la pastille voisine, pour ne pas la refondre en même temps
[SOURCÉ : SRC-0077 §4.2.4 Conductor Repair, Surface Wire Method]. Un fil nu ne convient qu'à une
réparation courte qui ne croise aucun conducteur [SOURCÉ : SRC-0077 §4.2.4 Conductor Repair, Surface Wire Method].
La méthode du feuillard, recouvert d'époxy, reproduit mieux la piste d'origine que le fil
[SOURCÉ : SRC-0077 §4.2.1 Conductor Repair, Foil Jumper, Epoxy Method].

::figure{id=S28-F02}

### Recoller ou remplacer une pastille

- **Pastille soulevée mais intacte** : on la recolle en glissant un peu d'époxy dessous, sans l'étirer, puis on la presse sous un ruban haute température pendant la polymérisation [SOURCÉ : SRC-0077 §4.4.1 Lifted Land Repair, Epoxy Seal Method].
- **Pastille arrachée** : on retire la pastille abîmée et un court morceau de sa piste, on gratte, on étame la piste ; une pastille de remplacement en cuivre est collée à l'époxy et sa piste soudée à recouvrement sur deux fois la largeur au moins [SOURCÉ : SRC-0077 §4.7.1 Surface Mount Pad Repair, Epoxy Method].
- Contrôle : alignement, largeur et écart de la nouvelle pastille, continuité [SOURCÉ : SRC-0077 §4.7.1 Surface Mount Pad Repair, Epoxy Method].

L'époxy de la procédure polymérise en 24 heures à température ambiante, ou plus vite en étuve ; ces
valeurs ne valent que pour ce produit [SOURCÉ : SRC-0077 §2.7 Epoxy Mixing and Handling]. Celui de l'atelier
suit sa propre fiche [À VÉRIFIER : époxy de réparation de l'atelier, temps et température de polymérisation].

### Trou métallisé et via

Un trou métallisé **sans connexion interne** se répare par un œillet serti, dont la collerette remplace
les pastilles [SOURCÉ : SRC-0077 §5.1 Plated Hole Repair, No Inner Layer Connection]. Sur une carte
multicouche, percer le trou peut couper des connexions internes : cette méthode n'est utilisée que si le
trou n'en a pas [SOURCÉ : SRC-0077 §5.1 Plated Hole Repair, No Inner Layer Connection]. Une pastille
recollée n'a plus forcément de liaison avec le trou métallisé : c'est la soudure du composant, un œillet
ou un fil qui rétablit la liaison [SOURCÉ : SRC-0077 §4.4.1 Lifted Land Repair, Epoxy Seal Method].

Pour un via relié à une couche interne, on ne sait pas, sans plan de la carte, ce qu'il relie : la
réparation pratiquée dans le cursus est un fil de pont entre les points reliés, vérifiés à l'ohmmètre
sur une carte de référence [HYPOTHÈSE : méthode de l'académie, à valider par la mesure].

### Broche de connecteur

Une broche de connecteur tordue se redresse à la pince, à froid, une seule fois ; une broche cassée ou
corrodée se remplace par une broche identique, prise sur un connecteur de même référence
[EXEMPLE : méthode d'atelier de l'académie]. La référence et l'outil d'extraction se lisent dans la
documentation du fabricant du connecteur [À VÉRIFIER : documentation du connecteur et outillage de l'atelier].
Contrôle : alignement avec les broches voisines, tenue mécanique, continuité vers la piste.

### Exemple 4 : choisir le fil d'une réparation

Une piste coupée mesure 0,5 mm de large [EXEMPLE].

1. Recouvrement minimal sur chaque extrémité : 2 × 0,5 = 1 mm [EXEMPLE].
2. Fil : section au moins égale à celle de la piste ; l'épaisseur du cuivre se lit dans le dossier de fabrication de la carte [À VÉRIFIER : épaisseur de cuivre, inconnue sur une carte de calculateur].
3. Faute d'épaisseur connue, on prend un fil plus gros et on vérifie l'écart avec les pistes voisines.

### Exemple 5 : une pastille arrachée sous un SOIC

Après une dépose, une pastille d'un SOIC est partie avec la broche [EXEMPLE].

1. Retirer le reste de pastille et un court morceau de piste ; gratter, étamer.
2. Coller une pastille de remplacement à l'époxy ; souder sa piste à recouvrement [SOURCÉ : SRC-0077 §4.7.1 Surface Mount Pad Repair, Epoxy Method].
3. Contrôler l'alignement et l'écart avec les pastilles voisines, puis la continuité.

### Exemple 6 : un trou métallisé abîmé

Le trou d'une broche traversante est arraché sur une carte multicouche [EXEMPLE].

1. Une couche interne est-elle reliée à ce trou ? Le relevé (S13) ou la carte de référence le dit [HYPOTHÈSE].
2. Sans connexion interne : œillet [SOURCÉ : SRC-0077 §5.1 Plated Hole Repair, No Inner Layer Connection].
3. Avec connexion interne : hors pratique du cursus ; dossier, photo, avis du formateur.

## Exercices

::exercice{id=S28-L02-EX01}

::exercice{id=S28-L02-EX02}

::exercice{id=S28-L02-EX03}
