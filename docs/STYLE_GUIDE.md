# 🎨 CodeForge Style Guide

Ce guide décrit le fonctionnement du système de style de **CodeForge**, qui combine des utilitaires de layout natifs (façon CSS-in-JS) et des Design Tokens injectés sous forme de variables CSS.

---

## 1. Styles de Base (Layout Utilities)

Tous les composants CodeForge acceptent un ensemble de propriétés de style "natives". Ces propriétés sont appliquées directement dans l'attribut `style` de l'élément HTML (ou via des classes utilitaires pour certains frameworks).

### Liste des Propriétés Supportées
Ces propriétés sont définies dans `LAYOUT_UTILITIES` et sont disponibles pour **tous** les composants via l'interface `BaseStyles`.

**Dimensions :**
- `width`, `height`
- `min-width`, `min-height`
- `max-width`, `max-height`

**Positionnement :**
- `position` (`absolute`, `relative`, `fixed`, `sticky`)
- `top`, `left`, `bottom`, `right`
- `x` (alias pour `left`, idéal pour le mode Canvas)
- `y` (alias pour `top`, idéal pour le mode Canvas)
- `z-index`
- `transform`

**Flexbox (Enfants) :**
- `flex-shrink`
- `flex-grow`

**Visuel :**
- `opacity`
- `border-radius`
- `overflow`, `overflow-x`, `overflow-y`

### Unités et Normalisation
- **Nombres** : Sont automatiquement convertis en pixels (`px`).
  - Ex: `"width": 100` -> `width: 100px;`
- **Chaînes** : Sont utilisées telles quelles.
  - Ex: `"width": "50%"` -> `width: 50%;`
  - Ex: `"width": "10rem"` -> `width: 10rem;`

### Responsivité (Mobile-First)
Chaque propriété peut être suffixée par un breakpoint pour s'appliquer uniquement à partir d'une certaine taille d'écran.

| Suffixe | Breakpoint (min-width) | Exemple |
| :--- | :--- | :--- |
| (aucun) | 0px (Défaut / Mobile) | `"width": "100%"` |
| `-sm` | 640px | `"width-sm": "50%"` |
| `-md` | 768px | `"width-md": "33%"` |
| `-lg` | 1024px | `"width-lg": "25%"` |
| `-xl` | 1280px | |
| `-2xl` | 1536px | |

**Exemple JSON :**
```json
"style": {
  "width": "100%",        // Mobile : 100%
  "width-md": "50%",      // Tablette : 50%
  "width-lg": "300px"     // Desktop : 300px fixe
}
```

---

## 2. Design Tokens (Composants)

Chaque composant peut exposer des propriétés de style spécifiques, appelées "Design Tokens". Contrairement aux utilitaires de layout, ces tokens sont injectés sous forme de **Variables CSS** (`--token-name`) dans le style de l'élément racine du composant.

Le composant utilise ensuite ces variables dans son template (souvent avec une valeur par défaut).

### Convention de Nommage
Les tokens suivent la convention `[composant]-[propriété]`.

| Composant | Tokens Disponibles | Description |
| :--- | :--- | :--- |
| **Box** | `box-bg` | Couleur de fond. |
| **Title** | `title-text`, `title-bg` | Couleur du texte et du fond. |
| **Button** | `btn-bg`, `btn-text` | Couleur de fond et du texte. |
| **AppBar** | `appbar-bg`, `appbar-text`, `appbar-border` | Thème de la barre de navigation. |
| **Hero** | `hero-bg`, `hero-text` | Thème du bandeau. |
| **Text** | `text-color`, `font-size` | Couleur et taille (générique). |
| **Grid** | `grid-bg`, `grid-gap` | Fond et espacement de grille. |
| **Section** | `section-bg`, `section-py` | Fond et padding vertical. |

### Types de Valeurs (`CSSColor` / `CSSLength`)
Le système encourage un typage fort (documentation) :
- `CSSColor` : Chaîne hexadécimale, rgb, ou variable (`var(--brand)`).
- `CSSLength` : Nombre (px) ou chaîne avec unité (`rem`, `%`).

**Exemple JSON (Button) :**
```json
"style": {
  "btn-bg": "#ff0000",
  "btn-text": "white",
  "border-radius": 8  // Layout utility (BaseStyle)
}
```
*Génère :* `style="--btn-bg: #ff0000; --btn-text: white; border-radius: 8px;"`

---

## 3. Extension du Système

Pour ajouter un nouveau token à un composant :
1.  Ajouter la clé dans l'interface `XStyles` du composant (`src/components/X.ts`).
2.  Ajouter la clé dans la liste `authorizedTokens` de la configuration `createComponent`.
3.  Utiliser `var(--token-name, fallback)` dans le template HTML.
