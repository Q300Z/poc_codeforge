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
});
