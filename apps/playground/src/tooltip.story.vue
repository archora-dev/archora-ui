<script setup lang="ts">
import { ArchButton, ArchTooltip, type ArchTooltipPlacement } from "@archora/ui";

const placements: ArchTooltipPlacement[] = ["top", "right", "bottom", "left"];
</script>

<template>
  <Story title="Components/Tooltip">
    <Variant title="Variants">
      <main class="tooltip-story">
        <ArchTooltip
          v-for="placement in placements"
          :key="placement"
          :placement="placement"
          :content="`${placement} tooltip`"
        >
          <ArchButton variant="secondary">
            {{ placement }}
          </ArchButton>
        </ArchTooltip>
      </main>
    </Variant>
  </Story>
</template>

<style scoped>
.tooltip-story {
  display: flex;
  flex-wrap: wrap;
  gap: var(--arch-space-5);
  align-items: center;
  max-width: 42rem;
  min-height: 14rem;
  padding: var(--arch-space-6);
  border: 1px solid var(--arch-color-border);
  border-radius: var(--arch-radius-lg);
  background: var(--arch-color-bg-elevated);
}
</style>
