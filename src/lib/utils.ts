import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Merge class names; later Tailwind classes override earlier ones. */
type StatefulClassName<State> = (state: State) => string | undefined
type StatefulClassNameInput = (state: never) => string | undefined

export function cn(...inputs: ClassValue[]): string
export function cn<State>(
  ...inputs: [...ClassValue[], ClassValue | StatefulClassName<State>]
): string | StatefulClassName<State>
export function cn(...inputs: (ClassValue | StatefulClassNameInput)[]): string | StatefulClassNameInput {
  const stateClass = inputs.find((input): input is StatefulClassNameInput => typeof input === 'function')

  if (stateClass) {
    return (state: never) =>
      twMerge(
        clsx(inputs.map((input) => (typeof input === 'function' ? Reflect.apply(input, undefined, [state]) : input)))
      )
  }

  return twMerge(clsx(inputs))
}
