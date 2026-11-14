/**
 * Lot L2 : évaluation pratique (TP noté) avec preuves photo, fautes éliminatoires
 * et validation complète du chapitre.
 */
import { expect, test, type Page } from '@playwright/test';
import { ajouterEnregistrement, chapitre, deroger } from './aides.ts';

const TP = '/parcours/m1/s02/tp/tp-03/';
/** PNG 1 × 1 valide, pour simuler une photo prise sur la tablette. */
const PHOTO = {
  name: 'montage.png',
  mimeType: 'image/png',
  buffer: Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==', 'base64'),
};
const CRITERES = ['preparation', 'execution', 'exactitude', 'documentation', 'analyse'];

async function cocherFautes(page: Page) {
  const fautes = page.getByTestId('pratique-fautes').locator('input[type=checkbox]');
  const n = await fautes.count();
  expect(n).toBeGreaterThan(0);
  for (let i = 0; i < n; i++) await fautes.nth(i).check();
}

/** Remplit un critère : niveau, confirmation éliminatoire éventuelle, photo jointe. */
async function remplirCritere(page: Page, id: string, niveau = 'Atteint') {
  const c = page.getByTestId(`critere-generique:${id}`);
  await c.getByLabel(niveau, { exact: true }).check();
  const confirmation = c.getByLabel(/Je confirme que cette situation éliminatoire/);
  if (await confirmation.count()) await confirmation.check();
  await c.getByTestId(`photo-generique:${id}`).setInputFiles(PHOTO);
  await expect(c.locator('img.vignette')).toHaveCount(1);
}

const ajouterQcmReussi = (page: Page) =>
  ajouterEnregistrement(page, 'tentatives', {
    id: 'qcm-test', type: 'qcm', ref: 'S02', chapitre: 'S02', version: chapitre('S02').version, date: '2026-11-13T08:00:00.000Z',
    score: 1, reussi: true, securite_ok: true, duree_s: 60, details: [],
  });

test('T1 : TP noté réussi avec photos, puis chapitre « Validé » si le QCM est réussi', async ({ page }) => {
  await deroger(page, 'S02');
  await page.goto(TP);
  await expect(page.getByTestId('pratique-formulaire')).toBeVisible();
  await expect(page.getByText('Photo du réglage de la limite de courant')).toBeVisible();
  await cocherFautes(page);
  for (const id of CRITERES) await remplirCritere(page, id);
  await page.getByRole('button', { name: 'Valider mon évaluation' }).click();
  const r = page.getByTestId('pratique-resultat');
  await expect(r.getByText('✓ Évaluation pratique réussie')).toBeVisible();
  await expect(r.locator('.score')).toHaveText('100 %');

  await ajouterQcmReussi(page);
  await page.goto('/');
  await expect(page.getByTestId('chapitre-S02')).toContainText('Validé');
  await expect(page.getByTestId('dernier-tp-TP-03')).toHaveText('100 %');

  await page.goto('/historique/');
  await expect(page.getByText('TP noté TP-03')).toBeVisible();
});

test('T2 : critère sans preuve à 0 et faute éliminatoire non écartée : échec', async ({ page }) => {
  await page.goto(TP);
  await expect(page.getByTestId('pratique-formulaire')).toBeVisible();
  // Aucune faute cochée : au moins une faute éliminatoire reste non écartée.
  const c = page.getByTestId('critere-generique:execution');
  await c.getByLabel('Atteint', { exact: true }).check();
  await page.getByRole('button', { name: 'Valider mon évaluation' }).click();
  await expect(page.getByText(/critère\(s\) sans niveau choisi/)).toBeVisible();
  await page.getByRole('button', { name: 'Valider quand même' }).click();
  const r = page.getByTestId('pratique-resultat');
  await expect(r.getByText('✗ Évaluation pratique non réussie')).toBeVisible();
  await expect(r.locator('.score')).toHaveText('0 %');
  await expect(page.getByTestId('pratique-eliminations')).toContainText('Faute éliminatoire non écartée');
  await expect(r.getByText('Aucune preuve jointe : le critère vaut 0')).toBeVisible();
});

test('T3 : la saisie et les photos sont gardées en brouillon après rechargement', async ({ page }) => {
  await page.goto(TP);
  await remplirCritere(page, 'preparation');
  await page.reload();
  const c = page.getByTestId('critere-generique:preparation');
  await expect(c.locator('img.vignette')).toHaveCount(1);
  await expect(c.getByLabel('Atteint', { exact: true })).toBeChecked();
  await c.getByRole('button', { name: 'Retirer' }).click();
  await expect(c.locator('img.vignette')).toHaveCount(0);
});

test('T4 : note texte comme preuve, et sauvegarde exportée avec les preuves', async ({ page }) => {
  await page.goto(TP);
  const c = page.getByTestId('critere-generique:analyse');
  await c.getByRole('button', { name: /Ajouter une note/ }).click();
  await c.getByLabel(/Note \(valeurs relevées/).fill('Écart dans la tolérance du composant');
  await c.getByRole('button', { name: 'Joindre la note' }).click();
  await expect(c.getByText('Écart dans la tolérance du composant')).toBeVisible();

  await page.goto('/sauvegarde/');
  const telechargement = page.waitForEvent('download');
  await page.getByRole('button', { name: /Télécharger la sauvegarde/ }).click();
  const fichier = await (await telechargement).path();
  const { readFileSync } = await import('node:fs');
  const s = JSON.parse(readFileSync(fichier, 'utf8'));
  expect(s.version_schema).toBe(2);
  expect(s.preuves).toHaveLength(1);
  expect(s.preuves[0]).toMatchObject({ tp: 'TP-03', type: 'note', critere: 'generique:analyse' });
});

test('T5 : page du TP, cibles tactiles d\'au moins 48 px et lecture à 200 % sans défilement horizontal', async ({ page }) => {
  await page.goto(TP);
  await remplirCritere(page, 'preparation');
  const petites = await page.evaluate(() =>
    [...document.querySelectorAll<HTMLElement>('button, .bouton, .choix label, .nav a')]
      .filter((el) => el.offsetParent !== null)
      .map((el) => ({ t: el.textContent?.trim() || el.tagName, h: el.getBoundingClientRect().height }))
      .filter((x) => x.h < 47.5),
  );
  expect(petites).toEqual([]);
  await page.evaluate(() => (document.documentElement.style.fontSize = '200%'));
  const debord = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  expect(debord).toBe(false);
});
