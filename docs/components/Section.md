# Section

## 🎯 Objectif
Le composant **Section** est une unité structurelle horizontale qui occupe généralement toute la largeur de l'écran. Il est utilisé pour découper la page en blocs thématiques distincts et gère l'espacement vertical (padding) de manière cohérente.

## ⚙️ Propriétés (Meta)
Ce composant ne possède pas de propriétés `meta` spécifiques.

## 🎨 Design Tokens (Style)
| Token | Description |
| :--- | :--- |
| `section-bg` | Couleur de fond de la section. |
| `section-py` | Padding vertical (marge interne haute et basse). |

## 🛠 Déclaration avec Builder
```typescript
const section = new SectionBuilder("services-section")
  .withStyle({ "section-bg": "#fafafa", "section-py": 100 })
  .addChild(servicesGrid)
  .build();
```

## 📄 Déclaration JSON
```json
{
  "id": "services-section",
  "type": "Section",
  "meta": {},
  "style": {
    "section-bg": "#fafafa",
    "section-py": 100
  },
  "children": [...]
}
```

## 🌐 Sortie HTML
```html
<section id="services-section" style="--section-bg: #fafafa; --section-py: 100px;" class="section-pad bg-[var(--section-bg,transparent)]">
  <!-- Enfants -->
</section>
```
