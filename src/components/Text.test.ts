import { describe, expect, it } from "vitest";

import { Text } from "./Text.js";

describe("Text Component", () => {
  it("should render with content and default tag p", () => {
    const html = Text({ content: "Hello Text" }, [], {});
    expect(html).toContain("<p");
    expect(html).toContain("Hello Text");
  });

  it("should respect custom tag", () => {
    const html = Text({ content: "Span Text", tag: "span" }, [], {});
    expect(html).toContain("<span");
    expect(html).toContain("Span Text");
  });
});
