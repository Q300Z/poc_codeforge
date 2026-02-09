# Box

## 🎯 Objectif
Le composant **Box** est un conteneur générique simple (balise `div`). Il est principalement utilisé pour créer des blocs de structure, des placeholders ou pour appliquer des styles de layout spécifiques (dimensions, positionnement absolu) sans sémantique particulière.

## ⚙️ Propriétés (Meta)
Ce composant ne possède pas de propriétés `meta` spécifiques en dehors des propriétés d'accessibilité standard.

## 🎨 Design Tokens (Style)
| Token | Description |
| :--- | :--- |
| `box-bg` | Couleur de fond du bloc. |

## 🛠 Déclaration avec Builder
```typescript
const box = new BoxBuilder("my-box")
  .withStyle({ 
    "box-bg": "#f3f4f6",
    "width": 200,
    "height": 200,
    "border-radius": 8
  })
  .build();
```

## 📄 Déclaration JSON
```json
{
  "id": "my-box",
  "type": "Box",
  "meta": {},
  "style": {
    "box-bg": "#f3f4f6",
    "width": 200,
    "height": 200,
    "border-radius": 8
  }
}
```

## 🌐 Sortie HTML
```html
<div id="my-box" style="--box-bg: #f3f4f6; width: 200px; height: 200px; border-radius: 8px;" class="bg-[var(--box-bg,#e5e7eb)] min-h-[100px]"></div>
```
