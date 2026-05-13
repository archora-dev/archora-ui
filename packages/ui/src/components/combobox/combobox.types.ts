export interface ArchComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ArchComboboxProps {
  options: ArchComboboxOption[];
  modelValue?: string;
  searchValue?: string;
  placeholder?: string;
  disabled?: boolean;
  name?: string;
  autocomplete?: string;
  ariaLabel?: string;
  ariaLabelledby?: string;
  ariaDescribedby?: string;
}
