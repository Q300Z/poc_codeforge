/**
 * @file state.ts
 * @description État global temporaire pour le processus de rendu.
 */

export const renderState = {
  requiredScripts: new Set<string>(),

  clear() {
    this.requiredScripts.clear();
  },

  requireScript(id: string) {
    this.requiredScripts.add(id);
  },
};
