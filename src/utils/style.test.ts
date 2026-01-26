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

  it("should return an empty string for undefined style", () => {
    expect(getStyleVariables(undefined)).toBe("");
  });

  it("should return an empty string for empty object", () => {
    expect(getStyleVariables({})).toBe("");
  });
});
