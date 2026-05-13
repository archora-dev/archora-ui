export type ArchButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "danger"
  | "success"
  | "warning";

export type ArchButtonSize = "sm" | "md" | "lg";
export type ArchButtonShape = "pill" | "rounded" | "square";
export type ArchButtonJustify = "center" | "start" | "between";

export interface ArchButtonProps {
  variant?: ArchButtonVariant;
  size?: ArchButtonSize;
  shape?: ArchButtonShape;
  justify?: ArchButtonJustify;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
  block?: boolean;
}
