const { chromium } = require('@playwright/test');

async function globalSetup(config) {
  
  const { baseURL, storageState } = config.projects[0].use;
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto(baseURL ,{ timeout: 60000 });
  await page.context().storageState({ path: storageState });
  // await browser.close();
}

module.exports = globalSetup;
