---
id: S02-L03
titre: Valeurs réelles des résistances, code couleur, séries normalisées et tolérance
chapitre: S02
version: "0.1"
statut: brouillon
duree_min: 90
objectifs:
  - id: O1
    texte: Lire la valeur nominale et la tolérance d'une résistance à bagues à l'aide d'une table de couleurs sourcée
    competences: [D2.1]
  - id: O2
    texte: Calculer l'intervalle de valeurs admis par une tolérance et dire si une mesure est conforme
    competences: [D2.1, D2.2]
  - id: O3
    texte: Expliquer ce qu'est une série de valeurs normalisées E et le lien entre série et tolérance
    competences: [D2.1]
prerequis: [S02-L01]
exercices: [S02-L03-EX01, S02-L03-EX02]
references: [SRC-0006, SRC-0007]
criteres_evaluation:
  - objectif: O1
    critere: Exercice S02-L03-EX01 réussi et questions de lecture du code couleur du QCM réussies
  - objectif: O2
    critere: Exercice S02-L03-EX02 réussi et question de conformité du QCM réussie
  - objectif: O3
    critere: Questions du QCM sur les séries E réussies
figures:
  - id: S02-F03
    fichier: ../figures/S02-F03-bagues-resistance.svg
    legende: "Résistance à quatre bagues : deux chiffres, un multiplicateur, puis la tolérance. On lit depuis l'extrémité la plus proche des bagues. Figure sans couleur : la correspondance couleur, chiffre se lit dans la table."
    alt: "Corps de résistance horizontal avec ses deux fils. Trois bagues groupées à gauche, numérotées 1, 2 et 3 (chiffre, chiffre, multiplicateur), une quatrième bague isolée à droite, numérotée 4 (tolérance). Une flèche indique de commencer la lecture par l'extrémité proche des bagues."
    origine: areprog
derniere_verification_sources: 2026-11-13
historique:
  - version: "0.1"
    date: 2026-11-13
    resume: Première rédaction
---

## Théorie

### Valeur nominale et tolérance

Une résistance marquée 1 kΩ ne vaut pas exactement 1 000 Ω [EXEMPLE]. Le fabricant garantit une **valeur
nominale** et une **tolérance** : la valeur réelle se trouve dans l'intervalle
**nominale × (1 − tolérance)** à **nominale × (1 + tolérance)**.

Conséquence pour l'atelier : une mesure qui s'écarte un peu de la valeur marquée n'est pas
forcément un défaut. Avant de conclure, on calcule l'intervalle admis, puis on y ajoute
l'incertitude de l'instrument (étudiée en S04).

### Compléter les préfixes : nano et pico

Les condensateurs, et plus tard les temps de commutation, demandent deux préfixes de plus que
la leçon S02-L01 :

| Préfixe | Symbole | Facteur |
|---|---|---|
| nano | n | 10⁻⁹ = 0,000 000 001 |
| pico | p | 10⁻¹² = 0,000 000 000 001 |

Exemple de conversion : 100 nF = 100 × 10⁻⁹ F = 0,1 × 10⁻⁶ F = 0,1 µF [EXEMPLE]. Le farad (F),
unité de capacité, est étudié en S05.

### Les séries de valeurs normalisées

On ne trouve pas de résistances de toutes les valeurs : les fabricants produisent des **séries
de valeurs normalisées**, définies par la norme IEC 60063 pour les résistances et les
condensateurs [SOURCÉ : SRC-0006 §1 Scope]. Dans chaque série, les valeurs d'une décade suivent
une progression géométrique de raison égale à la racine r-ième de 10 [SOURCÉ : SRC-0006 §1 Scope].
La norme définit des séries à deux chiffres significatifs et des séries à trois chiffres
significatifs [SOURCÉ : SRC-0006 §4.1 et §4.2], et relie chaque série à des tolérances
[SOURCÉ : SRC-0006 §5.1, tableau 3].

Pourquoi une progression géométrique ? Pour la série E12, la raison vaut 10^(1/12), environ
1,21 [EXEMPLE] : chaque valeur est environ 21 % au-dessus de la précédente. Avec une tolérance
de l'ordre de ±10 %, les intervalles de deux valeurs voisines se touchent presque : la série
couvre toute la décade sans trou ni doublon inutile [HYPOTHÈSE].

Valeurs de la série E12, d'une décade, telles qu'elles sont couramment publiées :
10, 12, 15, 18, 22, 27, 33, 39, 47, 56, 68, 82
[À VÉRIFIER : à confirmer dans SRC-0006 tableau 1 (norme payante, à acheter)].
Les valeurs réelles s'obtiennent en multipliant par une puissance de 10 : 47 donne 4,7 Ω, 47 Ω, 470 Ω, 4,7 kΩ… [EXEMPLE].

### Le code couleur

Les résistances traversantes portent des **bagues de couleur** ; le code est défini par la
norme IEC 60062 [SOURCÉ : SRC-0007 §Resistor color codes]. Règles de lecture
[SOURCÉ : SRC-0007 §Resistor color codes] :

- commencer par la bague la plus proche d'une extrémité du corps ;
- **3 bagues** : deux chiffres et un multiplicateur, tolérance ±20 % ;
- **4 bagues** : on ajoute une bague de tolérance ;
- **5 bagues** : un troisième chiffre significatif, pour des valeurs plus précises ;
- **6 bagues** : on ajoute le coefficient de température, en ppm/°C.

::figure{id=S02-F03}

La table ci-dessous ne retient que les couleurs confirmées par les exemples de la source ; les
autres restent à vérifier dans la norme ou dans la documentation du fabricant de vos résistances.

| Couleur | Chiffre | Multiplicateur | Tolérance |
|---|---|---|---|
| Noir | 0 [SOURCÉ : SRC-0007, exemples 1R0 et 270K] | | |
| Marron | 1 [SOURCÉ : SRC-0007, exemples 1R0 et 1K5] | | |
| Rouge | 2 [SOURCÉ : SRC-0007, exemple 270K] | × 100 [SOURCÉ : SRC-0007, exemple 1K5] | |
| Orange | | × 1 000 [SOURCÉ : SRC-0007, exemple 270K] | |
| Vert | 5 [SOURCÉ : SRC-0007, exemple 1K5] | | |
| Violet | 7 [SOURCÉ : SRC-0007, exemple 270K] | | |
| Or | | × 0,1 [SOURCÉ : SRC-0007, exemple 1R0] | ±5 % [SOURCÉ : SRC-0007, exemple 1K5] |
| Argent | | | ±10 % [SOURCÉ : SRC-0007, exemple 270K] |
| Jaune, bleu, gris, blanc et les cases vides | à compléter [À VÉRIFIER : table complète dans IEC 60062 ou la documentation du fabricant des résistances de l'atelier] | | |

Une couleur se confond facilement (rouge, orange et marron sous un mauvais éclairage ; corps
de résistance de couleur proche d'une bague). Dans le doute, **la mesure hors circuit tranche**,
et le marquage se note [À VÉRIFIER] dans le journal tant qu'il n'est pas confirmé.

Les résistances CMS ne portent pas de bagues mais un marquage chiffré : il est étudié en S07.

### Exemple 7 : lire une résistance à quatre bagues

Bagues : marron, vert, rouge, or [SOURCÉ : SRC-0007, exemple 1K5].

1. Chiffres : marron = 1, vert = 5, soit 15 [SOURCÉ : SRC-0007, exemple 1K5].
2. Multiplicateur : rouge = × 100, soit 15 × 100 = 1 500 Ω = 1,5 kΩ [SOURCÉ : SRC-0007, exemple 1K5].
3. Tolérance : or = ±5 % [SOURCÉ : SRC-0007, exemple 1K5], soit ±75 Ω [EXEMPLE].
4. Intervalle admis : de 1 500 − 75 = 1 425 Ω à 1 500 + 75 = 1 575 Ω [EXEMPLE].

### Exemple 8 : lire une résistance à cinq bagues

Bagues : rouge, violet, noir, orange, argent [SOURCÉ : SRC-0007, exemple 270K].

1. Chiffres : 2, 7, 0, soit 270 [SOURCÉ : SRC-0007, exemple 270K].
2. Multiplicateur : orange = × 1 000, soit 270 000 Ω = 270 kΩ [SOURCÉ : SRC-0007, exemple 270K].
3. Tolérance : argent = ±10 %, soit ±27 kΩ [EXEMPLE].
4. Intervalle admis : de 243 kΩ à 297 kΩ [SOURCÉ : SRC-0007, exemple 270K].

### Exemple 9 : une mesure est-elle conforme ?

Une résistance marquée 4,7 kΩ ±5 % mesure 4,62 kΩ hors circuit [EXEMPLE].

1. Écart admis : 4 700 × 0,05 = 235 Ω [EXEMPLE].
2. Intervalle : de 4 700 − 235 = 4 465 Ω à 4 700 + 235 = 4 935 Ω [EXEMPLE].
3. 4 620 Ω est dans l'intervalle [EXEMPLE] : la résistance est conforme, sans même compter l'incertitude du multimètre.
4. Écart relatif à la nominale : (4 620 − 4 700) / 4 700 = −1,7 % [EXEMPLE].

## Exercices

::exercice{id=S02-L03-EX01}

::exercice{id=S02-L03-EX02}
