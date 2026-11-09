# Component decision index

**STATUS: ACTIVE** · **55 DECLARED COMPONENT FAMILIES IN THE CURRENT SOURCE INDEX**

Use this as a quick, one-pass scan of the component catalog before deciding to build a custom control or pattern. Match the task to the “Use when” column and shortlist plausible families. This index is for routing only: it does not prove that an API exists in the target installation or that a candidate fits every requirement.

Do not open every linked knowledge page, implementation file, type declaration, or demo. After shortlisting, read only the audience-specific guide(s) needed to settle the decision and verify only those candidates against the target package version, exports, types/source, and closest compatible demo. The active source/manifest inventory can include families absent from a consumer's installed build.

| User need / route signal | Component | Use when | Designer guide | Developer guide |
| --- | --- | --- | --- | --- |
| Repeated expandable sections | Accordion | People need to scan a set of related disclosures and open one or more sections. For a single optional panel, compare Collapsible. | [Designer](designer/accordion.md) | [Developer](components/accordion.md) |
| Contextual message in the page | Alert | A status, warning, or action needs to remain visible in the surrounding workflow. For brief background confirmation, compare Toast. | [Designer](designer/alert.md) | [Developer](components/alert.md) |
| Interrupting high-consequence choice | Alert Dialog | Someone must explicitly confirm or cancel a destructive, irreversible, or otherwise high-impact action. For a focused task without urgent confirmation, compare Dialog. | [Designer](designer/alert-dialog.md) | [Developer](components/alert-dialog.md) |
| Existing file shown with metadata | Attachment | A file or media item has already been attached and needs a preview, state, or contextual actions. For adding files, compare Dropzone. | [Designer](designer/attachment.md) | [Developer](components/attachment.md) |
| Suggestions while entering text | Autocomplete | People type a query and need matching suggestions, while the field may support text beyond a fixed option list. Compare Combobox for constrained selection and Select for a fixed unsearched list. | [Designer](designer/autocomplete.md) | [Developer](components/autocomplete.md) |
| Person or entity identity | Avatar | A compact identity cue should use an image, initials, or an appropriate fallback. | [Designer](designer/avatar.md) | [Developer](components/avatar.md) |
| Small count, status, or category marker | Badge | A compact label or count supplements an object or control. Do not use it as the only way to communicate a critical state. | [Designer](designer/badge.md) | [Developer](components/badge.md) |
| Hierarchical location | Breadcrumb | People need a return path through genuinely nested routes or content. Do not use it to repeat primary navigation. | [Designer](designer/breadcrumb.md) | [Developer](components/breadcrumb.md) |
| Trigger an immediate action | Button | A person submits, opens, confirms, or otherwise initiates an action. Choose emphasis by action priority and verify the available variant. | [Designer](designer/button.md) | [Developer](components/button.md) |
| Browse a month grid or choose dates | Calendar | People need a visible calendar grid for date selection or browsing. For a compact date field that opens a calendar, compare Date Picker. | [Designer](designer/calendar.md) | [Developer](components/calendar.md) |
| Show quantitative relationships | Chart | Historical or aggregate comparison, trend, distribution, relationship, or spatial pattern is the task. Use a table or labeled values when exact lookup is primary; inspect readability at the target viewport. A filled bar for data is still a chart, not task Progress. | [Designer](designer/chart.md) | [Developer](components/chart.md) |
| Select multiple related options visibly | Checkbox Group | People choose several related options and benefit from comparing them together. For a single independent choice, use Checkbox; for many space-constrained options, compare multi-select Select. | [Designer](designer/checkbox-group.md) | [Developer](components/checkbox-group.md) |
| Display source code, terminal output, or a code diff | Code Block | People need to read or copy a static code sample, command, output, or change preview. Use an editor only when people must author or execute code. | [Designer](designer/code-block.md) | [Developer](components/code-block.md) |
| Toggle one independent selection | Checkbox | A single option can be checked, unchecked, or indeterminate, typically as part of a form or selection set. | [Designer](designer/checkbox.md) | [Developer](components/checkbox.md) |
| Reveal one optional panel | Collapsible | One secondary section can be shown or hidden in context. For a repeated set of disclosure sections, compare Accordion. | [Designer](designer/collapsible.md) | [Developer](components/collapsible.md) |
| Search and choose from a constrained list | Combobox | People need to filter a list and select one or more listed values. Compare Autocomplete when freeform text/suggestions are central and Select when search is unnecessary. | [Designer](designer/combobox.md) | [Developer](components/combobox.md) |
| Search or launch commands quickly | Command | People need a searchable action/command palette, often with keyboard invocation. Do not substitute it for persistent navigation. | [Designer](designer/command.md) | [Developer](components/command.md) |
| Find or filter content with a query | Search | People need to locate records or filter a page/component result set by text. Use Combobox when the query must select from constrained suggestions. | [Designer](designer/search.md) | [Developer](components/search.md) |
| Actions at a pointed or pressed object | Context Menu | An action list is directly anchored to a right-click or long-press target. Provide another discoverable path for essential actions. | [Designer](designer/context-menu.md) | [Developer](components/context-menu.md) |
| Compare and operate on dense records | Data Table | Records have meaningful columns and people need row-by-row comparison, search, sorting, paging, visibility, or selection. For individual browsing, compare list/card layouts. | [Designer](designer/data-table.md) | [Developer](components/data-table.md) |
| Enter a date in a compact field | Date Picker | A field opens a calendar for selecting a date. Compare Calendar for a standalone month-grid experience or broader date-range interaction. | [Designer](designer/date-picker.md) | [Developer](components/date-picker.md) |
| Focused modal task | Dialog | A task needs focused modal space but is not primarily a high-impact confirmation. Compare Alert Dialog for required confirm/cancel decisions and Drawer for an edge panel. | [Designer](designer/dialog.md) | [Developer](components/dialog.md) |
| Edge-anchored inspector or navigation panel | Drawer | People need a temporary panel from a viewport edge, often for responsive navigation, filters, or selected-item details. Compare Dialog when the task should be centered and modal. | [Designer](designer/drawer.md) | [Developer](components/drawer.md) |
| Add files through picker or drag/drop | Dropzone | People add one or more files and need a visible drop target plus a file-picker path. For the attached-file result, compare Attachment. | [Designer](designer/dropzone.md) | [Developer](components/dropzone.md) |
| Label, describe, or validate a control | Field | A control needs an accessible label, supporting text, validity, or error relationship. Read this with the actual control page. | [Designer](designer/field.md) | [Developer](components/field.md) |
| Group related form controls semantically | Fieldset | A group of related controls needs a shared legend and semantic relationship. Use it based on content relationship, not as a generic visual card. | [Designer](designer/fieldset.md) | [Developer](components/fieldset.md) |
| Submit and validate a form | Form | Inputs participate in a submission flow with validation and a submit outcome. Compose with Field and field-control guidance. | [Designer](designer/form.md) | [Developer](components/form.md) |
| Edit a value in place | Inline Edit | A displayed value can be changed without leaving its context. Make edit, save, cancel, and validation states clear. | [Designer](designer/inline-edit.md) | [Developer](components/inline-edit.md) |
| Enter a single line of text | Input | A person enters a short freeform value. Use Field for labels/descriptions/errors and a specialized field for numeric, date, or code entry. | [Designer](designer/input.md) | [Developer](components/input.md) |
| Action list attached to a trigger | Menu | Related commands or links open from a trigger such as an overflow button. Compare Context Menu when invocation is anchored to a pointer/long-press target. | [Designer](designer/menu.md) | [Developer](components/menu.md) |
| Persistent application command strip | Menubar | A desktop-style application organizes commands into persistent top-level menus. For page navigation, use a navigation component instead. | [Designer](designer/menubar.md) | [Developer](components/menubar.md) |
| Show a measured value within a known range | Meter | People need to understand a current scalar value against a defined range. For completion of an ongoing operation, use Progress. | [Designer](designer/meter.md) | [Developer](components/meter.md) |
| Navigate between product areas in a header | Navigation Menu | A site/application header needs primary navigation with expandable navigation panels. Reuse existing shell and routes. | [Designer](designer/navigation-menu.md) | [Developer](components/navigation-menu.md) |
| Enter an exact numeric value | Number Field | People enter a number and may use increment/decrement controls, bounds, or a step interval. Compare Slider when choosing by continuous direct manipulation is more useful. | [Designer](designer/number-field.md) | [Developer](components/number-field.md) |
| Enter a one-time verification code | OTP Field | People enter a short security or verification code in segmented character positions. | [Designer](designer/otp-field.md) | [Developer](components/otp-field.md) |
| Establish page identity and actions | Page Header | A page needs its title and related context such as breadcrumbs, actions, or lower navigation. Keep heading semantics consistent with the document outline. | [Designer](designer/page-header.md) | [Developer](components/page-header.md) |
| Move through result pages | Pagination | A result set is divided into pages and people need previous/next or page selection. Check how the page state interacts with filters and list/detail navigation. | [Designer](designer/pagination.md) | [Developer](components/pagination.md) |
| Rich transient content anchored to a trigger | Popover | People need a small interactive helper such as filter or quick settings content. Use Dialog/Drawer for longer or more consequential tasks. | [Designer](designer/popover.md) | [Developer](components/popover.md) |
| Preview a linked object on hover or focus | Preview Card | People benefit from a brief rich preview before navigating. Do not hide essential information behind hover. | [Designer](designer/preview-card.md) | [Developer](components/preview-card.md) |
| Show completion of ongoing work | Progress | People need completion feedback for an operation currently underway. Historical rates or category shares are charts; for a current measured value within a range, compare Meter. | [Designer](designer/progress.md) | [Developer](components/progress.md) |
| Orient people in a linear multistep task | Progress Indicator | People need to know completed, current, and upcoming steps in a fixed process. Use Progress for an operation that is currently running. | [Designer](designer/progress-indicator.md) | [Developer](components/progress-indicator.md) |
| Choose one of a short visible set | Radio Group | A few mutually exclusive choices fit in the current form and are easier to compare when all are visible. Compare Select for longer lists or constrained space. | [Designer](designer/radio.md) | [Developer](components/radio.md) |
| Resize adjacent work areas | Resizable | People need to adjust space between related panels, such as a map and inspector. Use Tabs for mutually exclusive views or Drawer for temporary details. | [Designer](designer/resizable.md) | [Developer](components/resizable.md) |
| Scroll a bounded content region | Scroll Area | A content region needs bounded scrolling with the package's themed scrollbar. Prefer normal page or native scrolling when no bounded region is required. | [Designer](designer/scroll-area.md) | [Developer](components/scroll-area.md) |
| Choose from a predefined dropdown | Select | People choose one or more fixed options without needing list search. Compare Radio Group for a short visible set and Combobox for searchable constrained options. | [Designer](designer/select.md) | [Developer](components/select.md) |
| Separate related groups | Separator | A visible or semantic divider helps distinguish adjacent content groups. Do not use it in place of meaningful headings or spacing. | [Designer](designer/separator.md) | [Developer](components/separator.md) |
| Primary application navigation shell | Sidebar | The application needs persistent primary navigation with responsive collapsed/off-canvas behavior. Inherit the current shell before creating another. | [Designer](designer/sidebar.md) | [Developer](components/sidebar.md) |
| Choose a value across a numeric range | Slider | People benefit from direct manipulation over a continuous or discrete range. Pair with a numeric readout or exact entry when precision matters. | [Designer](designer/slider.md) | [Developer](components/slider.md) |
| Immediately enable or disable a setting | Switch | A binary setting takes effect immediately when changed. For a choice that is only committed on form submission, compare Checkbox. | [Designer](designer/switch.md) | [Developer](components/switch.md) |
| Switch among independent views in one context | Tabs | People move among related independent panels without changing the overall object/page context. Use routes/navigation for distinct destinations. | [Designer](designer/tabs.md) | [Developer](components/tabs.md) |
| Brief non-blocking operation feedback | Toast | A short-lived status confirms a background or completed operation. Keep critical or persistent information in an Alert or page state. | [Designer](designer/toast.md) | [Developer](components/toast.md) |
| Choose among related button-like modes | Toggle Group | A compact related set needs shared single or multiple selection behavior. Compare Tabs for switching content panels and Checkbox Group for form choices. | [Designer](designer/toggle-group.md) | [Developer](components/toggle-group.md) |
| Pressable two-state action control | Toggle | A button-like control retains an on/off pressed state. For immediate binary settings, compare Switch. | [Designer](designer/toggle.md) | [Developer](components/toggle.md) |
| Group related actions and controls | Toolbar | A related set of actions, toggles, menus, and controls benefits from a cohesive keyboard-navigable strip. | [Designer](designer/toolbar.md) | [Developer](components/toolbar.md) |
| Brief non-interactive hint | Tooltip | A short hint clarifies an unlabeled or unfamiliar control on hover/focus. Do not put required instructions or interactive content in it. | [Designer](designer/tooltip.md) | [Developer](components/tooltip.md) |

## Fast distinctions

| If you are choosing between… | Prefer… | When… |
| --- | --- | --- |
| Alert Dialog / Dialog | Alert Dialog | Confirmation is high impact or hard to reverse; use Dialog for a focused task without that confirmation role. |
| Accordion / Collapsible | Accordion | There are multiple related disclosures; use Collapsible for one optional panel. |
| Date Picker / Calendar | Date Picker | Date entry is a compact field; use Calendar for a standalone visible month grid. |
| Select / Radio Group / Combobox | Select | A fixed list is too long to show at once but does not need search; use Radio Group for a short visible set, Combobox for searchable constrained choices. |
| Autocomplete / Combobox | Autocomplete | Typing suggestions are primary and freeform text may be meaningful; use Combobox when a listed option must be selected. Verify each page's constraints. |
| Checkbox / Switch / Toggle | Checkbox | Selection is committed with a form; use Switch for an immediate setting, Toggle for a button-like pressed state. |
| Meter / Progress / Progress Indicator / Chart | Meter | Use Meter for current values against a range, Progress for ongoing operation completion, Progress Indicator for a multistep workflow, and Chart for historical or comparative data. |
| Alert / Toast | Alert | The information should remain in context; use Toast for brief, non-blocking feedback. |
| Menu / Context Menu / Command | Menu | An explicit trigger opens a nearby action list; use Context Menu for pointer/long-press context, Command for searchable keyboard-oriented commands. |
| Tabs / Navigation Menu / Sidebar | Tabs | People switch independent panels of one context; use navigation components for distinct product destinations. |
| Data Table / Chart | Data Table | Exact record lookup or row-by-row comparison is primary; use Chart for quantitative patterns/comparison, with exact values available when required. |

## Required decision gate before implementation

1. Enumerate every distinct UI need, including visuals nested inside cards/tables and each
   interaction. Group repeats, but do not let a parent row cover child needs.
2. Shortlist candidates from this index. Open only the matching developer guide and, when the UX
   choice is uncertain, the matching designer guide.
3. Verify the exact installed package/export, declaration, runtime implementation, and closest
   compatible demo. Record their exact paths beside the need; add opened `FILE-READ-LOG.md` row IDs
   only when the environment is exactly `DEBUG=true`.
   If source/demo is not shipped, state the limitation and inspect the installed entry point. Do not
   infer support from a source checkout or a version string.
4. Record the composition decision before implementation. Run
   `node skills/skytrack-ui/references/scripts/audit-ui-handoff.mjs --stage preflight ... --gate-record PREFLIGHT-GATE-RESULT.md`;
   a failed/skipped gate blocks implementation of those needs. Keep the generated record. Rerun the
   gate when a component, export, version, or evidence row changes, then continue implementation.
5. Prefer supported SkyTrack components/compositions. A visual preference alone does not justify a
   custom replacement. First fix confirmed appearance defects through verified props/slots/classes.
   Use a local fallback only for a concrete unmet requirement and document why installed parts cannot
   compose it.

The installed global theme is a prerequisite to implementation: import `skytrack-ui/styles.css`
exactly once at the app entry point. Verify the installed `./styles.css` export, open the installed
CSS and its referenced font assets, and confirm they resolve. Log those reads only when the
environment is exactly `DEBUG=true`; Tailwind or a source-checkout CSS import does not prove the
consumer loaded SkyTrack's component classes, theme tokens, or fonts.

## Select documentation by decision

- **Design/UX choice:** read the Designer page for the shortlisted candidate when usage, behavior, information priority, or accessibility implications need resolving.
- **Code/API implementation:** read the Developer page for the shortlisted candidate, then inspect only that candidate's installed exports, types/source, and closest compatible demo.
- **Both decisions are active:** read both editions for the shortlisted candidate. Do not read both editions by default.
- **No candidate fits:** state which capability is missing and why the available components cannot compose it. Then use semantic HTML for structure and supported library controls for interactive parts; keep any custom piece local and minimal.

When the source index and target installation disagree, the target installation decides what can be used. Report a stale or missing catalog entry rather than inferring support from a family name, source-only file, or another version's demo.
