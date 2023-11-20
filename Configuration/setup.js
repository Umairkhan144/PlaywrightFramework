// setup.js
const { test, expect } = require('@playwright/test');
const locators = require('../Configuration/locators.json');

let page;

test.beforeAll(async ({ browser }) => {
  // Your setup code, e.g., navigating to the login page
  page=await browser.newPage();
  await page.goto(locators.LoginPage.url)
});

test.afterAll(async ({ page }) => {
  // Your teardown code, e.g., logging out or cleaning up
  await page.close()
});

// module.exports = { setup };
