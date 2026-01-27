import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

// Utilisation du Design Pattern Builder finalisé
import {
  AppBarBuilder,
  BoxBuilder,
  ButtonBuilder,
  CarouselBuilder,
  ContainerBuilder,
  GridBuilder,
  HeroBuilder,
  ImageBuilder,
  PageBuilder,
  SectionBuilder,
  SiteBuilder,
  StackBuilder,
  TextBuilder,
  TitleBuilder,
  VideoBuilder,
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
    { label: "Media", href: "media.html" },
    { label: "Contact", href: "contact.html" },
  ]);

// 2. Footer Global (RÉPARÉ : Utilise des composants atomiques au lieu d'un Hero)
const footer = new SectionBuilder("global-footer")
  .withStyle({ "section-bg": "#111827", "section-py": 32 })
  .addChild(
    new ContainerBuilder("footer-cont").addChild(
      new StackBuilder("footer-stack")
        .withAlign("center")
        .withGap(4)
        .addChild(
          new TitleBuilder("footer-title")
            .withContent("CodeForge POC")
            .withLevel(3)
            .withStyle({ "text-color": "#ffffff", "font-size": "1.25rem" })
        )
        .addChild(
          new TextBuilder("footer-copy")
            .withContent("© 2026 - Le futur du rendu JSON.")
            .withStyle({ "text-color": "#9ca3af", "font-size": "0.875rem" })
        )
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
  } as any)
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
      new ContainerBuilder("c1")
      .addChild(
        new TitleBuilder("t1")
          .withLevel(2)
          .withContent("1. Grille Responsive (3 cols)")
      ).addChild(
        new GridBuilder("features-grid")
          .withCols(3)
          .withGap(6)
          .addChild(new BoxBuilder("box1").withStyle({ "bg-color": "#f87171" }))
          .addChild(new BoxBuilder("box2").withStyle({ "bg-color": "#60a5fa" }))
          .addChild(new BoxBuilder("box3").withStyle({ "bg-color": "#34d399" }))
      ).addChild(
        new TitleBuilder("t2")
          .withLevel(2)
          .withContent("2. Stack Vertical avec Espacement")
      ).addChild(
     new StackBuilder("pstack")
          .withAlign("center")
          .withGap(4)
          .addChild(new BoxBuilder("pbox1").withStyle({ "bg-color": "#fbbf24" }))
          .addChild(new BoxBuilder("pbox2").withStyle({ "bg-color": "#a78bfa" }))
          .addChild(new BoxBuilder("pbox3").withStyle({ "bg-color": "#f472b6" }))
          .addChild(new BoxBuilder("pbox4").withStyle({ "bg-color": "#34d399" }))
      ).addChild(
        new TitleBuilder("t3")
          .withLevel(2)
          .withContent("3. Différents Titres")
      ).addChild(
        new TitleBuilder("title-h1").withLevel(1).withContent("Titre Niveau 1")
      ).addChild(
        new TitleBuilder("title-h2").withLevel(2).withContent("Titre Niveau 2")
      ).addChild(
        new TitleBuilder("title-h3").withLevel(3).withContent("Titre Niveau 3")
      ).addChild(
        new TitleBuilder("title-h4").withLevel(4).withContent("Titre Niveau 4")
      ).addChild(
        new TitleBuilder("title-h5").withLevel(5).withContent("Titre Niveau 5")
      ).addChild(
        new TitleBuilder("title-h6").withLevel(6).withContent("Titre Niveau 6")
      ).addChild(new TitleBuilder("c1").withLevel(2).withContent("Courousel")).addChild(
        new CarouselBuilder("sample-carousel")
          .addItem("https://picsum.photos/seed/pic1/800/400", "Image Aléatoire 1", "Première image du carrousel")
          .addItem("https://picsum.photos/seed/pic2/800/400", "Image Aléatoire 2", "Deuxième image du carrousel")
          .addItem("https://picsum.photos/seed/pic3/800/400", "Image Aléatoire 3", "Troisième image du carrousel")
          .withOptions(true, 4000)  
      )
    )
  );

site.addPage("layouts", layoutsPage);

// 6. Page Canvas
const canvasPage = new PageBuilder("canvas-page")
  .withDebug() // Activation du mode debug visuel
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
  )
  .addChild(
    new TitleBuilder("abs-title")
      .withContent("Placement Libre")
      .withLevel(3)
      .withStyle({
        position: "absolute",
        top: 220,
        right: 100,
        "text-color": "#1e1b4b"
      })
  )
  .addChild(
    new TextBuilder("abs-text")
      .withContent("Ce texte est positionné dynamiquement via des coordonnées CSS absolues.")
      .withStyle({
        position: "absolute",
        bottom: 50,
        left: 50,
        "max-width": "300px",
        "text-color": "#4338ca"
      })
  )
  .addChild(
    new ButtonBuilder("abs-btn")
      .withLabel("Action Flottante")
      .withAction("alert('Cliqué !')")
      .withStyle({
        position: "absolute",
        top: 400,
        right: 50,
        "z-index": 20
      })
  )
  .addChild(
    new ImageBuilder("abs-img")
      .withSrc("https://picsum.photos/seed/canvas/300/200")
      .withAlt("Image flottante")
      .withStyle({
        position: "absolute",
        top: 50,
        right: 50,
        width: 200,
        "border-radius": "20px",
        "z-index": 5
      })
  )
  .addChild(
    new VideoBuilder("abs-video")
      .withSrc("https://www.w3schools.com/html/mov_bbb.mp4")
      .withOptions({ controls: true, muted: true, autoplay: true, loop: true })
      .withStyle({
        position: "absolute",
        bottom: 20,
        right: 20,
        width: 250,
        "border-radius": "10px",
        "z-index": 15
      })
  );

site.addPage("canvas", canvasPage);

// 6.5 Page Media
const mediaPage = new PageBuilder("media-page")
  .addChild(
    new HeroBuilder("media-hero")
      .withTitle("Composants Média")
      .withSubtitle("Intégrez des images et des vidéos de manière accessible.")
  )
  .addChild(
    new ContainerBuilder("media-container").addChild(
      new GridBuilder("media-grid")
        .withCols(2)
        .withGap(8)
        .addChild(
          new ImageBuilder("demo-image")
            .withSrc("https://picsum.photos/seed/codeforge/800/600")
            .withAlt("Une image de démonstration générée aléatoirement")
            .withAudioDescription("Image décorative montrant la puissance du rendu visuel")
            .withStyle({ "border-radius": "12px" })
        )
        .addChild(
          new VideoBuilder("demo-video")
            .withSrc("https://www.w3schools.com/html/mov_bbb.mp4")
            .withPoster("https://picsum.photos/seed/video-poster/800/600")
            .withOptions({ controls: true, autoplay: false })
            .withAudioDescription("Vidéo de démonstration Big Buck Bunny")
            .withStyle({ "border-radius": "12px" })
        )
    )
  );

site.addPage("media", mediaPage);

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