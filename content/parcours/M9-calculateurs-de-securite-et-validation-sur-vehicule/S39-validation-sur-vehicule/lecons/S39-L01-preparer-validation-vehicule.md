---
id: S39-L01
titre: Préparer la validation sur véhicule d'atelier
chapitre: S39
version: "0.1"
statut: brouillon
duree_min: 100
objectifs:
  - id: O1
    texte: Vérifier la compatibilité d'un calculateur réparé avec un véhicule d'atelier d'après la documentation du constructeur (références matérielle et logicielle, codage)
    competences: [D10.7]
  - id: O2
    texte: Rédiger avant l'essai un protocole de validation sur véhicule avec relevés de référence, ordre des connexions et critères d'arrêt
    competences: [D10.6, D10.7]
  - id: O3
    texte: Appliquer les règles « Sécurité véhicule » au montage d'un calculateur réparé (véhicule thermique, immobilisation, batterie débranchée, moteur en marche avec captage des gaz)
    competences: [D10.6]
prerequis: [S38, S33]
exercices: [S39-L01-EX01, S39-L01-EX02, S39-L01-EX03]
references: [SRC-0104]
criteres_evaluation:
  - objectif: O1
    critere: Exercice S39-L01-EX01 réussi et fiche de compatibilité jointe au dossier du TP-58 ou du TP-59
  - objectif: O2
    critere: Exercice S39-L01-EX02 réussi et protocole écrit avant l'essai au TP-58
  - objectif: O3
    critere: Exercice S39-L01-EX03 réussi et règles « Sécurité véhicule » prouvées au TP-58
figures:
  - id: S39-F01
    fichier: ../figures/S39-F01-deroule-validation.svg
    legende: "Déroulé d'une validation sur véhicule d'atelier : préparer (compatibilité, protocole écrit, critères d'arrêt) ; relever la référence avec le calculateur d'origine ; échanger batterie débranchée dans l'ordre du constructeur ; relever le calculateur réparé ; comparer dans les mêmes conditions ; rédiger le dossier. Méthode de l'académie."
    alt: "Six blocs numérotés en deux lignes. En haut, de gauche à droite : préparer, référence, échange. Une flèche descend vers le bloc calculateur réparé, puis la ligne du bas va de droite à gauche : comparer, puis dossier. Sous les blocs, une phrase rappelle l'arrêt immédiat si un critère écrit est atteint."
    origine: areprog
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction
---

## Théorie

### Pourquoi valider sur véhicule

Le banc vérifie l'électronique, mais pas tout : la communication avec les autres calculateurs, les
capteurs et actionneurs réels, les apprentissages et les essais prévus par le constructeur ne se
voient que sur véhicule (S33-L02). La validation sur véhicule d'atelier complète donc le banc ; elle
ne le remplace pas. Elle se fait sur un véhicule de l'atelier, désigné par son code interne, jamais
sur le véhicule d'un client pendant le cursus.

### Vérifier la compatibilité

Avant tout montage, on vérifie dans la documentation du constructeur que le calculateur réparé convient au véhicule : référence matérielle, référence logicielle, variante d'équipement [À VÉRIFIER : règles de compatibilité du constructeur pour le véhicule d'atelier].
Un calculateur de même référence matérielle peut porter un logiciel ou un codage différent [HYPOTHÈSE : à confirmer par la lecture de l'identification avec l'outil].
Si le constructeur impose un codage ou un appairage, la procédure vient de sa documentation et de
son outil ; le cours n'enseigne aucune modification des données d'antidémarrage.

### Écrire le protocole avant l'essai

Comme en S33-L02, le protocole est écrit **avant** l'essai :

- les relevés de référence, faits avec le calculateur d'origine du véhicule ;
- l'ordre des connexions, batterie débranchée, d'après le constructeur ;
- les relevés du calculateur réparé, dans les mêmes conditions ;
- les essais prévus par le constructeur, et ceux que l'atelier ne peut pas faire ;
- les critères d'arrêt immédiat.

La comparaison avec la référence est le cœur de la méthode : un écart n'a de sens que mesuré dans les mêmes conditions [HYPOTHÈSE : véhicule, température et tension de batterie comparables].

::figure{id=S39-F01}

### Les règles de sécurité véhicule

Le catalogue des TP fixe les règles de tout TP sur véhicule d'atelier :

1. véhicule thermique uniquement, les véhicules électrifiés étant exclus du cursus (D-15) ;
2. immobilisation : frein de stationnement, cales, boîte en position de stationnement ; levage selon la notice ;
3. connexions et déconnexions batterie débranchée, dans l'ordre du constructeur ;
4. règles propres à l'airbag, à l'ABS / ESP et à la direction (S39-L03) ;
5. essais dynamiques uniquement sur voie privée, selon la procédure du constructeur [À VÉRIFIER : cadre réglementaire et assurance des essais] ;
6. critères d'arrêt immédiat écrits avant l'essai.

Certains apprentissages se font moteur en marche [À VÉRIFIER : procédure du constructeur].
Moteur en marche dans un local, les gaz d'échappement exposent à une intoxication au monoxyde de carbone [SOURCÉ : SRC-0104 §Effets sur la santé].
On capte les gaz au plus près de leur émission et l'on ne laisse pas tourner le moteur inutilement [SOURCÉ : SRC-0104 §Démarche de prévention des risques].

### La tension de batterie pendant les opérations

Les opérations longues avec l'outil (lectures, apprentissages, codages) se font souvent avec un
maintien de la tension de batterie [À VÉRIFIER : exigence du constructeur et matériel de maintien de l'atelier].
Une tension qui chute pendant une opération peut l'interrompre et laisser des défauts [HYPOTHÈSE : à constater dans la documentation de l'outil].
On note la tension de batterie au début et à la fin de chaque relevé.

### Exemple 1 : une fiche de compatibilité

Calculateur moteur réparé en M8, véhicule d'atelier VEH-02 [EXEMPLE].

1. Références matérielle et logicielle lues sur l'étiquette et avec l'outil, comparées à celles du calculateur d'origine.
2. Documentation du constructeur : codage ou appairage exigé, ou non [À VÉRIFIER : par constructeur].
3. Si un appairage d'antidémarrage est exigé, le TP s'arrête là : il sort du périmètre du cursus.

### Exemple 2 : des critères d'arrêt

Pour un essai moteur en marche [EXEMPLE] :

1. voyant de sécurité inattendu ;
2. bruit, odeur, fumée, échauffement ;
3. régime ou comportement anormal, ou véhicule qui bouge.

### Exemple 3 : l'ordre des relevés

1. Calculateur d'origine : défauts, valeurs réelles, tension de batterie [EXEMPLE].
2. Échange batterie débranchée.
3. Calculateur réparé : mêmes relevés, même ordre, même durée.

## Exercices

::exercice{id=S39-L01-EX01}

::exercice{id=S39-L01-EX02}

::exercice{id=S39-L01-EX03}
