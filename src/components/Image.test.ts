import { describe, expect, it } from "vitest";

import { Image } from "./Image.js";

describe("Image Component", () => {
  const meta = {
    src: "test.jpg",
    alt: "Une image de test",
    version: "1.0.0",
    createdAt: new Date().toISOString(),
  };

  it("should render <img> with src and alt", () => {
    const html = Image(meta, [], {}, "img-1");
    expect(html).toContain('src="test.jpg"');
    expect(html).toContain('alt="Une image de test"');
  });

  it("should apply object-fit style", () => {
    const html = Image(meta, [], { "object-fit": "contain" }, "img-1");
    expect(html).toContain("object-fit: contain");
  });
});
