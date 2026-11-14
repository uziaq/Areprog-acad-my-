---
id: S07
titre: "Identifier et tester les composants passifs CMS"
module: M2
duree_h: 8
competences: [D3.5, D4.1, D4.2, D4.6, D9.1]
prerequis: [S06]
lecons: [S07-L01, S07-L02, S07-L03]
tp: [TP-10]
sources: [SRC-0013, SRC-0015, SRC-0016, SRC-0017]
version: "0.1"
statut: brouillon
derniere_verification_sources: 2026-11-14
historique:
  - version: "0.1"
    date: 2026-11-14
    resume: Première rédaction (3 leçons, 8 exercices, banque de 25 questions, TP-10, séance FR-04)
---

Première semaine du module M2. On passe des composants de laboratoire aux composants d'une
vraie carte : des puces CMS minuscules, souvent sans marquage lisible. La semaine apprend à les
nommer, à décoder leur marquage avec une table **sourcée**, à trouver et lire leur fiche
technique, et à les tester en sachant ce qu'une mesure en circuit peut et ne peut pas prouver.
Le TP se fait pour la première fois sur un calculateur de récupération, non alimenté.

Organisation conseillée des 8 h : leçons (4 h), exercices (45 min), TP-10 (1 h 45),
FR-04 (1 h), QCM et journal (30 min).

## Mesures attendues et tolérances

**TP-10.** Pour chaque résistance mesurée, la valeur nominale vient du marquage décodé, et la
tolérance de la nomenclature ou de la fiche technique quand elles sont disponibles ; sinon, la
tolérance est « inconnue » et la conclusion ne peut pas être « conforme ». La lecture en circuit
se compare à la valeur nominale avec l'incertitude du multimètre (fiche du TP-06) ; une lecture
plus faible est non concluante tant que le schéma n'a pas été lu [HYPOTHÈSE].

## Erreurs fréquentes

- **Lire « 330 » comme trois cent trente ohms.** Détection : le dernier chiffre est le nombre de zéros ; « 330 » vaut 33 Ω [SOURCÉ : SRC-0015 §Marking Codes used on Chip Resistors].
- **Lire un code EIA-96 comme des chiffres significatifs.** Détection : deux chiffres suivis d'une lettre renvoient à la table du fabricant.
- **Confondre code en pouces et code métrique.** Détection : vérifier dans la fiche technique dans quel système est écrit le code.
- **Supposer une tolérance ou une valeur « typique ».** Détection : toute valeur non marquée et non documentée s'écrit « inconnue » au journal.
- **Prendre un code de SOT-23 pour un code de résistance.** Détection : le boîtier dit de quelle table relève le marquage.
- **Concevoir ou régler un banc à la valeur maximale absolue.** Détection : relire la note de la rubrique ; on travaille dans les conditions recommandées.
- **Conclure « défectueux » sur une lecture en circuit trop faible.** Détection : chercher les composants reliés aux deux bornes ; dessouder une patte si la décision compte.

## Lien atelier

Sur un calculateur, l'identification des composants est la première étape de tout diagnostic
au niveau de la carte : sans elle, pas de fiche technique, donc pas de valeur de référence. La
méthode est toujours la même : photo avant intervention, boîtier, marquage, sérigraphie, fiche
technique, puis mesure. Quand un marquage ne figure dans aucune table trouvée, on l'écrit tel
quel au journal avec la mention « non identifié » : jamais une correspondance devinée. Aucun
brochage ni aucune valeur de calculateur réel n'est donné ici.

## Fil rouge FR-04 : CMS 0805

Quatrième séance du fil rouge microsoudure (1 h). Critère de réussite du catalogue des TP :
10 joints sur 10 conformes.

1. Préparer le poste : aspiration des fumées en marche, fer sur son support, poste ESD, brucelles, flux.
2. Souder dix composants 0805 sur la carte d'entraînement, avec la méthode de FR-03 (une pastille étamée, premier côté, second côté).
3. Inspecter chaque joint au microscope et photographier ; comparer la taille des joints à ceux des 1206 de FR-03.
4. Dessouder deux composants à deux fers ou à la panne adaptée, nettoyer les pastilles, ressouder.
5. Réglage de la température de la panne : notice de la station et fiche de l'alliage [À VÉRIFIER : température recommandée dans la notice de la station et la fiche de l'alliage utilisés].

## Sécurité spécifique

- Calculateur de récupération **jamais alimenté** pendant cette semaine ; manipulation sur poste ESD, bracelet au poignet (FE-01).
- Avant de manipuler la carte : tension des condensateurs électrolytiques mesurée, puis mesurée de nouveau juste avant toute manipulation (S05-L01) ; condensateur non déchargé avant manipulation : faute éliminatoire FE-06.
- Ouverture du boîtier du calculateur : outils adaptés, sans forcer les connecteurs ni les nappes ; photos avant démontage (S01).
- FR-04 : aspiration à la source, fer sur son support, mains lavées après la séance (S01).
