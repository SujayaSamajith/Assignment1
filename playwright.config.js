// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  
  /* Run tests one at a time */
  fullyParallel: false,
  workers: 1, // ONE test at a time
  
  /* Increase timeout */
  timeout: 120000, // 2 minutes
  
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: 'html',
  
  use: {
    trace: 'on-first-retry',
    actionTimeout: 30000,
    navigationTimeout: 60000,
  },

  /* Configure ONLY Chrome - remove Firefox and WebKit */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // REMOVE Firefox and WebKit for now
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});