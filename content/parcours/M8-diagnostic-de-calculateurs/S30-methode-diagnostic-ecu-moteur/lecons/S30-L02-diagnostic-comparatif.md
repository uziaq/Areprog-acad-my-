---
id: S30-L02
titre: Le diagnostic comparatif, carte saine contre carte en panne
chapitre: S30
version: "0.1"
statut: brouillon
duree_min: 90
objectifs:
  - id: O1
    texte: Relever broche par broche, hors tension, les résistances et les chutes de diode d'une carte en panne et d'une carte de référence de même référence matérielle, et interpréter les écarts
    competences: [D10.3, D5.4]
  - id: O2
    texte: Expliquer le principe, les avantages et les limites de l'analyse de signature courant-tension, et reconnaître les formes de base d'une signature
    competences: [D10.3]
prerequis: [S04, S08, S30-L01]
exercices: [S30-L02-EX01, S30-L02-EX02, S30-L02-EX03]
references: [SRC-0088, SRC-0008, SRC-0011]
criteres_evaluation:
  - objectif: O1
    critere: Exercices S30-L02-EX01 et S30-L02-EX02 réussis et tableau broche par broche complet au TP-44
  - objectif: O2
    critere: Exercice S30-L02-EX03 réussi
figures:
  - id: S30-F02
    fichier: ../figures/S30-F02-signatures.svg
    legende: "Formes de base d'une signature courant-tension (courant en vertical, tension en horizontal) : circuit ouvert, court-circuit, résistance, jonction, condensateur, et jonction avec condensateur en parallèle. Formes idéalisées d'après le principe de la note citée ; pas des captures d'instrument."
    alt: "Six petits écrans quadrillés. Circuit ouvert : trait horizontal. Court-circuit : trait vertical. Résistance : trait oblique. Jonction : trait horizontal d'un côté puis montée verticale de l'autre. Condensateur : ellipse. Jonction avec condensateur en parallèle : courbe de jonction élargie en boucle."
    origine: areprog
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction
---

## Théorie

### Pourquoi comparer

Sans schéma, on ne sait pas quelle résistance ou quelle chute de diode « doit » se lire entre une
broche du connecteur et la masse. Une carte saine de **même référence matérielle** donne cette valeur :
on mesure les deux cartes de la même façon et l'on cherche les écarts. Comparer les signatures de
cartes saines à celles de cartes suspectes permet de repérer les composants et les liaisons en défaut [SOURCÉ : SRC-0088 §Introduction].
C'est la règle de la liste d'achats du cursus : pour chaque famille de calculateurs, un exemplaire de
référence et un exemplaire en panne.

Deux cartes ne sont comparables que si leur référence matérielle est la même : une autre version
logicielle ne change pas la carte, une autre référence matérielle peut la changer
[HYPOTHÈSE : à confirmer par la comparaison visuelle des deux cartes, composant par composant].

### Relever broche par broche

Les deux cartes sont **hors tension**, condensateurs des étages à tension élevée déchargés et la
décharge mesurée [SOURCÉ : SRC-0013 §2-7 Restriking Voltage]. Pour chaque broche du connecteur, on note :

- la **résistance** par rapport à la masse de la carte, au même calibre sur les deux cartes ;
- la **chute de diode** en test de jonction, pointe rouge sur la masse puis pointe noire sur la masse : le test de jonction affiche la tension d'une jonction parcourue par un petit courant, et un circuit ouvert en sens inverse [SOURCÉ : SRC-0008 §Diode test] ;
- les mêmes relevés par rapport à l'alimentation interne principale si elle est accessible [EXEMPLE : choix de l'académie].

Une jonction au silicium en sens direct se lit avec une chute de quelques dixièmes de volt au test de
jonction [SOURCÉ : SRC-0011 §Meter check of a diode]. En circuit, la valeur lue est celle de tout le
réseau entre les deux pointes (protections d'entrée, résistances, condensateurs) : elle n'est
interprétable que par comparaison avec la référence [HYPOTHÈSE : principe du diagnostic comparatif].
Un condensateur en parallèle fait dériver la lecture pendant sa charge : on attend la stabilisation
sur les deux cartes, avec la même méthode [HYPOTHÈSE : à constater sur la carte de référence].

### Interpréter les écarts

| Constat sur la carte en panne | Piste | Mesure suivante |
|---|---|---|
| Résistance ou chute nulle, normale sur la référence | court-circuit sur la ligne (protection d'entrée, transistor de sortie) [HYPOTHÈSE] | localiser le composant (méthodes de S18-L03) |
| Circuit ouvert, conduction sur la référence | piste, résistance série ou soudure coupée [HYPOTHÈSE] | continuité de la broche au composant |
| Écart faible, de l'ordre de la dispersion entre cartes | rien de concluant [HYPOTHÈSE] | refaire les deux mesures, puis comparer à une troisième carte si possible |

Un écart n'est pas une panne prouvée : il désigne la zone où chercher. La conclusion vient de la
mesure du composant isolé, ou de la constatation visuelle (soudure, piste) [HYPOTHÈSE : règle de la méthode S30-L01].

### Les signatures courant-tension

L'analyse de signature applique entre deux points une tension sinusoïdale à courant limité et
affiche le courant en vertical, la tension en horizontal [SOURCÉ : SRC-0088 §Introduction].
Chaque composant a une forme reconnaissable.

::figure{id=S30-F02}

Avantages cités par la note : l'essai se fait **hors tension**, donc même sur une carte qui ne peut pas
être alimentée et sans risque de l'abîmer davantage, et sans schéma [SOURCÉ : SRC-0088 §What are the advantages of Power-off test?].
Limites : ce n'est pas un essai fonctionnel, il ne détecte pas un problème de logique ou de
programme, il demande une carte saine pour comparer, et l'interprétation s'apprend [SOURCÉ : SRC-0088 §What are the limitations of Power-off test?].

Dans l'exemple de la note, la signature de la carte saine montre l'ellipse d'un condensateur en
parallèle sur une jonction ; celle de la carte en panne ne montre plus que la jonction. Le microscope
confirme une soudure défectueuse du condensateur [SOURCÉ : SRC-0088 §What type of problems will Power-off Diagnostics detect?].
La signature a désigné la zone ; l'inspection a donné la preuve.

L'instrument de signature, sa tension et sa limite de courant se choisissent d'après sa notice
[À VÉRIFIER : instrument disponible à l'atelier et sa notice] ; à défaut, le multimètre en test de
jonction donne une partie de l'information.

### Exemple 1 : une broche d'entrée en court-circuit

Broche d'un capteur, par rapport à la masse : 0,6 V sur la référence, 0,0 V sur la carte en panne, dans les deux sens [EXEMPLE].

1. Écart net, dans les deux sens : court-circuit sur la ligne [HYPOTHÈSE].
2. On suit la piste jusqu'aux premiers composants (résistance série, diode de protection, condensateur de filtre).
3. On isole le composant suspect (une patte dessoudée) et on le mesure seul avant de le remplacer (FE-13).

### Exemple 2 : un écart qui ne prouve rien

Broche d'alimentation de capteur : 1,9 kΩ sur la référence, 2,0 kΩ sur la carte en panne, lus après stabilisation [EXEMPLE].

1. Écart de l'ordre de 5 % [EXEMPLE].
2. Dans la précision du multimètre et la dispersion des composants, cet écart ne désigne rien [HYPOTHÈSE].
3. On note la mesure et on passe à la broche suivante.

### Exemple 3 : lire une signature

Signature entre une broche et la masse : sur la référence, une jonction élargie en boucle ; sur la carte en panne, une jonction seule [EXEMPLE].

1. La boucle venait d'une capacité en parallèle, qui manque sur la carte en panne [SOURCÉ : SRC-0088 §What type of problems will Power-off Diagnostics detect?].
2. Hypothèse : condensateur déconnecté (soudure, piste) ou coupé [HYPOTHÈSE].
3. Inspection au microscope, puis mesure du condensateur isolé.

## Exercices

::exercice{id=S30-L02-EX01}

::exercice{id=S30-L02-EX02}

::exercice{id=S30-L02-EX03}
