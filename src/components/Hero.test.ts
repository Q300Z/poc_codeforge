import { screen } from "@testing-library/dom";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";

import { Hero } from "./Hero.js";

describe("Hero Component", () => {
  const meta = {
    title: "Hello",
    subtitle: "World",
    version: "1.0.0",
    createdAt: "2026-01-26T10:00:00Z",
  };

  const renderComponent = (html: string) => {
    document.body.innerHTML = html;
  };

  it("should render title and subtitle", () => {
    const html = Hero(meta, [], {}, "hero-1");
    renderComponent(html);

    expect(screen.getByText("Hello")).toBeInTheDocument();
    expect(screen.getByText("World")).toBeInTheDocument();
  });

  it("should apply custom CSS variables", () => {
    const style = { "hero-bg": "#000", "hero-text": "#fff" };
    const html = Hero(meta, [], style, "hero-1");
    renderComponent(html);

    const section = document.querySelector("section");
    expect(section).toHaveStyle("--hero-bg: #000");
    expect(section).toHaveStyle("--hero-text: #fff");
  });

  it("should be accessible", async ({ page }) => {
    const html = Hero(meta, [], {}, "hero-1");
    const container = document.createElement("main");
    container.innerHTML = html;

    const results = await axe(container);
    // @ts-expect-error - Vitest-axe matchers are extended in setup.ts
    expect(results).toHaveNoViolations();
  });
});
