---
id: S06
titre: "Alternatif, signaux, premiers pas à l'oscilloscope"
module: M1
duree_h: 8
competences: [D2.6, D2.7, D3.3, D9.1]
prerequis: [S05]
lecons: [S06-L01, S06-L02, S06-L03]
tp: [TP-08, TP-09]
sources: [SRC-0008, SRC-0010, SRC-0011, SRC-0014]
version: "0.1"
statut: brouillon
derniere_verification_sources: 2026-11-14
historique:
  - version: "0.1"
    date: 2026-11-14
    resume: Première rédaction (3 leçons, 8 exercices, banque de 25 questions, TP-08 et TP-09, séance FR-03)
---

Dernière semaine du module M1. On quitte le continu : sinusoïde, signal carré et PWM, avec leurs
valeurs moyenne, crête et efficace ; la réactance du condensateur, qui dépend de la fréquence, et
le filtre RC qui en découle ; enfin l'oscilloscope, l'instrument qui montre la forme d'un signal,
que le multimètre résume en un seul nombre. L'oscilloscope est approfondi en S11.

Organisation conseillée des 8 h : leçons (3 h 30), exercices (30 min), TP-08 (1 h 15),
TP-09 (1 h 15), FR-03 (1 h), QCM et journal (30 min).

## Mesures attendues et tolérances

**TP-08.** Les grandeurs mesurées (période, fréquence, amplitude, rapport cyclique) se comparent
aux réglages du générateur. L'écart toléré combine la précision du générateur et celle de
l'oscilloscope, qui se lisent dans leurs notices [À VÉRIFIER : précision en fréquence et en amplitude du générateur et de l'oscilloscope de l'atelier, dans leurs notices],
et l'erreur de lecture sur les graduations, de l'ordre d'une fraction de division [HYPOTHÈSE].

**TP-09.** La fréquence de coupure se calcule avec la résistance **mesurée** et la capacité
nominale ; la tolérance du condensateur se lit dans sa fiche technique [À VÉRIFIER : tolérance du condensateur du TP, dans sa fiche technique].
La fréquence de coupure mesurée est celle où la sortie vaut 70,7 % de l'entrée [SOURCÉ : SRC-0010 §Low-pass filters].

## Erreurs fréquentes

- **Confondre crête et crête à crête.** Détection : pour une sinusoïde centrée, Ucc = 2 × Û ; vérifier sur l'écran d'où part la mesure.
- **Appliquer 0,707 à un signal qui n'est pas sinusoïdal.** Détection : ce coefficient ne vaut que pour une sinusoïde ; pour un PWM, utiliser Umax × √D.
- **Croire le multimètre sur un signal PWM.** Détection : vérifier dans la fiche d'identité (TP-06) s'il est TRMS ; voir la forme à l'oscilloscope.
- **Observer un PWM en couplage AC.** Détection : le niveau bas n'est plus au zéro de l'écran ; repasser en DC.
- **Image qui défile.** Détection : le niveau de déclenchement est hors du signal, ou la source de déclenchement n'est pas la bonne voie.
- **Oublier le facteur de sonde.** Détection : une amplitude dix fois trop petite ou trop grande ; vérifier le réglage ×1 / ×10 de la sonde et de l'oscilloscope.
- **Calculer fc avec C en µF ou R en kΩ sans convertir.** Détection : fc = 1 / (2π × R × C) avec R en ohms et C en farads.

## Lien atelier

Beaucoup de sorties d'un calculateur sont des signaux PWM : commande d'électrovannes, de
ventilateurs, d'éclairage [À VÉRIFIER : fréquences et rapports cycliques réels, à lire dans la documentation du véhicule ou du calculateur étudié].
Un multimètre en continu en donne la valeur moyenne, un multimètre non TRMS en alternatif peut
afficher une valeur trompeuse, et seul l'oscilloscope montre la fréquence, le rapport cyclique
et les défauts de forme. Beaucoup d'entrées de capteurs passent par un filtre RC qui atténue les
parasites : un condensateur de ce filtre en défaut modifie le signal vu par le calculateur
[HYPOTHÈSE], à confirmer par une mesure comparée au signal attendu. Aucune valeur de signal
réel n'est donnée ici.

## Fil rouge FR-03 : CMS 1206

Troisième séance du fil rouge microsoudure (1 h). Critère de réussite du catalogue des TP :
10 joints sur 10 conformes.

1. Préparer le poste : aspiration des fumées en marche, fer sur son support, poste ESD, pince brucelles, flux.
2. Étamer une pastille, poser le composant 1206 à la brucelle, souder le premier côté, puis le second.
3. Souder dix composants 1206 sur la carte d'entraînement.
4. Inspecter chaque joint au microscope : ménisque régulier des deux côtés, composant à plat et centré, sans pont ; photographier.
5. Réglage de la température de la panne : notice de la station et fiche de l'alliage [À VÉRIFIER : température recommandée dans la notice de la station et la fiche de l'alliage utilisés].

## Sécurité spécifique

- Oscilloscope relié au secteur : cordon d'alimentation avec conducteur de terre branché sur une prise reliée à la terre, condition de sécurité [SOURCÉ : SRC-0014 §Proper Grounding].
- Cette semaine, la pince de masse de la sonde se relie uniquement à la masse du générateur ou du montage étudié ; aucune mesure sur le secteur ni sur un véhicule.
- Alimentation limitée en courant, limite écrite avant la mise sous tension (FE-02), pour les montages alimentés.
- Poste ESD et bracelet pour toute manipulation de carte (FE-01) ; FR-03 : aspiration à la source, fer sur son support, mains lavées après la séance (S01).
