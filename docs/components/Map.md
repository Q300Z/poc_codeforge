# Map

## 🎯 Objectif
Le composant **Map** est une carte interactive haute performance basée sur la bibliothèque **Leaflet 2.0**. Il permet d'afficher des fonds de carte raster et de superposer des données GeoJSON de manière fluide et accessible.

## ⚙️ Propriétés (Meta)
| Propriété | Type | Description |
| :--- | :--- | :--- |
| `src` | `string` | URL du fichier GeoJSON à superposer. |
| `tileUrl` | `string` | URL du fond de carte (tiles raster, défaut: OpenStreetMap). |
| `lat` / `lng` | `number` | Coordonnées du centre initial de la carte. |
| `zoom` | `number` | Niveau de zoom initial (défaut: 6). |
| `markers` | `Array` | Liste d'objets `{ lat, lng, name }` à afficher. |
| `controls` | `string` | Liste des contrôles (`zoom`, `scale`). |

## 🎨 Design Tokens (Style)
| Token | Description |
| :--- | :--- |
| `map-height` | Hauteur de la carte (ex: `600px`, `100%`). |

## 🛠 Déclaration avec Builder
```typescript
const map = new MapBuilder("world-map")
  .withSrc("https://api.data.com/points.geojson")
  .withView(46.6, 1.8, 6)
  .withControls("zoom,scale")
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
    "lat": 46.6,
    "lng": 1.8,
    "zoom": 6,
    "controls": "zoom,scale"
  },
  "style": {
    "map-height": 500
  }
}
```

## 🌐 Sortie HTML (Architecture)
Le composant utilise les fichiers locaux Leaflet (situés dans `./libs/`) ou injecte directement le code source si l'option `--inline` est activée lors du build.
```html
<div class="map-wrapper ..." id="world-map" style="--map-height: 500px;">
  <!-- Link ou Style (Inline) -->
  <link rel="stylesheet" href="./libs/leaflet.css" />
  <div id="map-container-world-map" class="leaflet-container"></div>
</div>
<!-- Script ou Script Content (Inline) -->
<script src="./libs/leaflet.js"></script>
<script type="module">
  // Initialisation Leaflet L.map(...)
</script>
```
