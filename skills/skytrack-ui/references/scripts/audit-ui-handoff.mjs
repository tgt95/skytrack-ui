#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'
import vm from 'node:vm'
import crypto from 'node:crypto'
import { execFileSync } from 'node:child_process'

function readFlag(name, required = true) {
  const index = process.argv.indexOf(name)
  if (index === -1) {
    if (required) throw new Error(`Missing required argument ${name}`)
    return undefined
  }
  const value = process.argv[index + 1]
  if (!value || value.startsWith('--')) throw new Error(`Expected a path/value after ${name}`)
  return value
}

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'dist' || entry.name === 'build') return []
    const target = path.join(directory, entry.name)
    if (entry.isDirectory()) return walk(target)
    return /\.(tsx?|jsx?|css|html)$/.test(entry.name) ? [target] : []
  })
}

function tableFrom(markdown) {
  const lines = markdown.split(/\r?\n/).filter((line) => /^\s*\|/.test(line))
  const cells = (line) => line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((cell) => cell.trim().replace(/^`|`$/g, ''))
  const normalizeHeader = (cell) => cell.toLowerCase().replace(/[-_]+/g, ' ').replace(/\s+/g, ' ').trim()
  const headerLine = lines.findIndex((line) => !/^\s*\|\s*:?-{3,}/.test(line))
  if (headerLine === -1) return { header: [], rows: [] }
  return {
    header: cells(lines[headerLine]).map(normalizeHeader),
    rows: lines.slice(headerLine + 1).filter((line) => !/^\s*\|\s*:?-{3,}/.test(line)).map(cells),
  }
}

const failures = []
const stage = readFlag('--stage', false) ?? 'final'
if (!['preflight', 'final'].includes(stage)) throw new Error('--stage must be preflight or final')

const sourceRoot = path.resolve(readFlag('--source-root'))
const coveragePath = path.resolve(readFlag('--coverage'))
const preflightNotRequired = process.argv.includes('--preflight-not-required')
const preflightNotRequiredReason = readFlag('--preflight-not-required-reason', false)
if (preflightNotRequired && stage !== 'final') throw new Error('--preflight-not-required is valid only with --stage final')
if (preflightNotRequired && !preflightNotRequiredReason?.trim()) throw new Error('--preflight-not-required-reason is required when preflight is NOT_REQUIRED')
const debugLogging = process.env.DEBUG === 'true'
const readLogArgument = readFlag('--read-log', debugLogging)
if (!debugLogging && readLogArgument) throw new Error('Omit --read-log unless DEBUG=true; file-read logging is disabled by default.')
const readLogPath = readLogArgument ? path.resolve(readLogArgument) : undefined
const iaPath = path.resolve(readFlag('--ia'))
const requireMain = process.argv.includes('--require-main')
const allowFullGuideRead = process.argv.includes('--allow-full-guide-read')
const gateRecordArgument = readFlag('--gate-record', !(stage === 'final' && preflightNotRequired))
const gateRecordPath = gateRecordArgument ? path.resolve(gateRecordArgument) : undefined
const packageTarballArgument = readFlag('--package-tarball', false)
const packageTarballPath = packageTarballArgument ? path.resolve(packageTarballArgument) : undefined
const finalPaths = stage === 'final'
  ? {
      typography: path.resolve(readFlag('--typography')),
      componentTypography: path.resolve(readFlag('--component-typography')),
      reconciliation: path.resolve(readFlag('--reconciliation')),
      semanticColors: path.resolve(readFlag('--semantic-colors')),
      radiusAudit: path.resolve(readFlag('--radius-audit')),
      contentAudit: path.resolve(readFlag('--content-audit')),
      interactionAudit: path.resolve(readFlag('--interaction-audit')),
      report: path.resolve(readFlag('--report')),
    }
  : {}
const promptFilePath = readFlag('--prompt-file', false)
const promptSourcePath = readFlag('--prompt-source', false)
const promptConstant = readFlag('--prompt-constant', false)
const forbiddenReadRegexText = readFlag('--forbid-read-regex', false)
let installedPackageTarballHash

const requiredFiles = [sourceRoot, coveragePath, ...(readLogPath ? [readLogPath] : []), iaPath, ...Object.values(finalPaths)]
for (const file of requiredFiles) {
  if (!fs.existsSync(file)) throw new Error(`Path does not exist: ${file}`)
}
if (Boolean(promptFilePath) !== Boolean(promptSourcePath) || Boolean(promptFilePath) !== Boolean(promptConstant)) {
  throw new Error('Prompt comparison requires all three flags: --prompt-file, --prompt-source, --prompt-constant')
}

const coverageText = fs.readFileSync(coveragePath, 'utf8')
const ia = fs.readFileSync(iaPath, 'utf8')
const coverageTable = tableFrom(coverageText)
const coverageRows = coverageTable.rows.filter((row) => /^\d+$/.test(row[0] ?? ''))
const readLog = readLogPath ? fs.readFileSync(readLogPath, 'utf8') : ''
const readTable = tableFrom(readLog)
const readRows = new Map(readTable.rows.filter((row) => /^\d+$/.test(row[0] ?? '')).map((row) => [Number(row[0]), row]))
const sourceFiles = fs.statSync(sourceRoot).isDirectory() ? walk(sourceRoot) : [sourceRoot]
const allSource = sourceFiles.map((file) => ({ file, text: fs.readFileSync(file, 'utf8') }))
const relativeToCwd = (file) => path.relative(process.cwd(), file).split(path.sep).join('/')
const normalize = (value) => value.replaceAll('\\', '/').replaceAll('`', '').trim()

function fail(message) {
  failures.push(message)
}

function sha256(file) {
  return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex')
}

const requiredImplementationReads = [
  'AGENTS.md',
  'skills/README.md',
  'skills/skytrack-ui/references/README.md',
  'skills/skytrack-ui/references/implementation-gates.md',
  'skills/skytrack-ui/references/implementation.md',
  'skills/skytrack-ui/references/AGENT_GUIDE.md',
  'skills/skytrack-ui/references/UI_RULES.md',
  'skills/skytrack-ui/references/knowledge/COMPONENT_ROUTING.md',
]

function openedReadFor(expectedPath) {
  const expected = normalize(expectedPath)
  return [...readRows.values()].find((row) => {
    const actual = normalize(row[2] ?? '')
    return (row.at(-1) ?? '').toLowerCase() === 'opened'
      && (actual === expected || actual.endsWith(`/${expected}`) || expected.endsWith(`/${actual}`))
  })
}

function openedReadsFor(expectedPath) {
  const expected = normalize(expectedPath)
  return [...readRows.values()].filter((row) => {
    const actual = normalize(row[2] ?? '')
    return (row.at(-1) ?? '').toLowerCase() === 'opened'
      && (actual === expected || actual.endsWith(`/${expected}`) || expected.endsWith(`/${actual}`))
  })
}

function checkRequiredInstructionReads() {
  if (!debugLogging) return
  const rows = []
  for (const instructionPath of requiredImplementationReads) {
    const row = openedReadFor(instructionPath)
    if (!row) fail(`FILE-READ-LOG must show ${instructionPath} was opened before the component gate.`)
    else rows.push(row)
  }
  const guideRows = openedReadsFor('skills/skytrack-ui/references/AGENT_GUIDE.md')
  const readScopeColumn = readTable.header.indexOf('read scope')
  if (guideRows.length && readScopeColumn !== -1) {
    const fullFileRead = guideRows.find((row) => (row[readScopeColumn] ?? '').trim().toLowerCase() === 'full-file')
    const targetedRead = guideRows.some((row) => /^(?:heading|lines):\s*\S/i.test((row[readScopeColumn] ?? '').trim()))
    if (fullFileRead && !allowFullGuideRead) {
      fail('AGENT_GUIDE.md is a long routed reference: do not read the full file by default; use the exact relevant heading with read-and-log.mjs --heading.')
    }
    if (!targetedRead && !allowFullGuideRead) {
      fail('FILE-READ-LOG must show a targeted heading or line-range read for AGENT_GUIDE.md, not a full-file read.')
    }
  }
  if (stage === 'preflight' && rows.length === requiredImplementationReads.length) {
    const latestInstructionRead = Math.max(...rows.map((row) => Date.parse(row[1])).filter(Number.isFinite))
    for (const { file } of allSource) {
      const modifiedAt = fs.statSync(file).mtimeMs
      if (Number.isFinite(latestInstructionRead) && modifiedAt > latestInstructionRead) {
        fail(`Source ${relativeToCwd(file)} changed before the required implementation instructions were read; finish the rule/router reads, then refresh the preflight gate before writing UI.`)
      }
    }
  }
}

function checkInstalledPackageMatchesTarball() {
  if (!packageTarballPath) return undefined
  if (!fs.existsSync(packageTarballPath)) {
    fail(`Pinned package tarball does not exist: ${relativeToCwd(packageTarballPath)}`)
    return undefined
  }
  const tarballRead = [...readRows.values()].some((row) => {
    if ((row.at(-1) ?? '').toLowerCase() !== 'opened') return false
    const logged = normalize(row[2] ?? '')
    return path.resolve(process.cwd(), logged) === packageTarballPath
  })
  if (debugLogging && !tarballRead) fail(`FILE-READ-LOG must record the pinned package tarball as opened: ${relativeToCwd(packageTarballPath)}.`)

  const installedColumn = coverageTable.header.indexOf('installed package')
  const manifestPath = coverageRows
    .map((row) => installedManifestFromCell(row[installedColumn] ?? ''))
    .find((value) => value && fs.existsSync(resolveEvidencePath(value)))
  if (!manifestPath) {
    fail('Cannot locate the installed skytrack-ui manifest path for package-integrity comparison.')
    return sha256(packageTarballPath)
  }
  const packageRoot = path.dirname(resolveEvidencePath(manifestPath))
  if (!fs.existsSync(packageRoot) || !fs.statSync(packageRoot).isDirectory()) {
    fail(`Installed skytrack-ui package directory is missing: ${relativeToCwd(packageRoot)}`)
    return sha256(packageTarballPath)
  }
  let entries
  try {
    entries = execFileSync('tar', ['-tzf', packageTarballPath], { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 })
      .split(/\r?\n/).filter((entry) => entry.startsWith('package/') && !entry.endsWith('/'))
  } catch (error) {
    fail(`Cannot list pinned skytrack-ui tarball: ${error.message}`)
    return sha256(packageTarballPath)
  }
  if (!entries.length) fail('Pinned skytrack-ui tarball contains no package files.')
  const archivedFiles = new Set(entries.map((entry) => entry.slice('package/'.length)))
  const installedFiles = new Set()
  const collectInstalledFiles = (directory) => {
    for (const child of fs.readdirSync(directory, { withFileTypes: true })) {
      const fullPath = path.join(directory, child.name)
      const relativePath = path.relative(packageRoot, fullPath).split(path.sep).join('/')
      if (child.isDirectory()) collectInstalledFiles(fullPath)
      else if (child.isFile() || child.isSymbolicLink()) installedFiles.add(relativePath)
    }
  }
  collectInstalledFiles(packageRoot)
  for (const relativePath of archivedFiles) {
    if (!installedFiles.has(relativePath)) fail(`Pinned package file is absent from installed skytrack-ui: ${relativePath}`)
  }
  for (const relativePath of installedFiles) {
    if (!archivedFiles.has(relativePath)) fail(`Installed skytrack-ui contains an extra file absent from the pinned tarball: ${relativePath}`)
  }
  for (const entry of entries) {
    const relativePath = entry.slice('package/'.length)
    const installedPath = path.resolve(packageRoot, relativePath)
    if (!installedPath.startsWith(`${packageRoot}${path.sep}`)) {
      fail(`Unsafe package path in tarball: ${entry}`)
      continue
    }
    if (!fs.existsSync(installedPath) || !fs.statSync(installedPath).isFile()) {
      fail(`Installed skytrack-ui file is missing from the pinned tarball contents: ${relativePath}`)
      continue
    }
    try {
      const archivedBytes = execFileSync('tar', ['-xOzf', packageTarballPath, entry], { encoding: 'buffer', maxBuffer: 128 * 1024 * 1024 })
      const installedBytes = fs.readFileSync(installedPath)
      if (!archivedBytes.equals(installedBytes)) fail(`Installed skytrack-ui file differs from the pinned tarball: ${relativePath}`)
    } catch (error) {
      fail(`Cannot compare installed skytrack-ui file ${relativePath} with tarball: ${error.message}`)
    }
  }
  installedPackageTarballHash = sha256(packageTarballPath)
  return installedPackageTarballHash
}

function requireHeaderColumns(table, required, label) {
  for (const token of required) {
    if (!table.header.some((cell) => cell.includes(token))) fail(`${label} table is missing a '${token}' column.`)
  }
}

function markdownSection(markdown, heading) {
  const lines = markdown.split(/\r?\n/)
  const start = lines.findIndex((line) => line.trim() === `## ${heading}`)
  if (start === -1) return ''
  const nextHeading = lines.findIndex((line, index) => index > start && /^##\s+/.test(line))
  return lines.slice(start + 1, nextHeading === -1 ? lines.length : nextHeading).join('\n')
}

function citedReadIds(cell) {
  return [...cell.matchAll(/\d+/g)].map((match) => Number(match[0]))
}

function rowHasOpenedPath(row, expectedPath) {
  const expected = normalize(expectedPath)
  const readPath = normalize(row?.[2] ?? '')
  const disposition = (row?.at(-1) ?? '').toLowerCase()
  if (!row || disposition !== 'opened') return false
  return readPath === expected || readPath.endsWith(`/${expected}`) || expected.endsWith(`/${readPath}`)
}

function evidenceCellPaths(value, pattern) {
  const flags = pattern instanceof RegExp ? pattern.flags : 'gi'
  const regex = new RegExp(pattern instanceof RegExp ? pattern.source : pattern, flags.includes('g') ? flags : `${flags}g`)
  return [...normalize(value ?? '').matchAll(regex)].map((match) => match[0])
}

function resolveEvidencePath(value) {
  const cleaned = normalize(value).replace(/^['"]|['"]$/g, '')
  return path.isAbsolute(cleaned) ? cleaned : path.resolve(process.cwd(), cleaned)
}

let forbiddenReadRegex
if (forbiddenReadRegexText) {
  try {
    forbiddenReadRegex = new RegExp(forbiddenReadRegexText, 'i')
  } catch {
    throw new Error('--forbid-read-regex must be a valid regular expression')
  }
}

if (forbiddenReadRegex) {
  for (const row of readRows.values()) {
    const readPath = normalize(row[2] ?? '')
    if (forbiddenReadRegex.test(readPath)) fail(`FILE-READ-LOG includes a forbidden prior-run path: ${readPath}`)
  }
}

function installedManifestFromCell(value) {
  return evidenceCellPaths(value, /(?:[A-Za-z]:)?(?:[^\s|`()]+\/)*node_modules\/skytrack-ui\/package\.json/i)[0]
}

function installedManifestInfo() {
  const installedColumn = coverageTable.header.indexOf('installed package')
  for (const row of coverageRows) {
    const manifestPath = installedManifestFromCell(row[installedColumn] ?? '')
    if (!manifestPath) continue
    const absolutePath = resolveEvidencePath(manifestPath)
    if (!fs.existsSync(absolutePath)) continue
    try {
      return { manifestPath, absolutePath, packageRoot: path.dirname(absolutePath), manifest: JSON.parse(fs.readFileSync(absolutePath, 'utf8')) }
    } catch {}
  }
  return undefined
}

function exportTargets(value) {
  if (typeof value === 'string') return [value]
  if (!value || typeof value !== 'object') return []
  return Object.values(value).flatMap(exportTargets)
}

function installedStylesheetInfo() {
  const packageInfo = installedManifestInfo()
  if (!packageInfo) return undefined
  const exportTarget = exportTargets(packageInfo.manifest.exports?.['./styles.css']).find((target) => /\.css(?:[?#].*)?$/i.test(target))
  if (!exportTarget) return undefined
  const stylesheetPath = path.resolve(packageInfo.packageRoot, exportTarget.replace(/^\.\//, ''))
  return { ...packageInfo, stylesheetPath, exportTarget }
}

function installedSubpathsFromCell(value) {
  return [...new Set([...normalize(value).matchAll(/skytrack-ui\/([a-z0-9-]+)(?=[`)]|\s|\|)/gi)].map((match) => `./${match[1]}`))]
}

function checkInstalledThemeReads() {
  const stylesheetInfo = installedStylesheetInfo()
  if (!stylesheetInfo) {
    fail('Cannot resolve the installed skytrack-ui package manifest and ./styles.css export from COMPONENT-COVERAGE.')
    return
  }
  if (!fs.existsSync(stylesheetInfo.stylesheetPath) || !fs.statSync(stylesheetInfo.stylesheetPath).isFile()) {
    fail(`Installed skytrack-ui ./styles.css export does not resolve to a file: ${stylesheetInfo.exportTarget}`)
    return
  }
  const stylesheetText = fs.readFileSync(stylesheetInfo.stylesheetPath, 'utf8')
  if (!/--radius\s*:\s*(?:0?\.125rem|2px)(?=\s*[;}])/i.test(stylesheetText)) {
    fail('Installed SkyTrack stylesheet must define the --radius token as 2px (0.125rem).')
  }
  const fontReferences = [...stylesheetText.matchAll(/url\(\s*["']?([^"')]+\.(?:woff2?|ttf|otf)(?:\?[^"')]+)?)["']?\s*\)/gi)].map((match) => match[1])
  for (const reference of fontReferences) {
    if (/^(?:data:|https?:|\/\/)/i.test(reference)) continue
    let relativeFontPath = reference.split('?')[0]
    try { relativeFontPath = decodeURIComponent(relativeFontPath) } catch {}
    const fontPath = path.resolve(path.dirname(stylesheetInfo.stylesheetPath), relativeFontPath)
    if (!fs.existsSync(fontPath) || !fs.statSync(fontPath).isFile()) {
      fail(`Installed skytrack-ui stylesheet references a missing font asset: ${reference}`)
    }
  }
  if (debugLogging) {
    const openedStylesheet = [...readRows.values()].some((row) => {
      if ((row.at(-1) ?? '').toLowerCase() !== 'opened') return false
      return path.resolve(process.cwd(), normalize(row[2] ?? '')) === stylesheetInfo.stylesheetPath
    })
    const openedFontAsset = [...readRows.values()].some((row) => /node_modules\/skytrack-ui\/.+\.(?:woff2?|ttf|otf)(?:\?.*)?$/i.test(normalize(row[2] ?? '')) && (row.at(-1) ?? '').toLowerCase() === 'opened')
    if (!openedStylesheet) fail('FILE-READ-LOG must show the installed skytrack-ui styles.css export was opened when DEBUG=true.')
    if (!openedFontAsset) fail('FILE-READ-LOG must show an installed skytrack-ui font asset was opened when DEBUG=true.')
  }
}

function checkCoveragePreflight() {
  checkRequiredInstructionReads()
  if (debugLogging) {
    requireHeaderColumns(readTable, ['timestamp', 'path opened', 'reason', 'content sha 256', 'method', 'read scope', 'disposition'], 'FILE-READ-LOG')
    const numberedReadRows = readTable.rows.filter((row) => /^\d+$/.test(row[0] ?? ''))
    if (numberedReadRows.length !== readRows.size) fail('FILE-READ-LOG contains duplicate numbered read entries.')
    const sortedReadIds = [...readRows.keys()].sort((a, b) => a - b)
    if (sortedReadIds.some((id, index) => id !== index + 1)) fail('FILE-READ-LOG numbered entries must be contiguous from 1.')
    const contentHashColumn = readTable.header.indexOf('content sha 256')
    const methodColumn = readTable.header.indexOf('method')
    const readScopeColumn = readTable.header.indexOf('read scope')
    for (const row of readRows.values()) {
      if ((row.at(-1) ?? '').toLowerCase() !== 'opened') continue
      if (!/^[a-f0-9]{64}$/i.test(row[contentHashColumn] ?? '')) {
        fail(`FILE-READ-LOG row ${row[0]} is missing the read-time content SHA-256.`)
      }
      if ((row[methodColumn] ?? '') !== 'read-and-log.mjs') {
        fail(`FILE-READ-LOG row ${row[0]} was not captured by read-and-log.mjs.`)
      }
      if (readScopeColumn !== -1 && !/^(?:full-file|metadata-only|heading:\s*\S.*|lines:\s*\d+(?:-\d+)?)$/i.test((row[readScopeColumn] ?? '').trim())) {
        fail(`FILE-READ-LOG row ${row[0]} is missing a valid Read scope (full-file, metadata-only, heading, or lines).`)
      }
      const loggedPath = normalize(row[2] ?? '')
      const immutableEvidence = /^(?:AGENTS\.md|agents\/.*|designs\/components\/skytrack-ui\/.*|PROMPT\.md|(?:\.\.\/)?package-artifacts\/.*|probe-app\/node_modules\/skytrack-ui\/.*)$/i
      if (immutableEvidence.test(loggedPath)) {
        const evidencePath = resolveEvidencePath(loggedPath)
        if (!fs.existsSync(evidencePath) || !fs.statSync(evidencePath).isFile()) {
          fail(`FILE-READ-LOG row ${row[0]} cites missing immutable evidence: ${loggedPath}`)
        } else if (sha256(evidencePath) !== (row[contentHashColumn] ?? '').toLowerCase()) {
          fail(`FILE-READ-LOG row ${row[0]} hash does not match current immutable evidence: ${loggedPath}; reopen it through read-and-log.mjs.`)
        }
      }
    }
  }
  const packageTarballHash = checkInstalledPackageMatchesTarball()
  requireHeaderColumns(coverageTable, [
    'distinct ui need', 'candidate component', 'installed package', 'declaration path',
    'runtime implementation path', 'compatible demo path', 'read log entries', 'decision',
  ], 'COMPONENT-COVERAGE')
  if (!coverageRows.length) fail('COMPONENT-COVERAGE.md has no numbered UI-need rows.')
  for (const row of coverageRows) {
    const need = row[1] ?? ''
    if (/skytrack-ui\/chart/i.test(row[2] ?? '')
      && /\b(?:trend|time[ -]?series|over time|monthly)\b/i.test(need)
      && /\b(?:distribution|outcome|category)\b/i.test(need)) {
      fail(`Coverage row ${row[0]} combines a time trend and category/outcome distribution; map each distinct chart need separately.`)
    }
  }
  if (!/\bmain\b/i.test(ia)) fail('IA outline does not declare the page main landmark.')
  if (!/heading inventory/i.test(ia)) fail('IA outline is missing a heading inventory.')
  checkInstalledThemeReads()

  for (const row of coverageRows) {
    const [number, need, candidate, installed, declaration, runtime, demo, refs, decision] = row
    const label = `Coverage row ${number} (${need || 'unnamed need'})`
    const fullRow = row.join(' | ')
    if (!/skytrack-ui@[^\s|`]+/i.test(fullRow)) fail(`${label}: record exact installed skytrack-ui version and candidate export.`)
    if (!/node_modules\/skytrack-ui\/package\.json/.test(fullRow)) fail(`${label}: include the installed package.json path; source-only/version-string evidence is insufficient.`)
    const manifestEvidencePath = installedManifestFromCell(installed ?? '')
    let installedManifest
    if (!manifestEvidencePath || !fs.existsSync(resolveEvidencePath(manifestEvidencePath))) {
      fail(`${label}: the exact installed package manifest path must resolve from this case folder.`)
    } else {
      try {
        installedManifest = JSON.parse(fs.readFileSync(resolveEvidencePath(manifestEvidencePath), 'utf8'))
      } catch {
        fail(`${label}: the installed package manifest is not readable JSON.`)
      }
    }
    const reportedVersion = fullRow.match(/skytrack-ui@([^\s|`),]+)/i)?.[1]
    if (installedManifest && reportedVersion !== installedManifest.version) {
      fail(`${label}: reported version ${reportedVersion ?? '(missing)'} differs from installed manifest ${installedManifest.version}.`)
    }
    const subpaths = installedSubpathsFromCell(`${candidate ?? ''} ${installed ?? ''}`)
    if (!subpaths.length) fail(`${label}: name the exact installed export subpath, e.g. skytrack-ui/chart.`)
    for (const subpath of subpaths) {
      if (!installedManifest?.exports || !Object.hasOwn(installedManifest.exports, subpath)) {
        fail(`${label}: installed manifest does not export ${subpath}.`)
      }
    }
    if (!/\.d\.ts\b|not shipped/i.test(declaration ?? '')) fail(`${label}: record the installed declaration path, or state that declarations are not shipped.`)
    if (!/\.(?:m?js|cjs)\b|not shipped/i.test(runtime ?? '')) fail(`${label}: record the installed runtime implementation path, or state that runtime source is not shipped.`)
    for (const [kind, cell, pattern] of [
      ['declaration', declaration, /[^\s|`]*node_modules\/skytrack-ui\/[^\s|`]+\.d\.ts/i],
      ['runtime implementation', runtime, /[^\s|`]*node_modules\/skytrack-ui\/[^\s|`]+\.(?:m?js|cjs)/i],
    ]) {
      if (/not shipped/i.test(cell ?? '')) continue
      const installedPaths = evidenceCellPaths(cell, pattern)
      if (!installedPaths.length) fail(`${label}: ${kind} must come from the installed node_modules/skytrack-ui artifact, not a source checkout.`)
      for (const evidencePath of installedPaths) {
        if (!fs.existsSync(resolveEvidencePath(evidencePath))) fail(`${label}: installed ${kind} path does not exist: ${evidencePath}`)
      }
    }
    const noDemo = /no compatible demo/i.test(demo ?? '') && /because|reason|none exists|not shipped/i.test(demo ?? '')
    if (!noDemo && !/\.(?:tsx|jsx|md)$/i.test(demo ?? '')) fail(`${label}: record the closest compatible demo path, or an explicit no-demo reason.`)
    if (!/\b(?:use|compose|fallback|not selected|reject|missing|does not support|cannot compose)\b/i.test(decision ?? '')) {
      fail(`${label}: record the component decision and composition, not only a candidate name.`)
    }
    if (/native|hand-authored|local fallback|custom/i.test(`${candidate} ${decision}`)) {
      if (!/DataTable|skytrack-ui\//i.test(`${candidate} ${decision}`)) fail(`${label}: compare a custom/native fallback with the installed SkyTrack candidate.`)
      if (!/missing|cannot compose|does not support|mismatch|static lookup|unnecessary|not shipped/i.test(decision ?? '')) {
        fail(`${label}: custom/native fallback needs an exact capability gap or semantic-fit reason.`)
      }
    }

    if (!debugLogging && refs?.trim() && !/^(?:—|-)$/.test(refs.trim())) {
      fail(`${label}: leave read-log entries blank or '—' unless DEBUG=true.`)
    }
    if (debugLogging) {
      const ids = citedReadIds(refs ?? '')
      if (!ids.length) {
        fail(`${label}: cite FILE-READ-LOG row numbers for installed package, declaration, implementation, and demo evidence.`)
        continue
      }
      const citedRows = ids.map((id) => readRows.get(id))
      for (const id of ids) if (!readRows.has(id)) fail(`${label}: FILE-READ-LOG has no row ${id}.`)
      const evidenceCells = [installed, declaration, runtime, ...(noDemo ? [] : [demo])]
      for (const evidenceCell of evidenceCells) {
        const matches = normalize(evidenceCell ?? '').match(/(?:[\w./@-]+\/)*[\w.@-]+\.(?:json|d\.ts|m?js|cjs|tsx|jsx|md)/gi) ?? []
        for (const evidencePath of matches) {
          if (evidencePath.startsWith('skytrack-ui@')) continue
          if (evidencePath.includes('node_modules/skytrack-ui/')) {
            if (!fs.existsSync(resolveEvidencePath(evidencePath))) fail(`${label}: installed evidence path does not exist: ${evidencePath}`)
          } else if (evidenceCell === demo && !fs.existsSync(resolveEvidencePath(evidencePath))) {
            fail(`${label}: compatible demo path does not exist: ${evidencePath}`)
          }
          if (!citedRows.some((readRow) => rowHasOpenedPath(readRow, evidencePath))) {
            fail(`${label}: cited read-log rows do not show this evidence path was opened: ${evidencePath}`)
          }
        }
      }
      if (!citedRows.some((readRow) => /node_modules\/skytrack-ui\/package\.json/.test(normalize(readRow?.[2] ?? '')) && (readRow?.at(-1) ?? '').toLowerCase() === 'opened')) {
        fail(`${label}: cited read-log rows do not show the installed package manifest was opened.`)
      }
    }
  }

  // Percentage-fill divs commonly replace Chart, Meter, or Progress. MeterIndicator already
  // derives its fill from Meter.value; handwritten widths duplicate the component state.
  for (const { file, text } of allSource) {
    for (const match of text.matchAll(/<MeterIndicator\b[^>]{0,800}\bwidth\s*:/gs)) {
      const line = text.slice(0, match.index).split(/\r?\n/).length
      fail(`Manual width on MeterIndicator at ${relativeToCwd(file)}:${line}; Meter derives fill from its parent value.`)
    }
    const fills = [...text.matchAll(/<div\b(?:(?!>).){0,900}?\bstyle\s*=\s*\{\{(?:(?!>).){0,900}?\bwidth\s*:\s*`[^`]*%[^`]*`(?:(?!>).){0,500}?\bbackgroundColor\s*:/gs)]
    if (!fills.length) continue
    const documentedGap = coverageRows.some((row) => /(?:custom|local fallback|inline range|inline bar)/i.test(`${row[1]} ${row[8]}`)
      && /skytrack-ui\/(?:chart|meter|progress)/i.test(`${row[2]} ${row[8]}`)
      && /(?:gap|missing|cannot compose|does not support|mismatch)/i.test(row[8] ?? ''))
    for (const match of fills) {
      const line = text.slice(0, match.index).split(/\r?\n/).length
      if (!documentedGap) fail(`Hand-built percentage fill at ${relativeToCwd(file)}:${line}; use the verified Chart/Meter/Progress composition or map a specific capability gap before using a local fallback.`)
    }
  }

  if (debugLogging) {
    const timestamps = [...readRows.values()].map((row) => Date.parse(row[1])).filter(Number.isFinite)
    if (timestamps.some((value, index) => index > 0 && value < timestamps[index - 1])) fail('FILE-READ-LOG timestamps are not chronological.')
  }
  const coverageLabel = stage === 'preflight' ? 'PRE-CODE COMPONENT GATE' : 'FINAL COVERAGE CONSISTENCY'
  console.log(`${coverageLabel}: ${coverageRows.length} UI-need row(s); read logging ${debugLogging ? `enabled (${readRows.size} rows)` : 'disabled'}; package tarball SHA-256 ${packageTarballHash ?? 'unavailable'}`)
}

if (stage === 'final' && preflightNotRequired) {
  requireHeaderColumns(coverageTable, [
    'distinct ui need', 'candidate component', 'installed package', 'declaration path',
    'runtime implementation path', 'compatible demo path', 'read log entries', 'decision',
  ], 'COMPONENT-COVERAGE')
  if (!coverageRows.length) fail('COMPONENT-COVERAGE.md has no numbered UI-need rows.')
  console.log(`PRE-CODE COMPONENT GATE: NOT_REQUIRED — ${preflightNotRequiredReason.trim()}`)
} else {
  checkCoveragePreflight()
}

if (stage === 'final') {
  const typography = fs.readFileSync(finalPaths.typography, 'utf8')
  const componentTypography = fs.readFileSync(finalPaths.componentTypography, 'utf8')
  const reconciliation = fs.readFileSync(finalPaths.reconciliation, 'utf8')
  const semanticColors = fs.readFileSync(finalPaths.semanticColors, 'utf8')
  const radiusAudit = fs.readFileSync(finalPaths.radiusAudit, 'utf8')
  const contentAudit = fs.readFileSync(finalPaths.contentAudit, 'utf8')
  const interactionAudit = fs.readFileSync(finalPaths.interactionAudit, 'utf8')
  const report = fs.readFileSync(finalPaths.report, 'utf8')
  const componentTypographyTable = tableFrom(componentTypography)

  requireHeaderColumns(componentTypographyTable, ['component', 'installed default', 'effective size', 'role', 'override', 'evidence'], 'COMPONENT-TYPOGRAPHY-AUDIT')
  const contentTable = tableFrom(contentAudit)
  const interactionTable = tableFrom(interactionAudit)
  requireHeaderColumns(contentTable, [
    'claim', 'source', 'source evidence', 'classification', 'scope', 'disclosure', 'code evidence', 'calculation',
  ], 'CONTENT-AUDIT')
  requireHeaderColumns(interactionTable, [
    'control', 'expected result', 'code evidence', 'observed result', 'browser evidence',
  ], 'INTERACTION-AUDIT')
  if (!contentTable.rows.length) fail('CONTENT-AUDIT must contain at least one claim/data-scope row for this substantive screen.')
  const contentHeader = contentTable.header
  const contentColumn = (name) => contentHeader.findIndex((cell) => cell.includes(name))
  const contentColumns = Object.fromEntries(['claim', 'source', 'source evidence', 'classification', 'scope', 'disclosure', 'code evidence', 'calculation'].map((name) => [name, contentColumn(name)]))
  if (Object.values(contentColumns).some((index) => index === -1)) fail('CONTENT-AUDIT is missing a required source-evidence column.')
  if (contentTable.rows.some((row) => Object.values(contentColumns).some((index) => !row[index]?.trim()))) fail('CONTENT-AUDIT contains a row missing claim, source evidence, classification, scope, disclosure, or code evidence.')

  const promptText = promptFilePath ? fs.readFileSync(path.resolve(promptFilePath), 'utf8') : ''
  const openedContentSources = new Map()
  for (const row of readRows.values()) {
    if ((row.at(-1) ?? '').toLowerCase() !== 'opened') continue
    const evidencePath = normalize(row[2] ?? '')
    if (!/\.(?:md|txt|html|json|ya?ml)$/i.test(evidencePath)) continue
    const absolutePath = resolveEvidencePath(evidencePath)
    if (!fs.existsSync(absolutePath)) continue
    try { openedContentSources.set(evidencePath, fs.readFileSync(absolutePath, 'utf8')) } catch {}
  }
  const trustedContentEvidence = []
  const evidenceCitation = /([^\s|`]+\.(?:md|txt|html|json|ya?ml)):(\d+)/gi
  const evidenceQuotes = (value) => [...value.matchAll(/[“"]([^”"]+)[”"]|`([^`]+)`/g)].map((match) => match[1] ?? match[2]).filter((quote) => !/\.(?:md|tsx?|jsx?)$/i.test(quote))
  for (const row of contentTable.rows) {
    const evidence = row[contentColumns['source evidence']] ?? ''
    const citations = [...evidence.matchAll(evidenceCitation)]
    const quotes = evidenceQuotes(evidence)
    const sourceLabel = (row[contentColumns.source] ?? '').toLowerCase()
    const classification = (row[contentColumns.classification] ?? '').toLowerCase()
    const isSyntheticOnly = /synthetic|local sample|local simulation/.test(classification) && /no (?:external|policy|authority)|synthetic|worker-created|local sample/i.test(evidence)
    if (!citations.length && !isSyntheticOnly) {
      fail(`CONTENT-AUDIT claim '${row[contentColumns.claim] ?? '(unnamed)'}' needs an opened source locator and exact excerpt, or explicit synthetic-only provenance.`)
      continue
    }
    if (citations.length && !quotes.length) fail(`CONTENT-AUDIT claim '${row[contentColumns.claim] ?? '(unnamed)'}' cites a source but lacks a verifiable exact excerpt.`)
    for (const citation of citations) {
      const citedPath = normalize(citation[1])
      const citedLine = Number(citation[2])
      const openedEntry = [...openedContentSources.entries()].find(([openedPath]) => openedPath === citedPath || openedPath.endsWith(`/${citedPath}`) || citedPath.endsWith(`/${openedPath}`))
      if (debugLogging && !openedEntry) {
        fail(`CONTENT-AUDIT source '${citedPath}' must appear as opened in FILE-READ-LOG.md when DEBUG=true.`)
        continue
      }
      const citedSourcePath = openedEntry ? resolveEvidencePath(openedEntry[0]) : resolveEvidencePath(citedPath)
      if (!fs.existsSync(citedSourcePath) || !fs.statSync(citedSourcePath).isFile()) {
        fail(`CONTENT-AUDIT source '${citedPath}' does not resolve to an existing file.`)
        continue
      }
      let citedSourceText = openedEntry?.[1]
      if (citedSourceText === undefined) {
        try { citedSourceText = fs.readFileSync(citedSourcePath, 'utf8') } catch { citedSourceText = '' }
      }
      if (/^(?:AGENTS\.md|CLAUDE\.md|GEMINI\.md|.*(?:UI_RULES|AGENT_GUIDE|design-system-implementation|CONTENT-AUDIT|WORKER-REPORT|COORDINATOR-REVIEW|FILE-READ-LOG)\.md)$/i.test(citedPath)
        || /(?:^|\/)probe-app\/src\//i.test(citedPath)) {
        fail(`CONTENT-AUDIT source '${citedPath}' is an instruction, generated artifact, or implementation file—not authority for product claims.`)
      }
      const sourceLine = citedSourceText.split(/\r?\n/)[citedLine - 1] ?? ''
      for (const quote of quotes) {
        if (!sourceLine.includes(quote)) fail(`CONTENT-AUDIT excerpt for ${citedPath}:${citedLine} does not match that opened source line.`)
        else trustedContentEvidence.push(quote)
      }
    }
    if (/prompt requirement|owner policy|official|regulatory|safety policy|operational threshold/.test(sourceLabel) && !citations.length) {
      fail(`CONTENT-AUDIT source '${row[contentColumns.source]}' needs an exact source citation; a generic label is not evidence.`)
    }
    const claimAndScope = `${row[contentColumns.claim] ?? ''} ${row[contentColumns.scope] ?? ''}`
    const classificationForMetric = (row[contentColumns.classification] ?? '').toLowerCase()
    if (!/functional requirement|architecture constraint|data requirement/.test(classificationForMetric)
      && /\b(?:aggregate|(?:fleet|cohort|overall|grand) total|mean|average|median|distribution|percentage(?: rate)?)\b/i.test(claimAndScope)) {
      const calculation = row[contentColumns.calculation] ?? ''
      const hasFormula = /\b(?:sum|mean|average|median|count)\s*\(|[÷*/]/i.test(calculation)
      const hasNumericResult = /(?:=|\bresult\s*:?\s*)\s*\d[\d,]*(?:\.\d+)?\s*%?/i.test(calculation)
      const hasInputRows = /\b(?:input|source)\s+(?:data\s+)?rows?\b|\b(?:input|source)\s+records?\b|\b(?:all|rows?)\s+\d+\s+(?:records?|values?|categories)\b/i.test(calculation)
      if (!hasFormula || !hasNumericResult || !hasInputRows) {
        fail(`CONTENT-AUDIT aggregate '${row[contentColumns.claim] ?? '(unnamed)'}' needs a reproducible formula, numeric result, and exact input-row/record scope in Consistency / Calculation.`)
      }
      const declaredInputCount = calculation.match(/\b(?:input|source)\s+(?:data\s+)?rows?\s*:\s*(\d+)\b/i)?.[1]
        ?? calculation.match(/\b(?:input|source)\s+records?\s*:\s*(\d+)\b/i)?.[1]
      for (const average of calculation.matchAll(/\b(?:mean|average)\s*\(([^)]*)\)/gi)) {
        const inputValues = average[1].match(/-?\d[\d,]*(?:\.\d+)?/g) ?? []
        if (inputValues.length < 2 || (declaredInputCount && Number(declaredInputCount) < 2)) {
          fail(`CONTENT-AUDIT aggregate '${row[contentColumns.claim] ?? '(unnamed)'}' calls a single scalar an average; provide multiple source records and calculate their mean, or describe it as one reading.`)
        }
      }
      for (const formula of calculation.matchAll(/\b(sum|mean|average)\s*\(([-+\d\s,\.]+)\)\s*=\s*(-?\d[\d,]*(?:\.\d+)?)/gi)) {
        const operator = formula[1].toLowerCase()
        const values = formula[2].match(/-?\d[\d,]*(?:\.\d+)?/g)?.map((value) => Number(value.replaceAll(',', ''))) ?? []
        if (!values.length) continue
        const reported = Number(formula[3].replaceAll(',', ''))
        const computed = operator === 'sum' ? values.reduce((total, value) => total + value, 0) : values.reduce((total, value) => total + value, 0) / values.length
        if (Number.isFinite(reported) && Math.abs(computed - reported) > 0.011) {
          fail(`CONTENT-AUDIT formula '${formula[0]}' computes to ${computed}, not ${reported}.`)
        }
      }
      if (/\bdistribution\b/i.test(claimAndScope)) {
        if (!/\b(?:count|category count)\s*[\/÷]\s*(?:total|denominator|\d+)\s*(?:\*|×)\s*100\b/i.test(calculation)) {
          fail(`CONTENT-AUDIT distribution '${row[contentColumns.claim] ?? '(unnamed)'}' must show the per-category count / total × 100 formula.`)
        }
        if (!/\bround(?:ed|ing)?\s+(?:to|at)\s+\d+\s+decimal(?: place)?s?\b/i.test(calculation)) {
          fail(`CONTENT-AUDIT distribution '${row[contentColumns.claim] ?? '(unnamed)'}' must state the displayed percentage rounding precision.`)
        }
        const displayedShareFormula = calculation.match(/\bdisplayed\s+rounded\s+shares?\s*:\s*sum\s*\(([^)]+)\)\s*=\s*(\d[\d,]*(?:\.\d+)?)\s*%/i)
        if (!displayedShareFormula) {
          fail(`CONTENT-AUDIT distribution '${row[contentColumns.claim] ?? '(unnamed)'}' must total every displayed rounded share, e.g. Displayed rounded shares: sum(...)=100.1%.`)
        } else {
          const shares = displayedShareFormula[1].match(/-?\d[\d,]*(?:\.\d+)?/g)?.map((value) => Number(value.replaceAll(',', ''))) ?? []
          const reportedShareTotal = Number(displayedShareFormula[2].replaceAll(',', ''))
          const computedShareTotal = shares.reduce((total, value) => total + value, 0)
          if (!shares.length || Math.abs(computedShareTotal - reportedShareTotal) > 0.011) {
            fail(`CONTENT-AUDIT displayed rounded shares sum to ${computedShareTotal}%, not ${reportedShareTotal}%.`)
          }
          const sourceText = allSource.map(({ text }) => text).join('\n')
          const claimsExactHundred = /\b(?:percentages|displayed shares|category shares)\b[^\n]{0,120}\b(?:sum|total|add\s+up)\s+(?:to\s+)?(?:exactly\s+)?100(?:\.0+)?\s*%/i.test(sourceText)
          if (claimsExactHundred && Math.abs(reportedShareTotal - 100) > 0.011) {
            fail(`UI claims displayed percentage shares total exactly 100%, but the CONTENT-AUDIT rounds them to ${reportedShareTotal}%.`)
          }
        }
      }
    }
  }

  const normalizeContent = (value) => value.replace(/\s+/g, ' ').trim().toLowerCase()
  const visibleStatusLabels = new Set()
  for (const { text } of allSource) {
    // Match only the value of the severity property. Object records may put
    // other quoted fields (for example nextAction) on the same source line.
    for (const match of text.matchAll(/\bseverity\s*:\s*(["'])([^"']+)\1/gi)) {
      visibleStatusLabels.add(normalizeContent(match[2]))
    }
    for (const match of text.matchAll(/<Badge\b([^>]*)>/gs)) {
      const countLabel = match[1].match(/\bcount\s*=\s*["']([^"']+)["']/i)?.[1]
      if (countLabel) visibleStatusLabels.add(normalizeContent(countLabel))
    }
  }
  for (const label of visibleStatusLabels) {
    const matchingRows = contentTable.rows.filter((row) => normalizeContent(row.join(' | ')).includes(label))
    if (!matchingRows.length) {
      fail(`CONTENT-AUDIT must inventory visible status/severity label '${label}'.`)
      continue
    }
    for (const row of matchingRows) {
      const classification = (row[contentColumns.classification] ?? '').toLowerCase()
      if (/synthetic|local sample|local simulation/.test(classification)) {
        const rowText = normalizeContent(row.join(' | '))
        if (!/illustrative[- ]only/.test(rowText) || !/not an approved .*classification/.test(rowText)) {
          fail(`Synthetic status/severity '${label}' must be explicitly illustrative-only and not an approved operational classification.`)
        }
      }
    }
  }

  // Trust only the prompt and the exact excerpts that were cited and verified above.
  // Never trust an entire opened file: an unrelated citation in App.tsx must not authorize
  // every other action or threshold string in that same file.
  const trustedContent = normalizeContent([promptText, ...trustedContentEvidence].join('\n'))
  const neutralFollowUp = /^(?:—|none supplied|no (?:specific )?(?:operational )?(?:action|recommendation) (?:is )?(?:provided|defined|available)|refer to approved (?:operating|flight) guidance|consult approved (?:operating|flight) guidance|review the provided mission plan)$/i
  const actionOccurrences = []
  for (const { file, text } of allSource) {
    const actions = [...text.matchAll(/\b(?:nextAction|recommendedAction|recommendation|operationalRecommendation)\s*:\s*(["'`])([^"'`]+)\1/g)]
    for (const match of actions) {
      const action = match[2].trim()
      const normalizedAction = normalizeContent(action)
      actionOccurrences.push({ action, normalizedAction, file })
      const safetyDirective = /\b(?:initiate|execute|throttle(?:\s+back)?|engage|cycle|reroute|divert|arm|disarm|abort|override|recalibrat\w*|verify|confirm|order|return|land)\b/i.test(action)
      if (safetyDirective && !neutralFollowUp.test(action) && !trustedContent.includes(normalizedAction)) {
        fail(`Unsourced operational directive in nextAction '${action}'. Synthetic-data disclosure does not authorize flight or safety instructions.`)
      }
    }

    text.split(/\r?\n/).forEach((line, index) => {
      if (!/(?:safety|flight|battery|reserve|critical|advisory|nominal|operational|regulatory|cutoff|threshold)/i.test(line)) return
      if (!/(?:below|under|less than|above|over|greater than|between|at least|at most|<=|>=|<|>)/i.test(line)) return
      if (!/\d+(?:\.\d+)?\s*(?:%|°\s*[CF]|kt|mV|ms|C\b)/i.test(line)) return
      const visibleText = line.replace(/<[^>]+>/g, ' ').replace(/[{}]/g, ' ').replace(/\s+/g, ' ')
      const thresholdClaims = visibleText.match(/\b(?:critical(?: battery)? reserve|advisory(?: warning)?|nominal margin|(?:safety|operational|battery) thresholds?|numerical safety cutoffs?)[^.!?;]{0,80}?(?:between\s*\d+(?:\.\d+)?\s*(?:%|°\s*[CF]|kt|mV|ms|C\b)\s*(?:and|to|[-–])\s*\d+(?:\.\d+)?\s*(?:%|°\s*[CF]|kt|mV|ms|C\b)|(?:below|under|less than|above|over|greater than|at least|at most|<=|>=|<|>)\s*\d+(?:\.\d+)?\s*(?:%|°\s*[CF]|kt|mV|ms|C\b))/gi) ?? []
      for (const thresholdClaim of thresholdClaims) {
        const normalizedThreshold = normalizeContent(thresholdClaim)
        const thresholdRows = contentTable.rows.filter((row) => normalizeContent(row.join(' | ')).includes(normalizedThreshold))
        if (thresholdRows.length !== 1) {
          fail(`CONTENT-AUDIT must give numeric threshold '${thresholdClaim.trim()}' its own row; found ${thresholdRows.length}.`)
        }
        if (!trustedContent.includes(normalizedThreshold)) {
          fail(`Unsourced numeric safety/policy threshold at ${relativeToCwd(file)}:${index + 1}: '${thresholdClaim.trim()}'; remove it or cite an opened authoritative source with an exact excerpt.`)
        }
      }
    })
  }
  const actionCounts = new Map()
  for (const occurrence of actionOccurrences) {
    const current = actionCounts.get(occurrence.normalizedAction) ?? { action: occurrence.action, count: 0, file: occurrence.file }
    current.count += 1
    actionCounts.set(occurrence.normalizedAction, current)
  }
  for (const [normalizedAction, occurrence] of actionCounts) {
    const rows = contentTable.rows.filter((row) => normalizeContent(row.join(' | ')).includes(normalizedAction))
    if (rows.length !== occurrence.count) {
      fail(`CONTENT-AUDIT must give each of ${occurrence.count} rendered action/recommendation instance(s) '${occurrence.action}' from ${relativeToCwd(occurrence.file)} its own row; found ${rows.length}.`)
    }
  }
  for (const row of contentTable.rows) {
    const rowText = normalizeContent(row.join(' | '))
    const actionsInRow = [...actionCounts].filter(([normalizedAction]) => rowText.includes(normalizedAction)).map(([, value]) => value.action)
    if (actionsInRow.length > 1) fail(`CONTENT-AUDIT row combines multiple rendered actions/recommendations: ${actionsInRow.join('; ')}.`)
  }
  if (interactionTable.rows.length < 2) fail('INTERACTION-AUDIT must include the primary action and at least one meaningful control.')
  if (interactionTable.rows.some((row) => row.slice(0, 5).some((cell) => !cell))) fail('INTERACTION-AUDIT contains a row missing expected result, source evidence, observed/pending status, or browser evidence path/status.')
  for (const row of interactionTable.rows) {
    const observed = row[3] ?? ''
    if (/\b(?:PASS|VERIFIED|WORKING)\b/i.test(observed) && !/browser|orca|screenshot|rendered DOM/i.test(observed)) {
      fail(`INTERACTION-AUDIT row '${row[0]}' claims a pass without browser/DOM evidence; source flow and typecheck are not observed behavior.`)
    }
    if (!/\b(?:PENDING|NOT RUN|PASS|FAIL|CONCERNS)\b/i.test(observed)) fail(`INTERACTION-AUDIT row '${row[0]}' needs an explicit browser-observation status.`)
    if (/\bPASS\b/i.test(observed)) {
      const evidenceCell = row[4] ?? ''
      const evidencePaths = [...evidenceCell.matchAll(/(?:`([^`]+)`|([^\s|()]+\.(?:png|jpe?g|webp|json|html|txt|md)))/gi)].map((match) => match[1] ?? match[2])
      const existingEvidence = evidencePaths.some((evidencePath) => fs.existsSync(resolveEvidencePath(evidencePath)))
      if (!existingEvidence) fail(`INTERACTION-AUDIT row '${row[0]}' claims PASS but has no existing screenshot/DOM evidence file.`)
    }
  }
  if (preflightNotRequired) {
    // Stage 7 was classified NOT_REQUIRED; keep final audit checks without repeating its package gate.
  } else if (!fs.existsSync(gateRecordPath)) fail('PREFLIGHT-GATE-RESULT.md is missing; implementation must follow a recorded pre-code PASS.')
  else {
    const gateRecord = fs.readFileSync(gateRecordPath, 'utf8')
    const gateTimestamp = Date.parse(gateRecord.match(/Completed at:\s*([^\n]+)/i)?.[1] ?? '')
    if (!/^STATUS:\s*PASS\s*$/m.test(gateRecord)) fail('Pre-code gate record does not show STATUS: PASS.')
    const gateFiles = [['coverage', coveragePath], ['IA outline', iaPath]]
    if (debugLogging) gateFiles.splice(1, 0, ['read log', readLogPath])
    for (const [name, file] of gateFiles) {
      const expected = gateRecord.match(new RegExp(`${name.replaceAll(' ', '[ -]')} SHA-256:\\s*([a-f0-9]{64})`, 'i'))?.[1]
      if (!expected || expected !== sha256(file)) fail(`Pre-code gate ${name} SHA-256 differs from final artifact.`)
    }
    const expectedLoggingMode = gateRecord.match(/Read log mode:\s*([^\n]+)/i)?.[1]?.trim()
    const currentLoggingMode = debugLogging ? 'DEBUG=true' : 'disabled (DEBUG is not exact "true")'
    if (expectedLoggingMode !== currentLoggingMode) fail(`Pre-code gate logging mode '${expectedLoggingMode ?? 'missing'}' differs from final audit mode '${currentLoggingMode}'.`)
    const expectedPackageHash = gateRecord.match(/Package tarball SHA-256:\s*([a-f0-9]{64})/i)?.[1]
    if (expectedPackageHash && !packageTarballPath) fail('Final audit must reuse the pinned --package-tarball recorded by preflight.')
    if (packageTarballPath && (!expectedPackageHash || expectedPackageHash !== sha256(packageTarballPath))) {
      fail('Pre-code gate package tarball SHA-256 differs from the pinned artifact used by the final audit.')
    }
    if (!Number.isFinite(gateTimestamp)) fail('Pre-code gate record has no valid completion timestamp.')
    else if (!allSource.some(({ file }) => fs.statSync(file).mtimeMs > gateTimestamp)) fail('No app source changed after the pre-code PASS; gate chronology is not evidenced.')
  }
  const componentReconciliation = tableFrom(markdownSection(reconciliation, 'Component map reconciliation'))
  requireHeaderColumns(componentReconciliation, ['coverage row', 'ui need', 'implemented with', 'source location', 'dom evidence'], 'IMPLEMENTATION-RECONCILIATION component map')
  const reconciledNumbers = new Set(componentReconciliation.rows.filter((row) => /^\d+$/.test(row[0] ?? '')).map((row) => row[0]))
  for (const row of coverageRows) {
    const number = row[0]
    const reconciled = componentReconciliation.rows.find((candidate) => candidate[0] === number)
    if (!reconciled) {
      fail(`IMPLEMENTATION-RECONCILIATION.md has no source/DOM row for component coverage row ${number}.`)
      continue
    }
    const locations = (reconciled[3] ?? '').match(/[^\s|`]+\.[jt]sx?:\d+/g) ?? []
    if (!locations.length) fail(`Implementation row ${number} must cite a concrete TS/JS source location with line number.`)
    const renderedNames = [...(reconciled[2] ?? '').matchAll(/`([A-Z][A-Za-z0-9]*)`/g)].map((match) => match[1])
    for (const location of locations) {
      const locationMatch = location.match(/^(.+?):(\d+)(?:-(\d+))?$/)
      const sourcePath = locationMatch?.[1]
      const sourceRecord = allSource.find(({ file }) => relativeToCwd(file) === sourcePath || relativeToCwd(file).endsWith(`/${sourcePath}`))
      if (!sourceRecord) {
        fail(`Implementation row ${number} cites a source file outside --source-root or a missing file: ${sourcePath}`)
        continue
      }
      if (locationMatch && renderedNames.length) {
        const lines = sourceRecord.text.split(/\r?\n/)
        const start = Number(locationMatch[2])
        const end = Number(locationMatch[3] ?? locationMatch[2])
        const excerpt = lines.slice(start - 1, end).join('\n')
        if (!renderedNames.some((name) => new RegExp(`<${name}\\b`).test(excerpt))) {
          fail(`Implementation row ${number} source range ${location} does not render any component named in its 'Implemented with' cell.`)
        }
      }
    }
    if (!reconciled[2]?.trim() || !reconciled[4]?.trim()) fail(`Implementation row ${number} must name the actual component/fallback and its DOM evidence.`)
  }
  if (reconciledNumbers.size !== componentReconciliation.rows.filter((row) => /^\d+$/.test(row[0] ?? '')).length) fail('IMPLEMENTATION-RECONCILIATION has duplicate component coverage row numbers.')
  if (!/\bmain\b/i.test(reconciliation) || !/DOM|rendered/i.test(reconciliation)) fail('IMPLEMENTATION-RECONCILIATION.md must map the main landmark and headings to rendered DOM evidence.')
  if (!/main/i.test(ia) || !/heading/i.test(ia)) fail('IA outline must record the main landmark and heading inventory.')
  if (!/--radius|radius=\{0\}/.test(radiusAudit)) fail('RADIUS-AUDIT.md must document the 2px token and intentionally square chart marks.')
  const semanticColorTable = tableFrom(semanticColors)
  requireHeaderColumns(semanticColorTable, ['state/category', 'token', 'code evidence'], 'SEMANTIC-COLOR-AUDIT')
  if (!semanticColorTable.rows.length) fail('SEMANTIC-COLOR-AUDIT.md must contain at least one state/category-to-token mapping.')
  if (semanticColorTable.rows.some((row) => !row[0] || !row[1] || !row[2])) fail('SEMANTIC-COLOR-AUDIT has a mapping without its state/category, token, or code evidence.')

  const styleImports = allSource.flatMap(({ file, text }) => [...text.matchAll(/(?:\bimport\s*|@import\s*)['"]skytrack-ui\/styles\.css['"]/g)].map(() => file))
  if (styleImports.length !== 1) fail(`Consumer must import skytrack-ui/styles.css exactly once; found ${styleImports.length}.`)
  const stylesheetInfo = installedStylesheetInfo()
  if (!stylesheetInfo) fail('Cannot resolve the installed skytrack-ui package manifest and ./styles.css export from COMPONENT-COVERAGE.')
  const stylesheetFile = stylesheetInfo?.stylesheetPath
  if (stylesheetFile && (!fs.existsSync(stylesheetFile) || !fs.statSync(stylesheetFile).isFile())) {
    fail(`Installed skytrack-ui ./styles.css export does not resolve to a file: ${stylesheetInfo.exportTarget}`)
  }
  if (debugLogging && stylesheetFile) {
    const openedStylesheet = [...readRows.values()].some((row) => {
      if ((row.at(-1) ?? '').toLowerCase() !== 'opened') return false
      return path.resolve(process.cwd(), normalize(row[2] ?? '')) === stylesheetFile
    })
    const openedFontAsset = [...readRows.values()].some((row) => /node_modules\/skytrack-ui\/.+\.(?:woff2?|ttf|otf)(?:\?.*)?$/i.test(normalize(row[2] ?? '')) && (row.at(-1) ?? '').toLowerCase() === 'opened')
    if (!openedStylesheet) fail('FILE-READ-LOG must show the installed skytrack-ui styles.css export was opened when DEBUG=true.')
    if (!openedFontAsset) fail('FILE-READ-LOG must show an installed skytrack-ui font asset was opened when DEBUG=true.')
  }
  const stylesheetText = stylesheetFile && fs.existsSync(stylesheetFile) ? fs.readFileSync(stylesheetFile, 'utf8') : ''
  // The published stylesheet is minified and emits 0.125rem as .125rem.
  if (!/--radius\s*:\s*(?:0?\.125rem|2px)(?=\s*[;}])/i.test(stylesheetText)) fail('Installed SkyTrack stylesheet must define the --radius token as 2px (0.125rem).')

  const nativePatterns = [
    ['table', /<\s*table\b/g], ['details', /<\s*details\b/g], ['button', /<\s*button\b/g],
    ['input', /<\s*input\b/g], ['select', /<\s*select\b/g], ['textarea', /<\s*textarea\b/g],
    ['progress', /<\s*progress\b/g], ['meter', /<\s*meter\b/g], ['canvas', /<\s*canvas\b/g],
  ]
  for (const [tag, pattern] of nativePatterns) {
    const occurrences = []
    for (const { file, text } of allSource) {
      text.split(/\r?\n/).forEach((line, index) => {
        pattern.lastIndex = 0
        if (pattern.test(line)) occurrences.push(`${relativeToCwd(file)}:${index + 1}`)
      })
    }
    if (!occurrences.length) continue
    const matchingRows = coverageRows.filter((row) => {
      const lower = row.join(' ').toLowerCase()
      if (tag === 'table') return lower.includes('table') && /native|hand-authored|fallback|local semantic/.test(lower) && lower.includes('datatable')
      if (tag === 'details') return /details|summary|collapsible/.test(lower) && /native|local|fallback/.test(lower)
      return lower.includes(`<${tag}`) || lower.includes(`native ${tag}`) || lower.includes(`local ${tag}`)
    })
    console.log(`NATIVE <${tag}>: ${occurrences.length} source occurrence(s): ${occurrences.join(', ')}`)
    if (matchingRows.length < occurrences.length) fail(`Native <${tag}> markup has ${occurrences.length} occurrence(s) but only ${matchingRows.length} distinct coverage row(s); every fallback needs its own row.`)
  }

  const sizePattern = /\btext-(?:xs|sm)\b|\btext-\[[^\]]+\]|\bfontSize\s*:\s*(\d+(?:\.\d+)?)|\bfont-size\s*:\s*(\d+(?:\.\d+)?)px/g
  const sizeOccurrences = []
  for (const { file, text } of allSource) {
    text.split(/\r?\n/).forEach((line, index) => {
      sizePattern.lastIndex = 0
      const matches = [...line.matchAll(sizePattern)].filter((match) => {
        if (/^text-(?:xs|sm|\[)/.test(match[0])) return true
        const numericSize = Number(match[1] ?? match[2])
        return Number.isFinite(numericSize) && numericSize < 16
      })
      if (matches.length) sizeOccurrences.push({ location: `${relativeToCwd(file)}:${index + 1}`, tokens: matches.map((match) => match[0].trim()) })
    })
  }
  const unlistedSizes = sizeOccurrences.filter(({ location }) => !typography.includes(location) && !typography.includes(`${path.basename(location.split(':')[0])}:${location.split(':')[1]}`))
  console.log(`BELOW-BASE / ARBITRARY TEXT EXPRESSIONS: ${sizeOccurrences.length} source line(s)`)
  if (unlistedSizes.length) {
    for (const item of unlistedSizes) console.log(`  UNLISTED ${item.location}: ${item.tokens.join(', ')}`)
    fail(`${unlistedSizes.length} below-base/arbitrary text-size source location(s) are missing from TYPOGRAPHY-AUDIT.md.`)
  }

  const importantTextComponents = [
    'Badge', 'SelectItem', 'SelectValue', 'ChartTooltipContent', 'ChartLegendContent',
    'DataTable', 'MeterLabel', 'MeterValue', 'FieldLabel', 'Button',
  ]
  const presentComponents = importantTextComponents.filter((name) => allSource.some(({ text }) => new RegExp(`<${name}\\b`).test(text)))
  const auditRowsText = componentTypographyTable.rows.map((row) => row.join(' ').toLowerCase())
  for (const name of presentComponents) {
    if (!auditRowsText.some((row) => row.includes(name.toLowerCase()))) fail(`COMPONENT-TYPOGRAPHY-AUDIT.md has no installed-default/effective-size row for ${name}.`)
  }
  if (presentComponents.includes('DataTable')) {
    for (const slot of ['header', 'cell']) if (!auditRowsText.some((row) => row.includes('datatable') && row.includes(slot))) fail(`Component typography audit must inventory DataTable ${slot} text separately.`)
  }
  if (presentComponents.includes('ChartTooltipContent') || presentComponents.includes('ChartLegendContent')) {
    if (!auditRowsText.some((row) => /axis|tick/.test(row))) fail('Component typography audit must inventory chart axis/tick text when charts are used.')
  }
  const typographyColumn = (name) => componentTypographyTable.header.findIndex((cell) => cell.includes(name))
  const typographyColumns = Object.fromEntries(
    ['component', 'installed default', 'effective size', 'role', 'override', 'evidence']
      .map((name) => [name, typographyColumn(name)])
  )
  for (const row of componentTypographyTable.rows) {
    const rowText = row.join(' ').toLowerCase()
    const relevantRow = /badge|selectitem|selectvalue|tooltip|legend|axis|tick|datatable|table header|table cell|meterlabel|metervalue|fieldlabel|button/.test(rowText)
    if (!relevantRow) continue
    for (const column of ['installed default', 'effective size', 'role', 'override', 'evidence']) {
      const index = typographyColumns[column]
      if (index === -1 || !row[index]?.trim()) fail(`Typography row needs '${column}' evidence; component defaults are preserved rather than forced to text-base: ${row.join(' | ')}`)
    }
  }

  for (const name of ['Badge', 'SelectItem', 'ChartTooltipContent', 'ChartLegendContent']) {
    const tags = []
    for (const { text } of allSource) {
      const pattern = new RegExp(`<${name}\\b([\\s\\S]*?)>`, 'g')
      for (const match of text.matchAll(pattern)) tags.push(match[1])
    }
    for (const attributes of tags) {
      if (['Badge', 'ChartTooltipContent'].includes(name) && !/rounded-\(--radius\)/.test(attributes)) fail(`<${name}> needs the 2px --radius token when it renders a rounded surface.`)
    }
  }
  if (presentComponents.includes('SelectValue')) {
    for (const { text } of allSource) {
      if (/<SelectValue\b[^>]*\/>/.test(text)) fail('Controlled SelectValue must render an explicit human-readable selected label; do not expose the raw enum value.')
    }
  }

  const radiusOccurrences = []
  const radiusUtility = /\brounded(?:-(?:none|sm|md|lg|xl|2xl|3xl|full|\[[^\]\s]+\]|\(--radius\)))?(?![\w-])/g
  for (const { file, text } of allSource) {
    text.split(/\r?\n/).forEach((line, index) => {
      radiusUtility.lastIndex = 0
      const tokens = [...line.matchAll(radiusUtility)].map((match) => match[0])
      for (const token of tokens) radiusOccurrences.push({ location: `${relativeToCwd(file)}:${index + 1}`, token, line })
      const literalRadius = line.match(/border-radius\s*:\s*([^;]+)/i)?.[1]
      if (literalRadius && !/var\(--radius\)|^\s*0(?:px|rem)?\s*$/i.test(literalRadius)) fail(`Literal/non-token border radius at ${relativeToCwd(file)}:${index + 1}: ${literalRadius}`)
      const jsxRadius = line.match(/\bborderRadius\s*:\s*(?:['"]([^'"]+)['"]|(\d+(?:\.\d+)?)(?:\s*[},]))/i)
      const jsxRadiusValue = jsxRadius?.[1] ?? jsxRadius?.[2]
      if (jsxRadiusValue && !/^(?:var\(--radius\)|0(?:px|rem)?)$/i.test(jsxRadiusValue)) fail(`Literal/non-token inline borderRadius at ${relativeToCwd(file)}:${index + 1}: ${jsxRadiusValue}`)
    })
  }
  for (const occurrence of radiusOccurrences) {
    const auditLine = radiusAudit.split(/\r?\n/).find((line) => line.includes(occurrence.location)) ?? ''
    if (!auditLine) fail(`RADIUS-AUDIT.md is missing ${occurrence.location} (${occurrence.token}).`)
    if (!['rounded-(--radius)', 'rounded-none', 'rounded-full'].includes(occurrence.token)) fail(`Use --radius or intentional square geometry at ${occurrence.location}; found ${occurrence.token}.`)
    if (occurrence.token === 'rounded-full' && !/avatar|radio|status dot|circular|circle/i.test(auditLine)) fail(`Full rounding needs a documented genuinely circular role at ${occurrence.location}.`)
    if (occurrence.token === 'rounded-none' && !/square|chart mark|intentional edge/i.test(auditLine)) fail(`Square rounding needs an intentional chart-mark/edge reason at ${occurrence.location}.`)
  }
  for (const { file, text } of allSource) {
    for (const match of text.matchAll(/\bradius\s*=\s*\{([^}]+)\}/g)) {
      const value = Number(match[1].trim())
      if (Number.isFinite(value) && value !== 0) fail(`Chart mark radius must be 0 per Owner direction (${relativeToCwd(file)}).`)
    }
    const barCount = [...text.matchAll(/<Bar\b/g)].length
    const squareBarCount = [...text.matchAll(/<Bar\b[^>]*\bradius\s*=\s*\{\s*0\s*\}/g)].length
    if (barCount > squareBarCount) fail(`${relativeToCwd(file)} has ${barCount} Bar mark(s), but ${barCount - squareBarCount} do not explicitly set radius={0}.`)
  }

  const rawPalettePattern = /\b(?:text|bg|border)-(?:red|green|emerald|amber|orange|yellow)-(?:[1-9]00)\b/g
  for (const { file, text } of allSource) {
    text.split(/\r?\n/).forEach((line, index) => {
      rawPalettePattern.lastIndex = 0
      const hasRawColor = rawPalettePattern.test(line)
      const semanticContext = /success|warning|error|critical|severity|status|offline|interrupted|anomaly|healthy|active/i.test(line)
      if (hasRawColor && semanticContext) fail(`Raw palette color used for a semantic state at ${relativeToCwd(file)}:${index + 1}; use a semantic token.`)
    })
  }
  if (/\bQ[1-4]\b/i.test(sourceFiles.map((file) => fs.readFileSync(file, 'utf8')).join('\n')) && !/fiscal calendar[^\n]*(?:defined|explicit|20\d\d)/i.test(ia)) {
    fail('Quarter labels appear without an explicit fiscal calendar in IA; use truthful date ranges.')
  }

  if (requireMain) {
    const mainCount = allSource.reduce((count, { text }) => count + [...text.matchAll(/<main\b|\brole\s*=\s*["']main["']/g)].length, 0)
    console.log(`MAIN LANDMARK SOURCE COUNT: ${mainCount}`)
    if (mainCount !== 1) fail(`Page route must implement exactly one main landmark; source count is ${mainCount}.`)
  }

  if (debugLogging) {
    const actualReadRows = readRows.size
    const claimedReadCounts = []
    for (const line of report.split(/\r?\n/)) {
      const actualMatch = line.match(/Actual Read Log Rows\s*:\s*(\d+)/i)
      if (actualMatch) claimedReadCounts.push(Number(actualMatch[1]))
      if (/FILE-READ-LOG|read log|read-entry/i.test(line)) {
        for (const match of line.matchAll(/\b(\d+)\s+(?:numbered\s+)?rows?\b/gi)) claimedReadCounts.push(Number(match[1]))
      }
    }
    const distinctReadClaims = [...new Set(claimedReadCounts)]
    console.log(`READ LOG ROWS: actual=${actualReadRows}, report=${distinctReadClaims.join(',') || 'missing'}`)
    if (!distinctReadClaims.length || distinctReadClaims.some((value) => value !== actualReadRows)) fail('Every worker-report claim about FILE-READ-LOG row count must match the numbered log entries.')
  }

  if (promptFilePath) {
    const prompt = fs.readFileSync(path.resolve(promptFilePath), 'utf8')
    const source = fs.readFileSync(path.resolve(promptSourcePath), 'utf8')
    const declaration = new RegExp(`(?:const|let|var)\\s+${promptConstant}\\s*=\\s*`, 'm')
    const match = source.match(declaration)
    let literal
    if (match) {
      const start = match.index + match[0].length
      const tail = source.slice(start).trimStart()
      if (tail[0] === "'" || tail[0] === '"') {
        const quote = tail[0]
        let escaped = false
        for (let index = 1; index < tail.length; index += 1) {
          const char = tail[index]
          if (!escaped && char === quote) {
            literal = vm.runInNewContext(tail.slice(0, index + 1))
            break
          }
          if (!escaped && char === '\\') escaped = true
          else escaped = false
        }
      }
    }
    const equal = typeof literal === 'string' && literal === prompt
    const promptBytes = Buffer.byteLength(prompt)
    const literalBytes = typeof literal === 'string' ? Buffer.byteLength(literal) : undefined
    console.log(`PROMPT BYTES: ${equal ? 'MATCH' : 'MISMATCH'} (file=${promptBytes}, literal=${literalBytes ?? 'missing'})`)
    if (!equal) fail(`Static prompt literal ${promptConstant} is not byte-identical to the prompt file, including final newline.`)
    const reportClaim = new RegExp(`Prompt preservation:\\s*MATCH \\(\\s*${promptBytes} bytes; final newline preserved\\s*\\)\\.?`, 'i')
    if (!reportClaim.test(report)) fail(`WORKER-REPORT.md must state exactly: Prompt preservation: MATCH (${promptBytes} bytes; final newline preserved).`)
  }

  if (/Effective Computed Style/i.test(typography) && /Browser Rendering Inspection[^\n]*(?:SKIPPED|DEFERRED|NOT_RUN)/i.test(report)) {
    fail('Typography audit claims computed styles while the report says browser rendering was skipped/deferred.')
  }
}

if (failures.length) {
  console.error(`\nUI ${stage.toUpperCase()} AUDIT: FAIL`)
  for (const failure of failures) console.error(`- ${failure}`)
  process.exitCode = 1
} else {
  const label = stage === 'preflight' ? 'PRE-CODE COMPONENT GATE' : 'UI HANDOFF AUDIT'
  if (stage === 'preflight') {
    const timestamp = new Date().toISOString()
    const record = [
      '# Pre-code component gate', '', 'STATUS: PASS', `Completed at: ${timestamp}`,
      `Source root: ${relativeToCwd(sourceRoot)}`,
      `Coverage SHA-256: ${sha256(coveragePath)}`,
      `Read log mode: ${debugLogging ? 'DEBUG=true' : 'disabled (DEBUG is not exact "true")'}`,
      ...(debugLogging ? [`Read log SHA-256: ${sha256(readLogPath)}`] : []),
      `IA outline SHA-256: ${sha256(iaPath)}`,
      ...(packageTarballPath ? [`Package tarball SHA-256: ${installedPackageTarballHash ?? sha256(packageTarballPath)}`] : []),
      '', 'No mapped UI implementation may begin before this gate. Re-run when evidence changes.', '',
    ].join('\n')
    fs.writeFileSync(gateRecordPath, record)
    console.log(`GATE RECORD: ${relativeToCwd(gateRecordPath)}`)
  }
  console.log(`\n${label}: PASS${stage === 'final' ? ' (coordinator still checks runtime, API fit, content, and rendered evidence)' : ' — do not implement mapped UI until this gate passes'}`)
}
