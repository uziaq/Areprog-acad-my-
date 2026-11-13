# Phase 4 : tests de robustesse et test sur la tablette de l'atelier

## 1. Ce qui est vérifié automatiquement (`tests/e2e/robustesse.spec.ts`)

Chaque test tourne en tablette paysage, tablette portrait et bureau.

| Réf. | Situation | Résultat attendu | Avant la phase 4 |
|---|---|---|---|
| R1 | Visite de toutes les pages | Aucune erreur JavaScript | ✓ |
| R2 | Stockage local bloqué (navigation privée stricte) | Message clair, exercices utilisables, résultat signalé « non enregistré » | ✓ |
| R3 | Clavier seul | Saisie, unité, validation et correction au clavier | ✓ |
| R4 | Double appui sur « Valider » | Une seule tentative enregistrée | ✓ |
| R5 | Sauvegarde corrompue | Refusée, données intactes, même fichier réessayable une fois corrigé | ✗ corrigé : le champ n'était pas vidé, rechoisir le même fichier ne faisait rien |
| R6 | Import au clavier | Focus visible sur « Choisir un fichier » | ✗ corrigé : le focus tombait sur un champ invisible |
| R7 | Deux onglets ouverts | Un résultat dans un onglet met à jour le tableau de bord de l'autre | ✗ corrigé : canal entre onglets (`BroadcastChannel`) |

Autres corrections sans test de bout en bout possible :

- la base locale se libère quand une nouvelle version de l'application (migration) s'ouvre dans un autre onglet, au lieu de bloquer sa mise à jour ;
- un échec d'ouverture de la base n'est plus mémorisé : l'application réessaie à la demande suivante ;
- un import qui échoue (stockage indisponible) affiche un message au lieu d'échouer en silence.

Relecture technique de S02-L01 : tous les calculs de la leçon, des exercices et du QCM ont été refaits, sans
erreur trouvée. Seul changement : l'énoncé de S02-L01-EX05 posait deux questions alors que seule la puissance
est notée ; il est reformulé (version 0.2). La correspondance de `[SOURCÉ : SRC-0001 §1.2]` avec la
section exacte de l'ouvrage reste à confirmer livre en main.

## 2. Test sur la tablette réelle (à faire par Arthur)

### Mise en place (PC de l'atelier, une seule fois)

Prérequis : Node.js 22 et Git installés sur le PC, tablette et PC sur le même Wi-Fi.

```
git clone https://github.com/uziaq/Areprog-acad-my-.git
cd Areprog-acad-my-
git checkout claude/project-thread-hu4ttc
npm ci
npm run build
npx astro preview --host --ignore-lock
```

La dernière commande affiche une adresse « Network », par exemple `http://192.168.1.20:4321`.
L'ouvrir dans le navigateur de la tablette. Rien n'est publié sur Internet : seul le réseau local y accède,
et le serveur s'arrête en fermant la fenêtre (Ctrl+C).

### Limite de cette méthode

Le mode hors ligne et l'installation sur l'écran d'accueil exigent une connexion sécurisée (HTTPS), que le
réseau local n'offre pas. Deux façons de les tester :

- **Tablette Android** : la brancher en USB au PC, ouvrir `chrome://inspect` dans Chrome sur le PC, activer
  « Port forwarding » de `4321` vers `localhost:4321`, puis ouvrir `http://localhost:4321` sur la tablette.
- **iPad, ou sans câble** : un aperçu privé sur Netlify (adresse non listée, non indexée). C'est un
  déploiement : il ne sera fait qu'avec l'accord écrit d'Arthur.

### Points à vérifier (noter OK ou le problème constaté)

1. Le tableau de bord s'affiche sans zoom, en portrait et en paysage.
2. Le texte de la leçon se lit sans effort à bout de bras (taille, contraste sous l'éclairage de l'atelier).
3. Le schéma S02-F01 est net et lisible.
4. Les étiquettes [EXEMPLE] et [SOURCÉ] se distinguent ; toucher [SOURCÉ] ouvre la fiche source.
5. Le simulateur loi d'Ohm répond au doigt (curseurs utilisables avec des gants fins ?).
6. Un exercice : le clavier numérique apparaît, la virgule est acceptée, la correction s'affiche après validation.
7. Le QCM complet : boutons faciles à toucher, ordre des étapes réglable, résultat et corrigé lisibles.
8. Fermer complètement le navigateur, le rouvrir : l'historique et la progression sont toujours là.
9. Sauvegarde : « Télécharger la sauvegarde », retrouver le fichier sur la tablette, puis l'importer.
10. (HTTPS seulement) Mode avion après une première visite : leçon, exercice et QCM fonctionnent ;
    « Ajouter à l'écran d'accueil » crée l'icône AREPROG Academy.
