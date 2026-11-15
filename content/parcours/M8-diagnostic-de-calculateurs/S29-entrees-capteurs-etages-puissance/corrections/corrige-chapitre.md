# Corrigé du chapitre S29

Le corrigé de chaque exercice s'affiche dans la leçon après la réponse (fichiers
`S29-L01.yaml` à `S29-L03.yaml`) ; celui du QCM, après sa soumission.

## TP-42, entrées capteurs

- limite de courant écrite et justifiée avant la mise sous tension ;
- capteur inductif mesuré avant la résistance série ; amplitude plus grande à vitesse plus élevée ; front de sortie au passage par zéro après armement ; résistance série ≥ tension crête / 3 mA ;
- Hall : sortie basse avec l'aimant au-delà du seuil, haute sinon ; sans tirage, jamais de niveau haut ;
- ratiométrique : rapport signal / alimentation constant quand l'alimentation baisse ;
- lambda simulée : sortie = entrée × 4,5 aux trois niveaux ; valeur par défaut entrée débranchée.

## TP-43, étages de puissance

- limite de courant écrite ; pince vérifiée (continu, zéro, limites) ;
- low-side : drain proche de 0 V commandé, à la tension de la charge coupé ; impulsion de coupure écrêtée à la tension de la fiche ;
- high-side : sortie à 0 V coupée avec charge, proche de l'alimentation sans charge, défaut signalé ;
- courant calculé (tension / résistance × K) et courant à la pince concordants dans leurs incertitudes ;
- pont en H : table de la fiche retrouvée, deux sens de rotation, freinage avec IN1 = IN2 = 1.
