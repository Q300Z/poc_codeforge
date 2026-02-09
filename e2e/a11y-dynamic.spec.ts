import { expect, test } from "@playwright/test";

test.describe("Dynamic Accessibility & Interactivity", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should have a working skip link", async ({ page }) => {
    // Le lien est caché initialement
    const skipLink = page.getByRole("link", { name: "Passer au contenu principal" });
    
    // Tabule pour donner le focus
    await page.keyboard.press("Tab");
    await expect(skipLink).toBeFocused();
    await expect(skipLink).toBeVisible();

    // Entrée pour activer
    await page.keyboard.press("Enter");
    
    // Le focus doit être sur le contenu principal
    const main = page.locator("#main-content");
    await expect(main).toBeFocused();
  });

  test("mobile menu should manage focus and aria attributes", async ({ page, isMobile }) => {
    if (!isMobile) return;

    const burger = page.getByRole("button", { name: /Ouvrir/i });
    
    await expect(burger).toHaveAttribute("aria-expanded", "false");
    
    await burger.click();
    await expect(burger).toHaveAttribute("aria-expanded", "true");
    
    // Tabule dans le menu
    await page.keyboard.press("Tab");
    const firstLink = page.locator("#menu-global-nav a").first();
    await expect(firstLink).toBeFocused();
  });

  test("carousel should have accessible controls", async ({ page }) => {
    await page.goto("/layouts.html");
    const carousel = page.locator("[id^='sample-carousel']");
    await expect(carousel).toBeVisible();
    
    const nextBtn = carousel.locator("button[aria-label='Suivant']");
    await expect(nextBtn).toBeVisible();
    
    const prevBtn = carousel.locator("button[aria-label='Précédent']");
    await expect(prevBtn).toBeVisible();
  });
});
