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
| `meta.defaultTheme`| `string`| (Optionnel) `light`, `dark` ou `system` (défaut). |
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
| `style` | `Object` | (Optionnel) Propriétés visuelles en mode clair. |
| `styleDark` | `Object` | (Optionnel) Surcharges visuelles en mode sombre. |
| `children` | `Array` | (Optionnel) Enfants. **Omis si vide.** |

---

## ♿ Accessibilité (A11y) & Contrastes

CodeForge intègre l'accessibilité nativement :
- **Attributs ARIA** : `audioDescription` (aria-label), `ariaRole` (role), `ariaHidden`.
- **Garde-fou de Contraste** : Le moteur valide automatiquement le ratio de contraste (norme WCAG 4.5:1). Si une couleur de texte est jugée illisible sur son fond (clair ou sombre), elle est automatiquement corrigée.

---

## 🎨 Système de Thème

CodeForge supporte nativement les modes Clair et Sombre.

### 🌓 Modes de Thème
1.  **Light** : Utilise les valeurs de la clé `style`.
2.  **Dark** : Utilise les valeurs de la clé `styleDark`. 
3.  **Auto-Génération** : Si `styleDark` est absent, CodeForge génère intelligemment une variante sombre à partir de votre thème clair (inversion de luminance préservant la teinte).

### Propriétés de Layout (Héritées par tous)
Ces propriétés sont directement mappées vers des styles CSS `px` ou natifs :
`width`, `height`, `min-width`, `max-width`, `position`, `top`, `left`, `right`, `bottom`, `z-index`, `opacity`, `border-radius`.

**Nouveauté :** Support des coordonnées `x` et `y` (alias de `left` et `top`) pour faciliter le positionnement absolu.

👉 **[Consulter le Guide de Style Complet (STYLE_GUIDE.md)](./STYLE_GUIDE.md)**

---

## 🧱 Catalogue des Composants

La liste détaillée des composants, leurs propriétés spécifiques et leurs Design Tokens est disponible dans le référentiel centralisé :

👉 **[Consulter le Référentiel des Composants (COMPONENTS_REFERENCE.md)](./COMPONENTS_REFERENCE.md)**

---

## 🔌 Importation Tierce (Adaptateurs)

CodeForge détecte automatiquement si le JSON fourni provient d'un outil externe.

### Format ScreenDraft
Si le moteur détecte une structure contenant une clé `components` à la racine (au lieu de `pages`), il applique automatiquement l'adaptateur ScreenDraft pour convertir les positions absolues et les types de composants.