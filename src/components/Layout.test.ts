import { describe, expect, it } from "vitest";

import { Container } from "./Container.js";
import { Section } from "./Section.js";
import { Stack } from "./Stack.js";

describe("Layout Components", () => {
  it("Section should render with custom background", () => {
    const html = Section({}, [], { "section-bg": "#ff0000" });
    expect(html).toContain('style="--section-bg: #ff0000;"');
    expect(html).toContain("section-pad");
  });

  it("Container should respect max-width variable", () => {
    const html = Container({}, [], { "container-width": "60rem" });
    expect(html).toContain('style="--container-width: 60rem;"');
    expect(html).toContain("container-center");
  });

  it("Stack should handle vertical and horizontal directions", () => {
    const vert = Stack({ direction: "vertical" }, []);
    const horiz = Stack({ direction: "horizontal" }, []);
    
    expect(vert).toContain("flex-col");
    expect(horiz).toContain("flex-row");
  });
});
