---
id: S08-L02
titre: Zener, TVS, Schottky et protection contre l'inversion de polarité
chapitre: S08
version: "0.1"
statut: brouillon
duree_min: 90
objectifs:
  - id: O1
    texte: Calculer la résistance série d'un montage Zener et vérifier qu'il régule pour une charge donnée
    competences: [D4.3]
  - id: O2
    texte: Expliquer le rôle d'une diode TVS, lire ses tensions VRM, VBR et VCL, et la distinguer d'une Zener
    competences: [D4.3, D4.6]
  - id: O3
    texte: Expliquer l'intérêt d'une Schottky et le principe d'une protection contre l'inversion de polarité par diode
    competences: [D4.3]
prerequis: [S08-L01]
exercices: [S08-L02-EX01, S08-L02-EX02, S08-L02-EX03]
references: [SRC-0011, SRC-0018]
criteres_evaluation:
  - objectif: O1
    critere: Exercice S08-L02-EX01 réussi et tension de Zener relevée au TP-12
  - objectif: O2
    critere: Exercice S08-L02-EX02 réussi et tension de claquage de la TVS comparée à sa fiche au TP-12
  - objectif: O3
    critere: Exercice S08-L02-EX03 réussi et questions du QCM sur la Schottky et l'inversion de polarité réussies
figures:
  - id: S08-F02
    fichier: ../figures/S08-F02-zener-tvs.svg
    legende: "À gauche, régulation par Zener : résistance série R depuis la source, Zener en inverse entre la sortie et la masse, charge en parallèle sur la Zener. À droite, protection d'une entrée par TVS : la TVS est placée entre la ligne protégée et la masse, au plus près de l'entrée."
    alt: "Deux schémas. À gauche, une source, une résistance R en série, puis un nœud de sortie ; une diode Zener va du nœud à la masse, cathode vers le nœud, et une résistance de charge est en parallèle. À droite, une ligne venant d'un connecteur passe devant une diode TVS reliée à la masse, puis entre dans un bloc nommé circuit protégé."
    origine: areprog
derniere_verification_sources: 2026-11-14
historique:
  - version: "0.1"
    date: 2026-11-14
    resume: Première rédaction
---

## Théorie

### La Zener : utiliser le claquage

Une diode **Zener** est faite pour fonctionner en inverse, dans sa zone de claquage : elle
maintient alors à ses bornes une tension proche de sa tension Zener, en absorbant le courant en
excès [SOURCÉ : SRC-0011 §Zener diodes].

::figure{id=S08-F02}

- Une **résistance série** est indispensable : c'est elle qui fixe le courant [SOURCÉ : SRC-0011 §Zener diodes]. Sans elle, la Zener branchée directement sur une source serait détruite.
- Courant dans la résistance : I = (E − Uz) / R. Ce courant se partage entre la Zener et la charge.
- La régulation tient tant que la charge prend **moins** de courant que ce que la résistance fournit : si la charge est trop faible en résistance, la tension de sortie tombe sous Uz et la régulation cesse [SOURCÉ : SRC-0011 §Zener diodes].
- La puissance dans la Zener vaut Uz × Iz ; elle doit rester sous la dissipation maximale de sa fiche technique.

### La TVS : écrêter les surtensions

Une diode **TVS** (*transient voltage suppressor*) protège une ligne contre les surtensions brèves.
Elle se monte entre la ligne et la masse. La note ST TN1517 définit ses tensions :

- **VRM**, tension de veille (*stand-off*) : sans surtension, la tension aux bornes de la TVS doit rester sous VRM [SOURCÉ : SRC-0018 §1.2]. On choisit une TVS dont la VRM est supérieure ou égale à la tension de service maximale du circuit protégé [SOURCÉ : SRC-0018 §1.16].
- **VBR**, tension de claquage : celle à partir de laquelle la TVS commence à écrêter ; elle est en général mesurée sous 1 mA [SOURCÉ : SRC-0018 §1.4].
- **VCL**, tension d'écrêtage : la tension aux bornes de la TVS **pendant** la surtension [SOURCÉ : SRC-0018 §1.6] ; c'est elle que le circuit protégé doit supporter.
- **IPP** et **PPP** : le courant de pointe qu'elle supporte en impulsion non répétitive, et la puissance de pointe correspondante, donnée pour une forme d'impulsion précise [SOURCÉ : SRC-0018 §1.5] [SOURCÉ : SRC-0018 §1.8].

Une TVS **unidirectionnelle** protège une ligne de polarité fixe ; pour un signal positif et négatif,
on choisit une TVS **bidirectionnelle** [SOURCÉ : SRC-0018 §1.34].

**TVS ou Zener ?** Une TVS est faite pour écrêter des transitoires et ne peut pas servir à réguler
une tension en continu ; elle ne remplace pas une Zener [SOURCÉ : SRC-0018 §1.29].

**Sur un véhicule**, la note renvoie aux normes ISO 7637 et ISO 16750 pour définir les surtensions
à couvrir [SOURCÉ : SRC-0018 §1.31], et cite des TVS automobiles qualifiées AEC-Q101 [SOURCÉ : SRC-0018 §1.30].
Le contenu de ces normes, dont la surtension de délestage de charge (*load dump*), est étudié en
S17 [À VÉRIFIER : contenu des normes ISO 7637-2 et ISO 16750-2, à consulter dans leur édition en vigueur].

### La Schottky : un seuil plus bas

Une diode **Schottky** a une tension de seuil plus faible, typiquement de 0,25 à 0,4 V [SOURCÉ : SRC-0011 §Schottky diodes]
pour une jonction métal-silicium, et commute vite, avec un temps de recouvrement inverse faible
[SOURCÉ : SRC-0011 §Schottky diodes]. On la trouve là où chaque dixième de volt compte et dans
les alimentations à découpage (S16). Son courant de fuite en inverse et sa tension inverse
maximale se lisent dans sa fiche technique.

### Protéger contre l'inversion de polarité

Une diode en inverse bloque le courant [SOURCÉ : SRC-0011 §Introduction]. D'où deux montages simples :

- **Diode série** dans l'alimentation : si la polarité est inversée, elle bloque. Contrepartie : elle fait perdre son seuil en permanence et dissipe U × I ; une Schottky réduit cette perte.
- **Diode en parallèle, en inverse, avec un fusible en amont** : en cas d'inversion, la diode conduit et fait fondre le fusible, au lieu de laisser la tension inverse atteindre le circuit. Le fusible et la diode doivent supporter ce courant [HYPOTHÈSE].

D'autres montages (transistor MOSFET) font mieux ; ils sont étudiés en S09 et S17.
Les protections réellement montées sur un calculateur se lisent sur son schéma
[À VÉRIFIER : protection d'entrée d'alimentation du calculateur étudié, à lire sur son schéma ou dans sa documentation].

### Exemple 4 : dimensionner une Zener

On veut 5,1 V à partir de 12 V avec une Zener de 5,1 V, et 10 mA dans la résistance [EXEMPLE].

1. R = (12 − 5,1) / 0,010 = 690 Ω [EXEMPLE] ; on choisit 680 Ω dans la série E12 (S02) [EXEMPLE].
2. Courant réel : (12 − 5,1) / 680 = 10,1 mA [EXEMPLE].
3. Sans charge, tout ce courant traverse la Zener : 5,1 × 0,010 1 = 52 mW [EXEMPLE], à comparer à sa dissipation maximale.
4. Une charge de 1 kΩ prendrait 5,1 mA [EXEMPLE] : il reste 5 mA dans la Zener, la régulation tient.

### Exemple 5 : choisir une TVS

Une entrée de capteur fonctionne sous 5 V au maximum et le circuit derrière supporte au plus 12 V [EXEMPLE].

1. VRM doit être au moins égale à la tension de service maximale : 5 V ou plus [EXEMPLE].
2. VCL, à l'IPP prévue, doit rester sous 12 V [EXEMPLE] ; elle se lit dans la fiche de la TVS candidate.
3. Une TVS dont la VRM vaut 3,3 V [EXEMPLE] conduirait en fonctionnement normal : à rejeter.

### Exemple 6 : perte d'une diode série

Un montage consomme 2 A sous 12 V, protégé par une diode série [EXEMPLE].

1. Diode au silicium, seuil d'environ 0,7 V : perte 0,7 × 2 = 1,4 W [EXEMPLE].
2. Schottky, seuil d'environ 0,4 V : perte 0,4 × 2 = 0,8 W [EXEMPLE].
3. Les vrais seuils au courant de service se lisent sur les courbes des fiches techniques ; la puissance détermine le boîtier et le refroidissement.

## Exercices

::exercice{id=S08-L02-EX01}

::exercice{id=S08-L02-EX02}

::exercice{id=S08-L02-EX03}
