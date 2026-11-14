---
id: S05-L02
titre: Charge et décharge d'un circuit RC, constante de temps
chapitre: S05
version: "0.1"
statut: brouillon
duree_min: 90
objectifs:
  - id: O1
    texte: Calculer la constante de temps τ = R × C d'un circuit RC
    competences: [D2.5]
  - id: O2
    texte: Prévoir la tension d'un condensateur après 1τ à 5τ, en charge comme en décharge
    competences: [D2.5]
  - id: O3
    texte: Estimer la durée d'une décharge avant de manipuler une carte, et la confirmer par une mesure
    competences: [D2.5, D1.3]
prerequis: [S05-L01]
exercices: [S05-L02-EX01, S05-L02-EX02, S05-L02-EX03]
references: [SRC-0009]
criteres_evaluation:
  - objectif: O1
    critere: Exercice S05-L02-EX01 réussi et τ calculé au journal du TP-07
  - objectif: O2
    critere: Exercice S05-L02-EX02 réussi et courbe du TP-07 comparée aux valeurs prévues à 1τ et 5τ
  - objectif: O3
    critere: Exercice S05-L02-EX03 réussi et décharge vérifiée au voltmètre au TP-07
figures:
  - id: S05-F02
    fichier: ../figures/S05-F02-charge-rc.svg
    legende: "Charge d'un condensateur à travers une résistance : la tension monte vite puis de plus en plus lentement vers la tension de la source. Repères à 1τ, 2τ, 3τ et 5τ."
    alt: "Graphique : en abscisse le temps gradué en τ, 2τ, 3τ, 4τ, 5τ ; en ordonnée la tension du condensateur, de 0 à la tension de la source E. La courbe part de 0, monte rapidement puis s'aplatit en approchant E. Un repère horizontal en pointillé marque environ 63 pour cent de E à 1τ."
    origine: areprog
derniere_verification_sources: 2026-11-14
historique:
  - version: "0.1"
    date: 2026-11-14
    resume: Première rédaction
---

## Théorie

### Pourquoi la tension ne saute pas

Un condensateur ne change pas de tension instantanément : il faut lui apporter (ou lui retirer)
de la charge, et la résistance limite le courant qui le fait. Au début de la charge, le
condensateur vide se comporte comme un court-circuit : tout le courant est limité par R ; à la
fin, chargé, il ne laisse plus passer de courant [SOURCÉ : SRC-0009 §Capacitor transient response].

### La constante de temps

La vitesse de charge ou de décharge dépend d'une seule grandeur, la **constante de temps** :

**τ = R × C**, en secondes, avec R en ohms et C en farads [SOURCÉ : SRC-0009 §Voltage and current calculations].

Ordre de grandeur utile : 1 kΩ × 1 µF = 1 ms [EXEMPLE] ; 100 kΩ × 1 000 µF = 100 s [EXEMPLE].

### La règle des 63 %

À chaque constante de temps, la tension se rapproche d'environ 63 % de ce qui lui reste à
parcourir vers sa valeur finale [SOURCÉ : SRC-0009 §Voltage and current calculations].

::figure{id=S05-F02}

| Temps écoulé | Charge : U / E | Décharge : U / U0 |
|---|---|---|
| 1τ | 63 % [SOURCÉ : SRC-0009 §Voltage and current calculations] | 37 % [EXEMPLE : calcul, 100 % − 63 %] |
| 2τ | 86 % [EXEMPLE : calcul avec la formule universelle] | 14 % [EXEMPLE : calcul avec la formule universelle] |
| 3τ | 95 % [EXEMPLE : calcul avec la formule universelle] | 5 % [EXEMPLE : calcul avec la formule universelle] |
| 5τ | 99,3 % [EXEMPLE : calcul avec la formule universelle] | 0,7 % [EXEMPLE : calcul avec la formule universelle] |

On dit souvent qu'un condensateur est « chargé » ou « déchargé » après 5τ. C'est une convention
de calcul, pas une garantie de sécurité : il reste une fraction de la tension, et la valeur
réelle de R et de C peut s'écarter du nominal (tolérance des électrolytiques, fuites).

### La formule universelle

La source donne une formule unique pour toute grandeur qui évolue dans un circuit RC
[SOURCÉ : SRC-0009 §Voltage and current calculations] :

**Variation = (Final − Départ) × (1 − e^(−t / τ))**

- En **charge** depuis 0 : U(t) = E × (1 − e^(−t / τ)).
- En **décharge** depuis U0 : U(t) = U0 × e^(−t / τ).
- Pour trouver le **temps** nécessaire à une tension donnée, on isole t avec le logarithme : t = τ × ln(1 / fraction restante) [SOURCÉ : SRC-0009 §Solving for unknown time].

### Lire une décharge à l'atelier

Une carte coupée de son alimentation garde ses condensateurs chargés ; ils se déchargent à travers
ce qui est relié à leurs bornes. Si ce chemin est très résistant, τ peut être long. D'où la règle
de S01 et de la leçon S05-L01 : **on estime, puis on mesure**. Le calcul dit combien de temps
attendre au minimum ; seul le voltmètre dit que la tension est tombée.

### Exemple 4 : calculer τ

R = 47 kΩ, C = 100 µF [EXEMPLE].

1. τ = 47 000 × 0,000 1 = 4,7 s [EXEMPLE].
2. Charge à 99,3 % au bout de 5τ = 23,5 s [EXEMPLE].

### Exemple 5 : tension après 1τ et 3τ

Le circuit de l'exemple 4 se charge sous 10 V [EXEMPLE], depuis 0 V.

1. À 1τ (4,7 s) : 10 × 0,63 = 6,3 V [EXEMPLE].
2. À 3τ (14,1 s) : 10 × 0,95 = 9,5 V [EXEMPLE].
3. Le condensateur n'atteint jamais exactement 10 V [EXEMPLE] : la courbe s'en approche sans fin.

### Exemple 6 : combien de temps attendre ?

Un condensateur de 470 µF chargé à 24 V se décharge à travers 10 kΩ [EXEMPLE]. On veut moins de 1 V [EXEMPLE] avant de le toucher.

1. τ = 10 000 × 0,000 47 = 4,7 s [EXEMPLE].
2. Fraction restante voulue : 1 / 24 ≈ 0,042 [EXEMPLE].
3. t = 4,7 × ln(24) = 4,7 × 3,18 ≈ 15 s [EXEMPLE].
4. On attend au moins ce temps, **puis** on mesure : si la tension n'est pas tombée, le chemin de décharge n'est pas celui qu'on croit [HYPOTHÈSE].

## Exercices

::exercice{id=S05-L02-EX01}

::exercice{id=S05-L02-EX02}

::exercice{id=S05-L02-EX03}
