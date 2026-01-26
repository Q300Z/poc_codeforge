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

  it("should pass id, style and meta to components", () => {
    registry.Test = (meta, _, style, id) => 
      `<div id="${id}" style="color: ${style?.color}">${meta.name}</div>`;

    const node: Node = {
      id: "my-id",
      type: "Test",
      meta: { name: "World" },
      style: { color: "red" },
    };

    expect(render(node)).toBe('<div id="my-id" style="color: red">World</div>');
  });

  it("should render nested components with styles", () => {
    registry.Parent = (_, children, style) =>
      `<section style="bg: ${style?.bg}">${children.join("")}</section>`;
    registry.Child = (meta) => `<span>${meta.value}</span>`;

    const node: Node = {
      id: "p1",
      type: "Parent",
      style: { bg: "blue" },
      meta: {},
      children: [{ id: "c1", type: "Child", meta: { value: "A" } }],
    };

    expect(render(node)).toBe('<section style="bg: blue"><span>A</span></section>');
  });

  it("should throw an error for unknown components", () => {
    const node: Node = { id: "1", type: "Unknown", meta: { version: "1", createdAt: "" } };
    expect(() => render(node)).toThrow("[CodeForge Renderer] Type de composant inconnu : Unknown");
  });
});
