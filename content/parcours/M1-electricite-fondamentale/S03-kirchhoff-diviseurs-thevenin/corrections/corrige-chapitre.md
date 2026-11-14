# Corrigé du chapitre S03

Le corrigé de chaque exercice s'affiche dans la leçon après la réponse (fichiers
`S03-L01.yaml` à `S03-L03.yaml`) ; celui du QCM, après sa soumission.

## TP-04, diviseur chargé et non chargé

Valeurs attendues avec Ue = 10 V et R1 = R2 = 10 kΩ [EXEMPLE] (Eth = 5 V, Rth = 5 kΩ [EXEMPLE]) ;
à recalculer avec les valeurs mesurées.

| Charge | Tension attendue |
|---|---|
| À vide | 5 V [EXEMPLE] |
| 100 kΩ | 4,76 V [EXEMPLE] |
| 10 kΩ | 3,33 V [EXEMPLE] |
| 1 kΩ | 0,833 V [EXEMPLE] |

Analyse attendue : la baisse dépasse 1 % dès que la charge n'est plus au moins cent fois plus
grande que Rth ; ici, la charge de 100 kΩ [EXEMPLE] (vingt fois Rth) fait déjà baisser la
sortie d'environ 5 % [EXEMPLE].

## TP-05, résistance interne d'une pile

Pas de valeur attendue unique : elle dépend de la pile. Le correcteur vérifie que :

- la prévision sous la seconde charge est écrite **avant** la mesure ;
- la résistance interne calculée avec la première charge prévoit la seconde mesure à l'incertitude près ;
- les tensions à vide avant et après chaque essai sont notées, et la dérive est commentée ;
- la pente de la droite U(I) est cohérente avec r.
