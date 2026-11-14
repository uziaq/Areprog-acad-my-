import { defineConfig, devices } from '@playwright/test';

// Tests de bout en bout : format tablette d'abord (NF2), puis téléphone (iPhone d'Arthur) et bureau.
export default defineConfig({
  testDir: 'tests/e2e',
  use: { baseURL: 'http://localhost:4321' },
  webServer: {
    command: 'npx astro build && npx astro preview --port 4321 --ignore-lock',
    url: 'http://localhost:4321',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [
    { name: 'tablette-paysage', use: { ...devices['iPad (gen 7) landscape'], browserName: 'chromium' } },
    { name: 'tablette-portrait', use: { ...devices['iPad (gen 7)'], browserName: 'chromium' } },
    { name: 'telephone', use: { ...devices['iPhone 13'], browserName: 'chromium' } },
    { name: 'bureau', use: { ...devices['Desktop Chrome'] } },
  ],
});
