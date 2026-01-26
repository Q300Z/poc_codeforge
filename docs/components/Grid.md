# 🧱 Composant : Grid



## 📥 Paramètres (meta)
Ces champs doivent être placés dans l'objet `meta` du JSON.

| Champ | Description |
| :--- | :--- |

## 🎨 Design Tokens (style)
Ces jetons sont spécifiques à ce composant.

| Token | Description |
| :--- | :--- |
| `--grid-gap` | Personnalisation de l'identité. |
| `--grid-bg` | Personnalisation de l'identité. |

## 🏗️ Utilitaires de Layout
Ce composant supporte également tous les utilitaires de mise en page globaux :
`width`, `height`, `min-width`, `min-height`, `max-width`, `max-height`, `position`, `top`, `left`, `bottom`, `right`, `z-index`, `overflow`, `overflow-x`, `overflow-y`, `flex-shrink`, `flex-grow`, `transform`, `opacity`.

## 📄 Exemple JSON
```json
{
  "id": "grid-1",
  "type": "Grid",
  "meta": {
  },
  "style": {
    "width": "100%"
  }
}
```