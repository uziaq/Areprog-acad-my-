---
id: S08-L03
titre: LED et diode de roue libre en pratique
chapitre: S08
version: "0.1"
statut: brouillon
duree_min: 60
objectifs:
  - id: O1
    texte: Calculer la résistance série d'une LED et sa puissance, et choisir la résistance
    competences: [D4.3]
  - id: O2
    texte: Repérer une diode de roue libre sur un schéma de commande de charge inductive et dire comment la tester hors circuit
    competences: [D4.3, D4.2]
prerequis: [S08-L02]
exercices: [S08-L03-EX01, S08-L03-EX02]
references: [SRC-0011, SRC-0012]
criteres_evaluation:
  - objectif: O1
    critere: Exercice S08-L03-EX01 réussi
  - objectif: O2
    critere: Exercice S08-L03-EX02 réussi et question du QCM sur la roue libre réussie
figures:
  - id: S08-F03
    fichier: ../figures/S08-F03-led.svg
    legende: "Une LED alimentée par une source à travers sa résistance série R. La tension de la source se partage entre la résistance et la LED."
    alt: "Schéma : une source, une résistance R en série, puis une LED dont la cathode retourne au moins de la source. Des flèches indiquent la tension aux bornes de R et la tension aux bornes de la LED."
    origine: areprog
derniere_verification_sources: 2026-11-14
historique:
  - version: "0.1"
    date: 2026-11-14
    resume: Première rédaction
---

## Théorie

### La LED

Une LED est une diode qui émet de la lumière quand elle conduit en direct. Sa tension de seuil
est plus élevée que celle d'une diode de redressement : d'environ 1,6 V à plus de 3 V [SOURCÉ : SRC-0011 §Light-emitting diodes]
selon la couleur.

::figure{id=S08-F03}

- Une **résistance série** est indispensable, sinon la pleine tension de la source détruit la LED [SOURCÉ : SRC-0011 §Light-emitting diodes].
- R = (E − U_LED) / I, et la puissance dans la résistance vaut (E − U_LED) × I.
- Sa tension inverse admissible est faible : de l'ordre de 5 V pour une LED courante [SOURCÉ : SRC-0011 §Light-emitting diodes]. Elle n'est pas faite pour bloquer une tension inverse élevée.
- La tension de seuil et le courant nominal d'une LED donnée se lisent dans sa fiche technique [À VÉRIFIER : tension directe et courant nominal de la LED utilisée, dans sa fiche technique].

### La diode de roue libre, vue du dépanneur

La diode de roue libre a été expliquée en S05-L03 : en parallèle sur une bobine, bloquée en
fonctionnement normal, elle conduit à l'ouverture et limite la surtension
[SOURCÉ : SRC-0011 §Inductor commutating circuits]. Côté atelier :

- **La repérer** : sur un schéma, une diode directement aux bornes d'une bobine de relais ou d'électrovanne, cathode côté alimentation positive ; parfois intégrée dans le relais ou dans le circuit de commande [À VÉRIFIER : présence et emplacement de la protection sur le schéma du calculateur étudié].
- **La tester** : hors circuit, au test de jonction, comme toute diode (leçon S08-L01). En circuit, la bobine en parallèle (quelques dizaines d'ohms) [EXEMPLE] fausse complètement le test.
- **Son absence ou sa coupure** laisse la surtension atteindre le transistor de commande : c'est une hypothèse à examiner quand un étage de commande de charge inductive est détruit [HYPOTHÈSE].
- **Sa contrepartie** : une diode seule ralentit le relâchement du relais [SOURCÉ : SRC-0012 §Coil Suppression Can Reduce Relay Life] ; un remplacement doit respecter le montage d'origine.

### Exemple 7 : résistance d'une LED

Une LED de seuil 2,0 V doit être parcourue par 10 mA sous 12 V [EXEMPLE].

1. R = (12 − 2,0) / 0,010 = 1 000 Ω [EXEMPLE].
2. Puissance dans R : (12 − 2,0) × 0,010 = 0,1 W [EXEMPLE] ; une résistance de 0,25 W [EXEMPLE] convient avec marge.

### Exemple 8 : la même LED sous une tension plus élevée

La même LED est alimentée sous 24 V, toujours à 10 mA [EXEMPLE].

1. R = (24 − 2,0) / 0,010 = 2 200 Ω [EXEMPLE].
2. Puissance : 22 × 0,010 = 0,22 W [EXEMPLE] : une résistance de 0,25 W serait à la limite ; on prend 0,5 W [EXEMPLE].
3. La source cite le même piège : la résistance chauffe davantage quand la tension d'alimentation monte [SOURCÉ : SRC-0011 §Light-emitting diodes].

### Exemple 9 : tester une diode de roue libre

Sur une carte, une diode est soudée aux bornes d'une bobine de relais de 80 Ω [EXEMPLE].

1. En circuit, le test de jonction voit la bobine en parallèle : il affichera une faible tension dans les deux sens [HYPOTHÈSE], sans rien prouver.
2. On dessoude une patte de la diode et l'on refait le test de jonction hors circuit.
3. Seuil plausible dans un sens et circuit ouvert dans l'autre : la diode est saine ; sinon, on la remplace par une référence équivalente d'après sa fiche technique.

## Exercices

::exercice{id=S08-L03-EX01}

::exercice{id=S08-L03-EX02}
