import { describe, expect, it, vi } from "vitest";

import { validateStyle } from "./validator.js";

describe("Style Validator", () => {
  it("should warn when unauthorized tokens are used", () => {
    const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    
    validateStyle("TestComponent", { "invalid-token": "value" }, ["valid-token"]);
    
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("[Design System] TestComponent warning: Use of unauthorized tokens: invalid-token")
    );
    
    consoleSpy.mockRestore();
  });

  it("should not warn when all tokens are authorized", () => {
    const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    
    validateStyle("TestComponent", { "valid-token": "value" }, ["valid-token"]);
    
    expect(consoleSpy).not.toHaveBeenCalled();
    
    consoleSpy.mockRestore();
  });

  it("should do nothing if style is undefined", () => {
    const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    
    validateStyle("TestComponent", undefined, ["valid-token"]);
    
    expect(consoleSpy).not.toHaveBeenCalled();
    
    consoleSpy.mockRestore();
  });
});
