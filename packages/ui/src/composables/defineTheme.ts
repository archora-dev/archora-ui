/**
 * Рантайм-кастомизация цвета поверх контракта --arch-color-*.
 *
 * Тема задаётся минимальным набором цветов; производные нейтрали и оттенки
 * primary выводит сам CSS (слой arch-base через color-mix). Здесь мы только
 * раскладываем минимальный набор в переменные и выводим читаемый текст
 * (--arch-color-*-fg) по контрасту, чтобы кастомная палитра оставалась
 * доступной без ручного подбора.
 */

export interface ArchThemeColors {
  /** Базовый фон. */
  bg: string;
  /** Основной текст. */
  fg: string;
  /** Акцент действий (кнопки, ссылки, активные состояния). */
  primary: string;
  /** Базовый цвет границ. По умолчанию выводится из bg/fg в CSS. */
  border?: string;
  /** Вторичный акцент. */
  accent?: string;
  danger?: string;
  success?: string;
  warning?: string;
  info?: string;
  /** Явный цвет текста на primary; по умолчанию подбирается по контрасту. */
  primaryFg?: string;
  /** Явный цвет текста на accent; по умолчанию подбирается по контрасту. */
  accentFg?: string;
  /** color-scheme темы; по умолчанию определяется по светлоте bg. */
  scheme?: "light" | "dark";
}

const themeNamePattern = /^[a-z][a-z0-9-]*$/i;

interface Rgb {
  r: number;
  g: number;
  b: number;
}

function parseHex(hex: string): Rgb {
  const normalized = hex.trim().replace(/^#/, "");
  const expanded =
    normalized.length === 3
      ? normalized
          .split("")
          .map((char) => char + char)
          .join("")
      : normalized;

  if (!/^[0-9a-f]{6}$/i.test(expanded)) {
    throw new Error(`archora-ui: ожидался hex-цвет, получено "${hex}"`);
  }

  return {
    r: Number.parseInt(expanded.slice(0, 2), 16),
    g: Number.parseInt(expanded.slice(2, 4), 16),
    b: Number.parseInt(expanded.slice(4, 6), 16)
  };
}

function relativeLuminance({ r, g, b }: Rgb): number {
  const channel = (value: number) => {
    const c = value / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };

  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function contrastRatio(a: number, b: number): number {
  const lighter = Math.max(a, b);
  const darker = Math.min(a, b);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Подбирает читаемый цвет текста поверх заданного фона: возвращает ту из двух
 * опций (тёмную/светлую), что даёт больший контраст по WCAG.
 */
export function readableForeground(
  background: string,
  options: { light?: string; dark?: string } = {}
): string {
  const light = options.light ?? "#ffffff";
  const dark = options.dark ?? "#0a0c10";
  const backgroundLuminance = relativeLuminance(parseHex(background));
  const onDark = contrastRatio(backgroundLuminance, relativeLuminance(parseHex(dark)));
  const onLight = contrastRatio(backgroundLuminance, relativeLuminance(parseHex(light)));

  return onDark >= onLight ? dark : light;
}

function inferScheme(bg: string): "light" | "dark" {
  return relativeLuminance(parseHex(bg)) < 0.4 ? "dark" : "light";
}

/**
 * Раскладывает минимальный набор цветов в карту переменных --arch-color-*.
 * Производные токены (нейтрали, hover/active/glow) в карту не входят —
 * их выводит CSS-слой arch-base.
 */
export function buildThemeVars(colors: ArchThemeColors): Record<string, string> {
  const vars: Record<string, string> = {
    "--arch-color-bg": colors.bg,
    "--arch-color-fg": colors.fg,
    "--arch-color-primary": colors.primary,
    "--arch-color-primary-fg": colors.primaryFg ?? readableForeground(colors.primary)
  };

  if (colors.border) {
    vars["--arch-color-border"] = colors.border;
  }

  if (colors.accent) {
    vars["--arch-color-accent"] = colors.accent;
    vars["--arch-color-accent-fg"] = colors.accentFg ?? readableForeground(colors.accent);
  }

  const status = ["danger", "success", "warning", "info"] as const;
  for (const key of status) {
    const value = colors[key];
    if (value) {
      vars[`--arch-color-${key}`] = value;
      vars[`--arch-color-${key}-fg`] = readableForeground(value);
    }
  }

  return vars;
}

function declarationsBlock(vars: Record<string, string>, scheme: "light" | "dark"): string {
  const lines = [`  color-scheme: ${scheme};`];
  for (const [name, value] of Object.entries(vars)) {
    lines.push(`  ${name}: ${value};`);
  }
  return lines.join("\n");
}

/**
 * Собирает CSS-правило темы без побочных эффектов — пригодно для SSR-инлайна
 * и генератора тем в документации.
 */
export function buildThemeCss(name: string, colors: ArchThemeColors): string {
  if (!themeNamePattern.test(name)) {
    throw new Error(`archora-ui: имя темы "${name}" должно быть в виде [a-z][a-z0-9-]*`);
  }

  const scheme = colors.scheme ?? inferScheme(colors.bg);
  return `:root[data-theme="${name}"] {\n${declarationsBlock(buildThemeVars(colors), scheme)}\n}\n`;
}

/**
 * Регистрирует именованную тему: инжектит правило [data-theme="name"] в документ.
 * SSR-safe — при отсутствии document возвращает CSS и ничего не делает с DOM.
 * Дальше тему можно активировать через useTheme().setTheme(name).
 */
export function defineTheme(name: string, colors: ArchThemeColors): string {
  const css = buildThemeCss(name, colors);

  if (typeof document === "undefined") {
    return css;
  }

  const elementId = `arch-theme-${name}`;
  let style = document.getElementById(elementId) as HTMLStyleElement | null;

  if (!style) {
    style = document.createElement("style");
    style.id = elementId;
    document.head.append(style);
  }

  style.textContent = css;
  return css;
}

/**
 * Меняет акцент на лету: ставит --arch-color-primary и подбирает читаемый
 * --arch-color-primary-fg. Производные (hover/active/glow) следуют автоматически.
 */
export function setAccent(hex: string, target?: HTMLElement): void {
  const foreground = readableForeground(hex);

  if (typeof document === "undefined" && !target) {
    return;
  }

  const root = target ?? document.documentElement;
  root.style.setProperty("--arch-color-primary", hex);
  root.style.setProperty("--arch-color-primary-fg", foreground);
}
