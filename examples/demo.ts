import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { 
  SiteBuilder, 
  PageBuilder, 
  AppBarBuilder, 
  HeroBuilder, 
  GridBuilder, 
  ButtonBuilder,
  buildSite 
} from "../src/index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function runDemo() {
  console.log("🚀 Lancement de la démo CodeForge...");

  // 1. Construction du site via les Builders
  const site = new SiteBuilder("CodeForge Demo")
    .withGlobalStyle({ "border-radius": "8px" })
    .withHeader(
      new AppBarBuilder("main-nav")
        .withTitle("CodeForge SDK")
        .withLinks([
          { label: "Accueil", href: "index.html" },
          { label: "Documentation", href: "/docs" }
        ])
    )
    .addPage("index", 
      new PageBuilder("home-page")
        .withAppName("Ma Super Démo")
        .addChild(
          new HeroBuilder("hero")
            .withTitle("Construisez plus vite.")
            .withSubtitle("Le moteur de rendu JSON -> HTML industriel.")
        )
        .addChild(
          new GridBuilder("features")
            .withCols(3)
            .withGap(8)
            .addChild(
              new ButtonBuilder("btn-1")
                .withLabel("Démarrer")
                .withAction("/get-started")
            )
            .addChild(
              new ButtonBuilder("btn-2")
                .withLabel("GitHub")
                .withAction("https://github.com")
            )
        )
    )
    .build();

  // 2. Sauvegarde du JSON pour inspection
  const jsonPath = path.join(__dirname, "demo.json");
  fs.writeFileSync(jsonPath, JSON.stringify(site, null, 2));
  console.log(`✅ JSON généré : ${jsonPath}`);

  // 3. Génération du site HTML
  const outDir = path.join(__dirname, "generated");
  console.log("📦 Génération du site HTML...");
  
  try {
    await buildSite(jsonPath, outDir);
    console.log(`✨ Site généré avec succès dans : ${outDir}`);
    console.log(`🔗 Ouvrez ${path.join(outDir, "index.html")} pour voir le résultat.`);
  } catch (err) {
    console.error("❌ Erreur lors du build :", err);
  }
}

runDemo();
