---
id: S30-L03
titre: Architecture d'un ECU moteur diesel et outil de diagnostic sur banc
chapitre: S30
version: "0.1"
statut: brouillon
duree_min: 120
objectifs:
  - id: O1
    texte: Situer sur un ECU moteur diesel de récupération les blocs génériques (alimentation, microcontrôleur, entrées, sorties, injection et survoltage, communication, mémoire) et leurs mesures
    competences: [D10.3]
  - id: O2
    texte: Lire à l'outil de diagnostic sur banc, en lecture seule, les défauts internes et les valeurs réelles, et les interpréter par comparaison avec l'exemplaire de référence
    competences: [D10.1, D10.3]
  - id: O3
    texte: Justifier par écrit le choix d'un composant de remplacement équivalent pour un étage de sortie, à partir des fiches et de la qualification automobile
    competences: [D4.7]
prerequis: [S29, S28-L03, S24-L03]
exercices: [S30-L03-EX01, S30-L03-EX02]
references: [SRC-0045, SRC-0081, SRC-0082, SRC-0027, SRC-0087, SRC-0086, SRC-0067, SRC-0079, SRC-0013, SRC-0029]
criteres_evaluation:
  - objectif: O1
    critere: Exercice S30-L03-EX01 réussi et blocs repérés sur la carte au TP-45
  - objectif: O2
    critere: Exercice S30-L03-EX02 réussi et défauts recopiés avant tout effacement au TP-45
  - objectif: O3
    critere: Justification d'équivalence écrite dans le dossier de réparation du TP-45, quand un composant est remplacé
figures:
  - id: S30-F03
    fichier: ../figures/S30-F03-ecu-moteur.svg
    legende: "Blocs génériques d'un ECU moteur diesel : alimentation et supervision, microcontrôleur avec horloge et reset, interfaces d'entrée des capteurs, étages de sortie, commande d'injecteurs avec convertisseur élévateur, émetteur-récepteur CAN et mémoire. Schéma de principe de l'académie d'après les fiches citées ; pas le schéma d'un calculateur commercial et sans brochage."
    alt: "Au centre, un bloc microcontrôleur avec horloge et reset. À gauche, les interfaces d'entrée des capteurs. À droite, les étages de sortie et la commande d'injecteurs, avec un bloc convertisseur élévateur marqué tension élevée. En haut, l'alimentation et la supervision reliées à la batterie. En bas, la mémoire et l'émetteur-récepteur CAN relié au connecteur."
    origine: areprog
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction
---

## Théorie

### Les blocs d'un ECU moteur diesel

Un ECU moteur diesel réunit tous les blocs vus depuis S15 : on ne cherche pas « la panne de l'ECU »,
on cherche dans quel bloc elle se trouve [EXEMPLE : méthode pédagogique de l'académie].

- **Alimentation et supervision** : un circuit d'alimentation du système réunit souvent régulateurs, émetteur-récepteur CAN ou LIN et chien de garde avec reset [SOURCÉ : SRC-0045 §Introduction].
- **Microcontrôleur**, avec ses conditions de vie : alimentations, horloge, reset, mode de démarrage (S20).
- **Entrées** : capteur de régime inductif ou à effet Hall [SOURCÉ : SRC-0081 §DESCRIPTION] [SOURCÉ : SRC-0082 §7.1 Overview], capteurs de pression ratiométriques [SOURCÉ : SRC-0027 §Sensors that Are Ratiometric to the Supply Voltage], températures, pédale.
- **Sorties** : low-side et high-side pour relais et électrovannes, pont en H pour un papillon motorisé [SOURCÉ : SRC-0086 §7.3.1.1 Control Modes].
- **Commande d'injecteurs** : un circuit dédié règle le courant de chaque voie et diagnostique ses défauts [SOURCÉ : SRC-0087 §5.1 Introduction] ; son convertisseur élévateur peut produire jusqu'à 72 V à partir de la batterie dans le circuit cité [SOURCÉ : SRC-0087 §6.2.5 DC-DC converter].
- **Communication** : émetteur-récepteur CAN [SOURCÉ : SRC-0067 §1 Features], parfois ligne K (S24).
- **Mémoire** : mémoire du microcontrôleur et, selon la carte, une mémoire série externe (S21).

::figure{id=S30-F03}

Les circuits cités sont des exemples publics : ceux de la carte étudiée se relèvent sur la carte, par
leur marquage, et se recherchent dans leur fiche [À VÉRIFIER : composants relevés sur la carte du stock].
Le Bosch EDC17C60 du stock sert de support ; ce cours ne donne ni son brochage ni son schéma, et
n'en invente pas.

### Le bloc d'injection, à tension élevée

Le convertisseur élévateur de la commande d'injecteurs garde une tension élevée dans ses condensateurs
après la coupure. Avant de toucher la carte : décharge mesurée, puis mesurée de nouveau juste avant le
contact [SOURCÉ : SRC-0013 §2-7 Restriking Voltage] (FE-09). Sous tension, ce nœud se mesure à la sonde
différentielle [SOURCÉ : SRC-0029 §Floating Measurements], jamais avec une sonde dont la masse est
reliée à la terre (FE-07). La valeur de la tension survoltée de la carte étudiée se lit dans la fiche
du circuit relevé [À VÉRIFIER : fiche du circuit de commande d'injecteurs monté sur l'EDC17C60 du stock].

### L'outil de diagnostic sur banc

Sur le banc PB-1 (S18), l'outil de diagnostic lit les **défauts internes** et les **valeurs réelles**
(mesures du calculateur : tension batterie, pressions, températures, régime) [À VÉRIFIER : fonctions
disponibles, dans la documentation de l'outil de l'atelier]. Règles de l'académie [EXEMPLE : méthode pédagogique de l'académie] :

1. **Lecture seule** : aucune écriture, aucun codage, aucun apprentissage, aucun essai d'actionneur sans charge simulée et sans accord du formateur.
2. Défauts **recopiés tels quels**, avec leur état, **avant** tout effacement ; un défaut effacé sans être noté est une preuve perdue.
3. Sur banc, des défauts liés à l'absence du véhicule sont attendus (capteurs, actionneurs, bus) : on compare la liste à celle de l'exemplaire de référence sur le même banc avant toute conclusion [HYPOTHÈSE : à constater sur la référence].
4. Une valeur réelle se compare à la mesure : un capteur simulé dont on connaît la tension doit donner une valeur réelle cohérente.

Les services de diagnostic normalisés (ISO 14229) n'ont pas été consultés pour ce cours ; leurs
détails ne sont pas utilisés ici [À VÉRIFIER : norme ISO 14229, sous licence payante].

### Remplacer un composant de sortie

Quand une mesure désigne un transistor de sortie, le remplaçant est choisi comme en S28-L03 : mêmes
paramètres critiques d'après la fiche de l'original et celle du remplaçant, boîtier identique, et
qualification automobile adaptée. Pour un semi-conducteur discret, c'est l'AEC-Q101 ; le fabricant
qualifie lui-même ses composants [SOURCÉ : SRC-0079 §1.3.1 AEC Q101 Qualification]. La justification
est écrite au dossier ; sans fiche de l'original, on ne remplace pas « au plus proche »
[HYPOTHÈSE : règle du dossier de réparation, voir FE-13 et FE-14].

### Exemple 1 : une valeur réelle de pression

Un capteur de pression simulé reçoit 5,0 V d'alimentation ; son signal vaut 1,5 V [EXEMPLE].

1. Rapport signal sur alimentation : 1,5 / 5,0 = 0,30 [EXEMPLE].
2. Si l'alimentation tombe à 4,8 V et le signal à 1,44 V, le rapport reste 0,30 et la valeur réelle ne doit pas changer [SOURCÉ : SRC-0027 §Sensors that Are Ratiometric to the Supply Voltage].
3. Une valeur réelle qui change alors désigne la référence du convertisseur ou l'alimentation du capteur [HYPOTHÈSE].

### Exemple 2 : un défaut de circuit d'injecteur sur banc

Sur le banc, sans charge d'injecteur raccordée, l'outil signale un défaut de circuit ouvert d'injecteur [EXEMPLE].

1. Sans charge, ce défaut est attendu [HYPOTHÈSE].
2. Même défaut sur la référence, dans les mêmes conditions : il ne désigne rien.
3. Avec une charge simulée adaptée, le défaut ne doit plus être présent sur la référence ; s'il reste sur la carte en panne, on mesure la voie (S29-L03) [HYPOTHÈSE].

### Exemple 3 : noter avant d'effacer

L'outil affiche quatre défauts sur la carte en panne [EXEMPLE].

1. Les quatre sont recopiés avec leur état.
2. Effacement, coupure, nouvelle mise sous tension progressive, nouvelle lecture.
3. Un défaut qui revient aussitôt est présent ; un défaut qui ne revient pas était mémorisé, ou sa condition n'est pas réunie sur le banc [HYPOTHÈSE].

## Exercices

::exercice{id=S30-L03-EX01}

::exercice{id=S30-L03-EX02}
