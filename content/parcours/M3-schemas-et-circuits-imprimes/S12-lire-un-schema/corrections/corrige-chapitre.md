# Corrigé du chapitre S12

Le corrigé de chaque exercice s'affiche dans la leçon après la réponse (fichiers
`S12-L01.yaml` à `S12-L03.yaml`) ; celui du QCM, après sa soumission.

## TP-19, découpage en blocs et brochage constructeur

Partie A, schéma de l'Arduino UNO Rev3 [SOURCÉ : SRC-0032 §page 1]. Le correcteur attend au moins :

- microcontrôleur : ATMEGA328P-PU, avec l'horloge de valeur 16MHz qui lui est reliée ;
- alimentation : régulateur NCP1117ST50T3G, fusible F1, réseau VIN ;
- communication : connecteur USB-B_TH et ATMEGA16U2-MU(R) ;
- masses : GND, AGND et UGND listées, avec le point de liaison trouvé ou `[À VÉRIFIER]`.

Les entrées et sorties sont surtout les connecteurs de la carte ; un apprenant peut les regrouper
s'il le justifie. Le correcteur vérifie que chaque rôle non confirmé par une fiche porte
`[À VÉRIFIER]`, et qu'un réseau suivi liste toutes ses apparitions.

Partie B : aucune valeur attendue n'est donnée. Le correcteur vérifie la référence du document
officiel (titre, version, code interne du véhicule), la vue lue dans la légende et un tableau
complet ; une ligne sans source porte `[À VÉRIFIER]`. Un brochage copié d'une autre source que le
document officiel vaut 0.
