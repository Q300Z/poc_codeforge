import { createComponent } from "../utils/factory.js";
import { NodeBuilder } from "../utils/builder.js";

export interface TextMeta {
  content: string;
  tag?: "p" | "span" | "div";
}

export interface TextStyles {
  "font-size"?: string | number;
  "text-color"?: string;
  "line-height"?: string | number;
}

export class TextBuilder extends NodeBuilder<TextMeta, TextStyles> {
  constructor(id: string) { super(id, "Text"); }
  withContent(content: string): this { this.node.meta.content = content; return this; }
  withTag(tag: TextMeta["tag"]): this { this.node.meta.tag = tag; return this; }
}

export const Text = createComponent({
  name: "Text",
  version: "1.0.0",
  authorizedTokens: ["font-size", "text-color", "line-height"],
  template: (meta: Record<string, any>, _, styleVars, a11yAttrs) => {
    const tag = meta.tag || "p";
    return `<${tag} style="${styleVars}" ${a11yAttrs}>${meta.content || ""}</${tag}>`;
  },
});