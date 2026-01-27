import { ButtonBuilder } from "../components/Button.js";
import { CarouselBuilder } from "../components/Carousel.js";
import { ImageBuilder } from "../components/Image.js";
import { MapBuilder } from "../components/Map.js";
import { PageBuilder } from "../components/Page.js";
import { TextBuilder } from "../components/Text.js";
import { TitleBuilder } from "../components/Title.js";
import { VideoBuilder } from "../components/Video.js";
import { SiteNode } from "../types.js";
import { NodeBuilder, SiteBuilder } from "../utils/builder.js";

// --- Types ScreenDraft (Source) ---

interface ScreenDraftMeta {
  appName: string;
  createdAt: string;
  version: string;
}

interface ScreenDraftComponent {
  id: string;
  type: "title" | "text" | "button" | "image" | "video" | "map" | "carousel" | "form";
  x: number;
  y: number;
  width: number;
  height: number;
  content?: string;
  backgroundColor?: string;
  textColor?: string;
  fontSize?: number;
  // Props spécifiques
  imageSrc?: string;
  videoUrl?: string;
  carouselImages?: { id: string; src: string; alt: string }[];
  carouselAutoPlay?: boolean;
  carouselInterval?: number;
  // Map et Form (non supportés nativement pour l'instant -> ignorés ou placeholders)
  [key: string]: any;
}

export interface ScreenDraftData {
  meta: ScreenDraftMeta;
  components: ScreenDraftComponent[];
}

// --- Adapter ---

export class ScreenDraftAdapter {
  static transform(data: ScreenDraftData): SiteNode {
    const pageBuilder = new PageBuilder("home")
      .withAppName(data.meta.appName)
      .withStyle({ position: "relative", width: "100%", "min-height": "100vh" });

    data.components.forEach((comp) => {
      const node = this.mapComponent(comp);
      if (node) {
        pageBuilder.addChild(node);
      }
    });

    return new SiteBuilder(data.meta.appName)
      .withVersion(data.meta.version)
      .addPage("index", pageBuilder)
      .build();
  }

  private static mapComponent(comp: ScreenDraftComponent): NodeBuilder<any, any> | null {
    let builder: NodeBuilder<any, any> | null = null;

    // Mapping commun des styles de positionnement
    const commonStyle: Record<string, any> = {
      x: comp.x,
      y: comp.y,
      width: comp.width,
      height: comp.height,
      "z-index": 1, // Par défaut pour le canvas
    };

    const isTextBased = ["title", "text", "button"].includes(comp.type);
    if (comp.fontSize && isTextBased) {
      commonStyle["font-size"] = comp.fontSize;
    }

    switch (comp.type) {
      case "title":
        builder = new TitleBuilder(comp.id)
          .withContent(comp.content || "Sans titre")
          .withLevel(1) // Par défaut H1 pour les titres ScreenDraft
          .withStyle({
            ...commonStyle,
            "title-text": comp.textColor,
            "title-bg": comp.backgroundColor,
          });
        break;

      case "text":
        builder = new TextBuilder(comp.id).withContent(comp.content || "").withStyle({
          ...commonStyle,
          "text-color": comp.textColor,
          // backgroundColor n'est pas un token standard de Text, on pourrait utiliser Box pour le fond
          // mais ici on mappe directement.
        });
        break;

      case "button":
        builder = new ButtonBuilder(comp.id).withLabel(comp.content || "Click").withStyle({
          ...commonStyle,
          "btn-bg": comp.backgroundColor,
          "btn-text": comp.textColor,
        });
        break;

      case "image":
        builder = new ImageBuilder(comp.id)
          .withSrc(comp.imageSrc || "")
          .withAlt(comp.content || "Image")
          .withStyle({
            ...commonStyle,
            "object-fit": "cover",
          });
        break;

      case "video":
        builder = new VideoBuilder(comp.id)
          .withSrc(comp.videoUrl || "")
          .withOptions({ controls: true })
          .withStyle({
            ...commonStyle,
            "object-fit": "cover",
          });
        break;

      case "carousel": {
        const carousel = new CarouselBuilder(comp.id)
          .withOptions(comp.carouselAutoPlay, comp.carouselInterval)
          .withStyle({
            ...commonStyle,
            "carousel-color": comp.textColor,
          });

        if (comp.carouselImages) {
          comp.carouselImages.forEach((img) => {
            carousel.addItem(img.src, img.alt);
          });
        }
        builder = carousel;
        break;
      }

      case "map":
        builder = new MapBuilder(comp.id).withStyle({
          ...commonStyle,
          "map-height": comp.height,
        });
        // Si ScreenDraft fournit une source GeoJSON (extension possible)
        if (comp.mapSrc) {
          (builder as MapBuilder).withSrc(comp.mapSrc);
        }
        break;

      default:
        console.warn(`[Adapter] Type de composant non supporté ou ignoré : ${comp.type}`);
        return null;
    }

    return builder;
  }
}
