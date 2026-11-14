/**
 * Unités et préfixes pour la saisie des réponses numériques.
 */

const PREFIXES: Record<string, number> = { p: 1e-12, n: 1e-9, µ: 1e-6, u: 1e-6, m: 1e-3, '': 1, k: 1e3, M: 1e6 };
/** Grandeurs reconnues : tension, courant, résistance, puissance, temps, fréquence, capacité, énergie. */
const BASES = ['V', 'A', 'Ω', 'W', 's', 'Hz', 'F', 'J'] as const;
export type UniteBase = (typeof BASES)[number];

export interface Unite {
  symbole: string;
  base: UniteBase;
  facteur: number;
}

export function lireUnite(symbole: string): Unite | null {
  // « μ » (lettre grecque) et « µ » (signe micro) se ressemblent : les deux sont acceptés.
  const s = symbole.trim().replace(/^ohms?$/i, 'Ω').replace(/ohms?$/i, 'Ω').replace(/^μ/, 'µ');
  const base = BASES.find((b) => s.endsWith(b));
  if (!base) return null;
  const prefixe = s.slice(0, s.length - base.length);
  const facteur = PREFIXES[prefixe];
  if (facteur === undefined) return null;
  return { symbole: s, base, facteur };
}

/** Unités proposées dans la liste de saisie, pour une unité attendue donnée. */
export function unitesProposees(attendue: string): string[] {
  const u = lireUnite(attendue);
  if (!u) return [attendue];
  const parBase: Record<UniteBase, string[]> = {
    V: ['mV', 'V', 'kV'],
    A: ['µA', 'mA', 'A'],
    Ω: ['Ω', 'kΩ', 'MΩ'],
    W: ['mW', 'W', 'kW'],
    s: ['µs', 'ms', 's'],
    Hz: ['Hz', 'kHz', 'MHz'],
    F: ['pF', 'nF', 'µF', 'mF'],
    J: ['mJ', 'J', 'kJ'],
  };
  return parBase[u.base];
}

/** Lit un nombre saisi à la française (« 25,5 », « 1 500 »). */
export function lireNombre(saisie: string): number | null {
  const t = saisie.trim().replace(/[\s  ]/g, '').replace(',', '.');
  if (!/^[-+]?\d*\.?\d+(e[-+]?\d+)?$/i.test(t)) return null;
  const n = Number(t);
  return Number.isFinite(n) ? n : null;
}

/** Convertit une valeur d'une unité à une autre de même base ; null si incompatibles. */
export function convertir(valeur: number, de: string, vers: string): number | null {
  const a = lireUnite(de);
  const b = lireUnite(vers);
  if (!a || !b || a.base !== b.base) return null;
  return (valeur * a.facteur) / b.facteur;
}
