# Avatar

> A visual cue for a person, with an image or short text fallback.

- Package version: `0.1.5`
- Public export: `skytrack-ui/avatar`
- Implementation: [`src/components/ui/avatar.tsx`](../../src/components/ui/avatar.tsx)
- Public type declaration: [`dist-lib/components/ui/avatar.d.ts`](../../dist-lib/components/ui/avatar.d.ts)
- Showcase demo id: `avatar`
- Closest demo: [`src/demos/avatar.demo.tsx`](../../src/demos/avatar.demo.tsx)
- Official guidance: [Fluent 2 Avatar Usage](https://fluent2.microsoft.design/components/web/react/core/avatar/usage)

## Usage

Use Avatar to represent people or system accounts in profiles, team directories, comments, and navigation.

- **Fit:** Visual user identification in headers, tables, activity feeds, and user profiles.
- **Avoid:** Generic file previews (use Attachment), or solitary buttons without accessible labels. Never use an avatar photo alone to communicate a person’s permissions.
- **Best alternative:** For document previews, use Attachment. For status badges, use Badge.

**Live demo variant:** `Image and fallback`

## Types

Choose image or fallback and size based on available identity data and the context where it appears.

## Behavior

When a profile image is unavailable, show a short fallback derived from the displayed name—such as one or two initials or a localized short name cue—so the person remains recognizable.

- **Presence status:** When showing presence or activity status, compose a Badge alongside the avatar and pair it with a visible textual status cue or tooltip, especially at compact sizes where small indicators are hard to distinguish.

| Do                                                                                                                                                                | Don't                                                                              | Why                                                                                                                                            |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Provide a short fallback derived from the displayed name (such as one or two initials or localized cue, e.g., "TC" for Taylor Chen) when an image is unavailable. | Show a broken image icon or a blank solid circle when profile photos fail to load. | A short, legible fallback preserves layout integrity and supports diverse naming conventions without requiring Latin-only two-letter initials. |

**Live demo variant:** `Image and fallback`

## Layout

Avatars sit at the leading edge of identity blocks, paired horizontally with names and roles.

- **Groups:** Slightly overlap avatars when space is limited, while keeping each person distinct.
- **Mobile viewports:** Use a compact size when a larger avatar would crowd important text.

**Live demo variant:** `Sizes`

## Accessibility

When a nearby label already names the person, avoid announcing the same name twice. If the avatar is the only identity cue, make that identity available to assistive technology. When composed status badges communicate critical availability or status, provide an accessible textual status cue or tooltip, particularly at 32px and below where small badges are easily missed.

**Live demo variant:** `Sizes`

## Content

Keep fallback content brief, such as one or two initials or characters related to the displayed name; show the full name or display name in adjacent text. As a SkyTrack usability choice, allowing one or two characters accommodates international naming conventions without crowding the circular avatar.

- **Avoid:** Full names or long titles inside the circular avatar; place full labels in adjacent text.

**Live demo variant:** `Image and fallback`
