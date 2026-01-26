/**
 * Structure de base OBLIGATOIRE d'un élément CodeForge
 */
export interface Node<TMeta = Record<string, any>, TStyle = Record<string, any>> {
  id: string; // Obligatoire
  type: string; // Obligatoire
  meta: TMeta & {
    version: string; // Obligatoire
    createdAt: string; // Obligatoire
    audioDescription?: string;
  };
  style?: TStyle & BaseStyles & Record<string, string | number>;
  children?: Node<any, any>[];
}

/**
 * Propriétés de mise en page autorisées globalement
 */
export type LayoutProperty =
  | "width"
  | "height"
  | "min-width"
  | "min-height"
  | "max-width"
  | "max-height"
  | "position"
  | "top"
  | "left"
  | "bottom"
  | "right"
  | "z-index"
  | "overflow"
  | "overflow-x"
  | "overflow-y"
  | "flex-shrink"
  | "flex-grow"
  | "transform"
  | "opacity"
  | "border-radius";

export type Breakpoint = "sm" | "md" | "lg" | "xl" | "2xl";

export type ResponsiveLayoutProps = {
  [K in LayoutProperty as `${K}-${Breakpoint}`]?: string | number;
};

export type BaseStyles = Partial<Record<LayoutProperty, string | number>> & ResponsiveLayoutProps;

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
  style?: BaseStyles & Record<string, string | number>;
  layout?: {
    header?: Node;
    footer?: Node;
  };
  pages: {
    slug: string;
    content: PageNode;
  }[];
}

export interface ScreenDraftComponent {
  id: string;
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
  content?: string;
  backgroundColor?: string;
  textColor?: string;
  fontSize?: number;
  [key: string]: unknown;
}

export interface ScreenDraftPage {
  meta: {
    appName: string;
    createdAt: string;
    version: string;
  };
  components: ScreenDraftComponent[];
}

export type ComponentHTML = string;
export type Component = (
  meta: Record<string, any>,
  children: ComponentHTML[],
  style?: Record<string, any>,
  id?: string
) => ComponentHTML;