---
id: S35-L03
titre: Mettre un calculateur d'airbag sous tension sur banc, sans pyrotechnie
chapitre: S35
version: "0.1"
statut: brouillon
duree_min: 100
objectifs:
  - id: O1
    texte: Appliquer dans l'ordre le protocole renforcé avant l'intervention (calculateur seul, repérage, décharge mesurée, mémoire)
    competences: [D10.6]
  - id: O2
    texte: Préparer le banc (alimentation limitée, simulateurs d'allumeurs de valeur sourcée) et vérifier un simulateur par la mesure
    competences: [D10.6, D10.7]
  - id: O3
    texte: Interpréter l'état d'un calculateur d'airbag sous tension sur banc en séparant ce qui est observé, ce qui est supposé et ce qui dépend du constructeur
    competences: [D10.7]
prerequis: [S35-L02, S18, S04]
exercices: [S35-L03-EX01, S35-L03-EX02]
references: [SRC-0013, SRC-0097, SRC-0096, SRC-0002]
criteres_evaluation:
  - objectif: O1
    critere: Exercice S35-L03-EX01 réussi et critères sans-pyrotechnie, decharge-mesuree, double-sauvegarde et memoire-evenements de la grille renforcée prouvés au TP-52
  - objectif: O2
    critere: Exercice S35-L03-EX02 réussi et critères charges-sourcees et alimentation-limitee prouvés au TP-52
  - objectif: O3
    critere: Conclusion du TP-52 qui sépare observé, supposé et à vérifier par constructeur
figures:
  - id: S35-F03
    fichier: ../figures/S35-F03-banc-sans-pyrotechnie.svg
    legende: "Montage de principe pour un calculateur d'airbag sur banc : alimentation de laboratoire limitée en courant, fusible et interrupteurs 30 puis 15, calculateur seul sur le poste ESD, sorties d'allumeurs reliées à des simulateurs de valeur documentée, voltmètre pour la décharge de la réserve, outil de diagnostic en lecture seule. Aucune pyrotechnie dans l'atelier. Câblage d'après la documentation du constructeur."
    alt: "À gauche, une alimentation de laboratoire puis un bloc fusible et interrupteurs reliés au calculateur d'airbag au centre. À droite, des simulateurs d'allumeurs, et un cadre en pointillés qui indique aucune pyrotechnie dans l'atelier. Sous le calculateur, un voltmètre pour la décharge de la réserve. À gauche en bas, l'outil de diagnostic relié en pointillés."
    origine: areprog
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction
---

## Théorie

### Le principe : rien qui puisse se déclencher

Un allumeur d'airbag est un élément pyrotechnique : une impulsion de courant suffit à le déclencher, et
c'est précisément ce que l'étage de commande sait faire (L02). Le protocole renforcé de l'académie en
tire une règle sans exception : **aucune pyrotechnie dans l'atelier de formation**, le calculateur
arrive seul, sans module d'airbag, prétensionneur ni autre élément pyrotechnique. Les sorties
d'allumeurs ne sont reliées qu'à des simulateurs.

Cette leçon suit l'ordre du protocole renforcé ; le TP-52 l'applique point par point, avec une preuve
pour chaque critère de la grille renforcée.

### Avant l'intervention

1. **Calculateur seul**, provenance légitime documentée, aucune donnée client ni identifiant de véhicule.
2. **Repérer** sur la carte la réserve d'énergie et les étages d'allumeurs, par le marquage des circuits et leurs fiches (L02) ; chaque repérage est étiqueté [À VÉRIFIER : repérage sur la carte étudiée].
3. **Mesurer la décharge** de la réserve avant tout contact. Un condensateur déchargé peut voir sa tension remonter après la décharge : on mesure, on attend, on mesure de nouveau [SOURCÉ : SRC-0013 §2-7 Restriking Voltage].
4. **Mémoire** : sauvegarde en double, empreintes identiques, avant toute mise sous tension si une mémoire externe est lisible ; l'état de la mémoire d'événements est noté **sans modification** (S21).

Le poste ESD reste en place pendant toute l'intervention : les circuits sont sensibles aux décharges électrostatiques [SOURCÉ : SRC-0002 §ESD Damage: How Devices Fail].

### Sur le banc

5. **Alimentation de laboratoire limitée en courant**, limite écrite avant la mise sous tension, mise sous tension progressive : borne 30 puis borne 15 (S18).
6. **Simulateurs d'allumeurs** : leur valeur vient de la documentation de l'outil de diagnostic ou du constructeur [À VÉRIFIER : valeur pour le calculateur étudié]. Chaque simulateur est mesuré avant d'être branché, cordons compensés (S04).

Si aucune valeur documentée n'est disponible, les sorties restent **ouvertes** : rien n'y est branché,
et le défaut « allumeur ouvert » attendu est noté [HYPOTHÈSE : défaut attendu, d'après le diagnostic de résistance de SRC-0096].
On ne choisit jamais une résistance « typique » au hasard.

::figure{id=S35-F03}

### Ce que l'on observe sous tension

Sous tension, l'élévateur charge la réserve d'énergie [SOURCÉ : SRC-0097 §ENERGY RESERVE CONTROL] ; le courant consommé
au démarrage est donc plus fort qu'en régime établi [HYPOTHÈSE : à constater sur l'ampèremètre du banc].
Le calculateur réalise ses diagnostics d'allumeurs sans tirer [SOURCÉ : SRC-0096 §SQUIB RESISTANCE DIAGNOSTICS ($D0–$D3 COMMAND)].
L'outil de diagnostic, s'il communique sur banc, affiche les défauts en **lecture seule** [À VÉRIFIER : communication sur banc sans le reste du véhicule].

Un calculateur peut refuser de fonctionner normalement pour des raisons qui ne sont pas des pannes de
carte : mémoire de collision après un déploiement, éventuel verrouillage après choc, codage ou
appairage au véhicule [À VÉRIFIER par constructeur : mémoire de collision, verrouillage, codage et appairage].
Le cours n'enseigne ni l'effacement des données de collision ni le contournement d'un verrouillage.

### Après la mise sous tension

7. Couper la borne 15 puis la borne 30 ; **mesurer de nouveau la décharge** de la réserve avant de toucher la carte [SOURCÉ : SRC-0013 §2-7 Restriking Voltage].
8. Dossier de validation renforcée : ce qui est validé sur banc, ce qui ne peut l'être que sur véhicule, ce qui ne peut pas l'être en atelier.
9. Aucun calculateur de sécurité n'est remis en circulation pendant le cursus (décision D-14).

### Exemple 1 : une décharge qui remonte

Après coupure, la réserve d'un calculateur d'entraînement est mesurée [EXEMPLE].

1. Première mesure : 0,3 V [EXEMPLE].
2. Deux minutes plus tard : 0,9 V [EXEMPLE].
3. La tension remonte : la décharge n'est pas acquise [SOURCÉ : SRC-0013 §2-7 Restriking Voltage] ; on poursuit la décharge selon la procédure de l'atelier et on remesure.

### Exemple 2 : la puissance au démarrage

La limite de courant du banc est écrite à 0,3 A sous 12 V pour la première mise sous tension [EXEMPLE].

1. Puissance maximale fournie : 12 × 0,3 = 3,6 W [EXEMPLE].
2. Si l'alimentation passe en limitation, la tension chute et le calculateur peut redémarrer en boucle [HYPOTHÈSE].
3. On relève alors la limite par paliers, chaque palier écrit au journal, en observant le courant.

### Exemple 3 : vérifier un simulateur

La documentation de l'outil indique une valeur de simulateur de 2,2 Ω [EXEMPLE].

1. Le multimètre affiche 2,6 Ω, cordons compris [EXEMPLE].
2. Cordons court-circuités : 0,4 Ω [EXEMPLE].
3. Résistance du simulateur : 2,6 − 0,4 = 2,2 Ω [EXEMPLE] ; conforme, il peut être branché.

## Exercices

::exercice{id=S35-L03-EX01}

::exercice{id=S35-L03-EX02}
