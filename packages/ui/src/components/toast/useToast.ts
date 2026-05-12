import { readonly, ref } from "vue";
import type { ArchToastInput, ArchToastItem } from "./toast.types";

const toasts = ref<ArchToastItem[]>([]);
let toastId = 0;

export function useToast() {
  function show(input: ArchToastInput) {
    toastId += 1;
    const id = input.id ?? `arch-toast-${toastId}`;
    toasts.value = [...toasts.value, { ...input, id, variant: input.variant ?? "info" }];
    return id;
  }

  function dismiss(id: string) {
    toasts.value = toasts.value.filter((toast) => toast.id !== id);
  }

  function clear() {
    toasts.value = [];
  }

  return {
    toasts: readonly(toasts),
    show,
    dismiss,
    clear
  };
}
