import { BaseStyles, Node, SiteNode } from "../types.js";

/**
 * Builder de base générique et STRICT
 */
export class NodeBuilder<TMeta = Record<string, any>, TStyle = Record<string, any>> {
  protected node: Node<any, any>;

  constructor(id: string, type: string) {
    if (!id || !type) throw new Error(`[CodeForge Builder] "id" and "type" are mandatory`);
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

  withStyle(style: BaseStyles & TStyle): this {
    this.node.style = { ...this.node.style, ...style };
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
 * Orchestrateur de Site (Global)
 */
export class SiteBuilder {
  private site: SiteNode;
  constructor(appName: string) {
    this.site = {
      meta: { appName, version: "1.0.0", createdAt: new Date().toISOString() },
      style: {}, layout: {}, pages: [],
    };
  }
  withVersion(version: string): this { this.site.meta.version = version; return this; }
  withGlobalStyle(style: BaseStyles): this { this.site.style = { ...this.site.style, ...style }; return this; }
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
  addPage(slug: string, page: any): this {
    this.site.pages.push({ slug, content: page instanceof NodeBuilder ? page.build() : page });
    return this;
  }
  build(): SiteNode { return this.site; }
}