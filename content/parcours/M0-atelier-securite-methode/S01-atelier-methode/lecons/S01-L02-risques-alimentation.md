---
id: S01-L02
titre: Risques de l'atelier, catégories de mesure et alimentation de laboratoire
chapitre: S01
version: "0.1"
statut: brouillon
duree_min: 75
objectifs:
  - id: O1
    texte: Choisir un multimètre et des cordons dont la catégorie de mesure convient à l'endroit où l'on mesure
    competences: [D1.2]
  - id: O2
    texte: Prévoir si une alimentation de laboratoire fonctionnera en tension constante ou en courant constant sur une charge résistive, et calculer sa tension de sortie
    competences: [D1.3, D3.2]
  - id: O3
    texte: Appliquer les règles de sécurité liées aux fumées de soudure, aux alliages, aux produits chimiques et à la chaleur
    competences: [D1.4]
prerequis: [S01-L01]
exercices: [S01-L02-EX01, S01-L02-EX02, S01-L02-EX03]
references: [SRC-0001, SRC-0004, SRC-0005]
criteres_evaluation:
  - objectif: O1
    critere: Exercice S01-L02-EX03 réussi et questions « sécurité » du QCM sur les catégories de mesure réussies à 100 %
  - objectif: O2
    critere: Exercices S01-L02-EX01 et EX02 réussis, puis TP-02 validé (passage en limitation de courant prouvé par photo et relevé)
  - objectif: O3
    critere: Questions « sécurité » du QCM sur les fumées, les alliages et les fiches de données de sécurité réussies à 100 %
figures:
  - id: S01-F02
    fichier: ../figures/S01-F02-caracteristique-cv-cc.svg
    legende: "Caractéristique de sortie d'une alimentation de laboratoire : palier en tension constante (CV) jusqu'au courant limite, puis courant constant (CC). La charge dont la droite passe par le coin bascule d'un mode à l'autre."
    alt: "Graphique tension en fonction du courant : une ligne horizontale à la tension réglée, du courant nul jusqu'au courant limite, puis une ligne verticale qui descend au courant limite. Un point marque le coin, appelé basculement. Une droite pointillée partant de l'origine passe par ce coin et représente la charge Rc."
    origine: areprog
derniere_verification_sources: 2026-11-13
historique:
  - version: "0.1"
    date: 2026-11-13
    resume: Première rédaction
---

## Théorie

### Les dangers réels de l'atelier

Le cursus travaille en basse tension, mais un atelier d'électronique automobile réunit
plusieurs dangers différents :

- **La batterie du véhicule** présente peu de risque d'électrocution dans des conditions normales [À VÉRIFIER : seuils de tension dangereuse en courant continu, à sourcer dans la réglementation applicable], mais elle peut débiter un courant énorme dans un court-circuit : une clé, une bague ou une pince qui relie les deux bornes chauffe au rouge et brûle. Bijoux et montre s'enlèvent avant d'intervenir près d'une batterie.
- **Le secteur** alimente les instruments (alimentation, oscilloscope, station de soudage).
  Dans ce cursus, on n'ouvre jamais un instrument et on ne mesure jamais sur le secteur.
- **L'énergie stockée dans les condensateurs** : un condensateur garde sa charge après la coupure.
  La règle du cursus est de **mesurer** sa tension avant de toucher une carte, jamais de supposer
  qu'un temps d'attente suffit. Le condensateur est étudié en S05.
- **La chaleur** : fer à souder, air chaud, composants surchargés (voir S02).

### Les catégories de mesure

Un multimètre peut recevoir, en plus de la tension mesurée, des surtensions brèves (transitoires)
venues du réseau. La norme IEC 61010 classe les endroits où l'on mesure en **catégories de
mesure** : plus on est proche de la source d'énergie, plus la catégorie est élevée et plus le
transitoire possible est dangereux [SOURCÉ : SRC-0004 §Shortcuts to understanding categories].

| Catégorie | Où l'on mesure (exemples de la note Fluke) |
|---|---|
| CAT I | Électronique protégée, sources haute tension de faible énergie [SOURCÉ : SRC-0004 §Overvoltage installation categories] |
| CAT II | Appareils branchés sur une prise, outils portatifs, prises [SOURCÉ : SRC-0004 §Overvoltage installation categories] |
| CAT III | Distribution triphasée et installations fixes : tableaux, moteurs, éclairage des grands bâtiments [SOURCÉ : SRC-0004 §Overvoltage installation categories] |
| CAT IV | Origine de l'installation : compteur, protection générale, branchement [SOURCÉ : SRC-0004 §Overvoltage installation categories] |

Règles de choix [SOURCÉ : SRC-0004 §Multiple categories] :

1. Choisir un instrument prévu pour la catégorie **la plus haute** dans laquelle on pourrait travailler.
2. À catégorie égale, la tension la plus élevée protège mieux. Mais la catégorie compte autant que la tension : un appareil CAT III 600 V résiste mieux aux transitoires qu'un appareil CAT II 1 000 V [SOURCÉ : SRC-0004 §When is 600 V more than 1000 V?].
3. Les cordons de mesure ont eux aussi une catégorie et une tension : au moins celles du multimètre [SOURCÉ : SRC-0004 §The bottom line].

Cette note date de 2002 : l'édition en vigueur de l'IEC 61010 reste à consulter
[À VÉRIFIER : édition en vigueur de l'IEC 61010-1 et de l'IEC 61010-031 pour les cordons].
Les circuits basse tension d'un véhicule ne sont pas raccordés au secteur ; la catégorie de votre
multimètre compte dès qu'il sert aussi sur une prise ou un tableau de l'atelier
[À VÉRIFIER : classement des circuits de véhicule dans l'édition en vigueur de l'IEC 61010].

### Le piège des bornes de courant

Dans l'exemple de la note Fluke, l'entrée tension présente environ 10 MΩ et l'entrée 10 A environ 0,01 Ω [SOURCÉ : SRC-0004 §Protection against two major electrical hazards]. Des cordons laissés dans les bornes de courant puis
posés aux bornes d'une source font de l'appareil un court-circuit, **même si le sélecteur est
sur volts** [SOURCÉ : SRC-0004 §Protection against two major electrical hazards]. Un fusible grillé se remplace uniquement par le modèle
indiqué par le fabricant du multimètre [SOURCÉ : SRC-0004 §Use the right high-energy fuses].

Réflexe : avant chaque mesure de tension, regarder **les bornes** autant que le sélecteur.

### L'alimentation de laboratoire : tension constante et courant constant

Une alimentation de laboratoire se règle avec deux consignes : une tension U réglée et un
courant limite I limite. Elle fonctionne dans l'un de deux modes
[SOURCÉ : SRC-0005 §Constant Voltage (CV) Mode et §Constant Current (CC) Mode] :

- **Tension constante (CV)** : tant que la charge demande moins que le courant limite, la sortie
  garde la tension réglée.
- **Courant constant (CC)** : si la charge demanderait plus que le courant limite, l'alimentation
  abaisse sa tension pour que le courant reste égal à la limite.

::figure{id=S01-F02}

Avec la loi d'Ohm (I = U / R) [SOURCÉ : SRC-0001 §1.2], on trouve la résistance de charge pour
laquelle les deux consignes sont atteintes en même temps, appelée ici **résistance de basculement** :

**Rc = U réglée / I limite**

- Charge **plus grande** que Rc : courant inférieur à la limite, mode CV, sortie = U réglée.
- Charge **plus petite** que Rc : mode CC, le courant vaut I limite et la sortie vaut **U = I limite × R**.

La loi d'Ohm est approfondie en S02 ; ici, on l'utilise seulement pour prévoir le mode.

C'est cette limitation qui protège une carte en panne : un court-circuit sur la carte ne
reçoit que le courant limite, au lieu de tout ce que la source peut fournir. La limite se
règle **avant** de brancher la carte, puis s'écrit au journal (règle de tous les TP).

### Exemple 3 : prévoir le mode d'une alimentation

L'alimentation est réglée sur 5 V et 0,2 A ; elle alimente une résistance de 10 Ω [EXEMPLE].

1. Résistance de basculement : Rc = 5 / 0,2 = 25 Ω [EXEMPLE].
2. La charge de 10 Ω est plus petite que 25 Ω [EXEMPLE] : l'alimentation passe en courant constant.
3. Courant : 0,2 A ; tension de sortie : U = 0,2 × 10 = 2 V [EXEMPLE], et non 5 V.
4. Puissance dissipée dans la résistance : P = U × I = 2 × 0,2 = 0,4 W [EXEMPLE].

Si l'on monte la limite à 0,6 A [EXEMPLE], Rc = 5 / 0,6 ≈ 8,3 Ω [EXEMPLE] : la charge de 10 Ω est
plus grande, l'alimentation repasse en CV, U = 5 V et I = 5 / 10 = 0,5 A [EXEMPLE].

### Exemple 4 : choisir une limite de courant

Une carte d'essai doit consommer environ 40 mA sous 12 V d'après son calcul [EXEMPLE].

1. On règle la limite un peu au-dessus de la consommation prévue, par exemple 60 mA [EXEMPLE], pour que la carte fonctionne normalement en CV.
2. En cas de court-circuit, la source ne fournira pas plus de 60 mA [EXEMPLE] : l'énergie envoyée dans le défaut reste faible.
3. Si l'alimentation passe en CC dès la mise sous tension, on **coupe** et on cherche pourquoi la carte consomme plus que prévu : on n'augmente pas la limite « pour voir ».

### Fumées, alliages, produits et chaleur

Les règles ci-dessous sont celles du cursus (catalogue des TP). Les obligations réglementaires
de l'atelier restent à vérifier [À VÉRIFIER : réglementation applicable aux fumées de soudure et au plomb en atelier].

- **Fumées de flux** : aspiration à la source, au plus près de la panne, à chaque séance de soudure.
- **Alliages au plomb** : se laver les mains après la séance ; ni nourriture ni boisson au poste.
- **Produits** (alcool isopropylique, décapants de vernis, bombe de froid, flux) : lire la fiche de
  données de sécurité (FDS) de **chaque** produit avant le premier usage, et la ranger dans le classeur de l'atelier.
- **Chaleur** : le fer repose toujours sur son support ; l'air chaud ne s'approche pas des
  condensateurs électrolytiques ni des connecteurs sans protection ; un composant suspect se
  laisse refroidir avant d'être touché.

## Exercices

::exercice{id=S01-L02-EX01}

::exercice{id=S01-L02-EX02}

::exercice{id=S01-L02-EX03}
