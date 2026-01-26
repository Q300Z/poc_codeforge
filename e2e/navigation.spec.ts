import { expect, test } from "@playwright/test";

test.describe("Navigation Multi-Page", () => {
  test("devrait naviguer de l'accueil vers la page contact", async ({ page }) => {
    await page.goto("/");
    
    // Cliquer sur le bouton de contact
    const contactBtn = page.getByRole("link", { name: "Nous contacter" });
    await contactBtn.click();
    
    // Vérifier l'URL et le contenu
    await expect(page).toHaveURL(/\/contact.html$/);
    const heroTitle = page.locator("h1");
    await expect(heroTitle).toContainText("Contactez-nous");
  });

  test("devrait revenir à l'accueil depuis la page contact", async ({ page }) => {
    await page.goto("/contact.html");
    
    // Cliquer sur le bouton de retour
    const homeBtn = page.getByRole("link", { name: "Retour à l'accueil" });
    await homeBtn.click();
    
    // Vérifier le retour
    await expect(page).toHaveURL(/\/index.html$/);
    await expect(page.locator("h1")).toContainText("Moteur de Rendu v3");
  });
});
