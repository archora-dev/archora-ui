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
const filteredOptions = computed(() => {
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

function onInput(event: Event) {
  if (props.disabled) {
    return;
  }

  setSearch((event.target as HTMLInputElement).value);
  open.value = true;
}

function selectOption(option: ArchComboboxOption) {
  if (option.disabled || props.disabled) {
    return;
  }

  const newValue = String(option.value);
  setSearch(option.label);
  emit("update:modelValue", newValue);
  emit("change", newValue);
  open.value = false;
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
    open.value = false;
    return;
  }

  open.value = true;
  keyboard.onKeydown(event);
}

useOutsideClick([rootRef, listboxRef], () => {
  open.value = false;
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
      @focus="open = true"
      @input="onInput"
      @keydown="onKeydown"
    />
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
          {{ option.label }}
        </button>
        <div v-if="filteredOptions.length === 0" class="arch-combobox__empty" role="status">
          No results
        </div>
      </div>
    </Teleport>
  </div>
</template>
