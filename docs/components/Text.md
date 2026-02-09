# Text

## 🎯 Objectif
Le composant **Text** est l'unité de base pour l'affichage du texte courant (paragraphes, spans). Il permet de contrôler précisément la typographie et la balise sémantique utilisée.

## ⚙️ Propriétés (Meta)
| Propriété | Type | Description |
| :--- | :--- | :--- |
| `content` | `string` | Le contenu textuel brut. |
| `tag` | `enum` | Balise HTML à utiliser (`p`, `span`, `div`). |

## 🎨 Design Tokens (Style)
| Token | Description |
| :--- | :--- |
| `font-size` | Taille de la police (ex: `1rem`, `18px`). |
| `text-color` | Couleur du texte. |
| `line-height` | Hauteur de ligne (interlignage). |

## 🛠 Déclaration avec Builder
```typescript
const txt = new TextBuilder("intro-txt")
  .withContent("Bienvenue sur notre plateforme.")
  .withTag("p")
  .withStyle({ "text-color": "#4b5563" })
  .build();
```

## 📄 Déclaration JSON
```json
{
  "id": "intro-txt",
  "type": "Text",
  "meta": {
    "content": "Bienvenue sur notre plateforme.",
    "tag": "p"
  },
  "style": {
    "text-color": "#4b5563"
  }
}
```

## 🌐 Sortie HTML
```html
<p id="intro-txt" style="--text-color: #4b5563;" class="text-[var(--text-color,inherit)] ...">
  Bienvenue sur notre plateforme.
</p>
```
