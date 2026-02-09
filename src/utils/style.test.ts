import { describe, expect, it } from "vitest";
import { getStyleVariables, getContrastRatio, validateContrast, autoDarkColor } from "./style.js";

describe("Style Utility", () => {
  describe("getStyleVariables", () => {
    it("should transform a style object into CSS variables", () => {
      const style = {
        "primary-color": "#ff0000",
        "font-size": 16,
      };
      const result = getStyleVariables(style);
      expect(result).toBe("--primary-color:#ff0000;--font-size:16px;");
    });

    it("should handle layout properties as direct CSS", () => {
      const style = {
        position: "absolute",
        x: 50,
        y: 100,
        width: 200,
        zIndex: 10
      };
      const result = getStyleVariables(style);
      expect(result).toContain("position:absolute;");
      expect(result).toContain("left:50px;");
      expect(result).toContain("top:100px;");
      expect(result).toContain("width:200px;");
      expect(result).toContain("z-index:10;");
    });

    it("should treat non-layout properties as tokens (CSS variables)", () => {
      const style = {
        color: "#000",
        backgroundColor: "#fff",
        "custom-token": "10px"
      };
      const result = getStyleVariables(style);
      expect(result).toContain("--color:#000;");
      expect(result).toContain("--backgroundColor:#fff;");
      expect(result).toContain("--custom-token:10px;");
    });

    it("should handle borderRadius as a layout property", () => {
        const style = { borderRadius: 8 };
        const result = getStyleVariables(style);
        expect(result).toBe("border-radius:8px;");
    });

    it("should handle dark prefix for tokens", () => {
        const style = {
          color: "#fff",
          backgroundColor: "#000"
        };
        const result = getStyleVariables(style, "dark");
        expect(result).toContain("--dark-color:#fff;");
        expect(result).toContain("--dark-backgroundColor:#000;");
    });

    it("should return an empty string for undefined style", () => {
      expect(getStyleVariables(undefined)).toBe("");
    });
  });

  describe("A11y & Colors", () => {
    it("should calculate contrast ratio correctly", () => {
      // White vs Black
      expect(getContrastRatio("#ffffff", "#000000")).toBeCloseTo(21, 0);
      // White vs White
      expect(getContrastRatio("#ffffff", "#ffffff")).toBe(1);
    });

    it("should validate and correct contrast", () => {
        // Low contrast: Grey on White
        const corrected = validateContrast("#777777", "#ffffff", "Button", "btn-1");
        expect(corrected).toBe("#111827"); // Auto-corrected to dark grey/black
        
        // Good contrast
        const ok = validateContrast("#000000", "#ffffff", "Button", "btn-2");
        expect(ok).toBe("#000000");
    });

        it("should generate auto-dark colors", () => {

            // Light background becomes dark

            expect(autoDarkColor("#ffffff", true)).not.toBe("#ffffff");

            // Dark text becomes light

            expect(autoDarkColor("#000000", false)).not.toBe("#000000");

            

            // Named colors

            expect(autoDarkColor("white", true)).toBe("#1a1a1a");

            expect(autoDarkColor("black", true)).toBe("#ffffff");

            expect(autoDarkColor("transparent")).toBe("transparent");

            

            // RGBA white background

            expect(autoDarkColor("rgba(255, 255, 255, 0.5)", true)).toContain("31, 41, 55");

    

            // Non-hex strings should be returned as-is (if not special case)

            expect(autoDarkColor("linear-gradient(red, blue)")).toBe("linear-gradient(red, blue)");

        });

    

        it("should ignore non-hex colors in validateContrast", () => {

            expect(validateContrast("var(--text)", "#fff", "T", "1")).toBe("var(--text)");

            expect(validateContrast("#000", "var(--bg)", "T", "1")).toBe("#000");

        });

      });

    });

    