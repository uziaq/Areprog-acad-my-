---
id: S18
titre: "Diagnostic d'alimentation sur carte"
module: M4
duree_h: 8
competences: [D1.6, D3.2, D6.4, D9.1, D10.1, D10.6]
prerequis: [S17]
lecons: [S18-L01, S18-L02, S18-L03]
tp: [TP-24, TP-25]
sources: [SRC-0051, SRC-0050, SRC-0049, SRC-0035, SRC-0013, SRC-0029, SRC-0046]
version: "0.1"
statut: brouillon
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction (3 leçons, 8 exercices, banque de 25 questions, TP-24, TP-25, étape PB-1, séance FR-14)
---

Dernière semaine du module M4, et première semaine sur de vrais calculateurs sous tension. On
construit le banc d'alimentation (étape PB-1 du projet « banc de test »), on applique le protocole
commun calculateurs réels et la mise sous tension progressive, on apprend à localiser un
court-circuit sur un rail (injection de courant limité, thermique, chute de tension) et à
documenter le diagnostic dans un dossier de réparation.

Organisation conseillée des 8 h : leçons (4 h), exercices (20 min), TP-24 (1 h 15), TP-25
(1 h 15), PB-1 et FR-14 hors séance ou en atelier ouvert [HYPOTHÈSE : répartition à ajuster selon
l'avancement du banc], QCM et journal (30 min).

## Mesures attendues et tolérances

**TP-24.** La tension affichée pendant l'injection est bien plus basse que la tension nominale du
rail [SOURCÉ : SRC-0051 §Procedure:] ; la puissance injectée vaut tension affichée × courant. Les
chutes de tension le long du rail sont de l'ordre du millivolt : on cherche une tendance,
décroissante jusqu'au défaut, nulle au-delà [SOURCÉ : SRC-0050 §How does VPS find plane to plane shorts?].
La caméra donne des températures relatives [SOURCÉ : SRC-0051 §Procedure:].

**TP-25.** Il n'y a pas de valeur publiée : courants et rails se comparent à un exemplaire de
référence de même référence matérielle, mesuré dans les mêmes conditions, à la précision du
multimètre près [HYPOTHÈSE : dispersion entre exemplaires à constater]. Un SBC en veille peut
descendre sous 100 µA [SOURCÉ : SRC-0046 §Abstract].

## Erreurs fréquentes

- **Injecter un courant trop élevé.** Détection : la limite est écrite avant l'injection, sous le courant du composant le plus faible du rail.
- **Régler la tension d'injection au-dessus de la tension nominale du rail.** Détection : relire la tension nominale sur le schéma avant de brancher.
- **Chercher sur le mauvais rail.** Détection : mesurer la résistance de chaque rail vers la masse et comparer à la référence avant d'injecter.
- **Monter la limite quand l'alimentation limite.** Détection : une alimentation en limitation signifie couper, puis chercher le court-circuit.
- **Supposer qu'un étage à tension élevée est déchargé après une attente.** Détection : mesurer, deux fois.
- **Déduire la valeur d'un composant brûlé de sa mesure en circuit.** Détection : relever la même position sur la référence.
- **Effacer les défauts à l'outil avant de les noter.** Détection : lecture seule, défauts recopiés tels quels.

## Lien atelier

La méthode « alimentation d'abord » sert à chaque calculateur reçu : bornes, protections d'entrée,
rails, reset, puis fonctions [EXEMPLE : ordre pédagogique de l'académie]. Un calculateur qui vide
la batterie d'un véhicule à l'arrêt peut ne pas s'endormir ; on compare son courant de veille à une
référence [HYPOTHÈSE : à confirmer sur banc]. Aucune valeur ni aucun schéma de calculateur réel
n'est donné ici.

## Projet banc de test PB-1 : alimentation protégée

Livrable du catalogue des TP : banc documenté et son schéma.

1. Alimentation de laboratoire limitée en courant ; fusible sur le plus, calibre et tension assignée justifiés [SOURCÉ : SRC-0035 §Fuses].
2. Interrupteurs séparés pour la borne 30 et la borne 15 ; retour de masse (borne 31) ; ampèremètre ou afficheur de courant.
3. Câblage d'un connecteur de calculateur d'après la documentation du constructeur [À VÉRIFIER : connecteur et brochage du calculateur choisi pour le banc] ; chaque fil repéré par son numéro de broche.
4. Schéma du banc dans KiCad ; contrôle de chaque broche câblée au multimètre, banc hors tension, avant la première utilisation.

## Fil rouge FR-14 : remplacement d'un condensateur de découplage

Quatorzième séance du fil rouge microsoudure (1 h). Critère de réussite du catalogue des TP :
valeur et orientation vérifiées.

1. Préparer le poste : aspiration des fumées en marche, fer sur son support, poste ESD (bracelet relié), flux, tresse, brucelles.
2. Relever la valeur du condensateur à remplacer sur la carte de référence ou la nomenclature, jamais d'après ses voisins ; un condensateur céramique CMS n'est en général pas marqué [HYPOTHÈSE : à vérifier sur la carte].
3. Repérer s'il est polarisé (tantale, électrolytique) et noter sa polarité sur un croquis avant la dépose.
4. Déposer en chauffant les deux extrémités ; nettoyer les pastilles à la tresse et au flux.
5. Mesurer le condensateur neuf au capacimètre ou au pont LCR avant la pose [À VÉRIFIER : instrument disponible et sa notice] ; le poser dans le bon sens d'après le croquis.
6. Contrôler au microscope et vérifier l'absence de court-circuit entre le rail et la masse à l'ohmmètre ; photographier.
7. Réglage de la température de la panne : notice de la station et fiche de l'alliage [À VÉRIFIER : température recommandée dans la notice de la station et la fiche de l'alliage utilisés].

## Sécurité spécifique

- **Protocole commun calculateurs réels** (catalogue des TP), applicable à partir de cette semaine : photos et inventaire, repérage des étages à tension élevée, décharge mesurée, sonde différentielle ou voies isolées sur ces nœuds, mise sous tension progressive, double sauvegarde des mémoires avant toute écriture ou soudure à proximité.
- Fautes éliminatoires de la semaine : FE-01 (ESD), FE-02 (limite non écrite), FE-03 (polarité), FE-07 (masse de sonde), FE-08 (calculateur réel sans procédure progressive), FE-09 (tension interne élevée non identifiée ou décharge non mesurée).
- Décharge à travers une résistance, puis mesure renouvelée juste avant de toucher la carte [SOURCÉ : SRC-0013 §2-7 Restriking Voltage].
- Injection sur un rail : tension nominale du rail, limite sous le courant du composant le plus faible, polarité vérifiée [SOURCÉ : SRC-0051 §Procedure:].
- Calculateurs d'airbag, d'ABS / ESP et de direction réservés au module M9 ; aucun élément pyrotechnique dans l'atelier.
- Alcool isopropylique éventuel : inflammable, fiche de données de sécurité lue avant usage, loin de toute source de chaleur ; jamais sur une carte sous tension élevée.
