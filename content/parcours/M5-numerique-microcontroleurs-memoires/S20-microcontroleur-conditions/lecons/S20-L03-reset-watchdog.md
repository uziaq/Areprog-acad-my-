---
id: S20-L03
titre: Reset, supervision et watchdog
chapitre: S20
version: "0.1"
statut: brouillon
duree_min: 90
objectifs:
  - id: O1
    texte: Expliquer le rôle de la broche de reset, de sa résistance de tirage, de son condensateur et du superviseur de tension
    competences: [D7.2]
  - id: O2
    texte: Expliquer le fonctionnement d'un watchdog classique et d'un watchdog à fenêtre, interne ou externe
    competences: [D7.2]
  - id: O3
    texte: Reconnaître à l'oscilloscope un reset maintenu et un reset en boucle, et en déduire les hypothèses à vérifier
    competences: [D7.2, D3.6]
prerequis: [S20-L01, S19-L02]
exercices: [S20-L03-EX01, S20-L03-EX02]
references: [SRC-0056, SRC-0058, SRC-0038]
criteres_evaluation:
  - objectif: O1
    critere: Exercice S20-L03-EX01 réussi et reset provoqué et capturé au TP-28
  - objectif: O2
    critere: Watchdog provoqué et période mesurée au TP-28
  - objectif: O3
    critere: Exercice S20-L03-EX02 réussi et état du reset relevé au TP-29
figures:
  - id: S20-F03
    fichier: ../figures/S20-F03-watchdog-fenetre.svg
    legende: "Watchdog à fenêtre : l'impulsion de rafraîchissement doit arriver entre la limite basse et la limite haute de la fenêtre. Trop tôt ou trop tard, la sortie du watchdog passe à l'état bas et remet le microcontrôleur à zéro. D'après la description de la fiche TI TPS3430-Q1 ; allure sans valeur."
    alt: "Trois chronogrammes l'un sous l'autre, chacun avec une ligne WDI et une ligne WDO. Une bande grisée marque la fenêtre valide. En haut, l'impulsion WDI arrive avant la fenêtre et WDO descend : défaut trop tôt. Au milieu, l'impulsion est dans la fenêtre et WDO reste haut. En bas, aucune impulsion avant la fin de la fenêtre et WDO descend : défaut trop tard."
    origine: areprog
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction
---

## Théorie

### La broche de reset

Sur beaucoup de microcontrôleurs, la broche de reset est active à l'état bas : la tenir basse remet
le circuit à zéro [SOURCÉ : SRC-0056 §3 Connection of RESET Pin on AVR Devices]. Un reset met les
broches en haute impédance, réinitialise les registres et ramène le compteur de programme au début
[SOURCÉ : SRC-0056 §3 Connection of RESET Pin on AVR Devices].

Montage usuel [SOURCÉ : SRC-0056 §3 Connection of RESET Pin on AVR Devices] :

- une résistance de tirage vers l'alimentation, pour éviter un niveau bas parasite ; la résistance interne peut ne pas suffire en milieu bruité ;
- un condensateur vers la masse, en protection supplémentaire contre le bruit ;
- une protection contre les surtensions sur la broche, placée près d'elle.

La valeur de ces composants dépend du microcontrôleur et des outils de programmation
[SOURCÉ : SRC-0056 §3 Connection of RESET Pin on AVR Devices] : on la relève sur la carte de
référence, pas d'après un montage d'exemple. Un bouton de reset se monte avec une résistance en série,
sinon la décharge brutale du condensateur crée des pointes de tension
[SOURCÉ : SRC-0056 §3.1 External RESET Switch].

### Le superviseur de tension

Un superviseur, séparé ou intégré au régulateur, surveille une tension et tient le microcontrôleur en
reset quand elle passe sous un seuil, puis le relâche après un délai à la mise sous tension
[SOURCÉ : SRC-0038 §Output voltage undervoltage reset]. Ce délai laisse l'oscillateur se stabiliser
[SOURCÉ : SRC-0038 §Power-on-reset delay]. Sa sortie est souvent à drain ouvert, avec une
résistance de tirage (S19-L02) [SOURCÉ : SRC-0058 §5 Pin Configuration and Functions].

### Le watchdog

Un watchdog (chien de garde) remet le microcontrôleur à zéro si le programme cesse de le rafraîchir :
dans un watchdog classique, une impulsion doit arriver avant un temps maximal
[SOURCÉ : SRC-0058 §7.3.3 Window Watchdog Timer]. Dans un **watchdog à fenêtre**, employé dans les
applications de sécurité, l'impulsion doit arriver entre une limite basse et une limite haute : trop
tôt est aussi un défaut [SOURCÉ : SRC-0058 §7.3.3 Window Watchdog Timer].

::figure{id=S20-F03}

Le watchdog peut être **interne** au microcontrôleur ou **externe** (circuit séparé ou fonction d'un
SBC, S17-L03). La sortie d'un watchdog externe est par exemple à drain ouvert, active basse
[SOURCÉ : SRC-0058 §5 Pin Configuration and Functions]. Il peut être désactivé pendant le
développement ou la mise sous tension pour éviter des resets non voulus
[SOURCÉ : SRC-0058 §3 Description].

### Lire le reset à l'oscilloscope

- **Reset maintenu bas** : le microcontrôleur ne démarre jamais. Hypothèses : alimentation sous le seuil du superviseur, broche tirée à la masse, superviseur en défaut [HYPOTHÈSE].
- **Reset en boucle** (impulsions régulières) : le microcontrôleur démarre, puis est remis à zéro. Hypothèses : watchdog non rafraîchi (horloge, programme, mode de démarrage), alimentation qui chute à chaque démarrage [HYPOTHÈSE].
- **Reset relâché** : condition remplie ; on passe à la suivante.

La masse de la sonde se relie à la masse de la carte (FE-07) ; on déclenche sur le front du reset,
en mode normal pour voir les répétitions (S11-L03).

### Exemple 7 : période d'un reset en boucle

À l'oscilloscope, la broche de reset descend toutes les 1,6 s [EXEMPLE] pendant quelques millisecondes.

1. Une période régulière évoque un watchdog qui n'est pas rafraîchi [HYPOTHÈSE].
2. Comparer la période à celle du watchdog donnée par la fiche du microcontrôleur ou du SBC [À VÉRIFIER : fiche du composant].
3. Contrôler ensuite l'horloge et le mode de démarrage (S20-L01).

### Exemple 8 : fenêtre du watchdog

Un watchdog à fenêtre a une limite basse de 10 ms et une limite haute de 100 ms [EXEMPLE]. Le programme le rafraîchit toutes les 5 ms [EXEMPLE].

1. 5 ms est avant la limite basse [EXEMPLE] : défaut trop tôt.
2. Le watchdog remet le microcontrôleur à zéro [SOURCÉ : SRC-0058 §7.3.3 Window Watchdog Timer].
3. Un programme qui tourne trop vite est aussi détecté : c'est l'intérêt de la fenêtre.

### Exemple 9 : reset maintenu bas

Contact mis sur banc, le reset du microcontrôleur reste à 0 V [EXEMPLE].

1. Mesurer l'alimentation surveillée par le superviseur, et la comparer à la référence.
2. Hors tension, mesurer la résistance entre la broche de reset et la masse ; comparer à la référence.
3. Conclure seulement sur une mesure qui départage (S01).

## Exercices

::exercice{id=S20-L03-EX01}

::exercice{id=S20-L03-EX02}
