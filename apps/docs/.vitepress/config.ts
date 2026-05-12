import { resolve } from "node:path";
import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Archora UI",
  description: "Dark-first Vue 3 component system for polished developer tools.",
  vite: {
    resolve: {
      alias: {
        "@archora/ui/styles.css": resolve(__dirname, "../../../packages/ui/src/styles/index.css"),
        "@archora/ui": resolve(__dirname, "../../../packages/ui/src/index.ts")
      }
    }
  },
  themeConfig: {
    nav: [
      { text: "Guide", link: "/guide/" },
      { text: "Demo", link: "/guide/demo" },
      { text: "Components", link: "/components/" },
      { text: "Roadmap", link: "/guide/roadmap" }
    ],
    sidebar: [
      {
        text: "Guide",
        items: [
          { text: "Introduction", link: "/guide/" },
          { text: "Installation", link: "/guide/installation" },
          { text: "Quick Start", link: "/guide/quick-start" },
          { text: "Dashboard Demo", link: "/guide/demo" },
          { text: "Theming", link: "/guide/theming" },
          { text: "Design Tokens", link: "/guide/tokens" },
          { text: "Accessibility", link: "/guide/accessibility" },
          { text: "Roadmap", link: "/guide/roadmap" }
        ]
      },
      {
        text: "Components",
        items: [
          { text: "Overview", link: "/components/" },
          { text: "Alert", link: "/components/alert" },
          { text: "Badge", link: "/components/badge" },
          { text: "Button", link: "/components/button" },
          { text: "Card", link: "/components/card" },
          { text: "Checkbox", link: "/components/checkbox" },
          { text: "Combobox", link: "/components/combobox" },
          { text: "Command", link: "/components/command" },
          { text: "Data Table", link: "/components/data-table" },
          { text: "Date Picker", link: "/components/date-picker" },
          { text: "Dialog", link: "/components/dialog" },
          { text: "Dropdown", link: "/components/dropdown" },
          { text: "Form Field", link: "/components/form-field" },
          { text: "Input", link: "/components/input" },
          { text: "Select", link: "/components/select" },
          { text: "Switch", link: "/components/switch" },
          { text: "Table", link: "/components/table" },
          { text: "Tabs", link: "/components/tabs" },
          { text: "Textarea", link: "/components/textarea" },
          { text: "Tooltip", link: "/components/tooltip" },
          { text: "Toast", link: "/components/toast" }
        ]
      }
    ]
  }
});
