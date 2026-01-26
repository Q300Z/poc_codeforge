import { createComponent } from "../utils/factory.js";

export const Button = createComponent({
  name: "Button",
  authorizedTokens: [
    "btn-bg",
    "btn-text",
    "bg-color",
    "text-color",
    "position",
    "top",
    "left",
    "width",
    "height",
  ],
  template: (meta, _, styleVars, a11yAttrs) => {
    const action = (meta.action as string) || "";
    const isLink = action.startsWith("/") || action.startsWith("http") || action.startsWith("#");
    const label = meta.label || "Click me";

    if (isLink) {
      return `
        <a 
          href="${action}"
          style="${styleVars}"
          class="btn-base no-underline"
          ${a11yAttrs}
        >
          ${label}
        </a>
      `;
    }

    const onclick = action ? `onclick="${action}"` : "";
    return `
      <button 
        type="button" 
        style="${styleVars}"
        class="btn-base"
        ${a11yAttrs}
        ${onclick}
      >
        ${label}
      </button>
    `;
  },
});
