import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";

import { Carousel } from "./Carousel.js";

describe("Carousel Component", () => {
  const meta = {
    items: [
      { src: "img1.jpg", alt: "Image 1", title: "Slide 1" },
      { src: "img2.jpg", alt: "Image 2" },
    ],
    version: "1.0.0",
    createdAt: "2026-01-26T10:00:00Z",
  };

  it("should render images with correct attributes", () => {
    const html = Carousel(meta, [], {}, "carousel-1");
    expect(html).toContain('src="img1.jpg"');
    expect(html).toContain('alt="Image 1"');
    expect(html).toContain('src="img2.jpg"');
    expect(html).toContain('alt="Image 2"');
  });

  it("should have correct accessibility roles", () => {
    const html = Carousel(meta, [], {}, "carousel-1");
    expect(html).toContain('aria-roledescription="carousel"');
    expect(html).toContain('aria-roledescription="slide"');
    expect(html).toContain('aria-label="1 sur 2"');
  });

  it("should be accessible (axe check)", async () => {
    const html = Carousel(meta, [], {}, "carousel-1");
    const container = document.createElement("div");
    container.innerHTML = html;

    const results = await axe(container);
    // @ts-expect-error - vitest-axe matchers extended in setup
    expect(results).toHaveNoViolations();
  });

  it("should render navigation buttons and dots", () => {
    const html = Carousel(meta, [], {}, "carousel-1");
    expect(html).toContain('aria-label="Slide précédente"');
    expect(html).toContain('aria-label="Slide suivante"');
    expect(html).toContain('aria-label="Aller à la slide 1"');
    expect(html).toContain('aria-label="Aller à la slide 2"');
  });
});
