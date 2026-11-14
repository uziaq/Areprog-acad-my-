---
id: S01-L01
titre: Électricité statique et poste ESD
chapitre: S01
version: "0.1"
statut: brouillon
duree_min: 60
objectifs:
  - id: O1
    texte: Expliquer comment une charge électrostatique apparaît et les deux façons dont une décharge endommage un composant
    competences: [D1.1]
  - id: O2
    texte: Classer un matériau (conducteur, dissipatif, isolant) d'après sa résistance mesurée
    competences: [D1.1]
  - id: O3
    texte: Installer un poste ESD et en contrôler la liaison à la terre selon la documentation de son fabricant
    competences: [D1.1]
prerequis: []
exercices: [S01-L01-EX01, S01-L01-EX02]
references: [SRC-0002, SRC-0003]
criteres_evaluation:
  - objectif: O1
    critere: Questions du QCM sur la charge par frottement et sur la défaillance latente réussies
  - objectif: O2
    critere: Exercice S01-L01-EX01 réussi
  - objectif: O3
    critere: TP-01 validé (check-list photographiée, continuité poste vers terre relevée et comparée à la notice) et exercice S01-L01-EX02 réussi
figures:
  - id: S01-F01
    fichier: ../figures/S01-F01-poste-esd.svg
    legende: "Principe d'un poste ESD : le tapis dissipatif et le bracelet sont reliés à un même point de terre commun, lui-même relié à la terre de l'atelier."
    alt: "Schéma de principe : un établi recouvert d'un tapis dissipatif sur lequel repose une carte ; un bracelet au poignet ; un fil part du bracelet et un autre du tapis, ils se rejoignent en un point de terre commun relié au symbole de terre de l'atelier."
    origine: areprog
derniere_verification_sources: 2026-11-13
historique:
  - version: "0.1"
    date: 2026-11-13
    resume: Première rédaction
---

## Théorie

### Pourquoi commencer par l'électricité statique

Un calculateur est une carte couverte de composants à semi-conducteurs. Beaucoup d'entre eux
peuvent être abîmés par une décharge électrostatique (en anglais ESD, *electrostatic discharge*)
que vous ne sentirez même pas. Avant de toucher la moindre carte, il faut donc savoir d'où
vient cette charge, comment elle détruit un composant, et comment le poste de travail l'évacue.

### Comment naît une charge électrostatique

Deux matériaux qui se touchent puis se séparent échangent des électrons : celui qui en perd
devient positif, celui qui en gagne devient négatif. C'est la **charge par frottement**
(effet triboélectrique) [SOURCÉ : SRC-0002 §Static Electricity: Creating Charge]. La quantité
de charge dépend de la surface de contact, de la vitesse de séparation, de l'humidité de
l'air et de la nature des matériaux [SOURCÉ : SRC-0002 §Static Electricity: Creating Charge].

La décharge électrostatique est le transfert rapide et spontané de cette charge entre deux
objets à des potentiels différents, souvent sous forme d'une étincelle
[SOURCÉ : SRC-0002 §Static Electricity: Creating Charge].

Ordres de grandeur publiés par l'ESD Association pour une même activité, selon l'humidité
relative de l'air [SOURCÉ : SRC-0002 §Static Electricity: Creating Charge, tableau 1] :

| Activité | Air sec (10 à 25 % d'humidité) | Air humide (65 à 90 % d'humidité) |
|---|---|---|
| Marcher sur une moquette | 35 000 V [SOURCÉ : SRC-0002 tableau 1] | 1 500 V [SOURCÉ : SRC-0002 tableau 1] |
| Marcher sur un sol vinyle | 12 000 V [SOURCÉ : SRC-0002 tableau 1] | 250 V [SOURCÉ : SRC-0002 tableau 1] |
| Opérateur assis à l'établi | 6 000 V [SOURCÉ : SRC-0002 tableau 1] | 100 V [SOURCÉ : SRC-0002 tableau 1] |
| Sachet plastique saisi sur l'établi | 20 000 V [SOURCÉ : SRC-0002 tableau 1] | 1 200 V [SOURCÉ : SRC-0002 tableau 1] |

Ces tensions semblent énormes, mais la quantité de charge est petite : elles ne sont pas
dangereuses pour vous. Elles le sont pour un composant, dont beaucoup sont sensibles à moins
de 100 V [SOURCÉ : SRC-0002 §How Much ESD Control Protection Is Needed?].

### Comment une décharge endommage un composant

L'ESD Association distingue deux cas [SOURCÉ : SRC-0002 §ESD Damage: How Devices Fail] :

- **Défaillance franche** (*catastrophic failure*) : le composant est détruit ou ne fonctionne plus
  qu'en partie. Elle se voit au premier essai.
- **Défaillance latente** (*latent failure*) : le composant affaibli continue de fonctionner,
  puis tombe en panne après une période de fonctionnement normal, avec une durée de vie réduite.
  Le document précise que cette notion ne fait pas l'unanimité dans la communauté technique.

Conséquence pour l'atelier : une carte qui « marche encore » après avoir été manipulée sans
protection n'est pas la preuve qu'elle n'a rien subi. Une réparation peut revenir quelques
semaines plus tard sans que la cause soit visible [HYPOTHÈSE].

### Conducteur, dissipatif, isolant

Les matériaux se classent selon leur résistance de surface ou de volume
[SOURCÉ : SRC-0002 §How Material Characteristics Affect Static Charge] :

| Classe | Résistance | Comportement |
|---|---|---|
| Conducteur | inférieure à 1 × 10⁴ Ω [SOURCÉ : SRC-0002 §Insulative, Conductive, and Dissipative Materials] | La charge s'écoule très vite, parfois trop brutalement |
| Dissipatif | de 1 × 10⁴ Ω à moins de 1 × 10¹¹ Ω [SOURCÉ : SRC-0002 §Insulative, Conductive, and Dissipative Materials] | La charge s'écoule lentement, sans étincelle franche |
| Isolant | 1 × 10¹¹ Ω ou plus [SOURCÉ : SRC-0002 §Insulative, Conductive, and Dissipative Materials] | La charge reste en place : impossible de l'évacuer par la terre |

Un isolant (gobelet, film plastique, mousse, classeur) ne se décharge pas en le reliant à la
terre : il faut l'**éloigner** de la zone de travail, ou neutraliser sa charge par ionisation
[SOURCÉ : SRC-0003 §Basic Principles of Static Control, 5. Dissipate and Neutralize].

### Les principes du poste ESD

L'ESD Association résume la maîtrise de l'électricité statique en six principes
[SOURCÉ : SRC-0003 §Basic Principles of Static Control]. Ceux qui concernent directement
un atelier de réparation :

1. **Définir une zone protégée** (EPA, *ESD protected area*) : l'endroit où l'on manipule les cartes nues.
2. **Réduire la production de charge** : relier à la terre tout ce qui est conducteur, dont la personne, par un bracelet ; écarter les isolants.
3. **Dissiper et neutraliser** : la terre évacue la charge des conducteurs ; l'ionisation traite les isolants qu'on ne peut pas écarter.
4. **Protéger le produit** hors de la zone : sachets et boîtes dissipatifs ou à blindage électrostatique.

Le poste de l'atelier (figure ci-dessous) se compose d'un tapis dissipatif, d'un bracelet et
d'un point de terre commun auquel tous deux sont reliés.

::figure{id=S01-F01}

Le bracelet comporte en général une résistance de sécurité en série, qui protège la personne
si elle touche une tension par accident [À VÉRIFIER : présence et valeur de cette résistance dans la notice du bracelet de l'atelier].
La valeur acceptable de la résistance entre la surface du tapis et la terre est celle que donne
le fabricant du tapis [À VÉRIFIER : valeur et méthode de mesure dans la notice du tapis de l'atelier].
La fréquence des contrôles se fixe selon le risque : le document ne prescrit pas de contrôle
quotidien, il renvoie au rapport technique ESD TR53 [SOURCÉ : SRC-0003 §Elements of an Effective ESD Control Program, 6. Develop and Implement a Compliance Verification Plan].
Les exigences complètes figurent dans les normes ANSI/ESD S20.20 et IEC 61340-5-1
[À VÉRIFIER : édition en vigueur, à acheter (décision budgétaire)].

### Exemple 1 : classer un matériau

Vous mesurez une résistance de 5 × 10⁶ Ω entre deux points d'un tapis neuf [EXEMPLE].

1. Comparer au seuil bas : 5 × 10⁶ est supérieur à 1 × 10⁴ [EXEMPLE] : ce n'est pas un conducteur.
2. Comparer au seuil haut : 5 × 10⁶ est inférieur à 1 × 10¹¹ [EXEMPLE] : ce n'est pas un isolant.
3. Conclusion : le matériau est **dissipatif** [EXEMPLE]. Reste à vérifier que la valeur entre dans la plage donnée par la notice du tapis.

### Exemple 2 : l'effet de l'humidité

Pour un opérateur assis à l'établi, la tension passe de 6 000 V en air sec à 100 V en air humide [SOURCÉ : SRC-0002 tableau 1].

1. Rapport : 6 000 / 100 = 60 [EXEMPLE].
2. L'air sec d'un atelier chauffé l'hiver multiplie donc le risque. Le poste ESD ne doit pas être réservé « aux jours secs » : il s'utilise à chaque séance.

### Organisation de la zone protégée

- Cartes et calculateurs démontés voyagent dans des sachets dissipatifs ou à blindage, fermés et étiquetés (référence, date, état).
- On photographie les deux faces d'une carte **avant** toute intervention (règle reprise en L03 et dans tout le cursus).
- Rien d'isolant inutile sur le tapis : gobelets, films, mousses d'emballage, classeurs plastiques.
- Le bracelet se met **avant** d'ouvrir le sachet et s'enlève **après** l'avoir refermé.

## Exercices

::exercice{id=S01-L01-EX01}

::exercice{id=S01-L01-EX02}
