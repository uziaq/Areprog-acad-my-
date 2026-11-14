---
id: S13
titre: "Circuit imprimé et relevé de schéma"
module: M3
duree_h: 8
competences: [D5.3, D5.4, D9.1]
prerequis: [S12]
lecons: [S13-L01, S13-L02, S13-L03]
tp: [TP-20]
sources: [SRC-0033, SRC-0034, SRC-0035, SRC-0008, SRC-0031, SRC-0013, SRC-0015]
version: "0.1"
statut: brouillon
derniere_verification_sources: 2026-11-14
historique:
  - version: "0.1"
    date: 2026-11-14
    resume: Première rédaction (3 leçons, 8 exercices, banque de 25 questions, TP-20, séance FR-10)
---

Deuxième semaine du module M3 et dernière avant le jalon 1. Après le schéma, on passe à la carte :
on nomme les couches d'un circuit imprimé et ses éléments, on reconnaît les types de vias, on
calcule la résistance d'une piste. On suit une piste d'une face à l'autre en superposant les photos
et en confirmant au multimètre, puis on relève le schéma d'un bloc simple d'une carte sans
documentation, en marquant chaque élément non confirmé. C'est la méthode de base face à un
calculateur dont le schéma n'est pas publié.

Organisation conseillée des 8 h : leçons (4 h), exercices (30 min), TP-20 (1 h 45), FR-10 (1 h),
QCM, révision du jalon 1 et journal (45 min).

## Mesures attendues et tolérances

**TP-20.** Une liaison par piste fait une fraction d'ohm : la résistance d'une piste se calcule avec
la résistivité du cuivre [SOURCÉ : SRC-0035 §Specific resistance], et se confond au multimètre avec
un court-circuit. Une lecture de plusieurs ohms signale un composant ou une association en parallèle
[SOURCÉ : SRC-0008 §Resistance, continuity and diodes]. Le seuil du buzzer dépend du modèle
[SOURCÉ : SRC-0008 §Continuity] : chaque liaison douteuse se confirme en ohmmètre. Le contenu du
relevé n'a pas de tolérance : chaque élément est confirmé ou marqué `[À VÉRIFIER]`.

## Erreurs fréquentes

- **Superposer recto et verso sans retourner l'image.** Détection : les trous de fixation et les vias traversants ne coïncident pas.
- **Croire qu'un via mène toujours à l'autre face.** Détection : regarder l'autre face au même endroit ; rien n'apparaît pour un via borgne.
- **Prendre un buzzer qui sonne pour une piste.** Détection : passer en ohmmètre ; une piste fait une fraction d'ohm.
- **Oublier la résistance des cordons.** Détection : mettre les pointes en contact et lire la valeur avant les faibles mesures.
- **Mesurer sur une carte non déchargée.** Détection : mesurer les condensateurs électrolytiques avant toute manipulation (FE-06).
- **Gratter le vernis épargne pour poser une pointe.** Détection : on se pose sur les pastilles, les broches ou les points de test.
- **Dessiner une liaison supposée comme un fait.** Détection : chaque liaison du schéma a une ligne de journal, sinon `[À VÉRIFIER]`.
- **Arracher une pastille au dessoudage.** Détection : ne soulever le composant que lorsque toutes ses broches sont fondues ; inspecter les pastilles au microscope.

## Lien atelier

Pour la plupart des calculateurs, aucun schéma n'est publié. Pour comprendre une entrée ou une
sortie en défaut, le réparateur relève le bloc concerné, à partir du connecteur et des fiches des
composants [HYPOTHÈSE]. Un relevé honnête, avec ses marques `[À VÉRIFIER]`, évite de conclure sur une
liaison supposée. Les pistes coupées, les vias corrodés et les pastilles arrachées sont des défauts
qu'on apprend à voir ici et à réparer en M7. Aucune valeur ni aucun schéma de calculateur réel n'est
donné ici.

## Fil rouge FR-10 : dépose de SOIC-8 au fer

Dixième séance du fil rouge microsoudure (1 h). Critère de réussite du catalogue des TP : pastilles
intactes sur trois déposes.

1. Préparer le poste : aspiration des fumées en marche, fers sur leur support, poste ESD (bracelet relié), flux, tresse, brucelles.
2. Choisir la méthode selon le matériel de l'atelier : deux fers, pince chauffante, ou alliage à bas point de fusion [À VÉRIFIER : matériel disponible à l'atelier et notice de chaque outil].
3. Appliquer du flux sur toutes les broches ; chauffer les deux rangées ensemble.
4. Ne soulever le boîtier que lorsque toutes les broches sont fondues ; il doit glisser sans effort. Si l'on force, la pastille s'arrache.
5. Nettoyer les pastilles à la tresse et au flux ; avec un alliage à bas point de fusion, retirer tous ses résidus avant de ressouder [À VÉRIFIER : consignes de nettoyage dans la fiche de l'alliage utilisé].
6. Inspecter au microscope : pastilles intactes, pistes non soulevées ; photographier. Recommencer trois fois.
7. Réglage de la température de la panne : notice de la station et fiche de l'alliage [À VÉRIFIER : température recommandée dans la notice de la station et la fiche de l'alliage utilisés].

## Sécurité spécifique

- Carte de récupération jamais alimentée pendant le TP-20.
- Mesure et décharge des condensateurs électrolytiques avant manipulation, dans la plage recommandée par le fabricant cité [SOURCÉ : SRC-0013 §2-7 Restriking Voltage] (FE-06).
- Cartes et boîtiers SOIC manipulés sur le poste ESD, bracelet relié (FE-01).
- Étiquette portant un identifiant de véhicule masquée sur les photos.
- FR-10 : aspiration à la source, fers sur leur support, mains lavées après la séance (S01).
