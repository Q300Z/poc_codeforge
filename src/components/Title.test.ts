import { describe, expect, it } from "vitest";

import { Title } from "./Title.js";

describe("Title Component", () => {
  it("should render with correct level", () => {
    const htmlH1 = Title({ content: "H1", level: 1 }, [], {});
    const htmlH3 = Title({ content: "H3", level: 3 }, [], {});
    
    expect(htmlH1).toContain("<h1");
    expect(htmlH1).toContain("H1");
    expect(htmlH3).toContain("<h3");
    expect(htmlH3).toContain("H3");
  });

  it("should default to h1 for invalid levels", () => {
    const html = Title({ content: "Title" }, [], {});
    expect(html).toContain("<h1");
  });
});