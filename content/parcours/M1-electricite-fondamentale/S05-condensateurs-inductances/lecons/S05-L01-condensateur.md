---
id: S05-L01
titre: Le condensateur, ses technologies et sa décharge en sécurité
chapitre: S05
version: "0.1"
statut: brouillon
duree_min: 75
objectifs:
  - id: O1
    texte: Calculer la capacité équivalente d'une association de condensateurs et convertir entre pF, nF et µF
    competences: [D2.5]
  - id: O2
    texte: Distinguer les technologies de condensateurs (céramique, film, électrolytique, tantale) et repérer la polarité d'un électrolytique
    competences: [D2.5]
  - id: O3
    texte: Décharger un condensateur à travers une résistance et vérifier la décharge par une mesure avant de le manipuler
    competences: [D2.5, D1.3]
prerequis: [S04]
exercices: [S05-L01-EX01, S05-L01-EX02, S05-L01-EX03]
references: [SRC-0009, SRC-0013]
criteres_evaluation:
  - objectif: O1
    critere: Exercices S05-L01-EX01 et EX02 réussis
  - objectif: O2
    critere: Questions du QCM sur les technologies et la polarité réussies
  - objectif: O3
    critere: Exercice S05-L01-EX03 réussi, questions « sécurité » du QCM réussies à 100 % et décharge mesurée au journal du TP-07
figures:
  - id: S05-F01
    fichier: ../figures/S05-F01-condensateur.svg
    legende: "Le condensateur : deux armatures séparées par un isolant (le diélectrique). Symbole non polarisé, et symbole polarisé de l'électrolytique avec sa borne +."
    alt: "À gauche, deux plaques parallèles séparées par une bande grisée nommée diélectrique, reliées chacune à un fil. Au centre, le symbole du condensateur non polarisé : deux traits parallèles. À droite, le symbole du condensateur polarisé : un trait droit marqué plus et un trait courbe."
    origine: areprog
derniere_verification_sources: 2026-11-14
historique:
  - version: "0.1"
    date: 2026-11-14
    resume: Première rédaction
---

## Théorie

### Ce qu'est un condensateur

Un condensateur est formé de deux armatures conductrices séparées par un isolant, le
**diélectrique**. Sous tension, il accumule une charge et stocke de l'énergie dans le champ
électrique entre ses armatures [SOURCÉ : SRC-0009 §Electric fields and capacitance].

::figure{id=S05-F01}

- Sa **capacité** C mesure sa faculté à stocker de l'énergie pour une tension donnée ; elle s'exprime en **farads** (F) [SOURCÉ : SRC-0009 §Electric fields and capacitance].
- La charge stockée vaut **Q = C × U**, et l'énergie **W = ½ × C × U²** [À VÉRIFIER : formules à relever dans SRC-0001, chapitre 1, section sur les condensateurs].
- Le farad est une unité énorme : en électronique, on rencontre surtout des µF, des nF et des pF (S02). Un microfarad vaut mille nanofarads, et un nanofarad mille picofarads.

Un condensateur garde sa charge après la coupure de l'alimentation ; il ne la perd que lentement,
par ses fuites internes [SOURCÉ : SRC-0009 §Electric fields and capacitance]. C'est le danger
annoncé en S01.

### Associer des condensateurs

Les règles sont **inversées** par rapport aux résistances (S02) [SOURCÉ : SRC-0009 §Series and parallel capacitors] :

- **en parallèle**, les capacités s'additionnent : C = C1 + C2 ;
- **en série**, elles diminuent : 1 / C = 1 / C1 + 1 / C2, soit pour deux condensateurs C = C1 × C2 / (C1 + C2).

### Les technologies

| Technologie | Polarité | Ce qu'il faut retenir |
|---|---|---|
| Céramique | Non polarisé [SOURCÉ : SRC-0009 §Practical considerations] | Petites valeurs, très répandu en CMS ; beaucoup ne portent aucun marquage (S07) |
| Film (plastique) | Non polarisé [SOURCÉ : SRC-0009 §Practical considerations] | Stable, plus encombrant |
| Électrolytique aluminium | **Polarisé** [SOURCÉ : SRC-0009 §Practical considerations] | Forte capacité ; s'use avec le temps et la chaleur |
| Tantale | Polarisé [À VÉRIFIER : polarité et règles d'emploi à relever dans la documentation d'un fabricant de condensateurs au tantale] | Forte capacité pour un petit volume [SOURCÉ : SRC-0009 §Practical considerations] |

Le repérage exact (bande, signe −, méplat) dépend du fabricant et du boîtier ; il se vérifie
dans la fiche technique [À VÉRIFIER : marquage de polarité selon le fabricant et le boîtier].

### Polarité et tension nominale de l'électrolytique

- Inverser la polarité d'un électrolytique peut détruire la très fine couche de diélectrique [SOURCÉ : SRC-0009 §Practical considerations]. Le courant augmente fortement, produit chaleur et gaz, et peut faire s'ouvrir la soupape de sécurité en peu de temps [SOURCÉ : SRC-0013 §2-3-2 Reverse Voltage].
- Au-dessus de sa tension nominale, son courant de fuite augmente fortement, et le risque de court-circuit entre les feuilles augmente avec la tension appliquée [SOURCÉ : SRC-0013 §2-3-3 Excess Voltage Application].
- Règle d'atelier : vérifier la polarité et choisir une tension nominale supérieure à la tension appliquée, **avant** la mise sous tension.

### Le vieillissement de l'électrolytique

- Sa défaillance est une **usure** [SOURCÉ : SRC-0013 §2-9-1 Foreword] : si le joint ne tient plus, l'électrolyte peut s'évaporer jusqu'à la coupure [SOURCÉ : SRC-0013 §2-2-2 Failure Mode in the Field].
- La chaleur l'accélère : la durée de vie double environ pour chaque baisse de 10 °C [SOURCÉ : SRC-0013 §2-9-3 Ambient Temperature and Life], selon la loi d'Arrhenius.
- Le courant d'ondulation l'échauffe par ses pertes internes, ce qui raccourcit encore sa vie [SOURCÉ : SRC-0013 §2-9-5 (courant d'ondulation)].

C'est pourquoi un électrolytique proche d'une source de chaleur, sur une carte de calculateur, est
un suspect classique [HYPOTHÈSE] ; il se teste au testeur ESR / LCR (S16), jamais « à l'œil » seul.

### Décharger en sécurité

1. Couper l'alimentation et débrancher la carte.
2. Décharger le condensateur **à travers une résistance**, jamais par un court-circuit franc. Le fabricant recommande une résistance de 100 Ω à 1 kΩ pour décharger ses condensateurs avant manipulation [SOURCÉ : SRC-0013 §2-7 Restriking Voltage].
3. **Mesurer** la tension aux bornes au voltmètre : une décharge se vérifie, elle ne se suppose pas (S01).
4. Mesurer à nouveau avant de manipuler : après décharge, un électrolytique peut voir réapparaître une tension à ses bornes, la **tension de recouvrement** [SOURCÉ : SRC-0013 §2-7 Restriking Voltage].

### Exemple 1 : parallèle et série

Deux condensateurs de 10 µF et 22 µF [EXEMPLE].

1. En parallèle : C = 10 + 22 = 32 µF [EXEMPLE].
2. En série : C = 10 × 22 / (10 + 22) = 220 / 32 = 6,9 µF [EXEMPLE], moins que le plus petit.

### Exemple 2 : convertir

Un condensateur CMS est marqué, dans sa fiche technique, 4,7 nF [EXEMPLE].

1. En picofarads : 4,7 × 1 000 = 4 700 pF [EXEMPLE].
2. En microfarads : 4,7 / 1 000 = 0,0047 µF [EXEMPLE].

### Exemple 3 : préparer une décharge

Un électrolytique est chargé à 12 V [EXEMPLE] ; on le décharge à travers 1 kΩ [EXEMPLE], la valeur haute recommandée par le fabricant.

1. Courant au premier instant : 12 / 1 000 = 12 mA [EXEMPLE].
2. Puissance au premier instant : 12 × 0,012 = 0,144 W [EXEMPLE] ; une résistance de 0,25 W [EXEMPLE] convient, car le courant diminue ensuite.
3. La durée de la décharge se calcule avec la constante de temps (leçon S05-L02) ; la fin se vérifie au voltmètre.

## Exercices

::exercice{id=S05-L01-EX01}

::exercice{id=S05-L01-EX02}

::exercice{id=S05-L01-EX03}
