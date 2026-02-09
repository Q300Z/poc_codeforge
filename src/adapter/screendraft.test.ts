import { beforeEach, describe, expect, it } from "vitest";

import { render } from "../renderer.js";
import { setupRegistry } from "../setup.js";
import { ScreenDraftAdapter, ScreenDraftData } from "./screendraft.js";

describe("ScreenDraftAdapter", () => {
  beforeEach(() => {
    setupRegistry();
  });

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
        id: "nav-1",
        type: "navbar",
        x: 0,
        y: 0,
        width: 800,
        height: 60,
        navbarLogoText: "TestLogo",
        navbarLinks: [{ label: "Home", href: "/home" }],
        backgroundColor: "black",
        textColor: "white",
      },
      {
        id: "form-1",
        type: "form",
        x: 0,
        y: 0,
        width: 400,
        height: 300,
        formButtonText: "Send Us",
        backgroundColor: "#fff",
        formFields: [{ id: "field-1", label: "Name", type: "text", placeholder: "Name" }],
      },
      {
        id: "map-1",
        type: "map",
        x: 0,
        y: 0,
        width: 600,
        height: 400,
      },
      {
        id: "tab-1",
        type: "table",
        x: 10,
        y: 10,
        width: 500,
        height: 200,
        content: "My Table",
        tableData: [
          ["H1", "H2"],
          ["V1", "V2"],
        ],
        backgroundColor: "grey",
        textColor: "black",
      },
      {
        id: "sel-1",
        type: "select",
        x: 10,
        y: 220,
        width: 200,
        height: 50,
        content: "Choose",
        selectOptions: ["A", "B"],
        selectPlaceholder: "Pick",
        backgroundColor: "white",
        textColor: "blue",
      },
    ],
  };

  it("should transform global meta correctly", async () => {
    const site = await ScreenDraftAdapter.transform(mockData);
    expect(site.meta.appName).toBe("TestApp");
    expect(site.meta.version).toBe("1.0");
    expect(site.pages).toHaveLength(1);
    expect(site.pages[0].slug).toBe("index");
  });

  it("should transform Title component", async () => {
    const site = await ScreenDraftAdapter.transform(mockData);
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

  it("should transform Button component", async () => {
    const site = await ScreenDraftAdapter.transform(mockData);
    const page = site.pages[0].content;
    const btn = page.children.find((c: any) => c.id === "btn-1");

    expect(btn).toBeDefined();
    expect(btn.type).toBe("Button");
    expect(btn.meta.label).toBe("Click me");
    expect(btn.style["btn-bg"]).toBe("blue");
    expect(btn.style["btn-text"]).toBe("white");
  });

  it("should transform Image component", async () => {
    const site = await ScreenDraftAdapter.transform(mockData);
    const page = site.pages[0].content;
    const img = page.children.find((c: any) => c.id === "img-1");

    expect(img).toBeDefined();
    expect(img.type).toBe("Image");
    expect(img.meta.src).toBe("https://placehold.net/500x300.png");
    expect(img.meta.alt).toBe("Alt Text");
    expect(img.style["object-fit"]).toBe("cover");
  });

  it("should transform Video component", async () => {
    const site = await ScreenDraftAdapter.transform(mockData);
    const page = site.pages[0].content;
    const vid = page.children.find((c: any) => c.id === "vid-1");

    expect(vid).toBeDefined();
    expect(vid.type).toBe("Video");
    expect(vid.meta.src).toBe("movie.mp4");
    expect(vid.meta.controls).toBe(true);
  });

  it("should transform Carousel component", async () => {
    const site = await ScreenDraftAdapter.transform(mockData);
    const page = site.pages[0].content;
    const carousel = page.children.find((c: any) => c.id === "car-1");

    expect(carousel).toBeDefined();
    expect(carousel.type).toBe("Carousel");
    expect(carousel.meta.autoPlay).toBe(true);
    expect(carousel.meta.interval).toBe(2000);
    expect(carousel.meta.items).toHaveLength(2);
    expect(carousel.style["carousel-color"]).toBe("#fff");
  });

  it("should transform Navbar component", async () => {
    const site = await ScreenDraftAdapter.transform(mockData);
    const page = site.pages[0].content;
    const nav = page.children.find((c: any) => c.id === "nav-1");

    expect(nav).toBeDefined();
    expect(nav.type).toBe("AppBar");
    expect(nav.meta.title).toBe("TestLogo");
    expect(nav.meta.links).toHaveLength(1);
    expect(nav.style["appbar-bg"]).toBe("black");
    expect(nav.style["appbar-text"]).toBe("white");
  });

  it("should transform Form component", async () => {
    const site = await ScreenDraftAdapter.transform(mockData);
    const page = site.pages[0].content;
    const form = page.children.find((c: any) => c.id === "form-1");

    expect(form).toBeDefined();
    expect(form.type).toBe("Form");
    expect(form.meta.buttonText).toBe("Send Us");
    expect(form.children).toHaveLength(1);
    expect(form.children[0].type).toBe("FormField");
    expect(form.children[0].meta.label).toBe("Name");
  });

  it("should transform Map component", async () => {
    const dataWithMapProps = {
      ...mockData,
      components: mockData.components.map((c) =>
        c.id === "map-1"
          ? {
              ...c,
              mapCenter: { lat: 48.8, lng: 2.3 },
              mapZoom: 10,
              mapMarkers: [{ lat: 48.8, lng: 2.3, name: "P" }],
            }
          : c
      ),
    };
    const site = await ScreenDraftAdapter.transform(dataWithMapProps);
    const page = site.pages[0].content;
    const map = page.children.find((c: any) => c.id === "map-1");

    expect(map).toBeDefined();
    expect(map.type).toBe("Map");
    expect(map.meta.lat).toBe(48.8);
    expect(map.meta.lng).toBe(2.3);
    expect(map.meta.zoom).toBe(10);
    expect(map.meta.markers).toHaveLength(1);
    expect(map.style.width).toBe(600);
    expect(map.style["map-height"]).toBe(400);
  });

  it("should transform Table component", async () => {
    const site = await ScreenDraftAdapter.transform(mockData);
    const page = site.pages[0].content;
    const table = page.children.find((c: any) => c.id === "tab-1");

    expect(table).toBeDefined();
    expect(table.type).toBe("Table");
    expect(table.meta.headers).toEqual(["H1", "H2"]);
    expect(table.meta.rows).toEqual([["V1", "V2"]]);
    expect(table.meta.caption).toBe("My Table");
    expect(table.style["table-header-bg"]).toBe("grey");
    expect(table.style["table-header-text"]).toBe("black");
  });

  it("should transform Select component", async () => {
    const site = await ScreenDraftAdapter.transform(mockData);
    const page = site.pages[0].content;
    const select = page.children.find((c: any) => c.id === "sel-1");

    expect(select).toBeDefined();
    expect(select.type).toBe("Select");
    expect(select.meta.label).toBe("Choose");
    expect(select.meta.placeholder).toBe("Pick");
    expect(select.meta.options).toHaveLength(2);
    expect(select.meta.options[0]).toEqual({ label: "A", value: "a" });
    expect(select.style["select-bg"]).toBe("white");
    expect(select.style["select-text"]).toBe("blue");
  });

  describe("HTML Generation", () => {
    it("should transform Map component with markers and src", async () => {
      const data: ScreenDraftData = {
        meta: { appName: "Test", createdAt: "", version: "1" },
        components: [
          {
            id: "map-1",
            type: "map",
            x: 0,
            y: 0,
            width: 100,
            height: 100,
            mapCenter: { lat: 48, lng: 2 },
            mapMarkers: [{ id: "m1", lat: 48.1, lng: 2.1, name: "M1" }],
            mapSrc: "data.geojson",
          },
        ],
      };
      const result = await ScreenDraftAdapter.transform(data);
      const mapNode = result.pages[0].content.children[0];
      expect(mapNode.meta.markers).toHaveLength(1);
      expect(mapNode.meta.src).toBe("data.geojson");
      expect(mapNode.meta.lat).toBe(48);
    });

    it("should transform Carousel with images", async () => {
      const data: ScreenDraftData = {
        meta: { appName: "Test", createdAt: "", version: "1" },
        components: [
          {
            id: "c-1",
            type: "carousel",
            x: 0,
            y: 0,
            width: 100,
            height: 100,
            carouselImages: [{ id: "i1", src: "img1.jpg", alt: "Alt 1" }],
          },
        ],
      };
      const result = await ScreenDraftAdapter.transform(data);
      const carouselNode = result.pages[0].content.children[0];
      expect(carouselNode.meta.items).toHaveLength(1);
      expect(carouselNode.meta.items[0].alt).toBe("Alt 1");
    });

    it("should handle Select and Textarea with placeholders", async () => {
      const data: ScreenDraftData = {
        meta: { appName: "Test", createdAt: "", version: "1" },
        components: [
          {
            id: "s-1",
            type: "select",
            x: 0,
            y: 0,
            width: 100,
            height: 100,
            selectPlaceholder: "Choose...",
          },
          {
            id: "t-1",
            type: "textarea",
            x: 0,
            y: 0,
            width: 100,
            height: 100,
            textareaPlaceholder: "Write...",
            textareaRows: 10,
          },
        ],
      };
      const result = await ScreenDraftAdapter.transform(data);
      expect(result.pages[0].content.children[0].meta.placeholder).toBe("Choose...");
      expect(result.pages[0].content.children[1].meta.placeholder).toBe("Write...");
      expect(result.pages[0].content.children[1].meta.rows).toBe(10);
    });

    it("should warn and skip unknown component types", async () => {
      const data: ScreenDraftData = {
        meta: { appName: "Test", createdAt: "", version: "1" },
        components: [{ id: "u-1", type: "unknown" as any, x: 0, y: 0, width: 100, height: 100 }],
      };
      const result = await ScreenDraftAdapter.transform(data);
      expect(result.pages[0].content.children || []).toHaveLength(0);
    });

    it("should transform Box, Section and Icon", async () => {
        const data: ScreenDraftData = {
          meta: { appName: "Test", createdAt: "", version: "1" },
          components: [
            { id: "b1", type: "box", x: 0, y: 0, width: 100, height: 100, backgroundColor: "red" },
            { id: "s1", type: "section", x: 0, y: 0, width: 100, height: 100, backgroundColor: "blue" },
            { id: "i1", type: "icon", x: 0, y: 0, width: 32, height: 32, backgroundColor: "green" },
          ],
        };
        const result = await ScreenDraftAdapter.transform(data);
        const children = result.pages[0].content.children;
        expect(children[0].type).toBe("Box");
        expect(children[0].style.backgroundColor).toBe("red");
        expect(children[1].type).toBe("Section");
        expect(children[1].style.backgroundColor).toBe("blue");
        expect(children[2].type).toBe("Box"); // Icon is mapped to Box
        expect(children[2].style.backgroundColor).toBe("green");
    });

    it("should render full HTML correctly from ScreenDraft data", async () => {
      const site = await ScreenDraftAdapter.transform(mockData);
      const html = render(site.pages[0].content);

      // Verify basic structure
      expect(html).toContain("<!DOCTYPE html>");

      // Verify Title
      expect(html).toContain("Hello");

      // Verify Form and Fields
      expect(html).toContain("<form");
      expect(html).toContain("Send Us");
      expect(html).toContain('type="text"');

      // Verify Navbar (AppBar)
      expect(html).toContain("<nav");
      expect(html).toContain("TestLogo");

      // Verify Map
      expect(html).toContain("CodeForge.initMap");
      expect(html).toContain("map-container-map-1");
      expect(html).toContain("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");
    });
  });
});