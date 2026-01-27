import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { buildSite } from "./index.js";
import fs from "fs";
import path from "path";
import { build as viteBuild } from "vite";

// Mock dependencies
vi.mock("vite", () => ({
  build: vi.fn(),
}));
vi.mock("./setup.js", () => ({
  setupRegistry: vi.fn(),
}));
vi.mock("./renderer.js", () => ({
  render: vi.fn(() => '<html><head><link rel="stylesheet" href="./assets/style.css"></head><body></body></html>'),
}));

describe("buildSite", () => {
  let existsSyncSpy: any;
  let readFileSyncSpy: any;
  let writeFileSyncSpy: any;
  let mkdirSyncSpy: any;
  let rmSyncSpy: any;
  let readdirSyncSpy: any;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(process, "cwd").mockReturnValue("/test");
    vi.spyOn(path, "resolve").mockImplementation((...args) => args.join("/").replace("//", "/"));
    
    // Spying on fs methods
    existsSyncSpy = vi.spyOn(fs, "existsSync");
    readFileSyncSpy = vi.spyOn(fs, "readFileSync");
    writeFileSyncSpy = vi.spyOn(fs, "writeFileSync").mockImplementation(() => {});
    mkdirSyncSpy = vi.spyOn(fs, "mkdirSync").mockImplementation(() => undefined);
    rmSyncSpy = vi.spyOn(fs, "rmSync").mockImplementation(() => {});
    readdirSyncSpy = vi.spyOn(fs, "readdirSync");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should throw if JSON file does not exist", async () => {
    existsSyncSpy.mockReturnValue(false);
    await expect(buildSite("missing.json")).rejects.toThrow("JSON file not found");
  });

  it("should parse CodeForge JSON and run Vite build", async () => {
    existsSyncSpy.mockReturnValue(true);
    readFileSyncSpy.mockReturnValue(JSON.stringify({
      meta: { appName: "Test" },
      style: {},
      pages: [{ slug: "index", content: {} }]
    }));

    await buildSite("site.json", "dist");

    expect(readFileSyncSpy).toHaveBeenCalled();
    expect(writeFileSyncSpy).toHaveBeenCalled(); // Writes html
    expect(viteBuild).toHaveBeenCalled();
  });

  it("should inline CSS when inlineCss option is true", async () => {
    const htmlContent = '<html><head><link rel="stylesheet" href="./assets/style.css"></head><body></body></html>';
    const cssContent = '.body { color: red; }';

    existsSyncSpy.mockReturnValue(true);
    // Mock sequence of reads: site.json -> style.css -> index.html
    readFileSyncSpy.mockImplementation((p: string) => {
        if (p.endsWith("site.json")) return JSON.stringify({
            meta: { appName: "Test" },
            style: {},
            pages: [{ slug: "index", content: {} }]
        });
        if (p.endsWith(".css")) return cssContent;
        if (p.endsWith(".html")) return htmlContent;
        return "";
    });
    
    readdirSyncSpy.mockReturnValue(["style.css"]);

    await buildSite("site.json", "dist", { inlineCss: true });

    // Verify index.html was written with inlined styles
    expect(writeFileSyncSpy).toHaveBeenCalledWith(
        expect.stringContaining("index.html"),
        expect.stringContaining(`<style>${cssContent}</style>`)
    );
    expect(writeFileSyncSpy).toHaveBeenCalledWith(
        expect.stringContaining("index.html"),
        expect.not.stringContaining('<link')
    );
    expect(rmSyncSpy).toHaveBeenCalledWith(expect.stringContaining("assets"), expect.anything());
  });

  it("should detect ScreenDraft format and transform it", async () => {
    existsSyncSpy.mockReturnValue(true);
    readFileSyncSpy.mockReturnValue(JSON.stringify({
      meta: { appName: "SD" },
      components: [] // ScreenDraft format
    }));

    // Spy on console to check detection message
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    await buildSite("sd.json", "dist");

    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("Format ScreenDraft détecté"));
    expect(viteBuild).toHaveBeenCalled();
  });

  it("should clean up temp files", async () => {
    existsSyncSpy.mockReturnValue(true);
    readFileSyncSpy.mockReturnValue(JSON.stringify({
      meta: { appName: "Test" },
      style: {},
      pages: [{ slug: "cleanup", content: {} }]
    }));

    await buildSite("site.json");

    expect(rmSyncSpy).toHaveBeenCalledWith(expect.stringContaining(".codeforge_tmp"), { recursive: true, force: true });
  });
});
