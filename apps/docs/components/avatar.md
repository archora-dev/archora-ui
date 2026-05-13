# Avatar

User or object avatar with fallback initials.

## Usage

```vue
<script setup>
import { ArchAvatar } from "@archora/ui";
</script>

<template>
  <ArchAvatar src="/team/ana.png" alt="Ana Silva" fallback="AS" size="lg" />
</template>
```

<ComponentSandbox name="avatar" />

## Props

| Prop     | Type                         | Default | Description                                            |
| :------- | :--------------------------- | :------ | :----------------------------------------------------- |
| src      | string                       | -       | Image URL.                                             |
| alt      | string                       | -       | Image alt text and accessible name.                    |
| fallback | string                       | "?"     | Text shown when the image is missing or fails to load. |
| size     | "sm" \| "md" \| "lg" \| "xl" | "md"    | Avatar size.                                           |
