# Select

## 🎯 Objectif
Le composant **Select** est une liste déroulante sémantique. Il permet à l'utilisateur de choisir une valeur parmi plusieurs options. Il gère l'accessibilité via l'association automatique du label et les états de sélection.

## ⚙️ Propriétés (Meta)
| Propriété | Type | Description |
| :--- | :--- | :--- |
| `label` | `string` | Libellé affiché au-dessus du champ. |
| `name` | `string` | Nom de l'attribut `name` (pour l'envoi du formulaire). |
| `options` | `Array` | Liste d'objets `{ label: string, value: string }`. |
| `value` | `string` | Valeur sélectionnée par défaut. |
| `placeholder`| `string` | Première option vide affichée par défaut. |

## 🎨 Design Tokens (Style)
| Token | Description |
| :--- | :--- |
| `select-bg` | Couleur de fond de la liste. |
| `select-text` | Couleur du texte. |
| `select-border`| Couleur de la bordure. |
| `select-radius`| Arrondi des angles. |

## 🛠 Déclaration avec Builder
```typescript
const select = new SelectBuilder("country-select")
  .withLabel("Choisissez votre pays")
  .withName("country")
  .addOption("France", "fr")
  .addOption("Belgique", "be")
  .withValue("fr")
  .build();
```

## 📄 Déclaration JSON
```json
{
  "id": "country-select",
  "type": "Select",
  "meta": {
    "label": "Choisissez votre pays",
    "name": "country",
    "options": [
      { "label": "France", "value": "fr" },
      { "label": "Belgique", "value": "be" }
    ],
    "value": "fr"
  }
}
```

## 🌐 Sortie HTML
```html
<div id="country-select" class="select-container">
  <label for="country-select-select" class="select-label">Choisissez votre pays</label>
  <select id="country-select-select" name="country" class="select-base">
    <option value="fr" selected>France</option>
    <option value="be">Belgique</option>
  </select>
</div>
```
