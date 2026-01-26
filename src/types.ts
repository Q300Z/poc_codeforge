export interface Node {
  id: string;
  type: string;
  meta: Record<string, unknown>; // Contient TOUT : version, createdAt ET contenu (label, title, etc.)
  style?: Record<string, string>;
  children?: Node[];
}

export interface PageNode extends Node {
  type: "Page";
  meta: {
    appName: string;
    version: string;
    createdAt: string;
    [key: string]: unknown;
  };
}

export type ComponentHTML = string;
export type Component = (
  meta: Record<string, unknown>,
  children: ComponentHTML[],
  style?: Record<string, string>,
  id?: string
) => ComponentHTML;
