---
id: S01
titre: "Préparer l'atelier et la méthode de travail"
module: M0
duree_h: 8
competences: [D1.1, D1.2, D1.3, D1.4, D1.5, D1.6, D3.2, D10.5]
prerequis: []
lecons: [S01-L01, S01-L02, S01-L03]
tp: [TP-01, TP-02]
sources: [SRC-0001, SRC-0002, SRC-0003, SRC-0004, SRC-0005]
version: "0.1"
statut: brouillon
derniere_verification_sources: 2026-11-13
historique:
  - version: "0.1"
    date: 2026-11-13
    resume: Première rédaction (3 leçons, 10 exercices, banque de 25 questions, TP-01 et TP-02)
---

Semaine d'ouverture, sans prérequis. Avant de toucher une carte, elle installe ce qui protège
les cartes (le poste ESD), ce qui vous protège (catégories de mesure, alimentation limitée en
courant, règles de soudure) et ce qui rend votre travail vérifiable (journal d'atelier, dossier
de réparation, méthode de diagnostic). Elle se termine par un test de positionnement en
mathématiques qui conditionne l'entrée en S02.

Organisation conseillée des 8 h : leçons S01-L01 à S01-L03 (3 h 30), exercices (30 min),
TP-01 et TP-02 (3 h), QCM et journal (1 h).

## Mesures attendues et tolérances

**TP-01, poste ESD.** La valeur attendue de la résistance entre la surface du tapis et la terre,
et celle du bracelet, sont données par la notice de chaque fabricant ; ce cours n'en fournit
aucune [À VÉRIFIER : plages acceptables et méthode de mesure dans les notices du tapis, du bracelet et du testeur de l'atelier].
Si la notice ne donne pas de plage, la tolérance n'est pas déterminable : on note la mesure, la
méthode et l'instrument, et on explique pourquoi on juge la liaison correcte ou non.

**TP-02, alimentation de laboratoire.** La valeur théorique se calcule : résistance de basculement
Rc = U réglée / I limite, puis U = I limite × R en mode CC. L'écart toléré combine la tolérance de
la résistance de puissance (lue sur son marquage), la précision de l'afficheur de l'alimentation
(lue dans sa notice) et celle du multimètre (lue dans sa notice)
[À VÉRIFIER : tolérances à relever sur la résistance et dans les notices de l'alimentation et du multimètre utilisés].
Aucune valeur générique n'est donnée ici.

## Erreurs fréquentes

- **Manipuler une carte « juste une seconde » sans bracelet.** Détection : la check-list du poste (TP-01) se coche **avant** d'ouvrir le sachet ; un sachet ouvert sans case cochée est une faute.
- **Croire qu'une carte qui fonctionne n'a pas souffert d'une décharge.** Détection : relire la notion de défaillance latente (S01-L01) ; noter au dossier toute manipulation hors poste.
- **Relier un objet isolant à la terre pour le « décharger ».** Détection : classer le matériau par sa résistance ; un isolant s'écarte de la zone, il ne se met pas à la terre.
- **Mesurer une tension avec les cordons restés dans la borne de courant.** Détection : regarder les bornes avant chaque mesure ; le multimètre devient un court-circuit quel que soit le sélecteur.
- **Brancher la carte avant de régler la limite de courant.** Détection : la limite est écrite au journal avant la mise sous tension ; sans limite écrite, le TP ne commence pas.
- **Augmenter la limite quand l'alimentation passe en CC.** Détection : le passage en CC est une information (la charge demande plus que prévu) ; on coupe et on cherche la cause.
- **Sauter de l'hypothèse à l'intervention.** Détection : dans le dossier, chaque intervention renvoie à la mesure qui la justifie.

## Lien atelier

Un client se plaint d'un voyant moteur qui s'allume « de temps en temps ». La tentation est de
commander le capteur souvent mis en cause. La méthode en cinq étapes impose l'ordre inverse :
constater le symptôme et lire les défauts mémorisés, formuler plusieurs hypothèses (capteur,
connectique, alimentation, calculateur), choisir la mesure qui les départage, puis seulement
remplacer. Le jour où le calculateur lui-même sera en cause, il arrivera sur votre établi dans
un sachet, et la première chose à faire sera la check-list du poste ESD. Ce cas est qualitatif :
il ne décrit aucune panne réelle d'un véhicule ou d'un calculateur.

## Sécurité spécifique

Cette semaine **est** la semaine sécurité du cursus : chaque règle ci-dessous sera reprise par
les fautes éliminatoires des évaluations pratiques (grilles communes).

- Toute carte se manipule sur le poste ESD, bracelet relié et contrôlé.
- Toute alimentation de TP est limitée en courant, avec une limite écrite au journal avant la mise sous tension.
- Aucun instrument n'est utilisé hors de sa catégorie de mesure ; aucune mesure sur le secteur dans ce cursus.
- Aucun condensateur ne se touche sans que sa tension ait été mesurée.
- Soudure : aspiration des fumées à la source, mains lavées après la séance, fiches de données de sécurité lues avant le premier usage de chaque produit.
