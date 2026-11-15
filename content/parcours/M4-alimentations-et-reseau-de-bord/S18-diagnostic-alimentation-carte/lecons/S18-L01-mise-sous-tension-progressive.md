---
id: S18-L01
titre: Banc d'alimentation et mise sous tension progressive
chapitre: S18
version: "0.1"
statut: brouillon
duree_min: 90
objectifs:
  - id: O1
    texte: Construire et documenter une alimentation de banc protégée, avec fusible, limitation de courant et interrupteurs séparés pour les bornes 30 et 15
    competences: [D3.2, D10.1]
  - id: O2
    texte: Appliquer le protocole commun calculateurs réels, dont le repérage des étages à tension interne élevée et la mesure de leur décharge
    competences: [D10.1, D10.6]
  - id: O3
    texte: Mettre sous tension un calculateur de façon progressive et interpréter le courant consommé dans chaque état
    competences: [D3.2, D10.1]
prerequis: [S17-L03, S15-L03]
exercices: [S18-L01-EX01, S18-L01-EX02, S18-L01-EX03]
references: [SRC-0035, SRC-0013, SRC-0029, SRC-0046]
criteres_evaluation:
  - objectif: O1
    critere: Exercice S18-L01-EX01 réussi et banc PB-1 documenté par son schéma
  - objectif: O2
    critere: Exercice S18-L01-EX02 réussi, questions de sécurité du QCM réussies et protocole suivi au TP-25
  - objectif: O3
    critere: Exercice S18-L01-EX03 réussi et courants relevés dans chaque état au TP-25
figures:
  - id: S18-F01
    fichier: ../figures/S18-F01-banc-alimentation.svg
    legende: "Banc d'alimentation pédagogique PB-1 : alimentation de laboratoire limitée en courant, fusible sur le plus, interrupteur de la borne 30 et interrupteur de la borne 15, ampèremètre en série, retour de masse (borne 31) vers le connecteur du calculateur. Schéma de principe."
    alt: "Une alimentation de laboratoire à gauche. Son plus passe par un fusible puis un ampèremètre, puis se sépare en deux branches, chacune avec un interrupteur, marquées borne 30 et borne 15, vers un connecteur à droite. Le moins de l'alimentation rejoint le connecteur, marqué borne 31."
    origine: areprog
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction
---

## Théorie

### Le banc d'alimentation

À partir de cette semaine, on alimente de vrais calculateurs de récupération. Le banc (étape PB-1
du projet « banc de test ») comprend :

- une **alimentation de laboratoire limitée en courant**, limite écrite avant chaque mise sous tension (faute éliminatoire FE-02 sinon) ;
- un **fusible** sur le plus, au plus près de l'alimentation : il est calibré en ampères, mais aussi en tension, et il existe des fusibles rapides et temporisés [SOURCÉ : SRC-0035 §Fuses] ;
- deux **interrupteurs** séparés : borne 30 (plus permanent) et borne 15 (plus après contact), pour reproduire « contact coupé » et « contact mis » (S17-L01) ;
- un **ampèremètre** en série, ou l'afficheur de courant de l'alimentation, pour suivre la consommation ;
- un câblage du connecteur du calculateur tiré de la documentation du constructeur, chaque broche repérée [À VÉRIFIER : brochage dans la documentation du calculateur utilisé].

::figure{id=S18-F01}

Le fusible ne remplace pas la limitation de courant : il protège le câblage du banc en cas de défaut
de l'alimentation ou de court-circuit franc [HYPOTHÈSE : rôle du fusible sur un banc pédagogique, calibre à choisir d'après le câblage et la consommation attendue].

### Le protocole commun calculateurs réels

Règle de l'académie (catalogue des TP), applicable à tout calculateur réel à partir de S18 :

1. Photos des deux faces avant toute intervention ; inventaire de la carte au journal.
2. Repérer les **convertisseurs élévateurs et étages à tension interne élevée** (par exemple les étages d'injection d'un ECU moteur diesel) [À VÉRIFIER : tension dans la fiche du composant de commande relevé sur la carte].
3. Après coupure, **mesurer** la décharge des condensateurs de ces étages avant de toucher la carte ou de souder ; ne jamais supposer qu'un temps d'attente suffit.
4. Mesurer ces nœuds avec une **sonde différentielle** ou un oscilloscope à voies isolées, jamais avec une sonde dont la masse est reliée à la terre.
5. Mise sous tension progressive avec limitation de courant (méthode ci-dessous).
6. Sauvegarder les mémoires deux fois, empreintes identiques, avant toute écriture ou soudure à proximité.

La décharge se fait à travers une résistance, puis la tension se mesure de nouveau, car une tension
de recouvrement peut réapparaître sur un électrolytique [SOURCÉ : SRC-0013 §2-7 Restriking Voltage]
(décharge non mesurée ou tension interne élevée non identifiée : faute éliminatoire FE-09). La
masse d'une sonde ordinaire est reliée à la terre : la poser sur un nœud qui n'est pas à la masse
crée un court-circuit [SOURCÉ : SRC-0029 §Use Proper Grounding Procedures] (FE-07). Une mise sous
tension sans procédure progressive est la faute éliminatoire FE-08.

Les calculateurs d'airbag, d'ABS / ESP et de direction restent réservés au module M9 (S17-L03).

### La mise sous tension progressive

Méthode de l'académie [EXEMPLE : procédure pédagogique, les limites se justifient pour chaque calculateur] :

1. Carte inspectée, photos faites, étages à tension élevée repérés.
2. Interrupteurs 30 et 15 ouverts ; tension réglée à la tension nominale du réseau, limite de courant basse, écrite au journal.
3. Fermer la borne 30 seule : relever le courant. Un calculateur au repos consomme peu ; un SBC en veille peut descendre sous 100 µA [SOURCÉ : SRC-0046 §Abstract].
4. Fermer la borne 15 : le calculateur se réveille ; relever le courant après stabilisation.
5. Si l'alimentation passe en limitation (tension qui s'effondre, courant égal à la limite) : couper aussitôt et chercher un court-circuit (S18-L02) ; ne jamais monter la limite « pour voir ».
6. Si le courant est normal : relever les rails internes (S15, S16) puis lire les défauts internes à l'outil de diagnostic [À VÉRIFIER : raccordement de l'outil sur banc et fonctions disponibles, dans la documentation de l'outil].
7. Couper la borne 15, attendre le retour en veille et relever de nouveau le courant de la borne 30.

La valeur « normale » du courant de chaque état ne s'invente pas : elle se lit sur un **exemplaire
de référence** de même référence matérielle, mesuré dans les mêmes conditions [HYPOTHÈSE : méthode
d'atelier, faute de valeur publiée par le constructeur].

### Lire l'alimentation de laboratoire

L'alimentation est un instrument de diagnostic (S01) :

- **régulation en tension** : la tension reste à la consigne, le courant est celui que demande la carte ;
- **limitation de courant** : le courant reste à la limite et la tension baisse ; la carte demande plus que la limite [HYPOTHÈSE : à confirmer avec la notice de l'alimentation de l'atelier, qui indique le mode actif].

### Exemple 1 : calibre d'un fusible de banc

Un calculateur consomme au plus 1,5 A contact mis ; le câblage du banc supporte 5 A [EXEMPLE].

1. Le fusible doit laisser passer le courant normal avec une marge, et couper avant que le câblage ne souffre.
2. Un calibre de 3 A [EXEMPLE] convient ; sa tension assignée doit dépasser celle du banc [SOURCÉ : SRC-0035 §Fuses].
3. Calibre et type (rapide ou temporisé) sont notés sur le schéma du banc.

### Exemple 2 : un calculateur qui reste réveillé

Borne 30 seule, un calculateur consomme 45 mA ; l'exemplaire de référence, dans les mêmes conditions, consomme 0,2 mA après sa mise en veille [EXEMPLE].

1. Écart d'un facteur 200 environ : le calculateur ne s'endort pas, ou une partie de la carte consomme anormalement [HYPOTHÈSE].
2. Vérifier d'abord l'état de la borne 15 et des entrées de réveil (S17-L03).
3. Puis chercher la partie qui consomme : thermique ou chute de tension (S18-L02).

### Exemple 3 : une limitation au premier contact

Au premier contact de la borne 30, l'alimentation limitée à 0,3 A affiche 0,3 A et 1,2 V [EXEMPLE].

1. La carte demande plus que la limite : court-circuit ou surconsommation probable [HYPOTHÈSE].
2. Couper aussitôt ; ne pas monter la limite pour voir si « ça démarre ».
3. Passer à la localisation du court-circuit sous courant limité (S18-L02).

## Exercices

::exercice{id=S18-L01-EX01}

::exercice{id=S18-L01-EX02}

::exercice{id=S18-L01-EX03}
