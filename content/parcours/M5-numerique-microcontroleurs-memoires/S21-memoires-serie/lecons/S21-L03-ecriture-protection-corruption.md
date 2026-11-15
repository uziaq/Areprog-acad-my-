---
id: S21-L03
titre: Écriture, protections et corruption des mémoires
chapitre: S21
version: "0.1"
statut: brouillon
duree_min: 60
objectifs:
  - id: O1
    texte: Expliquer les protections d'écriture d'une mémoire série (validation d'écriture, broche WP, inhibition à la mise sous tension)
    competences: [D7.3]
  - id: O2
    texte: Citer les causes de corruption d'une mémoire et les risques d'une écriture en circuit
    competences: [D7.3, D9.1]
prerequis: [S21-L02]
exercices: [S21-L03-EX01, S21-L03-EX02]
references: [SRC-0059, SRC-0060, SRC-0061]
criteres_evaluation:
  - objectif: O1
    critere: Exercice S21-L03-EX01 réussi et protection d'écriture constatée au TP-30
  - objectif: O2
    critere: Exercice S21-L03-EX02 réussi
figures:
  - id: S21-F03
    fichier: ../figures/S21-F03-pages-repliement.svg
    legende: "Écriture par page dans une EEPROM : les octets envoyés remplissent la page à partir de l'adresse de départ ; au-delà de la fin de la page, le compteur revient au début de la même page et écrase les premiers octets. D'après la description de la fiche onsemi CAT24C256 ; allure sans valeur."
    alt: "Une rangée de cases représentant une page. Une flèche part d'une case au milieu, avance jusqu'à la dernière case, puis revient en boucle à la première case de la même page. Les cases écrasées sont hachurées."
    origine: areprog
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction
---

## Théorie

### Les protections d'écriture

Les mémoires série se protègent contre les écritures involontaires :

- **validation d'écriture** : une Flash SPI démarre interdite d'écriture ; une instruction de validation doit précéder chaque programmation ou effacement, et la validation retombe à la fin de l'opération [SOURCÉ : SRC-0061 §6.5 Write Protection]. Une Microwire démarre aussi interdite d'écriture et demande l'instruction EWEN [SOURCÉ : SRC-0060 §Erase/Write Enable and Disable] ;
- **broche WP** : sur l'EEPROM I²C étudiée, WP haute interdit toute écriture ; en l'air ou à la masse, elle ne protège pas [SOURCÉ : SRC-0059 §Hardware Write Protection]. Sur la Flash, /WP protège les registres d'état [SOURCÉ : SRC-0061 §4.3 Write Protect (/WP)] ;
- **seuil d'alimentation** : sous un seuil de tension, la Flash refuse toute instruction, puis attend un délai après la mise sous tension avant d'accepter une écriture [SOURCÉ : SRC-0061 §6.5 Write Protection].

La lecture reste possible quel que soit l'état de la protection d'écriture
[SOURCÉ : SRC-0060 §Erase/Write Enable and Disable].

### L'écriture par page

Une EEPROM I²C écrit jusqu'à une page à la fois ; si l'on envoie plus d'octets que la page n'en
contient, le compteur revient au début de la page et écrase les premiers octets
[SOURCÉ : SRC-0059 §Page Write]. Pendant le cycle d'écriture interne, la mémoire ne répond plus à son
adresse [SOURCÉ : SRC-0059 §Acknowledge Polling].

::figure{id=S21-F03}

### Corruption et risques

La fiche de la Flash rappelle que le bruit et les conditions anormales du système peuvent compromettre
l'intégrité des données [SOURCÉ : SRC-0061 §6.5 Write Protection]. Causes à retenir
[HYPOTHÈSE : liste d'atelier, chaque cas se prouve par la mesure] :

- coupure ou chute d'alimentation pendant une écriture ou un effacement ;
- tension hors plage, bruit sur les lignes du bus ;
- usure : chaque mémoire supporte un nombre limité de cycles d'effacement et d'écriture, par exemple un million de cycles pour l'EEPROM I²C étudiée [SOURCÉ : SRC-0059 §Reliability Characteristics] et cent mille par secteur pour la Flash étudiée [SOURCÉ : SRC-0061 §2 FEATURES] ;
- écriture involontaire par un outil mal réglé.

Une **écriture en circuit** cumule les risques de la lecture en circuit (S21-L02) et ceux de
l'écriture : une coupure ou un conflit sur le bus en plein cycle peut laisser la mémoire dans un état
incohérent [HYPOTHÈSE]. À l'académie, on n'écrit jamais sans deux sauvegardes identiques archivées, et
jamais sur un calculateur réel avant que le formateur l'ait autorisé (TP-30 sur carte
d'entraînement seulement).

### Exemple 7 : repliement de page

On envoie 70 octets [EXEMPLE] à partir du début d'une page de 64 octets.

1. Les 64 premiers octets remplissent la page.
2. Les 6 suivants reviennent au début de la page et écrasent les 6 premiers [SOURCÉ : SRC-0059 §Page Write].
3. Le contenu final n'est pas celui voulu : on découpe les écritures par page.

### Exemple 8 : écriture refusée

Au TP-30, le programmateur signale un échec d'écriture alors que la lecture fonctionne [EXEMPLE].

1. Hypothèse : broche WP tenue haute sur la carte [HYPOTHÈSE].
2. Mesure : tension de la broche WP par rapport à la masse.
3. Si elle est haute, la protection fonctionne comme prévu ; on ne la contourne qu'avec l'accord du formateur.

### Exemple 9 : usure

Un programme réécrit le même octet toutes les secondes [EXEMPLE] dans une EEPROM d'un million de cycles.

1. 1 000 000 s / 3600 ≈ 278 h [EXEMPLE].
2. Au-delà, l'endurance garantie par la fiche est dépassée [SOURCÉ : SRC-0059 §Reliability Characteristics].
3. Une mémoire usée peut perdre des données ; c'est une hypothèse de panne à prouver, pas une conclusion.

## Exercices

::exercice{id=S21-L03-EX01}

::exercice{id=S21-L03-EX02}
