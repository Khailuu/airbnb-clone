import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
  reporter: "html",
  use: {
    browserName: "chromium",
    headless: false,
    viewport: { width: 1280, height: 1000 },
    ignoreHTTPSErrors: true,
    baseURL: "http://localhost:3000",
  },
  retries: 2,
  projects: [
    {
      name: "Desktop Chrome",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],
});
