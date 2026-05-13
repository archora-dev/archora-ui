export type ArchStepStatus = "complete" | "current" | "pending" | "error";

export interface ArchStepItem {
  id: string;
  label: string;
  description?: string;
  status?: ArchStepStatus;
  disabled?: boolean;
}
