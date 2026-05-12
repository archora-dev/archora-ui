export type ArchTooltipPlacement = "top" | "right" | "bottom" | "left";

export interface ArchTooltipProps {
  content: string;
  placement?: ArchTooltipPlacement;
}
