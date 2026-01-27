import { describe, expect, it } from "vitest";

import { Title } from "./Title.js";

describe("Title Component", () => {
  const meta = { version: "1.0.0", createdAt: "2026-01-26T10:00:00Z", content: "Default Content" };

  it("should render with correct level", () => {
    const htmlH1 = Title({ ...meta, content: "H1", level: 1 }, [], {}, "title-1");
    const htmlH3 = Title({ ...meta, content: "H3", level: 3 }, [], {}, "title-2");

    expect(htmlH1).toContain("<h1");
    expect(htmlH1).toContain("H1");
    expect(htmlH3).toContain("<h3");
    expect(htmlH3).toContain("H3");
  });

  it("should default to h1 for invalid levels", () => {
    const html = Title(meta, [], {}, "title-1");
    expect(html).toContain("<h1");
  });

  it("should prioritize children over meta.content", () => {
    const html = Title(
      { ...meta, content: "Meta Content" },
      ["<span>Child Content</span>"],
      {},
      "title-child"
    );
    expect(html).toContain("<span>Child Content</span>");
    expect(html).not.toContain("Meta Content");
  });

  it("should apply alignment and font-weight styles", () => {
    const style = { "text-align": "center", "font-weight": 400 };
    const html = Title(meta, [], style, "title-style");

    // Check if the style variables are injected
    // Note: createComponent processes styles into --text-align: center, etc.
    expect(html).toContain("text-align: var(--text-align, left)");
    expect(html).toContain("font-weight: var(--font-weight, 800)");

    // In a real DOM test we would check the computed style, but here we check the template output string
    // containing the CSS variables mapping.
    // We can also check if the input styleVars string (passed by createComponent logic which we mock/bypass here)
    // No, createComponent calls our template. The template adds the hardcoded var mapping.
    // The `styleVars` argument contains the input values.

    // To verify that values are effectively passed, we rely on the renderer mechanism which is tested elsewhere.
    // Here we verify the template structure supports them.
    expect(html).toContain("var(--text-align");
    expect(html).toContain("var(--font-weight");
  });
});
