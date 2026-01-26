# 🧱 Composant : Grid

**Version :** `1.1.0`

Système de grille responsive Mobile-First utilisant CSS Grid.

## 📥 Paramètres (meta)
Ces champs doivent être placés dans l'objet `meta` du JSON.

| Champ | Description |
| :--- | :--- |
| `cols` | Nombre de colonnes sur desktop (1 à 12). |
| `gap` | Espacement entre les colonnes (0 à 16). |

## 🎨 Design Tokens (style)
Ces jetons sont spécifiques à ce composant.

| Token | Description |
| :--- | :--- |
| `--grid-gap` | Espacement personnalisé via CSS Variable. |
| `--grid-bg` | Couleur de fond de la grille. |

## 🏗️ Utilitaires de Layout
Ce composant supporte également tous les utilitaires de mise en page globaux :
`width`, `height`, `min-width`, `min-height`, `max-width`, `max-height`, `position`, `top`, `left`, `bottom`, `right`, `z-index`, `overflow`, `overflow-x`, `overflow-y`, `flex-shrink`, `flex-grow`, `transform`, `opacity`.

## 📄 Exemple JSON
```json
{
  "id": "grid-1",
  "type": "Grid",
  "meta": {
    "cols": "3",
    "gap": "6"
  },
  "style": {
    "width": "100%"
  }
}
```