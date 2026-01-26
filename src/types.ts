/**
 * @file types.ts
 * @description Définitions des types fondamentaux et de l'accessibilité.
 */

/**
 * Interface regroupant les propriétés d'accessibilité (A11y).
 * Ces propriétés permettent aux lecteurs d'écran de décrire l'interface aux malvoyants.
 */
export interface A11yMeta {
  /** 
   * Description textuelle lue par le lecteur d'écran (traduit en aria-label).
   * @example "Fermer la boîte de dialogue"
   */
  audioDescription?: string;
  /** 
   * Rôle ARIA sémantique de l'élément.
   * @example "banner", "main", "complementary", "alert"
   */
  ariaRole?: string;
  /** 
   * Indique si l'élément et ses enfants doivent être ignorés par les lecteurs d'écran.
   */
  ariaHidden?: boolean;
}

/** Propriétés de mise en page native. */
export type LayoutProperty =
  | "width" | "height" | "min-width" | "min-height" | "max-width" | "max-height"
  | "position" | "top" | "left" | "bottom" | "right" | "z-index"
  | "overflow" | "overflow-x" | "overflow-y" | "flex-shrink" | "flex-grow"
  | "transform" | "opacity" | "border-radius";

export type Breakpoint = "sm" | "md" | "lg" | "xl" | "2xl";
export type ResponsiveLayoutProps = { [K in LayoutProperty as `${K}-${Breakpoint}`]?: string | number };
export type BaseStyles = Partial<Record<LayoutProperty, string | number>> & ResponsiveLayoutProps;

/**
 * Structure de base d'un élément CodeForge.
 * @template TMeta Métadonnées spécifiques.
 * @template TStyle Design Tokens spécifiques.
 */
export interface Node<TMeta = Record<string, any>, TStyle = Record<string, any>> {
  id: string;
  type: string;
  meta: TMeta & A11yMeta & {
    version: string;
    createdAt: string;
  };
  style?: BaseStyles & TStyle;
  children?: Node<any, any>[];
}

/** Structure globale du site. */
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
    content: any;
  }[];
}

export type ComponentHTML = string;
export type Component = (
  meta: Record<string, any>,
  children: ComponentHTML[],
  style?: Record<string, any>,
  id?: string
) => ComponentHTML;
