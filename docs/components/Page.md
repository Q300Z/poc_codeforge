# 🧱 Composant : Page

Composant racine gérant le layout global, le thème et l'injection du header/footer.

## 📥 Paramètres (meta)
Ces champs doivent être placés dans l'objet `meta` du JSON.

| Champ | Description |
| :--- | :--- |
| `appName` | Nom de l'application (utilisé comme titre de page). |
| `debug` | Active le mode debug visuel (true/false). |

## 🎨 Design Tokens (style)
Ces jetons sont spécifiques à ce composant.

| Token | Description |
| :--- | :--- |
| `--brand-primary` | Couleur primaire de la marque. |
| `--brand-secondary` | Couleur secondaire de la marque. |
| `--appbar-bg` | Couleur de fond globale de l'AppBar. |
| `--appbar-text` | Couleur de texte globale de l'AppBar. |
| `--appbar-border` | Couleur de bordure globale de l'AppBar. |
| `--btn-bg-default` | Couleur de fond par défaut de tous les boutons. |
| `--btn-text-default` | Couleur de texte par défaut de tous les boutons. |
| `--hero-bg-default` | Couleur de fond par défaut de tous les Hero. |
| `--hero-text-default` | Couleur de texte par défaut de tous les Hero. |
| `--section-py` | Padding vertical par défaut de toutes les sections. |

## 🏗️ Utilitaires de Layout
Ce composant supporte également tous les utilitaires de mise en page globaux :
`width`, `height`, `min-width`, `min-height`, `max-width`, `max-height`, `position`, `top`, `left`, `bottom`, `right`, `z-index`, `overflow`, `overflow-x`, `overflow-y`, `flex-shrink`, `flex-grow`, `transform`, `opacity`.

## 📄 Exemple JSON
```json
{
  "id": "page-1",
  "type": "Page",
  "meta": {
    "appName": "...",
    "debug": "..."
  },
  "style": {
    "width": "100%"
  }
}
```