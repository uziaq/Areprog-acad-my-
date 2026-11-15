---
id: S32
titre: "Calculateurs de carrosserie : BCM, BSI, FRM, CAS"
module: M8
duree_h: 8
competences: [D4.7, D10.3]
prerequis: [S31]
lecons: [S32-L01, S32-L02, S32-L03]
tp: [TP-47, TP-48]
sources: [SRC-0092, SRC-0093, SRC-0084, SRC-0046, SRC-0045, SRC-0065, SRC-0068, SRC-0008, SRC-0035, SRC-0029, SRC-0013, SRC-0078, SRC-0079]
version: "0.1"
statut: brouillon
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction (3 leçons, 8 exercices, banque de 25 questions, TP-47, TP-48)
---

Quatrième semaine du module M8. Les modules de carrosserie commandent l'éclairage, le confort et
l'accès au véhicule. Leurs particularités sont les **commutateurs high-side** avec diagnostic de
charge, la **consommation au repos** d'un calculateur toujours alimenté, et, pour le module d'accès,
une étude limitée au **niveau carte** : sa mémoire n'est ni lue ni écrite.

Organisation conseillée des 8 h : leçons (5 h), exercices (30 min), TP-47 (1 h 30), TP-48 (1 h) [HYPOTHÈSE : répartition à ajuster selon les modules achetés].

## Mesures attendues et tolérances

**TP-47.** Voie bloquée : sortie tirée vers la masse avec charge, proche de l'alimentation sans charge avec défaut signalé [SOURCÉ : SRC-0092 §7.3.6.2 Open-Load Detection].
Voie passante sans charge : recopie très faible [SOURCÉ : SRC-0092 §7.3.6.2 Open-Load Detection].
Courant de lampe à la pince et courant calculé par la recopie concordants dans leurs incertitudes ;
valeurs comparées à l'exemplaire de référence [HYPOTHÈSE : valeurs de référence mesurées, pas publiées].

**TP-48.** Courant de repos comparé à la référence et au budget des composants : SBC souvent sous 100 µA [SOURCÉ : SRC-0046 §Abstract],
station de base citée à 0,2 mA en veille [SOURCÉ : SRC-0093 §9.1 Power Supply]. Durée
d'endormissement et réveil comparés à la référence dans les mêmes conditions.

## Erreurs fréquentes

- **Couper l'ampèremètre en changeant de calibre.** Détection : interrupteur en parallèle sur l'ampèremètre, courant de repos relevé après endormissement.
- **Mesurer le repos avec l'outil de diagnostic branché.** Détection : outil débranché avant l'attente d'endormissement.
- **Accuser la carte pour une charge ouverte.** Détection : lampe et câblage du banc contrôlés, même défaut cherché sur la référence.
- **Oublier le courant d'appel des lampes froides.** Détection : limite de courant justifiée, courant relevé après stabilisation.
- **Remplacer une lampe par une LED sans tenir compte du seuil de charge ouverte.** Détection : défaut de charge ouverte voie passante lu à l'outil.
- **Lire la mémoire d'un module d'accès.** Détection : aucune opération de lecture ou d'écriture au journal du TP-48 ; hors du cursus.

## Lien atelier

Une batterie qui se décharge à l'arrêt est un motif fréquent de passage en atelier, et un module qui
ne s'endort pas en est une cause possible [HYPOTHÈSE : à confirmer sur les dossiers de l'atelier]. Le
courant de repos mesuré sur banc, comparé à la référence, dit si le module en cause consomme trop par
lui-même ou s'il est réveillé par le véhicule. Les défauts de charge ouverte viennent souvent du
faisceau, de la lampe ou du connecteur plutôt que de la carte [HYPOTHÈSE : à confirmer sur les dossiers
de l'atelier] : le banc permet de les départager.

## Sécurité spécifique

- Protocole commun calculateurs réels, appliqué dans l'ordre ; mise sous tension progressive, limite de courant écrite (FE-08, FE-02) ; polarité vérifiée (FE-03).
- Décharge des condensateurs mesurée avant tout contact après une mise sous tension, puis mesurée de nouveau [SOURCÉ : SRC-0013 §2-7 Restriking Voltage] (FE-09).
- Masse des sondes sur la masse de la carte [SOURCÉ : SRC-0029 §Use Proper Grounding Procedures] (FE-07) ; pince dans ses limites [SOURCÉ : SRC-0029 §Maximum Input Current Rating (current probes)].
- Module d'accès : niveau carte uniquement, provenance légitime documentée, aucune lecture ni écriture de mémoire, aucune fonction de clé ou d'antidémarrage à l'outil.
- Éclairage et verrouillage touchent la sécurité des personnes et des biens : aucune réparation n'est déclarée validée sans le protocole de S33.
- Calculateurs d'airbag, d'ABS / ESP et de direction exclus : traités en M9.
- Fautes éliminatoires de la semaine : FE-01 à FE-04, FE-07, FE-08, FE-09, FE-13 et FE-14.
