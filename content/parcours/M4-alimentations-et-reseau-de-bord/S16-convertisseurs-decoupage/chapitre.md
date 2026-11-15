---
id: S16
titre: "Convertisseurs à découpage"
module: M4
duree_h: 8
competences: [D6.2, D9.1]
prerequis: [S15]
lecons: [S16-L01, S16-L02, S16-L03]
tp: [TP-22]
sources: [SRC-0039, SRC-0040, SRC-0041, SRC-0013, SRC-0029]
version: "0.1"
statut: brouillon
derniere_verification_sources: 2026-11-14
historique:
  - version: "0.1"
    date: 2026-11-14
    resume: Première rédaction (3 leçons, 8 exercices, banque de 25 questions, TP-22, séance FR-12)
---

Deuxième semaine du module M4. Le régulateur linéaire perd en chaleur l'écart entre entrée et
sortie ; le convertisseur à découpage, lui, commute un transistor et lisse le résultat avec une
inductance et un condensateur. On étudie le buck et le boost, le rapport cyclique, l'ondulation de
courant et de tension, le rôle de l'ESR des condensateurs, puis les mesures à l'oscilloscope et le
calcul du rendement. On termine par une première lecture des symptômes d'un convertisseur en panne.

Organisation conseillée des 8 h : leçons (4 h), exercices (30 min), TP-22 (1 h 45), FR-12 (1 h),
QCM et journal (45 min).

## Mesures attendues et tolérances

**TP-22.** Le rendement se calcule avec le courant d'entrée moyen : η = PCHARGE / PTOTAL,
PTOTAL = VIN × IIN(moyen) [SOURCÉ : SRC-0039 §3.5 Measuring Regulator Efficiency of DC/DC Converters] ;
la précision des deux multimètres s'ajoute, on compare une tendance avec la charge. Le rapport
cyclique lu au nœud de commutation se compare à D = VOUT / (VIN × η)
[SOURCÉ : SRC-0040 §2 Calculate the Maximum Switch Current], en ordre de grandeur, car à faible
charge le convertisseur peut passer en conduction discontinue
[SOURCÉ : SRC-0039 §2.2 Continuous vs Discontinuous Operation]. L'ondulation n'est retenue qu'avec
une masse courte [SOURCÉ : SRC-0039 §3.4 Measuring Output Ripple Voltage]. L'ESR se compare entre
deux condensateurs mesurés à la même température avec le même instrument, car elle augmente
fortement à froid [SOURCÉ : SRC-0039 §3.1 Capacitor Parasitics Affecting Switching Regulator Performance].

## Erreurs fréquentes

- **Calculer le rendement avec le courant d'entrée crête.** Détection : utiliser le courant moyen, lu au multimètre en continu.
- **Mesurer l'ondulation avec le fil de masse long.** Détection : refaire la mesure au ressort de masse ; si les pointes diminuent, elles venaient de la sonde.
- **Poser la masse de la sonde sur le nœud de commutation.** Détection : relire où est la masse du module avant de brancher (FE-07).
- **Oublier que le courant crête dépasse le courant de sortie.** Détection : ajouter ΔIL / 2 au courant de sortie avant de choisir une inductance.
- **Remplacer un condensateur de sortie par un modèle à ESR plus élevée.** Détection : comparer l'ESR ou le type (faible ESR, céramique) à celui d'origine.
- **Conclure qu'un boost est éteint parce qu'il ne commute pas.** Détection : sa sortie reste reliée à l'entrée par l'inductance et la diode ; mesurer avant de manipuler.
- **Mesurer l'ESR d'un condensateur sans le décharger.** Détection : mesurer sa tension deux fois avant la mesure (FE-09).

## Lien atelier

Les calculateurs récents utilisent des convertisseurs à découpage pour produire leurs tensions
internes [HYPOTHÈSE : à vérifier sur chaque carte en repérant inductance et circuit intégré]. Un
calculateur qui se réinitialise par temps froid et fonctionne une fois chaud peut avoir un
condensateur électrolytique usé dans son alimentation [HYPOTHÈSE : à confirmer par la mesure de
l'ESR et de l'ondulation]. La mise sous tension d'un calculateur réel suit une procédure
progressive, étudiée en S17. Aucune valeur ni aucun schéma de calculateur réel n'est donné ici.

## Fil rouge FR-12 : inductances et condensateurs électrolytiques CMS

Douzième séance du fil rouge microsoudure (1 h). Critère de réussite du catalogue des TP :
polarité et tenue.

1. Préparer le poste : aspiration des fumées en marche, fer sur son support, poste ESD (bracelet relié), flux, tresse, brucelles.
2. Sur la carte d'exercice, repérer la polarité de chaque électrolytique CMS à la sérigraphie et au marquage du boîtier, puis la noter sur un croquis **avant** la dépose.
3. Déposer un électrolytique CMS en chauffant ses deux pattes en alternance, sans toucher le corps avec la panne ; même démarche pour une inductance CMS, dont les grandes pastilles demandent plus de chaleur.
4. Nettoyer les pastilles à la tresse et au flux ; inspecter au microscope.
5. Reposer un composant neuf dans le bon sens, d'après le croquis : une patte, contrôle de l'alignement, puis l'autre patte.
6. Contrôler la polarité au croquis, la tenue à la brucelle sans forcer, et les ménisques au microscope ; photographier.
7. Réglage de la température de la panne et limites de chauffe du composant : notice de la station et fiche du composant [À VÉRIFIER : température recommandée dans la notice de la station et profil de soudure admis par la fiche du condensateur].

## Sécurité spécifique

- Alimentation limitée en courant, limite écrite avant la mise sous tension (FE-02) ; polarités vérifiées, condensateurs électrolytiques compris (FE-03).
- Pince de masse de la sonde uniquement sur la masse du module [SOURCÉ : SRC-0029 §Use Proper Grounding Procedures] (FE-07).
- Condensateur déchargé à travers une résistance, dans la plage recommandée par le fabricant, puis tension mesurée deux fois avant toute mesure d'ESR ou manipulation [SOURCÉ : SRC-0013 §2-7 Restriking Voltage] (FE-09).
- Résistances de charge, inductance et circuit intégré du module chauds : température lue à l'instrument, jamais au doigt.
- FR-12 : composants déposés brûlants, manipulés aux brucelles ; aspiration à la source, mains lavées après la séance (S01) ; cartes manipulées sur le poste ESD (FE-01).
