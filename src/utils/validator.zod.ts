/**
 * Validation manuelle pour éviter les conflits Zod récursifs dans certains environnements de test.
 */

function validateNode(node: any, path: string) {
  if (!node || typeof node !== "object") {
    throw new Error(`[${path}] Le nœud doit être un objet.`);
  }
  if (!node.id || typeof node.id !== "string") {
    throw new Error(`[${path}.id] L'ID est requis (string).`);
  }
  if (!node.type || typeof node.type !== "string") {
    throw new Error(`[${path}.type] Le type est requis (string).`);
  }

  if (node.children && Array.isArray(node.children)) {
    node.children.forEach((child: any, index: number) => {
      validateNode(child, `${path}.children[${index}]`);
    });
  }
}

export function validateSiteSchema(data: any) {
  if (!data || typeof data !== "object") {
    throw new Error("Les données du site doivent être un objet.");
  }
  if (!data.meta || typeof data.meta !== "object") {
    throw new Error("L'objet 'meta' est requis.");
  }
  if (!data.meta.appName || typeof data.meta.appName !== "string") {
    throw new Error("[meta.appName] Le nom de l'application est requis.");
  }
  if (!data.pages || !Array.isArray(data.pages) || data.pages.length === 0) {
    throw new Error("Au moins une page est requise.");
  }

  data.pages.forEach((page: any, index: number) => {
    const pagePath = `pages[${index}]`;
    if (!page.slug || typeof page.slug !== "string") {
      throw new Error(`[${pagePath}.slug] Le slug est requis.`);
    }
    validateNode(page.content, `${pagePath}.content`);
  });

  return data;
}
