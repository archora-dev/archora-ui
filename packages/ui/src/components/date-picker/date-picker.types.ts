export interface ArchDatePickerProps {
  modelValue?: string;
  placeholder?: string;
  min?: string;
  max?: string;
  disabled?: boolean;
}

export interface ArchDatePickerDay {
  date: string;
  day: number;
  inMonth: boolean;
  disabled: boolean;
}
