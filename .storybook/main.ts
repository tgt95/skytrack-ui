import path from 'node:path'
import type { StorybookConfig } from '@storybook/react-vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * Mirrors vite.config.ts (react + tailwindcss plugins, @ -> src alias).
 * The react-vite framework already registers the React plugin, so it is only
 * added here when missing; tailwindcss has no such preset and is always added.
 */
const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: { name: '@storybook/react-vite', options: {} },
  viteFinal: async (viteConfig) => {
    const flat = (viteConfig.plugins ?? []).flat().filter(Boolean) as { name?: string }[]
    const names = new Set(flat.map((p) => p.name))
    const extra = []
    if (![...names].some((n) => n?.includes('react'))) extra.push(react())
    if (!names.has('tailwindcss')) extra.push(tailwindcss())
    viteConfig.plugins = [...(viteConfig.plugins ?? []), ...extra]
    viteConfig.resolve = {
      ...viteConfig.resolve,
      alias: {
        ...(viteConfig.resolve?.alias as Record<string, string> | undefined),
        '@': path.resolve(import.meta.dirname, '../src')
      }
    }
    return viteConfig
  }
}

export default config
