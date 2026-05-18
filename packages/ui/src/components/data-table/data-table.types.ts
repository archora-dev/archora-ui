export interface ArchDataTableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  align?: "start" | "center" | "end";
  hidden?: boolean;
  hideable?: boolean;
  width?: string;
  minWidth?: string;
}

export type ArchDataTableRow = Record<string, unknown>;
export type ArchDataTableSortDirection = "asc" | "desc";
export type ArchDataTableDensity = "compact" | "comfortable";

export interface ArchDataTableProps {
  columns: ArchDataTableColumn[];
  rows: ArchDataTableRow[];
  rowKey?: string;
  selectedKeys?: Array<string | number>;
  visibleColumnKeys?: string[];
  sortBy?: string;
  sortDirection?: ArchDataTableSortDirection;
  page?: number;
  pageSize?: number;
  selectable?: boolean;
  loading?: boolean;
  errorText?: string;
  emptyText?: string;
  loadingText?: string;
  density?: ArchDataTableDensity;
  stickyHeader?: boolean;
}
