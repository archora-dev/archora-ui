import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";
import "@archora/ui/styles.css";
import "./sandbox.css";
import ComponentSandbox from "./components/ComponentSandbox.vue";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component("ComponentSandbox", ComponentSandbox);
  }
} satisfies Theme;
