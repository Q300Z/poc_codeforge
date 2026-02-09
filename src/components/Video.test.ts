import { describe, expect, it } from "vitest";

import { Video, VideoBuilder } from "./Video.js";

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

  it("should handle missing src", () => {
    // @ts-expect-error - testing missing src
    const html = Video({ label: "no-src" }, [], {}, "v1");
    expect(html).toContain("<!-- Vidéo manquante -->");
  });

  it("should handle disabled controls", () => {
    const html = Video({ ...meta, controls: false }, [], {}, "v1");
    expect(html).not.toContain("controls");
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

  it("should render tracks", () => {
    const html = Video(
      {
        ...meta,
        tracks: [
          { src: "sub.vtt", kind: "subtitles", srclang: "en", label: "English", default: true },
        ],
      },
      [],
      {},
      "vid-tracks"
    );
    expect(html).toContain(
      '<track kind="subtitles" src="sub.vtt" srclang="en" label="English" default />'
    );
  });

  describe("VideoBuilder", () => {
    it("should build a valid Video node", () => {
      const node = new VideoBuilder("vid-1")
        .withSrc("movie.mp4")
        .withPoster("thumb.jpg")
        .withDimensions(800, 600)
        .addTrack({ src: "fr.vtt", srclang: "fr" })
        .withOptions({ autoplay: true, loop: true })
        .build();

      expect(node.type).toBe("Video");
      expect(node.meta.src).toBe("movie.mp4");
      expect(node.meta.poster).toBe("thumb.jpg");
      expect(node.meta.width).toBe(800);
      expect(node.meta.height).toBe(600);
      expect(node.meta.tracks).toHaveLength(1);
      expect(node.meta.autoplay).toBe(true);
      expect(node.meta.loop).toBe(true);
    });
  });
});
