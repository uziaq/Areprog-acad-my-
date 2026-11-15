---
id: S18-L03
titre: Ordre des contrôles et dossier de diagnostic d'alimentation
chapitre: S18
version: "0.1"
statut: brouillon
duree_min: 60
objectifs:
  - id: O1
    texte: Appliquer un ordre de contrôles « alimentation d'abord » en suivant la méthode de diagnostic en cinq étapes
    competences: [D1.6]
  - id: O2
    texte: Documenter un diagnostic d'alimentation dans un dossier de réparation, avec les mesures, leur origine et les limites de la conclusion
    competences: [D1.6]
prerequis: [S18-L02, S01-L03]
exercices: [S18-L03-EX01, S18-L03-EX02]
references: [SRC-0051]
criteres_evaluation:
  - objectif: O1
    critere: Exercice S18-L03-EX01 réussi et ordre des contrôles suivi au TP-25
  - objectif: O2
    critere: Exercice S18-L03-EX02 réussi et dossier de diagnostic rendu au TP-24
figures:
  - id: S18-F03
    fichier: ../figures/S18-F03-ordre-controles.svg
    legende: "Ordre des contrôles d'alimentation proposé par l'académie : inspection et protocole, résistance des rails vers la masse, mise sous tension progressive, entrée et masses, rails internes, reset et réveil, puis seulement les fonctions. Chaque case renvoie au relevé d'un exemplaire de référence."
    alt: "Une colonne de sept cases reliées par des flèches vers le bas : inspection et protocole ; résistance des rails ; mise sous tension progressive ; entrée et masses ; rails internes ; reset et réveil ; fonctions. À droite, une case exemplaire de référence reliée à chaque étape par une ligne pointillée."
    origine: areprog
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction
---

## Théorie

### Alimentation d'abord

Un calculateur dont l'alimentation est fausse ne peut rien faire correctement : on la contrôle
avant toute autre fonction [EXEMPLE : ordre pédagogique de l'académie]. L'ordre proposé suit la
méthode de diagnostic en cinq étapes de S01 (symptôme, hypothèses, mesurer pour départager, conclure sur une preuve, intervenir et valider) en commençant par les mesures sans risque :

1. **Inspection et protocole** : photos, inventaire, étages à tension élevée, décharge mesurée (S18-L01).
2. **Résistance des rails vers la masse**, carte hors tension, comparée à l'exemplaire de référence (S18-L02).
3. **Mise sous tension progressive**, courant relevé dans chaque état (S18-L01).
4. **Entrée et masses** : bornes 30, 15 et 31 au connecteur, puis après les protections d'entrée (S17-L02).
5. **Rails internes** : sortie de chaque convertisseur et régulateur (S15, S16).
6. **Reset et réveil** : sortie de la supervision, entrée de réveil (S15-L03, S17-L03).
7. **Fonctions** : seulement quand tout ce qui précède est conforme.

::figure{id=S18-F03}

### L'exemplaire de référence

La valeur attendue d'une tension, d'un courant ou d'une résistance de rail se lit sur un calculateur
sain de **même référence matérielle**, mesuré dans les mêmes conditions [HYPOTHÈSE : méthode
d'atelier, faute de valeurs publiées par le constructeur]. On ne déduit pas la valeur d'un composant
brûlé de sa mesure en circuit ni de ses voisins : on relève la même position sur la carte de
référence [HYPOTHÈSE : une mesure en circuit inclut les composants en parallèle].

### Pièges fréquents

- **Une résistance marquée « 0 »** est un pont de 0 Ω : elle peut fondre comme un fusible, mais n'a pas de calibre garanti [À VÉRIFIER : comportement en surcharge dans la fiche du fabricant de la résistance].
- **Injecter trop de courant** dans un rail détruit des composants sains ; la limite se justifie par le composant le plus faible [SOURCÉ : SRC-0051 §Procedure:].
- **Remplacer sans valider** : après réparation, on refait toutes les étapes de l'ordre des contrôles et l'on compare à la référence.

### Le dossier de diagnostic

Le dossier de réparation (S01) contient au minimum, pour un diagnostic d'alimentation
[EXEMPLE : trame de l'académie] :

- l'identification de la carte (référence lue, origine, état), sans identifiant de véhicule ni donnée client ;
- le symptôme constaté, avec les conditions ;
- chaque mesure : point de mesure, instrument, réglage, valeur lue, valeur de référence et son origine ;
- les hypothèses, dans l'ordre où elles ont été écartées ou retenues ;
- la conclusion, avec ses limites : ce qui est prouvé, ce qui reste `[À VÉRIFIER]` ;
- la réparation, puis la validation (mêmes mesures après réparation).

### Exemple 7 : un rail 5 V bas

Un calculateur consomme normalement borne 30 seule, mais contact mis son rail 5 V lit 3,1 V, contre 5,0 V sur la référence [EXEMPLE].

1. Ordre : entrée et masses d'abord ; elles sont conformes à la référence.
2. Hypothèses : régulateur en limitation à cause d'une charge en défaut, ou régulateur défaillant [HYPOTHÈSE].
3. Mesure qui départage : couper, mesurer la résistance du rail 5 V [EXEMPLE] vers la masse et la comparer à la référence (S15-L03).

### Exemple 8 : rédiger une conclusion prudente

Au TP-24, la caméra montre un condensateur chaud ; une fois retiré, le rail ne lit plus de court-circuit [EXEMPLE].

1. Prouvé : le court-circuit du rail passait par ce condensateur.
2. Non prouvé : la cause de sa défaillance ; elle s'écrit comme hypothèse.
3. Validation : après remplacement, résistance du rail et courant de chaque état comparés à la référence.

## Exercices

::exercice{id=S18-L03-EX01}

::exercice{id=S18-L03-EX02}
