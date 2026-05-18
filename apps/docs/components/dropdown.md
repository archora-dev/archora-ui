# Dropdown

Context menu built from trigger, content, and items, closing on selection or outside click. Items can
carry descriptions and danger tone for destructive actions.

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
    <ArchDropdownContent align="end">
      <ArchDropdownItem value="edit">Edit</ArchDropdownItem>
      <ArchDropdownItem value="pause" description="Stop new traffic">Pause</ArchDropdownItem>
      <ArchDropdownItem value="delete" description="Remove service" tone="danger">
        Delete
      </ArchDropdownItem>
    </ArchDropdownContent>
  </ArchDropdown>
</template>
```

<ComponentSandbox name="dropdown" />

## Props

| Prop                         | Type                  | Default   | Description        |
| :--------------------------- | :-------------------- | :-------- | :----------------- |
| ArchDropdownContent.align    | "start" \| "end"      | "end"     | Menu alignment.    |
| ArchDropdownItem.value       | string                | -         | Item value.        |
| ArchDropdownItem.disabled    | boolean               | false     | Disables the item. |
| ArchDropdownItem.description | string                | -         | Supporting text.   |
| ArchDropdownItem.tone        | "default" \| "danger" | "default" | Item tone.         |

## Events

| Event  | Payload       | Description          |
| :----- | :------------ | :------------------- |
| select | value: string | Menu item selection. |
| open   | -             | Menu opened.         |
| close  | -             | Menu closed.         |

## Slots

| Slot                        | Props | Description             |
| :-------------------------- | :---- | :---------------------- |
| ArchDropdown.default        | -     | Trigger and content.    |
| ArchDropdownTrigger.default | -     | Trigger button/content. |
| ArchDropdownContent.default | -     | Menu items.             |
| ArchDropdownItem.default    | -     | Item text.              |
