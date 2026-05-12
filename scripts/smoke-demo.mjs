import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const screenshotDir = path.join(rootDir, "apps", "docs", ".vitepress", "public", "screenshots");
const port = Number(process.env.ARCHORA_DEMO_SMOKE_PORT ?? 4176);
const host = "127.0.0.1";
const baseUrl = `http://${host}:${port}`;

const screens = [
  {
    view: "overview",
    nav: "Overview",
    heading: "Operational command center",
    file: "archora-console-overview.png",
    lightFile: "archora-console-overview-light.png",
    clipHeight: 980
  },
  {
    view: "projects",
    nav: "Projects",
    heading: "Project inventory",
    file: "archora-console-projects.png",
    lightFile: "archora-console-projects-light.png"
  },
  {
    view: "team",
    nav: "Team",
    heading: "Members and access",
    file: "archora-console-team.png",
    lightFile: "archora-console-team-light.png"
  },
  {
    view: "settings",
    nav: "Settings",
    heading: "Workspace settings",
    file: "archora-console-settings.png",
    lightFile: "archora-console-settings-light.png"
  },
  {
    view: "billing",
    nav: "Billing",
    heading: "Plan and usage",
    file: "archora-console-billing.png",
    lightFile: "archora-console-billing-light.png"
  }
];

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: rootDir,
      env: process.env,
      stdio: "inherit"
    });

    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`${command} ${args.join(" ")} failed with exit code ${code}`));
    });
  });
}

function startServer() {
  const child = spawn(
    "corepack",
    [
      "pnpm",
      "--filter",
      "@archora/demo",
      "exec",
      "vite",
      "--host",
      host,
      "--port",
      String(port),
      "--strictPort"
    ],
    {
      cwd: rootDir,
      env: { ...process.env, BROWSER: "none" },
      stdio: ["ignore", "pipe", "pipe"]
    }
  );

  child.stdout.on("data", (chunk) => process.stdout.write(chunk));
  child.stderr.on("data", (chunk) => process.stderr.write(chunk));

  return child;
}

function requestReady() {
  return new Promise((resolve, reject) => {
    const request = http.get(baseUrl, (response) => {
      response.resume();
      if (response.statusCode && response.statusCode < 500) {
        resolve();
        return;
      }

      reject(new Error(`Demo server returned HTTP ${response.statusCode}`));
    });

    request.on("error", reject);
    request.setTimeout(1000, () => {
      request.destroy(new Error("Demo server readiness check timed out"));
    });
  });
}

async function waitForServer(timeoutMs = 30000) {
  const startedAt = Date.now();

  while (Date.now() - startedAt < timeoutMs) {
    try {
      await requestReady();
      return;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
  }

  throw new Error(`Demo server did not become ready at ${baseUrl}`);
}

function stopServer(server) {
  if (!server.killed) {
    server.kill("SIGTERM");
  }
}

async function captureScreenshots() {
  await mkdir(screenshotDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    deviceScaleFactor: 1,
    viewport: { width: 1440, height: 1100 }
  });
  const errors = [];

  page.on("console", (message) => {
    if (message.type() === "error") {
      errors.push(message.text());
    }
  });
  page.on("pageerror", (error) => errors.push(error.message));

  function demoUrl({ view = "overview", theme = "dark", command = false } = {}) {
    const url = new URL(baseUrl);
    url.searchParams.set("screenshot", "1");
    url.searchParams.set("view", view);
    url.searchParams.set("theme", theme);

    if (command) {
      url.searchParams.set("command", "1");
    }

    return url.toString();
  }

  async function assertNoHorizontalOverflow(label) {
    const sizes = await page.evaluate(() => ({
      body: document.body.scrollWidth,
      html: document.documentElement.scrollWidth,
      inner: window.innerWidth
    }));

    if (sizes.html > sizes.inner || sizes.body > sizes.inner) {
      throw new Error(
        `${label} created horizontal overflow: html=${sizes.html}, body=${sizes.body}, viewport=${sizes.inner}`
      );
    }
  }

  async function assertOverlayBounds(label) {
    const overlays = await page.evaluate(() =>
      Array.from(
        document.querySelectorAll(
          ".arch-dropdown__content, .arch-select__listbox, .arch-combobox__listbox, .arch-date-picker__popover, .arch-dialog__content, .arch-tooltip__content"
        )
      ).map((element) => {
        const rect = element.getBoundingClientRect();

        return {
          className: element.className,
          top: rect.top,
          bottom: rect.bottom,
          left: rect.left,
          right: rect.right,
          width: rect.width,
          height: rect.height,
          viewportWidth: window.innerWidth,
          viewportHeight: window.innerHeight
        };
      })
    );
    const overflow = overlays.find(
      (overlay) =>
        overlay.top < -0.5 ||
        overlay.left < -0.5 ||
        overlay.right > overlay.viewportWidth + 0.5 ||
        overlay.bottom > overlay.viewportHeight + 0.5
    );

    if (overflow) {
      throw new Error(`${label} overlay exceeds viewport: ${JSON.stringify(overflow)}`);
    }
  }

  async function assertCleanState(label) {
    await assertNoHorizontalOverflow(label);
    await assertOverlayBounds(label);
  }

  async function assertVisibleBox(selector, label) {
    const box = await page.locator(selector).first().boundingBox();

    if (!box || box.width <= 0 || box.height <= 0) {
      throw new Error(`${label} is not visible: ${JSON.stringify(box)}`);
    }
  }

  async function assertProgressbars(label, expectedCount) {
    const bars = await page.evaluate(() =>
      Array.from(document.querySelectorAll('[role="progressbar"]')).map((element) => {
        const rect = element.getBoundingClientRect();

        return {
          label: element.getAttribute("aria-label"),
          min: element.getAttribute("aria-valuemin"),
          max: element.getAttribute("aria-valuemax"),
          now: element.getAttribute("aria-valuenow"),
          width: rect.width,
          height: rect.height
        };
      })
    );

    if (bars.length !== expectedCount) {
      throw new Error(`${label} expected ${expectedCount} progressbars but found ${bars.length}`);
    }

    const invalid = bars.find(
      (bar) =>
        !bar.label ||
        bar.min !== "0" ||
        bar.max !== "100" ||
        !bar.now ||
        Number(bar.now) < 0 ||
        Number(bar.now) > 100 ||
        bar.width <= 0 ||
        bar.height < 10
    );

    if (invalid) {
      throw new Error(`${label} has invalid progressbar: ${JSON.stringify(invalid)}`);
    }
  }

  for (const screen of screens) {
    for (const theme of ["dark", "light"]) {
      await page.goto(demoUrl({ view: screen.view, theme }), { waitUntil: "networkidle" });
      await page.getByRole("heading", { name: screen.heading, level: 1 }).waitFor();
      await assertCleanState(`${screen.view} ${theme}`);
      await page.screenshot({
        animations: "disabled",
        clip:
          screen.clipHeight && theme === "dark"
            ? { x: 0, y: 0, width: 1440, height: screen.clipHeight }
            : undefined,
        fullPage: false,
        path: path.join(screenshotDir, theme === "dark" ? screen.file : screen.lightFile)
      });
    }
  }

  for (const theme of ["dark", "light"]) {
    await page.goto(demoUrl({ view: "overview", theme }), { waitUntil: "networkidle" });
    await page.getByRole("heading", { name: "Operational command center", level: 1 }).waitFor();
    await assertProgressbars(`overview progressbars ${theme}`, 4);
    await assertVisibleBox(".demo-meter__track", `overview meter track ${theme}`);
    await assertVisibleBox(".demo-meter__fill", `overview meter fill ${theme}`);

    await page.locator(".command-trigger").hover();
    await page.locator(".arch-tooltip__content").waitFor();
    await assertCleanState(`topbar search tooltip hover ${theme}`);
    await page.mouse.move(1400, 1000);

    await page.locator(".command-trigger").focus();
    await page.locator(".arch-tooltip__content").waitFor();
    await assertCleanState(`topbar search tooltip focus ${theme}`);
    await page.keyboard.press("Tab");
  }

  await page.goto(demoUrl({ view: "overview", theme: "dark" }), { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Actions" }).click();
  await assertCleanState("actions dropdown open");
  await page.keyboard.press("Escape");

  await page.goto(demoUrl({ view: "projects", theme: "dark" }), { waitUntil: "networkidle" });
  await assertVisibleBox(
    ".arch-data-table tbody .arch-checkbox__control",
    "projects selected row checkbox"
  );
  await page.locator(".arch-select__trigger").first().click();
  await assertCleanState("projects status select open");
  await page.keyboard.press("Escape");
  await page.locator(".arch-date-picker__trigger").click();
  await assertCleanState("projects date picker open");
  await page.keyboard.press("Escape");
  await page.locator(".arch-data-table tbody .arch-dropdown__trigger").first().click();
  await assertCleanState("projects row dropdown open");
  await page.keyboard.press("Escape");

  await page.goto(demoUrl({ view: "team", theme: "dark" }), { waitUntil: "networkidle" });
  await page.locator(".arch-select__trigger").first().click();
  await assertCleanState("team role select open");
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: /invite user/i }).click();
  await assertCleanState("invite dialog open");
  await page.locator(".arch-dialog__content .arch-select__trigger").click();
  await assertCleanState("invite dialog select open");

  for (const theme of ["dark", "light"]) {
    await page.goto(demoUrl({ view: "billing", theme }), { waitUntil: "networkidle" });
    await page.getByRole("heading", { name: "Plan and usage", level: 1 }).waitFor();
    await assertProgressbars(`billing progressbars ${theme}`, 2);
    await assertVisibleBox(".demo-meter__track", `billing meter track ${theme}`);
    await assertVisibleBox(".demo-meter__fill", `billing meter fill ${theme}`);
    await assertCleanState(`billing meters ${theme}`);
  }

  await page.goto(demoUrl({ view: "overview", theme: "dark", command: true }), {
    waitUntil: "networkidle"
  });
  await page.getByRole("heading", { name: "Command menu" }).waitFor();
  await assertCleanState("command menu open");
  await page.screenshot({
    animations: "disabled",
    fullPage: false,
    path: path.join(screenshotDir, "archora-console-command-menu.png")
  });

  await browser.close();

  if (errors.length > 0) {
    throw new Error(`Browser console errors:\n${errors.join("\n")}`);
  }
}

let server;

try {
  await run("corepack", ["pnpm", "build:ui"]);
  server = startServer();
  await waitForServer();
  await captureScreenshots();
  console.log(
    `Demo smoke passed. Screenshots written to ${path.relative(rootDir, screenshotDir)}.`
  );
} finally {
  if (server) {
    stopServer(server);
  }
}
