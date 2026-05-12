<script setup lang="ts">
import { computed } from "vue";
import { ArchAlert, ArchButton, ArchCard, ArchTable } from "@archora/ui";
import MetricCard from "../components/MetricCard.vue";
import PageHeader from "../components/PageHeader.vue";
import PageSection from "../components/PageSection.vue";
import StatusBadge from "../components/StatusBadge.vue";
import { activities, deployments, projects } from "../data/demoData";

const healthAverage = computed(() =>
  Math.round(projects.reduce((total, project) => total + project.health, 0) / projects.length)
);

const deploymentColumns = [
  { key: "project", label: "Project" },
  { key: "environment", label: "Env" },
  { key: "status", label: "Status" },
  { key: "duration", label: "Duration", align: "end" as const }
];

const deploymentRows = computed(() => deployments as unknown as Record<string, unknown>[]);
</script>

<template>
  <div class="view-stack">
    <PageHeader
      eyebrow="Overview"
      title="Operational command center"
      description="A compact view of workspace health, releases, activity, and system signals."
    >
      <template #actions>
        <ArchButton variant="secondary">Export report</ArchButton>
        <ArchButton>New release</ArchButton>
      </template>
    </PageHeader>

    <div class="metric-grid">
      <MetricCard label="Project health" :value="`${healthAverage}%`" delta="+4.2% this week" />
      <MetricCard label="Live deployments" value="18" delta="4 shipped today" />
      <MetricCard label="Open incidents" value="1" delta="Observability degraded" tone="danger" />
      <MetricCard label="Team activity" value="42" delta="12 privileged actions" tone="watch" />
    </div>

    <div class="overview-grid">
      <ArchCard class="health-card" padding="lg">
        <template #header>
          <div class="card-title-row">
            <div>
              <h2>Project health</h2>
              <p>Weighted signal from deployments, alerts, and runtime errors.</p>
            </div>
            <StatusBadge status="healthy" />
          </div>
        </template>
        <div
          class="health-ring"
          role="img"
          :aria-label="`Workspace health score ${healthAverage} out of 100`"
          :style="{ '--health-score': healthAverage }"
        >
          <svg class="health-ring__svg" viewBox="0 0 120 120" aria-hidden="true">
            <circle class="health-ring__track" cx="60" cy="60" r="48" pathLength="100" />
            <circle
              class="health-ring__fill"
              cx="60"
              cy="60"
              r="48"
              pathLength="100"
              :stroke-dasharray="`${healthAverage} 100`"
            />
          </svg>
          <div class="health-ring__core">
            <span>{{ healthAverage }}</span>
            <small>/100</small>
          </div>
        </div>
        <div class="health-bars">
          <div
            v-for="project in projects.slice(0, 4)"
            :key="project.id"
            class="demo-meter demo-meter--health"
          >
            <span class="demo-meter__label">{{ project.name }}</span>
            <span
              class="demo-meter__track"
              role="progressbar"
              aria-valuemin="0"
              aria-valuemax="100"
              :aria-valuenow="project.health"
              :aria-label="`${project.name} health`"
            >
              <span class="demo-meter__fill" :style="{ width: `${project.health}%` }" />
            </span>
            <strong class="demo-meter__value">{{ project.health }}%</strong>
          </div>
        </div>
      </ArchCard>

      <ArchCard padding="lg">
        <template #header>
          <div class="card-title-row">
            <div>
              <h2>Recent activity</h2>
              <p>High-signal actions from the last few hours.</p>
            </div>
          </div>
        </template>
        <ol class="activity-list">
          <li v-for="activity in activities" :key="activity.id">
            <span class="activity-dot" />
            <div>
              <strong>{{ activity.actor }}</strong>
              {{ activity.action }}
              <strong>{{ activity.target }}</strong>
              <small>{{ activity.time }}</small>
            </div>
          </li>
        </ol>
      </ArchCard>
    </div>

    <PageSection
      title="Deployments"
      description="Recent deployment states with empty/loading/error examples nearby."
    >
      <div class="dashboard-grid">
        <ArchCard class="wide-card" padding="md">
          <ArchTable
            :columns="deploymentColumns"
            :rows="deploymentRows"
            row-key="id"
            empty-text="No deployments match this filter"
          >
            <template #cell-status="{ value }">
              <StatusBadge :status="String(value)" />
            </template>
          </ArchTable>
        </ArchCard>

        <div class="state-stack">
          <ArchAlert variant="warning" title="Observability is degraded" role="status">
            Error budgets are protected, but traces from sin1 are delayed.
          </ArchAlert>
          <ArchCard padding="md">
            <div class="empty-state">
              <strong>No blocked approvals</strong>
              <p>Release checks are clear for production projects.</p>
            </div>
          </ArchCard>
          <ArchCard padding="md">
            <div class="loading-state">
              <span />
              <span />
              <span />
            </div>
          </ArchCard>
        </div>
      </div>
    </PageSection>
  </div>
</template>
