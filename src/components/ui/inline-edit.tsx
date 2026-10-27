import * as React from 'react'
import { useRender } from '@base-ui/react/use-render'
import { cn } from '@/lib/utils'

type InlineEditContextValue = {
  value: string
  draft: string
  editing: boolean
  disabled: boolean
  inputId: string
  label?: string
  triggerRef: React.RefObject<HTMLElement | null>
  setDraft: React.Dispatch<React.SetStateAction<string>>
  startEditing: () => void
  commit: (restoreFocus?: boolean) => void
  cancel: (restoreFocus?: boolean) => void
}

const InlineEditContext = React.createContext<InlineEditContextValue | null>(null)

function useInlineEditContext() {
  const context = React.useContext(InlineEditContext)
  if (!context) throw new Error('InlineEdit parts must be used inside InlineEdit.')
  return context
}

export type InlineEditRootProps = Omit<React.ComponentProps<'div'>, 'defaultValue' | 'onChange'> & {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  editing?: boolean
  defaultEditing?: boolean
  onEditingChange?: (editing: boolean) => void
  disabled?: boolean
  label?: string
}

function InlineEdit({
  children,
  className,
  value: valueProp,
  defaultValue = '',
  onValueChange,
  editing: editingProp,
  defaultEditing = false,
  onEditingChange,
  disabled = false,
  label,
  ...props
}: InlineEditRootProps) {
  const id = React.useId()
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue)
  const value = valueProp ?? uncontrolledValue
  const [draft, setDraft] = React.useState(value)
  const [uncontrolledEditing, setUncontrolledEditing] = React.useState(defaultEditing)
  const editing = editingProp ?? uncontrolledEditing
  const triggerRef = React.useRef<HTMLElement>(null)
  const restoreFocusRef = React.useRef(false)

  const setEditing = React.useCallback(
    (next: boolean, restoreFocus = false) => {
      restoreFocusRef.current = restoreFocus
      if (editingProp === undefined) setUncontrolledEditing(next)
      onEditingChange?.(next)
    },
    [editingProp, onEditingChange]
  )

  const startEditing = React.useCallback(() => {
    if (disabled) return
    setDraft(value)
    setEditing(true)
  }, [disabled, setEditing, value])

  const commit = React.useCallback(
    (restoreFocus = false) => {
      if (draft !== value) {
        if (valueProp === undefined) setUncontrolledValue(draft)
        onValueChange?.(draft)
      }
      setEditing(false, restoreFocus)
    },
    [draft, onValueChange, setEditing, value, valueProp]
  )

  const cancel = React.useCallback(
    (restoreFocus = false) => {
      setDraft(value)
      setEditing(false, restoreFocus)
    },
    [setEditing, value]
  )

  React.useEffect(() => {
    if (!editing) setDraft(value)
  }, [editing, value])

  React.useEffect(() => {
    if (!editing && restoreFocusRef.current) {
      restoreFocusRef.current = false
      triggerRef.current?.focus()
    }
  }, [editing])

  const context = React.useMemo<InlineEditContextValue>(
    () => ({
      value,
      draft,
      editing,
      disabled,
      inputId: `${id}-input`,
      label: label ?? value,
      triggerRef,
      setDraft,
      startEditing,
      commit,
      cancel
    }),
    [value, draft, editing, disabled, id, label, startEditing, commit, cancel]
  )

  return (
    <InlineEditContext.Provider value={context}>
      <div data-slot='inline-edit' data-editing={editing ? '' : undefined} className={cn('inline-flex min-w-0 flex-col', className as string)} {...props}>
        {children}
      </div>
    </InlineEditContext.Provider>
  )
}

export type InlineEditTriggerProps = useRender.ComponentProps<'button', { editing: boolean; value: string }>

function InlineEditTrigger({ children, disabled, onClick, render, ...props }: InlineEditTriggerProps) {
  const context = useInlineEditContext()
  const trigger = useRender({
    defaultTagName: 'button',
    render,
    enabled: !context.editing,
    ref: context.triggerRef,
    state: { editing: context.editing, value: context.value },
    props: {
      ...props,
      'data-slot': 'inline-edit-trigger',
      type: 'button',
      disabled: disabled ?? context.disabled,
      'aria-disabled': disabled ?? context.disabled,
      'aria-expanded': context.editing,
      'aria-controls': context.inputId,
      onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event)
        if (!event.defaultPrevented && !context.disabled && !disabled) context.startEditing()
      },
      children: children ?? context.value
    }
  })
  return context.editing ? null : trigger
}

export type InlineEditInputProps = Omit<useRender.ComponentProps<'textarea'>, 'value' | 'defaultValue'>

function InlineEditInput({ className, id, onBlur, onChange, onKeyDown, ref, render, rows, ...props }: InlineEditInputProps) {
  const context = useInlineEditContext()
  const inputRef = React.useRef<HTMLElement>(null)

  React.useEffect(() => {
    if (!context.editing) return
    const input = inputRef.current as HTMLTextAreaElement | HTMLInputElement | null
    input?.focus()
    input?.select?.()
  }, [context.editing])

  React.useLayoutEffect(() => {
    if (!context.editing) return
    const input = inputRef.current
    if (input instanceof HTMLTextAreaElement) {
      input.style.height = 'auto'
      input.style.height = `${input.scrollHeight}px`
    }
  }, [context.editing, context.draft])

  const input = useRender({
    defaultTagName: 'textarea',
    render,
    enabled: context.editing,
    ref: ref ? [inputRef, ref] : inputRef,
    props: {
      ...props,
      id: id ?? context.inputId,
      'data-slot': 'inline-edit-input',
      'aria-label': props['aria-label'] ?? context.label,
      disabled: props.disabled ?? context.disabled,
      rows: rows ?? 1,
      value: context.draft,
      className: cn(
        'block w-full min-w-0 resize-none overflow-hidden rounded-(--radius) border border-input bg-transparent px-3 py-2 text-inherit outline-none transition-colors',
        'focus:border-ring focus:ring-[3px] focus:ring-ring/50',
        className as string
      ),
      onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange?.(event)
        if (!event.defaultPrevented) context.setDraft(event.currentTarget.value)
      },
      onBlur: (event: React.FocusEvent<HTMLTextAreaElement>) => {
        onBlur?.(event)
        if (!event.defaultPrevented) context.commit()
      },
      onKeyDown: (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        onKeyDown?.(event)
        if (event.defaultPrevented || event.nativeEvent.isComposing) return
        if (event.key === 'Escape') {
          event.preventDefault()
          context.cancel(true)
        } else if (event.key === 'Enter' && !event.shiftKey) {
          event.preventDefault()
          context.commit(true)
        }
      }
    }
  })
  return context.editing ? input : null
}

export { InlineEdit, InlineEditTrigger, InlineEditInput }
