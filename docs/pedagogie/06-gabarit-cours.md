# 6. Gabarit de cours (structure obligatoire)

Le cursus compte **36 cours** (une semaine chacun) et **5 semaines d'épreuve** sans cours
(S14, S25, S34, S40, S41). Chaque cours suit exactement cette structure en 14 rubriques
(12 rubriques de base + « Lien atelier » + « Sécurité spécifique »). Le corrigé est un fichier séparé. Ce gabarit servira aussi de règle de
validation automatique sur la plateforme (voir [cahier des charges](07-cahier-des-charges-plateforme.md)).

## En-tête (métadonnées)

```yaml
id: S05
titre: Condensateurs, inductances, régimes transitoires
module: M1
duree_h: 8
competences: [D2.5]
prerequis: [S04]
tp: [TP-07, FR-02]
version: 0.1
statut: brouillon | relu | validé
derniere_verification_sources: AAAA-MM-JJ
```

## Les 14 rubriques

| # | Rubrique | Contenu attendu | Critère de qualité |
|---|---|---|---|
| 1 | Prérequis | Liste des cours et compétences nécessaires, mini-test de 5 questions pour s'auto-vérifier | Chaque prérequis renvoie à un cours existant |
| 2 | Objectifs mesurables | 3 à 6 objectifs « être capable de… » avec verbe observable | Chaque objectif est vérifié par au moins une question de QCM ou un critère pratique |
| 3 | Théorie progressive | Du plus simple au plus complexe, avec analogie automobile quand elle est juste | Aucune notion utilisée avant d'être définie |
| 4 | Schémas et illustrations | Schémas de principe, photos annotées, captures d'oscilloscope | Chaque figure est légendée et indique sa source ou « figure réalisée par AREPROG » |
| 5 | Exemples numériques commentés | 3 exemples au moins, chaque étape de calcul détaillée, unités partout | Toutes les valeurs sont étiquetées [EXEMPLE] ou [SOURCÉ] |
| 6 | Exercices de compréhension | 5 à 10 exercices de difficulté croissante | Réponses dans le corrigé séparé |
| 7 | Travaux pratiques | Matériel, sécurité, schéma de câblage, procédure pas à pas, tableau de relevé | TP réalisable avec l'équipement listé dans le [catalogue](03-travaux-pratiques.md) |
| 8 | Mesures attendues et tolérances | Valeur théorique + tolérance justifiée (composants + instrument) | Pas de tolérance sans justification ; sinon « tolérance non déterminable : expliquer l'écart » |
| 9 | Erreurs fréquentes | Erreurs de compréhension, de mesure, de sécurité | Chaque erreur est accompagnée de la façon de la détecter |
| 10 | QCM et évaluation pratique | 15 à 20 questions tirées de la banque, grille pratique | Questions sécurité signalées |
| 11 | Corrigé séparé | Fichier distinct, débloqué après soumission | Explique aussi les mauvaises réponses |
| 12 | Sources documentaires | Fiche source pour chaque référence utilisée | Version / révision et date de consultation présentes |
| 13 | Lien atelier | Situation de diagnostic véhicule qui illustre la notion | Exemple qualitatif ou étiqueté ; jamais une « panne connue » non sourcée |
| 14 | Sécurité spécifique | Risques propres à la semaine ; à partir de S18, rappel du protocole commun calculateurs réels ; en M9, protocole renforcé et sécurité véhicule | Obligatoire et non vide à partir de S18 ; renvoie aux fautes éliminatoires de l'[évaluation](04-evaluation.md#fautes-de-sécurité-éliminatoires) |

## Étiquetage dans le texte

Chaque valeur numérique, brochage, caractéristique de composant ou affirmation de
diagnostic porte une étiquette :

```markdown
La terminaison d'un bus CAN haute vitesse est réalisée aux deux extrémités du bus
[SOURCÉ : ISO 11898-2, section à préciser lors de la rédaction].

Soit un diviseur R1 = 10 kΩ, R2 = 4,7 kΩ alimenté en 5 V [EXEMPLE].

Le rail 5 V est à 0,3 V et la limitation de courant est atteinte :
un court-circuit sur ce rail est probable [HYPOTHÈSE], à confirmer par TP-24.
```

## Fichiers d'un cours

```
cours/
  S05-condensateurs/
    cours.md
    corrige.md          (séparé, verrouillé jusqu'à soumission)
    qcm.yaml            (banque de 25 questions, dont calculs paramétrés)
    tp.md
    figures/
    sources.yaml
```

Cette arborescence est une proposition, à confirmer avec le choix de la plateforme.
