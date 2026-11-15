---
id: S27-L03
titre: Déposer et reposer SOIC, TSSOP, QFP et QFN
chapitre: S27
version: "0.1"
statut: brouillon
duree_min: 90
objectifs:
  - id: O1
    texte: Déposer un circuit intégré à broches à l'air chaud sans arracher de pastille, après retrait local du vernis et sauvegarde d'une mémoire
    competences: [D9.2, D9.3, D7.4]
  - id: O2
    texte: Reposer un SOIC, un TSSOP ou un QFP aligné, sans pont, et contrôler chaque broche
    competences: [D9.2, D9.5]
  - id: O3
    texte: Situer le QFN, l'alliage de dépose à bas point de fusion et le BGA dans le périmètre de l'atelier
    competences: [D9.2]
prerequis: [S27-L02, S21-L02, S17-L03]
exercices: [S27-L03-EX01, S27-L03-EX02, S27-L03-EX03]
references: [SRC-0076, SRC-0075, SRC-0071, SRC-0047, SRC-0062]
criteres_evaluation:
  - objectif: O1
    critere: Exercice S27-L03-EX01 réussi et dépose sans dommage au TP-39
  - objectif: O2
    critere: Exercice S27-L03-EX02 réussi et QFP reposé sans pont au TP-38
  - objectif: O3
    critere: Exercice S27-L03-EX03 réussi
figures:
  - id: S27-F03
    fichier: ../figures/S27-F03-repose-qfp.svg
    legende: "Repose d'un QFP, méthode de l'académie : pastilles nettoyées à la tresse et au flux ; composant aligné, repère de la première broche du côté indiqué par la sérigraphie ; deux broches opposées soudées pour le fixer ; contrôle de l'alignement ; soudure des quatre côtés ; retrait des ponts à la tresse ; contrôle au microscope et à l'ohmmètre. Dessin de principe, vue de dessus."
    alt: "Quatre vues de dessus d'un boîtier carré à broches sur ses pastilles : pastilles nettoyées ; composant posé avec un point de repère dans un coin ; deux broches opposées soudées ; les quatre côtés soudés avec une loupe sur un coin."
    origine: areprog
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction
---

## Théorie

### Avant de déposer

1. **Identifier** le composant, relever sa fiche : boîtier, température maximale, niveau MSL (S27-L02).
2. **Photographier** la zone et noter l'orientation (repère de la première broche, sérigraphie).
3. **Vernis** : retrait local seulement, avec le produit adapté au vernis identifié, ventilation et protections individuelles (S17-L03) [SOURCÉ : SRC-0047 §Step-by-Step: Removal by Chemical Solvent]. Le retrait approfondi est l'objet de S28.
4. **Mémoire** : si le composant est une mémoire, la lire **avant** la dépose, en double, et comparer les empreintes (S21-L02) [SOURCÉ : SRC-0062 §1 INTRODUCTION].
5. **Protéger** les voisins, préchauffer la carte (S27-L01).

### Déposer à l'air chaud

- Flux sur les broches ; buse adaptée au boîtier, mouvement lent et régulier sur tout le pourtour [EXEMPLE : méthode d'atelier].
- On ne soulève le composant que lorsque **toutes** les soudures sont fondues : les machines de reprise coupent l'aspiration si le composant n'est pas entièrement refondu, pour ne pas arracher de pastille [SOURCÉ : SRC-0076 §6.1 Compound Removal].
- Pince adaptée, sans forcer ; refroidissement de la carte à l'air ambiant.
- Un QFN déposé ne se réutilise pas, selon TI [SOURCÉ : SRC-0076 §6.1 Compound Removal] ; pour les autres boîtiers, la réutilisation se décide avec la fiche et le niveau MSL [À VÉRIFIER : consigne du fabricant du composant].

### Nettoyer les pastilles

Après la dépose, on retire l'alliage restant avec une tresse imprégnée de flux et un fer à température
régulée muni d'une panne plate, en douceur, puis on retire le flux à l'alcool avec un écouvillon non
pelucheux et on inspecte [SOURCÉ : SRC-0076 §6.2 Site Redress]. Les pastilles fines sont fragiles : on
ne frotte pas la tresse [SOURCÉ : SRC-0076 §6.2 Site Redress].

### Reposer un SOIC, un TSSOP ou un QFP

Méthode de l'académie [EXEMPLE : évaluée par le contrôle des broches au TP-38] :

1. Flux sur les pastilles propres ; composant posé dans le bon sens.
2. Aligner toutes les broches sur leurs pastilles, au microscope.
3. Souder deux broches opposées (deux coins pour un QFP) pour fixer le composant ; contrôler l'alignement.
4. Souder les côtés, à l'air chaud ou au fer (panne fine ou méthode de la goutte traînée avec beaucoup de flux).
5. Retirer les ponts à la tresse et au flux.
6. Nettoyer, laisser refroidir, contrôler.

::figure{id=S27-F03}

Contrôle de chaque broche : ménisque de talon présent, broche visible sous la soudure, débord latéral et
débord de pointe limités à 25 % de la largeur de broche [SOURCÉ : SRC-0071 §12.9 Inspection Criteria, Specific].
Aucun pont : un pont entre conducteurs est un rejet [SOURCÉ : SRC-0071 §12.8 Inspection Criteria, General].
À l'ohmmètre, carte non alimentée : continuité de chaque broche vers sa piste, absence de court-circuit
entre broches voisines [EXEMPLE : contrôle de l'académie].

### QFN, alliage de dépose et BGA

- **QFN** : les connexions sont sous le boîtier, avec une pastille thermique centrale [SOURCÉ : SRC-0076 §1.1 Introduction]. Le contrôle visuel ne voit que les bords. TI recommande l'air chaud plutôt que le fer, et de ne jamais appuyer la panne sur le côté du boîtier [SOURCÉ : SRC-0076 §6.4 Manual Rework Considerations]. L'alignement à la repose doit être précis à 0,1 mm [SOURCÉ : SRC-0076 §6.3 Component Replacement and Reflow].
- **Alliage de dépose à bas point de fusion** : il se mélange à la soudure d'origine et la garde liquide plus longtemps, ce qui facilite une dépose difficile ; il faut ensuite l'éliminer entièrement des pastilles avant la repose [À VÉRIFIER : principe, température et consignes de nettoyage dans la fiche du produit utilisé].
- **BGA** : billes sous le boîtier, contrôle impossible sans radiographie ; présentation seulement, **hors périmètre de pratique** du cursus [EXEMPLE : décision de programme].

### Exemple 6 : une EEPROM sur calculateur

On doit déposer une EEPROM SOIC-8 sous vernis sur une carte de calculateur de récupération [EXEMPLE].

1. Lecture en double, empreintes identiques, archivage (S21-L02) [SOURCÉ : SRC-0062 §1 INTRODUCTION].
2. Vernis retiré localement sur les huit broches, protections des voisins, préchauffage.
3. Dépose, nettoyage des pastilles, contrôle : pastilles intactes, voisins intacts.

### Exemple 7 : un pont sur un TSSOP

Après repose, le microscope montre un pont entre deux broches voisines [EXEMPLE].

1. Flux sur le pont.
2. Tresse propre posée sur le pont, panne par-dessus, retrait vers l'extérieur.
3. Contrôle au microscope et à l'ohmmètre entre les deux broches.

### Exemple 8 : une pastille soulevée

Pendant une dépose, une pastille vient avec la broche [EXEMPLE].

1. Cause probable : composant soulevé avant la fusion complète, ou pastille fragilisée par des chauffes répétées [HYPOTHÈSE].
2. Arrêt, photographie, note au dossier.
3. La réparation de pastille est l'objet de S28 ; au TP-39, c'est un critère non atteint.

## Exercices

::exercice{id=S27-L03-EX01}

::exercice{id=S27-L03-EX02}

::exercice{id=S27-L03-EX03}
