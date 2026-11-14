/**
 * Notation de l'évaluation pratique (TP noté), d'après docs/pedagogie/04-evaluation.md :
 * - un critère sans preuve vaut 0 ;
 * - une seule faute éliminatoire, ou une condition éliminatoire non écartée, rend l'évaluation nulle ;
 * - réussite si la note atteint le seuil (paramètre pratique.seuil_reussite) et aucune élimination.
 * Fonctions pures, testables sans navigateur.
 */

export type NiveauCritere = 'atteint' | 'partiel' | 'non_atteint';

export const FACTEUR_NIVEAU: Record<NiveauCritere, number> = { atteint: 1, partiel: 0.5, non_atteint: 0 };

export const LIBELLE_NIVEAU: Record<NiveauCritere, string> = {
  atteint: 'Atteint',
  partiel: 'Partiellement atteint',
  non_atteint: 'Non atteint',
};

export interface CriterePratique {
  id: string;
  grille: 'generique' | 'renforcee';
  texte: string;
  poids: number;
  eliminatoire_si?: string;
  sans_objet_possible: boolean;
}

export interface FautePratique {
  id: string;
  texte: string;
}

/** Saisie de l'apprenant pour un critère. Clé de critère : `${grille}:${id}`. */
export interface SaisieCritere {
  niveau?: NiveauCritere;
  /** L'apprenant confirme que la situation éliminatoire ne s'est pas produite (ou que le critère est respecté). */
  confirme?: boolean;
  sans_objet?: boolean;
  /** Identifiants des preuves jointes (photos, notes). */
  preuves: string[];
}

export interface SaisiePratique {
  criteres: Record<string, SaisieCritere>;
  /** Faute éliminatoire → true si l'apprenant confirme ne pas l'avoir commise. */
  fautes: Record<string, boolean>;
}

export interface DetailCritere {
  cle: string;
  points: number;
  max: number;
  niveau: NiveauCritere | 'sans_objet' | null;
  preuves: number;
  motif?: string;
}

export interface ResultatPratique {
  score: number;
  reussi: boolean;
  /** Motifs d'élimination (vide si aucun). */
  eliminations: string[];
  details: DetailCritere[];
  /** Critères notés laissés sans niveau (comptés « non atteint »). */
  sansNiveau: string[];
}

export const cleCritere = (c: Pick<CriterePratique, 'grille' | 'id'>) => `${c.grille}:${c.id}`;

/** Fautes éliminatoires qui s'appliquent à un module (liste de modules vide = tous). */
export function fautesDuModule<T extends { modules: string[] }>(fautes: T[], module: string): T[] {
  return fautes.filter((f) => f.modules.length === 0 || f.modules.includes(module));
}

export function noterPratique(
  criteres: CriterePratique[],
  fautes: FautePratique[],
  saisie: SaisiePratique,
  seuil: number,
): ResultatPratique {
  const eliminations: string[] = [];
  const details: DetailCritere[] = [];
  const sansNiveau: string[] = [];
  let total = 0;
  let max = 0;

  for (const f of fautes) {
    if (saisie.fautes[f.id] !== true) eliminations.push(`Faute éliminatoire non écartée : ${f.texte}`);
  }

  for (const c of criteres) {
    const cle = cleCritere(c);
    const s: SaisieCritere = saisie.criteres[cle] ?? { preuves: [] };
    const nbPreuves = s.preuves.length;

    if (c.poids > 0) {
      max += c.poids;
      const niveau = s.niveau ?? null;
      if (!niveau) sansNiveau.push(cle);
      let points = niveau ? c.poids * FACTEUR_NIVEAU[niveau] : 0;
      let motif: string | undefined;
      if (points > 0 && nbPreuves === 0) {
        points = 0;
        motif = 'Aucune preuve jointe : le critère vaut 0';
      }
      total += points;
      details.push({ cle, points, max: c.poids, niveau, preuves: nbPreuves, ...(motif ? { motif } : {}) });
      if (c.eliminatoire_si && s.confirme !== true) eliminations.push(`${c.eliminatoire_si} (${c.texte})`);
      continue;
    }

    // Critère purement éliminatoire (grille renforcée) : respecté avec preuve, ou sans objet si autorisé.
    if (c.sans_objet_possible && s.sans_objet) {
      details.push({ cle, points: 0, max: 0, niveau: 'sans_objet', preuves: nbPreuves });
      continue;
    }
    const respecte = s.confirme === true && nbPreuves > 0;
    details.push({
      cle,
      points: 0,
      max: 0,
      niveau: respecte ? 'atteint' : 'non_atteint',
      preuves: nbPreuves,
      ...(respecte ? {} : { motif: s.confirme ? 'Aucune preuve jointe' : 'Non confirmé' }),
    });
    if (!respecte) eliminations.push(`${c.eliminatoire_si ?? 'Critère éliminatoire non respecté'} : ${c.texte}`);
  }

  const score = max > 0 ? total / max : eliminations.length ? 0 : 1;
  return {
    score: eliminations.length ? 0 : score,
    reussi: eliminations.length === 0 && score >= seuil - 1e-9,
    eliminations,
    details,
    sansNiveau,
  };
}
