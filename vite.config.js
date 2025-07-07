import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/triggle.js"),
      name: "Triggle",
      formats: ["umd"],
    },
    outDir: "dist",
    rollupOptions: {
      output: [
        {
          entryFileNames: "triggle.js",
          format: "umd",
          name: "Triggle",
          exports: "named",
          sourcemap: true,
        },
        {
          entryFileNames: "triggle.min.js",
          format: "umd",
          name: "Triggle",
          exports: "named",
          sourcemap: true,
          plugins: [
            // Built-in terser plugin to minify
            require("rollup-plugin-terser").terser(),
          ],
        },
      ],
    },
    minify: false, // disable default Vite minification, we’re handling it manually
  },
});
