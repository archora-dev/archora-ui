export type ArchAlertVariant = "info" | "success" | "warning" | "danger";

export interface ArchAlertProps {
  variant?: ArchAlertVariant;
  title?: string;
  role?: "alert" | "status";
}
