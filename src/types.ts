/**
 * TYPES UNIVERSELS CODEFORGE
 */

export type LayoutProperty =
  | "width" | "height" | "min-width" | "min-height" | "max-width" | "max-height"
  | "position" | "top" | "left" | "bottom" | "right" | "z-index"
  | "overflow" | "overflow-x" | "overflow-y" | "flex-shrink" | "flex-grow"
  | "transform" | "opacity" | "border-radius";

export type Breakpoint = "sm" | "md" | "lg" | "xl" | "2xl";

export type ResponsiveLayoutProps = {
  [K in LayoutProperty as `${K}-${Breakpoint}`]?: string | number;
};

export type BaseStyles = Partial<Record<LayoutProperty, string | number>> & ResponsiveLayoutProps;

export interface Node<TMeta = Record<string, any>, TStyle = Record<string, never>> {
  id: string;
  type: string;
  meta: TMeta & {
    version: string;
    createdAt: string;
    audioDescription?: string;
  };
  style?: BaseStyles & TStyle;
  children?: Node<any, any>[];
}

export interface SiteNode {
  meta: {
    appName: string;
    version: string;
    createdAt: string;
    [key: string]: unknown;
  };
  style?: BaseStyles;
  layout?: {
    header?: Node<any, any>;
    footer?: Node<any, any>;
  };
  pages: {
    slug: string;
    content: any; // Sera typé PageNode dans Page.ts
  }[];
}

export type ComponentHTML = string;
export type Component = (
  meta: Record<string, any>,
  children: ComponentHTML[],
  style?: Record<string, any>,
  id?: string
) => ComponentHTML;