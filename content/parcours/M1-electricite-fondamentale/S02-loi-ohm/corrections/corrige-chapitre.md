# Corrigé du chapitre S02

Le corrigé de chaque exercice s'affiche dans la leçon après la réponse (fichiers
`S02-L01.yaml` à `S02-L03.yaml`) ; celui du QCM, après sa soumission.

## TP-03, loi d'Ohm sur plaque d'essai

Valeurs attendues avec R1 = 1 kΩ et R2 = 2,2 kΩ [EXEMPLE] ; à recalculer avec les valeurs
mesurées hors circuit.

**Partie A.** Les points U(I) doivent s'aligner sur une droite qui passe par l'origine. Sa pente,
en volts par ampère, est la résistance de R1 : environ 1 000 Ω [EXEMPLE]. La valeur déduite de la
pente doit se trouver dans l'intervalle de tolérance de R1, élargi de l'incertitude du
multimètre ; sinon, l'écart doit être expliqué (valeur réelle de la résistance, lecture des
bagues, résistance de l'ampèremètre, calibre).

**Partie B.**

| Montage | Grandeur | Valeur attendue |
|---|---|---|
| Série, 10 V [EXEMPLE] | Courant | 3,125 mA [EXEMPLE] |
| Série, 10 V [EXEMPLE] | Tensions aux bornes de R1 et R2 | 3,125 V et 6,875 V [EXEMPLE], somme égale à la tension mesurée aux bornes de l'ensemble |
| Parallèle, 5 V [EXEMPLE] | Courant total | 7,27 mA [EXEMPLE], soit 5 mA dans R1 et 2,27 mA dans R2 [EXEMPLE] |

Analyse attendue : la règle de la série se vérifie par la somme des tensions, celle du
parallèle par la somme des courants de branche.
