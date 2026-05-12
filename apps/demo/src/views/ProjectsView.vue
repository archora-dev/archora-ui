<script setup lang="ts">
import { computed, ref } from "vue";
import {
  ArchButton,
  ArchCard,
  ArchDataTable,
  ArchDatePicker,
  ArchDialog,
  ArchDialogContent,
  ArchDialogDescription,
  ArchDialogHeader,
  ArchDialogTitle,
  ArchDropdown,
  ArchDropdownContent,
  ArchDropdownItem,
  ArchDropdownTrigger,
  ArchFormField,
  ArchInput,
  ArchSelect
} from "@archora/ui";
import PageHeader from "../components/PageHeader.vue";
import PageSection from "../components/PageSection.vue";
import StatusBadge from "../components/StatusBadge.vue";
import { projects } from "../data/demoData";
import type { Project, ProjectStatus } from "../data/demoData";

const query = ref("");
const statusFilter = ref("all");
const selectedKeys = ref<Array<string | number>>(["arc-console"]);
const detailProject = ref<Project | null>(null);
const releaseDate = ref("2026-05-16");
const sortBy = ref("name");
const sortDirection = ref<"asc" | "desc">("asc");

const statusOptions = [
  { value: "all", label: "All statuses" },
  { value: "healthy", label: "Healthy" },
  { value: "watch", label: "Watch" },
  { value: "incident", label: "Incident" },
  { value: "paused", label: "Paused" }
];

const columns = [
  { key: "name", label: "Project", sortable: true },
  { key: "owner", label: "Owner", sortable: true },
  { key: "status", label: "Status", sortable: true },
  { key: "region", label: "Region", sortable: true },
  { key: "health", label: "Health", sortable: true, align: "end" as const },
  { key: "updated", label: "Updated", sortable: true },
  { key: "actions", label: "", align: "end" as const }
];

const filteredProjects = computed(() =>
  projects.filter((project) => {
    const matchesQuery =
      project.name.toLowerCase().includes(query.value.toLowerCase()) ||
      project.owner.toLowerCase().includes(query.value.toLowerCase());
    const matchesStatus = statusFilter.value === "all" || project.status === statusFilter.value;

    return matchesQuery && matchesStatus;
  })
);

const projectRows = computed(() => filteredProjects.value as unknown as Record<string, unknown>[]);

function openProject(row: Record<string, unknown>) {
  detailProject.value = projects.find((project) => project.id === row.id) ?? null;
}

function chooseAction(value: string) {
  const [action, projectId] = value.split(":");
  const project = projects.find((item) => item.id === projectId);

  if (action === "open" && project) {
    detailProject.value = project;
  }
}

function statusCopy(status: ProjectStatus) {
  const map = {
    healthy: "All release and runtime signals are within policy.",
    watch: "One signal needs attention before the next production release.",
    incident: "The project has an active operational incident.",
    paused: "Automated deployment is paused for this project."
  };

  return map[status];
}
</script>

<template>
  <div class="view-stack">
    <PageHeader
      eyebrow="Projects"
      title="Project inventory"
      description="Search, filter, select, and inspect projects using Archora table primitives."
    >
      <template #actions>
        <ArchButton variant="secondary">Import project</ArchButton>
        <ArchButton>Create project</ArchButton>
      </template>
    </PageHeader>

    <PageSection
      title="Projects"
      description="A real data-table surface with sorting, selection, filters, and actions."
    >
      <ArchCard padding="md">
        <div class="table-toolbar table-toolbar--filters table-toolbar--projects">
          <ArchFormField class="table-toolbar__search" label="Search projects">
            <template #default="{ id, describedby }">
              <ArchInput
                :id="id"
                v-model="query"
                :aria-describedby="describedby"
                placeholder="Search by name or owner"
              />
            </template>
          </ArchFormField>
          <ArchFormField class="table-toolbar__control" label="Status">
            <template #default>
              <ArchSelect v-model="statusFilter" :options="statusOptions" />
            </template>
          </ArchFormField>
          <ArchFormField
            class="table-toolbar__control table-toolbar__control--date"
            label="Next release"
          >
            <template #default>
              <ArchDatePicker v-model="releaseDate" min="2026-05-10" max="2026-06-30" />
            </template>
          </ArchFormField>
        </div>

        <ArchDataTable
          v-model:selected-keys="selectedKeys"
          v-model:sort-by="sortBy"
          v-model:sort-direction="sortDirection"
          :columns="columns"
          :rows="projectRows"
          row-key="id"
          selectable
          empty-text="No projects match the current filters"
          @row-click="openProject"
        >
          <template #cell-name="{ row }">
            <div class="primary-cell">
              <strong>{{ row.name }}</strong>
              <span>{{ row.description }}</span>
            </div>
          </template>
          <template #cell-status="{ value }">
            <StatusBadge :status="String(value)" />
          </template>
          <template #cell-health="{ value }">
            <strong>{{ value }}%</strong>
          </template>
          <template #cell-actions="{ row }">
            <ArchDropdown @select="chooseAction">
              <ArchDropdownTrigger>Manage</ArchDropdownTrigger>
              <ArchDropdownContent>
                <ArchDropdownItem :value="`open:${row.id}`">Open details</ArchDropdownItem>
                <ArchDropdownItem :value="`deploy:${row.id}`">Queue deployment</ArchDropdownItem>
                <ArchDropdownItem :value="`pause:${row.id}`">Pause automation</ArchDropdownItem>
              </ArchDropdownContent>
            </ArchDropdown>
          </template>
        </ArchDataTable>
      </ArchCard>
    </PageSection>

    <ArchDialog :open="Boolean(detailProject)" @update:open="detailProject = null">
      <ArchDialogContent>
        <ArchDialogHeader>
          <ArchDialogTitle>{{ detailProject?.name }}</ArchDialogTitle>
          <ArchDialogDescription>{{ detailProject?.description }}</ArchDialogDescription>
        </ArchDialogHeader>
        <div v-if="detailProject" class="detail-panel">
          <StatusBadge :status="detailProject.status" />
          <p>{{ statusCopy(detailProject.status) }}</p>
          <dl>
            <div>
              <dt>Owner</dt>
              <dd>{{ detailProject.owner }}</dd>
            </div>
            <div>
              <dt>Region</dt>
              <dd>{{ detailProject.region }}</dd>
            </div>
            <div>
              <dt>Release</dt>
              <dd>{{ detailProject.release }}</dd>
            </div>
            <div>
              <dt>Health</dt>
              <dd>{{ detailProject.health }}%</dd>
            </div>
          </dl>
        </div>
      </ArchDialogContent>
    </ArchDialog>
  </div>
</template>
