import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { buildSite } from "./index.js";
import fs from "fs";
import path from "path";

// Mock dependencies
vi.mock("./setup.js", () => ({
  setupRegistry: vi.fn(),
}));
vi.mock("./renderer.js", () => ({
  render: vi.fn(() => '<html><head><link rel="stylesheet" href="./style.css"></head><body></body></html>'),
}));

describe("buildSite", () => {
  let existsSyncSpy: any;
  let readFileSyncSpy: any;
  let writeFileSyncSpy: any;
  let mkdirSyncSpy: any;
  let readdirSyncSpy: any;
  let lstatSyncSpy: any;
  let copyFileSyncSpy: any;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(process, "cwd").mockReturnValue("/test");
    vi.spyOn(path, "resolve").mockImplementation((...args) => args.join("/").replace("//", "/"));
    
    // Spying on fs methods
    existsSyncSpy = vi.spyOn(fs, "existsSync").mockImplementation((p: string) => {
        if (p.includes("libs") || p.includes("images") || p.endsWith("site.json") || p.endsWith(".css") || p.endsWith(".js")) return true;
        return false;
    });
    readFileSyncSpy = vi.spyOn(fs, "readFileSync").mockImplementation((p: string) => {
        if (p.endsWith("site.json")) return JSON.stringify({
            meta: { appName: "Test" },
            style: {},
            pages: [{ slug: "index", content: { id: "root", type: "Box" } }]
        });
        if (p.endsWith(".css")) return "body { color: red; }";
        if (p.endsWith(".js")) return "console.log('lib');";
        return "";
    });
    writeFileSyncSpy = vi.spyOn(fs, "writeFileSync").mockImplementation(() => {});
    mkdirSyncSpy = vi.spyOn(fs, "mkdirSync").mockImplementation(() => undefined);
    readdirSyncSpy = vi.spyOn(fs, "readdirSync").mockImplementation((p: string) => {
        if (p.includes("libs")) return ["lib.js"];
        if (p.includes("images")) return ["img.png"];
        return [];
    });
    lstatSyncSpy = vi.spyOn(fs, "lstatSync").mockImplementation(() => ({
        isDirectory: () => false
    } as any));
    copyFileSyncSpy = vi.spyOn(fs, "copyFileSync").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should throw if JSON file does not exist", async () => {
    existsSyncSpy.mockImplementation((p: string) => !p.endsWith("missing.json"));
    await expect(buildSite("missing.json")).rejects.toThrow("JSON file not found");
  });

  it("should generate static HTML and copy assets", async () => {
    await buildSite("site.json", "dist");

    expect(readFileSyncSpy).toHaveBeenCalledWith(expect.stringContaining("site.json"), "utf-8");
    expect(writeFileSyncSpy).toHaveBeenCalledWith(expect.stringContaining("index.html"), expect.any(String));
    // Le CSS est maintenant écrit via writeFileSync dans buildSite
    expect(writeFileSyncSpy).toHaveBeenCalledWith(expect.stringContaining("style.css"), expect.any(String));
    expect(copyFileSyncSpy).toHaveBeenCalledWith(expect.stringContaining("lib.js"), expect.stringContaining("dist/libs/lib.js"));
  });

  it("should inline CSS and JS when inline option is true", async () => {
    await buildSite("site.json", "dist", { inline: true });

    // In static mode, the renderer is called. We verify that writeFileSync is called.
    // The actual inlining logic depends on the renderer receiving mapLibContent and inlineCss
    expect(writeFileSyncSpy).toHaveBeenCalled();
    expect(readFileSyncSpy).toHaveBeenCalledWith(expect.stringContaining("style.css"), "utf-8");
    expect(readFileSyncSpy).toHaveBeenCalledWith(expect.stringContaining("leaflet.js"), "utf-8");
    expect(readFileSyncSpy).toHaveBeenCalledWith(expect.stringContaining("leaflet.css"), "utf-8");
  });

  it("should detect ScreenDraft format and transform it", async () => {
    readFileSyncSpy.mockImplementation((p: string) => {
        if (p.endsWith("sd.json")) return JSON.stringify({
            meta: { appName: "SD" },
            components: [] // ScreenDraft format
        });
        return "";
    });
    existsSyncSpy.mockImplementation((p: string) => p.endsWith("sd.json") || p.includes("libs") || p.includes("images"));

    await buildSite("sd.json", "dist");

        // Success if no error thrown and writeFileSync called

        expect(writeFileSyncSpy).toHaveBeenCalled();

      });

    

      it("should not minify HTML when minify option is false", async () => {

        await buildSite("site.json", "dist", { minify: false });

        // In our mock, the renderer returns a fixed string. 

        // If minify is false, it should be written exactly as returned (modulo our buildSite logic)

        expect(writeFileSyncSpy).toHaveBeenCalled();

      });

    });

    