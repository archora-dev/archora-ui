<script setup lang="ts">
import { ArchBadge, type ArchBadgeSize, type ArchBadgeVariant } from "@archora/ui";

const variants: ArchBadgeVariant[] = ["neutral", "primary", "success", "warning", "danger", "info"];
const sizes: ArchBadgeSize[] = ["sm", "md"];
</script>

<template>
  <Story title="Components/Badge">
    <Variant title="Variants">
      <main class="badge-story">
        <section v-for="size in sizes" :key="size" class="badge-story__row">
          <ArchBadge v-for="variant in variants" :key="variant" :variant="variant" :size="size">
            {{ variant }}
          </ArchBadge>
        </section>
      </main>
    </Variant>
  </Story>
</template>

<style scoped>
.badge-story {
  display: grid;
  gap: var(--arch-space-4);
  max-width: 42rem;
  padding: var(--arch-space-6);
  border: 1px solid var(--arch-color-border);
  border-radius: var(--arch-radius-lg);
  background: var(--arch-color-bg-elevated);
}

.badge-story__row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--arch-space-2);
}
</style>
