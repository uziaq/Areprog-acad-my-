---
id: S08
titre: "Diodes"
module: M2
duree_h: 8
competences: [D4.3, D9.1]
prerequis: [S07]
lecons: [S08-L01, S08-L02, S08-L03]
tp: [TP-11, TP-12]
sources: [SRC-0008, SRC-0011, SRC-0012, SRC-0018]
version: "0.1"
statut: brouillon
derniere_verification_sources: 2026-11-14
historique:
  - version: "0.1"
    date: 2026-11-14
    resume: Première rédaction (3 leçons, 8 exercices, banque de 25 questions, TP-11 et TP-12, séance FR-05)
---

Deuxième semaine du module M2, et premier composant non linéaire : la diode. On la teste au
multimètre, on lit sa fiche, puis on découvre la famille qui protège les calculateurs : Zener,
TVS, Schottky, protection contre l'inversion de polarité, et la diode de roue libre déjà
rencontrée en S05. La LED et sa résistance série terminent la semaine.

Organisation conseillée des 8 h : leçons (4 h), exercices (30 min), TP-11 (1 h),
TP-12 (1 h 15), FR-05 (1 h), QCM et journal (15 min).

## Mesures attendues et tolérances

**TP-11.** Le seuil relevé sur la courbe I(U) se compare à la fiche technique de la diode
utilisée, au courant considéré [À VÉRIFIER : courbe de tension directe dans la fiche technique de la diode du TP].
L'ordre de grandeur attendu pour une diode au silicium est d'environ 0,7 V [SOURCÉ : SRC-0011 §Introduction].

**TP-12.** La tension mesurée aux bornes de la Zener se compare à la plage de tension Zener de sa
fiche, au courant de test de la fiche [À VÉRIFIER : tension Zener nominale, tolérance et courant de test dans la fiche de la Zener du TP].
La tension de claquage de la TVS se compare à la plage VBR de sa fiche, mesurée sous le courant
indiqué par la fiche, en général 1 mA [SOURCÉ : SRC-0018 §1.4].

## Erreurs fréquentes

- **Confondre anode et cathode.** Détection : la bague est côté cathode ; au test de jonction, la pointe rouge sur l'anode affiche le seuil.
- **Tester une diode en circuit et conclure.** Détection : chercher ce qui est relié en parallèle (bobine, résistance) ; dessouder une patte si besoin.
- **Brancher une Zener sans résistance série.** Détection : calculer le courant (E − Uz) / R avant de mettre sous tension.
- **Prendre une TVS pour une Zener de régulation.** Détection : une TVS écrête des transitoires ; elle ne régule pas en continu.
- **Choisir une TVS d'après sa VBR seule.** Détection : vérifier que VRM couvre la tension de service et que VCL reste supportable.
- **Oublier la puissance de la résistance d'une LED.** Détection : calculer (E − U_LED) × I, surtout sous une tension d'alimentation élevée.
- **Remplacer une diode par « à peu près la même ».** Détection : comparer tension inverse, courant, vitesse et boîtier dans les deux fiches.

## Lien atelier

Sur un calculateur, les diodes sont partout aux frontières : protection de l'entrée
d'alimentation contre l'inversion de polarité et les surtensions, TVS sur les lignes qui sortent
vers le faisceau, diodes de roue libre sur les sorties inductives. Un composant de protection
en court-circuit peut faire fondre un fusible ou écrouler une alimentation [HYPOTHÈSE] ; un
composant de protection coupé laisse passer la contrainte suivante [HYPOTHÈSE]. Le test de
jonction hors circuit et la comparaison avec la fiche technique tranchent. Aucune valeur ni
aucun schéma de calculateur réel n'est donné ici.

## Fil rouge FR-05 : SOD et MELF

Cinquième séance du fil rouge microsoudure (1 h). Critère de réussite du catalogue des TP :
orientation et ménisques corrects.

1. Préparer le poste : aspiration des fumées en marche, fer sur son support, poste ESD, brucelles, flux.
2. Souder des diodes en boîtier SOD en respectant le repère de cathode de la sérigraphie et du composant ; photographier l'orientation avant et après.
3. Souder des composants MELF : les maintenir pour qu'ils ne roulent pas pendant la première soudure.
4. Inspecter au microscope : orientation, ménisque des deux côtés, composant à plat ; tester chaque diode au test de jonction après soudure.
5. Réglage de la température de la panne : notice de la station et fiche de l'alliage [À VÉRIFIER : température recommandée dans la notice de la station et la fiche de l'alliage utilisés].

## Sécurité spécifique

- Alimentation limitée en courant, limite écrite avant la mise sous tension (FE-02) ; dans le TP-12, la limite protège la Zener et la TVS pendant la montée en tension.
- Polarité vérifiée avant la mise sous tension ; une inversion non protégée est une faute éliminatoire (FE-03).
- Calcul de la puissance dans chaque composant avant l'essai (résistance série, Zener) ; un composant qui chauffe se laisse refroidir avant d'être touché.
- FR-05 : aspiration à la source, fer sur son support, mains lavées après la séance (S01).
