<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useId } from "../../composables/useId";
import { useFloatingPosition } from "../../composables/useFloatingPosition";
import { useKeyboardNavigation } from "../../composables/useKeyboardNavigation";
import { useOutsideClick } from "../../composables/useOutsideClick";
import type { ArchComboboxOption, ArchComboboxProps } from "./combobox.types";

const props = withDefaults(defineProps<ArchComboboxProps>(), {
  modelValue: undefined,
  searchValue: undefined,
  placeholder: "Search option",
  disabled: false,
  clearable: false,
  loading: false,
  loadingText: "Loading",
  emptyText: "No results",
  errorText: undefined,
  name: undefined,
  autocomplete: "off",
  ariaLabel: undefined,
  ariaLabelledby: undefined,
  ariaDescribedby: undefined
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
  "update:searchValue": [value: string];
  change: [value: string];
  clear: [];
  open: [];
  close: [];
}>();

const open = ref(false);
const internalSearch = ref("");
const rootRef = ref<HTMLElement | null>(null);
const listboxRef = ref<HTMLElement | null>(null);
const listboxId = useId("arch-combobox-listbox");

const selectedOption = computed(() =>
  props.options.find((option) => option.value === props.modelValue)
);

const searchText = computed(() => props.searchValue ?? internalSearch.value);
const normalizedSearch = computed(() => searchText.value.trim().toLocaleLowerCase());
const hasValue = computed(() => searchText.value.length > 0 || props.modelValue !== undefined);
const filteredOptions = computed(() => {
  if (props.loading || props.errorText) {
    return [];
  }

  if (!normalizedSearch.value) {
    return props.options;
  }

  return props.options.filter((option) =>
    option.label.toLocaleLowerCase().includes(normalizedSearch.value)
  );
});

watch(
  selectedOption,
  (option) => {
    if (props.searchValue === undefined) {
      internalSearch.value = option?.label ?? "";
    }
  },
  { immediate: true }
);

function setSearch(value: string) {
  internalSearch.value = value;
  emit("update:searchValue", value);
}

function setOpen(value: boolean) {
  if (props.disabled || open.value === value) {
    return;
  }

  open.value = value;

  if (value) {
    emit("open");
  } else {
    emit("close");
  }
}

function onInput(event: Event) {
  if (props.disabled) {
    return;
  }

  setSearch((event.target as HTMLInputElement).value);
  setOpen(true);
}

function selectOption(option: ArchComboboxOption) {
  if (option.disabled || props.disabled) {
    return;
  }

  const newValue = String(option.value);
  setSearch(option.label);
  emit("update:modelValue", newValue);
  emit("change", newValue);
  setOpen(false);
}

const keyboard = useKeyboardNavigation({
  getCount: () => filteredOptions.value.length,
  isDisabled: (index) => filteredOptions.value[index]?.disabled === true,
  onSelect: (index) => {
    const option = filteredOptions.value[index];

    if (option) {
      selectOption(option);
    }
  }
});

watch(filteredOptions, () => {
  keyboard.reset();
});

function onKeydown(event: KeyboardEvent) {
  if (event.key === "Escape") {
    setOpen(false);
    return;
  }

  setOpen(true);
  keyboard.onKeydown(event);
}

function clearSelection() {
  if (props.disabled) {
    return;
  }

  setSearch("");
  emit("update:modelValue", "");
  emit("clear");
  setOpen(false);
}

useOutsideClick([rootRef, listboxRef], () => {
  setOpen(false);
});

const { floatingStyle } = useFloatingPosition(rootRef, listboxRef, open, {
  align: "start",
  matchTriggerWidth: true,
  minWidth: 288
});
</script>

<template>
  <div
    ref="rootRef"
    class="arch-combobox"
    :class="{ 'arch-combobox--open': open, 'arch-combobox--disabled': disabled }"
  >
    <div class="arch-combobox__control">
      <input
        class="arch-combobox__input"
        role="combobox"
        :value="searchText"
        :name="name"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        :disabled="disabled"
        :aria-haspopup="'listbox'"
        :aria-expanded="open ? 'true' : 'false'"
        :aria-controls="listboxId"
        :aria-activedescendant="
          keyboard.activeIndex.value >= 0 ? `${listboxId}-${keyboard.activeIndex.value}` : undefined
        "
        :aria-label="ariaLabel"
        :aria-labelledby="ariaLabelledby"
        :aria-describedby="ariaDescribedby"
        @focus="setOpen(true)"
        @input="onInput"
        @keydown="onKeydown"
      />
      <button
        v-if="clearable && hasValue && !disabled"
        class="arch-combobox__clear"
        type="button"
        aria-label="Clear selection"
        @mousedown.prevent
        @click="clearSelection"
      >
        ×
      </button>
    </div>
    <Teleport to="body">
      <div
        v-if="open"
        :id="listboxId"
        ref="listboxRef"
        class="arch-combobox__listbox"
        role="listbox"
        :style="floatingStyle"
      >
        <button
          v-for="option in filteredOptions"
          :id="`${listboxId}-${filteredOptions.indexOf(option)}`"
          :key="option.value"
          class="arch-combobox__option"
          type="button"
          role="option"
          :disabled="option.disabled"
          :aria-selected="option.value === modelValue ? 'true' : 'false'"
          :data-active="
            filteredOptions.indexOf(option) === keyboard.activeIndex.value ? 'true' : undefined
          "
          @mousedown.prevent
          @click="selectOption(option)"
        >
          <slot
            name="option"
            :option="option"
            :active="filteredOptions.indexOf(option) === keyboard.activeIndex.value"
          >
            <span class="arch-combobox__option-label">{{ option.label }}</span>
            <span v-if="option.description" class="arch-combobox__option-description">
              {{ option.description }}
            </span>
          </slot>
        </button>
        <div v-if="loading" class="arch-combobox__state" role="status">
          <slot name="loading">{{ loadingText }}</slot>
        </div>
        <div
          v-else-if="errorText"
          class="arch-combobox__state arch-combobox__state--error"
          role="alert"
        >
          <slot name="error">{{ errorText }}</slot>
        </div>
        <div v-else-if="filteredOptions.length === 0" class="arch-combobox__state" role="status">
          <slot name="empty">{{ emptyText }}</slot>
        </div>
      </div>
    </Teleport>
  </div>
</template>
