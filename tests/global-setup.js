const { chromium , expect } = require('@playwright/test');
const LoginPage = require('../Pages/LoginPage.js');
const ExcelUtils = require('../Utils/ExcelUtils.js');

async function globalSetup(config) {
  
  const { baseURL, storageState } = config.projects[0].use;
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto(baseURL ,{ timeout: 60000 });

  const lp = new LoginPage(page);

  const excelUtils = new ExcelUtils('./TestData/LoginTestData.xlsx', 'Login');
  await excelUtils.loadWorkbook();

  const username = excelUtils.getCellValue(9, 'A');
  const password = excelUtils.getCellValue(9, 'B');
  let exp = excelUtils.getCellValue(9, 'C');

  await lp.loginMethod(username,password)

  console.log("Test Case # 1 | Username : "+username+" Password : "+ password + " Expected Result : " + exp)

  if(exp == "Fail"){
      await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
  }
  else if(exp == "Pass"){
      await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index')
  }
  else{
      console.log("Error Nothing Matched")
  }

  await page.context().storageState({ path: storageState });
}

module.exports = globalSetup;
