import { describe, expect, it } from "vitest";

import { AppBar } from "./AppBar.js";

describe("AppBar Component", () => {
  const meta = {
    title: "TestApp",
    links: [{ label: "Link1", href: "/1" }],
    version: "1.0.0",
    createdAt: "2026-01-26T10:00:00Z",
  };

  it("should render title and links", () => {
    const html = AppBar(meta, [], {}, "nav-id");
    expect(html).toContain("TestApp");
    expect(html).toContain("Link1");
    expect(html).toContain('href="/1"');
  });

  it("should contain mobile menu button with dynamic IDs", () => {
    const html = AppBar(meta, [], {}, "nav-id");
    expect(html).toContain('id="btn-nav-id"');
    expect(html).toContain('aria-controls="menu-nav-id"');
  });

  it("should include the toggle script with correct IDs", () => {
    const html = AppBar(meta, [], {}, "nav-id");
    expect(html).toContain("<script>");
    expect(html).toContain("CodeForge.initAppBar('btn-nav-id', 'menu-nav-id', 'theme-toggle-nav-id', 'theme-menu-nav-id')");
  });
});
