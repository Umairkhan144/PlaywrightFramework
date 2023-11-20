const {test, expect} = require('@playwright/test')
const LoginPage = require('../Pages/LoginPage.js')
// const setup = require('../Configuration/setup.js')

// test.use({...setup});

test('First test',async ({page})=>{

    let lp = new LoginPage(page);
    await lp.login("admin","admin123");

    await page.waitForTimeout(5000); //pausing code
})