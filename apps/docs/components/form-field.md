# Form Field

Label, description, and error wrapper for form fields.

## Usage

```vue
<script setup>
import { ArchFormField, ArchInput } from "@archora/ui";
</script>

<template>
  <ArchFormField label="Email" description="Used for alerts" v-slot="field">
    <ArchInput :id="field.id" :aria-describedby="field.describedby" />
  </ArchFormField>
</template>
```

<ComponentSandbox name="form-field" />

## Props

| Prop        | Type                | Default | Description                                |
| :---------- | :------------------ | :------ | :----------------------------------------- |
| id          | string              | -       | Unique id.                                 |
| label       | string              | -       | Accessible label or text.                  |
| description | string              | -       | Description.                               |
| error       | string              | -       | Error text.                                |
| required    | boolean             | false   | Marks the field as required.               |
| invalid     | boolean             | false   | Invalid state.                             |
| describedby | string \| undefined | -       | Description/error id for aria-describedby. |

## Slots

| Slot    | Props                                                                       | Description                                      |
| :------ | :-------------------------------------------------------------------------- | :----------------------------------------------- |
| default | `{ id: string; describedby?: string; invalid: boolean; required: boolean }` | Field slot; receives linked accessibility props. |
