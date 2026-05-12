<script setup lang="ts">
import { computed } from "vue";
import { ArchButton, ArchCard, ArchTable } from "@archora/ui";
import MetricCard from "../components/MetricCard.vue";
import PageHeader from "../components/PageHeader.vue";
import PageSection from "../components/PageSection.vue";
import StatusBadge from "../components/StatusBadge.vue";
import { invoices } from "../data/demoData";

const invoiceColumns = [
  { key: "id", label: "Invoice" },
  { key: "date", label: "Date" },
  { key: "status", label: "Status" },
  { key: "amount", label: "Amount", align: "end" as const }
];

const invoiceRows = computed(
  () =>
    invoices.map((invoice) => ({
      ...invoice,
      date: invoice.date.replace(" 1,", ""),
      id: invoice.id.replace("INV-2026-", "INV-")
    })) as unknown as Record<string, unknown>[]
);
</script>

<template>
  <div class="view-stack">
    <PageHeader
      eyebrow="Billing"
      title="Plan and usage"
      description="A compact billing surface for plan state, usage, invoices, and upgrade motion."
    >
      <template #actions>
        <ArchButton>Upgrade plan</ArchButton>
      </template>
    </PageHeader>

    <div class="metric-grid">
      <MetricCard label="Seats used" value="12 / 20" delta="8 seats available" />
      <MetricCard label="Events" value="2.4M" delta="68% of included volume" tone="watch" />
      <MetricCard label="Storage" value="184 GB" delta="+18 GB this month" />
      <MetricCard label="Estimated bill" value="$240" delta="Renews Jun 1" />
    </div>

    <div class="dashboard-grid">
      <ArchCard class="plan-card" padding="lg">
        <template #header>
          <div class="card-title-row">
            <div>
              <h2>Pro workspace</h2>
              <p>Built for small product teams managing production systems.</p>
            </div>
            <StatusBadge status="active" />
          </div>
        </template>
        <div class="plan-price">$240 <span>/ month</span></div>
        <div class="demo-meter demo-meter--usage">
          <span class="demo-meter__label">Included events</span>
          <span
            class="demo-meter__track"
            role="progressbar"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow="68"
            aria-label="Included events usage"
          >
            <span class="demo-meter__fill" style="width: 68%" />
          </span>
          <strong class="demo-meter__value">68%</strong>
        </div>
        <div class="demo-meter demo-meter--usage">
          <span class="demo-meter__label">Build minutes</span>
          <span
            class="demo-meter__track"
            role="progressbar"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow="44"
            aria-label="Build minutes usage"
          >
            <span class="demo-meter__fill" style="width: 44%" />
          </span>
          <strong class="demo-meter__value">44%</strong>
        </div>
        <template #footer>
          <ArchButton variant="secondary">Manage plan</ArchButton>
          <ArchButton>Talk to sales</ArchButton>
        </template>
      </ArchCard>

      <PageSection title="Invoices" description="Billing history rendered with ArchTable.">
        <ArchCard class="billing-invoices" padding="md">
          <ArchTable :columns="invoiceColumns" :rows="invoiceRows" row-key="id">
            <template #cell-id="{ value }">
              <span class="invoice-id">{{ value }}</span>
            </template>
            <template #cell-status="{ value }">
              <StatusBadge :status="String(value)" />
            </template>
          </ArchTable>
        </ArchCard>
      </PageSection>
    </div>
  </div>
</template>
