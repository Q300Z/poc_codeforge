import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { runCli } from "./cli.js";
import * as index from "./index.js";
import fs from "fs";

// Mocks
vi.mock("./index.js", () => ({
  buildSite: vi.fn(),
}));
vi.mock("fs");

describe("CLI", () => {
  let consoleLogSpy: any;
  let consoleErrorSpy: any;

  beforeEach(() => {
    consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should print help when -h is passed", async () => {
    await runCli(["-h"]);
    expect(consoleLogSpy).toHaveBeenCalled();
    expect(consoleLogSpy.mock.calls[0][0]).toContain("CodeForge CLI");
  });

  it("should throw error and print help when no args passed", async () => {
    await expect(runCli([])).rejects.toThrow("Missing arguments");
    expect(consoleLogSpy).toHaveBeenCalled();
  });

  it("should run buildSite with correct arguments", async () => {
    await runCli(["data.json", "output"]);
    expect(index.buildSite).toHaveBeenCalledWith("data.json", "output", { inline: false, minify: true });
  });

  it("should handle --inline flag", async () => {
    await runCli(["data.json", "--inline"]);
    expect(index.buildSite).toHaveBeenCalledWith("data.json", "dist-static", { inline: true, minify: true });
  });

  it("should handle -i flag", async () => {
    await runCli(["data.json", "-i"]);
    expect(index.buildSite).toHaveBeenCalledWith("data.json", "dist-static", { inline: true, minify: true });
  });

  it("should use default output directory if not provided", async () => {
    await runCli(["data.json"]);
    expect(index.buildSite).toHaveBeenCalledWith("data.json", "dist-static", { inline: false, minify: true });
  });

  it("should handle watch mode", async () => {
    vi.spyOn(fs, "existsSync").mockReturnValue(true);
    vi.spyOn(fs, "watch").mockImplementation(() => ({ close: vi.fn() } as any));

    await runCli(["data.json", "-w"]);
    
    expect(index.buildSite).toHaveBeenCalled();
    expect(fs.watch).toHaveBeenCalled();
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining("Mode Watch activé"));
  });

  it("should fail watch mode if file does not exist", async () => {
    vi.spyOn(fs, "existsSync").mockReturnValue(false);
    const exitSpy = vi.spyOn(process, "exit").mockImplementation((code) => { throw new Error(`Exit ${code}`); });

    await expect(runCli(["data.json", "-w"])).rejects.toThrow("Exit 1");
    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining("Impossible de surveiller"));
    exitSpy.mockRestore();
  });

  it("should log error if build fails", async () => {
    vi.mocked(index.buildSite).mockRejectedValueOnce(new Error("Build Error"));
    await runCli(["data.json"]);
    expect(consoleErrorSpy).toHaveBeenCalledWith("❌ Build failed:", "Build Error");
  });
});