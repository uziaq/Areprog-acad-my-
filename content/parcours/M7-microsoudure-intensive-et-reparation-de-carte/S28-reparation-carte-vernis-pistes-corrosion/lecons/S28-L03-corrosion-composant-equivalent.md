---
id: S28-L03
titre: Traiter une zone corrodée et choisir un composant équivalent
chapitre: S28
version: "0.1"
statut: brouillon
duree_min: 120
objectifs:
  - id: O1
    texte: Traiter une zone corrodée dans l'ordre (constat, nettoyage, séchage, remplacement des éléments atteints, mesure d'isolement, restauration du vernis)
    competences: [D9.2, D9.5]
  - id: O2
    texte: Choisir un composant de remplacement équivalent en comparant ses paramètres critiques et sa qualification automobile, et justifier ce choix par écrit
    competences: [D4.7]
prerequis: [S28-L02]
exercices: [S28-L03-EX01, S28-L03-EX02]
references: [SRC-0077, SRC-0078, SRC-0079, SRC-0080]
criteres_evaluation:
  - objectif: O1
    critere: Exercice S28-L03-EX01 réussi et zone corrodée traitée avec mesures avant et après au TP-41
  - objectif: O2
    critere: Exercice S28-L03-EX02 réussi et fiche d'équivalence justifiée au TP-41
figures:
  - id: S28-F03
    fichier: ../figures/S28-F03-plages-aec.svg
    legende: "Plages de température ambiante de fonctionnement des documents AEC : grades 0 à 3 de l'AEC-Q100 pour les circuits intégrés, plage minimale de l'AEC-Q101 pour les semi-conducteurs discrets et de l'AEC-Q200 pour les passifs. Valeurs d'après SRC-0078 §1.3.4, SRC-0079 §1.3.1 et SRC-0080 §1.5.3."
    alt: "Six barres horizontales sur une échelle de −40 à +150 °C. Q100 grade 0 de −40 à +150, grade 1 de −40 à +125, grade 2 de −40 à +105, grade 3 de −40 à +85 ; Q101 minimum de −40 à +125 ; Q200 minimum de −40 à +85."
    origine: areprog
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction
---

## Théorie

### Reconnaître une zone corrodée

Sur une carte de calculateur, la corrosion se voit comme des dépôts verts, blancs ou bruns, des pistes
ternies ou rongées, des soudures ternes et des broches noircies ; elle suit souvent une entrée d'eau ou
des résidus laissés sur la carte [HYPOTHÈSE : constats d'atelier, à confirmer sur chaque carte].
Les contaminants de surface modifient la soudure, l'adhérence du vernis et les caractéristiques
électriques de la carte [SOURCÉ : SRC-0077 §2.2.1 Cleaning, Local]. Une zone corrodée peut créer un
courant de fuite entre deux pistes voisines : on la mesure avant et après traitement
[HYPOTHÈSE : à constater par la mesure d'isolement].

### Traiter dans l'ordre

1. **Constater** : photos au microscope, étendue de la zone, composants et pistes atteints ; mesure d'isolement entre les conducteurs voisins, carte non alimentée [EXEMPLE : méthode de l'académie].
2. **Dégager** : vernis retiré localement sur la zone (S28-L01).
3. **Nettoyer** : gants propres ; nettoyant appliqué sur la zone, brossage au pinceau humide, rinçage à l'alcool isopropylique, essuyage au chiffon non pelucheux ; examen visuel, une lampe UV aide à voir les contaminants fluorescents [SOURCÉ : SRC-0077 §2.2.1 Cleaning, Local]. L'eau du robinet ne sert jamais au rinçage final : elle apporte chlore et halogénures [SOURCÉ : SRC-0077 §2.2.1 Cleaning, Local].
4. **Sécher** : l'étuvage élimine l'humidité absorbée et prévient cloques et décollements avant soudure ou vernissage ; on nettoie **avant** d'étuver pour ne pas cuire les résidus sur la carte [SOURCÉ : SRC-0077 §2.5 Baking and Preheating]. Le temps et la température ne doivent pas dégrader la carte [SOURCÉ : SRC-0077 §2.5 Baking and Preheating].
5. **Remplacer** ce qui est atteint : composants aux broches rongées (S27), pistes et pastilles (S28-L02).
6. **Mesurer** de nouveau l'isolement et la continuité, comparer à l'état initial et à une carte de référence.
7. **Restaurer** le vernis sur une surface propre (S28-L01).

Le nettoyant utilisé suit sa fiche et sa fiche de données de sécurité
[À VÉRIFIER : nettoyant de l'atelier, compatibilité avec les composants non étanches et le vernis].

### Choisir un composant équivalent

Un composant de remplacement n'est « équivalent » que si tous ses **paramètres critiques** conviennent
au circuit [EXEMPLE : grille de l'académie] :

- fonction et boîtier, brochage identique (fiche du composant d'origine et du remplaçant) ;
- valeur et tolérance ; tension, courant, puissance assignés au moins égaux ;
- plage de température de fonctionnement au moins égale ;
- paramètres propres à la fonction : seuils, temps de commutation, RDS(on), ESR, coefficient de température… ;
- qualification automobile.

Une qualification **AEC-Q100** (circuits intégrés), **AEC-Q101** (semi-conducteurs discrets) ou
**AEC-Q200** (passifs) n'est pas une certification : aucun organisme AEC ne certifie, chaque fournisseur
qualifie lui-même ses composants et remet ses données à son client [SOURCÉ : SRC-0078 §1.3.2 AEC Certification].
L'AEC-Q101 le dit aussi [SOURCÉ : SRC-0079 §1.3.1 AEC Q101 Qualification], comme l'AEC-Q200 [SOURCÉ : SRC-0080 §1.5.2 AEC Certification].
L'approbation pour une application revient à l'utilisateur [SOURCÉ : SRC-0078 §1.3.3 Approval for Use in an Application].

Plages de température ambiante de fonctionnement :

- AEC-Q100, grade 0 : −40 °C à +150 °C [SOURCÉ : SRC-0078 §1.3.4 Definition of Part Operating Temperature Grade] ;
- AEC-Q100, grade 1 : −40 °C à +125 °C [SOURCÉ : SRC-0078 §1.3.4 Definition of Part Operating Temperature Grade] ;
- AEC-Q100, grade 2 : −40 °C à +105 °C [SOURCÉ : SRC-0078 §1.3.4 Definition of Part Operating Temperature Grade] ;
- AEC-Q100, grade 3 : −40 °C à +85 °C [SOURCÉ : SRC-0078 §1.3.4 Definition of Part Operating Temperature Grade] ;
- AEC-Q101, plage minimale : −40 °C à +125 °C [SOURCÉ : SRC-0079 §1.3.1 AEC Q101 Qualification] ;
- AEC-Q200, plage minimale : −40 °C à +85 °C ; le fabricant qualifie sur la plage qu'il annonce [SOURCÉ : SRC-0080 §1.5.3 Temperature Ranges].

::figure{id=S28-F03}

La plage exigée pour un calculateur dépend de son emplacement dans le véhicule et du cahier des charges
du constructeur, qu'on ne connaît pas [À VÉRIFIER : exigence du constructeur ; à défaut, ne jamais
choisir un grade inférieur à celui du composant d'origine]. La fiche d'équivalence écrite compare les
paramètres un par un, cite la fiche de chaque composant et conclut.

### Exemple 7 : une zone corrodée près d'un connecteur

Près du connecteur d'un calculateur de récupération, des dépôts verts couvrent trois pistes et deux
résistances [EXEMPLE].

1. Photos, mesure d'isolement entre les trois pistes, carte non alimentée.
2. Vernis retiré localement ; nettoyage au pinceau et rinçage à l'alcool [SOURCÉ : SRC-0077 §2.2.1 Cleaning, Local].
3. Étuvage après nettoyage [SOURCÉ : SRC-0077 §2.5 Baking and Preheating] ; remplacement des deux résistances ; nouvelle mesure ; vernis restauré.

### Exemple 8 : remplacer un circuit intégré grade 1

Le circuit d'origine est qualifié AEC-Q100 grade 1 ; on propose un remplaçant de même fonction, même
boîtier, même brochage, qualifié grade 3 [EXEMPLE].

1. Grade 1 : jusqu'à +125 °C ; grade 3 : jusqu'à +85 °C [SOURCÉ : SRC-0078 §1.3.4 Definition of Part Operating Temperature Grade].
2. La plage du remplaçant est plus étroite : il n'est pas équivalent.
3. On cherche un remplaçant grade 1 ou grade 0, et on note la recherche dans la fiche d'équivalence.

## Exercices

::exercice{id=S28-L03-EX01}

::exercice{id=S28-L03-EX02}
