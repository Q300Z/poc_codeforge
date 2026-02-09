# Title

## 🎯 Objectif
Le composant **Title** permet d'afficher des titres sémantiques allant du niveau 1 (H1) au niveau 6 (H6). Il gère automatiquement la hiérarchie visuelle fluide (Responsive Typography) via des fonctions `clamp()` en CSS.

## ⚙️ Propriétés (Meta)
| Propriété | Type | Description |
| :--- | :--- | :--- |
| `content` | `string` | Texte du titre. |
| `level` | `number` | Niveau sémantique (1=H1, 2=H2, etc.). Défaut: 1. |

## 🎨 Design Tokens (Style)
| Token | Description |
| :--- | :--- |
| `title-text` | Couleur du texte. |
| `title-bg` | Couleur de fond du bloc de titre. |
| `font-size` | Taille personnalisée (écrase la taille fluide). |
| `font-weight` | Graisse de la police (ex: `800`, `bold`). |
| `text-align` | Alignement (`left`, `center`, `right`). |

## 🛠 Déclaration avec Builder
```typescript
const title = new TitleBuilder("section-title")
  .withContent("Nos Services")
  .withLevel(2)
  .withAlign("center")
  .build();
```

## 📄 Déclaration JSON
```json
{
  "id": "section-title",
  "type": "Title",
  "meta": {
    "content": "Nos Services",
    "level": 2
  },
  "style": {
    "text-align": "center"
  }
}
```

## 🌐 Sortie HTML
```html
<h2 id="section-title" style="--text-align: center; font-size: var(--font-size, clamp(...));" class="text-[var(--title-text,inherit)] ...">
  Nos Services
</h2>
```
