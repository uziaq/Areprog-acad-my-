# Corrigé du chapitre S15

Le corrigé de chaque exercice s'affiche dans la leçon après la réponse (fichiers
`S15-L01.yaml` à `S15-L03.yaml`) ; celui du QCM, après sa soumission.

## TP-21, régulateur linéaire sous charge variable

Entrée 12 V, régulateur 5 V [EXEMPLE]. Courants : 50 mA, 106 mA et 152 mA pour 100 Ω, 47 Ω et
33 Ω [EXEMPLE]. Dissipations : environ 0,35 W, 0,74 W et 1,06 W [EXEMPLE]. La limite de 0,3 A
[EXEMPLE] couvre la plus forte charge avec une marge. Le correcteur vérifie :

- des dissipations recalculées avec les valeurs mesurées, pas seulement nominales ;
- une température stabilisée relevée pour chaque charge, croissante avec la dissipation, et un commentaire sur l'écart entre languette et jonction ;
- une tension de déchet calculée comme VI − VO au point où la sortie commence à baisser, comparée à la fiche au même courant ;
- un diagnostic qui suit l'ordre masse, entrée, enable, sortie, reset, avec une conclusion prudente.
