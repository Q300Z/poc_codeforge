import { NodeBuilder } from "../utils/builder.js";
import { createComponent } from "../utils/factory.js";

/** Interface des métadonnées pour le composant Stack. */
export interface StackMeta {
  /** Orientation des éléments. */
  direction?: "vertical" | "horizontal";
  /** Alignement transverse (cross-axis). */
  align?: "start" | "center" | "end" | "stretch";
  /** Justification principale (main-axis). */
  justify?: "start" | "center" | "end" | "between";
  /** Espacement entre les items (0-16). */
  gap?: number;
}

/** Interface des Design Tokens pour le composant Stack. */
export interface StackStyles {
  /** Espacement personnalisé via variable CSS. */
  "stack-gap"?: string | number;
}

/**
 * @class StackBuilder
 * @description Constructeur fluide pour le moteur d'alignement Flexbox.
 */
export class StackBuilder extends NodeBuilder<StackMeta, StackStyles> {
  constructor(id: string) {
    super(id, "Stack");
  }
  /** Définit l'orientation. */
  withDirection(direction: StackMeta["direction"]): this {
    this.node.meta.direction = direction;
    return this;
  }
  /** Définit l'alignement des items. */
  withAlign(align: StackMeta["align"]): this {
    this.node.meta.align = align;
    return this;
  }
  /** Définit la justification du contenu. */
  withJustify(justify: StackMeta["justify"]): this {
    this.node.meta.justify = justify;
    return this;
  }
  /** Définit l'espacement. */
  withGap(gap: number): this {
    this.node.meta.gap = gap;
    return this;
  }
}

/**
 * @constant Stack
 * @description Moteur d'espacement et d'alignement utilisant Flexbox.
 */
export const Stack = createComponent({
  name: "Stack",
  version: "1.1.0",
  authorizedTokens: ["stack-gap"],
  template: (meta: Record<string, any>, children, styleVars, a11yAttrs) => {
    return `<div style="${styleVars}" class="flex ${meta.direction === "horizontal" ? "flex-row" : "flex-col"} gap-${meta.gap || 6}" ${a11yAttrs}>${children.join("")}</div>`;
  },
});
