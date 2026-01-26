import { Node } from "./types.js";
import { registry } from "./registry.js";

export function render(node: Node): string {
  const component = registry[node.type];

  if (!component) {
    throw new Error(`Unknown component: ${node.type}`);
  }

  const childrenHTML = (node.children || []).map(render);

  return component(node.props || {}, childrenHTML, node.style || {});
}
