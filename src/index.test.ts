/**
 * @vitest-environment node
 */
import { describe, it, expect } from "vitest";
import { buildSite } from "./index.js";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe("Integration - Multi-Page Library Build", () => {
  it("should generate multiple HTML files in the output directory", async () => {
    const testJsonPath = path.join(__dirname, "../data/site.json");
    const testOutputDir = path.join(__dirname, "../test-multi-site");
    
    await buildSite(testJsonPath, testOutputDir);
    
    expect(fs.existsSync(testOutputDir)).toBe(true);
    expect(fs.existsSync(path.join(testOutputDir, "index.html"))).toBe(true);
    expect(fs.existsSync(path.join(testOutputDir, "contact.html"))).toBe(true);
    expect(fs.existsSync(path.join(testOutputDir, "layouts.html"))).toBe(true);
    expect(fs.existsSync(path.join(testOutputDir, "canvas.html"))).toBe(true);
    
    // Cleanup
    fs.rmSync(testOutputDir, { recursive: true, force: true });
  });
});
