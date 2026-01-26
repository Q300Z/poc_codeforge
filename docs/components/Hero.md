# 🧱 Composant : Hero

Bandeau d'accueil d'une page avec un titre et un sous-titre.

## 📥 Paramètres (meta)
Ces champs doivent être placés dans l'objet `meta` du JSON.

| Champ | Description |
| :--- | :--- |
| `title` | Titre principal (H1). |
| `subtitle` | Paragraphe descriptif optionnel. |

## 🎨 Design Tokens (style)
Ces jetons sont spécifiques à ce composant.

| Token | Description |
| :--- | :--- |
| `--hero-bg` | Personnalisation de l'identité. |
| `--hero-text` | Personnalisation de l'identité. |
| `--hero-bg-default` | Personnalisation de l'identité. |
| `--hero-text-default` | Personnalisation de l'identité. |
| `--section-py` | Personnalisation de l'identité. |

## 🏗️ Utilitaires de Layout
Ce composant supporte également tous les utilitaires de mise en page globaux :
`width`, `height`, `min-width`, `min-height`, `max-width`, `max-height`, `position`, `top`, `left`, `bottom`, `right`, `z-index`, `overflow`, `overflow-x`, `overflow-y`, `flex-shrink`, `flex-grow`, `transform`, `opacity`.

## 📄 Exemple JSON
```json
{
  "id": "hero-1",
  "type": "Hero",
  "meta": {
    "title": "...",
    "subtitle": "..."
  },
  "style": {
    "width": "100%"
  }
}
```