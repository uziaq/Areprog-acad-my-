---
id: S02
titre: Grandeurs, loi d'Ohm, puissance
module: M1
duree_h: 8
competences: [D2.1, D2.2]
prerequis: [S01]
lecons: [S02-L01, S02-L02, S02-L03]
tp: [TP-03]
sources: [SRC-0001, SRC-0006, SRC-0007]
version: "0.3"
statut: brouillon
derniere_verification_sources: 2026-11-13
historique:
  - version: "0.1"
    date: 2026-11-13
    resume: Chapitre du prototype (une seule leçon rédigée sur les 3 prévues)
  - version: "0.3"
    date: 2026-11-13
    resume: Ajout de la rubrique « Lien atelier » (gabarit v0.3, 14 rubriques)
  - version: "0.3"
    date: 2026-11-13
    resume: Leçons S02-L02 (associations) et S02-L03 (code couleur, séries E, tolérance), banque portée à 25 questions, TP-03
---

Première semaine du module M1. Elle pose les grandeurs de base (tension, courant,
résistance, puissance), la loi d'Ohm et la vérification de la puissance dissipée.

Trois leçons : S02-L01 (grandeurs, loi d'Ohm, puissance), S02-L02 (associations en série et
en parallèle, conductance) et S02-L03 (valeurs réelles : code couleur, séries normalisées E,
tolérance). Le TP-03 relie les trois : il vérifie la loi d'Ohm sur des résistances dont on a lu
le marquage et contrôlé la tolérance.

Organisation conseillée des 8 h : leçons (3 h 30), exercices (1 h), TP-03 (2 h 30), QCM et
journal (1 h).

## Mesures attendues et tolérances

Pour le TP-03, la valeur théorique se calcule avec la loi d'Ohm à partir de la tension
réglée et de la valeur nominale de la résistance (lue sur ses bagues, leçon S02-L03). L'écart toléré combine la tolérance
de la résistance (lue sur son marquage) et l'incertitude du multimètre (lue dans sa
notice) : aucune valeur générique n'est donnée ici, car elles dépendent du matériel
de l'atelier [À VÉRIFIER : tolérances à relever sur les composants et la notice du multimètre utilisés].

## Erreurs fréquentes

- **Oublier un préfixe** : diviser 5 par 220 et lire « 0,0227 » comme des milliampères. Détection : refaire l'ordre de grandeur de tête avant de valider.
- **Inverser la formule** : écrire I = R / U. Détection : vérifier les unités, des ohms divisés par des volts ne donnent pas des ampères.
- **Ignorer la puissance nominale** : une résistance correcte en valeur peut brûler si elle dissipe plus que sa puissance nominale. Détection : calculer P à chaque fois qu'on choisit une résistance.
- **Additionner des résistances en parallèle** : écrire 1 kΩ + 1 kΩ = 2 kΩ [EXEMPLE] pour deux résistances reliées aux mêmes points. Détection : en parallèle, le résultat doit être plus petit que la plus petite résistance.
- **Croire que chaque résistance d'une série reçoit toute la tension** : calculer P = U² / R avec la tension totale. Détection : la somme des tensions partielles doit redonner la tension totale.
- **Lire les bagues à l'envers** : commencer par la bague de tolérance. Détection : la lecture doit commencer par l'extrémité proche des bagues ; une valeur absente des séries normalisées signale une lecture inversée [HYPOTHÈSE], à confirmer par la mesure.
- **Déclarer défectueuse une résistance un peu hors de sa valeur marquée** : sans calculer l'intervalle admis. Détection : calculer l'intervalle de tolérance, puis ajouter l'incertitude du multimètre.
- **Mesurer un courant en parallèle** : brancher l'ampèremètre aux bornes d'un composant met la source en court-circuit à travers l'appareil. Détection : l'ampèremètre se place toujours en série, circuit ouvert à l'endroit de la mesure.

## Lien atelier

Un faisceau dont une connexion est oxydée se comporte comme une résistance en série avec le
récepteur. Tant que le circuit est au repos, aucun courant ne circule dans cette résistance :
le voltmètre affiche alors une tension normale. Dès que le récepteur est commandé, le courant
crée une chute de tension dans la connexion, qui chauffe, et le récepteur reçoit moins que la
tension de la batterie. D'où la règle d'atelier : contrôler une tension **sous charge**, entre
le récepteur et la batterie, et pas seulement circuit au repos. L'exemple 3 de la leçon S02-L01
chiffre cette situation avec des valeurs d'exemple.

## Sécurité spécifique

- Alimentation de la plaque d'essai limitée en courant, limite écrite au journal avant la mise sous tension (règle de S01).
- Puissance de chaque résistance calculée **avant** l'essai et comparée à sa puissance nominale : une résistance surchargée brûle et brûle les doigts.
- Ampèremètre en série uniquement, cordons dans la borne de courant vérifiés avant chaque mesure, remis dans les bornes de tension juste après.
