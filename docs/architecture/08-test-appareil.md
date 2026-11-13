# Phase 4 : tests de robustesse et test sur appareil réel (iPhone)

## 1. Ce qui est vérifié automatiquement (`tests/e2e/robustesse.spec.ts`)

Chaque test tourne en tablette paysage, tablette portrait, téléphone (format iPhone 13) et bureau.

| Réf. | Situation | Résultat attendu | Avant la phase 4 |
|---|---|---|---|
| R1 | Visite de toutes les pages | Aucune erreur JavaScript | ✓ |
| R2 | Stockage local bloqué (navigation privée stricte) | Message clair, exercices utilisables, résultat signalé « non enregistré » | ✓ |
| R3 | Clavier seul | Saisie, unité, validation et correction au clavier | ✓ |
| R4 | Double appui sur « Valider » | Une seule tentative enregistrée | ✓ |
| R5 | Sauvegarde corrompue | Refusée, données intactes, même fichier réessayable une fois corrigé | ✗ corrigé : le champ n'était pas vidé, rechoisir le même fichier ne faisait rien |
| R6 | Import au clavier | Focus visible sur « Choisir un fichier » | ✗ corrigé : le focus tombait sur un champ invisible |
| R7 | Deux onglets ouverts | Un résultat dans un onglet met à jour le tableau de bord de l'autre | ✗ corrigé : canal entre onglets (`BroadcastChannel`) |
| R8 | Question d'ordre laissée telle quelle | Comptée « sans réponse » | ✗ corrigé : l'ordre affiché au hasard pouvait être juste et compté réussi sans que l'apprenant y touche ; bouton « Je garde cet ordre » ajouté |
| R9 | Téléphone | En-tête non fixé (il prenait un tiers de l'écran) | ✗ corrigé |
| T5 | Téléphone, texte à 200 % | Aucun défilement horizontal | ✗ corrigé : nom de l'application, badges et étiquettes passent à la ligne |

Autres corrections sans test de bout en bout possible :

- la base locale se libère quand une nouvelle version de l'application (migration) s'ouvre dans un autre onglet, au lieu de bloquer sa mise à jour ;
- un échec d'ouverture de la base n'est plus mémorisé : l'application réessaie à la demande suivante ;
- un import qui échoue (stockage indisponible) affiche un message au lieu d'échouer en silence.

Relecture technique de S02-L01 : tous les calculs de la leçon, des exercices et du QCM ont été refaits, sans
erreur trouvée. Seul changement : l'énoncé de S02-L01-EX05 posait deux questions alors que seule la puissance
est notée ; il est reformulé (version 0.2). La correspondance de `[SOURCÉ : SRC-0001 §1.2]` avec la
section exacte de l'ouvrage reste à confirmer livre en main.

## 2. Test sur l'iPhone d'Arthur

Arthur n'a pas de tablette : le test réel se fait sur son iPhone, avec Safari. Le format téléphone est
désormais couvert par les tests automatiques ; le test réel vérifie ce qu'ils ne voient pas
(lisibilité à l'atelier, toucher, clavier de l'iPhone, conservation des données par Safari).

### Deux façons d'ouvrir l'application sur l'iPhone

- **Aperçu Netlify privé** (adresse non listée, non indexée, supprimable) : tout est testable, y compris
  le mode hors ligne et l'ajout à l'écran d'accueil, qui exigent HTTPS. C'est un déploiement : il n'est
  fait qu'avec l'accord écrit d'Arthur.
- **Réseau local depuis un PC** (Node.js 22 et Git installés, PC et iPhone sur le même Wi-Fi) : rien n'est
  publié, mais le hors ligne et l'écran d'accueil ne sont pas testables.

  ```
  git clone https://github.com/uziaq/Areprog-acad-my-.git
  cd Areprog-acad-my-
  git checkout claude/project-thread-hu4ttc
  npm ci
  npm run build
  npx astro preview --host --ignore-lock
  ```

  Ouvrir sur l'iPhone l'adresse « Network » affichée, par exemple `http://192.168.1.20:4321`.

### Points à vérifier (noter OK ou le problème constaté)

1. Le tableau de bord se lit sans zoomer, iPhone tenu droit puis tourné.
2. La leçon se lit sans effort (taille du texte, contraste sous l'éclairage de l'atelier).
3. Le schéma S02-F01 est net ; les tableaux défilent de côté avec le doigt.
4. Les étiquettes [EXEMPLE] et [SOURCÉ] se distinguent ; toucher [SOURCÉ] ouvre la fiche source.
5. Le simulateur loi d'Ohm se règle au doigt.
6. Un exercice : le clavier numérique apparaît, la virgule est acceptée, la correction s'affiche après validation.
7. Le QCM complet : boutons faciles à toucher, flèches de la question d'ordre, résultat et corrigé lisibles.
8. Fermer Safari complètement, le rouvrir : l'historique et la progression sont toujours là.
9. Sauvegarde : « Télécharger la sauvegarde », retrouver le fichier dans l'app Fichiers, puis l'importer.
10. (Aperçu HTTPS seulement) Partager → « Sur l'écran d'accueil » crée l'icône AREPROG Academy ; en mode
    avion, l'application ouverte depuis cette icône affiche la leçon, l'exercice et le QCM.

### Point d'attention propre à l'iPhone

Safari peut effacer les données d'un site qui n'a pas été ouvert depuis plusieurs jours, sauf s'il est
installé sur l'écran d'accueil (risque R3). Sur iPhone, l'application doit donc être ajoutée à l'écran
d'accueil, et la sauvegarde exportée régulièrement.
