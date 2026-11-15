---
id: S16-L02
titre: Ondulation, condensateurs et inductance
chapitre: S16
version: "0.1"
statut: brouillon
duree_min: 75
objectifs:
  - id: O1
    texte: Calculer l'ondulation de courant de l'inductance et l'ondulation de tension de sortie d'un buck, contribution de l'ESR comprise
    competences: [D6.2]
  - id: O2
    texte: Reconnaître les symptômes d'un condensateur ou d'une inductance défaillants
    competences: [D6.2]
prerequis: [S16-L01]
exercices: [S16-L02-EX01, S16-L02-EX02, S16-L02-EX03]
references: [SRC-0039, SRC-0040, SRC-0013]
criteres_evaluation:
  - objectif: O1
    critere: Exercices S16-L02-EX01 et EX02 réussis et ondulation mesurée comparée au calcul au TP-22
  - objectif: O2
    critere: Exercice S16-L02-EX03 réussi et ESR des condensateurs mesurée au TP-22
figures:
  - id: S16-F02
    fichier: ../figures/S16-F02-ondulation-esr.svg
    legende: "Ondulation de sortie d'un buck, allure sans valeur. En haut, condensateur sain : petite ondulation douce. En bas, même convertisseur avec un condensateur dont l'ESR a augmenté : l'ondulation est beaucoup plus grande et prend la forme en dents de scie du courant de l'inductance."
    alt: "Deux courbes l'une sous l'autre, même échelle. La première est une ondulation faible et arrondie autour d'une ligne horizontale marquée VOUT. La seconde est une dent de scie de grande amplitude autour de la même ligne, marquée ESR élevée."
    origine: areprog
derniere_verification_sources: 2026-11-14
historique:
  - version: "0.1"
    date: 2026-11-14
    resume: Première rédaction
---

## Théorie

### L'ondulation de courant de l'inductance

Pour un buck, l'ondulation de courant de l'inductance vaut
ΔIL = (VIN − VOUT) × D / (fS × L), avec fS la fréquence de découpage
[SOURCÉ : SRC-0040 §2 Calculate the Maximum Switch Current]. Plus l'inductance est grande, plus
l'ondulation est faible [SOURCÉ : SRC-0040 §3 Inductor Selection]. Le courant crête vaut le courant
de sortie plus ΔIL / 2 : c'est ce que l'inductance, le transistor et la diode doivent supporter
[SOURCÉ : SRC-0040 §2 Calculate the Maximum Switch Current]. Le courant nominal de l'inductance doit
dépasser ce courant crête [SOURCÉ : SRC-0040 §3 Inductor Selection].

### L'ondulation de tension de sortie

L'ondulation de courant traverse le condensateur de sortie et crée deux termes
[SOURCÉ : SRC-0040 §7 Output Capacitor Selection] :

- un terme capacitif : ΔVOUT = ΔIL / (8 × fS × COUT) ;
- un terme dû à la résistance série du condensateur : ΔVOUT(ESR) = ESR × ΔIL.

Avec des condensateurs électrolytiques, le terme ESR domine souvent [EXEMPLE : voir l'exemple 5]. On
utilise donc de préférence des condensateurs à faible ESR, céramiques X5R ou mieux
[SOURCÉ : SRC-0040 §7 Output Capacitor Selection].

### Les parasites des condensateurs

Tout condensateur a des éléments parasites [SOURCÉ : SRC-0039 §3.1 Capacitor Parasitics Affecting Switching Regulator Performance] :

- l'**ESR** fait chauffer le condensateur au passage du courant d'ondulation ; il peut défaillir si ce courant dépasse son maximum ;
- une ESR élevée donne une ondulation de sortie excessive et peut rendre la boucle instable ;
- l'ESR augmente très vite aux températures inférieures à environ 10 °C [SOURCÉ : SRC-0039 §3.1 Capacitor Parasitics Affecting Switching Regulator Performance] ;
- l'**ESL** (inductance série) limite l'efficacité aux hautes fréquences : on double les électrolytiques par des céramiques ou des films.

Un électrolytique aluminium s'use : son électrolyte peut s'évaporer jusqu'à la coupure [SOURCÉ : SRC-0013 §2-2-2 Failure Mode in the Field].
Sa durée de vie dépend de la température ambiante [SOURCÉ : SRC-0013 §2-9-3 Ambient Temperature and Life] et du courant d'ondulation [SOURCÉ : SRC-0013 §2-9-5 (courant d'ondulation)] (S05).

::figure{id=S16-F02}

### Symptômes d'un composant défaillant

- **Condensateur de sortie usé** : ondulation de sortie qui augmente, surtout à froid ; condensateur qui chauffe ; régulation instable [HYPOTHÈSE : déduit des effets de l'ESR, à confirmer en mesurant l'ESR].
- **Condensateur d'entrée usé** : la tension d'entrée du convertisseur ondule davantage [HYPOTHÈSE : à confirmer à l'oscilloscope et au testeur d'ESR].
- **Inductance défaillante** : une inductance coupée supprime la sortie ; une inductance qui sature ou dont l'inductance a baissé augmente l'ondulation et le courant crête [HYPOTHÈSE : déduit de la formule de ΔIL, à confirmer par la mesure].

L'ESR d'un condensateur se mesure au testeur d'ESR ou au pont LCR, condensateur déchargé
[À VÉRIFIER : conditions de mesure, en circuit ou hors circuit, dans la notice de l'instrument de l'atelier].

### Exemple 4 : ondulation de courant

Un buck passe de 12 V à 5 V, D = 0,46, fS = 500 kHz, L = 22 µH [EXEMPLE].

1. ΔIL = (12 − 5) × 0,46 / (500 × 10³ × 22 × 10⁻⁶) [EXEMPLE].
2. ΔIL ≈ 3,22 / 11 ≈ 0,29 A [EXEMPLE].
3. Pour 1 A de sortie, le courant crête vaut 1 + 0,29 / 2 ≈ 1,15 A [EXEMPLE].

### Exemple 5 : le poids de l'ESR

Même convertisseur, COUT = 22 µF [EXEMPLE].

1. Terme capacitif : 0,29 / (8 × 500 × 10³ × 22 × 10⁻⁶) ≈ 3,3 mV [EXEMPLE].
2. Avec ESR = 0,05 Ω : 0,05 × 0,29 ≈ 15 mV [EXEMPLE].
3. Condensateur vieilli, ESR = 0,5 Ω : 0,5 × 0,29 ≈ 145 mV [EXEMPLE] ; l'ondulation est multipliée par dix.

### Exemple 6 : une alimentation qui décroche par temps froid

Un calculateur se réinitialise au démarrage par temps froid, et fonctionne une fois chaud [EXEMPLE].

1. L'ESR des électrolytiques augmente très vite sous 10 °C [SOURCÉ : SRC-0039 §3.1 Capacitor Parasitics Affecting Switching Regulator Performance].
2. Hypothèse : un condensateur de sortie usé laisse passer une ondulation qui déclenche le reset de sous-tension [HYPOTHÈSE].
3. Vérification : mesurer l'ESR des condensateurs hors tension et déchargés, et l'ondulation à froid.

## Exercices

::exercice{id=S16-L02-EX01}

::exercice{id=S16-L02-EX02}

::exercice{id=S16-L02-EX03}
