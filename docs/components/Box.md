# 🧱 Composant : Box

Un composant de structure simple pour afficher des blocs de couleur ou servir de placeholder.

## 📥 Paramètres (meta)
Ces champs doivent être placés dans l'objet `meta` du JSON.

| Champ | Description |
| :--- | :--- |
| `bg-color` | Couleur de fond (ex: #000, red, var(--token)). |
| `width` | Largeur explicite. |
| `height` | Hauteur explicite. |
| `border-radius` | Rayon de bordure. |

## 🏗️ Utilitaires de Layout
Ce composant supporte également tous les utilitaires de mise en page globaux :
`width`, `height`, `min-width`, `min-height`, `max-width`, `max-height`, `position`, `top`, `left`, `bottom`, `right`, `z-index`, `overflow`, `overflow-x`, `overflow-y`, `flex-shrink`, `flex-grow`, `transform`, `opacity`.

## 📄 Exemple JSON
```json
{
  "id": "box-1",
  "type": "Box",
  "meta": {
    "bg-color": "...",
    "width": "...",
    "height": "...",
    "border-radius": "..."
  },
  "style": {
    "width": "100%"
  }
}
```