/**
 * @file renderer.ts
 * @description Moteur de rendu récursif transformant le JSON en HTML.
 */

import { registry } from "./registry.js";
import { Node } from "./types.js";

/**
 * Transforme récursivement un arbre de données (Node) en fragments HTML.
 * 
 * @param {Node<any, any>} node - Le composant racine à traiter.
 * @returns {string} Le HTML sémantique généré.
 * @throws {Error} Si le type du composant n'est pas enregistré.
 */
export function render(node: Node<any, any>): string {
  const component = registry[node.type];

  if (!component) {
    throw new Error(`[CodeForge Renderer] Type de composant inconnu : ${node.type}`);
  }

  // Traitement récursif des enfants
  const childrenHTML = (node.children || []).map(render);

  // Appel du template du composant
  return component(
    node.meta || {},
    childrenHTML,
    node.style || {},
    node.id
  );
}
