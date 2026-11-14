---
id: S10-L03
titre: Référence de tension, convertisseur et capteurs ratiométriques
chapitre: S10
version: "0.1"
statut: brouillon
duree_min: 90
objectifs:
  - id: O1
    texte: Expliquer le rôle de la référence de tension d'un convertisseur analogique-numérique et l'effet de son erreur sur la mesure
    competences: [D4.5]
  - id: O2
    texte: Expliquer le principe d'une mesure ratiométrique et le conditionnement d'un capteur résistif ou ratiométrique alimenté en 5 V
    competences: [D4.5]
prerequis: [S10-L02]
exercices: [S10-L03-EX01, S10-L03-EX02, S10-L03-EX03]
references: [SRC-0026, SRC-0027]
criteres_evaluation:
  - objectif: O1
    critere: Exercices S10-L03-EX01 et EX02 réussis
  - objectif: O2
    critere: Exercice S10-L03-EX03 réussi et tension du capteur relevée et expliquée au TP-15
figures:
  - id: S10-F03
    fichier: ../figures/S10-F03-ratiometrique.svg
    legende: "Mesure ratiométrique : la même alimentation de 5 V alimente le capteur et sert de référence au convertisseur. À gauche, un capteur à trois fils (alimentation, signal, masse) ; à droite, un capteur résistif monté en pont diviseur avec une résistance de tirage."
    alt: "Une ligne d'alimentation 5 V en haut alimente trois éléments : un capteur à trois fils dont le fil de signal va vers l'entrée d'un convertisseur, une résistance de tirage en série avec un capteur résistif dont le point milieu va vers une autre entrée du convertisseur, et l'entrée de référence du convertisseur. Toutes les masses sont communes."
    origine: areprog
derniere_verification_sources: 2026-11-14
historique:
  - version: "0.1"
    date: 2026-11-14
    resume: Première rédaction
---

## Théorie

### Ce que fait un convertisseur analogique-numérique

Un calculateur lit ses capteurs analogiques avec un convertisseur analogique-numérique (CAN). Tous
les convertisseurs comparent la tension inconnue à une tension de **référence** connue
[SOURCÉ : SRC-0027 §Analog to Digital Converters (ADCs) as Resistance Devices]. Pour un
convertisseur de n bits, le code vaut environ (U_entrée / U_réf) × 2ⁿ : la mesure n'est
qu'un **rapport** entre l'entrée et la référence.

### Le rôle de la référence de tension

La référence est en général la tension la plus précise dont dispose le convertisseur
[SOURCÉ : SRC-0026 §1]. Son erreur continue se traduit par une **erreur de gain** de la mesure
[SOURCÉ : SRC-0026 §3] : si la référence est 1 % trop haute, toutes les tensions mesurées
paraissent 1 % trop basses [EXEMPLE].

La fiche d'une référence donne notamment :

- la **précision initiale**, l'écart à la valeur nominale à 25 °C ; les valeurs courantes vont de 0,05 % à 2 % [SOURCÉ : SRC-0026 §3.1] ;
- la **dérive en température**, en ppm/°C, souvent une moyenne sur la plage de température [SOURCÉ : SRC-0026 §3.2].

Une référence peut être intégrée au convertisseur ou au microcontrôleur, ou externe
[SOURCÉ : SRC-0026 §1]. Sur un calculateur, la référence du convertisseur et l'alimentation des capteurs se lisent sur le schéma [À VÉRIFIER : origine de la référence du convertisseur et de l'alimentation capteurs sur le schéma du calculateur étudié].

### La mesure ratiométrique

Un capteur résistif alimenté par la même tension que celle qui sert de référence au convertisseur
donne une sortie proportionnelle à cette tension : on dit qu'elle est **ratiométrique**
[SOURCÉ : SRC-0027 §Sensors and Resistive Sensing Elements]. Ce qui compte alors, c'est le rapport
entre la tension d'alimentation du capteur et la référence, pas leurs valeurs ; en les tirant de la
même source, ce rapport reste constant et la lecture ne dépend plus que de la grandeur mesurée
[SOURCÉ : SRC-0027 §Sensors that Are Ratiometric to the Supply Voltage]. Une référence précise n'est
alors plus nécessaire [SOURCÉ : SRC-0027 §Eliminating the Voltage Reference].

::figure{id=S10-F03}

Deux cas courants sur véhicule, donnés ici comme principes :

- **Capteur actif à trois fils** (alimentation 5 V, signal, masse), par exemple un capteur de pression ratiométrique : sa sortie est une fraction de son alimentation [EXEMPLE]. La relation entre pression et tension se lit dans la fiche du capteur ou la documentation du véhicule [À VÉRIFIER : courbe de sortie du capteur étudié].
- **Capteur résistif à deux fils**, par exemple un capteur de température à thermistance : il forme un pont diviseur avec une résistance de tirage reliée au 5 V dans le calculateur [EXEMPLE]. La tension du point milieu est, elle aussi, une fraction de l'alimentation.

Entre le capteur et le convertisseur, le calculateur ajoute souvent un filtre RC (S06), une
protection d'entrée (S08) ou un suiveur à AOP (S10-L01) [HYPOTHÈSE : conditionnement habituel, à lire sur le schéma de chaque entrée].

### Ce que cela change pour le dépanneur

- Une alimentation capteur un peu basse ne fausse pas une mesure ratiométrique si la référence la suit [SOURCÉ : SRC-0027 §Sensors that Are Ratiometric to the Supply Voltage] ; mais une tension de signal mesurée seule paraît alors anormale. On mesure toujours le signal **et** l'alimentation du capteur, et l'on raisonne sur leur rapport.
- Une alimentation capteur en court-circuit fait chuter tous les capteurs qui la partagent [HYPOTHÈSE], ce qui oriente vers le faisceau ou l'un des capteurs.

### Exemple 7 : lire le code d'un convertisseur

Un convertisseur de 10 bits a une référence de 5 V ; l'entrée vaut 2 V [EXEMPLE].

1. 2¹⁰ = 1 024 [EXEMPLE].
2. Code : 2 / 5 × 1 024 = 409,6, soit environ 410 [EXEMPLE].
3. Si la référence vaut en réalité 5,05 V [EXEMPLE], le code devient 2 / 5,05 × 1 024 = 405,5 [EXEMPLE] : la tension calculée par le logiciel est 1 % trop basse.

### Exemple 8 : un capteur ratiométrique sous une alimentation basse

Un capteur de pression fournit 50 % de son alimentation à une certaine pression [EXEMPLE].

1. Alimentation nominale 5 V : signal 2,5 V [EXEMPLE] ; rapport 0,5.
2. Alimentation tombée à 4,8 V [EXEMPLE], et référence du convertisseur tirée de la même source : signal 2,4 V [EXEMPLE] ; rapport toujours 0,5.
3. Le calculateur lit la même pression. Le dépanneur qui ne mesure que le signal croit à une dérive de 0,1 V [EXEMPLE] ; avec l'alimentation, il voit que le rapport est bon.

### Exemple 9 : erreur due à la dérive d'une référence

Une référence de 5 V a une dérive de 50 ppm/°C ; la température varie de 100 °C [EXEMPLE].

1. Variation relative : 50 × 10⁻⁶ × 100 = 0,005, soit 0,5 % [EXEMPLE].
2. Sur 5 V : 0,005 × 5 = 0,025 V = 25 mV [EXEMPLE].
3. Toutes les mesures non ratiométriques de ce convertisseur subissent cette erreur de gain.

## Exercices

::exercice{id=S10-L03-EX01}

::exercice{id=S10-L03-EX02}

::exercice{id=S10-L03-EX03}
