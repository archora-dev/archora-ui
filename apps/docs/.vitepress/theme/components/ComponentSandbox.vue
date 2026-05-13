<script setup lang="ts">
/* eslint-disable vue/one-component-per-file */
import { computed, defineComponent, h, onMounted, ref } from "vue";
import {
  ArchAccordion,
  ArchAccordionItem,
  ArchActiveFilters,
  ArchAlert,
  ArchAlertDialog,
  ArchAvatar,
  ArchBadge,
  ArchBadgeGroup,
  ArchBreadcrumbs,
  ArchButton,
  ArchCard,
  ArchCheckbox,
  ArchCombobox,
  ArchCommand,
  ArchDataTable,
  ArchDatePicker,
  ArchDialog,
  ArchDialogContent,
  ArchDialogFooter,
  ArchDialogHeader,
  ArchDialogTitle,
  ArchDialogTrigger,
  ArchDrawer,
  ArchDropdown,
  ArchDropdownContent,
  ArchDropdownItem,
  ArchDropdownTrigger,
  ArchEmptyState,
  ArchErrorBoundary,
  ArchFileUpload,
  ArchFilterChip,
  ArchFormField,
  ArchIcon,
  ArchIconButton,
  ArchInput,
  ArchKbd,
  ArchPagination,
  ArchPanel,
  ArchPopover,
  ArchProgressBar,
  ArchRadioGroup,
  ArchRiskScore,
  ArchSearchInput,
  ArchSegmentedControl,
  ArchSelect,
  ArchSeverityMarker,
  ArchSkeleton,
  ArchSlider,
  ArchSpinner,
  ArchStat,
  ArchStatusState,
  ArchStepper,
  ArchSwitch,
  ArchTable,
  ArchTabs,
  ArchTextarea,
  ArchTimeline,
  ArchToastViewport,
  ArchToolbar,
  ArchTooltip,
  ArchTreeView,
  ArchVirtualScroller,
  useToast
} from "@archora/ui";

const props = defineProps<{ name: string }>();

const variant = ref("primary");
const size = ref("md");
const disabled = ref(false);
const checked = ref(true);
const textValue = ref("Archora");
const selected = ref("stable");
const selectedList = ref<Array<string | number>>([1]);
const page = ref(2);
const slider = ref(62);
const date = ref("2026-05-13");
const open = ref(false);
const filterActive = ref(true);
const tab = ref("overview");
const step = ref("build");
const search = ref("");
const accordion = ref("overview");
const files = ref<File[]>([]);
const mounted = ref(false);
const toast = useToast();

const DemoIcon = defineComponent({
  name: "DemoIcon",
  setup() {
    return () =>
      h("svg", { viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true" }, [
        h("path", {
          d: "M5 12h14M12 5l7 7-7 7",
          stroke: "currentColor",
          "stroke-width": 2,
          "stroke-linecap": "round",
          "stroke-linejoin": "round"
        })
      ]);
  }
});

const RiskyPanel = defineComponent({
  name: "RiskyPanel",
  props: { fail: Boolean },
  setup(componentProps) {
    if (componentProps.fail) {
      throw new Error("Preview crashed on purpose");
    }

    return () => h("div", "Panel rendered without errors.");
  }
});

const options = [
  { value: "draft", label: "Draft" },
  { value: "stable", label: "Stable" },
  { value: "deprecated", label: "Deprecated", disabled: true }
];
const commands = [
  { value: "open", label: "Open project", description: "Navigate to project" },
  { value: "deploy", label: "Deploy", description: "Run release pipeline" },
  { value: "archive", label: "Archive", description: "Move to archive" }
];
const rows = [
  { id: 1, name: "Console", status: "Healthy", score: 92 },
  { id: 2, name: "Billing", status: "Watch", score: 76 },
  { id: 3, name: "Deploy", status: "Blocked", score: 43 }
];
const columns = [
  { key: "name", label: "Name", sortable: true },
  { key: "status", label: "Status" },
  { key: "score", label: "Score", sortable: true, align: "end" as const }
];
const timeline = [
  { id: "1", title: "Token update", time: "09:20", tone: "info" as const },
  { id: "2", title: "Docs build passed", time: "09:26", tone: "success" as const }
];
const tree = [
  {
    id: "packages",
    label: "packages",
    expanded: true,
    children: [
      { id: "ui", label: "ui" },
      { id: "tokens", label: "tokens" }
    ]
  }
];
const virtualItems = Array.from({ length: 1000 }, (_, index) => ({
  id: index,
  label: `Virtual row ${index + 1}`
}));

const title = computed(() =>
  props.name
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
);
const compact = computed(() =>
  ["badge", "kbd", "spinner", "skeleton", "severity-marker", "icon", "icon-button"].includes(
    props.name
  )
);
const stretchPreview = computed(() =>
  ["card", "data-table", "empty-state", "panel", "stepper", "table", "timeline"].includes(
    props.name
  )
);
const code = computed(() => samples[props.name] ?? `<${title.value.replaceAll(" ", "")} />`);

function showToast() {
  toast.show({
    title: "Saved",
    description: "The interactive docs sandbox is working.",
    variant: "success"
  });
}

function getVirtualLabel(item: unknown) {
  return typeof item === "object" && item !== null && "label" in item
    ? String((item as { label: unknown }).label)
    : String(item);
}

onMounted(() => {
  mounted.value = true;
});

const samples: Record<string, string> = {
  button: '<ArchButton variant="primary">Save</ArchButton>',
  input: '<ArchInput v-model="value" placeholder="Type here" />',
  select: '<ArchSelect v-model="value" :options="options" />',
  dialog: "<ArchDialog><ArchDialogTrigger>Open</ArchDialogTrigger>...</ArchDialog>",
  toast: 'toast.show({ title: "Saved", variant: "success" })',
  "data-table": '<ArchDataTable :columns="columns" :rows="rows" selectable />',
  "virtual-scroller": '<ArchVirtualScroller :items="items" :item-height="40" />'
};
</script>

<template>
  <section class="arch-doc-sandbox">
    <header class="arch-doc-sandbox__header">
      <div>
        <h2 class="arch-doc-sandbox__title">Live sandbox</h2>
        <p class="arch-doc-sandbox__hint">{{ title }} can be tested directly on this page.</p>
      </div>
      <ArchBadge variant="info" size="sm">interactive</ArchBadge>
    </header>

    <div class="arch-doc-sandbox__controls">
      <label
        v-if="
          [
            'button',
            'badge',
            'input',
            'textarea',
            'spinner',
            'switch',
            'radio-group',
            'segmented-control'
          ].includes(name)
        "
        class="arch-doc-sandbox__control"
      >
        Size
        <select v-model="size">
          <option value="sm">sm</option>
          <option value="md">md</option>
          <option value="lg">lg</option>
        </select>
      </label>
      <label v-if="name === 'button'" class="arch-doc-sandbox__control">
        Variant
        <select v-model="variant">
          <option value="primary">primary</option>
          <option value="secondary">secondary</option>
          <option value="ghost">ghost</option>
          <option value="danger">danger</option>
          <option value="success">success</option>
          <option value="warning">warning</option>
        </select>
      </label>
      <label
        v-if="
          [
            'button',
            'input',
            'textarea',
            'checkbox',
            'switch',
            'select',
            'combobox',
            'radio-group',
            'slider'
          ].includes(name)
        "
        class="arch-doc-sandbox__control"
      >
        <input v-model="disabled" type="checkbox" />
        disabled
      </label>
    </div>

    <div
      class="arch-doc-sandbox__stage"
      :class="{
        'arch-doc-sandbox__stage--compact': compact,
        'arch-doc-sandbox__stage--stretch': stretchPreview
      }"
    >
      <div v-if="name === 'accordion'" class="arch-doc-sandbox__wide">
        <ArchAccordion v-model="accordion">
          <ArchAccordionItem id="overview" title="Overview">Architecture summary</ArchAccordionItem>
          <ArchAccordionItem id="risks" title="Risks">Open risk items</ArchAccordionItem>
        </ArchAccordion>
      </div>

      <div v-else-if="name === 'active-filters'" class="arch-doc-sandbox__wide">
        <ArchActiveFilters
          :filters="[
            { id: 'status', label: 'Status', value: 'Healthy' },
            { id: 'owner', label: 'Owner', value: 'Platform' }
          ]"
        />
      </div>

      <div v-else-if="name === 'alert-dialog'">
        <ArchButton variant="danger" @click="open = true">Open confirmation</ArchButton>
        <ArchAlertDialog
          v-model:open="open"
          title="Delete project"
          description="This action cannot be undone."
          confirm-label="Delete"
          variant="danger"
          @confirm="open = false"
        />
      </div>

      <ArchAlert v-else-if="name === 'alert'" variant="warning" title="Token drift">
        Theme tokens changed after the last release.
      </ArchAlert>

      <ArchAvatar v-else-if="name === 'avatar'" fallback="AU" alt="Archora user" size="lg" />

      <div v-else-if="name === 'badge'" class="arch-doc-sandbox__preview-row">
        <ArchBadge variant="success" :size="size === 'lg' ? 'md' : (size as 'sm' | 'md')">
          Stable
        </ArchBadge>
        <ArchBadge variant="warning" :size="size === 'lg' ? 'md' : (size as 'sm' | 'md')">
          Watch
        </ArchBadge>
      </div>

      <ArchBadgeGroup
        v-else-if="name === 'badge-group'"
        v-slot="{ item }"
        :items="['Vue', 'A11y', 'Tokens', 'Forms']"
        :limit="3"
      >
        <ArchBadge>{{ item }}</ArchBadge>
      </ArchBadgeGroup>

      <ArchBreadcrumbs
        v-else-if="name === 'breadcrumbs'"
        :items="[{ label: 'Projects', href: '#' }, { label: 'Console' }]"
      />

      <ArchButton
        v-else-if="name === 'button'"
        :variant="variant as any"
        :size="size as any"
        :disabled="disabled"
      >
        Save changes
      </ArchButton>

      <ArchCard v-else-if="name === 'card'" class="arch-doc-sandbox__surface" variant="outlined">
        <template #header>Project health</template>
        Current score: 92
        <template #footer>Updated now</template>
      </ArchCard>

      <ArchCheckbox v-else-if="name === 'checkbox'" v-model="checked" :disabled="disabled">
        Accept policy
      </ArchCheckbox>

      <ArchCombobox
        v-else-if="name === 'combobox'"
        v-model="selected"
        :options="options"
        :disabled="disabled"
        placeholder="Search status"
      />

      <ArchCommand
        v-else-if="name === 'command'"
        class="arch-doc-sandbox__wide"
        :items="commands"
      />

      <ArchDataTable
        v-else-if="name === 'data-table'"
        v-model:selected-keys="selectedList"
        class="arch-doc-sandbox__full"
        :columns="columns"
        :rows="rows"
        selectable
      />

      <ArchDatePicker v-else-if="name === 'date-picker'" v-model="date" />

      <ArchDialog v-else-if="name === 'dialog'">
        <ArchDialogTrigger>Open dialog</ArchDialogTrigger>
        <ArchDialogContent>
          <ArchDialogHeader><ArchDialogTitle>Settings</ArchDialogTitle></ArchDialogHeader>
          <p>Dialog content rendered inside the docs sandbox.</p>
          <ArchDialogFooter>
            <ArchButton variant="secondary">Close with Escape</ArchButton>
          </ArchDialogFooter>
        </ArchDialogContent>
      </ArchDialog>

      <div v-else-if="name === 'drawer'">
        <ArchButton @click="open = true">Open drawer</ArchButton>
        <ArchDrawer v-model:open="open" title="Inspector">Drawer content</ArchDrawer>
      </div>

      <ArchDropdown v-else-if="name === 'dropdown'">
        <ArchDropdownTrigger>Actions</ArchDropdownTrigger>
        <ArchDropdownContent>
          <ArchDropdownItem value="edit">Edit</ArchDropdownItem>
          <ArchDropdownItem value="delete">Delete</ArchDropdownItem>
        </ArchDropdownContent>
      </ArchDropdown>

      <ArchEmptyState
        v-else-if="name === 'empty-state'"
        class="arch-doc-sandbox__full arch-doc-sandbox__empty-state"
        title="No projects"
        description="Create a project to start."
        variant="outlined"
      >
        <template #actions><ArchButton>Create project</ArchButton></template>
      </ArchEmptyState>

      <ArchErrorBoundary v-else-if="name === 'error-boundary'" fallback-title="Panel failed">
        <RiskyPanel :fail="false" />
      </ArchErrorBoundary>

      <ArchFileUpload
        v-else-if="name === 'file-upload'"
        v-model="files"
        label="Attach report"
        multiple
      />

      <ArchFilterChip
        v-else-if="name === 'filter-chip'"
        :active="filterActive"
        @toggle="filterActive = !filterActive"
      >
        Healthy
      </ArchFilterChip>

      <ArchFormField
        v-else-if="name === 'form-field'"
        v-slot="field"
        label="Email"
        description="Used for alerts"
      >
        <ArchInput v-bind="field" placeholder="team@example.com" />
      </ArchFormField>

      <ArchIcon v-else-if="name === 'icon'" :icon="DemoIcon" label="Arrow" :size="24" />

      <ArchIconButton v-else-if="name === 'icon-button'" :icon="DemoIcon" label="Continue" />

      <ArchInput
        v-else-if="name === 'input'"
        v-model="textValue"
        :size="size as any"
        :disabled="disabled"
        placeholder="Type here"
      />

      <div v-else-if="name === 'kbd'" class="arch-doc-sandbox__preview-row">
        <ArchKbd :size="size as any">Cmd</ArchKbd>
        <ArchKbd :size="size as any">K</ArchKbd>
      </div>

      <ArchPagination v-else-if="name === 'pagination'" v-model:page="page" :page-count="8" />

      <ArchPanel v-else-if="name === 'panel'" class="arch-doc-sandbox__surface" title="Inspector">
        Selected module details
      </ArchPanel>

      <ArchPopover v-else-if="name === 'popover'">
        <template #trigger><ArchButton variant="secondary">Open popover</ArchButton></template>
        <div class="arch-doc-sandbox__mini-box">Popover content</div>
      </ArchPopover>

      <ArchProgressBar
        v-else-if="name === 'progress-bar'"
        class="arch-doc-sandbox__wide"
        :value="slider"
      />

      <ArchRadioGroup
        v-else-if="name === 'radio-group'"
        v-model="selected"
        :options="options"
        :disabled="disabled"
        :size="size as any"
      />

      <ArchRiskScore
        v-else-if="name === 'risk-score'"
        :score="88"
        severity="high"
        reason="Dependency churn"
      />

      <ArchSearchInput
        v-else-if="name === 'search-input'"
        v-model="search"
        placeholder="Search modules"
      />

      <ArchSegmentedControl
        v-else-if="name === 'segmented-control'"
        v-model="selected"
        :options="options"
        :size="size as any"
      />

      <ArchSelect
        v-else-if="name === 'select'"
        v-model="selected"
        :options="options"
        :disabled="disabled"
      />

      <ArchSeverityMarker
        v-else-if="name === 'severity-marker'"
        severity="critical"
        label="Critical"
        size="md"
      />

      <div v-else-if="name === 'skeleton'" class="arch-doc-sandbox__stack">
        <ArchSkeleton width="100%" :height="16" />
        <ArchSkeleton width="70%" :height="16" />
        <ArchSkeleton :width="40" :height="40" circle />
      </div>

      <ArchSlider
        v-else-if="name === 'slider'"
        v-model="slider"
        label="Risk threshold"
        show-value
        :disabled="disabled"
      />

      <ArchSpinner
        v-else-if="name === 'spinner'"
        :size="size as any"
        tone="accent"
        label="Loading"
      />

      <ArchStat
        v-else-if="name === 'stat'"
        label="Health"
        value="82%"
        delta="+4%"
        delta-tone="positive"
        :progress="82"
      />

      <ArchStatusState
        v-else-if="name === 'status-state'"
        variant="no-results"
        title="No matches"
        description="Try another query."
      >
        <template #actions><ArchButton variant="secondary">Clear filters</ArchButton></template>
      </ArchStatusState>

      <ArchStepper
        v-else-if="name === 'stepper'"
        v-model="step"
        class="arch-doc-sandbox__full"
        :steps="[
          { id: 'plan', label: 'Plan', status: 'complete' },
          { id: 'build', label: 'Build' },
          { id: 'ship', label: 'Ship' }
        ]"
        clickable
      />

      <ArchSwitch v-else-if="name === 'switch'" v-model="checked" :disabled="disabled">
        Auto deploy
      </ArchSwitch>

      <ArchTable
        v-else-if="name === 'table'"
        class="arch-doc-sandbox__full"
        :columns="columns"
        :rows="rows"
        row-key="id"
      />

      <ArchTabs
        v-else-if="name === 'tabs'"
        v-model="tab"
        :items="[
          { value: 'overview', label: 'Overview' },
          { value: 'events', label: 'Events' }
        ]"
      >
        <template #overview>Overview panel</template>
        <template #events>Events panel</template>
      </ArchTabs>

      <ArchTextarea
        v-else-if="name === 'textarea'"
        v-model="textValue"
        :size="size as any"
        :disabled="disabled"
        placeholder="Release notes"
      />

      <div
        v-else-if="name === 'timeline'"
        class="arch-doc-sandbox__surface arch-doc-sandbox__timeline"
      >
        <ArchTimeline :items="timeline" />
      </div>

      <div v-else-if="name === 'toast'">
        <ArchButton @click="showToast">Show toast</ArchButton>
        <ArchToastViewport position="bottom-right" />
      </div>

      <ArchToolbar v-else-if="name === 'toolbar'" aria-label="Sandbox actions">
        <ArchButton size="sm">Save</ArchButton>
        <ArchButton size="sm" variant="secondary">Preview</ArchButton>
        <ArchIconButton :icon="DemoIcon" label="Continue" />
      </ArchToolbar>

      <ArchTooltip v-else-if="name === 'tooltip'" content="Run validation">
        <ArchButton variant="secondary">Hover or focus me</ArchButton>
      </ArchTooltip>

      <ArchTreeView v-else-if="name === 'tree-view'" :items="tree" />

      <ArchVirtualScroller
        v-else-if="name === 'virtual-scroller' && mounted"
        v-slot="{ item }"
        class="arch-doc-sandbox__virtual-list"
        :items="virtualItems"
        :item-height="40"
      >
        <div class="arch-doc-sandbox__virtual-item">{{ getVirtualLabel(item) }}</div>
      </ArchVirtualScroller>

      <div v-else-if="name === 'virtual-scroller'" class="arch-doc-sandbox__mini-box">
        Virtual list loads in the browser.
      </div>
    </div>

    <pre class="arch-doc-sandbox__code"><code>{{ code }}</code></pre>
  </section>
</template>
