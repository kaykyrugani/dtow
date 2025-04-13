import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    setupFiles: ['./src/tests/integration/setup.ts'],
    include: ['src/tests/integration/**/*.int.test.ts'],
    environment: 'node',
    globals: true,
    testTimeout: 10000,
  },
}) 