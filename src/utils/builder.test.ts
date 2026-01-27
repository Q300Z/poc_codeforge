import { describe, expect, it } from "vitest";

import { AppBarBuilder } from "../components/AppBar.js";
import { BoxBuilder } from "../components/Box.js";
import { ButtonBuilder } from "../components/Button.js";
import { CarouselBuilder } from "../components/Carousel.js";
import { ContainerBuilder } from "../components/Container.js";
import { GridBuilder } from "../components/Grid.js";
import { HeroBuilder } from "../components/Hero.js";
import { ImageBuilder } from "../components/Image.js";
import { PageBuilder } from "../components/Page.js";
import { SectionBuilder } from "../components/Section.js";
import { StackBuilder } from "../components/Stack.js";
import { TextBuilder } from "../components/Text.js";
import { TitleBuilder } from "../components/Title.js";
import { VideoBuilder } from "../components/Video.js";
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

    it("should support accessibility helpers", () => {
      const node = new NodeBuilder("a11y", "Type")
        .withAudioDescription("Audio desc")
        .withRole("alert")
        .withAriaHidden(true)
        .build();

      expect(node.meta.audioDescription).toBe("Audio desc");
      expect(node.meta.ariaRole).toBe("alert");
      expect(node.meta.ariaHidden).toBe(true);
    });

    it("should support positioning helpers", () => {
      const node = new NodeBuilder("pos", "Type").withAbsolutePosition(10, 20, 30, 40, 99).build();

      expect(node.style?.position).toBe("absolute");
      expect(node.style?.top).toBe(10);
      expect(node.style?.left).toBe(20);
      expect(node.style?.right).toBe(30);
      expect(node.style?.bottom).toBe(40);
      expect(node.style?.["z-index"]).toBe(99);
    });

    it("should support XY positioning helper", () => {
      const node = new NodeBuilder("pos", "Type").withXY(100, 200, 5).build();

      expect(node.style?.position).toBe("absolute");
      expect(node.style?.x).toBe(100);
      expect(node.style?.y).toBe(200);
      expect(node.style?.["z-index"]).toBe(5);
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

    it("GridBuilder should set cols and gap", () => {
      const grid = new GridBuilder("g").withCols(4).withGap(8).build();
      expect(grid.meta.cols).toBe(4);
      expect(grid.meta.gap).toBe(8);
    });

    it("StackBuilder should set direction, align, justify", () => {
      const stack = new StackBuilder("s")
        .withDirection("horizontal")
        .withAlign("center")
        .withJustify("between")
        .withGap(2)
        .build();
      expect(stack.meta.direction).toBe("horizontal");
      expect(stack.meta.align).toBe("center");
      expect(stack.meta.justify).toBe("between");
      expect(stack.meta.gap).toBe(2);
    });

    it("HeroBuilder should set title and subtitle", () => {
      const hero = new HeroBuilder("h").withTitle("Hero Title").withSubtitle("Hero Sub").build();
      expect(hero.meta.title).toBe("Hero Title");
      expect(hero.meta.subtitle).toBe("Hero Sub");
    });

    it("ImageBuilder should set src and alt", () => {
      const img = new ImageBuilder("i")
        .withSrc("img.jpg")
        .withAlt("alt")
        .withDimensions(100, 200)
        .withLoading("eager")
        .withSrcSet("img.jpg 1x", "100vw")
        .build();
      expect(img.meta.src).toBe("img.jpg");
      expect(img.meta.alt).toBe("alt");
      expect(img.meta.width).toBe(100);
      expect(img.meta.height).toBe(200);
      expect(img.meta.loading).toBe("eager");
      expect(img.meta.srcset).toBe("img.jpg 1x");
      expect(img.meta.sizes).toBe("100vw");
    });

    it("VideoBuilder should set options and track", () => {
      const vid = new VideoBuilder("v")
        .withSrc("vid.mp4")
        .withPoster("poster.jpg")
        .withDimensions(300, 150)
        .withOptions({ controls: false, autoplay: true })
        .addTrack({ src: "cap.vtt", label: "En" })
        .build();

      expect(vid.meta.src).toBe("vid.mp4");
      expect(vid.meta.poster).toBe("poster.jpg");
      expect(vid.meta.controls).toBe(false);
      expect(vid.meta.autoplay).toBe(true);
      expect(vid.meta.tracks).toHaveLength(1);
    });

    it("TitleBuilder should set content, level, align, weight", () => {
      const t = new TitleBuilder("t")
        .withContent("Hello")
        .withLevel(2)
        .withAlign("center")
        .withWeight(600)
        .build();

      expect(t.meta.content).toBe("Hello");
      expect(t.meta.level).toBe(2);
      expect(t.style?.["text-align"]).toBe("center");
      expect(t.style?.["font-weight"]).toBe(600);
    });

    it("TextBuilder should set content and tag", () => {
      const txt = new TextBuilder("tx").withContent("C").withTag("span").build();
      expect(txt.meta.content).toBe("C");
      expect(txt.meta.tag).toBe("span");
    });

    it("CarouselBuilder should add items and options", () => {
      const car = new CarouselBuilder("c").addItem("1.jpg", "1").withOptions(true, 1000).build();

      expect(car.meta.items).toHaveLength(1);
      expect(car.meta.autoPlay).toBe(true);
      expect(car.meta.interval).toBe(1000);
    });

    it("PageBuilder should set appName and debug", () => {
      const p = new PageBuilder("p").withAppName("App").withDebug(true).build();
      expect(p.meta.appName).toBe("App");
      expect(p.meta.debug).toBe(true);
    });

    it("BoxBuilder, ContainerBuilder, SectionBuilder should exist", () => {
      expect(new BoxBuilder("b").build().type).toBe("Box");
      expect(new ContainerBuilder("c").build().type).toBe("Container");
      expect(new SectionBuilder("s").build().type).toBe("Section");
    });
  });

  describe("SiteBuilder", () => {
    it("should build a complete site structure", () => {
      const site = new SiteBuilder("App")
        .withVersion("2.0.0")
        .withDebug(true)
        .withGlobalStyle({ width: 100 } as any)
        .withHeader(new AppBarBuilder("h"))
        .withFooter(new BoxBuilder("f"))
        .addPage("index", new PageBuilder("home"))
        .build();

      expect(site.meta.appName).toBe("App");
      expect(site.meta.version).toBe("2.0.0");
      expect(site.pages).toHaveLength(1);
      expect(site.layout?.header).toBeDefined();
      expect(site.layout?.footer).toBeDefined();
      expect(site.pages[0].content.meta.debug).toBe(true);
    });
  });
});
