---
id: S33-L03
titre: Le dossier de réparation complet et la communication au client
chapitre: S33
version: "0.1"
statut: brouillon
duree_min: 90
objectifs:
  - id: O1
    texte: Rédiger un dossier de réparation complet et traçable (réception, symptôme, hypothèses, mesures, intervention, validation, limites, sources), réutilisable par un autre technicien
    competences: [D10.5]
  - id: O2
    texte: Rédiger pour le client un compte rendu clair qui distingue ce qui est prouvé, ce qui est validé et ce qui reste à contrôler, sans donnée inventée
    competences: [D10.5]
prerequis: [S01-L03, S33-L02]
exercices: [S33-L03-EX01, S33-L03-EX02]
references: [SRC-0062, SRC-0079]
criteres_evaluation:
  - objectif: O1
    critere: Exercice S33-L03-EX01 réussi et dossier complet rendu au TP-50
  - objectif: O2
    critere: Exercice S33-L03-EX02 réussi et compte rendu client rédigé au TP-50
figures:
  - id: S33-F03
    fichier: ../figures/S33-F03-dossier.svg
    legende: "Rubriques du dossier de réparation de l'académie, enrichi en S33 : réception, symptôme, hypothèses, mesures, intervention, validation, limites, sources et traçabilité. Modèle pédagogique de l'académie, repris de S01-L03."
    alt: "Une colonne de neuf rubriques empilées : réception, symptôme, hypothèses, mesures, intervention, validation, limites, sources, traçabilité. Une flèche à droite indique le compte rendu client tiré des rubriques validation et limites."
    origine: areprog
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction
---

## Théorie

### Le dossier, enrichi

Le dossier ouvert en S01-L03 suit la carte du premier au dernier jour. En S33, il s'enrichit de deux
rubriques, **limites** et **traçabilité**, et chaque rubrique doit pouvoir être relue par un autre
technicien qui refait le même travail [EXEMPLE : modèle pédagogique de l'académie].

::figure{id=S33-F03}

| Rubrique | Ce qu'on y écrit |
|---|---|
| Réception | Code interne, référence lue, état, photos ; aucune donnée client ni identifiant de véhicule |
| Symptôme | Ce qui est constaté, dans quelles conditions |
| Hypothèses | Arbre d'hypothèses ; pour chaque hypothèse écartée, la mesure qui l'écarte |
| Mesures | Instrument, réglages, points de mesure, valeurs, comparaison à la référence |
| Intervention | Composant d'origine et de remplacement, justification d'équivalence, méthode |
| Validation | Protocole écrit avant l'essai, résultats, durée |
| Limites | Ce qui n'a pas été validé, contrôles recommandés |
| Sources | Fiches utilisées, révision et date |
| Traçabilité | Empreintes des sauvegardes, photos avant et après, dates, technicien |

### La traçabilité

Une sauvegarde mémoire est identifiée par son empreinte SHA-256 : une empreinte identique désigne
un contenu identique (S21) [SOURCÉ : SRC-0062 §1 INTRODUCTION]. Le composant de remplacement est noté
avec sa référence complète et sa fiche ; sa qualification automobile est celle que déclare son fabricant [SOURCÉ : SRC-0079 §1.3.1 AEC Q101 Qualification].
Les photos avant et après, à la même échelle, montrent l'intervention.

### Étiqueter jusqu'au bout

Chaque valeur du dossier garde son étiquette : mesurée (avec l'instrument), tirée d'une source (avec
sa référence), choisie pour l'exemple, ou hypothèse à vérifier. Une valeur « typique » non sourcée
présentée comme un fait est une faute éliminatoire du module (FE-14).

### La communication au client

Le compte rendu au client est court et sans jargon inutile [EXEMPLE : méthode pédagogique de l'académie] :

1. Ce qui a été constaté.
2. Ce qui a été fait (composant remplacé, soudure reprise).
3. Ce qui a été vérifié sur banc, et comment.
4. Ce qui n'a pas pu être vérifié, et ce que l'on recommande de contrôler sur le véhicule.

Il ne promet pas ce qui n'a pas été validé : « réparé et validé sur banc ; à confirmer sur le
véhicule » plutôt que « réparé » [HYPOTHÈSE : formulation de l'académie, à adapter par l'atelier].

### Exemple 1 : une limite bien écrite

Sortie d'injecteur réparée, validée sur charge simulée [EXEMPLE].

1. Limite : « non validé sur le moteur ; la cause de la destruction du transistor n'a pas été trouvée sur la carte ».
2. Recommandation : « contrôler la résistance de l'injecteur et l'isolement du faisceau avant remontage ».
3. Le client sait ce qui reste à faire et pourquoi.

### Exemple 2 : une phrase à corriger

Phrase d'un dossier : « le régulateur était mort, valeur normale 5 V » [EXEMPLE].

1. « Mort » n'est pas une mesure : on écrit la tension mesurée et les conditions.
2. « Valeur normale 5 V » doit venir d'une source (fiche du régulateur) ou de la référence mesurée [EXEMPLE].
3. Phrase corrigée : « sortie du régulateur mesurée à 0,3 V sous tension, 5,02 V sur la référence ; régulateur isolé, sortie toujours à 0,3 V » [EXEMPLE].

## Exercices

::exercice{id=S33-L03-EX01}

::exercice{id=S33-L03-EX02}
