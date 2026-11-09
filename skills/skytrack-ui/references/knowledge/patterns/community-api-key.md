# Generate an API key

> Guidance for explaining what an API key is for, its security implications, and where it will be used.

- Pattern ID: `community-api-key`
- Catalog group: Community
- Source status: **Community maintained**
- Primary source: [maintained reference](../../../../../docs/carbon-ds-reference/community/patterns/generate-an-api-key/index.md)
- Catalog entry: [catalog.ts](../../../../../src/showcase/pattern-library/catalog.ts)
- Page copy, source citations, and demo map: [page-content.ts](../../../../../src/showcase/pattern-library/page-content.ts)
- Local interaction implementation: [demos.tsx](../../../../../src/showcase/pattern-library/demos.tsx)

## Decision summary

**Use when:** Use this flow when users need a credential for an integration and must understand its access and retrieval constraints.

**User outcome:** Clear scope and retrieval expectations help prevent excess access and reduce the chance of losing a credential.

### Design decisions

- Name the key and explain its scope before creation.
- Before creation, say where to retrieve the key and link there; if retrieval is unavailable, warn the user and offer a secure download.
- Explain how to recover access or rotate the key if the original value is lost.
- Offer restricted access options before broad access when the use case allows.

### SkyTrack UI implementation route

- Use Dialog, Field, Fieldset, Input, RadioGroup, RadioRoot, Button, Alert, and Menu for the local configuration and result-preview flow.
- The configuration opens a separate result view with a fixed placeholder value. Reveal, copy, rotation, revocation, and JSON download controls are preview-only; no credential, clipboard change, or file is produced.
- A real key flow must be implemented by the product security service.

**Candidate components:** `Dialog`, `Field`, `Fieldset`, `Input`, `RadioGroup`, `RadioRoot`, `Button`, `Alert`, `Menu`. Verify each API against [component routing](../COMPONENT_ROUTING.md) and installed source.

> **Local example limit:** The revealed value is a fixed sample placeholder, not a generated secret. Download and clipboard actions only update preview status.

## Source limits

- Key rotation, revocation menus, and lost-key recovery procedures are SkyTrack security additions not specified in the maintained community reference.

## Source notes

- Retrieval subsection #### API key can be retrieved via another platform names specific vendor cloud platforms as examples; generalized here to "another platform" for vendor neutrality.

## Guidance reference

### General access keys

**Examples:** `api-key-create-and-manage`.

#### Instant generation

Trigger creation from a primary Generate button, displaying a "Generating..." loading state if issuance takes noticeable time, and reveal the generated key inside a modal containing a Copy button.

##### Optional display affordances

- Split the credential into two parts when the system requires dual key components.
- Display an encoded version of the key when integrations expect it.
- Provide concise explanatory text describing how the key should be used.
- Let users toggle key visibility between masked and revealed states.
- Provide a secondary download link alongside Copy.

#### Name the API key

Ask users for a descriptive name before clicking Generate whenever they manage keys for multiple integrations in one workspace. Whenever pre-generation fields (such as key name or access options) are collected first, present the newly created credential in a separate post-generate modal view.

#### Retrieval warnings

Clearly communicate whether a key remains accessible after closing the generation modal; any of the three retrieval policies may be paired with a `.txt` or `JSON` download link:

##### API key can be retrieved in the product

Inform the user that the key stays retrievable later inside the product (such as on an API key management page) and consider linking directly to that view.

##### API key can be retrieved via another platform

Tell the user that retrieval happens inside a separate external platform or console and link to clear instructions for locating it there.

##### API key cannot be retrieved at a later date

> **Warning:** When a secret cannot be retrieved after leaving the creation modal, warn the user prominently inside the modal and offer an immediate JSON download option.

### Restricted access keys

Let users scope permissions before creating a key when integrations do not require full workspace privileges. Present restriction options inside the modal prior to generation—splitting complex setup across a multi-step modal with a progress indicator rather than letting the dialog scroll. Whenever naming is offered, place the key name field first.

#### Ordering restricted access options

Present optional restriction controls in this logical order (omitting steps that do not apply):

1. Key or connected application name (optional) so operators can recognize its destination later.
2. Permitted actions (optional), such as Read and write, Write only, or Read only.
3. Target accessible resources (optional), specified by naming or picking specific items.

### Show the API key in context (optional)

When helpful, keep the newly created key summary visible in the page near the Generate trigger after the modal closes, paired with an option to generate another key.

### API key management page (optional)

Provide a central API key management view inside a predictable access administration area—such as Settings or Access—listing credentials in a data table by recognizable key or application name so operators can create, inspect, or edit keys.

### Edit an API key (optional)

When supported from either the creation context or the management table, allow editing metadata and restrictions—such as connected application name, key name, and scoped permissions—ending with a Save action. Editing an existing key must never alter the underlying secret contents.

**Examples:** `api-key-edit-existing`.

## Interactive and visual examples

### Create and manage an API key safely

- Example ID: `api-key-create-and-manage`
- Type: **Interactive**
- Source mapping: partial-divergent — `general-access-keys`
- Scenario: Set a key name and access level, choose where a real key would be retrieved, then review a separate sample result before closing it.
- What it teaches: People need to understand what an API key can access and whether its value can be retrieved again before they create one.
- Decision shown: Ask for a recognizable name, explain the access level, and state the retrieval policy before generation. Show a separate result view; if the key is one-time, warn people to save it and offer a secure download.
- Consider: Keep access limited to what the integration needs. Provide recovery or rotation guidance, and never expose or persist real secrets in a UI example.
- Boundary or simplification: The preview opens a configuration dialog and a separate result dialog. It shows only a fixed sample value: no credential is created, no clipboard is accessed, and no file is downloaded. Retrieval choices explain product decisions but do not implement a retrieval service. Copy, rotation, and revocation controls are preview-only.

### Manage or edit an existing key without changing its secret

- Example ID: `api-key-edit-existing`
- Type: **Interactive**
- Source mapping: partial-divergent — `edit-api-key`
- Scenario: A workspace administrator reviews named keys, opens management actions, and edits access without changing an existing key value.
- What it teaches: Key metadata and permissions can be updated independently from rotating or replacing the secret value itself.
- Decision shown: List keys by recognizable key or application name in a management data table under Settings or Access, and allow editing name, application label, and restrictions via Save without modifying the secret.
- Consider: Keep secret replacement (such as rotation or revocation—SkyTrack local security extensions) separate from metadata editing.
- Boundary or simplification: Live demo shows one recognizable key row rather than a full Settings/Access data table. Rotation and revocation are explicitly labeled as local previews and do not change credentials.

## Maintenance rule

Treat the catalog as the source for status, summary, component shortlist, and design decisions. Treat page content as the source for section guidance and demo teaching. Treat the rendered demo as evidence only for the behavior it visibly implements. Update this guide and [pattern routing](../PATTERN_ROUTING.md) when the pattern changes. Never treat local examples as production services or operational policy.
