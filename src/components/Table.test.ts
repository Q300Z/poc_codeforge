import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";

import { Table } from "./Table.js";

describe("Table Component", () => {
  const meta = {
    headers: ["Nom", "Âge"],
    rows: [
      ["Alice", "25"],
      ["Bob", "30"],
    ],
    caption: "Liste des utilisateurs",
  };

  it("should render a table with headers and rows", () => {
    const html = Table(meta, [], {}, "table-1");
    expect(html).toContain("<table");
    expect(html).toContain("<caption>Liste des utilisateurs</caption>");
    expect(html).toContain('<th scope="col" class="table-header-cell">Nom</th>');
    expect(html).toContain('<td class="table-cell">Alice</td>');
  });

  it("should be accessible", async () => {
    const html = Table(meta, [], {}, "table-1");
    const container = document.createElement("main");
    container.innerHTML = html;

    const results = await axe(container);
    // @ts-expect-error - vitest-axe matchers extended in setup
    expect(results).toHaveNoViolations();
  });

  it("should apply custom CSS variables", () => {
    const style = { "table-header-bg": "#f0f0f0" };
    const html = Table(meta, [], style, "table-1");
    expect(html).toContain("--table-header-bg:#f0f0f0");
  });
});
