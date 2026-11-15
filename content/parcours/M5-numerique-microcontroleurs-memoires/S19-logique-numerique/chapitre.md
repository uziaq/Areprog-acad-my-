---
id: S19
titre: "Logique numérique"
module: M5
duree_h: 8
competences: [D3.6, D7.1, D9.1]
prerequis: [S18]
lecons: [S19-L01, S19-L02, S19-L03]
tp: [TP-26, TP-27]
sources: [SRC-0052, SRC-0053, SRC-0054, SRC-0055]
version: "0.1"
statut: brouillon
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction (3 leçons, 8 exercices, banque de 25 questions, TP-26, TP-27, séance FR-15)
---

Première semaine du module M5. Avant d'aborder le microcontrôleur et ses mémoires, on pose les
bases du numérique : numération binaire et hexadécimale, portes et bascules, niveaux logiques et
types de sortie, compatibilité entre circuits 3,3 V et 5 V [SOURCÉ : SRC-0053 §1 Introduction], puis l'outil qui permet de voir un bus :
l'analyseur logique, appliqué au bus I²C qu'on retrouvera avec les mémoires série en S21.

Organisation conseillée des 8 h : leçons (4 h 30), exercices (30 min), TP-26 (1 h), TP-27 (1 h),
FR-15 (1 h) [HYPOTHÈSE : répartition à ajuster selon le groupe].

## Mesures attendues et tolérances

**TP-26.** Le seuil de basculement mesuré doit se trouver entre VIL et VIH de la fiche du circuit,
à sa tension d'alimentation [SOURCÉ : SRC-0052 §Logic signal voltage levels] ; sa valeur exacte n'est
pas garantie et varie d'un exemplaire à l'autre. Un écart entre montée et descente n'est attendu que
sur une entrée à hystérésis. La précision du multimètre se lit dans sa notice (TP-06).

**TP-27.** Au repos, SDA et SCL sont hautes [SOURCÉ : SRC-0054 §3.1.1 SDA and SCL signals]. Une mesure
de temps à l'analyseur vaut au mieux une période d'échantillonnage [SOURCÉ : SRC-0055 §Set Up Clock Modes].
L'adresse décodée doit être celle de la fiche du circuit esclave ; l'acquittement est SDA basse au
neuvième coup d'horloge [SOURCÉ : SRC-0054 §3.1.6 Acknowledge (ACK) and Not Acknowledge (NACK)].

## Erreurs fréquentes

- **Lire l'adresse I²C sur huit bits.** Détection : les sept premiers bits sont l'adresse, le huitième est R/W ; 0x78 en écriture correspond à l'adresse 0x3C.
- **Confondre VIH et VOH.** Détection : I pour l'entrée (ce qu'elle exige), O pour la sortie (ce qu'elle garantit).
- **Relier une sortie 3,3 V à une entrée CMOS 5 V sans vérifier VIH** [SOURCÉ : SRC-0053 §1 Introduction]. Détection : comparer VOH de l'émetteur à VIH du récepteur, à leurs tensions d'alimentation.
- **Mettre une résistance de tirage sur une sortie push-pull pour changer de niveau.** Détection : le changement de niveau par tirage ne vaut que pour une sortie à drain ou collecteur ouvert.
- **Laisser une entrée CMOS en l'air.** Détection : chaque entrée inutilisée est reliée à un niveau fixe, d'après la fiche.
- **Seuil de l'analyseur inadapté à la tension du bus.** Détection : mesurer la tension du bus au multimètre et régler le seuil avant de capturer.
- **Fréquence d'échantillonnage trop faible.** Détection : compter les échantillons par période d'horloge ; si la trame décodée change d'une capture à l'autre, monter la fréquence.
- **Brancher les voies avant la masse de l'analyseur.** Détection : la masse se branche en premier et se retire en dernier.

## Lien atelier

Sur un calculateur, les mémoires série, certains capteurs et circuits d'alimentation intelligents
dialoguent par bus série ; savoir lire une adresse et un acquittement à l'analyseur permet de voir
si un circuit répond avant de le déposer [HYPOTHÈSE : à confirmer sur le schéma de chaque carte].
La compatibilité des niveaux sert aussi au banc : un programmateur ou un adaptateur 3,3 V branché sur un circuit 5 V, ou l'inverse, se vérifie par les trois conditions d'interface [SOURCÉ : SRC-0053 §1 Introduction]. Aucune adresse, aucun brochage ni aucune trame de calculateur
réel n'est donné ici.

## Fil rouge FR-15 : repose d'un TSSOP sans pont

Quinzième séance du fil rouge microsoudure (1 h). Critère de réussite du catalogue des TP : repose
sans pont.

1. Préparer le poste : aspiration des fumées en marche, fer sur son support, poste ESD (bracelet relié), flux, tresse, brucelles, microscope.
2. Sur la carte d'entraînement, photographier le circuit et repérer sa broche 1 (point ou chanfrein du boîtier, marque de la sérigraphie) sur un croquis.
3. Déposer le circuit à l'air chaud ou au fer selon le matériel de l'atelier, sans arracher de pastille ; nettoyer les pastilles à la tresse et au flux.
4. Poser le circuit dans le bon sens d'après le croquis ; souder deux broches opposées en coin, contrôler l'alignement au microscope.
5. Souder les autres broches au flux, à la panne ou par glissement ; retirer les ponts à la tresse.
6. Contrôler au microscope chaque broche, puis à l'ohmmètre l'absence de court-circuit entre broches voisines et la continuité de chaque broche vers sa piste ; photographier.
7. Réglages de la station et de l'air chaud : notice de la station et fiche de l'alliage [À VÉRIFIER : températures et débit recommandés dans la notice de la station et la fiche de l'alliage utilisés].

## Sécurité spécifique

- Pas de calculateur réel sous tension cette semaine : les TP se font sur carte d'entraînement et carte d'évaluation. Le protocole commun calculateurs réels (catalogue des TP) reste obligatoire dès qu'un calculateur réel est utilisé.
- Fautes éliminatoires de la semaine : FE-01 (ESD), FE-02 (limite de courant non écrite), FE-03 (polarité), FE-07 (masse de sonde ou d'analyseur mal reliée).
- Masse de l'analyseur logique reliée à la masse de la carte, comme une sonde d'oscilloscope ; tension du bus mesurée et comparée à la tension admise par l'analyseur, lue dans sa notice, avant de brancher les voies.
- Circuits CMOS sensibles aux décharges électrostatiques : manipulation au poste ESD.
- FR-15 : aspiration des fumées en marche pendant toute la soudure ; air chaud dirigé loin des mains et des câbles ; pièces chaudes posées sur un support.
