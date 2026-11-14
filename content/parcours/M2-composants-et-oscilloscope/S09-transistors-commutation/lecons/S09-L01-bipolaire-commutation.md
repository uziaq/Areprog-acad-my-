---
id: S09-L01
titre: Le transistor bipolaire en commutation
chapitre: S09
version: "0.1"
statut: brouillon
duree_min: 90
objectifs:
  - id: O1
    texte: Expliquer le blocage et la saturation d'un transistor NPN commandé par son courant de base
    competences: [D4.4]
  - id: O2
    texte: Dimensionner la résistance de base d'un NPN qui commande une charge et calculer sa dissipation
    competences: [D4.4]
  - id: O3
    texte: Tester un transistor bipolaire au multimètre et retrouver sa base et son type (NPN ou PNP)
    competences: [D4.4, D4.2]
prerequis: [S08-L01]
exercices: [S09-L01-EX01, S09-L01-EX02, S09-L01-EX03]
references: [SRC-0019]
criteres_evaluation:
  - objectif: O1
    critere: Questions du QCM sur le blocage et la saturation réussies et VCE(sat) relevée au TP-13
  - objectif: O2
    critere: Exercices S09-L01-EX01 et EX02 réussis et résistance de base justifiée au journal du TP-13
  - objectif: O3
    critere: Exercice S09-L01-EX03 réussi et transistor du TP-13 testé avant montage
figures:
  - id: S09-F01
    fichier: ../figures/S09-F01-npn-commutation.svg
    legende: "Un transistor NPN commande une charge côté masse. La sortie de commande fournit le courant de base à travers la résistance RB ; le courant de la charge passe du collecteur à l'émetteur."
    alt: "Schéma : une alimentation positive, une charge, puis le collecteur d'un transistor NPN dont l'émetteur va à la masse. À gauche, une sortie de commande passe par une résistance RB et arrive sur la base. Des flèches marquent le courant de base IB et le courant de collecteur IC."
    origine: areprog
derniere_verification_sources: 2026-11-14
historique:
  - version: "0.1"
    date: 2026-11-14
    resume: Première rédaction
---

## Théorie

### Un interrupteur commandé par un courant

Un transistor bipolaire a trois broches : la **base**, le **collecteur** et l'**émetteur**. Le
courant commandé passe entre le collecteur et l'émetteur ; le courant de commande passe entre la
base et l'émetteur. Un petit courant de base permet un courant de collecteur bien plus grand
[SOURCÉ : SRC-0019 §The transistor as a switch].

::figure{id=S09-F01}

En commutation, on n'utilise que deux états [SOURCÉ : SRC-0019 §The transistor as a switch] :

- **Blocage** : aucun courant de base, aucun courant de collecteur ; le transistor est un interrupteur ouvert.
- **Saturation** : le courant de collecteur est le plus grand que permettent l'alimentation et la charge ; le transistor est un interrupteur fermé.

Entre les deux se trouve le mode **actif**, où le transistor freine le courant ; c'est celui des
amplificateurs, pas celui de la commutation [SOURCÉ : SRC-0019 §Active mode operation].

### Le rapport β et pourquoi on sature franchement

En mode actif, le courant de collecteur vaut β fois le courant de base : β = IC / IB, aussi noté
hFE [SOURCÉ : SRC-0019 §Active mode operation]. Ce rapport varie beaucoup : d'un exemplaire à
l'autre, avec le courant et avec la température ; un facteur 3 entre deux conditions de
fonctionnement n'a rien d'exceptionnel [SOURCÉ : SRC-0019 §Active mode operation].

D'où la règle de la commutation : on calcule le courant de base avec le **β minimal** de la fiche
technique, au courant de collecteur prévu, puis on prend de la marge. Si le courant de base est
trop faible, le transistor reste en mode actif : il chauffe et la charge est mal alimentée.

### Tension de saturation et dissipation

- Saturé, le transistor garde une petite tension entre collecteur et émetteur, VCE(sat), en général 0,3 V ou moins selon le type ; elle baisse quand le courant de base augmente [SOURCÉ : SRC-0019 §Transistor ratings and packages].
- La jonction base-émetteur se comporte comme une diode : environ 0,7 V en conduction [SOURCÉ : SRC-0019 §Transistor ratings and packages].
- La puissance dissipée vaut IC × VCE [SOURCÉ : SRC-0019 §Transistor ratings and packages]. Saturé, VCE est faible et la puissance aussi ; en mode actif, VCE est grande et la puissance dissipée peut dépasser la limite avant même le courant maximal [SOURCÉ : SRC-0019 §Transistor ratings and packages].
- La fiche donne aussi les tensions inverses maximales VCE, VCB et VEB ; la VCE maximale compte en commutation, surtout avec une charge inductive [SOURCÉ : SRC-0019 §Transistor ratings and packages].

### Dimensionner la résistance de base

Pour une sortie de commande de tension U_cmd :

1. Courant de collecteur : IC = tension de la charge / résistance de la charge.
2. Courant de base minimal : IB min = IC / β min (fiche technique).
3. Courant de base retenu : IB min multiplié par une marge choisie, pour saturer franchement.
4. RB = (U_cmd − VBE) / IB, puis une valeur normalisée **inférieure** (série E12, S02), pour garder au moins ce courant.
5. Vérifier que la sortie de commande peut fournir ce courant (fiche du circuit de commande).

### Tester un transistor bipolaire au multimètre

Au test de jonction, un transistor bipolaire se comporte comme **deux diodes tête-bêche** reliées
par la base [SOURCÉ : SRC-0019 §Meter check of a transistor] :

- La base est la broche commune aux deux mesures qui conduisent.
- Pointe rouge sur la base pour conduire : NPN ; pointe noire sur la base : PNP [SOURCÉ : SRC-0019 §Meter check of a transistor].
- La jonction base-émetteur affiche une tension un peu plus élevée que la jonction base-collecteur, ce qui permet de distinguer l'émetteur du collecteur [SOURCÉ : SRC-0019 §Meter check of a transistor].
- Sur les six combinaisons de pointes, exactement deux conduisent ; plus ou moins de deux signale un transistor défectueux, ou un composant qui n'est pas un bipolaire [SOURCÉ : SRC-0019 §Meter check of a transistor].
- La broche du milieu n'est pas forcément la base : le brochage n'est pas normalisé et se lit dans la fiche technique [SOURCÉ : SRC-0019 §Meter check of a transistor].

Comme pour la diode (S08-L01), ce test se fait hors circuit pour conclure.

### Exemple 1 : résistance de base d'une commande de relais

Une bobine de relais de 12 V et 120 Ω est commandée par un NPN depuis une sortie de 5 V [EXEMPLE]. La fiche donne un β minimal de 50 à ce courant [EXEMPLE].

1. IC = 12 / 120 = 0,1 A [EXEMPLE].
2. IB min = 0,1 / 50 = 2 mA [EXEMPLE].
3. Avec une marge de 2, choisie pour l'exemple : IB = 4 mA [EXEMPLE].
4. RB = (5 − 0,7) / 0,004 = 1 075 Ω [EXEMPLE] ; on prend 1 kΩ dans la série E12 [EXEMPLE], soit 4,3 mA [EXEMPLE].
5. La bobine est inductive : une diode de roue libre est montée à ses bornes (S05-L03, S08-L03).

### Exemple 2 : saturé ou pas, la différence en chaleur

Même montage, IC = 0,1 A [EXEMPLE].

1. Saturé, avec VCE(sat) = 0,3 V [EXEMPLE] : P = 0,1 × 0,3 = 0,03 W [EXEMPLE].
2. Mal commandé, le transistor reste en mode actif avec VCE = 6 V et 50 mA [EXEMPLE] : P = 0,05 × 6 = 0,3 W [EXEMPLE], dix fois plus, et le relais risque de ne pas coller.
3. Conclusion de dépanneur : un transistor de commande qui chauffe alors que sa charge est faible fait penser à un manque de courant de base [HYPOTHÈSE], à vérifier en mesurant VCE et VBE.

### Exemple 3 : identifier un transistor inconnu

Hors circuit, au test de jonction, on obtient [EXEMPLE] : broches 1 et 2, dépassement dans les deux sens ; rouge sur 2 et noire sur 1 : 0,68 V ; rouge sur 2 et noire sur 3 : 0,64 V ; les autres combinaisons affichent un dépassement.

1. Deux mesures conduisent : le transistor peut être sain.
2. La broche commune est la 2 : c'est la base ; la pointe rouge y est : c'est un NPN.
3. La plus forte tension, 0,68 V [EXEMPLE], désigne la jonction base-émetteur : l'émetteur est la broche 1, le collecteur la broche 3.
4. On confirme avec la fiche technique de la référence marquée sur le boîtier.

## Exercices

::exercice{id=S09-L01-EX01}

::exercice{id=S09-L01-EX02}

::exercice{id=S09-L01-EX03}
