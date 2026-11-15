---
id: S28-L01
titre: Vernis de tropicalisation, retrait local et restauration
chapitre: S28
version: "0.1"
statut: brouillon
duree_min: 90
objectifs:
  - id: O1
    texte: Identifier un vernis par des essais simples dans une zone non critique et choisir sa méthode de retrait
    competences: [D9.3]
  - id: O2
    texte: Retirer localement un vernis au solvant ou par grattage sans abîmer la carte ni les composants
    competences: [D9.3]
  - id: O3
    texte: Restaurer le vernis après réparation, sur une surface propre, et contrôler la restauration
    competences: [D9.3, D9.5]
prerequis: [S27-L03, S17-L03]
exercices: [S28-L01-EX01, S28-L01-EX02, S28-L01-EX03]
references: [SRC-0077, SRC-0047]
criteres_evaluation:
  - objectif: O1
    critere: Exercice S28-L01-EX01 réussi et vernis identifié au TP-41
  - objectif: O2
    critere: Exercice S28-L01-EX02 réussi et retrait limité à la zone de travail au TP-41
  - objectif: O3
    critere: Exercice S28-L01-EX03 réussi et vernis restauré et contrôlé au TP-41
figures:
  - id: S28-F01
    fichier: ../figures/S28-F01-vernis-etapes.svg
    legende: "Cycle d'une réparation sous vernis : identifier le vernis dans une zone non critique, délimiter au ruban, retirer localement, réparer, nettoyer, restaurer le vernis, contrôler. Méthode de l'académie d'après les procédures citées ; allure sans valeur."
    alt: "Sept cases en ligne brisée reliées par des flèches : identifier, délimiter, retirer, réparer, nettoyer, restaurer, contrôler. En bas à gauche, une petite carte montre une zone rectangulaire sans vernis entourée de ruban."
    origine: areprog
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction
---

## Théorie

### Identifier avant de retirer

Une carte de calculateur est souvent couverte d'un vernis de tropicalisation qui la protège de
l'humidité et des polluants (S17-L03). Avant de le retirer, il faut l'identifier : la méthode de
retrait en dépend [SOURCÉ : SRC-0077 §2.3.1 Coating Removal, Identification of Coating]. Le nom
commercial du vernis n'est pas nécessaire ; des essais simples, faits dans une zone **non critique**,
suffisent [SOURCÉ : SRC-0077 §2.3.1 Coating Removal, Identification of Coating] :

- **dureté** : essai de pénétration ; plus le vernis est dur, plus il se prête à l'abrasion ; plus il est mou, plus il se prête au brossage ;
- **transparence** : un vernis opaque demande une méthode plus lente et mieux contrôlée, car on ne voit pas ce qu'il couvre ;
- **solubilité** : réaction à un solvant doux ; un vernis acrylique réagit à l'alcool ;
- **réaction à la chaleur** : outil chauffant sans tranchant, en partant d'une température basse ;
- **épaisseur** : un vernis mince laisse voir des contours nets, un vernis épais les arrondit.

Tous ces essais viennent de la même procédure [SOURCÉ : SRC-0077 §2.3.1 Coating Removal, Identification of Coating].
Un guide de fabricant de produits décrit les mêmes familles (acrylique, silicone, polyuréthane,
époxy, parylène) et leur retrait [SOURCÉ : SRC-0047 §Step-by-Step: Removal by Chemical Solvent].

::figure{id=S28-F01}

### Retirer localement

**Au solvant** [SOURCÉ : SRC-0077 §2.3.2 Coating Removal, Solvent Method] :

1. délimiter la zone au ruban haute température ;
2. appliquer un peu de produit de retrait à l'écouvillon, plusieurs fois, car il s'évapore vite ;
3. frotter doucement au pinceau ou au bâtonnet de bois pour décoller le vernis ;
4. neutraliser ou nettoyer la zone, sécher ;
5. vérifier à l'œil ou sous lampe UV que le vernis est retiré.

On n'immerge pas une carte dans un solvant agressif : certains solvants font gonfler le support de la
carte ou attaquent composants, trous métallisés et soudures ; on lit la fiche de données de sécurité du
produit avant de l'utiliser [SOURCÉ : SRC-0077 §2.3.2 Coating Removal, Solvent Method].

**Par grattage ou meulage** : lame tenue perpendiculaire au vernis, déplacée d'un côté à l'autre ; ou
outil rotatif avec un abrasif adapté [SOURCÉ : SRC-0077 §2.3.5 Coating Removal, Grinding/Scraping Method].
L'abrasion produit des charges électrostatiques : poste ESD et bracelet relié
[SOURCÉ : SRC-0077 §2.3.5 Coating Removal, Grinding/Scraping Method]. Un vernis épais se réduit d'abord,
puis le reste se gratte [SOURCÉ : SRC-0077 §2.3.5 Coating Removal, Grinding/Scraping Method].

**À la chaleur** : on part d'une température basse et l'on monte progressivement ; si le vernis coule ou
colle, c'est trop chaud ou la méthode ne convient pas ; on ne dépasse jamais la température de
stockage maximale des composants [SOURCÉ : SRC-0077 §2.3.1 Coating Removal, Identification of Coating].

### Restaurer le vernis

Après la réparation, la surface est **nettoyée à fond** : c'est la condition de l'adhérence, de la
protection contre la corrosion et des propriétés électriques [SOURCÉ : SRC-0077 §2.4.2 Coating Replacement, Conformal Coating, Encapsulant].
On délimite la zone au ruban si besoin, on étuve la carte si c'est demandé, puis on applique le vernis
de remplacement au pinceau ou à l'écouvillon et on le laisse polymériser
[SOURCÉ : SRC-0077 §2.4.2 Coating Replacement, Conformal Coating, Encapsulant].
Contrôle : aspect, couleur, adhérence, couverture, et essais électriques des conducteurs voisins
[SOURCÉ : SRC-0077 §2.4.2 Coating Replacement, Conformal Coating, Encapsulant].

Le vernis de remplacement doit être compatible avec celui d'origine ; son temps de séchage et sa
polymérisation se lisent dans sa fiche [À VÉRIFIER : vernis de retouche de l'atelier et sa fiche technique].
Les connecteurs, contacts et points de test ne se vernissent pas [HYPOTHÈSE : règle générale, à confirmer
sur la carte et la documentation du fabricant du vernis].

### Exemple 1 : un vernis qui réagit à l'alcool

Sur une zone non critique, une goutte d'alcool isopropylique ramollit le vernis ; il est mince et
transparent [EXEMPLE].

1. La réaction à l'alcool oriente vers un vernis acrylique [SOURCÉ : SRC-0077 §2.3.1 Coating Removal, Identification of Coating].
2. Méthode : retrait local au solvant, zone délimitée au ruban.
3. Vérification sous lampe UV si le vernis est fluorescent [SOURCÉ : SRC-0077 §2.3.2 Coating Removal, Solvent Method].

### Exemple 2 : un vernis dur qui ne se dissout pas

Le vernis résiste au solvant et à la lame ne laisse qu'une rayure fine [EXEMPLE].

1. Un vernis dur se prête à l'abrasion [SOURCÉ : SRC-0077 §2.3.1 Coating Removal, Identification of Coating].
2. Grattage ou meulage léger, d'un côté à l'autre, au microscope.
3. Bracelet ESD relié : l'abrasion crée des charges [SOURCÉ : SRC-0077 §2.3.5 Coating Removal, Grinding/Scraping Method].

### Exemple 3 : un vernis restauré qui se décolle

Une semaine après, le vernis de retouche s'écaille autour de la réparation [EXEMPLE].

1. Cause probable : surface mal nettoyée, résidus de flux sous le vernis [HYPOTHÈSE].
2. Correction : retrait du vernis de retouche, nettoyage, nouvelle application.
3. Prévention : nettoyage complet avant la restauration [SOURCÉ : SRC-0077 §2.4.2 Coating Replacement, Conformal Coating, Encapsulant].

## Exercices

::exercice{id=S28-L01-EX01}

::exercice{id=S28-L01-EX02}

::exercice{id=S28-L01-EX03}
