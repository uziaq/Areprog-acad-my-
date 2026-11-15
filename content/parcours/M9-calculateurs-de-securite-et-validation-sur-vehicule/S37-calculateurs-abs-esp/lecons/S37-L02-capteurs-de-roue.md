---
id: S37-L02
titre: Capteurs de roue actifs et passifs
chapitre: S37
version: "0.1"
statut: brouillon
duree_min: 110
objectifs:
  - id: O1
    texte: Expliquer le principe d'un capteur de roue passif (inductif) et d'un capteur actif à courant modulé, et leur interface dans le calculateur
    competences: [D10.7]
  - id: O2
    texte: Calculer la tension sur une résistance de mesure et la fréquence du signal d'un capteur de roue selon la vitesse de rotation et la cible
    competences: [D10.7]
  - id: O3
    texte: Mesurer le signal d'un capteur de roue sur véhicule d'atelier levé, en sécurité, et interpréter un signal absent ou irrégulier
    competences: [D10.6, D10.7]
prerequis: [S37-L01, S29]
exercices: [S37-L02-EX01, S37-L02-EX02, S37-L02-EX03]
references: [SRC-0100, SRC-0081]
criteres_evaluation:
  - objectif: O1
    critere: Type de capteur identifié et justifié au TP-55
  - objectif: O2
    critere: Exercices S37-L02-EX01 et S37-L02-EX02 réussis
  - objectif: O3
    critere: Exercice S37-L02-EX03 réussi et signaux capturés au TP-55
figures:
  - id: S37-F02
    fichier: ../figures/S37-F02-capteur-roue-actif.svg
    legende: "Capteur de roue actif à deux fils : le calculateur l'alimente et lit son courant sur une résistance de mesure ; le courant passe d'un niveau bas à un niveau haut à chaque dent ou pôle de la cible (7 mA et 14 mA dans l'exemple de la fiche citée). Niveaux réels dans la documentation du capteur."
    alt: "En haut, un capteur actif relié par deux fils, alimentation et retour, à un calculateur qui contient une résistance de mesure et des comparateurs, puis une sortie logique vers le microcontrôleur. En bas, un signal carré entre 7 mA et 14 mA, une période par dent ou par pôle de la cible."
    origine: areprog
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction
---

## Théorie

### Capteur passif : une bobine devant une cible

Un capteur de roue passif est un capteur inductif à réluctance variable, comme celui vu en S29 : il
produit une tension alternative dont l'amplitude dépend de la vitesse, faible à basse vitesse, et son
interface détecte les passages par zéro avec un seuil adaptatif [SOURCÉ : SRC-0081 §DESCRIPTION].
Il a deux fils et ne demande pas d'alimentation ; sa résistance de bobine se mesure hors tension et se
compare à la documentation [À VÉRIFIER : résistance du capteur dans la documentation du constructeur].

### Capteur actif : un courant qui change de niveau

Un capteur actif est alimenté par le calculateur par ses deux fils ; il code la vitesse en faisant
varier le **courant** qu'il consomme. Dans l'exemple de la fiche citée, le niveau bas vaut 7 mA et le niveau haut 14 mA [SOURCÉ : SRC-0100 §5.3.9 Wheel-Speed Sensing].
Les capteurs « intelligents » ajoutent un niveau intermédiaire pour transmettre des données de diagnostic, avec un niveau haut de 28 mA dans l'exemple cité [SOURCÉ : SRC-0100 §5.3.9 Wheel-Speed Sensing].
Le calculateur lit ce courant sur une résistance de mesure et le compare à des seuils réglés par une tension de référence [SOURCÉ : SRC-0100 §5.3.9 Wheel-Speed Sensing].
Pour un capteur actif, la fiche donne en exemple une résistance de mesure de 120 Ω [SOURCÉ : SRC-0100 §5.3.9 Wheel-Speed Sensing].
Les entrées sont protégées contre les défauts courants (court-circuit, charge ouverte) [SOURCÉ : SRC-0100 §5.3.9 Wheel-Speed Sensing].

Un capteur actif fonctionne même à très basse vitesse, contrairement au capteur passif dont la tension
devient trop faible [HYPOTHÈSE : déduit des principes ; à constater roue tournée à la main au TP-55].

::figure{id=S37-F02}

### La fréquence du signal

Le signal fait une période par dent (cible dentée) ou par paire de pôles (cible magnétique) [HYPOTHÈSE : selon la cible, à vérifier dans la documentation du constructeur].
La fréquence vaut donc le nombre de tours par seconde multiplié par le nombre de dents ou de paires de pôles.
Le nombre de dents de la cible vient de la documentation du constructeur [À VÉRIFIER : cible du véhicule d'atelier].

### Mesurer sur véhicule d'atelier levé

Le TP-55 se fait sur un véhicule d'atelier thermique levé, moteur arrêté, contact mis, roue tournée à
la main ; les connexions se font batterie débranchée (catalogue des TP, sécurité véhicule). Le point
de mesure et le brochage viennent du schéma électrique officiel ; ce cours n'en donne aucun.
Pour un capteur actif, on observe le courant avec une pince de faible calibre ou un adaptateur placé
en série, selon le matériel de l'atelier [À VÉRIFIER : pince ou adaptateur disponible et sa notice].
La masse de la sonde d'oscilloscope est reliée à la masse du véhicule.

### Lire un signal absent ou irrégulier

- **Signal absent** : alimentation du capteur absente, fil coupé, capteur défaillant [HYPOTHÈSE : à départager par la tension d'alimentation au connecteur puis la continuité, batterie débranchée].
- **Signal irrégulier** (périodes manquantes, amplitude variable pour un passif) : cible abîmée ou sale, entrefer trop grand, roulement à jeu [HYPOTHÈSE : inspection mécanique selon le constructeur].
- **Courant hors niveaux** pour un actif : capteur défaillant ou câblage avec fuite ; le calculateur cité signale les sous-intensités et surintensités [SOURCÉ : SRC-0100 §5.3.9 Wheel-Speed Sensing].

Le défaut d'un capteur de roue se diagnostique d'abord côté véhicule (capteur, câblage, cible) ; le
calculateur n'est mis en cause qu'avec une mesure qui le prouve (FE-13).

### Exemple 1 : la tension sur la résistance de mesure

Résistance de mesure de 120 Ω, niveaux de 7 mA et 14 mA, d'après l'exemple de la fiche [SOURCÉ : SRC-0100 §5.3.9 Wheel-Speed Sensing].

1. Niveau bas : U = 120 × 0,007 = 0,84 V [EXEMPLE].
2. Niveau haut : U = 120 × 0,014 = 1,68 V [EXEMPLE].
3. L'écart entre les deux niveaux, environ 0,84 V, est ce que les comparateurs distinguent [EXEMPLE].

### Exemple 2 : la fréquence roue tournée à la main

La roue fait un tour par seconde ; la cible a 48 dents [EXEMPLE].

1. f = 1 × 48 = 48 Hz [EXEMPLE].
2. Période : 1 / 48 ≈ 0,021 s, soit environ 21 ms [EXEMPLE].
3. À l'oscilloscope, une base de temps de 10 ms par division montre plusieurs périodes [EXEMPLE].

### Exemple 3 : un signal absent

Sur le véhicule d'atelier, le capteur avant gauche ne donne aucun signal, roue tournée [EXEMPLE].

1. Batterie débranchée : continuité de chaque fil entre le capteur et le connecteur du calculateur, d'après le schéma.
2. Contact mis : tension d'alimentation au connecteur du capteur, comparée au côté droit [HYPOTHÈSE : les deux côtés sont alimentés de la même façon].
3. Alimentation présente et câblage bon : le capteur est en cause ; alimentation absente : on remonte vers le calculateur.

## Exercices

::exercice{id=S37-L02-EX01}

::exercice{id=S37-L02-EX02}

::exercice{id=S37-L02-EX03}
