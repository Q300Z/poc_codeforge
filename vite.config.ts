import { defineConfig } from "vite";
import { render } from "./src/renderer.js";
import { setupRegistry } from "./src/setup.js";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
import { SiteNode } from "./src/types.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// On s'assure que les composants sont prêts
setupRegistry();

const jsonPath = path.join(__dirname, "data/site.json");
const siteData: SiteNode = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

// En mode build, on doit générer les fichiers physiques AVANT que Vite/Rollup ne commence
// car Rollup a besoin de trouver les fichiers d'entrée listés dans input.
if (process.argv.includes("build")) {
  siteData.pages.forEach((page) => {
    page.content.meta = page.content.meta || {};
    page.content.meta.appName = siteData.meta.appName;
    page.content.style = { ...siteData.style, ...page.content.style };

    if (siteData.layout?.header) {
      page.content.meta.renderedHeader = render(siteData.layout.header);
    }
    if (siteData.layout?.footer) {
      page.content.meta.renderedFooter = render(siteData.layout.footer);
    }

    const html = render(page.content);
    fs.writeFileSync(path.join(__dirname, `${page.slug}.html`), html);
  });
}

function jsonTransformPlugin() {
  return {
    name: "json-transform-plugin",
    configureServer(server) {
      server.watcher.add(jsonPath);
      server.watcher.on("change", (file) => {
        if (file === jsonPath) server.ws.send({ type: "full-reload" });
      });

      server.middlewares.use(async (req, res, next) => {
        const url = req.url || "/";
        if (url === "/" || url.endsWith(".html")) {
          try {
            let slug = url === "/" ? "index" : url.replace(/^\//, "").replace(".html", "");
            const page = siteData.pages.find((p) => p.slug === slug);

            if (page) {
              page.content.meta = page.content.meta || {};
              page.content.meta.appName = siteData.meta.appName;
              page.content.style = { ...siteData.style, ...page.content.style };

              if (siteData.layout?.header) {
                page.content.meta.renderedHeader = render(siteData.layout.header);
              }
              if (siteData.layout?.footer) {
                page.content.meta.renderedFooter = render(siteData.layout.footer);
              }

              let html = render(page.content);
              html = await server.transformIndexHtml(url, html);
              res.statusCode = 200;
              res.setHeader("Content-Type", "text/html");
              res.end(html);
              return;
            }
          } catch (e) {
            next(e);
            return;
          }
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [jsonTransformPlugin()],
  server: { watch: { usePolling: true } },
  build: {
    outDir: "generated",
    emptyOutDir: true,
    rollupOptions: {
      input: siteData.pages.reduce((acc, page) => {
        acc[page.slug] = path.resolve(__dirname, `${page.slug}.html`);
        return acc;
      }, {} as Record<string, string>),
    },
  },
});
