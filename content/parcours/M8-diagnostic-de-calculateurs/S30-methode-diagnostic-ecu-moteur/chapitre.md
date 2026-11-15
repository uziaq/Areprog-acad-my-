---
id: S30
titre: "Méthode de diagnostic et ECU moteur"
module: M8
duree_h: 8
competences: [D1.6, D4.7, D5.4, D10.1, D10.3]
prerequis: [S29]
lecons: [S30-L01, S30-L02, S30-L03]
tp: [TP-44, TP-45]
sources: [SRC-0088, SRC-0008, SRC-0011, SRC-0013, SRC-0029, SRC-0027, SRC-0045, SRC-0067, SRC-0079, SRC-0081, SRC-0082, SRC-0086, SRC-0087]
version: "0.1"
statut: brouillon
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction (3 leçons, 8 exercices, banque de 25 questions, TP-44, TP-45)
---

Deuxième semaine du module M8. Tout ce qui a été appris depuis S01 se réunit dans une méthode en dix
étapes, appliquée à un ECU moteur de récupération. Deux outils la rendent possible sans schéma
constructeur : l'**exemplaire de référence**, qui donne les valeurs attendues, et le **diagnostic
comparatif** broche par broche. L'outil de diagnostic sur banc complète les mesures, en lecture seule.

Organisation conseillée des 8 h : leçons (5 h), exercices (30 min), TP-44 (1 h), TP-45 (1 h 30, à poursuivre en S33 pour la validation) [HYPOTHÈSE : répartition à ajuster selon l'état des calculateurs].

## Mesures attendues et tolérances

**TP-44.** Les valeurs attendues sont celles de l'exemplaire de référence, mesuré hors tension au
même calibre et avec la même masse [HYPOTHÈSE : valeurs de référence mesurées, pas publiées]. Une
jonction au silicium en sens direct affiche quelques dixièmes de volt au test de jonction [SOURCÉ : SRC-0011 §Meter check of a diode],
et un circuit ouvert en sens inverse [SOURCÉ : SRC-0008 §Diode test]. Un écart est significatif s'il
dépasse la précision du multimètre sur les deux mesures plus la dispersion entre deux cartes, qui se
constate en refaisant la mesure [HYPOTHÈSE : dispersion non connue].

**TP-45.** Décharge des étages à tension élevée négligeable, mesurée deux fois [SOURCÉ : SRC-0013 §2-7 Restriking Voltage].
Courants, rails, horloge, reset et défauts lus comparés à la référence sur le même banc
[HYPOTHÈSE : valeurs de référence mesurées]. La valeur réelle d'un capteur ratiométrique simulé suit
le rapport signal sur alimentation [SOURCÉ : SRC-0027 §Sensors that Are Ratiometric to the Supply Voltage].
Empreintes des deux sauvegardes identiques avant toute intervention à proximité d'une mémoire.

## Erreurs fréquentes

- **Mesurer les sorties avant les alimentations.** Détection : ordre des étapes du dossier ; une mesure faite sur une alimentation non conforme ne prouve rien.
- **Comparer deux cartes de références matérielles différentes.** Détection : étiquettes lues et photographiées, cartes comparées composant par composant.
- **Prendre un écart pour une panne.** Détection : l'écart désigne une zone ; la preuve vient du composant isolé ou de la constatation visuelle.
- **Changer de calibre ou de masse entre les deux cartes.** Détection : méthode de relevé écrite en tête du tableau.
- **Effacer les défauts avant de les noter.** Détection : liste recopiée au dossier avant toute action à l'outil.
- **Interpréter un défaut attendu sur banc comme une panne.** Détection : même liste lue sur la référence, sur le même banc.
- **Remplacer un composant « pour voir ».** Détection : mesure qui justifie le remplacement, notée avant (FE-13) ; cas VID-12, remarque E-27.
- **Déclarer réparé sans validation ni recherche de la cause.** Détection : conclusion qui sépare prouvé et non prouvé ; cas VID-12, remarque E-28.

## Lien atelier

C'est la semaine où le stagiaire travaille comme à l'atelier : un calculateur arrive, souvent sans
schéma, avec un symptôme décrit en quelques mots. La méthode en dix étapes et l'exemplaire de référence
remplacent la documentation qui manque ; le diagnostic comparatif hors tension désigne une zone sans
risquer la carte. Le dossier de réparation est la preuve du travail rendu au client, avec ses limites
[HYPOTHÈSE : pratique de l'atelier, à confirmer par Arthur]. Le cas VID-12 du catalogue (EDC17C60,
réparation par essais) est repris en exercice A-14 avec la méthode complète.

## Sécurité spécifique

- Protocole commun calculateurs réels, appliqué dans l'ordre ; mise sous tension progressive, limite de courant écrite (FE-08, FE-02) ; polarité vérifiée (FE-03).
- Étages à tension élevée, en particulier le convertisseur élévateur de la commande d'injecteurs : décharge mesurée avant tout contact, puis mesurée de nouveau [SOURCÉ : SRC-0013 §2-7 Restriking Voltage] (FE-09).
- Nœuds à tension élevée ou flottants à la sonde différentielle [SOURCÉ : SRC-0029 §Floating Measurements] ; jamais de sonde à masse reliée à la terre sur un nœud qui n'est pas à la masse [SOURCÉ : SRC-0029 §Use Proper Grounding Procedures] (FE-07).
- Outil de diagnostic en lecture seule ; aucun essai d'actionneur sans charge simulée et sans accord du formateur.
- Calculateurs d'airbag, d'ABS / ESP et de direction exclus de la semaine : ils sont traités en M9 avec leur protocole renforcé.
- Fautes éliminatoires de la semaine : FE-01 à FE-04, FE-07, FE-08, FE-09, FE-13 (composant remplacé sans mesure qui le justifie) et FE-14 (donnée inventée présentée comme un fait).
