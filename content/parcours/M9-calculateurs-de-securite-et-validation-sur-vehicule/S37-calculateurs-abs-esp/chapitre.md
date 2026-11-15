---
id: S37
titre: "Calculateurs ABS / ESP"
module: M9
duree_h: 8
competences: [D10.6, D10.7]
prerequis: [S36]
lecons: [S37-L01, S37-L02, S37-L03]
tp: [TP-54, TP-55]
sources: [SRC-0100, SRC-0101, SRC-0081, SRC-0013, SRC-0002, SRC-0029]
version: "0.1"
statut: brouillon
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction (3 leçons, 8 exercices, banque de 25 questions, TP-54 et TP-55 sous protocole renforcé)
---

<!-- Semaine sous protocole de sécurité renforcé : chaque TP porte securite: renforcee (voir .claude/rules/securite-et-deploiement.md). -->

Troisième semaine du module M9. Après l'airbag, le freinage : architecture générique d'un calculateur
ABS / ESP (électrovannes, pompe, capteurs de roue, capteurs ESP), **capteurs de roue** actifs et passifs
mesurés sur véhicule d'atelier levé, puis **étages de puissance** mesurés sur banc avec des charges
réduites, et opérations d'après-intervention décrites par le constructeur.

Organisation conseillée des 8 h : leçons (5 h 20), exercices (40 min), TP-54 (1 h 15), TP-55 (45 min) [HYPOTHÈSE : répartition à ajuster selon le véhicule et le calculateur disponibles].

## Mesures attendues et tolérances

**TP-54.** Charges réduites conformes à leur fiche, mesurées avant branchement. Courants des
électrovannes et de la charge de pompe comparables à ceux de la référence, à la précision de la pince.
Pic de tension côté bas à la coupure au plus égal à l'écrêtage de la fiche si le circuit cité est identifié [SOURCÉ : SRC-0100 §1.1 Features].

**TP-55.** Capteur actif : deux niveaux de courant distincts, de l'ordre de ceux de l'exemple de la fiche citée [SOURCÉ : SRC-0100 §5.3.9 Wheel-Speed Sensing].
Capteur passif : amplitude qui croît avec la vitesse [SOURCÉ : SRC-0081 §DESCRIPTION].
Fréquence cohérente avec le nombre de dents de la cible [À VÉRIFIER : cible du véhicule d'atelier].

## Erreurs fréquentes

- **Brancher le moteur de pompe réel sur l'alimentation de labo.** Détection : charges réduites et leur source au dossier.
- **Essayer toutes les sorties à la fois.** Détection : une capture par sortie, limite écrite pour chaque essai.
- **Prendre un défaut de chien de garde pour une panne d'étage.** Détection : conditions de vie du microcontrôleur relevées avant les étages.
- **Mettre en cause le calculateur pour un capteur de roue muet.** Détection : câblage et alimentation du capteur contrôlés d'abord.
- **Mesurer un capteur actif en tension comme un passif.** Détection : type de capteur justifié par la documentation avant la mesure.
- **Percer un isolant pour mesurer.** Détection : photos des pointes de touche arrière.
- **Oublier les opérations d'après-intervention.** Détection : liste du constructeur jointe au dossier de validation.

## Lien atelier

Les calculateurs ABS / ESP reviennent souvent pour des défauts d'électrovanne, de pompe ou de capteur de
roue [HYPOTHÈSE : à confirmer sur les demandes reçues par l'atelier]. Beaucoup de défauts « capteur de
roue » viennent du capteur, du câblage ou de la cible, pas du calculateur : la mesure sur véhicule
évite un remplacement inutile. Sur banc, les charges réduites protègent l'alimentation et la carte ;
la validation complète, purge et essais compris, ne se fait que sur véhicule d'atelier (S39).

## Sécurité spécifique

- Protocole renforcé appliqué dans l'ordre, grille renforcée en plus de la grille générique : chaque critère est éliminatoire et exige une preuve.
- Aucune intervention hydraulique à l'atelier de formation ; liquide de frein manipulé avec gants et lunettes selon sa fiche de données de sécurité.
- Charges de substitution réduites uniquement, avec valeur, puissance et source ; fusible ; limite écrite pour chaque essai ; une sortie à la fois.
- Aucune surveillance forcée : un défaut de chien de garde coupe les sorties [SOURCÉ : SRC-0100 §5.3.12 Watchdog Operation].
- Décharge mesurée deux fois avant tout contact [SOURCÉ : SRC-0013 §2-7 Restriking Voltage] (FE-09) ; poste ESD [SOURCÉ : SRC-0002 §ESD Damage: How Devices Fail] (FE-01) ; masse des sondes [SOURCÉ : SRC-0029 §Use Proper Grounding Procedures] (FE-07).
- Véhicule d'atelier thermique uniquement (D-15), immobilisé et levé selon la notice, connexions batterie débranchée, aucun déplacement, critères d'arrêt écrits (FE-15).
- Fautes éliminatoires de la semaine : FE-01 à FE-04, FE-07, FE-08, FE-09, FE-13, FE-14 et FE-15, plus tous les critères de la grille renforcée.
