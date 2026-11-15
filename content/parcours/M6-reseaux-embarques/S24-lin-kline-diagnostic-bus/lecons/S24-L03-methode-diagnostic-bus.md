---
id: S24-L03
titre: Méthode de diagnostic des défauts physiques de bus
chapitre: S24
version: "0.1"
statut: brouillon
duree_min: 90
objectifs:
  - id: O1
    texte: Associer chaque défaut physique de bus (court-circuit, coupure, terminaison absente, transceiver défaillant) à ses mesures caractéristiques
    competences: [D8.1, D8.2]
  - id: O2
    texte: Appliquer un ordre de mesures hors tension puis sous tension, et isoler un nœud ou un tronçon par division du bus
    competences: [D8.1, D8.2]
prerequis: [S24-L01, S23-L03, S18-L03]
exercices: [S24-L03-EX01, S24-L03-EX02, S24-L03-EX03]
references: [SRC-0065, SRC-0066, SRC-0067, SRC-0069]
criteres_evaluation:
  - objectif: O1
    critere: Exercices S24-L03-EX01 et S24-L03-EX02 réussis
  - objectif: O2
    critere: Exercice S24-L03-EX03 réussi et ordre des mesures suivi au TP-36 (jalon 2)
figures:
  - id: S24-F03
    fichier: ../figures/S24-F03-ordre-diagnostic-bus.svg
    legende: "Ordre de diagnostic d'un défaut physique de bus proposé par l'académie : symptôme et schéma officiel, mesures hors tension (résistance entre lignes, chaque ligne vers la masse et vers le plus), mesures sous tension (niveaux au repos, captures), division du bus en débranchant nœuds ou tronçons, conclusion sur une mesure qui départage."
    alt: "Une colonne de cinq cases reliées par des flèches : symptôme et schéma ; hors tension, résistances ; sous tension, niveaux et captures ; division du bus ; conclusion et validation. Une flèche de retour part de la division vers les mesures hors tension."
    origine: areprog
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction
---

## Théorie

### Les défauts physiques d'un bus

Un défaut physique empêche les bits de passer, quel que soit le logiciel. On en distingue quatre
familles [EXEMPLE : classement pédagogique de l'académie] :

- **court-circuit** : une ligne à la masse, une ligne au plus, ou deux lignes entre elles ;
- **coupure** : fil, connecteur ou piste interrompu, qui sépare le bus en deux ;
- **terminaison absente ou en défaut** (CAN) : résistance manquante, coupée ou d'une autre valeur ; résistance de tirage du maître coupée (LIN) ;
- **transceiver défaillant** : un nœud qui bloque le bus, qui n'émet plus ou qui ne reçoit plus.

Les transceivers sont conçus pour survivre à des courts-circuits des lignes entre elles, au plus et à
la masse [SOURCÉ : SRC-0065 §5.1.7 Bus Pin Short-Circuit Protection]. Un court-circuit du câblage ne
détruit donc pas forcément les calculateurs : on répare le câblage d'abord, puis on contrôle de
nouveau [HYPOTHÈSE : à vérifier par la mesure après réparation].

### Ce que montrent les mesures

| Défaut | Hors tension | Sous tension [HYPOTHÈSE : orientations à confirmer par une mesure qui départage] |
|---|---|---|
| CAN-H ou CAN-L à la masse | résistance de la ligne vers la masse très faible | ligne collée à la masse |
| CAN-H ou CAN-L au plus | résistance de la ligne vers le plus très faible | ligne collée à la tension batterie |
| CAN-H contre CAN-L | résistance entre lignes très faible | différence nulle en permanence |
| Terminaison absente | résistance entre lignes double de la valeur attendue | fronts déformés, erreurs |
| Coupure du bus | résistance différente selon le côté mesuré | une partie des nœuds ne communique plus |
| LIN à la masse | résistance du fil vers la masse très faible | fil toujours dominant |
| Transceiver défaillant | résistance de ses lignes vers la masse différente d'un exemplaire sain | bus correct quand ce nœud est débranché |

La terminaison absente se voit sur un bus de 120 Ω par terminaison [EXEMPLE] : 120 Ω mesurés au lieu de 60 Ω (S23-L01).

Une terminaison sert à éviter les réflexions [SOURCÉ : SRC-0066 §4.5 Line Terminations]. Un
transceiver non alimenté de type récent ne charge pas le bus [SOURCÉ : SRC-0067 §1 Features] ; de même,
un transceiver LIN qui perd sa masse ne charge pas le fil [SOURCÉ : SRC-0069 §9.3.5 GND]. Un nœud
éteint n'est donc pas, à lui seul, une cause de bus bloqué [HYPOTHÈSE : selon le transceiver, à vérifier dans sa fiche].

### L'ordre des mesures

L'ordre suit la méthode en cinq étapes de S01 et le principe « alimentation d'abord » de S18
[EXEMPLE : ordre pédagogique de l'académie] :

1. **Symptôme et schéma** : quels nœuds ne communiquent plus ; tracé du bus, emplacement des terminaisons et des connecteurs sur le schéma officiel.
2. **Alimentation et masse** des nœuds concernés : un nœud sans alimentation ou avec une masse décalée ne communique pas (S23-L03).
3. **Hors tension** : résistance entre les lignes, puis chaque ligne vers la masse et vers le plus.
4. **Sous tension** : niveaux au repos, captures de trames, durée d'un bit.
5. **Division du bus** : débrancher un nœud ou un tronçon à la fois, et refaire la mesure qui était fausse ; le défaut est du côté où la mesure redevient fausse.
6. **Conclusion** sur une mesure qui départage, réparation, puis mêmes mesures pour valider.

::figure{id=S24-F03}

On ne débranche un connecteur que batterie débranchée ou banc coupé, selon l'ordre prévu par le
constructeur (règles « Sécurité véhicule » du catalogue des TP).

### Exemple 6 : localiser un court-circuit à la masse

Hors tension, CAN-L lit 0,4 Ω vers la masse [EXEMPLE], et CAN-H une valeur élevée.

1. CAN-L est en court-circuit à la masse quelque part sur le bus [HYPOTHÈSE].
2. On débranche les nœuds un par un, en remesurant CAN-L vers la masse à chaque fois.
3. Si la mesure redevient normale en débranchant un nœud, le défaut est dans ce nœud ou dans son câble ; sinon, dans le tronçon principal.

### Exemple 7 : une coupure

Deux nœuds sur cinq ne communiquent plus ; la résistance entre lignes vaut 60 Ω mesurée d'un côté du véhicule, et 120 Ω de l'autre [EXEMPLE].

1. Le bus est coupé entre les deux points de mesure : chaque moitié ne voit plus qu'une terminaison [HYPOTHÈSE].
2. On mesure la continuité de chaque fil par tronçons, selon le schéma.
3. On répare, puis on refait les mesures de résistance et une capture.

### Exemple 8 : un nœud qui bloque

Le bus CAN reste en dominant permanent ; il redevient normal quand on débranche le calculateur C [EXEMPLE].

1. Hypothèses : transceiver de C défaillant, ou microcontrôleur de C qui maintient TXD bas [HYPOTHÈSE].
2. Sur le banc : mise sous tension progressive de C seul, mesure de TXD et de CANH / CANL.
3. Conclure seulement sur ces mesures : un dominant permanent sur TXD met en cause le microcontrôleur ou son programme, pas le transceiver.

## Exercices

::exercice{id=S24-L03-EX01}

::exercice{id=S24-L03-EX02}

::exercice{id=S24-L03-EX03}
