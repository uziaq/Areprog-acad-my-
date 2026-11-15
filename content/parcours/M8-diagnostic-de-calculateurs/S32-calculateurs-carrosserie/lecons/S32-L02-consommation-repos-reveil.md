---
id: S32-L02
titre: Consommation au repos et réveil d'un module de carrosserie
chapitre: S32
version: "0.1"
statut: brouillon
duree_min: 90
objectifs:
  - id: O1
    texte: Mesurer la consommation au repos d'un calculateur sur banc sans le réveiller, et l'interpréter par comparaison avec l'exemplaire de référence et avec le budget des composants
    competences: [D10.3]
  - id: O2
    texte: Identifier les sources de réveil d'un calculateur et diagnostiquer un calculateur qui ne s'endort pas ou ne se réveille pas
    competences: [D10.3]
prerequis: [S17-L03, S18-L01, S32-L01]
exercices: [S32-L02-EX01, S32-L02-EX02, S32-L02-EX03]
references: [SRC-0046, SRC-0092, SRC-0093, SRC-0008, SRC-0065]
criteres_evaluation:
  - objectif: O1
    critere: Exercices S32-L02-EX01 et S32-L02-EX02 réussis et consommation au repos relevée au TP-48
  - objectif: O2
    critere: Exercice S32-L02-EX03 réussi et réveil observé au TP-48
figures:
  - id: S32-F02
    fichier: ../figures/S32-F02-courant-repos.svg
    legende: "Allure du courant de borne 30 d'un calculateur après la coupure du contact : fonctionnement, maintien éventuel, passage en veille, courant de repos, puis pic de réveil. Allure de principe sans échelle ; les durées et valeurs se relèvent sur l'exemplaire de référence."
    alt: "Un graphique courant en fonction du temps. Le courant est haut tant que le contact est mis, reste haut pendant un maintien après la coupure, chute à un palier très bas marqué courant de repos, puis remonte brièvement à un réveil."
    origine: areprog
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction
---

## Théorie

### Pourquoi la consommation au repos compte

Un module de carrosserie reste branché sur la borne 30, véhicule arrêté : son courant de repos se
prend sur la batterie pendant toute l'immobilisation [HYPOTHÈSE : budget de consommation au repos à
lire dans la documentation du constructeur]. Un module qui ne s'endort pas, ou qui se réveille sans
cesse, peut décharger la batterie en quelques jours [HYPOTHÈSE : ordre de grandeur, dépend de la
batterie et du courant].

### Le budget des composants

En veille, chaque composant consomme peu, et la fiche le chiffre : beaucoup de SBC descendent sous
100 µA [SOURCÉ : SRC-0046 §Abstract] ; un commutateur high-side multivoies du type cité reste sous 500 nA [SOURCÉ : SRC-0092 §1 Features] ;
une station de base de transpondeur du type cité descend à 0,2 mA en veille [SOURCÉ : SRC-0093 §9.1 Power Supply].
La somme des courants de veille des composants relevés donne un ordre de grandeur ; la référence
mesurée donne la valeur attendue [HYPOTHÈSE : les fuites des condensateurs et des résistances de
tirage s'ajoutent].

### Mesurer sans réveiller

Le multimètre se place en série dans la borne 30 et mesure le courant par la chute de tension de son
shunt [SOURCÉ : SRC-0008 §DC and AC current]. Pour un courant de repos, la méthode de l'académie est
[EXEMPLE : méthode pédagogique de l'académie] :

1. Brancher l'ampèremètre **avant** la mise sous tension, sur le calibre qui supporte le courant de fonctionnement, ou le court-circuiter par un interrupteur pendant le fonctionnement.
2. Mettre sous tension de façon progressive, mettre puis couper la borne 15, débrancher l'outil de diagnostic.
3. Attendre l'endormissement ; ouvrir alors l'interrupteur de court-circuit et passer au calibre le plus sensible.
4. Relever le courant après stabilisation, et la durée entre la coupure de la borne 15 et l'endormissement.

Une coupure du circuit pendant un changement de calibre peut réveiller le calculateur ou le
réinitialiser [HYPOTHÈSE : à constater sur la référence] : d'où l'interrupteur en parallèle. La chute
de tension du shunt sur le calibre sensible doit rester faible devant la tension d'alimentation
[HYPOTHÈSE : à vérifier avec la notice du multimètre].

::figure{id=S32-F02}

### Les sources de réveil

Un SBC se réveille par une broche de réveil local, par un motif de réveil sur le bus CAN, par une
minuterie ou par un message précis [SOURCÉ : SRC-0046 §10 Summary]. Un émetteur-récepteur CAN en veille
surveille le bus avec un faible courant [SOURCÉ : SRC-0065 §5.1.6 Low-Current Bus Monitor, Standby and Sleep Modes].
Sur banc, un bus CAN non terminé ou bruité, une entrée de réveil flottante ou un outil resté branché
peuvent empêcher l'endormissement [HYPOTHÈSE : à départager en retirant les causes une par une].

### Exemple 1 : un budget de repos

Composants relevés : SBC à 60 µA, deux commutateurs high-side à 0,5 µA, station de base de transpondeur à 200 µA, fuites estimées à 40 µA [EXEMPLE].

1. Somme : 60 + 1 + 200 + 40 = 301 µA, soit environ 0,3 mA [EXEMPLE].
2. On mesure 0,32 mA sur la référence : cohérent [EXEMPLE].
3. On mesure 45 mA sur la carte en panne : elle ne s'endort pas, ou un composant consomme anormalement [HYPOTHÈSE].

### Exemple 2 : un module qui ne s'endort pas

Sur banc, le courant reste à 45 mA, une heure après la coupure de la borne 15 [EXEMPLE].

1. Retirer l'outil de diagnostic, vérifier la terminaison du bus du banc, relier les entrées de réveil comme sur la référence.
2. Si le courant reste haut : microcontrôleur actif (horloge présente) ou composant qui chauffe [HYPOTHÈSE].
3. Caméra thermique ou chute de tension pour localiser un composant qui consomme (S18-L02).

### Exemple 3 : la puissance au repos

Courant de repos 20 mA sous 12 V [EXEMPLE].

1. Puissance : 12 V × 0,02 A = 0,24 W [EXEMPLE].
2. On la compare à celle de la référence.
3. L'écart désigne une consommation à localiser, pas encore un composant.

## Exercices

::exercice{id=S32-L02-EX01}

::exercice{id=S32-L02-EX02}

::exercice{id=S32-L02-EX03}
