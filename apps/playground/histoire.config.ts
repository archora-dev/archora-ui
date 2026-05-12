import { defineConfig } from "histoire";
import { HstVue } from "@histoire/plugin-vue";
import { resolve } from "node:path";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [HstVue()],
  setupFile: "./src/histoire.setup.ts",
  setupCode: [
    `
export function setupVue3() {}
export function setupVanilla() {}
`
  ],
  vite: {
    plugins: [vue()],
    resolve: {
      alias: {
        "@archora/ui/styles.css": resolve(__dirname, "../../packages/ui/src/styles/index.css"),
        "@archora/ui": resolve(__dirname, "../../packages/ui/src/index.ts")
      }
    }
  },
  theme: {
    title: "Archora UI"
  }
});
