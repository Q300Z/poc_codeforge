# Hero

## 🎯 Objectif
Le composant **Hero** est une section d'accueil (bannière) à fort impact visuel. Il est conçu pour être l'élément principal en haut de page, incluant un titre sémantique de niveau 1 (H1) et un sous-titre optionnel.

## ⚙️ Propriétés (Meta)
| Propriété | Type | Description |
| :--- | :--- | :--- |
| `title` | `string` | Titre principal affiché en grand. |
| `subtitle` | `string` | Paragraphe descriptif affiché sous le titre. |

## 🎨 Design Tokens (Style)
| Token | Description |
| :--- | :--- |
| `hero-bg` | Couleur ou dégradé de fond de la section. |
| `hero-text` | Couleur du texte (héritée par le titre). |
| `section-py` | Padding vertical (hauteur du bandeau). |

## 🛠 Déclaration avec Builder
```typescript
const hero = new HeroBuilder("main-hero")
  .withTitle("CodeForge Engine")
  .withSubtitle("Générez des interfaces web à partir de JSON.")
  .withStyle({ "hero-bg": "#111827", "hero-text": "white" })
  .build();
```

## 📄 Déclaration JSON
```json
{
  "id": "main-hero",
  "type": "Hero",
  "meta": {
    "title": "CodeForge Engine",
    "subtitle": "Générez des interfaces web à partir de JSON."
  },
  "style": {
    "hero-bg": "#111827",
    "hero-text": "white"
  }
}
```

## 🌐 Sortie HTML
```html
<section id="main-hero" class="hero-section" style="--hero-bg: #111827; --hero-text: white;">
  <div class="hero-content">
    <h1 id="main-hero-title">CodeForge Engine</h1>
    <div class="hero-subtitle-wrapper ...">
      <p id="main-hero-subtitle">Générez des interfaces web à partir de JSON.</p>
    </div>
  </div>
</section>
```
