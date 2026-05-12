<script setup lang="ts">
import {
  ArchButton,
  ArchDialog,
  ArchDialogContent,
  ArchDialogDescription,
  ArchDialogFooter,
  ArchDialogHeader,
  ArchDialogTitle,
  ArchDialogTrigger
} from "@archora/ui";
</script>

<template>
  <Story title="Components/Dialog">
    <Variant title="Overview">
      <main class="dialog-story">
        <ArchDialog>
          <ArchDialogTrigger>Open dialog</ArchDialogTrigger>
          <ArchDialogContent>
            <ArchDialogHeader>
              <ArchDialogTitle>Confirm deploy</ArchDialogTitle>
              <ArchDialogDescription>
                This will deploy the current release to production.
              </ArchDialogDescription>
            </ArchDialogHeader>
            <p class="dialog-story__copy">Verify that all checks are green before continuing.</p>
            <ArchDialogFooter>
              <ArchButton variant="secondary">Cancel</ArchButton>
              <ArchButton>Deploy</ArchButton>
            </ArchDialogFooter>
          </ArchDialogContent>
        </ArchDialog>
      </main>
    </Variant>

    <Variant title="Accessibility">
      <main class="dialog-story">
        <ArchDialog>
          <ArchDialogTrigger>Review focus behavior</ArchDialogTrigger>
          <ArchDialogContent>
            <ArchDialogHeader>
              <ArchDialogTitle>Keyboard flow</ArchDialogTitle>
              <ArchDialogDescription>
                Escape closes the dialog, Tab stays inside it, and focus returns to the trigger.
              </ArchDialogDescription>
            </ArchDialogHeader>
            <ArchDialogFooter>
              <ArchButton variant="secondary">Cancel</ArchButton>
              <ArchButton>Continue</ArchButton>
            </ArchDialogFooter>
          </ArchDialogContent>
        </ArchDialog>
      </main>
    </Variant>
  </Story>
</template>

<style scoped>
.dialog-story {
  display: grid;
  place-items: start;
  max-width: 42rem;
  padding: var(--arch-space-6);
  border: 1px solid var(--arch-color-border);
  border-radius: var(--arch-radius-lg);
  background: var(--arch-color-bg-elevated);
}

.dialog-story__copy {
  margin: 0;
  color: var(--arch-color-fg-muted);
}
</style>
