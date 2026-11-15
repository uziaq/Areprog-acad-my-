---
id: S26
titre: "Soudure CMS de précision"
module: M7
duree_h: 8
competences: [D3.5, D9.1, D9.5]
prerequis: [S25]
lecons: [S26-L01, S26-L02, S26-L03]
tp: [TP-37]
sources: [SRC-0071, SRC-0072, SRC-0073, SRC-0074]
version: "0.1"
statut: brouillon
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction (3 leçons, 8 exercices, banque de 25 questions, TP-37)
---

Première semaine du module M7, microsoudure intensive. L'épreuve du fil rouge (S24) est validée :
on passe de la répétition à la précision mesurée. On étudie la thermique de la soudure, les alliages
avec et sans plomb, le flux et le nettoyage, puis la pose et la dépose des passifs 0603 et 0402 au fer.
Surtout, on apprend à **contrôler** selon des critères écrits et à mesurer un taux de conformité.
Les critères viennent de normes NASA publiques ; l'IPC-A-610, payante, n'a pas été consultée, et le
cours ne prétend à aucune certification.

Organisation conseillée des 8 h : leçons (4 h), exercices (30 min), TP-37 (3 h 30)
[HYPOTHÈSE : répartition à ajuster ; le TP peut se faire en deux séances].

## Mesures attendues et tolérances

**TP-37.** Chaque soudure est acceptée ou rejetée d'après les critères des composants chip : ménisque
concave, mouillage visible, ménisque d'au moins 50 % de l'épaisseur du composant, inclinaison et
débord limités [SOURCÉ : SRC-0071 §12.9 Inspection Criteria, Specific]. Le grossissement suit la
largeur des pastilles [SOURCÉ : SRC-0071 §12.2 Magnification Requirements]. Le taux de conformité
visé est de 90 % au moins [EXEMPLE : seuil calqué sur l'épreuve du fil rouge, à confirmer par Arthur].

## Erreurs fréquentes

- **Monter la température pour compenser une panne sale.** Détection : contrôle de la panne avant de régler ; une panne propre et étamée transmet la chaleur.
- **Apporter le fil sur la panne au lieu du joint.** Détection : soudure en boule, sans ménisque sur la terminaison.
- **Étamer les deux pastilles avant de poser.** Détection : composant qui ne repose pas à plat, pierre tombale.
- **Toucher le corps d'un condensateur céramique avec la panne.** Détection : la panne ne touche que la pastille et la terminaison ; fiche du fabricant relue.
- **Refroidir à l'air comprimé ou nettoyer aussitôt au solvant froid.** Détection : refroidissement à l'air ambiant.
- **Juger « à l'œil ».** Détection : grille écrite, grossissement noté, photo de chaque soudure.
- **Compter les reprises dans le taux de conformité.** Détection : taux calculé avant reprise, reprises notées à part.

## Lien atelier

Sur un calculateur, une réparation de niveau carte se termine presque toujours par des soudures de
petits passifs : découplages, résistances de tirage, filtres [HYPOTHÈSE : à confirmer sur les dossiers
de l'atelier]. Une microfissure de condensateur céramique ou un ménisque insuffisant peut produire une
panne intermittente qui revient chez le client. Contrôler chaque soudure au microscope selon une grille
écrite, et garder la photo dans le dossier de réparation, rend la réparation vérifiable.

## Sécurité spécifique

- Aspiration des fumées en marche pendant toute la soudure ; ventilation exigée par la fiche de l'alliage [SOURCÉ : SRC-0074 §SAFETY].
- Solvants : ventilation, fiche de données de sécurité, loin du fer [SOURCÉ : SRC-0072 §6.13 Solvents and Cleaners].
- Fer toujours sur son support ; panne contrôlée avant usage [SOURCÉ : SRC-0071 §6.7 Heat Sources].
- Fautes éliminatoires de la semaine : FE-01 (ESD), FE-11 (air chaud sans protection des composants voisins sensibles, si l'air chaud est utilisé), FE-12 (travail sans aspiration des fumées).
- Pas de calculateur réel ni de mise sous tension cette semaine : carte d'entraînement non alimentée.
