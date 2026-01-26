import { defineConfig, loadEnv } from "vite";
import { render } from "./src/renderer.js";
import { setupRegistry } from "./src/setup.js";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
import { SiteNode } from "./src/types.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

setupRegistry();

function getJsonPath(env: Record<string, string>) {
  const relativePath = env.VITE_JSON_PATH || "data/site.json";
  return path.resolve(__dirname, relativePath);
}

function getSiteData(jsonPath: string): SiteNode {
  if (!fs.existsSync(jsonPath)) {
    throw new Error(`JSON file not found at: ${jsonPath}`);
  }
  return JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
}

function jsonTransformPlugin(jsonPath: string) {
  return {
    name: "json-transform-plugin",
    configureServer(server) {
      server.watcher.add(jsonPath);
      server.watcher.on("change", (file) => {
        if (path.resolve(file) === path.resolve(jsonPath)) {
          server.ws.send({ type: "full-reload" });
        }
      });

      server.middlewares.use(async (req, res, next) => {
        const url = req.url || "/";
        if (url === "/" || url.endsWith(".html")) {
          try {
            const siteData = getSiteData(jsonPath);
            let slug = url === "/" ? "index" : url.replace(/^\//, "").replace(".html", "");
            const page = siteData.pages.find((p) => p.slug === slug);

            if (page) {
              page.content.meta = page.content.meta || {};
              page.content.meta.appName = siteData.meta.appName;
              page.content.style = { ...siteData.style, ...page.content.style };

              if (siteData.layout?.header) page.content.meta.renderedHeader = render(siteData.layout.header);
              if (siteData.layout?.footer) page.content.meta.renderedFooter = render(siteData.layout.footer);

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

export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const jsonPath = getJsonPath(env);
  
  let rollupInput = {};
  if (command === "build") {
    try {
      const siteData = getSiteData(jsonPath);
      rollupInput = siteData.pages.reduce((acc, page) => {
        const content = { ...page.content };
        content.meta = { ...content.meta, appName: siteData.meta.appName };
        content.style = { ...siteData.style, ...content.style };
        if (siteData.layout?.header) content.meta.renderedHeader = render(siteData.layout.header);
        if (siteData.layout?.footer) content.meta.renderedFooter = render(siteData.layout.footer);

        const html = render(content);
        const fullPath = path.resolve(__dirname, `${page.slug}.html`);
        fs.writeFileSync(fullPath, html);
        
        acc[page.slug] = fullPath;
        return acc;
      }, {} as Record<string, string>);
    } catch (e) {
      rollupInput = { main: path.resolve(__dirname, "index.html") };
    }
  }

  return {
    plugins: [jsonTransformPlugin(jsonPath)],
    server: { watch: { usePolling: true } },
    build: {
      outDir: "generated",
      emptyOutDir: true,
      rollupOptions: { input: rollupInput },
    },
  };
});