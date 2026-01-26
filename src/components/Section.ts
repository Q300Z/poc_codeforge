import { createComponent } from "../utils/factory.js";
import { NodeBuilder } from "../utils/builder.js";

export interface SectionStyles {
  "section-bg"?: string;
  "section-py"?: string | number;
}

export class SectionBuilder extends NodeBuilder<any, SectionStyles> {
  constructor(id: string) { super(id, "Section"); }
}

export const Section = createComponent({
  name: "Section",
  version: "1.1.0",
  authorizedTokens: ["section-bg", "section-py"],
  template: (_meta, children, styleVars, a11yAttrs) => `
    <section style="${styleVars}" class="section-pad" ${a11yAttrs}>${children.join("")}</section>
  `,
});