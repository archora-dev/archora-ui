<script setup lang="ts">
import { ref } from "vue";
import {
  ArchBadge,
  ArchButton,
  ArchDataTable,
  ArchRiskScore,
  ArchSegmentedControl,
  ArchStat,
  ArchTimeline
} from "@archora/ui";
import type { ArchSeverity } from "@archora/ui";

const range = ref("7d");
const rangeOptions = [
  { value: "24h", label: "24h" },
  { value: "7d", label: "7d" },
  { value: "30d", label: "30d" }
];

const columns = [
  { key: "service", label: "Service", sortable: true, minWidth: "11rem" },
  { key: "owner", label: "Owner" },
  { key: "status", label: "Status" },
  { key: "risk", label: "Risk" },
  { key: "p95", label: "p95", align: "end" as const, sortable: true, width: "6rem" }
];

const rows = [
  {
    id: "console",
    service: "Console",
    owner: "Platform",
    status: "Healthy",
    severity: "low",
    risk: 18,
    p95: "142ms"
  },
  {
    id: "billing",
    service: "Billing",
    owner: "Finance",
    status: "Watch",
    severity: "medium",
    risk: 54,
    p95: "318ms"
  },
  {
    id: "deploy",
    service: "Deploy",
    owner: "Release",
    status: "Degraded",
    severity: "high",
    risk: 77,
    p95: "612ms"
  },
  {
    id: "ingest",
    service: "Ingest",
    owner: "Data",
    status: "Healthy",
    severity: "low",
    risk: 12,
    p95: "96ms"
  },
  {
    id: "auth",
    service: "Auth",
    owner: "Security",
    status: "Watch",
    severity: "medium",
    risk: 41,
    p95: "204ms"
  }
];

const events = [
  {
    id: "1",
    title: "Deploy p95 crossed 600ms",
    description: "Release pipeline, eu-west",
    time: "09:41",
    tone: "danger" as const
  },
  { id: "2", title: "Auth latency back to baseline", time: "09:18", tone: "success" as const },
  {
    id: "3",
    title: "Billing marked Watch",
    description: "Error rate 0.9%",
    time: "08:52",
    tone: "warning" as const
  },
  { id: "4", title: "Ingest scaled to 12 workers", time: "08:30", tone: "info" as const }
];

function statusVariant(status: string) {
  if (status === "Healthy") return "success";
  if (status === "Watch") return "warning";
  return "danger";
}
</script>

<template>
  <section class="arch-dash" aria-label="Observability dashboard example">
    <header class="arch-dash__bar">
      <div>
        <h3 class="arch-dash__title">Platform · Observability</h3>
        <p class="arch-dash__sub">Production · eu-west · last {{ range }}</p>
      </div>
      <div class="arch-dash__bar-actions">
        <ArchSegmentedControl
          v-model="range"
          :options="rangeOptions"
          size="sm"
          aria-label="Time range"
        />
        <ArchButton variant="primary" size="sm">Open incident</ArchButton>
      </div>
    </header>

    <div class="arch-dash__stats">
      <ArchStat label="Uptime" value="99.98%" delta="+0.02%" delta-tone="positive" :progress="99" />
      <ArchStat
        label="Error rate"
        value="0.42%"
        delta="-0.11%"
        delta-tone="positive"
        :progress="42"
      />
      <ArchStat
        label="p95 latency"
        value="218ms"
        delta="+12ms"
        delta-tone="warning"
        :progress="58"
      />
      <ArchStat label="Open incidents" value="3" delta="+1" delta-tone="negative" :progress="30" />
    </div>

    <div class="arch-dash__grid">
      <ArchDataTable
        class="arch-dash__table"
        :columns="columns"
        :rows="rows"
        row-key="id"
        density="compact"
        sticky-header
      >
        <template #cell-status="{ value }">
          <ArchBadge :variant="statusVariant(String(value))" size="sm">{{ value }}</ArchBadge>
        </template>
        <template #cell-risk="{ row }">
          <ArchRiskScore
            :score="Number(row.risk)"
            :severity="row.severity as ArchSeverity"
            size="sm"
          />
        </template>
      </ArchDataTable>

      <aside class="arch-dash__side">
        <h4 class="arch-dash__side-title">Recent events</h4>
        <ArchTimeline :items="events" />
      </aside>
    </div>
  </section>
</template>

<style scoped>
.arch-dash {
  display: flex;
  flex-direction: column;
  gap: var(--arch-space-5);
  padding: var(--arch-space-6);
  border: 1px solid var(--arch-color-border);
  border-radius: var(--arch-radius-lg);
  background: var(--arch-color-surface);
  box-shadow: var(--arch-shadow-lg);
}

.arch-dash__bar {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--arch-space-4);
  flex-wrap: wrap;
}

.arch-dash__title {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: var(--arch-color-fg);
  border: 0;
  padding: 0;
  letter-spacing: 0;
}

.arch-dash__sub {
  margin: var(--arch-space-1) 0 0;
  font-size: 0.8125rem;
  color: var(--arch-color-fg-muted);
}

.arch-dash__bar-actions {
  display: flex;
  align-items: center;
  gap: var(--arch-space-3);
}

.arch-dash__stats {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: var(--arch-space-4);
}

.arch-dash__grid {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
  gap: var(--arch-space-4);
  align-items: start;
}

.arch-dash__side {
  padding: var(--arch-space-4);
  border: 1px solid var(--arch-color-border);
  border-radius: var(--arch-radius-md);
  background: var(--arch-color-surface-2);
}

.arch-dash__side-title {
  margin: 0 0 var(--arch-space-3);
  font-size: 0.8125rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--arch-color-fg-muted);
  border: 0;
  padding: 0;
}

@media (width <= 860px) {
  .arch-dash__stats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .arch-dash__grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
