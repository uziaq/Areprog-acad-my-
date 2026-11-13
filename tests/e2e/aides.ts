/**
 * Aides communes aux tests de bout en bout.
 * Les attentes qui dépendent du contenu (chapitres publiés, versions, banques de questions) sont lues
 * dans content/ au lieu d'être écrites en dur : les tests suivent la rédaction des semaines.
 */
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { expect, type Page } from '@playwright/test';
import { parse } from 'yaml';

const PARCOURS = join(process.cwd(), 'content', 'parcours');

interface InfoChapitre {
  id: string;
  version: string;
  statut: string;
  competences: string[];
  dossier: string;
}

/** Chapitres présents dans content/parcours (en-tête de chapitre.md). */
export function chapitres(): InfoChapitre[] {
  const liste: InfoChapitre[] = [];
  for (const m of readdirSync(PARCOURS, { withFileTypes: true }).filter((d) => d.isDirectory())) {
    for (const c of readdirSync(join(PARCOURS, m.name), { withFileTypes: true }).filter((d) => d.isDirectory())) {
      const fichier = join(PARCOURS, m.name, c.name, 'chapitre.md');
      if (!existsSync(fichier)) continue;
      const entete = parse(readFileSync(fichier, 'utf8').split(/^---$/m)[1]!) as Record<string, unknown>;
      liste.push({ id: String(entete.id), version: String(entete.version), statut: String(entete.statut), competences: (entete.competences as string[]) ?? [], dossier: join(PARCOURS, m.name, c.name) });
    }
  }
  return liste;
}

/** Chapitres publiés dans l'application (même règle que src/lib/contenu.ts). */
export const chapitresPublies = () => chapitres().filter((c) => c.statut !== 'retire');

/** Compétences du référentiel qu'aucun chapitre publié n'aborde encore (« à venir »). */
export function competencesAVenir(): string[] {
  const publiees = new Set(chapitresPublies().flatMap((c) => c.competences));
  const referentiel = parse(readFileSync(join(process.cwd(), 'content', 'referentiel', 'competences.yaml'), 'utf8')) as { code: string }[];
  return referentiel.map((c) => c.code).filter((c) => !publiees.has(c));
}

/** Première semaine du programme pas encore rédigée (null si toutes le sont). */
export function premiereSemaineAVenir(): string | null {
  const programme = parse(readFileSync(join(process.cwd(), 'content', 'programme.yaml'), 'utf8')) as { semaines: { id: string }[] };
  const publies = new Set(chapitresPublies().map((c) => c.id));
  return programme.semaines.map((w) => w.id).find((id) => !publies.has(id)) ?? null;
}

export function chapitre(id: string): InfoChapitre {
  const c = chapitres().find((x) => x.id === id);
  if (!c) throw new Error(`Chapitre ${id} absent de content/parcours`);
  return c;
}

export interface QuestionBanque {
  id: string;
  type: string;
  securite: boolean;
  propositions?: { id: string; texte: string }[];
}

export function banque(id: string): QuestionBanque[] {
  return parse(readFileSync(join(chapitre(id).dossier, 'qcm', 'banque.yaml'), 'utf8')) as QuestionBanque[];
}

/**
 * Ajoute un enregistrement dans la base de l'application. La page doit déjà avoir ouvert la base
 * (tableau de bord affiché), pour ne jamais créer une base sans ses magasins.
 */
export async function ajouterEnregistrement(page: Page, magasin: 'tentatives' | 'evenements', valeur: object) {
  await page.evaluate(
    ({ magasin, valeur }) =>
      new Promise<void>((resolve, reject) => {
        const req = indexedDB.open('areprog-academy');
        req.onsuccess = () => {
          const db = req.result;
          const tx = db.transaction(magasin, 'readwrite');
          tx.objectStore(magasin).put(valeur);
          tx.oncomplete = () => { db.close(); resolve(); };
          tx.onerror = () => reject(tx.error);
        };
        req.onerror = () => reject(req.error);
      }),
    { magasin, valeur },
  );
}

/**
 * Lève les prérequis d'un chapitre par une dérogation tracée (règle de calcul.ts), sans ajouter de
 * tentative : les tests d'un chapitre restent indépendants des chapitres qui le précèdent.
 */
export async function deroger(page: Page, id: string) {
  await page.goto('/');
  await expect(page.getByTestId(`chapitre-${id}`).getByTestId('etat-chapitre')).toBeVisible();
  await ajouterEnregistrement(page, 'evenements', {
    id: `derogation-${id}`, type: 'derogation', ref: id, chapitre: id, date: '2026-11-13T07:00:00.000Z',
    motif: 'Test : prérequis traités dans leurs propres tests',
  });
  await page.reload();
}

/**
 * Met chaque question d'ordre tirée dans le bon ordre avec les flèches (ordre attendu lu dans le
 * corrigé servi après soumission, textes lus dans la banque), puis confirme si rien n'a bougé.
 */
export async function ordonnerQuestions(page: Page, chapitreId: string, corrections: Record<string, { ordre?: string[] }>) {
  const questions = new Map(banque(chapitreId).map((q) => [q.id, q]));
  for (const bloc of await page.locator('[data-testid^="question-"]').all()) {
    const id = (await bloc.getAttribute('data-testid'))!.replace('question-', '');
    const ordre = corrections[id]?.ordre;
    if (!ordre) continue;
    const textes = ordre.map((p) => questions.get(id)!.propositions!.find((x) => x.id === p)!.texte);
    for (const [cible, texte] of textes.entries()) {
      const items = bloc.locator('.ordre li');
      const libelles = (await items.locator('span').allTextContents()).map((l) => l.trim());
      let i = libelles.findIndex((l) => l.startsWith(texte.trim()));
      expect(i, `proposition « ${texte} » introuvable dans ${id}`).toBeGreaterThanOrEqual(0);
      while (i > cible) {
        await items.nth(i).getByRole('button', { name: /Monter/ }).click();
        i--;
      }
    }
    const garder = bloc.getByRole('button', { name: 'Je garde cet ordre' });
    if (await garder.isVisible()) await garder.click();
  }
}
