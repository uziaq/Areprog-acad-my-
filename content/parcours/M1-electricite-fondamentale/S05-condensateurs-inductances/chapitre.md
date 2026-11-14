---
id: S05
titre: "Condensateurs, inductances, régimes transitoires"
module: M1
duree_h: 8
competences: [D1.3, D2.5, D9.1]
prerequis: [S04]
lecons: [S05-L01, S05-L02, S05-L03]
tp: [TP-07]
sources: [SRC-0009, SRC-0011, SRC-0012, SRC-0013]
version: "0.1"
statut: brouillon
derniere_verification_sources: 2026-11-14
historique:
  - version: "0.1"
    date: 2026-11-14
    resume: Première rédaction (3 leçons, 8 exercices, banque de 25 questions, TP-07, séance FR-02)
---

Quatrième semaine du module M1. Après les composants qui dissipent (résistances), ceux qui
stockent : le condensateur, qui s'oppose aux variations de tension, et la bobine, qui s'oppose
aux variations de courant. La constante de temps relie ces deux composants au temps. La semaine
fixe aussi deux réflexes d'atelier : un condensateur se décharge à travers une résistance et la
décharge se **mesure** ; une charge inductive coupée brutalement produit une surtension.

Organisation conseillée des 8 h : leçons (3 h 30), exercices (45 min), TP-07 (1 h 45),
FR-02 (1 h), QCM et journal (1 h).

## Mesures attendues et tolérances

**TP-07.** La constante de temps se calcule avec la résistance **mesurée** et la capacité
nominale du condensateur. La tolérance des électrolytiques est large et se lit dans la fiche
technique du modèle utilisé [À VÉRIFIER : tolérance de capacité du condensateur du TP, dans sa fiche technique].
L'écart entre τ mesuré et τ calculé s'explique d'abord par cette tolérance, puis par la réaction
de l'opérateur au chronomètre et par la résistance d'entrée du voltmètre (S04), qui se met en
parallèle sur le condensateur pendant la mesure [HYPOTHÈSE].

## Erreurs fréquentes

- **Croire qu'un condensateur se décharge seul et vite.** Détection : mesurer la tension à ses bornes avant toute manipulation ; une mesure, pas une supposition.
- **Court-circuiter un condensateur chargé pour le décharger.** Détection : vérifier qu'une résistance de décharge est dans la boucle.
- **Monter un électrolytique à l'envers.** Détection : vérifier le repère de polarité et le schéma avant la mise sous tension.
- **Additionner des capacités en série comme des résistances.** Détection : en série, la capacité équivalente est plus petite que la plus petite des capacités.
- **Oublier les unités dans τ = R × C.** Détection : R en ohms et C en farads donnent des secondes ; 1 kΩ × 1 µF = 1 ms [EXEMPLE].
- **Prendre 5τ pour une garantie.** Détection : il reste une fraction de la tension, et les composants réels s'écartent du nominal.
- **Monter une diode de roue libre à l'envers.** Détection : bobine alimentée, la diode doit être bloquée ; sa cathode va au côté le plus positif.

## Lien atelier

Sur une carte de calculateur, les condensateurs électrolytiques sont des composants d'usure : la
chaleur et le courant d'ondulation raccourcissent leur vie (leçon S05-L01). Un électrolytique
gonflé, qui fuit, ou placé près d'une source de chaleur devient un suspect [HYPOTHÈSE], à
confirmer par une mesure (testeur ESR / LCR, S16) et par le symptôme. Les sorties qui commandent
des relais, électrovannes et injecteurs pilotent des charges inductives : la surtension à
l'ouverture et ses protections expliquent une partie des pannes d'étages de puissance [HYPOTHÈSE],
étudiées en S20 à S22. Aucune valeur de composant de calculateur réel n'est donnée ici : elles
viennent du schéma ou de la documentation du calculateur étudié.

## Fil rouge FR-02 : traversants sur carte d'entraînement

Deuxième séance du fil rouge microsoudure (1 h). Critère de réussite du catalogue des TP :
10 joints sur 10 conformes au microscope.

1. Préparer le poste comme en FR-01 : aspiration des fumées en marche, fer sur son support, poste ESD si la carte comporte des composants sensibles.
2. Souder dix composants traversants, dont deux condensateurs électrolytiques en respectant leur polarité.
3. Inspecter chaque joint au microscope : joint brillant et concave, sans pont, sans excès ; photographier.
4. Dessouder et ressouder deux composants ; noter au journal la méthode et les difficultés.
5. Réglage de la température de la panne : notice de la station et fiche de l'alliage [À VÉRIFIER : température recommandée dans la notice de la station et la fiche de l'alliage utilisés].

## Sécurité spécifique

- Un condensateur se décharge à travers une résistance, puis la décharge se vérifie au voltmètre, deux fois : après la décharge et juste avant la manipulation [SOURCÉ : SRC-0013 §2-7 Restriking Voltage]. Condensateur non déchargé avant manipulation : faute éliminatoire FE-06.
- Polarité d'un électrolytique vérifiée avant la mise sous tension : à l'envers, il chauffe, produit du gaz et peut ouvrir sa soupape [SOURCÉ : SRC-0013 §2-3-2 Reverse Voltage].
- Tension nominale du condensateur supérieure à la tension appliquée [SOURCÉ : SRC-0013 §2-3-3 Excess Voltage Application].
- Charge inductive : ne pas ouvrir à la main un circuit inductif parcouru par un courant sans protection, la surtension peut atteindre des centaines de volts [SOURCÉ : SRC-0011 §Inductor commutating circuits].
- Alimentation limitée en courant, limite écrite avant la mise sous tension (FE-02).
