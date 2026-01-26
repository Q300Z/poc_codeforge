import { describe, expect, it } from "vitest";

import {
  AppBarBuilder,
  BoxBuilder,
  ButtonBuilder,
  ContainerBuilder,
  GridBuilder,
  HeroBuilder,
  NodeBuilder,
  PageBuilder,
  SectionBuilder,
  SiteBuilder,
  StackBuilder,
} from "./builder.js";

describe("Builders Pattern", () => {
  describe("NodeBuilder", () => {
    it("should build a basic node with mandatory metadata", () => {
      const node = new NodeBuilder("test-id", "TestType").build();

      expect(node.id).toBe("test-id");
      expect(node.type).toBe("TestType");
      expect(node.meta.version).toBe("1.0.0");
      expect(node.meta.createdAt).toBeDefined();
    });

    it("should support custom version", () => {
      const node = new NodeBuilder("id", "Type").withVersion("2.3.0").build();
      expect(node.meta.version).toBe("2.3.0");
    });

    it("should support fluent style and children", () => {
      const node = new NodeBuilder("parent", "Type")
        .withStyle({ color: "red", "width-md": 100 })
        .addChild(new NodeBuilder("child", "ChildType"))
        .build();

      expect(node.style?.color).toBe("red");
      expect(node.style?.["width-md"]).toBe(100);
      expect(node.children).toHaveLength(1);
      expect(node.children?.[0].id).toBe("child");
    });

    it("should add raw node as child", () => {
      const node = new NodeBuilder("p", "T").addChild({ id: "c", type: "C", meta: {} }).build();
      expect(node.children?.[0].id).toBe("c");
    });
  });

  describe("Specialized Builders", () => {
    it("AppBarBuilder should set title and links", () => {
      const nav = new AppBarBuilder("nav")
        .withTitle("My Title")
        .withLinks([{ label: "L1", href: "/1" }])
        .build();

      expect(nav.meta.title).toBe("My Title");
      expect(nav.meta.links).toHaveLength(1);
    });

    it("ButtonBuilder should set label, action and a11y", () => {
      const btn = new ButtonBuilder("btn")
        .withLabel("Click")
        .withAction("doIt()")
        .withAudioDescription("Desc")
        .build();

      expect(btn.meta.label).toBe("Click");
      expect(btn.meta.action).toBe("doIt()");
      expect(btn.meta.audioDescription).toBe("Desc");
    });

    it("HeroBuilder should set title and subtitle", () => {
      const hero = new HeroBuilder("h").withTitle("T").withSubtitle("S").build();

      expect(hero.meta.title).toBe("T");
      expect(hero.meta.subtitle).toBe("S");
    });

    it("GridBuilder should set cols and gap", () => {
      const grid = new GridBuilder("g").withCols(4).withGap(12).build();
      expect(grid.meta.cols).toBe(4);
      expect(grid.meta.gap).toBe(12);
    });

    it("StackBuilder should set direction, align, justify and gap", () => {
      const stack = new StackBuilder("s")
        .withDirection("horizontal")
        .withAlign("center")
        .withJustify("between")
        .withGap(10)
        .build();
      expect(stack.meta.direction).toBe("horizontal");
      expect(stack.meta.align).toBe("center");
      expect(stack.meta.justify).toBe("between");
      expect(stack.meta.gap).toBe(10);
    });

    it("Structural Builders (Section, Container, Box) should exist", () => {
      expect(new SectionBuilder("s").build().type).toBe("Section");
      expect(new ContainerBuilder("c").build().type).toBe("Container");
      expect(new BoxBuilder("b").build().type).toBe("Box");
    });
  });

  describe("Site & Page Builders", () => {
    it("should build a complete site structure", () => {
      const site = new SiteBuilder("My App")
        .withVersion("2.0.0")
        .withGlobalStyle({ "brand-primary": "blue" })
        .withHeader(new AppBarBuilder("nav"))
        .withFooter(new SectionBuilder("footer"))
        .addPage("index", new PageBuilder("home").withDebug(true))
        .addPage("about", { id: "a", type: "Page", meta: {} } as any)
        .build();

      expect(site.meta.appName).toBe("My App");
      expect(site.meta.version).toBe("2.0.0");
      expect(site.style?.["brand-primary"]).toBe("blue");
      expect(site.layout?.header?.type).toBe("AppBar");
      expect(site.layout?.footer?.type).toBe("Section");
      expect(site.pages).toHaveLength(2);
      expect(site.pages[0].slug).toBe("index");
      expect(site.pages[0].content.meta.debug).toBe(true);
    });

    it("should support direct nodes for header/footer", () => {
      const site = new SiteBuilder("App")
        .withHeader({ id: "h", type: "AppBar", meta: {} })
        .withFooter({ id: "f", type: "Section", meta: {} })
        .build();
      expect(site.layout?.header?.id).toBe("h");
      expect(site.layout?.footer?.id).toBe("f");
    });
  });
});
