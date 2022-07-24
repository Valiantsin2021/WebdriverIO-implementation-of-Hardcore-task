const CalculatorPage = require('../pages/CalculatorPage');
const MailPage = require('../pages/MailPage');

describe('Smoke tests', () => {

    it("Open google and yopmail.com", async function(){
        await CalculatorPage.open();
        await CalculatorPage.maximize();
        await browser.pause(2000);
        console.log(await browser.getTitle());
        await expect(browser).toHaveUrlContaining("google");
        await CalculatorPage.manageCookies();
        await CalculatorPage.clickSearch();
        await CalculatorPage.setCalculator();
        await expect(browser).toHaveTitle("Google Cloud Pricing Calculator")
        await MailPage.open();
        console.log(await browser.getTitle());
    
        const handles = await browser.getWindowHandles()
        await browser.switchToWindow(handles[1])
        await browser.pause(2000);
        await MailPage.manageCookies();
        await MailPage.setLocateMail();
        await expect(browser).toHaveTitle("Входящие");
        await browser.saveScreenshot('./screenshots/screenshot_smoke.png');

    })
});