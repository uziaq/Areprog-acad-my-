---
id: S20-L02
titre: Horloge, quartz et mesure sans perturber l'oscillateur
chapitre: S20
version: "0.1"
statut: brouillon
duree_min: 90
objectifs:
  - id: O1
    texte: Expliquer le montage Pierce d'un oscillateur à quartz et calculer les condensateurs de charge à partir de la capacité de charge du quartz
    competences: [D7.2]
  - id: O2
    texte: Choisir une méthode pour mesurer un oscillateur sans l'arrêter, en tenant compte de la charge apportée par la sonde
    competences: [D7.2, D3.6]
  - id: O3
    texte: Citer les causes d'un oscillateur qui ne démarre pas ou qui est instable sur une carte réparée
    competences: [D7.2]
prerequis: [S20-L01, S11-L02]
exercices: [S20-L02-EX01, S20-L02-EX02, S20-L02-EX03]
references: [SRC-0057, SRC-0056]
criteres_evaluation:
  - objectif: O1
    critere: Exercice S20-L02-EX01 réussi
  - objectif: O2
    critere: Exercice S20-L02-EX02 réussi et méthode de mesure de l'horloge justifiée au TP-29
  - objectif: O3
    critere: Exercice S20-L02-EX03 réussi et oscillateur contrôlé après repose à FR-16
figures:
  - id: S20-F02
    fichier: ../figures/S20-F02-pierce.svg
    legende: "Oscillateur Pierce : un inverseur interne au microcontrôleur, une résistance de contre-réaction, le quartz entre les deux broches d'horloge et un condensateur de charge de chaque broche à la masse. La sonde d'oscilloscope se modélise par une capacité de quelques picofarads en parallèle sur une grande résistance. D'après la description de Motorola AN1706 ; schéma de principe."
    alt: "Un inverseur dans un cadre pointillé marqué intérieur du microcontrôleur, avec une résistance Rf en parallèle. Ses deux broches, entrée et sortie d'horloge, sortent du cadre ; le quartz est relié entre elles, et un condensateur va de chaque broche à la masse. À droite, une sonde représentée par un condensateur et une résistance vers la masse, branchée sur une broche."
    origine: areprog
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction
---

## Théorie

### L'oscillateur Pierce

La plupart des microcontrôleurs utilisent un oscillateur Pierce : un amplificateur inverseur interne,
et un circuit de contre-réaction formé du quartz et de deux condensateurs de charge
[SOURCÉ : SRC-0057 §2 Crystal Oscillator Theory]. À la mise sous tension, le gain de la boucle est
supérieur à un et l'oscillation grandit ; en régime établi, il vaut un
[SOURCÉ : SRC-0057 §2 Crystal Oscillator Theory]. Une résistance de contre-réaction polarise
l'entrée de l'inverseur vers la moitié de la tension d'alimentation
[SOURCÉ : SRC-0057 §2 Crystal Oscillator Theory].

::figure{id=S20-F02}

Sur les deux broches, on observe des sinusoïdes déformées, à peu près en opposition de phase, centrées
sur la moitié de l'alimentation [SOURCÉ : SRC-0057 §2 Crystal Oscillator Theory].

Un quartz est fabriqué pour osciller à sa fréquence avec une **capacité de charge** CL donnée dans
sa fiche [SOURCÉ : SRC-0057 §2 Crystal Oscillator Theory]. Cette charge réunit les condensateurs
externes Ce, la capacité interne des broches Ci et la capacité parasite de la carte Cs ; pour un
montage symétrique : Ce + Ci = 2 × CL − Cs [SOURCÉ : SRC-0056 §5.2 About Crystals and Ceramic Resonators].
Une charge trop faible donne une oscillation instable ; trop forte, l'oscillation peut ne pas
démarrer [SOURCÉ : SRC-0056 §5.2 About Crystals and Ceramic Resonators].

Un **résonateur céramique** fonctionne de la même façon, moins précis et plus sensible à la
température, mais il démarre plus vite qu'un quartz [SOURCÉ : SRC-0056 §5.2 About Crystals and Ceramic Resonators].

### Mesurer sans arrêter l'oscillateur

L'oscillateur est un circuit à haute impédance : une sonde d'oscilloscope ordinaire peut changer son
fonctionnement de façon importante [SOURCÉ : SRC-0057 §5 Testing and Troubleshooting].
Sa capacité, de 8 à 15 pF, charge fortement le circuit aux hautes fréquences [SOURCÉ : SRC-0057 §5 Testing and Troubleshooting] ; l'impédance d'une capacité vaut
Z = 1 / (2π × f × C) (S06). La sonde peut aussi tirer le point de polarisation hors du milieu de
l'alimentation [SOURCÉ : SRC-0057 §5 Testing and Troubleshooting].

Méthodes, de la moins à la plus perturbante :

- une sonde active à transistor à effet de champ, de capacité inférieure à 2 pF [SOURCÉ : SRC-0057 §5 Testing and Troubleshooting] ;
- un signal dérivé de l'horloge, sur une broche de sortie du microcontrôleur ou d'un circuit qui la reçoit [HYPOTHÈSE : selon la carte et le programme] ;
- une sonde ×10 bien compensée, avec son ressort de masse (S11-L02), en vérifiant que la mesure ne change pas le comportement de la carte [HYPOTHÈSE : méthode d'atelier, à confirmer en comparant avec et sans sonde].

Une sonde qui fait arrêter l'oscillateur ou qui change la fréquence donne une mesure fausse : on
note la méthode employée au journal, avec la sonde et son réglage.

### Pourquoi un oscillateur ne démarre pas

Causes relevées par la note Motorola [SOURCÉ : SRC-0057 §4 Potential Problem Areas] :

- résidus de flux, humidité ou traces de doigts entre les broches du quartz ou sous les composants : ils créent un chemin parasite qui réduit le gain ;
- pistes longues ou capacités parasites qui chargent trop l'amplificateur ;
- bruit sur l'alimentation du microcontrôleur ;
- quartz endommagé par un choc, une contrainte sur ses pattes ou une étanchéité rompue ;
- condensateurs de charge mal choisis, qui donnent une fréquence instable ou un quartz trop excité.

Pour l'atelier, la première de ces causes est la plus utile : après une soudure près du quartz, on
nettoie le flux avant de conclure à une panne [HYPOTHÈSE : conséquence directe de la source, à
confirmer en mesurant avant et après nettoyage].

### Exemple 4 : condensateurs de charge

Un quartz demande CL = 18 pF ; la fiche du microcontrôleur donne Ci = 5 pF et l'on estime Cs = 4 pF [EXEMPLE].

1. Ce + Ci = 2 × 18 − 4 = 32 pF [EXEMPLE].
2. Ce = 32 − 5 = 27 pF [EXEMPLE].
3. On prend la valeur normalisée la plus proche, et l'on compare toujours à la valeur montée sur la carte de référence.

### Exemple 5 : charge de la sonde

Une sonde de 10 pF [EXEMPLE] touche un oscillateur à 16 MHz [EXEMPLE].

1. Z = 1 / (2π × 16 × 10⁶ × 10 × 10⁻¹²) ≈ 995 Ω [EXEMPLE].
2. Le tableau de la note Motorola donne le même ordre de grandeur : environ 1,24 kΩ pour 8 pF à 16 MHz [SOURCÉ : SRC-0057 §5 Testing and Troubleshooting].
3. Une impédance de l'ordre du kilohm sur un nœud à haute impédance peut arrêter l'oscillation : on préfère une sonde active ou un signal dérivé.

### Exemple 6 : pas d'horloge après une réparation

Après le remplacement d'un composant voisin du quartz, le microcontrôleur ne démarre plus [EXEMPLE].

1. Hypothèses : flux entre les broches du quartz, pont de soudure, quartz chauffé ou choqué [HYPOTHÈSE].
2. Contrôles : microscope, nettoyage du flux, continuité et absence de pont à l'ohmmètre, carte hors tension.
3. Mesure : horloge par une méthode peu perturbante, comparée à la carte de référence.

## Exercices

::exercice{id=S20-L02-EX01}

::exercice{id=S20-L02-EX02}

::exercice{id=S20-L02-EX03}
