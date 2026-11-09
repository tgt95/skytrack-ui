export type PatternId =
  | 'common-actions'
  | 'dialogs'
  | 'disabled-states'
  | 'disclosures'
  | 'empty-states'
  | 'filtering'
  | 'fluid-styles'
  | 'forms'
  | 'global-header'
  | 'loading'
  | 'login'
  | 'notifications'
  | 'overflow-content'
  | 'read-only-states'
  | 'search'
  | 'status-indicators'
  | 'text-toolbars'
  | 'community-chatbots'
  | 'community-in-app-learning'
  | 'community-create-flows'
  | 'community-edit'
  | 'community-export'
  | 'community-api-key'
  | 'community-import'
  | 'community-order-summary'
  | 'community-remove'

export type PatternDefinition = {
  id: PatternId
  title: string
  group: 'Core' | 'Community'
  sourceStatus: 'Universal' | 'Additional local topic' | 'Community maintained' | 'Community catalog only'
  sourcePath: string
  summary: string
  whenToUse: string
  userBenefit: string
  designGuidance: string[]
  implementationGuidance: string[]
  components: string[]
  sourceNote?: string
}

const CORE_SOURCE = 'designs/components/skytrack-ui/docs/carbon-ds-reference/patterns'
const COMMUNITY_SOURCE = 'designs/components/skytrack-ui/docs/carbon-ds-reference/community/patterns'

export const PATTERNS: PatternDefinition[] = [
  {
    id: 'common-actions',
    title: 'Common actions',
    group: 'Core',
    sourceStatus: 'Universal',
    sourcePath: `${CORE_SOURCE}/common-actions/index.md`,
    summary:
      'Consistent placement, labels, confirmation, and feedback for add, cancel, clear, close, copy, delete, edit, errors, next, refresh, remove, and reset.',
    whenToUse: 'Use these shared action patterns whenever people act on a control, a resource, or a workflow.',
    userBenefit: 'People can predict what each action changes, while the most important next step is easy to find.',
    designGuidance: [
      'When Add is the main task, make it the single primary action; otherwise use less emphasis and keep other actions secondary.',
      'Use an action label and placement consistently so the same word leads to the same result.',
      'Use a secondary button or link for Cancel; place Clear’s close icon at the field’s right edge; dismiss surfaces with an upper-right close icon rather than a Close button; confirm Copy with a brief tooltip and keep Remove low emphasis.',
      'Keep cancel, close, clear, reset, remove, and delete distinct; Delete destroys an object and is usually permanent, while Remove detaches it.',
      'Match confirmation and post-action feedback to the impact, reversibility, and failure cost of the action.'
    ],
    implementationGuidance: [
      'Use Button for primary and secondary actions, Menu for grouped overflow, and AlertDialog for high-impact deletion.',
      'Keep demo actions local and make the affected sample item visible.',
      'Use descriptive labels instead of relying on an icon alone.'
    ],
    components: ['Button', 'Menu', 'AlertDialog']
  },
  {
    id: 'dialogs',
    title: 'Dialogs',
    group: 'Core',
    sourceStatus: 'Universal',
    sourcePath: `${CORE_SOURCE}/dialog-pattern/index.md`,
    summary: 'A focused conversation that asks for input or gives urgent information during a workflow.',
    whenToUse:
      'Use a modal when the user must respond before continuing, or a non-modal panel when the page should remain available.',
    userBenefit: 'People keep their page context unless a response is necessary before they can continue.',
    designGuidance: [
      'Block the underlying page only when the user must respond before continuing; otherwise preserve access to it.',
      'Use dialogs sparingly and keep each task short and focused.',
      'Open them from a user action; do not nest dialogs or make a dialog a substitute for a full page.',
      'Keep focus, keyboard dismissal, validation, and completion behavior clear; place Cancel on the far left and the sole primary action on the far right.'
    ],
    implementationGuidance: [
      'Use Dialog for a task that needs context and AlertDialog when a response is required to continue.',
      'Use the library trigger, portal, backdrop, popup, title, description, and footer composition.',
      'Keep the sample flow local and put cancel beside its completion action.'
    ],
    components: ['Dialog', 'AlertDialog', 'Button']
  },
  {
    id: 'disabled-states',
    title: 'Disabled states',
    group: 'Core',
    sourceStatus: 'Universal',
    sourcePath: `${CORE_SOURCE}/disabled-states/index.md`,
    summary: 'An unavailable control state used when permissions, dependencies, or prerequisites prevent interaction.',
    whenToUse:
      'Use disabled while a specific condition blocks an otherwise available action; use read-only when values remain reviewable.',
    userBenefit: 'A visible reason and a way to resolve it turn an unavailable control into a clear next step.',
    designGuidance: [
      'Explain the prerequisite or permission when the disabled state would otherwise be confusing.',
      'Keep the blocked action visible while the user can resolve its prerequisite.',
      'Do not use disabled styling as a substitute for read-only content.',
      'Hide an item only when the user should not see it at all.'
    ],
    implementationGuidance: [
      'Use the disabled prop on the actual control and keep its Field label and description associated.',
      'Keep the reason for the state visible near the control.',
      'Do not simulate disabled styling with color alone.'
    ],
    components: ['Field', 'Input', 'Button']
  },
  {
    id: 'disclosures',
    title: 'Disclosures',
    group: 'Core',
    sourceStatus: 'Universal',
    sourcePath: `${CORE_SOURCE}/disclosures-pattern/index.md`,
    summary: 'User-triggered content that reveals information related to the control or item that opened it.',
    whenToUse:
      'Use a disclosure for secondary details or options that are useful in context but need not occupy the page by default.',
    userBenefit: 'The page stays scannable while related details remain available where they are needed.',
    designGuidance: [
      'Keep the revealed content reasonably sized and do not hide critical information.',
      'Choose inline expansion for related details and a menu or popover for compact options.',
      'Avoid nested disclosures and avoid opening many competing sections at once.',
      'Make the trigger, expanded state, and dismissal behavior easy to understand.'
    ],
    implementationGuidance: [
      'Use Collapsible for inline reveal and Menu for a compact set of actions or settings.',
      'Keep the trigger user initiated and place the revealed content next to its source.',
      'Use menu apply/cancel actions when users edit several settings as a batch.'
    ],
    components: ['Collapsible', 'Menu', 'Button']
  },
  {
    id: 'empty-states',
    title: 'Empty states',
    group: 'Core',
    sourceStatus: 'Universal',
    sourcePath: `${CORE_SOURCE}/empty-states-pattern/index.md`,
    summary: 'A content area with no data, including first use, user-created emptiness, or unavailable content.',
    whenToUse:
      'Use the empty state that names the actual reason: no data yet, no results, an error, or a required user action.',
    userBenefit: 'People learn why content is missing and what they can do next instead of meeting a dead end.',
    designGuidance: [
      'Explain why the space is empty and offer a useful next step when one exists.',
      'Keep the message sized to its space and use starter content only when it helps people begin.',
      'Give search with no matches its own recovery guidance instead of reusing first-use copy.'
    ],
    implementationGuidance: [
      'Compose a concise status message with Alert or semantic text and an optional Button.',
      'Replace the empty result surface with the state instead of leaving a dead, empty table.',
      'Make the example action change only local sample state.'
    ],
    components: ['Alert', 'Button']
  },
  {
    id: 'filtering',
    title: 'Filtering',
    group: 'Core',
    sourceStatus: 'Universal',
    sourcePath: `${CORE_SOURCE}/filtering/index.md`,
    summary: 'A way for people to include or exclude items from a displayed data set using defined attributes.',
    whenToUse:
      'Use filters when a collection needs narrowing by known attributes; choose single, multiple, or combined filters to fit the task.',
    userBenefit: 'People can narrow a known collection and see whether their choices changed the results.',
    designGuidance: [
      'Show active filter state and whether changes apply immediately or after an explicit action.',
      'Apply simple, single-category choices immediately; use Apply and Cancel when users need to review several pending choices.',
      'Support clearing or resetting filters without forcing users to reverse each choice.',
      'Keep the result count and empty result recovery close to the filtered content.'
    ],
    implementationGuidance: [
      'Compose Input with ToggleGroup or other supported selection controls and a visible result list.',
      'Use immediate updates for simple filters; use batch apply/cancel when users build a larger filter set.',
      'Expose the active selection and clear action to keyboard and assistive technology.'
    ],
    components: ['Input', 'ToggleGroup', 'DataTable', 'Button']
  },
  {
    id: 'fluid-styles',
    title: 'Fluid styles',
    group: 'Core',
    sourceStatus: 'Additional local topic',
    sourcePath: `${CORE_SOURCE}/fluid-styles/index.md`,
    summary: 'Alternative fluid presentations for familiar controls, containers, and forms alongside default styles.',
    whenToUse:
      'Use a fluid treatment when the page context calls for a more expressive surface, and use default styling for dense productive work.',
    userBenefit: 'Controls fit their parent layout without forcing every task into the same width.',
    designGuidance: [
      'Apply fluid styles intentionally to related controls instead of mixing them without hierarchy.',
      'Check alignment, sizing, placement, and accessibility when a fluid control spans its container.',
      'Use responsive layout rules so fluid forms remain readable at narrow widths.'
    ],
    implementationGuidance: [
      'Use the installed component variants and responsive Tailwind layout utilities.',
      'Treat this as presentation guidance; do not introduce a second control API.',
      'Compare full-width and default-width actions within the same local example.'
    ],
    components: ['Button', 'Input', 'Field']
  },
  {
    id: 'forms',
    title: 'Forms',
    group: 'Core',
    sourceStatus: 'Universal',
    sourcePath: `${CORE_SOURCE}/forms-pattern/index.md`,
    summary: 'Related input controls that let people provide data or configure options.',
    whenToUse:
      'Use a form for one or more related values; choose a page, side panel, or dialog according to task complexity and context.',
    userBenefit: 'Clear labels, grouped fields, and actionable errors reduce uncertainty and repeated work.',
    designGuidance: [
      'Label controls, distinguish optional from required information, and explain unusual values with helper text.',
      'Collect only what the task needs; group related fields and validate beside the problem with a clear repair.',
      'Keep action order, button emphasis, spacing, and responsive columns consistent.'
    ],
    implementationGuidance: [
      'Compose FieldRoot, FieldLabel, FieldDescription, FieldError, and the appropriate control.',
      'Use real input labels and keep errors beside the affected field.',
      'Use a local submit state in the demo rather than implying a server saved the values.'
    ],
    components: ['Field', 'Input', 'Button']
  },
  {
    id: 'global-header',
    title: 'Global header',
    group: 'Core',
    sourceStatus: 'Universal',
    sourcePath: `${CORE_SOURCE}/global-header/index.md`,
    summary:
      'Persistent navigation and orientation across a product, paired with local navigation for the current area.',
    whenToUse: 'Use a global header when people need a consistent way to orient and move between product areas.',
    userBenefit:
      'A stable global frame helps people move between product areas without confusing page actions with navigation.',
    designGuidance: [
      'Keep a clear sense of place and show breadcrumb levels when they help explain hierarchy.',
      'Keep cross-product navigation and system utilities separate from controls for the current page.',
      'Separate global navigation from page-level controls and match the visual hierarchy to source order.',
      'Provide keyboard access, landmarks, and a skip path to the main content.'
    ],
    implementationGuidance: [
      'Compose Breadcrumb for location and Toolbar/Menu for grouped page actions.',
      'Keep global navigation persistent and page controls associated with the current content.',
      'Use semantic navigation landmarks and a clear main heading.'
    ],
    components: ['Breadcrumb', 'Toolbar', 'Menu', 'Button']
  },
  {
    id: 'loading',
    title: 'Loading',
    group: 'Core',
    sourceStatus: 'Universal',
    sourcePath: `${CORE_SOURCE}/loading-pattern/index.md`,
    summary: 'Feedback that shows work is in progress, how much is complete, or when more content is available.',
    whenToUse:
      'Use a loading indicator for delayed work; choose skeletons for content-shaped placeholders and progress only when measurable.',
    userBenefit:
      'Honest, well-placed progress feedback reduces uncertainty without promising work the system cannot measure.',
    designGuidance: [
      'Place the indicator in the area that is loading, or use a full-screen treatment only when the entire page is blocked.',
      'Use progressive loading when useful content can appear before the full result.',
      'Keep updates perceivable and do not invent a completion percentage.'
    ],
    implementationGuidance: [
      'Use Progress with a value only when the amount of completed work is known.',
      'Use content skeletons or a concise status message for unknown duration.',
      'The example advances local state and does not start background work.'
    ],
    components: ['Progress', 'Button']
  },
  {
    id: 'login',
    title: 'Login',
    group: 'Core',
    sourceStatus: 'Universal',
    sourcePath: `${CORE_SOURCE}/login-pattern/index.md`,
    summary: 'A page where a user gains access through an available sign-in method.',
    whenToUse:
      'Use a login flow at an access boundary; choose and order authentication methods according to product policy.',
    userBenefit:
      'A clear access flow supports the methods people can use while protecting account and credential information.',
    designGuidance: [
      'Describe available methods and keep validation and server-side error recovery distinct.',
      'Use the same recovery wording for unknown accounts and incorrect credentials when revealing account membership would be unsafe.',
      'Account for progressive authentication such as single sign-on and multi-factor verification.',
      'Use a layout that works at narrow widths and preserves clear focus order.'
    ],
    implementationGuidance: [
      'Use Field and Input for a form illustration with explicit labels and recovery copy.',
      'Keep the demo non-authenticating and do not collect, transmit, or persist credentials.',
      'Connect a real login form only to the product authentication flow.'
    ],
    components: ['Field', 'Input', 'Button'],
    sourceNote: 'This library example is a UI illustration only; it does not authenticate.'
  },
  {
    id: 'notifications',
    title: 'Notifications',
    group: 'Core',
    sourceStatus: 'Universal',
    sourcePath: `${CORE_SOURCE}/notification-pattern/index.md`,
    summary: 'Timely feedback for events, task outcomes, and changes that may need attention.',
    whenToUse: 'Choose event category, semantic status, and presentation independently based on context and urgency.',
    userBenefit: 'The right timing and reach communicate urgency without interrupting more work than necessary.',
    designGuidance: [
      'Classify the event, such as work activity, collaboration/access, or workspace/system updates.',
      'Choose informational, success, warning, or error status separately from presentation.',
      'Select inline, toast, actionable, callout, banner, or panel presentation for the context; keep Banner and Notification panel concepts experimental.',
      'Use Dialog or Alert Dialog as interaction patterns when a decision or acknowledgement must block progress; they are not notification types.',
      'Do not rely on a timed toast for critical information or a required decision.'
    ],
    implementationGuidance: [
      'Use Alert for persistent context and Toast for brief, noncritical feedback.',
      'Give actions a clear consequence and retain a visible path to dismiss or recover.',
      'Keep success, warning, error, and information meaning explicit in text.'
    ],
    components: ['Alert', 'Toast', 'AlertDialog', 'Button']
  },
  {
    id: 'overflow-content',
    title: 'Overflow content',
    group: 'Core',
    sourceStatus: 'Additional local topic',
    sourcePath: `${CORE_SOURCE}/overflow-content/index.md`,
    summary: 'Text or controls that exceed the available space, handled with truncation or a show-more affordance.',
    whenToUse:
      'Use truncation for constrained repeated labels and Show more when the omitted text is useful in context.',
    userBenefit: 'Compact layouts stay readable while meaningful values remain available in full.',
    designGuidance: [
      'Keep the complete value available when truncation hides meaningful information.',
      'Prefer wrapping unless repeated content or a compact layout makes truncation necessary.',
      'Choose where to truncate based on the content; identifiers may need a middle ellipsis.',
      'Make expansion explicit and keep the expanded content easy to collapse.'
    ],
    implementationGuidance: [
      'Use responsive text wrapping by default and apply truncation only for a real space constraint.',
      'Pair truncated content with a visible Show more control or a supported Tooltip when appropriate.',
      'Keep the expanded state local in the example.'
    ],
    components: ['Tooltip', 'Button']
  },
  {
    id: 'read-only-states',
    title: 'Read-only states',
    group: 'Core',
    sourceStatus: 'Universal',
    sourcePath: `${CORE_SOURCE}/read-only-states-pattern/index.md`,
    summary: 'Values people may review but cannot modify in the current context.',
    whenToUse:
      'Use read-only when people should still inspect or copy a value; use disabled only when a prerequisite prevents interaction.',
    userBenefit: 'People can inspect important values without mistaking them for editable or unavailable content.',
    designGuidance: [
      'Keep read-only values legible and distinguish them from editable controls without suggesting they are unavailable.',
      'Make the state clear through structure, label, and behavior rather than color alone.',
      'Ensure keyboard users can focus and review the value when appropriate.'
    ],
    implementationGuidance: [
      'Use the native readOnly state on Input and keep it inside the normal Field structure.',
      'Provide a separate example for disabled controls so the two states are not conflated.',
      'Check text selection, focus, and copy behavior.'
    ],
    components: ['Field', 'Input']
  },
  {
    id: 'search',
    title: 'Search',
    group: 'Core',
    sourceStatus: 'Universal',
    sourcePath: `${CORE_SOURCE}/search-pattern/index.md`,
    summary: 'A way to find relevant content with a word or phrase, including basic, active, and focused search.',
    whenToUse:
      'Use search for open-ended discovery and add a scope filter when the searchable collection needs context.',
    userBenefit: 'People can find an open-ended match, understand the result, and recover when nothing matches.',
    designGuidance: [
      'Always show the result count, including zero and counts for each scope; show loading when results take time.',
      'Support type-ahead or recent suggestions when they help the task, without requiring them for a small local list.',
      'Keep the query and clear action available and localize the field.',
      'A scope filter selects one category at a time and defaults to All or Any.'
    ],
    implementationGuidance: [
      'Use Input for a direct search field and Command for searchable keyboard-driven choices.',
      'Return clear empty and loading states and expose result changes politely.',
      'Keep suggestion selection operable without a mouse.'
    ],
    components: ['Input', 'Command', 'Button']
  },
  {
    id: 'status-indicators',
    title: 'Status indicators',
    group: 'Core',
    sourceStatus: 'Additional local topic',
    sourcePath: `${CORE_SOURCE}/status-indicator-pattern/index.md`,
    summary: 'Visual indicators that help people assess status or severity and respond appropriately.',
    whenToUse: 'Use an indicator when a status needs to be found quickly in a list, record, or workflow.',
    userBenefit: 'Consistent labels and symbols make important states faster to scan and easier to understand.',
    designGuidance: [
      'Pair color with a text label or a well-understood icon; color alone is insufficient.',
      'Standardize status vocabulary and severity across the product.',
      'When combining states, surface the most important active condition rather than hiding its severity.',
      'Use consolidated indicators carefully to avoid adding unnecessary cognitive load.'
    ],
    implementationGuidance: [
      'Use Badge status styles for compact labels and retain the status text.',
      'Use icons only when their meaning is established and provide an accessible name.',
      'Do not imply that a visual status changes the underlying workflow state.'
    ],
    components: ['Badge', 'Alert']
  },
  {
    id: 'text-toolbars',
    title: 'Text toolbars',
    group: 'Core',
    sourceStatus: 'Universal',
    sourcePath: `${CORE_SOURCE}/text-toolbar-pattern/index.md`,
    summary: 'A compact set of actions for editing text, searching, attaching files, or embedding links.',
    whenToUse: 'Use a text toolbar when actions apply to the current text or selection and should remain close to it.',
    userBenefit: 'Actions stay close to the text they change, which reduces context switching during editing.',
    designGuidance: [
      'Keep actions relevant, grouped, and responsive; move lower-priority actions into an overflow menu.',
      'Provide accessible labels or tooltips for icon-only actions and support keyboard navigation.',
      'Include text search only when people need to find wording in the current document.'
    ],
    implementationGuidance: [
      'Use Toolbar with ToggleGroup and Toggle for related formatting states.',
      'Keep controls keyboard-operable and labels discoverable.',
      'Treat this demonstration as a local formatting example, not a rich-text editor.'
    ],
    components: ['Toolbar', 'ToggleGroup', 'Toggle', 'Menu']
  },
  {
    id: 'community-chatbots',
    title: 'Chatbots',
    group: 'Community',
    sourceStatus: 'Community maintained',
    sourcePath: `${COMMUNITY_SOURCE}/chatbot/`,
    summary: 'Community guidance for designing conversational interfaces that let users work with natural language.',
    whenToUse:
      'Use a chatbot when conversation offers a useful route through a task; keep direct controls available for predictable actions.',
    userBenefit:
      'Conversation helps with open-ended questions while direct navigation remains available for predictable tasks.',
    designGuidance: [
      'Identify the assistant as a bot, explain its limits, and make it easy to correct or restart the conversation.',
      'Use conversation only when natural language helps; keep predictable actions available through direct controls.',
      'Restate intent before consequential actions; route complex, lengthy, sensitive, or emotional needs to a person or a more suitable flow.',
      'Keep answers tied to the current task and avoid implying certainty the system does not have.',
      'Provide a visible way to reach conventional navigation or help.'
    ],
    implementationGuidance: [
      'Compose a scripted local chat illustration with Input and Button.',
      'Label example responses as local; do not connect to a networked model or service.',
      'Keep the conversation readable and expose newly added messages.'
    ],
    components: ['Input', 'Button', 'Command'],
    sourceNote: 'Community guidance is maintained separately from the core pattern topics.'
  },
  {
    id: 'community-in-app-learning',
    title: 'Content: in-app learning',
    group: 'Community',
    sourceStatus: 'Community catalog only',
    sourcePath: `${COMMUNITY_SOURCE}/index.md:38`,
    summary:
      'The catalog lists five learning topics but provides no local rules for how they open, persist, or track progress.',
    whenToUse:
      'Use in-app learning to explain a feature when and where users need it, or to help them get started with a new capability.',
    userBenefit: 'Short, timely guidance helps people take a next step without leaving the task.',
    designGuidance: [
      'Local interpretation: keep guidance relevant to the current task and make it easy to dismiss or revisit when useful.',
      'Local interpretation: offer a short next step instead of overwhelming a first-time user with a tutorial.',
      'Local interpretation: if the product tracks completion, avoid repeatedly showing guidance the user has finished.'
    ],
    implementationGuidance: [
      'Use Collapsible or Alert to illustrate contextual help with an optional next action.',
      'The local example illustrates welcome, contextual, and update guidance; it does not persist learning progress.',
      'Treat the example as a local illustration, not a complete implementation guide.'
    ],
    components: ['Collapsible', 'Alert', 'Button'],
    sourceNote:
      'The community catalog lists learning topics but does not define interaction or progress policy. Guidance here is local interpretation; the examples do not record or persist learner progress.'
  },
  {
    id: 'community-create-flows',
    title: 'Create flows',
    group: 'Community',
    sourceStatus: 'Community maintained',
    sourcePath: `${COMMUNITY_SOURCE}/create-flows/index.md`,
    summary: 'A flow for generating a new resource, distinct from adding an existing resource.',
    whenToUse:
      'Use a create flow when a new resource must be configured; choose inline, modal, side panel, tearsheet, or full page by complexity.',
    userBenefit: 'The creation surface matches the task size, so simple work stays quick and complex work has room.',
    designGuidance: [
      'Use inline creation for a simple new item; choose a larger surface when setup needs more fields, steps, or page context.',
      'In multi-step flows, disable Back on the first step and keep Next or Create unavailable until required fields are ready.',
      'For a full-page flow, confirm navigation away when the resource is still incomplete; keep Cancel as the explicit exit.',
      'Show completion and loading feedback after the user commits.'
    ],
    implementationGuidance: [
      'Use Dialog and Field for the compact local creation example.',
      'Keep save and cancel explicit and update only an in-memory sample.',
      'Do not confuse creating a new resource with adding an existing one.'
    ],
    components: ['Dialog', 'Field', 'Input', 'Button'],
    sourceNote: 'Community pattern; format and flow guidance comes from the local community page.'
  },
  {
    id: 'community-edit',
    title: 'Edit',
    group: 'Community',
    sourceStatus: 'Community maintained',
    sourcePath: `${COMMUNITY_SOURCE}/edit-pattern/index.md`,
    summary: 'A flow for changing a resource that already exists in the system.',
    whenToUse:
      'Use edit behavior aligned with create behavior unless the editable fields or need for surrounding context materially differ.',
    userBenefit: 'The edit surface and review effort match the amount of context and consequence of a change.',
    designGuidance: [
      'Choose modal, side panel, or full page according to impact and the amount of context needed.',
      'For high-impact edits, warn that the change cannot be undone, explain its system consequences, and provide a review before separate confirmation.',
      'Preserve non-editable values and show a summary of changes when it helps review.',
      'Give a clear save/cancel path and success feedback.'
    ],
    implementationGuidance: [
      'Use InlineEdit for a short value change and Field/Input for a larger form.',
      'Keep the changed value in local component state and support cancel where the composition permits.',
      'Keep non-editable data distinguishable from editable controls.'
    ],
    components: ['InlineEdit', 'Field', 'Input', 'Button'],
    sourceNote: 'Community pattern; the local page documents low- and high-impact edit options.'
  },
  {
    id: 'community-export',
    title: 'Export',
    group: 'Community',
    sourceStatus: 'Community maintained',
    sourcePath: `${COMMUNITY_SOURCE}/export-pattern/index.md`,
    summary: 'Saving a resource externally, with an option to change its format; downloading preserves the format.',
    whenToUse:
      'Use Export when a user needs an external copy in a different format; use Download when moving a remote resource to the user’s device without changing its format.',
    userBenefit:
      'A useful default keeps routine exports quick, while meaningful format choices and completion remain clear.',
    designGuidance: [
      'Provide a sensible default name and let users edit it when naming matters.',
      'Name the destination and resulting format before starting work so people know where the exported copy will go.',
      'Offer format or destination choices only when the task needs them.',
      'Present 2–5 mutually exclusive formats with a preselected default and concise guidance for each option.',
      'In a dialog, focus the first required field when input is needed; when defaults are ready, make Export the initial focus.',
      'Show progress, success, and error feedback without suggesting a file was saved before it was.'
    ],
    implementationGuidance: [
      'Use the RadioGroup for 2–5 mutually exclusive format choices and show concise guidance beside each option.',
      'Use a dialog for required name/format choices and show extension validation before preparing the export.',
      'Explain that the browser handles save location for downloads; do not imitate a system picker with in-page buttons.',
      'Do not claim to create or download a file in this example.',
      'Keep format conversion distinct from an unchanged download.'
    ],
    components: ['Dialog', 'Field', 'Input', 'Fieldset', 'RadioGroup', 'RadioRoot', 'Button', 'Progress', 'Toast'],
    sourceNote: 'Community pattern; export and download are distinct actions in the local reference.'
  },
  {
    id: 'community-api-key',
    title: 'Generate an API key',
    group: 'Community',
    sourceStatus: 'Community maintained',
    sourcePath: `${COMMUNITY_SOURCE}/generate-an-api-key/index.md`,
    summary: 'Guidance for explaining what an API key is for, its security implications, and where it will be used.',
    whenToUse:
      'Use this flow when users need a credential for an integration and must understand its access and retrieval constraints.',
    userBenefit:
      'Clear scope and retrieval expectations help prevent excess access and reduce the chance of losing a credential.',
    designGuidance: [
      'Name the key and explain its scope before creation.',
      'Before creation, say where to retrieve the key and link there; if retrieval is unavailable, warn the user and offer a secure download.',
      'Explain how to recover access or rotate the key if the original value is lost.',
      'Offer restricted access options before broad access when the use case allows.'
    ],
    implementationGuidance: [
      'Collect a recognizable key name and explain its access and retrieval policy before generation.',
      'This example shows a fixed placeholder in a result dialog; it creates no credential and performs no clipboard or file operation.',
      'A real key flow must be implemented by the product security service.'
    ],
    components: ['Dialog', 'Field', 'Fieldset', 'Input', 'RadioGroup', 'RadioRoot', 'Button', 'Alert', 'Menu'],
    sourceNote: 'Community pattern; the local preview uses a fixed placeholder and does not create an API key.'
  },
  {
    id: 'community-import',
    title: 'Import',
    group: 'Community',
    sourceStatus: 'Community maintained',
    sourcePath: `${COMMUNITY_SOURCE}/import-pattern/index.md`,
    summary: 'Transferring data or objects from an external source into a system.',
    whenToUse:
      'Use import when users bring in a file or supported remote source; select modal, side panel, or full-page flow by complexity.',
    userBenefit: 'People can check a source and correct file problems before data is transferred.',
    designGuidance: [
      'Explain accepted formats, file count, and limits before file selection.',
      'Keep selected files visible and report validation errors at the field.',
      'Define duplicate handling for the product before import; the available example leaves conflict policy open.',
      'Make focus and keyboard behavior clear before and after selection.'
    ],
    implementationGuidance: [
      'Compose Field, Dropzone, and Attachment for a local file-selection example.',
      'Keep selected File objects in component memory; do not upload or send them.',
      'Show invalid selections with FieldError and successful sample state with a clear status.'
    ],
    components: ['Field', 'Dropzone', 'Attachment'],
    sourceNote: 'Community pattern; the example illustrates a supported file-selection flow.'
  },
  {
    id: 'community-order-summary',
    title: 'Order summary',
    group: 'Community',
    sourceStatus: 'Community catalog only',
    sourcePath: `${COMMUNITY_SOURCE}/index.md:44`,
    summary:
      'The catalog describes a summary of a platform, its status, or a specific service; it does not define detailed interaction behavior.',
    whenToUse:
      'Local interpretation: summarize a platform or service when people need a quick view of its scope, current status, and capacity before deciding whether to inspect more detail.',
    userBenefit:
      'Local interpretation: a clear summary helps people understand what is available and whether they need more detail before taking another action.',
    designGuidance: [
      'Local interpretation: group related service capabilities, operating status, and capacity so the summary is easy to scan.',
      'Show freshness or update time when status can change and the decision depends on current information.',
      'Keep the summary distinct from follow-up actions; the local example does not open a service workspace or change service state.'
    ],
    implementationGuidance: [
      'Use semantic term/value structure for labels and amounts, with Badge only for a meaningful status.',
      'The service-status summary is a local interpretation because detailed interaction guidance is not available here.',
      'Do not imply navigation, a service change, or an external request occurred.'
    ],
    components: ['Badge', 'Button'],
    sourceNote:
      'The available source is a brief catalog listing, not detailed interaction guidance. The local service summary does not open a workspace or change platform state.'
  },
  {
    id: 'community-remove',
    title: 'Remove',
    group: 'Community',
    sourceStatus: 'Community maintained',
    sourcePath: `${COMMUNITY_SOURCE}/remove-pattern/index.md`,
    summary: 'Moving information from one location to another; deletion is the destructive form of removal.',
    whenToUse:
      'Use removal to move or unlink an item and deletion to destroy it. Either change may be difficult or impossible to undo, so match confirmation to its impact.',
    userBenefit: 'People understand whether an item is unlinked or destroyed and know what recovery is possible.',
    designGuidance: [
      'Name whether the action removes or deletes and state what happens afterward.',
      'Confirm medium-impact removal when its effects cannot be reversed, and state clearly what will change.',
      'Use stronger confirmation for high-impact destructive actions; keep low-impact actions lightweight when recovery is available.'
    ],
    implementationGuidance: [
      'Use AlertDialog when a destructive decision must be acknowledged.',
      'Keep cancel available and show that the demo removes only its local sample.',
      'Use post-action feedback or undo for reversible removal.'
    ],
    components: ['AlertDialog', 'Button', 'Alert'],
    sourceNote: 'Community pattern; the local page distinguishes removal from destructive deletion.'
  }
]

export const CORE_PATTERN_COUNT = PATTERNS.filter((pattern) => pattern.group === 'Core').length
export const COMMUNITY_PATTERN_COUNT = PATTERNS.filter((pattern) => pattern.group === 'Community').length
