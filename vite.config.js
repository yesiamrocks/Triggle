// vite.config.js
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/triggle.js"),
      name: "Triggle",
      fileName: () => "triggle.js",
      formats: ["umd"],
    },
    outDir: "dist",
    minify: false,
    sourcemap: true,
    emptyOutDir: false, // don't delete previous output (for second build)
  },
});
