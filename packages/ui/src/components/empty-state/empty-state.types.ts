export type ArchEmptyStateAlign = "start" | "center";
export type ArchEmptyStateSize = "sm" | "md" | "lg";
export type ArchEmptyStateVariant = "plain" | "subtle" | "outlined";

export interface ArchEmptyStateProps {
  title?: string;
  description?: string;
  align?: ArchEmptyStateAlign;
  size?: ArchEmptyStateSize;
  variant?: ArchEmptyStateVariant;
}
