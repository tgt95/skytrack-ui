# Chatbots

> Community guidance for designing conversational interfaces that let users work with natural language.

- Pattern ID: `community-chatbots`
- Catalog group: Community
- Source status: **Community maintained**
- Primary source: [maintained reference](../../../../../docs/carbon-ds-reference/community/patterns/chatbot/overview.md)
- Catalog entry: [catalog.ts](../../../../../src/showcase/pattern-library/catalog.ts)
- Page copy, source citations, and demo map: [page-content.ts](../../../../../src/showcase/pattern-library/page-content.ts)
- Local interaction implementation: [demos.tsx](../../../../../src/showcase/pattern-library/demos.tsx)

## Decision summary

**Use when:** Use a chatbot when conversation offers a useful route through a task; keep direct controls available for predictable actions.

**User outcome:** Conversation helps with open-ended questions while direct navigation remains available for predictable tasks.

### Design decisions

- Identify the assistant as a bot, explain its limits, and make it easy to correct or restart the conversation.
- Use conversation only when natural language helps; keep predictable actions available through direct controls.
- Restate intent before consequential actions; route complex, lengthy, sensitive, or emotional needs to a person or a more suitable flow.
- Keep answers tied to the current task and avoid implying certainty the system does not have.
- Provide a visible way to reach conventional navigation or help.

### SkyTrack UI implementation route

- Compose a scripted local chat illustration with Input and Button.
- Label example responses as local; do not connect to a networked model or service.
- Keep the conversation readable and expose newly added messages.

**Candidate components:** `Input`, `Button`, `Command`. Verify each API against [component routing](../COMPONENT_ROUTING.md) and installed source.

> **Local example limit:** Community guidance is maintained separately from the core pattern topics.

## Source limits

- Community-sourced guidance maintained outside the core pattern set; several flows (multiple threads, expanding cards, error recovery) and supporting primitives remain in Preview or upcoming states.
- Traditional UI controls and direct navigation must stay accessible for predictable tasks rather than routing everything through conversation.

## Source notes

- overview.md Quick Navigation lists User needs before Why a chatbot?, whereas the document body renders ## Common use cases -> ## Why a chatbot? -> ## User needs -> ## Supported components; this handoff preserves actual body order.
- overview.md duplicates #### Maintainers: consecutively (lines 10 and 15).
- usage.md #### Provide a response and request feedback duplicates its closing sentence twice (lines 119–122).

## Guidance reference

### Overview

Use conversational assistance when people benefit from asking for help or looking up task-relevant answers in plain language and receiving dependable responses tailored to their goal.

#### Common use cases

Conversational interfaces fit four recurring product needs best:

- In-context help and onboarding: answer frequently asked questions at scale or help first-time operators get oriented.
- Case intake and triage: collect structured details upfront to prioritize requests and reduce manual support load.
- Routine transactions and procedures: guide people step by step through bounded operational tasks.
- Natural-language lookup: help users retrieve specific records, statuses, or policy details without hunting through nested filters.

#### Why a chatbot?

Before investing in a bot, confirm that conversation outperforms simpler product alternatives by answering five readiness questions:

- What specific outcomes are users trying to achieve?
- How deep or open-ended is the assistance they need?
- Would direct human support serve this domain better and more safely?
- Why is a conversational flow superior to contextual tooltips, documentation, or a structured wizard?
- Which verified data sources and capabilities can the bot actually act upon?

#### User needs

##### What users expect from a bot

- Round-the-clock availability whenever questions arise.
- Relevant, on-demand answers tied directly to their current question.
- Consistent, high-quality product or operational guidance they can rely on.

##### What users need inside a conversation

- Structured choices to supply missing context quickly without typing everything freehand.
- Reflective summaries and confirming questions that show what the bot understood before acting.
- Clear visual distinction identifying the latest active message so progress stays unambiguous.

##### When not to use a chatbot

> **dont:** Do not force tasks into chat when traditional UI controls finish faster, when the workflow spans lengthy or highly intricate steps, or when sensitive or emotional situations belong with a person.

**Examples:** `chatbots-standard-navigation`.

#### Building block maturity

Treat conversational surface maturity carefully when scoping a product integration:

| Maturity stage              | Covered conversational elements                                                                                 |
| --------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Established design patterns | Chat window, header, system messages, user messages, structured responses, cards, text composer, launch trigger |
| Preview conventions         | Welcome screen, expandable cards, human-agent messages                                                          |
| Upcoming / unfinalized      | List blocks, launch chip prompts, multi-thread switcher menu                                                    |

### Usage

Define clear structural roles inside the chat panel and follow an iterative clarification loop whenever a user request needs narrower scope before answering.

#### Anatomy

Combine seven consistent building blocks inside the conversational workspace:

| Element             | Role and rules                                                                                                            | Variants                                                                           |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Header              | Displays the assistant title and up to four utility actions; typically always includes an explicit close control.         | Default, With avatar, Large                                                        |
| System message      | Presents bot replies; fade older messages while marking the currently active system reply with a clear visual indicator.  | Default                                                                            |
| User message        | Shows what the operator submitted via typed text, selected structured choice, or voice.                                   | Default                                                                            |
| Structured response | Offers bot-parseable choice pills; selecting an option changes its visual state and appends a matching user message turn. | Default                                                                            |
| Composer input      | Combines a text field, an optional secondary input trigger (such as voice), and a submit button.                          | Default, Without secondary action button                                           |
| Launch button       | Serves as the entry trigger that opens the conversation experience.                                                       | Primary, Alternate                                                                 |
| Chatbot cards       | Present rich informational summaries or next-step actions with text, media, or data.                                      | Text (Hero, Large, Mini), Image (Avatar, Large, Mini), Data (Table, Visualization) |

#### Requesting information

Follow a predictable turn-by-turn exchange from greeting through clarification and feedback:

1. Greet the user and introduce what the assistant handles.
2. Accept the user’s question or task request.
3. Evaluate readiness to answer: if information is missing, reflect what the bot understood, ask for the missing detail, and offer structured choices; repeat this slot-filling loop until ready.
4. Deliver the response as text/media, a direct link, or a task action button.
5. Prompt the user for feedback on whether the response helped.

**Examples:** `chatbots-mission-help`.

#### Best practices

Apply five baseline interaction practices across every conversational flow:

##### Introduction

State clearly that the user is interacting with an automated assistant, explain its purpose, and frame the specific topics people can ask about.

##### User intent

Accept initial user goals—whether questions or task requests—through freeform text input or selectable structured prompts.

##### Structured responses

Offer menus of structured choices whenever narrowing scope helps the assistant reach a precise, accurate answer faster.

##### Reflection

Paraphrase what the assistant understood to verify intent—especially before performing consequential actions—and repeat slot-filling prompts until every required input is gathered.

##### Provide a response and request feedback

Deliver a thorough, relevant answer grounded in the gathered context, then invite user feedback (including an optional custom text note when appropriate) so teams can evaluate quality.

### Flows

Complex tasks often require supplementary interactions around launching, escalation to people, long-form cards, and network recovery.

> **note:** Preview status: multi-thread human handoff, expanding cards, and error-recovery flows represent emerging conventions that remain experimental rather than finalized standards.

#### Launching a bot

Anchor a persistent launch trigger in the bottom-right corner of the viewport, or embed an explicit launch button directly inside the relevant workflow view.

#### Multiple threads (Preview)

**Status:** Preview.

Escalate to a live human specialist whenever the bot cannot resolve a request, detects repeated failure or frustration, or the user explicitly prefers human assistance.

**Examples:** `chatbots-human-handoff`.

##### User initiates change

**Status:** Preview.

Support both user-requested escalation and proactive bot offers to transfer after repeated unsuccessful answers.

##### Notify the user

**Status:** Preview.

Announce context switches and agent arrival with both a transient toast banner and a persistent in-thread status message so conversation history remains clear.

##### Multiple users

**Status:** Preview.

When multiple specialists participate in one thread, distinguish who the user is speaking with whenever roles or responsibilities differ.

##### Incoming messages

**Status:** Preview.

Signal background thread activity with an unread dot on the threads control, per-thread unread counts inside the threads list, and distinct styling for unread threads.

#### Expanding cards (Preview)

**Status:** Preview.

Use progressive card expansion when structured output exceeds comfortable inline summary density.

##### Default state

**Status:** Preview.

Highlight only critical summary facts in the collapsed card and provide a clear expand action.

##### Expanded state

**Status:** Preview.

Reveal fuller details inside the expanded card; link to a full-page view only when genuinely unavoidable.

##### Full view

**Status:** Preview.

Reserve a dedicated full-view container strictly for long-form content that would overwhelm the chat stream.

#### Error states (Preview)

**Status:** Preview.

Flag undelivered user messages clearly right in the transcript (for example with an inline error marker and connection-loss banner). Once connectivity returns, show a brief connected confirmation and then clear both that notice and the message-level error badges.

**Examples:** `chatbots-error-recovery`.

### Content

Once user research validates the need for a chatbot, shape its voice, expectations, and dialogue guardrails around clear, non-deceptive communication.

#### Conversational writing

##### Tailoring the conversation to your users

Adjust tone to fit the operator’s domain and task seriousness so phrasing feels natural without distracting from expectations.

###### In general, bots should

> **do:** Use straightforward language, keep a genuinely helpful tone without forced enthusiasm, paraphrase inputs to confirm understanding, and offer fallback options or help when users get stuck.

###### Typically, bots should not

> **dont:** Never impersonate a human, leave users with a dead end and no recourse, or send pushy, unsolicited prompts.

##### Conversation design principles for bots

1. Introduce the bot clearly: establish non-human identity, scope boundaries, practical value, and realistic next steps.
2. Orient the user: explain supported topics and tasks upfront rather than assuming users guess what to ask.
3. Be proactive with structured prompts: suggest starter options when users may not know how to phrase a question.
4. Decrease ambiguity before consequential acts: restate key values or targets for confirmation, summarize complex inputs, and rely on structured replies to prevent dead ends.
5. Provide clear, manageable actions: keep structured menus small enough to scan without overwhelming users.
6. Guide multi-step progress: communicate expected wait or duration, confirm progress, and let users cancel or restart longer tasks.
7. Collect feedback: invite ongoing ratings or input so teams can monitor and improve response accuracy.

## Interactive and visual examples

### Ask for help with mission planning

- Example ID: `chatbots-mission-help`
- Type: **Interactive**
- Source mapping: partial-divergent — `usage-requesting-information`
- Scenario: A pilot asks how to find route details; the scripted helper explains its limits and points to the mission record.
- What it teaches: A conversational helper answers scoped natural-language lookups when people do not know where a record lives, while disclosing what it cannot do.
- Decision shown: Introduce bot identity and topic limits upfront, pair freeform text with scannable structured prompts, reflect ambiguous intent before acting, and close helpful answers with a feedback prompt.
- Consider: Keep the active system reply visually distinct from faded prior messages, lock selected prompt chips as echoed user turns, and never imply authority over unverified operational domains.
- Boundary or simplification: Live demo (`demos.tsx:2573-2613`) omits header utility actions/close control, past-message fading vs. active-reply bar indicator, selected structured-pill state change, multi-turn slot-fill confirmation loop, and a post-answer feedback prompt.

### Continue through standard navigation

- Example ID: `chatbots-standard-navigation`
- Type: **Interactive**
- Source mapping: partial-divergent — `overview-user-needs-dont`
- Scenario: When a question is outside the helper’s scope, direct the user back to the Missions workspace.
- What it teaches: Chat should work alongside ordinary product navigation rather than trapping users inside conversation for predictable tasks.
- Decision shown: Avoid routing tasks through chat when standard UI finishes faster, and always give a direct escape hatch to conventional workspace views when a bot reaches its limit.
- Consider: Link directly to the target workspace view rather than echoing another bot message.
- Boundary or simplification: The action opens an in-card Missions destination preview and clearly states that product navigation did not occur; a live route is not connected in this sample.

### Recover when a message cannot be sent

- Example ID: `chatbots-error-recovery`
- Type: **Interactive**
- Source mapping: partial-divergent — `flows-error-states`
- Scenario: Show a clear failed state and preview retry recovery; this local example does not send a real message.
- What it teaches: Send failures require visible inline status and an immediate recovery path so operators know their prompt did not go through.
- Decision shown: Follow Preview error-state guidance: mark undelivered user bubbles inline alongside a connection notice, offer Retry, and clear error indicators after displaying a brief reconnect confirmation.
- Consider: Error recovery in the community reference carries Preview status rather than finalized specification guarantees.
- Boundary or simplification: Retry updates a local preview only; it does not resend a message or contact a service. Per-message failure badges and transient reconnect-banner clearing are not modeled.

### Hand off a complex request to a person

- Example ID: `chatbots-human-handoff`
- Type: **Interactive**
- Source mapping: partial-divergent — `flows-multiple-threads`
- Scenario: Preview a support handoff and preserve a return path; this example does not contact a support teammate.
- What it teaches: Sensitive, complex, or repeatedly unresolved requests need a transparent escalation path to a human teammate.
- Decision shown: Follow Preview multi-thread conventions: trigger handoff on user request or repeated failure, notify via both a top banner and an in-thread status message, distinguish agent roles, and surface unread counts across background threads.
- Consider: Disclose shared conversation context and real support availability; escalation conventions carry Preview status.
- Boundary or simplification: The handoff changes only the preview; it does not open a support thread. Toast + in-thread notifications, agent role indicators, and unread thread badges/counts are not modeled.

## Maintenance rule

Treat the catalog as the source for status, summary, component shortlist, and design decisions. Treat page content as the source for section guidance and demo teaching. Treat the rendered demo as evidence only for the behavior it visibly implements. Update this guide and [pattern routing](../PATTERN_ROUTING.md) when the pattern changes. Never treat local examples as production services or operational policy.
