import { Component, type ErrorInfo, type ReactNode } from 'react'

/**
 * Showcase helpers shared by every demo file.
 * Each demo file (src/demos/<name>.demo.tsx) must `export const demo: DemoMeta`.
 */
export type DemoMeta = {
  /** Kebab-case id, equals the file name and the Base UI docs slug, e.g. "alert-dialog". */
  id: string
  /** Display title, e.g. "Alert Dialog". */
  title: string
  /** One-line description. */
  description: string
  /** Sidebar group. */
  group: 'Actions' | 'Forms' | 'Overlays' | 'Menus & Navigation' | 'Data Display' | 'Layout'
  /** Every variant/example rendered as its own block. */
  variants: { name: string; render: () => ReactNode }[]
}

/** Isolates a crashing demo so the rest of the showcase keeps rendering. */
class DemoErrorBoundary extends Component<{ name: string; children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null }
  static getDerivedStateFromError(error: Error) {
    return { error }
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(`[demo-crash] ${this.props.name}: ${error.message}`, info.componentStack)
  }
  render() {
    if (this.state.error) {
      return (
        <p data-demo-error className='text-sm text-destructive'>
          Demo failed to render: {this.state.error.message}
        </p>
      )
    }
    return this.props.children
  }
}

export function VariantBlock({ name, children }: { name: string; children: ReactNode }) {
  return (
    <div className='border border-border'>
      <div className='border-b border-border px-4 py-2 text-xs sub-heading'>
        {name}
      </div>
      <div className='flex min-h-28 flex-wrap items-center gap-4 p-6'>
        <DemoErrorBoundary name={name}>{children}</DemoErrorBoundary>
      </div>
    </div>
  )
}
