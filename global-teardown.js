const { chromium } = require('@playwright/test');

async function globalTeardown(config) {
  // const { baseURL } = config.projects[0].use;
  // const browser = await chromium.launch();
  // const context = await browser.newContext();
  // const page = await context.newPage();
  // await page.goto(baseURL);
  // Perform any teardown actions if needed
  await browser.close();
}

module.exports = globalTeardown;
