import { CSSColor } from "../types.js";
import { NodeBuilder } from "../utils/builder.js";
import { createComponent } from "../utils/factory.js";

/** Interface des Design Tokens pour le composant Box. */
export interface BoxStyles {
  /** Couleur de fond du bloc. */
  "box-bg"?: CSSColor;
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
  version: "1.2.0",
  description:
    "Un bloc de structure simple qui hérite des styles de base (layout, dimensions, etc.).",
  authorizedTokens: ["box-bg"],
  template: (_meta, _children, styleVars, a11yAttrs, _id, getStyleAttr) => {
    // On combine les variables de layout avec la règle de couleur de fond
    const combinedStyle = `background-color:var(--box-bg,#e5e7eb);${styleVars}`;
    return `
    <div 
      ${getStyleAttr(combinedStyle)} 
      class="min-h-[100px]"
      ${a11yAttrs}
    ></div>
  `;
  },
});
