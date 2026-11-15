---
id: S38-L03
titre: Capteurs de couple et d'angle, calibrations après intervention
chapitre: S38
version: "0.1"
statut: brouillon
duree_min: 100
objectifs:
  - id: O1
    texte: Expliquer le principe d'un capteur de couple redondant et choisir la mesure adaptée à sa sortie (analogique ou numérique de type SENT)
    competences: [D10.6, D10.7]
  - id: O2
    texte: Relever les signaux d'un capteur de couple sur véhicule d'atelier immobilisé, moteur arrêté puis en marche, en appliquant les règles de sécurité véhicule et la prévention des gaz d'échappement
    competences: [D10.6]
  - id: O3
    texte: Identifier dans la documentation du constructeur les calibrations après intervention (angle de braquage, butées) à faire avant tout roulage
    competences: [D10.7]
prerequis: [S38-L02, S29-L01, S31]
exercices: [S38-L03-EX01, S38-L03-EX02]
references: [SRC-0103, SRC-0090, SRC-0104]
criteres_evaluation:
  - objectif: O1
    critere: Exercice S38-L03-EX01 réussi
  - objectif: O2
    critere: Signaux des deux voies du capteur de couple relevés au TP-57, moteur arrêté puis en marche, avec la fiche d'intervention complète
  - objectif: O3
    critere: Exercice S38-L03-EX02 réussi et liste des calibrations du constructeur jointe au dossier du TP-57
figures:
  - id: S38-F03
    fichier: ../figures/S38-F03-capteur-couple-redondant.svg
    legende: "Capteur de couple redondant : le couple du conducteur tord une barre entre le volant et la colonne ; deux capteurs à effet Hall mesurent cette torsion ; le calculateur compare les deux voies, une incohérence est un défaut qui peut conduire à un mode dégradé. Principe de la redondance d'après la note citée ; montage réel et seuils selon le constructeur."
    alt: "En haut, trois blocs en ligne : volant, barre de torsion, colonne. Sous la barre de torsion, deux capteurs voie 1 et voie 2 qui arrivent au calculateur. Le calculateur compare les voies et commande l'assistance, normale ou en mode dégradé."
    origine: areprog
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction
---

## Théorie

### Le capteur de couple

Le capteur de couple mesure l'effort du conducteur sur le volant ; c'est l'information principale qui
décide de l'assistance. Le montage le plus courant mesure la torsion d'une barre placée entre le volant et la colonne [À VÉRIFIER : montage du capteur du véhicule d'atelier, d'après la documentation du constructeur].
En direction assistée électrique, application critique pour la sécurité, on utilise souvent des **capteurs redondants** [SOURCÉ : SRC-0103 §Introduction].
Le composant cité réunit deux capteurs à effet Hall linéaires dans un seul boîtier [SOURCÉ : SRC-0103 §Introduction].
Le calculateur compare les deux voies : une incohérence entre elles est un défaut, même si chaque voie prise seule semble plausible [HYPOTHÈSE : seuil de cohérence propre au constructeur].

::figure{id=S38-F03}

### Une sortie analogique ou numérique

Selon le capteur, la sortie est une tension analogique ou une trame numérique [À VÉRIFIER : type de sortie du capteur du véhicule d'atelier].
Le protocole numérique SENT (*Single Edge Nibble Transmission*) est très répandu, et les variantes de la note citée permettent à quatre capteurs au plus de partager un même fil de sortie [SOURCÉ : SRC-0103 §Introduction].
Dans la variante séquentielle, le calculateur tire la ligne à l'état bas pendant une durée donnée pour demander les données, un autodiagnostic ou une resynchronisation [SOURCÉ : SRC-0103 §Sequential SENT (SSENT)].
Ces durées se comptent en unités de temps appelées *ticks* ; en mode de déclenchement long, la demande de données dure de 9 à 81 ticks [SOURCÉ : SRC-0103 §Sequential SENT (SSENT)].

Conséquence pour la mesure : une sortie analogique se lit au multimètre ou à l'oscilloscope ; une trame SENT ne donne au multimètre qu'une moyenne sans signification, elle se lit **à l'oscilloscope** [HYPOTHÈSE : à constater au TP-57].

### Les capteurs d'angle et de position

Le calculateur a aussi besoin de la position du rotor du moteur sans balais, et le véhicule d'un angle de braquage [À VÉRIFIER : capteurs présents et leur emplacement sur le véhicule d'atelier].
Un principe déjà vu en S31 : deux signaux en quadrature dont la fréquence donne la vitesse et le déphasage le sens de rotation [SOURCÉ : SRC-0090 §7.3 Feature Description].
Le type réel de chaque capteur se lit dans la documentation du constructeur, jamais en le devinant à l'oscilloscope.

### Mesurer sur véhicule immobilisé, moteur arrêté puis en marche

On relève les deux voies du capteur de couple avec des pointes de touche arrière, volant tourné doucement dans un sens puis dans l'autre.
Sur beaucoup de véhicules, l'assistance n'est active que moteur en marche [HYPOTHÈSE : condition d'activation selon le constructeur] : on mesure d'abord moteur arrêté, puis moteur en marche, véhicule toujours immobilisé.

Moteur en marche dans un local, les gaz d'échappement exposent à une intoxication aiguë au monoxyde de carbone [SOURCÉ : SRC-0104 §Effets sur la santé].
Pour un véhicule immobile en atelier, la prévention passe par le captage des gaz au plus près de leur émission et par des procédures qui évitent de laisser tourner les moteurs inutilement [SOURCÉ : SRC-0104 §Démarche de prévention des risques].
Durée moteur en marche écrite avant le TP, aspiration branchée sur l'échappement, mains et câbles loin des pièces en mouvement.

### Après une intervention

Après le remplacement ou la réparation d'un calculateur de direction, ou une dépose du capteur
d'angle, le constructeur prévoit des opérations : calibration de l'angle de braquage, apprentissage
des butées, parfois codage [À VÉRIFIER : opérations du constructeur pour le véhicule étudié].
Le catalogue des TP impose : premiers essais véhicule immobilisé, roues décollées si la procédure le
prévoit, et calibrations du constructeur **avant tout roulage** (règle « Sécurité véhicule »).
Le cours n'enseigne aucun contournement de ces calibrations.

### Exemple 1 : deux voies qui divergent

Volant tourné à droite, la voie 1 monte nettement et la voie 2 reste fixe [EXEMPLE].

1. Hypothèses : voie 2 ou son câblage en défaut, alimentation du capteur, connecteur [HYPOTHÈSE].
2. Contrôler l'alimentation du capteur et la continuité de la voie 2 batterie débranchée, d'après le schéma officiel.
3. Ne pas conclure sur le calculateur avant d'avoir mis le capteur et le câblage hors de cause.

### Exemple 2 : la durée d'une demande de données

Durée d'un tick : 3 µs [EXEMPLE].

1. Demande la plus courte en mode long : 9 ticks [SOURCÉ : SRC-0103 §Sequential SENT (SSENT)].
2. Durée : 9 × 3 µs = 27 µs [EXEMPLE].
3. À l'oscilloscope, on règle la base de temps pour voir cette impulsion et la trame qui suit.

### Exemple 3 : préparer la mesure moteur en marche

Le TP prévoit 10 min moteur en marche [EXEMPLE].

1. Aspiration posée sur l'échappement avant le démarrage [SOURCÉ : SRC-0104 §Démarche de prévention des risques].
2. Captures préparées moteur arrêté, pour réduire le temps moteur en marche.
3. Moteur coupé dès les captures faites.

## Exercices

::exercice{id=S38-L03-EX01}

::exercice{id=S38-L03-EX02}
