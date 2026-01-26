# 📄 Spécification du Format JSON CodeForge

Ce document détaille la structure attendue pour les fichiers JSON traduits par **CodeForge**.

---

## 🏗️ Structure Globale

Le moteur accepte deux types de structures :
1.  **SiteNode** (Multi-page) : La structure recommandée pour un site complet.
2.  **Node** (Composant unique) : Utilisé pour le rendu direct de fragments.

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
| `meta` | `Object` | **OBLIGATOIRE**. Paramètres spécifiques et métadonnées obligatoires. |
| `style` | `Object` | (Optionnel) Propriétés visuelles (Layout + Design Tokens). |
| `children` | `Array` | (Optionnel) Enfants. |

#### Métadonnées OBLIGATOIRES dans `meta`
Le non-respect de ces champs générera des erreurs dans la console :
- `version` : Version du composant (ex: `"1.2.0"`).
- `createdAt` : Date d'ajout du composant au format ISO (ex: `"2026-01-26T14:30:00Z"`).
- `audioDescription` : (Conseillé) Description pour l'accessibilité.

---

## 🎨 Système de Style

### 1. Utilitaires de Layout (Disponibles partout)
Ces propriétés s'appliquent directement en CSS sur la balise du composant.
- **Dimensions** : `width`, `height`, `min-width`, `min-height`, `max-width`.
- **Position** : `position` (ex: "absolute"), `top`, `left`, `right`, `bottom`, `z-index`.
- **Comportement** : `overflow`, `overflow-x`, `overflow-y`, `flex-shrink`, `flex-grow`, `transform`, `opacity`.

### 2. Normalisation des Unités
- **Nombres** : Traduits en `px` (ex: `"top": 250` -> `top: 250px;`).
- **Chaînes** : Unités libres (ex: `"width": "50%"` -> `width: 50%;`).

---

## 🧱 Schémas des Composants

### AppBar
Barre de navigation supérieure.
- **meta.title** : Le titre de l'application.
- **meta.links** : Tableau d'objets `{ label: string, href: string }`.

### Hero
Bandeau d'accueil sémantique (utilise Title et Text en interne).
- **meta.title** : Texte du titre principal (H1).
- **meta.subtitle** : Texte du paragraphe descriptif.

### Title
Titre sémantique H1 à H6.
- **meta.content** : Le texte du titre.
- **meta.level** : Niveau (1 à 6). Défaut : 1.

### Text
Bloc de texte ou paragraphe.
- **meta.content** : Le texte.
- **meta.tag** : Balise HTML (`p`, `span`, `div`). Défaut : `p`.

### Button
Élément interactif.
- **meta.label** : Texte affiché.
- **meta.action** : Lien ou Code JS.

---

## 🔄 Exemple de Page Canvas
```json
{
  "id": "canvas-page",
  "type": "Page",
  "meta": { "version": "1.4.0", "createdAt": "2026-01-26T10:00:00Z" },
  "style": { "position": "relative", "height": 600, "overflow": "hidden" },
  "children": [
    {
      "id": "abs-title",
      "type": "Title",
      "meta": { "content": "Position Libre", "version": "1.1.0", "createdAt": "2026-01-26T10:00:00Z" },
      "style": { "position": "absolute", "top": 50, "left": 100 }
    }
  ]
}
```
