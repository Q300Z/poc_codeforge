import { describe, expect, it } from "vitest";

import { validateSiteSchema } from "./validator.zod.js";

describe("Zod Schema Validator", () => {
  it("should validate a correct site structure", () => {
    const validData = {
      meta: { appName: "My App" },
      pages: [
        {
          slug: "index",
          content: { id: "root", type: "Box", children: [] },
        },
      ],
    };
    expect(() => validateSiteSchema(validData)).not.toThrow();
  });

  it("should throw error if appName is missing", () => {
    const invalidData = {
      meta: {},
      pages: [{ slug: "index", content: { id: "1", type: "Box" } }],
    };
    expect(() => validateSiteSchema(invalidData)).toThrow("meta.appName");
  });

  it("should throw error if no pages are provided", () => {
    const invalidData = {
      meta: { appName: "Test" },
      pages: [],
    };
    expect(() => validateSiteSchema(invalidData)).toThrow("Au moins une page est requise");
  });

  it("should throw error if a node id is missing", () => {
    const invalidData = {
      meta: { appName: "Test" },
      pages: [
        {
          slug: "index",
          content: { type: "Box" }, // Missing ID
        },
      ],
    };
    expect(() => validateSiteSchema(invalidData)).toThrow("content.id");
  });
});
