import { describe, expect, it } from "vitest";

import { AppBar } from "./AppBar.js";

describe("AppBar Component", () => {
  const props = {
    title: "TestApp",
    links: [{ label: "Link1", href: "/1" }],
  };

  it("should render title and links", () => {
    const html = AppBar(props, [], {}, "nav-id");
    expect(html).toContain("TestApp");
    expect(html).toContain("Link1");
    expect(html).toContain('href="/1"');
  });

  it("should contain mobile menu button with dynamic IDs", () => {
    const html = AppBar(props, [], {}, "nav-id");
    expect(html).toContain('id="btn-nav-id"');
    expect(html).toContain('aria-controls="menu-nav-id"');
  });

  it("should include the toggle script with correct IDs", () => {
    const html = AppBar(props, [], {}, "nav-id");
    expect(html).toContain("<script>");
    expect(html).toContain("document.getElementById('btn-nav-id')");
  });
});
