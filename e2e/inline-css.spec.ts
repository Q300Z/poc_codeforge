import { test, expect } from '@playwright/test';
import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

const outDir = 'dist-inline-test';

test.describe('Inline CSS Build', () => {
  test.beforeAll(() => {
    // Run the build with --inline
    // Ensure we run the build command from the project root
    execSync(`node dist/cli.js data/site.json ${outDir} --inline`, { stdio: 'inherit', cwd: process.cwd() });
  });

  test.afterAll(() => {
    // Cleanup
    if (fs.existsSync(outDir)) {
      fs.rmSync(outDir, { recursive: true, force: true });
    }
  });

  test('should generate HTML with inlined CSS', async ({ page }) => {
    const indexPath = path.resolve(process.cwd(), outDir, 'index.html');
    
    // Playwright can access local files
    await page.goto(`file://${indexPath}`);

    // Check for <style> tag in head (Vite singlefile puts it there)
    const styleTag = page.locator('head > style');
    
    // There might be multiple style tags depending on vite injection, but we expect at least one containing our app css
    // Actually vite-plugin-singlefile merges assets.
    
    // Verify we have inlined styles
    const styles = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('style')).map(s => s.innerHTML);
    });
    
    const hasAppStyle = styles.some(s => s.includes('.btn-base') || s.includes('--brand-primary'));
    expect(hasAppStyle).toBe(true);

    // Check absence of external stylesheet links
    const externalLinks = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
    });
    expect(externalLinks.length).toBe(0);
  });
});
