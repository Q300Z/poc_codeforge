import { expect, test } from "@playwright/test";

test.describe("Navigation Multi-Page", () => {
  test("devrait naviguer de l'accueil vers la page contact", async ({ page, isMobile }) => {
    await page.goto("/");
    
    if (isMobile) {
      await page.locator("[id^='btn-main-nav']").click();
      // On clique sur le lien dans le menu mobile
      await page.locator("#menu-main-nav").getByRole("link", { name: "Contact", exact: true }).click();
    } else {
      await page.locator("nav").getByRole("link", { name: "Contact", exact: true }).click();
    }
    
    await expect(page).toHaveURL(/\/contact.html$/);
  });

  test("devrait naviguer vers les fonctionnalités", async ({ page, isMobile }) => {
    await page.goto("/");

    if (isMobile) {
      await page.locator("[id^='btn-main-nav']").click();
      await page.locator("#menu-main-nav").getByRole("link", { name: "Fonctionnalités" }).click();
    } else {
      await page.locator("nav").getByRole("link", { name: "Fonctionnalités" }).click();
    }
    
    await expect(page).toHaveURL(/\/features.html$/);
  });
});