import { describe, expect, it } from "vitest";

import { Image } from "./Image.js";

describe("Image Component", () => {
  const meta = {
    src: "test.jpg",
    alt: "Une image de test",
    version: "1.0.0",
    createdAt: new Date().toISOString(),
  };

  it("should render <img> with src, alt and default lazy loading", () => {
    const html = Image(meta, [], {}, "img-1");
    expect(html).toContain('src="test.jpg"');
    expect(html).toContain('alt="Une image de test"');
    expect(html).toContain('loading="lazy"');
  });

  it("should apply object-fit style", () => {
    const html = Image(meta, [], { "object-fit": "contain" }, "img-1");
    expect(html).toContain("object-fit: contain");
  });

  it("should render explicit width and height", () => {
    const html = Image({ ...meta, width: 800, height: 600 }, [], {}, "img-size");
    expect(html).toContain('width="800"');
    expect(html).toContain('height="600"');
  });

  it("should render srcset and sizes", () => {
    const srcset = "img-400.jpg 400w, img-800.jpg 800w";
    const sizes = "(max-width: 600px) 100vw, 50vw";
    const html = Image({ ...meta, srcset, sizes }, [], {}, "img-responsive");
    expect(html).toContain(`srcset="${srcset}"`);
    expect(html).toContain(`sizes="${sizes}"`);
  });
});
