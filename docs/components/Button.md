# Button

## 🎯 Objectif
Le composant **Button** est un élément interactif polyvalent. Il s'adapte automatiquement : il génère une balise `<a>` si l'action fournie est une URL, ou une balise `<button>` s'il s'agit d'un script ou d'une action JavaScript.

## ⚙️ Propriétés (Meta)
| Propriété | Type | Description |
| :--- | :--- | :--- |
| `label` | `string` | Texte affiché sur le bouton. |
| `action` | `string` | URL de destination ou code JavaScript à exécuter. |

## 🎨 Design Tokens (Style)
| Token | Description |
| :--- | :--- |
| `btn-bg` | Couleur de fond du bouton. |
| `btn-text` | Couleur du texte. |
| `btn-radius` | Arrondi des angles. |
| `font-size` | Taille de la police. |

## 🛠 Déclaration avec Builder
```typescript
const btn = new ButtonBuilder("btn-cta")
  .withLabel("Démarrer")
  .withAction("/inscription")
  .withStyle({ "btn-bg": "#2563eb", "btn-text": "white" })
  .build();
```

## 📄 Déclaration JSON
```json
{
  "id": "btn-cta",
  "type": "Button",
  "meta": {
    "label": "Démarrer",
    "action": "/inscription"
  },
  "style": {
    "btn-bg": "#2563eb",
    "btn-text": "white"
  }
}
```

## 🌐 Sortie HTML
```html
<a href="/inscription" id="btn-cta" style="--btn-bg: #2563eb; --btn-text: white;" class="btn-base">Démarrer</a>
```
