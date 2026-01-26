import { NodeBuilder } from "../utils/builder.js";
import { createComponent } from "../utils/factory.js";

/** Interface des Design Tokens pour le composant Box. */
export interface BoxStyles {
  /** Couleur de fond du bloc. */
  "bg-color"?: string;
  /** Largeur explicite. */
  width?: string | number;
  /** Hauteur explicite. */
  height?: string | number;
  /** Rayon des angles. */
  "border-radius"?: string | number;
  /** Capacité à se réduire dans une Flexbox (0 ou 1). */
  "flex-shrink"?: string | number;
}

/**
 * @class BoxBuilder
 * @description Constructeur fluide pour les blocs de base et placeholders.
 */
export class BoxBuilder extends NodeBuilder<any, BoxStyles> {
  constructor(id: string) {
    super(id, "Box");
  }
}

/**
 * @constant Box
 * @description Composant de structure polyvalent (div stylisée).
 */
export const Box = createComponent({
  name: "Box",
  version: "1.1.0",
  description: "Un bloc de structure simple.",
  authorizedTokens: ["bg-color", "width", "height", "border-radius", "flex-shrink"],
  template: (_meta, _children, styleVars, a11yAttrs) => `
    <div 
      style="${styleVars}" 
      class="bg-[var(--bg-color,#e5e7eb)] w-[var(--width,100%)] h-[var(--height,100px)] rounded-[var(--border-radius,0.5rem)]"
      ${a11yAttrs}
    ></div>
  `,
});
