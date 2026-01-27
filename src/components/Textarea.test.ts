import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";

import { Textarea } from "./Textarea.js";

describe("Textarea Component", () => {
  const meta = {
    label: "Message",
    name: "message",
    placeholder: "Votre message ici...",
    rows: 5,
  };

  it("should render a textarea with label and attributes", () => {
    const html = Textarea(meta, [], {}, "textarea-1");
    expect(html).toContain("<label");
    expect(html).toContain("Message");
    expect(html).toContain("<textarea");
    expect(html).toContain('name="message"');
    expect(html).toContain('rows="5"');
    expect(html).toContain('placeholder="Votre message ici..."');
  });

  it("should render with a default value", () => {
    const html = Textarea({ ...meta, value: "Hello World" }, [], {}, "textarea-1");
    expect(html).toContain("Hello World");
  });

  it("should be accessible", async () => {
    const html = Textarea(meta, [], {}, "textarea-1");
    const container = document.createElement("main");
    container.innerHTML = html;

    const results = await axe(container);
    // @ts-expect-error - vitest-axe matchers extended in setup
    expect(results).toHaveNoViolations();
  });

  it("should link label and textarea via ID", () => {
    const html = Textarea(meta, [], {}, "textarea-1");
    const labelMatch = html.match(/for="(textarea-1-textarea)"/);
    const textareaMatch = html.match(/id="(textarea-1-textarea)"/);

    expect(labelMatch).not.toBeNull();
    expect(textareaMatch).not.toBeNull();
    expect(labelMatch![1]).toBe(textareaMatch![1]);
  });
});
