# SkyTrack UI Rule Flow and Structure

## Agent decision flow

```mermaid
flowchart TD
  A[Receive task in skytrack-ui repo] --> B[Auto-read canonical AGENTS.md]
  B --> C[Route through skills/README.md]
  D --> E{UI implementation?}
  E -- No --> F[Open only matching local skill or reference]
  E -- Yes --> G[Read skytrack-ui/README.md and implementation-gates.md]
  G --> H[Read relevant IA and UI_RULES sections]
  H --> I[Scan all component families once]
  I --> J[Map each distinct visible UI need]
  J --> K[Shortlist candidate component]
  K --> L[Verify package export, types, runtime source, and closest demo]
  L --> M{Supported composition fits?}
  M -- Yes --> N[Use existing component and supported parts]
  M -- No --> O[Record concrete capability gap]
  O --> P[Build smallest local fallback]
  N --> Q{DEBUG exactly true?}
  P --> Q
  Q -- Yes --> Q1[Log reads and pass preflight]
  Q -- No --> Q2[Skip read log and pass preflight]
  Q1 --> R[Implement and inspect rendered UI]
  Q2 --> R
  R --> S[Reconcile every mapped need against code and rendered result]
  S --> T[Run final handoff audit and report limits]
```

## Repository tree

```text
skytrack-ui/
├── AGENTS.md                         # Canonical concise policy router
├── README.md                         # Library use, package status, and local rule links
└── skills/
    ├── README.md                     # Skill and archive index
    ├── archive/
    │   └── skytrack-ui/              # ARCHIVED marker for the former knowledge-only directory
    └── skytrack-ui/                  # Installable expertise skill
        ├── SKILL.md                  # Package expertise entrypoint
        └── references/               # Canonical rules, knowledge, architecture, and scripts
            ├── README.md             # Task-to-file router and implementation read order
            ├── implementation-gates.md # Mandatory component-first, token, evidence, handoff gates
            ├── implementation.md     # IA, task flow, chart and ambiguity method
            ├── UI_RULES.md           # Product, visual, content, typography, and token policy
            ├── AGENT_GUIDE.md        # Selective package implementation reference
            ├── knowledge/            # Component guides, research, and scoped domain knowledge
            ├── scripts/              # Optional DEBUG read-log and implementation handoff tools
            └── architecture/         # Explanatory flow/tree, not a duplicate policy source
```

## What each level does

| Level | Function |
|---|---|
| `AGENTS.md` | Canonical package router and required component-first implementation entrypoint. |
| `skills/README.md` | Routes to the active skill and archive marker. |
| `skills/skytrack-ui/SKILL.md` | Routes agents to package expertise without prescribing a consumer's full pipeline. |
| `skills/skytrack-ui/references/README.md` | Selects only the rules and evidence required by the current UI decision. |
| `skills/skytrack-ui/references/knowledge/` | Routes component candidates to verified API examples and Designer guidance. |
| `skills/skytrack-ui/references/knowledge/creative/` | Holds creative-direction knowledge, loaded only for marketing, graphics, or art direction. |
| `skills/skytrack-ui/references/scripts/` | Captures reads only when `DEBUG=true`; checks implementation evidence in both modes. |
| `skills/archive/skytrack-ui/` | Marks the previous knowledge-only directory layout as archived. |

## Normal component task read path

1. Follow root `AGENTS.md` and `skills/README.md`.
2. Read `skills/skytrack-ui/references/README.md`, mandatory `implementation-gates.md`, relevant IA guidance, and only the relevant `UI_RULES.md` sections.
3. Scan `knowledge/COMPONENT_ROUTING.md` once, then map each distinct need to a candidate and reuse/custom decision.
4. Read only shortlisted Developer pages and Designer pages needed for an active UX decision. Verify exact API and closest demo against the target installation.
5. Log reads only when `DEBUG=true`; always pass the preflight gate before UI changes and reconcile the map against source and rendered UI before handoff.

## Portability boundary

Every first-party rule, component knowledge page, and helper needed by this skill resides inside this repository. The parent SkyTrack workspace may link to these files, but this repository does not require that workspace to route or interpret its own UI pipeline. Independently installed skills remain siblings under `skills/` and are never treated as the authoritative component router.
