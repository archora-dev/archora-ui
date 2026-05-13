export interface ArchTimelineItem {
  id: string;
  title: string;
  description?: string;
  time?: string;
  tone?: "neutral" | "info" | "success" | "warning" | "danger";
}
