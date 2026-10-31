# Live Figma variants: Tabs → Modal

Source Figma page nodes queried via Plugin API, mode SkyTrack; geometry = W×H, R, padding T/R/B/L, gap; text = family/style size/line.

## Tabs

### ds-tab-title-item (2)
Variant props: State=[Inactive,Active]

| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| State=Active | 31×26 | 0 | 0/0/0/0 | 0 | IBM Plex Sans SemiBold 18/26 |
| State=Inactive | 31×26 | 0 | 0/0/0/0 | 0 | IBM Plex Sans SemiBold 18/26 |

### ds-tab-item (2)
Variant props: Active=[False,True]

| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| Active=True | 26×32 | 0 | 0/0/10/0 | 6 | IBM Plex Sans SemiBold 15/22 |
| Active=False | 26×32 | 0 | 0/0/10/0 | 6 | IBM Plex Sans SemiBold 15/22 |

### ds-pill-item (2)
Variant props: Active=[False,True]

| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| Active=True | 64×30 | 8 | 4/12/4/12 | 6 | IBM Plex Sans SemiBold 15/22 |
| Active=False | 64×30 | 0 | 4/12/4/12 | 6 | IBM Plex Sans SemiBold 15/22 |

### ds-tabs (6)
Variant props: Type=[Tabs,Tabs-Title,Pills]; Width=[Hug,Fill]

| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| Type=Tabs, Width=Hug | 350×40 | 0 | 0/20/0/20 | 16 | IBM Plex Sans SemiBold 15/22 |
| Type=Tabs-Title, Width=Hug | 350×26 | 0 | 0/0/0/0 | 16 | IBM Plex Sans SemiBold 18/26 |
| Type=Pills, Width=Hug | 200×38 | 12 | 4/4/4/4 | 16 | IBM Plex Sans SemiBold 15/22 |
| Type=Tabs, Width=Fill | 350×40 | 0 | 0/20/0/20 | 16 | IBM Plex Sans SemiBold 15/22 |
| Type=Tabs-Title, Width=Fill | 350×26 | 0 | 0/0/0/0 | 16 | IBM Plex Sans SemiBold 18/26 |
| Type=Pills, Width=Fill | 350×38 | 12 | 4/4/4/4 | 16 | IBM Plex Sans SemiBold 15/22 |

## Input

### ds-input-inline (24)
Variant props: Size=[S,M,L]; State=[Enabled,Valid,Invalid,Disabled]; Filled=[True,False]

| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| Size=L, State=Enabled, Filled=False | 350×48 | 0 | 0/0/0/0 | 0 | IBM Plex Sans Medium 13/18 |
| Size=L, State=Enabled, Filled=True | 350×48 | 0 | 0/0/0/0 | 0 | IBM Plex Sans Medium 13/18 |
| Size=M, State=Enabled, Filled=False | 350×40 | 0 | 0/0/0/0 | 0 | IBM Plex Sans Medium 12/16 |
| Size=M, State=Enabled, Filled=True | 350×40 | 0 | 0/0/0/0 | 0 | IBM Plex Sans Medium 12/16 |
| Size=L, State=Valid, Filled=False | 350×48 | 0 | 0/0/0/0 | 0 | IBM Plex Sans Medium 13/18 |
| Size=L, State=Valid, Filled=True | 350×48 | 0 | 0/0/0/0 | 0 | IBM Plex Sans Medium 13/18 |
| Size=M, State=Valid, Filled=False | 350×40 | 0 | 0/0/0/0 | 0 | IBM Plex Sans Medium 12/16 |
| Size=M, State=Valid, Filled=True | 350×40 | 0 | 0/0/0/0 | 0 | IBM Plex Sans Medium 12/16 |
| Size=L, State=Invalid, Filled=False | 350×48 | 0 | 0/0/0/0 | 0 | IBM Plex Sans Medium 13/18 |
| Size=L, State=Invalid, Filled=True | 350×48 | 0 | 0/0/0/0 | 0 | IBM Plex Sans Medium 13/18 |
| Size=M, State=Invalid, Filled=False | 350×40 | 0 | 0/0/0/0 | 0 | IBM Plex Sans Medium 12/16 |
| Size=M, State=Invalid, Filled=True | 350×40 | 0 | 0/0/0/0 | 0 | IBM Plex Sans Medium 12/16 |
| Size=L, State=Disabled, Filled=False | 350×48 | 0 | 0/0/0/0 | 0 | IBM Plex Sans Medium 13/18 |
| Size=L, State=Disabled, Filled=True | 350×48 | 0 | 0/0/0/0 | 0 | IBM Plex Sans Medium 13/18 |
| Size=M, State=Disabled, Filled=False | 350×40 | 0 | 0/0/0/0 | 0 | IBM Plex Sans Medium 12/16 |
| Size=M, State=Disabled, Filled=True | 350×40 | 0 | 0/0/0/0 | 0 | IBM Plex Sans Medium 12/16 |
| Size=S, State=Enabled, Filled=False | 350×32 | 0 | 0/0/0/0 | 0 | IBM Plex Sans Medium 12/16 |
| Size=S, State=Enabled, Filled=True | 350×32 | 0 | 0/0/0/0 | 0 | IBM Plex Sans Medium 12/16 |
| Size=S, State=Valid, Filled=False | 350×32 | 0 | 0/0/0/0 | 0 | IBM Plex Sans Medium 12/16 |
| Size=S, State=Valid, Filled=True | 350×32 | 0 | 0/0/0/0 | 0 | IBM Plex Sans Medium 12/16 |
| Size=S, State=Invalid, Filled=False | 350×32 | 0 | 0/0/0/0 | 0 | IBM Plex Sans Medium 12/16 |
| Size=S, State=Invalid, Filled=True | 350×32 | 0 | 0/0/0/0 | 0 | IBM Plex Sans Medium 12/16 |
| Size=S, State=Disabled, Filled=False | 350×32 | 0 | 0/0/0/0 | 0 | IBM Plex Sans Medium 12/16 |
| Size=S, State=Disabled, Filled=True | 350×32 | 0 | 0/0/0/0 | 0 | IBM Plex Sans Medium 12/16 |

### ds-input-textarea (18)
Variant props: Size=[S,M,L]; State=[Enabled,Invalid,Disabled]; Filled=[On,Off]

| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| Size=L, State=Enabled, Filled=Off | 350×94 | 0 | 0/0/0/0 | 0 | IBM Plex Sans Medium 13/18 |
| Size=L, State=Enabled, Filled=On | 350×94 | 0 | 0/0/0/0 | 0 | IBM Plex Sans Medium 13/18 |
| Size=M, State=Enabled, Filled=Off | 350×86 | 0 | 0/0/0/0 | 0 | IBM Plex Sans Medium 12/16 |
| Size=M, State=Enabled, Filled=On | 350×86 | 0 | 0/0/0/0 | 0 | IBM Plex Sans Medium 12/16 |
| Size=L, State=Invalid, Filled=Off | 350×94 | 0 | 0/0/0/0 | 0 | IBM Plex Sans Medium 13/18 |
| Size=L, State=Invalid, Filled=On | 350×94 | 0 | 0/0/0/0 | 0 | IBM Plex Sans Medium 13/18 |
| Size=M, State=Invalid, Filled=Off | 350×86 | 0 | 0/0/0/0 | 0 | IBM Plex Sans Medium 12/16 |
| Size=M, State=Invalid, Filled=On | 350×86 | 0 | 0/0/0/0 | 0 | IBM Plex Sans Medium 12/16 |
| Size=L, State=Disabled, Filled=Off | 350×94 | 0 | 0/0/0/0 | 0 | IBM Plex Sans Medium 13/18 |
| Size=L, State=Disabled, Filled=On | 350×94 | 0 | 0/0/0/0 | 0 | IBM Plex Sans Medium 13/18 |
| Size=M, State=Disabled, Filled=Off | 350×86 | 0 | 0/0/0/0 | 0 | IBM Plex Sans Medium 12/16 |
| Size=M, State=Disabled, Filled=On | 350×86 | 0 | 0/0/0/0 | 0 | IBM Plex Sans Medium 12/16 |
| Size=S, State=Enabled, Filled=Off | 350×78 | 0 | 0/0/0/0 | 0 | IBM Plex Sans Medium 12/16 |
| Size=S, State=Enabled, Filled=On | 350×78 | 0 | 0/0/0/0 | 0 | IBM Plex Sans Medium 12/16 |
| Size=S, State=Invalid, Filled=Off | 350×78 | 0 | 0/0/0/0 | 0 | IBM Plex Sans Medium 12/16 |
| Size=S, State=Invalid, Filled=On | 350×78 | 0 | 0/0/0/0 | 0 | IBM Plex Sans Medium 12/16 |
| Size=S, State=Disabled, Filled=Off | 350×78 | 0 | 0/0/0/0 | 0 | IBM Plex Sans Medium 12/16 |
| Size=S, State=Disabled, Filled=On | 350×78 | 0 | 0/0/0/0 | 0 | IBM Plex Sans Medium 12/16 |

### ds-search-bar (12)
Variant props: Size=[S,M,L]; Active=[On,Off]; Filled=[Off,On]

| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| Size=M, Active=Off, Filled=Off | 310×40 | 0 | 0/0/0/0 | 12 | IBM Plex Sans Regular 14/20 |
| Size=M, Active=On, Filled=Off | 310×40 | 0 | 0/0/0/0 | 12 | IBM Plex Sans Regular 14/20 |
| Size=M, Active=Off, Filled=On | 310×40 | 0 | 0/0/0/0 | 12 | IBM Plex Sans Regular 14/20 |
| Size=M, Active=On, Filled=On | 310×40 | 0 | 0/0/0/0 | 12 | IBM Plex Sans Regular 14/20 |
| Size=L, Active=Off, Filled=Off | 310×48 | 0 | 0/0/0/0 | 12 | IBM Plex Sans Regular 15/22 |
| Size=L, Active=On, Filled=Off | 310×48 | 0 | 0/0/0/0 | 12 | IBM Plex Sans Regular 15/22 |
| Size=L, Active=Off, Filled=On | 310×48 | 0 | 0/0/0/0 | 12 | IBM Plex Sans Regular 15/22 |
| Size=L, Active=On, Filled=On | 310×48 | 0 | 0/0/0/0 | 12 | IBM Plex Sans Regular 15/22 |
| Size=S, Active=Off, Filled=Off | 310×32 | 0 | 0/0/0/0 | 12 | IBM Plex Sans Regular 13/18 |
| Size=S, Active=On, Filled=Off | 310×32 | 0 | 0/0/0/0 | 12 | IBM Plex Sans Regular 13/18 |
| Size=S, Active=Off, Filled=On | 310×32 | 0 | 0/0/0/0 | 12 | IBM Plex Sans Regular 13/18 |
| Size=S, Active=On, Filled=On | 310×32 | 0 | 0/0/0/0 | 12 | IBM Plex Sans Regular 13/18 |

### ds-input-verify (9)
Variant props: State=[Empty,Typing-Show,Typing-Hide,Filled-Show,Filled-Hide,Validating-Show,Validating-Hide,Invalid,Invalid-Disabled]

| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| State=Empty | 352×82 | 0 | 0/0/0/0 | 12 | IBM Plex Sans Regular 12/16 |
| State=Typing-Show | 352×82 | 0 | 0/0/0/0 | 12 | Host Grotesk Bold 24/32 |
| State=Typing-Hide | 352×82 | 0 | 0/0/0/0 | 12 | Host Grotesk Bold 24/32 |
| State=Filled-Show | 352×82 | 0 | 0/0/0/0 | 12 | Host Grotesk Bold 24/32 |
| State=Filled-Hide | 352×82 | 0 | 0/0/0/0 | 12 | Host Grotesk Bold 24/32 |
| State=Validating-Show | 352×82 | 0 | 0/0/0/0 | 12 | Host Grotesk Bold 24/32 |
| State=Validating-Hide | 352×82 | 0 | 0/0/0/0 | 12 | Host Grotesk Bold 24/32 |
| State=Invalid | 352×82 | 0 | 0/0/0/0 | 12 | IBM Plex Sans Regular 12/16 |
| State=Invalid-Disabled | 352×82 | 0 | 0/0/0/0 | 12 | IBM Plex Sans Regular 12/16 |

## List | Grid

### ds-list-item (24)
Variant props: Type=[Default,Form: Multi-Select,Form: Single-Select,Setting: Multi-Select,Setting: Single-Select,Setting: Switch]; Padding=[False,True]; Disabled=[False,True]

| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| Type=Default, Padding=False, Disabled=False | 352×44 | 0 | 0/0/0/0 | 16 | IBM Plex Sans Regular 16/24 |
| Type=Default, Padding=False, Disabled=True | 352×44 | 0 | 0/0/0/0 | 16 | IBM Plex Sans Regular 16/24 |
| Type=Form: Multi-Select, Padding=False, Disabled=False | 352×44 | 0 | 0/0/0/0 | 16 | IBM Plex Sans Regular 16/24 |
| Type=Form: Multi-Select, Padding=False, Disabled=True | 352×44 | 0 | 0/0/0/0 | 16 | IBM Plex Sans Regular 16/24 |
| Type=Form: Single-Select, Padding=False, Disabled=False | 352×44 | 0 | 0/0/0/0 | 16 | IBM Plex Sans Regular 16/24 |
| Type=Form: Single-Select, Padding=False, Disabled=True | 352×44 | 0 | 0/0/0/0 | 16 | IBM Plex Sans Regular 16/24 |
| Type=Setting: Multi-Select, Padding=False, Disabled=False | 352×44 | 0 | 0/0/0/0 | 16 | IBM Plex Sans Regular 16/24 |
| Type=Setting: Multi-Select, Padding=False, Disabled=True | 352×44 | 0 | 0/0/0/0 | 16 | IBM Plex Sans Regular 16/24 |
| Type=Setting: Single-Select, Padding=False, Disabled=False | 352×44 | 0 | 0/0/0/0 | 16 | IBM Plex Sans Regular 16/24 |
| Type=Setting: Single-Select, Padding=False, Disabled=True | 352×44 | 0 | 0/0/0/0 | 16 | IBM Plex Sans Regular 16/24 |
| Type=Setting: Switch, Padding=False, Disabled=False | 352×44 | 0 | 0/0/0/0 | 16 | IBM Plex Sans Regular 16/24 |
| Type=Setting: Switch, Padding=False, Disabled=True | 352×44 | 0 | 0/0/0/0 | 16 | IBM Plex Sans Regular 16/24 |
| Type=Default, Padding=True, Disabled=False | 352×68 | 0 | 12/12/12/12 | 16 | IBM Plex Sans Regular 16/24 |
| Type=Default, Padding=True, Disabled=True | 352×68 | 0 | 12/12/12/12 | 16 | IBM Plex Sans Regular 16/24 |
| Type=Form: Multi-Select, Padding=True, Disabled=False | 352×68 | 0 | 12/12/12/12 | 16 | IBM Plex Sans Regular 16/24 |
| Type=Form: Multi-Select, Padding=True, Disabled=True | 352×68 | 0 | 12/12/12/12 | 16 | IBM Plex Sans Regular 16/24 |
| Type=Form: Single-Select, Padding=True, Disabled=False | 352×68 | 0 | 12/12/12/12 | 16 | IBM Plex Sans Regular 16/24 |
| Type=Form: Single-Select, Padding=True, Disabled=True | 352×68 | 0 | 12/12/12/12 | 16 | IBM Plex Sans Regular 16/24 |
| Type=Setting: Multi-Select, Padding=True, Disabled=False | 352×68 | 0 | 12/12/12/12 | 16 | IBM Plex Sans Regular 16/24 |
| Type=Setting: Multi-Select, Padding=True, Disabled=True | 352×68 | 0 | 12/12/12/12 | 16 | IBM Plex Sans Regular 16/24 |
| Type=Setting: Single-Select, Padding=True, Disabled=False | 352×68 | 0 | 12/12/12/12 | 16 | IBM Plex Sans Regular 16/24 |
| Type=Setting: Single-Select, Padding=True, Disabled=True | 352×68 | 0 | 12/12/12/12 | 16 | IBM Plex Sans Regular 16/24 |
| Type=Setting: Switch, Padding=True, Disabled=False | 352×68 | 0 | 12/12/12/12 | 16 | IBM Plex Sans Regular 16/24 |
| Type=Setting: Switch, Padding=True, Disabled=True | 352×68 | 0 | 12/12/12/12 | 16 | IBM Plex Sans Regular 16/24 |

### ds-grid-item (2)
Variant props: Disabled=[False,True]

| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| Disabled=False | 126×120 | 0 | 12/12/12/12 | 16 | IBM Plex Sans Regular 12/16 |
| Disabled=True | 126×120 | 0 | 12/12/12/12 | 16 | IBM Plex Sans Regular 12/16 |

## Tree View

### ds-tree-view (6)
Variant props: Selected=[False,True]; Level=[Parent,Child]; Expanded=[False,True]

| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| Selected=False, Level=Parent, Expanded=False | 220×32 | 8 | 8/8/8/8 | 8 | IBM Plex Sans Regular 14/20 |
| Selected=False, Level=Parent, Expanded=True | 220×64 | 0 | 0/0/0/0 | 0 | IBM Plex Sans Regular 14/20 |
| Selected=True, Level=Parent, Expanded=False | 220×32 | 8 | 8/8/8/8 | 8 | IBM Plex Sans Medium 14/20 |
| Selected=True, Level=Parent, Expanded=True | 220×64 | 0 | 0/0/0/0 | 0 | IBM Plex Sans Medium 14/20 |
| Selected=False, Level=Child, Expanded=False | 220×32 | 8 | 8/8/8/8 | 8 | IBM Plex Sans Regular 14/20 |
| Selected=True, Level=Child, Expanded=False | 220×32 | 8 | 8/8/8/8 | 8 | IBM Plex Sans Medium 14/20 |

## Rating

## Banner

### ds-banner (3)
Variant props: Type=[Offline,Online,Update]

| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| Type=Offline | 390×32 | 0 | 0/20/0/20 | 8 | IBM Plex Sans Regular 12/16 |
| Type=Online | 390×32 | 0 | 0/20/0/20 | 8 | IBM Plex Sans Regular 12/16 |
| Type=Update | 390×32 | 0 | 0/20/0/20 | 8 | IBM Plex Sans Regular 12/16 |

## Sheet

### ds-sheet (6)
Variant props: Type=[Modal,Suplementary]; Height=[Hug Content,Full Screen,Fixed]

| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| Type=Modal, Height=Hug Content | 393×852 | 0 | 0/0/0/0 | 0 | Host Grotesk SemiBold 20/28 |
| Type=Modal, Height=Fixed | 393×852 | 0 | 400/0/0/0 | 0 | Host Grotesk SemiBold 20/28 |
| Type=Modal, Height=Full Screen | 393×852 | 0 | 40/0/0/0 | 0 | Host Grotesk SemiBold 20/28 |
| Type=Suplementary, Height=Hug Content | 393×276 | 0 | 0/0/0/0 | 0 | Host Grotesk SemiBold 20/28 |
| Type=Suplementary, Height=Fixed | 393×452 | 0 | 0/0/0/0 | 0 | Host Grotesk SemiBold 20/28 |
| Type=Suplementary, Height=Full Screen | 393×852 | 0 | 48/0/0/0 | 0 | Host Grotesk SemiBold 20/28 |

### .animation-sheet-active (2)
Variant props: Step=[1,2]

| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| Step=1 | 393×852 | 0 | 0/0/0/0 | 0 | IBM Plex Sans SemiBold 15/22 |
| Step=2 | 393×852 | 0 | 0/0/0/0 | 0 | IBM Plex Sans Regular 16/24 |

### .animation-sheet-slide (2)
Variant props: Step=[1,2]

| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| Step=1 | 393×852 | 0 | 0/0/0/0 | 0 | Host Grotesk SemiBold 20/28 |
| Step=2 | 393×852 | 0 | 0/0/0/0 | 0 | IBM Plex Sans Regular 16/24 |

### .animation-sheet-popover (2)
Variant props: Step=[1,2]

| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| Step=1 | 393×852 | 0 | 0/0/0/0 | 0 | Host Grotesk SemiBold 20/28 |
| Step=2 | 393×852 | 0 | 0/0/0/0 | 0 | Host Grotesk SemiBold 20/28 |

### .animation-sheet-modal (2)
Variant props: Step=[1,2]

| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| Step=1 | 393×852 | 0 | 0/0/0/0 | 0 | IBM Plex Sans Regular 16/24 |
| Step=2 | 393×852 | 0 | 0/0/0/0 | 0 | IBM Plex Sans Regular 16/24 |

## Snackbar

### ds-snackbar (12)
Variant props: Type=[Default,Loading,Loading Bar,Processing,Processing Bar,Countdown]; Button Vertical=[False,True]

| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| Type=Default, Button Vertical=False | 390×72 | 8 | 12/20/12/20 | 4 | IBM Plex Sans Regular 14/20 |
| Type=Default, Button Vertical=True | 390×108 | 8 | 12/20/12/20 | 4 | IBM Plex Sans Regular 14/20 |
| Type=Loading, Button Vertical=False | 390×72 | 8 | 12/20/12/20 | 4 | IBM Plex Sans Regular 14/20 |
| Type=Loading, Button Vertical=True | 390×108 | 8 | 12/20/12/20 | 4 | IBM Plex Sans Regular 14/20 |
| Type=Processing, Button Vertical=False | 390×72 | 8 | 12/20/12/20 | 4 | IBM Plex Sans Regular 14/20 |
| Type=Processing, Button Vertical=True | 390×108 | 8 | 12/20/12/20 | 4 | IBM Plex Sans Regular 14/20 |
| Type=Countdown, Button Vertical=False | 390×72 | 8 | 12/20/12/20 | 4 | IBM Plex Sans SemiBold 12/16 |
| Type=Countdown, Button Vertical=True | 390×108 | 8 | 12/20/12/20 | 4 | IBM Plex Sans SemiBold 12/16 |
| Type=Loading Bar, Button Vertical=False | 390×80 | 8 | 12/20/12/20 | 4 | IBM Plex Sans Regular 14/20 |
| Type=Loading Bar, Button Vertical=True | 390×116 | 8 | 12/20/12/20 | 4 | IBM Plex Sans Regular 14/20 |
| Type=Processing Bar, Button Vertical=False | 390×80 | 8 | 12/20/12/20 | 4 | IBM Plex Sans Regular 14/20 |
| Type=Processing Bar, Button Vertical=True | 390×116 | 8 | 12/20/12/20 | 4 | IBM Plex Sans Regular 14/20 |

## Tooltip

### ds-tooltip (2)
Variant props: Type=[Simple,Complex]

| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| Type=Complex | 350×148 | 0 | 16/16/16/16 | 0 | IBM Plex Sans Medium 14/20 |
| Type=Simple | 166×56 | 0 | 12/12/12/12 | 0 | IBM Plex Sans Regular 12/16 |

## Modal
Error: {"error":"page not found"}


# Live Figma variants: Modal → Utilities

Source Figma page nodes queried via Plugin API, mode SkyTrack; geometry = W×H, R, padding T/R/B/L, gap; text = family/style size/line.

## Modal

### ds-modal (4)
Variant props: Type=[Dialog,Dialog-Simple,Promotional,Loading]

| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| Type=Dialog | 393×852 | 0 | 24/24/24/24 | 0 | Host Grotesk SemiBold 20/28 |
| Type=Dialog-Simple | 393×852 | 0 | 24/24/24/24 | 0 | IBM Plex Sans Medium 18/26 |
| Type=Promotional | 393×852 | 0 | 24/24/24/24 | 0 | Host Grotesk SemiBold 20/28 |
| Type=Loading | 393×852 | 0 | 24/24/24/24 | 0 | — |

### ds-d-modal (6)
Variant props: Height=[Hug Content,Scroll Inside]; Title=[Left,Center,None]

| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| Height=Hug Content, Title=Left | 1440×1024 | 0 | 80/80/80/80 | 0 | IBM Plex Sans SemiBold 18/26 |
| Height=Scroll Inside, Title=Left | 1440×1024 | 0 | 80/80/80/80 | 0 | IBM Plex Sans SemiBold 18/26 |
| Height=Hug Content, Title=Center | 1440×1024 | 0 | 80/80/80/80 | 0 | IBM Plex Sans SemiBold 18/26 |
| Height=Scroll Inside, Title=Center | 1440×1024 | 0 | 80/80/80/80 | 0 | IBM Plex Sans SemiBold 18/26 |
| Height=Hug Content, Title=None | 1440×1024 | 0 | 80/80/80/80 | 0 | IBM Plex Sans Medium 15/22 |
| Height=Scroll Inside, Title=None | 1440×1024 | 0 | 80/80/80/80 | 0 | IBM Plex Sans Medium 15/22 |

## Popover

### ds-popover (2)
Variant props: Height=[Hug Content,Fixed]

| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| Height=Hug Content | 240×208 | 0 | 8/8/8/8 | 0 | — |
| Height=Fixed | 240×200 | 0 | 8/8/8/8 | 0 | — |

### ds-popover-dropdown (9)
Variant props: Height=[Hug Content,Fixed]; Type=[Default,Search,Search Active,Search No Results,Search Suggestion,Search Loading]

| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| Height=Hug Content, Type=Default | 240×160 | 12 | 0/0/0/0 | 0 | — |
| Height=Fixed, Type=Default | 240×200 | 12 | 0/0/0/0 | 0 | — |
| Height=Hug Content, Type=Search | 240×216 | 12 | 0/0/0/0 | 0 | IBM Plex Sans Regular 14/20 |
| Height=Fixed, Type=Search | 240×224 | 12 | 0/0/0/0 | 0 | IBM Plex Sans Regular 14/20 |
| Height=Hug Content, Type=Search Active | 240×216 | 12 | 0/0/0/0 | 0 | IBM Plex Sans Regular 14/20 |
| Height=Hug Content, Type=Search No Results | 240×100 | 12 | 0/0/0/0 | 0 | IBM Plex Sans Regular 14/20 |
| Height=Hug Content, Type=Search Suggestion | 240×100 | 12 | 0/0/0/0 | 0 | IBM Plex Sans Regular 14/20 |
| Height=Hug Content, Type=Search Loading | 240×100 | 12 | 0/0/0/0 | 0 | IBM Plex Sans Regular 14/20 |
| Height=Fixed, Type=Search Active | 240×224 | 12 | 0/0/0/0 | 0 | IBM Plex Sans Regular 14/20 |

### ds-popover-placement (4)
Variant props: Open DIrection=[Top,Bottom,Left,Right]

| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| Open DIrection=Bottom | 80×40.000099182128906 | 0 | 0/0/0/0 | 0 | — |
| Open DIrection=Top | 80×40.000099182128906 | 0 | 0/0/0/0 | 0 | — |
| Open DIrection=Left | 80×40.000099182128906 | 0 | 0/0/0/0 | 0 | — |
| Open DIrection=Right | 80.0000991821289×40 | 0 | 0/0/0/0 | 0 | — |

## Breadcrumb

### ds-breadcrumb-item (3)
Variant props: State=[Enabled,Active,More]

| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| State=Enabled | 36×20 | 0 | 0/0/0/0 | 2 | IBM Plex Sans Regular 14/20 |
| State=Active | 36×20 | 0 | 0/0/0/0 | 2 | IBM Plex Sans Regular 14/20 |
| State=More | 12×20 | 0 | 0/0/0/0 | 2 | IBM Plex Sans Regular 14/20 |

### ds-breadcrumb (1)
Variant props: Type=[Default]

| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| Type=Default | 220×22 | 0 | 1/0/1/0 | 4 | IBM Plex Sans Regular 14/20 |

## Chart

### .Charts / Bar Chart / Rectangle (10)
Variant props: Type=[Default,Stacked,Negative]; Horizontal=[False,True]; Active=[False,True]

| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| Type=Default, Horizontal=False, Active=False | 40×132 | 0 | 0/0/0/0 | 8 | SF Pro Display Regular 12/100 |
| Type=Default, Horizontal=False, Active=True | 40×132 | 0 | 0/0/0/0 | 8 | SF Pro Display Regular 12/100 |
| Type=Default, Horizontal=True, Active=False | 192×40 | 0 | 0/0/0/0 | 8 | SF Pro Display Regular 12/100 |
| Type=Default, Horizontal=True, Active=True | 192×40 | 0 | 0/0/0/0 | 8 | SF Pro Display Regular 12/100 |
| Type=Stacked, Horizontal=True, Active=False | 192×40 | 0 | 0/0/0/0 | 8 | SF Pro Display Regular 12/100 |
| Type=Stacked, Horizontal=True, Active=True | 192×40 | 0 | 0/0/0/0 | 8 | SF Pro Display Regular 12/100 |
| Type=Stacked, Horizontal=False, Active=False | 40×148 | 0 | 0/0/0/0 | 8 | SF Pro Display Regular 12/100 |
| Type=Stacked, Horizontal=False, Active=True | 40×148 | 0 | 0/0/0/0 | 8 | SF Pro Display Regular 12/100 |
| Type=Negative, Horizontal=False, Active=False | 40×264 | 0 | 0/0/0/0 | 0 | SF Pro Display Regular 12/100 |
| Type=Negative, Horizontal=True, Active=False | 276×40 | 0 | 0/0/0/0 | 0 | SF Pro Display Regular 12/100 |

### .Charts / Bar Chart / Layer (6)
Variant props: Rectangles=[1,2,3]; Horizontal=[False,True]

| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| Rectangles=1, Horizontal=False | 48×105 | 0 | 0/0/0/0 | 13 | SF Pro Display Regular 12/100 |
| Rectangles=2, Horizontal=False | 48×128 | 0 | 0/0/0/0 | 13 | SF Pro Display Regular 12/100 |
| Rectangles=3, Horizontal=False | 48×132 | 0 | 0/0/0/0 | 13 | SF Pro Display Regular 12/100 |
| Rectangles=3, Horizontal=True | 154×48 | 0 | 0/0/0/0 | 4 | SF Pro Display Regular 12/100 |
| Rectangles=2, Horizontal=True | 154×48 | 0 | 0/0/0/0 | 4 | SF Pro Display Regular 12/100 |
| Rectangles=1, Horizontal=True | 154×48 | 0 | 0/0/0/0 | 4 | SF Pro Display Regular 12/100 |

### .Charts / Grid (2)
Variant props: Horizontal=[True,False]

| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| Horizontal=False | 401×254 | 0 | 0/0/0/0 | 98 | SF Pro Display Regular 12/100 |
| Horizontal=True | 221×239 | 0 | 0/0/0/0 | 37 | — |

### .Charts / Legend Item (2)
Variant props: Type=[Default,Icon]

| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| Type=Default | 44×16 | 0 | 0/0/0/0 | 6 | SF Pro Display Regular 12/16 |
| Type=Icon | 48×16 | 0 | 0/0/0/0 | 6 | SF Pro Display Regular 12/16 |

### .Charts / Tooltip / Tooltip Item (4)
Variant props: Type=[Default,Icon,Line,Total]

| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| Type=Default | 108×12 | 0 | 0/0/0/0 | 8 | SF Pro Display Regular 12/100 |
| Type=Line | 104×12 | 0 | 0/0/0/0 | 8 | SF Pro Display Regular 12/100 |
| Type=Total | 104×12 | 0 | 0/0/0/0 | 8 | SF Pro Display Medium 12/100 |
| Type=Icon | 108×12 | 0 | 0/0/0/0 | 6 | SF Pro Display Regular 12/100 |

### .Charts / Dot (3)
Variant props: Custom=[False,True]; Size=[8,12]

| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| Custom=False, Size=8 | 8×8 | 0 | 0/0/0/0 | 1 | SF Pro Display Regular 12/100 |
| Custom=False, Size=12 | 12×12 | 0 | 0/0/0/0 | 1 | SF Pro Display Regular 12/100 |
| Custom=True, Size=8 | 8×8 | 0 | 0/0/0/0 | 1 | SF Pro Display Regular 12/100 |

### .Charts / Dot on Stroke (3)
Variant props: Size=[6,8,10]

| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| Size=6 | 6×6 | 0 | 0/0/0/0 | 1 | SF Pro Display Regular 12/100 |
| Size=8 | 8×8 | 0 | 0/0/0/0 | 1 | — |
| Size=10 | 10×10 | 0 | 0/0/0/0 | 1 | — |

### .Charts / Pie Chart / Pie (2)
Variant props: Stroke=[Yes,No]

| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| Stroke=Yes | 192×192 | 0 | 0/0/0/0 | 0 | — |
| Stroke=No | 192×192 | 0 | 0/0/0/0 | 0 | — |

### .Charts / Radar Chart / Grid (4)
Variant props: Type=[Default,Circle]; Filled=[No,Yes]

| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| Type=Default, Filled=No | 192×192 | 0 | 0/0/0/0 | 0 | — |
| Type=Default, Filled=Yes | 192×192 | 0 | 0/0/0/0 | 0 | — |
| Type=Circle, Filled=No | 192×192 | 0 | 0/0/0/0 | 0 | — |
| Type=Circle, Filled=Yes | 192×192 | 0 | 0/0/0/0 | 0 | — |

### .Charts / Radar Chart / Label Wrapper (2)
Variant props: Type=[Default,Custom]

| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| Type=Default | 268.705078125×238 | 0 | 0/0/0/0 | 0 | SF Pro Display Regular 12/100 |
| Type=Custom | 268.705078125×238 | 0 | 0/0/0/0 | 0 | SF Pro Display Regular 12/100 |

### .Chart / Bar Chart (9)
Variant props: Type=[Basic,Multiple,Label,Stacked,Negative,Active,Horizontal,Custom Label,Mixed]

| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| Type=Basic | 464×320 | 0 | 0/0/0/0 | 36 | SF Pro Display Regular 12/100 |
| Type=Horizontal | 464×320 | 0 | 0/0/0/0 | 36 | SF Pro Display Regular 12/100 |
| Type=Mixed | 464×320 | 0 | 0/0/0/0 | 36 | SF Pro Display Regular 12/100 |
| Type=Custom Label | 464×320 | 0 | 0/0/0/0 | 36 | SF Pro Display Regular 12/100 |
| Type=Active | 464×320 | 0 | 0/0/0/0 | 36 | SF Pro Display Regular 12/100 |
| Type=Stacked | 464×320 | 0 | 0/0/0/0 | 36 | SF Pro Display Regular 12/100 |
| Type=Label | 464×320 | 0 | 0/0/0/0 | 36 | SF Pro Display Regular 12/100 |
| Type=Negative | 464×320 | 0 | 0/0/0/0 | 36 | SF Pro Display Regular 12/100 |
| Type=Multiple | 464×320 | 0 | 0/0/0/0 | 36 | SF Pro Display Regular 12/100 |

### .Chart / Area Chart (10)
Variant props: Type=[Basic,Linear,Step,Stacked,Stacked Expanded]; Gradient=[No,Yes]

| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| Type=Basic, Gradient=No | 293×246 | 0 | 0/0/0/0 | 36 | SF Pro Display Regular 12/100 |
| Type=Basic, Gradient=Yes | 293×246 | 0 | 0/0/0/0 | 36 | SF Pro Display Regular 12/100 |
| Type=Linear, Gradient=No | 293×246 | 0 | 0/0/0/0 | 36 | SF Pro Display Regular 12/100 |
| Type=Linear, Gradient=Yes | 293×246 | 0 | 0/0/0/0 | 36 | SF Pro Display Regular 12/100 |
| Type=Step, Gradient=No | 293×246 | 0 | 0/0/0/0 | 36 | SF Pro Display Regular 12/100 |
| Type=Step, Gradient=Yes | 293×246 | 0 | 0/0/0/0 | 36 | SF Pro Display Regular 12/100 |
| Type=Stacked, Gradient=No | 293×246 | 0 | 0/0/0/0 | 36 | SF Pro Display Regular 12/100 |
| Type=Stacked, Gradient=Yes | 293×246 | 0 | 0/0/0/0 | 36 | SF Pro Display Regular 12/100 |
| Type=Stacked Expanded, Gradient=No | 293×246 | 0 | 0/0/0/0 | 36 | SF Pro Display Regular 12/100 |
| Type=Stacked Expanded, Gradient=Yes | 293×246 | 0 | 0/0/0/0 | 36 | SF Pro Display Regular 12/100 |

### .Chart / Line Chart (7)
Variant props: Type=[Basic,Linear,Step,Multiple,Dots,Dots Colors,Label]

| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| Type=Basic | 293×246 | 0 | 0/0/0/0 | 36 | SF Pro Display Regular 12/100 |
| Type=Dots | 293×246 | 0 | 0/0/0/0 | 36 | SF Pro Display Regular 12/100 |
| Type=Label | 293×246 | 0 | 0/0/0/0 | 36 | SF Pro Display Regular 12/100 |
| Type=Dots Colors | 293×246 | 0 | 0/0/0/0 | 36 | SF Pro Display Regular 12/100 |
| Type=Linear | 293×246 | 0 | 0/0/0/0 | 36 | SF Pro Display Regular 12/100 |
| Type=Step | 293×246 | 0 | 0/0/0/0 | 36 | SF Pro Display Regular 12/100 |
| Type=Multiple | 293×246 | 0 | 0/0/0/0 | 36 | SF Pro Display Regular 12/100 |

### .Chart / Pie Chart / Full (2)
Variant props: Type=[Basic,Label]

| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| Type=Basic | 213×213 | 0 | 0/0/0/0 | 36 | SF Pro Display Regular 12/16 |
| Type=Label | 245×213.3300018310547 | 0 | 0/0/0/0 | 36 | SF Pro Display Regular 12/100 |

### .Chart / Pie Chart / Donut (3)
Variant props: Type=[Stacked,Active,Basic]

| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| Type=Basic | 192×192 | 0 | 0/0/0/0 | 36 | SF Pro Display Bold 30/36 |
| Type=Active | 192×192 | 0 | 0/0/0/0 | 36 | SF Pro Display Bold 30/36 |
| Type=Stacked | 192×192 | 0 | 0/0/0/0 | 36 | — |

### .Chart / Radar Chart (9)
Variant props: Type=[Basic,Dots,Multiple,Lines Only,Grid Custom,Grid Filled,Grid Circle,No lines,Grid Circle Filled]

| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| Type=Basic | 268.705078125×238 | 0 | 23/38/23/38 | 10 | SF Pro Display Regular 12/16 |
| Type=Grid Custom | 268.705078125×238 | 0 | 23/38/23/38 | 10 | SF Pro Display Regular 12/16 |
| Type=Grid Filled | 268.705078125×238 | 0 | 23/38/23/38 | 10 | SF Pro Display Regular 12/16 |
| Type=Grid Circle | 268.705078125×238 | 0 | 23/38/23/38 | 10 | SF Pro Display Regular 12/16 |
| Type=No lines | 268.705078125×238 | 0 | 23/38/23/38 | 10 | SF Pro Display Regular 12/16 |
| Type=Grid Circle Filled | 268.705078125×238 | 0 | 23/38/23/38 | 10 | SF Pro Display Regular 12/16 |
| Type=Dots | 268.705078125×238 | 0 | 23/38/23/38 | 10 | SF Pro Display Regular 12/16 |
| Type=Multiple | 268.705078125×238 | 0 | 23/38/23/38 | 10 | SF Pro Display Regular 12/16 |
| Type=Lines Only | 268.705078125×238 | 0 | 23/38/23/38 | 10 | SF Pro Display Regular 12/16 |

### .Chart / Radial Chart  (6)
Variant props: Type=[Basic,Grid,Label,Text,Shape,Stacked]

| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| Type=Basic | 199.2000732421875×199.2000732421875 | 0 | 0/0/0/0 | 0 | — |
| Type=Label | 199.2000732421875×201.57638549804688 | 0 | 0/0/0/0 | 0 | SF Pro Display Regular 11/16 |
| Type=Grid | 199.8369140625×196.9904022216797 | 0 | 0/0/0/0 | 0 | — |
| Type=Text | 171.77000427246094×171.77000427246094 | 0 | 0/0/0/0 | 0 | SF Pro Display Semibold 30/36 |
| Type=Shape | 184.00001525878906×184.00001525878906 | 0 | 0/0/0/0 | 0 | SF Pro Display Semibold 30/36 |
| Type=Stacked | 180.006103515625×181.0030517578125 | 0 | 0/0/0/0 | 0 | SF Pro Display Bold 24/32 |

### .Trading View Chart (3)
Variant props: Size=[Browser • Desktop,Browser • Mobile,App • Mobile]

| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| Size=Browser • Desktop | 640×534 | 0 | 0/0/0/0 | 0 | MiSans Latin VF Demibold 13/125 |
| Size=Browser • Mobile | 350×320 | 0 | 0/0/0/0 | 0 | MiSans Latin VF Demibold 12/125 |
| Size=App • Mobile | 390×296 | 0 | 0/0/0/0 | 0 | MiSans Latin VF Regular 12/125 |

### ds-chart (2)
Variant props: Type=[Default,Type2]

| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| Type=Default | 390×295 | 0 | 0/0/0/0 | 16 | IBM Plex Sans Regular 12/16 |
| Type=Type2 | 390×305 | 0 | 16/0/0/0 | 16 | IBM Plex Sans Regular 12/16 |

### ds-chart-drawing (4)
Variant props: Type=[Custom,Bar,Line Dot,Line]

| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| Type=Bar | 350×280 | 0 | 0/0/0/0 | 4 | — |
| Type=Line | 350×280 | 0 | 0/0/0/0 | 10 | — |
| Type=Custom | 350×280 | 0 | 0/0/0/0 | 0 | — |
| Type=Line Dot | 350×280 | 0 | 0/0/0/0 | 10 | — |

### .Charts / Legend (1)
| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| .Charts / Legend | 292×16 | 0 | 0/0/0/0 | 16 | SF Pro Display Regular 12/16 |

### .Charts / Pie Chart / Label Wrapper (1)
| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| .Charts / Pie Chart / Label Wrapper | 244.7300567626953×213.33389282226562 | 0 | 0/0/0/0 | 0 | SF Pro Display Regular 12/100 |

### .Charts / Pie Chart / Label List (1)
| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| .Charts / Pie Chart / Label List | 118.54347229003906×99.31057739257812 | 0 | 0/0/0/0 | 0 | SF Pro Display Regular 12/16 |

### .Charts / Tooltip (1)
| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| .Charts / Tooltip | 139×114 | 8 | 6/10/6/10 | 8 | SF Pro Display Medium 12/16 |

### .Charts / Radar Chart / Label Wrapper / Label  (1)
| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| .Charts / Radar Chart / Label Wrapper / Label  | 41×30 | 0 | 0/0/0/0 | 2 | SF Pro Display Regular 12/100 |

### .Charts / Radar Chart / Radius Axis (1)
| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| .Charts / Radar Chart / Radius Axis | 68.92102813720703×100.44607543945312 | 0 | 0/0/0/0 | 0 | SF Pro Display Regular 12/16 |

### .Chart / Pie Chart / Donut / Interactive (1)
| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| .Chart / Pie Chart / Donut / Interactive | 232×232 | 0 | 0/0/0/0 | 36 | SF Pro Display Bold 30/36 |

## Section Title

### ds-section-title (2)
Variant props: Size=[S,M]

| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| Size=S | 324×34 | 0 | 8/20/8/20 | 2 | IBM Plex Sans SemiBold 13/18 |
| Size=M | 324×38 | 0 | 8/20/8/20 | 2 | IBM Plex Sans SemiBold 15/22 |

## Text | Icon Status

### ds-text (5)
Variant props: State=[Neutral,Success,Critical,Warning,Link]

| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| State=Neutral | 23×16 | 0 | 0/0/0/0 | 8 | IBM Plex Sans Regular 12/16 |
| State=Critical | 23×16 | 0 | 0/0/0/0 | 8 | IBM Plex Sans Regular 12/16 |
| State=Success | 23×16 | 0 | 0/0/0/0 | 8 | IBM Plex Sans Regular 12/16 |
| State=Warning | 23×16 | 0 | 0/0/0/0 | 8 | IBM Plex Sans Regular 12/16 |
| State=Link | 23×16 | 0 | 0/0/0/0 | 8 | IBM Plex Sans Regular 12/16 |

### ds-icon-status (10)
Variant props: Type=[Neutral,Warning,Critical,Success,Fail]; Strong=[False,True]

| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| Type=Neutral, Strong=False | 24×24 | 0 | 0/0/0/0 | 0 | — |
| Type=Warning, Strong=False | 24×24 | 0 | 0/0/0/0 | 0 | — |
| Type=Critical, Strong=False | 24×24 | 0 | 0/0/0/0 | 0 | — |
| Type=Success, Strong=False | 24×24 | 0 | 0/0/0/0 | 0 | — |
| Type=Fail, Strong=False | 24×24 | 0 | 0/0/0/0 | 0 | — |
| Type=Neutral, Strong=True | 24×24 | 0 | 0/0/0/0 | 0 | — |
| Type=Warning, Strong=True | 24×24 | 0 | 0/0/0/0 | 0 | — |
| Type=Critical, Strong=True | 24×24 | 0 | 0/0/0/0 | 0 | — |
| Type=Success, Strong=True | 24×24 | 0 | 0/0/0/0 | 0 | — |
| Type=Fail, Strong=True | 24×24 | 0 | 0/0/0/0 | 0 | — |

## Empty State

### ds-empty-state (4)
Variant props: Type=[Full Screen,Section]; Size=[M,L]

| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| Type=Full Screen, Size=M | 390×410 | 0 | 80/20/80/20 | 24 | IBM Plex Sans SemiBold 18/26 |
| Type=Section, Size=M | 390×276 | 0 | 40/20/40/20 | 16 | IBM Plex Sans SemiBold 16/24 |
| Type=Full Screen, Size=L | 800×466 | 0 | 80/40/80/40 | 24 | Host Grotesk SemiBold 22/30 |
| Type=Section, Size=L | 800×324 | 0 | 40/40/40/40 | 16 | Host Grotesk SemiBold 20/28 |

## Slider

### ds-slider (2)
Variant props: Type=[Default,Media Player]

| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| Type=Default | 350×8 | 98 | 0/0/0/0 | 0 | — |
| Type=Media Player | 350×8 | 98 | 0/0/0/0 | 0 | — |

## Spinner | Indicator

### ds-indicator (2)
Variant props: Type=[Dot,Line]

| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| Type=Dot | 48×8 | 0 | 0/0/0/0 | 12 | — |
| Type=Line | 120×4 | 0 | 0/0/0/0 | 8 | — |

### ds-spinner (21)
Variant props: Type=[Indeterminate,Determinate,Countdown]; Style=[Neutral,Brand]; Size=[12,16,20,40,72]

| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| Type=Indeterminate, Style=Neutral, Size=40 | 40×40 | 0 | 0/0/0/0 | 0 | — |
| Type=Indeterminate, Style=Neutral, Size=20 | 20×20 | 0 | 0/0/0/0 | 0 | — |
| Type=Indeterminate, Style=Brand, Size=72 | 72×72 | 0 | 0/0/0/0 | 0 | — |
| Type=Determinate, Style=Neutral, Size=20 | 20×20 | 0 | 0/0/0/0 | 0 | — |
| Type=Indeterminate, Style=Brand, Size=40 | 40×40 | 0 | 0/0/0/0 | 0 | — |
| Type=Indeterminate, Style=Brand, Size=20 | 20×20 | 0 | 0/0/0/0 | 0 | — |
| Type=Countdown, Style=Brand, Size=20 | 20×20 | 0 | 0/0/0/0 | 0 | IBM Plex Sans SemiBold 12/16 |
| Type=Determinate, Style=Brand, Size=20 | 20×20 | 0 | 0/0/0/0 | 0 | — |
| Type=Countdown, Style=Neutral, Size=20 | 20×20 | 0 | 0/0/0/0 | 0 | IBM Plex Sans SemiBold 12/16 |
| Type=Indeterminate, Style=Neutral, Size=16 | 16×16 | 0 | 0/0/0/0 | 0 | — |
| Type=Determinate, Style=Neutral, Size=16 | 16×16 | 0 | 0/0/0/0 | 0 | — |
| Type=Indeterminate, Style=Brand, Size=16 | 16×16 | 0 | 0/0/0/0 | 0 | — |
| Type=Countdown, Style=Brand, Size=16 | 16×16 | 0 | 0/0/0/0 | 0 | IBM Plex Sans SemiBold 10/14 |
| Type=Determinate, Style=Brand, Size=16 | 16×16 | 0 | 0/0/0/0 | 0 | — |
| Type=Countdown, Style=Neutral, Size=16 | 16×16 | 0 | 0/0/0/0 | 0 | IBM Plex Sans SemiBold 10/14 |
| Type=Indeterminate, Style=Neutral, Size=12 | 12.000000953674316×12 | 0 | 0/0/0/0 | 0 | — |
| Type=Determinate, Style=Neutral, Size=12 | 12×12 | 0 | 0/0/0/0 | 0 | — |
| Type=Indeterminate, Style=Brand, Size=12 | 12.000000953674316×12 | 0 | 0/0/0/0 | 0 | — |
| Type=Countdown, Style=Brand, Size=12 | 12×12 | 0 | 0/0/0/0 | 0 | — |
| Type=Determinate, Style=Brand, Size=12 | 12×12 | 0 | 0/0/0/0 | 0 | — |
| Type=Countdown, Style=Neutral, Size=12 | 12×12 | 0 | 0/0/0/0 | 0 | — |

### ds-progress-bar (2)
Variant props: Type=[Determinate,Indeterminate]

| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| Type=Determinate | 350×4 | 98 | 0/0/0/0 | 0 | — |
| Type=Indeterminate | 350×4 | 98 | 0/0/0/64 | 0 | — |

### .demo-progress-bar (6)
Variant props: Type=[Determinate,Indeterminate]; Step=[1,2,3]

| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| Type=Determinate, Step=2 | 350×4 | 98 | 0/0/0/0 | 0 | — |
| Type=Determinate, Step=1 | 350×4 | 98 | 0/0/0/0 | 0 | — |
| Type=Determinate, Step=3 | 350×4 | 98 | 0/0/0/0 | 0 | — |
| Type=Indeterminate, Step=2 | 350×4 | 98 | 0/0/0/64 | 0 | — |
| Type=Indeterminate, Step=1 | 350×4 | 98 | 0/360/0/0 | 0 | — |
| Type=Indeterminate, Step=3 | 350×4 | 98 | 0/0/0/360 | 0 | — |

### .demo-spinner (36)
Variant props: Type=[Loading,Countdown,Processing]; Style=[Neutral,Brand]; Size=[40,20,72]; Step=[1,2,3,4]

| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| Type=Loading, Style=Neutral, Size=40, Step=1 | 40×40 | 0 | 0/0/0/0 | 0 | — |
| Type=Loading, Style=Neutral, Size=20, Step=1 | 20×20 | 0 | 0/0/0/0 | 0 | — |
| Type=Loading, Style=Brand, Size=72, Step=1 | 72×72 | 0 | 0/0/0/0 | 0 | — |
| Type=Loading, Style=Brand, Size=72, Step=2 | 72×72 | 0 | 0/0/0/0 | 0 | — |
| Type=Loading, Style=Brand, Size=72, Step=3 | 72×72 | 0 | 0/0/0/0 | 0 | — |
| Type=Loading, Style=Brand, Size=72, Step=4 | 72×72 | 0 | 0/0/0/0 | 0 | — |
| Type=Countdown, Style=Neutral, Size=20, Step=1 | 20×20 | 0 | 0/0/0/0 | 0 | IBM Plex Sans SemiBold 12/16 |
| Type=Loading, Style=Neutral, Size=40, Step=2 | 40.000003814697266×40.000003814697266 | 0 | 0/0/0/0 | 0 | — |
| Type=Loading, Style=Neutral, Size=40, Step=3 | 40×40 | 0 | 0/0/0/0 | 0 | — |
| Type=Loading, Style=Neutral, Size=40, Step=4 | 40×40 | 0 | 0/0/0/0 | 0 | — |
| Type=Loading, Style=Neutral, Size=20, Step=2 | 20.000001907348633×20.000001907348633 | 0 | 0/0/0/0 | 0 | — |
| Type=Loading, Style=Neutral, Size=20, Step=3 | 20×20 | 0 | 0/0/0/0 | 0 | — |
| Type=Loading, Style=Neutral, Size=20, Step=4 | 20×20 | 0 | 0/0/0/0 | 0 | — |
| Type=Countdown, Style=Neutral, Size=20, Step=2 | 20×20 | 0 | 0/0/0/0 | 0 | IBM Plex Sans SemiBold 12/16 |
| Type=Countdown, Style=Neutral, Size=20, Step=3 | 20×20 | 0 | 0/0/0/0 | 0 | IBM Plex Sans SemiBold 12/16 |
| Type=Countdown, Style=Neutral, Size=20, Step=4 | 20×20 | 0 | 0/0/0/0 | 0 | IBM Plex Sans SemiBold 12/16 |
| Type=Processing, Style=Neutral, Size=20, Step=1 | 20×20 | 0 | 0/0/0/0 | 0 | — |
| Type=Processing, Style=Neutral, Size=20, Step=2 | 20×20 | 0 | 0/0/0/0 | 0 | — |
| Type=Processing, Style=Neutral, Size=20, Step=3 | 20×20 | 0 | 0/0/0/0 | 0 | — |
| Type=Processing, Style=Neutral, Size=20, Step=4 | 20×20 | 0 | 0/0/0/0 | 0 | — |
| Type=Loading, Style=Brand, Size=40, Step=1 | 40×40 | 0 | 0/0/0/0 | 0 | — |
| Type=Loading, Style=Brand, Size=20, Step=1 | 20×20 | 0 | 0/0/0/0 | 0 | — |
| Type=Countdown, Style=Brand, Size=20, Step=1 | 20×20 | 0 | 0/0/0/0 | 0 | IBM Plex Sans SemiBold 12/16 |
| Type=Loading, Style=Brand, Size=40, Step=2 | 40.000003814697266×40.000003814697266 | 0 | 0/0/0/0 | 0 | — |
| Type=Loading, Style=Brand, Size=40, Step=3 | 40×40 | 0 | 0/0/0/0 | 0 | — |
| Type=Loading, Style=Brand, Size=40, Step=4 | 40×40 | 0 | 0/0/0/0 | 0 | — |
| Type=Loading, Style=Brand, Size=20, Step=2 | 20.000001907348633×20.000001907348633 | 0 | 0/0/0/0 | 0 | — |
| Type=Loading, Style=Brand, Size=20, Step=3 | 20×20 | 0 | 0/0/0/0 | 0 | — |
| Type=Loading, Style=Brand, Size=20, Step=4 | 20×20 | 0 | 0/0/0/0 | 0 | — |
| Type=Countdown, Style=Brand, Size=20, Step=2 | 20×20 | 0 | 0/0/0/0 | 0 | IBM Plex Sans SemiBold 12/16 |
| Type=Countdown, Style=Brand, Size=20, Step=3 | 20×20 | 0 | 0/0/0/0 | 0 | IBM Plex Sans SemiBold 12/16 |
| Type=Countdown, Style=Brand, Size=20, Step=4 | 20×20 | 0 | 0/0/0/0 | 0 | IBM Plex Sans SemiBold 12/16 |
| Type=Processing, Style=Brand, Size=20, Step=1 | 20×20 | 0 | 0/0/0/0 | 0 | — |
| Type=Processing, Style=Brand, Size=20, Step=2 | 20×20 | 0 | 0/0/0/0 | 0 | — |
| Type=Processing, Style=Brand, Size=20, Step=3 | 20×20 | 0 | 0/0/0/0 | 0 | — |
| Type=Processing, Style=Brand, Size=20, Step=4 | 20×20 | 0 | 0/0/0/0 | 0 | — |

## Scrim | Scrollbar | Divider

### ds-scrollbar (4)
Variant props: Style=[Subtle,Bold]; Direction=[Horizontal,Vertical]

| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| Style=Subtle, Direction=Vertical | 10.000100135803223×80 | 0 | 0/4/0/2 | 0 | — |
| Style=Subtle, Direction=Horizontal | 80.0000991821289×10 | 0 | 2/0/4/0 | 0 | — |
| Style=Bold, Direction=Vertical | 10×120 | 0 | 4/4/4/2 | 0 | — |
| Style=Bold, Direction=Horizontal | 120×10 | 0 | 2/4/4/4 | 0 | — |

### ds-divider (4)
Variant props: Type=[Line,With Action]; Orientation=[Horizontal,Vertical]

| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| Type=Line, Orientation=Horizontal | 350×0.00005958552719675936 | 0 | 0/0/0/0 | 0 | — |
| Type=With Action, Orientation=Horizontal | 350×40 | 0 | 4/0/4/0 | 0 | — |
| Type=Line, Orientation=Vertical | 1.7970238144759954e-11×16.000200271606445 | 0 | 0/0/0/0 | 16 | — |
| Type=With Action, Orientation=Vertical | 40×96 | 0 | 0/4/0/4 | 0 | — |

### ds-scrim (1)
| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| ds-scrim | 393×852 | 0 | 0/0/0/0 | 0 | — |

## Skeleton

### ds-skeleton-thumb (2)
Variant props: Square=[False,True]

| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| Square=False | 48.000099182128906×48 | 0 | 0/0/0/0 | 0 | — |
| Square=True | 48.000099182128906×48 | 0 | 0/0/0/0 | 0 | — |

### ds-skeleton-text (4)
Variant props: Type=[Heading L,Heading M,Heading S,Body]

| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| Type=Heading L | 120×36 | 0 | 0/0/0/0 | 0 | — |
| Type=Heading M | 120×24 | 0 | 0/0/0/0 | 0 | — |
| Type=Heading S | 120×20 | 0 | 0/0/0/0 | 0 | — |
| Type=Body | 250×108 | 0 | 0/0/0/0 | 12 | — |

### ds-skeleton-comp (2)
Variant props: Type=[List,Grid]

| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| Type=List | 352×64 | 0 | 12/12/12/12 | 16 | — |
| Type=Grid | 120×102 | 0 | 12/12/12/12 | 8 | — |

## Table

### ds-table-item (6)
Variant props: Type=[Label,Value]; Alignment=[Left,Center,Right]

| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| Type=Label, Alignment=Left | 160×40 | 0 | 8/12/8/12 | 8 | IBM Plex Sans SemiBold 16/24 |
| Type=Label, Alignment=Center | 160×40 | 0 | 8/12/8/12 | 8 | IBM Plex Sans SemiBold 16/24 |
| Type=Label, Alignment=Right | 160×40 | 0 | 8/12/8/12 | 8 | IBM Plex Sans SemiBold 16/24 |
| Type=Value, Alignment=Left | 160×38 | 0 | 8/12/8/12 | 8 | IBM Plex Sans Regular 15/22 |
| Type=Value, Alignment=Center | 160×38 | 0 | 8/12/8/12 | 8 | IBM Plex Sans Regular 15/22 |
| Type=Value, Alignment=Right | 160×38 | 0 | 8/12/8/12 | 8 | IBM Plex Sans Regular 15/22 |

### ds-data-item (6)
Variant props: Size=[L,M,S]; Vertical Layout=[False,True]

| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| Size=L, Vertical Layout=False | 350×22 | 0 | 0/0/0/0 | 12 | IBM Plex Sans Medium 13/18 |
| Size=L, Vertical Layout=True | 350×46 | 0 | 0/0/0/0 | 12 | IBM Plex Sans Medium 13/18 |
| Size=M, Vertical Layout=False | 350×18 | 0 | 0/0/0/0 | 12 | IBM Plex Sans Medium 12/16 |
| Size=M, Vertical Layout=True | 350×40 | 0 | 0/0/0/0 | 12 | IBM Plex Sans Medium 12/16 |
| Size=S, Vertical Layout=False | 350×16 | 0 | 0/0/0/0 | 12 | IBM Plex Sans Medium 12/16 |
| Size=S, Vertical Layout=True | 350×38 | 0 | 0/0/0/0 | 12 | IBM Plex Sans Medium 12/16 |

### ds-table (1)
| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| ds-table | 350×78 | 8 | 0/0/0/0 | 0 | SF Pro Semibold 16/24 |

### ds-data-list (1)
| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| ds-data-list | 350×160 | 0 | 0/0/0/0 | 0 | SF Pro Regular 14/20 |

## Navigation Top

### ds-nav-top (4)
Variant props: Multi-Lines Title=[False,True]; Stacked=[False,True]

| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| Multi-Lines Title=False, Stacked=False | 390×94 | 0 | 0/0/0/0 | 0 | undefined undefined 17/22 |
| Multi-Lines Title=True, Stacked=False | 390×128 | 0 | 0/0/0/0 | 0 | undefined undefined 17/22 |
| Multi-Lines Title=False, Stacked=True | 390×110 | 0 | 0/0/0/0 | 0 | undefined undefined 17/22 |
| Multi-Lines Title=True, Stacked=True | 390×144 | 0 | 0/0/0/0 | 0 | undefined undefined 17/22 |

### ds-nav-top-center (2)
Variant props: Stacked=[False,True]

| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| Stacked=False | 393×94 | 0 | 0/0/0/0 | 0 | undefined undefined 17/22 |
| Stacked=True | 393×110 | 0 | 0/0/0/0 | 0 | undefined undefined 17/22 |

### ds-nav-top-browsing (1)
| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| ds-nav-top-browsing | 247×40 | 9999 | 8/12/8/12 | 8 | IBM Plex Sans Regular 15/22 |

## Navigation Bottom

### ds-nav-bottom-kinsense (6)
Variant props: Active=[Tab 1,Tab 2,Tab 3]; Type=[Primary,Secondary]

| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| Active=Tab 1, Type=Primary | 393×80 | 0 | 0/0/0/0 | 0 | IBM Plex Sans SemiBold 10/14 |
| Active=Tab 2, Type=Primary | 393×80 | 0 | 0/0/0/0 | 0 | IBM Plex Sans SemiBold 10/14 |
| Active=Tab 3, Type=Primary | 393×80 | 0 | 0/0/0/0 | 0 | IBM Plex Sans SemiBold 10/14 |
| Active=Tab 1, Type=Secondary | 393×80 | 0 | 0/0/0/0 | 0 | IBM Plex Sans SemiBold 10/14 |
| Active=Tab 2, Type=Secondary | 393×80 | 0 | 0/0/0/0 | 0 | IBM Plex Sans SemiBold 10/14 |
| Active=Tab 3, Type=Secondary | 393×80 | 0 | 0/0/0/0 | 0 | IBM Plex Sans SemiBold 10/14 |

### ds-nav-bottom-kinshield (4)
Variant props: Active=[Tab 1,Tab 2,Tab 3,Tab 4]

| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| Active=Tab 1 | 393×80 | 0 | 0/0/0/0 | 0 | IBM Plex Sans SemiBold 10/14 |
| Active=Tab 2 | 393×80 | 0 | 0/0/0/0 | 0 | IBM Plex Sans SemiBold 10/14 |
| Active=Tab 3 | 393×80 | 0 | 0/0/0/0 | 0 | IBM Plex Sans SemiBold 10/14 |
| Active=Tab 4 | 393×80 | 0 | 0/0/0/0 | 0 | IBM Plex Sans SemiBold 10/14 |

### ds-nav-bottom-shieldnet (3)
Variant props: Active=[Tab 1,Tab 2,Tab 3]

| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| Active=Tab 1 | 393×80 | 0 | 0/0/0/0 | 0 | IBM Plex Sans SemiBold 10/14 |
| Active=Tab 2 | 393×80 | 0 | 0/0/0/0 | 0 | IBM Plex Sans SemiBold 10/14 |
| Active=Tab 3 | 393×80 | 0 | 0/0/0/0 | 0 | IBM Plex Sans SemiBold 10/14 |

### .ic-nav (8)
Variant props: Type=[home,inbox,tools,settings]; Active=[False,True]

| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| Type=home, Active=False | 24×24 | 0 | 0/0/0/0 | 0 | — |
| Type=home, Active=True | 24×24 | 0 | 0/0/0/0 | 0 | — |
| Type=inbox, Active=False | 24×24 | 0 | 0/0/0/0 | 0 | — |
| Type=tools, Active=False | 24×24 | 0 | 0/0/0/0 | 0 | — |
| Type=settings, Active=False | 24×24 | 0 | 0/0/0/0 | 0 | — |
| Type=inbox, Active=True | 24×24 | 0 | 0/0/0/0 | 0 | — |
| Type=tools, Active=True | 24×24 | 0 | 0/0/0/0 | 0 | — |
| Type=settings, Active=True | 24×24 | 0 | 0/0/0/0 | 0 | — |

## Sidebar

### ds-sidebar-item (8)
Variant props: Type=[Full]; Level=[Parent,Child]; Active=[False,True]; Expanded=[False,True]; Disabled=[False,True]

| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| Type=Full, Level=Parent, Active=False, Expanded=False, Disabled=False | 220×32 | 8 | 6/8/6/8 | 8 | IBM Plex Sans Regular 14/20 |
| Type=Full, Level=Parent, Active=False, Expanded=True, Disabled=False | 220×68 | 0 | 0/0/0/0 | 0 | IBM Plex Sans Regular 14/20 |
| Type=Full, Level=Parent, Active=True, Expanded=False, Disabled=False | 220×32 | 8 | 6/8/6/8 | 8 | IBM Plex Sans Medium 14/20 |
| Type=Full, Level=Parent, Active=True, Expanded=True, Disabled=False | 220×68 | 0 | 0/0/0/0 | 0 | IBM Plex Sans Medium 14/20 |
| Type=Full, Level=Child, Active=False, Expanded=False, Disabled=False | 220×32 | 8 | 6/8/6/8 | 8 | IBM Plex Sans Regular 14/20 |
| Type=Full, Level=Child, Active=True, Expanded=False, Disabled=False | 220×32 | 8 | 6/8/6/8 | 8 | IBM Plex Sans Medium 14/20 |
| Type=Full, Level=Parent, Active=False, Expanded=False, Disabled=True | 220×32 | 8 | 6/8/6/8 | 8 | IBM Plex Sans Regular 14/20 |
| Type=Full, Level=Child, Active=False, Expanded=False, Disabled=True | 220×32 | 8 | 6/8/6/8 | 8 | IBM Plex Sans Regular 14/20 |

### ds-sidebar-item-compact (3)
Variant props: Type=[Full]; Active=[False,True]; Disabled=[False,True]

| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| Type=Full, Active=False, Disabled=False | 32×32 | 8 | 8/8/8/8 | 8 | — |
| Type=Full, Active=True, Disabled=False | 32×32 | 8 | 8/8/8/8 | 8 | — |
| Type=Full, Active=False, Disabled=True | 32×32 | 8 | 8/8/8/8 | 8 | — |

### ds-sidebar (2)
Variant props: Compact=[False,True]

| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| Compact=False | 224×480 | 0 | 0/0/0/0 | 0 | IBM Plex Sans SemiBold 13/18 |
| Compact=True | 40×480 | 0 | 0/0/0/0 | 0 | — |

## Chat Bar

### ds-chat-bar (6)
Variant props: Type=[Active,Menu,Inactive]; Filled=[True,False]

| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| Type=Inactive, Filled=False | 360×76 | 0 | 0/0/0/0 | 0 | IBM Plex Sans Regular 16/24 |
| Type=Inactive, Filled=True | 360×76 | 0 | 0/0/0/0 | 0 | IBM Plex Sans Regular 16/24 |
| Type=Active, Filled=False | 360×392 | 0 | 0/0/0/0 | 0 | IBM Plex Sans Regular 16/24 |
| Type=Active, Filled=True | 360×392 | 0 | 0/0/0/0 | 0 | IBM Plex Sans Regular 16/24 |
| Type=Menu, Filled=False | 360×392 | 0 | 0/0/0/0 | 0 | IBM Plex Sans Regular 16/24 |
| Type=Menu, Filled=True | 360×392 | 0 | 0/0/0/0 | 0 | IBM Plex Sans Regular 16/24 |

## Screens

### ds-u-screen-update-avatar (1)
| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| ds-u-screen-update-avatar | 393×852 | 0 | 0/0/0/0 | 0 | undefined undefined 17/22 |

## Utilities

### u-status-bar  (2)
Variant props: Platform=[iOS,Android]

| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| Platform=iOS | 402×40 | 0 | 10/24/8/24 | 154 | undefined undefined 17/22 |
| Platform=Android | 402×40 | 0 | 10/24/10/24 | 286 | undefined undefined 14/20 |

### u-bottom (8)
Variant props: Platform=[iOS,Android]; Type=[Home Indicator,Native Keyboard-Alphabet,Native Keyboard-Numeric,Custom Keyboard-Numeric]

| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| Platform=iOS, Type=Home Indicator | 390×20 | 0 | 7/4/8/4 | 4 | — |
| Platform=Android, Type=Home Indicator | 390×24 | 0 | 10/4/10/4 | 4 | — |
| Platform=iOS, Type=Native Keyboard-Alphabet | 390×336 | 0 | 0/0/0/0 | 0 | SF Pro Regular 17/22 |
| Platform=iOS, Type=Native Keyboard-Numeric | 390×291 | 0 | 0/0/0/0 | 0 | SF Pro Bold 10/undefined |
| Platform=iOS, Type=Custom Keyboard-Numeric | 390×280 | 0 | 0/0/0/0 | 0 | Host Grotesk Medium 30/36 |
| Platform=Android, Type=Native Keyboard-Alphabet | 390×338 | 0 | 0/0/0/0 | 0 | undefined undefined 21/24 |
| Platform=Android, Type=Native Keyboard-Numeric | 390×338 | 0 | 0/0/0/0 | 0 | undefined undefined 21/24 |
| Platform=Android, Type=Custom Keyboard-Numeric | 390×284 | 0 | 0/0/0/0 | 0 | Host Grotesk Medium 30/36 |

### u-aspect-ratio (21)
Variant props: Aspect ratio=[1:1,2:1,3:2,5:2,4:3,5:4,3:4,8:3,3:1,1:2,8:5,6:7,9:8,4:5,2:3,16:9,16:10,16:5,21:9,10:16,9:16]

| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| Aspect ratio=1:1 | 80×80 | 0 | 0/0/0/0 | 0 | — |
| Aspect ratio=9:8 | 80×71 | 0 | 0/0/0/0 | 0 | — |
| Aspect ratio=5:4 | 80×64 | 0 | 0/0/0/0 | 0 | — |
| Aspect ratio=4:3 | 80×60 | 0 | 0/0/0/0 | 0 | — |
| Aspect ratio=3:2 | 80×53 | 0 | 0/0/0/0 | 0 | — |
| Aspect ratio=16:10 | 80×50 | 0 | 0/0/0/0 | 0 | — |
| Aspect ratio=8:5 | 80×50 | 0 | 0/0/0/0 | 0 | — |
| Aspect ratio=16:9 | 80×45 | 0 | 0/0/0/0 | 0 | — |
| Aspect ratio=2:1 | 80×40 | 0 | 0/0/0/0 | 0 | — |
| Aspect ratio=21:9 | 80×34 | 0 | 0/0/0/0 | 0 | — |
| Aspect ratio=5:2 | 80×32 | 0 | 0/0/0/0 | 0 | — |
| Aspect ratio=8:3 | 80×30 | 0 | 0/0/0/0 | 0 | — |
| Aspect ratio=3:1 | 80×27 | 0 | 0/0/0/0 | 0 | — |
| Aspect ratio=16:5 | 80×25 | 0 | 0/0/0/0 | 0 | — |
| Aspect ratio=1:2 | 80×160 | 0 | 0/0/0/0 | 0 | — |
| Aspect ratio=9:16 | 80×142 | 0 | 0/0/0/0 | 0 | — |
| Aspect ratio=10:16 | 80×128 | 0 | 0/0/0/0 | 0 | — |
| Aspect ratio=2:3 | 80×120 | 0 | 0/0/0/0 | 0 | — |
| Aspect ratio=3:4 | 80×107 | 0 | 0/0/0/0 | 0 | — |
| Aspect ratio=4:5 | 80×100 | 0 | 0/0/0/0 | 0 | — |
| Aspect ratio=6:7 | 80×93 | 0 | 0/0/0/0 | 0 | — |

### .u-slot (4)
Variant props: Size=[Tiny,Small,Medium,Large]

| Variant | W×H | R | Padding T/R/B/L | Gap | Text |
|---|---:|---:|---|---:|---|
| Size=Tiny | 16×16 | 0 | 0/0/0/0 | 0 | — |
| Size=Small | 24×24 | 0 | 0/0/0/0 | 0 | — |
| Size=Medium | 40×40 | 0 | 0/0/0/0 | 0 | — |
| Size=Large | 160×160 | 0 | 0/0/0/0 | 0 | — |

