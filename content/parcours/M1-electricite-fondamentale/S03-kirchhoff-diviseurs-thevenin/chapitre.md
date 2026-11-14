---
id: S03
titre: "Kirchhoff, diviseurs, Thévenin"
module: M1
duree_h: 8
competences: [D2.3, D2.4]
prerequis: [S02]
lecons: [S03-L01, S03-L02, S03-L03]
tp: [TP-04, TP-05]
sources: [SRC-0001]
version: "0.1"
statut: brouillon
derniere_verification_sources: 2026-11-13
historique:
  - version: "0.1"
    date: 2026-11-13
    resume: Première rédaction (3 leçons, 10 exercices, banque de 25 questions, TP-04 et TP-05)
---

Deuxième semaine du module M1. Elle donne les deux lois qui permettent de résoudre n'importe
quel circuit de résistances (lois des nœuds et des mailles), le montage le plus fréquent sur une
entrée de calculateur (le diviseur de tension), et le modèle qui explique pourquoi une tension
baisse sous charge (résistance interne, Thévenin).

Organisation conseillée des 8 h : leçons (3 h 30), exercices (1 h), TP-04 et TP-05 (2 h 30),
QCM et journal (1 h).

## Mesures attendues et tolérances

**TP-04.** La tension de sortie théorique se calcule avec la formule du diviseur, à vide puis
chargé, à partir des valeurs **mesurées** des résistances hors circuit. L'écart toléré combine
la tolérance des résistances (lue sur leurs bagues) et l'incertitude du multimètre (lue dans sa
notice) [À VÉRIFIER : tolérances à relever sur les composants et dans la notice du multimètre utilisés ; « inconnue » si elle n'y figure pas, la fiche complète du multimètre est établie au TP-06].
L'entrée du voltmètre charge elle aussi le diviseur : avec les valeurs du TP, cet effet est
calculé et doit rester négligeable ; il sera étudié en S04.

**TP-05.** La résistance interne n'a pas de valeur « attendue » : c'est le résultat de la mesure.
On contrôle sa cohérence en prévoyant, avec la valeur trouvée, la tension sous une seconde charge,
puis en la mesurant. L'écart toléré combine la tolérance des résistances de charge et
l'incertitude du multimètre ; la décharge de la pile pendant l'essai ajoute un écart qu'on limite
en mesurant vite [À VÉRIFIER : tolérances à relever sur les résistances et dans la notice du multimètre ; « inconnue » si elle n'y figure pas, la fiche complète du multimètre est établie au TP-06].

## Erreurs fréquentes

- **Confondre fils et nœuds** : compter deux nœuds là où un fil sans composant relie deux points. Détection : colorier chaque ensemble de fils reliés ; une couleur = un nœud.
- **Mélanger les signes dans la loi des mailles** : changer de convention en cours de route. Détection : choisir un sens de parcours, l'écrire sur le schéma, et vérifier que la somme des tensions fait zéro avec les valeurs trouvées.
- **Oublier la charge sur un diviseur** : appliquer la formule à vide alors qu'une entrée ou un appareil est branché. Détection : comparer la charge à Rth ; si elle n'est pas au moins cent fois plus grande [EXEMPLE], recalculer avec Thévenin.
- **Inverser le diviseur de courant** : donner le plus grand courant à la plus grande résistance. Détection : I1 + I2 doit redonner I, et la plus petite résistance doit recevoir le plus grand courant.
- **Mesurer une résistance interne trop lentement** : la pile se décharge et chauffe, E0 dérive. Détection : refaire la mesure à vide juste après la mesure sous charge ; un écart important signale une dérive.
- **Juger une batterie à sa seule tension à vide** : une résistance interne élevée ne se voit que sous charge.

## Lien atelier

Un véhicule démarre mal alors que la batterie affiche une tension correcte au repos. Le modèle
de Thévenin donne trois pistes à départager par la mesure : résistance interne de la batterie
trop élevée, résistance de contact sur une cosse, ou mauvaise masse. Chacune ajoute une chute
r × I qui n'apparaît **que** quand le démarreur tire du courant. La méthode de S01 s'applique :
hypothèses étiquetées [HYPOTHÈSE], puis mesures de tension sous charge, batterie, cosse et masse
séparément. Cet exemple est qualitatif : il ne décrit la panne d'aucun véhicule réel.

## Sécurité spécifique

- TP-04 : alimentation limitée en courant, limite écrite au journal avant la mise sous tension.
- TP-05 : on n'utilise **jamais** une batterie de véhicule pour ce TP, seulement une pile, car une batterie peut débiter un courant énorme dans une erreur de câblage. On ne court-circuite jamais une pile pour « mesurer son courant de court-circuit ».
- Résistances de charge dimensionnées en puissance avant l'essai ; essais sous charge brefs.
