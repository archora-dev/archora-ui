<script setup lang="ts">
import { ArchAlert, type ArchAlertVariant } from "@archora/ui";

const variants: ArchAlertVariant[] = ["info", "success", "warning", "danger"];
</script>

<template>
  <Story title="Components/Alert">
    <Variant title="Variants">
      <main class="alert-story">
        <ArchAlert
          v-for="variant in variants"
          :key="variant"
          :variant="variant"
          :title="`${variant} alert`"
        >
          This message uses the {{ variant }} alert style.
        </ArchAlert>
      </main>
    </Variant>
  </Story>
</template>

<style scoped>
.alert-story {
  display: grid;
  gap: var(--arch-space-4);
  max-width: 42rem;
  padding: var(--arch-space-6);
  border: 1px solid var(--arch-color-border);
  border-radius: var(--arch-radius-lg);
  background: var(--arch-color-bg);
}
</style>
