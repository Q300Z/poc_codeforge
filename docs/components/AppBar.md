# AppBar

## 🎯 Objectif
Le composant **AppBar** est une barre de navigation fixe (sticky) située en haut de la page. Il permet d'afficher le titre de l'application (logo) et une liste de liens de navigation. 

Il intègre nativement :
- Un **sélecteur de thème** (Clair / Sombre / Système).
- Un **menu burger** interactif pour les supports mobiles.
- Une **détection dynamique du lien actif** (ajoute `aria-current="page"` et un style visuel au lien correspondant à l'URL courante).

## ⚙️ Propriétés (Meta)
| Propriété | Type | Description |
| :--- | :--- | :--- |
| `title` | `string` | Titre de l'application affiché à gauche. |
| `links` | `Array` | Liste d'objets `{ label: string, href: string }`. |

## 🎨 Design Tokens (Style)
| Token | Description |
| :--- | :--- |
| `appbar-bg` | Couleur de fond de la barre. |
| `appbar-text` | Couleur de texte des liens. |
| `appbar-border` | Couleur de la bordure inférieure. |
| `backdrop-filter` | Effet de flou sur le fond (ex: `blur(10px)`). |

## 🛠 Déclaration avec Builder
```typescript
const nav = new AppBarBuilder("main-nav")
  .withTitle("CodeForge")
  .withLinks([
    { label: "Accueil", href: "/" },
    { label: "Services", href: "/services" }
  ])
  .withStyle({ "appbar-bg": "white" })
  .build();
```

## 📄 Déclaration JSON
```json
{
  "id": "main-nav",
  "type": "AppBar",
  "meta": {
    "title": "CodeForge",
    "links": [
      { "label": "Accueil", "href": "/" },
      { "label": "Services", "href": "/services" }
    ]
  },
  "style": {
    "appbar-bg": "white"
  }
}
```

## 🌐 Sortie HTML (Simplifiée)
```html
<nav id="main-nav" class="sticky top-0 z-50 w-full ..." style="--appbar-bg: white;">
  <div class="max-w-7xl mx-auto px-4 ...">
    <div class="flex justify-between h-16 items-center">
      <span class="text-xl font-bold">CodeForge</span>
      <div class="hidden md:flex space-x-8">
        <a href="/">Accueil</a>
        <a href="/services">Services</a>
      </div>
      <!-- Bouton Menu Mobile -->
    </div>
  </div>
  <!-- Menu Mobile (Caché par défaut) -->
</nav>
```
