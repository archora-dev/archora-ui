export interface ArchTabsItem {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ArchTabsProps {
  items: ArchTabsItem[];
  modelValue?: string;
  ariaLabel?: string;
}
