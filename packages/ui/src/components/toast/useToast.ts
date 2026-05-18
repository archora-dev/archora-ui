import { readonly, ref } from "vue";
import type { ArchToastInput, ArchToastItem } from "./toast.types";

const toasts = ref<ArchToastItem[]>([]);
let toastId = 0;

export function useToast() {
  function dismiss(id: string) {
    toasts.value = toasts.value.filter((toast) => toast.id !== id);
  }

  function show(input: ArchToastInput) {
    toastId += 1;
    const id = input.id ?? `arch-toast-${toastId}`;
    const duration = input.duration ?? 4000;
    toasts.value = [...toasts.value, { ...input, id, variant: input.variant ?? "info", duration }];

    if (duration > 0 && typeof globalThis.setTimeout === "function") {
      globalThis.setTimeout(() => dismiss(id), duration);
    }

    return id;
  }

  function push(input: ArchToastInput) {
    return show(input);
  }

  function clear() {
    toasts.value = [];
  }

  return {
    toasts: readonly(toasts),
    show,
    push,
    dismiss,
    clear,
    info: (title: string, description?: string) => show({ title, description, variant: "info" }),
    success: (title: string, description?: string) =>
      show({ title, description, variant: "success" }),
    warning: (title: string, description?: string) =>
      show({ title, description, variant: "warning" }),
    danger: (title: string, description?: string) => show({ title, description, variant: "danger" })
  };
}
