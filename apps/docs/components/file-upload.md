# File Upload

File input with a dropzone-style surface and selected file list.

## Usage

```vue
<script setup>
import { ref } from "vue";
import { ArchFileUpload } from "@archora/ui";

const files = ref([]);
</script>

<template>
  <ArchFileUpload v-model="files" label="Attach report" accept=".pdf" multiple />
</template>
```

<ComponentSandbox name="file-upload" />

## Props

| Prop        | Type    | Default        | Description               |
| :---------- | :------ | :------------- | :------------------------ |
| modelValue  | File[]  | []             | `v-model` value.          |
| label       | string  | "Upload files" | Accessible label or text. |
| description | string  | -              | Description.              |
| accept      | string  | -              | HTML accept.              |
| multiple    | boolean | false          | Allows multiple values.   |
| disabled    | boolean | false          | Disables the component.   |

## Events

| Event             | Payload       | Description          |
| :---------------- | :------------ | :------------------- |
| update:modelValue | files: File[] | `modelValue` change. |
| change            | files: File[] | Value change.        |
