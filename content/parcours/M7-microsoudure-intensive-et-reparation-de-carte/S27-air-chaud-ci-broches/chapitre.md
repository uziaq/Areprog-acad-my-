---
id: S27
titre: "Air chaud et circuits intégrés à broches"
module: M7
duree_h: 8
competences: [D7.4, D9.2, D9.3, D9.5]
prerequis: [S26]
lecons: [S27-L01, S27-L02, S27-L03]
tp: [TP-38, TP-39]
sources: [SRC-0075, SRC-0076, SRC-0071, SRC-0072, SRC-0074, SRC-0047, SRC-0062]
version: "0.1"
statut: brouillon
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction (3 leçons, 8 exercices, banque de 25 questions, TP-38, TP-39)
---

Après les passifs au fer (S26), on passe à l'air chaud et aux circuits intégrés à broches : SOIC,
TSSOP, QFP, puis QFN. On apprend à chauffer sans abîmer les voisins, à tenir compte de l'humidité
absorbée par les boîtiers plastiques (niveaux MSL, étuvage), puis à déposer, nettoyer et reposer un
circuit en contrôlant chaque broche. Pour la première fois, une dépose se fait sur un calculateur de
récupération : sauvegarde de la mémoire et retrait local du vernis d'abord. Le BGA est présenté, pas
pratiqué.

Organisation conseillée des 8 h : leçons (3 h 30), exercices (30 min), TP-38 (2 h), TP-39 (2 h)
[HYPOTHÈSE : répartition à ajuster selon le matériel disponible].

## Mesures attendues et tolérances

**TP-38.** Chaque broche du QFP reposé a un ménisque de talon, reste visible sous la soudure, et ses
débords latéral et de pointe restent sous 25 % de la largeur de broche [SOURCÉ : SRC-0071 §12.9 Inspection Criteria, Specific].
Aucun pont n'est admis [SOURCÉ : SRC-0071 §12.8 Inspection Criteria, General]. À l'ohmmètre, carte non
alimentée : continuité de chaque broche vers sa piste et aucun court-circuit entre broches voisines
[EXEMPLE : contrôle de l'académie]. Le QFN est aligné sur ses pastilles avec une précision de 0,1 mm
[SOURCÉ : SRC-0076 §6.3 Component Replacement and Reflow].

**TP-39.** Deux lectures de l'EEPROM aux empreintes identiques avant la dépose [SOURCÉ : SRC-0062 §1 INTRODUCTION] ;
composants voisins et pastilles intacts après la dépose (critère du catalogue des TP). Aucune tolérance
n'est admise sur ces critères.

## Erreurs fréquentes

- **Soulever le composant avant que toutes les soudures soient fondues.** Détection : pastille arrachée avec la broche ; on attend que le composant bouge librement [SOURCÉ : SRC-0076 §6.1 Compound Removal].
- **Monter la buse au maximum sur une carte épaisse au lieu de préchauffer.** Détection : voisins décolorés, carte gauchie ; préchauffage noté sur la fiche de réglage.
- **Oublier de couvrir un voisin sensible.** Détection : connecteur déformé, électrolytique bombé (FE-11).
- **Ignorer le niveau MSL.** Détection : fiche de réglage sans décision d'étuvage ; boîtier fissuré après la repose.
- **Frotter la tresse sur les pastilles.** Détection : pastille fine soulevée ou rayée au microscope [SOURCÉ : SRC-0076 §6.2 Site Redress].
- **Reposer sans vérifier le sens.** Détection : repère de la première broche comparé à la photo d'avant la dépose.
- **Déposer une mémoire sans l'avoir lue.** Détection : deux empreintes identiques archivées avant toute chauffe.
- **Réutiliser un QFN déposé.** Détection : QFN neuf prévu au matériel [SOURCÉ : SRC-0076 §6.1 Compound Removal].
- **Se fier au seul aspect.** Détection : relevé à l'ohmmètre de chaque broche après repose.

## Lien atelier

Sur un calculateur, la réparation de niveau carte demande souvent de déposer un circuit intégré : une
mémoire à lire hors circuit, un régulateur ou un circuit de sortie à remplacer [HYPOTHÈSE : à confirmer
sur les dossiers de l'atelier]. La carte est vernie, multicouche, et son historique d'humidité est
inconnu. Une dépose bien faite laisse les pastilles et les voisins intacts et la mémoire sauvegardée :
c'est la condition pour que la réparation reste possible.

La vidéo VID-12 du catalogue des ressources montre la dépose d'un boîtier de puissance collé sous le
corps (apport A-12) : on la regarde pour le geste, en relevant ce qui manque (protection des voisins,
contrôle des courts-circuits après repose).

## Sécurité spécifique

- Aspiration des fumées en marche pendant toute la reprise ; ventilation exigée par la fiche de l'alliage [SOURCÉ : SRC-0074 §SAFETY].
- Station à air chaud reliée à la terre, utilisée selon une procédure écrite, chaleur jamais dirigée vers les voisins [SOURCÉ : SRC-0071 §6.7 Heat Sources].
- Carte et buse chaudes après l'arrêt : refroidissement à l'air ambiant [SOURCÉ : SRC-0072 §10.1 General].
- Solvants et produits de retrait de vernis : ventilation, protections individuelles, fiche de données de sécurité [SOURCÉ : SRC-0072 §6.13 Solvents and Cleaners].
- Calculateur de récupération : protocole commun calculateurs réels, décharge mesurée avant de toucher la carte [SOURCÉ : SRC-0013 §2-7 Restriking Voltage].
- Fautes éliminatoires de la semaine : FE-01 (ESD), FE-09 (décharge non mesurée, TP-39), FE-11 (air chaud sans protection des composants voisins sensibles), FE-12 (travail sans aspiration des fumées).
- Calculateurs d'airbag, d'ABS / ESP et de direction exclus : module M9, protocole renforcé.
