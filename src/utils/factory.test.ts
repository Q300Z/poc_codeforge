import { describe, expect, it } from "vitest";

import { createComponent } from "./factory.js";

describe("Component Factory", () => {
  it("should inject style variables and a11y attributes into the template", () => {
    const TestComponent = createComponent({
      name: "Test",
      authorizedTokens: ["color"],
      template: (_props, _children, styleVars, a11yAttrs) =>
        `<div style="${styleVars}" ${a11yAttrs}></div>`,
    });

    const html = TestComponent({ id: "test-id", "aria-hidden": "true", role: "presentation" }, [], {
      color: "red",
    });

    expect(html).toContain('style="--color: red;"');
    expect(html).toContain('id="test-id"');
    expect(html).toContain('aria-hidden="true"');
    expect(html).toContain('role="presentation"');
  });

  it("should handle empty props and styles", () => {
    const TestComponent = createComponent({
      name: "Test",
      authorizedTokens: [],
      template: (_props, _children, styleVars, a11yAttrs) =>
        `<div style="${styleVars}" ${a11yAttrs}></div>`,
    });

    const html = TestComponent({}, [], {});
    expect(html).toBe('<div style="" ></div>');
  });
});
