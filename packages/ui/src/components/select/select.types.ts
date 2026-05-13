export interface ArchSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ArchSelectProps {
  options: ArchSelectOption[];
  modelValue?: string;
  placeholder?: string;
  disabled?: boolean;
}
