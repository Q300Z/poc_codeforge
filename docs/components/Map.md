# Map

## 🎯 Objectif
Le composant **Map** est une carte interactive haute performance basée sur la bibliothèque `streaming-map`. Il est capable d'afficher des volumes massifs de données GeoJSON via un mécanisme de streaming et propose des contrôles de navigation personnalisables.

## ⚙️ Propriétés (Meta)
| Propriété | Type | Description |
| :--- | :--- | :--- |
| `src` | `string` | URL du fichier GeoJSON (supporte le streaming). |
| `tileUrl` | `string` | URL du fond de carte (tiles raster). |
| `controls` | `string` | Liste des contrôles séparés par des virgules (`zoom,layers,reset,info,draw`). |
| `debug` | `boolean` | Affiche un overlay de performance (FPS, mémoire). |

## 🎨 Design Tokens (Style)
| Token | Description |
| :--- | :--- |
| `map-height` | Hauteur de la carte (ex: `600px`, `100%`). |

## 🛠 Déclaration avec Builder
```typescript
const map = new MapBuilder("world-map")
  .withSrc("https://api.data.com/points.geojson")
  .withControls("zoom,layers,info")
  .withStyle({ "map-height": 500 })
  .build();
```

## 📄 Déclaration JSON
```json
{
  "id": "world-map",
  "type": "Map",
  "meta": {
    "src": "https://api.data.com/points.geojson",
    "controls": "zoom,layers,info"
  },
  "style": {
    "map-height": 500
  }
}
```

## 🌐 Sortie HTML (Architecture)
Le composant utilise un `Shadow DOM` pour encapsuler l'élément personnalisé `<streaming-map>` et isoler ses styles et sa logique.
```html
<div class="map-wrapper ..." id="world-map" style="--map-height: 500px;">
  <div id="map-container-world-map">
    <!-- Shadow Root -->
    <streaming-map src="..." controls="..."></streaming-map>
  </div>
</div>
<script type="module" src="./libs/streaming-map-nodraw.js"></script>
```
