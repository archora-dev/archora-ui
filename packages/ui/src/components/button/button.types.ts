export type ArchButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "danger"
  | "success"
  | "warning";

export type ArchButtonSize = "sm" | "md" | "lg";

export interface ArchButtonProps {
  variant?: ArchButtonVariant;
  size?: ArchButtonSize;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
  block?: boolean;
}
