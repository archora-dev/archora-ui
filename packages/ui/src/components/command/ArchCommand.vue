<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useKeyboardNavigation } from "../../composables/useKeyboardNavigation";
import { useId } from "../../composables/useId";
import type { ArchCommandItem, ArchCommandProps } from "./command.types";

const props = withDefaults(defineProps<ArchCommandProps>(), {
  modelValue: undefined,
  searchValue: undefined,
  placeholder: "Search commands",
  emptyText: "No results",
  loading: false,
  loadingText: "Loading",
  errorText: undefined,
  clearable: false,
  disabled: false,
  ariaLabel: undefined,
  ariaLabelledby: undefined
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
  "update:searchValue": [value: string];
  select: [value: string];
  clear: [];
}>();

const internalSearch = ref("");
const listboxId = useId("arch-command-listbox");

const searchText = computed(() => props.searchValue ?? internalSearch.value);
const normalizedSearch = computed(() => searchText.value.trim().toLocaleLowerCase());
const hasValue = computed(() => searchText.value.length > 0 || props.modelValue !== undefined);
const filteredItems = computed(() => {
  if (props.loading || props.errorText) {
    return [];
  }

  if (!normalizedSearch.value) {
    return props.items;
  }

  return props.items.filter((item) => {
    const haystack = `${item.label} ${item.description ?? ""}`.toLocaleLowerCase();
    return haystack.includes(normalizedSearch.value);
  });
});

function onInput(event: Event) {
  if (props.disabled) {
    return;
  }

  const value = (event.target as HTMLInputElement).value;
  internalSearch.value = value;
  emit("update:searchValue", value);
}

function selectItem(item: ArchCommandItem) {
  if (props.disabled || item.disabled) {
    return;
  }

  emit("update:modelValue", item.value);
  emit("select", item.value);
}

function clearCommand() {
  if (props.disabled) {
    return;
  }

  internalSearch.value = "";
  emit("update:searchValue", "");
  emit("update:modelValue", "");
  emit("clear");
}

const keyboard = useKeyboardNavigation({
  getCount: () => filteredItems.value.length,
  isDisabled: (index) => filteredItems.value[index]?.disabled === true,
  onSelect: (index) => {
    const item = filteredItems.value[index];

    if (item) {
      selectItem(item);
    }
  }
});

watch(filteredItems, () => {
  keyboard.reset();
});
</script>

<template>
  <section class="arch-command" :class="{ 'arch-command--disabled': disabled }">
    <div class="arch-command__search-wrap">
      <input
        class="arch-command__search"
        role="searchbox"
        :value="searchText"
        :placeholder="placeholder"
        :disabled="disabled"
        :aria-controls="listboxId"
        :aria-activedescendant="
          keyboard.activeIndex.value >= 0 ? `${listboxId}-${keyboard.activeIndex.value}` : undefined
        "
        :aria-label="ariaLabel"
        :aria-labelledby="ariaLabelledby"
        @input="onInput"
        @keydown="keyboard.onKeydown"
      />
      <button
        v-if="clearable && hasValue && !disabled"
        class="arch-command__clear"
        type="button"
        aria-label="Clear command search"
        @click="clearCommand"
      >
        ×
      </button>
    </div>
    <div :id="listboxId" class="arch-command__list" role="listbox">
      <button
        v-for="item in filteredItems"
        :id="`${listboxId}-${filteredItems.indexOf(item)}`"
        :key="item.value"
        class="arch-command__item"
        type="button"
        role="option"
        :disabled="item.disabled || disabled"
        :aria-selected="item.value === modelValue ? 'true' : 'false'"
        :data-active="
          filteredItems.indexOf(item) === keyboard.activeIndex.value ? 'true' : undefined
        "
        @click="selectItem(item)"
      >
        <slot
          name="item"
          :item="item"
          :active="filteredItems.indexOf(item) === keyboard.activeIndex.value"
        >
          <span class="arch-command__item-label">{{ item.label }}</span>
          <span v-if="item.description" class="arch-command__item-description">
            {{ item.description }}
          </span>
        </slot>
      </button>
      <div v-if="loading" class="arch-command__state" role="status">
        <slot name="loading">{{ loadingText }}</slot>
      </div>
      <div
        v-else-if="errorText"
        class="arch-command__state arch-command__state--error"
        role="alert"
      >
        <slot name="error">{{ errorText }}</slot>
      </div>
      <div v-else-if="filteredItems.length === 0" class="arch-command__state" role="status">
        <slot name="empty">{{ emptyText }}</slot>
      </div>
    </div>
  </section>
</template>
