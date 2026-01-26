import { expect, test } from "@playwright/test";

test.describe("Page de rendu JSON", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("devrait afficher le titre correct de l'application", async ({ page }) => {
    await expect(page).toHaveTitle(/ForgeEngine Showcase/);
  });

  test("le menu mobile devrait s'ouvrir et se fermer", async ({ page, isMobile }) => {
    if (!isMobile) return;

    // On cherche le bouton qui a un aria-label "Ouvrir le menu" (plus robuste)
    const burger = page.getByRole("button", { name: /Ouvrir/i });
    const menu = page.locator("[id^='menu-']"); // N'importe quel menu mobile

    await expect(menu).toBeHidden();
    await burger.click();
    await expect(menu).toBeVisible();
    await burger.click();
    await expect(menu).toBeHidden();
  });

  test("le stack principal devrait être présent", async ({ page }) => {
    const stack = page.locator("#features-stack");
    await expect(stack).toBeVisible();
  });
});