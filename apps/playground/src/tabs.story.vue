<script setup lang="ts">
import { ref } from "vue";
import { ArchTabs, type ArchTabsItem } from "@archora/ui";

const active = ref("overview");
const items: ArchTabsItem[] = [
  { value: "overview", label: "Overview" },
  { value: "activity", label: "Activity" },
  { value: "settings", label: "Settings", disabled: true }
];
</script>

<template>
  <Story title="Components/Tabs">
    <Variant title="Overview">
      <main class="tabs-story">
        <ArchTabs v-model="active" :items="items">
          <template #overview>
            <div class="tabs-story__panel">Overview content for this project.</div>
          </template>
          <template #activity>
            <div class="tabs-story__panel">Recent activity and events.</div>
          </template>
        </ArchTabs>
      </main>
    </Variant>
  </Story>
</template>

<style scoped>
.tabs-story {
  max-width: 42rem;
  padding: var(--arch-space-6);
  border: 1px solid var(--arch-color-border);
  border-radius: var(--arch-radius-lg);
  background: var(--arch-color-bg-elevated);
  color: var(--arch-color-fg);
}

.tabs-story__panel {
  border: 1px solid var(--arch-color-border);
  border-radius: var(--arch-radius-lg);
  background: var(--arch-color-bg);
  padding: var(--arch-space-5);
}
</style>
