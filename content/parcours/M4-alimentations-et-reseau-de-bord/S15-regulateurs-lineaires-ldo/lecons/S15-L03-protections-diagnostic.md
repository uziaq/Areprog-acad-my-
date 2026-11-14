---
id: S15-L03
titre: Protections, enable, reset et diagnostic d'un régulateur
chapitre: S15
version: "0.1"
statut: brouillon
duree_min: 90
objectifs:
  - id: O1
    texte: Expliquer la limitation de courant, l'arrêt thermique, la protection contre l'inversion de polarité et les signaux enable, reset et power-good d'un régulateur
    competences: [D6.1]
  - id: O2
    texte: Diagnostiquer un régulateur par la mesure de son entrée, de sa sortie, de sa masse, de son enable et de son reset
    competences: [D6.1]
prerequis: [S15-L02]
exercices: [S15-L03-EX01, S15-L03-EX02]
references: [SRC-0037, SRC-0038]
criteres_evaluation:
  - objectif: O1
    critere: Exercice S15-L03-EX01 réussi
  - objectif: O2
    critere: Exercice S15-L03-EX02 réussi et diagnostic du régulateur rédigé au TP-21
figures:
  - id: S15-F03
    fichier: ../figures/S15-F03-diagnostic.svg
    legende: "Arbre de diagnostic d'un régulateur, carte hors défaut d'alimentation amont. On mesure d'abord l'entrée, puis l'enable, puis la sortie, et l'on interprète une sortie absente ou basse selon que le régulateur chauffe ou non."
    alt: "Organigramme de haut en bas. Entrée présente ? Non : chercher en amont. Oui : enable actif ? Non : chercher la commande d'enable. Oui : sortie correcte ? Oui : régulateur probablement bon, voir reset et power-good. Non : le régulateur chauffe-t-il ? Oui : charge en court-circuit probable, isoler la charge. Non : régulateur ou masse suspects."
    origine: areprog
derniere_verification_sources: 2026-11-14
historique:
  - version: "0.1"
    date: 2026-11-14
    resume: Première rédaction
---

## Théorie

### Limitation de courant et arrêt thermique

Le défaut le plus probable est une sortie en court-circuit vers la masse, par un connecteur ou une
soudure ; la limitation de courant et l'arrêt thermique protègent alors le régulateur
[SOURCÉ : SRC-0038 §Current limit and thermal shutdown].

- La **limitation de courant** borne le courant de sortie ; elle vaut en général 2 à 4 fois le courant continu nominal [SOURCÉ : SRC-0037 §3 Power Dissipation in the Linear Regulator].
- En court-circuit, presque toute la tension d'entrée est aux bornes du régulateur : il chauffe fortement [SOURCÉ : SRC-0038 §Current limit and thermal shutdown].
- L'**arrêt thermique** coupe le régulateur au-delà d'un seuil de température de jonction, puis il redémarre en refroidissant, avec une hystérésis [SOURCÉ : SRC-0038 §Current limit and thermal shutdown]. Le seuil dépend du composant : 150 °C typique dans une note [SOURCÉ : SRC-0037 §3 Power Dissipation in the Linear Regulator], 175 °C typique pour un composant automobile de grade 1 dans une autre [SOURCÉ : SRC-0038 §Current limit and thermal shutdown] ; on lit celui de la fiche.

Conséquence au diagnostic : un régulateur qui chauffe, coupe et redémarre cycliquement signale une
charge en court-circuit ou une surcharge [HYPOTHÈSE : à confirmer en isolant la charge].

### L'inversion de polarité

Un LDO dont l'élément de passage est un seul MOSFET n'a pas de protection contre l'inversion de
polarité : le courant inverse passe par la diode interne du transistor, sans limite, et peut le
détruire [SOURCÉ : SRC-0038 §MOSFET voltage regulators]. D'où la diode série en entrée (S08), dont la
chute s'ajoute à la tension de déchet (S15-L02).

### Enable, reset et power-good

Un régulateur de calculateur fait souvent plus que réguler :

- **Enable** (EN) : un niveau bas coupe le LDO pour économiser l'énergie, un niveau haut le réveille [SOURCÉ : SRC-0038 §Feature descriptions]. Un régulateur sans enable actif ne sort rien : ce n'est pas une panne.
- **Reset de sous-tension** : le LDO surveille sa sortie ; si elle passe sous un seuil interne, après un filtrage contre le bruit, il met le microcontrôleur en reset [SOURCÉ : SRC-0038 §Output voltage undervoltage reset].
- **Délai de reset à la mise sous tension** et **power-good** : le LDO établit sa sortie, puis libère le signal après un délai, pour laisser l'oscillateur du microcontrôleur se stabiliser [SOURCÉ : SRC-0038 §Power-on-reset delay]. Le délai peut être fixé par un condensateur sur une broche dédiée [SOURCÉ : SRC-0038 §Power-on-reset delay time].
- **Chien de garde** : le microcontrôleur doit le servir périodiquement ; sinon, le chien de garde le remet à zéro [SOURCÉ : SRC-0038 §Watchdog timers].
- **Alerte anticipée** : le LDO surveille son entrée et prévient le microcontrôleur d'une coupure imminente, pour qu'il sauvegarde ses données en EEPROM [SOURCÉ : SRC-0038 §Feature descriptions].

Un microcontrôleur bien alimenté mais maintenu en reset ne démarre pas : on mesure donc le reset et
le power-good, pas seulement la tension de sortie.

### Méthode de diagnostic

Ordre de mesure proposé, au multimètre puis à l'oscilloscope [EXEMPLE : méthode de la formation] :

1. **Masse** du régulateur : la mesure se fait par rapport à sa broche de masse, pas seulement au boîtier.
2. **Entrée** : présente et au-dessus de la sortie plus la tension de déchet ?
3. **Enable** : au niveau actif d'après la fiche ?
4. **Sortie** : à la tension attendue, à vide puis en charge ?
5. **Reset / power-good** : libérés après la mise sous tension ?
6. **Température** et forme de la sortie à l'oscilloscope : chauffe anormale, coupures cycliques, oscillation.

::figure{id=S15-F03}

Sur un calculateur réel, la mise sous tension suit une procédure progressive, étudiée en S17 ; dans
ce chapitre, on travaille sur carte d'entraînement.

### Exemple 7 : sortie absente, régulateur froid

Entrée 12 V présente, sortie 0 V, régulateur froid [EXEMPLE].

1. Mesurer l'enable : s'il est inactif, la cause est en amont de la commande [HYPOTHÈSE].
2. Enable actif : vérifier la masse du régulateur, puis le régulateur lui-même [HYPOTHÈSE].

### Exemple 8 : sortie basse, régulateur brûlant

Entrée 12 V, sortie 0,6 V, régulateur très chaud qui coupe par moments [EXEMPLE].

1. Limitation de courant et arrêt thermique probables : la charge tire trop [HYPOTHÈSE].
2. Carte hors tension, isoler la charge (couper une liaison prévue, retirer un composant) et mesurer la résistance de la sortie vers la masse.
3. Remettre sous tension avec une alimentation limitée en courant : si la sortie revient, le défaut est dans la charge.

## Exercices

::exercice{id=S15-L03-EX01}

::exercice{id=S15-L03-EX02}
