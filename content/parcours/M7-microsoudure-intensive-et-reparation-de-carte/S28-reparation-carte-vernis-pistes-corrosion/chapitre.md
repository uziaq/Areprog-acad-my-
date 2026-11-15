---
id: S28
titre: "Réparation de carte : vernis, pistes, vias, corrosion"
module: M7
duree_h: 8
competences: [D4.7, D9.2, D9.3, D9.4, D9.5]
prerequis: [S27]
lecons: [S28-L01, S28-L02, S28-L03]
tp: [TP-40, TP-41]
sources: [SRC-0077, SRC-0078, SRC-0079, SRC-0080, SRC-0047, SRC-0071, SRC-0072, SRC-0074]
version: "0.1"
statut: brouillon
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction (3 leçons, 8 exercices, banque de 25 questions, TP-40, TP-41)
---

Dernière semaine du module M7. Après les déposes de S27, on répare ce qu'une carte de calculateur
abîmée demande le plus souvent : un vernis à retirer puis à restaurer, une piste coupée, une pastille
soulevée ou arrachée, un trou métallisé, une broche de connecteur, une zone corrodée. On apprend enfin
à choisir un composant de remplacement équivalent et à le justifier par écrit, qualification automobile
AEC comprise. Les procédures viennent d'un guide public de réparation qui déclare suivre l'IPC-7721,
payante et non consultée : le cours ne prétend à aucune certification.

Organisation conseillée des 8 h : leçons (4 h), exercices (30 min), TP-40 (2 h), TP-41 (1 h 30)
[HYPOTHÈSE : répartition à ajuster ; la polymérisation de l'époxy peut imposer deux séances].

## Mesures attendues et tolérances

**TP-40.** Chaque piste réparée est recouverte sur au moins deux fois sa largeur
[SOURCÉ : SRC-0077 §4.2.4 Conductor Repair, Surface Wire Method], sans réduction de largeur, d'écart ni de
capacité en courant [SOURCÉ : SRC-0077 §4.2.4 Conductor Repair, Surface Wire Method]. À l'ohmmètre, carte
non alimentée : continuité de chaque réparation et aucun court-circuit avec les conducteurs voisins
[EXEMPLE : contrôle de l'académie]. Une pastille remplacée est contrôlée en alignement, en écart et en
continuité [SOURCÉ : SRC-0077 §4.7.1 Surface Mount Pad Repair, Epoxy Method].

**TP-41.** L'isolement entre conducteurs voisins est mesuré aux mêmes points avant et après traitement ;
aucune valeur d'isolement n'est fixée par une source consultée, la comparaison avec l'état initial et la
carte de référence fait foi [À VÉRIFIER : exigence du constructeur]. Un composant remplacé a une plage
de température au moins égale à celle d'origine [SOURCÉ : SRC-0078 §1.3.4 Definition of Part Operating Temperature Grade].

## Erreurs fréquentes

- **Retirer le vernis sans l'avoir identifié.** Détection : essai dans une zone non critique noté avant le retrait.
- **Immerger la carte dans un solvant.** Détection : retrait local seulement, zone délimitée au ruban [SOURCÉ : SRC-0077 §2.3.2 Coating Removal, Solvent Method].
- **Vernir une surface mal nettoyée.** Détection : vernis qui s'écaille ; nettoyage complet noté avant la restauration.
- **Souder un fil bout à bout sur la piste.** Détection : recouvrement mesuré, au moins deux fois la largeur.
- **Choisir un fil trop fin.** Détection : section du fil comparée à celle de la piste, écart avec les voisines vérifié.
- **Poser un œillet dans un trou relié à une couche interne.** Détection : relevé ou carte de référence consulté avant de percer.
- **Étuver avant de nettoyer.** Détection : nettoyage noté avant l'étuvage, pour ne pas cuire les résidus [SOURCÉ : SRC-0077 §2.5 Baking and Preheating].
- **Rincer à l'eau du robinet.** Détection : rinçage final à l'alcool [SOURCÉ : SRC-0077 §2.2.1 Cleaning, Local].
- **Prendre « qualifié AEC » pour une équivalence.** Détection : fiche d'équivalence paramètre par paramètre, grade comparé.

## Lien atelier

Un calculateur qui arrive à l'atelier après une entrée d'eau présente souvent une zone corrodée, des
pistes rongées et des composants à remplacer ; une réparation précédente ratée laisse des pastilles
arrachées [HYPOTHÈSE : à confirmer sur les dossiers de l'atelier]. La réparation de niveau carte n'est
durable que si la zone est propre, les réparations mesurées et le vernis restauré. Le composant de
remplacement, choisi avec une fiche d'équivalence écrite, rend la réparation traçable dans le dossier.

## Sécurité spécifique

- Solvants, produits de retrait et époxy : ventilation, gants, fiche de données de sécurité, aucune immersion [SOURCÉ : SRC-0077 §2.3.2 Coating Removal, Solvent Method].
- Grattage et meulage : poste ESD et bracelet relié, l'abrasion crée des charges [SOURCÉ : SRC-0077 §2.3.5 Coating Removal, Grinding/Scraping Method].
- Aspiration des fumées en marche pendant toute soudure [SOURCÉ : SRC-0074 §SAFETY] ; fer sur son support [SOURCÉ : SRC-0071 §6.7 Heat Sources].
- Calculateur de récupération : protocole commun calculateurs réels, décharge mesurée avant de toucher la carte [SOURCÉ : SRC-0013 §2-7 Restriking Voltage].
- Fautes éliminatoires de la semaine : FE-01 (ESD), FE-09 (décharge non mesurée, TP-41), FE-11 (air chaud sans protection des voisins sensibles), FE-12 (travail sans aspiration des fumées).
- Calculateurs d'airbag, d'ABS / ESP et de direction exclus : module M9, protocole renforcé.
