# Stack

## 🎯 Objectif
Le composant **Stack** est un moteur de mise en page basé sur **Flexbox**. Il permet d'aligner ses enfants de manière linéaire (verticalement ou horizontalement) avec un espacement régulier. C'est l'outil privilégié pour les petits alignements et les listes d'éléments.

## ⚙️ Propriétés (Meta)
| Propriété | Type | Description |
| :--- | :--- | :--- |
| `direction` | `enum` | `vertical` (par défaut) ou `horizontal`. |
| `align` | `enum` | Alignement transverse (`start`, `center`, `end`, `stretch`). |
| `justify` | `enum` | Alignement principal (`start`, `center`, `end`, `between`). |
| `gap` | `number` | Espacement (échelle Tailwind 0-16). |

## 🎨 Design Tokens (Style)
| Token | Description |
| :--- | :--- |
| `stack-gap` | Espacement personnalisé (écrase la propriété meta `gap`). |

## 🛠 Déclaration avec Builder
```typescript
const actions = new StackBuilder("btn-group")
  .withDirection("horizontal")
  .withGap(4)
  .addChild(btnCancel)
  .addChild(btnSubmit)
  .build();
```

## 📄 Déclaration JSON
```json
{
  "id": "btn-group",
  "type": "Stack",
  "meta": {
    "direction": "horizontal",
    "gap": 4
  },
  "children": [...]
}
```

## 🌐 Sortie HTML
```html
<div id="btn-group" class="flex flex-row gap-4 ...">
  <!-- Enfants -->
</div>
```
