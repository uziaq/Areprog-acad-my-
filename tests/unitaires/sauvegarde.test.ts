import { describe, expect, it } from 'vitest';
import { construireSauvegarde, lireSauvegarde, nomFichierSauvegarde } from '../../src/lib/stockage/sauvegarde.ts';
import type { Evenement, Tentative } from '../../src/lib/types.ts';

const t: Tentative = {
  id: 'a', type: 'qcm', ref: 'S02', chapitre: 'S02', version: '0.1', date: '2026-11-13T10:00:00Z',
  score: 0.9, reussi: true, securite_ok: true, duree_s: 120, details: [],
};
const e: Evenement = { id: 'b', type: 'consultation', ref: 'S02-L01', chapitre: 'S02', date: '2026-11-13T09:00:00Z' };

describe('sauvegarde', () => {
  it('aller-retour sans perte', () => {
    const s = construireSauvegarde([t], [e], new Date('2026-11-13T12:00:00Z'));
    const r = lireSauvegarde(JSON.stringify(s));
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.sauvegarde.tentatives).toEqual([t]);
      expect(r.sauvegarde.evenements).toEqual([e]);
    }
  });
  it('refuse un fichier étranger, illisible ou plus récent', () => {
    expect(lireSauvegarde('pas du json').ok).toBe(false);
    expect(lireSauvegarde('{"format":"autre"}').ok).toBe(false);
    expect(lireSauvegarde(JSON.stringify({ ...construireSauvegarde([], []), version_schema: 99 })).ok).toBe(false);
  });
  it('refuse l\'import entier si un enregistrement est corrompu', () => {
    const s = construireSauvegarde([t, { ...t, id: 'c', score: 'neuf' } as unknown as Tentative], []);
    const r = lireSauvegarde(JSON.stringify(s));
    expect(r.ok).toBe(false);
  });
  it('nom de fichier daté', () => {
    expect(nomFichierSauvegarde(new Date('2026-11-13T12:00:00Z'))).toBe('areprog-academy-sauvegarde-2026-11-13.json');
  });
});
