# Avatar

> A visual cue for a person, with an image or initials and optional presence status.

- Package version: `0.1.5`
- Public export: `skytrack-ui/avatar`
- Implementation: [`src/components/ui/avatar.tsx`](../../src/components/ui/avatar.tsx)
- Public type declaration: [`dist-lib/components/ui/avatar.d.ts`](../../dist-lib/components/ui/avatar.d.ts)
- Showcase demo id: `avatar`
- Closest demo: [`src/demos/avatar.demo.tsx`](../../src/demos/avatar.demo.tsx)
- Official guidance: [Fluent 2 Avatar Usage](https://fluent2.microsoft.design/components/web/react/core/avatar/usage)

## Usage

Use Avatar to represent people or system accounts in profiles, team directories, comments, and navigation.

- **Fit:** Visual user identification in headers, tables, activity feeds, and presence indicators.
- **Avoid:** Generic file previews (use Attachment), or solitary buttons without accessible labels. Never use an avatar photo alone to communicate a person’s permissions.
- **Best alternative:** For document previews, use Attachment. For status badges, use Badge.

**Live demo variant:** `Image and fallback`

## Types

Avatar supports four sizes:

- **Compact:** Dense rows and activity feeds.
- **Standard:** Card headers and navigation areas.
- **Large:** Profile views and groups of people.

**Live demo variant:** `Sizes`

## Behavior

When a profile image is unavailable, show initials or another short identifier so the person remains recognizable.

| Do                                                                                                                      | Don't                                                                              | Why                                                                                                                         |
| ----------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Provide 2-letter uppercase initials (e.g., "TC" for Taylor Chen) as an immediate fallback when an image is unavailable. | Show a broken image icon or a blank solid circle when profile photos fail to load. | Fallback initials maintain layout integrity and allow instant user identification on spotty unreliable network connections. |

**Live demo variant:** `Image and fallback`

## Layout

Avatars sit at the leading edge of identity blocks, paired horizontally with names and roles.

- **Groups:** Slightly overlap avatars when space is limited, while keeping each person distinct.
- **Mobile viewports:** Use a compact size when a larger avatar would crowd important text.

**Live demo variant:** `Sizes`

## Accessibility

When a nearby label already names the person, avoid announcing the same name twice. If the avatar is the only identity cue, make that identity available to assistive technology.

**Live demo variant:** `Sizes`

## Content

Keep fallback content brief, such as one or two initials; show the full name or display name in adjacent text.

- **Avoid:** Full names or call signs inside the circular avatar; place full titles in adjacent text labels.

**Live demo variant:** `Image and fallback`
