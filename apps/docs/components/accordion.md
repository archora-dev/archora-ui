# Accordion

Group of collapsible sections. `ArchAccordion` manages state, while `ArchAccordionItem` defines each panel.

## Usage

```vue
<script setup>
import { ref } from "vue";
import { ArchAccordion, ArchAccordionItem } from "@archora/ui";

const opened = ref("overview");
</script>

<template>
  <ArchAccordion v-model="opened">
    <ArchAccordionItem id="overview" title="Overview">Architecture summary</ArchAccordionItem>
    <ArchAccordionItem id="risks" title="Risks">Open risk items</ArchAccordionItem>
  </ArchAccordion>
</template>
```

<ComponentSandbox name="accordion" />

## Props

| Prop       | Type               | Default | Description             |
| :--------- | :----------------- | :------ | :---------------------- |
| modelValue | string \| string[] | -       | `v-model` value.        |
| multiple   | boolean            | -       | Allows multiple values. |
| id         | string             | -       | Unique id.              |
| title      | string             | -       | Title.                  |

## Events

| Event             | Payload                   | Description          |
| :---------------- | :------------------------ | :------------------- |
| update:modelValue | value: string \| string[] | `modelValue` change. |

## Slots

| Slot    | Props | Description                |
| :------ | :---- | :------------------------- |
| default | -     | Accordion or item content. |
