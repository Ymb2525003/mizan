const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  webServer: {
    command: 'npm run start -- --hostname 127.0.0.1 --port 35561',
    url: 'http://127.0.0.1:35561',
    reuseExistingServer: !process.env.CI
  },
  fullyParallel: true,
  workers: 4,
  use: {
    browserName: 'chromium',
    headless: true,
    launchOptions: {
      executablePath: process.env.PLAYWRIGHT_CHROME_PATH
    }
  }
});
