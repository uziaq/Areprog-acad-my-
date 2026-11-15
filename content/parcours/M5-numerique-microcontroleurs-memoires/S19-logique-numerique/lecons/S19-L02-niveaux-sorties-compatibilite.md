---
id: S19-L02
titre: Niveaux logiques, sorties et compatibilité 3,3 V / 5 V
chapitre: S19
version: "0.1"
statut: brouillon
duree_min: 90
objectifs:
  - id: O1
    texte: Lire les niveaux VIL, VIH, VOL, VOH d'une fiche et calculer une marge de bruit
    competences: [D7.1]
  - id: O2
    texte: Distinguer sortie push-pull, sortie trois états et sortie à collecteur ou drain ouvert, et le rôle des résistances de tirage
    competences: [D7.1]
  - id: O3
    texte: Vérifier la compatibilité entre un circuit 3,3 V et un circuit 5 V à l'aide des trois conditions d'interface
    competences: [D7.1]
prerequis: [S19-L01]
exercices: [S19-L02-EX01, S19-L02-EX02, S19-L02-EX03]
references: [SRC-0052, SRC-0053, SRC-0054]
criteres_evaluation:
  - objectif: O1
    critere: Exercice S19-L02-EX01 réussi et seuils mesurés comparés à la fiche au TP-26
  - objectif: O2
    critere: Exercice S19-L02-EX02 réussi et rôle des résistances de tirage expliqué au TP-27
  - objectif: O3
    critere: Exercice S19-L02-EX03 réussi
figures:
  - id: S19-F02
    fichier: ../figures/S19-F02-niveaux.svg
    legende: "Niveaux logiques d'une sortie et d'une entrée, côte à côte : la sortie garantit un niveau haut au-dessus de VOH et un niveau bas sous VOL ; l'entrée reconnaît un niveau haut au-dessus de VIH et un niveau bas sous VIL. Entre VIL et VIH, la zone est indéterminée. Les écarts VOH − VIH et VIL − VOL sont les marges de bruit. Allure sans valeur."
    alt: "Deux barres verticales. À gauche, sortie : zone haute au-dessus de VOH, zone basse sous VOL. À droite, entrée : zone haute au-dessus de VIH, zone indéterminée entre VIH et VIL, zone basse sous VIL. Des flèches entre les barres marquent les marges de bruit haute et basse."
    origine: areprog
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction
---

## Théorie

### Niveaux logiques et marge de bruit

Une porte réelle ne fournit pas exactement 0 V et la tension d'alimentation : sa fiche donne des plages [SOURCÉ : SRC-0052 §Logic signal voltage levels] :

- **VIL** : tension d'entrée maximale reconnue comme 0 ; **VIH** : tension d'entrée minimale reconnue comme 1 ;
- **VOL** : tension de sortie maximale garantie à l'état 0 ; **VOH** : tension de sortie minimale garantie à l'état 1 ;
- entre VIL et VIH, la réponse de la porte n'est pas garantie [SOURCÉ : SRC-0052 §Logic signal voltage levels].

La **marge de bruit** est l'écart entre ce que la sortie garantit et ce que l'entrée exige :
VOH − VIH au niveau haut, VIL − VOL au niveau bas [SOURCÉ : SRC-0052 §Logic signal voltage levels].

::figure{id=S19-F02}

Exemple de la source : une porte TTL alimentée en 5 V accepte 0 à 0,8 V comme 0 et 2 à 5 V comme 1 [SOURCÉ : SRC-0052 §Logic signal voltage levels].
Elle garantit 0,5 V au plus à l'état bas et 2,7 V au moins à l'état haut [SOURCÉ : SRC-0052 §Logic signal voltage levels].
Une porte CMOS alimentée en 5 V a des seuils liés à sa tension d'alimentation, 0,3 × VCC et 0,7 × VCC [SOURCÉ : SRC-0053 §1 Introduction].
Les valeurs d'un composant réel se lisent dans **sa** fiche, à sa tension d'alimentation et à son
courant de sortie [À VÉRIFIER : fiche du composant utilisé].

Le seuil réel de basculement se trouve quelque part dans la zone indéterminée ; avec du bruit sur
une entrée lente, la sortie peut osciller [SOURCÉ : SRC-0052 §Logic signal voltage levels]. Une entrée
à hystérésis (trigger de Schmitt) évite ce défaut [SOURCÉ : SRC-0052 §Logic signal voltage levels].

### Les types de sortie

- **Push-pull** (totem) : la sortie fournit du courant à l'état haut et en absorbe à l'état bas [SOURCÉ : SRC-0052 §Special-output gates].
- **Trois états** : en plus des états haut et bas, la sortie peut être déconnectée (haute impédance) par une entrée de validation ; plusieurs sorties peuvent alors partager une même ligne, une seule active à la fois [SOURCÉ : SRC-0052 §Special-output gates].
- **Collecteur ouvert ou drain ouvert** : la sortie ne sait que tirer la ligne vers la masse ; une **résistance de tirage** (*pull-up*) vers l'alimentation donne le niveau haut. Plusieurs sorties de ce type sur une même ligne réalisent un ET câblé : c'est le principe du bus I²C [SOURCÉ : SRC-0054 §3.1.1 SDA and SCL signals].

Une sortie à drain ouvert permet de changer de niveau : la résistance de tirage se relie à la tension
du récepteur [SOURCÉ : SRC-0053 §3 Open-Drain Devices]. Plus la résistance est grande, plus le front
montant est lent [SOURCÉ : SRC-0053 §3.1 Application Example − Level Translation Using the SN74LVC2G07].
On ne met pas de résistance de tirage sur la sortie d'un circuit CMOS push-pull pour en changer le
niveau [SOURCÉ : SRC-0053 §3.2 Do Not Use Pullup Resistors at Outputs of CMOS Drivers].

Une **résistance de rappel** vers la masse (*pull-down*) ou vers l'alimentation fixe aussi le niveau
d'une entrée qui n'est reliée à rien : une entrée CMOS flottante a un état indéterminé
[HYPOTHÈSE : comportement général des entrées CMOS, à vérifier dans la fiche].

### Compatibilité 3,3 V / 5 V

Deux circuits communiquent correctement si trois conditions sont remplies
[SOURCÉ : SRC-0053 §1 Introduction] :

1. VOH de l'émetteur supérieure à VIH du récepteur ;
2. VOL de l'émetteur inférieure à VIL du récepteur ;
3. tension de sortie de l'émetteur sous la tension que l'entrée du récepteur supporte.

Exemples de la note TI : un circuit 3,3 V de type LVTTL garantit VOH de 2,4 V [SOURCÉ : SRC-0053 §1 Introduction].
Un récepteur CMOS 5 V demande VIH de 0,7 × VCC, soit 3,5 V [SOURCÉ : SRC-0053 §1 Introduction].
La condition 1 n'est pas remplie : il faut un translateur de niveau.
Dans l'autre sens, une sortie 5 V peut dépasser la tension admise par une entrée 3,3 V, sauf si cette entrée est tolérante au 5 V selon sa fiche [SOURCÉ : SRC-0053 §5 Overvoltage-Tolerant Devices].

### Exemple 4 : marge de bruit

Une sortie garantit VOH = 2,7 V et VOL = 0,5 V ; l'entrée qu'elle commande demande VIH = 2 V et VIL = 0,8 V [EXEMPLE].

1. Marge haute : 2,7 − 2 = 0,7 V [EXEMPLE].
2. Marge basse : 0,8 − 0,5 = 0,3 V [EXEMPLE].
3. Un parasite de plus de 0,3 V [EXEMPLE] sur un niveau bas peut être lu comme un 1.

### Exemple 5 : un 3,3 V vers un 5 V

Un microcontrôleur 3,3 V garantit VOH = 2,4 V ; il commande une entrée CMOS alimentée en 5 V [EXEMPLE].

1. VIH du récepteur : 0,7 × 5 = 3,5 V [EXEMPLE].
2. 2,4 V < 3,5 V [EXEMPLE] : le niveau haut n'est pas garanti.
3. Solution : un translateur de niveau, ou un récepteur à entrées compatibles TTL, selon les fiches [SOURCÉ : SRC-0053 §6 Devices With TTL-Compatible Inputs].

### Exemple 6 : une ligne qui reste basse

Sur une ligne à drain ouvert, la tension reste à 0 V même quand aucune sortie n'est active [EXEMPLE].

1. Hypothèses : résistance de tirage absente ou coupée, ou un circuit qui maintient la ligne basse [HYPOTHÈSE].
2. Mesure hors tension : résistance entre la ligne et l'alimentation.
3. Sous tension : débrancher ou isoler les circuits un par un, si la carte le permet.

## Exercices

::exercice{id=S19-L02-EX01}

::exercice{id=S19-L02-EX02}

::exercice{id=S19-L02-EX03}
