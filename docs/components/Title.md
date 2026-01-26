# 🧱 Composant : Title

**Version :** `1.1.0`

Un composant de titre sémantique supportant les niveaux H1 à H6.

## 📥 Paramètres (meta)
Ces champs doivent être placés dans l'objet `meta` du JSON.

| Champ | Description |
| :--- | :--- |
| `content` | Le texte du titre. |
| `level` | Niveau du titre (1 à 6). Défaut : 2. |

## 🎨 Design Tokens (style)
Ces jetons sont spécifiques à ce composant.

| Token | Description |
| :--- | :--- |
| `--font-size` | Taille de la police. |
| `--text-color` | Couleur du texte. |
| `--bg-color` | Couleur de fond du bloc. |

## 🏗️ Utilitaires de Layout
Ce composant supporte également tous les utilitaires de mise en page globaux :
`width`, `height`, `min-width`, `min-height`, `max-width`, `max-height`, `position`, `top`, `left`, `bottom`, `right`, `z-index`, `overflow`, `overflow-x`, `overflow-y`, `flex-shrink`, `flex-grow`, `transform`, `opacity`.

## 📄 Exemple JSON
```json
{
  "id": "title-1",
  "type": "Title",
  "meta": {
    "content": "...",
    "level": "..."
  },
  "style": {
    "width": "100%"
  }
}
```