export interface ArchComboboxOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface ArchComboboxProps {
  options: ArchComboboxOption[];
  modelValue?: string;
  searchValue?: string;
  placeholder?: string;
  disabled?: boolean;
  clearable?: boolean;
  loading?: boolean;
  loadingText?: string;
  emptyText?: string;
  errorText?: string;
  name?: string;
  autocomplete?: string;
  ariaLabel?: string;
  ariaLabelledby?: string;
  ariaDescribedby?: string;
}
