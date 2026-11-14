/**
 * Phase 5 : le programme complet (41 semaines) est visible ; seules les semaines rédigées sont ouvertes.
 */
import { expect, test } from '@playwright/test';
import { chapitresPublies, competencesAVenir, premiereSemaineAVenir } from './aides.ts';

test('E1 : le parcours affiche les 41 semaines, la semaine rédigée est ouverte, les autres « à venir »', async ({ page }) => {
  await page.goto('/parcours/');
  await expect(page.locator('[data-testid^="semaine-"]')).toHaveCount(41);
  await expect(page.getByTestId('avancement-cursus')).toContainText('41 semaines');
  await expect(page.getByTestId('semaine-S02').getByRole('link')).toHaveAttribute('href', '/parcours/m1/');
  const aVenir = premiereSemaineAVenir()!;
  await expect(page.getByTestId(`semaine-${aVenir}`)).toContainText('À venir');
  await expect(page.getByTestId(`semaine-${aVenir}`).getByRole('link')).toHaveCount(0);
  await expect(page.getByTestId('semaine-S14')).toContainText('Jalon');
  await expect(page.getByTestId('semaine-S35')).toContainText('Protocole renforcé');
  await expect(page.getByTestId('semaine-S41')).toContainText('Évaluation finale');
  const debord = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  expect(debord).toBe(false);
});

test('E2 : tableau de bord et compétences tiennent compte du programme complet', async ({ page }) => {
  await page.goto('/');
  const n = chapitresPublies().length;
  await expect(page.getByTestId('avancement-cursus')).toContainText(n > 1 ? `${n} semaines disponibles sur 41` : '1 semaine disponible sur 41');
  await page.goto('/competences/');
  const aVenir = page.getByTestId('competences-a-venir');
  const codes = competencesAVenir();
  const domaines = new Set(codes.map((c) => c.split('.')[0]));
  await expect(aVenir.locator('summary')).toHaveCount(domaines.size);
  await aVenir.locator('summary').first().click();
  await expect(aVenir.getByText(codes[0]!, { exact: true })).toBeVisible();
});
