---
id: S20
titre: "Microcontrôleur : conditions de fonctionnement"
module: M5
duree_h: 8
competences: [D7.2, D9.1]
prerequis: [S19]
lecons: [S20-L01, S20-L02, S20-L03]
tp: [TP-28, TP-29]
sources: [SRC-0052, SRC-0056, SRC-0057, SRC-0058, SRC-0038, SRC-0013, SRC-0029]
version: "0.1"
statut: brouillon
derniere_verification_sources: 2026-11-15
historique:
  - version: "0.1"
    date: 2026-11-15
    resume: Première rédaction (3 leçons, 8 exercices, banque de 25 questions, TP-28, TP-29, séance FR-16)
---

Deuxième semaine du module M5. Le microcontrôleur est le cœur du calculateur ; avant de lire ses
mémoires (S21) ou d'y accéder par une interface de programmation (S22), on vérifie qu'il est en état
de fonctionner : alimentations, horloge, reset, mode de démarrage. On apprend aussi à mesurer un
oscillateur sans l'arrêter, et à reconnaître un watchdog qui remet le circuit à zéro en boucle.
Les familles de microcontrôleurs automobiles sont présentées de façon générique : leurs détails ne
viennent que de documentations publiques.

Organisation conseillée des 8 h : leçons (4 h 30), exercices (30 min), TP-28 (1 h), TP-29 (1 h 15),
FR-16 (45 min) [HYPOTHÈSE : répartition à ajuster selon le groupe].

## Mesures attendues et tolérances

**TP-28.** Le reset se relâche après l'établissement de l'alimentation [SOURCÉ : SRC-0038 §Power-on-reset delay] ;
un watchdog non rafraîchi donne des resets réguliers, à la période du réglage, dont la précision se
lit dans la fiche du microcontrôleur [À VÉRIFIER : fiche du microcontrôleur de la carte]. Une sonde
ordinaire ajoute 8 à 15 pF sur l'oscillateur [SOURCÉ : SRC-0057 §5 Testing and Troubleshooting] :
une mesure qui change le comportement de la carte est rejetée.

**TP-29.** Il n'y a pas de valeur constructeur : alimentations, horloge, reset et broches de
démarrage se comparent à un exemplaire de référence de même référence matérielle, à la précision des
instruments [HYPOTHÈSE : dispersion entre exemplaires à constater].

## Erreurs fréquentes

- **Conclure à une horloge absente avec une sonde ordinaire.** Détection : refaire la mesure par une méthode moins perturbante et comparer à la référence.
- **Mesurer directement sur les broches du microcontrôleur.** Détection : chercher d'abord un point équivalent sur un composant voisin ; une pointe qui glisse peut détruire le circuit.
- **Lire un reset au multimètre seulement.** Détection : un reset en boucle donne une valeur moyenne trompeuse ; on le regarde à l'oscilloscope en mode normal.
- **Confondre reset maintenu et reset en boucle.** Détection : niveau permanent ou impulsions régulières ; les hypothèses ne sont pas les mêmes.
- **Déduire la valeur d'un condensateur de charge de ses voisins.** Détection : relever la même position sur la carte de référence.
- **Oublier l'alimentation analogique.** Détection : relever chaque broche d'alimentation repérée, pas seulement la principale.
- **Laisser du flux près du quartz après une soudure.** Détection : nettoyage et microscope avant de mesurer.

## Lien atelier

Un calculateur qui consomme normalement mais ne communique pas peut avoir un microcontrôleur qui ne
vit pas : on vérifie ses quatre conditions avant de soupçonner sa mémoire ou son programme
[HYPOTHÈSE : à confirmer par la mesure sur chaque calculateur]. Un quartz qui ne démarre plus après
une réparation voisine, un reset tenu par un superviseur qui voit une alimentation basse, un watchdog
qui redémarre le calculateur en boucle sont des situations à départager par la mesure, jamais à
supposer. Aucun brochage ni aucune valeur de calculateur réel n'est donné ici.

## Fil rouge FR-16 : quartz et oscillateurs CMS

Seizième séance du fil rouge microsoudure. Critère de réussite du catalogue des TP : repose et
fonctionnement.

1. Préparer le poste : aspiration des fumées en marche, fer sur son support, poste ESD (bracelet relié), flux, tresse, brucelles, microscope.
2. Sur la carte d'entraînement, photographier le quartz CMS et ses condensateurs ; noter l'orientation du boîtier et le repère de sa première broche s'il en a un.
3. Déposer le quartz à l'air chaud ou avec deux fers, sans le choquer ni le surchauffer ; un quartz chauffé ou choqué peut être endommagé [SOURCÉ : SRC-0057 §4 Potential Problem Areas].
4. Nettoyer les pastilles à la tresse et au flux ; poser le quartz neuf dans la même orientation.
5. **Nettoyer soigneusement le flux** entre les pastilles du quartz et autour des condensateurs de charge : un résidu peut empêcher l'oscillation [SOURCÉ : SRC-0057 §4 Potential Problem Areas].
6. Contrôler au microscope et à l'ohmmètre (pas de pont) ; mettre la carte sous tension et vérifier le fonctionnement par une méthode peu perturbante (TP-28).
7. Réglages de la station et de l'air chaud, profil admis par le quartz : notice de la station et fiche du quartz [À VÉRIFIER : températures dans la notice de la station et profil de soudure dans la fiche du quartz utilisé].

## Sécurité spécifique

- **Protocole commun calculateurs réels** (catalogue des TP) appliqué au TP-29 : photos et inventaire, repérage des étages à tension élevée, décharge mesurée, sonde différentielle ou voies isolées sur ces nœuds, mise sous tension progressive, aucune écriture en mémoire.
- Fautes éliminatoires de la semaine : FE-01 (ESD), FE-02 (limite non écrite), FE-03 (polarité), FE-07 (masse de sonde), FE-08 (calculateur réel sans procédure progressive), FE-09 (tension interne élevée non identifiée ou décharge non mesurée).
- Décharge à travers une résistance, puis mesure renouvelée juste avant de toucher la carte [SOURCÉ : SRC-0013 §2-7 Restriking Voltage].
- Masse de sonde jamais reliée à la terre sur un nœud qui n'est pas à la masse [SOURCÉ : SRC-0029 §Use Proper Grounding Procedures].
- Calculateurs d'airbag, d'ABS / ESP et de direction réservés au module M9 ; aucun élément pyrotechnique dans l'atelier.
- FR-16 : aspiration des fumées en marche pendant toute la soudure ; air chaud dirigé loin des mains et des câbles ; pièces chaudes posées sur un support.
