---
id: S22-L03
titre: Sauvegarde, analyse d'un échec et récupération
chapitre: S22
version: "0.1"
statut: brouillon
duree_min: 60
objectifs:
  - id: O1
    texte: Appliquer une procédure de sauvegarde et de journalisation avant toute programmation
    competences: [D7.5, D9.1]
  - id: O2
    texte: Analyser l'échec d'une connexion de programmation en vérifiant les conditions dans l'ordre
    competences: [D7.5]
prerequis: [S22-L02, S20-L01]
exercices: [S22-L03-EX01, S22-L03-EX02]
references: [SRC-0056, SRC-0064]
criteres_evaluation:
  - objectif: O1
    critere: Exercice S22-L03-EX01 réussi et journal de programmation rendu au TP-32
  - objectif: O2
    critere: Exercice S22-L03-EX02 réussi et échec volontaire analysé au TP-32
figures:
  - id: S22-F03
    fichier: ../figures/S22-F03-arbre-echec.svg
    legende: "Arbre d'analyse d'un échec de connexion : alimentation et référence de tension, masse, câblage et sens du connecteur, reset et horloge, mode de démarrage, protections et réglages de l'outil. Chaque question se tranche par une mesure ou une lecture de la documentation. Méthode de l'académie."
    alt: "Une colonne de six questions reliées par des flèches : tension cible présente ; masse commune ; connecteur et câble corrects ; reset et horloge corrects ; mode de démarrage correct ; réglages de l'outil et protections. Chaque réponse non renvoie vers une case corriger puis recommencer."
    origine: areprog
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction
---

## Théorie

### Avant de programmer

Procédure de l'académie, dans la suite du protocole commun calculateurs réels :

1. identifier le microcontrôleur et l'interface d'après sa fiche et la documentation de l'outil ;
2. lire et sauvegarder deux fois, empreintes identiques (S21-L02) ;
3. noter au journal : outil, version du logiciel, réglages, tension, source d'alimentation ;
4. alimentation stable, limitée, une seule source (S22-L02) ;
5. ne rien débrancher ni couper tant que l'outil n'a pas confirmé la fin de l'opération.

### Analyser un échec de connexion

Un outil qui « ne trouve pas » le microcontrôleur ne dit pas pourquoi. On vérifie dans l'ordre, du
plus simple au plus profond [EXEMPLE : méthode de l'académie, qui reprend les conditions de vie de S20] :

1. tension cible présente au connecteur, à la bonne valeur ;
2. masse commune entre l'outil et la carte ;
3. connecteur dans le bon sens, câble intact, bonnes lignes ;
4. reset et horloge : un microcontrôleur sans horloge ou tenu en reset par un autre circuit peut ne pas répondre [HYPOTHÈSE : selon l'interface] ; en BDM, la sonde doit connaître la fréquence d'horloge de la cible [SOURCÉ : SRC-0064 §2.3 Communication Details] ;
5. mode de démarrage et broches de configuration (S22-L01) ;
6. réglages de l'outil, protections du microcontrôleur [À VÉRIFIER : protections en lecture propres à chaque famille, dans sa fiche].

::figure{id=S22-F03}

Sur certaines familles, des réglages de configuration choisissent la source d'horloge ; un mauvais
réglage peut empêcher le microcontrôleur de fonctionner [SOURCÉ : SRC-0056 §5.1 Selecting the Clock Source in the AVR MCU].
C'est une cause classique d'échec après une programmation [HYPOTHÈSE : à vérifier dans la fiche].

### Récupérer

Si une écriture a échoué, on ne tente pas d'autres opérations au hasard : on note le message de
l'outil, on vérifie l'alimentation et le raccordement, puis on suit la procédure de récupération de
la documentation de l'outil [À VÉRIFIER : procédure de récupération de chaque outil de l'atelier].
Les deux sauvegardes d'origine permettent de revenir au contenu initial.

### Exemple 7 : outil qui ne détecte rien

L'outil annonce « cible non détectée » [EXEMPLE].

1. Tension cible au connecteur : 0 V [EXEMPLE]. La carte n'est pas alimentée, ou l'outil attend qu'elle le soit.
2. Action : alimenter la carte par une seule source, selon la documentation de l'outil.
3. Reprendre l'arbre depuis le début.

### Exemple 8 : connexion instable

La connexion réussit une fois sur trois [EXEMPLE].

1. Hypothèses : câble trop long, masse mal reliée, ligne chargée, horloge de la sonde trop rapide [HYPOTHÈSE].
2. Mesures : masse, fronts à l'oscilloscope sur l'horloge de l'interface.
3. Action : baisser la vitesse de l'interface dans l'outil, si sa documentation le permet.

### Exemple 9 : programmation interrompue

Le câble a été heurté pendant une écriture ; l'outil affiche une erreur [EXEMPLE].

1. Ne pas couper l'alimentation ni relancer au hasard.
2. Noter le message, vérifier le raccordement, relancer selon la documentation de l'outil.
3. Vérifier par lecture et empreinte, en comparant au fichier écrit.

## Exercices

::exercice{id=S22-L03-EX01}

::exercice{id=S22-L03-EX02}
