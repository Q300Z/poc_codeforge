import { describe, expect, it } from "vitest";

import { minifyHTML } from "./html.js";

describe("HTML Utilities - minifyHTML", () => {
  it("should remove spaces between tags", () => {
    const input = "<div>  <span>Hello</span>   </div>";
    expect(minifyHTML(input)).toBe("<div><span>Hello</span></div>");
  });

  it("collapses multiple spaces into one", () => {
    const input = "<div>Some    content   here</div>";
    expect(minifyHTML(input)).toBe("<div>Some content here</div>");
  });

  it("removes standard HTML comments but keeps conditional ones", () => {
    const input = "<div><!-- Standard comment --><!--[if IE]>Conditional<![endif]--></div>";
    expect(minifyHTML(input)).toBe("<div><!--[if IE]>Conditional<![endif]--></div>");
  });

  it("preserves script tag content", () => {
    const input = `<div><script>
// test
console.log("Hello   World");
</script></div>`;
    const minified = minifyHTML(input);
    expect(minified).toBe(`<div><script>
// test
console.log("Hello   World");
</script></div>`);
  });

  it("preserves style tag content", () => {
    const input = `<style>
  body { color: red; }
</style>`;
    const minified = minifyHTML(input);
    expect(minified).toBe(`<style>
  body { color: red; }
</style>`);
  });

  it("handles mixed content correctly", () => {
    const input = `
      <div class="test">
        <h1>  Title  </h1>
        <p>Text with   spaces</p>
        <style>.red { color: red; }</style>
        <script>alert(1);</script>
      </div>
    `;
    const minified = minifyHTML(input);
    expect(minified).toBe(
      '<div class="test"><h1> Title </h1><p>Text with spaces</p><style>.red { color: red; }</style><script>alert(1);</script></div>'
    );
  });

  it("works correctly without script or style tags", () => {
    const input = "<div>  Hello  </div>";

    expect(minifyHTML(input)).toBe("<div> Hello </div>");
  });

  it("works with only script tags", () => {
    const input = "<script> console.log('test') </script>";

    expect(minifyHTML(input)).toBe("<script> console.log('test') </script>");
  });
});
