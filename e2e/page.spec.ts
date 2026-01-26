import { expect, test } from "@playwright/test";

test.describe("Page de rendu JSON", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("devrait afficher le titre correct de l'application", async ({ page }) => {
    await expect(page).toHaveTitle(/ForgeEngine Ultimate Showcase/);
  });

  test("le menu mobile devrait s'ouvrir et se fermer", async ({ page, isMobile }) => {
    if (!isMobile) return;

    const burger = page.getByRole("button", { name: /Ouvrir/i });
    const menu = page.locator("[id^='menu-']");

    await expect(menu).toBeHidden();
    await burger.click();
    await expect(menu).toBeVisible();
    await burger.click();
    await expect(menu).toBeHidden();
  });

  test("le hero principal devrait être présent", async ({ page }) => {
    const hero = page.locator("#hero-home");
    await expect(hero).toBeVisible();
  });
});
