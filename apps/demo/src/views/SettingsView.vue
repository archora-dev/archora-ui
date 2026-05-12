<script setup lang="ts">
import { ref } from "vue";
import {
  ArchAlert,
  ArchButton,
  ArchCard,
  ArchCheckbox,
  ArchFormField,
  ArchInput,
  ArchSelect,
  ArchSwitch,
  ArchTabs,
  ArchTextarea,
  useToast
} from "@archora/ui";
import PageHeader from "../components/PageHeader.vue";
import PageSection from "../components/PageSection.vue";

const toast = useToast();
const activeTab = ref("workspace");
const workspaceName = ref("Northstar Labs");
const slug = ref("northstar");
const region = ref("iad1");
const notes = ref("Production releases require review from Platform or Core Services.");
const auditLogs = ref(true);
const releaseApprovals = ref(true);
const weeklyDigest = ref(false);
const dangerAccepted = ref(false);

const tabs = [
  { value: "workspace", label: "Workspace" },
  { value: "security", label: "Security" },
  { value: "danger", label: "Danger zone" }
];

const regionOptions = [
  { value: "iad1", label: "Washington, D.C." },
  { value: "fra1", label: "Frankfurt" },
  { value: "sin1", label: "Singapore" },
  { value: "sfo1", label: "San Francisco" }
];

function saveSettings() {
  toast.show({
    title: "Settings saved",
    description: "Workspace preferences were updated for the demo session.",
    variant: "success"
  });
}
</script>

<template>
  <div class="view-stack">
    <PageHeader
      eyebrow="Settings"
      title="Workspace settings"
      description="Project preferences, theme controls, switches, form fields, and a guarded destructive action."
    >
      <template #actions>
        <ArchButton variant="secondary">Reset</ArchButton>
        <ArchButton @click="saveSettings">Save changes</ArchButton>
      </template>
    </PageHeader>

    <PageSection>
      <ArchCard padding="lg">
        <ArchTabs v-model="activeTab" :items="tabs" aria-label="Settings sections" />

        <div v-if="activeTab === 'workspace'" class="settings-grid">
          <div class="form-stack">
            <ArchFormField
              label="Workspace name"
              description="Shown across the console and invoices."
            >
              <template #default="{ id, describedby }">
                <ArchInput :id="id" v-model="workspaceName" :aria-describedby="describedby" />
              </template>
            </ArchFormField>
            <ArchFormField label="Workspace slug">
              <template #default="{ id }">
                <ArchInput :id="id" v-model="slug" />
              </template>
            </ArchFormField>
            <ArchFormField label="Primary region">
              <template #default>
                <ArchSelect v-model="region" :options="regionOptions" />
              </template>
            </ArchFormField>
            <ArchFormField label="Release notes policy">
              <template #default="{ id, describedby }">
                <ArchTextarea
                  :id="id"
                  v-model="notes"
                  :aria-describedby="describedby"
                  :rows="5"
                  resize="vertical"
                />
              </template>
            </ArchFormField>
          </div>

          <ArchCard variant="outlined" padding="md">
            <h2>Theme</h2>
            <p>
              Archora Console is dark-first, with restrained light surfaces for documentation use.
            </p>
            <div class="theme-options">
              <button
                type="button"
                class="theme-swatch theme-swatch--dark"
                aria-label="Dark theme"
              />
              <button type="button" class="theme-swatch theme-swatch--dim" aria-label="Dim theme" />
              <button
                type="button"
                class="theme-swatch theme-swatch--light"
                aria-label="Light theme"
              />
            </div>
          </ArchCard>
        </div>

        <div v-else-if="activeTab === 'security'" class="settings-grid">
          <div class="toggle-list">
            <label>
              <span>
                <strong>Audit logs</strong>
                <small>Retain privileged workspace actions for 180 days.</small>
              </span>
              <ArchSwitch v-model="auditLogs" aria-label="Toggle audit logs" />
            </label>
            <label>
              <span>
                <strong>Release approvals</strong>
                <small>Require two maintainers for production deploys.</small>
              </span>
              <ArchSwitch v-model="releaseApprovals" aria-label="Toggle release approvals" />
            </label>
            <label>
              <span>
                <strong>Weekly digest</strong>
                <small>Send workspace health summaries every Monday.</small>
              </span>
              <ArchSwitch v-model="weeklyDigest" aria-label="Toggle weekly digest" />
            </label>
          </div>
          <ArchAlert variant="info" title="Security posture" role="status">
            Demo controls are local-only and show how Archora UI reads in a dense admin workflow.
          </ArchAlert>
        </div>

        <div v-else class="settings-grid">
          <ArchCard class="danger-card" variant="outlined" padding="lg">
            <h2>Delete workspace</h2>
            <p>
              This action is intentionally guarded. In a production console it would require owner
              confirmation and an audit event.
            </p>
            <label class="danger-confirm">
              <ArchCheckbox v-model="dangerAccepted" />
              <span>I understand this would permanently remove workspace data.</span>
            </label>
            <ArchButton variant="danger" :disabled="!dangerAccepted">Delete workspace</ArchButton>
          </ArchCard>
        </div>
      </ArchCard>
    </PageSection>
  </div>
</template>
