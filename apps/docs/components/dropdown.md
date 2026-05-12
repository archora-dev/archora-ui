# Dropdown

`ArchDropdown` shows a small action menu from a trigger.

```vue
<script setup lang="ts">
import {
  ArchDropdown,
  ArchDropdownContent,
  ArchDropdownItem,
  ArchDropdownTrigger
} from "@archora/ui";
import "@archora/ui/styles.css";
</script>

<template>
  <ArchDropdown @select="(value) => console.log(value)">
    <ArchDropdownTrigger>Actions</ArchDropdownTrigger>
    <ArchDropdownContent>
      <ArchDropdownItem value="edit">Edit</ArchDropdownItem>
      <ArchDropdownItem value="delete">Delete</ArchDropdownItem>
    </ArchDropdownContent>
  </ArchDropdown>
</template>
```

Escape closes the menu. Selecting an item emits `select` and closes the menu.
