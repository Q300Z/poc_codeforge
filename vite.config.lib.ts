import { defineConfig } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import dts from "vite-plugin-dts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  build: {
    lib: {
      entry: {
        index: path.resolve(__dirname, "src/index.ts"),
        cli: path.resolve(__dirname, "src/cli.ts"),
        "adapter-screendraft": path.resolve(__dirname, "src/adapter/screendraft.ts"),
      },
      formats: ["es"],
      fileName: (format, entryName) => `${entryName}.js`,
    },
    rollupOptions: {
      external: ["fs", "path", "url", "vite"],
    },
    outDir: "dist",
    emptyOutDir: true,
  },
  plugins: [
    dts({ 
      rollupTypes: false,
      include: ["src/**/*.ts"],
      exclude: ["src/**/*.test.ts"]
    })
  ],
});
