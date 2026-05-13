export type ArchInputSize = "sm" | "md" | "lg";

export type ArchInputType = "email" | "number" | "password" | "search" | "tel" | "text" | "url";

export interface ArchInputProps {
  modelValue?: string | number;
  type?: ArchInputType;
  size?: ArchInputSize;
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
