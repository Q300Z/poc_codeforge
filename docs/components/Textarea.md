# Textarea

## 🎯 Objectif
Le composant **Textarea** est une zone de saisie multi-lignes. Il est utilisé dans les formulaires pour les messages longs ou les commentaires. Il supporte le redimensionnement vertical et l'accessibilité native.

## ⚙️ Propriétés (Meta)
| Propriété | Type | Description |
| :--- | :--- | :--- |
| `label` | `string` | Libellé affiché au-dessus de la zone. |
| `name` | `string` | Nom de l'attribut `name` pour le formulaire. |
| `placeholder` | `string` | Texte d'aide affiché quand le champ est vide. |
| `rows` | `number` | Nombre initial de lignes visibles (défaut: 4). |
| `value` | `string` | Valeur par défaut. |

## 🎨 Design Tokens (Style)
| Token | Description |
| :--- | :--- |
| `textarea-bg` | Couleur de fond de la zone. |
| `textarea-text` | Couleur du texte saisi. |
| `textarea-border`| Couleur de la bordure. |
| `textarea-radius`| Arrondi des angles. |

## 🛠 Déclaration avec Builder
```typescript
const area = new TextareaBuilder("msg-area")
  .withLabel("Votre message")
  .withName("message")
  .withPlaceholder("Écrivez ici...")
  .withRows(6)
  .build();
```

## 📄 Déclaration JSON
```json
{
  "id": "msg-area",
  "type": "Textarea",
  "meta": {
    "label": "Votre message",
    "name": "message",
    "placeholder": "Écrivez ici...",
    "rows": 6
  }
}
```

## 🌐 Sortie HTML
```html
<div id="msg-area" class="textarea-container">
  <label for="msg-area-textarea" class="textarea-label">Votre message</label>
  <textarea id="msg-area-textarea" name="message" rows="6" placeholder="Écrivez ici..." class="textarea-base"></textarea>
</div>
```
