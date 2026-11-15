---
id: S11-L01
titre: Bande passante, temps de montée et échantillonnage
chapitre: S11
version: "0.1"
statut: brouillon
duree_min: 75
objectifs:
  - id: O1
    texte: Choisir la bande passante et le temps de montée d'oscilloscope nécessaires pour un signal donné
    competences: [D3.3]
  - id: O2
    texte: Calculer la fréquence d'échantillonnage minimale et reconnaître un affichage replié (aliasing)
    competences: [D3.3]
prerequis: [S06-L03, S10-L03]
exercices: [S11-L01-EX01, S11-L01-EX02, S11-L01-EX03]
references: [SRC-0014, SRC-0028]
criteres_evaluation:
  - objectif: O1
    critere: Exercice S11-L01-EX01 réussi et bande passante de l'oscilloscope de l'atelier relevée au journal du TP-17
  - objectif: O2
    critere: Exercices S11-L01-EX02 et EX03 réussis
figures:
  - id: S11-F01
    fichier: ../figures/S11-F01-repliement.svg
    legende: "Repliement : un signal rapide échantillonné trop lentement. Les points d'échantillonnage, reliés entre eux, dessinent un signal beaucoup plus lent qui n'existe pas."
    alt: "Une sinusoïde rapide en trait fin, avec des points d'échantillonnage espacés régulièrement. Une courbe en trait épais passe par ces points et forme une sinusoïde lente, marquée signal affiché."
    origine: areprog
derniere_verification_sources: 2026-11-14
historique:
  - version: "0.1"
    date: 2026-11-14
    resume: Première rédaction
---

## Théorie

### La bande passante

La bande passante d'un oscilloscope est la fréquence à laquelle une sinusoïde est affichée avec
70,7 % de son amplitude réelle, le point à −3 dB [SOURCÉ : SRC-0014 §Bandwidth]. Au-delà,
l'amplitude est faussée, les fronts s'arrondissent, les détails disparaissent
[SOURCÉ : SRC-0014 §Bandwidth].

Pour mesurer correctement une amplitude, la note Tektronix donne la **règle des 5 fois** : bande
passante au moins égale à 5 fois la plus haute fréquence présente dans le signal, ce qui donne
moins de ±2 % d'erreur [SOURCÉ : SRC-0014 §Bandwidth].

Un signal carré, comme une commande en PWM, n'est pas une seule fréquence : c'est une somme
d'harmoniques impaires de sa fréquence fondamentale [SOURCÉ : SRC-0028 §Square wave signals].
Plus on veut voir des fronts raides, plus il faut d'harmoniques, donc de bande passante.

### Le temps de montée

Pour des impulsions et des fronts, on raisonne en temps de montée [SOURCÉ : SRC-0014 §Rise Time] :

- temps de montée de l'oscilloscope au plus égal au cinquième du temps de montée le plus rapide du signal [SOURCÉ : SRC-0014 §Rise Time] ;
- bande passante = k / temps de montée, avec k proche de 0,35 pour un oscilloscope de moins de 1 GHz [SOURCÉ : SRC-0014 §Rise Time].

### L'échantillonnage

Un oscilloscope numérique prend des échantillons du signal à une **fréquence d'échantillonnage**,
en échantillons par seconde [SOURCÉ : SRC-0014 §Sample Rate].

- Le théorème de Nyquist demande d'échantillonner au moins deux fois plus vite que la plus haute fréquence du signal ; mais il suppose un enregistrement infini, et en pratique deux fois ne suffit généralement pas [SOURCÉ : SRC-0014 §Sample Rate].
- Avec l'interpolation sin(x)/x, il faut au moins 2,5 fois la plus haute fréquence ; avec l'interpolation linéaire, au moins 10 fois [SOURCÉ : SRC-0014 §Sample Rate].
- La fréquence d'échantillonnage affichée change avec la base de temps : sur une base de temps lente, elle baisse [SOURCÉ : SRC-0014 §Sample Rate].

::figure{id=S11-F01}

### Le repliement (aliasing)

Si l'échantillonnage est trop lent, les composantes rapides se « replient » en une fréquence plus
basse : l'écran montre un signal qui n'existe pas [SOURCÉ : SRC-0014 §Real-time Sampling Method].
Signes qui doivent alerter [HYPOTHÈSE : méthode de vérification habituelle] :

- la fréquence affichée change quand on change la base de temps ;
- une fréquence mesurée sans rapport avec ce que le circuit est censé produire.

Le remède : base de temps plus rapide, ou mode d'acquisition qui garde les pointes (détection de
crête), selon l'oscilloscope [À VÉRIFIER : modes d'acquisition de l'oscilloscope de l'atelier, dans sa notice].

### Exemple 1 : bande passante pour une PWM

On veut observer une commande PWM de 20 kHz jusqu'à sa 9ᵉ harmonique [EXEMPLE].

1. Plus haute fréquence à voir : 9 × 20 = 180 kHz [EXEMPLE].
2. Règle des 5 fois : bande passante d'au moins 5 × 180 = 900 kHz [EXEMPLE].
3. Un oscilloscope d'atelier de quelques dizaines de mégahertz convient largement [EXEMPLE].

### Exemple 2 : bande passante à partir d'un temps de montée

Un front de signal logique monte en 100 ns [EXEMPLE].

1. Temps de montée de l'oscilloscope : au plus 100 / 5 = 20 ns [EXEMPLE].
2. Bande passante : 0,35 / 20 ns = 17,5 MHz [EXEMPLE].
3. Avec un oscilloscope plus lent, le front paraîtrait plus lent qu'il n'est.

### Exemple 3 : fréquence d'échantillonnage minimale

On observe une sinusoïde de 1 MHz [EXEMPLE].

1. Interpolation sin(x)/x : au moins 2,5 × 1 = 2,5 MHz d'échantillonnage [EXEMPLE].
2. Interpolation linéaire : au moins 10 × 1 = 10 MHz [EXEMPLE].
3. Sur une base de temps lente, l'oscilloscope peut descendre sous ces valeurs : on vérifie la fréquence d'échantillonnage affichée.

## Exercices

::exercice{id=S11-L01-EX01}

::exercice{id=S11-L01-EX02}

::exercice{id=S11-L01-EX03}
