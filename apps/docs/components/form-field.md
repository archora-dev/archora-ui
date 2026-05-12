# Form Field

`ArchFormField` wires labels, descriptions, errors, and field ARIA attributes around form controls.

```vue
<script setup lang="ts">
import { ref } from "vue";
import { ArchFormField, ArchInput } from "@archora/ui";
import "@archora/ui/styles.css";

const project = ref("");
</script>

<template>
  <ArchFormField
    v-slot="{ id, describedby, invalid, required }"
    label="Project name"
    description="Used in dashboards and navigation."
    required
  >
    <ArchInput
      :id="id"
      v-model="project"
      :aria-describedby="describedby"
      :invalid="invalid"
      :required="required"
    />
  </ArchFormField>
</template>
```
