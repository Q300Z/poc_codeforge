import { describe, expect, it } from "vitest";
import { Video } from "./Video.js";

describe("Video Component", () => {
  const meta = { 
    src: "test.mp4",
    version: "1.0.0",
    createdAt: new Date().toISOString()
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
});
