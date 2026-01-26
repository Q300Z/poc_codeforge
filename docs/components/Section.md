# 🧱 Composant : Section

Unité structurelle horizontale pleine largeur pour découper la page.

## 📥 Paramètres (meta)
Ces champs doivent être placés dans l'objet `meta` du JSON.

| Champ | Description |
| :--- | :--- |
| `section-bg` | Couleur de fond de la section. |
| `section-py` | Padding vertical de la section. |

## 🏗️ Utilitaires de Layout
Ce composant supporte également tous les utilitaires de mise en page globaux :
`width`, `height`, `min-width`, `min-height`, `max-width`, `max-height`, `position`, `top`, `left`, `bottom`, `right`, `z-index`, `overflow`, `overflow-x`, `overflow-y`, `flex-shrink`, `flex-grow`, `transform`, `opacity`.

## 📄 Exemple JSON
```json
{
  "id": "section-1",
  "type": "Section",
  "meta": {
    "section-bg": "...",
    "section-py": "..."
  },
  "style": {
    "width": "100%"
  }
}
```