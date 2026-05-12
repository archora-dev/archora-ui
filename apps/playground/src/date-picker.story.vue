<script setup lang="ts">
import { ref } from "vue";
import { ArchDatePicker, ArchFormField } from "@archora/ui";

const releaseDate = ref("2026-05-10");
const unrestrictedDate = ref("");
</script>

<template>
  <Story title="Components/DatePicker">
    <Variant title="Overview">
      <main class="date-picker-story">
        <ArchFormField label="Release date" description="Pick a date in May 2026.">
          <ArchDatePicker v-model="releaseDate" min="2026-05-01" max="2026-05-31" />
        </ArchFormField>
      </main>
    </Variant>

    <Variant title="States">
      <main class="date-picker-story date-picker-story--stack">
        <ArchFormField label="Empty">
          <ArchDatePicker v-model="unrestrictedDate" />
        </ArchFormField>
        <ArchFormField label="Disabled">
          <ArchDatePicker model-value="2026-05-10" disabled />
        </ArchFormField>
      </main>
    </Variant>

    <Variant title="Accessibility">
      <main class="date-picker-story">
        <ArchFormField label="Keyboard date" description="Use arrow keys in the grid.">
          <ArchDatePicker v-model="releaseDate" min="2026-05-01" max="2026-05-31" />
        </ArchFormField>
      </main>
    </Variant>
  </Story>
</template>

<style scoped>
.date-picker-story {
  min-height: 24rem;
  max-width: 42rem;
  padding: var(--arch-space-6);
  border: 1px solid var(--arch-color-border);
  border-radius: var(--arch-radius-lg);
  background: var(--arch-color-bg-elevated);
}

.date-picker-story--stack {
  display: grid;
  gap: var(--arch-space-5);
}
</style>
