/**
 * Phase 4 : robustesse du prototype hors du parcours nominal
 * (stockage indisponible, clavier seul, double envoi, sauvegarde corrompue, plusieurs onglets, erreurs JS).
 */
import { expect, test, type Page } from '@playwright/test';

const LECON = '/parcours/m1/s02/s02-l01/';
const QCM = '/parcours/m1/s02/qcm/';
const PAGES = ['/', '/parcours/', '/parcours/m1/', LECON, QCM, '/competences/', '/historique/', '/sauvegarde/', '/sources/src-0001/'];

function surveillerErreurs(page: Page): string[] {
  const erreurs: string[] = [];
  page.on('pageerror', (e) => erreurs.push(e.message));
  page.on('console', (m) => m.type() === 'error' && erreurs.push(m.text()));
  return erreurs;
}

async function nombreTentatives(page: Page): Promise<number> {
  return page.evaluate(
    () =>
      new Promise<number>((resolve, reject) => {
        const req = indexedDB.open('areprog-academy');
        req.onsuccess = () => {
          const db = req.result;
          const c = db.transaction('tentatives').objectStore('tentatives').count();
          c.onsuccess = () => {
            db.close();
            resolve(c.result);
          };
          c.onerror = () => reject(c.error);
        };
        req.onerror = () => reject(req.error);
      }),
  );
}

test('R1 : aucune erreur JavaScript sur les pages de l\'application', async ({ page }) => {
  const erreurs = surveillerErreurs(page);
  for (const url of PAGES) {
    await page.goto(url);
    await page.waitForLoadState('networkidle');
  }
  expect(erreurs).toEqual([]);
});

test('R2 : stockage local indisponible (navigation privée stricte) : message clair, exercices utilisables', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'indexedDB', { get: () => { throw new Error('IndexedDB bloqué'); } });
  });
  const erreurs = surveillerErreurs(page);
  await page.goto('/');
  await expect(page.getByText(/Stockage local indisponible/)).toBeVisible();

  await page.goto(LECON);
  const ex = page.getByTestId('exercice-S02-L01-EX04');
  await ex.locator('input[type=text]').fill('47');
  await ex.getByRole('button', { name: 'Valider ma réponse' }).click();
  await expect(ex.getByText('✓ Bonne réponse')).toBeVisible();
  await expect(ex.getByText(/Résultat non enregistré/)).toBeVisible();
  expect(erreurs.filter((e) => !e.includes('IndexedDB bloqué'))).toEqual([]);
});

test('R3 : exercice faisable au clavier seul', async ({ page }) => {
  await page.goto(LECON);
  const ex = page.getByTestId('exercice-S02-L01-EX04');
  await ex.locator('input[type=text]').focus();
  await page.keyboard.type('47');
  await page.keyboard.press('Tab');
  await expect(ex.locator('select')).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(ex.getByRole('button', { name: 'Valider ma réponse' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(ex.getByText('✓ Bonne réponse')).toBeVisible();
});

test('R4 : un double appui sur « Valider » n\'enregistre qu\'une tentative', async ({ page }) => {
  await page.goto(LECON);
  const ex = page.getByTestId('exercice-S02-L01-EX04');
  await ex.locator('input[type=text]').fill('47');
  await ex.getByRole('button', { name: 'Valider ma réponse' }).dblclick();
  await expect(ex.getByText('✓ Bonne réponse')).toBeVisible();
  expect(await nombreTentatives(page)).toBe(1);
});

test('R5 : sauvegarde corrompue refusée, données intactes, même fichier réessayable', async ({ page }) => {
  await page.goto(LECON);
  const ex = page.getByTestId('exercice-S02-L01-EX04');
  await ex.locator('input[type=text]').fill('47');
  await ex.getByRole('button', { name: 'Valider ma réponse' }).click();
  await expect(ex.getByText('✓ Bonne réponse')).toBeVisible();

  await page.goto('/sauvegarde/');
  const fichier = { name: 'sauvegarde.json', mimeType: 'application/json', buffer: Buffer.from('{"format": "autre chose"') };
  const champ = page.locator('#fichier-sauvegarde');
  await champ.setInputFiles(fichier);
  await expect(page.getByTestId('message-sauvegarde')).toBeVisible();
  await expect(page.getByTestId('apercu-import')).toHaveCount(0);
  expect(await nombreTentatives(page)).toBe(1);

  // Le champ est vidé après lecture : choisir à nouveau le même fichier (corrigé) relance l'analyse.
  await expect(champ).toHaveValue('');
});

test('R6 : le champ d\'import est atteignable au clavier avec un focus visible', async ({ page }) => {
  await page.goto('/sauvegarde/');
  const champ = page.locator('#fichier-sauvegarde');
  await champ.focus();
  const contour = await page.locator('label[for="fichier-sauvegarde"]').evaluate((el) => getComputedStyle(el).outlineStyle);
  expect(contour).not.toBe('none');
});

test('R7 : un résultat obtenu dans un onglet met à jour le tableau de bord ouvert dans un autre', async ({ context }) => {
  const tableau = await context.newPage();
  await tableau.goto('/');
  const chapitre = tableau.getByTestId('chapitre-S02');
  await expect(chapitre).toContainText('Disponible');
  const lecon = await context.newPage();
  await lecon.goto(LECON);
  const ex = lecon.getByTestId('exercice-S02-L01-EX04');
  await ex.locator('input[type=text]').fill('47');
  await ex.getByRole('button', { name: 'Valider ma réponse' }).click();
  await expect(ex.getByText('✓ Bonne réponse')).toBeVisible();
  await expect(chapitre).toContainText('En cours');
});
