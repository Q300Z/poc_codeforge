# Image

## 🎯 Objectif
Le composant **Image** permet d'afficher des images de manière optimisée et accessible. Il impose l'utilisation d'un texte alternatif (`alt`) et supporte nativement le chargement paresseux (`lazy loading`) pour améliorer les performances.

## ⚙️ Propriétés (Meta)
| Propriété | Type | Description |
| :--- | :--- | :--- |
| `src` | `string` | URL de la source de l'image. |
| `alt` | `string` | Texte alternatif (OBLIGATOIRE pour l'accessibilité). |
| `width` / `height` | `number` | Dimensions natives (évite les sauts de mise en page). |
| `loading` | `enum` | `lazy` (par défaut) ou `eager`. |
| `srcset` | `string` | Sources pour le responsive design. |

## 🎨 Design Tokens (Style)
| Token | Description |
| :--- | :--- |
| `object-fit` | Mode de redimensionnement (`cover`, `contain`, `fill`). |

## 🛠 Déclaration avec Builder
```typescript
const img = new ImageBuilder("team-photo")
  .withSrc("team.jpg")
  .withAlt("L'équipe CodeForge au travail")
  .withDimensions(800, 600)
  .withLoading("lazy")
  .build();
```

## 📄 Déclaration JSON
```json
{
  "id": "team-photo",
  "type": "Image",
  "meta": {
    "src": "team.jpg",
    "alt": "L'équipe CodeForge au travail",
    "width": 800,
    "height": 600,
    "loading": "lazy"
  }
}
```

## 🌐 Sortie HTML
```html
<img 
  src="team.jpg" 
  alt="L'équipe CodeForge au travail" 
  width="800" height="600" 
  loading="lazy" 
  style="object-fit: var(--object-fit, cover);" 
  class="w-full h-auto block ..." 
  id="team-photo"
/>
```
