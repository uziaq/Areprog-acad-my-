---
id: S21-L02
titre: Lire une mémoire, sauvegarder deux fois, vérifier par empreinte
chapitre: S21
version: "0.1"
statut: brouillon
duree_min: 90
objectifs:
  - id: O1
    texte: Lire une mémoire série hors circuit avec un programmateur réglé à la bonne tension et à la bonne organisation
    competences: [D7.4]
  - id: O2
    texte: Expliquer les risques d'une lecture en circuit (alimentation parasite du reste de la carte, conflit avec le microcontrôleur, niveaux)
    competences: [D7.3, D7.4]
  - id: O3
    texte: Sauvegarder deux fois et comparer les empreintes avant toute écriture ou soudure à proximité
    competences: [D7.4]
prerequis: [S21-L01, S19-L02]
exercices: [S21-L02-EX01, S21-L02-EX02, S21-L02-EX03]
references: [SRC-0059, SRC-0062, SRC-0053]
criteres_evaluation:
  - objectif: O1
    critere: Exercice S21-L02-EX01 réussi et mémoire lue hors circuit au TP-31
  - objectif: O2
    critere: Exercice S21-L02-EX02 réussi
  - objectif: O3
    critere: Exercice S21-L02-EX03 réussi et deux sauvegardes d'empreintes identiques rendues au TP-30 et au TP-31
figures:
  - id: S21-F02
    fichier: ../figures/S21-F02-double-sauvegarde.svg
    legende: "Procédure de sauvegarde : lecture 1, lecture 2, calcul des deux empreintes, comparaison. Identiques : archivage des deux fichiers et de l'empreinte au journal. Différentes : on n'écrit rien, on cherche la cause (contact, tension, organisation, conflit sur le bus) et l'on recommence. Procédure de l'académie."
    alt: "Organigramme de haut en bas : lecture 1, lecture 2, empreintes calculées, puis une question empreintes identiques. Oui : archiver les deux fichiers et noter l'empreinte. Non : ne rien écrire, chercher la cause, recommencer les lectures."
    origine: areprog
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction
---

## Théorie

### Lire hors circuit

Hors circuit, la mémoire est déposée (FR-17) ou montée sur un support, et seul le programmateur
l'alimente. Avant de lancer la lecture :

- choisir la référence exacte dans le logiciel du programmateur, d'après le marquage et la fiche (S21-L01) ;
- régler la tension d'alimentation du programmateur dans la plage de la fiche de la mémoire [À VÉRIFIER : tension admise par la fiche de la mémoire et réglages du programmateur de l'atelier] ;
- pour une Microwire, régler l'organisation x8 ou x16 comme la broche ORG sur la carte [SOURCÉ : SRC-0060 §Description] ;
- vérifier le sens de la mémoire dans le support : broche 1 au repère du support.

Aucune broche ne doit recevoir plus que la tension d'alimentation de la mémoire augmentée de
0,5 V [SOURCÉ : SRC-0059 §Absolute Maximum Ratings].
Un programmateur 5 V sur une mémoire alimentée en 3,3 V viole cette limite [EXEMPLE] : on vérifie les trois conditions d'interface de S19-L02 [SOURCÉ : SRC-0053 §1 Introduction].

### Lire en circuit

En circuit, la mémoire reste soudée et l'on se branche sur ses broches avec une pince. C'est plus
rapide et sans dépose, mais :

- alimenter la mémoire par sa broche VCC alimente aussi tout ce qui est relié au même rail : le programmateur peut ne pas fournir assez de courant, et la tension s'effondre [HYPOTHÈSE : dépend du câblage de la carte, à vérifier au schéma ou au relevé] ;
- le microcontrôleur, s'il démarre, peut parler sur le même bus en même temps que le programmateur ; le tenir en reset évite ce conflit [HYPOTHÈSE : méthode d'atelier, à adapter à chaque carte] ;
- les résistances de tirage et les autres circuits du bus chargent les lignes ; les fronts se contrôlent à l'oscilloscope si la lecture est instable [HYPOTHÈSE].

Une lecture en circuit qui donne deux sauvegardes différentes ne se corrige pas : on change de
méthode, jusqu'à la lecture hors circuit si besoin.

### L'empreinte et la double sauvegarde

Une **empreinte** (*hash*) est une courte valeur calculée à partir d'un fichier ; toute modification
du fichier donne, avec une très forte probabilité, une empreinte différente
[SOURCÉ : SRC-0062 §1 INTRODUCTION]. On utilise par exemple SHA-256, défini par cette norme
[SOURCÉ : SRC-0062 §1 INTRODUCTION].

Procédure de l'académie, reprise du protocole commun calculateurs réels (catalogue des TP) :

1. lire deux fois, en relançant la lecture complète, pas en copiant le premier fichier ;
2. calculer l'empreinte de chaque fichier ;
3. comparer : identiques, on archive les deux fichiers et l'on note l'empreinte au journal ; différentes, on n'écrit rien et l'on cherche la cause ;
4. aucune écriture et aucune soudure à proximité sans deux sauvegardes identiques.

::figure{id=S21-F02}

Un fichier rempli de FFh ou de 00h peut être une mémoire vierge, mais aussi une lecture ratée
(mémoire non alimentée, mauvais contact) [HYPOTHÈSE : à départager par une seconde méthode de
lecture ou une comparaison avec une référence].

### Exemple 4 : taille du fichier

On lit une EEPROM de 64 Kbit [EXEMPLE].

1. 64 × 1024 = 65 536 bits, soit 8192 octets.
2. Le fichier de sauvegarde doit faire 8192 octets ; une autre taille signale une mauvaise référence choisie dans le logiciel [HYPOTHÈSE].
3. On vérifie la taille avant de comparer les empreintes.

### Exemple 5 : deux empreintes différentes

En circuit, deux lectures donnent deux empreintes différentes [EXEMPLE].

1. Hypothèses : mauvais contact de la pince, tension qui s'effondre, microcontrôleur actif sur le bus [HYPOTHÈSE].
2. Contrôles : tension sur la broche VCC pendant la lecture, contact de la pince, reset du microcontrôleur.
3. Si l'écart persiste : lecture hors circuit, après dépose (FR-17).

### Exemple 6 : programmateur et tension

Le programmateur de l'atelier sort 5 V sur ses lignes ; la mémoire est alimentée en 3,3 V sur la carte [EXEMPLE].

1. Limite : 3,3 + 0,5 = 3,8 V au plus sur une broche [EXEMPLE], d'après la règle de la fiche [SOURCÉ : SRC-0059 §Absolute Maximum Ratings].
2. 5 V dépasse cette limite [EXEMPLE] : il faut régler le programmateur en 3,3 V ou utiliser un adaptateur de niveau.
3. On ne lance pas la lecture tant que ce point n'est pas réglé.

## Exercices

::exercice{id=S21-L02-EX01}

::exercice{id=S21-L02-EX02}

::exercice{id=S21-L02-EX03}
