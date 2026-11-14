---
id: S07-L03
titre: Lire une fiche technique et tester un passif hors circuit
chapitre: S07
version: "0.1"
statut: brouillon
duree_min: 90
objectifs:
  - id: O1
    texte: Retrouver la fiche technique d'un composant et y distinguer valeurs maximales absolues, conditions de fonctionnement et caractéristiques mesurées sous conditions
    competences: [D4.6]
  - id: O2
    texte: Tester une résistance et un condensateur hors circuit et conclure sur leur conformité avec la tolérance et l'incertitude
    competences: [D4.2]
  - id: O3
    texte: Expliquer pourquoi une mesure en circuit peut tromper, et décider quand il faut dessouder
    competences: [D4.2]
prerequis: [S07-L02]
exercices: [S07-L03-EX01, S07-L03-EX02]
references: [SRC-0017, SRC-0016]
criteres_evaluation:
  - objectif: O1
    critere: Questions du QCM sur la fiche technique réussies et une valeur maximale absolue relevée et citée au TP-10
  - objectif: O2
    critere: Exercice S07-L03-EX01 réussi
  - objectif: O3
    critere: Exercice S07-L03-EX02 réussi et mesures en circuit du TP-10 conclues avec prudence
figures:
  - id: S07-F03
    fichier: ../figures/S07-F03-structure-fiche.svg
    legende: "Structure type d'une fiche technique : description et caractéristiques principales, valeurs maximales absolues, conditions de fonctionnement recommandées, caractéristiques électriques avec leurs conditions de mesure, courbes, brochage et boîtier, empreinte de soudure. L'ordre et les titres varient selon le fabricant."
    alt: "Une colonne de sept blocs empilés, chacun avec un titre : description, valeurs maximales absolues, conditions de fonctionnement, caractéristiques électriques, courbes, brochage et boîtier, empreinte. Le bloc des valeurs maximales absolues est encadré d'un trait épais avec la mention : à ne jamais atteindre."
    origine: areprog
derniere_verification_sources: 2026-11-14
historique:
  - version: "0.1"
    date: 2026-11-14
    resume: Première rédaction
---

## Théorie

### Trouver la bonne fiche technique

1. Partir d'une identification sûre : référence complète dans la nomenclature, ou marquage décodé et confirmé par le schéma.
2. Télécharger la fiche **chez le fabricant**, ou chez un distributeur qui renvoie au document du fabricant ; noter sa référence et sa révision au journal, comme pour une fiche source de la bibliothèque.
3. Vérifier que la fiche correspond au boîtier réellement monté : un même nom de composant existe souvent en plusieurs boîtiers.

### La structure type

::figure{id=S07-F03}

Une fiche technique commence en général par une description et les caractéristiques
principales. Viennent ensuite des tableaux qu'il faut savoir distinguer :

- **Valeurs maximales absolues** (*Absolute Maximum Ratings*) : les limites à ne jamais dépasser.
- **Conditions de fonctionnement recommandées** : la plage dans laquelle le composant fonctionne comme annoncé.
- **Caractéristiques électriques** : des valeurs minimales, typiques et maximales, chacune mesurée **dans des conditions précisées** (température, tension, courant). Une valeur typique n'est pas garantie.
- Courbes, brochage, dimensions du boîtier et empreinte de soudure.

Pour une résistance CMS, la fiche Vishay D/CRCW e3 rassemble par exemple la puissance admissible et
la tension de service dans ses spécifications techniques, et les dimensions dans une rubrique
à part [SOURCÉ : SRC-0016 §Technical Specifications].

### Les valeurs maximales absolues

La note type d'une fiche Analog Devices le dit clairement [SOURCÉ : SRC-0017 §Absolute Maximum Ratings] :

- dépasser ces valeurs peut causer des **dommages permanents** au composant ;
- ce sont des valeurs de contrainte seulement : le fonctionnement **n'est pas garanti** à ces valeurs ;
- une exposition prolongée à ces valeurs peut affecter la **fiabilité**.

Conséquence d'atelier : on ne conçoit et on ne teste jamais « au maximum absolu ». On travaille
dans les conditions recommandées, et l'on se sert des valeurs maximales absolues pour juger si un
composant a pu être endommagé par une surcharge [HYPOTHÈSE].

### Tester une résistance hors circuit

Méthode de S04, appliquée à un composant dessoudé :

1. Corriger la résistance des cordons pour les faibles valeurs (S04-L01).
2. Choisir le plus petit calibre qui contient la valeur (S04-L01).
3. Calculer l'intervalle de mesure (lecture ± incertitude) et l'intervalle de tolérance ; conclure conforme, non conforme ou non concluant (S04-L02).

### Tester un condensateur hors circuit

- Le décharger d'abord, à travers une résistance, puis vérifier au voltmètre (S05-L01).
- Si le multimètre a une fonction capacimètre, mesurer et comparer à la tolérance de la fiche ; la fiche d'identité du multimètre (TP-06) dit s'il en a une, et avec quelle précision [À VÉRIFIER : fonction et précision du capacimètre, dans la notice du multimètre de l'atelier].
- Une capacité correcte ne prouve pas qu'un électrolytique est bon : son vieillissement se voit aussi sur sa résistance série (ESR), mesurée au testeur ESR / LCR en S16.

### Pourquoi une mesure en circuit peut tromper

En circuit, l'ohmmètre voit le composant **en parallèle** avec tout ce qui est relié à ses deux
bornes : la lecture est plus faible ou égale à la vraie valeur (S04-L01). Il en va de même pour un
condensateur, dont la mesure en circuit inclut les autres condensateurs et les résistances
voisines. Trois cas :

- la lecture en circuit est **conforme** : c'est un indice, pas une preuve ;
- elle est **plus faible** que la tolérance : composant défectueux **ou** composants en parallèle ; non concluant tant que le schéma n'a pas été lu ;
- elle est **plus forte** que la tolérance : le composant (ou sa soudure) est suspect, car un parallèle ne peut qu'abaisser la lecture [HYPOTHÈSE].

On dessoude une patte quand la conclusion compte (décision de remplacement) et que la mesure en
circuit ne peut pas trancher.

### Exemple 7 : lire une valeur maximale

Une fiche technique indique, dans ses valeurs maximales absolues, une tension d'alimentation de 6 V, et dans ses conditions recommandées une plage de 3,0 à 5,5 V [EXEMPLE].

1. Le composant est prévu pour fonctionner entre 3,0 et 5,5 V [EXEMPLE].
2. À 6 V [EXEMPLE], il peut être endommagé, et son fonctionnement n'est pas garanti.
3. Sur un banc, l'alimentation se règle dans la plage recommandée, jamais à la valeur maximale.

### Exemple 8 : conclure sur une résistance dessoudée

Une résistance marquée « 222 », tolérance 5 % d'après la nomenclature [EXEMPLE], est lue 2,23 kΩ hors circuit avec une incertitude de 0,03 kΩ [EXEMPLE].

1. Valeur nominale : 22 suivi de 2 zéros, soit 2,2 kΩ [EXEMPLE].
2. Tolérance : de 2,09 à 2,31 kΩ [EXEMPLE].
3. Intervalle de mesure : de 2,20 à 2,26 kΩ [EXEMPLE], entièrement dans la tolérance : **conforme**.

### Exemple 9 : une mesure en circuit plus forte que prévu

Une résistance marquée « 103 » [EXEMPLE] est lue 14,8 kΩ en circuit, carte hors tension et condensateurs déchargés [EXEMPLE].

1. Valeur nominale : 10 kΩ [EXEMPLE].
2. Un composant en parallèle ne peut qu'abaisser la lecture : 14,8 kΩ [EXEMPLE] ne s'explique pas ainsi.
3. Hypothèse : résistance dérivée ou soudure fissurée [HYPOTHÈSE], à confirmer en dessoudant une patte et en mesurant hors circuit, puis en inspectant le joint au microscope.

## Exercices

::exercice{id=S07-L03-EX01}

::exercice{id=S07-L03-EX02}
