const { test, expect } = require('@playwright/test');
const LoginPage = require('../Pages/LoginPage.js');
const ExcelUtils = require('../Utils/ExcelUtils.js');

test('Verify user can redirect PIM screen', async ({page})=>{
    await page.goto('/')
    await page.click("//span[normalize-space()='PIM']")
    await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList')
})