<script setup lang="ts">
import { computed, ref } from "vue";
import {
  ArchButton,
  ArchCard,
  ArchCombobox,
  ArchDataTable,
  ArchDialog,
  ArchDialogContent,
  ArchDialogDescription,
  ArchDialogFooter,
  ArchDialogHeader,
  ArchDialogTitle,
  ArchFormField,
  ArchInput,
  ArchSelect
} from "@archora/ui";
import PageHeader from "../components/PageHeader.vue";
import PageSection from "../components/PageSection.vue";
import StatusBadge from "../components/StatusBadge.vue";
import { projectOptions, roleOptions, users } from "../data/demoData";

const query = ref("");
const roleFilter = ref("all");
const inviteOpen = ref(false);
const inviteEmail = ref("");
const inviteRole = ref("Engineer");
const inviteProject = ref("arc-console");
const submitted = ref(false);

const columns = [
  { key: "name", label: "Member", sortable: true },
  { key: "role", label: "Role", sortable: true },
  { key: "status", label: "Status", sortable: true },
  { key: "lastSeen", label: "Last seen", sortable: true, align: "end" as const }
];

const roleFilters = [{ value: "all", label: "All roles" }, ...roleOptions];

const filteredUsers = computed(() =>
  users.filter((user) => {
    const matchesQuery =
      user.name.toLowerCase().includes(query.value.toLowerCase()) ||
      user.email.toLowerCase().includes(query.value.toLowerCase());
    const matchesRole = roleFilter.value === "all" || user.role === roleFilter.value;

    return matchesQuery && matchesRole;
  })
);

const userRows = computed(() => filteredUsers.value as unknown as Record<string, unknown>[]);

const emailError = computed(() => {
  if (!submitted.value) {
    return "";
  }

  if (!inviteEmail.value.trim()) {
    return "Email is required.";
  }

  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(inviteEmail.value)) {
    return "Use a valid work email.";
  }

  return "";
});

function submitInvite() {
  submitted.value = true;

  if (emailError.value) {
    return;
  }

  inviteOpen.value = false;
  inviteEmail.value = "";
  submitted.value = false;
}
</script>

<template>
  <div class="view-stack">
    <PageHeader
      eyebrow="Team"
      title="Members and access"
      description="A focused internal-tool workflow for roles, status, invite validation, and project scoping."
    >
      <template #actions>
        <ArchButton @click="inviteOpen = true">Invite user</ArchButton>
      </template>
    </PageHeader>

    <PageSection title="Team directory" description="Filter people by name, email, or role.">
      <ArchCard padding="md">
        <div class="table-toolbar table-toolbar--filters table-toolbar--team">
          <ArchFormField class="table-toolbar__search" label="Search team">
            <template #default="{ id, describedby }">
              <ArchInput
                :id="id"
                v-model="query"
                :aria-describedby="describedby"
                placeholder="Search people"
              />
            </template>
          </ArchFormField>
          <ArchFormField class="table-toolbar__control" label="Role">
            <template #default>
              <ArchSelect v-model="roleFilter" :options="roleFilters" />
            </template>
          </ArchFormField>
        </div>

        <ArchDataTable
          :columns="columns"
          :rows="userRows"
          row-key="id"
          empty-text="No users match this filter"
        >
          <template #cell-name="{ row }">
            <div class="member-cell">
              <span>{{ String(row.name).slice(0, 1) }}</span>
              <div>
                <strong>{{ row.name }}</strong>
                <small>{{ row.email }}</small>
              </div>
            </div>
          </template>
          <template #cell-status="{ value }">
            <StatusBadge :status="String(value)" />
          </template>
        </ArchDataTable>
      </ArchCard>
    </PageSection>

    <ArchDialog v-model:open="inviteOpen">
      <ArchDialogContent>
        <ArchDialogHeader>
          <ArchDialogTitle>Invite teammate</ArchDialogTitle>
          <ArchDialogDescription>
            Grant access to a workspace area with a clear role and project scope.
          </ArchDialogDescription>
        </ArchDialogHeader>

        <div class="form-stack">
          <ArchFormField label="Work email" :error="emailError" required>
            <template #default="{ id, describedby, invalid }">
              <ArchInput
                :id="id"
                v-model="inviteEmail"
                :aria-describedby="describedby"
                :invalid="invalid"
                placeholder="name@company.com"
              />
            </template>
          </ArchFormField>
          <ArchFormField
            label="Role"
            description="Roles can be changed after the invite is accepted."
          >
            <template #default>
              <ArchSelect v-model="inviteRole" :options="roleOptions" />
            </template>
          </ArchFormField>
          <ArchFormField label="Project scope">
            <template #default>
              <ArchCombobox
                v-model="inviteProject"
                :options="projectOptions"
                placeholder="Choose project"
              />
            </template>
          </ArchFormField>
        </div>

        <ArchDialogFooter>
          <ArchButton variant="secondary" @click="inviteOpen = false">Cancel</ArchButton>
          <ArchButton @click="submitInvite">Send invite</ArchButton>
        </ArchDialogFooter>
      </ArchDialogContent>
    </ArchDialog>
  </div>
</template>
