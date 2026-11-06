# T-354 Knowledge and Draft Audit Notes

**STATUS: PHASE 1 COMPLETE · PHASE 2 COMPLETE · PHASE 3 IN PROGRESS** · **REVIEW SCOPE: 51 COMPONENTS × 2 AUDIENCES**

This record will summarize the three disjoint read-only audits, coordinator source checks, Gemini 4 Argon review, and the accepted/rejected recommendation decisions. The per-component reports in `_tasks/evidence/T-354/` remain the detailed evidence.

## Component knowledge audit

| Group | Component pages | Worker / model | Report | State |
| --- | --- | --- | --- | --- |
| A | accordion through context-menu (17 pairs) | `task_0abfb56d9c43` · Gemini 3.8 Flash High | [`knowledge-audit-a.md`](../../../../_tasks/evidence/T-354/knowledge-audit-a.md) | COMPLETE |
| B | data-table through page-header (17 pairs) | `task_ae705f35290e` · Gemini 3.8 Flash High | [`knowledge-audit-b.md`](../../../../_tasks/evidence/T-354/knowledge-audit-b.md) | COMPLETE |
| C | pagination through tooltip (17 pairs) | `task_2138ea25ee4b` · Gemini 3.8 Flash High | [`knowledge-audit-c.md`](../../../../_tasks/evidence/T-354/knowledge-audit-c.md) | COMPLETE |

### Coordinator disposition

**AUDIT COMPLETE: 102/102 knowledge pages reviewed** (51 Developer + 51 Designer); no page was marked UNVERIFIED. Raw reviewer verdicts were 88 PASS and 14 FINDING. Coordinator disposition: three Developer findings are confirmed factual inaccuracies; eleven Designer `Types` annotation findings are not current rendering failures because every affected slug is registered in `designerTypePatternsByDemoId` and the showcase renders `DesignerTypeGallery` for that tab. Treat those eleven as an optional Markdown self-sufficiency improvement, not a blocking implementation error. The Developer `_template.md`'s live-variant rule does not govern the Designer format; `designer/README.md` separately defines Designer topic behavior.

The independent review also confirmed a distribution mismatch: the current manifest/source declares 51 subpaths, but `dist-lib` and the `0.1.5` tarball contain 43 built components. The eight missing built runtime/type entries are `calendar`, `chart`, `command`, `data-table`, `date-picker`, `page-header`, `pagination`, and `sidebar`. The draft now warns consumer agents to verify artifacts rather than trust manifest/source declarations alone.

### Confirmed, not fixed in the source knowledge pages

| Component | Confirmed discrepancy | Source evidence | Draft implication |
| --- | --- | --- | --- |
| `alert-dialog` | Developer guide reports backdrop `bg-black/20` and popup tokens `--card` / `--radius-lg`; installed source uses `bg-black/60`, `bg-background`, and `rounded-(--radius)`. | [`alert-dialog.tsx`](../src/components/ui/alert-dialog.tsx); reviewer details in [Group A](../../../../_tasks/evidence/T-354/knowledge-audit-a.md). | Draft says installed source/classes govern over stale prose; verify tokens rather than copying described classes. |
| `chart` | Developer guide documents an `indicator` prop on `ChartTooltipContent` that its source type does not accept. | [`chart.tsx`](../src/components/ui/chart.tsx); reviewer details in [Group A](../../../../_tasks/evidence/T-354/knowledge-audit-a.md). | Draft explicitly requires type/source verification and says never infer or pass undocumented props. |
| `dialog` | Developer guide claims the demo metadata title is `Typography`; current demo metadata title is `Dialog`. | [`dialog.demo.tsx`](../src/demos/dialog.demo.tsx); reviewer details in [Group B](../../../../_tasks/evidence/T-354/knowledge-audit-b.md). | Draft requires version-matched source/demos to resolve stale documentation. |

No existing knowledge page was edited because T-354 is scoped to a reviewable `/draft` bundle. These three discrepancies remain visible in the reports for a later, separately authorized knowledge-page cleanup.

### Reclassified Designer Types findings

Group C reported 11 missing `Live demo variant` annotations under Designer `Types`. This is not required by the Developer-only [`_template.md`](../skills/skytrack-ui/references/knowledge/_template.md). The Designer index says Types appears only when a distinct design choice exists, and current showcase code uses the registered type gallery rather than the single live demo variant for those slugs: [`designer-guideline-sheet.tsx`](../src/showcase/component-guidelines/designer-guideline-sheet.tsx) and [`designer-type-patterns.ts`](../src/showcase/component-guidelines/designer-type-patterns.ts). The current UI therefore remains functional. If the Owner later wants the Markdown corpus to be self-sufficient for non-showcase readers, consistent annotations may be a low-priority documentation improvement.

## Gemini 4 Argon independent audit

**STATE: COMPLETE.** Gemini 4 Argon High via `agy` completed a read-only audit as Orca task `task_3784e2819173` / dispatch `ctx_b6f2b73f6ba2`. The full report is [`gemini-4-argon-audit.md`](../../../../_tasks/evidence/T-354/gemini-4-argon-audit.md). The coordinator independently checked its main package, routing, and demo findings. Accepted corrections are in the draft only; no active rule, source, package, or knowledge page was changed.

## Three isolated cold-agent probes

**STATE: IN PROGRESS.** Three prompts use separate copies of the probe workspace. The exact briefs and coordinator-only rubric are stored under T-354 evidence; each resulting route must show its Prompt and the effective Executor from the Orca receipt. Existing probe files and the earlier 10-agent campaign are preserved. Workers do not receive the scoring rubric; first-attempt evidence is captured before any coaching.

## Coordinator review of Gemini 4 Argon findings

| Finding | Disposition | Coordinator decision |
| --- | --- | --- |
| F-01 DataTable declaration claim | ACCEPTED | Verified that the compiled root declaration, runtime, and `0.1.5` tarball omit DataTable. The example is source-checkout-only, and consumer guidance requires a built artifact or a justified semantic fallback. |
| F-02 51 declared vs. 43 built entries | ACCEPTED | Verified eight manifest subpaths lack compiled runtime/type files: `calendar`, `chart`, `command`, `data-table`, `date-picker`, `page-header`, `pagination`, and `sidebar`. The README and routing index now distinguish declaration from usability. |
| F-03 Destructive example lacks Alert Dialog | ACCEPTED | Replaced the Button-only snippet with the verified AlertDialog/AlertDialogClose composition and explicit cancel action. |
| F-04 Missing DS visual scales | ACCEPTED | Added sourced heading, surface-padding, spacing, form-grid, shared-control-height, and semantic-table-fallback defaults. |
| F-05 Field composition | ACCEPTED | Added FieldGroup/FieldRow and clarified FieldControl for compatible basics versus compound controls. |
| F-06 Source aliases/export names | ACCEPTED | Added alias conversion, exact symbol and detached-handle caveats, and Calendar's synthesized showcase-demo source. |
| F-07 IA and responsive detail | ACCEPTED | Added six page patterns, the one-to-two-column baseline, actionable list states, mobile adaptation, and the 320px/400% plus 200% text zoom baseline. |
| F-08 Mode selection | PARTIAL | Added one-time STRICT/YOLO selection and persistence for reference-based/full delivery assignments. Routine UI repairs do not prompt. Marketing direction/motion stays in its dedicated skill as outside this product-UI draft's scope. |
| F-09 UX guidance versus demos | ACCEPTED | Clarified that demos show mechanics; stricter Designer UX governs product use, including not stacking confirmation dialogs for unsaved edits. |
| Group C Designer Types | VERIFIED / NON-BLOCKING | Argon independently confirmed the registered gallery rendering; no UI bug is evidenced. |

The draft remains unmerged. Coordinator confirmed the material recommendations against current source, declarations, package artifact, demos, and IA rules. No active rule, component knowledge page, library source, or existing probe was modified.
