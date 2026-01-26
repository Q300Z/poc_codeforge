import { BaseStyles, Node, PageNode, SiteNode } from "../types.js";

/**
 * Builder de base générique
 */
export class NodeBuilder<TMeta = Record<string, any>, TStyle = Record<string, any>> {
  protected node: Node<any, any>;

  constructor(id: string, type: string) {
    if (!id || !type) {
      throw new Error(`[CodeForge Builder] "id" and "type" are mandatory for NodeBuilder`);
    }
    this.node = {
      id,
      type,
      meta: {
        version: "1.0.0",
        createdAt: new Date().toISOString(),
      },
      style: {},
      children: [],
    };
  }

  withMeta(meta: TMeta): this {
    this.node.meta = { ...this.node.meta, ...meta };
    return this;
  }

  withVersion(version: string): this {
    this.node.meta.version = version;
    return this;
  }

  withCreatedAt(date: string): this {
    this.node.meta.createdAt = date;
    return this;
  }

  withAudioDescription(desc: string): this {
    this.node.meta.audioDescription = desc;
    return this;
  }

  withStyle(style: TStyle & BaseStyles & Record<string, string | number>): this {
    this.node.style = { ...this.node.style, ...style };
    return this;
  }

  addChild(child: Node<any, any> | NodeBuilder<any, any>): this {
    const finalChild = child instanceof NodeBuilder ? child.build() : child;
    this.node.children = this.node.children || [];
    this.node.children.push(finalChild);
    return this;
  }

  build(): Node<TMeta, TStyle> {
    return this.node as Node<TMeta, TStyle>;
  }
}

/**
 * Builders Spécifiques
 */

export class AppBarBuilder extends NodeBuilder {
  constructor(id: string) {
    super(id, "AppBar");
  }
  withTitle(title: string): this {
    this.node.meta.title = title;
    return this;
  }
  withLinks(links: { label: string; href: string }[]): this {
    this.node.meta.links = links;
    return this;
  }
}

export class HeroBuilder extends NodeBuilder {
  constructor(id: string) {
    super(id, "Hero");
  }
  withTitle(title: string): this {
    this.node.meta.title = title;
    return this;
  }
  withSubtitle(subtitle: string): this {
    this.node.meta.subtitle = subtitle;
    return this;
  }
}

export class TitleBuilder extends NodeBuilder {
  constructor(id: string) {
    super(id, "Title");
  }
  withContent(content: string): this {
    this.node.meta.content = content;
    return this;
  }
  withLevel(level: 1 | 2 | 3 | 4 | 5 | 6): this {
    this.node.meta.level = level;
    return this;
  }
}

export class TextBuilder extends NodeBuilder {
  constructor(id: string) {
    super(id, "Text");
  }
  withContent(content: string): this {
    this.node.meta.content = content;
    return this;
  }
  withTag(tag: "p" | "span" | "div"): this {
    this.node.meta.tag = tag;
    return this;
  }
}

export class ButtonBuilder extends NodeBuilder {
  constructor(id: string) {
    super(id, "Button");
  }
  withLabel(label: string): this {
    this.node.meta.label = label;
    return this;
  }
  withAction(action: string): this {
    this.node.meta.action = action;
    return this;
  }
}

export class GridBuilder extends NodeBuilder {
  constructor(id: string) {
    super(id, "Grid");
  }
  withCols(cols: number): this {
    this.node.meta.cols = cols;
    return this;
  }
  withGap(gap: number): this {
    this.node.meta.gap = gap;
    return this;
  }
}

export class StackBuilder extends NodeBuilder {
  constructor(id: string) {
    super(id, "Stack");
  }
  withDirection(direction: "vertical" | "horizontal"): this {
    this.node.meta.direction = direction;
    return this;
  }
  withAlign(align: "start" | "center" | "end" | "stretch"): this {
    this.node.meta.align = align;
    return this;
  }
  withJustify(justify: "start" | "center" | "end" | "between"): this {
    this.node.meta.justify = justify;
    return this;
  }
  withGap(gap: number): this {
    this.node.meta.gap = gap;
    return this;
  }
}

export class SectionBuilder extends NodeBuilder {
  constructor(id: string) {
    super(id, "Section");
  }
}

export class ContainerBuilder extends NodeBuilder {
  constructor(id: string) {
    super(id, "Container");
  }
}

export class BoxBuilder extends NodeBuilder {
  constructor(id: string) {
    super(id, "Box");
  }
}

export class PageBuilder extends NodeBuilder {
  constructor(id: string) {
    super(id, "Page");
  }
  withDebug(enabled: boolean = true): this {
    this.node.meta.debug = enabled;
    return this;
  }
  build(): PageNode {
    return super.build() as PageNode;
  }
}

export class SiteBuilder {
  private site: SiteNode;
  constructor(appName: string) {
    this.site = {
      meta: { appName, version: "1.0.0", createdAt: new Date().toISOString() },
      style: {},
      layout: {},
      pages: [],
    };
  }
  withVersion(version: string): this {
    this.site.meta.version = version;
    return this;
  }
  withGlobalStyle(style: BaseStyles & Record<string, string | number>): this {
    this.site.style = { ...this.site.style, ...style };
    return this;
  }
  withHeader(header: Node<any, any> | NodeBuilder<any, any>): this {
    this.site.layout = this.site.layout || {};
    this.site.layout.header = header instanceof NodeBuilder ? header.build() : header;
    return this;
  }
  withFooter(footer: Node<any, any> | NodeBuilder<any, any>): this {
    this.site.layout = this.site.layout || {};
    this.site.layout.footer = footer instanceof NodeBuilder ? footer.build() : footer;
    return this;
  }
  addPage(slug: string, page: PageNode | PageBuilder): this {
    this.site.pages.push({ slug, content: page instanceof PageBuilder ? page.build() : page });
    return this;
  }
  build(): SiteNode {
    return this.site;
  }
}
