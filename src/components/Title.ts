import { CSSColor, CSSLength } from "../types.js";
import { NodeBuilder } from "../utils/builder.js";
import { createComponent } from "../utils/factory.js";
import { validateContrast } from "../utils/style.js";

/** Interface des métadonnées pour le composant Title. */
export interface TitleMeta {
  /** Le texte du titre (fallback si pas d'enfants). */
  content: string;
  /** Niveau sémantique (1=H1, 2=H2, ..., 6=H6). Défaut : 1. */
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Couleur de fond héritée pour le calcul de contraste. */
  parentBg?: string;
  /** Couleur de fond sombre héritée. */
  parentBgDark?: string;
}

/** Interface des Design Tokens pour le composant Title. */
export interface TitleStyles {
  /** Taille de police personnalisée. */
  "font-size"?: CSSLength;
  /** Couleur du texte. */
  "title-text"?: CSSColor;
  /** Couleur de fond du bloc de titre. */
  "title-bg"?: CSSColor;
  /** Poids de la police. */
  "font-weight"?: number | string;
  /** Alignement du texte. */
  "text-align"?: "left" | "center" | "right" | "justify";
}

/**
 * @class TitleBuilder
 * @description Constructeur fluide pour les titres sémantiques (H1-H6).
 */
export class TitleBuilder extends NodeBuilder<TitleMeta, TitleStyles> {
  constructor(id: string) {
    super(id, "Title");
  }
  /** Définit le contenu textuel. */
  withContent(content: string): this {
    this.node.meta.content = content;
    return this;
  }
  /** Définit le niveau HTML (1 pour <h1>, etc.). */
  withLevel(level: TitleMeta["level"]): this {
    this.node.meta.level = level;
    return this;
  }
  /** Définit l'alignement du texte. */
  withAlign(align: TitleStyles["text-align"]): this {
    this.node.style = { ...this.node.style, "text-align": align };
    return this;
  }
  /** Définit le poids de la police. */
  withWeight(weight: TitleStyles["font-weight"]): this {
    this.node.style = { ...this.node.style, "font-weight": weight };
    return this;
  }
}

/**
 * @constant Title
 * @description Composant de titre sémantique.
 * Il gère automatiquement la hiérarchie visuelle et l'accessibilité.
 */
export const Title = createComponent({
  name: "Title",
  version: "1.2.0",
  description:
    "Titre sémantique (H1-H6) avec hiérarchie visuelle fluide et support de l'accessibilité native.",
  authorizedTokens: ["font-size", "title-text", "title-bg", "font-weight", "text-align"],
  template: (
    meta: Record<string, any>,
    children: string[],
    styleVars,
    a11yAttrs,
    _id,
    getStyleAttr,
    styleVarsDark
  ) => {
    const level = Math.min(Math.max(Number(meta.level) || 1, 1), 6);
    const tag = `h${level}`;

    // Tailles fluides avec clamp(min, val, max) pour la réactivité sans classes
    const responsiveSizes = [
      "clamp(2.25rem, 5vw + 1rem, 3.75rem)", // H1
      "clamp(1.875rem, 4vw + 1rem, 3rem)", // H2
      "clamp(1.5rem, 3vw + 1rem, 2.25rem)", // H3
      "clamp(1.25rem, 2vw + 1rem, 1.875rem)", // H4
      "clamp(1.125rem, 1.5vw + 1rem, 1.5rem)", // H5
      "clamp(1rem, 1vw + 1rem, 1.25rem)", // H6
    ];

    const defaultSize = responsiveSizes[level - 1];

    // Priorité aux enfants, sinon fallback sur meta.content
    const finalContent = children && children.length > 0 ? children.join("") : meta.content || "";

    const extraStyles = `font-size:var(--font-size,${defaultSize});font-weight:var(--font-weight,800);text-align:var(--text-align,left);`;

    // 1. Validation du contraste Mode Clair
    let colorStyle = "color:var(--title-text,inherit);";
    if (meta.parentBg && styleVars.includes("--title-text:")) {
      const match = styleVars.match(/--title-text:([^;]+);/);
      if (match) {
        const validatedColor = validateContrast(match[1], meta.parentBg, "Title", _id);
        colorStyle = `color:${validatedColor};`;
      }
    }

    // 2. Validation du contraste Mode Sombre
    let colorStyleDark = "";
    if (styleVarsDark.includes("--dark-title-text:")) {
      const match = styleVarsDark.match(/--dark-title-text:([^;]+);/);
      if (match) {
        const darkBg = meta.parentBgDark || "#111827";
        const validatedColor = validateContrast(match[1], darkBg, "Title (Dark)", _id);
        colorStyleDark = `--dark-title-text:${validatedColor};`;
      }
    }

    return `
      <${tag} 
        ${getStyleAttr(styleVars + styleVarsDark + extraStyles + colorStyle + colorStyleDark)} 
        class="bg-[var(--title-bg,transparent)] dark:bg-[var(--dark-title-bg,transparent)] tracking-tight leading-tight m-0 dark:text-[var(--dark-title-text,inherit)]"
        ${a11yAttrs}
      >
        ${finalContent}
      </${tag}>
    `;
  },
});
