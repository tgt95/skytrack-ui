import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config.ts'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      include: ['src/**/*.test.{ts,tsx}'],
      clearMocks: true,
      restoreMocks: true,
      // The interaction suites drive every pattern demo through user-event, which is
      // several times slower on CI runners than locally. The default 5s is too tight
      // for them; a hang still fails, just later.
      testTimeout: 30_000,
      hookTimeout: 30_000
    }
  })
)
