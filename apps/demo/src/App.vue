<script setup lang="ts">
import { computed, ref, watchEffect } from "vue";
import AppShell from "./components/AppShell.vue";
import BillingView from "./views/BillingView.vue";
import OverviewView from "./views/OverviewView.vue";
import ProjectsView from "./views/ProjectsView.vue";
import SettingsView from "./views/SettingsView.vue";
import TeamView from "./views/TeamView.vue";

const activeView = ref("overview");
const commandOpen = ref(false);
const darkMode = ref(true);
const params =
  typeof window === "undefined"
    ? new URLSearchParams()
    : new URLSearchParams(window.location.search);
const viewParam = params.get("view");
const themeParam = params.get("theme");
const screenshotMode = params.get("screenshot") === "1";

if (["overview", "projects", "team", "settings", "billing"].includes(viewParam ?? "")) {
  activeView.value = viewParam as string;
}

if (themeParam === "light") {
  darkMode.value = false;
}

if (params.get("command") === "1") {
  commandOpen.value = true;
}

const activeComponent = computed(() => {
  const views = {
    overview: OverviewView,
    projects: ProjectsView,
    team: TeamView,
    settings: SettingsView,
    billing: BillingView
  };

  return views[activeView.value as keyof typeof views] ?? OverviewView;
});

watchEffect(() => {
  document.documentElement.dataset.theme = darkMode.value ? "dark" : "light";
  document.documentElement.dataset.screenshot = screenshotMode ? "true" : "false";
});

function navigate(view: string) {
  activeView.value = view;
}
</script>

<template>
  <AppShell
    v-model:command-open="commandOpen"
    v-model:dark-mode="darkMode"
    :active-view="activeView"
    @navigate="navigate"
  >
    <component :is="activeComponent" />
  </AppShell>
</template>
