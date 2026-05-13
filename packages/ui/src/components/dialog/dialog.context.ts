import type { InjectionKey, Ref } from "vue";

export interface ArchDialogContext {
  open: Ref<boolean>;
  titleId: string;
  descriptionId: string;
  triggerRef: Ref<HTMLElement | null>;
  setOpen: (open: boolean) => void;
}

export const dialogContextKey: InjectionKey<ArchDialogContext> = Symbol("ArchDialog");
