import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";

import { Form, FormBuilder } from "./Form.js";

describe("Form Component", () => {
  const meta = {
    buttonText: "Submit",
    version: "1.0.0",
    createdAt: "2026-01-26T10:00:00Z",
  };

  describe("Template Rendering", () => {
    it("should render a form tag and a submit button", () => {
      const html = Form(meta, ["<div>Child</div>"], {}, "form-1");
      expect(html).toContain("<form");
      expect(html).toContain('type="submit"');
      expect(html).toContain("Submit");
      expect(html).toContain("<div>Child</div>");
    });

    it("should use POST method by default", () => {
      const html = Form(meta, [], {}, "form-1");
      expect(html).toContain('method="POST"');
    });

    it("should be accessible", async () => {
      const html = Form(meta, [], {}, "form-1");
      const container = document.createElement("div");
      container.innerHTML = html;

      const results = await axe(container);
      // @ts-expect-error - vitest-axe matchers extended in setup
      expect(results).toHaveNoViolations();
    });
  });

  describe("FormBuilder", () => {
    it("should build a valid Form node", () => {
      const node = new FormBuilder("builder-test")
        .withButtonText("Send")
        .withAction("/api/contact")
        .build();

      expect(node.type).toBe("Form");
      expect(node.meta.buttonText).toBe("Send");
      expect(node.meta.action).toBe("/api/contact");
    });
  });
});
