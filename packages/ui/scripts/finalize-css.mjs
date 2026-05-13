import { copyFile, readFile, rm, stat, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const dist = resolve(import.meta.dirname, "../dist");
const viteCss = resolve(dist, "style.css");
const publicCss = resolve(dist, "styles.css");
const declarationsEntry = resolve(dist, "types/index.d.ts");
const buildInfoFiles = [
  resolve(dist, "tsconfig.build.tsbuildinfo"),
  resolve(dist, "tsconfig.tsbuildinfo")
];

await stat(viteCss);
await copyFile(viteCss, publicCss);
await rm(viteCss);

const declarations = await readFile(declarationsEntry, "utf8");
await writeFile(declarationsEntry, declarations.replace('import "./styles/index.css";\n', ""));
await Promise.all(buildInfoFiles.map((file) => rm(file, { force: true })));
