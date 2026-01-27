import { describe, expect, it } from "vitest";

import { getStyleVariables } from "./style.js";

describe("Style Utility", () => {
  it("should transform a style object into CSS variables", () => {
    const style = {
      "primary-color": "#ff0000",
      "font-size": "16px",
    };
    const result = getStyleVariables(style);
    expect(result).toBe("--primary-color: #ff0000; --font-size: 16px;");
  });

  it("should handle layout properties and absolute positioning", () => {
    const style = {
      position: "absolute",
      x: 50,
      y: 100,
      width: 200,
    };
    const result = getStyleVariables(style);
    expect(result).toContain("position: absolute;");
    expect(result).toContain("left: 50px;");
    expect(result).toContain("top: 100px;");
    expect(result).toContain("width: 200px;");
  });

  it("should return an empty string for undefined style", () => {
    expect(getStyleVariables(undefined)).toBe("");
  });

  it("should return an empty string for empty object", () => {
    expect(getStyleVariables({})).toBe("");
  });
});
