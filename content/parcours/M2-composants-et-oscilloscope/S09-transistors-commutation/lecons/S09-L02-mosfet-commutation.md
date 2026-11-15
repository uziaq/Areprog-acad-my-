---
id: S09-L02
titre: Le MOSFET canal N en commutation
chapitre: S09
version: "0.1"
statut: brouillon
duree_min: 90
objectifs:
  - id: O1
    texte: Expliquer VGS(th), RDS(on) et la diode interne d'un MOSFET canal N, et les retrouver dans sa fiche technique
    competences: [D4.4, D4.6]
  - id: O2
    texte: Calculer la chute de tension et la puissance dissipée par un MOSFET en conduction
    competences: [D4.4]
  - id: O3
    texte: Tester un MOSFET canal N hors circuit et interpréter le résultat
    competences: [D4.4, D4.2]
prerequis: [S09-L01]
exercices: [S09-L02-EX01, S09-L02-EX02, S09-L02-EX03]
references: [SRC-0020, SRC-0021, SRC-0022]
criteres_evaluation:
  - objectif: O1
    critere: Exercice S09-L02-EX02 réussi et valeurs de la fiche relevées au journal du TP-14
  - objectif: O2
    critere: Exercice S09-L02-EX01 réussi et RDS(on) calculée à partir de la mesure au TP-14
  - objectif: O3
    critere: Exercice S09-L02-EX03 réussi et MOSFET du TP-14 testé avant montage
figures:
  - id: S09-F02
    fichier: ../figures/S09-F02-mosfet.svg
    legende: "Le MOSFET canal N : grille (G), drain (D) et source (S), avec sa diode interne dont l'anode est côté source et la cathode côté drain. À droite, le MOSFET commande une charge côté masse ; une résistance de rappel tient la grille à la masse au repos."
    alt: "À gauche, le symbole d'un MOSFET canal N avec les lettres G, D et S, et une diode dessinée entre source et drain, cathode vers le drain. À droite, une alimentation positive, une charge, puis le drain ; la source va à la masse ; la grille reçoit la commande par une résistance série, et une résistance relie la grille à la masse."
    origine: areprog
derniere_verification_sources: 2026-11-14
historique:
  - version: "0.1"
    date: 2026-11-14
    resume: Première rédaction
---

## Théorie

### Un interrupteur commandé par une tension

Un MOSFET a trois broches : la **grille** (G), le **drain** (D) et la **source** (S). Le courant
commandé passe entre drain et source ; il est commandé par la tension entre grille et source,
VGS. La grille est isolée du reste du composant : en régime établi, elle ne consomme pratiquement
pas de courant, à la différence de la base d'un bipolaire. Ce chapitre traite le MOSFET **canal N
à enrichissement**, bloqué quand VGS est nulle.

::figure{id=S09-F02}

Une grille isolée peut flotter : une résistance de rappel vers la source la tient bloquée au
repos [HYPOTHÈSE : rôle habituel de cette résistance, à vérifier sur chaque schéma]. Cette isolation très fine rend aussi la grille sensible aux
décharges électrostatiques ; les MOSFET protégés intègrent d'ailleurs des écrêteurs ESD sur leur grille [SOURCÉ : SRC-0022 §General Topology]. Un MOSFET se manipule sur le poste ESD (S01).

### Les grandeurs de la fiche technique

La note onsemi AN-4163 explique les paramètres d'une fiche de MOSFET :

- **BVDSS**, tension de claquage drain-source, grille reliée à la source : à ne pas dépasser, en particulier avec une charge inductive [SOURCÉ : SRC-0020 §1].
- **VGS maximale** : toute tension de commande de grille doit rester en dessous [SOURCÉ : SRC-0020 §2].
- **VGS(th)**, tension de seuil : la tension de grille minimale pour faire passer un **petit** courant de drain, précisé dans la fiche ; elle est donnée en minimum, typique et maximum, et baisse quand la température monte [SOURCÉ : SRC-0020 §3].
- **RDS(on)**, résistance drain-source en conduction : donnée pour une VGS et un courant précis ; elle augmente quand VGS baisse et quand la température de jonction monte [SOURCÉ : SRC-0020 §4].
- **PD**, puissance dissipable : elle dépend du refroidissement et de la température [SOURCÉ : SRC-0020 §6].
- **VSD**, tension directe de la diode interne source-drain [SOURCÉ : SRC-0020 §15].

**Le piège de VGS(th).** À VGS(th), le MOSFET commence tout juste à conduire. Pour qu'il soit un
bon interrupteur fermé, il faut la VGS à laquelle la fiche garantit la RDS(on). Travailler près
du coude de la courbe RDS(on) en fonction de VGS augmente les pertes, et une petite variation de
VGS change alors beaucoup RDS(on) [SOURCÉ : SRC-0021 §Gate-to-Source Voltage Considerations].

### Chute de tension et pertes en conduction

En conduction, le MOSFET se comporte comme une petite résistance RDS(on) :

- chute de tension : U_DS = I × RDS(on) [SOURCÉ : SRC-0021 §Efficiency Considerations] ;
- pertes de conduction : P = I² × RDS(on) [SOURCÉ : SRC-0021 §Efficiency Considerations].

Ces pertes croissent avec le carré du courant. On prend la RDS(on) **maximale** de la fiche à la
VGS réellement appliquée, et l'on garde de la marge parce qu'elle augmente à chaud
[SOURCÉ : SRC-0020 §4].

### La diode interne

Entre source et drain, un MOSFET de puissance contient une diode, dite **diode interne** (*body
diode*), dont la fiche donne la tension directe VSD [SOURCÉ : SRC-0020 §15]. Pour un canal N, elle
conduit de la source vers le drain. Conséquences :

- un MOSFET ne bloque le courant que dans un sens ;
- au test de jonction, cette diode répond comme une diode ordinaire (S08-L01).

### Tester un MOSFET canal N hors circuit

Méthode d'atelier courante, à confirmer avec la fiche technique de la référence [HYPOTHÈSE] :

1. Composant sur le poste ESD, broches identifiées dans la fiche (le brochage n'est pas normalisé).
2. Relier un instant grille et source pour décharger la grille.
3. Test de jonction, pointe rouge sur la source et noire sur le drain : la diode interne affiche un seuil [HYPOTHÈSE]. Dans l'autre sens : dépassement.
4. Entre grille et source, et entre grille et drain : dépassement dans les deux sens, car la grille est isolée [HYPOTHÈSE].
5. Interprétation : drain-source proche de 0 V dans les deux sens après décharge de la grille, ou conduction entre la grille et une autre broche, fait penser à un MOSFET détruit [HYPOTHÈSE], à confirmer en comparant avec un composant neuf de même référence.

En circuit, les composants reliés au drain, à la source et à la grille faussent le test.

### Exemple 4 : pertes d'un MOSFET de commande

Un MOSFET dont la RDS(on) maximale vaut 20 mΩ à VGS = 10 V commande une charge de 5 A [EXEMPLE].

1. Chute de tension : 5 × 0,020 = 0,1 V [EXEMPLE].
2. Pertes : 5² × 0,020 = 0,5 W [EXEMPLE].
3. Un bipolaire saturé avec VCE(sat) = 0,3 V [EXEMPLE] dissiperait 5 × 0,3 = 1,5 W [EXEMPLE], et demanderait en plus un courant de base important.

### Exemple 5 : une tension de grille trop faible

Même MOSFET, mais la commande n'applique que VGS = 4,5 V [EXEMPLE]. On lit sur la courbe de la fiche une RDS(on) trois fois plus grande, soit 60 mΩ [EXEMPLE].

1. Pertes : 5² × 0,060 = 1,5 W [EXEMPLE], trois fois plus.
2. Un boîtier sans dissipateur qui tenait 0,5 W [EXEMPLE] peut ne plus tenir.
3. En dépannage : un MOSFET qui chauffe anormalement invite à mesurer VGS en fonctionnement [HYPOTHÈSE].

### Exemple 6 : calculer RDS(on) à partir d'une mesure

Au banc, un MOSFET conduit 2 A et l'on mesure 0,08 V entre drain et source [EXEMPLE].

1. RDS(on) = 0,08 / 2 = 0,04 Ω = 40 mΩ [EXEMPLE].
2. Pertes : 2 × 0,08 = 0,16 W [EXEMPLE].
3. On compare à la valeur de la fiche à la même VGS ; la mesure des faibles tensions demande de poser les pointes directement sur les broches.

## Exercices

::exercice{id=S09-L02-EX01}

::exercice{id=S09-L02-EX02}

::exercice{id=S09-L02-EX03}
