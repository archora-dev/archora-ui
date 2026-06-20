<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import {
  ArchBadge,
  ArchButton,
  ArchCard,
  ArchInput,
  ArchStat,
  buildThemeCss,
  readableForeground
} from "@archora/ui";

const name = ref("brand");
const bg = ref("#080b12");
const fg = ref("#f8fafc");
const primary = ref("#8b5cf6");
const accent = ref("#22d3ee");

const previewId = "arch-theme-preview";
const copied = ref(false);

const colors = computed(() => ({
  bg: bg.value,
  fg: fg.value,
  primary: primary.value,
  accent: accent.value
}));

// Минимальный CSS для копирования — ровно то, что отгружает контракт темы.
const minimalCss = computed(() => {
  try {
    return buildThemeCss(name.value || "brand", colors.value);
  } catch {
    return "/* Заполните корректные hex-цвета */";
  }
});

const runtimeSnippet = computed(
  () => `import { defineTheme, useTheme } from "@archora/ui";

defineTheme("${name.value || "brand"}", {
  bg: "${bg.value}",
  fg: "${fg.value}",
  primary: "${primary.value}",
  accent: "${accent.value}"
});

useTheme().setTheme("${name.value || "brand"}");`
);

const primaryFg = computed(() => {
  try {
    return readableForeground(primary.value);
  } catch {
    return "#ffffff";
  }
});

/**
 * Полное правило для предпросмотра: помимо базового набора повторяет
 * color-mix-производные из слоя arch-base (theme.css), чтобы вложенный
 * [data-theme] корректно пересчитывал нейтрали и оттенки primary.
 */
const previewCss = computed(() => {
  const c = colors.value;
  return `[data-theme="${previewId}"] {
  --arch-color-bg: ${c.bg};
  --arch-color-fg: ${c.fg};
  --arch-color-primary: ${c.primary};
  --arch-color-primary-fg: ${primaryFg.value};
  --arch-color-accent: ${c.accent};
  --arch-color-border: color-mix(in srgb, ${c.bg}, ${c.fg} 14%);
  --arch-color-bg-elevated: color-mix(in srgb, ${c.bg}, ${c.fg} 3.5%);
  --arch-color-bg-subtle: color-mix(in srgb, ${c.bg}, ${c.fg} 6.5%);
  --arch-color-surface: color-mix(in srgb, ${c.bg}, ${c.fg} 3.5%);
  --arch-color-surface-2: color-mix(in srgb, ${c.bg}, ${c.fg} 6.5%);
  --arch-color-fg-muted: color-mix(in srgb, ${c.fg}, ${c.bg} 37%);
  --arch-color-fg-subtle: color-mix(in srgb, ${c.fg}, ${c.bg} 56%);
  --arch-color-border-strong: color-mix(in srgb, ${c.bg}, ${c.fg} 34%);
  --arch-color-primary-hover: color-mix(in srgb, ${c.primary}, ${c.fg} 12%);
  --arch-color-primary-active: color-mix(in srgb, ${c.primary}, ${c.fg} 16%);
  --arch-color-primary-glow: color-mix(in srgb, ${c.primary}, transparent 66%);
  --arch-color-accent-fg: ${readableForegroundSafe(c.accent)};
}`;
});

function readableForegroundSafe(value: string) {
  try {
    return readableForeground(value);
  } catch {
    return "#ffffff";
  }
}

let styleEl: HTMLStyleElement | null = null;

function syncPreview() {
  if (typeof document === "undefined") {
    return;
  }
  if (!styleEl) {
    styleEl = document.createElement("style");
    styleEl.id = `${previewId}-style`;
    document.head.append(styleEl);
  }
  styleEl.textContent = previewCss.value;
}

async function copy(text: string) {
  if (typeof navigator === "undefined" || !navigator.clipboard) {
    return;
  }
  await navigator.clipboard.writeText(text);
  copied.value = true;
  window.setTimeout(() => {
    copied.value = false;
  }, 1600);
}

onMounted(() => {
  syncPreview();
  watch(previewCss, syncPreview);
});

onBeforeUnmount(() => {
  styleEl?.remove();
  styleEl = null;
});
</script>

<template>
  <section class="arch-theme-gen">
    <div class="arch-theme-gen__controls">
      <label class="arch-theme-gen__field">
        <span>Theme name</span>
        <ArchInput v-model="name" placeholder="brand" />
      </label>

      <label class="arch-theme-gen__field">
        <span>Background</span>
        <span class="arch-theme-gen__color">
          <input v-model="bg" type="color" aria-label="Background color" />
          <ArchInput v-model="bg" />
        </span>
      </label>

      <label class="arch-theme-gen__field">
        <span>Foreground</span>
        <span class="arch-theme-gen__color">
          <input v-model="fg" type="color" aria-label="Foreground color" />
          <ArchInput v-model="fg" />
        </span>
      </label>

      <label class="arch-theme-gen__field">
        <span>Primary</span>
        <span class="arch-theme-gen__color">
          <input v-model="primary" type="color" aria-label="Primary color" />
          <ArchInput v-model="primary" />
        </span>
      </label>

      <label class="arch-theme-gen__field">
        <span>Accent</span>
        <span class="arch-theme-gen__color">
          <input v-model="accent" type="color" aria-label="Accent color" />
          <ArchInput v-model="accent" />
        </span>
      </label>

      <p class="arch-theme-gen__note">
        Text on primary is derived by WCAG contrast:
        <code>{{ primaryFg }}</code
        >. Surfaces, muted text, borders and <code>primary</code> hover/active follow from these via
        <code>color-mix</code>.
      </p>
    </div>

    <div :data-theme="previewId" class="arch-theme-gen__preview">
      <div class="arch-theme-gen__preview-row">
        <ArchButton variant="primary">Deploy</ArchButton>
        <ArchButton variant="secondary">Preview</ArchButton>
        <ArchButton variant="ghost">Cancel</ArchButton>
        <ArchBadge variant="success" size="sm">Healthy</ArchBadge>
      </div>

      <div class="arch-theme-gen__preview-row arch-theme-gen__preview-row--grid">
        <ArchStat label="Health" value="92%" delta="+4%" delta-tone="positive" :progress="92" />
        <ArchCard variant="outlined">
          <template #header>Service</template>
          Latency is within the target window.
          <template #footer>Updated now</template>
        </ArchCard>
      </div>

      <ArchInput placeholder="Filter services…" />
    </div>

    <div class="arch-theme-gen__output">
      <div class="arch-theme-gen__code">
        <div class="arch-theme-gen__code-head">
          <span>CSS theme</span>
          <ArchButton size="sm" variant="secondary" @click="copy(minimalCss)">
            {{ copied ? "Copied" : "Copy" }}
          </ArchButton>
        </div>
        <pre><code>{{ minimalCss }}</code></pre>
      </div>

      <div class="arch-theme-gen__code">
        <div class="arch-theme-gen__code-head">
          <span>Runtime</span>
          <ArchButton size="sm" variant="secondary" @click="copy(runtimeSnippet)">Copy</ArchButton>
        </div>
        <pre><code>{{ runtimeSnippet }}</code></pre>
      </div>
    </div>
  </section>
</template>

<style scoped>
.arch-theme-gen {
  display: grid;
  gap: var(--arch-space-5);
  margin: var(--arch-space-5) 0;
}

.arch-theme-gen__controls {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
  gap: var(--arch-space-4);
}

.arch-theme-gen__field {
  display: grid;
  gap: var(--arch-space-2);
  font-size: var(--arch-font-size-sm);
  color: var(--arch-color-fg-muted);
}

.arch-theme-gen__color {
  display: flex;
  gap: var(--arch-space-2);
  align-items: center;
}

.arch-theme-gen__color input[type="color"] {
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
  border: 1px solid var(--arch-color-border);
  border-radius: var(--arch-radius-sm);
  background: none;
  cursor: pointer;
}

.arch-theme-gen__note {
  grid-column: 1 / -1;
  margin: 0;
  font-size: var(--arch-font-size-sm);
  color: var(--arch-color-fg-subtle);
}

.arch-theme-gen__preview {
  display: grid;
  gap: var(--arch-space-4);
  padding: var(--arch-space-5);
  border: 1px solid var(--arch-color-border);
  border-radius: var(--arch-radius-lg);
  background: var(--arch-color-bg);
  color: var(--arch-color-fg);
}

.arch-theme-gen__preview-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--arch-space-3);
  align-items: center;
}

.arch-theme-gen__preview-row--grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr));
  align-items: stretch;
}

.arch-theme-gen__output {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
  gap: var(--arch-space-4);
}

.arch-theme-gen__code {
  overflow: hidden;
  border: 1px solid var(--arch-color-border);
  border-radius: var(--arch-radius-md);
  background: var(--arch-color-bg-subtle);
}

.arch-theme-gen__code-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--arch-space-2) var(--arch-space-3);
  border-bottom: 1px solid var(--arch-color-border);
  font-size: var(--arch-font-size-sm);
  color: var(--arch-color-fg-muted);
}

.arch-theme-gen__code pre {
  margin: 0;
  padding: var(--arch-space-3);
  overflow: auto;
  font-family: var(--arch-font-mono);
  font-size: 0.8125rem;
  line-height: var(--arch-line-normal);
}
</style>
