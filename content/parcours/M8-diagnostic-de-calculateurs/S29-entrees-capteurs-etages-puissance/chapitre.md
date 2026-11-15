---
id: S29
titre: "Entrées capteurs et étages de puissance"
module: M8
duree_h: 8
competences: [D10.1, D10.2]
prerequis: [S28]
lecons: [S29-L01, S29-L02, S29-L03]
tp: [TP-42, TP-43]
sources: [SRC-0081, SRC-0082, SRC-0083, SRC-0084, SRC-0085, SRC-0086, SRC-0087, SRC-0027, SRC-0029, SRC-0013]
version: "0.1"
statut: brouillon
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction (3 leçons, 8 exercices, banque de 25 questions, TP-42, TP-43)
---

Première semaine du module M8, diagnostic de calculateurs. Avant de diagnostiquer un calculateur réel
(S30 à S33), on apprend à lire ses deux bords : les **entrées** des capteurs (inductif, Hall,
ratiométrique, sonde lambda) et les **sorties** de puissance (low-side, high-side protégé, pont en H,
commande d'injecteur et survoltage). Tout s'appuie sur des fiches publiques de circuits génériques et se
mesure sur carte d'entraînement : ces circuits ne sont pas forcément ceux d'un calculateur donné, qui
se relèvent sur sa carte.

Organisation conseillée des 8 h : leçons (4 h), exercices (30 min), TP-42 (1 h 30), TP-43 (2 h) [HYPOTHÈSE : répartition à ajuster selon la carte d'entraînement].


## Mesures attendues et tolérances

**TP-42.** La résistance série du capteur inductif vaut au moins la tension crête divisée par 3 mA [SOURCÉ : SRC-0081 §INPUT CURRENT LIMITING].
La sortie Hall ne monte jamais sans résistance de tirage [SOURCÉ : SRC-0082 §7.1 Overview].
Le rapport signal sur alimentation d'un capteur ratiométrique reste
le même quand l'alimentation varie [SOURCÉ : SRC-0027 §Sensors that Are Ratiometric to the Supply Voltage].
Le gain de l'interface lambda vaut 4,5 pour le circuit cité [SOURCÉ : SRC-0083 §CIRCUIT DESCRIPTION], à
la précision de sa fiche près plus l'incertitude du multimètre.

**TP-43.** Un high-side coupé avec sa charge donne 0 V en sortie [SOURCÉ : SRC-0084 §7.3.4.2 Open-Load Detection] ;
sans charge, une tension proche de l'alimentation et un défaut de charge ouverte [SOURCÉ : SRC-0084 §7.3.4.2 Open-Load Detection]. Le courant
calculé par la mesure de courant (rapport K typique de 500) [SOURCÉ : SRC-0084 §6.5 Electrical Characteristics]
et le courant lu à la pince concordent dans la somme de leurs incertitudes. L'impulsion de coupure au
drain du low-side est écrêtée à la tension de la fiche [SOURCÉ : SRC-0085 §MAXIMUM RATINGS].

## Erreurs fréquentes

- **Mesurer le capteur inductif sur la broche du circuit.** Détection : la tension y est écrêtée ; mesure faite avant la résistance série [SOURCÉ : SRC-0081 §OPERATION OF ZERO CROSSING DETECTOR].
- **Conclure qu'un capteur Hall est mort sans contrôler la résistance de tirage.** Détection : mesure de la résistance de tirage hors tension.
- **Juger un capteur ratiométrique sur sa seule tension de signal.** Détection : alimentation du capteur relevée en même temps, rapport calculé.
- **Prendre une tension lambda figée pour une sonde morte.** Détection : chauffage et continuité contrôlés ; la sortie par défaut couvre sonde froide et fil coupé [SOURCÉ : SRC-0083 §OPEN INPUT PINS DEFAULTS].
- **Confondre low-side et high-side.** Détection : position du transistor sur le schéma, puis tension de sortie coupée, charge présente.
- **Poser la masse d'une sonde sur un nœud flottant.** Détection : sonde différentielle ou deux voies en soustraction (FE-07).
- **Utiliser une pince AC pour un courant de commande.** Détection : pince mesurant le continu, zéro réglé avant la mesure.
- **Croire que des transformateurs commandent les injecteurs.** Détection : transistor de sortie avec écrêtage, convertisseur élévateur en injection directe (E-09).

## Lien atelier

Sur un calculateur qui revient de l'atelier, la panne se trouve souvent à un bord : une entrée de
capteur détruite par une surtension du faisceau, une sortie de puissance claquée par une charge en
court-circuit [HYPOTHÈSE : à confirmer sur les dossiers de l'atelier]. Reconnaître le type d'interface,
savoir ce que la fiche prévoit dans chaque état et mesurer au bon endroit permet de distinguer un
composant en défaut d'un défaut du faisceau ou de la charge. Une sortie claquée remplacée sans chercher
la charge qui l'a détruite claque de nouveau (cas VID-12, remarque E-28 du catalogue).

## Sécurité spécifique

- Alimentation de laboratoire limitée en courant, limite écrite avant la mise sous tension (FE-02) ; polarité vérifiée (FE-03).
- Masse des sondes sur la masse de la carte, jamais sur un nœud flottant [SOURCÉ : SRC-0029 §Use Proper Grounding Procedures] (FE-07) ; nœuds flottants à la sonde différentielle [SOURCÉ : SRC-0029 §Floating Measurements].
- Pince de courant dans ses limites (continu plus crête, crête impulsionnelle) [SOURCÉ : SRC-0029 §Maximum Input Current Rating (current probes)].
- Étages survoltés des calculateurs réels : décharge mesurée avant tout contact, puis mesurée de nouveau [SOURCÉ : SRC-0013 §2-7 Restriking Voltage] (FE-09). Aucun étage survolté réel dans les TP de la semaine.
- Fautes éliminatoires de la semaine : FE-01 à FE-04, FE-07, FE-09, et pour le module M8 FE-13 (composant remplacé sans mesure qui le justifie) et FE-14 (donnée inventée présentée comme un fait).
