import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";

import { FormField, FormFieldBuilder } from "./FormField.js";

describe("FormField Component", () => {
  const meta = {
    label: "Email",
    type: "email" as const,
    placeholder: "test@example.com",
    version: "1.0.0",
    createdAt: "2026-01-26T10:00:00Z",
  };

  describe("Template Rendering", () => {
    it("should render a label and an input", () => {
      const html = FormField(meta, [], {}, "field-1");
      expect(html).toContain('<label for="input-field-1"');
      expect(html).toContain('type="email"');
      expect(html).toContain('placeholder="test@example.com"');
    });

    it("should render a textarea if type is textarea", () => {
      const html = FormField({ ...meta, type: "textarea" }, [], {}, "field-1");
      expect(html).toContain("<textarea");
    });

    it("should show required asterisk if required", () => {
      const html = FormField({ ...meta, required: true }, [], {}, "field-1");
      expect(html).toContain("*</span>");
      expect(html).toContain("required");
    });

    it("should be accessible", async () => {
      const html = FormField({ ...meta, ariaRole: "region" }, [], {}, "field-1");
      const container = document.createElement("div");
      container.innerHTML = html;

      const results = await axe(container);
      // @ts-expect-error - vitest-axe matchers extended in setup
      expect(results).toHaveNoViolations();
    });
  });

  describe("FormFieldBuilder", () => {
    it("should build a valid FormField node", () => {
      const node = new FormFieldBuilder("builder-test")
        .withLabel("Name")
        .withType("text")
        .withPlaceholder("Enter name")
        .withRequired(true)
        .build();

      expect(node.type).toBe("FormField");
      expect(node.meta.label).toBe("Name");
      expect(node.meta.type).toBe("text");
      expect(node.meta.required).toBe(true);
    });
  });
});
