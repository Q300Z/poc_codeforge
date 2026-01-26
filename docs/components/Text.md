# 🧱 Composant : Text

**Version :** `1.0.0`

Composant pour les blocs de texte et paragraphes.

## 📥 Paramètres (meta)
Ces champs doivent être placés dans l'objet `meta` du JSON.

| Champ | Description |
| :--- | :--- |
| `content` | Le contenu textuel. |
| `tag` | Balise HTML à utiliser (p, span, div). Défaut : p. |

## 🎨 Design Tokens (style)
Ces jetons sont spécifiques à ce composant.

| Token | Description |
| :--- | :--- |
| `--font-size` | Taille de la police. |
| `--text-color` | Couleur du texte. |
| `--line-height` | Hauteur de ligne. |

## 🏗️ Utilitaires de Layout
Ce composant supporte également tous les utilitaires de mise en page globaux :
`width`, `height`, `min-width`, `min-height`, `max-width`, `max-height`, `position`, `top`, `left`, `bottom`, `right`, `z-index`, `overflow`, `overflow-x`, `overflow-y`, `flex-shrink`, `flex-grow`, `transform`, `opacity`.

## 📄 Exemple JSON
```json
{
  "id": "text-1",
  "type": "Text",
  "meta": {
    "content": "...",
    "tag": "..."
  },
  "style": {
    "width": "100%"
  }
}
```