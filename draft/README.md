# SkyTrack UI Agent Guideline — Review Draft

**STATUS: OWNER REVIEW DRAFT** · **SOURCE BASIS: skytrack-ui 0.1.5**

This bundle is a historical experiment for AI agents to plan Information Architecture (IA), route to component guidance, implement with SkyTrack UI, and decide what to do when a reference or brief is incomplete. It does not replace active workspace or package rules. For normal work, do not load this bundle: start from the repository `AGENTS.md`, then follow its task-specific routes and the active component decision index at [`../knowledge/COMPONENT_ROUTING.md`](../knowledge/COMPONENT_ROUTING.md).

## Read order

1. Read the repository `AGENTS.md` and applicable task/feature instructions.
2. For this experiment only, consult the applicable sections of [`../UI_RULES.md`](../UI_RULES.md), [`../AGENT_GUIDE.md`](../AGENT_GUIDE.md), and [`../../../../agents/design-system-implementation.md`](../../../../agents/design-system-implementation.md); this does not require loading the full package guide.
3. Read [`AGENT_GUIDELINE.md`](AGENT_GUIDELINE.md) for the end-to-end decision procedure.
4. For this experiment only, use [`COMPONENT_ROUTING.md`](COMPONENT_ROUTING.md) to identify a likely family; the active router is [`../knowledge/COMPONENT_ROUTING.md`](../knowledge/COMPONENT_ROUTING.md).
5. Read only the audience-specific guide needed for the decision. The experimental instruction to read both editions is not the active policy; verify implementation/API claims against the target installed package version and compatible evidence.

## Bundle

- [`AGENT_GUIDELINE.md`](AGENT_GUIDELINE.md) — IA-first workflow, implementation gates, ambiguity handling, and verification.
- [`COMPONENT_ROUTING.md`](COMPONENT_ROUTING.md) — scenario-to-component index for all 51 source/manifest declarations, with direct links to Designer and Developer guidance and an explicit compiled-artifact caveat.
- [`CODE_EXAMPLES.md`](CODE_EXAMPLES.md) — concise, version-checked examples showing how routing becomes supported component composition.
- [`AUDIT_NOTES.md`](AUDIT_NOTES.md) — evidence summary for the 102-page knowledge audit and Gemini 4 Argon dispositions.

## Authority

This draft is subordinate to the active repository and package instructions until the Owner approves a merge. If anything conflicts, follow the active rule and package source. In a consumer app, the installed package's actual runtime and type artifacts determine whether an API is usable; a `package.json` declaration or unbuilt source export alone is not sufficient. Knowledge pages explain UX intent and component choice.

## Validation state

**PHASE 1 COMPLETE · PHASE 2 COMPLETE · PHASE 3 EXECUTION COMPLETE.** Three read-only reviews covered all 102 Developer/Designer pages. The source/manifest declares 51 component subpaths; the current compiled `0.1.5` distribution contains 43, with 8 declared entries lacking built runtime/type artifacts. Gemini 4 Argon audited the draft; coordinator dispositions and accepted corrections are recorded in [`AUDIT_NOTES.md`](AUDIT_NOTES.md). Three isolated prompt executions completed in separate workspaces; exact prompts and executor receipts are recorded in the T-354 evidence. The Owner waived independent QA of probe outputs and deferred mobile review, so those routes are not claimed as independently validated. The draft remains unmerged pending Owner review. No production build ran.
