const { test, expect } = require('@playwright/test');
const LoginPage = require('../Pages/LoginPage.js');
const ExcelUtils = require('../Utils/ExcelUtils.js');
const loc = require('../Utils/locators.json')

test('Verify user can redirect PIM screen', async ({page})=>{
    await page.goto('/')
    await page.click(loc.HomePage.PIMOption)
    await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList')
})