export type ArchCardVariant = "elevated" | "outlined" | "subtle";
export type ArchCardPadding = "none" | "sm" | "md" | "lg";
export type ArchCardElement = "article" | "aside" | "div" | "section";

export interface ArchCardProps {
  as?: ArchCardElement;
  variant?: ArchCardVariant;
  padding?: ArchCardPadding;
}
