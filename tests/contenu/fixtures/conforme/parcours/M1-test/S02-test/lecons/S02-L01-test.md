---
id: S02-L01
titre: Leçon de test
chapitre: S02
version: "0.1"
statut: brouillon
duree_min: 90
objectifs:
  - id: O1
    texte: Calculer un courant avec la loi d'Ohm
    competences: [D2.2]
  - id: O2
    texte: Convertir une valeur entre préfixes
    competences: [D2.1]
  - id: O3
    texte: Calculer une puissance dissipée
    competences: [D2.2]
prerequis: []
exercices: [S02-L01-EX01, S02-L01-EX02, S02-L01-EX03, S02-L01-EX04, S02-L01-EX05]
references: [SRC-0001]
criteres_evaluation:
  - objectif: O1
    critere: 4 réponses justes sur 5
  - objectif: O2
    critere: Question S02-Q001 réussie
  - objectif: O3
    critere: Exercice S02-L01-EX05 réussi
figures:
  - id: S02-F01
    fichier: ../figures/S02-F01-test.svg
    legende: Circuit série de test
    alt: Une source reliée à une résistance
    origine: areprog
derniere_verification_sources: 2026-11-01
historique:
  - version: "0.1"
    date: 2026-11-01
    resume: Fixture de test
---

## Théorie

La loi d'Ohm relie tension, courant et résistance [SOURCÉ : SRC-0001 §1].

::figure{id=S02-F01}

### Exemple 1

Soit R = 220 Ω alimentée en 5 V [EXEMPLE]. Le courant vaut 22,7 mA [EXEMPLE].

### Exemple 2

Une résistance de 1 kΩ sous 12 V [EXEMPLE] laisse passer 12 mA [EXEMPLE].

### Exemple 3

La puissance dissipée par 100 Ω parcourue par 0,1 A est de 1 W [EXEMPLE].

::exercice{id=S02-L01-EX01}
