import { describe, expect, it, vi } from "vitest";

import { LAYOUT_UTILITIES, validateStyle } from "./validator.js";

describe("Style Validator", () => {
  it("should warn when unauthorized tokens are used", () => {
    const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const allowed = new Set([...LAYOUT_UTILITIES, "valid-token"]);
    validateStyle("TestComponent", { "invalid-token": "value" }, allowed);

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        "[Design System] TestComponent warning: Utilisation de tokens non autorisés : invalid-token"
      )
    );

    consoleSpy.mockRestore();
  });

  it("should not warn when all tokens are authorized", () => {
    const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const allowed = new Set([...LAYOUT_UTILITIES, "valid-token"]);
    validateStyle("TestComponent", { "valid-token": "value" }, allowed);

    expect(consoleSpy).not.toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  it("should do nothing if style is undefined", () => {
    const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const allowed = new Set([...LAYOUT_UTILITIES, "valid-token"]);
    validateStyle("TestComponent", undefined, allowed);

    expect(consoleSpy).not.toHaveBeenCalled();

    consoleSpy.mockRestore();
  });
});
