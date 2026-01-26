import { screen } from "@testing-library/dom";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";

import { Hero } from "./Hero.js";

describe("Hero Component", () => {
  const props = { title: "Hello", subtitle: "World" };

  const renderComponent = (html: string) => {
    document.body.innerHTML = html;
  };

  it("should render title and subtitle", () => {
    const html = Hero(props, [], {});
    renderComponent(html);

    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("should apply custom CSS variables", () => {
    const style = { "hero-bg": "#000", "hero-text": "#fff" };
    const html = Hero(props, [], style);
    renderComponent(html);

    const section = document.querySelector("section");
    expect(section).toHaveStyle("--hero-bg: #000");
    expect(section).toHaveStyle("--hero-text: #fff");
  });

  it("should be accessible", async () => {
    const html = Hero(props, [], {});
    const container = document.createElement("div");
    container.innerHTML = html;

    const results = await axe(container);
    // @ts-expect-error - Vitest-axe matchers are extended in setup.ts
    expect(results).toHaveNoViolations();
  });
});
