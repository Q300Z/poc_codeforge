import { describe, expect, it } from "vitest";

import { Container } from "./Container.js";
import { Section } from "./Section.js";
import { Stack } from "./Stack.js";

describe("Layout Components", () => {
  const meta = { version: "1.0.0", createdAt: "2026-01-26T10:00:00Z" };

  it("Section should render with custom background", () => {
    const html = Section(meta, [], { "section-bg": "#ff0000" }, "sec-1");
    expect(html).toContain('style="--section-bg:#ff0000;"');
    expect(html).toContain("section-pad");
  });

  it("Container should respect max-width variable", () => {
    const html = Container(meta, [], { "container-width": "60rem" }, "cont-1");
    expect(html).toContain('style="--container-width:60rem;"');
    expect(html).toContain("container-center");
  });

  it("Stack should handle vertical and horizontal directions", () => {
    const vert = Stack({ ...meta, direction: "vertical" }, [], {}, "stack-1");
    const horiz = Stack({ ...meta, direction: "horizontal" }, [], {}, "stack-2");

    expect(vert).toContain("flex-col");
    expect(horiz).toContain("flex-row");
  });
});
