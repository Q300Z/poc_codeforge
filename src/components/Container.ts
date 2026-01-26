import { createComponent } from "../utils/factory.js";
import { NodeBuilder } from "../utils/builder.js";

export interface ContainerStyles {
  "container-width"?: string | number;
}

export class ContainerBuilder extends NodeBuilder<any, ContainerStyles> {
  constructor(id: string) { super(id, "Container"); }
}

export const Container = createComponent({
  name: "Container",
  version: "1.1.0",
  authorizedTokens: ["container-width"],
  template: (_meta, children, styleVars, a11yAttrs) => `
    <div style="${styleVars}" class="container-center" ${a11yAttrs}>${children.join("")}</div>
  `,
});