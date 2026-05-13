export interface ArchFormFieldProps {
  id?: string;
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
  invalid?: boolean;
}

export interface ArchFormFieldSlotProps {
  id: string;
  describedby: string | undefined;
  invalid: boolean;
  required: boolean;
}
