/**
 * Builds the browser half into `client.js`.
 *
 * The Client module contract is `window.__ModuleLoader__.load({ id, factory })`
 * with a CommonJS factory: `require('react')` resolves from the browser module
 * table, so React is marked external and every local module is bundled. Run:
 *
 *   node build-client.mjs
 */
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const root = new URL(".", import.meta.url);
const manifest = JSON.parse(await readFile(new URL("package.json", root), "utf8"));

async function loadEsbuild() {
  try {
    return await import("esbuild");
  } catch (cause) {
    throw new Error(`esbuild is required to build the client. Run \`npm install\` in this directory first. (${String(cause?.message ?? cause)})`);
  }
}

const esbuild = await loadEsbuild();
const result = await esbuild.build({
  entryPoints: [fileURLToPath(new URL("client-src/client.jsx", root))],
  bundle: true,
  format: "cjs",
  platform: "browser",
  target: ["chrome110", "safari16"],
  external: ["react"],
  jsx: "transform",
  jsxFactory: "React.createElement",
  jsxFragment: "React.Fragment",
  // The app workspace tsconfig selects the automatic runtime; the Harness
  // module table only guarantees `react`, so force the classic transform here.
  tsconfigRaw: { compilerOptions: { jsx: "react" } },
  write: false,
  logLevel: "silent",
});
const code = result.outputFiles?.[0]?.text ?? "";
if (code === "") throw new Error("esbuild produced no output");

const indented = code
  .split("\n")
  .map((line) => (line === "" ? "" : `    ${line}`))
  .join("\n");

const wrapped = `/**
 * GENERATED FILE - edit client-src/*.jsx and run \`node build-client.mjs\`.
 * Registers the panel and the left-rail entry into the Harness Web UI.
 */
window.__ModuleLoader__.load({
  id: ${JSON.stringify(manifest.name)},
  factory: (require) => {
    const module = { exports: {} };
${indented}
    return module.exports;
  },
});
`;

await writeFile(new URL("client.js", root), wrapped);
console.log(`wrote client.js (${(wrapped.length / 1024).toFixed(1)} KiB)`);
