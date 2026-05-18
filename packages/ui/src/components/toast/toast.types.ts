export type ArchToastVariant = "info" | "success" | "warning" | "danger";

export interface ArchToastAction {
  label: string;
  onClick: () => void;
  dismiss?: boolean;
}

export interface ArchToastItem {
  id: string;
  title: string;
  description?: string;
  variant?: ArchToastVariant;
  duration?: number;
  actions?: readonly ArchToastAction[];
}

export type ArchToastInput = Omit<ArchToastItem, "id"> & { id?: string };
