# Corrigé du chapitre S19

Le corrigé de chaque exercice s'affiche dans la leçon après la réponse (fichiers
`S19-L01.yaml` à `S19-L03.yaml`) ; celui du QCM, après sa soumission.

## TP-26, portes logiques et seuils

- valeurs VIL, VIH, VOL, VOH relevées dans la fiche du circuit, à sa tension d'alimentation, avec la section citée ;
- marges de bruit calculées : VOH − VIH et VIL − VOL ;
- limite de courant écrite avant la mise sous tension, polarité vérifiée ;
- tables de vérité conformes ;
- seuils mesurés entre VIL et VIH ; un seuil hors de cette plage se signale et se refait, il ne se corrige pas.

## TP-27, analyseur logique sur I²C

- seuil, fréquence d'échantillonnage, durée enregistrée et déclenchement justifiés par écrit ;
- masse branchée en premier, tension du bus vérifiée avant les voies ;
- trame décodée à la main identique à celle du logiciel : START, adresse sur sept bits, R/W, ACK, données, STOP ;
- adresse convertie correctement et comparée à la fiche ;
- NACK identifié et expliqué : aucun circuit n'a répondu à l'adresse appelée.
