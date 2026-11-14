---
id: S03-L02
titre: Diviseurs de tension et de courant, effet de la charge
chapitre: S03
version: "0.1"
statut: brouillon
duree_min: 90
objectifs:
  - id: O1
    texte: Calculer la tension de sortie d'un diviseur de tension à vide et dimensionner un diviseur pour une tension voulue
    competences: [D2.3]
  - id: O2
    texte: Prévoir la tension de sortie d'un diviseur chargé et juger si la charge est négligeable
    competences: [D2.3]
  - id: O3
    texte: Calculer la répartition du courant dans un diviseur de courant à deux branches
    competences: [D2.3]
prerequis: [S03-L01]
exercices: [S03-L02-EX01, S03-L02-EX02, S03-L02-EX03, S03-L02-EX04]
references: [SRC-0001]
criteres_evaluation:
  - objectif: O1
    critere: Exercices S03-L02-EX01 et EX02 réussis
  - objectif: O2
    critere: Exercice S03-L02-EX03 réussi et TP-04 validé (tensions à vide et chargées mesurées, écarts expliqués)
  - objectif: O3
    critere: Exercice S03-L02-EX04 réussi
figures:
  - id: S03-F02
    fichier: ../figures/S03-F02-diviseur-charge.svg
    legende: "Diviseur de tension : R1 et R2 en série entre Ue et la masse ; la sortie Us est prise au point commun. Une charge RL (en pointillé) branchée sur la sortie se met en parallèle sur R2."
    alt: "Schéma vertical : l'entrée Ue en haut, R1, puis un point de sortie Us, puis R2 vers la masse. Depuis le point de sortie, un fil part à droite vers une résistance de charge RL dessinée en pointillé, elle aussi reliée à la masse."
    origine: areprog
derniere_verification_sources: 2026-11-13
historique:
  - version: "0.1"
    date: 2026-11-13
    resume: Première rédaction
---

## Théorie

### Le diviseur de tension à vide

Deux résistances en série sous une tension Ue sont traversées par le même courant
I = Ue / (R1 + R2). La tension aux bornes de R2 vaut donc [SOURCÉ : SRC-0001 §1.2] :

**Us = Ue × R2 / (R1 + R2)**

C'est la formule du **diviseur de tension**, valable tant qu'aucun courant ne sort par la
sortie (« à vide »). Le rapport R2 / (R1 + R2) est toujours inférieur à 1 : un diviseur abaisse
une tension, il ne l'élève jamais.

::figure{id=S03-F02}

### Dimensionner un diviseur

Pour obtenir Us à partir de Ue, on choisit d'abord R2 (ou le courant de repos voulu), puis on
isole R1 :

**R1 = R2 × (Ue − Us) / Us**

On prend ensuite la valeur normalisée la plus proche (S02) et on recalcule Us : l'écart dû à
l'arrondi s'ajoute à celui des tolérances.

### Le diviseur chargé

Si l'on branche une charge RL sur la sortie, elle se met **en parallèle sur R2**. Le diviseur
devient R1 en série avec R2 // RL, et la sortie baisse [SOURCÉ : SRC-0001 §1.2] :

**Us chargée = Ue × (R2 // RL) / (R1 + R2 // RL)**

Règle pratique : tant que RL est très grande devant R2 (au moins cent fois plus grande, par
exemple), la baisse reste faible [EXEMPLE]. Ce critère se vérifie toujours par le calcul : la
leçon S03-L03 montre comment chiffrer la baisse d'un coup, avec le modèle de Thévenin.

### Les diviseurs d'entrée d'un calculateur

Un calculateur ne lit pas directement la tension du réseau de bord sur son convertisseur analogique-numérique, qui accepte une plage plus faible [À VÉRIFIER : plage d'entrée dans la datasheet du microcontrôleur relevé sur la carte étudiée].
On trouve donc souvent, sur les entrées, un diviseur de tension qui ramène la tension mesurée
dans cette plage. Les valeurs de résistances d'un calculateur réel ne sont pas publiées : elles se
relèvent sur la carte (S13) et restent [À VÉRIFIER] tant qu'elles ne sont pas confirmées.

### Le diviseur de courant

Deux résistances en parallèle ont la même tension ; le courant total I se partage en raison
inverse des résistances [SOURCÉ : SRC-0001 §1.2] :

**I1 = I × R2 / (R1 + R2)** et **I2 = I × R1 / (R1 + R2)**

Attention à l'inversion : la branche de **plus faible** résistance reçoit le **plus grand**
courant. Contrôle : I1 + I2 = I (loi des nœuds).

### Exemple 3 : diviseur à vide

Ue = 12 V, R1 = 10 kΩ, R2 = 4,7 kΩ [EXEMPLE].

1. Us = 12 × 4,7 / (10 + 4,7) = 12 × 4,7 / 14,7 [EXEMPLE].
2. Us = 12 × 0,32 = 3,84 V [EXEMPLE].
3. Courant de repos : I = 12 / 14 700 = 0,82 mA [EXEMPLE].

### Exemple 4 : le même diviseur chargé

On branche RL = 10 kΩ sur la sortie de l'exemple 3 [EXEMPLE].

1. R2 // RL = (4,7 × 10) / (4,7 + 10) = 47 / 14,7 = 3,20 kΩ [EXEMPLE].
2. Us chargée = 12 × 3,20 / (10 + 3,20) = 12 × 0,242 = 2,91 V [EXEMPLE].
3. La sortie passe de 3,84 V à 2,91 V [EXEMPLE] : baisse de 24 %, la charge n'est pas du tout négligeable.
4. Avec RL = 1 MΩ, R2 // RL = 4,68 kΩ et Us = 3,82 V [EXEMPLE] : baisse inférieure à 0,5 %.

### Exemple 5 : dimensionner un diviseur

On veut 5 V à partir de 12 V, avec R2 = 10 kΩ [EXEMPLE].

1. R1 = 10 × (12 − 5) / 5 = 14 kΩ [EXEMPLE].
2. Contrôle : Us = 12 × 10 / (14 + 10) = 5,0 V [EXEMPLE].
3. 14 kΩ [EXEMPLE] n'appartient pas forcément à la série disponible à l'atelier : prendre la valeur normalisée la plus proche, puis recalculer Us.

## Exercices

::exercice{id=S03-L02-EX01}

::exercice{id=S03-L02-EX02}

::exercice{id=S03-L02-EX03}

::exercice{id=S03-L02-EX04}
