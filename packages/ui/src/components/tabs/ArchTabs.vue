<script setup lang="ts">
import { computed } from "vue";
import { useId } from "../../composables/useId";
import type { ArchTabsItem, ArchTabsProps } from "./tabs.types";

const props = withDefaults(defineProps<ArchTabsProps>(), {
  modelValue: undefined,
  ariaLabel: "Tabs"
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
  change: [value: string];
}>();

const baseId = useId("arch-tabs");
const enabledItems = computed(() => props.items.filter((item) => !item.disabled));
const selectedValue = computed(() => props.modelValue ?? enabledItems.value[0]?.value ?? "");
const selectedItem = computed(() => props.items.find((item) => item.value === selectedValue.value));

function selectItem(item: ArchTabsItem) {
  if (item.disabled || item.value === selectedValue.value) {
    return;
  }

  emit("update:modelValue", item.value);
  emit("change", item.value);
}

function onKeydown(event: KeyboardEvent, item: ArchTabsItem) {
  const currentIndex = enabledItems.value.findIndex(
    (enabledItem) => enabledItem.value === item.value
  );

  if (currentIndex === -1) {
    return;
  }

  const lastIndex = enabledItems.value.length - 1;
  let nextIndex = currentIndex;

  if (event.key === "ArrowRight" || event.key === "ArrowDown") {
    nextIndex = currentIndex === lastIndex ? 0 : currentIndex + 1;
  } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
    nextIndex = currentIndex === 0 ? lastIndex : currentIndex - 1;
  } else if (event.key === "Home") {
    nextIndex = 0;
  } else if (event.key === "End") {
    nextIndex = lastIndex;
  } else {
    return;
  }

  event.preventDefault();
  selectItem(enabledItems.value[nextIndex]);
}
</script>

<template>
  <div class="arch-tabs">
    <div class="arch-tabs__list" role="tablist" :aria-label="ariaLabel">
      <button
        v-for="item in items"
        :id="`${baseId}-tab-${item.value}`"
        :key="item.value"
        class="arch-tabs__tab"
        :class="{ 'arch-tabs__tab--active': item.value === selectedValue }"
        type="button"
        role="tab"
        :disabled="item.disabled"
        :aria-selected="item.value === selectedValue ? 'true' : 'false'"
        :aria-controls="`${baseId}-panel-${item.value}`"
        :tabindex="item.value === selectedValue ? 0 : -1"
        @click="selectItem(item)"
        @keydown="onKeydown($event, item)"
      >
        {{ item.label }}
      </button>
    </div>
    <div
      :id="`${baseId}-panel-${selectedValue}`"
      class="arch-tabs__panel"
      role="tabpanel"
      :aria-labelledby="`${baseId}-tab-${selectedValue}`"
      tabindex="0"
    >
      <slot :name="selectedValue">
        <slot :item="selectedItem" />
      </slot>
    </div>
  </div>
</template>
