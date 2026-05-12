export type ProjectStatus = "healthy" | "watch" | "incident" | "paused";
export type DeploymentStatus = "live" | "queued" | "building" | "failed";
export type UserStatus = "active" | "invited" | "suspended";

export interface Project {
  id: string;
  name: string;
  owner: string;
  status: ProjectStatus;
  region: string;
  release: string;
  health: number;
  updated: string;
  description: string;
}

export interface TeamUser {
  id: string;
  name: string;
  email: string;
  role: "Owner" | "Admin" | "Engineer" | "Designer" | "Viewer";
  status: UserStatus;
  lastSeen: string;
}

export interface Deployment {
  id: string;
  project: string;
  status: DeploymentStatus;
  environment: "Production" | "Preview" | "Staging";
  commit: string;
  duration: string;
  startedAt: string;
}

export interface Activity {
  id: string;
  actor: string;
  action: string;
  target: string;
  time: string;
}

export interface Invoice {
  id: string;
  date: string;
  amount: string;
  status: "Paid" | "Open";
}

export const projects: Project[] = [
  {
    id: "arc-console",
    name: "Console",
    owner: "Platform",
    status: "healthy",
    region: "iad1",
    release: "2026.05.10",
    health: 98,
    updated: "8 min ago",
    description: "Admin surface for customer workspaces and release operations."
  },
  {
    id: "arc-runtime",
    name: "Runtime API",
    owner: "Core Services",
    status: "watch",
    region: "fra1",
    release: "2026.05.09",
    health: 84,
    updated: "24 min ago",
    description: "Request routing, event ingestion, and service orchestration."
  },
  {
    id: "arc-billing",
    name: "Billing",
    owner: "Revenue",
    status: "healthy",
    region: "iad1",
    release: "2026.05.08",
    health: 93,
    updated: "1 hr ago",
    description: "Plans, usage metering, invoices, and account entitlements."
  },
  {
    id: "arc-observe",
    name: "Observability",
    owner: "Infra",
    status: "incident",
    region: "sin1",
    release: "2026.05.07",
    health: 61,
    updated: "3 min ago",
    description: "Telemetry pipeline and internal health reporting."
  },
  {
    id: "arc-labs",
    name: "Labs",
    owner: "Product",
    status: "paused",
    region: "sfo1",
    release: "2026.04.30",
    health: 72,
    updated: "5 days ago",
    description: "Experimental surfaces for workflow and analytics prototypes."
  }
];

export const users: TeamUser[] = [
  {
    id: "u-01",
    name: "Maya Chen",
    email: "maya@archora.dev",
    role: "Owner",
    status: "active",
    lastSeen: "Now"
  },
  {
    id: "u-02",
    name: "Ilya Morozov",
    email: "ilya@archora.dev",
    role: "Admin",
    status: "active",
    lastSeen: "12 min ago"
  },
  {
    id: "u-03",
    name: "Nora Patel",
    email: "nora@archora.dev",
    role: "Engineer",
    status: "active",
    lastSeen: "42 min ago"
  },
  {
    id: "u-04",
    name: "Jon Bell",
    email: "jon@archora.dev",
    role: "Designer",
    status: "invited",
    lastSeen: "Pending"
  },
  {
    id: "u-05",
    name: "Elena Vargas",
    email: "elena@archora.dev",
    role: "Viewer",
    status: "suspended",
    lastSeen: "Apr 28"
  }
];

export const deployments: Deployment[] = [
  {
    id: "dep-4192",
    project: "Console",
    status: "live",
    environment: "Production",
    commit: "7f4c2a1",
    duration: "1m 18s",
    startedAt: "10:42"
  },
  {
    id: "dep-4191",
    project: "Runtime API",
    status: "building",
    environment: "Staging",
    commit: "9ad381e",
    duration: "38s",
    startedAt: "10:39"
  },
  {
    id: "dep-4190",
    project: "Observability",
    status: "failed",
    environment: "Preview",
    commit: "1bc8f52",
    duration: "2m 04s",
    startedAt: "10:21"
  },
  {
    id: "dep-4189",
    project: "Billing",
    status: "queued",
    environment: "Production",
    commit: "d21a507",
    duration: "Queued",
    startedAt: "10:18"
  }
];

export const activities: Activity[] = [
  {
    id: "act-1",
    actor: "Maya Chen",
    action: "approved release",
    target: "Console 2026.05.10",
    time: "8 min ago"
  },
  {
    id: "act-2",
    actor: "Runtime API",
    action: "entered watch state in",
    target: "fra1",
    time: "24 min ago"
  },
  {
    id: "act-3",
    actor: "Nora Patel",
    action: "rotated access token for",
    target: "Observability",
    time: "1 hr ago"
  },
  {
    id: "act-4",
    actor: "Ilya Morozov",
    action: "changed retention policy for",
    target: "Audit logs",
    time: "2 hrs ago"
  }
];

export const invoices: Invoice[] = [
  { id: "INV-2026-0501", date: "May 1, 2026", amount: "$240.00", status: "Paid" },
  { id: "INV-2026-0401", date: "Apr 1, 2026", amount: "$218.40", status: "Paid" },
  { id: "INV-2026-0301", date: "Mar 1, 2026", amount: "$205.20", status: "Paid" }
];

export const commandItems = [
  { value: "overview", label: "Open overview", description: "Workspace health and deployments" },
  { value: "projects", label: "Open projects", description: "Project inventory and ownership" },
  { value: "team", label: "Open team", description: "Members, roles, and invites" },
  { value: "settings", label: "Open settings", description: "Workspace preferences" },
  { value: "billing", label: "Open billing", description: "Plan, usage, and invoices" }
];

export const roleOptions = [
  { value: "Owner", label: "Owner" },
  { value: "Admin", label: "Admin" },
  { value: "Engineer", label: "Engineer" },
  { value: "Designer", label: "Designer" },
  { value: "Viewer", label: "Viewer" }
];

export const projectOptions = projects.map((project) => ({
  value: project.id,
  label: project.name
}));
