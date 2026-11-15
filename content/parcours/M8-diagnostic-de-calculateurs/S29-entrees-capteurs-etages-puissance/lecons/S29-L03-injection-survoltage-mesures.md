---
id: S29-L03
titre: Commande d'injecteur, survoltage et mesures sur les étages de puissance
chapitre: S29
version: "0.1"
statut: brouillon
duree_min: 120
objectifs:
  - id: O1
    texte: Expliquer la commande d'un injecteur et le principe du survoltage par convertisseur élévateur dans un calculateur d'injection directe
    competences: [D10.2]
  - id: O2
    texte: Mesurer un courant de commande à la pince de courant dans ses limites et appliquer les règles de mesure des nœuds à tension élevée
    competences: [D10.1, D10.2]
prerequis: [S29-L02, S11-L03, S16-L01]
exercices: [S29-L03-EX01, S29-L03-EX02]
references: [SRC-0087, SRC-0029, SRC-0013]
criteres_evaluation:
  - objectif: O1
    critere: Exercice S29-L03-EX01 réussi
  - objectif: O2
    critere: Exercice S29-L03-EX02 réussi et courant de commande relevé à la pince au TP-43
figures:
  - id: S29-F03
    fichier: ../figures/S29-F03-injection-survoltage.svg
    legende: "Principe d'une commande d'injecteur en injection directe : un convertisseur élévateur charge un condensateur à une tension élevée ; un transistor high-side relie l'injecteur à cette tension ou au + batterie, un transistor low-side le relie à la masse à travers une résistance de mesure de courant. Allure du courant : montée rapide, puis maintien à un niveau plus bas. Schéma et allure de principe, sans valeur."
    alt: "À gauche, un bloc convertisseur élévateur alimenté par le + batterie charge un condensateur marqué tension élevée. Au centre, un transistor high-side, l'injecteur, un transistor low-side et une résistance de mesure vers la masse. À droite, une courbe de courant en fonction du temps : montée rapide jusqu'à un pic, puis palier plus bas, puis retour à zéro."
    origine: areprog
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction
---

## Théorie

### Commander un injecteur

Un injecteur est une électrovanne : une bobine qu'on alimente pour l'ouvrir. Le contrôleur de commande
d'injecteurs cité pilote des MOSFET externes, côté haut et côté bas, et mesure le courant de chaque
voie pour le réguler et diagnostiquer les défauts [SOURCÉ : SRC-0087 §5.1 Introduction]. Il surveille la
tension drain-source de chaque transistor pour détecter les défauts [SOURCÉ : SRC-0087 §5.2 Features].

Le courant d'un injecteur suit en général une phase d'appel à courant élevé pour ouvrir vite, puis une
phase de maintien à courant plus faible [À VÉRIFIER : profil et valeurs dans la documentation du driver et
de l'injecteur, jamais supposés]. À la coupure, la bobine produit une surtension écrêtée par le circuit
de commande (S09, S29-L02).

Erreur fréquente des vidéos (E-09 du catalogue des ressources) : ce ne sont pas des transformateurs qui
commandent les injecteurs. La sortie est un transistor avec écrêtage de la surtension ; en injection
directe, la tension élevée vient d'un convertisseur élévateur à inductance (S16).

### Le survoltage

En injection directe, la tension batterie ne suffit pas à ouvrir assez vite l'injecteur : un
convertisseur élévateur fournit une tension élevée [SOURCÉ : SRC-0087 §6.2.6 Boost voltage monitoring mode].
Dans le circuit cité, ce convertisseur peut produire jusqu'à 72 V à partir de la batterie [SOURCÉ : SRC-0087 §6.2.5 DC-DC converter].
La tension réelle d'un calculateur donné se lit dans la fiche
du composant relevé sur sa carte [À VÉRIFIER : fiche du driver relevé, et pour les injecteurs
piézoélectriques de certains diesels, tension bien plus élevée].

Cette tension est stockée dans un condensateur qui peut rester chargé après la coupure : c'est la règle
du protocole commun calculateurs réels. On **mesure** la décharge avant de toucher la carte, et on la
mesure de nouveau juste avant, car une tension peut réapparaître [SOURCÉ : SRC-0013 §2-7 Restriking Voltage].
Ne pas mesurer est une faute éliminatoire (FE-09).

::figure{id=S29-F03}

### Mesurer un nœud à tension élevée

Un nœud qui n'est pas à la masse (grille d'un high-side, tension survoltée, drain pendant la coupure)
est une mesure flottante [SOURCÉ : SRC-0029 §Floating Measurements]. La masse d'une sonde reliée à la
terre ne se pose jamais sur un tel nœud (FE-07) [SOURCÉ : SRC-0029 §Use Proper Grounding Procedures].
On utilise une sonde différentielle, ou deux voies en soustraction pour un signal lent [SOURCÉ : SRC-0029 §Different Probe Types and Their Benefits].
Les tensions admises par la sonde et par
l'oscilloscope se lisent dans leurs notices [À VÉRIFIER : sonde différentielle de l'atelier et sa notice].

### Mesurer un courant de commande à la pince

La pince de courant mesure le courant sans ouvrir le circuit (S11). Ses limites [SOURCÉ : SRC-0029 §Maximum Input Current Rating (current probes)] :

- le courant maximal d'entrée est le total du continu et de la crête alternative ;
- en alternatif, ce courant maximal baisse quand la fréquence monte ;
- le courant de crête impulsionnel maximal ne doit pas être dépassé.

Une pince AC ne voit pas le continu ; pour le courant d'un injecteur ou d'une sortie PWM, il faut une
pince qui mesure aussi le continu [SOURCÉ : SRC-0029 §Different Probe Types and Their Benefits]. On règle
le zéro de la pince avant la mesure, conducteur hors de la pince, selon sa notice [À VÉRIFIER : notice de la pince de l'atelier].
Au TP-43, le courant est celui d'une charge simulée sur
carte d'entraînement, jamais celui d'un véritable étage survolté.

### Exemple 7 : la tension survoltée d'un calculateur de récupération

Sur la carte d'un ECU moteur d'injection directe, on repère un condensateur électrolytique près d'une
inductance et d'un circuit de commande d'injecteurs [EXEMPLE].

1. Hypothèse : c'est le condensateur du survoltage [HYPOTHÈSE].
2. Marquage du circuit relevé, fiche publique cherchée : tension maximale du convertisseur [À VÉRIFIER : fiche du circuit relevé].
3. Avant tout contact : décharge mesurée, deux fois [SOURCÉ : SRC-0013 §2-7 Restriking Voltage].

### Exemple 8 : choisir la pince

On veut voir le courant d'une charge inductive commandée en PWM sur la carte d'entraînement : courant
moyen 2 A, pointes à 4 A [EXEMPLE].

1. Il faut une pince qui mesure le continu.
2. Le courant total (continu plus crête) et la crête impulsionnelle restent sous les limites de la notice [SOURCÉ : SRC-0029 §Maximum Input Current Rating (current probes)].
3. Zéro réglé, flèche de la pince dans le sens du courant [À VÉRIFIER : convention de la notice].

## Exercices

::exercice{id=S29-L03-EX01}

::exercice{id=S29-L03-EX02}
