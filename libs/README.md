# Streaming Map Web Component (POC)

Une carte interactive haute performance capable de charger des fichiers GeoJSON massifs en streaming, sans bloquer le navigateur.

![CI Status](https://img.shields.io/badge/build-passing-brightgreen)
![Coverage](https://img.shields.io/badge/coverage-93%25-brightgreen)

## Fonctionnalités Clés

*   🚀 **Streaming JSON** : Affichage progressif des données (1M+ points) pendant le téléchargement.
*   ⚡ **Double Buffering** : Mises à jour fluides sans clignotement lors du chargement de nouvelles données.
*   💾 **Cache Intelligent** : Pré-chargement automatique via Web Worker et Service Worker.
*   🎨 **Style Personnalisable** : Configuration dynamique des couleurs et tailles via API JS.
*   🧩 **Framework Agnostic** : Web Component standard encapsulant tout son CSS (Zero-config).

---

## 📦 Distribution & Importation

Le projet génère des bundles autonomes dans le dossier `dist/`. Tout le CSS est inclus dans le JavaScript.

### 1. Choisir sa version

| Fichier | Taille (Gzip) | Description |
| :--- | :--- | :--- |
| `streaming-map-nodraw.js` | ~330 Ko | **Version Core** : Affichage haute performance uniquement. |
| `streaming-map-full.js` | ~355 Ko | **Version Complète** : Inclut les outils de dessin (`mapbox-gl-draw`). |

### 2. Importation dans votre projet

#### HTML (Direct)
Il suffit d'importer le script en tant que module. Aucun fichier CSS externe n'est requis.
```html
<script type="module" src="./dist/streaming-map-full.js"></script>
```

#### Dans un Framework (React, Vue, Angular)
```javascript
import './path/to/dist/streaming-map-full.js';
// Le tag <streaming-map> est maintenant disponible dans votre application
```

---

## 🚀 Utilisation

### Chargement des données

Il existe deux manières d'ajouter des données GeoJSON sur la carte :

#### 1. Chargement à distance (Recommandé pour les gros fichiers)
Utilisez l'attribut `src` pour charger un fichier GeoJSON. Le composant gère automatiquement le streaming et l'affichage progressif.
```html
<streaming-map src="https://mon-api.com/villes.geojson"></streaming-map>
```

#### 2. Chargement programmatique (JS)
Si vous avez déjà les données en mémoire ou si vous voulez ajouter des points dynamiquement, utilisez la méthode `loadData`.
```javascript
const map = document.querySelector('streaming-map');

// Un point simple
map.loadData({
  type: 'Feature',
  geometry: { type: 'Point', coordinates: [2.35, 48.85] },
  properties: { name: 'Paris' }
});

// Ou une collection complète
map.loadData({
  type: 'FeatureCollection',
  features: [...]
});
```

#### 3. Ajout rapide de points (Sans GeoJSON)
Vous pouvez ajouter un ou plusieurs points directement.

```javascript
const map = document.querySelector('streaming-map');

// Ajouter un point unique (Remplace les données existantes par défaut)
map.addPoint(2.35, 48.85, { name: 'Paris' });

// Ajouter plusieurs points d'un coup
map.addPoints([
  { lng: 2.35, lat: 48.85, properties: { name: 'Paris' } },
  { lng: 4.83, lat: 45.76, properties: { name: 'Lyon' } }
]);

// ACCUMULATION : Ajouter sans effacer les points précédents
// (Passer 'true' en dernier argument)
map.addPoint(5.36, 43.29, { name: 'Marseille' }, true);
```

### Attributs disponibles

| Attribut | Valeur par défaut | Description |
| :--- | :--- | :--- |
| `src` | - | URL du fichier GeoJSON (supporte le streaming). |
| `tile-url` | OSM Standard | URL du fond de carte (tiles raster). |
| `controls` | `zoom, layers` | Liste des contrôles et positions (ex: `zoom:top-left, draw:top-right`). |
| `debug` | - | Affiche un overlay de performance (FPS, mémoire, réseau). |

### Contrôles disponibles
*   `zoom` : Boutons +/-.
*   `layers` : Sélecteur de fond de carte.
*   `reset` : Bouton "Home" pour revenir à la vue initiale.
*   `print` : Export / Impression de la carte.
*   `info` : Affiche les métadonnées de chargement.
*   `draw` : Outils de dessin (Uniquement dans la version **Full**).

---

## 🎨 Personnalisation

### Popups via Slots
Utilisez `{{propriété}}` pour injecter dynamiquement les données du GeoJSON.
```html
<streaming-map src="...">
  <template slot="popup">
    <div class="my-popup">
      <h3>{{name}}</h3>
      <p>Population: {{population}}</p>
    </div>
  </template>
</streaming-map>
```

### Style Dynamique (API JS)
```javascript
const map = document.querySelector('streaming-map');
map.styleConfig = {
  fill: { 'fill-color': '#e74c3c', 'fill-opacity': 0.6 },
  circle: { 'circle-color': '#f1c40f', 'circle-radius': 8 }
};
```

---

## 🛠️ Développement

### Générer les builds
Cette commande génère les fichiers `nodraw` et `full` de manière optimisée :
```bash
npm run build
```

### Scripts de développement
*   `npm run dev` : Lancer la démo locale.
*   `npm run test` : Lancer la suite de tests Vitest.
*   `npm run doc` : Générer la documentation technique (TypeDoc).

## Documentation Technique
*   [Architecture & Flux de Données](docs/ARCHITECTURE.md)
*   [Documentation API (HTML)](docs-html/index.html)
