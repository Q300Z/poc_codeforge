import { createComponent } from "../utils/factory.js";
import { NodeBuilder } from "../utils/builder.js";

export interface TitleMeta {
  content: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export interface TitleStyles {
  "font-size"?: string | number;
  "text-color"?: string;
  "bg-color"?: string;
}

export class TitleBuilder extends NodeBuilder<TitleMeta, TitleStyles> {
  constructor(id: string) { super(id, "Title"); }
  withContent(content: string): this { this.node.meta.content = content; return this; }
  withLevel(level: TitleMeta["level"]): this { this.node.meta.level = level; return this; }
}

export const Title = createComponent({
  name: "Title",
  version: "1.1.0",
  authorizedTokens: ["font-size", "text-color", "bg-color"],
  template: (meta: Record<string, any>, _, styleVars, a11yAttrs) => {
    const level = Math.min(Math.max(Number(meta.level) || 1, 1), 6);
    const tag = `h${level}`;
    return `<${tag} style="${styleVars}" ${a11yAttrs}>${meta.content || ""}</${tag}>`;
  },
});