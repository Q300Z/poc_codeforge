import { describe, expect, it } from "vitest";

import { Grid } from "./Grid.js";

describe("Grid Component", () => {
  const meta = { version: "1.0.0", createdAt: "2026-01-26T10:00:00Z" };

  it("should render correct column classes for responsive layout", () => {
    const html = Grid({ ...meta, cols: 4, gap: 10 }, [], {}, "grid-1");

    expect(html).toContain("grid-cols-1"); // Mobile first
    expect(html).toContain("md:grid-cols-4"); // Desktop
    expect(html).toContain("gap-10");
  });

  it("should render children inside the grid", () => {
    const children = ["<div id='child-1'></div>", "<div id='child-2'></div>"];
    const html = Grid(meta, children, {}, "grid-1");

    expect(html).toContain("id='child-1'");
    expect(html).toContain("id='child-2'");
  });
});
