import { registry } from "./registry.js";
import { Node } from "./types.js";

export function render(node: Node): string {
  const component = registry[node.type];

  if (!component) {
    throw new Error(`Unknown component: ${node.type}`);
  }

  const childrenHTML = (node.children || []).map(render);

  return component(
    node.meta || {},
    childrenHTML,
    node.style || {},
    node.id
  );
}