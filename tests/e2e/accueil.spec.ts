import { expect, test } from '@playwright/test';

test('la page d\'accueil s\'affiche en français, sans défilement horizontal', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('AREPROG Academy');
  await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('AREPROG Academy');
  const debordement = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  expect(debordement).toBe(false);
});
