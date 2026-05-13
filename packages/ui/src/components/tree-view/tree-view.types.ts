export interface ArchTreeViewItemData {
  id: string;
  label: string;
  children?: ArchTreeViewItemData[];
  icon?: string | object;
  expanded?: boolean;
}

export interface ArchTreeViewProps {
  items: ArchTreeViewItemData[];
}
