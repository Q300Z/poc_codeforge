import { CSSLength } from "../types.js";
import { NodeBuilder } from "../utils/builder.js";
import { createComponent } from "../utils/factory.js";

/** Interface des Design Tokens pour le composant Container. */
export interface ContainerStyles {
  /** Largeur maximale du conteneur (ex: 1200, "80rem"). */
  "container-width"?: CSSLength;
}

/**
 * @class ContainerBuilder
 * @description Constructeur fluide pour les conteneurs centrés.
 */
export class ContainerBuilder extends NodeBuilder<any, ContainerStyles> {
  constructor(id: string) {
    super(id, "Container");
  }
}

/**
 * @constant Container
 * @description Conteneur qui centre son contenu avec une largeur maximale réglable.
 */
export const Container = createComponent({
  name: "Container",
  version: "1.1.0",
  authorizedTokens: ["container-width"],
  template: (_meta, children, styleVars, a11yAttrs) => `
    <div style="${styleVars}" class="container-center" ${a11yAttrs}>
      ${children.join("")}
    </div>
  `,
});
