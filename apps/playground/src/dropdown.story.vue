<script setup lang="ts">
import {
  ArchDropdown,
  ArchDropdownContent,
  ArchDropdownItem,
  ArchDropdownTrigger
} from "@archora/ui";
</script>

<template>
  <Story title="Components/Dropdown">
    <Variant title="Overview">
      <main class="dropdown-story">
        <ArchDropdown>
          <ArchDropdownTrigger>Actions</ArchDropdownTrigger>
          <ArchDropdownContent>
            <ArchDropdownItem value="edit">Edit project</ArchDropdownItem>
            <ArchDropdownItem value="duplicate">Duplicate</ArchDropdownItem>
            <ArchDropdownItem value="archive">Archive</ArchDropdownItem>
          </ArchDropdownContent>
        </ArchDropdown>
      </main>
    </Variant>
  </Story>
</template>

<style scoped>
.dropdown-story {
  min-height: 16rem;
  max-width: 42rem;
  padding: var(--arch-space-6);
  border: 1px solid var(--arch-color-border);
  border-radius: var(--arch-radius-lg);
  background: var(--arch-color-bg-elevated);
}
</style>
