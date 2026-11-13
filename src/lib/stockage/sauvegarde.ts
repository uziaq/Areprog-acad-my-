/**
 * Format de sauvegarde (export / import) et migrations du schéma de données apprenant.
 * Fonctions pures, testables sans navigateur.
 */
import type { Evenement, Tentative } from '../types.ts';

export const FORMAT = 'areprog-academy-sauvegarde';
export const VERSION_SCHEMA = 1;

export interface Sauvegarde {
  format: typeof FORMAT;
  version_schema: number;
  date_export: string;
  tentatives: Tentative[];
  evenements: Evenement[];
}

/** Migrations : la clé est la version de départ. Chaque migration produit la version suivante. */
export const MIGRATIONS: Record<number, (d: Record<string, unknown>) => Record<string, unknown>> = {
  // 1: (d) => ({ ...d, version_schema: 2, ... }),
};

export function construireSauvegarde(tentatives: Tentative[], evenements: Evenement[], date = new Date()): Sauvegarde {
  return { format: FORMAT, version_schema: VERSION_SCHEMA, date_export: date.toISOString(), tentatives, evenements };
}

export type LectureSauvegarde = { ok: true; sauvegarde: Sauvegarde } | { ok: false; erreur: string };

const estObjet = (x: unknown): x is Record<string, unknown> => typeof x === 'object' && x !== null && !Array.isArray(x);

function tentativeValide(t: unknown): t is Tentative {
  return (
    estObjet(t) &&
    typeof t.id === 'string' &&
    (t.type === 'exercice' || t.type === 'qcm') &&
    typeof t.ref === 'string' &&
    typeof t.chapitre === 'string' &&
    typeof t.version === 'string' &&
    typeof t.date === 'string' &&
    typeof t.score === 'number' &&
    typeof t.reussi === 'boolean' &&
    Array.isArray(t.details)
  );
}

function evenementValide(e: unknown): e is Evenement {
  return (
    estObjet(e) &&
    typeof e.id === 'string' &&
    (e.type === 'consultation' || e.type === 'derogation') &&
    typeof e.ref === 'string' &&
    typeof e.chapitre === 'string' &&
    typeof e.date === 'string'
  );
}

/** Lit un fichier de sauvegarde, applique les migrations, vérifie chaque enregistrement. */
export function lireSauvegarde(texte: string): LectureSauvegarde {
  let brut: unknown;
  try {
    brut = JSON.parse(texte);
  } catch {
    return { ok: false, erreur: 'Le fichier n\'est pas un fichier JSON lisible.' };
  }
  if (!estObjet(brut) || brut.format !== FORMAT) return { ok: false, erreur: 'Ce fichier n\'est pas une sauvegarde AREPROG Academy.' };
  let d = brut;
  let v = typeof d.version_schema === 'number' ? d.version_schema : NaN;
  if (!Number.isInteger(v) || v < 1) return { ok: false, erreur: 'Version de sauvegarde illisible.' };
  if (v > VERSION_SCHEMA) return { ok: false, erreur: 'Sauvegarde créée par une version plus récente de l\'application : mettez l\'application à jour.' };
  while (v < VERSION_SCHEMA) {
    const m = MIGRATIONS[v];
    if (!m) return { ok: false, erreur: `Aucune migration depuis la version ${v}.` };
    d = m(d);
    v += 1;
  }
  if (!Array.isArray(d.tentatives) || !Array.isArray(d.evenements)) return { ok: false, erreur: 'Sauvegarde incomplète.' };
  const tentatives = d.tentatives.filter(tentativeValide);
  const evenements = d.evenements.filter(evenementValide);
  const rejetes = d.tentatives.length - tentatives.length + d.evenements.length - evenements.length;
  if (rejetes > 0) return { ok: false, erreur: `${rejetes} enregistrement(s) illisible(s) : import refusé pour ne rien perdre.` };
  return {
    ok: true,
    sauvegarde: { format: FORMAT, version_schema: VERSION_SCHEMA, date_export: String(d.date_export ?? ''), tentatives, evenements },
  };
}

export function nomFichierSauvegarde(date = new Date()): string {
  return `areprog-academy-sauvegarde-${date.toISOString().slice(0, 10)}.json`;
}
