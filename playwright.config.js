const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  use: {
    browserName: 'chromium',
    headless: true,
    launchOptions: {
      executablePath: process.env.PLAYWRIGHT_CHROME_PATH
    }
  }
});
