<script setup lang="ts">
import { useTheme } from "@archora/ui";

const { preference, resolvedTheme, setTheme } = useTheme();
</script>

<template>
  <Story title="Foundation/Theme">
    <Variant title="Theme preference">
      <main class="archora-story">
        <p>Preference: {{ preference }}</p>
        <p>Resolved: {{ resolvedTheme }}</p>
        <button type="button" @click="setTheme('dark')">Dark</button>
        <button type="button" @click="setTheme('light')">Light</button>
        <button type="button" @click="setTheme('system')">System</button>
      </main>
    </Variant>
  </Story>
</template>

<style scoped>
.archora-story {
  display: grid;
  gap: var(--arch-space-3);
  max-width: 28rem;
  padding: var(--arch-space-6);
  border: 1px solid var(--arch-color-border);
  border-radius: var(--arch-radius-lg);
  background: var(--arch-color-bg-elevated);
  color: var(--arch-color-fg);
}

button {
  width: fit-content;
  border: 1px solid var(--arch-color-border);
  border-radius: var(--arch-radius-md);
  background: var(--arch-color-bg-subtle);
  color: var(--arch-color-fg);
  padding: var(--arch-space-2) var(--arch-space-4);
}
</style>
