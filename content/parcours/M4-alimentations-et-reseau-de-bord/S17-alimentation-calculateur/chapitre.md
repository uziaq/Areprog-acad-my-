---
id: S17
titre: "Alimentation d'un calculateur automobile"
module: M4
duree_h: 8
competences: [D6.3, D9.1, D9.3, D10.6]
prerequis: [S16]
lecons: [S17-L01, S17-L02, S17-L03]
tp: [TP-23]
sources: [SRC-0042, SRC-0043, SRC-0044, SRC-0045, SRC-0046, SRC-0047, SRC-0048, SRC-0013, SRC-0008, SRC-0035]
version: "0.1"
statut: brouillon
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction (3 leçons, 8 exercices, banque de 25 questions, TP-23, séance FR-13)
---

Troisième semaine du module M4. Après le régulateur linéaire et le convertisseur à découpage, on
regarde un calculateur entier du point de vue de son alimentation : les bornes 30, 15 et 31, un
réseau de bord qui bouge (démarrage, délestage de charge, inversion, transitoires), la chaîne
d'entrée qui protège la carte, puis le SBC, le réveil et le maintien. On apprend aussi à classer un
calculateur lié à la sécurité et à préparer le retrait local d'un vernis de tropicalisation.

Organisation conseillée des 8 h : leçons (4 h 30), exercices (30 min), TP-23 (1 h 30), FR-13
(1 h), QCM et journal (30 min).

## Mesures attendues et tolérances

**TP-23.** La carte n'est pas alimentée : les seules mesures sont la tension des condensateurs
avant manipulation et les continuités. Une liaison par piste se lit comme une fraction d'ohm
[SOURCÉ : SRC-0035 §Specific resistance] ; une lecture de plusieurs ohms signale un composant
[SOURCÉ : SRC-0008 §Resistance, continuity and diodes]. Le relevé n'a pas de tolérance sur son
contenu : chaque élément est confirmé par la mesure ou par la fiche du composant, ou marqué
`[À VÉRIFIER]`. Les valeurs des essais du réseau de bord ne se mesurent pas ici : elles se lisent
dans la norme [À VÉRIFIER : valeurs d'ISO 16750-2 et d'ISO 7637-2, édition en vigueur].

## Erreurs fréquentes

- **Donner des tensions d'essai de mémoire.** Détection : chaque valeur citée renvoie à la norme ou au cahier des charges ; sinon `[À VÉRIFIER]`.
- **Confondre borne 30 et borne 15.** Détection : mesurer contact coupé ; la 30 reste alimentée, pas la 15.
- **Prendre deux condensateurs en série pour une erreur.** Détection : relire le rôle des condensateurs d'entrée doublés (S17-L02).
- **Attribuer une fonction à un composant d'après son aspect.** Détection : chaque identification s'appuie sur un marquage et une fiche.
- **Conclure à une panne pour un calculateur qui se réinitialise au démarrage.** Détection : comparer à un exemplaire de référence ; la classe exigée peut l'autoriser.
- **Utiliser un calculateur d'airbag, d'ABS / ESP ou de direction pour un TP de M4.** Détection : classer le calculateur avant toute intervention.
- **Croire qu'une goutte d'alcool isopropylique suffit à juger un vernis.** Détection : compléter par la dureté et l'aspect ; l'alcool est souvent trop faible.

## Lien atelier

Le diagnostic d'un calculateur commence par son alimentation : présence des bornes 30 et 15,
qualité des masses, protections d'entrée, convertisseur et régulateurs [HYPOTHÈSE : méthode
générale, appliquée en S18]. Une diode TVS ou une protection contre l'inversion en court-circuit
peut faire disjoncter l'alimentation dès la mise sous tension [HYPOTHÈSE : à confirmer par la
méthode de S18]. Aucune valeur ni aucun schéma de calculateur réel n'est donné ici.

## Fil rouge FR-13 : composants sous vernis, approche

Treizième séance du fil rouge microsoudure (1 h), sur une carte d'exercice vernie. Critère de
réussite du catalogue des TP : retrait local propre.

1. Lire la fiche de données de sécurité du dissolvant avant usage (catalogue des TP, sécurité chimique) ; ventilation en marche, gants nitrile, lunettes de protection [SOURCÉ : SRC-0047 §Step-by-Step: Removal by Chemical Solvent].
2. Identifier la famille du vernis dans une zone non critique : dureté, transparence, solubilité, aspect [SOURCÉ : SRC-0047 §4 Ways to Test Your Coating:] ; noter le résultat au journal.
3. Délimiter la zone autour d'un composant au ruban polyimide [SOURCÉ : SRC-0047 §Procedure A: Coating Removal for Isolated Areas].
4. Retirer le vernis au stylo ou à l'écouvillon en polyester imbibé, sans brosse en nylon [SOURCÉ : SRC-0047 §Procedure A: Coating Removal for Isolated Areas] ; pour un vernis dur, retrait mécanique local après avis du formateur.
5. Contrôler sous lampe UV que la zone est propre et que le vernis autour n'est pas décollé [SOURCÉ : SRC-0047 §Step-by-Step: Removal by Chemical Solvent] ; photographier.
6. Dessouder et ressouder un composant de la zone, puis inspecter au microscope.
7. Remise en place d'un vernis : produit et méthode à définir [À VÉRIFIER : vernis de retouche disponible à l'atelier et sa fiche technique].

## Sécurité spécifique

- TP-23 : carte jamais alimentée ; condensateurs mesurés deux fois avant manipulation, décharge à travers une résistance si besoin [SOURCÉ : SRC-0013 §2-7 Restriking Voltage] (FE-09) ; poste ESD, bracelet relié (FE-01).
- Calculateurs d'airbag, d'ABS / ESP et de direction mis de côté jusqu'au module M9 ; aucun élément pyrotechnique dans l'atelier (catalogue des TP, protocole renforcé).
- FR-13 : dissolvants de vernis manipulés selon leur fiche de données de sécurité, avec ventilation, gants nitrile et lunettes [SOURCÉ : SRC-0047 §Step-by-Step: Removal by Chemical Solvent] ; fumées de soudure aspirées à la source, mains lavées après la séance (S01).
