import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Merge class names; later Tailwind classes override earlier ones. */
type StatefulClassName = (state: any) => string | undefined

export function cn(...inputs: ClassValue[]): string
export function cn(...inputs: [...ClassValue[], ClassValue | StatefulClassName]): string | StatefulClassName
export function cn(...inputs: (ClassValue | StatefulClassName)[]): string | StatefulClassName {
  const stateClass = inputs.find((input) => typeof input === 'function')

  if (stateClass) {
    return (state: unknown) =>
      twMerge(clsx(inputs.map((input) => (typeof input === 'function' ? input(state) : input))))
  }

  return twMerge(clsx(inputs))
}
