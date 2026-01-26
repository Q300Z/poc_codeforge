import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";

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

  it("should be accessible", async () => {
    const html = Button(props, [], {});
    const container = document.createElement("div");
    container.innerHTML = html;

    const results = await axe(container);
    // @ts-expect-error - vitest-axe matchers extended in setup
    expect(results).toHaveNoViolations();
  });

  it("should render an <a> tag for relative html links", () => {
    const html = Button({ ...props, action: "contact.html" }, [], {});
    expect(html).toContain("<a");
    expect(html).toContain('href="contact.html"');
  });

  it("should apply custom CSS variables from style prop", () => {
    const style = { "bg-color": "#ff0000" };
    const html = Button(props, [], style);
    expect(html).toContain("--bg-color: #ff0000");
  });
});
