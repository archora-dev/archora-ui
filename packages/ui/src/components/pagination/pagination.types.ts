export type ArchPaginationSize = "sm" | "md" | "lg";

export interface ArchPaginationProps {
  page?: number;
  pageCount: number;
  siblingCount?: number;
  boundaryCount?: number;
  size?: ArchPaginationSize;
  disabled?: boolean;
  showEdges?: boolean;
  previousLabel?: string;
  nextLabel?: string;
}
