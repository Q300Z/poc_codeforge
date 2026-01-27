import { ScreenDraftData } from "../adapter/screendraft.js";

/**
 * Détermine si les données JSON correspondent au format ScreenDraft.
 * @param data Données brutes parsées du JSON.
 */
export function isScreenDraft(data: any): data is ScreenDraftData {
  if (!data || typeof data !== "object") return false;
  return Array.isArray(data.components) && !data.pages;
}