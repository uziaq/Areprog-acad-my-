# Corrigé du chapitre S08

Le corrigé de chaque exercice s'affiche dans la leçon après la réponse (fichiers
`S08-L01.yaml` à `S08-L03.yaml`) ; celui du QCM, après sa soumission.

## TP-11, caractéristique d'une diode

Avec une diode au silicium et R = 1 kΩ [EXEMPLE] : courant pratiquement nul sous environ 0,5 V,
puis montée rapide ; vers 0,7 V [EXEMPLE] pour quelques milliampères. En inverse sous 10 V
[EXEMPLE], le courant de fuite est en général trop faible pour être lu. Le correcteur vérifie que
le seuil est relevé à un courant précisé et comparé à la fiche au même courant.

## TP-12, Zener et TVS

Partie A, alimentation 12 V, Zener 5,1 V et résistance 680 Ω [EXEMPLE] : la sortie suit
l'alimentation jusqu'à environ 5 V, puis se stabilise. Avec 4,7 kΩ, la régulation tient. Avec
470 Ω, la charge demanderait 10,9 mA [EXEMPLE], plus que les 10,1 mA [EXEMPLE] fournis par la
résistance : la Zener cesse de conduire et la sortie tombe à environ 4,9 V [EXEMPLE], la valeur du
diviseur 680 / 470.

Partie B : la tension aux bornes de la TVS reste proche de la tension d'alimentation tant que le
courant est négligeable, puis se stabilise près de VBR quand le courant atteint le courant de
mesure. La valeur relevée doit se trouver dans la plage VBR de la fiche.
