import { describe, expect, it } from "vitest";

import { ScreenDraftAdapter, ScreenDraftData } from "./screendraft.js";

describe("ScreenDraftAdapter", () => {
  const mockData: ScreenDraftData = {
    meta: {
      appName: "TestApp",
      createdAt: "2026-01-01T00:00:00Z",
      version: "1.0",
    },
    components: [
      {
        id: "title-1",
        type: "title",
        x: 10,
        y: 20,
        width: 200,
        height: 50,
        content: "Hello",
        textColor: "#000",
        backgroundColor: "transparent",
        fontSize: 24,
      },
      {
        id: "btn-1",
        type: "button",
        x: 100,
        y: 200,
        width: 100,
        height: 40,
        content: "Click me",
        backgroundColor: "blue",
        textColor: "white",
      },
      {
        id: "img-1",
        type: "image",
        x: 0,
        y: 0,
        width: 500,
        height: 300,
        content: "Alt Text",
        imageSrc: "pic.jpg",
      },
      {
        id: "vid-1",
        type: "video",
        x: 50,
        y: 50,
        width: 400,
        height: 200,
        videoUrl: "movie.mp4",
      },
      {
        id: "car-1",
        type: "carousel",
        x: 10,
        y: 10,
        width: 300,
        height: 150,
        carouselAutoPlay: true,
        carouselInterval: 2000,
        carouselImages: [
          { id: "1", src: "1.jpg", alt: "1" },
          { id: "2", src: "2.jpg", alt: "2" },
        ],
        textColor: "#fff",
      },
      {
        id: "unknown-1",
        type: "map", // Unsupported
        x: 0,
        y: 0,
        width: 0,
        height: 0,
      },
    ],
  };

  it("should transform global meta correctly", () => {
    const site = ScreenDraftAdapter.transform(mockData);
    expect(site.meta.appName).toBe("TestApp");
    expect(site.meta.version).toBe("1.0");
    expect(site.pages).toHaveLength(1);
    expect(site.pages[0].slug).toBe("index");
  });

  it("should transform Title component", () => {
    const site = ScreenDraftAdapter.transform(mockData);
    const page = site.pages[0].content;
    const title = page.children.find((c: any) => c.id === "title-1");

    expect(title).toBeDefined();
    expect(title.type).toBe("Title");
    expect(title.meta.content).toBe("Hello");
    expect(title.meta.level).toBe(1);
    expect(title.style.x).toBe(10);
    expect(title.style.y).toBe(20);
    expect(title.style["title-text"]).toBe("#000");
    expect(title.style["font-size"]).toBe(24);
  });

  it("should transform Button component", () => {
    const site = ScreenDraftAdapter.transform(mockData);
    const page = site.pages[0].content;
    const btn = page.children.find((c: any) => c.id === "btn-1");

    expect(btn).toBeDefined();
    expect(btn.type).toBe("Button");
    expect(btn.meta.label).toBe("Click me");
    expect(btn.style["btn-bg"]).toBe("blue");
    expect(btn.style["btn-text"]).toBe("white");
  });

  it("should transform Image component", () => {
    const site = ScreenDraftAdapter.transform(mockData);
    const page = site.pages[0].content;
    const img = page.children.find((c: any) => c.id === "img-1");

    expect(img).toBeDefined();
    expect(img.type).toBe("Image");
    expect(img.meta.src).toBe("pic.jpg");
    expect(img.meta.alt).toBe("Alt Text");
    expect(img.style["object-fit"]).toBe("cover");
  });

  it("should transform Video component", () => {
    const site = ScreenDraftAdapter.transform(mockData);
    const page = site.pages[0].content;
    const vid = page.children.find((c: any) => c.id === "vid-1");

    expect(vid).toBeDefined();
    expect(vid.type).toBe("Video");
    expect(vid.meta.src).toBe("movie.mp4");
    expect(vid.meta.controls).toBe(true);
  });

  it("should transform Carousel component", () => {
    const site = ScreenDraftAdapter.transform(mockData);
    const page = site.pages[0].content;
    const carousel = page.children.find((c: any) => c.id === "car-1");

    expect(carousel).toBeDefined();
    expect(carousel.type).toBe("Carousel");
    expect(carousel.meta.autoPlay).toBe(true);
    expect(carousel.meta.interval).toBe(2000);
    expect(carousel.meta.items).toHaveLength(2);
    expect(carousel.style["carousel-color"]).toBe("#fff");
  });

  it("should ignore unsupported components", () => {
    const site = ScreenDraftAdapter.transform(mockData);
    const page = site.pages[0].content;
    const map = page.children.find((c: any) => c.id === "unknown-1");
    expect(map).toBeUndefined();
  });
});
