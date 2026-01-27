import { describe, expect, it } from "vitest";

import { Placeholder } from "./placeholder.js";

describe("Placeholder Utility", () => {
  it("should generate a custom URL correctly", () => {
    const url = Placeholder.custom(500, 300, { text: "Hello", format: "jpg" });
    expect(url).toBe("https://placehold.net/500x300.jpg?text=Hello");
  });

  it("should handle custom URL without options", () => {
    const url = Placeholder.custom(100, 100);
    expect(url).toBe("https://placehold.net/100x100.png");
  });

  it("should generate square placeholders", () => {
    expect(Placeholder.square(400)).toBe("https://placehold.net/400x400.png");
    expect(Placeholder.square(600, "Test")).toBe("https://placehold.net/600x600.png?text=Test");
  });

  it("should generate portrait placeholders", () => {
    expect(Placeholder.portrait("small")).toBe("https://placehold.net/400x600.png");
    expect(Placeholder.portrait("large", "Tall")).toBe(
      "https://placehold.net/600x800.png?text=Tall"
    );
  });

  it("should generate landscape placeholders", () => {
    expect(Placeholder.landscape("small")).toBe("https://placehold.net/600x400.png");
    expect(Placeholder.landscape("large", "Wide")).toBe(
      "https://placehold.net/800x600.png?text=Wide"
    );
  });
});
