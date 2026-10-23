import { useEffect } from 'react'
import type { Preview } from '@storybook/react-vite'
import '../src/index.css'

/**
 * Class-based dark mode, same mechanism as the showcase App:
 * a `dark` class on <html> switches the token set
 * (@custom-variant dark (&:is(.dark *)) in src/index.css).
 */
export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Light / dark theme (toggles .dark on <html>)',
    defaultValue: 'light',
    toolbar: {
      icon: 'moon',
      items: [
        { value: 'light', title: 'Light' },
        { value: 'dark', title: 'Dark' }
      ]
    }
  }
} as const

export const decorators = [
  (Story, context) => {
    useEffect(() => {
      document.documentElement.classList.toggle('dark', context.globals.theme === 'dark')
    }, [context.globals.theme])
    return <Story />
  }
]

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/i }
    }
  }
}

export default preview
