---
id: S26-L01
titre: Thermique de la soudure et alliages avec ou sans plomb
chapitre: S26
version: "0.1"
statut: brouillon
duree_min: 90
objectifs:
  - id: O1
    texte: Expliquer le mouillage et le rôle de la chaleur apportée à la pastille et à la terminaison
    competences: [D9.1]
  - id: O2
    texte: Comparer un alliage étain-plomb et un alliage sans plomb à partir de leurs fiches (composition, plage de fusion)
    competences: [D9.1]
  - id: O3
    texte: Choisir panne, température et durée de contact à partir de la documentation du fabricant du composant et de la station
    competences: [D9.1]
prerequis: [S07-L01]
exercices: [S26-L01-EX01, S26-L01-EX02, S26-L01-EX03]
references: [SRC-0071, SRC-0072, SRC-0073, SRC-0074]
criteres_evaluation:
  - objectif: O1
    critere: Exercice S26-L01-EX01 réussi
  - objectif: O2
    critere: Exercice S26-L01-EX02 réussi et alliage du poste identifié au TP-37
  - objectif: O3
    critere: Exercice S26-L01-EX03 réussi et réglages justifiés par écrit au TP-37
figures:
  - id: S26-F01
    fichier: ../figures/S26-F01-mouillage.svg
    legende: "Mouillage d'une terminaison de composant chip : à gauche, un bon ménisque concave qui monte sur la face de la terminaison avec un angle de raccordement faible ; à droite, un défaut de mouillage : la soudure reste en boule et forme un angle négatif avec la face de la terminaison. La panne chauffe en même temps la pastille et la terminaison. D'après les critères de la norme NASA-STD-8739.2 ; dessin de principe."
    alt: "Deux coupes côte à côte d'une extrémité de composant posée sur une pastille. À gauche, la soudure forme une pente concave entre la pastille et la face du composant. À droite, la soudure forme une boule qui ne s'étale pas et ne monte pas sur la face du composant."
    origine: areprog
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction
---

## Théorie

### Mouiller, c'est chauffer les deux surfaces

Le mouillage est l'écoulement et l'adhérence de l'alliage fondu sur une surface solide, avec des bords
lisses et un angle de raccordement faible [SOURCÉ : SRC-0071 §3.1 Terms and Definitions]. Une bonne soudure a une surface
lisse, non poreuse, et un ménisque continu sur tout le pourtour de la connexion
[SOURCÉ : SRC-0071 §12.8 Inspection Criteria, General]. Pour cela, la pastille **et** la terminaison
doivent atteindre la température de fusion de l'alliage en même temps : une soudure apportée sur une
surface trop froide reste en boule [HYPOTHÈSE : explication physique simplifiée, cohérente avec les
défauts de mouillage décrits par la norme].

::figure{id=S26-F01}

La norme demande des outils qui apportent une quantité de chaleur adaptée à la taille, à la forme et à
la conductivité thermique des pièces, sans abîmer la connexion ni les composants voisins
[SOURCÉ : SRC-0071 §6.7 Heat Sources]. Conséquences pratiques
[HYPOTHÈSE : règles d'atelier tirées de ce principe, à valider par le taux de réussite au TP-37] :

- une pastille reliée à un plan de masse absorbe beaucoup de chaleur : panne plus large ou préchauffage, plutôt qu'une température plus haute ;
- un petit composant chauffe vite : contact bref ;
- une panne propre et étamée transmet la chaleur ; une panne oxydée la transmet mal.

### Le fer et sa panne

La norme exige un fer à température régulée et une panne reliée à la terre, et la contrôle avant et
pendant l'usage : panne bien insérée, serrée, propre, étamée sur sa surface de travail, de taille
adaptée au travail [SOURCÉ : SRC-0071 §6.7 Heat Sources]. Les pistolets à souder sont interdits
[SOURCÉ : SRC-0071 §6.7 Heat Sources]. Les outils se vérifient chaque jour
[SOURCÉ : SRC-0072 §7.1 Preparation of Soldering Tools].

### Alliages avec et sans plomb

- **Étain-plomb** : la norme NASA prescrit les compositions Sn60 et Sn63 [SOURCÉ : SRC-0071 §6.12 Solder]. Un fabricant de condensateurs indique, pour les soudures CMS usuelles de ce type, des points de fusion de 179 à 188 °C [SOURCÉ : SRC-0073 §SMT Soldering Temperatures].
- **Sans plomb SAC305** : 96,5 % d'étain, 3 % d'argent, 0,5 % de cuivre [SOURCÉ : SRC-0074 §DESCRIPTION]. Il fond entre 217 °C (solidus) et 220 °C (liquidus) [SOURCÉ : SRC-0074 §TYPICAL MELTING TEMPERATURE].

Un alliage sans plomb demande donc une température de travail plus élevée qu'un alliage étain-plomb
[HYPOTHÈSE : conséquence des plages de fusion, réglage exact selon la fiche de l'alliage et la notice
de la station]. Sur une carte de calculateur, l'alliage d'origine est souvent sans plomb ; on ne
mélange pas les alliages sans le savoir [À VÉRIFIER : alliage d'origine des cartes étudiées et
compatibilité des alliages, dans les fiches des fabricants].

### Régler sans inventer

La température de panne, la durée de contact et le préchauffage ne se devinent pas : ils se lisent
dans la fiche du composant (profil de soudage admis), la fiche de l'alliage et la notice de la station
[À VÉRIFIER : documents des composants, de l'alliage et de la station de l'atelier]. Exemple d'un fabricant de condensateurs céramiques, au fer [SOURCÉ : SRC-0073 §Soldering Iron] :
préchauffage à 150 °C, panne à 280 °C au plus, panne de 3 mm au plus, 5 s au plus [SOURCÉ : SRC-0073 §Soldering Iron]. Ces valeurs valent pour ses
composants ; chaque fabricant donne les siennes.

### Exemple 1 : choisir l'alliage

Une carte d'entraînement est assemblée en SAC305 [EXEMPLE].

1. Liquidus du SAC305 : 220 °C [SOURCÉ : SRC-0074 §TYPICAL MELTING TEMPERATURE].
2. On reprend avec un fil du même alliage, pour ne pas créer un mélange.
3. Température de panne : celle de la notice de la station pour cet alliage, dans la limite admise par le composant.

### Exemple 2 : écart à la fusion

Une panne réglée à 300 °C [EXEMPLE] travaille un alliage étain-plomb qui fond vers 183 °C [EXEMPLE].

1. Écart : 300 − 183 = 117 °C [EXEMPLE].
2. Avec du SAC305 à 220 °C : 300 − 220 = 80 °C [EXEMPLE].
3. L'écart plus faible explique un mouillage plus lent avec le sans plomb au même réglage [HYPOTHÈSE].

### Exemple 3 : une soudure en boule

Sur un 0603, la soudure reste en boule sur la pastille et ne monte pas sur la terminaison [EXEMPLE].

1. Hypothèses : terminaison pas assez chaude, panne oxydée, flux épuisé [HYPOTHÈSE].
2. Corrections : nettoyer et étamer la panne, ajouter du flux, poser la panne sur la pastille et la terminaison en même temps.
3. Contrôle au microscope : ménisque concave et mouillage visible (S26-L03).

## Exercices

::exercice{id=S26-L01-EX01}

::exercice{id=S26-L01-EX02}

::exercice{id=S26-L01-EX03}
