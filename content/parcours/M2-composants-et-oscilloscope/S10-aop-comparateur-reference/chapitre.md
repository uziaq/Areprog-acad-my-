---
id: S10
titre: "Amplificateur opérationnel, comparateur, référence de tension"
module: M2
duree_h: 8
competences: [D4.5, D9.1]
prerequis: [S09]
lecons: [S10-L01, S10-L02, S10-L03]
tp: [TP-15, TP-16]
sources: [SRC-0023, SRC-0024, SRC-0025, SRC-0026, SRC-0027]
version: "0.1"
statut: brouillon
derniere_verification_sources: 2026-11-14
historique:
  - version: "0.1"
    date: 2026-11-14
    resume: Première rédaction (3 leçons, 8 exercices, banque de 25 questions, TP-15 et TP-16, séance FR-07)
---

Quatrième semaine du module M2 : les circuits qui préparent les signaux des capteurs avant le
microcontrôleur. On découvre l'amplificateur opérationnel et ses montages de base, le comparateur
et son hystérésis, puis la référence de tension du convertisseur et la mesure ratiométrique,
utilisée par beaucoup de capteurs alimentés par le calculateur. Le TP-15 se termine par une première
observation sur véhicule d'atelier, contact mis, moteur arrêté.

Organisation conseillée des 8 h : leçons (4 h), exercices (30 min), TP-15 (1 h 30), TP-16 (45 min),
FR-07 (1 h), QCM et journal (15 min).

## Mesures attendues et tolérances

**TP-15.** Le gain mesuré se compare au gain recalculé avec les résistances mesurées hors circuit ;
la tension de décalage de l'AOP, multipliée par le gain, s'ajoute à la sortie [SOURCÉ : SRC-0024 §5.2].
La sortie maximale se compare à VOH de la fiche, qui dépend de la charge [SOURCÉ : SRC-0024 §5.6].
Sur le véhicule, on interprète le rapport entre signal et alimentation du capteur
[SOURCÉ : SRC-0027 §Sensors that Are Ratiometric to the Supply Voltage]
[À VÉRIFIER : courbe de sortie du capteur, dans la documentation du véhicule].

**TP-16.** Les seuils mesurés se comparent aux seuils recalculés avec les résistances et les tensions
de sortie mesurées ; une sortie qui n'atteint pas ses alimentations décale les seuils
[SOURCÉ : SRC-0024 §5.6].

## Erreurs fréquentes

- **Inverser R1 et R2 dans la formule du gain.** Détection : repérer la résistance qui relie la sortie à l'entrée − ; c'est R2.
- **Oublier le signe moins de l'inverseur.** Détection : vérifier que la sortie a la polarité opposée à l'entrée.
- **Attendre une sortie au-delà de l'alimentation.** Détection : comparer la sortie calculée à VOH et VOL de la fiche.
- **Laisser une entrée d'AOP dépasser son alimentation.** Détection : régler la tension d'entrée avant de la brancher, et vérifier l'ordre de mise sous tension.
- **Conclure sur un signal de capteur mesuré seul.** Détection : mesurer aussi l'alimentation et la masse du capteur, et calculer le rapport.
- **Choisir une hystérésis plus étroite que le bruit.** Détection : mesurer le bruit à l'oscilloscope et le comparer à VH − VL.
- **Poser des pointes sur un véhicule batterie branchée.** Détection : la fiche d'intervention impose de débrancher la batterie avant chaque connexion.

## Lien atelier

Sur un calculateur, les entrées analogiques passent souvent par un filtre, une protection et parfois
un AOP avant le convertisseur du microcontrôleur [HYPOTHÈSE]. Une alimentation capteur en défaut
fait chuter plusieurs capteurs à la fois [HYPOTHÈSE] ; une référence de convertisseur dérivée fausse
toutes les mesures qui en dépendent [HYPOTHÈSE]. On mesure donc toujours l'alimentation et la masse
d'un capteur avec son signal. Aucune valeur ni aucun schéma de calculateur réel n'est donné ici.

## Fil rouge FR-07 : repose de SOIC-8

Septième séance du fil rouge microsoudure (1 h). Critère de réussite du catalogue des TP : repose
sans pont, continuité vérifiée.

1. Préparer le poste : aspiration des fumées en marche, fer sur son support, poste ESD (bracelet relié), brucelles, flux, tresse.
2. Repérer la broche 1 sur la sérigraphie et sur le boîtier ; photographier l'orientation avant la pose.
3. Étamer une pastille d'angle, poser le SOIC-8, souder cette broche, contrôler l'alignement des huit broches, puis souder la broche opposée en diagonale.
4. Souder les autres broches ; retirer un éventuel pont à la tresse et au flux.
5. Inspecter au microscope ; vérifier au multimètre la continuité de chaque broche vers sa piste et l'absence de court-circuit entre broches voisines.
6. Réglage de la température de la panne : notice de la station et fiche de l'alliage [À VÉRIFIER : température recommandée dans la notice de la station et la fiche de l'alliage utilisés].

## Sécurité spécifique

- Alimentation limitée en courant, limite écrite avant la mise sous tension (FE-02) ; pour une alimentation symétrique, une limite par sortie.
- Polarités vérifiées avant la mise sous tension ; une inversion non protégée est une faute éliminatoire (FE-03).
- AOP, comparateurs et SOIC manipulés sur le poste ESD, bracelet relié (FE-01).
- Véhicule d'atelier : règles « Sécurité véhicule » du catalogue des TP ; véhicules électrifiés exclus ; immobilisation ; connexions batterie débranchée ; aucune intervention sur les circuits d'airbag, d'ABS / ESP ou de direction dans ce TP.
- FR-07 : aspiration à la source, fer sur son support, mains lavées après la séance (S01).
