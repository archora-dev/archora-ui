export type ArchToastVariant = "info" | "success" | "warning" | "danger";

export interface ArchToastItem {
  id: string;
  title: string;
  description?: string;
  variant?: ArchToastVariant;
}

export type ArchToastInput = Omit<ArchToastItem, "id"> & { id?: string };
