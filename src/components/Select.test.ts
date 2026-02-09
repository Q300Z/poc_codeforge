import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";

import { Select, SelectBuilder } from "./Select.js";

describe("Select Component", () => {
  const meta = {
    label: "Pays",
    name: "country",
    options: [
      { label: "France", value: "fr" },
      { label: "Belgique", value: "be" },
    ],
    placeholder: "Choisissez un pays",
  };

  it("should render a select with options and label", () => {
    const html = Select(meta, [], {}, "select-1");
    expect(html).toContain("<label");
    expect(html).toContain("Pays");
    expect(html).toContain("<select");
    expect(html).toContain('name="country"');
    expect(html).toContain('<option value="fr">France</option>');
    expect(html).toContain("Choisissez un pays");
  });

  it("should mark the correct option as selected", () => {
    const html = Select({ ...meta, value: "be" }, [], {}, "select-1");
    expect(html).toContain('<option value="be" selected>Belgique</option>');
  });

  it("should handle placeholder when value is present", () => {
    const html = Select({ ...meta, value: "fr" }, [], {}, "select-1");
    expect(html).toContain('<option value="" disabled >Choisissez un pays</option>');
  });

  it("should handle missing options", () => {
    // @ts-expect-error - testing missing options
    const html = Select({ label: "L", name: "n" }, [], {}, "s1");
    expect(html).toContain("<select");
    expect(html).not.toContain("<option");
  });

  it("should be accessible", async () => {
    const html = Select(meta, [], {}, "select-1");
    const container = document.createElement("main");
    container.innerHTML = html;

    const results = await axe(container);
    // @ts-expect-error - vitest-axe matchers extended in setup
    expect(results).toHaveNoViolations();
  });

  it("should link label and select via ID", () => {
    const html = Select(meta, [], {}, "select-1");
    const labelMatch = html.match(/for="(select-1-select)"/);
    const selectMatch = html.match(/id="(select-1-select)"/);

    expect(labelMatch).not.toBeNull();
    expect(selectMatch).not.toBeNull();
    expect(labelMatch![1]).toBe(selectMatch![1]);
  });

  describe("SelectBuilder", () => {
    it("should build a valid Select node", () => {
      const node = new SelectBuilder("sel-1")
        .withLabel("Choice")
        .withName("choice")
        .addOption("Opt 1", "1")
        .addOption("Opt 2", "2")
        .withValue("2")
        .build();

      expect(node.type).toBe("Select");
      expect(node.meta.label).toBe("Choice");
      expect(node.meta.name).toBe("choice");
      expect(node.meta.options).toHaveLength(2);
      expect(node.meta.value).toBe("2");
    });

    it("should build with bulk options", () => {
      const node = new SelectBuilder("sel-2").withOptions([{ label: "A", value: "a" }]).build();
      expect(node.meta.options).toHaveLength(1);
    });
  });
});
