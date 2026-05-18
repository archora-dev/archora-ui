# Virtual Scroller

Virtualizes long lists with fixed-height items.

## Usage

```vue
<script setup>
import { ArchVirtualScroller } from "@archora/ui";

const items = Array.from({ length: 1000 }, (_, index) => ({ id: index, label: "Item " + index }));
</script>

<template>
  <ArchVirtualScroller
    :items="items"
    :item-height="40"
    :height="320"
    :overscan="4"
    :key-fn="(item) => item.id"
    v-slot="{ item }"
  >
    <div class="module-row">
      <strong>{{ item.label }}</strong>
      <span>{{ item.path }}</span>
    </div>
  </ArchVirtualScroller>
</template>
```

<ComponentSandbox name="virtual-scroller" />

## Props

Use it for dense, uniform-row collections such as modules, dependencies, search results, audit events and history entries. Keep row height fixed; if rows need dynamic height, use pagination or a normal list.

## Props

| Prop       | Type                                      | Default | Description                                      |
| :--------- | :---------------------------------------- | :------ | :----------------------------------------------- |
| items      | readonly unknown[]                        | -       | Item collection.                                 |
| itemHeight | number                                    | -       | Fixed row height in pixels.                      |
| height     | number \| string                          | `100%`  | Viewport height. Numbers are converted to `px`.  |
| overscan   | number                                    | `1`     | Extra rows rendered before and after the window. |
| keyFn      | `(item: unknown, index: number) => Key`    | index   | Stable row key.                                  |

## Exposed Methods

| Method          | Description                            |
| :-------------- | :------------------------------------- |
| `scrollTo(i)`   | Scrolls to the row at the given index. |

## Slots

| Slot    | Props                            | Description             |
| :------ | :------------------------------- | :---------------------- |
| default | { item: unknown; index: number } | Renders a visible item. |
