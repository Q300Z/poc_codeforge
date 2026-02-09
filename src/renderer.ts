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
 * @param {number} depth - Profondeur actuelle (interne).
 * @returns {string} Le HTML sémantique généré.
 */
export function render(node: Node<any, any>, depth: number = 0): string {
  if (depth > 100) {
    throw new Error(`[CodeForge Renderer] Profondeur de récursion maximale atteinte (100). Vérifiez vos données pour des boucles infinies.`);
  }

  const component = registry[node.type];

  if (!component) {
    throw new Error(`[CodeForge Renderer] Type de composant inconnu : ${node.type}`);
  }

  // Traitement récursive des enfants
  const childrenHTML = (node.children || []).map((child) => render(child, depth + 1));

  // Appel du template du composant
  return component(
    node.meta || {},
    childrenHTML,
    node.style || {},
    node.id,
    node.styleDark || {}
  );
}
