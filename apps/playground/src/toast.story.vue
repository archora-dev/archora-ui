<script setup lang="ts">
import { ArchButton, ArchToastViewport, useToast } from "@archora/ui";

const toast = useToast();
</script>

<template>
  <Story title="Components/Toast">
    <Variant title="Overview">
      <main class="toast-story">
        <ArchButton
          variant="secondary"
          @click="
            toast.show({
              title: 'Settings saved',
              description: 'Your project settings were updated.',
              variant: 'success'
            })
          "
        >
          Show toast
        </ArchButton>
        <ArchToastViewport />
      </main>
    </Variant>
  </Story>
</template>

<style scoped>
.toast-story {
  min-height: 16rem;
  max-width: 42rem;
  padding: var(--arch-space-6);
  border: 1px solid var(--arch-color-border);
  border-radius: var(--arch-radius-lg);
  background: var(--arch-color-bg-elevated);
}
</style>
