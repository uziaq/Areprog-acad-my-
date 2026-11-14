---
id: S04
titre: "Le multimètre en profondeur"
module: M1
duree_h: 8
competences: [D1.2, D1.4, D3.1, D3.2, D3.7, D9.1]
prerequis: [S03]
lecons: [S04-L01, S04-L02, S04-L03]
tp: [TP-06]
sources: [SRC-0004, SRC-0008]
version: "0.1"
statut: brouillon
derniere_verification_sources: 2026-11-13
historique:
  - version: "0.1"
    date: 2026-11-13
    resume: Première rédaction (3 leçons, 8 exercices, banque de 25 questions, TP-06, séance FR-01)
---

Troisième semaine du module M1. Le multimètre devient un instrument dont on connaît les limites :
choix des bornes et du calibre, résolution, incertitude d'une lecture, effet de charge du
voltmètre et mesure de courant sans griller le fusible. La semaine ouvre aussi le **fil rouge
microsoudure** avec sa première séance, FR-01.

Organisation conseillée des 8 h : leçons (3 h 30), exercices (45 min), TP-06 (1 h 45),
FR-01 (1 h), QCM et journal (1 h).

## Mesures attendues et tolérances

**TP-06.** Les tensions théoriques se calculent avec le modèle de Thévenin du diviseur (S03), à
partir des résistances **mesurées** hors circuit, puis avec l'effet de charge du voltmètre. Pour
chaque lecture, l'incertitude se calcule avec la spécification de la notice du multimètre, pour
la fonction et le calibre utilisés [À VÉRIFIER : spécifications relevées dans la fiche d'identité du multimètre, TP-06].
La conclusion de chaque comparaison est l'un des trois cas de la leçon S04-L02 : conforme, non
conforme ou non concluant.

## Erreurs fréquentes

- **Mesurer une tension avec un cordon dans la borne de courant.** Détection : regarder les bornes avant chaque mesure ; c'est une faute éliminatoire.
- **Laisser le calibre automatique sans regarder lequel il a choisi.** Détection : noter le calibre au journal ; sans lui, l'incertitude ne se calcule pas.
- **Oublier la partie « points » de la précision.** Détection : sur une petite lecture, la partie fixe domine ; refaire le calcul en deux parties.
- **Conclure « conforme » sur un résultat à cheval.** Détection : dessiner les deux intervalles comme sur la figure S04-F02.
- **Croire une mesure de résistance faite en circuit.** Détection : chercher sur le schéma ce qui est relié aux deux bornes ; la valeur lue ne peut être que plus faible ou égale à la vraie.
- **Mesurer un point à haute impédance sans tenir compte du voltmètre.** Détection : comparer Rth du point à Rin de l'appareil ; si Rin n'est pas au moins cent fois plus grande [EXEMPLE], corriger par le calcul.
- **Brancher l'ampèremètre sans avoir calculé le courant.** Détection : le courant prévu s'écrit au journal avant la mesure, avec la borne et le calibre choisis.

## Lien atelier

Un capteur de température résistif est relié au calculateur par un diviseur de tension [EXEMPLE].
Au repos, l'atelier mesure la tension du signal au connecteur. Deux pièges vus cette semaine
s'appliquent : le multimètre charge un point à haute impédance et peut faire baisser la tension
lue, et une résistance de capteur mesurée en place, connecteur branché, inclut tout ce qui est
relié en parallèle. Avant de conclure à un capteur défectueux [HYPOTHÈSE], on vérifie que la
mesure elle-même est valable : impédance du point, calibre, incertitude, mesure hors circuit
quand c'est possible. Aucune valeur de capteur réel n'est donnée ici : elles viennent de la
documentation constructeur du véhicule.

## Fil rouge FR-01 : étamage, fils et traversants

Première séance du fil rouge microsoudure (1 h), sur carte d'entraînement. Critère de réussite du
catalogue des TP : joints brillants et concaves, sans pont.

1. Préparer le poste : aspiration des fumées en marche, fer sur son support, poste ESD si la carte comporte des composants sensibles.
2. Régler la température de la panne selon la notice de la station et la fiche technique de l'alliage [À VÉRIFIER : température recommandée dans la notice de la station et la fiche de l'alliage utilisés].
3. Étamer la panne, puis l'essuyer.
4. Étamer l'extrémité de deux fils, puis les souder bout à bout et sur une cosse.
5. Souder dix composants traversants sur la carte d'entraînement.
6. Photographier chaque joint au microscope ou à la loupe ; noter au journal les joints refaits et pourquoi.

## Quand remplacer le multimètre basique

Un multimètre basique suffit pour les TP de cette semaine, à condition d'en connaître les limites
(fiche d'identité du TP-06). Avant d'en acheter un autre pour la suite du cursus, voici ce qu'il
faut vérifier. Aucune marque n'est recommandée ici : ce sont des critères, à contrôler sur
l'appareil et dans sa notice.

- **Catégorie de mesure.** Choisir un appareil classé pour la catégorie la plus élevée dans laquelle on pourrait l'utiliser [SOURCÉ : SRC-0004 §The bottom line] ; la catégorie compte autant que la tension (S01).
- **Essai par un laboratoire indépendant.** Chercher le symbole et le numéro d'homologation d'un laboratoire d'essai indépendant ; le marquage CE seul ne garantit pas un essai indépendant [SOURCÉ : SRC-0004 §Independent testing is the key to safety compliance] [SOURCÉ : SRC-0004 §What does the CE symbol indicate?].
- **Bornes de courant protégées par des fusibles à haute énergie** [SOURCÉ : SRC-0004 §Use the right high-energy fuses], dont le modèle de rechange est indiqué par le fabricant.
- **Bornes encastrées et cordons à connecteurs gainés, avec garde-doigts** [SOURCÉ : SRC-0004 §Electric shock] ; les cordons doivent être certifiés pour une catégorie et une tension au moins égales à celles de l'appareil [SOURCÉ : SRC-0004 §The bottom line].
- **Valeur efficace vraie (TRMS)**, utile pour les signaux non sinusoïdaux de l'électronique automobile [SOURCÉ : SRC-0008 §DC and AC voltage] (S04-L02, S06).
- **Nombre de points et précision** : un tableau de spécifications complet dans la notice, pour chaque fonction et chaque calibre [SOURCÉ : SRC-0008 §Accuracy]. Un appareil sans tableau de spécifications ne permet pas de conclure sur une conformité.

Le choix de la catégorie et de la tension minimales adaptées à l'atelier reste à arrêter avec la
norme en vigueur [À VÉRIFIER : catégorie et tension minimales pour les mesures de l'atelier, selon l'édition en vigueur de l'IEC 61010].

## Sécurité spécifique

- Aucune mesure de courant sans calcul préalable du courant attendu ; borne et calibre écrits au journal.
- Cordons remis dans les bornes de tension juste après une mesure de courant.
- Multimètre et cordons utilisés dans leur catégorie de mesure (S01) ; aucune mesure sur le secteur.
- FR-01 : aspiration à la source, fer sur son support, mains lavées après la séance, fiches de données de sécurité du flux et de l'alliage lues avant le premier usage (S01).
