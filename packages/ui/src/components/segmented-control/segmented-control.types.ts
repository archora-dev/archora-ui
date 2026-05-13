export type ArchSegmentedControlSize = "sm" | "md" | "lg";
export type ArchSegmentedControlVariant = "solid" | "outline" | "ghost";

export interface ArchSegmentedControlOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ArchSegmentedControlProps {
  options: ArchSegmentedControlOption[];
  modelValue?: string;
  size?: ArchSegmentedControlSize;
  variant?: ArchSegmentedControlVariant;
  disabled?: boolean;
  fullWidth?: boolean;
  ariaLabel?: string;
  ariaLabelledby?: string;
}
