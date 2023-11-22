// Test.spec.js
const { test, expect } = require('@playwright/test');
const LoginPage = require('../Pages/LoginPage.js');
const ExcelUtils = require('../Utils/ExcelUtils.js');

// There are two approches to test data driven:
// 1. With Loop but it will show only one test run in report.

test('Login Scenario', async ({ page }) => {
    
    const lp = new LoginPage(page);
    await page.goto('/');
    
    const excelUtils = new ExcelUtils('./TestData/LoginTestData.xlsx', 'Login');
    await excelUtils.loadWorkbook();

    console.log('Row Count:', excelUtils.getRowCount());
    console.log('Column Count:', excelUtils.getColumnCount());

    for (let i = 2; i <= excelUtils.getRowCount(); i++) {

        // Access data from the Excel file
        const username = excelUtils.getCellValue(i, 'A');
        const password = excelUtils.getCellValue(i, 'B');
        let exp = excelUtils.getCellValue(i, 'C');

        await lp.loginMethod(username,password)

        console.log("Test Case # "+i+" Username : "+username+" Password : "+ password + " Expected Result : " + exp)

        if(exp == "Fail"){
            await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        }
        else if(exp == "Pass"){
            await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index')
        }
        else{
            console.log(" Error Nothing Matched")
        }
    }
  });

// 2. Create different test case for each data.

// test('Verify user cannot login with blank username and blank password', async ({ page }) => {

//     const excelUtils = new ExcelUtils('./TestData/LoginTestData.xlsx', 'Login');
//     await excelUtils.loadWorkbook();

//     const lp = new LoginPage(page);
//     await page.goto('/');

//     // Access data from the Excel file
//     const username = excelUtils.getCellValue(2, 'A');
//     const password = excelUtils.getCellValue(2, 'B');

//     await lp.loginMethod(username,password)

//     await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
//     await page.waitForTimeout(3000)
//   });


// test('Verify user cannot login with blank username and valid password', async ({ page }) => {

//     const excelUtils = new ExcelUtils('./TestData/LoginTestData.xlsx', 'Login');
//     await excelUtils.loadWorkbook();

//     const lp = new LoginPage(page);
//     await page.goto('/');

//     // Access data from the Excel file
//     const username = excelUtils.getCellValue(3, 'Username');
//     const password = excelUtils.getCellValue(3, 'Password');

//     await lp.loginMethod(username,password)

//     await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
//     await page.waitForTimeout(3000)
//   });