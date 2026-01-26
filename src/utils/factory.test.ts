import { describe, expect, it } from "vitest";

import { createComponent } from "./factory.js";

describe("Component Factory", () => {
  it("should inject style variables and a11y attributes into the template", () => {
    const TestComponent = createComponent({
      name: "Test",
      version: "1.0.0",
      authorizedTokens: ["color"],
      template: (_props, _children, styleVars, a11yAttrs, _id) =>
        `<div style="${styleVars}" ${a11yAttrs}></div>`,
    });

    const html = TestComponent({ "aria-hidden": "true" }, [], { color: "red" }, "test-id");

    expect(html).toContain('style="--color: red;"');
    expect(html).toContain('id="test-id"');
    expect(html).toContain('aria-hidden="true"');
  });

  it("should transform audioDescription meta into aria-label", () => {
    const TestComponent = createComponent({
      name: "Test",
      version: "1.0.0",
      authorizedTokens: [],
      template: (_meta, _children, _styleVars, a11yAttrs) => `<div ${a11yAttrs}></div>`,
    });

    const html = TestComponent({ audioDescription: "Un bouton génial" }, [], {}, "test-id");
    expect(html).toContain('aria-label="Un bouton génial"');
  });

  it("should generate a random id if none is provided", () => {
    const TestComponent = createComponent({
      name: "Test",
      version: "1.0.0",
      authorizedTokens: [],
      template: (_props, _children, _styleVars, _a11yAttrs, id) => id,
    });

    const id1 = TestComponent({}, [], {});
    const id2 = TestComponent({}, [], {});

    expect(id1).toBeDefined();
    expect(id1).not.toBe(id2);
  });
});
