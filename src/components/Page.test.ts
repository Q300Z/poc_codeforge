import { describe, expect, it } from "vitest";

import { Page } from "./Page.js";

describe("Page Component", () => {
  const meta = { version: "1.0.0", createdAt: "2026-01-26T10:00:00Z" };

  it("should render the full HTML structure with children", () => {
    const children = ['<div id="test-child">Child Content</div>'];
    const html = Page(meta, children, {}, "page-1");

    expect(html).toContain("<!DOCTYPE html>");
    expect(html).toContain('<div id="test-child">Child Content</div>');
  });

  it("should render SEO and Social metadata correctly", () => {
    const seoMeta = {
      ...meta,
      description: "Une description SEO",
      ogTitle: "Titre OG",
      ogImage: "https://example.com/image.jpg",
      twitterCard: "summary_large_image",
    };
    const html = Page(seoMeta, ["Content"], {}, "page-1", (s) => `style="${s}"`);

    expect(html).toContain('<meta name="description" content="Une description SEO">');
    expect(html).toContain('<meta property="og:title" content="Titre OG">');
    expect(html).toContain('<meta property="og:image" content="https://example.com/image.jpg">');
    expect(html).toContain('<meta name="twitter:card" content="summary_large_image">');
  });
});
