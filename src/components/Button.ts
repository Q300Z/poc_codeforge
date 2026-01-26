import { createComponent } from "../utils/factory.js";
import { NodeBuilder } from "../utils/builder.js";

export interface ButtonMeta {
  label: string;
  action?: string;
}

export interface ButtonStyles {
  "btn-bg"?: string;
  "btn-text"?: string;
  "bg-color"?: string;
  "text-color"?: string;
}

export class ButtonBuilder extends NodeBuilder<ButtonMeta, ButtonStyles> {
  constructor(id: string) { super(id, "Button"); }
  withLabel(label: string): this { this.node.meta.label = label; return this; }
  withAction(action: string): this { this.node.meta.action = action; return this; }
}

export const Button = createComponent({
  name: "Button",
  version: "1.3.0",
  description: "Bouton ou lien interactif.",
  metaSchema: { label: "Texte", action: "URL ou JS" },
  authorizedTokens: ["btn-bg", "btn-text", "bg-color", "text-color"],
  template: (meta: Record<string, any>, _, styleVars, a11yAttrs) => {
    const action = meta.action || "";
    const isLink = action.startsWith("/") || action.startsWith("http") || action.endsWith(".html");
    const label = meta.label || "Click me";

    if (isLink) return `<a href="${action}" style="${styleVars}" class="btn-base" ${a11yAttrs}>${label}</a>`;
    return `<button type="button" style="${styleVars}" class="btn-base" ${a11yAttrs} onclick="${action}">${label}</button>`;
  },
});
