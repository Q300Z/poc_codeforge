import { describe, expect, it } from "vitest";

import { Box, BoxBuilder } from "./Box.js";

describe("Box Component", () => {
  it("should render a div with style variables", () => {
    const html = Box({}, [], { "box-bg": "red" }, "box-1");
    expect(html).toContain("<div");
    expect(html).toContain("--box-bg:red;");
    expect(html).toContain('id="box-1"');
  });

  describe("BoxBuilder", () => {
    it("should build a valid Box node", () => {
      const node = new BoxBuilder("box-1").withStyle({ "box-bg": "blue" }).build();

      expect(node.type).toBe("Box");
      expect(node.style?.["box-bg"]).toBe("blue");
    });
  });
});
