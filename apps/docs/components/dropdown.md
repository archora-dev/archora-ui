# Dropdown

Context menu built from trigger, content, and items, closing on selection or outside click.

## Usage

```vue
<script setup>
import {
  ArchDropdown,
  ArchDropdownTrigger,
  ArchDropdownContent,
  ArchDropdownItem
} from "@archora/ui";
</script>

<template>
  <ArchDropdown @select="handleSelect">
    <ArchDropdownTrigger>Actions</ArchDropdownTrigger>
    <ArchDropdownContent>
      <ArchDropdownItem value="edit">Edit</ArchDropdownItem>
      <ArchDropdownItem value="delete">Delete</ArchDropdownItem>
    </ArchDropdownContent>
  </ArchDropdown>
</template>
```

<ComponentSandbox name="dropdown" />

## Props

| Prop                      | Type    | Default | Description        |
| :------------------------ | :------ | :------ | :----------------- |
| ArchDropdownItem.value    | string  | -       | Item value.        |
| ArchDropdownItem.disabled | boolean | false   | Disables the item. |

## Events

| Event  | Payload       | Description          |
| :----- | :------------ | :------------------- |
| select | value: string | Menu item selection. |

## Slots

| Slot                        | Props | Description             |
| :-------------------------- | :---- | :---------------------- |
| ArchDropdown.default        | -     | Trigger and content.    |
| ArchDropdownTrigger.default | -     | Trigger button/content. |
| ArchDropdownContent.default | -     | Menu items.             |
| ArchDropdownItem.default    | -     | Item text.              |
