import { defineConfig } from "vite";
import { render } from "./src/renderer.js";
import { setupRegistry } from "./src/setup.js";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
import { SiteNode, Node } from "./src/types.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function jsonTransformPlugin() {
  const jsonPath = path.join(__dirname, "data/site.json");

  return {
    name: "json-transform-plugin",
    buildStart() {
      this.addWatchFile(jsonPath);
    },
    configureServer(server) {
      server.watcher.add(jsonPath);
      server.watcher.on('change', (file) => {
        if (file === jsonPath) server.ws.send({ type: 'full-reload' });
      });

      server.middlewares.use(async (req, res, next) => {
        const url = req.url || "/";
        if (url === "/" || url.endsWith(".html")) {
          try {
            setupRegistry();
            const siteData: SiteNode = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
            let slug = url === "/" ? "index" : url.replace(/^\//, "").replace(".html", "");
            const page = siteData.pages.find(p => p.slug === slug);
            
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
  build: { outDir: "generated" },
});
