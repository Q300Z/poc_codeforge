import { describe, expect, it } from "vitest";

import { Grid } from "./Grid.js";

describe("Grid Component", () => {
  it("should render correct column classes for responsive layout", () => {
    const html = Grid({ cols: 4, gap: 10 }, []);

    expect(html).toContain("grid-cols-1"); // Mobile first
    expect(html).toContain("md:grid-cols-4"); // Desktop
    expect(html).toContain("gap-10");
  });

  it("should render children inside the grid", () => {
    const children = ["<div id='child-1'></div>", "<div id='child-2'></div>"];
    const html = Grid({}, children);

    expect(html).toContain("id='child-1'");
    expect(html).toContain("id='child-2'");
  });
});
