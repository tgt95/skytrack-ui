import * as React from 'react'

/**
 * Shared editing behaviour for the date pickers' text fields.
 *
 * All three pickers (single, range, week) expose the same interaction: the field
 * shows a formatted value, focusing selects it, typing replaces it, Enter and blur
 * commit, Escape and unparseable text revert. Keeping that in one hook means the
 * three pickers cannot drift apart, and the keyboard contract is defined once.
 *
 * `T` is whatever the picker stores: a `Date`, a `DateRange`, or a week-start `Date`.
 */
export type DateFieldOptions<T> = {
  /** Current committed value. */
  value: T | undefined
  /** Text shown when the user is not editing. */
  format: (value: T | undefined) => string
  /** Text the user typed to a value; `undefined` means "not a valid input". */
  parse: (text: string) => T | undefined
  /** Called with a parsed value, or `undefined` when the field was cleared. */
  commit: (value: T | undefined) => void
  /** Rejects parses that are syntactically valid but not selectable. */
  isUnavailable?: (value: T) => boolean
  /**
   * Runs on every keystroke with the raw text and whether the caret sits at the end.
   * Returns the text to actually store, e.g. appending a range separator once the
   * first date is complete.
   */
  completeText?: (text: string, caretAtEnd: boolean) => string
  /** Called after a successful commit from the keyboard (Enter). */
  onCommitFromKeyboard?: () => void
  /** Called when the field asks to open the popup (ArrowDown on a closed field). */
  onRequestOpen?: () => void
}

export type DateField = {
  inputValue: string
  invalid: boolean
  /** Text currently being edited, or `null` when the field shows `inputValue`. */
  draft: string | null
  /** Drops the edit in progress; call after a value is chosen outside the field (e.g. a calendar day). */
  reset: () => void
  handlers: {
    onFocus: (event: React.FocusEvent<HTMLInputElement>) => void
    onBlur: () => void
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void
    onMouseUp: (event: React.MouseEvent<HTMLInputElement>) => void
  }
}

export function useDateField<T>(options: DateFieldOptions<T>): DateField {
  const { value, format, parse, commit, isUnavailable, completeText, onCommitFromKeyboard, onRequestOpen } = options
  // `draft` is the text the user is typing; `null` means the field shows the formatted value.
  const [draft, setDraft] = React.useState<string | null>(null)
  const [invalid, setInvalid] = React.useState(false)
  const selectAllOnMouseUpRef = React.useRef(false)
  const formattedValue = format(value)
  const inputValue = draft ?? formattedValue

  const commitDraft = () => {
    if (draft === null) return true

    // Unchanged text (including a locale display format the parser cannot read) keeps the value.
    if (draft === formattedValue) {
      setDraft(null)
      setInvalid(false)
      return true
    }

    const text = draft.trim()
    if (!text) {
      commit(undefined)
      setDraft(null)
      setInvalid(false)
      return true
    }

    const parsed = parse(text)
    if (parsed === undefined || isUnavailable?.(parsed)) {
      setInvalid(true)
      return false
    }

    commit(parsed)
    setDraft(null)
    setInvalid(false)
    return true
  }

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setDraft(formattedValue)
    setInvalid(false)
    selectAllOnMouseUpRef.current = true
    event.currentTarget.select()
  }

  const handleMouseUp = (event: React.MouseEvent<HTMLInputElement>) => {
    if (!selectAllOnMouseUpRef.current) return
    event.preventDefault()
    selectAllOnMouseUpRef.current = false
  }

  const handleBlur = () => {
    selectAllOnMouseUpRef.current = false
    if (commitDraft()) return
    // Unparseable or unavailable text reverts to the last committed value instead of staying.
    setDraft(null)
    setInvalid(false)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      if (commitDraft()) onCommitFromKeyboard?.()
      return
    }

    if (event.key === 'Escape') {
      if (draft !== null) {
        setDraft(null)
        setInvalid(false)
      }
      return
    }

    if (event.key === 'ArrowDown') onRequestOpen?.()
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const raw = event.target.value
    const next = completeText ? completeText(raw, event.target.selectionStart === raw.length) : raw
    setDraft(next)

    // Only a parse that succeeds can be judged unavailable; incomplete typing stays neutral
    // instead of flashing an error on every keystroke.
    const parsed = parse(next.trim())
    setInvalid(parsed !== undefined && isUnavailable?.(parsed) === true)
  }

  const reset = () => {
    setDraft(null)
    setInvalid(false)
  }

  return {
    inputValue,
    invalid,
    draft,
    reset,
    handlers: {
      onFocus: handleFocus,
      onBlur: handleBlur,
      onChange: handleChange,
      onKeyDown: handleKeyDown,
      onMouseUp: handleMouseUp
    }
  }
}
