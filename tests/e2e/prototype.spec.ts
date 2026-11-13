/**
 * Parcours du prototype (critères P1 à P8, T4, T5 de docs/architecture/05-tests-et-validation.md).
 */
import { expect, test, type Page } from '@playwright/test';

const LECON = '/parcours/m1/s02/s02-l01/';
const QCM = '/parcours/m1/s02/qcm/';

async function pasDeDefilementHorizontal(page: Page) {
  const debord = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  expect(debord).toBe(false);
}

/** Répond juste à toutes les questions du QCM sauf celles listées. */
async function repondreQcm(page: Page, fausses: string[] = []) {
  const corr = await (await page.request.get('/corrections/s02.json')).json();
  for (const q of await page.locator('[data-testid^="question-"]').all()) {
    const id = (await q.getAttribute('data-testid'))!.replace('question-', '');
    const c = corr.corrections[id];
    const faux = fausses.includes(id);
    if (c.valeur !== undefined) {
      await q.locator('input[type=text]').fill(String(faux ? c.valeur * 10 : c.valeur).replace('.', ','));
      await q.locator('select').selectOption(c.unite);
    } else if (c.ordre) {
      // L'ordre est réglé par le test lui-même (boutons Monter / Descendre).
    } else {
      const bonnes: string[] = faux ? [] : c.bonnes;
      const inputs = q.locator('input');
      const n = await inputs.count();
      for (let i = 0; i < n; i++) {
        const v = await inputs.nth(i).getAttribute('value');
        const doitCocher = faux ? i === n - 1 && !c.bonnes.includes(v) : bonnes.includes(v!);
        if (doitCocher) await inputs.nth(i).check();
      }
      if (faux && c.bonnes.includes(await inputs.nth(n - 1).getAttribute('value'))) await inputs.nth(0).check();
    }
  }
}

/** Met la question d'ordre S02-Q010 dans le bon ordre avec les flèches, puis confirme si rien n'a bougé. */
async function ordonnerQ010(page: Page) {
  const q10 = page.getByTestId('question-S02-Q010');
  const etapes = ['Relever la tension', 'Calculer la puissance', 'Comparer P', 'Conclure'];
  for (const texte of etapes) {
    const items = q10.locator('.ordre li');
    const libelles = await items.locator('span').allTextContents();
    let i = libelles.findIndex((l) => l.startsWith(texte));
    while (i > etapes.indexOf(texte)) {
      await items.nth(i).getByRole('button', { name: /Monter/ }).click();
      i--;
    }
  }
  const garder = q10.getByRole('button', { name: 'Je garde cet ordre' });
  if (await garder.isVisible()) await garder.click();
}

test.describe('prototype AREPROG Academy', () => {
  test('P1 : le tableau de bord affiche le module, le chapitre et son état', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle('AREPROG Academy');
    await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
    await expect(page.getByRole('heading', { name: /M1 · Électricité fondamentale/ })).toBeVisible();
    await expect(page.getByTestId('chapitre-S02').getByTestId('etat-chapitre')).toHaveText('Disponible');
    await expect(page.getByTestId('competence-D2.2')).toContainText('Non commencée');
    await pasDeDefilementHorizontal(page);
  });

  test('P2, P3 : la leçon affiche objectifs, prérequis, contenu, schéma, références, critères et étiquettes', async ({ page }) => {
    await page.goto(LECON);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Grandeurs électriques et loi d\'Ohm');
    await expect(page.getByRole('heading', { name: 'Objectifs' })).toBeVisible();
    await expect(page.getByText('S01 : pas encore publié')).toBeVisible();
    await expect(page.getByRole('img', { name: /Schéma d'un circuit fermé/ })).toBeVisible();
    await expect(page.getByText('Figure réalisée par AREPROG')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Références documentaires' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Critères d\'évaluation' })).toBeVisible();
    for (const classe of ['source', 'exemple']) {
      await expect(page.locator(`.etiquette--${classe}`).first()).toBeVisible();
    }
    // Les ancres utilisées par la remédiation existent.
    for (const a of ['la-loi-dohm', 'la-puissance', 'les-préfixes']) await expect(page.locator(`[id="${a}"]`)).toHaveCount(1);
    await pasDeDefilementHorizontal(page);
    await page.locator('.etiquette--source').first().click();
    await expect(page.getByTestId('fiche-source')).toContainText('Cambridge University Press');
  });

  test('P4 : exercice noté avec tolérance et unité, correction seulement après la réponse', async ({ page }) => {
    const reponseHtml = await page.request.get(LECON);
    const html = await reponseHtml.text();
    expect(html).not.toContain('12 / 470 = 0,0255');
    expect(html).not.toContain('tolerance_relative');

    const corrections: string[] = [];
    page.on('request', (r) => r.url().includes('/corrections/') && corrections.push(r.url()));
    await page.goto(LECON);
    const ex = page.getByTestId('exercice-S02-L01-EX01');
    await expect(ex).toBeVisible();
    expect(corrections).toEqual([]);
    await expect(ex.getByText('12 / 470')).toHaveCount(0);

    // Bonne valeur exprimée en ampères : acceptée (conversion d'unité).
    await ex.locator('input[type=text]').fill('0,0255');
    await ex.locator('select').selectOption('A');
    await ex.getByRole('button', { name: 'Valider ma réponse' }).click();
    await expect(ex.getByText('✓ Bonne réponse')).toBeVisible();
    await expect(ex.getByText(/12 \/ 470/)).toBeVisible();
    expect(corrections.length).toBe(1);

    // Erreur de préfixe : refusée, avec renvoi vers la section.
    await ex.getByRole('button', { name: 'Refaire l\'exercice' }).click();
    await ex.locator('input[type=text]').fill('25,5');
    await ex.locator('select').selectOption('A');
    await ex.getByRole('button', { name: 'Valider ma réponse' }).click();
    await expect(ex.getByText('✗ Réponse incorrecte')).toBeVisible();
    await expect(ex.getByRole('link', { name: 'Relire la section concernée' })).toHaveAttribute('href', `${LECON}#la-loi-dohm`);

    // Saisie illisible : message, pas de correction.
    const ex2 = page.getByTestId('exercice-S02-L01-EX02');
    await ex2.locator('input[type=text]').fill('six');
    await ex2.getByRole('button', { name: 'Valider ma réponse' }).click();
    await expect(ex2.getByRole('alert')).toContainText('Saisissez un nombre');
  });

  test('P5 : QCM réussi, échec par la règle sécurité, remédiation', async ({ page }) => {
    await page.goto(QCM);
    await page.getByRole('button', { name: 'Commencer le QCM' }).click();
    await expect(page.locator('[data-testid^="question-"]')).toHaveCount(10);
    // Une seule erreur, sur une question sécurité : 90 % mais échec.
    await repondreQcm(page, ['S02-Q007']);
    await ordonnerQ010(page);
    await page.getByRole('button', { name: 'Valider mes réponses' }).click();
    const resultat = page.getByTestId('qcm-resultat');
    await expect(resultat.getByText('✗ QCM non réussi')).toBeVisible();
    await expect(resultat.getByText(/question de sécurité est fausse/)).toBeVisible();
    await expect(resultat.getByRole('link', { name: /La puissance/ })).toHaveAttribute('href', `${LECON}#la-puissance`);
    await expect(page.getByTestId('correction-S02-Q007')).toContainText('Bonne réponse');

    // Nouvelle tentative, tout juste (ordre compris) : réussite.
    await page.getByRole('button', { name: 'Nouvelle tentative' }).click();
    await repondreQcm(page);
    await ordonnerQ010(page);
    await page.getByRole('button', { name: 'Valider mes réponses' }).click();
    await expect(page.getByTestId('qcm-resultat').getByText('✓ QCM réussi')).toBeVisible();
    await expect(page.getByTestId('qcm-resultat').locator('.score')).toHaveText('100 %');
  });

  test('P6, P7, P8 : historique, progression et sauvegarde aller-retour', async ({ page }) => {
    await page.goto(LECON);
    const ex = page.getByTestId('exercice-S02-L01-EX04');
    await ex.locator('input[type=text]').fill('47');
    await ex.getByRole('button', { name: 'Valider ma réponse' }).click();
    await expect(ex.getByText('✓ Bonne réponse')).toBeVisible();

    await page.goto(QCM);
    await page.getByRole('button', { name: 'Commencer le QCM' }).click();
    await page.getByRole('button', { name: 'Valider mes réponses' }).click();
    await page.getByRole('button', { name: 'Valider quand même' }).click();
    await expect(page.getByTestId('qcm-resultat').locator('.score')).toHaveText('0 %');

    // P6 : historique avec version du contenu.
    await page.goto('/historique/');
    const lignes = page.getByTestId('historique').locator('tbody tr');
    await expect(lignes).toHaveCount(2);
    await expect(lignes.first()).toContainText('QCM du chapitre S02');
    await expect(lignes.first()).toContainText('0.2'); // version du chapitre S02

    // P1 + P7 : tableau de bord et compétences mis à jour, sans niveau non mérité.
    await page.goto('/');
    await expect(page.getByTestId('chapitre-S02').getByTestId('etat-chapitre')).toHaveText('À reprendre');
    await expect(page.getByTestId('dernier-score')).toHaveText('0 %');
    const d21 = page.getByTestId('competence-D2.1');
    await expect(d21.locator('.etapes li.franchie')).toHaveText(['✓ Leçon consultée', '✓ Exercice réussi']);
    await expect(d21).toContainText('En cours d\'acquisition');
    await expect(page.getByTestId('rappel-sauvegarde')).toBeVisible();

    // P8 : persistance après rechargement, puis export et import sur un profil vierge.
    await page.reload();
    await expect(page.getByTestId('dernier-score')).toHaveText('0 %');
    await page.goto('/sauvegarde/');
    await expect(page.getByTestId('nb-tentatives')).toHaveText('2');
    const [telechargement] = await Promise.all([
      page.waitForEvent('download'),
      page.getByRole('button', { name: /Télécharger la sauvegarde/ }).click(),
    ]);
    const chemin = await telechargement.path();
    expect(telechargement.suggestedFilename()).toMatch(/^areprog-academy-sauvegarde-\d{4}-\d{2}-\d{2}\.json$/);

    const vierge = await page.context().browser()!.newContext();
    const p2 = await vierge.newPage();
    await p2.goto(`${test.info().project.use.baseURL}/sauvegarde/`);
    await expect(p2.getByTestId('nb-tentatives')).toHaveText('0');
    await p2.locator('#fichier-sauvegarde').setInputFiles(chemin);
    await expect(p2.getByTestId('apercu-import')).toContainText('2 tentative(s)');
    await p2.getByRole('button', { name: 'Remplacer mes données' }).click();
    await expect(p2.getByTestId('message-sauvegarde')).toContainText('Import terminé');
    await expect(p2.getByTestId('nb-tentatives')).toHaveText('2');
    await p2.goto(`${test.info().project.use.baseURL}/`);
    await expect(p2.getByTestId('dernier-score')).toHaveText('0 %');
    await vierge.close();
  });

  test('T4 : après une première visite, leçon, exercice et QCM fonctionnent hors ligne', async ({ page, context }) => {
    await page.goto('/');
    await page.evaluate(async () => {
      const reg = await navigator.serviceWorker.ready;
      return reg.active?.state;
    });
    await page.reload();
    await expect.poll(() => page.evaluate(() => !!navigator.serviceWorker.controller)).toBe(true);
    await context.setOffline(true);

    await page.goto(LECON);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Grandeurs électriques et loi d\'Ohm');
    const ex = page.getByTestId('exercice-S02-L01-EX01');
    await ex.locator('input[type=text]').fill('25,5');
    await ex.getByRole('button', { name: 'Valider ma réponse' }).click();
    await expect(ex.getByText('✓ Bonne réponse')).toBeVisible();

    await page.goto(QCM);
    await page.getByRole('button', { name: 'Commencer le QCM' }).click();
    await page.getByRole('button', { name: 'Valider mes réponses' }).click();
    await page.getByRole('button', { name: 'Valider quand même' }).click();
    await expect(page.getByTestId('qcm-resultat')).toBeVisible();
    await context.setOffline(false);
  });

  test('T5 : cibles tactiles d\'au moins 48 px et lecture à 200 % sans défilement horizontal', async ({ page }) => {
    await page.goto(LECON);
    const petites = await page.evaluate(() =>
      [...document.querySelectorAll<HTMLElement>('button, .bouton, select, input[type=text], .nav a')]
        .filter((el) => el.offsetParent !== null)
        .map((el) => ({ t: el.textContent?.trim() || el.tagName, h: el.getBoundingClientRect().height }))
        .filter((x) => x.h < 47.5),
    );
    expect(petites).toEqual([]);
    await page.evaluate(() => (document.documentElement.style.fontSize = '200%'));
    await pasDeDefilementHorizontal(page);
  });
});

test('T7 : JavaScript de la page de leçon < 60 Ko compressé', async ({ page, request }, info) => {
  test.skip(info.project.name !== 'bureau', 'mesure faite une seule fois');
  const { gzipSync } = await import('node:zlib');
  await page.goto(LECON);
  const html = await (await request.get(LECON)).text();
  const file = [...html.matchAll(/src="(\/_astro\/[^"]+\.js)"/g)].map((m) => m[1]!);
  const vus = new Set<string>();
  let total = 0;
  while (file.length) {
    const url = file.pop()!;
    if (vus.has(url)) continue;
    vus.add(url);
    const js = await (await request.get(url)).text();
    total += gzipSync(js).length;
    for (const m of js.matchAll(/from\s*["'](\.\/[^"']+\.js)["']/g)) file.push(new URL(m[1]!, `http://x${url}`).pathname);
  }
  info.annotations.push({ type: 'taille-js-lecon', description: `${(total / 1024).toFixed(1)} Ko gzip, ${vus.size} fichiers` });
  console.log(`JS leçon : ${(total / 1024).toFixed(1)} Ko gzip (${vus.size} fichiers)`);
  expect(total).toBeLessThan(60 * 1024);
});
