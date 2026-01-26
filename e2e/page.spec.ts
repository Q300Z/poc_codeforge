import { expect, test } from "@playwright/test";

test.describe("Page de rendu JSON", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("devrait afficher le titre correct de l'application", async ({ page }) => {
    await expect(page).toHaveTitle(/Site Industriel v3/);
  });

  test("le menu mobile devrait s'ouvrir et se fermer", async ({ page, isMobile }) => {
    if (!isMobile) return;

    const burger = page.locator("#mobile-menu-button");
    const menu = page.locator("#mobile-menu");

    await expect(menu).toBeHidden();
    await burger.click();
    await expect(menu).toBeVisible();
    await burger.click();
    await expect(menu).toBeHidden();
  });

  test("le stack principal devrait être présent", async ({ page }) => {
    const stack = page.locator("#cta-stack");
    await expect(stack).toBeVisible();
  });
});
