export type ArchDrawerSide = "left" | "right" | "top" | "bottom";
export type ArchDrawerSize = "sm" | "md" | "lg" | "full";

export interface ArchDrawerProps {
  open?: boolean;
  side?: ArchDrawerSide;
  size?: ArchDrawerSize;
  title?: string;
  description?: string;
  closeOnEscape?: boolean;
  closeOnOverlay?: boolean;
  showClose?: boolean;
  modal?: boolean;
  stickyFooter?: boolean;
  resizable?: boolean;
}
