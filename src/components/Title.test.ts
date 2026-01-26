import { describe, expect, it } from "vitest";

import { Title } from "./Title.js";

describe("Title Component", () => {
  const meta = { version: "1.0.0", createdAt: "2026-01-26T10:00:00Z" };

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
});
