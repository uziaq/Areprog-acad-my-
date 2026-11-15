---
id: S26-L02
titre: Flux, nettoyage et soudure des passifs 0603 et 0402 au fer
chapitre: S26
version: "0.1"
statut: brouillon
duree_min: 90
objectifs:
  - id: O1
    texte: Expliquer le rôle du flux, choisir un flux d'après sa fiche et nettoyer ses résidus sans abîmer la carte
    competences: [D9.1]
  - id: O2
    texte: Poser et déposer un passif 0603 ou 0402 au fer selon une méthode écrite, en évitant le choc thermique des condensateurs céramiques
    competences: [D9.1]
prerequis: [S26-L01]
exercices: [S26-L02-EX01, S26-L02-EX02]
references: [SRC-0071, SRC-0072, SRC-0073]
criteres_evaluation:
  - objectif: O1
    critere: Exercice S26-L02-EX01 réussi et carte nettoyée sans résidu visible au TP-37
  - objectif: O2
    critere: Exercice S26-L02-EX02 réussi et série de 20 passifs réalisée au TP-37
figures:
  - id: S26-F02
    fichier: ../figures/S26-F02-pose-passif.svg
    legende: "Pose d'un passif chip au fer, méthode de l'académie en quatre temps : étamer une seule pastille ; tenir le composant à la pince et refondre cette pastille pour le fixer ; souder la deuxième extrémité ; reprendre la première si besoin, avec du flux. La panne touche la pastille et la terminaison, jamais le corps céramique."
    alt: "Quatre petites vues de dessus numérotées : une pastille étamée ; le composant tenu par une pince pendant que la panne refond la pastille ; la deuxième extrémité soudée ; les deux extrémités avec un ménisque. Une croix barre une panne posée sur le corps du composant."
    origine: areprog
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction
---

## Théorie

### Le flux

Le flux nettoie les surfaces et permet le mouillage ; la norme NASA en fixe les types et demande que la
documentation du procédé dise quel flux est utilisé, où, et avec quelles précautions
[SOURCÉ : SRC-0071 §6.13 Flux]. Elle retient des flux à base de colophane de faible activité, et le
moins actif là où un nettoyage complet n'est pas possible [SOURCÉ : SRC-0071 §6.13 Flux]. Le flux
ajouté doit être compatible avec celui de l'âme du fil [SOURCÉ : SRC-0071 §6.13 Flux].

Les rosins des fils se classent par activité dans la norme J-STD-004 ; la classe de chaque produit se
lit dans sa fiche [À VÉRIFIER : fiche du flux et du fil de l'atelier, classe J-STD-004]. Un flux « sans
nettoyage » laisse des résidus prévus pour rester ; un flux actif doit être nettoyé
[À VÉRIFIER : consigne de nettoyage dans la fiche du flux utilisé].

### Nettoyer

- Résidus retirés dans la demi-heure qui suit la soudure, avec un solvant approuvé comme l'alcool isopropylique [SOURCÉ : SRC-0072 §10.4 Solder Cleaning].
- Le solvant ne doit pas être entraîné dans les contacts (connecteurs, interrupteurs, potentiomètres) [SOURCÉ : SRC-0072 §6.13 Solvents and Cleaners].
- Pas de nettoyage par ultrasons d'une carte équipée de composants [SOURCÉ : SRC-0072 §10.4 Solder Cleaning].
- Une carte vernie ne se plonge pas dans le solvant : on nettoie seulement la zone reprise [SOURCÉ : SRC-0072 §10.4 Solder Cleaning].
- Les solvants sont dangereux et volatils : ventilation et consignes de leur fiche de données de sécurité [SOURCÉ : SRC-0072 §6.13 Solvents and Cleaners].

Refroidissement : à l'air ambiant, jamais à l'air comprimé [SOURCÉ : SRC-0072 §10.1 General]. Un
refroidissement brusque ou un solvant froid juste après la soudure peut fissurer un condensateur
céramique [SOURCÉ : SRC-0073 §Cool Down Cycle].

### Le piège du condensateur céramique

Les condensateurs céramiques multicouches craignent les chocs thermiques ; les microfissures qui en
résultent sont difficiles à voir à l'examen visuel et au test électrique [SOURCÉ : SRC-0073 §General].
Le fabricant cité déconseille le fer ; s'il faut l'employer, il demande un préchauffage, une panne qui
ne touche jamais la céramique, et des limites de puissance, de température et de durée
[SOURCÉ : SRC-0073 §Soldering Iron]. On applique la fiche du fabricant du composant réellement posé
[À VÉRIFIER : recommandations de soudage au fer du fabricant des condensateurs du TP-37].

### Poser un passif chip

Méthode de l'académie [EXEMPLE : méthode d'atelier, évaluée par le taux de réussite au TP-37] :

1. Pastilles propres ; flux sur les deux pastilles.
2. Étamer **une seule** pastille, légèrement.
3. Tenir le composant à la pince, dans le bon sens s'il est polarisé ; refondre la pastille étamée pour le fixer à plat et centré.
4. Souder la deuxième extrémité : panne sur la pastille et la terminaison, apport de fil au point de contact.
5. Reprendre la première extrémité si son ménisque est insuffisant.
6. Nettoyer, laisser refroidir, contrôler au microscope (S26-L03).

::figure{id=S26-F02}

Des forces de tension superficielle inégales aux deux extrémités font basculer le composant
(« pierre tombale ») ; on égalise la quantité de soudure et le chauffage des deux côtés
[SOURCÉ : SRC-0073 §Tomb Stoning/Chip Movement]. Le ménisque d'un condensateur céramique ne dépasse
pas les deux tiers de la hauteur de sa terminaison, selon ce fabricant [SOURCÉ : SRC-0073 §Solder Fillets].

### Déposer un passif chip

Au fer, on chauffe les deux extrémités ensemble : deux fers, une pince chauffante ou une panne large,
avec du flux [HYPOTHÈSE : méthodes courantes, à choisir selon l'outillage de l'atelier]. On soulève le
composant seulement quand les deux soudures sont fondues, pour ne pas arracher une pastille. On
nettoie ensuite les pastilles à la tresse et au flux, sans frotter. Un condensateur céramique déposé ne
se réutilise pas [HYPOTHÈSE : risque de microfissure après un choc thermique, d'après SRC-0073].

### Exemple 4 : un 0402 qui bascule

Un 0402 se redresse sur une extrémité pendant la soudure [EXEMPLE].

1. Cause probable : soudure fondue d'un seul côté, ou quantités inégales [SOURCÉ : SRC-0073 §Tomb Stoning/Chip Movement].
2. Correction : retirer, nettoyer les deux pastilles, étamer légèrement une seule pastille, recommencer.
3. Contrôle : composant à plat, deux ménisques.

### Exemple 5 : des résidus collants

Après soudure, des résidus bruns collants restent autour des pastilles [EXEMPLE].

1. Lire la fiche du flux : faut-il nettoyer ? [À VÉRIFIER : fiche du flux utilisé]
2. Nettoyer à l'alcool isopropylique dans la demi-heure, au pinceau [SOURCÉ : SRC-0072 §10.4 Solder Cleaning].
3. Après nettoyage, aucun résidu visible au microscope [SOURCÉ : SRC-0072 §10.4 Solder Cleaning].

## Exercices

::exercice{id=S26-L02-EX01}

::exercice{id=S26-L02-EX02}
