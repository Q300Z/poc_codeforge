# FormField

## 🎯 Objectif
Le composant **FormField** est un champ de saisie générique. Il regroupe une balise `<label>` sémantique et un élément d'entrée (`<input>` ou `<textarea>`). Il gère automatiquement les IDs pour l'accessibilité et le style visuel des champs.

## ⚙️ Propriétés (Meta)
| Propriété | Type | Description |
| :--- | :--- | :--- |
| `label` | `string` | Libellé affiché au-dessus du champ. |
| `type` | `enum` | Type de champ (`text`, `email`, `password`, `number`, `tel`, `url`, `textarea`). |
| `placeholder` | `string` | Texte d'aide affiché à l'intérieur du champ. |
| `required` | `boolean` | Indique si le champ est obligatoire (ajoute un astérisque rouge). |

## 🎨 Design Tokens (Style)
| Token | Description |
| :--- | :--- |
| `field-bg` | Couleur de fond du champ de saisie. |
| `label-color` | Couleur du texte du libellé. |
| `field-border` | Couleur de la bordure du champ. |
| `field-radius` | Arrondi des angles. |

## 🛠 Déclaration avec Builder
```typescript
const field = new FormFieldBuilder("email-field")
  .withLabel("Votre Email")
  .withType("email")
  .withPlaceholder("exemple@mail.com")
  .withRequired(true)
  .build();
```

## 📄 Déclaration JSON
```json
{
  "id": "email-field",
  "type": "FormField",
  "meta": {
    "label": "Votre Email",
    "type": "email",
    "placeholder": "exemple@mail.com",
    "required": true
  }
}
```

## 🌐 Sortie HTML
```html
<div id="email-field" class="field-wrapper space-y-2">
  <label for="input-email-field" class="...">Votre Email <span class="text-red-500">*</span></label>
  <input id="input-email-field" type="email" placeholder="exemple@mail.com" required class="..." />
</div>
```
