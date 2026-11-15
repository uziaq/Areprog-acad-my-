---
id: S17-L03
titre: SBC, réveil, calculateurs liés à la sécurité et vernis
chapitre: S17
version: "0.1"
statut: brouillon
duree_min: 90
objectifs:
  - id: O1
    texte: Expliquer le rôle d'un circuit d'alimentation intégré de type SBC et les modes de réveil d'un calculateur (borne 15, broche WAKE, bus)
    competences: [D6.3]
  - id: O2
    texte: Classer un calculateur comme lié ou non à la sécurité et appliquer la règle de l'académie correspondante
    competences: [D10.6]
  - id: O3
    texte: Identifier la famille d'un vernis de tropicalisation et préparer son retrait local en sécurité
    competences: [D9.3, D9.1]
prerequis: [S17-L02]
exercices: [S17-L03-EX01, S17-L03-EX02]
references: [SRC-0045, SRC-0046, SRC-0048, SRC-0047]
criteres_evaluation:
  - objectif: O1
    critere: Exercice S17-L03-EX01 réussi et SBC ou régulateurs repérés au TP-23
  - objectif: O2
    critere: Exercice S17-L03-EX02 réussi, questions de sécurité du QCM réussies et famille du calculateur notée au TP-23
  - objectif: O3
    critere: Famille du vernis identifiée et retrait local propre à la séance FR-13
figures:
  - id: S17-F03
    fichier: ../figures/S17-F03-sbc.svg
    legende: "Schéma de principe d'un SBC, d'après la note TI SPRT815 : alimentation intégrée (régulateurs), émetteur-récepteur CAN ou LIN, supervision (chien de garde, reset), broche WAKE et liaison SPI avec le microcontrôleur. Schéma générique, pas celui d'un composant réel."
    alt: "Un grand rectangle marqué SBC. À gauche, une entrée batterie et une entrée WAKE. À l'intérieur, trois blocs : régulateurs, émetteur-récepteur CAN ou LIN, supervision. À droite, les sorties des régulateurs, le reset et une liaison SPI vers un rectangle marqué microcontrôleur ; en bas, les fils du bus CAN."
    origine: areprog
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction
---

## Théorie

### Le SBC, un circuit d'alimentation intégré

Un *system basis chip* (SBC) réunit dans un seul boîtier des régulateurs, un émetteur-récepteur de
bus CAN ou LIN et des fonctions de surveillance [SOURCÉ : SRC-0045 §Introduction] :

- **alimentation** : un ou plusieurs régulateurs buck ou LDO alimentés par la batterie, pour le microcontrôleur et les autres composants [SOURCÉ : SRC-0045 §Introduction] ;
- **émetteur-récepteur** CAN ou LIN, relié au bus du véhicule (S23 à S25) [SOURCÉ : SRC-0045 §Introduction] ;
- **supervision** : chien de garde et broche de reset, qui interrompent le microcontrôleur en cas de défaut matériel [SOURCÉ : SRC-0045 §Introduction] ;
- **broches WAKE** et modes basse consommation [SOURCÉ : SRC-0045 §Introduction].

::figure{id=S17-F03}

Certains SBC sont conçus pour la sécurité fonctionnelle : avec leurs surveillances intégrées, ils
aident à atteindre les niveaux d'intégrité de sécurité les plus élevés, jusqu'à ASIL D
[SOURCÉ : SRC-0048 §1 Introduction]. La sécurité fonctionnelle des véhicules relève de la norme
ISO 26262 [À VÉRIFIER : contenu de l'ISO 26262, non consultée].

Au relevé, un SBC se reconnaît à son marquage et à sa fiche ; sans fiche, on ne déduit pas son
brochage [À VÉRIFIER : fiche du composant relevé sur la carte].

### Dormir et se réveiller

Un calculateur branché en permanence sur la borne 30 doit consommer très peu quand le véhicule est à
l'arrêt. Beaucoup de SBC descendent sous 100 µA en mode veille [SOURCÉ : SRC-0046 §Abstract].
Ils se réveillent de plusieurs façons [SOURCÉ : SRC-0046 §10 Summary] :

- **réveil local** par une broche WAKE, qui supporte la tension de la batterie, sur un front ou une impulsion d'une durée minimale [SOURCÉ : SRC-0046 §3 Local Wake Up (LWU)] ;
- **réveil par le bus** : un motif de réveil sur le bus CAN [SOURCÉ : SRC-0046 §8 CAN BWRR] ;
- réveil cyclique par minuterie, ou réveil sélectif sur un message précis [SOURCÉ : SRC-0046 §10 Summary].

La borne 15 reliée à une entrée de réveil est un montage courant [HYPOTHÈSE : à vérifier sur le relevé de chaque carte].
Après la coupure du contact, certains calculateurs restent alimentés un moment pour terminer leurs
tâches, puis se rendorment : c'est le **maintien** [À VÉRIFIER : principe et durée dans la documentation du constructeur du calculateur étudié].

### Les calculateurs liés à la sécurité

Règle de l'académie (catalogue des TP, décision du 13/11/2026) : les calculateurs d'**airbag**,
d'**ABS / ESP** et de **direction assistée** sont diagnostiqués et réparés dans le module M9 (S35 à
S39), après le jalon 3, avec le protocole renforcé. Les ECU moteur (S29, S30), TCU (S31) et BCM, BSI,
FRM ou CAS (S32) suivent le protocole commun calculateurs réels, à partir de S18.

Conséquences dès cette semaine :

- un calculateur de récupération d'airbag, d'ABS / ESP ou de direction ne sert **pas** au TP-23 : il est mis de côté jusqu'au module M9 ;
- aucun module d'airbag, prétensionneur ou autre élément pyrotechnique n'entre dans l'atelier de formation (catalogue des TP, protocole renforcé, point 1) ;
- le classement se fait d'après l'étiquette et la documentation, et se note au journal.

### Le vernis de tropicalisation

Beaucoup de cartes sont couvertes d'un vernis qui les protège de l'humidité. Pour choisir le
retrait, il faut d'abord identifier sa famille [SOURCÉ : SRC-0047 §Coating Types & Identification] :

- **acrylique** : brillant, réagit à la chaleur, se dissout bien dans les solvants courants ;
- **silicone** : semi-brillant, caoutchouteux, mou, se gratte facilement ;
- **polyuréthane** : brillant, dur, plus résistant aux solvants que l'acrylique ;
- **époxy** et **parylène** : durs, résistants aux solvants ; retrait mécanique (grattage, abrasion).

Tests d'identification, toujours dans une zone non critique : dureté, transparence, solubilité
(une goutte d'alcool isopropylique au pinceau) et aspect [SOURCÉ : SRC-0047 §4 Ways to Test Your Coating:].
L'alcool isopropylique est en général trop faible pour dissoudre un vernis
[SOURCÉ : SRC-0047 §Step-by-Step: Removal by Chemical Solvent]. La chaleur seule ne suffit pas et
ajoute une contrainte thermique aux composants [SOURCÉ : SRC-0047 §The Best Ways to Remove Conformal Coating].

Retrait local au solvant [SOURCÉ : SRC-0047 §Procedure A: Coating Removal for Isolated Areas] :

1. Masquer les zones sensibles ou délimiter la zone au ruban polyimide.
2. Imbiber un stylo de retrait, un pinceau ou un écouvillon en polyester ; éviter les brosses en nylon qui créent de l'électricité statique.
3. Frotter la zone ; laisser agir le solvant si nécessaire ; essuyer l'accumulation de vernis.

Protections : très bonne ventilation, gants résistants aux solvants (nitrile), lunettes de
protection [SOURCÉ : SRC-0047 §Step-by-Step: Removal by Chemical Solvent], et lecture de la fiche de
données de sécurité de chaque produit avant usage (catalogue des TP, sécurité chimique). La plupart
des vernis contiennent un traceur visible sous lampe UV, qui permet de contrôler le retrait
[SOURCÉ : SRC-0047 §Step-by-Step: Removal by Chemical Solvent].

### Exemple 7 : identifier le réveil d'un calculateur

Au relevé, la broche 15 du connecteur rejoint, par une résistance, une broche d'un circuit intégré marqué comme un SBC dans sa fiche ; la fiche nomme cette broche WAKE [EXEMPLE].

1. Le calculateur se réveille probablement quand le contact est mis [HYPOTHÈSE].
2. Il peut aussi se réveiller par le bus CAN, si son SBC le permet ; c'est la fiche qui le dit.
3. On note les deux voies de réveil au journal, avec leur preuve.

### Exemple 8 : classer trois calculateurs

Trois calculateurs de récupération arrivent : une gestion moteur, un calculateur d'airbag, un module d'habitacle (BSI) [EXEMPLE].

1. Airbag : mis de côté jusqu'au module M9 ; il ne sert pas au TP-23.
2. Gestion moteur et BSI : utilisables au TP-23, carte non alimentée.
3. Classement et décision écrits au journal.

### Exemple 9 : un vernis qui ne part pas

Sur une carte, une goutte d'alcool isopropylique ne change rien au vernis ; il est brillant et dur [EXEMPLE].

1. L'alcool isopropylique est souvent trop faible : le test ne suffit pas à conclure [SOURCÉ : SRC-0047 §Step-by-Step: Removal by Chemical Solvent].
2. Hypothèse : polyuréthane ou époxy [HYPOTHÈSE].
3. Essayer un dissolvant de vernis adapté dans une zone non critique, après lecture de sa fiche de données de sécurité ; si rien ne part, retrait mécanique local.

## Exercices

::exercice{id=S17-L03-EX01}

::exercice{id=S17-L03-EX02}
