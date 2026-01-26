import { defineConfig } from "vite";
import { render } from "./src/renderer.js";
import { setupRegistry } from "./src/setup.js";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
import { SiteNode } from "./src/types.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper pour charger les données sans polluer le scope global
function getSiteData(): SiteNode {
  const jsonPath = path.join(__dirname, "data/site.json");
  return JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
}

function jsonTransformPlugin() {
  const jsonPath = path.join(__dirname, "data/site.json");

  return {
    name: "json-transform-plugin",
    
    buildStart() {
      this.addWatchFile(jsonPath);
      
      // En mode build, on génère les fichiers physiques
      if (process.argv.includes("build")) {
        setupRegistry();
        const siteData = getSiteData();
        siteData.pages.forEach((page) => {
          const content = { ...page.content };
          content.meta = { ...content.meta, appName: siteData.meta.appName };
          content.style = { ...siteData.style, ...content.style };

          if (siteData.layout?.header) {
            content.meta.renderedHeader = render(siteData.layout.header);
          }
          if (siteData.layout?.footer) {
            content.meta.renderedFooter = render(siteData.layout.footer);
          }

          const html = render(content);
          fs.writeFileSync(path.join(__dirname, `${page.slug}.html`), html);
        });
      }
    },

    configureServer(server) {
      server.watcher.add(jsonPath);
      server.watcher.on("change", (file) => {
        if (file === jsonPath) server.ws.send({ type: "full-reload" });
      });

      server.middlewares.use(async (req, res, next) => {
        const url = req.url || "/";
        if (url === "/" || url.endsWith(".html")) {
          try {
            setupRegistry();
            const siteData = getSiteData();
            let slug = url === "/" ? "index" : url.replace(/^\//, "").replace(".html", "");
            const page = siteData.pages.find((p) => p.slug === slug);

            if (page) {
              const content = { ...page.content };
              content.meta = { ...content.meta, appName: siteData.meta.appName };
              content.style = { ...siteData.style, ...content.style };

              if (siteData.layout?.header) {
                content.meta.renderedHeader = render(siteData.layout.header);
              }
              if (siteData.layout?.footer) {
                content.meta.renderedFooter = render(siteData.layout.footer);
              }

              let html = render(content);
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

export default defineConfig(({ command }) => {
  const isBuild = command === 'build';
  let rollupInput = {};

  if (isBuild) {
    try {
      const siteData = getSiteData();
      rollupInput = siteData.pages.reduce((acc, page) => {
        acc[page.slug] = path.resolve(__dirname, `${page.slug}.html`);
        return acc;
      }, {} as Record<string, string>);
    } catch (e) {
      // Fallback si le JSON est corrompu pendant le build
      rollupInput = { main: path.resolve(__dirname, "index.html") };
    }
  }

  return {
    plugins: [jsonTransformPlugin()],
    server: { watch: { usePolling: true } },
    build: {
      outDir: "generated",
      emptyOutDir: true,
      rollupOptions: {
        input: rollupInput,
      },
    },
  };
});