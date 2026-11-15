---
id: S09
titre: "Transistors en commutation"
module: M2
duree_h: 8
competences: [D4.4, D9.1, D10.2]
prerequis: [S08]
lecons: [S09-L01, S09-L02, S09-L03]
tp: [TP-13, TP-14]
sources: [SRC-0011, SRC-0012, SRC-0019, SRC-0020, SRC-0021, SRC-0022]
version: "0.1"
statut: brouillon
derniere_verification_sources: 2026-11-14
historique:
  - version: "0.1"
    date: 2026-11-14
    resume: Première rédaction (3 leçons, 8 exercices, banque de 25 questions, TP-13 et TP-14, séance FR-06)
---

Troisième semaine du module M2 : le transistor utilisé comme interrupteur. On commande une charge
avec un bipolaire NPN, puis avec un MOSFET canal N, et l'on apprend à lire leur fiche, à calculer
ce qu'ils dissipent et à les tester hors circuit. La semaine se termine sur les étages de sortie
d'un calculateur : low-side, high-side, charges inductives et transistors protégés.

Organisation conseillée des 8 h : leçons (4 h), exercices (30 min), TP-13 (1 h), TP-14 (1 h 15),
FR-06 (1 h), QCM et journal (15 min).

## Mesures attendues et tolérances

**TP-13.** Transistor saturé, VCE(sat) se compare à la valeur maximale de la fiche, aux courants
indiqués par la fiche ; elle est en général de 0,3 V ou moins [SOURCÉ : SRC-0019 §Transistor ratings and packages].
Le rapport IC / IB mesuré en partie B ne se compare qu'à la plage de β de la fiche, car β varie
beaucoup d'un exemplaire à l'autre [SOURCÉ : SRC-0019 §Active mode operation].

**TP-14.** La RDS(on) calculée à partir de VDS et du courant se compare à la RDS(on) maximale de la
fiche à la même VGS ; elle augmente avec la température de jonction [SOURCÉ : SRC-0020 §4].
La VGS de début de conduction se compare à la plage de VGS(th) de la fiche [SOURCÉ : SRC-0020 §3]
[À VÉRIFIER : valeurs de RDS(on) et de VGS(th) dans la fiche du MOSFET du TP].

## Erreurs fréquentes

- **Calculer la résistance de base avec un β typique.** Détection : reprendre le β minimal de la fiche au courant prévu et ajouter une marge.
- **Croire qu'un MOSFET conduit pleinement à VGS(th).** Détection : chercher dans la fiche la VGS à laquelle la RDS(on) est garantie.
- **Oublier la diode interne du MOSFET.** Détection : au test de jonction, la conduction source-drain dans un sens est normale.
- **Conclure sur un transistor testé en circuit.** Détection : chercher ce qui est relié à ses broches ; dessouder si besoin.
- **Prendre la broche du milieu pour la base ou la grille.** Détection : lire le brochage dans la fiche de la référence.
- **Commander un high-side canal N avec une grille à la tension d'alimentation.** Détection : la grille doit dépasser la source d'au moins la VGS de la fiche.
- **Couper une charge inductive sans protection.** Détection : chercher une diode de roue libre ou un transistor protégé avec écrêteur.
- **Manipuler un MOSFET hors du poste ESD.** Détection : bracelet relié et tapis avant d'ouvrir le sachet.

## Lien atelier

Les sorties d'un calculateur qui commandent relais, électrovannes, injecteurs ou lampes sont des
étages à transistors, low-side ou high-side, souvent des transistors protégés. Un transistor de
sortie en court-circuit laisse la charge alimentée en permanence [HYPOTHÈSE] ; coupé, il ne la
commande plus [HYPOTHÈSE]. Une charge en court-circuit ou un faisceau défectueux peut détruire la
sortie ; avant de remplacer un transistor de sortie, on contrôle donc la charge et son câblage
[HYPOTHÈSE]. Le détail des sorties protégées et des injecteurs est étudié en S29. Aucune valeur ni
aucun schéma de calculateur réel n'est donné ici.

## Fil rouge FR-06 : SOT-23

Sixième séance du fil rouge microsoudure (1 h). Critère de réussite du catalogue des TP :
3 broches sans pont.

1. Préparer le poste : aspiration des fumées en marche, fer sur son support, poste ESD (bracelet relié), brucelles, flux.
2. Étamer une seule pastille, poser le SOT-23 avec les brucelles dans le bon sens d'après la sérigraphie, souder cette broche, contrôler l'alignement, puis souder les deux autres.
3. Inspecter au microscope : aucun pont, ménisque sur chaque broche, composant à plat et centré.
4. Tester chaque transistor soudé au test de jonction après refroidissement ; comparer à un composant neuf de même référence.
5. Réglage de la température de la panne : notice de la station et fiche de l'alliage [À VÉRIFIER : température recommandée dans la notice de la station et la fiche de l'alliage utilisés].

## Sécurité spécifique

- Alimentation limitée en courant, limite écrite avant la mise sous tension (FE-02) ; dans les deux TP, une limite par sortie.
- Polarité vérifiée et masses reliées avant la mise sous tension ; une inversion non protégée est une faute éliminatoire (FE-03).
- MOSFET et transistors CMS manipulés sur le poste ESD, bracelet relié (FE-01).
- Calcul de la puissance dans la charge et dans le transistor avant l'essai ; une résistance de puissance ou un transistor qui chauffe ne se touche pas sous tension et se laisse refroidir.
- FR-06 : aspiration à la source, fer sur son support, mains lavées après la séance (S01).
