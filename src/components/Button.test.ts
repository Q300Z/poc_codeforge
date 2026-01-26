import { screen } from "@testing-library/dom";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";

import { Button } from "./Button.js";

describe("Button Component", () => {
  const props = { label: "Click me" };

  const renderComponent = (html: string) => {
    document.body.innerHTML = html;
  };

  it("should render correctly with given label", () => {
    const html = Button(props, [], {});
    renderComponent(html);

    const button = screen.getByText("Click me");
    expect(button).toBeInTheDocument();
  });

  it("should apply custom CSS variables from style prop", () => {
    const style = { "bg-color": "#ff0000" };
    const html = Button(props, [], style);
    renderComponent(html);

    const button = screen.getByRole("button");
    expect(button).toHaveStyle("--bg-color: #ff0000");
  });

  it("should be accessible", async () => {
    const html = Button(props, [], {});
    const container = document.createElement("div");
    container.innerHTML = html;

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
