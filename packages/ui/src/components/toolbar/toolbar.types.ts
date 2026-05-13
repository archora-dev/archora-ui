export type ArchToolbarOrientation = "horizontal" | "vertical";
export type ArchToolbarDensity = "compact" | "cozy" | "comfortable";
export type ArchToolbarVariant = "plain" | "subtle" | "outlined";

export interface ArchToolbarProps {
  orientation?: ArchToolbarOrientation;
  density?: ArchToolbarDensity;
  variant?: ArchToolbarVariant;
  wrap?: boolean;
  ariaLabel?: string;
  ariaLabelledby?: string;
}
