import { carouselRuntime } from "../runtime/carousel.js";
import { CSSColor } from "../types.js";
import { NodeBuilder } from "../utils/builder.js";
import { createComponent } from "../utils/factory.js";

/** Interface des métadonnées pour le composant Carousel. */
export interface CarouselMeta {
  /** Liste des images du carrousel. */
  items: { src: string; alt: string; title?: string }[];
  /** Active le défilement automatique. */
  autoPlay?: boolean;
  /** Intervalle entre les slides en ms (défaut: 5000). */
  interval?: number;
}

/** Interface des Design Tokens pour le composant Carousel. */
export interface CarouselStyles {
  /** Couleur des flèches et indicateurs. */
  "carousel-color"?: CSSColor;
}

/**
 * @class CarouselBuilder
 * @description Constructeur fluide pour le composant Carousel.
 */
export class CarouselBuilder extends NodeBuilder<CarouselMeta, CarouselStyles> {
  constructor(id: string) {
    super(id, "Carousel");
  }
  /** Ajoute une image au carrousel. */
  addItem(src: string, alt: string, title?: string): this {
    if (!this.node.meta.items) this.node.meta.items = [];
    this.node.meta.items.push({ src, alt, title });
    return this;
  }
  /** Configure les options de lecture. */
  withOptions(autoPlay: boolean = true, interval: number = 5000): this {
    this.node.meta.autoPlay = autoPlay;
    this.node.meta.interval = interval;
    return this;
  }
}

/**
 * @constant Carousel
 * @description Composant carrousel d'images accessible avec navigation clavier.
 */
export const Carousel = createComponent({
  name: "Carousel",
  version: "1.0.1",
  runtime: carouselRuntime,
  description:
    "Composant carrousel interactif supportant le balayage, le clavier et l'accessibilité WCAG.",
  metaSchema: {
    items: {
      type: "array",
      description: "Liste des objets { src, alt, title }",
      required: true,
    },
    autoPlay: {
      type: "boolean",
      description: "Défilement automatique",
      default: false,
    },
    interval: {
      type: "number",
      description: "Temps entre les slides (ms)",
      default: 5000,
    },
  },
  authorizedTokens: {
    "carousel-color": "Couleur des éléments de contrôle",
  },
  examples: [
    {
      description: "Carrousel simple avec 3 images.",
      builderCode: `const gallery = new CarouselBuilder("home-gallery")
  .addItem("img1.jpg", "Description 1")
  .addItem("img2.jpg", "Description 2")
  .withOptions(true, 3000)
  .build();`,
    },
  ],
  template: (meta: Record<string, any>, _, styleVars, a11yAttrs, id, getStyleAttr, styleVarsDark) => {
    const items = (meta.items as CarouselMeta["items"]) || [];
    const interval = meta.interval || 5000;
    const autoPlay = !!meta.autoPlay;

    const slides = items
      .map(
        (item, index) => `
      <div 
        role="group" 
        aria-roledescription="slide" 
        aria-label="${index + 1} sur ${items.length}"
        class="carousel-slide flex-shrink-0 w-full h-full relative"
        data-index="${index}"
        ${index === 0 ? "" : 'aria-hidden="true"'}
      > 
        <img src="${item.src}" alt="${item.alt}" class="w-full h-full object-cover" />
        ${
          item.title
            ? `<div class="absolute bottom-12 left-0 right-0 bg-black/50 text-white p-4 text-center">
            <h3 class="text-lg font-bold">${item.title}</h3>
          </div>`
            : ""
        }
      </div>
    `
      )
      .join("");

    const indicators = items
      .map(
        (_, index) => `
      <button 
        type="button" 
        class="carousel-dot w-3 h-3 rounded-full transition-colors bg-[var(--carousel-color,white)]/50 hover:bg-[var(--carousel-color,white)]" 
        aria-label="Aller à la slide ${index + 1}"
        aria-current="${index === 0 ? "true" : "false"}"
        data-index="${index}"
      ></button>
    `
      )
      .join("");

    return `
    <div 
      ${getStyleAttr(styleVars + styleVarsDark)} 
      class="carousel-container relative overflow-hidden group rounded-[var(--border-radius,1rem)] h-[var(--height,clamp(300px,50vw,600px))]"
      ${a11yAttrs}
      role="region"
      aria-roledescription="carousel"
    >
      <!-- Slides wrapper -->
      <div id="wrapper-${id}" class="carousel-wrapper flex h-full transition-transform duration-500 ease-in-out">
        ${slides}
      </div>

      <!-- Controls -->
      <button 
        id="prev-${id}"
        class="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-[var(--carousel-color,black)]/30 hover:bg-[var(--carousel-color,black)]/50 text-[var(--carousel-color,white)] dark:bg-[var(--dark-carousel-color,white)]/30 dark:hover:bg-[var(--dark-carousel-color,white)]/50 dark:text-[var(--dark-carousel-color,black)]"
        aria-label="Slide précédente"
      >
        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
      </button>
      <button 
        id="next-${id}"
        class="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-[var(--carousel-color,black)]/30 hover:bg-[var(--carousel-color,black)]/50 text-[var(--carousel-color,white)] dark:bg-[var(--dark-carousel-color,white)]/30 dark:hover:bg-[var(--dark-carousel-color,white)]/50 dark:text-[var(--dark-carousel-color,black)]"
        aria-label="Slide suivante"
      >
        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
      </button>

      <!-- Indicators -->
      <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        ${indicators}
      </div>

      <script>CodeForge.initCarousel('${id}', ${autoPlay}, ${interval});</script>
    </div>`;
  },
});
