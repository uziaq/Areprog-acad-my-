---
id: S01-L03
titre: Journal d'atelier, dossier de réparation et méthode de diagnostic
chapitre: S01
version: "0.1"
statut: brouillon
duree_min: 75
objectifs:
  - id: O1
    texte: Tenir une page de journal d'atelier complète, avec un tableau valeur théorique, tolérance, mesure, écart et commentaire
    competences: [D1.5]
  - id: O2
    texte: Ouvrir un dossier de réparation selon le modèle AREPROG et étiqueter chaque information selon sa fiabilité
    competences: [D1.5, D10.5]
  - id: O3
    texte: Ordonner et appliquer les cinq étapes de la méthode de diagnostic
    competences: [D1.6]
  - id: O4
    texte: Résoudre les calculs du test de positionnement (puissances de 10, règle de trois, équation du premier degré, logarithme décimal)
    competences: [D2.1]
prerequis: [S01-L01]
exercices: [S01-L03-EX01, S01-L03-EX02, S01-L03-EX03, S01-L03-EX04, S01-L03-EX05]
references: [SRC-0001]
criteres_evaluation:
  - objectif: O1
    critere: Pages de journal des TP-01 et TP-02 complètes (tableau rempli, écart calculé et commenté) et exercice S01-L03-EX02 réussi
  - objectif: O2
    critere: Premier dossier de réparation ouvert (rubriques du modèle renseignées, chaque information étiquetée) et questions du QCM sur les étiquettes réussies
  - objectif: O3
    critere: Exercice S01-L03-EX01 réussi et question d'ordonnancement du QCM réussie
  - objectif: O4
    critere: Au moins 3 bonnes réponses sur 4 au test de positionnement (EX03 à EX05 et question de logarithme du QCM) ; en dessous, remédiation avant S02
figures:
  - id: S01-F03
    fichier: ../figures/S01-F03-methode-diagnostic.svg
    legende: "Méthode de diagnostic AREPROG en cinq étapes. Une hypothèse infirmée par la mesure renvoie à l'étape 2."
    alt: "Cinq rectangles empilés reliés par des flèches vers le bas : 1 recueillir et constater le symptôme, 2 formuler des hypothèses, 3 mesurer pour départager, 4 conclure sur une preuve, 5 intervenir, valider, documenter. Une flèche pointillée remonte de l'étape 4 à l'étape 2 pour une hypothèse infirmée."
    origine: areprog
derniere_verification_sources: 2026-11-13
historique:
  - version: "0.1"
    date: 2026-11-13
    resume: Première rédaction
---

## Théorie

### Pourquoi écrire

Vous apprenez seul : le journal d'atelier remplace le formateur qui relit vos mesures. Il sert
à trois choses : retrouver ce que vous avez fait, montrer la preuve de ce que vous affirmez
(l'évaluation pratique note zéro un critère sans preuve), et comparer ce que vous aviez prévu
avec ce que vous avez mesuré.

### La page de journal d'atelier

Une page par séance, datée, avec :

1. **L'objectif** de la séance (le TP, l'exercice de microsoudure, la carte étudiée).
2. **Le schéma** du montage ou de la zone de la carte, même à main levée.
3. **Les réglages** avant toute mise sous tension : tension et **limite de courant** de l'alimentation, calibre et bornes du multimètre.
4. **Le tableau de mesures** : valeur théorique | tolérance | mesure | écart | commentaire.
5. **Les photos** : montage, afficheurs, carte avant et après.
6. **L'analyse** : l'écart est-il dans la tolérance ? Sinon, pourquoi ?

L'écart relatif se calcule ainsi : **écart = (mesure − théorique) / théorique**, exprimé en pourcentage.

### Le dossier de réparation

Le dossier suit une carte ou un calculateur du premier au dernier jour. Modèle AREPROG
(il sera enrichi en S33 et S39) :

| Rubrique | Ce qu'on y écrit |
|---|---|
| Réception | Code interne de la pièce, origine, état à l'arrivée, photos des deux faces |
| Symptômes | Ce qui est constaté, par qui, dans quelles conditions |
| Hypothèses | Causes possibles, chacune étiquetée [HYPOTHÈSE] |
| Mesures | Tableau de mesures, avec instrument, réglages et photos |
| Intervention | Ce qui a été fait, composant d'origine et de remplacement, références |
| Validation | Essais réalisés et résultats, ce qui n'a pas pu être testé |
| Sources | Fiches sources utilisées, avec révision et date |

Aucun numéro d'identification de véhicule ni plaque n'entre dans un dossier : un véhicule
d'atelier se désigne par son code interne (VEH-01…).

### Étiqueter ce que l'on écrit

Les quatre étiquettes de fiabilité du cursus s'appliquent aussi à vos propres notes :

| Étiquette | Signification dans le journal |
|---|---|
| SOURCÉ, suivi de l'identifiant de la fiche source | Information lue dans une source identifiée (datasheet, notice, norme) |
| [EXEMPLE] | Valeur choisie pour un calcul d'entraînement |
| [HYPOTHÈSE] | Idée de cause, pas encore confirmée par une mesure |
| [À VÉRIFIER : motif] | Information plausible (relevé, forum, souvenir) qui attend une source |

Une valeur relevée sur **une** carte reste [À VÉRIFIER] tant qu'elle n'est pas confirmée par une
source ou sur plusieurs exemplaires. Un forum n'est jamais une source : c'est une piste.

### La méthode de diagnostic en cinq étapes

::figure{id=S01-F03}

1. **Recueillir et constater le symptôme** : ce qui est décrit, puis ce que vous constatez vous-même. Un symptôme non reproduit est noté comme tel.
2. **Formuler des hypothèses** : plusieurs causes possibles, chacune étiquetée [HYPOTHÈSE], classées de la plus probable à la moins probable et de la plus simple à vérifier à la plus coûteuse.
3. **Mesurer pour départager** : choisir la mesure qui élimine le plus d'hypothèses, en commençant par les mesures sans risque (hors tension, visuelles).
4. **Conclure sur une preuve** : une hypothèse devient une conclusion seulement quand une mesure la confirme. Une hypothèse infirmée renvoie à l'étape 2.
5. **Intervenir, valider, documenter** : réparer, refaire les mesures qui prouvent la réparation, compléter le dossier.

Le piège le plus courant est de sauter de l'étape 1 à l'étape 5 : remplacer un composant « qui
lâche souvent » sans mesure qui le justifie. Dans ce cursus, c'est une faute éliminatoire à
partir du module M8.

### Exemple 5 : documenter un écart

Un TP prévoit un courant théorique de 22,7 mA ; le multimètre affiche 21,9 mA [EXEMPLE].

1. Écart absolu : 21,9 − 22,7 = −0,8 mA [EXEMPLE].
2. Écart relatif : −0,8 / 22,7 = −0,035, soit −3,5 % [EXEMPLE].
3. Comparaison : si la tolérance justifiée du TP (composant + instrument) est de ±6 % [EXEMPLE], la mesure est conforme.
4. Commentaire au journal : « écart −3,5 %, dans la tolérance de ±6 % [EXEMPLE] ; résistance réelle probablement un peu au-dessus de sa valeur nominale [HYPOTHÈSE], à confirmer par une mesure hors circuit ».

### Le test de positionnement en mathématiques

L'électronique utilise en permanence quatre outils de calcul. Le test ci-dessous situe votre
niveau avant S02 ; en cas de difficulté, prévoyez une remise à niveau (4 à 8 h selon le
document de décisions du cursus) avant de continuer.

- **Puissances de 10** : 10³ × 10⁻² = 10¹ ; on additionne les exposants en multipliant.
- **Règle de trois** : si une grandeur est proportionnelle à une autre, on passe par la valeur pour une unité.
- **Équation du premier degré** : isoler l'inconnue en faisant la même opération des deux côtés.
- **Logarithme décimal** : log₁₀(100) = 2 parce que 10² = 100 ; il servira aux décibels en S06.

### Exemple 6 : une règle de trois d'atelier

Quatre lampes identiques consomment ensemble 2 A [EXEMPLE]. Combien consomment six lampes ?

1. Pour une lampe : 2 / 4 = 0,5 A [EXEMPLE].
2. Pour six lampes : 0,5 × 6 = 3 A [EXEMPLE].

## Exercices

::exercice{id=S01-L03-EX01}

::exercice{id=S01-L03-EX02}

::exercice{id=S01-L03-EX03}

::exercice{id=S01-L03-EX04}

::exercice{id=S01-L03-EX05}
