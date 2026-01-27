import fs from "fs";
import path from "path";

import { CSSLength } from "../types.js";
import { NodeBuilder } from "../utils/builder.js";
import { createComponent } from "../utils/factory.js";

/** Interface des métadonnées pour le composant Map. */
export interface MapMeta {
  /** URL du fichier GeoJSON à charger. */
  src?: string;
  /** URL du fond de carte (tiles raster). */
  tileUrl?: string;
  /** Liste des contrôles à afficher (ex: "zoom,layers"). */
  controls?: string;
  /** Affiche un overlay de performance (FPS, mémoire). */
  debug?: boolean;
}

/** Interface des Design Tokens pour le composant Map. */
export interface MapStyles {
  /** Hauteur de la carte. */
  "map-height"?: CSSLength;
}

/**
 * @class MapBuilder
 * @description Constructeur fluide pour le composant Map.
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
  /** Active le mode debug. */
  withDebug(enabled: boolean = true): this {
    this.node.meta.debug = enabled;
    return this;
  }
}

/**
 * @constant Map
 * @description Composant de carte interactive utilisant streaming-map.
 */
export const Map = createComponent({
  name: "Map",
  version: "1.1.0",
  description: "Carte interactive haute performance capable de charger des GeoJSON massifs.",
  metaSchema: {
    src: {
      type: "string",
      description: "URL du fichier GeoJSON",
    },
    tileUrl: {
      type: "string",
      description: "URL du fond de carte",
    },
    controls: {
      type: "string",
      description: "Liste des contrôles (zoom, layers, reset, print, info, draw)",
    },
    debug: {
      type: "boolean",
      description: "Affiche un overlay de performance",
    },
    libUrl: {
      type: "string",
      description: "URL de la bibliothèque streaming-map (défaut: ./libs/streaming-map-nodraw.js)",
    },
  },
  authorizedTokens: {
    "map-height": "Hauteur de la carte",
  },
  template: (meta, _children, styleVars, a11yAttrs, id) => {
    const containerId = `map-container-${id}`;
    const libUrl = meta.libUrl || "./libs/streaming-map-nodraw.js";
    const inlineLib = meta.mapLibContent
      ? `<script type="module">${meta.mapLibContent}</script>`
      : `<script type="module" src="${libUrl}"></script>`;

    return `
<div class="map-wrapper flex-shrink-0" style="${styleVars}" ${a11yAttrs}>
  <div id="${containerId}" style="width: 100%; height: 100%;"></div>
</div>
${inlineLib}
<script type="module">
  (function() {
    const container = document.getElementById('${containerId}');
    if (container && !container.shadowRoot) {
      const shadow = container.attachShadow({mode: 'open'});
      const map = document.createElement('streaming-map');
      map.setAttribute('style', 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: block;');
      ${meta.src ? `map.setAttribute('src', '${meta.src}');` : ""}
      ${meta.tileUrl ? `map.setAttribute('tile-url', '${meta.tileUrl}');` : ""}
      ${meta.controls ? `map.setAttribute('controls', '${meta.controls}');` : ""}
      ${meta.debug ? `map.setAttribute('debug', '');` : ""}
      shadow.appendChild(map);
    }
  })();
</script>
    `;
  },
});
