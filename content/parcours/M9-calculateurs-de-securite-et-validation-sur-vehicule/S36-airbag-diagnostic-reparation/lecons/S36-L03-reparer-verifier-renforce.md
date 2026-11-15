---
id: S36-L03
titre: Réparer et vérifier un calculateur d'airbag sous protocole renforcé
chapitre: S36
version: "0.1"
statut: brouillon
duree_min: 100
objectifs:
  - id: O1
    texte: Préparer une réparation de calculateur d'airbag (hypothèse prouvée, décharge mesurée, double sauvegarde, mémoire d'événements notée)
    competences: [D10.7]
  - id: O2
    texte: Réparer avec un composant de même référence ou d'équivalence justifiée et contrôler la réparation hors tension
    competences: [D10.7]
  - id: O3
    texte: Vérifier sur banc avec simulateurs l'absence de défaut d'allumeur et la cohérence des mesures avant et après, puis rédiger le dossier de validation renforcée
    competences: [D10.6, D10.7]
prerequis: [S36-L02, S33, S28]
exercices: [S36-L03-EX01, S36-L03-EX02]
references: [SRC-0097, SRC-0013, SRC-0071, SRC-0077, SRC-0078]
criteres_evaluation:
  - objectif: O1
    critere: Critères decharge-mesuree, double-sauvegarde et memoire-evenements de la grille renforcée prouvés au TP-53
  - objectif: O2
    critere: Exercice S36-L03-EX01 réussi et réparation contrôlée au microscope au TP-53
  - objectif: O3
    critere: Exercice S36-L03-EX02 réussi et dossier de validation renforcée du TP-53 complet
figures:
  - id: S36-F03
    fichier: ../figures/S36-F03-reparation-renforcee.svg
    legende: "Réparation sous protocole renforcé : diagnostic prouvé, préparation (décharge mesurée, sauvegardes), réparation avec la même référence, contrôle hors tension, essai sur banc avec simulateurs, comparaison avant et après, dossier de validation renforcée ; aucune remise en circulation pendant le cursus (décision D-14). Méthode pédagogique de l'académie."
    alt: "Sept étapes en deux lignes reliées par des flèches : diagnostic, avant réparation, réparation, contrôle, puis banc, avant et après, dossier. Une dernière case en pointillés indique pas de remise en circulation, décision D-14."
    origine: areprog
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction
---

## Théorie

### Avant de réparer

On ne répare qu'une cause **prouvée** par une mesure (FE-13). Avant la première soudure :

1. Décharge de la réserve mesurée deux fois [SOURCÉ : SRC-0013 §2-7 Restriking Voltage].
2. Double sauvegarde de la mémoire, empreintes identiques, si elle est lisible (S21) ; état de la mémoire d'événements noté sans modification.
3. Photos de la zone, des deux faces, et relevé des marquages des composants concernés.

::figure{id=S36-F03}

### Choisir le composant

Sur un calculateur de sécurité, on remplace par la **même référence** chaque fois que possible : les
analyses de défaillance de la conception reposent sur les composants d'origine (S35-L01) [HYPOTHÈSE : raison de préférer la référence d'origine].
À défaut, l'équivalence se justifie par écrit comme en S28 : mêmes caractéristiques électriques, même boîtier, grade de température au moins égal [SOURCÉ : SRC-0078 §1.3.4 Definition of Part Operating Temperature Grade].

Pour un condensateur, la tension nominale ne doit jamais être dépassée [SOURCÉ : SRC-0013 §2-3-3 Excess Voltage Application].
Sa polarité doit être respectée : une tension inverse l'endommage [SOURCÉ : SRC-0013 §2-3-2 Reverse Voltage].

### Réparer et contrôler

La soudure suit les méthodes de M7, avec une source de chaleur adaptée [SOURCÉ : SRC-0071 §6.7 Heat Sources].
Le joint est contrôlé au microscope selon des critères écrits [SOURCÉ : SRC-0071 §12.9 Inspection Criteria, Specific].
Le vernis retiré est restauré après nettoyage [SOURCÉ : SRC-0077 §2.4.2 Coating Replacement, Conformal Coating, Encapsulant].
Aucune soudure ne se fait près de la mémoire sans double sauvegarde préalable.

Après réparation, on refait **hors tension** les mêmes mesures qu'au diagnostic, aux mêmes points,
avec les mêmes instruments, et on les compare à l'exemplaire de référence.

### Vérifier sur banc

L'essai sur banc suit le protocole de S33 (écrit avant l'essai) et le protocole renforcé de S35 :

- alimentation limitée, limite écrite, mise sous tension progressive ;
- toutes les sorties d'allumeurs sur des simulateurs de valeur documentée ;
- lecture des défauts en lecture seule : **aucun défaut d'allumeur** attendu avec les simulateurs ;
- tensions de l'élévateur, de l'abaisseur et de la logique comparées aux valeurs de la fiche si le circuit est identifié [SOURCÉ : SRC-0097 §Static Electrical Characteristics, Power Management] ;
- mémoire d'événements lue de nouveau : elle doit être identique à la lecture d'avant.

Un défaut qui ne s'efface pas tout seul après réparation n'est pas effacé « pour voir » : on note son
libellé et on cherche sa cause [HYPOTHÈSE : certains défauts peuvent rester mémorisés selon le constructeur, à vérifier].
Le cours n'enseigne pas l'effacement des données de collision ; un calculateur verrouillé après choc
sort du périmètre de la formation [À VÉRIFIER par constructeur : conditions de verrouillage].

### Le dossier de validation renforcée

Le dossier reprend les rubriques de S33-L03 et ajoute trois parties :

- ce qui est **validé sur banc** (alimentations, diagnostics d'allumeurs sur simulateurs, mesures avant et après) ;
- ce qui ne peut l'être **que sur véhicule** (communication avec le reste du véhicule, codage, voyant) ;
- ce qui **ne peut pas** l'être en atelier (déploiement réel, comportement en choc).

Aucun calculateur de sécurité réparé n'est remis en circulation pendant le cursus (décision D-14).

### Exemple 1 : un condensateur de réserve de remplacement

La réserve d'origine est marquée 50 V [EXEMPLE] ; un remplaçant marqué 35 V est proposé.

1. L'élévateur du circuit cité peut atteindre 35 V en fonctionnement normal [SOURCÉ : SRC-0097 §Static Electrical Characteristics, Power Management].
2. Son écrêtage de surtension se situe entre 40 V et 46 V [SOURCÉ : SRC-0097 §Static Electrical Characteristics, Power Management].
3. Un 35 V n'a aucune marge : refusé ; on garde au moins la tension nominale d'origine [SOURCÉ : SRC-0013 §2-3-3 Excess Voltage Application].

### Exemple 2 : une comparaison avant et après

Courant en régime établi sur banc : 85 mA avant réparation, 62 mA après, 60 mA sur la référence [EXEMPLE].

1. Avant : écart de 25 mA avec la référence [EXEMPLE].
2. Après : écart de 2 mA, du même ordre que la dispersion entre exemplaires [HYPOTHÈSE : dispersion à constater].
3. La cohérence du courant s'ajoute à l'absence de défaut d'allumeur ; elle ne la remplace pas.

### Exemple 3 : une durée d'essai

Le protocole prévoit trois cycles de mise sous tension de 10 min chacun [EXEMPLE].

1. Durée totale : 3 × 10 min = 30 min = 1 800 s [EXEMPLE].
2. Chaque cycle commence par la limite de courant écrite et finit par la décharge mesurée.
3. Le nombre de cycles et la durée sont écrits avant l'essai (S33).

## Exercices

::exercice{id=S36-L03-EX01}

::exercice{id=S36-L03-EX02}
