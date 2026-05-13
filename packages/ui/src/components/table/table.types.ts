export interface ArchTableColumn {
  key: string;
  label: string;
  align?: "start" | "center" | "end";
}

export type ArchTableRow = Record<string, unknown>;

export interface ArchTableProps {
  columns: ArchTableColumn[];
  rows: ArchTableRow[];
  rowKey?: string;
  emptyText?: string;
  loading?: boolean;
  loadingText?: string;
}
