const { expect } = require('@playwright/test');
const locators = require('../Configuration/locators.json');

class LoginPage {

  constructor(page)
  {
    this.page = page;
  }

  async loginMethod(username, password) {
    await this.page.waitForLoadState('load');
    await this.page.locator(locators.LoginPage.usernameInput).fill(username)
    await this.page.locator(locators.LoginPage.passwordInput).fill(password)
    await this.page.locator(locators.LoginPage.loginButton).click()
  }

  // Add page-specific functions as needed
}

module.exports = LoginPage;
