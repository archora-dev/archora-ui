export interface ArchDataTableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  align?: "start" | "center" | "end";
}

export type ArchDataTableRow = Record<string, unknown>;
export type ArchDataTableSortDirection = "asc" | "desc";

export interface ArchDataTableProps {
  columns: ArchDataTableColumn[];
  rows: ArchDataTableRow[];
  rowKey?: string;
  selectedKeys?: Array<string | number>;
  sortBy?: string;
  sortDirection?: ArchDataTableSortDirection;
  selectable?: boolean;
  loading?: boolean;
  emptyText?: string;
  loadingText?: string;
}
