# 🧱 Composant : Container

Conteneur structurel qui centre son contenu avec une largeur maximale.

## 📥 Paramètres (meta)
Ces champs doivent être placés dans l'objet `meta` du JSON.

| Champ | Description |
| :--- | :--- |
| `container-width` | Largeur maximale du conteneur (ex: 1200px, 80rem). |

## 🏗️ Utilitaires de Layout
Ce composant supporte également tous les utilitaires de mise en page globaux :
`width`, `height`, `min-width`, `min-height`, `max-width`, `max-height`, `position`, `top`, `left`, `bottom`, `right`, `z-index`, `overflow`, `overflow-x`, `overflow-y`, `flex-shrink`, `flex-grow`, `transform`, `opacity`.

## 📄 Exemple JSON
```json
{
  "id": "container-1",
  "type": "Container",
  "meta": {
    "container-width": "..."
  },
  "style": {
    "width": "100%"
  }
}
```