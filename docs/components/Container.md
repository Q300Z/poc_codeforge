# Container

## 🎯 Objectif
Le composant **Container** est utilisé pour centrer horizontalement son contenu et limiter sa largeur maximale. C'est le bloc de base pour garantir que le contenu reste lisible sur de très grands écrans.

## ⚙️ Propriétés (Meta)
Ce composant ne possède pas de propriétés `meta` spécifiques.

## 🎨 Design Tokens (Style)
| Token | Description |
| :--- | :--- |
| `container-width` | Largeur maximale personnalisée (ex: `1200`, `"80rem"`). |

## 🛠 Déclaration avec Builder
```typescript
const container = new ContainerBuilder("main-container")
  .withStyle({ "container-width": "1140px" })
  .addChild(myContent)
  .build();
```

## 📄 Déclaration JSON
```json
{
  "id": "main-container",
  "type": "Container",
  "meta": {},
  "style": {
    "container-width": "1140px"
  },
  "children": [...]
}
```

## 🌐 Sortie HTML
```html
<div id="main-container" style="--container-width: 1140px;" class="container-center">
  <!-- Enfants -->
</div>
```
