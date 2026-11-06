#!/usr/bin/env node

import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'

if (process.env.DEBUG !== 'true') {
  console.error('File-read logging is disabled. Set DEBUG=true to create or append FILE-READ-LOG.md.')
  process.exit(2)
}

function flag(name, required = true) {
  const index = process.argv.indexOf(name)
  if (index === -1) {
    if (required) throw new Error(`Missing required argument ${name}`)
    return undefined
  }
  const value = process.argv[index + 1]
  if (!value || value.startsWith('--')) throw new Error(`Expected a value after ${name}`)
  return value
}

const targetPath = path.resolve(flag('--path'))
const reason = flag('--reason').replace(/[|\r\n]+/g, ' ').trim()
const logPath = path.resolve(flag('--log', false) ?? 'FILE-READ-LOG.md')
const metadataOnly = process.argv.includes('--metadata-only')
const lineRange = flag('--lines', false)
const sectionHeading = flag('--heading', false)
let lineRangeBounds
let sectionContent

if (lineRange && sectionHeading) throw new Error('Use either --lines or --heading, not both')
if (metadataOnly && (lineRange || sectionHeading)) throw new Error('--metadata-only cannot be combined with --lines or --heading')
if (lineRange) {
  const match = lineRange.match(/^(\d+)(?:-(\d+))?$/)
  if (!match) throw new Error('--lines must use N or N-M')
  const start = Number(match[1])
  const end = Number(match[2] ?? match[1])
  if (end < start) throw new Error('--lines end must be greater than or equal to start')
  lineRangeBounds = { start, end }
}

if (!reason) throw new Error('--reason must not be empty')
if (!fs.existsSync(targetPath) || !fs.statSync(targetPath).isFile()) {
  throw new Error(`Readable file does not exist: ${targetPath}`)
}
if (!fs.existsSync(logPath)) {
  fs.mkdirSync(path.dirname(logPath), { recursive: true })
  fs.writeFileSync(logPath, '# Chronological File Read Log\n\nLog each file through read-and-log.mjs as it is opened; do not backfill reads.\n\n| # | Timestamp | Path opened | Reason | Content SHA-256 | Method | Read scope | Disposition |\n|---|---|---|---|---|---|---|---|\n')
}
if (!fs.statSync(logPath).isFile()) throw new Error(`Read-log path is not a file: ${logPath}`)

const log = fs.readFileSync(logPath, 'utf8')
const header = log.split(/\r?\n/).find((line) => /^\s*\|/.test(line)) ?? ''
const normalizedHeader = header.toLowerCase().replace(/[-_]+/g, ' ').replace(/\s+/g, ' ')
if (!normalizedHeader.includes('timestamp') || !normalizedHeader.includes('path opened')
  || !normalizedHeader.includes('reason') || !normalizedHeader.includes('content sha 256')
  || !normalizedHeader.includes('method') || !normalizedHeader.includes('read scope')
  || !normalizedHeader.includes('disposition')) {
  throw new Error('FILE-READ-LOG template needs Timestamp, Path opened, Reason, Content SHA-256, Method, Read scope, and Disposition columns.')
}

const relativePath = path.relative(process.cwd(), targetPath).split(path.sep).join('/') || path.basename(targetPath)
const timestamp = new Date().toISOString()
const content = fs.readFileSync(targetPath)
const contentHash = crypto.createHash('sha256').update(content).digest('hex')
const fullText = content.toString('utf8')
if (sectionHeading) {
  const lines = fullText.split(/\r?\n/)
  const headingPattern = /^(#{1,6})\s+(.+?)\s*#*\s*$/
  const start = lines.findIndex((line) => {
    const match = line.match(headingPattern)
    return match?.[2]?.trim() === sectionHeading
  })
  if (start === -1) throw new Error(`Markdown heading not found: ${sectionHeading}`)
  const level = lines[start].match(headingPattern)[1].length
  let end = lines.length
  for (let index = start + 1; index < lines.length; index += 1) {
    const match = lines[index].match(headingPattern)
    if (match && match[1].length <= level) {
      end = index
      break
    }
  }
  sectionContent = lines.slice(start, end).join('\n')
}
const numberedRows = [...log.matchAll(/^\|\s*(\d+)\s*\|/gm)].map((match) => Number(match[1]))
const nextNumber = numberedRows.length ? Math.max(...numberedRows) + 1 : 1
const safePath = relativePath.replace(/[|\r\n]+/g, ' ')
const readScope = metadataOnly || content.includes(0)
  ? 'metadata-only'
  : sectionHeading
    ? `heading: ${sectionHeading}`
    : lineRangeBounds
      ? `lines: ${lineRangeBounds.start}-${lineRangeBounds.end}`
      : 'full-file'
fs.appendFileSync(logPath, `| ${nextNumber} | ${timestamp} | ${safePath} | ${reason} | ${contentHash} | read-and-log.mjs | ${readScope} | Opened |\n`)

process.stdout.write(`READ-LOG ${nextNumber} ${timestamp} ${safePath} SHA-256 ${contentHash}\n`)
if (metadataOnly || content.includes(0)) {
  process.stdout.write(`[${content.includes(0) ? 'binary' : 'metadata-only'} file; ${content.length} bytes]\n`)
} else if (sectionHeading) {
  process.stdout.write(`--- section: ${sectionHeading} ---\n${sectionContent}`)
  if (!sectionContent.endsWith('\n')) process.stdout.write('\n')
} else {
  let text = fullText
  if (lineRangeBounds) {
    const { start, end } = lineRangeBounds
    text = text.split(/\r?\n/).slice(start - 1, end).join('\n')
    process.stdout.write(`--- lines ${start}-${end} ---\n`)
  }
  process.stdout.write(text)
  if (!text.endsWith('\n')) process.stdout.write('\n')
}
