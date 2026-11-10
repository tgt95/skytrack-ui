# Workspace / Canvas-centric Shell

> Infinite visual canvas with docked toolbars and property inspector for nodal pipelines and visual editors.

- Package version: `0.1.5`
- Showcase demo id: `canvas-shell`
- Closest demo: [`src/demos/canvas-shell.demo.tsx`](../../../../../src/demos/canvas-shell.demo.tsx)
- Pattern source: [`docs/enterprise_ui_shell_patterns.md`](../../../../../docs/enterprise_ui_shell_patterns.md)

## Usage

Use Canvas-centric Shell for visual workflow automation, ETL pipeline design, data graph authoring, and drag-and-drop page builders. Traditional navigation menus are minimized into slender toolbars, allocating maximum screen space to an interactive infinite diagramming canvas.

- **Fit:** Workflow automation platforms (n8n, Make.com, Zapier), visual ETL pipeline builders (Palantir, Snowflake Streamlit), visual UI/schema builders.
- **Avoid:** Administrative form-entry systems, general accounting ledgers.
- **Best alternative:** For document processing and triage, choose Multi-Pane Shell.

**Live demo variant:** `Default`

## Types

- **Docked Toolbars:** Slender vertical toolbars pinned to the left edge and an inspector pinned to the right edge.
- **Floating Palettes:** Floating, draggable panels that can be minimized or relocated across the canvas.

## Behavior

- **Pan and Zoom:** Smooth scrolling or Spacebar + drag to pan freely; mouse wheel or zoom buttons to scale.
- **Node Selection:** Selecting a node applies a highlighted active ring and opens its corresponding configuration parameters in the right-hand inspector.
- **Visual Connectors:** Directional bezier curves and ports illustrate input/output dependencies between nodes.

| Do | Don't | Why |
| --- | --- | --- |
| Provide a subtle dot grid and snap-to-grid capabilities. | Present a completely blank canvas without spatial alignment references. | Coordinate grids enable users to organize and align interconnected logic cleanly. |
| Surface real-time execution states (Idle, Running, Succeeded, Failed) directly on nodes and footer. | Obscure execution feedback outside the canvas viewport. | Pipeline builders require immediate visual feedback when testing execution flows. |

**Live demo variant:** `Default`

## Layout

- **Header bar:** 40px - 44px height containing document title, File menu, and Deploy actions.
- **Left toolbar:** 40px - 48px width housing tool selection, pan, and node types.
- **Center canvas:** Occupies 60% - 75% of screen area with two-dimensional infinite scrolling.
- **Right inspector:** 220px - 260px width housing node property forms.
- **Status footer:** Docked footer showing zoom percentage, coordinates, and execution status.

**Live demo variant:** `Default`

## Accessibility

- Full keyboard shortcut support: `V` (Select), `H` (Pan), `Delete` (Remove node).
- Logical Tab navigation traverses nodes in sequential order of execution flow.

**Live demo variant:** `Default`

## Content

- Nodes clearly display block type and descriptive name (e.g., "Webhook: New Form Lead", "Sync to Enterprise CRM").
- Inspector panel organizes properties into grouped fields with sample payload previews.

**Live demo variant:** `Default`
