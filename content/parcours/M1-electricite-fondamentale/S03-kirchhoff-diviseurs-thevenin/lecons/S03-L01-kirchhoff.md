---
id: S03-L01
titre: Nœuds, mailles, masse et lois de Kirchhoff
chapitre: S03
version: "0.1"
statut: brouillon
duree_min: 75
objectifs:
  - id: O1
    texte: Repérer les nœuds, les branches, les mailles et la référence de masse d'un circuit
    competences: [D2.3]
  - id: O2
    texte: Écrire la loi des nœuds et la loi des mailles sur un circuit à deux mailles et en déduire les courants et les tensions
    competences: [D2.3]
prerequis: [S02]
exercices: [S03-L01-EX01, S03-L01-EX02, S03-L01-EX03]
references: [SRC-0001]
criteres_evaluation:
  - objectif: O1
    critere: Questions du QCM sur les nœuds, les mailles et la masse réussies
  - objectif: O2
    critere: Au moins 2 réponses justes sur 3 aux exercices S03-L01-EX01 à EX03, unité comprise
figures:
  - id: S03-F01
    fichier: ../figures/S03-F01-deux-mailles.svg
    legende: "Circuit à deux mailles : la source U alimente R1 jusqu'au nœud A, d'où partent R2 et R3 vers la masse (nœud B, 0 V)."
    alt: "Schéma : une source U à gauche, une résistance R1 en haut jusqu'à un nœud A ; du nœud A, une résistance R2 descend vers la ligne du bas, et le fil continue à droite vers une résistance R3 qui descend aussi vers la ligne du bas. La ligne du bas porte le nœud B et un symbole de masse. Les zones de gauche et de droite sont étiquetées maille 1 et maille 2."
    origine: areprog
derniere_verification_sources: 2026-11-13
historique:
  - version: "0.1"
    date: 2026-11-13
    resume: Première rédaction
---

## Théorie

### Le vocabulaire d'un circuit

- Un **nœud** est un point où se rejoignent au moins trois conducteurs. Tous les fils reliés sans composant entre eux forment un seul nœud.
- Une **branche** relie deux nœuds ; elle est parcourue par un seul courant.
- Une **maille** est un chemin fermé qui part d'un nœud et y revient sans passer deux fois par le même nœud.
- La **masse** est le nœud choisi comme référence des tensions : on lui attribue 0 V par convention [SOURCÉ : SRC-0001 §1.2].
  Toutes les tensions du circuit se repèrent ensuite par rapport à elle. Une tension « en un point » est en réalité la tension entre ce point et la masse.

::figure{id=S03-F01}

Sur la figure, A et B sont des nœuds. Les branches sont : la source avec R1 (de B à A), R2 (de A
à B) et R3 (de A à B). On y voit deux mailles simples : source, R1, R2 (maille 1), et R2, R3
(maille 2).

### La loi des nœuds

La charge ne s'accumule pas dans un nœud : **la somme des courants qui entrent dans un nœud est
égale à la somme des courants qui en sortent** [SOURCÉ : SRC-0001 §1.2]. Sur la figure, au nœud A :

**I1 = I2 + I3**

C'est l'image du débit de charge vue en S02 : ce qui arrive par une branche repart par les autres.

### La loi des mailles

En faisant le tour d'une maille, **la somme des tensions, comptées avec leur signe, est nulle**
[SOURCÉ : SRC-0001 §1.2]. Méthode sûre :

1. Choisir un sens de parcours de la maille.
2. Compter positivement une tension qui « monte » (de − vers + d'une source) et négativement une chute dans une résistance parcourue dans le sens du courant.
3. Écrire que la somme vaut zéro.

Pour la maille 1 : **U − R1 × I1 − R2 × I2 = 0**. Pour la maille 2 : **R2 × I2 − R3 × I3 = 0**,
autrement dit R2 et R3 ont la même tension : elles sont en parallèle, ce qu'on savait déjà (S02).

### Pourquoi la masse compte à l'atelier

Sur un véhicule, la masse est le plus souvent la carrosserie, reliée à la borne négative de la
batterie. Une mauvaise liaison de masse se comporte comme une résistance en série dans la maille :
la loi des mailles dit alors que la tension « disponible » pour le récepteur diminue d'autant.
C'est le même raisonnement que le faisceau oxydé de S02, appliqué au retour du courant.

### Exemple 1 : résoudre un circuit à deux mailles

Sur la figure, U = 12 V, R1 = 1 kΩ, R2 = 2 kΩ et R3 = 3 kΩ [EXEMPLE].

1. R2 et R3 ont la même tension (maille 2) : elles sont en parallèle, R2 // R3 = (2 × 3) / (2 + 3) = 1,2 kΩ [EXEMPLE].
2. Le circuit se réduit à R1 en série avec 1,2 kΩ : Req = 1 + 1,2 = 2,2 kΩ [EXEMPLE].
3. I1 = 12 / 2 200 = 0,005 45 A, soit 5,45 mA [EXEMPLE].
4. Tension au nœud A : UA = 1 200 × 0,005 45 = 6,55 V [EXEMPLE].
5. I2 = 6,55 / 2 000 = 3,27 mA et I3 = 6,55 / 3 000 = 2,18 mA [EXEMPLE].

### Exemple 2 : vérifier avec les deux lois

On reprend les résultats de l'exemple 1 [EXEMPLE].

1. Loi des nœuds en A : I2 + I3 = 3,27 + 2,18 = 5,45 mA = I1 [EXEMPLE] : vérifiée.
2. Loi de la maille 1 : 12 − 1 000 × 0,005 45 − 6,55 = 12 − 5,45 − 6,55 = 0 V [EXEMPLE] : vérifiée.
3. Cette vérification prend une minute et détecte la plupart des erreurs de calcul : à faire systématiquement.

## Exercices

::exercice{id=S03-L01-EX01}

::exercice{id=S03-L01-EX02}

::exercice{id=S03-L01-EX03}
