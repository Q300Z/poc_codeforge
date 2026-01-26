# 🧱 Composant : Button

Un composant interactif polyvalent servant de bouton ou de lien.

## 📥 Paramètres (meta)
Ces champs doivent être placés dans l'objet `meta` du JSON.

| Champ | Description |
| :--- | :--- |
| `label` | Le texte affiché sur le bouton. |
| `action` | URL de redirection (ex: /home, http://...) ou code JavaScript (ex: alert('hi')). |

## 🎨 Design Tokens (style)
Ces jetons sont spécifiques à ce composant.

| Token | Description |
| :--- | :--- |
| `--btn-bg` | Personnalisation de l'identité. |
| `--btn-text` | Personnalisation de l'identité. |
| `--bg-color` | Personnalisation de l'identité. |
| `--text-color` | Personnalisation de l'identité. |

## 🏗️ Utilitaires de Layout
Ce composant supporte également tous les utilitaires de mise en page globaux :
`width`, `height`, `min-width`, `min-height`, `max-width`, `max-height`, `position`, `top`, `left`, `bottom`, `right`, `z-index`, `overflow`, `overflow-x`, `overflow-y`, `flex-shrink`, `flex-grow`, `transform`, `opacity`.

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