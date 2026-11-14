---
id: S15
titre: "Régulateurs linéaires et LDO"
module: M4
duree_h: 8
competences: [D6.1, D9.1]
prerequis: [S14]
lecons: [S15-L01, S15-L02, S15-L03]
tp: [TP-21]
sources: [SRC-0036, SRC-0037, SRC-0038]
version: "0.1"
statut: brouillon
derniere_verification_sources: 2026-11-14
historique:
  - version: "0.1"
    date: 2026-11-14
    resume: Première rédaction (3 leçons, 8 exercices, banque de 25 questions, TP-21, séance FR-11)
---

Première semaine du module M4, consacré aux alimentations et au réseau de bord. Tout calculateur
commence par une alimentation : si elle manque, rien d'autre ne fonctionne. On étudie le régulateur
linéaire et le LDO : principe, dissipation et température, tension de déchet au démarrage du
moteur, courant de repos, stabilité du condensateur de sortie, puis protections et signaux enable,
reset et power-good. On termine par une méthode de diagnostic d'un régulateur.

Organisation conseillée des 8 h : leçons (4 h), exercices (30 min), TP-21 (1 h 45), FR-11 (1 h),
QCM et journal (45 min).

## Mesures attendues et tolérances

**TP-21.** La dissipation se calcule avec les valeurs mesurées : PD = (VI − VO) × IO
[SOURCÉ : SRC-0036 §Power Dissipation and Junction Temperature]. La température de la languette
est plus basse que celle de la jonction, et la résistance thermique de la fiche correspond à des
conditions précises [SOURCÉ : SRC-0037 §4 Thermal Equations—Will My Part Work?] : on compare un ordre
de grandeur et une tendance. La tension de déchet croît avec le courant et se compare à la fiche au
même courant [SOURCÉ : SRC-0036 §Dropout Voltage].

## Erreurs fréquentes

- **Oublier que l'écart entrée-sortie part en chaleur.** Détection : calculer PD = (VI − VO) × IO avant de choisir l'alimentation.
- **Lire θJA sans ses conditions.** Détection : relire dans la fiche la surface de cuivre et la ventilation associées.
- **Négliger la tension de déchet au démarrage.** Détection : vérifier la sortie avec l'entrée minimale, diode de protection comprise.
- **Remplacer un condensateur de sortie par un modèle quelconque.** Détection : comparer sa résistance série à la plage de stabilité de la fiche.
- **Conclure à une panne sans regarder l'enable.** Détection : mesurer l'enable avant de condamner un régulateur sans sortie.
- **Mesurer la sortie seulement.** Détection : mesurer aussi le reset et le power-good ; un microcontrôleur bien alimenté peut rester en reset.
- **Accuser le régulateur d'une sortie basse et brûlante.** Détection : isoler la charge, mesurer la résistance de la sortie vers la masse.

## Lien atelier

Sur un calculateur, une absence de communication ou un démarrage impossible peut venir d'un
régulateur sans sortie, d'un enable inactif ou d'un reset maintenu [HYPOTHÈSE]. Une sortie qui
s'effondre en chauffant oriente vers une charge en court-circuit, souvent un condensateur de
découplage [HYPOTHÈSE : à confirmer par isolement]. La mise sous tension d'un calculateur réel suit
une procédure progressive, étudiée en S17. Aucune valeur ni aucun schéma de calculateur réel n'est
donné ici.

## Fil rouge FR-11 : dépose de DPAK au fer avec préchauffage

Onzième séance du fil rouge microsoudure (1 h). Critère de réussite du catalogue des TP : pastille
intacte.

1. Préparer le poste : aspiration des fumées en marche, fer sur son support, poste ESD (bracelet relié), flux, tresse, brucelles.
2. Préchauffer la carte par en dessous [À VÉRIFIER : préchauffeur disponible à l'atelier, sa notice et la température de préchauffage adaptée à la carte].
3. Ajouter de l'alliage sur la grande languette pour mieux transmettre la chaleur ; chauffer la languette et les broches.
4. Ne soulever le composant que lorsque toute la soudure de la languette est fondue ; il doit glisser sans effort.
5. Nettoyer la pastille à la tresse et au flux, sans frotter ; inspecter au microscope : pastille intacte, piste non soulevée ; photographier.
6. Réglage de la température de la panne : notice de la station et fiche de l'alliage [À VÉRIFIER : température recommandée dans la notice de la station et la fiche de l'alliage utilisés].

## Sécurité spécifique

- Alimentation limitée en courant, limite écrite avant la mise sous tension (FE-02) ; polarités vérifiées, condensateurs électrolytiques compris (FE-03).
- Régulateur et résistances de charge chauds : température lue à l'instrument, jamais au doigt.
- Cartes et composants manipulés sur le poste ESD, bracelet relié (FE-01).
- FR-11 : carte préchauffée et composant déposé brûlants ; posés sur un support prévu, manipulés aux brucelles ; aspiration à la source, mains lavées après la séance (S01).
