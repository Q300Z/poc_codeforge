# Carousel

## 🎯 Objectif
Le composant **Carousel** est un diaporama d'images interactif. Il supporte la navigation par flèches, par indicateurs (points), le défilement automatique, ainsi que la navigation au clavier et le balayage. Il est conçu pour être accessible (WCAG).

## ⚙️ Propriétés (Meta)
| Propriété | Type | Description |
| :--- | :--- | :--- |
| `items` | `Array` | Liste d'objets `{ src, alt, title }`. |
| `autoPlay` | `boolean` | Active le défilement automatique (défaut: false). |
| `interval` | `number` | Temps en ms entre chaque slide (défaut: 5000). |

## 🎨 Design Tokens (Style)
| Token | Description |
| :--- | :--- |
| `carousel-color` | Couleur des flèches, indicateurs et fonds de texte. |

## 🛠 Déclaration avec Builder
```typescript
const slider = new CarouselBuilder("main-slider")
  .addItem("slide1.jpg", "Description 1", "Titre 1")
  .addItem("slide2.jpg", "Description 2")
  .withOptions(true, 4000)
  .build();
```

## 📄 Déclaration JSON
```json
{
  "id": "main-slider",
  "type": "Carousel",
  "meta": {
    "autoPlay": true,
    "interval": 4000,
    "items": [
      { "src": "slide1.jpg", "alt": "Description 1", "title": "Titre 1" },
      { "src": "slide2.jpg", "alt": "Description 2" }
    ]
  }
}
```

## 🌐 Sortie HTML (Simplifiée)
```html
<div id="main-slider" class="carousel-container relative ..." role="region" aria-roledescription="carousel">
  <div class="carousel-wrapper flex ...">
    <!-- Slides -->
  </div>
  <!-- Boutons Prev/Next -->
  <!-- Indicateurs (Dots) -->
  <script><!-- Logique de défilement JS --></script>
</div>
```
