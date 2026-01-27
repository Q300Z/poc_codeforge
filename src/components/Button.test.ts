import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";

import { Button } from "./Button.js";

describe("Button Component", () => {
  const meta = {
    label: "Click me",
    version: "1.0.0",
    createdAt: "2026-01-26T10:00:00Z",
  };

  it("should render a <button> for JS actions", () => {
    const html = Button({ ...meta, action: "alert('hi')" }, [], {}, "btn-1");
    expect(html).toContain("<button");
    expect(html).toContain("onclick=\"alert('hi')\"");
    expect(html).toContain('id="btn-1"');
  });

  it("should render an <a> tag for links (starting with /)", () => {
    const html = Button({ ...meta, action: "/home" }, [], {}, "btn-1");
    expect(html).toContain("<a");
    expect(html).toContain('href="/home"');
  });

  it("should render an <a> tag for relative html links", () => {
    const html = Button({ ...meta, action: "contact.html" }, [], {}, "btn-1");
    expect(html).toContain("<a");
    expect(html).toContain('href="contact.html"');
  });

  it("should be accessible", async () => {
    const html = Button(meta, [], {}, "btn-1");
    const container = document.createElement("div");
    container.innerHTML = html;

    const results = await axe(container);
    // @ts-expect-error - vitest-axe matchers extended in setup
    expect(results).toHaveNoViolations();
  });

  it("should apply custom CSS variables from style prop", () => {
    const style = { "btn-bg": "#ff0000" };
    const html = Button(meta, [], style, "btn-1");
    expect(html).toContain("--btn-bg: #ff0000");
  });
});
