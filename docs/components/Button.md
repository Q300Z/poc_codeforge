# 🧱 Composant : Button

**Version :** `1.3.0`

Bouton ou lien interactif.

## 📥 Paramètres (meta)
Ces champs doivent être placés dans l'objet `meta` du JSON.

| Champ | Description |
| :--- | :--- |
| `label` | Texte |
| `action` | URL ou JS |

## 🏗️ Utilitaires de Layout
Ce composant supporte également tous les utilitaires de mise en page globaux :
`width`, `height`, `min-width`, `min-height`, `max-width`, `max-height`, `position`, `top`, `left`, `bottom`, `right`, `z-index`, `overflow`, `overflow-x`, `overflow-y`, `flex-shrink`, `flex-grow`, `transform`, `opacity`, `border-radius`.

## 📄 Exemple JSON
```json
{
  "id": "button-1",
  "type": "Button",
  "meta": {
    "label": "...",
    "action": "..."
  },
  "style": {
    "width": "100%"
  }
}
```