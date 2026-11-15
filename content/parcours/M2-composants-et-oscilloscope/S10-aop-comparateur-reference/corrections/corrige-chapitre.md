# Corrigé du chapitre S10

Le corrigé de chaque exercice s'affiche dans la leçon après la réponse (fichiers
`S10-L01.yaml` à `S10-L03.yaml`) ; celui du QCM, après sa soumission.

## TP-15, montages à AOP et capteur ratiométrique

Partie A, alimentation ±12 V [EXEMPLE]. Suiveur : sortie égale à l'entrée à quelques millivolts près
[EXEMPLE]. Non inverseur, R2 = 22 kΩ et R1 = 10 kΩ [EXEMPLE] : gain 3,2 ; 1 V donne 3,2 V et 2 V
donne 6,4 V [EXEMPLE]. En montant l'entrée, la sortie plafonne près de VOH, en dessous de 12 V
[EXEMPLE]. Inverseur, R1 = 4,7 kΩ et R2 = 22 kΩ [EXEMPLE] : gain −4,68 ; 1 V donne −4,68 V
[EXEMPLE]. Le correcteur vérifie que l'écart est expliqué par les résistances mesurées et la
tension de décalage, et que la saturation est comparée à VOH.

Partie B : aucune valeur attendue n'est donnée. Le correcteur vérifie la fiche d'intervention
(véhicule par son code interne, batterie débranchée pendant les connexions, photos), la mesure de
l'alimentation et de la masse du capteur en plus du signal, et une interprétation fondée sur le
rapport signal / alimentation.

## TP-16, comparateur à hystérésis

Rx = Ry = 10 kΩ, Rh = 100 kΩ, alimentation 5 V [EXEMPLE]. Sans Rh : basculement vers 2,5 V dans les
deux sens [EXEMPLE], avec parfois plusieurs basculements si l'entrée est bruitée. Avec Rh :
basculement en montée vers 2,62 V et en descente vers 2,38 V [EXEMPLE]. Si la sortie n'atteint pas
5 V ou 0 V, les seuils se rapprochent ; le correcteur vérifie que l'apprenant recalcule les seuils
avec les tensions de sortie mesurées.
