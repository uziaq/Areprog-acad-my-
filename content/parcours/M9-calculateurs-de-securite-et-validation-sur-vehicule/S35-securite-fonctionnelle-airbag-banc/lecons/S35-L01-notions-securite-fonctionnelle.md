---
id: S35-L01
titre: Notions de sécurité fonctionnelle pour l'atelier
chapitre: S35
version: "0.1"
statut: brouillon
duree_min: 100
objectifs:
  - id: O1
    texte: Expliquer la démarche de sécurité fonctionnelle (danger, objectif de sécurité, niveau ASIL de A à D) sans prétendre appliquer la norme ISO 26262
    competences: [D10.6]
  - id: O2
    texte: Distinguer défaillances aléatoires et systématiques, et citer les moyens de surveillance d'un calculateur de sécurité (chien de garde, autotest, sommes de contrôle, surveillance des alimentations)
    competences: [D10.6]
  - id: O3
    texte: Expliquer la redondance et l'état sûr d'un calculateur d'airbag, et en déduire qu'une réparation ne contourne jamais une surveillance
    competences: [D10.6, D10.7]
prerequis: [S33, S20]
exercices: [S35-L01-EX01, S35-L01-EX02, S35-L01-EX03]
references: [SRC-0098, SRC-0099, SRC-0097, SRC-0096]
criteres_evaluation:
  - objectif: O1
    critere: Exercice S35-L01-EX01 réussi
  - objectif: O2
    critere: Exercices S35-L01-EX02 et S35-L01-EX03 réussis
  - objectif: O3
    critere: Chemin d'autorisation du tir et état sûr décrits au dossier du TP-52
figures:
  - id: S35-F01
    fichier: ../figures/S35-F01-securite-fonctionnelle.svg
    legende: "Démarche de sécurité fonctionnelle vue de l'atelier : un danger conduit à un objectif de sécurité, classé par un niveau ASIL de A à D, tenu par des mesures (surveillance, redondance) qui mènent à un état sûr en cas de défaut. D'après les livres blancs cités ; la norme elle-même n'est pas appliquée ici."
    alt: "Quatre blocs reliés par des flèches en haut : danger, objectif de sécurité, niveau ASIL de A à D, mesures. Sous les mesures, une flèche vers le bloc état sûr. En bas à gauche, deux blocs : défaillances aléatoires, détectées par surveillance, et défaillances systématiques, réduites par la méthode, reliés aux mesures."
    origine: areprog
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction
---

## Théorie

### Ce que veut dire sécurité fonctionnelle

La sécurité fonctionnelle est la part de la sécurité d'un système qui dépend de sa réponse prévisible à
ses entrées ou à une défaillance ; les normes partent du principe qu'un danger existe toujours et que
tout système a un taux de défaillance [SOURCÉ : SRC-0098 §Functional safety standards].
Dans l'automobile, l'airbag et le freinage intègrent la sécurité fonctionnelle depuis des années [SOURCÉ : SRC-0098 §Introduction].
La norme de référence pour l'automobile est l'ISO 26262, publiée en 2011, qui donne un cadre commun à
toute la chaîne, du constructeur au fabricant de circuits [SOURCÉ : SRC-0099 §Introduction].

Cette leçon donne des **notions pour l'atelier**. La norme est payante et n'a pas été consultée : le
cours ne prétend ni l'appliquer ni la résumer [À VÉRIFIER : texte de l'ISO 26262, non consulté].

### La démarche : danger, objectif, niveau

La démarche commence par les dangers et les objectifs de sécurité, puis l'architecture, puis les
composants ; une analyse des modes de défaillance identifie causes et effets [SOURCÉ : SRC-0098 §Functional safety process].
Les ingénieurs doivent prévoir les situations dangereuses, définir les fonctions de sécurité qui y
répondent, évaluer la réduction du risque obtenue et vérifier que ces fonctions marchent comme prévu [SOURCÉ : SRC-0098 §Functional safety standards].

L'ISO 26262 classe les exigences en niveaux **ASIL** de A à D, le niveau D étant le plus exigeant [SOURCÉ : SRC-0098 §Functional safety standards].
Le niveau attribué à l'airbag d'un véhicule donné n'est pas publié dans les sources citées [À VÉRIFIER : niveau ASIL d'un calculateur d'airbag, documentation constructeur].
Dans l'industrie, la norme IEC 61508 parle de SIL 1 à SIL 4 ; un SIL 1 correspond à un facteur de réduction du risque de 10 à 100 [SOURCÉ : SRC-0098 §Functional safety standards].

::figure{id=S35-F01}

### Défaillances aléatoires et systématiques

Une défaillance **aléatoire** vient d'un défaut du composant ou de ses conditions d'usage : perte de
l'horloge interne, d'un régulateur interne, données corrompues ; on la détecte par surveillance de
l'horloge et des régulateurs et par des sommes de contrôle [SOURCÉ : SRC-0099 §Managing random and systematic faults].
Une défaillance **systématique** vient d'une insuffisance de la conception ou de la fabrication ; on
la réduit par la rigueur du processus de développement et de production [SOURCÉ : SRC-0099 §Managing random and systematic faults].

Le taux de défaillance s'exprime en **FIT** : nombre de défaillances aléatoires attendues en un
milliard d'heures de fonctionnement [SOURCÉ : SRC-0099 §Introduction].

Pour l'atelier, la conséquence est directe : un composant remplacé par un équivalent « qui marche »
mais différent change les données de défaillance sur lesquelles la conception a été validée [HYPOTHÈSE : raison de préférer la référence d'origine sur un calculateur de sécurité].

### Les moyens de surveillance

Les microcontrôleurs de sécurité utilisent par exemple deux cœurs en parallèle comparés en
permanence, un autotest intégré et des codes correcteurs d'erreurs [SOURCÉ : SRC-0099 §Functional safety beyond microcontrollers].
Des circuits annexes surveillent le microcontrôleur : chien de garde à questions-réponses, référence
du convertisseur, alimentation des entrées et sorties [SOURCÉ : SRC-0099 §System safety considerations].
Le circuit de base de système d'airbag cité intègre un chien de garde et un reset à la mise sous tension [SOURCÉ : SRC-0097 §Features].

Ces surveillances se voient sur la carte comme des liaisons supplémentaires (reset, chien de garde,
autorisations) ; une piste coupée sur l'une d'elles peut suffire à bloquer le calculateur [HYPOTHÈSE : à confirmer par la mesure et la fiche du circuit].

### Redondance et état sûr de l'airbag

Dans un calculateur d'airbag, le tir ne dépend pas d'un seul organe. Le circuit de base de système
cité contient une **logique de sécurité** indépendante du microcontrôleur, qui compare les données des
capteurs à des seuils et décide d'armer [SOURCÉ : SRC-0097 §SAFING LOGIC].
Le circuit de commande des allumeurs cité ne peut pas tirer tant que son entrée d'autorisation FEN est au niveau bas [SOURCÉ : SRC-0096 §FEN_1 and FEN_2 (FEN) ($C8 COMMAND)].
Il faut donc à la fois l'ordre du microcontrôleur et l'autorisation de la logique de sécurité : c'est
une **redondance**.

L'**état sûr** est celui où la fonction ne peut pas nuire. Le circuit cité fonctionne en mode de
sécurité pour empêcher un déploiement intempestif [SOURCÉ : SRC-0097 §INTRODUCTION].
Ses sorties d'armement passent en haute impédance pendant les resets et au démarrage [SOURCÉ : SRC-0097 §ARM OUTPUT (ARM, DISARM)].

Règle d'atelier : une surveillance n'est **jamais** shuntée, désactivée ou forcée pour « faire
démarrer » un calculateur de sécurité (protocole renforcé de l'académie).

### Exemple 1 : lire un taux FIT

Un composant a un taux de 50 FIT [EXEMPLE].

1. 50 FIT : 50 défaillances attendues en un milliard d'heures cumulées [SOURCÉ : SRC-0099 §Introduction].
2. Une flotte de 10 000 calculateurs fonctionne 1 000 h chacun, soit 10 millions d'heures cumulées [EXEMPLE].
3. Défaillances attendues : 50 × 10 000 000 / 1 000 000 000 = 0,5 [EXEMPLE].

### Exemple 2 : un facteur de réduction du risque

Une fonction de sécurité réduit un risque d'un facteur 50 [EXEMPLE].

1. Le SIL 1 couvre un facteur de 10 à 100 [SOURCÉ : SRC-0098 §Functional safety standards].
2. Un facteur 50 est donc dans la plage du SIL 1 [EXEMPLE].
3. Ce calcul illustre la notion ; il ne classe aucun calculateur réel.

### Exemple 3 : la période d'un chien de garde

Un microcontrôleur doit rafraîchir son chien de garde toutes les 20 ms [EXEMPLE].

1. Fréquence de rafraîchissement : 1 / 0,020 s = 50 Hz [EXEMPLE].
2. Si le rafraîchissement manque, le chien de garde provoque un reset [HYPOTHÈSE : comportement à lire dans la fiche du circuit relevé].
3. À l'oscilloscope, un reset périodique à ce rythme signale un programme qui ne tourne pas normalement [HYPOTHÈSE].

## Exercices

::exercice{id=S35-L01-EX01}

::exercice{id=S35-L01-EX02}

::exercice{id=S35-L01-EX03}
