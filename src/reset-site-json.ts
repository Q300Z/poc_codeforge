import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

// Utilisation du Design Pattern Builder finalisé
import {
  AppBarBuilder,
  BoxBuilder,
  ButtonBuilder,
  ContainerBuilder,
  GridBuilder,
  HeroBuilder,
  PageBuilder,
  SectionBuilder,
  SiteBuilder,
  StackBuilder,
  TextBuilder,
  TitleBuilder,
} from "./index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Header Global
const header = new AppBarBuilder("global-nav")
  .withTitle("CodeForge")
  .withLinks([
    { label: "Showcase", href: "index.html" },
    { label: "Layouts", href: "layouts.html" },
    { label: "Canvas", href: "canvas.html" },
    { label: "Contact", href: "contact.html" },
  ]);

// 2. Footer Global
const footer = new SectionBuilder("global-footer")
  .withStyle({ "section-bg": "#111827", "section-py": 32 })
  .addChild(
    new ContainerBuilder("footer-cont").addChild(
      new HeroBuilder("footer-text")
        .withTitle("CodeForge POC")
        .withSubtitle("© 2026")
        .withStyle({ "hero-text": "#9ca3af", "hero-bg": "transparent" })
    )
  );

// 3. Site
const site = new SiteBuilder("CodeForge Ultimate Showcase")
  .withVersion("3.5.0")
  .withGlobalStyle({
    "brand-primary": "#4f46e5",
    "brand-secondary": "#06b6d4",
    "btn-bg-default": "var(--brand-primary)",
    "btn-text-default": "#ffffff",
    "appbar-bg": "rgba(255, 255, 255, 0.8)",
    "hero-bg-default": "#ffffff",
    "section-py": 40,
  })
  .withHeader(header)
  .withFooter(footer);

// 4. Page Accueil
const homePage = new PageBuilder("home-page")
  .addChild(
    new HeroBuilder("hero-home")
      .withTitle("Bienvenue")
      .withSubtitle("Découvrez la puissance des Builders typés.")
  )
  .addChild(
    new ContainerBuilder("cta").addChild(
      new StackBuilder("s").withAlign("center").addChild(
        new ButtonBuilder("b")
          .withVersion("1.3.0")
          .withLabel("Voir les Layouts")
          .withAction("layouts.html")
          .withAudioDescription("Naviguer vers la page layouts")
      )
    )
  );

site.addPage("index", homePage);

// 5. Page Layouts
const layoutsPage = new PageBuilder("layouts-page")
  .addChild(
    new HeroBuilder("feat-hero")
      .withTitle("Galerie de Layouts")
      .withSubtitle("Mise en page fluide et typée via Builders.")
  )
  .addChild(
    new SectionBuilder("grid-demo").addChild(
      new ContainerBuilder("c1").addChild(
        new HeroBuilder("t1")
          .withTitle("1. Grille Responsive (3 cols)")
          .withSubtitle("S'empile sur mobile.")
          .withStyle({ "section-py": 16 })
      ).addChild(
        new GridBuilder("features-grid")
          .withCols(3)
          .withGap(6)
          .addChild(new BoxBuilder("box1").withStyle({ "bg-color": "#f87171" }))
          .addChild(new BoxBuilder("box2").withStyle({ "bg-color": "#60a5fa" }))
          .addChild(new BoxBuilder("box3").withStyle({ "bg-color": "#34d399" }))
      )
    )
  );

site.addPage("layouts", layoutsPage);

// 6. Page Canvas
const canvasPage = new PageBuilder("canvas-page")
  .withStyle({ position: "relative", height: 600, overflow: "hidden" })
  .addChild(
    new HeroBuilder("canvas-hero")
      .withTitle("Mode Canvas")
      .withSubtitle("Emplacements précis via coordonnées X et Y.")
  )
  .addChild(
    new BoxBuilder("abs-box-1")
      .withStyle({
        position: "absolute",
        top: 250,
        left: 50,
        width: 150,
        height: 150,
        "bg-color": "#818cf8"
      })
  )
  .addChild(
    new BoxBuilder("abs-box-2")
      .withStyle({
        position: "absolute",
        top: 300,
        left: 150,
        width: 100,
        height: 100,
        "bg-color": "#fbbf24",
        "z-index": 10
      })
  );

site.addPage("canvas", canvasPage);

// 7. Page Contact
const contactPage = new PageBuilder("contact-page")
  .addChild(
    new HeroBuilder("contact-hero")
      .withTitle("Contact")
      .withSubtitle("Parlons ensemble.")
  )
  .addChild(
    new ContainerBuilder("contact-content").addChild(
      new StackBuilder("contact-stack").addChild(
        new TitleBuilder("contact-title").withContent("Envoyez-nous un message").withLevel(2)
      ).addChild(
        new TextBuilder("contact-desc").withContent("Notre équipe est disponible 7j/7 pour répondre à vos questions sur CodeForge.")
      ).addChild(
        new ButtonBuilder("mail-btn").withLabel("Email").withAction("mailto:hello@codeforge.dev")
      )
    )
  );

site.addPage("contact", contactPage);

const showcaseSite = site.build();
const jsonPath = path.resolve(__dirname, "../data/site.json");

console.log("🔄 Resetting data/site.json...");
fs.writeFileSync(jsonPath, JSON.stringify(showcaseSite, null, 2));
console.log("✅ data/site.json has been restored!");
