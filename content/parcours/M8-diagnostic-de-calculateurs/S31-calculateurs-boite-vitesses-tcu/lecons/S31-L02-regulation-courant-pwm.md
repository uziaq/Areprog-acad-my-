---
id: S31-L02
titre: La commande d'électrovanne régulée en courant
chapitre: S31
version: "0.1"
statut: brouillon
duree_min: 120
objectifs:
  - id: O1
    texte: Expliquer pourquoi une électrovanne est régulée en courant et comment la régulation par découpage fonctionne (charge, recirculation, crête puis maintien, coupure rapide)
    competences: [D10.3]
  - id: O2
    texte: Mesurer une commande d'électrovanne régulée en courant à la pince de courant et à l'oscilloscope, et comparer le courant mesuré au courant donné par la recopie de courant du circuit
    competences: [D10.3]
prerequis: [S29-L02, S11, S31-L01]
exercices: [S31-L02-EX01, S31-L02-EX02, S31-L02-EX03]
references: [SRC-0089, SRC-0035, SRC-0029]
criteres_evaluation:
  - objectif: O1
    critere: Exercices S31-L02-EX01 et S31-L02-EX02 réussis
  - objectif: O2
    critere: Exercice S31-L02-EX03 réussi et courant d'électrovanne relevé et comparé au TP-46
figures:
  - id: S31-F02
    fichier: ../figures/S31-F02-courant-electrovanne.svg
    legende: "Allure du courant d'une électrovanne régulée en courant : montée jusqu'au courant de crête, régulation autour de la crête pendant le temps de crête, descente en recirculation jusqu'au courant de maintien, régulation par découpage autour du maintien, puis coupure rapide. Allure de principe d'après la fiche citée, sans échelle."
    alt: "Un graphique courant en fonction du temps. Le courant monte, oscille en dents de scie autour d'un palier haut marqué crête, redescend vers un palier bas marqué maintien où il oscille aussi, puis chute rapidement à zéro à la coupure."
    origine: areprog
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction
---

## Théorie

### Pourquoi réguler le courant

La force d'une électrovanne dépend du courant dans sa bobine [HYPOTHÈSE : principe électromagnétique,
à confirmer dans la documentation de l'électrovanne]. Or la résistance du cuivre augmente avec la
température : son coefficient vaut 0,004041 par degré à 20 °C [SOURCÉ : SRC-0035 §Temperature coefficient of resistance].
À tension fixe, une bobine qui chauffe dans l'huile chaude laisse passer moins de courant ; un circuit
qui **règle le courant** garde la force voulue quelle que soit la température de la bobine et la
tension de la batterie [HYPOTHÈSE : conséquence de la loi d'Ohm, à constater au TP-46].

### Charge, recirculation, coupure rapide

Le circuit cité commande chaque bobine par un demi-pont modifié : un transistor côté masse **charge**
la bobine, des transistors côté alimentation la font **recirculer** pendant le découpage et assurent la
**coupure rapide** par écrêtage [SOURCÉ : SRC-0089 §6.3.3 Output Driver]. À la coupure, l'écrêtage
impose une tension élevée aux bornes de la charge pour faire chuter son courant rapidement [SOURCÉ : SRC-0089 §6.3.5.4 Quick Turn Off].

### Crête puis maintien

En régulation interne, le courant monte d'abord jusqu'au **courant de crête**, y est régulé pendant le
**temps de crête**, redescend en recirculation jusqu'au **courant de maintien**, puis y est régulé
jusqu'à la coupure [SOURCÉ : SRC-0089 §6.3.5.1 Internal Regulation Mode]. La régulation se fait cycle
par cycle, d'après la mesure du courant [SOURCÉ : SRC-0089 §6.3.5.1 Internal Regulation Mode].

::figure{id=S31-F02}

La fréquence de découpage du circuit cité se règle de 500 Hz à 20 kHz [SOURCÉ : SRC-0089 §6.3.5.5 PWM Frequency],
avec un dither de fréquence optionnel. Le rapport cyclique attendu s'estime par :
courant de maintien / (tension d'alimentation minimale / résistance de la bobine) [SOURCÉ : SRC-0089 §6.3.5.6 Minimum and Maximum Duty Cycle].
Le profil (crête, maintien, temps) d'une électrovanne donnée vient de sa documentation et du logiciel
du calculateur, pas de la fiche du circuit [À VÉRIFIER : documentation de l'électrovanne et de la boîte étudiées].

### La recopie de courant

Le circuit cité mesure le courant par recopie, sans résistance de mesure, et le restitue sur une
broche : le courant de cette broche vaut le courant de charge divisé par un facteur typique de 20 000 [SOURCÉ : SRC-0089 §5.5 Electrical Characteristics].
Traversant une résistance extérieure, il donne une tension proportionnelle au courant de la bobine.
Pour d'autres circuits, le facteur et la méthode se lisent dans leur fiche (S29-L02).

### Mesurer une commande d'électrovanne

- **Pince de courant** mesurant le continu, zéro réglé, refermée sur un fil de la bobine : c'est la mesure directe du profil [SOURCÉ : SRC-0029 §Maximum Input Current Rating (current probes)].
- **Oscilloscope** sur la sortie côté masse de la bobine : on y voit le découpage et l'impulsion de coupure rapide ; la sonde doit supporter cette tension.
- **Recopie de courant** au multimètre ou à l'oscilloscope, convertie avec le facteur de la fiche.
- Le courant **moyen** se compare à la consigne ; les ondulations autour de la crête et du maintien sont normales [SOURCÉ : SRC-0089 §6.3.5.1 Internal Regulation Mode].

Diagnostics du circuit : à l'état passant, il surveille le cycle de découpage et les temps de montée
et de descente [SOURCÉ : SRC-0089 §6.3.7.1 On State Diagnostics] ; à l'état bloqué, il détecte une
sortie ouverte ou en court-circuit à la masse [SOURCÉ : SRC-0089 §6.3.7.2 Off-state Diagnostics].

### Exemple 1 : la bobine chaude

Une bobine fait 10 Ω à 20 °C ; dans l'huile, elle monte à 120 °C [EXEMPLE].

1. R = 10 × (1 + 0,004041 × 100) ≈ 14,0 Ω [EXEMPLE].
2. À 12 V fixes, le courant passerait de 1,2 A à environ 0,86 A [EXEMPLE].
3. Un circuit régulé en courant garde le courant de maintien voulu tant que la tension disponible suffit [HYPOTHÈSE].

### Exemple 2 : estimer le rapport cyclique

Courant de maintien 0,5 A, alimentation minimale 12 V, bobine de 6 Ω [EXEMPLE].

1. Courant maximal possible : 12 / 6 = 2 A [EXEMPLE].
2. Rapport cyclique estimé : 0,5 / 2 = 0,25, soit 25 % [SOURCÉ : SRC-0089 §6.3.5.6 Minimum and Maximum Duty Cycle].
3. Un rapport mesuré très différent fait penser à une bobine de résistance anormale [HYPOTHÈSE].

### Exemple 3 : lire la recopie de courant

Courant de bobine 1 A, facteur 20 000, résistance de recopie 10 kΩ [EXEMPLE].

1. Courant de recopie : 1 A / 20 000 = 50 µA [EXEMPLE].
2. Tension : 50 µA × 10 kΩ = 0,5 V [EXEMPLE].
3. On la compare au courant lu à la pince, dans la précision du facteur donnée par la fiche [SOURCÉ : SRC-0089 §5.5 Electrical Characteristics].

## Exercices

::exercice{id=S31-L02-EX01}

::exercice{id=S31-L02-EX02}

::exercice{id=S31-L02-EX03}
