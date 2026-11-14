---
id: S04-L03
titre: Effet de charge du voltmètre et mesure de courant
chapitre: S04
version: "0.1"
statut: brouillon
duree_min: 75
objectifs:
  - id: O1
    texte: Calculer l'effet de charge d'un voltmètre sur un point de mesure et dire s'il est négligeable
    competences: [D3.1]
  - id: O2
    texte: Mesurer un courant en série sans détruire le fusible et estimer l'erreur due au shunt
    competences: [D3.1, D1.2]
prerequis: [S04-L01]
exercices: [S04-L03-EX01, S04-L03-EX02]
references: [SRC-0008, SRC-0004]
criteres_evaluation:
  - objectif: O1
    critere: Exercice S04-L03-EX01 réussi et TP-06 validé (effet de charge mis en évidence et résistance d'entrée déduite)
  - objectif: O2
    critere: Exercice S04-L03-EX02 réussi et questions « sécurité » du QCM sur la mesure de courant réussies à 100 %
figures:
  - id: S04-F03
    fichier: ../figures/S04-F03-effet-de-charge.svg
    legende: "Effet de charge : le voltmètre est une résistance Rin branchée sur le point mesuré, lui-même modélisé par Eth et Rth (S03). Il lit Eth × Rin / (Rth + Rin), et non Eth."
    alt: "À gauche, dans un cadre en pointillé intitulé point mesuré, une source Eth en série avec une résistance Rth. À droite, un cadre intitulé voltmètre contient une résistance Rin reliée aux deux bornes du point mesuré."
    origine: areprog
derniere_verification_sources: 2026-11-13
historique:
  - version: "0.1"
    date: 2026-11-13
    resume: Première rédaction
---

## Théorie

### Le voltmètre est une charge

Le voltmètre se branche en parallèle sur le point mesuré. Il se comporte comme une résistance
d'entrée **Rin**, élevée mais pas infinie. Dans l'exemple de la note Fluke, l'entrée tension
présente environ 10 MΩ [SOURCÉ : SRC-0004 §Protection against two major electrical hazards] ;
celle de votre multimètre se lit dans sa notice [À VÉRIFIER : résistance d'entrée du multimètre de l'atelier, relevée dans sa fiche d'identité au TP-06, ou mesurée en partie B si la notice ne la donne pas].

Avec le modèle de Thévenin du point mesuré (S03), la tension lue vaut :

**U lue = Eth × Rin / (Rth + Rin)**

::figure{id=S04-F03}

C'est la règle du diviseur chargé de S03, appliquée à l'instrument. Tant que Rin est très grande
devant Rth, l'effet est négligeable ; sur un point à haute impédance (diviseur de grandes
résistances, entrée de capteur), il ne l'est plus.

### Déduire Rin d'une mesure

Si l'on connaît Eth et Rth (diviseur de résistances mesurées), on peut retrouver Rin à partir de
la tension lue :

**Rin = Rth × U lue / (Eth − U lue)**

C'est le principe du TP-06.

### Mesurer un courant

- Le multimètre se place **en série** : on ouvre le circuit à l'endroit de la mesure, alimentation coupée, et on insère l'appareil [SOURCÉ : SRC-0008 §DC and AC current].
- Le courant traverse le **shunt** interne, une résistance de faible valeur dont la chute de tension sert à calculer le courant [SOURCÉ : SRC-0008 §DC and AC current]. Cette chute s'ajoute au circuit et réduit un peu le courant mesuré.
- La valeur du shunt (ou la chute de tension par ampère) se lit dans la notice [À VÉRIFIER : résistance ou chute de tension de chaque calibre de courant du multimètre de l'atelier, à relever dans sa notice ; « inconnue » si elle n'y figure pas].

### Ne pas détruire le fusible

1. **Calculer** le courant attendu avant de brancher (loi d'Ohm), et choisir la borne et le calibre qui le contiennent.
2. En cas de doute, commencer par la borne et le calibre A les plus élevés.
3. Ne **jamais** poser les pointes d'un multimètre réglé en courant aux bornes d'une source : l'erreur la plus courante est de laisser les cordons dans une borne de courant puis de mesurer une tension [SOURCÉ : SRC-0008 §Input protection].
4. Un fusible grillé se remplace uniquement par le modèle prescrit par le fabricant [SOURCÉ : SRC-0004 §Use the right high-energy fuses].
5. Pour les forts courants, on utilise une pince de courant plutôt que les bornes de l'appareil ; la note Fluke indique qu'on y recourt en général au-dessus de 2 A [SOURCÉ : SRC-0008 §Current probe accessories]. La pince pour oscilloscope est étudiée en S11.

### Exemple 7 : effet de charge sur un diviseur à haute impédance

Diviseur de deux résistances de 1 MΩ sous 10 V, voltmètre de 10 MΩ [EXEMPLE].

1. Eth = 10 × 1 / 2 = 5 V et Rth = 1 / 2 = 0,5 MΩ [EXEMPLE].
2. U lue = 5 × 10 / (0,5 + 10) = 4,76 V [EXEMPLE].
3. Erreur : (4,76 − 5) / 5 = −4,8 % [EXEMPLE], bien plus que l'incertitude habituelle d'un multimètre en tension continue.
4. Sur le même diviseur fait de deux résistances de 10 kΩ [EXEMPLE], Rth = 5 kΩ et l'erreur tombe à −0,05 % [EXEMPLE].

### Exemple 8 : retrouver Rin

Même diviseur 1 MΩ / 1 MΩ sous 10 V ; le multimètre lit 4,80 V [EXEMPLE].

1. Rin = Rth × U lue / (Eth − U lue) = 0,5 × 4,80 / (5 − 4,80) [EXEMPLE].
2. Rin = 2,4 / 0,2 = 12 MΩ [EXEMPLE].
3. Ce résultat dépend de la précision des résistances et de la lecture : on le compare à la notice.

### Exemple 9 : l'erreur due au shunt

Un circuit de 5 V alimente une résistance de 100 Ω ; le calibre mA du multimètre a une résistance de 1 Ω [EXEMPLE].

1. Sans le multimètre : I = 5 / 100 = 50 mA [EXEMPLE].
2. Avec le multimètre en série : I = 5 / (100 + 1) = 49,5 mA [EXEMPLE].
3. Erreur : −1 % [EXEMPLE]. Elle devient importante quand la résistance du circuit est faible devant celle du shunt.

## Exercices

::exercice{id=S04-L03-EX01}

::exercice{id=S04-L03-EX02}
