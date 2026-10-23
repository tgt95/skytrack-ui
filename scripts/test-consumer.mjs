#!/usr/bin/env node
/**
 * Installs the real `npm pack` tarball into an isolated temporary consumer project
 * and exercises it the way a downstream app would — without a browser, a server or
 * a rendered pixel.
 *
 * Checks:
 *   1. tarball contents: only `dist-lib` + README + AGENT_GUIDE.md + package.json; no sources, demos,
 *      showcase, config, lockfiles or credential-looking files
 *   2. every `exports` target and every `url()` referenced by the packaged CSS is
 *      present inside the tarball
 *   3. `tsc --strict --noEmit` in the consumer resolves the root entry and the
 *      per-component subpaths, under both `moduleResolution: bundler` and `node16`
 *   4. a real bundler build (`vite build`) of consumer TSX that imports components
 *      and the stylesheet succeeds and emits the CSS + font assets
 *   5. `node` can import the installed root entry and a subpath, and React is
 *      resolved once (the package ships no nested `node_modules`)
 *
 * No network: npm runs with `--offline`, so everything resolves from the local
 * cache. Nothing is rendered — no jsdom, no headless browser, no localhost.
 *
 * Usage: `npm run test:consumer` (uses the tarball matching package.json version,
 * packing it first if it is missing).
 */
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'))
const evidenceDir = path.resolve(root, '../../../_tasks/2026-10-04-skytrack-private-package/evidence')

let failures = 0
const ok = (msg) => console.log(`  PASS  ${msg}`)
const bad = (msg) => {
  failures += 1
  console.log(`  FAIL  ${msg}`)
}
const check = (condition, okMsg, failMsg) => (condition ? ok(okMsg) : bad(failMsg))
const run = (cmd, args, cwd) => execFileSync(cmd, args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] })

// ---------------------------------------------------------------- tarball
const tarballDir = path.join(root, 'dist-lib-tarball')
const tarballName = `${pkg.name}-${pkg.version}.tgz`
const tarball = path.join(tarballDir, tarballName)
if (!fs.existsSync(tarball)) {
  console.log(`[consumer] ${tarballName} missing — running pack:local first`)
  run('npm', ['run', 'pack:local'], root)
}
if (!fs.existsSync(tarball)) {
  throw new Error(`Expected current-version tarball was not created: ${tarballName}`)
}
console.log(`[consumer] tarball: ${path.relative(root, tarball)}`)

console.log('\n[consumer] 1. tarball contents')
const entries = run('tar', ['-tzf', tarball], root)
  .split('\n')
  .map((l) => l.trim())
  .filter(Boolean)
  .map((l) => l.replace(/^package\//, ''))
fs.mkdirSync(evidenceDir, { recursive: true })
fs.writeFileSync(path.join(evidenceDir, 'tarball-contents.txt'), `${entries.join('\n')}\n`)
const isForbidden = (f) => {
  const segments = f.split('/')
  if (segments.some((s) => ['src', 'demos', 'showcase', 'scripts', 'node_modules'].includes(s)))
    return 'source/demos/scripts directory'
  if (/\.tsx?$/.test(f) && !/\.d\.ts$/.test(f)) return 'TypeScript source'
  if (f.endsWith('.css') && f !== 'dist-lib/styles.css') return 'unlisted stylesheet'
  if (
    segments[0] !== 'dist-lib' &&
    segments.length === 1 &&
    /\.(html|json|js|mjs|ts)$/.test(f) &&
    !['README.md', 'package.json'].includes(f)
  )
    return 'stray top-level file'
  if (/^index\.html$/.test(f)) return 'showcase entry html'
  if (/^(vite|tsconfig)\./.test(f)) return 'build config'
  if (/package-lock\.json$/.test(f)) return 'lockfile'
  if (/(^|\/)\.[^/]+$/.test(f)) return 'dotfile'
  if (/\.(pem|key|p12|tfvars)$/.test(f)) return 'credential-looking file'
  return null
}
const forbidden = entries
  .map((f) => [f, isForbidden(f)])
  .filter(([, reason]) => reason)
  .map(([f, reason]) => `${f} (${reason})`)
check(
  forbidden.length === 0,
  `tarball has ${entries.length} files, none of them sources, demos, showcase, config, lockfiles or credentials`,
  `forbidden files in tarball: ${forbidden.slice(0, 10).join(', ')}`
)
const topLevel = [...new Set(entries.map((f) => f.split('/')[0]))].sort()
check(
  JSON.stringify(topLevel) === JSON.stringify(['AGENT_GUIDE.md', 'README.md', 'dist-lib', 'package.json']),
  `tarball top level is exactly ${topLevel.join(', ')}`,
  `unexpected tarball top level: ${topLevel.join(', ')}`
)

console.log('\n[consumer] 2. exports targets and CSS assets are inside the tarball')
const packed = new Set(entries)
const exportTargets = []
for (const value of Object.values(pkg.exports)) {
  for (const candidate of [value, typeof value === 'object' ? value.types : null]) {
    if (typeof candidate === 'string' && candidate.startsWith('./')) {
      exportTargets.push(candidate.replace(/^\.\//, ''))
    }
  }
}
const missingTargets = exportTargets.filter((t) => !packed.has(t))
check(
  missingTargets.length === 0,
  `all ${exportTargets.length} exports targets (JS + types) exist in the tarball`,
  `exports targets missing from tarball: ${missingTargets.join(', ')}`
)
const cssInTarball = entries.find((f) => f.endsWith('dist-lib/styles.css'))
if (!cssInTarball) {
  bad('dist-lib/styles.css missing from the tarball')
} else {
  const css = run('tar', ['-xzOf', tarball, `package/${cssInTarball}`], root)
  const urls = [...new Set([...css.matchAll(/url\(([^)]+)\)/g)].map((m) => m[1]))].filter(
    (u) => !u.startsWith('data:') && !u.startsWith('#')
  )
  const missingAssets = urls.filter((u) => !packed.has(path.posix.join('dist-lib', u.replace(/^\.\//, ''))))
  check(
    missingAssets.length === 0,
    `all ${urls.length} font url() references in the packed styles.css are packed too`,
    `CSS assets missing from tarball: ${missingAssets.slice(0, 5).join(', ')}`
  )
}

// ------------------------------------------------------------ consumer app
const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'skytrack-ui-consumer-'))
console.log(`\n[consumer] isolated project: ${dir}`)

const consumerSrc = `import { useState } from "react";
import {
  Button,
  Input as RootInput,
  cn,
  createDialogHandle,
  createTooltipHandle,
  buttonVariants,
  type ButtonProps,
  type TooltipChangeEventDetails,
} from "skytrack-ui";
import { Input } from "skytrack-ui/input";
import {
  Tooltip,
  TooltipPopup,
  TooltipPositioner,
  TooltipProvider,
  TooltipTrigger,
  createHandle,
  type TooltipTriggerProps,
} from "skytrack-ui/tooltip";
import type { DialogChangeEventDetails } from "skytrack-ui/dialog";
import "skytrack-ui/styles.css";

/** Type-only use of a subpath type export, so tsc must resolve that .d.ts too. */
export type Handlers = {
  onOpenChange: (open: boolean, details: DialogChangeEventDetails) => void;
  tooltip: TooltipChangeEventDetails;
  trigger: TooltipTriggerProps;
};

export function App() {
  const [open, setOpen] = useState(false);
  const tooltipHandle = createHandle();
  const rootHandle = createTooltipHandle();
  const props: ButtonProps = { variant: "outline", size: "sm" };

  return (
    <TooltipProvider>
      <div className={cn("flex flex-col gap-4 p-6", buttonVariants({ variant: "link" }))}>
        <Button {...props} onClick={() => setOpen((o) => !o)}>
          Open
        </Button>
        {/* Unaliased per-component name: proves skytrack-ui/tooltip keeps its own API. */}
        <Tooltip open={open} handle={rootHandle}>
          <TooltipTrigger
            id="help"
            render={<Input placeholder="Name" />}
            onClick={() => tooltipHandle.open("help")}
          />
          <TooltipPositioner>
            <TooltipPopup>Details</TooltipPopup>
          </TooltipPositioner>
        </Tooltip>
        <RootInput readOnly value="root input" />
      </div>
    </TooltipProvider>
  );
}

export { createDialogHandle };
`
fs.mkdirSync(path.join(dir, 'src'), { recursive: true })
fs.writeFileSync(path.join(dir, 'src/App.tsx'), consumerSrc)
fs.writeFileSync(
  path.join(dir, 'package.json'),
  `${JSON.stringify(
    {
      name: 'skytrack-ui-consumer',
      private: true,
      version: '1.0.0',
      type: 'module'
    },
    null,
    2
  )}\n`
)
const baseTsconfig = (moduleResolution) => ({
  compilerOptions: {
    target: 'ES2022',
    lib: ['ES2022', 'DOM', 'DOM.Iterable'],
    module: moduleResolution === 'node16' ? 'Node16' : 'ESNext',
    moduleResolution,
    jsx: 'react-jsx',
    strict: true,
    noEmit: true,
    skipLibCheck: true,
    types: []
  },
  include: ['src']
})
fs.writeFileSync(path.join(dir, 'tsconfig.bundler.json'), `${JSON.stringify(baseTsconfig('bundler'), null, 2)}\n`)
fs.writeFileSync(path.join(dir, 'tsconfig.node16.json'), `${JSON.stringify(baseTsconfig('node16'), null, 2)}\n`)
fs.writeFileSync(
  path.join(dir, 'vite.config.ts'),
  `import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";

// An ordinary app build (not build.lib): Vite always inlines assets referenced from
// CSS in library mode, which would hide whether the packaged fonts really resolve.
// assetsInlineLimit: 0 keeps every font a real emitted file.
export default defineConfig({
  base: "./",
  build: {
    outDir: "dist",
    emptyOutDir: true,
    assetsInlineLimit: 0,
    rolldownOptions: {
      input: { app: fileURLToPath(new URL("./src/App.tsx", import.meta.url)) },
      output: { entryFileNames: "app.js", assetFileNames: "assets/[name][extname]" },
    },
  },
});
`
)
fs.mkdirSync(path.join(evidenceDir, 'consumer'), { recursive: true })
for (const file of ['src/App.tsx', 'tsconfig.bundler.json', 'tsconfig.node16.json', 'vite.config.ts']) {
  fs.mkdirSync(path.join(evidenceDir, 'consumer', path.dirname(file)), { recursive: true })
  fs.copyFileSync(path.join(dir, file), path.join(evidenceDir, 'consumer', file))
}

const versions = {
  react: pkg.devDependencies.react,
  'react-dom': pkg.devDependencies['react-dom'],
  typescript: pkg.devDependencies.typescript,
  vite: pkg.devDependencies.vite,
  '@types/react': pkg.devDependencies['@types/react'],
  '@types/react-dom': pkg.devDependencies['@types/react-dom']
}
console.log('\n[consumer] 3. install tarball (offline)')
let installed = true
try {
  run(
    'npm',
    [
      'install',
      '--offline',
      '--no-audit',
      '--no-fund',
      '--ignore-scripts',
      tarball,
      ...Object.entries(versions).map(([name, range]) => `${name}@${range}`)
    ],
    dir
  )
} catch (error) {
  installed = false
  bad(`npm install --offline failed: ${error.stdout || error.stderr || error.message}`)
}
if (installed) {
  ok(`installed ${path.basename(tarball)} + ${Object.keys(versions).join(', ')} from the local npm cache (no network)`)
}

const bin = (name) => path.join(dir, 'node_modules/.bin', name)

if (installed) {
  console.log('\n[consumer] 4. tsc --strict against the installed package')
  for (const config of ['tsconfig.bundler.json', 'tsconfig.node16.json']) {
    try {
      run(bin('tsc'), ['-p', config], dir)
      ok(`tsc -p ${config} — root entry, 3 subpaths, styles import and subpath types all resolve`)
    } catch (error) {
      bad(
        `tsc -p ${config} failed:\n${(error.stdout || error.stderr || '').trim().split('\n').slice(0, 12).join('\n')}`
      )
    }
  }

  console.log('\n[consumer] 5. bundler build (vite build, no browser, no render)')
  try {
    const output = run(bin('vite'), ['build'], dir)
    ok(
      `vite build succeeded:\n${output
        .trim()
        .split('\n')
        .slice(-6)
        .map((l) => `      ${l}`)
        .join('\n')}`
    )
    const built = fs.readdirSync(path.join(dir, 'dist'), { recursive: true }).map(String)
    const css = built.find((f) => f.endsWith('.css'))
    const font = built.find((f) => /\.(woff2?|ttf)$/.test(f))
    check(Boolean(css), `consumer build emitted CSS (${css})`, 'consumer build emitted no CSS')
    check(Boolean(font), `consumer build emitted a font asset (${font})`, 'consumer build emitted no font asset')
    const builtCssPath = path.join(dir, 'dist', css)
    const builtCss = fs.readFileSync(builtCssPath, 'utf8')
    const builtUrls = [...new Set([...builtCss.matchAll(/url\(([^)]+)\)/g)].map((m) => m[1]))].filter(
      (u) => !u.startsWith('data:') && !u.startsWith('#')
    )
    // url()s are relative to the stylesheet, which Vite emitted under dist/assets/.
    const unresolved = builtUrls.filter((u) => !fs.existsSync(path.resolve(path.dirname(builtCssPath), u)))
    check(
      unresolved.length === 0,
      `all ${builtUrls.length} url() references in the consumer's built CSS resolve next to it`,
      `unresolved URLs in consumer CSS: ${unresolved.slice(0, 5).join(', ')}`
    )
  } catch (error) {
    bad(`vite build failed:\n${(error.stdout || error.stderr || '').trim().split('\n').slice(-12).join('\n')}`)
  }

  console.log('\n[consumer] 6. node runtime import and single React copy')
  const probe = `
    const assert = (ok, msg) => { if (!ok) { console.error("FAIL " + msg); process.exitCode = 1; } else console.log("  PASS  " + msg); };
    const root = await import("skytrack-ui");
    const tooltip = await import("skytrack-ui/tooltip");
    const input = await import("skytrack-ui/input");
    const { createRequire } = await import("node:module");
    const require = createRequire(import.meta.url);
    assert(typeof root.Button === "function" || typeof root.Button === "object", "root export Button present");
    assert(typeof root.createTooltipHandle === "function", "root alias createTooltipHandle present");
    assert("createHandle" in root === false, "ambiguous createHandle is NOT re-exported from the root");
    assert(typeof tooltip.createHandle === "function", "skytrack-ui/tooltip still exports createHandle");
    assert(typeof tooltip.Tooltip === "function" || typeof tooltip.Tooltip === "object", "skytrack-ui/tooltip exports Tooltip");
    assert(typeof input.Input === "function" || typeof input.Input === "object", "skytrack-ui/input exports Input");
    assert(typeof root.cn === "function", "root export cn present");
    const reactPath = require.resolve("react");
    const pkgDir = path.dirname(require.resolve("skytrack-ui/package.json"));
    assert(!fs.existsSync(path.join(pkgDir, "node_modules")), "installed package ships no nested node_modules");
    const fromPkg = createRequire(path.join(pkgDir, "package.json")).resolve("react");
    assert(fromPkg === reactPath, "React resolves to exactly one copy (" + reactPath.replace(process.cwd(), "<consumer>") + ")");
  `
  fs.writeFileSync(path.join(dir, 'probe.mjs'), `import fs from "node:fs";\nimport path from "node:path";\n${probe}`)
  try {
    const output = run(process.execPath, ['probe.mjs'], dir)
    for (const line of output.trim().split('\n')) console.log(line)
    if (!output.includes('FAIL')) ok('node import probe reported no failures')
  } catch (error) {
    bad(`node import probe failed:\n${(error.stdout || error.stderr || '').trim()}`)
  }
}

console.log(
  failures === 0
    ? `\n[consumer] PASS — tarball verified in an isolated offline consumer (${dir})\n`
    : `\n[consumer] FAIL — ${failures} check(s) failed (project kept at ${dir})\n`
)
process.exit(failures === 0 ? 0 : 1)
