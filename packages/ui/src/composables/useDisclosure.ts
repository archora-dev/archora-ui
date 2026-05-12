import { ref } from "vue";

export interface UseDisclosureOptions {
  defaultOpen?: boolean;
}

export function useDisclosure(options: UseDisclosureOptions = {}) {
  const open = ref(options.defaultOpen ?? false);

  function show() {
    open.value = true;
  }

  function hide() {
    open.value = false;
  }

  function toggle() {
    open.value = !open.value;
  }

  return {
    open,
    show,
    hide,
    toggle
  };
}
