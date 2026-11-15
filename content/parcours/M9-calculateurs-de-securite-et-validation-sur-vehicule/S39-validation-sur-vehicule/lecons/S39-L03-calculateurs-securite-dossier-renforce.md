---
id: S39-L03
titre: Calculateurs de sécurité sur véhicule et dossier de validation renforcée
chapitre: S39
version: "0.1"
statut: brouillon
duree_min: 100
objectifs:
  - id: O1
    texte: Appliquer les règles propres à l'airbag (simulateurs uniquement), à l'ABS / ESP (essais statiques avant tout déplacement) et à la direction (immobilisé, calibrations avant tout roulage)
    competences: [D10.6]
  - id: O2
    texte: Calculer l'énergie qu'une réserve d'airbag peut garder et justifier la décharge mesurée avant toute intervention sur le calculateur
    competences: [D10.6, D10.7]
  - id: O3
    texte: Rédiger un dossier de validation renforcée qui sépare clairement validé sur banc, validé sur véhicule et non validable en atelier
    competences: [D10.7]
prerequis: [S39-L02, S35, S36, S37, S38]
exercices: [S39-L03-EX01, S39-L03-EX02]
references: [SRC-0097, SRC-0099, SRC-0013]
criteres_evaluation:
  - objectif: O1
    critere: Exercice S39-L03-EX01 réussi et règles du domaine prouvées au TP-59
  - objectif: O2
    critere: Exercice S39-L03-EX02 réussi
  - objectif: O3
    critere: Dossier de validation renforcée en trois parties rendu au TP-60
figures:
  - id: S39-F03
    fichier: ../figures/S39-F03-regles-par-domaine.svg
    legende: "Règles de sécurité véhicule par domaine : airbag, pyrotechnie débranchée et remplacée par des simulateurs, personne dans l'habitacle à la mise sous contact ; ABS / ESP, purge, contrôle de pédale et essais statiques avant tout déplacement ; direction, premiers essais immobilisé et calibrations avant tout roulage ; pour les trois, batterie débranchée aux connexions et critères d'arrêt écrits. D'après le catalogue des TP."
    alt: "Trois blocs côte à côte : airbag, ABS / ESP, direction, chacun avec sa règle principale. En dessous, un bloc large : pour les trois domaines, batterie débranchée aux connexions, critères d'arrêt écrits."
    origine: areprog
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction
---

## Théorie

### Un calculateur de sécurité sur véhicule

Les calculateurs de sécurité sont conçus avec des surveillances, de la redondance et un état sûr (S35) [SOURCÉ : SRC-0099 §Functional safety beyond microcontrollers].
Une réparation d'atelier ne peut pas prouver que ces mécanismes sont intacts comme le ferait le
fabricant : c'est pourquoi aucun calculateur de sécurité n'est remis en circulation pendant le cursus
(décision D-14). La validation sur véhicule d'atelier sert à apprendre la méthode et à documenter ce
qui a été vérifié, pas à rendre un calculateur à un client.

::figure{id=S39-F03}

### Airbag : simulateurs uniquement

Pour un calculateur d'airbag réparé pendant le cursus, le catalogue des TP impose :

- tous les modules pyrotechniques du véhicule débranchés selon la procédure du constructeur et remplacés par des simulateurs ;
- batterie débranchée pendant les connexions ;
- personne dans l'habitacle à la première mise sous contact ;
- jamais de mise sous tension face à des allumeurs réels.

La réserve d'énergie garde de quoi tirer après la perte de la batterie [SOURCÉ : SRC-0097 §ENERGY RESERVE CONTROL] : débrancher la batterie ne suffit pas à rendre le calculateur inoffensif.
Le délai d'attente avant intervention est celui de la procédure du constructeur [À VÉRIFIER : délai du constructeur pour le véhicule d'atelier], et la décharge du calculateur déposé se **mesure**, deux fois [SOURCÉ : SRC-0013 §2-7 Restriking Voltage].
La valeur des simulateurs vient de la documentation de l'outil ou du constructeur [À VÉRIFIER : valeur des simulateurs pour le véhicule d'atelier].

### Freinage : essais statiques avant tout déplacement

Après le montage d'un calculateur ABS / ESP, le catalogue des TP impose la purge et le contrôle de la
pédale selon le constructeur, puis des essais de freinage statiques, **avant tout déplacement**.
Les essais dynamiques ne se font que sur voie privée, selon la procédure du constructeur [À VÉRIFIER : cadre réglementaire et assurance des essais].
L'atelier de formation n'intervient pas sur le circuit hydraulique (S37) : si une purge est exigée, elle relève d'un professionnel habilité et d'une procédure écrite [À VÉRIFIER : organisation de la purge avec l'atelier].

### Direction : immobilisé, calibrations avant roulage

Pour la direction, premiers essais véhicule immobilisé, roues décollées si la procédure le prévoit ;
calibrations du constructeur (angle de braquage, butées) **avant tout roulage** (catalogue des TP, S38-L03).

### Le dossier de validation renforcée

Le dossier sépare trois parties, sans recouvrement :

1. **Validé sur banc** : mesures et captures, comparées à la référence (S35 à S38).
2. **Validé sur véhicule** : défauts avant et après, valeurs réelles comparées, apprentissages et essais statiques faits (S39-L02).
3. **Non validable en atelier** : chaque essai du constructeur non fait, avec sa raison (roulage, équipement, collision, simulateurs).

Chaque ligne a sa preuve (capture, rapport de l'outil, photo) ; une ligne sans preuve n'est pas
validée. Le dossier se termine par la mention de la décision D-14.

### Exemple 1 : la phrase juste

Phrase à éviter : « calculateur d'airbag validé » [EXEMPLE].

1. Sur banc : alimentation, réserve, étages sur simulateurs conformes à la référence.
2. Sur véhicule : sur simulateurs, aucun défaut autre que ceux attendus, voyant éteint après le cycle prévu [EXEMPLE].
3. Non validable : fonctionnement sur allumeurs réels, comportement en choc. Aucune remise en circulation (D-14).

### Exemple 2 : l'énergie d'une réserve

Réserve de 4,7 mF chargée à 33 V [EXEMPLE].

1. E = ½ C U² = 0,5 × 0,0047 × 33² ≈ 2,6 J [EXEMPLE].
2. L'élévateur du circuit cité charge la réserve [SOURCÉ : SRC-0097 §ENERGY RESERVE CONTROL].
3. Conclusion : décharge mesurée deux fois avant toute manipulation.

### Exemple 3 : un ABS sans essai dynamique

Calculateur ABS réparé, monté sur VEH-03, essais statiques faits [EXEMPLE].

1. Validé sur véhicule : communication, défauts, valeurs réelles des capteurs de roue, essais statiques.
2. Non validable : régulation ABS en freinage réel, faute de voie privée [EXEMPLE].
3. Aucune remise en circulation (D-14).

## Exercices

::exercice{id=S39-L03-EX01}

::exercice{id=S39-L03-EX02}
