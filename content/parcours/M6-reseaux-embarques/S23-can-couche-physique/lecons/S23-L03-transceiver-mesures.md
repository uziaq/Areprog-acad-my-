---
id: S23-L03
titre: Transceiver CAN et mesures à l'oscilloscope
chapitre: S23
version: "0.1"
statut: brouillon
duree_min: 90
objectifs:
  - id: O1
    texte: Identifier un transceiver CAN sur une carte et retrouver sa fiche technique, ses broches côté microcontrôleur et côté bus
    competences: [D8.1]
  - id: O2
    texte: Observer CAN-H, CAN-L et leur différence à l'oscilloscope, avec un montage de mesure sûr
    competences: [D3.6, D8.1]
  - id: O3
    texte: Interpréter une mesure de bus (résistance, niveaux au repos et en trafic) pour orienter un diagnostic
    competences: [D8.1]
prerequis: [S23-L01, S11-L02]
exercices: [S23-L03-EX01, S23-L03-EX02, S23-L03-EX03]
references: [SRC-0065, SRC-0067, SRC-0029]
criteres_evaluation:
  - objectif: O1
    critere: Exercice S23-L03-EX01 réussi et transceiver identifié sur le calculateur du TP-34
  - objectif: O2
    critere: Exercice S23-L03-EX02 réussi et captures différentielles rendues au TP-33 et au TP-34
  - objectif: O3
    critere: Exercice S23-L03-EX03 réussi
figures:
  - id: S23-F03
    fichier: ../figures/S23-F03-mesure-oscilloscope.svg
    legende: "Mesure d'un bus CAN à l'oscilloscope : voie 1 sur CAN-H, voie 2 sur CAN-L, masses des sondes sur la masse du calculateur ; la fonction mathématique voie 1 moins voie 2 donne la différence. Avec une sonde différentielle, une seule voie suffit. Schéma de principe de l'académie."
    alt: "À gauche, un calculateur avec son transceiver relié au microcontrôleur par TXD et RXD, et au bus par CAN-H et CAN-L. À droite, un oscilloscope : la voie 1 sur CAN-H, la voie 2 sur CAN-L, les deux masses sur la masse du calculateur, et une trace calculée 1 moins 2."
    origine: areprog
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction
---

## Théorie

### Le transceiver

Le transceiver traduit les niveaux logiques du contrôleur CAN en niveaux de bus, et l'inverse
[SOURCÉ : SRC-0065 §5 The CAN Bus]. Exemple d'un transceiver automobile public
[SOURCÉ : SRC-0067 §6 Pin Configurations and Functions] :

- **TXD** : entrée de données à émettre, basse pour un état dominant ;
- **RXD** : sortie des données reçues, basse pour un état dominant ;
- **STB** : commande du mode veille ;
- **VIO**, sur certaines versions : alimentation des entrées et sorties logiques, pour s'adapter à la tension logique du microcontrôleur ;
- **CANH** et **CANL** côté bus.

En veille, l'émetteur est coupé et le récepteur surveille le bus pour détecter un réveil
[SOURCÉ : SRC-0065 §5.1.6 Low-Current Bus Monitor, Standby and Sleep Modes]. Non alimenté, un
transceiver de ce type présente des broches à haute impédance et ne charge pas le bus
[SOURCÉ : SRC-0067 §1 Features]. La norme recommande que le transceiver survive à des courts-circuits
des fils du bus entre eux, à l'alimentation et à la masse [SOURCÉ : SRC-0065 §5.1.7 Bus Pin Short-Circuit Protection].

### Identifier un transceiver

1. Repérer le circuit proche des broches CAN du connecteur, souvent en boîtier à 8 broches [HYPOTHÈSE : boîtier courant, à confirmer sur la carte].
2. Lire le marquage au microscope, chercher la fiche du fabricant.
3. Relever dans la fiche les broches côté bus et côté microcontrôleur, et la tension d'alimentation.
4. Vérifier sur la carte : les pistes CANH et CANL rejoignent le connecteur, souvent à travers un filtre [À VÉRIFIER : présence d'une self de mode commun ou de protections sur la carte étudiée].

### Mesurer à l'oscilloscope

- Deux voies : voie 1 sur CAN-H, voie 2 sur CAN-L, masses des deux sondes sur la masse du calculateur ; la fonction mathématique voie 1 moins voie 2 affiche la différence (S11-L02).
- Ou une sonde différentielle entre CAN-H et CAN-L, et une voie par rapport à la masse pour le mode commun [SOURCÉ : SRC-0029 §Use Proper Grounding Procedures].
- Déclenchement sur le front descendant de la différence, qui correspond à un début de trame ; base de temps adaptée au débit du bus [À VÉRIFIER : débit du bus étudié, dans la documentation du véhicule].
- Un décodeur CAN de l'oscilloscope ou une interface CAN peut afficher les trames ; il faut lui donner le bon débit [HYPOTHÈSE : selon l'instrument].

Une masse de sonde ne se pose jamais sur CAN-H ou CAN-L : avec une sonde ordinaire reliée à la terre,
ce serait un court-circuit du fil vers la masse (FE-07) [SOURCÉ : SRC-0029 §Use Proper Grounding Procedures].

### Lire les mesures

| Observation | Orientation [HYPOTHÈSE : à confirmer par une mesure qui départage] |
|---|---|
| Hors tension, environ 60 Ω [EXEMPLE] entre CAN-H et CAN-L | deux terminaisons présentes |
| Hors tension, environ 120 Ω [EXEMPLE] | une terminaison manquante ou une coupure |
| Hors tension, très faible résistance | court-circuit entre CAN-H et CAN-L |
| Sous tension, une ligne collée à la masse ou à la tension batterie | court-circuit d'une ligne à la masse ou au plus |
| Sous tension, différence toujours nulle et lignes au niveau commun récessif | bus récessif : endormi ou sans trafic |

La note TI rappelle aussi qu'un écart de potentiel entre les masses des nœuds peut causer des
redémarrages ou des erreurs de données [SOURCÉ : SRC-0065 §5.1.3 Common-Mode Voltage Operating Range].

### Exemple 7 : base de temps

Un bus fonctionne à 500 kbit/s [EXEMPLE].

1. Durée d'un bit : 1 / 500 000 = 2 µs [EXEMPLE].
2. Une trame de quelques dizaines de bits dure donc de l'ordre d'une centaine de microsecondes.
3. On règle la base de temps pour voir une trame entière, puis on zoome sur les bits.

### Exemple 8 : ligne collée

Sous tension, CAN-L reste à 0 V et CAN-H oscille faiblement [EXEMPLE].

1. Hypothèse : CAN-L en court-circuit à la masse [HYPOTHÈSE].
2. Hors tension : résistance entre CAN-L et la masse, comparée à celle de CAN-H.
3. Puis découpage du bus selon le schéma pour localiser le court-circuit.

### Exemple 9 : nœud qui perturbe

Le bus est correct quand un calculateur est débranché, et perturbé quand il est branché [EXEMPLE].

1. Hypothèse : transceiver de ce calculateur en défaut, ou masse du calculateur décalée [HYPOTHÈSE].
2. Mesures : résistance CAN-H et CAN-L vers la masse sur le connecteur du calculateur, hors tension ; écart de masse sous tension.
3. Conclure seulement sur une mesure qui départage.

## Exercices

::exercice{id=S23-L03-EX01}

::exercice{id=S23-L03-EX02}

::exercice{id=S23-L03-EX03}
