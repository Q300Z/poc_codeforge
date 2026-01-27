import { describe, expect, it } from "vitest";

import { AppBarBuilder } from "../components/AppBar.js";
import { ButtonBuilder } from "../components/Button.js";
import { GridBuilder } from "../components/Grid.js";
import { PageBuilder } from "../components/Page.js";
import { StackBuilder } from "../components/Stack.js";
// Imports directs pour éviter les dépendances lourdes du point d'entrée index.ts lors des tests unitaires
import { NodeBuilder, SiteBuilder } from "./builder.js";

describe("Builders Pattern", () => {
  describe("NodeBuilder", () => {
    it("should build a basic node with mandatory metadata", () => {
      const node = new NodeBuilder("test-id", "TestType").build();
      expect(node.id).toBe("test-id");
      expect(node.meta.version).toBe("1.0.0");
      expect(node.meta.createdAt).toBeDefined();
    });

    it("should support custom version and createdAt", () => {
      const date = "2026-01-26T10:00:00Z";
      const node = new NodeBuilder("id", "Type").withVersion("2.3.0").withCreatedAt(date).build();
      expect(node.meta.version).toBe("2.3.0");
      expect(node.meta.createdAt).toBe(date);
    });
  });

  describe("Specialized Builders", () => {
    it("AppBarBuilder should set title and links", () => {
      const nav = new AppBarBuilder("nav").withTitle("T").withLinks([]).build();
      expect(nav.meta.title).toBe("T");
    });

    it("ButtonBuilder should set label and action", () => {
      const btn = new ButtonBuilder("btn").withLabel("L").withAction("A").build();
      expect(btn.meta.label).toBe("L");
    });

    it("GridBuilder should set cols", () => {
      const grid = new GridBuilder("g").withCols(4).build();
      expect(grid.meta.cols).toBe(4);
    });

    it("StackBuilder should set direction", () => {
      const stack = new StackBuilder("s").withDirection("horizontal").build();
      expect(stack.meta.direction).toBe("horizontal");
    });
  });

  describe("SiteBuilder", () => {
    it("should build a complete site structure", () => {
      const site = new SiteBuilder("App")
        .withVersion("2.0.0")
        .withGlobalStyle({ width: 100 } as any)
        .addPage("index", new PageBuilder("home"))
        .build();

      expect(site.meta.appName).toBe("App");
      expect(site.meta.version).toBe("2.0.0");
      expect(site.pages).toHaveLength(1);
    });
  });
});
