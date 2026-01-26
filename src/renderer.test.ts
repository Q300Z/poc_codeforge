import { beforeEach, describe, expect, it } from "vitest";

import { registry } from "./registry.js";
import { render } from "./renderer.js";
import { Node } from "./types.js";

describe("Renderer Engine", () => {
  beforeEach(() => {
    // Nettoyer le registre avant chaque test
    for (const key in registry) {
      delete registry[key];
    }
  });

  it("should pass style and props to components", () => {
    registry.Test = (props, _, style) => `<div style="color: ${style?.color}">${props.name}</div>`;

    const node: Node = {
      type: "Test",
      props: { name: "World" },
      style: { color: "red" },
    };

    expect(render(node)).toBe('<div style="color: red">World</div>');
  });

  it("should render nested components with styles", () => {
    registry.Parent = (_, children, style) =>
      `<section style="bg: ${style?.bg}">${children.join("")}</section>`;
    registry.Child = (props) => `<span>${props.value}</span>`;

    const node: Node = {
      type: "Parent",
      style: { bg: "blue" },
      children: [{ type: "Child", props: { value: "A" } }],
    };

    expect(render(node)).toBe('<section style="bg: blue"><span>A</span></section>');
  });

  it("should throw an error for unknown components", () => {
    const node: Node = { type: "Unknown" };
    expect(() => render(node)).toThrow("Unknown component: Unknown");
  });

  it("should handle nodes without optional properties (props, children, style)", () => {
    registry.Empty = (props, children, style) => {
      const hasProps = Object.keys(props).length > 0;
      const hasChildren = children.length > 0;
      const hasStyle = Object.keys(style || {}).length > 0;
      return `props:${hasProps},children:${hasChildren},style:${hasStyle}`;
    };

    const node: Node = { type: "Empty" };
    expect(render(node)).toBe("props:false,children:false,style:false");
  });
});
