# Corrigé du chapitre S16

Le corrigé de chaque exercice s'affiche dans la leçon après la réponse (fichiers
`S16-L01.yaml` à `S16-L03.yaml`) ; celui du QCM, après sa soumission.

## TP-22, module buck

Entrée 12 V, sortie 5 V [EXEMPLE]. Courants de sortie : environ 0,23 A, 0,5 A et 1 A pour 22 Ω,
10 Ω et 5 Ω [EXEMPLE] ; puissances dans les résistances : environ 1,1 W, 2,5 W et 5 W [EXEMPLE].
Avec un rendement estimé à 0,85, le courant d'entrée à 1 A de sortie vaut environ 0,49 A
[EXEMPLE] : la limite de 1 A [EXEMPLE] laisse une marge pour l'appel au démarrage. Le correcteur
vérifie :

- des rendements calculés avec le courant d'entrée moyen et les valeurs mesurées, et un commentaire sur leur évolution avec la charge ;
- un rapport cyclique lu au nœud de commutation, comparé à VOUT / (VIN × η) avec le rendement mesuré, et un commentaire sur l'écart ;
- deux captures de l'ondulation, masse longue et masse courte, et une explication de la différence ;
- une décharge mesurée deux fois avant chaque mesure d'ESR, des mesures faites à la même température, et une conclusion prudente sur le condensateur usagé.
