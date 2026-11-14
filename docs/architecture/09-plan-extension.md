# Phase 5 : préparer l'extension aux 41 semaines

> Cursus de référence : programme v0.3 (41 semaines, 328 h) et référentiel de la PR #1
> (`docs/pedagogie/`). Ce document dit ce qui est prêt, dans quel ordre étendre l'application
> et le contenu, et ce qu'Arthur doit trancher.

## 1. Ce qui est en place

| Élément | Où | Effet |
|---|---|---|
| Programme complet | `content/programme.yaml` | 41 semaines, 11 modules (M0 à M9, puis « M10 » pour l'évaluation finale S40–S41), prérequis, TP, fil rouge, jalons, semaines sous protocole renforcé (S35–S39) |
| Référentiel complet | `content/referentiel/competences.yaml` | 56 compétences, 10 domaines, semaines d'enseignement et jalon de vérification |
| Contrôle de cohérence | règle `programme` du validateur | programme ↔ chapitres rédigés ↔ référentiel : semaine ou module absent, prérequis placé après la semaine qui en dépend, compétence enseignée hors programme, TP ou prérequis d'un chapitre différents du programme |
| Protocole renforcé lié au programme | règle `securite-renforcee` | dans une semaine S35–S39, un TP qui ne porte pas `securite: renforcee` bloque la construction |
| Gabarit v0.3 | règle `rubriques` | rubriques 13 « Lien atelier » et 14 « Sécurité spécifique » (obligatoire et non vide à partir de S18) contrôlées |
| Parcours | `/parcours/` | les 41 semaines par module ; les semaines rédigées sont ouvertes, les autres marquées « À venir » ; jalons et protocole renforcé signalés |
| Compétences | `/competences/` | les 56 compétences, celles à venir regroupées par domaine |
| Évaluation pratique (lot L2) | `content/evaluation/grilles.yaml`, page `/parcours/…/tp/tp-xx/` | grille générique et grille protocole renforcé, fautes éliminatoires par module, preuves photo ou note stockées sur l'appareil et sauvegardées ; un chapitre devient « validé » (QCM + TP) |
| Générateur | `node scripts/nouveau-chapitre.ts S03 kirchhoff-diviseurs` | crée le dossier du module s'il manque, et le squelette du chapitre avec titre, module, prérequis, TP et compétences tirés du programme et du référentiel |

Règle de synchronisation : `docs/pedagogie/02-programme-41-semaines.md` reste la référence rédigée ;
`content/programme.yaml` en est la version lisible par l'application. Toute modification du
programme se fait dans les deux, dans la même PR.

## 2. Ordre recommandé

Le contenu avance semaine par semaine, avec au moins deux semaines d'avance sur l'apprentissage
d'Arthur. L'application s'étend par lots, chacun déclenché quand le contenu en a besoin.

| Ordre | Lot | Contenu | Déclencheur | Critère de fin |
|---|---|---|---|---|
| 1 | Contenu S01 et fin de S02 | S01 complet, S02-L02 et S02-L03, banques QCM | Maintenant | `npm run valider` sans erreur, S01 et S02 en « relu », relecture d'Arthur |
| 2 | **L2 : grilles pratiques** (F15) (fait) | TP noté avec critères, preuve photo obligatoire avant de cocher, fautes éliminatoires bloquantes ; un chapitre devient enfin « validé » | Avant la fin de S02 (aujourd'hui aucun chapitre ne peut être validé) | Un TP-03 noté de bout en bout, photo stockée sur l'appareil et incluse dans la sauvegarde |
| 3 | L1 fin : glossaire (F7), navigation par rubrique (F5), temps passé (F4) | | Avec S03–S04 | Glossaire relié aux cours, temps par semaine affiché |
| 4 | **L3 : journal d'atelier, dossiers de réparation, inventaire, mode atelier** (F8, F17–F19) | Procédure de TP pas à pas avec cases à cocher, journal avec photos et tableau de mesures | Avant S18 (premiers calculateurs réels) | Une séance de TP complète saisie hors ligne, exportée en PDF |
| 5 | L4 : calculateurs et simulateur d'oscilloscope (F9–F12) | Un outil par besoin : diviseur chargé (S3), RC (S5), filtre (S6), oscilloscope simulé (avant S6 et S11), incertitude (S4) | Une à deux semaines avant le cours qui l'utilise | Chaque outil affiche ses hypothèses, testé contre des valeurs de référence |
| 6 | L5 : bibliothèque et base de connaissances (F20–F23) | Recherche dans les fiches sources, alerte de révision, fiches de pannes observées | Quand les dossiers de réparation existent (M8) | Aucune fiche [À VÉRIFIER] ne passe en [SOURCÉ] sans référence |

Chaque lot passe par le même circuit : proposition courte, accord d'Arthur, développement
avec tests (unitaires, validateur, bout en bout en tablette, téléphone et bureau), aperçu privé.

## 3. Production du contenu, semaine par semaine

1. `node scripts/nouveau-chapitre.ts Sxx <slug>` crée le squelette pré-rempli.
2. Skill `creer-cours` : rédaction des leçons, figures, exercices et corrigés, étiquettes de fiabilité.
3. Skill `evaluations` : banque QCM et réponses expliquées. Skill `travaux-pratiques` : TP de la semaine.
4. Skill `verifier-technique` (agents `expert-electronique` et `verificateur-documentaire`) : passage en « relu ».
5. Arthur relit et passe en « valide » : lui seul.

Volume à prévoir par semaine : 2 à 3 leçons, 5 à 10 exercices, une banque QCM, 1 à 3 TP,
le corrigé, les fiches sources. Les semaines S35 à S39 exigent en plus des consignes de
sécurité **sourcées** (aucune [HYPOTHÈSE] ni [À VÉRIFIER] dans un protocole renforcé).

## 4. Décisions à prendre par Arthur

| Réf. | Question | Aujourd'hui | Recommandation |
|---|---|---|---|
| E-01 | Taille minimale de la banque QCM par cours | Application : 40 questions, tirage de 20. Pédagogie v0.3 : banque de 25 avec questions de calcul paramétrées, QCM de 15 à 20 | Aligner sur la pédagogie : banque de 25, tirage de 15, questions de calcul paramétrées (valeurs tirées dans une plage [EXEMPLE]) ajoutées en L2 |
| E-02 | Ordre des lots après le contenu S01–S02 | Tableau ci-dessus | Grilles pratiques (L2) d'abord : sans elles aucun chapitre ne peut être validé |
| E-03 | Aperçu Netlify privé | Projet `areprog-academy-apercu-6beacc01`, mis à jour à la main | Le garder pour tester chaque lot sur l'iPhone, mis à jour seulement sur ta demande |
| E-04 | Fusion des PR | PR #1 (pédagogie) et PR #2 (application) ouvertes | Fusionner la PR #1 puis la PR #2, pour que le programme rédigé et `programme.yaml` vivent sur la même branche |
