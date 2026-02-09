# Grid

## 🎯 Objectif
Le composant **Grid** est le moteur de mise en page principal pour créer des structures multi-colonnes. Il est **Mobile-First** : il affiche une seule colonne sur mobile et passe au nombre de colonnes configuré à partir du breakpoint `md` (tablette).

## ⚙️ Propriétés (Meta)
| Propriété | Type | Description |
| :--- | :--- | :--- |
| `cols` | `number` | Nombre de colonnes sur desktop (1, 2, 3, 4, 5, 6 ou 12). |
| `gap` | `number` | Espacement entre les cellules (échelle Tailwind 0 à 16). |

## 🎨 Design Tokens (Style)
| Token | Description |
| :--- | :--- |
| `grid-bg` | Couleur de fond du conteneur de grille. |
| `grid-gap` | Espacement personnalisé (écrase la propriété meta `gap`). |

## 🛠 Déclaration avec Builder
```typescript
const grid = new GridBuilder("features-grid")
  .withCols(3)
  .withGap(8)
  .addChild(item1)
  .addChild(item2)
  .addChild(item3)
  .build();
```

## 📄 Déclaration JSON
```json
{
  "id": "features-grid",
  "type": "Grid",
  "meta": {
    "cols": 3,
    "gap": 8
  },
  "children": [...]
}
```

## 🌐 Sortie HTML
```html
<section id="features-grid" class="grid grid-cols-1 md:grid-cols-3 gap-8 w-full ...">
  <!-- Enfants -->
</section>
```
