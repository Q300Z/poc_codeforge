export interface Node {
  id: string;
  type: string;
  meta: Record<string, unknown>;
  style?: Record<string, string>;
  children?: Node[];
}

export interface PageNode extends Node {
  type: "Page";
}

export interface SiteNode {
  meta: {
    appName: string;
    version: string;
    createdAt: string;
    [key: string]: unknown;
  };
  style?: Record<string, string>;
  layout?: {
    header?: Node;
    footer?: Node;
  };
  pages: {
    slug: string;
    content: PageNode;
  }[];
}

export type ComponentHTML = string;
export type Component = (
  meta: Record<string, unknown>,
  children: ComponentHTML[],
  style?: Record<string, string>,
  id?: string
) => ComponentHTML;
