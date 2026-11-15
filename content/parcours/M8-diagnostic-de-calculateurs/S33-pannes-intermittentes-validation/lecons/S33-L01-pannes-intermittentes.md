---
id: S33-L01
titre: Provoquer et localiser une panne intermittente
chapitre: S33
version: "0.1"
statut: brouillon
duree_min: 120
objectifs:
  - id: O1
    texte: Expliquer les mécanismes courants d'une panne intermittente (soudure fissurée par fatigue, connecteur, composant sensible à la température) et choisir une méthode de provocation contrôlée
    competences: [D10.4]
  - id: O2
    texte: Localiser une panne intermittente en provoquant la contrainte zone par zone tout en surveillant un signal, et prouver la localisation
    competences: [D10.4]
prerequis: [S11, S26, S30]
exercices: [S33-L01-EX01, S33-L01-EX02, S33-L01-EX03]
references: [SRC-0095, SRC-0094, SRC-0014, SRC-0071, SRC-0002]
criteres_evaluation:
  - objectif: O1
    critere: Exercices S33-L01-EX01 et S33-L01-EX02 réussis
  - objectif: O2
    critere: Exercice S33-L01-EX03 réussi et panne localisée et prouvée au TP-49
figures:
  - id: S33-F01
    fichier: ../figures/S33-F01-provoquer-localiser.svg
    legende: "Localiser une panne intermittente : surveiller en continu un signal qui montre la panne, appliquer une contrainte contrôlée sur une seule zone à la fois (froid, chaleur douce, légère pression mécanique), noter la zone qui fait apparaître ou disparaître la panne, réduire la zone, puis prouver par une mesure ou une inspection. Méthode pédagogique de l'académie d'après les sources citées."
    alt: "Une boucle de quatre étapes : surveiller un signal, contraindre une zone, noter l'effet, réduire la zone ; une sortie de la boucle mène à prouver par mesure ou inspection."
    origine: areprog
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction
---

## Théorie

### Pourquoi une panne est intermittente

Une panne intermittente n'apparaît que dans certaines conditions : température, vibration,
humidité, tension. Ses causes courantes sur un calculateur [HYPOTHÈSE : liste de l'académie, à
confirmer sur chaque cas] :

- **soudure fissurée** : le cyclage thermique, le choc thermique, la vibration et la flexion fatiguent les joints de soudure entre le composant et la carte [SOURCÉ : SRC-0095 §1 Introduction] ; la fissure progresse jusqu'à faire monter la résistance du joint [SOURCÉ : SRC-0095 §4 Modeling Approach] ;
- **soudure froide** ou mal mouillée dès la fabrication, cause des défaillances précoces [SOURCÉ : SRC-0095 §4 Modeling Approach] ;
- **connecteur** : contact oxydé, broche desserrée ;
- **composant** dont le défaut dépend de la température (condensateur, semi-conducteur) ;
- **piste fissurée**, souvent près d'un point de fixation ou d'un connecteur [HYPOTHÈSE : à constater au microscope].

Les joints les plus contraints sont aux **angles** d'un boîtier ; c'est là que la fatigue commence [SOURCÉ : SRC-0095 §4 Modeling Approach].
Un gros composant, un connecteur lourd ou un boîtier qui chauffe sont donc des zones à regarder en
premier au microscope [HYPOTHÈSE : à confirmer sur la carte étudiée], selon les critères de soudure de S26 [SOURCÉ : SRC-0071 §12.9 Inspection Criteria, Specific].

### Surveiller en continu

Une panne qui dure une fraction de seconde se perd si l'on ne regarde pas au bon moment. On choisit
un signal qui la montre (rail d'alimentation, reset, sortie, trame CAN, courant de borne 30) et on le
surveille en continu. L'oscilloscope en déclenchement **normal** n'affiche une trace que s'il y a
déclenchement, ce qui convient à un événement rare [SOURCÉ : SRC-0014 §Trigger Modes]. En laboratoire,
la fiabilité des soudures se suit aussi par la résistance mesurée en continu pendant le cyclage [SOURCÉ : SRC-0095 §3 Test Method].

### Provoquer, une zone à la fois

- **Froid** : la bombe de froid givre une zone de la carte alimentée ; une carte qui s'arrête en chauffant repart quand on refroidit le composant en cause, et une soudure fragile peut casser sous le choc thermique [SOURCÉ : SRC-0094 §How To Use Freeze Spray].
- **Chaleur douce** : air chaud réglé bas, à distance, sur une zone protégée, sans dépasser la température admise par les composants [À VÉRIFIER : température admise dans les fiches des composants de la zone].
- **Contrainte mécanique** : légère pression avec un outil isolant, ou légère flexion de la carte, zone par zone [EXEMPLE : méthode pédagogique de l'académie].

Le jet d'une bombe de froid se charge en électricité statique, y compris la paille et la buse en
plastique ; une version antistatique existe pour les cartes sensibles [SOURCÉ : SRC-0094 §Diagnosing Static Sensitive Electronics].
Sur un calculateur, on n'utilise qu'une bombe de froid prévue pour l'électronique, antistatique, et le
poste ESD reste en place, une décharge pouvant endommager un composant [SOURCÉ : SRC-0002 §ESD Damage: How Devices Fail].

::figure{id=S33-F01}

### Prouver la localisation

Faire apparaître la panne en refroidissant une zone **désigne** cette zone ; la preuve vient de
l'inspection (fissure visible au microscope) ou d'une mesure (résistance du joint, continuité qui
coupe sous contrainte) [HYPOTHÈSE : règle de la méthode S30-L01]. Après réparation, la même
contrainte, appliquée de la même façon, ne doit plus faire apparaître la panne (S33-L02).

### Exemple 1 : un reset qui apparaît au froid

Un calculateur se réinitialise de temps en temps sur banc. On surveille la broche de reset, oscilloscope en déclenchement normal [EXEMPLE].

1. Givre sur le quartz : rien. Givre sur le régulateur et ses condensateurs : reset à chaque passage [EXEMPLE].
2. Zone réduite : un condensateur de sortie du régulateur seul déclenche le reset [EXEMPLE].
3. Microscope : soudure fissurée à une extrémité ; la preuve est l'image, pas seulement le givre [HYPOTHÈSE].

### Exemple 2 : une panne mécanique

Une sortie se coupe quand on appuie près du connecteur [EXEMPLE].

1. Surveillance de la sortie ; pression légère broche par broche, avec un outil isolant.
2. La coupure suit une broche précise [EXEMPLE].
3. Microscope : soudure de la broche fissurée en anneau ; reprise selon S26, puis même contrainte pour valider.

### Exemple 3 : choisir le signal à surveiller

Un module perd par moments la communication CAN [EXEMPLE].

1. On surveille la trame CAN à l'oscilloscope et, sur une autre voie, le rail qui alimente l'émetteur-récepteur.
2. Si le rail chute en même temps que la trame disparaît, la panne est en amont de l'émetteur-récepteur [HYPOTHÈSE].
3. Sinon, on surveille l'émetteur-récepteur et ses soudures.

## Exercices

::exercice{id=S33-L01-EX01}

::exercice{id=S33-L01-EX02}

::exercice{id=S33-L01-EX03}
