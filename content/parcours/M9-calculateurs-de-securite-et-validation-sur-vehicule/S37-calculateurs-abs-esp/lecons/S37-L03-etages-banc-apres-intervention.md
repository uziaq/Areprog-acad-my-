---
id: S37-L03
titre: Étages de puissance sur banc et opérations après intervention
chapitre: S37
version: "0.1"
statut: brouillon
duree_min: 110
objectifs:
  - id: O1
    texte: Expliquer la commande d'une électrovanne (PWM, roue libre, écrêtage, crête puis maintien) et calculer un temps de décroissance du courant
    competences: [D10.7]
  - id: O2
    texte: Préparer un banc avec charges de substitution réduites documentées, fusible et limite de courant écrite, et mesurer les étages un par un
    competences: [D10.6, D10.7]
  - id: O3
    texte: Identifier dans la documentation du constructeur les opérations d'après-intervention (purge, apprentissages, calibration de capteurs)
    competences: [D10.7]
prerequis: [S37-L02, S31]
exercices: [S37-L03-EX01, S37-L03-EX02]
references: [SRC-0101, SRC-0100]
criteres_evaluation:
  - objectif: O1
    critere: Exercice S37-L03-EX01 réussi et courant d'une électrovanne capturé au TP-54
  - objectif: O2
    critere: Critères charges-sourcees et alimentation-limitee de la grille renforcée prouvés au TP-54
  - objectif: O3
    critere: Exercice S37-L03-EX02 réussi
figures:
  - id: S37-F03
    fichier: ../figures/S37-F03-electrovanne-recirculation.svg
    legende: "Commande d'une électrovanne : alimentation par un transistor côté haut, bobine (ou charge réduite sur banc), commande côté bas en PWM ; à la coupure, le courant recircule par une diode de roue libre (décroissance lente, utile en PWM) ou est écrêté par une Zener ou par le circuit (décroissance rapide). D'après la note citée."
    alt: "En haut, trois blocs en ligne : alimentation des électrovannes, bobine en pointillés, commande côté bas. Sous la bobine, deux flèches en pointillés vers deux blocs : roue libre par diode, courant qui décroît lentement ; écrêtage par Zener ou interne, courant qui s'annule vite. En bas, la relation du temps de décroissance."
    origine: areprog
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction
---

## Théorie

### Une électrovanne est une charge inductive

Une électrovanne stocke de l'énergie dans son champ magnétique ; le circuit de commande ne doit jamais
interrompre brutalement son courant, sous peine d'une forte surtension (V = L × di/dt) [SOURCÉ : SRC-0101 §3 Basics of Driving Solenoid Loads].
Une diode de **roue libre** laisse le courant recirculer : il décroît lentement, ce qui convient à la régulation en PWM [SOURCÉ : SRC-0101 §3 Basics of Driving Solenoid Loads].
Un **écrêtage** (diode Zener en série, ou écrêtage intégré) impose une tension plus forte et fait décroître le courant beaucoup plus vite [SOURCÉ : SRC-0101 §3 Basics of Driving Solenoid Loads].
En négligeant la résistance de la bobine, le temps de décroissance vaut Δt ≈ L × Δi / V [SOURCÉ : SRC-0101 §3.2.2 Passive Voltage Clamping].
Les commandes du circuit cité écrêtent à 40 V [SOURCÉ : SRC-0100 §1.1 Features].

::figure{id=S37-F03}

### Régulation du courant, crête puis maintien

La résistance d'une bobine augmente quand elle chauffe ; une régulation de courant garde une force
constante malgré cette variation [SOURCÉ : SRC-0101 §3.1 Current Control].
Beaucoup d'électrovannes sont commandées en **crête puis maintien** : un courant fort pour déplacer le
noyau, puis un courant plus faible pour le tenir [SOURCÉ : SRC-0101 §3.1 Current Control].
À la pince de courant (S11), on voit donc une montée, un palier haut, puis un palier bas ondulé par la
PWM, comme pour les électrovannes de boîte de S31 [HYPOTHÈSE : profil réel selon le calculateur et l'électrovanne].

### Le banc à charges réduites

Le protocole renforcé impose des charges de substitution **réduites** pour les électrovannes et le
moteur de pompe, une limite de courant écrite pour chaque TP et un fusible : l'alimentation de
laboratoire n'est pas dimensionnée pour un moteur de pompe à pleine charge (catalogue des TP).
Chaque charge réduite a une valeur, une puissance assignée et une source écrites au dossier (critère
« charges sourcées » de la grille renforcée) [À VÉRIFIER : charges réduites de l'atelier et leur fiche].

Si les bobines font partie du calculateur, elles peuvent servir de charges, hors du bloc hydraulique,
selon la documentation [À VÉRIFIER par référence : bobines intégrées au calculateur ou au bloc].
On essaie **une sortie à la fois**, commandée par l'outil de diagnostic si sa fonction de test
d'actionneurs le permet sur banc [À VÉRIFIER : fonctions de l'outil de diagnostic sur banc].

### Ce que l'on mesure

- Courant de chaque électrovanne à la pince : forme, niveaux, fréquence de PWM.
- Tension côté bas de la commande à l'oscilloscope : niveau à l'état passant, pic d'écrêtage à la coupure, comparé à la valeur de la fiche si le circuit est identifié [SOURCÉ : SRC-0100 §1.1 Features].
- Courant dans la charge de substitution de la pompe, sur un essai court.
- Défauts lus en lecture seule : une charge ouverte ou un court-circuit est signalé par le circuit [SOURCÉ : SRC-0100 §5.3.6 PWM Low-Side Drivers].

Chaque mesure se compare à l'exemplaire de référence monté sur le même banc.

### Après une intervention

Sur véhicule, une intervention sur l'ABS / ESP est suivie d'opérations décrites par le constructeur :
purge du circuit et contrôle de la pédale, apprentissages, calibration des capteurs ESP (angle du
volant, embardée) [À VÉRIFIER par constructeur : liste et ordre des opérations pour le véhicule].
Le catalogue des TP impose la purge et le contrôle de pédale, puis des essais de freinage statiques,
avant tout déplacement. Pendant le cursus, aucun calculateur ABS / ESP réparé n'est remis en
circulation (décision D-14) ; la validation sur véhicule d'atelier vient en S39.

### Exemple 1 : roue libre ou écrêtage

Une électrovanne a une inductance de 10 mH et porte 1 A [EXEMPLE].

1. Roue libre par une diode, environ 0,7 V : Δt ≈ 0,010 × 1 / 0,7 ≈ 0,014 s, soit environ 14 ms [EXEMPLE].
2. Écrêtage à 40 V comme dans le circuit cité [SOURCÉ : SRC-0100 §1.1 Features].
3. Δt ≈ 0,010 × 1 / 40 = 0,00025 s, soit 0,25 ms [EXEMPLE] : la coupure est bien plus rapide.

### Exemple 2 : une charge réduite

Une électrovanne est remplacée sur banc par une résistance de 12 Ω sous 12 V [EXEMPLE].

1. Courant : I = 12 / 12 = 1 A [EXEMPLE].
2. Puissance en conduction continue : P = 12 × 1 = 12 W [EXEMPLE] ; la résistance doit être assignée au-dessus, avec dissipateur si sa fiche le demande.
3. La limite de courant du banc est écrite pour cette seule sortie, plus le courant de repos du calculateur.

### Exemple 3 : additionner les charges

Courant de repos 0,2 A, deux charges de 1 A et une charge de pompe réduite de 2 A [EXEMPLE].

1. Toutes actives : 0,2 + 1 + 1 + 2 = 4,2 A [EXEMPLE].
2. Une sortie à la fois, la pompe seule : 0,2 + 2 = 2,2 A [EXEMPLE].
3. On essaie une sortie à la fois : la limite reste basse et un défaut se localise tout de suite.

## Exercices

::exercice{id=S37-L03-EX01}

::exercice{id=S37-L03-EX02}
