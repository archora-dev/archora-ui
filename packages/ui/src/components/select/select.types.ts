export interface ArchSelectOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface ArchSelectProps {
  options: ArchSelectOption[];
  modelValue?: string;
  placeholder?: string;
  disabled?: boolean;
  clearable?: boolean;
  loading?: boolean;
  loadingText?: string;
  emptyText?: string;
  errorText?: string;
}
