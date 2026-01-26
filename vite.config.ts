import { defineConfig } from "vite";
import { render } from "./src/renderer.js";
import { setupRegistry } from "./src/setup.js";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Plugin pour transformer le JSON en HTML à la volée pour Vite
function jsonTransformPlugin() {
  return {
    name: "json-transform-plugin",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === "/" || req.url === "/index.html") {
          try {
            setupRegistry();
            const jsonPath = path.join(__dirname, "data/page.json");
            const pageData = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
            let html = render(pageData);

            // Injecter le script de HMR de Vite
            html = await server.transformIndexHtml(req.url, html);
            
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/html");
            res.end(html);
          } catch (e) {
            next(e);
          }
        } else {
          next();
        }
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
    outDir: "dist",
  },
});
