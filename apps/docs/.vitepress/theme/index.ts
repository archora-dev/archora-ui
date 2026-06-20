import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";
import "@archora/ui/styles.css";
import "./sandbox.css";
import ComponentSandbox from "./components/ComponentSandbox.vue";
import ThemeGenerator from "./components/ThemeGenerator.vue";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component("ComponentSandbox", ComponentSandbox);
    app.component("ThemeGenerator", ThemeGenerator);
  }
} satisfies Theme;
