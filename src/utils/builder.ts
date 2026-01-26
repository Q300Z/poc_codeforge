/**
 * @file builder.ts
 * @description Implémentation du Design Pattern Builder pour une construction fluide et propre du JSON.
 */

import { BaseStyles, Node, SiteNode } from "../types.js";

/**
 * Nettoie un objet en supprimant les clés indéfinies, nulles ou les structures vides.
 * @param obj L'objet à nettoyer.
 * @returns Un objet épuré.
 * @internal
 */
function cleanObject(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(cleanObject).filter((v) => v !== undefined);
  }
  if (obj !== null && typeof obj === "object") {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      const cleaned = cleanObject(value);
      // On garde uniquement si la valeur n'est pas vide/indéfinie
      if (
        cleaned !== undefined &&
        cleaned !== null &&
        !(Array.isArray(cleaned) && cleaned.length === 0) &&
        !(typeof cleaned === "object" && Object.keys(cleaned).length === 0)
      ) {
        acc[key] = cleaned;
      }
      return acc;
    }, {} as any);
  }
  return obj;
}

/**
 * @class NodeBuilder
 * @description Constructeur de base pour tous les composants CodeForge.
 * Gère les métadonnées obligatoires et l'accessibilité.
 * @template TMeta Type des métadonnées (props).
 * @template TStyle Type des Design Tokens.
 */
export class NodeBuilder<TMeta = Record<string, any>, TStyle = Record<string, any>> {
  protected node: Node<any, any>;

  /**
   * @param id Identifiant unique (requis).
   * @param type Nom du composant (ex: 'Button').
   */
  constructor(id: string, type: string) {
    if (!id || !type) throw new Error(`[CodeForge Builder] "id" et "type" sont obligatoires`);
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

  /** Ajoute des données métier au composant. */
  withMeta(meta: TMeta): this {
    this.node.meta = { ...this.node.meta, ...meta };
    return this;
  }

  /** Applique des styles CSS ou des Design Tokens. */
  withStyle(style: BaseStyles & TStyle): this {
    this.node.style = { ...this.node.style, ...style };
    return this;
  }

  /** Définit la version de l'instance. */
  withVersion(version: string): this {
    this.node.meta.version = version;
    return this;
  }

  /** Définit la date de création manuellement. */
  withCreatedAt(date: string): this {
    this.node.meta.createdAt = date;
    return this;
  }

  /** Ajoute une description pour les lecteurs d'écran (aria-label). */
  withAudioDescription(desc: string): this {
    this.node.meta.audioDescription = desc;
    return this;
  }

  /** Définit le rôle sémantique ARIA. */
  withRole(role: string): this {
    this.node.meta.ariaRole = role;
    return this;
  }

  /** Cache l'élément aux technologies d'assistance. */
  withAriaHidden(hidden: boolean = true): this {
    this.node.meta.ariaHidden = hidden;
    return this;
  }

  /** Ajoute un enfant (Node ou Builder). */
  addChild(child: Node<any, any> | NodeBuilder<any, any>): this {
    const finalChild = child instanceof NodeBuilder ? child.build() : child;
    if (!this.node.children) this.node.children = [];
    this.node.children.push(finalChild);
    return this;
  }

  /**
   * Finalise et nettoie l'objet JSON.
   * @returns {Node<TMeta, TStyle>} L'objet épuré sans propriétés vides.
   */
  build(): Node<TMeta, TStyle> {
    return cleanObject(this.node) as Node<TMeta, TStyle>;
  }
}

/**
 * @class SiteBuilder
 * @description Ordonnanceur pour la génération d'un site complet.
 */
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

  /** Définit la version globale du site. */
  withVersion(version: string): this {
    this.site.meta.version = version;
    return this;
  }

  /** Active le mode debug visuel sur tout le site. */
  withDebug(enabled: boolean = true): this {
    this.site.pages.forEach((p) => {
      if (p.content?.meta) p.content.meta.debug = enabled;
    });
    return this;
  }

  /** Définit les styles globaux (Design Tokens). */
  withGlobalStyle(style: BaseStyles): this {
    this.site.style = { ...this.site.style, ...style };
    return this;
  }

  /** Définit l'en-tête commun. */
  withHeader(header: Node<any, any> | NodeBuilder<any, any>): this {
    if (!this.site.layout) this.site.layout = {};
    this.site.layout.header = header instanceof NodeBuilder ? header.build() : header;
    return this;
  }

  /** Définit le pied de page commun. */
  withFooter(footer: Node<any, any> | NodeBuilder<any, any>): this {
    if (!this.site.layout) this.site.layout = {};
    this.site.layout.footer = footer instanceof NodeBuilder ? footer.build() : footer;
    return this;
  }

  /** Ajoute une page au site. */
  addPage(slug: string, page: any): this {
    this.site.pages.push({
      slug,
      content: page instanceof NodeBuilder ? page.build() : page,
    });
    return this;
  }

  /**
   * Finalise et nettoie la structure du site.
   * @returns {SiteNode} Le site complet sans propriétés vides.
   */
  build(): SiteNode {
    return cleanObject(this.site) as SiteNode;
  }
}
