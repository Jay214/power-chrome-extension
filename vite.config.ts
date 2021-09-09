import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import { chromeExtension } from "vite-plugin-chrome-extension";
import styleImport from "vite-plugin-style-import";
import copy from "rollup-plugin-copy";
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        popup: resolve(__dirname, "src/popup/index.html"),
        background: resolve(__dirname, "src/background.ts"),
        "content-scripts": resolve(
          __dirname,
          "src/content-scripts/content-script.ts"
        ),
        "inject-script": resolve(__dirname, "src/content-scripts/inject-script.ts")
      },
      output: {
        entryFileNames: "[name].js",
      },
    },
  },
  // css: {
  //   preprocessorOptions: {
  //     less: {
  //       javascriptEnabled: true,
  //     },
  //   },
  // },
  plugins: [
    vue(),
    styleImport({
      libs: [
        {
          libraryName: "element-plus",
          esModule: true,
          ensureStyleFile: true,
          resolveStyle: (name) => {
            return `element-plus/lib/theme-chalk/${name}.css`;
          },
          resolveComponent: (name) => {
            return `element-plus/es/${name}`;
          },
        },
      ],
    }),
    copy({
      verbose: true,
      hook: "writeBundle",
      targets: [
        {
          src: resolve(__dirname, "src/manifest.json"),
          dest: "dist",
        },
        {
          src: resolve(__dirname, "src/rules.json"),
          dest: "dist"
        },
        {
          src: resolve(__dirname, "src/assets"),
          dest: "dist",
        },
      ],
    }),
  ],
});
