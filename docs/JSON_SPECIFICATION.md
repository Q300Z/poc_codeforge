# 📄 Spécification du Format JSON CodeForge

Ce document détaille la structure attendue pour les fichiers JSON traduits par **CodeForge**.

---

## 🏗️ Structure Globale

Le moteur accepte deux types de structures :
1.  **SiteNode** (Multi-page) : La structure recommandée pour un site complet.
2.  **ScreenDraft** (Auto-détecté) : Format tiers automatiquement transformé par le moteur.
3.  **Node** (Composant unique) : Utilisé pour le rendu direct de fragments.

### SiteNode (Le Site Complet)
| Propriété | Type | Description |
| :--- | :--- | :--- |
| `meta` | `Object` | Métadonnées globales (`appName`, `version`, `createdAt`). |
| `style` | `Object` | Tokens de design globaux hérités par toutes les pages. |
| `layout` | `Object` | Composants partagés (`header`, `footer`) affichés sur chaque page. |
| `pages` | `Array` | Liste des pages du site avec leur `slug` et leur `content`. |

### Node (L'atome de base)
Chaque élément de la page suit cette structure :
| Propriété | Type | Description |
| :--- | :--- | :--- |
| `id` | `string` | **OBLIGATOIRE**. Identifiant unique. |
| `type` | `string` | **OBLIGATOIRE**. Nom du composant (ex: "Button", "Stack"). |
| `meta` | `Object` | **OBLIGATOIRE**. Paramètres spécifiques et métadonnées. |
| `style` | `Object` | (Optionnel) Propriétés visuelles. **Omis si vide.** |
| `children` | `Array` | (Optionnel) Enfants. **Omis si vide.** |

---

## ♿ Accessibilité (A11y)

CodeForge intègre l'accessibilité nativement. Ces clés dans `meta` sont traduites en attributs HTML standards :
- `audioDescription` : Traduit en `aria-label`. Description lue par les lecteurs d'écran.
- `ariaRole` : Traduit en `role`. Définit la fonction de l'élément (ex: "alert").
- `ariaHidden` : Traduit en `aria-hidden="true"`. Pour cacher les éléments décoratifs.

---

## 🎨 Système de Style

CodeForge supporte des propriétés de mise en page natives et des Design Tokens.

### Propriétés de Layout (Héritées par tous)
Ces propriétés sont directement mappées vers des styles CSS `px` ou natifs :
`width`, `height`, `min-width`, `max-width`, `position`, `top`, `left`, `right`, `bottom`, `z-index`, `opacity`, `border-radius`.

**Nouveauté :** Support des coordonnées `x` et `y` (alias de `left` et `top`) pour faciliter le positionnement absolu.

👉 **[Consulter le Guide de Style Complet (STYLE_GUIDE.md)](./STYLE_GUIDE.md)**

---

## 🧱 Schémas des Composants

### Page (Racine)
| Propriété | Type | Requis | Description |
| :--- | :--- | :--- | :--- |
| `appName` | `string` | Oui | Nom de l'application (balise `<title>`). |
| `debug` | `boolean` | Non | Active les contours en pointillés (debug visuel). |

### Button (Bouton)
| Propriété | Type | Requis | Description |
| :--- | :--- | :--- | :--- |
| `label` | `string` | Oui | Texte du bouton. |
| `action` | `string` | Non | URL (lien) ou script JS (onclick). |

**Tokens :** `btn-bg`, `btn-text`, `font-size`, `btn-radius`.

### Video
| Propriété | Type | Requis | Description |
| :--- | :--- | :--- | :--- |
| `src` | `string` | Oui | URL de la vidéo. |
| `tracks` | `Array` | Non | Liste des pistes de texte `{ src, kind, label, srclang }`. |

---

## 🔌 Importation Tierce (Adaptateurs)

CodeForge détecte automatiquement si le JSON fourni provient d'un outil externe.

### Format ScreenDraft
Si le moteur détecte une structure contenant une clé `components` à la racine (au lieu de `pages`), il applique automatiquement l'adaptateur ScreenDraft pour convertir les positions absolues et les types de composants.
