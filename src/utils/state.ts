/**
 * @file state.ts
 * @description État global temporaire pour le processus de rendu.
 */

export const renderState = {
  /** IDs des types de composants ayant besoin d'un script de runtime. */
  requiredScripts: new Set<string>(),

  /**
   * Réinitialise l'état pour un nouveau rendu de page.
   */
  clear() {
    this.requiredScripts.clear();
  },

  /**
   * Déclare qu'un type de composant nécessite son script de runtime.
   * @param type - Le nom du type de composant (ex: 'Map', 'Carousel').
   */
  requireScript(type: string) {
    this.requiredScripts.add(type);
  },
};
