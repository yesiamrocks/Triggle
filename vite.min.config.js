// vite.min.config.js
import { defineConfig } from "vite";
import path from "path";
import terser from "@rollup/plugin-terser";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/triggle.js"),
      name: "Triggle",
      fileName: () => "triggle.min.js",
      formats: ["umd"],
    },
    outDir: "dist",
    sourcemap: true,
    emptyOutDir: false,
    rollupOptions: {
      plugins: [terser()],
    },
  },
});
