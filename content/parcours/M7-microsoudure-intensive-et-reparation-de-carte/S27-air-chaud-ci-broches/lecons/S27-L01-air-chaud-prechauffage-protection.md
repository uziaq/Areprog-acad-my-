---
id: S27-L01
titre: Air chaud, préchauffage et protection des composants voisins
chapitre: S27
version: "0.1"
statut: brouillon
duree_min: 90
objectifs:
  - id: O1
    texte: Régler une station à air chaud et un préchauffeur à partir des fiches des composants et de la notice de la station
    competences: [D9.2]
  - id: O2
    texte: Protéger les composants voisins sensibles et les connecteurs plastiques avant de chauffer
    competences: [D9.2]
prerequis: [S26-L01]
exercices: [S27-L01-EX01, S27-L01-EX02, S27-L01-EX03]
references: [SRC-0071, SRC-0075, SRC-0076, SRC-0074, SRC-0072]
criteres_evaluation:
  - objectif: O1
    critere: Exercice S27-L01-EX01 réussi et fiche de réglage justifiée au TP-38
  - objectif: O2
    critere: Exercices S27-L01-EX02 et S27-L01-EX03 réussis et protections photographiées au TP-38 et au TP-39
figures:
  - id: S27-F01
    fichier: ../figures/S27-F01-poste-air-chaud.svg
    legende: "Poste de reprise à l'air chaud : carte tenue sur un support au-dessus d'un préchauffeur qui chauffe par le dessous ; buse au-dessus du composant ; composants voisins sensibles et connecteur plastique protégés par un ruban ou un écran ; aspiration des fumées à proximité. Schéma de principe de l'académie."
    alt: "Coupe d'une carte sur un support. Sous la carte, un préchauffeur avec des flèches de chaleur vers le haut. Au-dessus, une buse dirige l'air chaud sur un circuit intégré. À côté, un condensateur et un connecteur recouverts d'une bande de protection. À droite, un bras d'aspiration des fumées."
    origine: areprog
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction
---

## Théorie

### Chauffer sans contact

Une station à air chaud chauffe le composant par un jet de gaz chaud, sans contact. La norme NASA
admet ces sources de chaleur si la station est reliée à la terre et utilisée selon une procédure écrite
[SOURCÉ : SRC-0071 §6.7 Heat Sources]. Elle rappelle surtout que la chaleur ne doit jamais abîmer la
connexion ni les composants voisins [SOURCÉ : SRC-0071 §6.7 Heat Sources].

Un fabricant de circuits intégrés demande, pour une réparation, une température **aussi basse que
possible** pour ne pas endommager les composants voisins ni la carte, et un profil proche de celui de la
refusion d'origine [SOURCÉ : SRC-0075 §8 Repair]. La température maximale du boîtier ne doit pas
dépasser sa température de refusion maximale, indiquée sur l'étiquette ou dans la fiche
[SOURCÉ : SRC-0075 §9 Manual Repair Procedure].

### Préchauffer par le dessous

Le préchauffage de la carte réduit l'écart de température à combler par la buse, limite les
dépassements de température et aide à éviter le gauchissement de la carte
[SOURCÉ : SRC-0076 §6.1 Compound Removal]. Un fabricant recommande fortement un préchauffeur, même pour
une reprise au fer [SOURCÉ : SRC-0076 §6.4 Manual Rework Considerations].

Exemple de profil publié par TI pour déposer un QFN sans plomb sur une carte FR4 avec une machine de
reprise [SOURCÉ : SRC-0076 §6.1 Compound Removal] : préchauffage de la carte, palier, montée, refusion,
puis refroidissement. Les températures de ce tableau sont celles de la **consigne** de la machine, pas
de la carte ; TI précise qu'il faut adapter le profil à l'épaisseur de la carte et à l'équipement
[SOURCÉ : SRC-0076 §6.1 Compound Removal]. Les réglages d'une station manuelle se prennent dans sa notice
et se vérifient par une mesure [À VÉRIFIER : notice de la station et du préchauffeur de l'atelier,
moyen de mesure de température disponible].

::figure{id=S27-F01}

### Protéger les voisins

Faute éliminatoire du module : air chaud sans protection des composants voisins sensibles (FE-11).
Avant de chauffer [EXEMPLE : méthode d'atelier de l'académie] :

- repérer les composants sensibles proches : connecteurs et pièces en plastique, condensateurs électrolytiques, quartz, petits passifs qui s'envoleraient ;
- les couvrir d'un ruban polyimide ou d'un écran métallique, en laissant le composant à déposer dégagé [À VÉRIFIER : tenue en température dans la fiche du ruban ou de l'écran utilisé] ;
- choisir une buse adaptée à la taille du composant ; certains fabricants de machines conçoivent des buses qui isolent thermiquement les composants voisins [SOURCÉ : SRC-0076 §6 Rework Guidelines (Hot Gas Convection and Manual)] ;
- régler un débit d'air faible pour ne pas déplacer les petits composants [HYPOTHÈSE : à constater sur la carte d'entraînement].

Un connecteur plastique fond ou se déforme bien avant l'alliage : on ne dirige jamais la buse vers lui
[À VÉRIFIER : température admise par le connecteur, dans sa fiche].

### Fumées et brûlures

L'alliage chauffé et le flux dégagent des fumées : ventilation adaptée exigée par la fiche de l'alliage
[SOURCÉ : SRC-0074 §SAFETY] ; l'aspiration reste en marche pendant toute la reprise (FE-12). La buse
et la carte restent chaudes après l'arrêt : on pose la poignée sur son support et on laisse refroidir la
carte à l'air ambiant [SOURCÉ : SRC-0072 §10.1 General].

### Exemple 1 : lire la température limite

La fiche d'un circuit indique une température de refusion maximale du boîtier de 260 °C [EXEMPLE].

1. Pendant la reprise, le boîtier ne doit pas dépasser 260 °C [EXEMPLE].
2. La consigne de la buse est plus haute que la température du boîtier : elle ne se règle pas « à 260 » sans mesure [HYPOTHÈSE].
3. On vérifie avec le moyen de mesure de l'atelier, sur une carte d'essai.

### Exemple 2 : un voisin abîmé

Après une dépose, un condensateur électrolytique voisin est bombé et décoloré [EXEMPLE].

1. Cause probable : il n'était pas protégé, ou la buse a été dirigée vers lui [HYPOTHÈSE].
2. Il est remplacé, et la protection est ajoutée à la fiche de réglage.
3. Au TP, c'est la faute éliminatoire FE-11.

### Exemple 3 : préchauffer une carte épaisse

Une carte multicouche avec un plan de masse ne fond pas à la consigne habituelle [EXEMPLE].

1. On ne monte pas la buse au maximum : risque pour les voisins [SOURCÉ : SRC-0075 §8 Repair].
2. On préchauffe la carte par le dessous [SOURCÉ : SRC-0076 §6.1 Compound Removal].
3. On garde une consigne de buse modérée et on allonge un peu le temps, en surveillant le boîtier.

## Exercices

::exercice{id=S27-L01-EX01}

::exercice{id=S27-L01-EX02}

::exercice{id=S27-L01-EX03}
