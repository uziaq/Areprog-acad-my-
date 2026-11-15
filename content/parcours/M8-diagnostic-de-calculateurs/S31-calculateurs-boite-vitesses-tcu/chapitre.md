---
id: S31
titre: "Calculateurs de boîte de vitesses (TCU)"
module: M8
duree_h: 8
competences: [D4.7, D10.3]
prerequis: [S30]
lecons: [S31-L01, S31-L02, S31-L03]
tp: [TP-46]
sources: [SRC-0089, SRC-0090, SRC-0091, SRC-0035, SRC-0029, SRC-0013, SRC-0078, SRC-0079, SRC-0077, SRC-0047, SRC-0027, SRC-0081, SRC-0082, SRC-0067]
version: "0.1"
statut: brouillon
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction (3 leçons, 8 exercices, banque de 25 questions, TP-46)
---

Troisième semaine du module M8. La méthode de S30 s'applique à un calculateur de boîte de vitesses,
dont la particularité est la **commande d'électrovannes régulée en courant**. On apprend à la mesurer
à la pince de courant, à lire les entrées propres au TCU (vitesse à deux voies, température d'huile)
et à ouvrir une unité qui a pu vivre dans l'huile chaude sans l'abîmer.

Organisation conseillée des 8 h : leçons (5 h), exercices (30 min), TP-46 (2 h 30) [HYPOTHÈSE : répartition à ajuster selon le TCU acheté].

## Mesures attendues et tolérances

**TP-46.** Profil de courant de l'électrovanne : crête puis maintien régulés par découpage [SOURCÉ : SRC-0089 §6.3.5.1 Internal Regulation Mode] ;
valeurs comparées à l'exemplaire de référence sur la même charge [HYPOTHÈSE : valeurs de référence mesurées, pas publiées].
Fréquence de découpage du circuit cité réglable de 500 Hz à 20 kHz [SOURCÉ : SRC-0089 §6.3.5.5 PWM Frequency].
Courant calculé par la recopie, avec le facteur typique de 20 000 du circuit cité [SOURCÉ : SRC-0089 §5.5 Electrical Characteristics],
et courant lu à la pince concordants dans la somme de leurs incertitudes. Valeur réelle de température,
avec une résistance fixe connue, identique à celle de la référence. La résistance de la charge varie
avec sa température [SOURCÉ : SRC-0035 §Temperature coefficient of resistance] : comparaison à charge froide.

## Erreurs fréquentes

- **Juger une électrovanne sur sa tension moyenne.** Détection : le courant se mesure à la pince ; la tension de sortie d'une commande régulée ne dit pas le courant.
- **Prendre l'ondulation de découpage pour un défaut.** Détection : ondulation autour de la crête et du maintien, attendue en régulation.
- **Utiliser une pince AC.** Détection : pince mesurant le continu, zéro réglé avant la mesure.
- **Comparer une charge chaude à une charge froide.** Détection : température de la charge notée, mesures faites dans les mêmes conditions sur les deux cartes.
- **Ouvrir en faisant levier sur la carte.** Détection : mode de fermeture repéré et photographié avant l'ouverture.
- **Nettoyer l'huile avant de photographier.** Détection : photos avant nettoyage au dossier.
- **Remplacer par un composant de grade de température inférieur.** Détection : plage de l'original lue dans sa fiche et comparée à celle du remplaçant.

## Lien atelier

Un TCU arrive souvent avec un symptôme de boîte : passages brutaux, mode dégradé, rapport bloqué. Une
partie de ces pannes est mécanique ou hydraulique, pas électronique [HYPOTHÈSE : à confirmer avec
l'atelier mécanique]. Le dossier doit donc dire ce que la carte fait sur banc (courants d'électrovannes,
entrées, communication) et ce qui reste à contrôler sur la boîte ; une huile chargée de particules se
signale. Une électrovanne dont le courant suit la consigne sur banc renvoie le diagnostic vers
l'hydraulique ou l'électrovanne elle-même.

## Sécurité spécifique

- Protocole commun calculateurs réels, appliqué dans l'ordre ; mise sous tension progressive, limite de courant écrite (FE-08, FE-02) ; polarité vérifiée (FE-03).
- Décharge des condensateurs mesurée avant tout contact après une mise sous tension, puis mesurée de nouveau [SOURCÉ : SRC-0013 §2-7 Restriking Voltage] (FE-09).
- Impulsion de coupure rapide des électrovannes au-dessus de la tension d'alimentation [SOURCÉ : SRC-0089 §6.3.5.4 Quick Turn Off] : sonde et oscilloscope choisis pour cette tension ; masse des sondes sur la masse de la carte [SOURCÉ : SRC-0029 §Use Proper Grounding Procedures] (FE-07).
- Pince de courant dans ses limites [SOURCÉ : SRC-0029 §Maximum Input Current Rating (current probes)].
- Huile et nettoyants : gants, produit utilisé selon sa fiche de données de sécurité.
- Calculateurs d'airbag, d'ABS / ESP et de direction exclus : traités en M9.
- Fautes éliminatoires de la semaine : FE-01 à FE-04, FE-07, FE-08, FE-09, FE-13 et FE-14.
