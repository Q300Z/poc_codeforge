import { test, expect } from '@playwright/test';
import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

test.describe('ScreenDraft Adapter E2E', () => {
  let outDir: string;

  test.beforeAll(({}, testInfo) => {
    outDir = `dist-e2e-screendraft-${testInfo.workerIndex}`;
    // Génère le site à partir du format ScreenDraft
    execSync(`node dist/cli.js data/screendraft-data.json ${outDir} --inline`, { stdio: 'inherit' });
  });

  test.afterAll(() => {
    if (outDir && fs.existsSync(outDir)) {
      fs.rmSync(outDir, { recursive: true, force: true });
    }
  });

  test('devrait rendre les composants ScreenDraft en position absolue', async ({ page }) => {
    const indexPath = path.resolve(process.cwd(), outDir, 'index.html');
    await page.goto(`file://${indexPath}`);

    // 1. Vérifie le Titre (mappé depuis Title)
    const title = page.locator('h1').first();
    await expect(title).toBeVisible();
    
    // Vérifie que le parent du titre est en position absolue (comportement de l'adaptateur)
    // L'adaptateur met le style sur le composant lui-même
    const titleStyle = await title.evaluate((el) => window.getComputedStyle(el).position);
    expect(titleStyle).toBe('absolute');

    // 2. Vérifie la Navbar
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
    await expect(nav).toContainText('MonSite');

    // 3. Vérifie la Map (via son wrapper)
    const mapWrapper = page.locator('.map-wrapper');
    await expect(mapWrapper).toBeVisible();
    const mapStyle = await mapWrapper.evaluate((el) => window.getComputedStyle(el).position);
    expect(mapStyle).toBe('absolute');

    // 4. Vérifie le bouton
    const button = page.getByRole('button', { name: 'Bouton' });
    await expect(button).toBeVisible();
    const btnStyle = await button.evaluate((el) => window.getComputedStyle(el).position);
    expect(btnStyle).toBe('absolute');
  });
});
