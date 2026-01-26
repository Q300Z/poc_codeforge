import { expect, test } from "@playwright/test";

test.describe("Navigation Multi-Page", () => {
  test("devrait naviguer de l'accueil vers la page contact", async ({ page, isMobile }) => {
    await page.goto("/");
    
    if (isMobile) {
      await page.getByRole("button", { name: /Ouvrir/i }).click();
      await page.locator("[id^='menu-']").getByRole("link", { name: "Contact", exact: true }).click();
    } else {
      await page.locator("nav").getByRole("link", { name: "Contact", exact: true }).click();
    }
    
    await expect(page).toHaveURL(/\/contact.html$/);
  });

  test("devrait naviguer vers les fonctionnalités", async ({ page, isMobile }) => {
    await page.goto("/");

    if (isMobile) {
      await page.getByRole("button", { name: /Ouvrir/i }).click();
      await page.locator("[id^='menu-']").getByRole("link", { name: "Layouts" }).click();
    } else {
      await page.locator("nav").getByRole("link", { name: "Layouts" }).click();
    }
    
    await expect(page).toHaveURL(/\/layouts.html$/);
  });
});
