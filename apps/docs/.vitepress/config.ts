import { resolve } from "node:path";
import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Archora UI",
  description: "An organic flow design system for Vue 3.",
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
          { text: "Accordion", link: "/components/accordion" },
          { text: "Alert", link: "/components/alert" },
          { text: "Alert Dialog", link: "/components/alert-dialog" },
          { text: "Active Filters", link: "/components/active-filters" },
          { text: "Avatar", link: "/components/avatar" },
          { text: "Badge", link: "/components/badge" },
          { text: "Badge Group", link: "/components/badge-group" },
          { text: "Breadcrumbs", link: "/components/breadcrumbs" },
          { text: "Button", link: "/components/button" },
          { text: "Card", link: "/components/card" },
          { text: "Checkbox", link: "/components/checkbox" },
          { text: "Combobox", link: "/components/combobox" },
          { text: "Command", link: "/components/command" },
          { text: "Data Table", link: "/components/data-table" },
          { text: "Date Picker", link: "/components/date-picker" },
          { text: "Dialog", link: "/components/dialog" },
          { text: "Drawer", link: "/components/drawer" },
          { text: "Dropdown", link: "/components/dropdown" },
          { text: "Empty State", link: "/components/empty-state" },
          { text: "Error Boundary", link: "/components/error-boundary" },
          { text: "File Upload", link: "/components/file-upload" },
          { text: "Filter Chip", link: "/components/filter-chip" },
          { text: "Form Field", link: "/components/form-field" },
          { text: "Icon", link: "/components/icon" },
          { text: "Icon Button", link: "/components/icon-button" },
          { text: "Input", link: "/components/input" },
          { text: "Kbd", link: "/components/kbd" },
          { text: "Pagination", link: "/components/pagination" },
          { text: "Panel", link: "/components/panel" },
          { text: "Popover", link: "/components/popover" },
          { text: "ProgressBar", link: "/components/progress-bar" },
          { text: "Radio Group", link: "/components/radio-group" },
          { text: "Risk Score", link: "/components/risk-score" },
          { text: "Search Input", link: "/components/search-input" },
          { text: "Select", link: "/components/select" },
          { text: "Segmented Control", link: "/components/segmented-control" },
          { text: "Severity Marker", link: "/components/severity-marker" },
          { text: "Skeleton", link: "/components/skeleton" },
          { text: "Slider", link: "/components/slider" },
          { text: "Spinner", link: "/components/spinner" },
          { text: "Stat", link: "/components/stat" },
          { text: "Status State", link: "/components/status-state" },
          { text: "Stepper", link: "/components/stepper" },
          { text: "Switch", link: "/components/switch" },
          { text: "Table", link: "/components/table" },
          { text: "Tabs", link: "/components/tabs" },
          { text: "Textarea", link: "/components/textarea" },
          { text: "Timeline", link: "/components/timeline" },
          { text: "Toast", link: "/components/toast" },
          { text: "Tooltip", link: "/components/tooltip" },
          { text: "Toolbar", link: "/components/toolbar" },
          { text: "TreeView", link: "/components/tree-view" },
          { text: "VirtualScroller", link: "/components/virtual-scroller" }
        ]
      }
    ]
  }
});
