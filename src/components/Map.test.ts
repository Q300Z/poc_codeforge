import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";

import { Map, MapBuilder } from "./Map.js";

describe("Map Component", () => {
  const meta = {
    src: "data.geojson",
    version: "1.0.0",
    createdAt: "2026-01-26T10:00:00Z",
  };

  describe("Template Rendering", () => {
    it("should render a container and a script tag", () => {
      const html = Map(meta, [], {}, "map-1");
      expect(html).toContain('id="map-container-map-1"');
      expect(html).toContain("document.createElement('streaming-map')");
      expect(html).toContain("map.setAttribute('src', 'data.geojson');");
    });

    it("should render with optional attributes via setAttribute", () => {
      const html = Map(
        {
          ...meta,
          tileUrl: "https://tiles.com/{z}/{x}/{y}.png",
          controls: "zoom,layers",
          debug: true,
        },
        [],
        {},
        "map-1"
      );

      expect(html).toContain("map.setAttribute('tile-url', 'https://tiles.com/{z}/{x}/{y}.png');");
      expect(html).toContain("map.setAttribute('controls', 'zoom,layers');");
      expect(html).toContain("map.setAttribute('debug', '');");
    });

    it("should be accessible", async () => {
      const html = Map(
        {
          ...meta,
          audioDescription: "Carte interactive",
          ariaRole: "region",
        },
        [],
        {},
        "map-1"
      );
      const container = document.createElement("div");
      container.innerHTML = html;

      const results = await axe(container);
      // @ts-expect-error - vitest-axe matchers extended in setup
      expect(results).toHaveNoViolations();
    });

    it("should apply custom CSS variables from style prop", () => {
      const style = { "map-height": "600px" };
      const html = Map(meta, [], style, "map-1");
      expect(html).toContain("--map-height: 600px");
    });

    it("should include the library content in the module script", () => {
      const html = Map(meta, [], {}, "map-1");
      expect(html).toContain('<script type="module">');
      // On vérifie une portion du code injecté (par exemple l'immédiate function)
      expect(html).toContain("(function() {");
      expect(html).toContain("const shadow = container.attachShadow({mode: 'open'});");
    });
  });

  describe("MapBuilder", () => {
    it("should build a valid Map node with all properties", () => {
      const node = new MapBuilder("map-builder-test")
        .withSrc("custom.geojson")
        .withTileUrl("https://tiles.test")
        .withControls("zoom")
        .withDebug(true)
        .withStyle({ "map-height": "400px" })
        .build();

      expect(node.type).toBe("Map");
      expect(node.meta.src).toBe("custom.geojson");
      expect(node.meta.tileUrl).toBe("https://tiles.test");
      expect(node.meta.controls).toBe("zoom");
      expect(node.meta.debug).toBe(true);
      expect(node.style?.["map-height"]).toBe("400px");
    });

    it("should handle default debug value", () => {
      const node = new MapBuilder("map-debug").withDebug().build();
      expect(node.meta.debug).toBe(true);
    });
  });
});
