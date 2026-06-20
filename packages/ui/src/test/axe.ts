import axe from "axe-core";

type AxeRunOptions = NonNullable<Parameters<typeof axe.run>[1]>;

// jsdom не делает раскладку и не вычисляет цвета: правила, которым нужен
// реальный рендеринг, в unit-тестах дают ложные срабатывания. Контраст и
// раскладку проверяем визуально (#6) и через visual regression (#7).
const baseRules: NonNullable<AxeRunOptions["rules"]> = {
  "color-contrast": { enabled: false },
  // фрагмент одного компонента — не страница целиком, лендмарки здесь не к месту
  region: { enabled: false }
};

function mergeOptions(options: AxeRunOptions): AxeRunOptions {
  return {
    ...options,
    rules: { ...baseRules, ...(options.rules ?? {}) }
  };
}

export async function findA11yViolations(
  node: Element = document.body,
  options: AxeRunOptions = {}
): Promise<axe.Result[]> {
  const { violations } = await axe.run(node, mergeOptions(options));
  return violations;
}

export async function expectNoA11yViolations(
  node: Element = document.body,
  options: AxeRunOptions = {}
): Promise<void> {
  const violations = await findA11yViolations(node, options);
  if (violations.length === 0) {
    return;
  }

  const summary = violations
    .map((violation) => {
      const targets = violation.nodes.map((entry) => entry.target.join(" ")).join(", ");
      return `- [${violation.id}] ${violation.help} → ${targets}`;
    })
    .join("\n");

  throw new Error(`Найдены a11y-нарушения (${violations.length}):\n${summary}`);
}
