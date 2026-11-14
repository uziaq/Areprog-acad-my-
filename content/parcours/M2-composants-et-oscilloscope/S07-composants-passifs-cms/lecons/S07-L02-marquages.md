---
id: S07-L02
titre: Décoder le marquage d'une résistance CMS, et savoir quand il ne suffit pas
chapitre: S07
version: "0.1"
statut: brouillon
duree_min: 75
objectifs:
  - id: O1
    texte: Décoder un marquage de résistance CMS à 3 ou 4 caractères, y compris avec la lettre R
    competences: [D4.1]
  - id: O2
    texte: Décoder un marquage EIA-96 à l'aide de la table sourcée du fabricant
    competences: [D4.1]
  - id: O3
    texte: Dire ce qu'un marquage n'indique pas (tolérance, composant non marqué) et choisir la mesure qui lève le doute
    competences: [D4.1, D4.2]
prerequis: [S07-L01]
exercices: [S07-L02-EX01, S07-L02-EX02, S07-L02-EX03]
references: [SRC-0015]
criteres_evaluation:
  - objectif: O1
    critere: Exercice S07-L02-EX01 réussi et marquages décodés dans l'inventaire du TP-10
  - objectif: O2
    critere: Exercice S07-L02-EX02 réussi
  - objectif: O3
    critere: Exercice S07-L02-EX03 réussi et composants non marqués signalés comme tels au TP-10
figures:
  - id: S07-F02
    fichier: ../figures/S07-F02-marquages.svg
    legende: "Trois façons de marquer une résistance CMS : code à 3 caractères (chiffres significatifs puis nombre de zéros), lettre R tenant lieu de virgule, code EIA-96 (numéro de valeur puis lettre de multiplicateur), à décoder avec la table du fabricant."
    alt: "Trois rectangles représentant des résistances CMS vues de dessus, chacun avec un marquage générique : le premier porte trois chiffres, le deuxième deux chiffres séparés par la lettre R, le troisième deux chiffres suivis d'une lettre. Sous chacun, une flèche renvoie à la règle de lecture."
    origine: areprog
derniere_verification_sources: 2026-11-14
historique:
  - version: "0.1"
    date: 2026-11-14
    resume: Première rédaction
---

## Théorie

### Ce que dit la note du fabricant

La note technique TN004 de TT Electronics décrit le marquage des résistances CMS : quand la
place le permet, la valeur est inscrite en 3 ou 4 caractères [SOURCÉ : SRC-0015 §Marking Codes used on Chip Resistors].
Cette leçon s'appuie sur cette note ; un autre fabricant peut employer d'autres codes, et la
fiche technique de la série fait toujours foi.

::figure{id=S07-F02}

### Le code à chiffres

Les premiers chiffres sont les chiffres significatifs, le dernier est un **multiplicateur** :
le nombre de zéros à ajouter [SOURCÉ : SRC-0015 §Marking Codes used on Chip Resistors].

- « 472 » vaut 4 700 Ω, soit 4K7 [SOURCÉ : SRC-0015 §Marking Codes used on Chip Resistors].
- « 330 » vaut 33 Ω, et non 330 Ω [SOURCÉ : SRC-0015 §Marking Codes used on Chip Resistors] : le 0 final signifie « aucun zéro à ajouter ».
- « 1331 » vaut 1 330 Ω, soit 1K33 [SOURCÉ : SRC-0015 §Marking Codes used on Chip Resistors] : trois chiffres significatifs, puis le multiplicateur.

### La lettre R

Pour les faibles valeurs, la lettre **R** tient lieu de virgule [SOURCÉ : SRC-0015 §Marking Codes used on Chip Resistors] :
« 4R7 » vaut 4,7 Ω et « 34R8 » vaut 34,8 Ω [SOURCÉ : SRC-0015 §Marking Codes used on Chip Resistors].
C'est la même écriture que celle des schémas (S02).

### Le code EIA-96

Sur les petites puces, la place manque pour quatre caractères. Pour les valeurs de la série E96
en 0603, la note utilise le code EIA-96 : **deux chiffres suivis d'une lettre**
[SOURCÉ : SRC-0015 §Marking Codes used on Chip Resistors].

- Les deux chiffres sont un **numéro** (de 01 à 96) qui renvoie à une valeur dans la table ; ce ne sont pas des chiffres significatifs.
- La lettre est le **multiplicateur**.
- Exemple de la note : « 07B » vaut 1K15 [SOURCÉ : SRC-0015 §Marking Codes used on Chip Resistors].

Extrait de la table de la note, pour quelques numéros :

| Numéro | Lettre A | Lettre B (ou H) | Lettre C |
|---|---|---|---|
| 01 | 100 Ω [SOURCÉ : SRC-0015 §Marking Codes used on Chip Resistors] | 1,0 kΩ [SOURCÉ : SRC-0015 §Marking Codes used on Chip Resistors] | 10 kΩ [SOURCÉ : SRC-0015 §Marking Codes used on Chip Resistors] |
| 07 | 115 Ω [SOURCÉ : SRC-0015 §Marking Codes used on Chip Resistors] | 1,15 kΩ [SOURCÉ : SRC-0015 §Marking Codes used on Chip Resistors] | 11,5 kΩ [SOURCÉ : SRC-0015 §Marking Codes used on Chip Resistors] |
| 30 | 200 Ω [SOURCÉ : SRC-0015 §Marking Codes used on Chip Resistors] | 2,0 kΩ [SOURCÉ : SRC-0015 §Marking Codes used on Chip Resistors] | 20 kΩ [SOURCÉ : SRC-0015 §Marking Codes used on Chip Resistors] |
| 68 | 499 Ω [SOURCÉ : SRC-0015 §Marking Codes used on Chip Resistors] | 4,99 kΩ [SOURCÉ : SRC-0015 §Marking Codes used on Chip Resistors] | 49,9 kΩ [SOURCÉ : SRC-0015 §Marking Codes used on Chip Resistors] |

D'après cette table, la lettre A correspond à un facteur 1, B (ou H) à 10, C à 100, D à 1 000
et E à 10 000, R (ou X) à 0,1 et S (ou Y) à 0,01 [EXEMPLE : facteurs déduits de la table de SRC-0015, la note ne les écrit pas].
La table complète des 96 numéros se consulte dans la note : on ne la recopie pas, on la cite.

### Ce que le marquage ne dit pas

- La **tolérance** n'est pas marquée sur les résistances CMS [SOURCÉ : SRC-0015 §Marking Codes used on Chip Resistors] ; elle se lit dans la nomenclature ou la fiche technique.
- Les puces trop petites ne sont pas marquées : la note ne marque que « quand la place le permet » [SOURCÉ : SRC-0015 §Marking Codes used on Chip Resistors].
- Beaucoup de condensateurs CMS céramiques ne portent aucun marquage [À VÉRIFIER : absence de marquage des condensateurs céramiques CMS, à confirmer dans la fiche technique d'un fabricant].
- Un code de deux ou trois caractères sur un boîtier SOT ou SOD n'est **pas** un code de résistance : c'est un code d'identification propre au fabricant, à chercher dans ses tables.

Quand le marquage manque ou est douteux, on **mesure** hors circuit (leçon S07-L03), ou l'on
cherche la valeur dans le schéma et la nomenclature de la carte quand ils sont disponibles.
Jamais une valeur supposée « typique ».

### Exemple 4 : codes à chiffres

1. « 103 » : 10 suivi de 3 zéros, soit 10 000 Ω = 10 kΩ [EXEMPLE].
2. « 220 » : 22 suivi d'aucun zéro, soit 22 Ω [EXEMPLE].
3. « 4702 » : 470 suivi de 2 zéros, soit 47 000 Ω = 47 kΩ [EXEMPLE].
4. « 0R1 » : 0,1 Ω [EXEMPLE], une résistance de mesure de courant.

### Exemple 5 : code EIA-96

1. « 68C » : numéro 68, lettre C. La table donne 49K9 dans la colonne C [SOURCÉ : SRC-0015 §Marking Codes used on Chip Resistors], soit 49,9 kΩ.
2. « 01A » : numéro 01, lettre A, soit 100 Ω [SOURCÉ : SRC-0015 §Marking Codes used on Chip Resistors].
3. « 30B » et « 30H » se lisent de la même façon : 2,0 kΩ [SOURCÉ : SRC-0015 §Marking Codes used on Chip Resistors].

### Exemple 6 : un marquage ambigu

Une puce 0603 porte « 101 » [EXEMPLE].

1. En code à chiffres : 10 suivi d'un zéro, soit 100 Ω [EXEMPLE].
2. Le même composant pourrait aussi être un condensateur céramique marqué par son fabricant, ou un autre composant [HYPOTHÈSE].
3. On lève le doute par la sérigraphie de la carte (R ou C), le schéma, et une mesure hors circuit.

## Exercices

::exercice{id=S07-L02-EX01}

::exercice{id=S07-L02-EX02}

::exercice{id=S07-L02-EX03}
