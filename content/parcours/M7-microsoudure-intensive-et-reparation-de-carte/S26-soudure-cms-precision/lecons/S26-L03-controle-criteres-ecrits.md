---
id: S26-L03
titre: Contrôler une soudure au microscope selon des critères écrits
chapitre: S26
version: "0.1"
statut: brouillon
duree_min: 90
objectifs:
  - id: O1
    texte: Choisir le grossissement et l'éclairage d'inspection d'après la taille des pastilles
    competences: [D3.5]
  - id: O2
    texte: Accepter ou rejeter une soudure de composant chip d'après une liste de critères écrits, et nommer le défaut
    competences: [D9.5]
  - id: O3
    texte: Calculer et suivre un taux de conformité sur une série de soudures
    competences: [D9.5]
prerequis: [S26-L02]
exercices: [S26-L03-EX01, S26-L03-EX02, S26-L03-EX03]
references: [SRC-0071, SRC-0072, SRC-0073]
criteres_evaluation:
  - objectif: O1
    critere: Exercice S26-L03-EX01 réussi et grossissement noté pour chaque contrôle au TP-37
  - objectif: O2
    critere: Exercice S26-L03-EX02 réussi et grille de contrôle remplie pour les 20 passifs au TP-37
  - objectif: O3
    critere: Exercice S26-L03-EX03 réussi et taux de conformité calculé au TP-37
figures:
  - id: S26-F03
    fichier: ../figures/S26-F03-defauts-chip.svg
    legende: "Défauts de soudure d'un composant chip, vus de profil ou de dessus : soudure correcte, manque de soudure, excès qui déborde sur le corps, pierre tombale, composant décalé qui déborde de la pastille, pont entre deux pastilles. D'après les critères de la norme NASA-STD-8739.2 et la note Johanson ; dessin de principe."
    alt: "Six vignettes en deux rangées. Correct : ménisque concave des deux côtés. Manque : ménisque très bas. Excès : soudure bombée qui monte sur le corps. Pierre tombale : composant dressé sur une extrémité. Décalé : composant qui dépasse sur le côté de la pastille. Pont : soudure qui relie deux pastilles voisines."
    origine: areprog
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction
---

## Théorie

### Des critères écrits, pas une impression

Un contrôle se fait d'après une liste de critères **écrits avant** de regarder. La norme
industrielle de référence est l'IPC-A-610, payante et non consultée pour ce cours
[À VÉRIFIER : IPC-A-610, édition en vigueur]. Le cours s'appuie sur des normes NASA publiques, plus
anciennes, qui décrivent le même type de critères [SOURCÉ : SRC-0071 §12.9 Inspection Criteria, Specific].
Ce contrôle forme à la méthode : il ne vaut ni certification IPC ni qualification NASA.

### Grossissement et éclairage

- Éclairage sans ombre ; optiques en verre ; un microscope avec caméra est admis [SOURCÉ : SRC-0071 §6.9 Inspection Aids].
- Grossissement des soudures selon la largeur de pastille : 10 à 25 fois au-dessus de 0,65 mm, 10 à 40 fois en dessous, 25 à 45 fois sous 0,39 mm [SOURCÉ : SRC-0071 §12.2 Magnification Requirements].
- Le grossissement employé est noté sur la grille de contrôle [SOURCÉ : SRC-0071 §12.2 Magnification Requirements].

### Critères pour un composant chip

D'après la norme NASA-STD-8739.2, une soudure de composant chip est **acceptée** si
[SOURCÉ : SRC-0071 §12.9 Inspection Criteria, Specific] :

- le ménisque est concave sur la face verticale de la terminaison ;
- le mouillage est visible sur la terminaison et sur la pastille.

Elle est **rejetée** notamment si [SOURCÉ : SRC-0071 §12.9 Inspection Criteria, Specific] :

- le composant est incliné de plus de 25 % de son épaisseur ;
- le ménisque fait moins de 50 % de l'épaisseur du composant ;
- l'angle de mouillage est négatif, ou la soudure n'a pas coulé sous les extrémités ;
- la terminaison est dissoute (lixiviation) ;
- le débord latéral dépasse 25 % de la largeur du composant.

S'y ajoutent les critères généraux de rejet : soudure froide, surchauffée, fissurée ou perturbée ;
mouillage insuffisant ; trous et porosités ; manque de soudure ; projections ; résidus de flux ;
billes de soudure ; aspect terne ou granuleux ; composant fissuré, surtout s'il est en céramique ;
pont entre conducteurs ; pastille décollée ou carte brûlée [SOURCÉ : SRC-0071 §12.8 Inspection Criteria, General].
Pour un condensateur céramique, le fabricant cité limite le ménisque aux deux tiers de la hauteur de
la terminaison [SOURCÉ : SRC-0073 §Solder Fillets].

::figure{id=S26-F03}

### La grille de contrôle et le taux de conformité

Pour chaque soudure, la grille note : repère, grossissement, accepté ou rejeté, défaut nommé, photo
[EXEMPLE : grille de l'académie]. Le **taux de conformité** est le nombre de composants acceptés divisé
par le nombre de composants posés. Un composant est accepté seulement si ses deux soudures le sont, et
si le composant lui-même est intact [EXEMPLE : règle de l'académie].

Le taux se suit d'une série à l'autre : il montre si la méthode progresse, et quels défauts reviennent
[EXEMPLE]. Une soudure rejetée se reprend, puis se contrôle de nouveau ; la reprise est notée sur la
grille, car chaque reprise chauffe de nouveau la pastille [HYPOTHÈSE : risque de décollement de
pastille à chaque reprise, à constater].

### Exemple 6 : choisir le grossissement

Une pastille de 0402 mesure 0,5 mm de large [EXEMPLE].

1. 0,5 mm est sous 0,65 mm et au-dessus de 0,39 mm [EXEMPLE].
2. Grossissement : 10 à 40 fois [SOURCÉ : SRC-0071 §12.2 Magnification Requirements].
3. On note le grossissement réellement utilisé sur la grille.

### Exemple 7 : ménisque trop bas

Un 0603 de 0,45 mm d'épaisseur présente un ménisque de 0,15 mm de haut [EXEMPLE].

1. 50 % de l'épaisseur : 0,5 × 0,45 = 0,225 mm [EXEMPLE].
2. 0,15 mm < 0,225 mm [EXEMPLE] : ménisque insuffisant, rejet.
3. Reprise : flux et un peu de soudure, puis nouveau contrôle.

### Exemple 8 : taux de conformité

Sur 20 passifs posés, 17 sont acceptés [EXEMPLE].

1. Taux : 17 / 20 = 0,85, soit 85 % [EXEMPLE].
2. Défauts relevés : deux manques de soudure, une pierre tombale.
3. Action : revoir l'étamage de la première pastille et l'égalité des quantités de soudure.

## Exercices

::exercice{id=S26-L03-EX01}

::exercice{id=S26-L03-EX02}

::exercice{id=S26-L03-EX03}
