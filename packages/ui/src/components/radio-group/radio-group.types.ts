export type ArchRadioGroupOrientation = "horizontal" | "vertical";
export type ArchRadioGroupSize = "sm" | "md" | "lg";

export interface ArchRadioGroupOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface ArchRadioGroupProps {
  options: ArchRadioGroupOption[];
  modelValue?: string;
  name?: string;
  orientation?: ArchRadioGroupOrientation;
  size?: ArchRadioGroupSize;
  disabled?: boolean;
  required?: boolean;
  invalid?: boolean;
  ariaLabel?: string;
  ariaLabelledby?: string;
}
