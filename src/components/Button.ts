import { createComponent } from "../utils/factory.js";

export const Button = createComponent({
  name: "Button",
  description: "Un composant interactif polyvalent servant de bouton ou de lien.",
  metaSchema: {
    label: "Le texte affiché sur le bouton.",
    action: "URL de redirection (ex: /home, http://...) ou code JavaScript (ex: alert('hi')).",
  },
  authorizedTokens: {
    "btn-bg": "Couleur de fond spécifique au bouton.",
    "btn-text": "Couleur du texte spécifique au bouton.",
    "bg-color": "Variable CSS pour le fond (alias legacy).",
    "text-color": "Variable CSS pour le texte (alias legacy).",
  },
  template: (meta, _, styleVars, a11yAttrs) => {
    const action = (meta.action as string) || "";
    const isLink =
      action.startsWith("/") ||
      action.startsWith("http") ||
      action.startsWith("#") ||
      action.startsWith("mailto:") ||
      action.endsWith(".html");
    const label = meta.label || "Click me";

    if (isLink) {
      return `<a href="${action}" style="${styleVars}" class="btn-base no-underline" ${a11yAttrs}>${label}</a>`;
    }

    const onclick = action ? `onclick="${action}"` : "";
    return `<button type="button" style="${styleVars}" class="btn-base" ${a11yAttrs} ${onclick}>${label}</button>`;
  },
});
