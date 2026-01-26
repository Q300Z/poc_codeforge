/**
 * @file gen-docs.ts
 * @description Script de génération automatique de la documentation technique des composants.
 */

import { generateComponentDocs } from "./utils/docs.js";
import { setupRegistry } from "./setup.js";

/**
 * Exécute la génération de la documentation.
 * Initialise d'abord le registre pour découvrir tous les composants disponibles.
 */
async function run() {
  console.log("📚 Début de la génération de la documentation CodeForge...");

  try {
    // 1. Initialisation du registre (indispensable pour que docs.ts trouve les composants)
    setupRegistry();

    // 2. Lancement du générateur
    const outputDir = "docs/components";
    await generateComponentDocs();

    console.log(`✨ Documentation générée avec succès dans : ${outputDir}`);
  } catch (error) {
    console.error("❌ Échec de la génération de la documentation :");
    console.error(error);
    process.exit(1);
  }
}

run();