# Quick Start

```vue
<script setup lang="ts">
import { ref } from "vue";
import { ArchButton, ArchFormField, ArchInput } from "@archora/ui";
import "@archora/ui/styles.css";

const project = ref("");
</script>

<template>
  <form>
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
        placeholder="archora-web"
      />
    </ArchFormField>

    <ArchButton type="submit">Create project</ArchButton>
  </form>
</template>
```

Archora components are intentionally low on global assumptions. Import `@archora/ui/styles.css`
once, set your theme preference through `useTheme` when needed, and compose components with native
Vue state.
