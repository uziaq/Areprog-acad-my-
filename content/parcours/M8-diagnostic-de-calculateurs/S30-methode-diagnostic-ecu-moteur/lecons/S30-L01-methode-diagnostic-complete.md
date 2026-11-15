---
id: S30-L01
titre: La méthode de diagnostic complète d'un calculateur
chapitre: S30
version: "0.1"
statut: brouillon
duree_min: 90
objectifs:
  - id: O1
    texte: Dérouler dans l'ordre les étapes de la méthode de l'académie, de la réception à la mémoire, en justifiant cet ordre
    competences: [D1.6]
  - id: O2
    texte: Construire un arbre d'hypothèses et choisir la mesure qui départage deux hypothèses, avant tout remplacement de composant
    competences: [D1.6, D10.3]
prerequis: [S29, S18-L03]
exercices: [S30-L01-EX01, S30-L01-EX02, S30-L01-EX03]
references: [SRC-0013]
criteres_evaluation:
  - objectif: O1
    critere: Exercice S30-L01-EX01 réussi et étapes suivies dans l'ordre au TP-45
  - objectif: O2
    critere: Exercices S30-L01-EX02 et S30-L01-EX03 réussis et arbre d'hypothèses rédigé au TP-45
figures:
  - id: S30-F01
    fichier: ../figures/S30-F01-methode.svg
    legende: "Les dix étapes de la méthode de diagnostic de l'académie, de la réception à la mémoire : on n'avance à l'étape suivante que si la précédente est conforme ou expliquée. Méthode pédagogique de l'académie."
    alt: "Dix cases numérotées en deux rangées reliées par des flèches : réception, symptôme et historique, inspection visuelle, alimentations, conditions de vie du microcontrôleur, entrées, sorties, communication, mémoire, conclusion et validation."
    origine: areprog
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction
---

## Théorie

### Dix étapes, dans l'ordre

La méthode de l'académie reprend les cinq temps de S01 (symptôme, hypothèses, mesures qui départagent,
conclusion sur une preuve, intervention et validation) et les applique à un calculateur complet
[EXEMPLE : méthode pédagogique de l'académie] :

1. **Réception** : identification de la carte (référence lue sur l'étiquette, origine), état, photos des deux faces ; aucune donnée client ni identifiant de véhicule au dossier.
2. **Symptôme et historique** : ce qui est constaté, dans quelles conditions ; réparations antérieures visibles.
3. **Inspection visuelle** au microscope : composants brûlés ou fissurés, corrosion (S28), reprises anciennes, soudures.
4. **Alimentations** : protocole commun calculateurs réels, étages à tension élevée repérés et décharge mesurée, puis l'ordre « alimentation d'abord » de S18-L03.
5. **Conditions de vie du microcontrôleur** : alimentations, horloge, reset, mode de démarrage (S20).
6. **Entrées** : interfaces de capteurs (S29-L01).
7. **Sorties** : étages de puissance (S29-L02, S29-L03).
8. **Communication** : CAN, LIN, ligne K (M6).
9. **Mémoire** : sauvegarde double avant toute écriture ou soudure à proximité, empreintes identiques (S21).
10. **Conclusion et validation** : preuve, réparation, mêmes mesures après réparation (S33 pour la validation complète).

::figure{id=S30-F01}

L'ordre va des mesures sans risque aux mesures sous tension, et du plus général au plus particulier :
une sortie mesurée sur un calculateur dont l'alimentation est fausse ne prouve rien
[HYPOTHÈSE : principe de la méthode, cohérent avec S18-L03]. Avant toute manipulation de la carte, la
décharge des étages à tension élevée est **mesurée**, puis mesurée de nouveau juste avant
[SOURCÉ : SRC-0013 §2-7 Restriking Voltage] (FE-09).

### L'arbre d'hypothèses

Pour chaque symptôme, on écrit les causes possibles, puis la mesure qui les **départage**
[EXEMPLE : méthode pédagogique de l'académie] :

- une hypothèse est une phrase vérifiable : « le régulateur 5 V ne régule plus » [EXEMPLE], pas « l'alimentation » ;
- une mesure est choisie parce qu'elle donne des résultats différents selon l'hypothèse vraie ;
- on commence par la mesure la moins risquée et la plus discriminante ;
- chaque hypothèse écartée l'est par une mesure notée ; aucune n'est écartée « à l'intuition ».

Remplacer un composant sans mesure qui le justifie est une faute éliminatoire du module (FE-13).
Présenter une donnée inventée comme un fait aussi (FE-14) : une valeur attendue vient d'une fiche,
d'une documentation ou d'une carte de référence, et son origine est notée.

### Contre-exemple : la réparation par essais

Le catalogue des ressources (VID-12) montre la réparation d'une sortie d'ECU moteur par essais
successifs. Trois défauts de méthode y sont relevés : une valeur de résistance déduite de sa mesure en
circuit (E-25), des valeurs essayées sous tension de la plus haute à la plus basse (E-27), et une panne
déclarée « résolue » sans essai fonctionnel ni recherche de la cause qui a détruit le transistor (E-28).
La carte de référence, l'arbre d'hypothèses et la validation évitent ces trois erreurs.

### Exemple 1 : ordonner les contrôles

Un ECU moteur de récupération ne communique pas sur le banc [EXEMPLE].

1. Avant de chercher sur le CAN : alimentations (étape 4), puis conditions de vie du microcontrôleur (étape 5).
2. Un microcontrôleur sans horloge ou en reset ne communique pas, même avec un bus sain [HYPOTHÈSE].
3. On ne passe à l'étape 8 que si les étapes 4 et 5 sont conformes.

### Exemple 2 : une mesure qui départage

Un injecteur simulé ne reçoit aucune commande. Deux hypothèses : transistor de sortie coupé, ou
commande absente sur sa grille [EXEMPLE].

1. Mesure qui départage : la grille pendant la commande, à la sonde adaptée (S29-L03).
2. Grille commandée, sortie immobile : le transistor est suspect [HYPOTHÈSE].
3. Grille immobile : on remonte vers le circuit de commande ; le transistor n'est pas remplacé.

### Exemple 3 : une conclusion prudente

Après remplacement d'un transistor de sortie justifié par la mesure, la sortie fonctionne sur le banc
avec une charge simulée [EXEMPLE].

1. Prouvé : la sortie commute sur charge simulée.
2. Non prouvé : la cause qui a détruit le transistor (charge ou faisceau en court-circuit côté véhicule) [HYPOTHÈSE].
3. Le dossier le déclare comme limite, et demande le contrôle de la charge et du faisceau.

## Exercices

::exercice{id=S30-L01-EX01}

::exercice{id=S30-L01-EX02}

::exercice{id=S30-L01-EX03}
