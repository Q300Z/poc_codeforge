import { describe, expect, it } from "vitest";

import { isScreenDraft } from "./detection.js";

describe("Auto-detection Logic", () => {
  it("should detect ScreenDraft format", () => {
    const screenDraftData = {
      meta: { appName: "Test" },
      components: [{ type: "button", id: "1" }],
    };
    expect(isScreenDraft(screenDraftData)).toBe(true);
  });

  it("should NOT detect CodeForge format as ScreenDraft", () => {
    const codeForgeData = {
      meta: { appName: "Test" },
      pages: [{ slug: "index", content: {} }],
    };
    expect(isScreenDraft(codeForgeData)).toBe(false);
  });

  it("should handle invalid data gracefully", () => {
    expect(isScreenDraft({})).toBe(false);
    expect(isScreenDraft(null)).toBe(false); // Check null safety if function allows (it takes 'any')
    expect(isScreenDraft({ components: [] })).toBe(true);
  });
});
