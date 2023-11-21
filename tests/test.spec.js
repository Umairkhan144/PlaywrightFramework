// Test.spec.js
const { test, expect } = require('@playwright/test');
const LoginPage = require('../Pages/LoginPage.js');

test('test', async ({ page }) => {
    const lp = new LoginPage(page);
    await page.goto('/');
    await lp.loginMethod('admin','admin123')
    await page.waitForTimeout(5000)
    // Your test code continues...
  });