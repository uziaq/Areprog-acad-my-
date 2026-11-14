---
id: S13-L03
titre: Relever le schéma d'un bloc simple
chapitre: S13
version: "0.1"
statut: brouillon
duree_min: 90
objectifs:
  - id: O1
    texte: Appliquer une méthode de relevé (photos, superposition, identification, continuité) sur un bloc simple d'une carte sans documentation
    competences: [D5.4]
  - id: O2
    texte: Dessiner le schéma relevé dans un logiciel de schéma en marquant chaque élément non confirmé [À VÉRIFIER]
    competences: [D5.4]
prerequis: [S13-L02, S07-L02]
exercices: [S13-L03-EX01, S13-L03-EX02]
references: [SRC-0033, SRC-0034, SRC-0015]
criteres_evaluation:
  - objectif: O1
    critere: Exercice S13-L03-EX01 réussi et journal de relevé complet au TP-20
  - objectif: O2
    critere: Exercice S13-L03-EX02 réussi et schéma relevé, avec ses marques [À VÉRIFIER], rendu au TP-20
figures:
  - id: S13-F03
    fichier: ../figures/S13-F03-bloc-entree.svg
    legende: "Exemple de schéma relevé d'une entrée de capteur, valeurs non données : une broche de connecteur, une résistance série, un condensateur vers la masse, une résistance de tirage vers l'alimentation, puis une broche de circuit intégré. La résistance de tirage porte une marque À VÉRIFIER : sa liaison à l'alimentation n'est pas confirmée."
    alt: "Schéma de gauche à droite : connecteur J1 broche 4, résistance R1 en série, un nœud ; du nœud, un condensateur C1 descend vers la masse et une résistance R2 monte vers une alimentation marquée +5V avec la mention À VÉRIFIER ; le nœud continue vers une broche d'un rectangle marqué U1."
    origine: areprog
derniere_verification_sources: 2026-11-14
historique:
  - version: "0.1"
    date: 2026-11-14
    resume: Première rédaction
---

## Théorie

### Pourquoi relever un schéma

Pour un calculateur, le schéma n'est presque jamais publié. Pour comprendre un bloc et y chercher
un défaut, on en relève le schéma sur la carte elle-même. Le relevé est **partiel** : on choisit un
bloc simple, par exemple une entrée de capteur, et l'on ne prétend pas reconstituer toute la carte.
Le schéma relevé n'est pas un schéma constructeur : chaque élément non confirmé porte `[À VÉRIFIER]`.

### La méthode de relevé

Méthode de la formation [EXEMPLE : méthode pédagogique, à adapter à chaque carte] :

1. **Photographier** les deux faces en haute résolution, carte hors tension, et noter l'orientation.
2. **Superposer** le recto et le verso (S13-L02) ; repérer le connecteur et la broche de départ.
3. **Identifier** chaque composant du bloc : type d'après son boîtier et sa sérigraphie, valeur d'après son marquage (S07-L02) ; un condensateur CMS ne porte en général pas de marquage [À VÉRIFIER : selon le composant, confirmer au capacimètre hors circuit].
4. **Suivre** chaque liaison à l'œil, puis la **confirmer** au multimètre, carte hors tension ; noter chaque mesure.
5. **Dessiner** le schéma au fur et à mesure, avec les références de la sérigraphie quand elle existe.
6. **Marquer** `[À VÉRIFIER]` tout ce qui n'a pas été confirmé : valeur, liaison, composant caché.

### Le journal de relevé

Chaque liaison du schéma relevé renvoie à une ligne du journal : point de départ, point d'arrivée,
moyen de confirmation (œil, continuité, ohmmètre), valeur lue. Un élément sans ligne de journal est
`[À VÉRIFIER]`. Le journal rend le relevé vérifiable par un autre technicien.

### Dessiner dans un logiciel de schéma

On dessine le relevé dans un logiciel de schéma, par exemple KiCad, logiciel libre dont la
documentation est publiée sous licence libre [SOURCÉ : SRC-0034 §Basic PCB concepts]. Dans KiCad,
schéma et circuit imprimé partagent les mêmes réseaux [SOURCÉ : SRC-0034 §Basic PCB concepts] ; pour
un relevé, on se contente du schéma. Les règles de lecture de S12 s'appliquent : références uniques,
valeurs, étiquettes de réseau, symboles d'alimentation et de masse. Les marques `[À VÉRIFIER]` se
placent en texte à côté de l'élément concerné.

### Exemple 7 : relever une entrée de capteur

On relève l'entrée reliée à la broche 4 du connecteur J1 d'une carte de récupération [EXEMPLE].

1. À l'œil : la piste de J1-4 va à une résistance R1, puis à un nœud où arrivent un condensateur C1 et une résistance R2, puis à une broche du circuit intégré U1 [EXEMPLE].
2. Au multimètre : J1-4 à R1 et R1 au nœud confirmés ; C1 vers la masse confirmé ; R2 vers l'alimentation non confirmée, la piste passe par une couche interne [EXEMPLE].
3. Valeurs : R1 et R2 lues sur leur marquage ; C1 sans marquage, valeur `[À VÉRIFIER]`.
4. Le schéma relevé montre R2 avec la marque `[À VÉRIFIER]` sur sa liaison à l'alimentation.

::figure{id=S13-F03}

### Exemple 8 : un composant non identifié

Un petit boîtier à trois broches, marqué de deux caractères, se trouve sur le bloc [EXEMPLE].

1. Le marquage CMS court ne suffit pas à identifier le composant (S07-L02) [HYPOTHÈSE].
2. On le dessine comme un composant inconnu à trois broches, avec ses liaisons confirmées.
3. On note le marquage et le boîtier au journal : `[À VÉRIFIER : identification par une table de marquages et la fiche du composant]`.

## Exercices

::exercice{id=S13-L03-EX01}

::exercice{id=S13-L03-EX02}
