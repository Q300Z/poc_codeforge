import { AppBarBuilder } from "../components/AppBar.js";
import { ButtonBuilder } from "../components/Button.js";
import { CarouselBuilder } from "../components/Carousel.js";
import { FormBuilder } from "../components/Form.js";
import { FormFieldBuilder } from "../components/FormField.js";
import { ImageBuilder } from "../components/Image.js";
import { MapBuilder } from "../components/Map.js";
import { PageBuilder } from "../components/Page.js";
import { SelectBuilder } from "../components/Select.js";
import { TableBuilder } from "../components/Table.js";
import { TextBuilder } from "../components/Text.js";
import { TextareaBuilder } from "../components/Textarea.js";
import { TitleBuilder } from "../components/Title.js";
import { VideoBuilder } from "../components/Video.js";
import { SiteNode } from "../types.js";
import { NodeBuilder, SiteBuilder } from "../utils/builder.js";
import { Placeholder } from "../utils/placeholder.js";

// --- Types ScreenDraft (Source) ---

interface ScreenDraftMeta {
  appName: string;
  createdAt: string;
  version: string;
}

interface ScreenDraftComponent {
  id: string;
  type:
    | "title"
    | "text"
    | "button"
    | "image"
    | "video"
    | "map"
    | "carousel"
    | "form"
    | "navbar"
    | "table"
    | "select"
    | "textarea"
    | "box"
    | "section"
    | "icon";
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
  // Table
  tableData?: string[][];
  // Select
  selectOptions?: string[];
  selectPlaceholder?: string;
  // Textarea
  textareaPlaceholder?: string;
  textareaRows?: number;
  // Map
  mapCenter?: { lat: number; lng: number };
  mapZoom?: number;
  mapMarkers?: { id: string; lat: number; lng: number; name?: string }[];
  // Form
  [key: string]: any;
}

export interface ScreenDraftData {
  meta: ScreenDraftMeta;
  components: ScreenDraftComponent[];
}

// --- Adapter ---

export class ScreenDraftAdapter {
  static async transform(data: ScreenDraftData): Promise<SiteNode> {
    const pageBuilder = new PageBuilder("home")
      .withAppName(data.meta.appName)
      .withStyle({ position: "relative", width: "100%", "min-height": "100vh" });

    for (const comp of data.components) {
      const node = await this.mapComponent(comp);
      if (node) {
        pageBuilder.addChild(node);
      }
    }

    return new SiteBuilder(data.meta.appName)
      .withVersion(data.meta.version)
      .addPage("index", pageBuilder)
      .build();
  }

  private static async mapComponent(comp: ScreenDraftComponent): Promise<NodeBuilder<any, any> | null> {
    let builder: NodeBuilder<any, any>;

    // Mapping commun des styles de positionnement
    const commonStyle: Record<string, any> = {
      x: comp.x,
      y: comp.y,
      width: comp.width,
      height: comp.height,
      position: "absolute",
      "z-index": 1, // Par défaut pour le canvas
    };

    const isTextBased = ["title", "text", "button", "select", "textarea"].includes(comp.type);
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
          .withSrc(Placeholder.custom(comp.width || 400, comp.height || 300))
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
          const w = comp.width || 800;
          const h = comp.height || 400;
          comp.carouselImages.forEach((img, index) => {
            carousel.addItem(Placeholder.custom(w, h, { text: `Slide ${index + 1}` }), img.alt);
          });
        }
        builder = carousel;
        break;
      }

      case "navbar":
        builder = new AppBarBuilder(comp.id)
          .withTitle(comp.navbarLogoText || "My App")
          .withLinks(comp.navbarLinks || [])
          .withStyle({
            ...commonStyle,
            "appbar-bg": comp.backgroundColor,
            "appbar-text": comp.textColor,
          });
        break;

      case "map":
        builder = new MapBuilder(comp.id).withStyle({
          ...commonStyle,
          "map-height": comp.height,
        });

        // Mapping des propriétés spécifiques ScreenDraft
        if (comp.mapCenter) {
          (builder as MapBuilder).withView(
            comp.mapCenter.lat,
            comp.mapCenter.lng,
            comp.mapZoom || 6
          );
        }

        if (comp.mapMarkers) {
          builder.withMeta({ markers: comp.mapMarkers } as any);
        }

        // Si ScreenDraft fournit une source GeoJSON (extension possible)
        if (comp.mapSrc) {
          (builder as MapBuilder).withSrc(comp.mapSrc);
        }
        break;

      case "form": {
        const form = new FormBuilder(comp.id)
          .withButtonText(comp.formButtonText || "Envoyer")
          .withStyle({
            ...commonStyle,
            "form-bg": comp.backgroundColor,
          });

        if (comp.formFields) {
          comp.formFields.forEach((field: any) => {
            form.addChild(
              new FormFieldBuilder(field.id)
                .withLabel(field.label)
                .withType(field.type)
                .withPlaceholder(field.placeholder)
            );
          });
        }
        builder = form;
        break;
      }

      case "table": {
        const tableData = comp.tableData || [];
        const headers = tableData.length > 0 ? tableData[0] : [];
        const rows = tableData.length > 1 ? tableData.slice(1) : [];
        builder = new TableBuilder(comp.id)
          .withHeaders(headers)
          .withRows(rows)
          .withCaption(comp.content || "Tableau")
          .withStyle({
            ...commonStyle,
            "table-header-bg": comp.backgroundColor,
            "table-header-text": comp.textColor,
          });
        break;
      }

      case "select": {
        const options = (comp.selectOptions || []).map((opt) => ({
          label: opt,
          value: opt.toLowerCase().replace(/\s+/g, "-"),
        }));
        builder = new SelectBuilder(comp.id)
          .withLabel(comp.content || "Sélectionnez")
          .withName(`select-${comp.id}`)
          .withOptions(options)
          .withStyle({
            ...commonStyle,
            "select-bg": comp.backgroundColor,
            "select-text": comp.textColor,
          });
        if (comp.selectPlaceholder) {
          builder.withMeta({ placeholder: comp.selectPlaceholder } as any);
        }
        break;
      }

      case "textarea": {
        builder = new TextareaBuilder(comp.id)
          .withLabel(comp.content || "Message")
          .withName(`textarea-${comp.id}`)
          .withStyle({
            ...commonStyle,
            "textarea-bg": comp.backgroundColor,
            "textarea-text": comp.textColor,
          });
        if (comp.textareaPlaceholder) {
          builder.withMeta({ placeholder: comp.textareaPlaceholder } as any);
        }
        if (comp.textareaRows) {
          builder.withMeta({ rows: comp.textareaRows } as any);
        }
        break;
      }

      case "box":
      case "icon": {
        // Un icone est souvent une box avec un fond ou une image
        const { BoxBuilder } = await import("../components/Box.js");
        builder = new BoxBuilder(comp.id).withStyle({
          ...commonStyle,
          backgroundColor: comp.backgroundColor,
        });
        break;
      }

      case "section": {
        const { SectionBuilder } = await import("../components/Section.js");
        builder = new SectionBuilder(comp.id).withStyle({
          ...commonStyle,
          backgroundColor: comp.backgroundColor,
        });
        break;
      }

      default:
        console.warn(`[Adapter] Type de composant non supporté ou ignoré : ${comp.type}`);
        return null;
    }

    return builder;
  }
}
