# 🧱 Composant : AppBar

Barre de navigation supérieure avec support du menu burger sur mobile.

## 📥 Paramètres (meta)
Ces champs doivent être placés dans l'objet `meta` du JSON.

| Champ | Description |
| :--- | :--- |
| `title` | Le titre de l'application affiché à gauche. |
| `links` | Tableau d'objets { label: string, href: string } pour la navigation. |

## 🏗️ Utilitaires de Layout
Ce composant supporte également tous les utilitaires de mise en page globaux :
`width`, `height`, `min-width`, `min-height`, `max-width`, `max-height`, `position`, `top`, `left`, `bottom`, `right`, `z-index`, `overflow`, `overflow-x`, `overflow-y`, `flex-shrink`, `flex-grow`, `transform`, `opacity`.

## 📄 Exemple JSON
```json
{
  "id": "appbar-1",
  "type": "AppBar",
  "meta": {
    "title": "...",
    "links": "..."
  },
  "style": {
    "width": "100%"
  }
}
```