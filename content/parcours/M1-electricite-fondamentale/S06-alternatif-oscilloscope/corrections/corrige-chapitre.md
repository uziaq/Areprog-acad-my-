# Corrigé du chapitre S06

Le corrigé de chaque exercice s'affiche dans la leçon après la réponse (fichiers
`S06-L01.yaml` à `S06-L03.yaml`) ; celui du QCM, après sa soumission.

## TP-08, première mesure à l'oscilloscope

Valeurs attendues pour les réglages proposés [EXEMPLE].

| Signal | Résultat attendu |
|---|---|
| Sinusoïde 1 kHz, 4 Vcc | Période 1 ms [EXEMPLE] ; valeur efficace 1,41 V [EXEMPLE] |
| Carré 0 à 5 V, 50 % | Valeur moyenne 2,5 V [EXEMPLE] ; valeur efficace 3,54 V [EXEMPLE] |
| PWM 0 à 5 V, 25 % | Valeur moyenne 1,25 V [EXEMPLE] ; valeur efficace 2,5 V [EXEMPLE] |

Analyse attendue : lectures sur graduations et mesures automatiques concordent à une fraction de
division près ; le multimètre est proche de la valeur calculée sur la sinusoïde. Sur le signal
PWM, un multimètre non TRMS s'en écarte, ce qui s'explique par sa fiche d'identité. En couplage
AC, le niveau bas du PWM n'est plus à 0 V. Le correcteur vérifie que chaque réglage est noté et
justifié, et que la pince de masse était sur la masse du générateur.

## TP-09, filtre RC passe-bas

Valeurs attendues avec R = 1,6 kΩ et C = 100 nF [EXEMPLE] : fc = 995 Hz [EXEMPLE] ; à fc, Us / Ue
vaut 0,707, soit −3 dB ; à 10 kHz [EXEMPLE], environ −20 dB. La fc mesurée doit se trouver dans
l'intervalle que donne la tolérance du condensateur. Le diagramme montre un palier proche de
0 dB en basse fréquence, puis une décroissance régulière au-delà de fc.
