import type { InjectionKey, Ref } from "vue";

export interface ArchDropdownContext {
  open: Ref<boolean>;
  triggerRef: Ref<HTMLElement | null>;
  setOpen: (open: boolean) => void;
  select: (value: string) => void;
}

export const dropdownContextKey: InjectionKey<ArchDropdownContext> = Symbol("ArchDropdown");
