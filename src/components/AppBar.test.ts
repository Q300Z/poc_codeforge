import { describe, expect, it } from "vitest";

import { AppBar } from "./AppBar.js";

describe("AppBar Component", () => {
  const props = {
    title: "TestApp",
    links: [{ label: "Link1", href: "/1" }],
  };

  it("should render title and links", () => {
    const html = AppBar(props, []);
    expect(html).toContain("TestApp");
    expect(html).toContain("Link1");
    expect(html).toContain('href="/1"');
  });

  it("should contain mobile menu button with a11y attributes", () => {
    const html = AppBar(props, []);
    expect(html).toContain('id="mobile-menu-button"');
    expect(html).toContain('aria-expanded="false"');
  });

  it("should include the toggle script", () => {
    const html = AppBar(props, []);
    expect(html).toContain("<script>");
    expect(html).toContain("classList.toggle('hidden')");
  });
});
