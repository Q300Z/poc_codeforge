# 🧱 Composant : Stack

Moteur d'espacement utilisant Flexbox pour aligner des éléments.

## 📥 Paramètres (meta)
Ces champs doivent être placés dans l'objet `meta` du JSON.

| Champ | Description |
| :--- | :--- |
| `direction` | Orientation des éléments : 'vertical' (colonne) ou 'horizontal' (ligne). |
| `align` | Alignement des items (start, center, end, stretch). |
| `justify` | Justification du contenu (start, center, end, between). |
| `gap` | Espacement entre les items (0, 2, 4, 6, 8, 10, 12, 16). |

## 🎨 Design Tokens (style)
Ces jetons sont spécifiques à ce composant.

| Token | Description |
| :--- | :--- |
| `--stack-gap` | Espacement personnalisé via CSS Variable. |

## 🏗️ Utilitaires de Layout
Ce composant supporte également tous les utilitaires de mise en page globaux :
`width`, `height`, `min-width`, `min-height`, `max-width`, `max-height`, `position`, `top`, `left`, `bottom`, `right`, `z-index`, `overflow`, `overflow-x`, `overflow-y`, `flex-shrink`, `flex-grow`, `transform`, `opacity`.

## 📄 Exemple JSON
```json
{
  "id": "stack-1",
  "type": "Stack",
  "meta": {
    "direction": "vertical",
    "align": "center",
    "justify": "center",
    "gap": "6"
  },
  "style": {
    "width": "100%"
  }
}
```