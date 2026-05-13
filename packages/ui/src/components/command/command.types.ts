export interface ArchCommandItem {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface ArchCommandProps {
  items: ArchCommandItem[];
  modelValue?: string;
  searchValue?: string;
  placeholder?: string;
  emptyText?: string;
  disabled?: boolean;
  ariaLabel?: string;
  ariaLabelledby?: string;
}
