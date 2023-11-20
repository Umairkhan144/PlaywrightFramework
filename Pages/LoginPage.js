const BasePage = require('./BasePage');
const locators = require('../Configuration/locators.json');

class LoginPage extends BasePage {

    constructor(page) {
        super(page)
      }

  async login(username, password) {
    await this.open(locators.LoginPage.url)
    await this.type(locators.LoginPage.usernameInput, username);
    await this.type(locators.LoginPage.passwordInput, password);
    await this.click(locators.LoginPage.loginButton);
  }

  // Add page-specific functions as needed
}

module.exports = LoginPage;
