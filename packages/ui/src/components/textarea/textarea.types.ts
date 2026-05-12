export type ArchTextareaSize = "sm" | "md" | "lg";
export type ArchTextareaResize = "none" | "vertical" | "horizontal" | "both";

export interface ArchTextareaProps {
  modelValue?: string;
  size?: ArchTextareaSize;
  resize?: ArchTextareaResize;
  rows?: number | string;
  placeholder?: string;
  name?: string;
  autocomplete?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  invalid?: boolean;
  ariaLabel?: string;
  ariaLabelledby?: string;
  ariaDescribedby?: string;
}
