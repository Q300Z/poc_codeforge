import { describe, expect, it } from "vitest";

import { createComponent } from "./factory.js";

describe("Component Factory", () => {
  it("should inject style variables and a11y attributes into the template", () => {
    const TestComponent = createComponent({
      name: "Test",
      authorizedTokens: ["color"],
      template: (_props, _children, styleVars, a11yAttrs, _id) =>
        `<div style="${styleVars}" ${a11yAttrs}></div>`,
    });

    const html = TestComponent(
      { "aria-hidden": "true" },
      [],
      { color: "red" },
      "test-id"
    );

    expect(html).toContain('style="--color: red;"');
    expect(html).toContain('id="test-id"');
    expect(html).toContain('aria-hidden="true"');
  });

  it("should generate a random id if none is provided", () => {
    const TestComponent = createComponent({
      name: "Test",
      authorizedTokens: [],
      template: (_props, _children, _styleVars, _a11yAttrs, id) => id,
    });

    const id1 = TestComponent({}, [], {});
    const id2 = TestComponent({}, [], {});
    
    expect(id1).toBeDefined();
    expect(id1).not.toBe(id2);
  });
});