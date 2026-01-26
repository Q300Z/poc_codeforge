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

  test("devrait naviguer vers la page canvas", async ({ page, isMobile }) => {
    await page.goto("/");

    if (isMobile) {
      await page.getByRole("button", { name: /Ouvrir/i }).click();
      await page.locator("[id^='menu-']").getByRole("link", { name: "Canvas" }).click();
    } else {
      await page.locator("nav").getByRole("link", { name: "Canvas" }).click();
    }
    
    await expect(page).toHaveURL(/\/canvas.html$/);
    // On utilise l'ID pour disambiguer les H1 (Hero vs Footer)
        await expect(page.locator("#canvas-hero h1")).toContainText("Mode Canvas");
      });
    
      test("devrait naviguer vers la page media et afficher les composants", async ({ page, isMobile }) => {
        await page.goto("/");
    
        if (isMobile) {
          await page.getByRole("button", { name: /Ouvrir/i }).click();
          await page.locator("[id^='menu-']").getByRole("link", { name: "Media" }).click();
        } else {
          await page.locator("nav").getByRole("link", { name: "Media", exact: true }).click();
        }
        
        await expect(page).toHaveURL(/\/media.html$/);
        await expect(page.locator("img")).toBeVisible();
        await expect(page.locator("video")).toBeVisible();
      });
    });
    