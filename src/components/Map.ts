import { CSSLength } from "../types.js";
import { NodeBuilder } from "../utils/builder.js";
import { createComponent } from "../utils/factory.js";

/** Interface pour un marqueur sur la carte. */
export interface MapMarker {
  /** Latitude du point. */
  lat: number;
  /** Longitude du point. */
  lng: number;
  /** Libellé affiché au survol ou dans une popup. */
  name?: string;
}

/** Interface des métadonnées pour le composant Map (Leaflet 2.0). */
export interface MapMeta {
  /** URL du fichier GeoJSON à charger. */
  src?: string;
  /** URL du fond de carte (tiles raster). */
  tileUrl?: string;
  /** Liste des contrôles à afficher (ex: "zoom,scale"). */
  controls?: string;
  /** Latitude initiale. */
  lat?: number;
  /** Longitude initiale. */
  lng?: number;
  /** Zoom initial. */
  zoom?: number;
  /** Liste des marqueurs à afficher. */
  markers?: MapMarker[];
  /** Mode debug (optionnel). */
  debug?: boolean;
}

/** Interface des Design Tokens pour le composant Map. */
export interface MapStyles {
  /** Hauteur de la carte. */
  "map-height"?: CSSLength;
}

/**
 * @class MapBuilder
 * @description Constructeur fluide pour le composant Map utilisant Leaflet 2.0.
 */
export class MapBuilder extends NodeBuilder<MapMeta, MapStyles> {
  constructor(id: string) {
    super(id, "Map");
  }
  /** Définit la source des données GeoJSON. */
  withSrc(src: string): this {
    this.node.meta.src = src;
    return this;
  }
  /** Définit l'URL du fond de carte. */
  withTileUrl(tileUrl: string): this {
    this.node.meta.tileUrl = tileUrl;
    return this;
  }
  /** Définit les contrôles actifs. */
  withControls(controls: string): this {
    this.node.meta.controls = controls;
    return this;
  }
  /** Définit la vue initiale. */
  withView(lat: number, lng: number, zoom: number = 13): this {
    this.node.meta.lat = lat;
    this.node.meta.lng = lng;
    this.node.meta.zoom = zoom;
    return this;
  }
  /** Active le mode debug. */
  withDebug(enabled: boolean = true): this {
    this.node.meta.debug = enabled;
    return this;
  }
}

/**
 * @constant Map
 * @description Composant de carte interactive utilisant Leaflet 2.0.
 */
export const Map = createComponent({
  name: "Map",
  version: "2.0.0-alpha.1",
  description:
    "Carte interactive utilisant Leaflet 2.0 (Alpha) pour un rendu fluide et accessible.",
  metaSchema: {
    src: { type: "string", description: "URL du fichier GeoJSON" },
    tileUrl: { type: "string", description: "URL du fond de carte" },
    controls: { type: "string", description: "Contrôles (zoom, scale)" },
    lat: { type: "number", description: "Latitude initiale", default: 46.603354 },
    lng: { type: "number", description: "Longitude initiale", default: 1.888334 },
    zoom: { type: "number", description: "Zoom initial", default: 6 },
  },
  authorizedTokens: {
    "map-height": "Hauteur de la carte",
  },
  template: (meta, _children, styleVars, a11yAttrs, id) => {
    const containerId = `map-container-${id}`;
    const lat = meta.lat || 46.603354;
    const lng = meta.lng || 1.888334;
    const zoom = meta.zoom || 6;
    const tileUrl = meta.tileUrl || "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

    // Gestion du CSS (Inline ou Local)
    const leafletCss = meta.mapLibCssContent
      ? `<style>${meta.mapLibCssContent}</style>`
      : `<link rel="stylesheet" href="./libs/leaflet.css" />`;

    // Gestion du JS (Inline ou Local)
    const leafletJs = meta.mapLibJsContent
      ? `<script>${meta.mapLibJsContent}</script>`
      : `<script src="./libs/leaflet.js"></script>`;

    return `
  <div class="map-wrapper flex-shrink-0" style="${styleVars}" ${a11yAttrs}>
    ${leafletCss}
    <style>
      #${containerId} { 
        width: 100%; 
        height: var(--map-height, 400px); 
        background: #f8f8f8;
        border-radius: inherit;
      }
      .leaflet-container { font-family: inherit; z-index: 1; }
      .leaflet-container a { text-decoration: underline !important; }
    </style>
    <div id="${containerId}" class="leaflet-container"></div>
  </div>
  
  ${leafletJs}
  <script type="module">
    (function() {
      const initMap = () => {
        if (typeof L === 'undefined') {
          console.error("[CodeForge Map] Leaflet n'est pas chargé.");
          return;
        }
        const map = L.map('${containerId}').setView([${lat}, ${lng}], ${zoom});
        
        L.tileLayer('${tileUrl}', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        if ('${meta.controls || ""}'.includes('scale')) {
          L.control.scale().addTo(map);
        }

        // Ajout des marqueurs
        const markers = ${JSON.stringify(meta.markers || [])};
        markers.forEach(m => {
          const marker = L.marker([m.lat, m.lng]).addTo(map);
          if (m.name) {
            marker.bindPopup(m.name);
          }
        });

        if ('${meta.src || ""}') {
          fetch('${meta.src}')
            .then(res => res.json())
            .then(data => {
              L.geoJSON(data).addTo(map);
            })
            .catch(err => console.error("[CodeForge Map] Erreur GeoJSON:", err));
        }
      };

      if (window.L) {
        initMap();
      } else {
        // Attendre que le script Leaflet soit chargé si nécessaire
        window.addEventListener('load', initMap);
      }
    })();
  </script>
    `;
  },
});
