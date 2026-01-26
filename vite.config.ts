import { defineConfig } from "vite";
import { render } from "./src/renderer.js";
import { setupRegistry } from "./src/setup.js";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
import { SiteNode } from "./src/types.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Plugin pour transformer le JSON en HTML pour Vite (Dev & Build)
function jsonTransformPlugin() {
  const jsonPath = path.join(__dirname, "data/site.json");

  return {
    name: "json-transform-plugin",
    
    // Ajoute le fichier JSON à la liste des fichiers surveillés par Vite
    buildStart() {
      this.addWatchFile(jsonPath);
    },

    // Pour le mode DEV : rendu à la volée avec support multi-page
    configureServer(server) {
      // Forcer le rechargement si le JSON change
      server.watcher.add(jsonPath);
      server.watcher.on('change', (file) => {
        if (file === jsonPath) {
          server.ws.send({ type: 'full-reload' });
        }
      });

      server.middlewares.use(async (req, res, next) => {
        const url = req.url || "/";
        const isHtmlRequest = url === "/" || url.endsWith(".html");

        if (isHtmlRequest) {
          try {
            setupRegistry();
            const siteData: SiteNode = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
            
            // Extraire le slug (ex: "/contact.html" -> "contact")
            let slug = url === "/" ? "index" : url.replace(/^\//, "").replace(".html", "");
            
            const page = siteData.pages.find(p => p.slug === slug);
            
            if (page) {
              // Fusion des metas et styles globaux
              page.content.meta.appName = siteData.meta.appName;
              page.content.style = { ...siteData.style, ...page.content.style };

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
  server: {
    watch: {
      usePolling: true,
    },
  },
  build: {
    outDir: "generated",
  },
});
