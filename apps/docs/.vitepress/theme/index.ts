import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";
import { useData } from "vitepress";
import { watch } from "vue";
import "@archora/ui/styles.css";
import "./sandbox.css";
import ComponentSandbox from "./components/ComponentSandbox.vue";
import DashboardShowcase from "./components/DashboardShowcase.vue";
import ThemeGenerator from "./components/ThemeGenerator.vue";

export default {
  extends: DefaultTheme,
  setup() {
    // Тумблер VitePress переключает класс html.dark, а контракт темы archora
    // завязан на [data-theme]. Без этого моста компоненты в светлом режиме
    // остаются на тёмном дефолте arch-base.
    if (typeof document === "undefined") {
      return;
    }

    const { isDark } = useData();
    watch(
      isDark,
      (dark) => {
        document.documentElement.dataset.theme = dark ? "dark" : "light";
      },
      { immediate: true }
    );
  },
  enhanceApp({ app }) {
    app.component("ComponentSandbox", ComponentSandbox);
    app.component("DashboardShowcase", DashboardShowcase);
    app.component("ThemeGenerator", ThemeGenerator);
  }
} satisfies Theme;
