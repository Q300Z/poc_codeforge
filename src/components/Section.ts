import { CSSColor, CSSLength } from "../types.js";
import { NodeBuilder } from "../utils/builder.js";
import { createComponent } from "../utils/factory.js";

/** Interface des Design Tokens pour le composant Section. */
export interface SectionStyles {
  /** Couleur de fond de la section. */
  "section-bg"?: CSSColor;
  /** Padding vertical (marge interne). */
  "section-py"?: CSSLength;
}

/**
 * @class SectionBuilder
 * @description Constructeur fluide pour les grandes sections de page.
 */
export class SectionBuilder extends NodeBuilder<any, SectionStyles> {
  constructor(id: string) {
    super(id, "Section");
  }
}

/**
 * @constant Section
 * @description Unité structurelle horizontale pleine largeur pour découper la page.
 */
export const Section = createComponent({
  name: "Section",
  version: "1.1.0",
  description:
    "Unité structurelle horizontale pleine largeur utilisée pour découper la page en blocs thématiques.",
  authorizedTokens: ["section-bg", "section-py"],
  template: (_meta, children, styleVars, a11yAttrs) => `
    <section style="${styleVars}" class="section-pad bg-[var(--section-bg,transparent)]" ${a11yAttrs}>
      ${children.join("")}
    </section>
  `,
});
