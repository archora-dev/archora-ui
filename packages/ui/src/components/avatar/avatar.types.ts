export interface ArchAvatarProps {
  /** Image URL */
  src?: string;
  /** Text for the alt attribute */
  alt?: string;
  /** Fallback text, usually initials, shown when the image fails to load */
  fallback?: string;
  /** Avatar size */
  size?: "sm" | "md" | "lg" | "xl";
}
