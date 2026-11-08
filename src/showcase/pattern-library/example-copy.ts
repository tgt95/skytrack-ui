import type { PatternId } from './catalog'

export type PatternExampleTeaching = {
  meaning: string
  decision: string
  consider: string
}

export const PATTERN_EXAMPLE_TEACHING: Record<PatternId, Record<string, PatternExampleTeaching>> = {
  'common-actions': {
    Add: {
      meaning:
        'Add attaches an existing plan to a collection; it does not create a new plan. The user needs to include work already available elsewhere.',
      decision:
        'Use Add when the object already exists and the destination relationship changes. Give it prominence based on its importance in this page context.',
      consider:
        'Confirm the user has permission to attach it, show the collection change, and explain whether this is single-item or bulk action.'
    },
    Cancel: {
      meaning: 'Cancel stops the current operation and leaves the user in the surrounding workflow.',
      decision:
        'Use it for an unfinished task the user can abandon; present it as a secondary button or link. Use Close to dismiss a surface and Clear to remove entered content.',
      consider:
        'State whether unsaved input is discarded or preserved, especially when work may take time to recreate; warn about data loss or corruption if abandoning the task creates that risk.'
    },
    Clear: {
      meaning: 'Clear removes current field or selection contents while keeping the field and workflow available.',
      decision:
        'Use a close icon at the right edge of a field, item, or value to clear it; use Reset to restore the last applied or saved values.',
      consider: 'Make the cleared state visible and preserve any unrelated form data.'
    },
    Close: {
      meaning:
        'Close dismisses a surface or ends a non-blocking presentation; it does not itself cancel the underlying task.',
      decision:
        'Use a close icon, usually at the upper-right of the surface, to dismiss a toast, panel, or other presentation. Do not label a button Close; use Cancel to stop an operation.',
      consider:
        'Keep the underlying work state clear after dismissal, and provide a way to find important updates again when needed.'
    },
    Copy: {
      meaning: 'Copy makes an identical object or value available for reuse; it leaves the original intact.',
      decision:
        'Use it when duplication is the intended result, distinct from editing the original or adding an existing object.',
      consider:
        'Confirm the copy with brief feedback such as a “Copied” tooltip; avoid implying it stays linked to later changes in the original.'
    },
    Delete: {
      meaning:
        'Delete destroys the selected object and is usually permanent or difficult to undo; Remove detaches it while leaving the object available.',
      decision:
        'Use it only when the user intends to destroy the object; scale confirmation to impact and reversibility.',
      consider:
        'Identify the target for high-impact deletion, explain consequences, and show success or restore the item after failure.'
    },
    Edit: {
      meaning: "Edit changes an existing object's information while keeping it the same object.",
      decision:
        'Use Edit when users need to change saved values; use Create for a new object and Copy for a separate duplicate.',
      consider: 'Show which values changed and make save, cancel, and validation outcomes understandable.'
    },
    Errors: {
      meaning: 'Error feedback explains that an action failed and gives the user a useful next step.',
      decision:
        'Use an error message when refresh or another action cannot complete; offer Retry only when repeating the action can help.',
      consider:
        "Preserve the user's current context and inputs, and do not report success until the operation succeeds."
    },
    Next: {
      meaning: 'Next advances to the next step in an ordered workflow; it does not imply final submission.',
      decision:
        'Use it when another step follows and the user can still review or return. Use a final action label when the workflow completes or commits work.',
      consider:
        "Keep the step's purpose and progress clear, and avoid losing entered information when the user goes back."
    },
    Refresh: {
      meaning: 'Refresh requests current data again without intentionally changing filters or the underlying object.',
      decision: 'Use it when the user needs an updated view and automatic updating is absent or insufficient.',
      consider:
        'Keep the selected filters and location, show loading and failure feedback, and avoid duplicate requests where possible.'
    },
    Remove: {
      meaning: 'Remove detaches an object from a collection while preserving the original object.',
      decision:
        'Use it when the relationship should end but the plan itself should remain available. Choose prominence by importance and consider permissions, permanence of the relationship change, and single versus bulk removal.',
      consider:
        'Explain what remains after removal and provide undo when practical; do not use Delete if the source object survives.'
    },
    Reset: {
      meaning:
        'Reset restores the last applied or saved values; this may differ from initial defaults or blank values.',
      decision: 'Use it when the user wants to return settings or selections to a known baseline.',
      consider: 'Tell users which values will change and whether reset applies immediately or needs confirmation.'
    }
  },
  dialogs: {
    'Modal \u00b7 confirm a route change': {
      meaning:
        'A modal asks the user to decide before returning to the blocked page. It fits a consequential route change only when confirmation is required to continue.',
      decision:
        'Use a modal for a required response or urgent information; keep the task short and user-initiated. Use a non-modal surface when the page must remain accessible.',
      consider:
        'The page behind the modal is unavailable; keep focus inside the task, label the result of each action, and make cancel safe.'
    },
    'Non-modal \u00b7 inspect a route while keeping the page available': {
      meaning: 'A non-modal dialog presents supporting information while users can still work with the page.',
      decision: 'Choose it when the user benefits from extra detail but does not have to respond before continuing.',
      consider:
        'Ensure the open panel does not obscure the route information needed for comparison, and make its dismissal clear.'
    },
    'Button groups \u00b7 one, two, or three decisions': {
      meaning:
        'Dialog actions should make the available choice and its consequence clear. More choices add comparison work.',
      decision:
        'Use one action for acknowledgement, two for a clear proceed-or-cancel choice, and three only when a third distinct decision is necessary.',
      consider:
        'Put Cancel at the far left and the single primary action at the far right; keep all other actions secondary and labels outcome-specific.'
    },
    'Show progress after confirming a longer task': {
      meaning: 'A progress indicator communicates that a confirmed dialog task is still underway.',
      decision:
        'Use it when completion takes long enough that users need feedback; keep the task focused and show completion when work ends.',
      consider:
        'Do not leave users unsure whether the dialog can close or whether the action finished; provide failure recovery too.'
    }
  },
  'disabled-states': {
    'Default disabled \u00b7 missing prerequisite': {
      meaning: 'A disabled control shows an action exists but cannot run until a prerequisite is met.',
      decision:
        "Keep it visible when the user can satisfy the prerequisite; use read-only for inspectable values and hide actions outside the user's permission.",
      consider:
        'Explain the missing prerequisite in nearby text because some assistive technology may not announce a default-disabled reason.'
    },
    'Disabled with a warning \u00b7 unsaved prerequisite': {
      meaning: 'A warning adds context when an unmet condition needs more than a simple disabled state.',
      decision: 'Use it when users can resolve a known blocker, such as saving changes before export.',
      consider: 'State the exact action needed and keep the warning available without relying on color alone.'
    },
    'Read-only \u00b7 value is available for review': {
      meaning: 'Read-only content remains available to inspect but cannot be changed in this context.',
      decision:
        'Choose it when users need the value for review; choose disabled only when an otherwise interactive control is temporarily blocked.',
      consider: 'Keep the value legible and available to assistive technology; state why editing is unavailable.'
    },
    'Hidden \u00b7 action is outside this role\u2019s permissions': {
      meaning: "A hidden action is unavailable because the user's role should not see it.",
      decision:
        'Hide it when permission policy excludes access; keep a disabled action visible only when the user can understand and resolve its prerequisite.',
      consider:
        'Do not hide actions merely because a temporary condition blocks them; users may need to know what they can do next.'
    }
  },
  disclosures: {
    'Profile menu \u00b7 account actions': {
      meaning: 'A profile menu reveals account- or session-related options on request.',
      decision:
        "Use it for secondary items tied to the user's identity; keep primary task actions in their task context.",
      consider:
        'Keep the menu concise, keyboard reachable, and clear about whether actions navigate or change a setting.'
    },
    'Settings and filter menu \u00b7 change a view': {
      meaning: 'A settings menu reveals compact controls for changing a view without keeping every option on screen.',
      decision:
        'Use it when options are related and secondary; apply changes together when users need to inspect several choices before results update.',
      consider:
        'Do not overcrowd the menu; distinguish pending choices from applied settings and show the resulting view change.'
    },
    'Combo button \u00b7 primary action plus alternatives': {
      meaning: 'A combo button keeps one common action prominent and groups related alternatives.',
      decision:
        'Use it when one action is the clear default and alternatives are less frequent; otherwise show actions separately.',
      consider: 'Make the default action obvious and ensure alternatives are discoverable by keyboard.'
    },
    'Inline disclosure \u00b7 supporting details': {
      meaning: 'An inline disclosure reveals related secondary content in the current page when requested.',
      decision: 'Use it for supporting details that users may need, not for information required to complete the task.',
      consider:
        'Keep the revealed content focused, avoid nested disclosures, and expose the expanded state to assistive technology.'
    }
  },
  'empty-states': {
    'No data \u00b7 create the first plan': {
      meaning: 'This state explains that no plans exist yet and helps the user create the first one.',
      decision:
        'Use it before a collection has data; explain what belongs here and offer a next step that can resolve the empty state.',
      consider: 'Do not use first-use guidance for a failed load or a search with no matches.'
    },
    'No results \u00b7 recover a search': {
      meaning: 'This state means the collection exists but the current query found no matching plan.',
      decision:
        'Keep the query visible, show a count and matching records as it changes, and make it possible to revise or clear the search.',
      consider:
        'Do not offer Create as if no plans exist; show a concise match list when results return and keep recovery beside the no-match message.'
    },
    'Error \u00b7 recover an unavailable collection': {
      meaning:
        'An error empty state explains that the collection could not load, so its absence is not evidence that no plans exist.',
      decision: 'Use it for a failed request or unavailable data and offer retry only if it can recover the problem.',
      consider: 'Preserve relevant filters and explain failure without claiming the collection is empty.'
    },
    'Inline documentation \u00b7 explain the next step': {
      meaning: 'Inline documentation teaches a task beside the place where the user performs it.',
      decision: 'Use it when a brief explanation can help without interrupting work or replacing task content.',
      consider:
        'Keep instruction proportional to the space; show the local result beside the guide so it is clear what the suggested action did.'
    },
    'Onboarding \u00b7 guide a first task': {
      meaning: 'Onboarding helps a new user understand how to begin a task or product workflow.',
      decision:
        'Use it for a first-use learning need that requires guidance; use a concise empty state when the next step is already clear.',
      consider:
        "Keep guidance tied to the user's immediate goal; provide progress, a way to dismiss it, and a simple way to reopen it later."
    },
    'Starter content \u00b7 orient the user with an example': {
      meaning: 'Starter content gives users a sample plan or workflow to inspect before creating their own.',
      decision:
        'Use it when seeing a realistic example helps explain a collection or workflow better than instructions alone.',
      consider:
        'Mark samples clearly, let users clear them to see the underlying empty state, and avoid presenting sample records as live operational data.'
    }
  },
  filtering: {
    'Choose one status \u00b7 instant results': {
      meaning:
        'A single-selection filter narrows a known collection by one structured attribute and updates results immediately.',
      decision: 'Use it for a simple choice with quick feedback; keep the selected status and matching count visible.',
      consider: 'Let users clear or reset the filter and recover when the choice returns no results.'
    },
    'Combine categories \u00b7 apply or update instantly': {
      meaning:
        'Multiple filters combine attributes to narrow a known collection; update timing depends on complexity and response speed.',
      decision:
        'Use instant updates for simple, fast choices; use batch Apply when several choices need review or results are slow.',
      consider:
        'In batch mode distinguish pending from applied selections; show active filters and an easy clear/reset path even when controls close.'
    }
  },
  'fluid-styles': {
    'Match action width to the task': {
      meaning: 'Fluid width lets an action align with the available width of its container.',
      decision:
        'Use it when a spacious layout or a clear learning moment benefits from a full-width action; use default width in dense work.',
      consider: 'Do not stretch every action by default; preserve hierarchy and legibility as the container narrows.'
    },
    'Align related actions in a compact panel': {
      meaning: 'Fluid controls can align related actions to the edges of a compound container.',
      decision:
        "Use them when the container's structure benefits from edge alignment; choose default spacing when actions need separation.",
      consider: 'Make the relationship between actions clear and retain adequate spacing for touch and visual scanning.'
    },
    'Let a fluid form follow its available width': {
      meaning: 'A fluid form can adapt its width to its container instead of imposing a fixed form width.',
      decision:
        'Use it when the form should fill a spacious area; use a fixed or default layout when the task needs more breathing room.',
      consider:
        'Check label alignment and field readability at narrow widths; wide fields can make dense forms harder to scan.'
    },
    'Attach a simple form to its container edges': {
      meaning: 'Edge-aligned fluid forms connect a simple form visually to its surrounding container.',
      decision:
        'Use this for a short, straightforward form; avoid it when complex fields need whitespace and grouping.',
      consider:
        'Do not treat fluid styling as a universal full-width rule; preserve spacing between inputs and sections.'
    },
    'Choose a fluid container or fixed side panel': {
      meaning:
        'Fluid and fixed containers make different tradeoffs between using available space and preserving a stable reading width.',
      decision:
        'Choose fluid when content benefits from the available width; choose a fixed panel when task content needs a bounded, predictable measure.',
      consider:
        'Recheck the content at responsive widths and avoid forcing dense or long-form content across excessive width.'
    }
  },
  forms: {
    'Collect mission contact details': {
      meaning:
        'A form gathers the information needed to complete a task, with labels and required/optional status that users can understand.',
      decision:
        'Ask only for information needed for the mission request; choose one required-versus-optional convention that fits the form.',
      consider: 'Do not use placeholder text as the only label, and avoid collecting sensitive or unnecessary details.'
    },
    'Validate and recover from missing information': {
      meaning:
        'Inline validation points out a field that needs correction; server feedback explains why a request was rejected after submission.',
      decision:
        'Validate locally on blur or submit and show the message beside its field. If the service rejects a request, keep the entered value and explain the next step in an inline alert.',
      consider:
        'Clear a field error as soon as the value is corrected; keep server rejection distinct from client-side validation and provide a useful recovery action.'
    },
    'Break a long mission request into steps': {
      meaning: 'A multi-step form divides a longer task into manageable stages.',
      decision:
        'Use it when the request has clear stages or needs progressive disclosure; keep a short form on one page.',
      consider: 'Show progress and allow users to review or return without losing answers.'
    },
    'Select optional checks for a mission request': {
      meaning: 'Checkboxes let users select independent optional checks that can apply together.',
      decision:
        'Use them when choices are not mutually exclusive; use radio choices when exactly one option must be selected.',
      consider: "Make each option's effect clear and do not imply that an unchecked optional item is required."
    }
  },
  'global-header': {
    'Global header with local mission navigation': {
      meaning:
        'A global header gives persistent access to workspace-wide destinations while local navigation supports the current mission.',
      decision:
        'Use both levels when users need system-wide destinations and task-specific navigation; keep them visually and semantically distinct.',
      consider: 'Show current location and preserve access to navigation at narrow widths.'
    },
    'Organize destinations around workspace or current mission': {
      meaning:
        "Navigation can be organized around the user's workspace or the active mission, depending on which scope guides the task.",
      decision:
        'Use global organization for cross-workspace destinations and local organization for mission-specific work; add a side panel when hierarchy needs another level.',
      consider:
        'Keep ordering predictable, indicate the active location, and provide breadcrumbs when users drill down.'
    }
  },
  loading: {
    'Show measured task progress': {
      meaning: 'A progress indicator reports how much of a task is complete when the system can measure it.',
      decision:
        'Use measured progress for bounded work with meaningful progress data; use activity feedback when duration or completion is unknown.',
      consider: 'Never invent a percentage; report completion or failure when the task ends.'
    },
    'Keep an inline check responsive': {
      meaning:
        'Inline activity feedback shows that a specific check is running while the rest of the page remains available.',
      decision:
        'Use scoped feedback when only one region is busy and users can continue elsewhere; use page-level blocking only when the whole task is unavailable.',
      consider: 'Keep the status perceivable to assistive technology and communicate if the check fails or stalls.'
    },
    'Block the page while a save completes': {
      meaning: 'A page-level busy state signals that a save temporarily prevents work across the page.',
      decision:
        'Use it only when the operation blocks the whole page; prefer local feedback when unrelated work can continue.',
      consider:
        'Make the completion or failure state clear and avoid leaving users unsure whether their save took effect.'
    },
    'Load a collection in batches': {
      meaning:
        'Progressive loading makes part of a collection useful before all items arrive; a load-more action requests another portion.',
      decision:
        'Use it when showing results incrementally helps users start sooner; use pagination or another pattern if users need stable position or total scope.',
      consider: "Preserve the user's place and indicate when more results are loading or no more remain."
    },
    'Reserve the shape of a list while its first data loads': {
      meaning: 'A skeleton previews the shape of content that is expected to appear.',
      decision:
        'Use it when the content structure is known and loading is brief; use an activity indicator when shape or duration is unknown.',
      consider: 'Do not skeletonize action controls or suggest data is already available.'
    }
  },
  login: {
    'Choose a sign-in layout': {
      meaning:
        'Centered and split layouts present the same sign-in task with different room for context or supporting content.',
      decision:
        'Use a centered layout for a focused sign-in; choose a split layout when useful product or organization context needs space beside it.',
      consider: 'Keep sign-in primary and ensure the layout remains usable at smaller widths.'
    },
    'Authenticate progressively and recover from an error': {
      meaning:
        'Progressive authentication asks for identity first, then presents the appropriate sign-in method and recovery.',
      decision:
        'Use it when the system can determine whether to route users to SSO, password, or another method; show alternatives early if it cannot.',
      consider:
        'Do not reveal whether an account exists before authentication; keep MFA examples illustrative because maintained guidance is incomplete.'
    }
  },
  notifications: {
    'Keep important status in context': {
      meaning: 'An inline notification reports task status beside the work it affects.',
      decision:
        'Use contextual feedback when the user needs the message while acting on that task; choose status meaning separately from presentation type.',
      consider: 'Use text and a clear severity label; do not rely on color alone or interrupt work for routine updates.'
    },
    'Confirm a completed action briefly': {
      meaning: 'A toast gives brief feedback after an action completes without taking over the page.',
      decision:
        'Use it for a low-risk confirmation users do not need to act on; keep important or persistent information in a more durable location.',
      consider: 'Do not use transient feedback for a required decision or critical error that users may miss.'
    },
    'Keep field guidance visible on page load': {
      meaning:
        'A callout gives persistent, non-actionable guidance beside the form field it explains as soon as the page loads.',
      decision:
        'Use an informational or warning callout directly above its related field; use another notification type when the user must act or dismiss it.',
      consider:
        'Keep the message brief, with no dismiss control or action button, and do not use success or error status.'
    },
    'Review accumulated notifications in a panel': {
      meaning: 'A notification panel collects updates for later review rather than interrupting each task.',
      decision:
        'Use it for system-generated or accumulated updates users may need to revisit; use inline messages for task-specific feedback.',
      consider: 'Make unread state and available actions understandable, and keep severity distinguishable in the list.'
    },
    'Offer a next step or acknowledge a critical notice': {
      meaning: 'Actionable or modal notifications ask for a next step when the issue requires user attention.',
      decision:
        'Use the least disruptive presentation that still supports the required action; reserve modal interruption for urgent or blocking cases.',
      consider:
        'Distinguish optional from required action, explain the consequence, and avoid repeated interruptions for the same issue.'
    }
  },
  'overflow-content': {
    'Expand a long route note': {
      meaning:
        'Show more reveals the complete text when a long description is useful but need not occupy space by default.',
      decision:
        'Use it for secondary prose that users may choose to read; keep headings, labels, errors, and other critical text fully visible.',
      consider: 'Make the expanded state and way back to the compact view clear.'
    },
    'Fit identifiers and links in compact layouts': {
      meaning:
        'Truncation can keep long identifiers or URLs from overwhelming a compact row while preserving their full value.',
      decision:
        'Use middle truncation when both ends help identify the value; use a clear affordance to inspect or copy the full text.',
      consider:
        'Ellipsis alone must not hide how to reveal the value; do not rely on a tiny tooltip as the only access path.'
    },
    'Collapse long breadcrumb paths': {
      meaning: "A compact breadcrumb can shorten a deep path while retaining the user's sense of location.",
      decision: 'Use it when path length competes with page content; keep enough visible context to orient users.',
      consider: 'Ensure hidden levels remain discoverable and the current page is identifiable.'
    }
  },
  'read-only-states': {
    'Review mission settings without changing them': {
      meaning:
        'Read-only state lets users inspect settings that are normally editable while preventing changes in this context.',
      decision:
        'Use it for review, process locks, or view-only access; use static text for information that is never interactive.',
      consider:
        'Keep values legible and explain why editing is unavailable; do not make read-only fields look disabled.'
    },
    'Review selected options and bound values': {
      meaning: 'Read-only selections and values show the current configuration without allowing a change.',
      decision:
        'Use this when the user must verify a saved choice; allow copy or selection where the task needs reuse.',
      consider:
        "Preserve the control's value and structure for review, and make the non-editable state accessible by keyboard."
    },
    'Keep an empty selection informative': {
      meaning:
        'An empty read-only value communicates that no option was selected while making clear that editing is unavailable here.',
      decision:
        'Use it when the absence itself matters during review; offer an editable route elsewhere if users need to change it.',
      consider: 'Do not make the blank value resemble a broken or editable field; identify the state in text.'
    }
  },
  search: {
    'Find missions and narrow the result set': {
      meaning: 'Search finds items by an open-ended query; structured filters narrow a known collection by attributes.',
      decision:
        'Use basic search when submission leads to a results page, active search for a small local set, and focused search for a task-specific scope. A scope filter selects one category at a time and should start at All or Any.',
      consider: 'Keep the query editable and provide a clear way to broaden scope or revise the search.'
    },
    'Review result count and recover from no matches': {
      meaning:
        'A result count tells users how broad the match is; a no-results state helps them revise the query or scope.',
      decision: 'Always show the result count, including zero and a count for every available scope.',
      consider: 'Preserve the query and offer ways to broaden or revise it; avoid a dead end.'
    },
    'Preview matches before opening the full result set': {
      meaning: 'Type-ahead suggestions preview likely matches while the user is entering a query.',
      decision:
        'Use suggestions when a useful match can be recognized quickly; retain a clear route to the complete results page.',
      consider: 'Make suggestion selection predictable and keep keyboard navigation and result labels accessible.'
    },
    'Signal a slow search and support right-to-left entry': {
      meaning:
        "Loading feedback shows a search is still running, while text entry must respect the user's writing direction.",
      decision:
        'Use a loading indicator when response is slow; adapt the field for right-to-left languages as part of localization.',
      consider:
        'Keep the query visible and editable while loading, and verify cursor, clear action, and results work in right-to-left layouts.'
    }
  },
  'status-indicators': {
    'Show connection and attention states': {
      meaning: 'An icon indicator pairs a status symbol with text to draw attention to a meaningful state.',
      decision:
        'Use it when a state needs contextual explanation; use a compact shape and label when users must scan many rows.',
      consider: 'Define severity consistently and never make color the only signal.'
    },
    'Scan operational readiness in a compact list': {
      meaning: 'Shape indicators with labels support quick comparison across dense operational rows.',
      decision:
        'Use them when users scan many items and the status vocabulary is stable; use an icon with explanation when attention or context matters more.',
      consider:
        'Keep labels and severity meanings consistent, and do not add indicators for states that carry no useful action or information.'
    },
    'Summarize unread work in navigation': {
      meaning: 'A badge can communicate a count or unread state beside a navigation destination.',
      decision:
        'Use it when a count helps users decide where to look; omit a zero or non-actionable badge when it adds no information.',
      consider: 'Explain what is counted and do not let the badge replace a meaningful status label.'
    },
    'Compare operational trends over time': {
      meaning: 'A differential indicator shows direction or change relative to a comparison period.',
      decision:
        'Use it when a change over time helps interpretation; name the comparison period and explain the measure.',
      consider: 'Do not let color alone imply good or bad; direction may have different meaning across metrics.'
    }
  },
  'text-toolbars': {
    'Format a mission brief and manage its draft': {
      meaning: 'A text toolbar keeps relevant editing actions close to the text they affect.',
      decision:
        'Use it for directly editable text with a focused set of formatting and attachment actions; collapse lower-priority controls as space narrows.',
      consider:
        'Keep icon-only actions labeled, make keyboard movement predictable, and clarify whether changes are saved or still drafts.'
    },
    'Find and edit wording in context': {
      meaning: 'Search within an editor locates matching text without leaving the editing task.',
      decision:
        'Use it when users need to find wording in the current text; keep search distinct from searching the wider mission collection.',
      consider:
        'Show match count and movement through matches; local source says keyword-search guidance is still being refined, so treat this behavior as a local interpretation.'
    }
  },
  'community-chatbots': {
    'Ask for help with mission planning': {
      meaning:
        'A person uses a question to find mission information without knowing where it lives. The helper should make its scope clear and point to the relevant record.',
      decision:
        'Use conversation for open-ended questions where natural language helps; use direct controls for predictable actions. Identify the helper as a bot and state its limits.',
      consider:
        'Restate the person’s intent before consequential actions. Route lengthy, complex, sensitive, or emotional requests to a person or a more suitable flow; this helper does not provide flight or weather advice.'
    },
    'Continue through standard navigation': {
      meaning:
        'A conversational helper can route someone back to the ordinary workspace when a direct task is clearer there.',
      decision:
        'Keep normal navigation available alongside conversation, especially for known destinations such as mission records.',
      consider:
        'The route should remain clear if the helper cannot answer; do not make conversation a required path to a predictable task.'
    },
    'Recover when a message cannot be sent': {
      meaning: 'A failed message needs an explanation and a next step so the person knows it was not delivered.',
      decision: 'Show the failure where the conversation is happening and offer a retry when recovery is possible.',
      consider:
        'Make the failed state distinguishable from a sent message; error-state advice in the reference is marked preview.'
    },
    'Hand off a complex request to a person': {
      meaning:
        'When a scripted helper cannot resolve a request, a person may need a way to continue with human support.',
      decision: 'Use a handoff when the task exceeds the helper’s scope and a support route exists.',
      consider:
        'State what context is shared and whether a person is actually available; the local example does not connect to support.'
    }
  },
  'community-in-app-learning': {
    'Welcome a first-time user': {
      meaning: 'A brief welcome orients someone who is new and gives them a first step.',
      decision:
        'Use a welcome when a new capability or workspace needs orientation; keep a way to dismiss and revisit it.',
      consider:
        'Avoid blocking the user’s task, and do not promise that dismissal or learning progress persists unless the product supports it.'
    },
    'Help users get started with a short checklist': {
      meaning: 'A short checklist breaks an unfamiliar task into first steps and makes progress visible.',
      decision: 'Use it when a person needs a sequence to get started; keep each step tied to the task at hand.',
      consider:
        'If completion is tracked, decide how users can resume and avoid repeating completed guidance; progress policy is not in the source.'
    },
    'Show in-context guidance beside a task': {
      meaning: 'A nearby tip explains a feature at the moment someone encounters it.',
      decision:
        'Choose contextual guidance when the question arises during a specific task, rather than sending the user away for general help.',
      consider:
        'Keep the tip relevant to the current task and ensure it does not obscure controls; these are local recommendations.'
    },
    'Keep global help available across the workspace': {
      meaning: 'Workspace-wide help gives people a place to return to when a question is not tied to one screen.',
      decision: 'Use a global help route for reference that should remain available across tasks.',
      consider:
        'Make it discoverable without interrupting the task; the catalog does not describe navigation or access behavior.'
    },
    'Explain what changed in a product update': {
      meaning: 'An update explains a change that may affect how people use the product.',
      decision:
        'Show update guidance when a change matters to the user; let them dismiss it and find it again if needed.',
      consider:
        'Explain the actual change and avoid repeatedly interrupting someone; recurrence rules are not specified by the source.'
    }
  },
  'community-create-flows': {
    'Create a quick mission inline': {
      meaning: 'A person starts a new mission in place while keeping the collection visible.',
      decision: 'Inline creation fits a quick, simple task when seeing the surrounding page helps.',
      consider:
        'Keep required information and exit behavior clear; the sample scenario says one field while its form shows mission name and purpose.'
    },
    'Create a mission in a focused dialog': {
      meaning: 'A person creates a new mission in a short, focused flow.',
      decision: 'A dialog fits a simple task with one or two fields or a transition that needs focused attention.',
      consider: 'The dialog obscures the page, so avoid it for longer or scrolling forms and keep Cancel clear.'
    },
    'Create a complex mission in a side panel': {
      meaning: 'A person configures a new mission while keeping the surrounding workspace in view.',
      decision:
        'A side panel fits a task that needs more room than a compact dialog but still benefits from page context.',
      consider: 'Make cancel behavior clear if the partly configured mission will be lost.'
    },
    'Give a multi-step creation task a full-page canvas': {
      meaning: 'A new resource needs enough space for multiple steps and review.',
      decision:
        'Choose a full page when the flow is lengthy or needs focused space; preserve context when that remains useful. In a multi-step flow, keep Back unavailable on step one and Next/Create unavailable until required fields are complete.',
      consider:
        'Confirm navigation away while the new resource is incomplete, and explain what happens to unsaved work. Keep Cancel as the explicit exit.'
    },
    'Use a narrow tearsheet for a compact create task': {
      meaning: 'A compact task can use a focused surface without taking over the full page.',
      decision: 'Choose the narrower format when the task is bounded and needs little supporting context.',
      consider:
        'Check that the content still fits at smaller viewports and that dismissing the flow handles unsaved input clearly.'
    },
    'Use a wide tearsheet when the task needs more room': {
      meaning: 'A new resource with more fields or supporting details benefits from a wider focused workspace.',
      decision: 'Choose the wider surface when the content needs more room but does not require a full-page flow.',
      consider: 'Keep the primary action and exit path visible as content grows.'
    },
    'Show completion and a brief loading state': {
      meaning: 'The person needs feedback while a new resource is being prepared and after the flow finishes.',
      decision: 'Show loading only while work is underway, then make completion clear.',
      consider:
        'Do not imply creation succeeded until the action completes; keep Next/Create disabled until required information is complete. This demo is only a local illustration.'
    }
  },
  'community-edit': {
    'Make a low-impact inline change': {
      meaning: 'A person changes a short value on an existing resource where the change has no wider impact.',
      decision: 'Inline editing fits a small, low-impact update that benefits from staying in context.',
      consider:
        'Keep feedback clear so the person can tell the value changed; the source advises against warnings when the edit has no wider impact.'
    },
    'Review a higher-impact edit before saving': {
      meaning: 'A person checks a consequential change to an existing mission before committing it.',
      decision:
        'Use a warning and separate confirmation for a high-impact change; a summary helps the person understand what will change.',
      consider:
        'Warn that this high-impact change cannot be undone, explain its system consequences, and let the person review it before a separate confirmation.'
    },
    'Keep a broader edit in a side panel': {
      meaning: 'A person changes an existing resource while keeping the surrounding page available for context.',
      decision:
        'Use a side panel when several fields need attention and the original page still helps the user make the change.',
      consider: 'Separate editable fields from read-only information and make cancel distinct from save.'
    },
    'Use a full-page canvas for a complex revision': {
      meaning:
        'A substantial change to an existing resource needs room to review the current value and proposed changes.',
      decision:
        'Use a full page when the revision needs broader context or a dedicated review space; increase safeguards with impact.',
      consider:
        'Let the person inspect what will change before saving, especially when the change has wider consequences.'
    }
  },
  'community-export': {
    'Download a standard report with its intuitive name': {
      meaning: 'A person gets an unchanged report in its existing format.',
      decision:
        'Use Download when a remote file moves to the person’s device unchanged; use Export when they need a copy in a different format. Choosing a destination alone does not change which action fits.',
      consider: 'Label the action accurately and do not say the file was downloaded unless the transfer occurred.'
    },
    'Customize a report before export': {
      meaning: 'A person chooses a name, format, or destination for an external copy.',
      decision: 'Offer choices when they matter to the task and provide sensible defaults for routine cases.',
      consider:
        'In a dialog, focus the first required field when input is needed; if sensible defaults are ready, focus Export first. Validate the name and show format and destination before reporting completion.'
    },
    'Track preparation and recover from an export failure': {
      meaning: 'The person needs to know whether preparation is underway and what to do if it fails.',
      decision:
        'Show progress while preparing; after a failure, explain the problem and offer retry or another destination when possible.',
      consider: 'Keep failure distinct from completion so a user does not rely on a file that is not ready.'
    },
    'Confirm export completion without implying a download': {
      meaning: 'A completion message confirms preparation of an export without claiming a file transfer.',
      decision: 'Use a brief, passive success message once the export is actually ready.',
      consider: 'Say whether a file was saved or downloaded; this sample only previews completion.'
    }
  },
  'community-api-key': {
    'Create and manage an API key safely': {
      meaning:
        'A person creates an integration credential after understanding what it can access and how its value can be retrieved.',
      decision:
        'Name the key, explain its purpose, and offer narrower access when it fits the integration; explain retrieval before generation.',
      consider:
        'Before creation, explain where the key can be retrieved and link to that location. If it cannot be retrieved again, warn first and provide a secure download; explain safe storage and recovery.'
    },
    'Manage or edit an existing key without changing its secret': {
      meaning: 'A person changes a key’s label or access settings while keeping secret-value handling separate.',
      decision:
        'Use key-management controls for metadata or permissions; changing the secret itself is a separate action.',
      consider:
        'Confirm the affected access and avoid exposing a real secret while editing; explain what happens if access must be rotated.'
    }
  },
  'community-import': {
    'Choose multiple mission files or a source URL': {
      meaning: 'A person selects one or more supported files, or a supported remote source, before transfer.',
      decision:
        'Use a larger selection flow when several files or added metadata make a compact dialog insufficient; offer URL input only if supported.',
      consider:
        'Show accepted types, selected items, and validation errors; do not imply selection uploaded or imported anything.'
    },
    'Import one file or URL in a focused modal': {
      meaning: 'A person selects a single supported source in a compact flow before continuing.',
      decision:
        'A modal fits a simple import with few extra steps; move to a larger surface when metadata or multiple files add complexity.',
      consider: 'Keep the selected file and validation result visible, and state that transfer has not happened yet.'
    },
    'Add metadata in a side panel after file selection': {
      meaning: 'A person adds destination or other details after choosing a file.',
      decision:
        'Use a side panel when import needs extra information while the original workspace remains useful context.',
      consider:
        'Resolve duplicate and conflict behavior before shipping; the reference and this demo leave that policy open.'
    }
  },
  'community-order-summary': {
    'Review a platform service summary': {
      meaning:
        'Local interpretation: a person checks the capabilities and current state of a platform or service before deciding whether more detail is needed.',
      decision:
        'Local interpretation: summarize service scope and status when that context helps someone choose a next step.',
      consider:
        'The local catalog entry does not define required fields or actions. The preview reports a local sample outcome; it does not open or change the service.'
    }
  },
  'community-remove': {
    'High-impact deletion \u00b7 require the resource name': {
      meaning: 'A person permanently deletes a consequential resource and confirms exactly which one will be lost.',
      decision: 'Require stronger confirmation when deletion is irreversible and its impact is high.',
      consider:
        'Explain that the action cannot be undone and make the resource identity unmistakable before enabling it.'
    },
    'Medium-impact deletion \u00b7 confirm the consequence': {
      meaning: 'A person permanently deletes a smaller saved item after reviewing what will and will not be affected.',
      decision: 'Confirm when the loss is irreversible, but describe the consequence in proportion to its impact.',
      consider:
        'State what remains unchanged so the person does not mistake deleting a saved filter for deleting mission records.'
    },
    'Low-impact deletion \u00b7 undo a draft deletion': {
      meaning: 'A low-risk draft is deleted from the list, with immediate recovery available for an accidental action.',
      decision:
        'When a deleted item is easy to recreate or immediately restore, skip confirmation and place Undo beside the result.',
      consider:
        'Keep Undo available long enough to recover, and distinguish deleting the draft from unlinking an existing item.'
    },
    'Medium-impact removal \u00b7 preserve the original data': {
      meaning: 'A person removes a shared item from a collection while the owner’s original remains.',
      decision:
        'Use removal for unlinking or moving an item; confirm when the access or collection change is consequential.',
      consider:
        'Say what will leave the collection and what remains. Removal may be irreversible; when it cannot be undone, explain that consequence and confirm before proceeding.'
    },
    'Low-impact removal \u00b7 unlink and undo': {
      meaning: 'A person unlinks a saved item from the current view and can undo the change.',
      decision: 'For a reversible, low-impact unlink, avoid an interruptive confirmation and keep recovery nearby.',
      consider: 'Make clear that removing the link does not destroy the source item.'
    }
  }
}
