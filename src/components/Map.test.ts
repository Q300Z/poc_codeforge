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
    it("should render a container", () => {
      const html = Map(meta, [], {}, "map-1");
      expect(html).toContain('id="map-container-map-1"');
    });

    it("should render with custom view coordinates", () => {
      const html = Map(
        {
          ...meta,
          lat: 48.8566,
          lng: 2.3522,
          zoom: 12,
        },
        [],
        {},
        "map-1"
      );

      expect(html).toContain("CodeForge.initMap");
      expect(html).toContain("48.8566, 2.3522, 12");
    });

    it("should handle optional controls", () => {
      const html = Map({ ...meta, controls: "scale" }, [], {}, "map-1");
      expect(html).toContain("'scale'");
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
      expect(html).toContain("--map-height:600px");
    });

    it("should render markers in the script", () => {
      const html = Map(
        {
          ...meta,
          markers: [{ lat: 48.8, lng: 2.3, name: "Paris" }],
        },
        [],
        {},
        "map-1"
      );
      expect(html).toContain('[{"lat":48.8,"lng":2.3,"name":"Paris"}]');
    });
  });

  describe("MapBuilder", () => {
    it("should build a valid Map node with all properties", () => {
      const node = new MapBuilder("map-builder-test")
        .withSrc("custom.geojson")
        .withTileUrl("https://tiles.test")
        .withControls("zoom")
        .withView(48.8, 2.3, 10)
        .withDebug(true)
        .withStyle({ "map-height": "400px" })
        .build();

      expect(node.type).toBe("Map");
      expect(node.meta.src).toBe("custom.geojson");
      expect(node.meta.tileUrl).toBe("https://tiles.test");
      expect(node.meta.controls).toBe("zoom");
      expect(node.meta.lat).toBe(48.8);
      expect(node.meta.lng).toBe(2.3);
      expect(node.meta.zoom).toBe(10);
      expect(node.meta.debug).toBe(true);
      expect(node.style?.["map-height"]).toBe("400px");
    });

    it("should handle default debug value", () => {
      const node = new MapBuilder("map-debug").withDebug().build();
      expect(node.meta.debug).toBe(true);
    });
  });
});
