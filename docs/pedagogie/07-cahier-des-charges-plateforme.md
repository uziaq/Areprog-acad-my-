# 7. Cahier des charges pédagogique — plateforme interactive

> Document de besoins, pas de conception technique. **Aucun développement n'est lancé.**
> La plateforme sera développée ensuite avec Claude Code, après validation de ce document.

## 1. Finalité

Permettre à un apprenant autodidacte de suivre les 32 semaines dans l'atelier, de
s'évaluer de façon honnête et de constituer, en même temps, la documentation technique
d'AREPROG (journal, dossiers de réparation, base de connaissances sourcée).

## 2. Utilisateurs

| Rôle | Besoin |
|---|---|
| Apprenant (Arthur) | Suivre le parcours, faire les TP sur une tablette ou un PC d'atelier, s'évaluer, documenter |
| Auteur de contenu (Arthur avec Claude) | Rédiger et corriger les cours au format du [gabarit](06-gabarit-cours.md), avec contrôle automatique de conformité |
| Évaluateur externe (optionnel, futur) | Consulter les preuves et valider un jalon |
| Futurs apprenants AREPROG (optionnel, futur) | Même parcours, progression individuelle |

## 3. Exigences fonctionnelles

### 3.1 Parcours et progression

- **F1** Afficher le parcours des 32 semaines par module, avec l'état de chaque cours (verrouillé, disponible, en cours, validé, à reprendre).
- **F2** Verrouiller un cours tant que ses prérequis ne sont pas validés ; permettre une dérogation manuelle tracée.
- **F3** Tableau de bord du [référentiel de compétences](01-referentiel-competences.md) : niveau atteint par compétence, preuves associées.
- **F4** Suivi du temps passé par semaine et par bloc (théorie, exercices, pratique, évaluation), comparé aux 8 h prévues.

### 3.2 Consultation des cours

- **F5** Afficher les 12 rubriques de chaque cours, navigation par rubrique.
- **F6** Afficher les étiquettes de fiabilité ([SOURCÉ], [EXEMPLE], [HYPOTHÈSE], [À VÉRIFIER]) avec un code visuel distinct ; un clic sur [SOURCÉ] ouvre la fiche source.
- **F7** Glossaire français / anglais (les datasheets sont en anglais), avec lien vers le cours qui définit chaque terme.
- **F8** Mode atelier : affichage lisible sur tablette, gros boutons, procédure de TP pas à pas avec cases à cocher, fonctionnement sans réseau.

### 3.3 Outils interactifs (calculateurs et simulations)

- **F9** Calculateurs pédagogiques : loi d'Ohm et puissance, diviseur de tension chargé, constante RC / RL, filtre RC (fréquence de coupure, gain en dB), dissipation d'un régulateur linéaire, incertitude d'un multimètre à partir de sa spécification saisie par l'utilisateur.
- **F10** Décodeurs : code couleur, codes CMS selon les tables normalisées (avec source affichée).
- **F11** Simulateur d'oscilloscope simplifié (calibre, base de temps, déclenchement) sur signaux synthétiques, pour s'entraîner avant S6 et S11.
- **F12** Chaque outil affiche ses hypothèses de calcul et ne présente jamais un résultat comme une valeur constructeur.

### 3.4 Évaluation

- **F13** Moteur de QCM : tirage aléatoire dans une banque, types de question listés dans l'[évaluation](04-evaluation.md#structure-des-qcm), questions de calcul avec tolérance de réponse, questions sécurité marquées.
- **F14** Corrigé séparé débloqué uniquement après soumission ; historique des tentatives.
- **F15** Grille d'évaluation pratique : chaque critère exige une preuve (photo, capture, tableau) avant de pouvoir être coché ; critères éliminatoires bloquants.
- **F16** Remédiation : après un échec, liste des sections et exercices liés aux questions ratées.

### 3.5 Journal d'atelier et dossiers de réparation

- **F17** Journal d'atelier : une entrée par séance, avec texte, photos (microscope, carte), captures d'oscilloscope importées, tableau de mesures (valeur théorique, tolérance, mesure, écart, commentaire).
- **F18** Dossier de réparation structuré : réception, symptôme, hypothèses (étiquetées), mesures, intervention, composants remplacés (référence, source d'achat), validation, limites, sources.
- **F19** Inventaire des calculateurs de récupération et de leur usage en TP.
- **F20** Base de connaissances : chaque fiche porte obligatoirement une étiquette de fiabilité, un nombre d'observations, et les dossiers qui la justifient. Une fiche [À VÉRIFIER] ne peut passer en [SOURCÉ] qu'avec une référence.

### 3.6 Bibliothèque documentaire

- **F21** Fiches sources (titre, éditeur, référence, révision, date de consultation, licence, fichier ou lien).
- **F22** Alerte de révision : rappel périodique de vérifier si une datasheet a changé de révision.
- **F23** Respect des licences : pas de diffusion des normes ou documents propriétaires en dehors de l'usage autorisé.

### 3.7 Création de contenu

- **F24** Les cours sont écrits en Markdown avec en-tête YAML, versionnés dans ce dépôt Git.
- **F25** Contrôle automatique de conformité (exécuté à chaque modification) : présence des 12 rubriques, existence des prérequis cités, présence d'une fiche source pour chaque [SOURCÉ], valeurs numériques non étiquetées signalées, banque QCM ≥ 40 questions, corrigé présent et séparé.
- **F26** Statut de relecture par cours (brouillon, relu, validé) et date de dernière vérification des sources.

## 4. Exigences non fonctionnelles

| Code | Exigence |
|---|---|
| NF1 | Interface intégralement en français ; termes techniques anglais affichés entre parenthèses à la première occurrence |
| NF2 | Utilisable sur tablette en atelier (écran tactile, contraste élevé, mains gantées ou sales : cibles larges) |
| NF3 | Fonctionnement hors ligne pour la consultation des cours et la saisie du journal, synchronisation ensuite |
| NF4 | Données de l'apprenant exportables (PDF du dossier de réparation, archive complète du journal) |
| NF5 | Sauvegarde automatique ; aucune perte de saisie en cas de coupure |
| NF6 | Pas de donnée client ni de donnée véhicule identifiante (VIN, plaque) dans la plateforme sans décision explicite |
| NF7 | Contenu séparé du code : un cours se modifie sans toucher au code de la plateforme |
| NF8 | Accessibilité : texte redimensionnable, figures avec texte alternatif |

## 5. Hors périmètre (version 1)

- Développement de la plateforme (phase suivante).
- Rédaction des 32 cours.
- Multi-apprenants, paiement, certification.
- Connexion directe aux instruments (import de captures par fichier uniquement).
- Toute fonctionnalité de reprogrammation ou de lecture de calculateur.

## 6. Lotissement proposé pour le développement futur

| Lot | Contenu | Condition de démarrage |
|---|---|---|
| L0 | Format de contenu + contrôle de conformité (F24–F26) | Validation de ce document |
| L1 | Parcours, consultation des cours, étiquettes, glossaire (F1–F7) | Cours pilote S1 et S2 rédigés |
| L2 | QCM, corrigés, grilles pratiques, remédiation (F13–F16) | Banques de questions S1–S2 |
| L3 | Journal d'atelier, dossiers de réparation, inventaire (F17–F19), mode atelier (F8) | L1 |
| L4 | Calculateurs et simulateur d'oscilloscope (F9–F12) | L1 |
| L5 | Base de connaissances et bibliothèque (F20–F23) | L3 |

## 7. Critères d'acceptation globaux

- Un cours non conforme au gabarit ne peut pas être publié dans le parcours.
- Aucune valeur numérique d'un cours publié n'est dépourvue d'étiquette de fiabilité.
- Une évaluation pratique ne peut pas être validée sans preuve jointe.
- Le parcours complet S1 → S32 peut être suivi hors ligne sur tablette.

## 8. Choix techniques à trancher plus tard

Le type de plateforme (site statique généré depuis le dépôt, application web avec base de
données, application installable) et l'hébergement sont listés dans les
[décisions](08-decisions-et-lacunes.md). Ils ne conditionnent pas la rédaction des cours,
puisque le format Markdown + YAML est commun à toutes les options.
