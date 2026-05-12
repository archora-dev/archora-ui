<script setup lang="ts">
import { computed } from "vue";
import {
  ArchCommand,
  ArchDialog,
  ArchDialogContent,
  ArchDialogHeader,
  ArchDialogTitle,
  ArchDropdown,
  ArchDropdownContent,
  ArchDropdownItem,
  ArchDropdownTrigger,
  ArchSwitch,
  ArchToastViewport,
  ArchTooltip
} from "@archora/ui";
import { commandItems } from "../data/demoData";

const props = defineProps<{
  activeView: string;
  commandOpen: boolean;
  darkMode: boolean;
}>();

const emit = defineEmits<{
  navigate: [view: string];
  "update:commandOpen": [open: boolean];
  "update:darkMode": [enabled: boolean];
}>();

const navItems = [
  { value: "overview", label: "Overview", marker: "01" },
  { value: "projects", label: "Projects", marker: "02" },
  { value: "team", label: "Team", marker: "03" },
  { value: "settings", label: "Settings", marker: "04" },
  { value: "billing", label: "Billing", marker: "05" }
];

const activeLabel = computed(
  () => navItems.find((item) => item.value === props.activeView)?.label ?? "Overview"
);

function openCommand() {
  emit("update:commandOpen", true);
}

function runCommand(value: string) {
  emit("navigate", value);
  emit("update:commandOpen", false);
}
</script>

<template>
  <div class="app-shell">
    <aside class="sidebar">
      <div class="brand">
        <div class="brand__mark">A</div>
        <div>
          <strong>Archora</strong>
          <span>Console</span>
        </div>
      </div>

      <nav class="sidebar__nav" aria-label="Primary">
        <button
          v-for="item in navItems"
          :key="item.value"
          type="button"
          class="sidebar__item"
          :class="{ 'sidebar__item--active': item.value === activeView }"
          @click="emit('navigate', item.value)"
        >
          <span>{{ item.marker }}</span>
          {{ item.label }}
        </button>
      </nav>

      <div class="sidebar__footer">
        <div class="workspace-card">
          <span>Workspace</span>
          <strong>Northstar Labs</strong>
          <small>Enterprise plan</small>
        </div>
      </div>
    </aside>

    <div class="main-frame">
      <header class="topbar">
        <div class="topbar__view">
          <span class="topbar__label">Viewing</span>
          <strong>{{ activeLabel }}</strong>
        </div>

        <div class="topbar__actions">
          <ArchTooltip content="Open command menu">
            <button class="command-trigger" type="button" @click="openCommand">
              <span>Search projects, users, settings</span>
              <kbd>Cmd K</kbd>
            </button>
          </ArchTooltip>

          <label class="theme-toggle">
            <span>Dark</span>
            <ArchSwitch
              :model-value="darkMode"
              aria-label="Toggle dark theme"
              @update:model-value="emit('update:darkMode', $event)"
            />
          </label>

          <ArchDropdown @select="runCommand">
            <ArchDropdownTrigger class="demo-dropdown-trigger">Actions</ArchDropdownTrigger>
            <ArchDropdownContent>
              <ArchDropdownItem value="projects">Review projects</ArchDropdownItem>
              <ArchDropdownItem value="team">Invite teammate</ArchDropdownItem>
              <ArchDropdownItem value="settings">Open settings</ArchDropdownItem>
            </ArchDropdownContent>
          </ArchDropdown>
        </div>
      </header>

      <main class="content">
        <slot />
      </main>
    </div>

    <ArchDialog :open="commandOpen" @update:open="emit('update:commandOpen', $event)">
      <ArchDialogContent>
        <ArchDialogHeader>
          <ArchDialogTitle>Command menu</ArchDialogTitle>
        </ArchDialogHeader>
        <ArchCommand
          :items="commandItems"
          placeholder="Jump to a dashboard area"
          @update:model-value="runCommand"
        />
      </ArchDialogContent>
    </ArchDialog>

    <ArchToastViewport />
  </div>
</template>
