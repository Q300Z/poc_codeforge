import { describe, expect, it } from "vitest";

import { Text } from "./Text.js";

describe("Text Component", () => {
  const meta = { version: "1.0.0", createdAt: "2026-01-26T10:00:00Z" };

  it("should render with content and default tag p", () => {
    const html = Text({ ...meta, content: "Hello Text" }, [], {}, "text-1");
    expect(html).toContain("<p");
    expect(html).toContain("Hello Text");
  });

  it("should respect custom tag", () => {
    const html = Text({ ...meta, content: "Span Text", tag: "span" }, [], {}, "text-1");
    expect(html).toContain("<span");
    expect(html).toContain("Span Text");
  });
});
