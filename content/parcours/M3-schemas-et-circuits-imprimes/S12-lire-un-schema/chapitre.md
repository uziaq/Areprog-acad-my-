---
id: S12
titre: "Lire un schéma"
module: M3
duree_h: 8
competences: [D5.1, D5.2, D9.1]
prerequis: [S11]
lecons: [S12-L01, S12-L02, S12-L03]
tp: [TP-19]
sources: [SRC-0030, SRC-0031, SRC-0032, SRC-0015]
version: "0.1"
statut: brouillon
derniere_verification_sources: 2026-11-14
historique:
  - version: "0.1"
    date: 2026-11-14
    resume: Première rédaction (3 leçons, 8 exercices, banque de 25 questions, TP-19, séance FR-09)
---

Première semaine du module M3 : après les composants et les instruments, on apprend à lire la carte
d'un circuit. On reconnaît les symboles et leurs variantes, on lit références, valeurs et
nomenclature, on suit les réseaux par leurs étiquettes, on repère alimentations et masses, puis on
découpe un schéma en blocs. On termine par le schéma électrique officiel du constructeur, seule
source de brochage d'un véhicule, reprise chaque semaine ensuite. Les supports sont des schémas
publics, jamais des schémas de calculateurs non publiés.

Organisation conseillée des 8 h : leçons (4 h), exercices (30 min), TP-19 (1 h 45), FR-09 (1 h),
QCM, révision du jalon 1 et journal (45 min).

## Mesures attendues et tolérances

**TP-19.** Ce TP ne mesure pas de grandeur électrique. Le découpage en blocs est accepté s'il est
justifié par la fonction et les références de chaque bloc [SOURCÉ : SRC-0030 §Identify Blocks].
Les masses du schéma public sont listées par leur nom, avec le point où elles se rejoignent quand
le schéma le montre [SOURCÉ : SRC-0032 §page 1]. Le brochage relevé sur le document officiel n'a
aucune tolérance : chaque ligne est lue sur le document ou marquée `[À VÉRIFIER]`.

## Erreurs fréquentes

- **Prendre un croisement pour une liaison.** Détection : chercher le point de jonction ; sans point, pas de liaison.
- **Croire deux étiquettes voisines identiques.** Détection : comparer les noms lettre à lettre ; SENS et SENSE sont deux réseaux.
- **Supposer que toutes les masses sont reliées.** Détection : chercher sur le schéma où GND, AGND ou une autre masse se rejoignent ; à défaut, `[À VÉRIFIER]`.
- **Lire un condensateur polarisé à l'envers.** Détection : repérer le signe plus et la plaque courbe.
- **Confondre NPN et PNP.** Détection : flèche sur l'émetteur, sortante pour un NPN.
- **Oublier une feuille du schéma.** Détection : chercher toutes les apparitions d'une étiquette sur toutes les feuilles.
- **Compter les alvéoles d'un connecteur dans la mauvaise vue.** Détection : lire la légende du document, vue côté faisceau ou côté composant.
- **Recopier un brochage trouvé sur un forum.** Détection : chaque brochage cite le document officiel du constructeur, titre et version.

## Lien atelier

Devant un calculateur en panne, le schéma dit où chercher : un défaut d'alimentation se cherche
dans le bloc alimentation, une sortie qui ne commande plus dans l'étage de sortie [HYPOTHÈSE]. Sans
schéma publié du calculateur, on s'appuie sur les fiches des composants et, en S13, sur un relevé
partiel marqué `[À VÉRIFIER]`. Côté véhicule, le brochage du connecteur se lit sur le schéma
électrique officiel du constructeur, jamais ailleurs. Aucune valeur ni aucun schéma de calculateur
réel n'est donné ici.

## Fil rouge FR-09 : repose de SOIC-14/16

Neuvième séance du fil rouge microsoudure (1 h). Critère de réussite du catalogue des TP : repose
conforme.

1. Préparer le poste : aspiration des fumées en marche, fer sur son support, poste ESD (bracelet relié), brucelles, flux, tresse.
2. Repérer la broche 1 sur la sérigraphie et sur le boîtier ; photographier l'orientation avant la pose.
3. Étamer une pastille d'angle, poser le boîtier, souder cette broche, contrôler l'alignement de toutes les broches, puis souder la broche opposée en diagonale.
4. Souder les autres broches ; retirer un éventuel pont à la tresse et au flux.
5. Inspecter au microscope ; vérifier au multimètre la continuité de chaque broche vers sa piste et l'absence de court-circuit entre broches voisines.
6. Réglage de la température de la panne : notice de la station et fiche de l'alliage [À VÉRIFIER : température recommandée dans la notice de la station et la fiche de l'alliage utilisés].

## Sécurité spécifique

- TP-19 sans mise sous tension : carte débranchée, sans câble USB ni alimentation.
- Cartes et boîtiers SOIC manipulés sur le poste ESD, bracelet relié (FE-01).
- Partie B du TP-19 sur document uniquement : aucune intervention sur le véhicule.
- Un brochage de véhicule ne vient que du schéma électrique officiel du constructeur ; une erreur de broche peut endommager un calculateur lors des TP suivants.
- FR-09 : aspiration à la source, fer sur son support, mains lavées après la séance (S01).
