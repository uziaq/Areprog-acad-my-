# Corrigé du chapitre S09

Le corrigé de chaque exercice s'affiche dans la leçon après la réponse (fichiers
`S09-L01.yaml` à `S09-L03.yaml`) ; celui du QCM, après sa soumission.

## TP-13, commande par NPN

Charge de 120 Ω sous 12 V, commande de 5 V [EXEMPLE]. Avec RB = 1 kΩ, IB vaut environ 4,3 mA
[EXEMPLE] ; le transistor est saturé si IB dépasse nettement IC / β minimal. VCE lue de quelques
centaines de millivolts au plus [EXEMPLE], la charge reçoit presque 12 V et IC vaut environ 0,1 A
[EXEMPLE]. Commande coupée : VCE proche de 12 V et charge à 0 V [EXEMPLE].

Avec RB = 47 kΩ, IB vaut environ 91 µA [EXEMPLE]. Si le β réel vaut 200 [EXEMPLE], IC vaut 18 mA
[EXEMPLE], la charge ne reçoit que 2,2 V [EXEMPLE] et VCE vaut 9,8 V [EXEMPLE] : le transistor
dissipe 0,018 × 9,8 = 0,18 W [EXEMPLE] contre environ 0,03 W [EXEMPLE] saturé. Le correcteur
vérifie que l'apprenant conclut « non saturé » d'après les mesures et explique l'échauffement.

## TP-14, commande par MOSFET

Charge de 12 Ω sous 12 V [EXEMPLE]. Grille à 0 V : VDS proche de 12 V. Grille à 10 V : courant
d'environ 1 A [EXEMPLE] ; avec une RDS(on) de 50 mΩ [EXEMPLE], VDS vaut 0,05 V et les pertes
0,05 W [EXEMPLE]. En descendant VGS, VDS reste faible puis augmente nettement près de la plage de
VGS(th) de la fiche ; le courant baisse et les pertes passent par un maximum. Le correcteur
vérifie que la RDS(on) est calculée à une VGS précisée et comparée à la fiche à la même VGS, et
que l'essai a été arrêté selon la consigne.
