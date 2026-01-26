import { describe, expect, it } from "vitest";

import { Button } from "./Button.js";

describe("Button Component", () => {
  const props = { label: "Click me" };

  it("should render a <button> for JS actions", () => {
    const html = Button({ ...props, action: "alert('hi')" }, [], {});
    expect(html).toContain("<button");
    expect(html).toContain("onclick=\"alert('hi')\"");
  });

  it("should render an <a> tag for links (starting with /)", () => {
    const html = Button({ ...props, action: "/home" }, [], {});
    expect(html).toContain("<a");
    expect(html).toContain('href="/home"');
  });

  it("should render an <a> tag for external links (http)", () => {
    const html = Button({ ...props, action: "https://google.com" }, [], {});
    expect(html).toContain("<a");
    expect(html).toContain('href="https://google.com"');
  });

  it("should render an <a> tag for anchor links (#)", () => {
    const html = Button({ ...props, action: "#section" }, [], {});
    expect(html).toContain("<a");
    expect(html).toContain('href="#section"');
  });
});
