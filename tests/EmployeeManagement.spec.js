const { test, expect } = require('@playwright/test');
const LoginPage = require('../Pages/LoginPage.js');
const ExcelUtils = require('../Utils/ExcelUtils.js');
const loc = require('../Utils/locators.json')

test('Verify user can redirect PIM screen', async ({page})=>{
    await page.goto('/')
    await page.click(loc.HomePage.PIMOption)
    await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList')
})

test('Verify Admin cannot add new employee with all fields blank',async ({page})=>{
    await page.goto('/')
    await page.click(loc.HomePage.PIMOption)
    await page.click("//button[normalize-space()='Add']")
    await page.click("//button[normalize-space()='Save']")

    await expect(await page.locator("//div[@class='oxd-input-group']//div[1]//span[1]")).toBeVisible()
})

test('Verify Admin cannot add new employee with first name field blank',async ({page})=>{
    await page.goto('/')
    await page.click(loc.HomePage.PIMOption)
    await page.click("//button[normalize-space()='Add']")
    await page.fill("//input[@placeholder='Last Name']","Khan")
    await page.click("//button[normalize-space()='Save']")

    await expect(await page.locator("//div[@class='oxd-input-group']//div[1]//span[1]")).toBeVisible()
})

test('Verify Admin cannot add new employee with last name field blank',async ({page})=>{
    await page.goto('/')
    await page.click(loc.HomePage.PIMOption)
    await page.click("//button[normalize-space()='Add']")
    await page.fill("//input[@placeholder='First Name']","Umair")
    await page.click("//button[normalize-space()='Save']")

    await expect(await page.locator("//span[@class='oxd-text oxd-text--span oxd-input-field-error-message oxd-input-group__message']")).toBeVisible()
})

test('Verify Admin can turn on toggle create login ',async ({page})=>{
    await page.goto('/')
    await page.click(loc.HomePage.PIMOption)
    await page.click("//button[normalize-space()='Add']")
    await page.click("//span[@class='oxd-switch-input oxd-switch-input--active --label-right']")
    await page.waitForTimeout(3000)

    await expect(await page.locator("//*/div[@class='oxd-form-row']/div[1]/div[1]/div[1]/div[2]/input[1]")).toBeVisible()
})

test('Verify Admin can turn off toggle create login',async ({page})=>{
    await page.goto('/')
    await page.click(loc.HomePage.PIMOption)
    await page.click("//button[normalize-space()='Add']")
    await page.click("//span[@class='oxd-switch-input oxd-switch-input--active --label-right']")
    await page.waitForTimeout(3000)

    await expect(await page.locator("//*/div[@class='oxd-form-row']/div[1]/div[1]/div[1]/div[2]/input[1]")).toBeVisible()
    await page.waitForSelector(
        '//span[@class="oxd-switch-input oxd-switch-input--active --label-right"]',
        { timeout: 60000 } // Adjust the timeout as needed
      );
      const isChecked = await page.isChecked('//span[@class="oxd-switch-input oxd-switch-input--active --label-right"]');
      console.log('Is Checked:', isChecked);
      
    await page.click("(//span[@class='oxd-switch-input oxd-switch-input--active --label-right'])[1]")
    await expect(await page.locator("//*/div[@class='oxd-form-row']/div[1]/div[1]/div[1]/div[2]/input[1]")).not.toBeVisible()
})