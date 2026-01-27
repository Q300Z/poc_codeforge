import { describe, expect, it } from "vitest";

import { Video } from "./Video.js";

describe("Video Component", () => {
  const meta = {
    src: "test.mp4",
    version: "1.0.0",
    createdAt: new Date().toISOString(),
  };

  it("should render <video> with src and default controls", () => {
    const html = Video(meta, [], {}, "vid-1");
    expect(html).toContain('src="test.mp4"');
    expect(html).toContain("controls");
  });

  it("should handle autoplay and muted options", () => {
    const html = Video({ ...meta, autoplay: true, muted: true }, [], {}, "vid-1");
    expect(html).toContain("autoplay");
    expect(html).toContain("muted");
  });

  it("should handle playsinline and preload", () => {
    const html = Video({ ...meta, playsinline: true, preload: "none" }, [], {}, "vid-mobile");
    expect(html).toContain("playsinline");
    expect(html).toContain('preload="none"');
  });

  it("should render explicit width and height", () => {
    const html = Video({ ...meta, width: 1920, height: 1080 }, [], {}, "vid-size");
    expect(html).toContain('width="1920"');
    expect(html).toContain('height="1080"');
  });

  it("should apply object-fit style", () => {
    const html = Video(meta, [], { "object-fit": "contain" }, "vid-fit");
    expect(html).toContain("object-fit: contain");
  });
});
