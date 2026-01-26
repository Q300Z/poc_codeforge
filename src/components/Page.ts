import { createComponent } from "../utils/factory.js";
import { Node, BaseStyles } from "../types.js";
import { NodeBuilder } from "../utils/builder.js";

export interface PageMeta {
  appName: string;
  debug?: boolean;
}

export interface PageNode extends Node<PageMeta, BaseStyles> {
  type: "Page";
}

export class PageBuilder extends NodeBuilder<PageMeta, BaseStyles> {
  constructor(id: string) { super(id, "Page"); }
  withAppName(name: string): this { this.node.meta.appName = name; return this; }
  withDebug(enabled: boolean = true): this { this.node.meta.debug = enabled; return this; }
  build(): PageNode { return super.build() as PageNode; }
}

export const Page = createComponent({
  name: "Page",
  version: "1.4.0",
  authorizedTokens: ["brand-primary", "brand-secondary", "appbar-bg", "section-py"],
  template: (meta: Record<string, any>, children, styleVars, _a11yAttrs, _id) => {
    return `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><title>${meta.appName || "Page"}</title><link rel="stylesheet" href="/src/style.css"></head>
<body style="${styleVars}" ${meta.debug ? 'data-debug-theme="true"' : ""}>
    ${meta.renderedHeader || ""}
    <main>${children.join("")}</main>
    ${meta.renderedFooter || ""}
</body>
</html>`;
  },
});
