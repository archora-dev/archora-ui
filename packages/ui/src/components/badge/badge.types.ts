export type ArchBadgeVariant = "neutral" | "primary" | "success" | "warning" | "danger" | "info";
export type ArchBadgeSize = "sm" | "md";
export type ArchBadgeElement = "span" | "strong";

export interface ArchBadgeProps {
  as?: ArchBadgeElement;
  variant?: ArchBadgeVariant;
  size?: ArchBadgeSize;
}
