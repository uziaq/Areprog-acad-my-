---
id: S11
titre: "Oscilloscope approfondi"
module: M2
duree_h: 8
competences: [D3.3, D3.4, D9.1]
prerequis: [S10, S06]
lecons: [S11-L01, S11-L02, S11-L03]
tp: [TP-17, TP-18]
sources: [SRC-0014, SRC-0028, SRC-0029]
version: "0.1"
statut: brouillon
derniere_verification_sources: 2026-11-14
historique:
  - version: "0.1"
    date: 2026-11-14
    resume: Première rédaction (3 leçons, 8 exercices, banque de 25 questions, TP-17 et TP-18, séance FR-08)
---

Dernière semaine du module M2 : on passe de l'oscilloscope « qui affiche une courbe » à
l'oscilloscope dont on connaît les limites. On choisit la bande passante et la fréquence
d'échantillonnage, on reconnaît un affichage replié, on compense les sondes, on comprend pourquoi
leur masse est reliée à la terre et ce qu'une longue masse ajoute au signal. On mesure entre deux
points dont aucun n'est à la masse, on capture un événement unique, on lit un courant à la pince et
un spectre FFT.

Organisation conseillée des 8 h : leçons (4 h), exercices (30 min), TP-17 (1 h 15), TP-18 (1 h),
FR-08 (1 h), QCM et journal (15 min).

## Mesures attendues et tolérances

**TP-17.** La compensation se juge sur la forme du signal carré : coins carrés
[SOURCÉ : SRC-0014 §Compensating the Probes]. L'effet de la longue masse dépend de la rapidité du
front et peut être invisible sur un front lent [SOURCÉ : SRC-0029 §Ground Lead Issues]. La tension
lue en soustraction se compare à la mesure au multimètre aux bornes de la même résistance ; une
petite différence entre deux grandes tensions est sensible au calibre et à l'accord des voies.

**TP-18.** Le courant établi de la bobine se compare au calcul fait avec la résistance de bobine de
la fiche du relais, en tenant compte de sa tolérance et de la précision de la pince
[À VÉRIFIER : tolérance de la résistance de bobine dans la fiche du relais utilisé]. La durée du
rebond est dispersée d'une manœuvre à l'autre : on relève plusieurs captures. Les raies de la FFT se
comparent aux multiples impairs de la fondamentale pour un carré à 50 %
[SOURCÉ : SRC-0028 §Square wave signals].

## Erreurs fréquentes

- **Oublier de déclarer le facteur ×10 de la sonde.** Détection : vérifier le menu de la voie ; une tension dix fois trop faible le signale.
- **Mesurer sans avoir compensé la sonde.** Détection : contrôler le signal de compensation, coins carrés, à chaque installation.
- **Poser la masse de la sonde sur un point qui n'est pas la masse (FE-07).** Détection : avant de brancher, nommer le point où va la pince de masse ; pour une mesure flottante, utiliser deux voies en soustraction ou une sonde différentielle.
- **Croire une oscillation qui vient de la sonde.** Détection : remplacer la masse longue par la masse courte d'origine et comparer.
- **Lire une fréquence repliée.** Détection : changer la base de temps ; une fréquence affichée qui change signale un repliement.
- **Rester en mode auto pour un événement unique.** Détection : passer en mode unique ; l'écran doit se figer sur la capture.
- **Mesurer un courant continu avec une pince AC.** Détection : lire le type de pince dans sa notice ; une pince AC n'affiche rien en régime établi.
- **Entourer l'aller et le retour avec la pince.** Détection : la pince n'entoure qu'un seul fil ; un courant qui reste proche de zéro le signale.

## Lien atelier

Sur un calculateur, l'oscilloscope sert à voir ce que le multimètre moyenne : une commande PWM
d'actionneur, un signal de capteur qui décroche un instant, un courant d'injecteur ou de relais
[HYPOTHÈSE]. Un défaut intermittent se capture en mode normal ou unique, avec un déclenchement bien
choisi [HYPOTHÈSE]. Avant de conclure à une panne sur une oscillation, on vérifie la sonde, sa
compensation et sa masse. Aucune valeur ni aucun schéma de calculateur réel n'est donné ici.

## Fil rouge FR-08 : retouche et contrôle

Huitième séance du fil rouge microsoudure (1 h). Critère de réussite du catalogue des TP :
identification des défauts sur photos.

1. Préparer le poste : aspiration des fumées en marche, fer sur son support, poste ESD (bracelet relié), microscope.
2. Inspecter au microscope les soudures des séances FR-01 à FR-07 ; photographier chacune.
3. Classer chaque soudure : conforme, manque d'alliage, excès, pont, soudure sèche ou froide, composant décalé, pastille soulevée.
4. Retoucher les défauts retouchables au flux et à la tresse ; ne pas reprendre une pastille soulevée sans l'avis du formateur.
5. Photographier après retouche ; vérifier au multimètre continuité et absence de court-circuit.
6. Identifier les défauts sur une série de photos fournie par le formateur ; noter la réponse et la justifier au journal.

## Sécurité spécifique

- Oscilloscope relié à la terre par son cordon ; on ne neutralise jamais cette terre [SOURCÉ : SRC-0029 §Use Proper Grounding Procedures].
- Pince de masse des sondes reliée uniquement à la masse du montage (FE-07) [SOURCÉ : SRC-0029 §Use Proper Grounding Procedures].
- Ordre de branchement : sonde sur l'oscilloscope, puis masse, puis pointe ; au retrait, pointe, puis masse [SOURCÉ : SRC-0029 §Connect and Disconnect Probes Properly].
- Pince de courant : courant mesuré, continu compris, sous son courant maximal [SOURCÉ : SRC-0029 §Maximum Input Current Rating (current probes)].
- Alimentation limitée en courant, limite écrite avant la mise sous tension (FE-02) ; polarités vérifiées (FE-03) ; diode de roue libre sur la bobine du relais.
- FR-08 : aspiration à la source, fer sur son support, mains lavées après la séance (S01).
