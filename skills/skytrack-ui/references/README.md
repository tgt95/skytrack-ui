# SkyTrack UI Rule Router

Use this route for every UI implementation using SkyTrack UI. The repository root [`AGENTS.md`](../../../AGENTS.md) selects this guide; do not skip required component/API evidence.

## Read by decision

| Decision | Read |
|---|---|
| Every UI implementation | [`implementation-gates.md`](implementation-gates.md) |
| Information architecture, task flow, data presentation, charts, or vague references | Relevant section in [`implementation.md`](implementation.md) |
| Product decisions, visual rules, typography, color, radius, content | Relevant section in [`UI_RULES.md`](UI_RULES.md) |
| Candidate scan across the library | [`knowledge/COMPONENT_ROUTING.md`](knowledge/COMPONENT_ROUTING.md) |
| Task/page pattern selection and local pattern references | [`knowledge/PATTERN_ROUTING.md`](knowledge/PATTERN_ROUTING.md) |
| Component API, composition, types, examples | Shortlisted page in [`knowledge/README.md`](knowledge/README.md) |
| Component purpose, selection, interaction, accessibility | Shortlisted page in [`knowledge/designer/README.md`](knowledge/designer/README.md) |
| Package-wide theme or composition detail | Relevant heading in [`AGENT_GUIDE.md`](AGENT_GUIDE.md) only |
| Optional DEBUG file-read evidence and handoff audit | Local [`scripts/`](scripts/) |
| Marketing, graphic design, or art-direction principles | [`knowledge/creative/README.md`](knowledge/creative/README.md), then only the relevant guide |
| Rule flow and this repository's structure | [`architecture/agent-rules-flow-and-tree.md`](architecture/agent-rules-flow-and-tree.md) |

This router contains reusable package expertise only. The consuming workspace owns task sequence,
stage roles, approval cadence, task state, and deployment workflow.

## Required implementation route

1. Read this router, [`implementation-gates.md`](implementation-gates.md), and only relevant sections from `implementation.md` and `UI_RULES.md`.
2. Scan the full component router once. Map every distinct visible UI need, including nested controls and indicators.
3. When the task involves a reusable workflow/page pattern, scan [`knowledge/PATTERN_ROUTING.md`](knowledge/PATTERN_ROUTING.md) and inspect the selected local catalog entry/reference. Shortlist library candidates from the component router separately.
4. Verify exact exports, installed declaration/runtime source, and closest demo before deciding reuse or a custom fallback.
5. Use library components and supported compositions whenever they satisfy the requirement. Record the concrete missing capability before writing local fallback UI.
6. Keep file-read logging off by default. Only when the environment is exactly `DEBUG=true`, use `read-and-log.mjs` and pass `--read-log` to a checker. Verify each new or affected mapped need against installed source/types/demo evidence; reuse valid evidence and map rows for unaffected needs. Follow the consuming workspace's pipeline to decide whether a formal preflight adds a distinct check; do not rerun it when IA, need mapping, and package evidence are already clear and current. Reconcile the changed needs against rendered output at handoff; use broader reconciliation when the request changes the route or composition as a whole.

## Conditional formal preflight

The package owns component/API evidence requirements; each consuming workspace owns its pipeline. Complete the needed component discovery and installed-package verification before using a candidate. Run `audit-ui-handoff.mjs --stage preflight` only when the workspace pipeline identifies a concrete unresolved consistency check that this checker can answer. If earlier analysis has already made the IA, affected needs, and package evidence clear/current, record `Stage 7: NOT_REQUIRED` with a short reason in the existing task record and continue; do not create a PASS record or a separate skip artifact. A package capability gap may be recorded as `CONCERN` and handled with a documented native fallback; it is not itself a reason to block on formal preflight.

When a substantive final audit is required for work whose preflight was explicitly `NOT_REQUIRED`, pass `--preflight-not-required --preflight-not-required-reason "<reason>"` to the final checker. This skips the Stage 7 package-consistency rerun and gate-record requirement; the final audit's source, map-to-code, evidence, and rendered-UI checks still apply.

## File-read logging (opt-in)

Normal mode does not create `FILE-READ-LOG.md`: do not run `read-and-log.mjs` or pass `--read-log`.
Leave the coverage map's log-entry cell blank or `—`. Component discovery and verification remain
mandatory.

To record chronological reads, set `DEBUG=true` for **each** logger and audit command. Use it for
both preflight and final audit so the gate record and final check use the same mode:

```sh
DEBUG=true node skills/skytrack-ui/references/scripts/read-and-log.mjs \
  --path <file> --reason "verify the relevant SkyTrack UI API"

DEBUG=true node skills/skytrack-ui/references/scripts/audit-ui-handoff.mjs --stage preflight \
  --source-root <app-source> --coverage COMPONENT-COVERAGE.md \
  --ia IA-OUTLINE.md --read-log FILE-READ-LOG.md \
  --gate-record PREFLIGHT-GATE-RESULT.md

# On the existing --stage final command, also prefix DEBUG=true and add:
#   --read-log FILE-READ-LOG.md --gate-record PREFLIGHT-GATE-RESULT.md
```

Without the exact value `DEBUG=true`, the logger exits without creating a file, and the checker
rejects a supplied `--read-log`. Logging only controls read-history evidence; it does not change the
component-first gate, installed API/type/runtime/demo checks, or UI/content/accessibility review.

### Prompt for an Agent

Copy this prompt into the Agent task and replace the task description:

```text
Implement: [task]. Follow this README, the consuming workspace's pipeline, and relevant IA/design-pattern
guidance. Verify each affected UI need against the installed `skytrack-ui` API, types, source, and demos;
reuse current evidence and update only affected map rows. Keep read logging off unless `DEBUG=true`
exactly. Run formal preflight only if the workspace pipeline identifies an unresolved check it can answer;
otherwise record `NOT_REQUIRED` and the reason in the existing task record. After implementation, perform
the targeted render/interaction checks required by the delta. Run final audit only when the workspace or
handoff policy requires it; report actual commands, results, and artifact paths.
```

### Source authority

Owner decisions and task constraints define the target. Current package source, types, exports, and compatible demos define API support. These rules define product and implementation policy. Knowledge pages route evidence; they do not replace API verification.
