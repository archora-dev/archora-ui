export type ArchKbdSize = "sm" | "md" | "lg";
export type ArchKbdVariant = "default" | "subtle" | "outline";
export type ArchKbdElement = "kbd" | "span";

export interface ArchKbdProps {
  as?: ArchKbdElement;
  size?: ArchKbdSize;
  variant?: ArchKbdVariant;
}
